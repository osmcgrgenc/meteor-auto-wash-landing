import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = resolve(__dirname, "public");
const SERVER_ENTRY = resolve(__dirname, "dist/server/server.js");

// Load the server entry
const serverMod = await import(SERVER_ENTRY);
const handler = serverMod.default ?? serverMod;

// MIME types
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function serveStatic(urlPath) {
  // Remove leading slash
  const pathname = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;
  const filePath = join(PUBLIC_DIR, pathname);

  try {
    const statResult = await stat(filePath);
    if (statResult.isDirectory()) {
      // Try index.html
      const indexPath = join(filePath, "index.html");
      const indexStat = await stat(indexPath);
      if (indexStat.isFile()) {
        const content = await readFile(indexPath);
        return new Response(content, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
    } else {
      const content = await readFile(filePath);
      const ext = extname(filePath);
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      return new Response(content, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch {
    // File not found
    return null;
  }
}

async function handleRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Health endpoint
  if (pathname === "/health") {
    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Robots.txt — serve from public or generate dynamically
  if (pathname === "/robots.txt") {
    const staticResponse = await serveStatic("/robots.txt");
    if (staticResponse) return staticResponse;
    // Generate dynamically if not found in public/
    const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://meteor-oto-yikama.com";
    const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Block AI training bots
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: Claude-Web
Disallow: /
User-agent: Bytespider
Disallow: /
User-agent: Google-Extended
Disallow: /`;
    return new Response(robotsContent, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Sitemap.xml — generate dynamically
  if (pathname === "/sitemap.xml") {
    const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://meteor-oto-yikama.com";
    const today = new Date().toISOString().split("T")[0];
    const routes = [
      { path: "/", priority: "1.0", changefreq: "weekly" },
      { path: "/kvkk", priority: "0.3", changefreq: "yearly" },
      { path: "/gizlilik-politikasi", priority: "0.3", changefreq: "yearly" },
      { path: "/cerez-politikasi", priority: "0.3", changefreq: "yearly" },
    ];
    const urls = routes
      .map(
        (r) => `<url><loc>${siteUrl}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
      )
      .join("");
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
    return new Response(sitemap, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }

  // Static assets — only /assets/* from public/
  if (pathname.startsWith("/assets/")) {
    const staticResponse = await serveStatic(pathname);
    if (staticResponse) return staticResponse;
  }

  // Favicon
  if (pathname === "/favicon.ico") {
    const staticResponse = await serveStatic("/favicon.ico");
    if (staticResponse) return staticResponse;
  }

  // SSR for everything else
  try {
    return await handler.fetch(req, { PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL }, {});
  } catch (error) {
    console.error("SSR error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

const server = createServer(async (req, res) => {
  try {
    // Convert Node IncomingMessage to Web Request
    const protocol = req.headers["x-forwarded-proto"] ?? "http";
    const host = req.headers.host ?? `${HOST}:${PORT}`;
    const request = new Request(`${protocol}://${host}${req.url}`, {
      method: req.method,
      headers: req.headers,
    });

    const response = await handleRequest(request);

    // Convert Web Response to Node ServerResponse
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Use arrayBuffer for binary data (images, fonts, etc.)
    const body = await response.arrayBuffer();
    res.end(Buffer.from(body));
  } catch (error) {
    console.error("Request error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

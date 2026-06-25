import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST_CLIENT = join(__dirname, "dist/client");
const SERVER_FILE = join(__dirname, "dist/server/server.js");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

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
  ".txt": "text/plain",
  ".xml": "application/xml",
};

// Dynamic server module
let serverHandler;
async function loadServer() {
  if (!serverHandler) {
    const serverModule = await import(SERVER_FILE);
    serverHandler = serverModule.default;
  }
  return serverHandler;
}

function serveStaticFile(filePath, res) {
  const ext = extname(filePath);
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(res);
}

async function handleRequest(req, res) {
  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  console.log(`${req.method} ${req.url}`);

  // Skip favicon requests
  if (url.pathname === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Try static file first
  const staticPath = join(DIST_CLIENT, url.pathname);

  if (existsSync(staticPath)) {
    const stat = statSync(staticPath);

    if (stat.isDirectory()) {
      const indexPath = join(staticPath, "index.html");
      if (existsSync(indexPath)) {
        serveStaticFile(indexPath, res);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    serveStaticFile(staticPath, res);
    return;
  }

  // For root path, try SSR
  if (url.pathname === "/") {
    try {
      const handler = await loadServer();
      const request = new Request(url, {
        method: req.method,
        headers: req.headers,
      });
      const response = await handler.fetch(request, { NODE_ENV: "production" }, {});
      res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
      const body = await response.text();
      res.end(body);
      return;
    } catch (error) {
      console.error("SSR Error for /:", error);
    }
  }

  // Let SSR handle other requests
  try {
    const handler = await loadServer();
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
    });
    const response = await handler.fetch(request, { NODE_ENV: "production" }, {});
    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    const body = await response.text();
    res.end(body);
  } catch (error) {
    console.error("SSR Error:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

const server = createServer(handleRequest);
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

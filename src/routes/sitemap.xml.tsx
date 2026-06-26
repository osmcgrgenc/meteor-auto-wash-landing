import { createFileRoute } from "@tanstack/react-router";

const SITE_URL =
  (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? "https://meteor-oto-yikama.com";

const siteRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/hizmetler", priority: "0.9", changefreq: "weekly" },
  { path: "/hakkimizda", priority: "0.8", changefreq: "monthly" },
  { path: "/galeri", priority: "0.7", changefreq: "monthly" },
  { path: "/iletisim", priority: "0.9", changefreq: "monthly" },
  { path: "/kvkk", priority: "0.3", changefreq: "yearly" },
  { path: "/gizlilik-politikasi", priority: "0.3", changefreq: "yearly" },
  { path: "/cerez-politikasi", priority: "0.3", changefreq: "yearly" },
];

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const urls = siteRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap();
        return new Response(sitemap, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      },
    },
  },
});

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const SITE_URL =
  (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? "https://meteor-shine-hub.lovable.app";

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => ({
    meta: [
      { title: "Çerez Politikası | Meteor Oto Yıkama" },
      {
        name: "description",
        content:
          "Meteor Oto Yıkama web sitesinde kullanılan çerezler ve amaçları hakkında bilgilendirme.",
      },
      { property: "og:title", content: "Çerez Politikası | Meteor Oto Yıkama" },
      {
        property: "og:description",
        content:
          "Meteor Oto Yıkama web sitesinde kullanılan çerezler ve amaçları hakkında bilgilendirme.",
      },
      { property: "og:url", content: `${SITE_URL}/cerez-politikasi` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cerez-politikasi` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Çerez Politikası", path: "/cerez-politikasi" },
          ]),
        ),
      },
    ],
  }),
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Ana sayfaya dön
        </Link>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Çerez Politikası</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
        </p>

        <div className="prose prose-neutral mt-8 max-w-none text-foreground">
          <h2 className="mt-8 text-xl font-semibold">1. Çerez Nedir?</h2>
          <p className="mt-2 text-muted-foreground">
            Çerezler, ziyaret ettiğiniz web sitesi tarafından tarayıcınıza yerleştirilen küçük metin
            dosyalarıdır. Sitenin doğru çalışmasını sağlamak ve kullanım deneyiminizi iyileştirmek
            amacıyla kullanılır.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Kullandığımız Çerezler</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>
              <strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir.
            </li>
            <li>
              <strong>Performans çerezleri:</strong> Ziyaretçilerin siteyi nasıl kullandığını
              anlamamıza yardımcı olur.
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">3. Çerezleri Yönetme</h2>
          <p className="mt-2 text-muted-foreground">
            Tarayıcı ayarlarınızdan çerezleri kabul edebilir, reddedebilir veya silebilirsiniz.
            Çerezleri devre dışı bırakmanız sitenin bazı işlevlerinin çalışmamasına neden olabilir.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. İletişim</h2>
          <p className="mt-2 text-muted-foreground">
            Çerez politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

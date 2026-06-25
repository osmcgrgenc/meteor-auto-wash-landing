import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const Route = createFileRoute("/gizlilik-politikasi")({
  head: () => ({
    meta: [
      { title: "Gizlilik Politikası | Meteor Oto Yıkama" },
      {
        name: "description",
        content:
          "Meteor Oto Yıkama gizlilik politikası. Web sitemizi kullanırken verileriniz nasıl korunuyor.",
      },
      { property: "og:title", content: "Gizlilik Politikası | Meteor Oto Yıkama" },
      {
        property: "og:description",
        content:
          "Meteor Oto Yıkama gizlilik politikası. Web sitemizi kullanırken verileriniz nasıl korunuyor.",
      },
      { property: "og:url", content: "https://meteor-shine-hub.lovable.app/gizlilik-politikasi" },
    ],
    links: [{ rel: "canonical", href: "https://meteor-shine-hub.lovable.app/gizlilik-politikasi" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Gizlilik Politikası", path: "/gizlilik-politikasi" },
          ]),
        ),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfa
          </Link>
          <span className="font-display text-lg font-bold tracking-tight">
            Meteor<span className="text-primary"> Oto Yıkama</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">Gizlilik Politikası</h1>

        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              1. Genel Bilgilendirme
            </h2>
            <p className="mt-2">
              meteorotoyikama.com web sitesini ziyaretiniz sırasında
              gizliliğinizin korunması bizim için önemlidir. Bu politika,
              hangi verileri topladığımızı ve nasıl kullandığımızı
              açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              2. Toplanan Veriler
            </h2>
            <p className="mt-2">
              Sitemiz aracılığıyla doğrudan sağladığınız iletişim bilgileri
-ad,
              telefon, araç bilgisi) dışında, ziyaret verileri (tarayıcı tipi,
              ziyaret süresi vb.) otomatik olarak toplanabilir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              3. Çerezler (Cookies)
            </h2>
            <p className="mt-2">
              Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerez
              kullanabilir. Tarayıcı ayarlarınızdan çerezleri
              yönetebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              4. Üçüncü Taraf Bağlantıları
            </h2>
            <p className="mt-2">
              Sitemizde Instagram, Google Maps ve WhatsApp bağlantıları
              bulunmaktadır. Bu platformların gizlilik politikaları kendi
              sorumluluğundadır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              5. Değişiklikler
            </h2>
            <p className="mt-2">
              Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler
              bu sayfada yayınlanır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              6. İletişim
            </h2>
            <p className="mt-2">
              Gizlilik politikamız hakkında sorularınız için bize WhatsApp
              (05309581333) üzerinden ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

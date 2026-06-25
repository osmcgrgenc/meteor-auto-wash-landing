import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const SITE_URL = (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? "https://meteor-shine-hub.lovable.app";

export const Route = createFileRoute("/kvkk")({
  head: () => ({
    meta: [
      { title: "KVKK Aydınlatma Metni | Meteor Oto Yıkama" },
      {
        name: "description",
        content:
          "Meteor Oto Yıkama KVKK aydınlatma metni. Kişisel verilerinizin korunması ve işlenmesine ilişkin bilgilendirme.",
      },
      { property: "og:title", content: "KVKK Aydınlatma Metni | Meteor Oto Yıkama" },
      {
        property: "og:description",
        content:
          "Meteor Oto Yıkama KVKK aydınlatma metni. Kişisel verilerinizin korunması ve işlenmesine ilişkin bilgilendirme.",
      },
      { property: "og:url", content: `${SITE_URL}/kvkk` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/kvkk` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "KVKK Aydınlatma Metni", path: "/kvkk" },
          ]),
        ),
      },
    ],
  }),
  component: KVKKPage,
});

function KVKKPage() {
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
        <h1 className="text-3xl font-bold sm:text-4xl">
          Kişisel Verilerin Korunması Aydınlatma Metni
        </h1>

        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              1. Veri Sorumlusu
            </h2>
            <p className="mt-2">
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında
              veri sorumlusu olarak Meteor Oto Yıkama hizmet vermektedir.
              Adresimiz: Selahaddin Eyyubi Mah. Elyesa Sk. Mete Konakları,
              Selçuklu / Konya.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              2. İşlenen Kişisel Veriler
            </h2>
            <p className="mt-2">
              Randevu ve hizmet süreçlerimiz kapsamında; ad-soyad, telefon
              numarası, araç plakası ve hizmet tercihleriniz gibi veriler
              işlenebilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              3. Veri İşleme Amaçları
            </h2>
            <p className="mt-2">
              Kişisel verileriniz; randevu oluşturma, hizmet sunumu, müşteri
              iletişimi, memnuniyet takibi ve yasal yükümlülüklerin
              yerine getirilmesi amaçlarıyla işlenmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              4. Haklarınız
            </h2>
            <p className="mt-2">
              KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
              işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme
              amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,
              düzeltme, silme veya yok edilmesini talep etme haklarına
              sahipsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              5. İletişim
            </h2>
            <p className="mt-2">
              Haklarınıza ilişkin taleplerinizi telefon (05309581333) veya
              WhatsApp üzerinden bize iletebilirsiniz.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Phone,
  Instagram,
  MessageCircle,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Droplets,
  Car,
  CircleDot,
  Armchair,
  Wand2,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { whatsappUrl, telHref } from "@/lib/whatsapp";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/structured-data";

import { MeteorLogo } from "@/components/meteor-logo";
import heroImg from "@/assets/hero-wash.jpg";
import interiorImg from "@/assets/interior-detail.jpg";
import waxImg from "@/assets/wax-polish.jpg";
import engineImg from "@/assets/engine-clean.jpg";

const SITE_URL = (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? "https://meteor-shine-hub.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meteor Oto Yıkama | Selçuklu Konya Premium Oto Yıkama" },
      {
        name: "description",
        content:
          "Meteor Oto Yıkama, Selçuklu Konya'da aracınız için özenli iç ve dış temizlik, pasta cila ve boya koruma hizmetleri sunar. WhatsApp'tan hemen randevu alın.",
      },
      {
        property: "og:title",
        content: "Meteor Oto Yıkama | Selçuklu Konya Premium Oto Yıkama",
      },
      {
        property: "og:description",
        content:
          "Selçuklu Konya'da profesyonel oto yıkama, iç-dış temizlik ve boya koruma. WhatsApp ile tek tıkla randevu oluşturun.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Meteor Oto Yıkama - Profesyonel araç temizliği ve bakımı",
      },
      { property: "og:site_name", content: "Meteor Oto Yıkama" },
      { property: "og:locale", content: "tr_TR" },
      {
        name: "twitter:title",
        content: "Meteor Oto Yıkama | Selçuklu Konya Premium Oto Yıkama",
      },
      {
        name: "twitter:description",
        content:
          "Selçuklu Konya'da profesyonel oto yıkama, iç-dış temizlik ve boya koruma. WhatsApp ile tek tıkla randevu oluşturun.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
      {
        name: "twitter:image:alt",
        content: "Meteor Oto Yıkama - Profesyonel araç temizliği ve bakımı",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd()),
      },
    ],
  }),
  component: Landing,
});

const iconMap = {
  wash: Droplets,
  interior: Car,
  wheels: CircleDot,
  seats: Armchair,
  polish: Wand2,
  protect: ShieldCheck,
};

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="anasayfa">
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <WhyMeteor />
        <Gallery />
        <Reviews />
        <AppointmentCta />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}

/* ---------------- Header ---------------- */

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center" aria-label="Meteor Oto Yıkama ana sayfa">
      <MeteorLogo onDark={dark} className="h-12 w-auto sm:h-14" />
    </Link>
  );
}

function AppointmentButton({ className = "" }: { className?: string }) {
  const href = siteConfig.appointmentUrl || whatsappUrl();
  const external = !!siteConfig.appointmentUrl;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-event="appointment_click"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      Randevu Al
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Wordmark />

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Ana menü">
          {siteConfig.nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AppointmentButton className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobil menü">
            {siteConfig.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {n.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <a
                href={telHref()}
                data-event="phone_click"
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium"
              >
                <Phone className="h-4 w-4" /> Ara
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-event="whatsapp_click"
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-whatsapp px-3 py-2 text-sm font-medium text-whatsapp-foreground"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-event="instagram_click"
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium"
              >
                <Instagram className="h-4 w-4" /> IG
              </a>
            </div>
            <AppointmentButton className="mt-3 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-dark text-on-dark">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Profesyonel oto yıkama alanında temizlenmiş modern bir araç"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div
          aria-hidden
          className="absolute -top-40 right-[-10%] h-[60vh] w-[60vh] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.7 0.2 45 / 0.35), transparent)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-on-dark-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Selçuklu / Konya · Mete Konakları
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-on-dark drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
            Aracınız Temizliğin{" "}
            <span className="text-gradient">En İyisini</span> Hak Ediyor
          </h1>

          <p className="mt-5 max-w-xl text-base text-on-dark-muted sm:text-lg">
            Aracınızın iç ve dış temizliğini özenli uygulamalarla tamamlıyor,
            her detayda temiz ve bakımlı bir görünüm sunuyoruz.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <AppointmentButton className="!px-6 !py-3.5 text-base" />
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-on-dark backdrop-blur transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp'tan Yaz
            </a>
            <a
              href={telHref()}
              data-event="phone_click"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-on-dark hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-on-dark-muted">
            Profesyonel Uygulama · Özenli Temizlik · Kolay Randevu
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust strip ---------------- */

function TrustStrip() {
  return (
    <section aria-label="Öne çıkanlar" className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 md:grid-cols-4">
        {siteConfig.trustItems.map((t) => (
          <div
            key={t}
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Section heading ---------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

/* ---------------- Services ---------------- */

function Services() {
  const visible = siteConfig.services.filter((s) => s.active);
  return (
    <section id="hizmetler" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="Hizmetlerimiz"
        title={<>Aracınıza Hak Ettiği Bakım</>}
        description="Aracınızın iç ve dış temizliğinden boya korumaya kadar tek noktadan uzman çözümler."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => {
          const Icon = iconMap[s.icon];
          const msg = `Merhaba Meteor Oto Yıkama, "${s.title}" hizmeti hakkında bilgi almak istiyorum.`;
          return (
            <article
              key={s.id}
              className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold">{s.title}</h3>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                {s.description}
              </p>
              <a
                href={whatsappUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                data-event="service_info_click"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Bilgi Al <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process() {
  const steps = [
    { n: "01", t: "Hizmetini Seç", d: "İhtiyacın olan hizmeti belirle." },
    { n: "02", t: "Randevunu Oluştur", d: "WhatsApp veya telefonla bize ulaş." },
    { n: "03", t: "Aracını Temiz Teslim Al", d: "Aracını dilediğin saatte teslim al." },
  ];
  return (
    <section className="bg-surface-elevated py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Nasıl Çalışır?" title="3 Adımda Tamamlanır" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-border bg-surface p-6 shadow-card"
            >
              <span className="font-display text-4xl font-extrabold text-primary/30">
                {s.n}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Why Meteor ---------------- */

function WhyMeteor() {
  const points = [
    "Aracınıza özel özen",
    "Detaylara dikkat eden uygulama",
    "Hızlı iletişim",
    "Kolay randevu",
    "Ulaşılabilir konum",
  ];
  return (
    <section id="neden-biz" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border shadow-card">
          <img
            src={interiorImg}
            alt="Meteor Oto Yıkama'da özenli iç temizlik uygulaması"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Neden Meteor?
          </div>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Temizlik Sadece Görünüm Değildir
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Meteor Oto Yıkama'da her araç özenle ele alınır. Amacımız yalnızca
            aracınızı temizlemek değil, teslim aldığınız anda farkı
            hissettirmektir.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */

function Gallery() {
  const items = [
    { src: heroImg, alt: "Dış yıkama sonrası parlak araç yüzeyi" },
    { src: interiorImg, alt: "Detaylı iç temizlik uygulaması" },
    { src: waxImg, alt: "Cila uygulaması sonrası boya yüzeyi" },
    { src: engineImg, alt: "Motor temizliği uygulaması" },
    { src: heroImg, alt: "Profesyonel oto yıkama ortamı" },
    { src: waxImg, alt: "Yansımalı temiz araç yüzeyi" },
  ];
  return (
    <section id="galeri" className="bg-surface-elevated py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Galeri"
            title="Çalışmalarımızdan Kareler"
          />
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-event="instagram_click"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <Instagram className="h-4 w-4" />
            Daha Fazlası İçin Instagram'da Bizi Takip Edin
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <figure
              key={i}
              className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-card ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover ${
                  i === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
                }`}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews (hidden if empty) ---------------- */

function Reviews() {
  if (!siteConfig.reviews.length) return null;
  return null;
}

/* ---------------- Appointment CTA ---------------- */

function AppointmentCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-dark p-8 text-on-dark shadow-elevated sm:p-14">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.7 0.2 45 / 0.35), transparent)",
          }}
        />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_auto]">
          <div>
            <h2 className="text-3xl font-bold text-on-dark sm:text-4xl">
              Aracınız İçin Uygun Zamanı Seçin
            </h2>
            <p className="mt-4 max-w-xl text-on-dark-muted">
              Randevunuzu oluşturun veya detaylı bilgi için WhatsApp üzerinden
              bize ulaşın.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AppointmentButton className="!px-6 !py-3.5 text-base" />
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={telHref()}
              data-event="phone_click"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-on-dark"
            >
              <Phone className="h-4 w-4" /> Telefon Et
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  return (
    <section id="sss" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="Sıkça Sorulan Sorular"
        title="Randevu ve Hizmetlerle İlgili Bilgi"
        description="Aklınızdaki yaygın soruların kısa yanıtları."
      />
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface shadow-card">
        {siteConfig.faqs.map((f, i) => (
          <details
            key={i}
            className="group px-5 py-4 sm:px-6"
            {...(i === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground">
              {f.question}
              <span
                aria-hidden
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-primary transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  return (
    <section id="iletisim" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="İletişim"
        title="Bize Ulaşmanın Kolay Yolu"
        description="Konya Selçuklu Mete Konakları'ndayız. WhatsApp'tan yazın ya da telefonla ulaşın."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" /> Telefon
          </div>
          <a
            href={telHref()}
            data-event="phone_click"
            className="mt-3 block text-xl font-semibold text-foreground hover:text-primary"
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={telHref()}
            data-event="phone_click"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Phone className="h-4 w-4" /> Ara
          </a>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> Adres
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            {siteConfig.address.full}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={siteConfig.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              <Navigation className="h-4 w-4" /> Yol Tarifi
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Instagram className="h-4 w-4 text-primary" /> Sosyal Medya
          </div>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-event="instagram_click"
            className="mt-3 block text-xl font-semibold text-foreground hover:text-primary"
          >
            {siteConfig.instagramHandle}
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-event="instagram_click"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold hover:bg-muted"
          >
            <Instagram className="h-4 w-4" /> Profili Aç
          </a>
        </article>
      </div>

      {/* Harita */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-card">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.full)}&output=embed&z=16`}
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Meteor Oto Yıkama Konum"
          className="block w-full"
        />
      </div>
      <div className="mt-4 text-center">
        <a
          href={siteConfig.mapsQuery}
          target="_blank"
          rel="noopener noreferrer"
          data-event="map_open_click"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <MapPin className="h-4 w-4" />
          Google Maps'te Aç
        </a>
      </div>

      {/* NAP (Name, Address, Phone) — SEO standardized */}
      <address className="mt-8 not-italic text-center text-sm text-muted-foreground">
        <strong className="text-foreground">{siteConfig.name}</strong>
        {" · "}
        <span>
          {siteConfig.address.neighborhood} {siteConfig.address.street},{" "}
          {siteConfig.address.postalCode} {siteConfig.address.district}/
          {siteConfig.address.city}
        </span>
        {" · "}
        <a href={telHref()} className="hover:text-primary">
          {siteConfig.phoneDisplay}
        </a>
      </address>

      {/* LocalBusiness JSON-LD is emitted via head() to avoid duplication */}
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Wordmark dark />
          <p className="mt-4 max-w-sm text-sm text-on-dark-muted">
            Selçuklu Konya'da aracınız için özenli iç ve dış temizlik
            hizmetleri.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={telHref()}
              data-event="phone_click"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-on-dark-muted">
            İletişim
          </div>
          <ul className="mt-4 space-y-2 text-sm text-on-dark-muted">
            <li>{siteConfig.address.full}</li>
            <li>
              <a href={telHref()} className="hover:text-on-dark">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-on-dark"
              >
                {siteConfig.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-on-dark-muted">
            Bilgi
          </div>
          <ul className="mt-4 space-y-2 text-sm text-on-dark-muted">
            <li>
              <a
                href={siteConfig.appointmentUrl || whatsappUrl()}
                target={siteConfig.appointmentUrl ? "_blank" : undefined}
                rel={siteConfig.appointmentUrl ? "noopener noreferrer" : undefined}
                className="hover:text-on-dark"
              >
                Randevu Al
              </a>
            </li>
            <li>
              <Link to="/kvkk" className="hover:text-on-dark">
                KVKK Aydınlatma Metni
              </Link>
            </li>
            <li>
              <Link to="/gizlilik-politikasi" className="hover:text-on-dark">
                Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link to="/cerez-politikasi" className="hover:text-on-dark">
                Çerez Politikası
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-on-dark-muted sm:flex-row sm:px-6">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </span>
          {siteConfig.agencyCredit && (
            <a
              href={siteConfig.agencyCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-on-dark"
            >
              {siteConfig.agencyCredit.label}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Mobile action bar ---------------- */

function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-event="whatsapp_click"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href={siteConfig.appointmentUrl || whatsappUrl()}
          target={siteConfig.appointmentUrl ? "_blank" : undefined}
          rel={siteConfig.appointmentUrl ? "noopener noreferrer" : undefined}
          data-event="appointment_click"
          className="flex min-h-11 flex-[1.4] items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Randevu Al <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

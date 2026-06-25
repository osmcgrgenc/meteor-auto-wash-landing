import { siteConfig } from "@/config/site.config";

const SITE_URL = "https://meteor-shine-hub.lovable.app";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "@id": `${SITE_URL}/#business`,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    image: `${SITE_URL}/og-image.jpg`,
    url: `${SITE_URL}/`,
    telephone: siteConfig.phoneTel,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: "TRY",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.district,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.mapsQuery,
    areaServed: [
      { "@type": "City", name: "Konya" },
      { "@type": "AdministrativeArea", name: "Selçuklu" },
    ],
    sameAs: [siteConfig.instagram],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

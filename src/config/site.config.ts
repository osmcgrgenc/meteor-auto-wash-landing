export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: "wash" | "interior" | "wheels" | "seats" | "polish" | "protect";
  active: boolean;
  draft?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  source?: "google" | "instagram" | "manual";
}

const APPOINTMENT_URL = (import.meta.env.VITE_APPOINTMENT_URL as string | undefined) ?? "";
const WHATSAPP_NUMBER =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "905309581333";
const INSTAGRAM_URL =
  (import.meta.env.VITE_INSTAGRAM_URL as string | undefined) ??
  "https://www.instagram.com/meteorotoyikama";

export const siteConfig = {
  name: "Meteor Oto Yıkama",
  tagline: "Aracınız Temizliğin En İyisini Hak Ediyor",
  shortDescription: "Selçuklu Konya'da aracınız için özenli iç ve dış temizlik hizmetleri.",
  phoneDisplay: "0530 958 13 33",
  phoneTel: "+905309581333",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappMessage: "Merhaba Meteor Oto Yıkama, aracım için randevu almak istiyorum.",
  appointmentUrl: APPOINTMENT_URL,
  instagram: INSTAGRAM_URL,
  instagramHandle: "@meteorotoyikama",
  address: {
    full: "Selahaddin Eyyubi Mah. Elyesa Sk. Mete Konakları, Selçuklu / Konya",
    street: "Elyesa Sk. Mete Konakları",
    neighborhood: "Selahaddin Eyyubi Mahallesi",
    district: "Selçuklu",
    city: "Konya",
    region: "Konya",
    postalCode: "42130",
    country: "TR",
  },
  geo: {
    latitude: 37.9616,
    longitude: 32.4599,
  },
  mapsQuery:
    "https://www.google.com/maps/search/?api=1&query=Selahaddin+Eyyubi+Mahallesi+Elyesa+Sokak+Mete+Konaklari+Selcuklu+Konya",
  // Optional, only shown if filled
  hours: undefined as string | undefined,
  priceRange: "₺₺",
  nav: [
    { label: "Ana Sayfa", href: "#anasayfa" },
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Neden Biz?", href: "#neden-biz" },
    { label: "Galeri", href: "#galeri" },
    { label: "İletişim", href: "#iletisim" },
  ],
  trustItems: ["Kolay Randevu", "Özenli Temizlik", "Modern Ekipman", "Selçuklu'da Merkezi Konum"],
  services: [
    {
      id: "ic-dis-yikama",
      title: "İç ve Dış Yıkama",
      description: "Aracınızın iç ve dış yüzeylerinin özenli temizliği.",
      icon: "wash",
      active: true,
      draft: true,
    },
    {
      id: "ic-detayli",
      title: "Detaylı İç Temizlik",
      description: "Koltuk, tavan ve plastik aksamların derinlemesine temizliği.",
      icon: "interior",
      active: true,
      draft: true,
    },
    {
      id: "jant-lastik",
      title: "Jant ve Lastik Temizliği",
      description: "Jant ve lastik yüzeylerinin profesyonel bakımı.",
      icon: "wheels",
      active: true,
      draft: true,
    },
    {
      id: "koltuk-doseme",
      title: "Koltuk ve Döşeme Temizliği",
      description: "Kumaş ve deri yüzeyler için uygun ürünlerle bakım.",
      icon: "seats",
      active: true,
      draft: true,
    },
    {
      id: "pasta-cila",
      title: "Pasta Cila",
      description: "Boyaya parlaklık kazandıran el uygulaması.",
      icon: "polish",
      active: true,
      draft: true,
    },
    {
      id: "boya-koruma",
      title: "Boya Koruma",
      description: "Dış yüzeyde uzun ömürlü koruyucu uygulama.",
      icon: "protect",
      active: true,
      draft: true,
    },
  ] as ServiceItem[],
  reviews: [] as Review[],
  faqs: [
    {
      question: "Randevu nasıl alabilirim?",
      answer:
        "WhatsApp üzerinden +90 530 958 13 33 numarasına yazarak veya doğrudan telefonla arayarak hızlıca randevu oluşturabilirsiniz. Genellikle aynı gün içinde uygun saat sunuyoruz.",
    },
    {
      question: "Hizmet süresi ne kadar?",
      answer:
        "İç-dış yıkama yaklaşık 45-60 dakika sürer. Detaylı iç temizlik, pasta cila ve boya koruma uygulamaları araç büyüklüğüne göre 2-5 saat arasında değişir.",
    },
    {
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer: "Nakit, kredi kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm kartlar geçerlidir.",
    },
    {
      question: "Konumunuz nerede?",
      answer:
        "Selahaddin Eyyubi Mahallesi Elyesa Sokak Mete Konakları, Selçuklu / Konya adresindeyiz. Google Maps üzerinden tek tıkla yol tarifi alabilirsiniz.",
    },
    {
      question: "Beklemeden hizmet alabilir miyim?",
      answer:
        "Randevulu müşterilerimizi öncelikli alıyoruz. Randevusuz gelmeniz hâlinde yoğunluğa bağlı olarak kısa bir bekleme olabilir; önceden iletişime geçmenizi öneririz.",
    },
  ],
  agencyCredit: undefined as { label: string; url: string } | undefined,
};

export type SiteConfig = typeof siteConfig;

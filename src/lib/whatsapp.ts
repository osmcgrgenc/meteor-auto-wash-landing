import { siteConfig } from "@/config/site.config";

export function whatsappUrl(message: string = siteConfig.whatsappMessage): string {
  const num = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${siteConfig.phoneTel}`;
}

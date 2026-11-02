import { company } from "@/lib/data";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Scrolls after a dialog closes, when the native anchor jump would be blocked by it. */
export function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView();
  history.pushState(null, "", href);
}

/** Real public URL once configured. Null while the site is still a demo. */
export const liveSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;

/** Canonical URL placeholder used until a domain is approved. */
export const siteUrl = liveSiteUrl ?? "https://www.example.com";

/** True only when a real destination for enquiries has been configured. */
export function isEnquiryDeliveryConfigured() {
  return Boolean(process.env.ENQUIRY_WEBHOOK_URL);
}

/**
 * Click-to-chat link with a prepared message. Without a verified business number,
 * wa.me still opens WhatsApp with the message and lets the visitor choose a chat.
 */
export function whatsappUrl(projectName?: string) {
  const subject = projectName ? ` about ${projectName}` : "";
  const text = `Hello ${company.name}, I would like to enquire${subject}. Please share more details.`;
  const number = company.whatsappNumber?.replace(/\D/g, "") ?? "";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

const mapsQuery = encodeURIComponent(company.map.query);
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

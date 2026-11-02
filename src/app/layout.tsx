import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { company } from "@/lib/data";
import { liveSiteUrl, siteUrl } from "@/lib/utils";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "JK Infra & Developers | Real Estate Development in Poranki, Andhra Pradesh";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: company.description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  // Demo deployments stay out of search until NEXT_PUBLIC_SITE_URL is set.
  robots: liveSiteUrl ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: company.name,
    title,
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: company.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#071629",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}

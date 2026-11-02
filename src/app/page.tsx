import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { EnquiryProvider } from "@/components/EnquiryProvider";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { company } from "@/lib/data";
import { isEnquiryDeliveryConfigured, liveSiteUrl } from "@/lib/utils";

/** Only verified details are published. Unset values are dropped by JSON.stringify. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  slogan: company.tagline,
  description: company.description,
  url: liveSiteUrl ?? undefined,
  telephone: company.phone ?? undefined,
  email: company.email ?? undefined,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.streetAddress,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
};

export default function HomePage() {
  return (
    <MotionProvider>
      <EnquiryProvider>
        <a
          href="#main"
          className="label sr-only z-60 bg-gold px-5 py-3 text-navy-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Projects />
          <WhyChooseUs />
          <Gallery />
          <Contact enquiriesLive={isEnquiryDeliveryConfigured()} />
        </main>
        <Footer />
      </EnquiryProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c"),
        }}
      />
    </MotionProvider>
  );
}

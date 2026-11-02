import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { EnquiryFormLoader } from "@/components/EnquiryFormLoader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { company, contactSection } from "@/lib/data";
import { mapsEmbedUrl, mapsLinkUrl } from "@/lib/utils";

export function Contact({ enquiriesLive }: { enquiriesLive: boolean }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="contact-heading"
              index="05"
              eyebrow="Contact"
              title={contactSection.heading}
              intro={contactSection.intro}
            />

            <address className="mt-10 border-t border-gold/60 pt-6 not-italic">
              <p className="font-display text-xl text-navy-950">{company.name}</p>
              <p className="mt-3 flex gap-3 leading-relaxed text-ink/80">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-deep" />
                <span>
                  {company.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              {company.phone && (
                <p className="mt-3 flex items-center gap-3 text-ink/80">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-gold-deep" />
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-gold-deep">
                    {company.phone}
                  </a>
                </p>
              )}
              {company.email && (
                <p className="mt-3 flex items-center gap-3 text-ink/80">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-deep" />
                  <a href={`mailto:${company.email}`} className="hover:text-gold-deep">
                    {company.email}
                  </a>
                </p>
              )}
            </address>

            <div className="mt-8">
              <WhatsAppButton className="btn btn-gold w-full sm:w-auto" />
              {!company.whatsappNumber && (
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  Opens WhatsApp with a prepared message. The business number will be added once
                  verified.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <EnquiryFormLoader enquiriesLive={enquiriesLive} />
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <div className="relative h-80 overflow-hidden border border-gold/40 bg-navy-900 lg:h-[26rem]">
            <iframe
              title={
                company.map.verified
                  ? `Map showing the ${company.name} office`
                  : `Map of the Poranki area, where the ${company.name} office is located`
              }
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
          <div className="mt-2 flex flex-col gap-x-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={mapsLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-11 items-center gap-2 text-gold-deep hover:text-navy-950"
            >
              Open in Google Maps
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
            {!company.map.verified && (
              <p className="text-sm text-ink/70">
                Map shows the Poranki area. The exact office location will be pinned once verified.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

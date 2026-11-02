import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { about } from "@/lib/data";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section overflow-hidden">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="relative mr-4 mb-4 sm:mr-6 sm:mb-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 border border-gold sm:translate-x-6 sm:translate-y-6"
            />
            <div className="crop-marks relative aspect-[4/5] overflow-hidden bg-navy-900">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              id="about-heading"
              index="01"
              eyebrow="About Us"
              title={about.heading}
            />
            <div className="mt-7 max-w-2xl space-y-5 text-lg leading-relaxed text-ink/80">
              {about.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {about.pillars.map(({ title, body }, index) => (
              <Reveal key={title} delay={index * 0.06} className="border-t border-gold/60 pt-5">
                <dt className="font-display text-xl text-navy-950">{title}</dt>
                <dd className="mt-2 leading-relaxed text-ink/75">{body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

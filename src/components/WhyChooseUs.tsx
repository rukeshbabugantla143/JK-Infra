import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { whyChooseUs } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" aria-labelledby="why-heading" className="section">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="why-heading"
            index="03"
            eyebrow="Why Choose Us"
            title={whyChooseUs.heading}
            intro={whyChooseUs.intro}
          />
        </Reveal>

        <ul className="mt-14 grid gap-px border border-gold/35 bg-gold/35 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {whyChooseUs.features.map(({ title, body, icon: Icon }, index) => (
            <li key={title} className="bg-paper">
              <Reveal delay={(index % 3) * 0.06} className="h-full">
                <article className="group relative h-full overflow-hidden p-8 transition-colors duration-500 hover:bg-white lg:p-10">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100"
                  />
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-9 text-gold-deep transition-transform duration-500 ease-luxe group-hover:-translate-y-1"
                  />
                  <h3 className="mt-6 text-2xl text-navy-950">{title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/75">{body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

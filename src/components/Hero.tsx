import Image from "next/image";
import { company, hero } from "@/lib/data";

/** Entrance motion is CSS only, so the heading paints without waiting for hydration. */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-950 text-white"
    >
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        preload
        // object-cover scales to the height below 16:9. Phones see a crop, so 700px stays sharp there.
        sizes="(max-width: 767px) 700px, (max-aspect-ratio: 16/9) 178vh, 100vw"
        className="hero-settle -z-20 object-cover object-[76%_60%] lg:object-[50%_60%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_22_41/0.72)_0%,rgb(7_22_41/0.5)_45%,rgb(7_22_41/0.9)_100%)] lg:bg-[linear-gradient(90deg,rgb(7_22_41/0.92)_0%,rgb(7_22_41/0.68)_42%,rgb(7_22_41/0.12)_78%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-36 bg-[linear-gradient(180deg,rgb(7_22_41/0.8),transparent)]"
      />

      <div className="container-site flex flex-1 flex-col justify-center pt-32 pb-10">
        <p className="rise label flex items-center gap-4 text-gold-light">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          {company.tagline}
        </p>
        <h1
          id="hero-heading"
          className="mt-7 text-[9.6vw] leading-[1.08] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
        >
          <span className="rise block [animation-delay:60ms]">{hero.headingLead}</span>
          <span className="rise block text-gold-light italic [animation-delay:120ms]">
            {hero.headingAccent}
          </span>
        </h1>
        <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-white/85 [animation-delay:200ms] sm:text-xl">
          {hero.subheading}
        </p>
        <div className="rise mt-10 flex flex-col gap-4 [animation-delay:280ms] sm:flex-row">
          <a href="#projects" className="btn btn-gold">
            Explore Projects
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Us
          </a>
        </div>
      </div>

      <div className="container-site flex items-end justify-between pb-7">
        <a href="#about" className="group flex items-center gap-4 text-white/80 hover:text-white">
          <span
            aria-hidden="true"
            className="relative block h-12 w-px overflow-hidden bg-white/25"
          >
            <span className="plumb absolute inset-0 bg-gold-light" />
          </span>
          <span className="label">Scroll</span>
        </a>
        <p className="label text-right text-[0.625rem] text-white/60">Sample visual</p>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { gallery, gallerySection } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

const layoutClass: Record<GalleryItem["layout"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  standard: "",
};

const layoutSizes: Record<GalleryItem["layout"], string> = {
  tall: "(min-width: 1024px) 25vw, 50vw",
  wide: "(min-width: 1024px) 50vw, 100vw",
  standard: "(min-width: 1024px) 25vw, 50vw",
};

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = gallery.length;
  const close = () => setOpenIndex(null);
  const step = (delta: number) =>
    setOpenIndex((index) => (index === null ? null : (index + delta + count) % count));
  const current = openIndex === null ? null : gallery[openIndex];

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="section bg-navy-950 text-white">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="gallery-heading"
            index="04"
            eyebrow="Gallery"
            title={gallerySection.heading}
            intro={gallerySection.intro}
            tone="dark"
          />
        </Reveal>

        <ul className="mt-14 grid auto-rows-[10rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[15rem] lg:mt-16 lg:auto-rows-[clamp(14rem,21vw,19rem)] lg:grid-cols-4 lg:gap-4">
          {gallery.map((item, index) => (
            <li key={item.src} className={layoutClass[item.layout]}>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open image: ${item.caption}`}
                onClick={() => setOpenIndex(index)}
                className="group relative block size-full overflow-hidden bg-navy-900"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={layoutSizes[item.layout]}
                  className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105 motion-reduce:transform-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy-950/0 transition-colors duration-500 group-hover:bg-navy-950/35"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-[linear-gradient(0deg,rgb(7_22_41/0.88),transparent)] px-3 pt-10 pb-3 text-left transition-opacity duration-500 lg:px-5 lg:pb-4 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
                >
                  <span className="font-display text-sm text-white sm:text-base lg:text-lg">
                    {item.caption}
                  </span>
                  <Expand className="hidden size-4 shrink-0 text-gold-light sm:block" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {current && openIndex !== null && (
          <Dialog
            label="Image viewer"
            onClose={close}
            className="bg-navy-950/95 text-white"
          >
            <div
              className="relative flex h-full flex-col"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") step(1);
                if (event.key === "ArrowLeft") step(-1);
              }}
            >
              <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
                <p aria-live="polite" className="label text-white/70">
                  {openIndex + 1} / {count}
                </p>
                <button
                  type="button"
                  aria-label="Close image viewer"
                  onClick={close}
                  className="-mr-2 grid size-11 place-items-center hover:text-gold-light"
                >
                  <X aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div
                className="relative min-h-0 flex-1"
                onClick={(event) => {
                  if (event.target === event.currentTarget) close();
                }}
              >
                <m.div
                  key={current.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-x-2 inset-y-0 sm:inset-x-20"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </m.div>
                <LightboxArrow label="Previous image" side="left" onClick={() => step(-1)} />
                <LightboxArrow label="Next image" side="right" onClick={() => step(1)} />
              </div>

              <p className="shrink-0 px-6 py-4 text-center">
                <span className="font-display text-lg">{current.caption}</span>
                <span className="label ml-3 text-[0.625rem] text-gold-light">Sample visual</span>
              </p>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}

interface LightboxArrowProps {
  label: string;
  side: "left" | "right";
  onClick: () => void;
}

function LightboxArrow({ label, side, onClick }: LightboxArrowProps) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-gold/40 bg-navy-950/70 transition-colors hover:border-gold hover:text-gold-light",
        side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5",
      )}
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}

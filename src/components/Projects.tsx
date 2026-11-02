"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { useEnquiry } from "@/components/EnquiryProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects, projectsSection } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";
import type { Project } from "@/types";

function SampleBadge() {
  return <span className="label bg-gold px-3 py-1.5 text-[0.625rem] text-navy-950">Sample project</span>;
}

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const { setProject } = useEnquiry();
  const goToContact = useRef(false);

  function enquire(project: Project) {
    setProject(project.name);
    goToContact.current = true;
    setOpenProject(null);
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section bg-navy-950 text-white"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="projects-heading"
            index="02"
            eyebrow="Projects"
            title={projectsSection.heading}
            intro={projectsSection.intro}
            tone="dark"
          />
        </Reveal>

        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <article className="group flex h-full flex-col border border-gold/25 bg-navy-900 transition-colors duration-500 hover:border-gold/70">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105 motion-reduce:transform-none"
                    />
                    {project.isSample && (
                      <div className="absolute top-4 left-4">
                        <SampleBadge />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <p className="label text-gold-light">{project.type}</p>
                    <h3 className="mt-3 text-2xl">{project.name}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
                      <MapPin aria-hidden="true" className="size-4 text-gold" />
                      {project.location}
                    </p>
                    <p className="mt-4 flex-1 leading-relaxed text-white/75">{project.summary}</p>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-label={`View details for ${project.name}`}
                      onClick={() => setOpenProject(project)}
                      className="label mt-4 flex min-h-11 items-center gap-3 self-start text-gold-light transition-colors hover:text-white"
                    >
                      View Details
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          if (goToContact.current) scrollToSection("#contact");
          goToContact.current = false;
        }}
      >
        {openProject && (
          <Dialog
            label={`${openProject.name} details`}
            onClose={() => setOpenProject(null)}
            className="grid place-items-center overflow-y-auto bg-navy-950/85 p-4 text-white sm:p-8"
          >
            <m.div
              initial={{ y: 24 }}
              animate={{ y: 0 }}
              exit={{ y: 12, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl border border-gold/40 bg-navy-900"
            >
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setOpenProject(null)}
                className="absolute top-3 right-3 z-10 grid size-11 place-items-center bg-navy-950/75 text-white hover:text-gold-light"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
              <div className="relative aspect-[16/9] bg-navy-950">
                <Image
                  src={openProject.image.src}
                  alt={openProject.image.alt}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
                {openProject.isSample && (
                  <div className="absolute top-4 left-4">
                    <SampleBadge />
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-9">
                <p className="label text-gold-light">{openProject.type}</p>
                <h3 className="mt-3 text-3xl">{openProject.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
                  <MapPin aria-hidden="true" className="size-4 text-gold" />
                  {openProject.location}
                </p>
                <div className="mt-5 space-y-3 leading-relaxed text-white/80">
                  {openProject.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => enquire(openProject)}
                  className="btn btn-gold mt-8"
                >
                  Enquire About This Project
                </button>
              </div>
            </m.div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}

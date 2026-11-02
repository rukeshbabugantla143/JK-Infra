"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { Logo } from "@/components/Logo";
import { company, navLinks } from "@/lib/data";
import { cn, scrollToSection } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { href } of navLinks) {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  function goFromMenu(event: React.MouseEvent, href: string) {
    event.preventDefault();
    pendingSection.current = href;
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-luxe",
        scrolled ? "bg-navy-950 shadow-[0_1px_0_0_rgb(201_154_72/0.35)]" : "bg-transparent",
      )}
    >
      <nav aria-label="Main" className="container-site flex h-20 items-center justify-between gap-6">
        <a href="#home" aria-label={`${company.name}, back to top`} className="shrink-0 py-1">
          <Logo preload className="h-9 w-auto sm:h-10" />
        </a>

        <div className="hidden items-center gap-8 xl:gap-10 lg:flex">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={active === href ? "true" : undefined}
                  className={cn(
                    "group relative inline-block py-2 text-sm whitespace-nowrap transition-colors duration-300",
                    active === href ? "text-gold-light" : "text-white/85 hover:text-white",
                  )}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-luxe",
                      active === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-gold min-h-11 px-5">
            Enquire Now
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={() => setMenuOpen(true)}
          className="-mr-2 grid size-11 place-items-center text-white lg:hidden"
        >
          <Menu aria-hidden="true" className="size-6" />
        </button>
      </nav>

      <AnimatePresence
        onExitComplete={() => {
          if (pendingSection.current) scrollToSection(pendingSection.current);
          pendingSection.current = null;
        }}
      >
        {menuOpen && (
          <Dialog label="Main menu" onClose={() => setMenuOpen(false)} className="text-white">
            <div className="flex h-full flex-col overflow-y-auto bg-navy-950">
              <div className="container-site flex h-20 shrink-0 items-center justify-between">
                <Logo className="h-9 w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="-mr-2 grid size-11 place-items-center"
                >
                  <X aria-hidden="true" className="size-6" />
                </button>
              </div>
              <ul className="container-site mt-6 flex-1">
                {navLinks.map(({ href, label }, index) => (
                  <m.li
                    key={href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-gold/20"
                  >
                    <a
                      href={href}
                      onClick={(event) => goFromMenu(event, href)}
                      className="flex items-baseline gap-5 py-4 font-display text-3xl"
                    >
                      <span aria-hidden="true" className="label text-gold-light">
                        0{index + 1}
                      </span>
                      {label}
                    </a>
                  </m.li>
                ))}
              </ul>
              <div className="container-site shrink-0 pt-8 pb-10">
                <a
                  href="#contact"
                  onClick={(event) => goFromMenu(event, "#contact")}
                  className="btn btn-gold w-full"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
}

import { Logo } from "@/components/Logo";
import { company, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-site">
        <p className="border-b border-gold/25 py-14 lg:py-20">
          <span className="label block text-gold-light">{company.name}</span>
          <span className="mt-4 block font-display text-[2.5rem] leading-tight tracking-[0.03em] uppercase sm:text-6xl lg:text-7xl">
            {company.tagline}
            <span className="text-gold">.</span>
          </span>
        </p>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" aria-label={`${company.name}, back to top`} className="inline-block py-1">
              <Logo className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">
              A real estate development brand in Poranki, Krishna District.
            </p>
            {company.social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-5">
                {company.social.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-light hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer">
            <p className="label text-gold-light">Quick Links</p>
            <ul className="mt-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-block py-2.5 text-white/75 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-gold-light">Office</p>
            <address className="mt-5 leading-relaxed text-white/75 not-italic">
              {company.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {company.phone && (
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="mt-4 block hover:text-white"
                >
                  {company.phone}
                </a>
              )}
              {company.email && (
                <a href={`mailto:${company.email}`} className="mt-1 block hover:text-white">
                  {company.email}
                </a>
              )}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-gold/25 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Demo website. Projects and images shown are sample content.</p>
        </div>
      </div>
    </footer>
  );
}

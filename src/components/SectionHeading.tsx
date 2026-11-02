import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Use "dark" on navy backgrounds. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <header className={cn("max-w-3xl", className)}>
      <p className={cn("label flex items-center gap-4", dark ? "text-gold-light" : "text-gold-deep")}>
        <span aria-hidden="true">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-gold" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-6 text-4xl leading-[1.12] sm:text-5xl lg:text-[3.5rem]",
          dark ? "text-white" : "text-navy-950",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-6 text-lg leading-relaxed", dark ? "text-white/72" : "text-ink/78")}>
          {intro}
        </p>
      )}
    </header>
  );
}

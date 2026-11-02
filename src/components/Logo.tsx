import Image from "next/image";
import { company } from "@/lib/data";

interface LogoProps {
  className?: string;
  /** Set for the navbar logo, which is above the fold on every device. */
  preload?: boolean;
}

/** Swap public/logo/jk-logo.svg for the supplied artwork; this placeholder is type only. */
export function Logo({ className, preload }: LogoProps) {
  return (
    <Image
      src="/logo/jk-logo.svg"
      alt={company.name}
      width={312}
      height={64}
      preload={preload}
      className={className}
    />
  );
}

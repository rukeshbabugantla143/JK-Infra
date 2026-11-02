import type { LucideIcon } from "lucide-react";

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface Address {
  lines: string[];
  singleLine: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

export interface Company {
  name: string;
  tagline: string;
  description: string;
  address: Address;
  /** Leave these null until the client has verified them. Empty values are never rendered. */
  phone: string | null;
  email: string | null;
  whatsappNumber: string | null;
  /** What the map shows: a place name, Plus Code or "lat,lng". Never search by company name. */
  map: { query: string; verified: boolean };
  social: { label: string; href: string }[];
}

export interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  summary: string;
  details: string[];
  image: ImageAsset;
  /** Sample cards are always badged as demo content. Set to false for real, verified projects. */
  isSample: boolean;
}

export interface Pillar {
  title: string;
  body: string;
}

export interface Feature {
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface GalleryItem extends ImageAsset {
  caption: string;
  /** Grid footprint at desktop widths. */
  layout: "wide" | "tall" | "standard";
}

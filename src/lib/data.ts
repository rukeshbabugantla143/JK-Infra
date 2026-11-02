import {
  Compass,
  Handshake,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Company, Feature, GalleryItem, NavLink, Pillar, Project } from "@/types";

/**
 * Central content for the website. Edit this file to change what the site says.
 *
 * Contact details come from environment variables (see .env.example), so unverified
 * values can never ship by accident. Do not hard-code a phone number or email here
 * unless the client has confirmed it.
 */
export const company: Company = {
  name: "JK Infra & Developers",
  tagline: "Build the Trust",
  description:
    "Discover JK Infra & Developers in Poranki, Krishna District. Explore our real estate vision and connect with us for property enquiries.",
  address: {
    lines: [
      "D. No. 7-34, Ground Floor,",
      "Krishna Veni School Road,",
      "Penamaluru (Mdl), Poranki – 521137,",
      "Krishna District, Andhra Pradesh.",
    ],
    singleLine:
      "D. No. 7-34, Ground Floor, Krishna Veni School Road, Penamaluru (Mdl), Poranki – 521137, Krishna District, Andhra Pradesh",
    streetAddress: "D. No. 7-34, Ground Floor, Krishna Veni School Road",
    locality: "Poranki",
    region: "Andhra Pradesh",
    postalCode: "521137",
    countryCode: "IN",
  },
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  // Google cannot resolve the street address: it lands on a same-named road in Vijayawada, and
  // searching by company name returns another business. Until the office's Plus Code or
  // coordinates are confirmed, the map shows the locality. Then set verified: true.
  map: { query: "Poranki, Andhra Pradesh 521137", verified: false },
  // Add verified profiles here, e.g. { label: "Instagram", href: "https://..." }
  social: [],
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headingLead: "Building Dreams.",
  headingAccent: "Creating Landmarks.",
  subheading:
    "Discover opportunities with JK Infra & Developers, where trust, transparency and thoughtful development come together.",
  image: {
    src: "/images/hero.webp",
    alt: "Sample architectural visual of a residential tower at dusk, reflected in still water",
  },
};

export const about = {
  heading: "Building Trust, One Project at a Time.",
  intro: [
    "JK Infra & Developers is a real estate development brand based in Poranki, Krishna District. We work with families, home buyers and investors who want to make a property decision with confidence.",
    "A property is one of the most important decisions a person makes. That is why we believe every conversation should start with clear information and an honest answer.",
  ],
  pillars: [
    {
      title: "Our Vision",
      body: "To be a name people in Krishna District and beyond associate with trust in real estate.",
    },
    {
      title: "Our Mission",
      body: "To create well-considered developments and guide every customer with clarity at each step.",
    },
    {
      title: "Commitment to Transparency",
      body: "Clear information, plainly explained, so you can make your decision with confidence.",
    },
    {
      title: "Customer-First Approach",
      body: "We start with your needs and your questions, and we shape the conversation around them.",
    },
  ] satisfies Pillar[],
  image: {
    src: "/images/about.webp",
    alt: "Sample architectural visual of the corner of a residential building, its floors lit from within",
  },
};

export const projectsSection = {
  heading: "Explore Our Developments",
  intro:
    "The three cards below are sample layouts that show how projects will be presented. They are demo content, not real developments.",
};

/**
 * Sample cards only. To publish a real project, replace an entry with verified details
 * and set `isSample: false`, which removes the demo badge.
 */
export const projects: Project[] = [
  {
    id: "sample-plots",
    name: "Sample Project One",
    location: "Sample location",
    type: "Residential Plots",
    summary:
      "A placeholder card showing how a plotted residential development could be presented.",
    details: [
      "This entry is demo content and does not describe a real development.",
      "Plot sizes, approvals, amenities and availability will appear here once verified project details are supplied.",
    ],
    image: {
      src: "/images/project-plots.webp",
      alt: "Sample aerial visual of a plotted residential layout with tree-lined roads",
    },
    isSample: true,
  },
  {
    id: "sample-villas",
    name: "Sample Project Two",
    location: "Sample location",
    type: "Family Homes",
    summary:
      "A placeholder card showing how a residential community of family homes could be presented.",
    details: [
      "This entry is demo content and does not describe a real development.",
      "Floor plans, specifications and availability will appear here once verified project details are supplied.",
    ],
    image: {
      src: "/images/project-villas.webp",
      alt: "Sample visual of a street of contemporary family homes at dusk",
    },
    isSample: true,
  },
  {
    id: "sample-community",
    name: "Sample Project Three",
    location: "Sample location",
    type: "Residential Development",
    summary:
      "A placeholder card showing how a larger residential development could be presented.",
    details: [
      "This entry is demo content and does not describe a real development.",
      "Master plans, approvals and amenities will appear here once verified project details are supplied.",
    ],
    image: {
      src: "/images/project-gateway.webp",
      alt: "Sample visual of a stone entrance gateway opening onto a tree-lined avenue",
    },
    isSample: true,
  },
];

export const whyChooseUs = {
  heading: "Why Choose JK Infra & Developers?",
  intro: "Six principles that shape how we work with every customer.",
  features: [
    {
      title: "Trust & Transparency",
      body: "We aim to share clear information so you always know where you stand.",
      icon: ShieldCheck,
    },
    {
      title: "Customer-Centric Approach",
      body: "Your needs and your questions set the direction of every conversation.",
      icon: Users,
    },
    {
      title: "Quality Commitment",
      body: "We care about the details that make a development worth your investment.",
      icon: Scale,
    },
    {
      title: "Thoughtful Development",
      body: "We believe good development starts with careful planning and respect for place.",
      icon: Compass,
    },
    {
      title: "Clear Communication",
      body: "Straightforward answers, in plain language, whenever you need them.",
      icon: MessagesSquare,
    },
    {
      title: "Long-Term Relationships",
      body: "We see every customer as the start of a relationship, not a single transaction.",
      icon: Handshake,
    },
  ] satisfies Feature[],
};

export const gallerySection = {
  heading: "A Glimpse of Our Vision",
  intro:
    "Sample architectural visuals that set the mood. These will be replaced with real project photographs as they become available.",
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/gallery-facade.webp",
    alt: "Sample visual of a residential tower rising above a low podium at dusk",
    caption: "Rising form",
    layout: "tall",
  },
  {
    src: "/images/villa.webp",
    alt: "Sample visual of a two-storey contemporary home beside a pool",
    caption: "Home by the water",
    layout: "wide",
  },
  {
    src: "/images/gallery-colonnade.webp",
    alt: "Sample visual of a stone colonnade with polished floors beside a reflecting pool",
    caption: "Stone colonnade",
    layout: "standard",
  },
  {
    src: "/images/gallery-lobby.webp",
    alt: "Sample visual of a double-height lobby with a golden fin wall and marble floor",
    caption: "Arrival lobby",
    layout: "standard",
  },
  {
    src: "/images/gallery-boulevard.webp",
    alt: "Sample visual of a tree-lined residential street at dusk",
    caption: "Residential street",
    layout: "standard",
  },
  {
    src: "/images/gallery-courtyard.webp",
    alt: "Sample visual of a water courtyard with stepping stones and a single tree",
    caption: "Water courtyard",
    layout: "standard",
  },
];

export const contactSection = {
  heading: "Let's Build Your Future Together.",
  intro: "Tell us what you are looking for, and we will take the conversation from there.",
  /** Options in the "Interested Project" field, alongside the project list. */
  generalEnquiry: "General enquiry",
};

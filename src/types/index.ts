export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SummitHighlight {
  id: string;
  icon: string;
  heroImage?: string;
  title: string;
  description: string;
  tagline?: string;
  body?: string[];
  keyBenefits?: string[];
  whoFor?: string[];
}

export interface ImpactFact {
  value: string;
  label: string;
  description: string;
}

export interface WhyAttendItem {
  text: string;
}

export interface Speaker {
  id: string;
  name: string | null;
  role: string | null;
  organization: string | null;
  country: string | null;
  image: string | null;
  bio: string | null;
  featured: boolean;
}

export interface TicketPackage {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge: string | null;
  passSlug: string;
}

export interface AttendeeType {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactDetails {
  email: string;
  phones: { label: string; number: string; display: string }[];
  website: string;
  websiteDisplay: string;
  venueShort: string;
  venueFull: string;
}

export interface PartnerPlaceholder {
  id: string;
  label: string;
  image: string | null;
}

export interface AgendaSession {
  time: string;
  title: string;
  description: string;
  tag?: "Keynote" | "Panel";
}

export interface AgendaDay {
  id: string;
  date: string;
  weekday: string;
  label: string;
  theme: string;
  flagship?: boolean;
  sessions: AgendaSession[];
}

export interface MediaConfig {
  heroImage: string | null;
  heroImageAlt: string;
  trailerVideoUrl: string | null;
  trailerPoster: string | null;
  aboutVideoUrl: string | null;
  aboutPoster: string | null;
  venueImage: string | null;
  factoryVisitImage: string | null;
  matchmakingImage: string | null;
}

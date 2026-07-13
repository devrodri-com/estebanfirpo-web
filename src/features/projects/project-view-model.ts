import type { Locale } from "@/i18n/config";

export type CanonicalProjectMetric = {
  id: string;
  label?: string;
  value: string;
};

export type CanonicalProjectImage = {
  src: string;
  alt: string;
};

export type CanonicalProjectFaq = {
  id: string;
  question: string;
  answer: string;
};

export type CanonicalProjectPayment =
  | { kind: "steps"; steps: string[] }
  | { kind: "request"; copy: string };

export type CanonicalProjectViewModel = {
  locale: Locale;
  identity: {
    id: string;
    slug: string;
    name: string;
    publicPath: string;
    canonicalUrl: string;
  };
  location: {
    display: string;
    mapQuery: string;
    interactiveMap: boolean;
    structuredAddress?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
  hero: CanonicalProjectImage;
  decisions: {
    price: string;
    delivery: string;
    rental: string;
    condition: string;
    note: string;
  };
  metrics: {
    items: CanonicalProjectMetric[];
    note: string;
  };
  gallery: CanonicalProjectImage[];
  highlights: string[];
  unitTypes: string[];
  features: string[];
  faqs: CanonicalProjectFaq[];
  payment: CanonicalProjectPayment;
  contact: {
    whatsappHref: string;
    calendarHref: string;
    emailHref: string;
    plansHref: string;
    availabilityHref: string;
    materialsHref: string;
    paymentPlanHref: string;
    shareUrl: string;
  };
  disclaimer: string;
};

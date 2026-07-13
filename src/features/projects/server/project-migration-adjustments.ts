import "server-only";

import type { Locale } from "@/i18n/config";
import type { CanonicalProjectMetric } from "../project-view-model";

type LocalizedText = Record<Locale, string>;

export type ProjectMigrationAdjustment = {
  price?: LocalizedText;
  delivery?: LocalizedText;
  rental?: LocalizedText;
  condition?: LocalizedText;
  decisionsNote?: LocalizedText;
  metrics?: Record<Locale, CanonicalProjectMetric[]>;
  metricsNote?: LocalizedText;
  paymentRequest?: true;
  structuredAddress?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  faqAnswerOverrides?: Record<Locale, Record<string, string>>;
};

const SUBJECT_TO_CONFIRMATION = {
  es: "2025 · sujeta a confirmación",
  en: "2025 · subject to confirmation",
} as const;

export const projectMigrationAdjustments: Partial<
  Record<string, ProjectMigrationAdjustment>
> = {
  "/proyectos/72-park": {
    delivery: SUBJECT_TO_CONFIRMATION,
    condition: {
      es: "Paquetes de amueblado opcionales disponibles",
      en: "Optional furnishing packages available",
    },
  },
  "/proyectos/cassia": {
    price: {
      es: "Consultar precio e inventario vigente",
      en: "Inquire about current pricing and inventory",
    },
    faqAnswerOverrides: {
      es: {
        "¿Precios desde?":
          "Consultar con Esteban el precio y el inventario vigente para la tipología de interés.",
      },
      en: {
        "Starting prices?":
          "Ask Esteban for current pricing and inventory for the unit type you are considering.",
      },
    },
  },
  "/proyectos/ella-miami": {
    condition: {
      es: "Paquetes de amueblado opcionales disponibles",
      en: "Optional furnishing packages available",
    },
  },
  "/proyectos/flow-house": {
    delivery: SUBJECT_TO_CONFIRMATION,
  },
  "/proyectos/faena": {
    condition: {
      es: "Residencias entregadas totalmente terminadas; amoblamiento no especificado",
      en: "Residences delivered fully finished; furnishing not specified",
    },
  },
  "/proyectos/gaia-residences": {
    condition: {
      es: "Paquetes de mobiliario a medida disponibles (opcional)",
      en: "Bespoke custom furniture packages available (optional)",
    },
  },
  "/proyectos/jean-georges-tropic": {
    condition: {
      es: "Unidades terminadas; muebles no incluidos; paquetes opcionales disponibles",
      en: "Delivered fully finished; furniture not included; optional furniture packages available",
    },
  },
  "/proyectos/nickelodeon-orlando": {
    condition: {
      es: "Residencias entregadas amuebladas",
      en: "Residences delivered furnished",
    },
  },
  "/proyectos/nomad": {
    faqAnswerOverrides: {
      es: {
        "¿Entrega?":
          "Entrega estimada 2026; sujeta al cronograma vigente del proyecto y a reconfirmación.",
      },
      en: {
        "Completion?":
          "Estimated completion 2026; subject to the current project schedule and reconfirmation.",
      },
    },
  },
  "/proyectos/one-park-tower": {
    delivery: SUBJECT_TO_CONFIRMATION,
    paymentRequest: true,
  },
  "/proyectos/oasis-hallandale": {
    condition: {
      es: "Unidades terminadas, sin muebles; paquetes externos disponibles",
      en: "Delivered fully finished; furniture not included; third-party packages available",
    },
  },
  "/proyectos/the-william": {
    price: {
      es: "Consultar precio e inventario vigente",
      en: "Inquire about current pricing and inventory",
    },
    delivery: {
      es: "Entrega estimada 2029 · sujeta a confirmación",
      en: "Estimated completion 2029 · subject to confirmation",
    },
    rental: {
      es: "Alquiler mínimo de 90 días",
      en: "Minimum rental term of 90 days",
    },
    condition: {
      es: "Consultar especificaciones y condición de entrega",
      en: "Ask for current specifications and delivery condition",
    },
    decisionsNote: {
      es: "Condiciones sujetas al reglamento del condominio y a reconfirmación.",
      en: "Conditions are subject to condominium rules and reconfirmation.",
    },
    metrics: {
      es: [
        { id: "stories", label: "Pisos", value: "26" },
        { id: "residences", label: "Residencias", value: "374" },
        { id: "amenities", label: "Amenidades", value: "Aprox. 3.760 m²" },
      ],
      en: [
        { id: "stories", label: "Stories", value: "26" },
        { id: "residences", label: "Residences", value: "374" },
        {
          id: "amenities",
          label: "Amenities",
          value: "Approx. 40,459 sq ft (3,760 m²)",
        },
      ],
    },
    metricsNote: {
      es: "Cifras aproximadas según la ficha actual y sujetas a cambios.",
      en: "Approximate figures from the current project page and subject to change.",
    },
    paymentRequest: true,
    structuredAddress: {
      streetAddress: "2040 NE 163rd St",
      addressLocality: "North Miami Beach",
      addressRegion: "FL",
      postalCode: "33162",
      addressCountry: "US",
    },
    faqAnswerOverrides: {
      es: {
        "¿Dirección y sales gallery?":
          "El proyecto se ubica en 2040 NE 163rd St, North Miami Beach. Antes de visitar una sala de ventas, confirmá con Esteban cuál está operativa.",
        "¿Rentas de corta estancia?":
          "No se permiten. La información operativa actual indica un alquiler mínimo de 90 días.",
        "¿Desde qué precio?":
          "Consultá con Esteban el precio y el inventario vigente según la tipología que estés evaluando.",
      },
      en: {
        "Address and sales gallery?":
          "The project is located at 2040 NE 163rd St, North Miami Beach. Before visiting a sales gallery, confirm its current location with Esteban.",
        "Short-term rentals?":
          "They are not permitted. Current operational information indicates a minimum rental term of 90 days.",
        "Starting price?":
          "Ask Esteban for current pricing and inventory for the unit type you are considering.",
      },
    },
  },
};

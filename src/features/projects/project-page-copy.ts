import type { Locale } from "@/i18n/config";

export const projectPageCopy = {
  es: {
    breadcrumb: "Proyectos",
    breadcrumbLabel: "Ruta de navegación",
    eyebrow: "Proyecto para explorar",
    decisions: {
      price: "Precio e inventario",
      delivery: "Entrega",
      rental: "Política de renta",
      condition: "Condición de entrega",
    },
    ctas: {
      whatsapp: "Consultar por WhatsApp",
      schedule: "Agendar una conversación",
      email: "Enviar email",
      share: "Compartir",
      requestPlans: "Solicitar planos",
      requestAvailability: "Consultar disponibilidad por tipología",
      requestMaterials: "Solicitar materiales vigentes",
      requestPaymentPlan: "Solicitar plan de pagos vigente",
      finalWhatsapp: (name: string) => `Conversar sobre ${name}`,
    },
    sections: {
      metrics: "Proyecto en cifras",
      gallery: "Galería",
      highlights: "Destacados y amenidades",
      units: "Tipologías y planos",
      features: "Características de las unidades",
      payment: "Plan de pagos",
      faq: "Preguntas frecuentes",
      location: "Ubicación",
      final: (name: string) => `¿Querés evaluar ${name} según tu objetivo?`,
    },
    intros: {
      units:
        "Esteban puede compartir los planos disponibles y revisar inventario por tipología.",
      features:
        "Características informadas en la ficha actual; las inclusiones finales deben reconfirmarse con la documentación vigente.",
      location: (location: string) =>
        `Ubicación informada: ${location}. El mapa preserva la búsqueda utilizada actualmente por el sitio.`,
      final:
        "Esteban puede ayudarte a comparar tipologías, condiciones y próximos pasos dentro de una evaluación más amplia.",
    },
    empty: {
      metrics: "Solicitá las métricas disponibles del proyecto.",
      gallery: "Solicitá las imágenes y materiales disponibles del proyecto.",
      highlights: "Solicitá los destacados y amenidades disponibles del proyecto.",
      unitTypes: "Solicitar tipologías, planos y disponibilidad",
      features: "Solicitar materiales vigentes",
      faq: "Consultá con Esteban las preguntas esenciales de este proyecto.",
    },
    map: {
      title: (name: string) => `Mapa de ubicación de ${name}`,
      open: "Abrir en Google Maps",
      loading: "Cargando mapa interactivo",
      unavailable: "Ubicación disponible mediante Google Maps",
    },
    paymentRequest: "Solicitar plan de pagos vigente",
    paymentStepsNote:
      "El plan puede cambiar sin previo aviso y debe reconfirmarse antes de tomar una decisión.",
    shareText: (name: string) => `Explorá ${name} con Esteban Firpo.`,
    messages: {
      whatsapp: (name: string) =>
        `Hola Esteban, estoy evaluando ${name}. Quisiera recibir información vigente y conversar sobre si encaja con mi objetivo.`,
      emailSubject: (name: string) => `Consulta sobre ${name}`,
      emailBody: (name: string) =>
        `Hola Esteban,\n\nQuisiera conversar sobre ${name} y recibir información vigente.\n\nGracias.`,
      plansSubject: (name: string) => `Planos — ${name}`,
      plansBody: (name: string) =>
        `Hola Esteban,\n\nQuisiera recibir los planos vigentes de ${name}.\n\nGracias.`,
      availabilitySubject: (name: string) => `Disponibilidad por tipología — ${name}`,
      availabilityBody: (name: string) =>
        `Hola Esteban,\n\nQuisiera consultar la disponibilidad vigente de ${name} por tipología.\n\nGracias.`,
      materialsSubject: (name: string) => `Materiales vigentes — ${name}`,
      materialsBody: (name: string) =>
        `Hola Esteban,\n\nQuisiera recibir los materiales y especificaciones vigentes de ${name}.\n\nGracias.`,
      paymentSubject: (name: string) => `Plan de pagos vigente — ${name}`,
      paymentBody: (name: string) =>
        `Hola Esteban,\n\nQuisiera solicitar el plan de pagos vigente de ${name}.\n\nGracias.`,
    },
    disclaimer:
      "La información, precios, disponibilidad, condiciones, especificaciones y planes pueden cambiar y deben reconfirmarse antes de tomar una decisión. Las imágenes y descripciones tienen carácter informativo.",
  },
  en: {
    breadcrumb: "Projects",
    breadcrumbLabel: "Breadcrumb",
    eyebrow: "Project to explore",
    decisions: {
      price: "Pricing and inventory",
      delivery: "Completion",
      rental: "Rental policy",
      condition: "Delivery condition",
    },
    ctas: {
      whatsapp: "Ask on WhatsApp",
      schedule: "Schedule a conversation",
      email: "Send an email",
      share: "Share",
      requestPlans: "Request floor plans",
      requestAvailability: "Check availability by unit type",
      requestMaterials: "Request current materials",
      requestPaymentPlan: "Request the current payment plan",
      finalWhatsapp: (name: string) => `Discuss ${name}`,
    },
    sections: {
      metrics: "Project at a glance",
      gallery: "Gallery",
      highlights: "Highlights and amenities",
      units: "Unit types and floor plans",
      features: "Residence features",
      payment: "Payment plan",
      faq: "Frequently asked questions",
      location: "Location",
      final: (name: string) => `Would you like to assess ${name} for your goals?`,
    },
    intros: {
      units:
        "Esteban can share the available floor plans and review inventory by unit type.",
      features:
        "Features shown in the current project page; final inclusions must be reconfirmed against current documentation.",
      location: (location: string) =>
        `Reported location: ${location}. The map preserves the search currently used by the website.`,
      final:
        "Esteban can help you compare unit types, conditions, and next steps within a broader evaluation.",
    },
    empty: {
      metrics: "Request the available project metrics.",
      gallery: "Request the available project images and materials.",
      highlights: "Request the available project highlights and amenities.",
      unitTypes: "Request unit types, floor plans, and availability",
      features: "Request current materials",
      faq: "Ask Esteban the essential questions about this project.",
    },
    map: {
      title: (name: string) => `${name} location map`,
      open: "Open in Google Maps",
      loading: "Loading interactive map",
      unavailable: "Location available through Google Maps",
    },
    paymentRequest: "Request the current payment plan",
    paymentStepsNote:
      "The payment plan may change without notice and must be reconfirmed before making a decision.",
    shareText: (name: string) => `Explore ${name} with Esteban Firpo.`,
    messages: {
      whatsapp: (name: string) =>
        `Hi Esteban, I’m considering ${name}. I’d like current information and to discuss whether it fits my goals.`,
      emailSubject: (name: string) => `Inquiry about ${name}`,
      emailBody: (name: string) =>
        `Hi Esteban,\n\nI’d like to discuss ${name} and receive current information.\n\nThank you.`,
      plansSubject: (name: string) => `Floor plans — ${name}`,
      plansBody: (name: string) =>
        `Hi Esteban,\n\nI’d like to receive the current floor plans for ${name}.\n\nThank you.`,
      availabilitySubject: (name: string) => `Availability by unit type — ${name}`,
      availabilityBody: (name: string) =>
        `Hi Esteban,\n\nI’d like to check current availability for ${name} by unit type.\n\nThank you.`,
      materialsSubject: (name: string) => `Current materials — ${name}`,
      materialsBody: (name: string) =>
        `Hi Esteban,\n\nI’d like to receive the current materials and specifications for ${name}.\n\nThank you.`,
      paymentSubject: (name: string) => `Current payment plan — ${name}`,
      paymentBody: (name: string) =>
        `Hi Esteban,\n\nI’d like to request the current payment plan for ${name}.\n\nThank you.`,
    },
    disclaimer:
      "Information, pricing, availability, conditions, specifications, and plans may change and must be reconfirmed before making a decision. Images and descriptions are for informational purposes.",
  },
} as const satisfies Record<Locale, object>;

export function getProjectPageCopy(locale: Locale) {
  return projectPageCopy[locale];
}

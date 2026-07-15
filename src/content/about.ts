import "server-only";
import type { Locale } from "@/i18n/config";

type AboutItem = {
  title: string;
  copy: string;
};

export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    highlight: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
    whatsappMessage: string;
    imageAlt: string;
    credentials: string[];
  };
  journey: {
    eyebrow: string;
    title: string;
    copy: string;
    secondaryCopy: string;
    milestones: AboutItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    copy: string;
    pillars: AboutItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: AboutItem[];
    highlight: string;
  };
  finalCta: {
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
  };
};

const aboutContent = {
  es: {
    hero: {
      eyebrow: "Sobre Esteban Firpo",
      title: "Criterio local y acompañamiento personal para invertir en Miami",
      copy:
        "Acompaño a compradores e inversores internacionales desde la definición del objetivo hasta el cierre, coordinando proyectos, propiedades y profesionales alrededor de una estrategia clara.",
      highlight: "Un punto de contacto para ordenar todo el proceso.",
      primaryCta: "Hablar con Esteban",
      secondaryCta: "Explorar proyectos",
      microcopy:
        "Atención en español e inglés. El proceso puede coordinarse desde el exterior.",
      whatsappMessage:
        "Hola Esteban, quiero conversar sobre una inversión inmobiliaria en Miami y entender qué opciones pueden encajar mejor con mi objetivo.",
      imageAlt: "Retrato profesional de Esteban Firpo",
      credentials: [
        "Miami",
        "Español e inglés",
        "Licencia inmobiliaria de Florida",
        "Miami Life Realty",
      ],
    },
    journey: {
      eyebrow: "Una trayectoria de gestión",
      title: "Experiencia empresarial aplicada a decisiones inmobiliarias",
      copy:
        "Nací en Paysandú, estudié Ingeniería en Montevideo y durante más de 15 años dirigí Magenta, una empresa que se consolidó entre las imprentas más importantes del interior de Uruguay y que continúa operando.",
      secondaryCopy:
        "Liderar una empresa durante tantos años me enseñó a analizar números, negociar, ordenar procesos, anticipar dificultades y acompañar decisiones importantes. Hoy aplico esa experiencia al real estate en Miami.",
      milestones: [
        { title: "Paysandú", copy: "Origen y visión emprendedora." },
        { title: "Montevideo", copy: "Formación en Ingeniería." },
        {
          title: "Más de 15 años en Magenta",
          copy: "Dirección, negociación y gestión empresarial.",
        },
        {
          title: "Miami",
          copy: "Asesoramiento inmobiliario para compradores e inversores internacionales.",
        },
      ],
    },
    approach: {
      eyebrow: "Mi forma de trabajar",
      title: "Menos ruido. Más criterio en cada decisión.",
      copy:
        "No se trata de mostrarte todo el inventario disponible. Se trata de concentrarnos en las opciones que mejor encajan con tu presupuesto, horizonte, uso esperado y estrategia patrimonial.",
      pillars: [
        {
          title: "Criterio de inversión",
          copy:
            "Ubicación, desarrollador, producto, precio, estructura de capital, uso y estrategia de salida.",
        },
        {
          title: "Selección con fundamento",
          copy:
            "Comparación de proyectos y propiedades alineadas con tu objetivo, presupuesto y horizonte.",
        },
        {
          title: "Coordinación integral",
          copy:
            "Documentación, abogados, compañía de títulos, especialistas en financiación y administración de propiedades cuando corresponde.",
        },
      ],
    },
    process: {
      eyebrow: "Acompañamiento completo",
      title: "Un proceso claro, de la primera conversación al cierre",
      copy:
        "Me convierto en tu punto de contacto para ordenar decisiones, información y profesionales durante cada etapa de la compra.",
      steps: [
        {
          title: "Entender tu objetivo",
          copy: "Presupuesto, horizonte, uso esperado y prioridades.",
        },
        {
          title: "Comparar oportunidades",
          copy: "Zonas, proyectos, propiedades, números y reglas de uso.",
        },
        {
          title: "Coordinar la compra",
          copy: "Oferta o reserva, contrato, documentación y profesionales involucrados.",
        },
        {
          title: "Acompañar hasta el cierre",
          copy: "Financiación cuando corresponde, compañía de títulos, firma y entrega.",
        },
      ],
      highlight: "Podés avanzar gran parte del proceso sin vivir en Miami.",
    },
    finalCta: {
      title: "Tu inversión empieza con una conversación clara",
      copy:
        "Contame qué buscás, cuánto querés invertir y cuál es tu horizonte. A partir de ahí podemos ordenar opciones y próximos pasos.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Explorar proyectos",
      microcopy: "Atención personal en español e inglés.",
    },
  },
  en: {
    hero: {
      eyebrow: "About Esteban Firpo",
      title: "Local insight and personal guidance for investing in Miami",
      copy:
        "I guide international buyers and investors from defining their goals through closing, coordinating projects, properties, and professionals around a clear strategy.",
      highlight: "One point of contact to organize the entire process.",
      primaryCta: "Talk with Esteban",
      secondaryCta: "Explore projects",
      microcopy:
        "Available in English and Spanish. The process can be coordinated from abroad.",
      whatsappMessage:
        "Hi Esteban, I would like to discuss a Miami real estate investment and understand which options may best fit my goals.",
      imageAlt: "Professional portrait of Esteban Firpo",
      credentials: [
        "Miami",
        "English and Spanish",
        "Florida real estate license",
        "Miami Life Realty",
      ],
    },
    journey: {
      eyebrow: "A management background",
      title: "Business experience applied to real estate decisions",
      copy:
        "I was born in Paysandú, studied Engineering in Montevideo, and led Magenta for more than 15 years, helping establish it among the leading printing companies in Uruguay’s interior. The company continues operating today.",
      secondaryCopy:
        "Leading a business for so many years taught me how to analyze numbers, negotiate, organize processes, anticipate challenges, and guide important decisions. I now apply that experience to Miami real estate.",
      milestones: [
        { title: "Paysandú", copy: "Origins and entrepreneurial perspective." },
        { title: "Montevideo", copy: "Engineering education." },
        {
          title: "More than 15 years at Magenta",
          copy: "Leadership, negotiation, and business management.",
        },
        {
          title: "Miami",
          copy: "Real estate guidance for international buyers and investors.",
        },
      ],
    },
    approach: {
      eyebrow: "How I work",
      title: "Less noise. More clarity in every decision.",
      copy:
        "The goal is not to show you every available listing. It is to focus on the options that best align with your budget, timeline, intended use, and wealth strategy.",
      pillars: [
        {
          title: "Investment judgment",
          copy:
            "Location, developer, product, price, capital structure, intended use, and exit strategy.",
        },
        {
          title: "Informed selection",
          copy:
            "Comparison of projects and properties aligned with your goals, budget, and timeline.",
        },
        {
          title: "End-to-end coordination",
          copy:
            "Documentation, attorneys, title company, financing specialists, and property management when appropriate.",
        },
      ],
    },
    process: {
      eyebrow: "Complete guidance",
      title: "A clear process, from the first conversation through closing",
      copy:
        "I serve as your point of contact, organizing decisions, information, and professionals throughout each stage of the purchase.",
      steps: [
        {
          title: "Understand your goals",
          copy: "Budget, timeline, intended use, and priorities.",
        },
        {
          title: "Compare opportunities",
          copy: "Areas, projects, properties, numbers, and usage rules.",
        },
        {
          title: "Coordinate the purchase",
          copy: "Offer or reservation, contract, documentation, and involved professionals.",
        },
        {
          title: "Guide you through closing",
          copy: "Financing when applicable, title company, signing, and delivery.",
        },
      ],
      highlight: "You can complete much of the process without living in Miami.",
    },
    finalCta: {
      title: "Your investment starts with a clear conversation",
      copy:
        "Tell me what you are looking for, how much you plan to invest, and your timeline. From there, we can organize the right options and next steps.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Explore projects",
      microcopy: "Personal guidance in English and Spanish.",
    },
  },
} satisfies Record<Locale, AboutContent>;

export function getAboutContent(locale: Locale): AboutContent {
  return aboutContent[locale];
}

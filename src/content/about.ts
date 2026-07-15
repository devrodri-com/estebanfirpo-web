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
    featured: string;
    support: string;
    copy: string;
    secondaryCopy: string;
    chapters: AboutItem[];
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
      title: "Experiencia empresarial para decidir mejor en Miami",
      copy:
        "Después de más de 15 años dirigiendo una empresa en Uruguay, hoy acompaño a compradores e inversores internacionales a analizar oportunidades, comparar alternativas y tomar decisiones inmobiliarias con una mirada práctica y personal.",
      highlight:
        "No se trata de mostrar más opciones. Se trata de ayudarte a elegir mejor.",
      primaryCta: "Hablar con Esteban",
      secondaryCta: "Explorar proyectos",
      microcopy: "Atención personal en español e inglés.",
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
      title: "De construir una empresa en Uruguay a asesorar inversiones en Miami",
      featured: "Más de 15 años dirigiendo Magenta",
      support:
        "Dirección, negociación, equipos, números y decisiones empresariales.",
      copy:
        "Nací en Paysandú, estudié Ingeniería en Montevideo y durante más de 15 años dirigí Magenta, una empresa que se consolidó entre las imprentas más importantes del interior de Uruguay y que continúa operando.",
      secondaryCopy:
        "Esa trayectoria me enseñó a interpretar números, negociar, organizar equipos, anticipar problemas y asumir responsabilidad por decisiones importantes. Hoy llevo esa experiencia al asesoramiento inmobiliario en Miami.",
      chapters: [
        { title: "Paysandú", copy: "Origen y visión emprendedora." },
        { title: "Montevideo", copy: "Formación en Ingeniería." },
        {
          title: "Magenta",
          copy: "Más de 15 años de dirección y gestión empresarial.",
        },
        {
          title: "Miami",
          copy: "Una nueva etapa acompañando decisiones inmobiliarias.",
        },
      ],
    },
    approach: {
      eyebrow: "Mi forma de trabajar",
      title: "Menos ruido. Más criterio en cada decisión.",
      copy:
        "Mi trabajo no consiste en enviarte todo el inventario disponible. Consiste en concentrarnos en las opciones que mejor encajan con tu presupuesto, horizonte, uso esperado y estrategia patrimonial.",
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
      eyebrow: "Qué podés esperar de mí",
      title: "Escuchar, filtrar y acompañar cada decisión",
      copy:
        "Mi trabajo no termina al mostrar una propiedad. Sigo presente para ordenar la información, explicar alternativas y mantener cada etapa clara.",
      steps: [
        {
          title: "Escuchar antes de recomendar",
          copy:
            "Entender qué querés lograr, qué te preocupa y cómo querés utilizar la propiedad.",
        },
        {
          title: "Filtrar antes de mostrar",
          copy: "Reducir el inventario a opciones que realmente merecen tu atención.",
        },
        {
          title: "Explicar antes de decidir",
          copy:
            "Presentar números, diferencias y próximos pasos de forma clara y directa.",
        },
        {
          title: "Coordinar hasta cerrar",
          copy:
            "Mantener comunicación con las partes involucradas y acompañar el avance de la operación.",
        },
      ],
      highlight:
        "Una recomendación tiene valor cuando está alineada con tu objetivo.",
    },
    finalCta: {
      title: "Hablemos de lo que querés lograr en Miami",
      copy:
        "Una primera conversación alcanza para entender tu objetivo, ordenar prioridades y definir qué oportunidades vale la pena mirar.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Explorar proyectos",
      microcopy: "Atención personal en español e inglés.",
    },
  },
  en: {
    hero: {
      eyebrow: "About Esteban Firpo",
      title: "Business experience for better real estate decisions in Miami",
      copy:
        "After more than 15 years leading a company in Uruguay, I now help international buyers and investors analyze opportunities, compare alternatives, and make real estate decisions with a practical, personal perspective.",
      highlight:
        "It is not about showing more options. It is about helping you choose better.",
      primaryCta: "Talk with Esteban",
      secondaryCta: "Explore projects",
      microcopy: "Personal guidance in English and Spanish.",
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
      title: "From building a business in Uruguay to advising real estate decisions in Miami",
      featured: "More than 15 years leading Magenta",
      support:
        "Leadership, negotiation, teams, numbers, and business decisions.",
      copy:
        "I was born in Paysandú, studied Engineering in Montevideo, and led Magenta for more than 15 years, helping establish it among the leading printing companies in Uruguay’s interior. The company continues operating today.",
      secondaryCopy:
        "That background taught me how to interpret numbers, negotiate, organize teams, anticipate problems, and take responsibility for important decisions. I now bring that experience to Miami real estate.",
      chapters: [
        { title: "Paysandú", copy: "Origins and entrepreneurial perspective." },
        { title: "Montevideo", copy: "Engineering education." },
        {
          title: "Magenta",
          copy: "More than 15 years of business leadership and management.",
        },
        {
          title: "Miami",
          copy: "A new stage guiding real estate decisions.",
        },
      ],
    },
    approach: {
      eyebrow: "How I work",
      title: "Less noise. More clarity in every decision.",
      copy:
        "My role is not to send you every available listing. It is to focus on the options that best align with your budget, timeline, intended use, and wealth strategy.",
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
      eyebrow: "What you can expect from me",
      title: "Listen, filter, and guide every decision",
      copy:
        "My work does not end when I show a property. I remain involved to organize information, explain alternatives, and keep every stage clear.",
      steps: [
        {
          title: "Listen before recommending",
          copy:
            "Understand what you want to achieve, what concerns you, and how you plan to use the property.",
        },
        {
          title: "Filter before presenting",
          copy: "Reduce the inventory to options that genuinely deserve your attention.",
        },
        {
          title: "Explain before deciding",
          copy:
            "Present numbers, differences, and next steps clearly and directly.",
        },
        {
          title: "Coordinate through closing",
          copy:
            "Maintain communication with the involved parties and follow the transaction through completion.",
        },
      ],
      highlight:
        "A recommendation has value when it is aligned with your goal.",
    },
    finalCta: {
      title: "Let’s discuss what you want to achieve in Miami",
      copy:
        "A first conversation is enough to understand your goal, organize priorities, and determine which opportunities are worth exploring.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Explore projects",
      microcopy: "Personal guidance in English and Spanish.",
    },
  },
} satisfies Record<Locale, AboutContent>;

export function getAboutContent(locale: Locale): AboutContent {
  return aboutContent[locale];
}

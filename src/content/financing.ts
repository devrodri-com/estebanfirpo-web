import "server-only";
import type { Locale } from "@/i18n/config";

type FinancingItem = {
  title: string;
  copy: string;
};

type FourFinancingItems = readonly [
  FinancingItem,
  FinancingItem,
  FinancingItem,
  FinancingItem,
];

export type FinancingContent = {
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    highlight: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
    whatsappMessage: string;
    brief: readonly [string, string, string, string];
  };
  variables: {
    eyebrow: string;
    title: string;
    copy: string;
    items: FourFinancingItems;
  };
  review: {
    eyebrow: string;
    title: string;
    copy: string;
    items: FourFinancingItems;
    note: string;
  };
  coordination: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: readonly [FinancingItem, FinancingItem, FinancingItem];
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

const financingContent = {
  es: {
    hero: {
      eyebrow: "FINANCIACIÓN INMOBILIARIA",
      title: "Financiar una compra en Miami también es una decisión estratégica",
      copy:
        "Según tu perfil, la propiedad y el momento de la operación, puede haber alternativas para financiar parte de la compra. La clave es evaluar la estructura antes de comprometerte con una unidad.",
      highlight:
        "Primero entendemos la compra. Después evaluamos la financiación.",
      primaryCta: "Consultar financiación",
      secondaryCta: "Explorar proyectos",
      microcopy:
        "Las condiciones dependen de la entidad financiera, del inmueble y del perfil del comprador. La aprobación no está garantizada.",
      whatsappMessage:
        "Hola Esteban, estoy evaluando una compra inmobiliaria en Miami y quiero entender qué opciones de financiación podrían adaptarse a mi perfil y a la propiedad.",
      brief: [
        "Perfil del comprador",
        "Tipo de propiedad",
        "Capital disponible",
        "Fecha de cierre",
      ],
    },
    variables: {
      eyebrow: "ANTES DE ELEGIR UN PRÉSTAMO",
      title: "La estructura depende de la compra, no de una fórmula única",
      copy:
        "No existe una condición universal para todos los compradores. La evaluación cambia según quién compra, qué propiedad se elige, cuánto capital se aporta y cuándo debe cerrarse la operación.",
      items: [
        {
          title: "Perfil del comprador",
          copy:
            "Residencia, ingresos, patrimonio y forma prevista de titular la propiedad.",
        },
        {
          title: "Tipo de propiedad",
          copy: "Proyecto, etapa, uso esperado y elegibilidad del inmueble.",
        },
        {
          title: "Capital disponible",
          copy:
            "Aporte inicial, gastos de cierre y reservas posteriores a la compra.",
        },
        {
          title: "Tiempo de la operación",
          copy:
            "Fecha de cierre, entrega y plazo disponible para completar la evaluación.",
        },
      ],
    },
    review: {
      eyebrow: "DOCUMENTACIÓN Y ANÁLISIS",
      title: "Qué suele revisar una entidad financiera",
      copy:
        "Cada programa define su propia documentación. En términos generales, la evaluación puede considerar estas áreas.",
      items: [
        {
          title: "Identidad y perfil",
          copy: "Documentos personales, residencia y estructura de compra.",
        },
        {
          title: "Ingresos y patrimonio",
          copy:
            "Fuentes de ingresos, activos, obligaciones y origen de los fondos.",
        },
        {
          title: "Capital y reservas",
          copy:
            "Fondos disponibles para la compra, gastos y liquidez posterior.",
        },
        {
          title: "Propiedad y operación",
          copy:
            "Contrato, tasación, seguros, uso previsto y condiciones del inmueble.",
        },
      ],
      note:
        "La documentación exacta y las condiciones se confirman con el profesional hipotecario y la entidad financiera correspondiente.",
    },
    coordination: {
      eyebrow: "COORDINACIÓN",
      title: "De la intención de compra a una evaluación realista",
      copy:
        "Esteban ayuda a ordenar la compra y a coordinar la conversación con los profesionales adecuados para evaluar la financiación.",
      steps: [
        {
          title: "Definir la compra",
          copy:
            "Objetivo, propiedad, precio, uso esperado y fecha estimada de cierre.",
        },
        {
          title: "Preparar el perfil",
          copy:
            "Información personal, capital disponible y documentación inicial.",
        },
        {
          title: "Coordinar la evaluación",
          copy:
            "Presentación al profesional hipotecario, revisión de alternativas y seguimiento junto con la operación inmobiliaria.",
        },
      ],
      highlight:
        "Esteban no otorga ni aprueba préstamos. Su función es acompañar la compra y coordinar el proceso con profesionales hipotecarios.",
    },
    finalCta: {
      title: "Evaluemos si la financiación encaja con tu compra",
      copy:
        "Contame qué propiedad estás considerando, cuál es tu presupuesto y cuándo pensás comprar. Con esa información podemos ordenar los próximos pasos.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Explorar proyectos",
      microcopy:
        "La consulta permite preparar la información antes de hablar con una entidad financiera.",
    },
  },
  en: {
    hero: {
      eyebrow: "REAL ESTATE FINANCING",
      title: "Financing a Miami purchase is also a strategic decision",
      copy:
        "Depending on your profile, the property, and the timing of the transaction, there may be options to finance part of the purchase. The key is to evaluate the structure before committing to a unit.",
      highlight:
        "First we understand the purchase. Then we evaluate the financing.",
      primaryCta: "Discuss financing",
      secondaryCta: "Explore projects",
      microcopy:
        "Terms depend on the financial institution, the property, and the buyer’s profile. Approval is not guaranteed.",
      whatsappMessage:
        "Hi Esteban, I am evaluating a Miami real estate purchase and would like to understand which financing options may fit my profile and the property.",
      brief: [
        "Buyer profile",
        "Property type",
        "Available capital",
        "Closing date",
      ],
    },
    variables: {
      eyebrow: "BEFORE CHOOSING A LOAN",
      title: "The structure depends on the purchase, not on a single formula",
      copy:
        "There is no universal set of terms for every buyer. The evaluation changes according to who is purchasing, which property is selected, how much capital is contributed, and when the transaction must close.",
      items: [
        {
          title: "Buyer profile",
          copy:
            "Residency, income, assets, and intended ownership structure.",
        },
        {
          title: "Property type",
          copy:
            "Project, stage, intended use, and property eligibility.",
        },
        {
          title: "Available capital",
          copy:
            "Initial contribution, closing costs, and post-purchase reserves.",
        },
        {
          title: "Transaction timing",
          copy:
            "Closing date, delivery, and the time available to complete the evaluation.",
        },
      ],
    },
    review: {
      eyebrow: "DOCUMENTATION AND REVIEW",
      title: "What a financial institution may review",
      copy:
        "Each program defines its own documentation. In general, the evaluation may consider these areas.",
      items: [
        {
          title: "Identity and profile",
          copy:
            "Personal documentation, residency, and purchase structure.",
        },
        {
          title: "Income and assets",
          copy:
            "Income sources, assets, liabilities, and source of funds.",
        },
        {
          title: "Capital and reserves",
          copy:
            "Funds available for the purchase, costs, and post-closing liquidity.",
        },
        {
          title: "Property and transaction",
          copy:
            "Contract, appraisal, insurance, intended use, and property conditions.",
        },
      ],
      note:
        "Exact documentation and terms are confirmed with the appropriate mortgage professional and financial institution.",
    },
    coordination: {
      eyebrow: "COORDINATION",
      title: "From purchase intent to a realistic evaluation",
      copy:
        "Esteban helps organize the purchase and coordinate the conversation with the appropriate professionals to evaluate financing.",
      steps: [
        {
          title: "Define the purchase",
          copy:
            "Goals, property, price, intended use, and estimated closing date.",
        },
        {
          title: "Prepare the profile",
          copy:
            "Personal information, available capital, and initial documentation.",
        },
        {
          title: "Coordinate the evaluation",
          copy:
            "Introduction to a mortgage professional, review of alternatives, and follow-up alongside the real estate transaction.",
        },
      ],
      highlight:
        "Esteban does not issue or approve loans. His role is to guide the purchase and coordinate the process with mortgage professionals.",
    },
    finalCta: {
      title: "Let’s evaluate whether financing fits your purchase",
      copy:
        "Tell me which property you are considering, your budget, and when you plan to buy. With that information, we can organize the next steps.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Explore projects",
      microcopy:
        "The conversation helps organize the information before speaking with a financial institution.",
    },
  },
} satisfies Record<Locale, FinancingContent>;

export function getFinancingContent(locale: Locale) {
  return financingContent[locale];
}

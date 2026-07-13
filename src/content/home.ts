import type { Locale } from "@/i18n/config";

type DecisionItem = { title: string; copy: string };
type ProcessItem = { title: string; copy: string };
type FaqItem = { question: string; answer: string };

export type HomeCopy = {
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    portraitNote: string;
    marketNote: string;
    whatsappMessage: string;
  };
  trust: {
    label: string;
    items: Array<{ title: string; copy: string }>;
  };
  decisions: {
    eyebrow: string;
    title: string;
    copy: string;
    items: DecisionItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ProcessItem[];
    cta: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    copy: string;
    disclosure: string;
    detailCta: string;
    whatsappCta: string;
    allCta: string;
    whatsappMessage: (project: string) => string;
  };
  education: {
    eyebrow: string;
    title: string;
    copy: string;
    precon: { title: string; copy: string; points: string[]; cta: string };
    miami: { title: string; copy: string; points: string[]; cta: string };
  };
  about: {
    eyebrow: string;
    title: string;
    copy: string;
    note: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
    faqs: FaqItem[];
    primaryCta: string;
    secondaryCta: string;
    formCta: string;
    whatsappMessage: string;
    responseNote: string;
  };
};

export const homeContent: Record<Locale, HomeCopy> = {
  es: {
    hero: {
      eyebrow: "Asesoría inmobiliaria · Miami y sur de Florida",
      title: "Decisiones inmobiliarias en Miami, con criterio y acompañamiento personal.",
      copy:
        "Soy Esteban Firpo, asesor afiliado a Miami Life Realty. Ayudo a inversores internacionales de Latinoamérica a entender, comparar y avanzar con opciones que puedan encajar con sus objetivos.",
      primaryCta: "Contarle mi objetivo a Esteban",
      secondaryCta: "Agendar una conversación",
      portraitNote: "Contacto personal durante el proceso",
      marketNote: "Preconstrucción y oportunidades en Miami y el sur de Florida",
      whatsappMessage:
        "Hola Esteban, estoy evaluando una compra inmobiliaria en Miami o el sur de Florida y me gustaría contarte mi objetivo.",
    },
    trust: {
      label: "Una relación clara desde el primer contacto",
      items: [
        { title: "Esteban Firpo", copy: "Contacto directo" },
        { title: "Miami Life Realty", copy: "Firma inmobiliaria" },
        { title: "Miami y sur de Florida", copy: "Mercado de trabajo" },
        { title: "Inversores internacionales", copy: "Atención personal" },
      ],
    },
    decisions: {
      eyebrow: "Qué ayuda a decidir Esteban",
      title: "No se trata de ver más proyectos. Se trata de comparar mejor.",
      copy:
        "Cada conversación comienza por el objetivo del cliente. Desde ahí, Esteban ayuda a reducir alternativas y ordenar las variables que realmente cambian una decisión.",
      items: [
        {
          title: "Objetivo y presupuesto",
          copy: "Aclarar para qué se compra, qué capital se quiere comprometer y en qué horizonte.",
        },
        {
          title: "Ubicación y uso",
          copy: "Comparar áreas y proyectos según uso personal, renta posible o estrategia patrimonial.",
        },
        {
          title: "Condiciones y escenarios",
          copy: "Revisar pagos, plazos, renta, apreciación potencial y salida como variables, nunca como garantías.",
        },
        {
          title: "Próximo paso",
          copy: "Reducir la lista y coordinar la información y los profesionales necesarios para avanzar.",
        },
      ],
    },
    process: {
      eyebrow: "Proceso de asesoramiento",
      title: "Un proceso simple para una decisión que no lo es.",
      copy:
        "El acompañamiento se organiza en etapas claras, con información revisada y condiciones sujetas a reconfirmación.",
      items: [
        { title: "Conversamos", copy: "Objetivo, presupuesto, horizonte y uso esperado." },
        { title: "Reducimos", copy: "Una lista manejable de alternativas que puedan encajar." },
        { title: "Contrastamos", copy: "Ubicación, compra, riesgos, supuestos y preguntas pendientes." },
        { title: "Coordinamos", copy: "Próximos pasos con el brokerage y los especialistas que correspondan." },
      ],
      cta: "Empezar por WhatsApp",
    },
    projects: {
      eyebrow: "Proyectos para explorar",
      title: "Una selección inicial para comparar según tu objetivo.",
      copy:
        "Seis proyectos de distintas zonas y perfiles para comenzar a explorar opciones con Esteban.",
      disclosure:
        "Información comercial, condiciones y disponibilidad sujetas a reconfirmación.",
      detailCta: "Ver ficha",
      whatsappCta: "Consultar por WhatsApp",
      allCta: "Explorar todos los proyectos",
      whatsappMessage: (project) =>
        `Hola Esteban, vi ${project} en tu web. Me gustaría entender si puede encajar con mi objetivo y qué información debemos reconfirmar.`,
    },
    education: {
      eyebrow: "Contexto para decidir",
      title: "Preconstrucción y Miami, sin atajos ni promesas.",
      copy:
        "La Home presenta el marco esencial. Las páginas temáticas permiten profundizar en beneficios posibles, riesgos, límites y preguntas de cada decisión.",
      precon: {
        title: "Entender la preconstrucción",
        copy: "Una compra por etapas exige mirar tanto la oportunidad como los compromisos y cambios posibles.",
        points: ["Calendario de pagos", "Plazos, liquidez y contrato", "Riesgos y condiciones del proyecto"],
        cta: "Guía de preconstrucción",
      },
      miami: {
        title: "Entender Miami",
        copy: "El mercado se analiza por microzona, uso, costos, conectividad y escenarios de salida.",
        points: ["Área y conectividad", "Uso y regulación", "Costos y escenarios de salida"],
        cta: "Contexto de Miami",
      },
    },
    about: {
      eyebrow: "Sobre Esteban",
      title: "Una persona de referencia para ordenar el proceso.",
      copy:
        "Esteban trabaja de forma personal con inversores internacionales que evalúan Miami y el sur de Florida. Su rol es comprender el objetivo, comparar alternativas y coordinar los próximos pasos con claridad.",
      note: "Asesor afiliado a Miami Life Realty",
      cta: "Conocer más sobre Esteban",
    },
    contact: {
      eyebrow: "Preguntas frecuentes y contacto",
      title: "La primera conversación empieza por tu objetivo.",
      copy:
        "No necesitás llegar con un proyecto elegido. Podés contarle a Esteban qué estás evaluando y definir juntos si tiene sentido avanzar.",
      faqs: [
        {
          question: "¿Puedo comenzar el proceso desde fuera de Estados Unidos?",
          answer:
            "Sí. La primera conversación y la comparación inicial pueden hacerse a distancia. Los pasos posteriores dependen de cada operación y de los profesionales involucrados.",
        },
        {
          question: "¿Cómo se reducen las alternativas?",
          answer:
            "Se consideran objetivo, presupuesto, horizonte, ubicación y uso esperado. Los datos comerciales y la disponibilidad deben reconfirmarse antes de decidir.",
        },
        {
          question: "¿La financiación, la renta o la apreciación están garantizadas?",
          answer:
            "No. Pueden analizarse como variables del escenario, pero dependen del proyecto, el mercado, proveedores y documentación vigente.",
        },
        {
          question: "¿Qué ocurre después del primer mensaje?",
          answer:
            "Esteban toma contacto personalmente para entender el objetivo y acordar el siguiente paso adecuado.",
        },
      ],
      primaryCta: "Hablar con Esteban por WhatsApp",
      secondaryCta: "Agendar una conversación",
      formCta: "Prefiero enviar un formulario",
      whatsappMessage:
        "Hola Esteban, quiero conversar sobre una posible compra en Miami o el sur de Florida.",
      responseNote: "WhatsApp es el canal principal. Agenda y formulario quedan disponibles como alternativas.",
    },
  },
  en: {
    hero: {
      eyebrow: "Real estate advisory · Miami and South Florida",
      title: "Real estate decisions in Miami, with clarity and personal guidance.",
      copy:
        "I’m Esteban Firpo, an advisor affiliated with Miami Life Realty. I help international investors from Latin America understand, compare, and move forward with options that may fit their goals.",
      primaryCta: "Tell Esteban about my goals",
      secondaryCta: "Schedule a conversation",
      portraitNote: "Personal contact throughout the process",
      marketNote: "Pre-construction and opportunities in Miami and South Florida",
      whatsappMessage:
        "Hi Esteban, I’m considering a real estate purchase in Miami or South Florida and would like to tell you about my goals.",
    },
    trust: {
      label: "A clear relationship from the first contact",
      items: [
        { title: "Esteban Firpo", copy: "Direct contact" },
        { title: "Miami Life Realty", copy: "Brokerage" },
        { title: "Miami and South Florida", copy: "Primary market" },
        { title: "International investors", copy: "Personal guidance" },
      ],
    },
    decisions: {
      eyebrow: "What Esteban helps you decide",
      title: "It’s not about seeing more projects. It’s about comparing better.",
      copy:
        "Every conversation starts with the client’s goals. From there, Esteban helps narrow the options and organize the variables that can actually change a decision.",
      items: [
        {
          title: "Goals and budget",
          copy: "Clarify why you are buying, how much capital you want to commit, and over what horizon.",
        },
        {
          title: "Location and use",
          copy: "Compare areas and projects for personal use, potential rental, or a broader wealth strategy.",
        },
        {
          title: "Terms and scenarios",
          copy: "Review payments, timing, rental, potential appreciation, and exit as variables—never guarantees.",
        },
        {
          title: "Next step",
          copy: "Narrow the list and coordinate the information and professionals needed to move forward.",
        },
      ],
    },
    process: {
      eyebrow: "Advisory process",
      title: "A simple process for a decision that isn’t.",
      copy:
        "The guidance is organized into clear stages, with reviewed information and terms subject to reconfirmation.",
      items: [
        { title: "We talk", copy: "Goals, budget, horizon, and intended use." },
        { title: "We narrow", copy: "A manageable list of options that may fit." },
        { title: "We compare", copy: "Location, purchase terms, risks, assumptions, and open questions." },
        { title: "We coordinate", copy: "Next steps with the brokerage and relevant specialists." },
      ],
      cta: "Start on WhatsApp",
    },
    projects: {
      eyebrow: "Projects to explore",
      title: "An initial selection to compare based on your goals.",
      copy:
        "Six projects across different areas and profiles to begin exploring options with Esteban.",
      disclosure:
        "Commercial information, terms, and availability subject to reconfirmation.",
      detailCta: "View project",
      whatsappCta: "Ask on WhatsApp",
      allCta: "Explore all projects",
      whatsappMessage: (project) =>
        `Hi Esteban, I saw ${project} on your website. I’d like to understand whether it may fit my goals and what information needs to be reconfirmed.`,
    },
    education: {
      eyebrow: "Context for the decision",
      title: "Pre-construction and Miami, without shortcuts or promises.",
      copy:
        "The Home presents the essential framework. The topic pages go deeper into possible benefits, risks, limits, and the questions behind each decision.",
      precon: {
        title: "Understanding pre-construction",
        copy: "A staged purchase means looking at both the opportunity and the commitments and changes that may arise.",
        points: ["Payment schedule", "Timing, liquidity, and contract", "Project risks and conditions"],
        cta: "Pre-construction guide",
      },
      miami: {
        title: "Understanding Miami",
        copy: "The market is assessed through micro-location, use, costs, connectivity, and exit scenarios.",
        points: ["Area and connectivity", "Use and regulation", "Costs and exit scenarios"],
        cta: "Miami context",
      },
    },
    about: {
      eyebrow: "About Esteban",
      title: "One point of contact to bring structure to the process.",
      copy:
        "Esteban works personally with international investors evaluating Miami and South Florida. His role is to understand the goal, compare alternatives, and coordinate the next steps with clarity.",
      note: "Advisor affiliated with Miami Life Realty",
      cta: "Learn more about Esteban",
    },
    contact: {
      eyebrow: "Frequently asked questions and contact",
      title: "The first conversation starts with your goals.",
      copy:
        "You don’t need to arrive with a project already selected. Tell Esteban what you are considering and decide together whether it makes sense to move forward.",
      faqs: [
        {
          question: "Can I begin the process from outside the United States?",
          answer:
            "Yes. The first conversation and initial comparison can happen remotely. Later steps depend on the transaction and the professionals involved.",
        },
        {
          question: "How are the options narrowed down?",
          answer:
            "Goals, budget, horizon, location, and intended use are considered. Commercial information and availability must be reconfirmed before a decision.",
        },
        {
          question: "Are financing, rental income, or appreciation guaranteed?",
          answer:
            "No. They can be considered as scenario variables, but they depend on the project, market, providers, and current documentation.",
        },
        {
          question: "What happens after the first message?",
          answer:
            "Esteban follows up personally to understand your goals and agree on the appropriate next step.",
        },
      ],
      primaryCta: "Talk with Esteban on WhatsApp",
      secondaryCta: "Schedule a conversation",
      formCta: "I prefer to send a form",
      whatsappMessage:
        "Hi Esteban, I’d like to discuss a possible purchase in Miami or South Florida.",
      responseNote: "WhatsApp is the primary channel. Scheduling and the form remain available alternatives.",
    },
  },
};

export function getHomeContent(locale: Locale) {
  return homeContent[locale];
}

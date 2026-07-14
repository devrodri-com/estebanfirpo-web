import type { Locale } from "@/i18n/config";
import { remoteProcessFaq } from "@/content/remote-process-faq";

type Benefit = {
  title: string;
  copy: string;
};

type TimelineStep = {
  title: string;
  copy: string;
};

type CapitalSegment = {
  label: string;
  value: string;
  width: number;
};

type ComparisonRow = {
  label: string;
  preconstruction: string;
  completed: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type PreconstructionContent = {
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
    whatsappMessage: string;
    imageAlt: string;
    imageCaption: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Benefit[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: TimelineStep[];
    note: string;
  };
  capital: {
    eyebrow: string;
    title: string;
    copy: string;
    examplePrice: string;
    segments: CapitalSegment[];
    explanation: string;
    disclaimer: string;
  };
  newProduct: {
    eyebrow: string;
    title: string;
    copy: string;
    points: string[];
    note: string;
    imageAlt: string;
  };
  comparison: {
    eyebrow: string;
    title: string;
    copy: string;
    preconstructionLabel: string;
    completedLabel: string;
    rows: ComparisonRow[];
    fitNote: string;
  };
  remote: {
    eyebrow: string;
    title: string;
    copy: string;
    centerTitle: string;
    centerCopy: string;
    roles: string[];
    note: string;
  };
  checklist: {
    eyebrow: string;
    title: string;
    copy: string;
    items: string[];
    closingCopy: string;
  };
  fit: {
    eyebrow: string;
    title: string;
    copy: string;
    preconstructionTitle: string;
    preconstructionItems: string[];
    completedTitle: string;
    completedItems: string[];
  };
  faq: {
    eyebrow: string;
    title: string;
    copy: string;
    items: FaqItem[];
    ctaTitle: string;
    ctaCopy: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappMessage: string;
    disclaimer: string;
  };
};

const content = {
  es: {
    hero: {
      eyebrow: "Preconstrucción en Miami",
      title: "Más tiempo para planificar. Más margen para elegir.",
      copy:
        "La preconstrucción puede darte acceso a producto nuevo, depósitos por etapas y un cierre futuro para organizar capital con anticipación. La clave está en comparar el proyecto, el contrato y la estrategia según tu objetivo.",
      primaryCta: "Explorar proyectos",
      secondaryCta: "Hablar con Esteban",
      microcopy: "Todo el proceso puede coordinarse a distancia.",
      whatsappMessage:
        "Hola Esteban, quiero explorar proyectos de preconstrucción en Miami y entender cuáles pueden encajar con mi objetivo.",
      imageAlt: "Maqueta conceptual de una torre residencial contemporánea",
      imageCaption: "Imagen conceptual",
    },
    benefits: {
      eyebrow: "Ventajas con criterio",
      title: "Por qué puede ser una estrategia atractiva",
      copy:
        "El valor no está en una promesa automática, sino en cómo el tiempo, la selección y la estructura de compra pueden trabajar a favor de tu plan.",
      items: [
        {
          title: "Capital por etapas",
          copy:
            "En muchos proyectos, el capital se distribuye entre reserva, contrato, avances de obra y cierre. El calendario exacto depende del developer y del contrato.",
        },
        {
          title: "Más margen para elegir",
          copy:
            "Entrar en etapas tempranas puede ampliar las opciones de piso, orientación, vista, distribución e inventario dentro del proyecto.",
        },
        {
          title: "Producto nuevo",
          copy:
            "Accedés a diseño, sistemas, terminaciones y amenities pensados para la demanda actual, con menor exposición inicial al desgaste de un edificio antiguo.",
        },
        {
          title: "Tiempo para preparar el cierre",
          copy:
            "El período de construcción puede darte tiempo para ordenar liquidez, documentación y estrategia de financiación antes del cierre.",
        },
      ],
    },
    timeline: {
      eyebrow: "Del interés a la entrega",
      title: "Cómo funciona una compra en preconstrucción",
      copy:
        "Esteban acompaña la comparación y coordina el recorrido para que cada etapa llegue con decisiones, documentos y próximos pasos claros.",
      steps: [
        {
          title: "Reserva",
          copy: "Se selecciona una unidad disponible y se inicia la revisión de sus condiciones.",
        },
        {
          title: "Contrato",
          copy: "Se firma el purchase agreement y queda definido el calendario contractual.",
        },
        {
          title: "Depósitos durante la obra",
          copy:
            "El comprador aporta capital según las etapas y porcentajes establecidos por el proyecto.",
        },
        {
          title: "Preparación del cierre",
          copy:
            "Se organizan fondos, documentación, estructura de compra y, cuando corresponde, financiación.",
        },
        {
          title: "Cierre y entrega",
          copy: "Se paga el saldo con fondos propios o crédito aprobado y se recibe la unidad.",
        },
      ],
      note: "Los porcentajes, hitos y plazos varían según cada proyecto y contrato.",
    },
    capital: {
      eyebrow: "Ejemplo de flujo",
      title: "Más tiempo para estructurar el capital",
      copy:
        "Un calendario escalonado puede repartir el compromiso de capital entre distintos momentos de la compra.",
      examplePrice: "Precio hipotético · US$1.000.000",
      segments: [
        { label: "Reserva y contrato", value: "20%", width: 20 },
        { label: "Segundo depósito", value: "10%", width: 10 },
        { label: "Tercer depósito", value: "10%", width: 10 },
        { label: "Saldo al cierre", value: "60%", width: 60 },
      ],
      explanation:
        "En este ejemplo, el comprador comprometería US$400.000 antes del cierre y resolvería el saldo de US$600.000 al cierre mediante fondos propios o financiación aprobada.",
      disclaimer: "Ejemplo ilustrativo. No representa un plan estándar.",
    },
    newProduct: {
      eyebrow: "Una unidad futura",
      title: "Producto nuevo en un mercado más exigente",
      copy:
        "La obra nueva puede responder mejor a preferencias actuales de diseño, servicios y experiencia residencial. También permite evaluar el activo desde su concepción y preparar con tiempo su uso futuro.",
      points: [
        "Diseño, sistemas y códigos recientes.",
        "Terminaciones y amenities contemporáneas.",
        "Warranties y un proceso de entrega definido por el proyecto.",
        "Menor exposición inicial a reparaciones pesadas propias del desgaste.",
      ],
      note:
        "Un edificio nuevo no implica automáticamente costos operativos bajos. La HOA, los servicios y el presupuesto deben evaluarse proyecto por proyecto.",
      imageAlt: "Arquitectura residencial contemporánea con materiales y terminaciones actuales",
    },
    comparison: {
      eyebrow: "Dos caminos posibles",
      title: "Preconstrucción o propiedad terminada",
      copy: "No hay una opción universalmente mejor. Son estrategias distintas para necesidades distintas.",
      preconstructionLabel: "Preconstrucción",
      completedLabel: "Propiedad terminada",
      rows: [
        {
          label: "Capital inicial",
          preconstruction: "Suele distribuirse en depósitos por etapas.",
          completed: "Suele concentrarse en el cierre y el down payment.",
        },
        {
          label: "Plazo",
          preconstruction: "Requiere esperar hasta la entrega; el cronograma puede variar.",
          completed: "Permite usar o alquilar el activo después del cierre.",
        },
        {
          label: "Financiación",
          preconstruction: "En muchos casos se evalúa cerca del cierre.",
          completed: "Se define al momento de comprar.",
        },
        {
          label: "Ingreso inmediato",
          preconstruction: "No genera renta antes de la entrega.",
          completed: "Puede generarla si el activo y sus reglas lo permiten.",
        },
        {
          label: "Selección de unidad",
          preconstruction: "Puede ser más amplia al entrar temprano.",
          completed: "Está limitada al inventario disponible.",
        },
        {
          label: "Producto",
          preconstruction: "Nuevo, con diseño y sistemas actuales.",
          completed: "Visible e inspeccionable; puede requerir mejoras.",
        },
        {
          label: "Incertidumbre",
          preconstruction: "Mayor por el plazo, la obra y el cierre futuro.",
          completed: "Menor respecto del estado físico y la entrega inicial.",
        },
        {
          label: "Inspección",
          preconstruction: "El foco inicial está en contrato, proyecto y entrega futura.",
          completed: "La due diligence física es inmediata y central.",
        },
        {
          label: "Renta",
          preconstruction: "Depende de las reglas futuras y documentos del proyecto.",
          completed: "Puede evaluarse con reglas y operación ya existentes.",
        },
        {
          label: "Liquidez",
          preconstruction: "El capital queda comprometido durante la obra.",
          completed: "La salida depende del edificio, precio y mercado al vender.",
        },
        {
          label: "Horizonte",
          preconstruction: "Suele encajar mejor con objetivos de medio o largo plazo.",
          completed: "Puede encajar mejor con necesidades más inmediatas.",
        },
      ],
      fitNote:
        "La preconstrucción gana relevancia cuando podés esperar, valorás producto nuevo, querés distribuir capital y buscás más elección inicial.",
    },
    remote: {
      eyebrow: "Coordinación internacional",
      title: "Podés completar el proceso sin viajar",
      copy:
        "Desde la evaluación inicial hasta el cierre, la operación puede coordinarse a distancia. Esteban funciona como punto de contacto para ordenar el proceso y conectar a los profesionales necesarios.",
      centerTitle: "Esteban + Miami Life Realty",
      centerCopy: "Coordinación y seguimiento de la operación",
      roles: ["Comprador", "Developer", "Abogado", "Title company", "Financiación"],
      note:
        "La aprobación y las condiciones de financiación dependen del comprador, el proyecto y el proveedor.",
    },
    checklist: {
      eyebrow: "Selección y due diligence",
      title: "Elegir bien importa más que comprar temprano",
      copy:
        "Una oportunidad sólida se entiende como un conjunto: quién ejecuta, qué dice el contrato, cómo se usa la unidad y qué exige el cierre.",
      items: [
        "Developer y experiencia de ejecución",
        "Contrato y derechos del comprador",
        "Calendario de depósitos",
        "Entrega estimada",
        "Costos de cierre",
        "Condición de entrega",
        "Política de renta",
        "Restricciones de assignment",
        "Presupuesto y HOA",
        "Estrategia de financiación",
        "Tasación al cierre",
        "Ubicación y demanda objetivo",
      ],
      closingCopy:
        "El objetivo no es revisar más papeles por revisar: es saber qué cambia la decisión y qué debe quedar resuelto antes de avanzar.",
    },
    fit: {
      eyebrow: "Alineación con tu estrategia",
      title: "¿Encaja con tu objetivo?",
      copy:
        "El horizonte, la necesidad de ingresos y la forma de financiar pesan tanto como la ubicación o el diseño del proyecto.",
      preconstructionTitle: "Puede encajar especialmente bien si:",
      preconstructionItems: [
        "Tenés horizonte medio o largo.",
        "Podés completar los depósitos previstos.",
        "No necesitás ingresos inmediatos.",
        "Valorás producto nuevo.",
        "Querés tiempo para organizar capital.",
        "Aceptás que el cronograma pueda variar.",
        "Buscás diversificación en Miami y en dólares.",
      ],
      completedTitle: "Una propiedad terminada puede ser más adecuada si:",
      completedItems: [
        "Necesitás usarla o alquilarla de inmediato.",
        "Tenés una fecha rígida.",
        "Dependés completamente de una financiación futura.",
        "Necesitás liquidez a corto plazo.",
        "Preferís evaluar un activo ya construido.",
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo esencial antes de comparar proyectos",
      copy:
        "Estas respuestas explican la mecánica general. Las condiciones concretas se revisan siempre en el proyecto y el contrato elegidos.",
      items: [
        {
          question: "¿Cuánto se deposita?",
          answer:
            "Depende del proyecto. Muchos developers solicitan depósitos escalonados, pero el calendario y los porcentajes exactos quedan definidos en el contrato.",
        },
        {
          question: "¿Cuándo se paga el saldo?",
          answer:
            "Normalmente se paga al cierre, cuando la unidad está lista para escriturar, según las condiciones y fechas del proyecto.",
        },
        {
          question: "¿Necesito financiación desde el inicio?",
          answer:
            "No necesariamente. En muchos proyectos, la financiación se evalúa cerca del cierre; los depósitos previos deben completarse según el contrato.",
        },
        {
          question: "¿Puedo financiar siendo extranjero?",
          answer:
            "Puede ser posible. La aprobación y las condiciones dependen de tu perfil, documentación, el proyecto, la tasación y el proveedor de financiación.",
        },
        {
          question: "¿Puedo comprar sin viajar?",
          answer: remoteProcessFaq.es.answer,
        },
        {
          question: "¿Puedo alquilar la unidad?",
          answer:
            "Depende del edificio, el municipio, el tipo de producto y los documentos del condominio. La política aplicable debe revisarse proyecto por proyecto.",
        },
        {
          question: "¿Puedo revender antes del cierre?",
          answer:
            "No en todos los proyectos. La posibilidad de assignment, sus plazos y costos dependen del contrato.",
        },
        {
          question: "¿Qué ocurre si la obra se demora?",
          answer:
            "Los cronogramas pueden cambiar. Conviene revisar con un abogado las fechas contractuales, extensiones permitidas y derechos aplicables.",
        },
        {
          question: "¿Está garantizada la apreciación?",
          answer:
            "No. Al momento de entrega, el valor puede ser mayor, similar o menor que el precio contractual, según el proyecto y el mercado.",
        },
        {
          question: "¿Qué costos existen al cierre?",
          answer:
            "Además del saldo, puede haber costos del comprador y cargos específicos del proyecto o developer. Deben estimarse con la documentación vigente.",
        },
        {
          question: "¿Qué documentos conviene revisar?",
          answer:
            "Reserva, purchase agreement, prospectus, condo docs, presupuesto, reglas de renta, calendario de depósitos, costos de cierre y política de assignment, con revisión profesional cuando corresponda.",
        },
      ],
      ctaTitle: "Explorá preconstrucción con una estrategia clara",
      ctaCopy:
        "Contale a Esteban qué buscás, cuánto querés invertir y cuál es tu horizonte. A partir de ahí puede ayudarte a comparar proyectos, unidades y próximos pasos.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Explorar proyectos",
      whatsappMessage:
        "Hola Esteban, quiero conversar sobre preconstrucción en Miami. Mi objetivo es comparar proyectos según mi inversión y horizonte.",
      disclaimer:
        "La información es educativa y puede cambiar. Depósitos, plazos, reglas de renta, costos, financiación y condiciones dependen de cada proyecto, contrato y comprador. No sustituye asesoramiento legal, fiscal o financiero.",
    },
  },
  en: {
    hero: {
      eyebrow: "Miami preconstruction",
      title: "More time to plan. More room to choose.",
      copy:
        "Preconstruction can provide access to new product, staged deposits, and a future closing that gives you time to organize capital. The key is matching the project, contract, and strategy to your goals.",
      primaryCta: "Explore projects",
      secondaryCta: "Talk with Esteban",
      microcopy: "The entire process can be coordinated remotely.",
      whatsappMessage:
        "Hi Esteban, I would like to explore Miami preconstruction projects and understand which options may fit my goals.",
      imageAlt: "Conceptual model of a contemporary residential tower",
      imageCaption: "Conceptual image",
    },
    benefits: {
      eyebrow: "Advantages with context",
      title: "Why it can be an attractive strategy",
      copy:
        "The value is not an automatic promise. It is how time, selection, and the purchase structure can work in support of your plan.",
      items: [
        {
          title: "Capital in stages",
          copy:
            "In many projects, capital is distributed across reservation, contract, construction milestones, and closing. The exact schedule depends on the developer and contract.",
        },
        {
          title: "More room to choose",
          copy:
            "Entering at an earlier stage may provide more choice of floor, orientation, view, layout, and available inventory.",
        },
        {
          title: "New product",
          copy:
            "You gain access to design, systems, finishes, and amenities created for today’s market, with less initial exposure to the wear of an older building.",
        },
        {
          title: "Time to prepare for closing",
          copy:
            "The construction period can give you time to organize liquidity, documentation, and a financing strategy before closing.",
        },
      ],
    },
    timeline: {
      eyebrow: "From interest to delivery",
      title: "How a preconstruction purchase works",
      copy:
        "Esteban supports the comparison and coordinates the journey so each stage comes with clear decisions, documents, and next steps.",
      steps: [
        {
          title: "Reservation",
          copy: "An available unit is selected and its conditions begin to be reviewed.",
        },
        {
          title: "Contract",
          copy: "The purchase agreement is signed and the contractual schedule is established.",
        },
        {
          title: "Construction deposits",
          copy:
            "The buyer contributes capital according to the stages and percentages established by the project.",
        },
        {
          title: "Closing preparation",
          copy:
            "Funds, documentation, ownership structure, and financing, when applicable, are organized.",
        },
        {
          title: "Closing and delivery",
          copy: "The balance is paid with cash or approved financing, and the unit is delivered.",
        },
      ],
      note: "Percentages, milestones, and timelines vary by project and contract.",
    },
    capital: {
      eyebrow: "Cash-flow example",
      title: "More time to structure your capital",
      copy:
        "A staged schedule can distribute the capital commitment across different moments in the purchase.",
      examplePrice: "Hypothetical price · US$1,000,000",
      segments: [
        { label: "Reservation and contract", value: "20%", width: 20 },
        { label: "Second deposit", value: "10%", width: 10 },
        { label: "Third deposit", value: "10%", width: 10 },
        { label: "Balance at closing", value: "60%", width: 60 },
      ],
      explanation:
        "In this example, the buyer would commit US$400,000 before closing and fund the remaining US$600,000 at closing through cash or approved financing.",
      disclaimer: "Illustrative example. This is not a standard payment plan.",
    },
    newProduct: {
      eyebrow: "A future residence",
      title: "New product in a more demanding market",
      copy:
        "New construction can respond more closely to current preferences in design, services, and residential experience. It also allows the asset to be evaluated from its conception and its future use to be planned ahead of time.",
      points: [
        "Recent design, systems, and building codes.",
        "Contemporary finishes and amenities.",
        "Warranties and a delivery process defined by the project.",
        "Less initial exposure to major repairs caused by wear.",
      ],
      note:
        "A new building does not automatically mean low operating costs. HOA fees, services, and budgets must be reviewed project by project.",
      imageAlt: "Contemporary residential architecture with current materials and finishes",
    },
    comparison: {
      eyebrow: "Two possible paths",
      title: "Preconstruction or a completed property",
      copy: "Neither option is universally better. They serve different goals and timelines.",
      preconstructionLabel: "Preconstruction",
      completedLabel: "Completed property",
      rows: [
        {
          label: "Initial capital",
          preconstruction: "It is often distributed through staged deposits.",
          completed: "It is often concentrated at closing and in the down payment.",
        },
        {
          label: "Timeline",
          preconstruction: "It requires waiting for delivery; the schedule may change.",
          completed: "It can be used or rented after closing.",
        },
        {
          label: "Financing",
          preconstruction: "In many cases, it is evaluated closer to closing.",
          completed: "It is arranged at the time of purchase.",
        },
        {
          label: "Immediate income",
          preconstruction: "It does not generate rent before delivery.",
          completed: "It may generate rent if the asset and its rules allow it.",
        },
        {
          label: "Unit selection",
          preconstruction: "It may be broader when entering early.",
          completed: "It is limited to available inventory.",
        },
        {
          label: "Product",
          preconstruction: "New, with current design and systems.",
          completed: "Visible and inspectable; it may require updates.",
        },
        {
          label: "Uncertainty",
          preconstruction: "Higher because of timing, construction, and the future closing.",
          completed: "Lower regarding physical condition and initial delivery.",
        },
        {
          label: "Inspection",
          preconstruction: "The initial focus is the contract, project, and future delivery.",
          completed: "Physical due diligence is immediate and central.",
        },
        {
          label: "Rentals",
          preconstruction: "They depend on future rules and project documents.",
          completed: "They can be assessed under existing rules and operations.",
        },
        {
          label: "Liquidity",
          preconstruction: "Capital remains committed during construction.",
          completed: "The exit depends on the building, pricing, and market when selling.",
        },
        {
          label: "Horizon",
          preconstruction: "It often fits medium- or long-term goals more naturally.",
          completed: "It may fit more immediate needs better.",
        },
      ],
      fitNote:
        "Preconstruction becomes especially relevant when you can wait, value new product, want to distribute capital, and seek greater early-stage choice.",
    },
    remote: {
      eyebrow: "International coordination",
      title: "You can complete the process without traveling",
      copy:
        "From the initial evaluation through closing, the transaction can be coordinated remotely. Esteban acts as a central point of contact to organize the process and connect the professionals involved.",
      centerTitle: "Esteban + Miami Life Realty",
      centerCopy: "Transaction coordination and follow-through",
      roles: ["Buyer", "Developer", "Attorney", "Title company", "Financing"],
      note:
        "Financing approval and terms depend on the buyer, the project, and the provider.",
    },
    checklist: {
      eyebrow: "Selection and due diligence",
      title: "Choosing well matters more than buying early",
      copy:
        "A strong opportunity is understood as a whole: who executes, what the contract says, how the unit may be used, and what closing requires.",
      items: [
        "Developer and execution experience",
        "Contract and buyer rights",
        "Deposit schedule",
        "Estimated delivery",
        "Closing costs",
        "Delivery condition",
        "Rental policy",
        "Assignment restrictions",
        "Budget and HOA",
        "Financing strategy",
        "Appraisal at closing",
        "Location and target demand",
      ],
      closingCopy:
        "The goal is not to review more paperwork for its own sake. It is to understand what changes the decision and what should be resolved before moving forward.",
    },
    fit: {
      eyebrow: "Alignment with your strategy",
      title: "Does it fit your goals?",
      copy:
        "Your horizon, need for income, and financing approach matter as much as the location or design of the project.",
      preconstructionTitle: "It may fit especially well if:",
      preconstructionItems: [
        "You have a medium- or long-term horizon.",
        "You can complete the scheduled deposits.",
        "You do not need immediate income.",
        "You value new product.",
        "You want time to organize capital.",
        "You accept that the timeline may change.",
        "You seek diversification in Miami and in U.S. dollars.",
      ],
      completedTitle: "A completed property may be more suitable if:",
      completedItems: [
        "You need to use or rent it immediately.",
        "You have a fixed date.",
        "You depend entirely on future financing.",
        "You need short-term liquidity.",
        "You prefer to evaluate an already-built asset.",
      ],
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "What matters before comparing projects",
      copy:
        "These answers explain the general mechanics. Specific conditions should always be reviewed in the selected project and contract.",
      items: [
        {
          question: "How much is deposited?",
          answer:
            "It depends on the project. Many developers require staged deposits, but the exact schedule and percentages are established in the contract.",
        },
        {
          question: "When is the balance paid?",
          answer:
            "It is normally paid at closing, when the unit is ready to transfer, according to the project’s terms and dates.",
        },
        {
          question: "Do I need financing from the beginning?",
          answer:
            "Not necessarily. In many projects, financing is evaluated closer to closing; earlier deposits must be completed according to the contract.",
        },
        {
          question: "Can I obtain financing as a foreign buyer?",
          answer:
            "It may be possible. Approval and terms depend on your profile, documentation, the project, the appraisal, and the financing provider.",
        },
        {
          question: "Can I buy without traveling?",
          answer: remoteProcessFaq.en.answer,
        },
        {
          question: "Can I rent the unit?",
          answer:
            "It depends on the building, municipality, product type, and condominium documents. The applicable policy should be reviewed project by project.",
        },
        {
          question: "Can I resell before closing?",
          answer:
            "Not in every project. Assignment rights, timing, and costs depend on the contract.",
        },
        {
          question: "What happens if construction is delayed?",
          answer:
            "Timelines may change. It is important to review contractual dates, permitted extensions, and applicable rights with an attorney.",
        },
        {
          question: "Is appreciation guaranteed?",
          answer:
            "No. At delivery, the value may be higher, similar, or lower than the contract price, depending on the project and market.",
        },
        {
          question: "What costs are due at closing?",
          answer:
            "In addition to the balance, there may be buyer closing costs and project- or developer-specific charges. They should be estimated from current documents.",
        },
        {
          question: "Which documents should be reviewed?",
          answer:
            "Reservation, purchase agreement, prospectus, condo documents, budget, rental rules, deposit schedule, closing costs, and assignment policy, with professional review when appropriate.",
        },
      ],
      ctaTitle: "Explore preconstruction with a clear strategy",
      ctaCopy:
        "Tell Esteban what you are looking for, your investment range, and your timeline. From there, he can help you compare projects, units, and next steps.",
      primaryCta: "Talk on WhatsApp",
      secondaryCta: "Explore projects",
      whatsappMessage:
        "Hi Esteban, I would like to discuss Miami preconstruction and compare projects based on my investment range and timeline.",
      disclaimer:
        "This information is educational and may change. Deposits, timelines, rental rules, costs, financing, and terms depend on each project, contract, and buyer. It does not replace legal, tax, or financial advice.",
    },
  },
} satisfies Record<Locale, PreconstructionContent>;

export function getPreconstructionContent(locale: Locale) {
  return content[locale];
}

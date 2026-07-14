import type { Locale } from "@/i18n/config";
import { remoteProcessFaq } from "@/content/remote-process-faq";

type Benefit = {
  title: string;
  copy: string;
  support?: string;
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
  advantage: string;
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
    highlight: string;
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
    opportunity: string;
    disclaimer: string;
  };
  newProduct: {
    eyebrow: string;
    title: string;
    copy: string;
    points: string[];
    imageAlt: string;
  };
  comparison: {
    eyebrow: string;
    title: string;
    copy: string;
    variableLabel: string;
    advantageLabel: string;
    rows: ComparisonRow[];
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
    profileTitle: string;
    profileItems: string[];
    objectivesTitle: string;
    objectivesItems: string[];
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
      title: "Comprá hoy. Participá del crecimiento del proyecto.",
      copy:
        "La preconstrucción te permite entrar en una etapa temprana, distribuir el capital durante la obra y llegar a la entrega con una unidad nueva que puede haber aumentado su valor desde el precio pactado.",
      highlight: "Más tiempo, más elección y más potencial de plusvalía.",
      primaryCta: "Explorar proyectos",
      secondaryCta: "Hablar con Esteban",
      microcopy: "Todo el proceso puede coordinarse a distancia.",
      whatsappMessage:
        "Hola Esteban, quiero explorar proyectos de preconstrucción en Miami y entender cuáles pueden encajar con mi objetivo.",
      imageAlt: "Maqueta conceptual de una torre residencial contemporánea",
      imageCaption: "Visual conceptual",
    },
    benefits: {
      eyebrow: "Ventajas de entrar temprano",
      title: "Por qué invertir en preconstrucción",
      items: [
        {
          title: "La plusvalía puede comenzar antes de la entrega",
          copy:
            "Comprás a un precio contractual mientras el proyecto todavía está en desarrollo. A medida que avanzan la obra y la comercialización, los precios de lista suelen evolucionar. Si el proyecto y el mercado acompañan, esa diferencia puede convertirse en plusvalía antes del cierre.",
          support: "Entrar temprano te posiciona antes de las próximas etapas de precio.",
        },
        {
          title: "Capital distribuido durante la obra",
          copy:
            "En muchos proyectos, los depósitos se realizan por etapas. En lugar de concentrar todo el capital en un cierre inmediato, podés distribuirlo mientras avanza la construcción.",
        },
        {
          title: "Mayor selección entrando temprano",
          copy:
            "Las primeras etapas suelen ofrecer más opciones de pisos, vistas, orientación, distribución y ubicación dentro de la torre. Las unidades más atractivas pueden venderse primero.",
        },
        {
          title: "Producto nuevo y competitivo",
          copy:
            "Accedés a diseño, sistemas, terminaciones, tecnología y amenidades pensadas para la demanda actual y futura.",
        },
        {
          title: "Tiempo para organizar el cierre",
          copy:
            "El período de construcción te da tiempo para preparar liquidez, documentación, estructura de compra y estrategia de financiación antes del cierre.",
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
          copy: "Se firma el contrato de compraventa y queda definido el calendario contractual.",
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
      note:
        "Mientras cumplís cada etapa, el proyecto continúa avanzando en construcción, ventas y posicionamiento.",
    },
    capital: {
      eyebrow: "Ejemplo de flujo",
      title: "Distribuí el capital mientras el proyecto avanza",
      copy:
        "La preconstrucción puede permitirte comprometer el capital en distintas etapas, conservar liquidez durante parte de la obra y preparar con anticipación el saldo del cierre.",
      examplePrice: "Precio hipotético · US$1.000.000",
      segments: [
        { label: "Reserva y contrato", value: "20%", width: 20 },
        { label: "Segundo depósito", value: "10%", width: 10 },
        { label: "Tercer depósito", value: "10%", width: 10 },
        { label: "Saldo al cierre", value: "60%", width: 60 },
      ],
      explanation:
        "En este ejemplo, el comprador comprometería US$400.000 antes del cierre y resolvería el saldo de US$600.000 al cierre mediante fondos propios o financiación aprobada.",
      opportunity:
        "Durante ese período, la unidad mantiene el precio contractual mientras el proyecto puede continuar avanzando en sus listas de venta.",
      disclaimer: "Ejemplo ilustrativo. No representa un plan estándar.",
    },
    newProduct: {
      eyebrow: "Una unidad futura",
      title: "Producto nuevo, pensado para la demanda futura",
      copy:
        "La obra nueva combina diseño contemporáneo, sistemas recientes, terminaciones actuales y amenidades que pueden aumentar el atractivo de la propiedad para futuros compradores, residentes o inquilinos.",
      points: [
        "Diseño, sistemas y códigos recientes.",
        "Terminaciones y amenidades contemporáneas.",
        "Garantías y un proceso de entrega definido por el proyecto.",
        "Mayor atractivo para la demanda futura.",
        "Menor exposición inicial al desgaste de edificios antiguos.",
      ],
      imageAlt: "Arquitectura residencial contemporánea con materiales y terminaciones actuales",
    },
    comparison: {
      eyebrow: "La ventaja de entrar temprano",
      title: "Por qué muchos inversores prefieren entrar temprano",
      copy:
        "Una propiedad terminada se compra al valor actual y concentra el capital en el cierre. La preconstrucción permite entrar antes, distribuir depósitos y participar de la evolución del proyecto hasta la entrega.",
      variableLabel: "Variable",
      advantageLabel: "Ventaja de preconstrucción",
      rows: [
        {
          label: "Precio",
          advantage: "Contratás en una etapa temprana del proyecto.",
        },
        {
          label: "Plusvalía",
          advantage: "El valor puede evolucionar entre la firma y la entrega.",
        },
        {
          label: "Capital",
          advantage: "Los depósitos pueden distribuirse durante la obra.",
        },
        {
          label: "Selección",
          advantage:
            "Mayor disponibilidad de pisos, vistas y distribuciones al entrar temprano.",
        },
        {
          label: "Producto",
          advantage: "Recibís una unidad nueva con diseño y sistemas actuales.",
        },
        {
          label: "Tiempo",
          advantage: "Podés preparar el cierre y la financiación con anticipación.",
        },
        {
          label: "Mercado",
          advantage: "Entrás antes de que el proyecto complete su comercialización.",
        },
      ],
    },
    remote: {
      eyebrow: "Coordinación internacional",
      title: "Podés completar el proceso sin viajar",
      copy:
        "Desde la evaluación inicial hasta el cierre, la operación puede coordinarse a distancia. Esteban funciona como punto de contacto para ordenar el proceso y conectar a los profesionales necesarios.",
      centerTitle: "Esteban + Miami Life Realty",
      centerCopy: "Coordinación y seguimiento de la operación",
      roles: ["Comprador", "Desarrollador", "Abogado", "Compañía de títulos", "Financiación"],
      note:
        "La aprobación y las condiciones de financiación dependen del comprador, el proyecto y el proveedor.",
    },
    checklist: {
      eyebrow: "Selección y revisión",
      title: "Elegir bien potencia la ventaja de entrar temprano",
      copy:
        "Elegir un buen proyecto potencia las ventajas de entrar temprano: precio, plusvalía, selección, producto y estrategia de salida.",
      items: [
        "Desarrollador y experiencia de ejecución",
        "Contrato y derechos del comprador",
        "Calendario de depósitos",
        "Entrega estimada",
        "Costos de cierre",
        "Condición de entrega",
        "Política de renta",
        "Restricciones para ceder el contrato",
        "Presupuesto y cuota de condominio",
        "Estrategia de financiación",
        "Tasación al cierre",
        "Ubicación y demanda objetivo",
      ],
      closingCopy:
        "Comparar estos puntos te ayuda a elegir con claridad y aprovechar mejor el momento de entrada.",
    },
    fit: {
      eyebrow: "Perfil del inversor",
      title: "Preconstrucción puede ser ideal si querés crecer con el proyecto",
      copy:
        "Tu horizonte, tu capacidad de completar depósitos y tus objetivos ayudan a definir qué proyecto puede aprovechar mejor las ventajas de entrar temprano.",
      profileTitle: "Puede encajar especialmente bien si:",
      profileItems: [
        "Tenés horizonte medio o largo.",
        "Querés participar del potencial de plusvalía durante la obra.",
        "Podés completar depósitos escalonados.",
        "Priorizás crecimiento de capital a mediano o largo plazo.",
        "Valorás producto nuevo.",
        "Querés organizar el capital con anticipación.",
        "Buscás diversificación en Miami y en dólares.",
        "Comprás desde el exterior.",
      ],
      objectivesTitle: "Qué puede ayudarte a lograr:",
      objectivesItems: [
        "Entrar a un precio de etapa temprana.",
        "Acceder a mejores opciones de unidad.",
        "Distribuir el capital.",
        "Preparar financiación al cierre.",
        "Recibir un activo nuevo.",
        "Posicionarte para la valorización futura.",
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo esencial antes de comparar proyectos",
      copy:
        "Respuestas claras para entender cómo entrar temprano, organizar el capital y avanzar hacia la entrega.",
      items: [
        {
          question: "¿Por qué la plusvalía es una ventaja de la preconstrucción?",
          answer:
            "Porque comprás a un precio contractual antes de la entrega. Durante la construcción, el desarrollador puede avanzar sus precios de lista y el mercado puede aumentar el valor del proyecto y la zona. Cuando esa evolución es favorable, podés llegar al cierre con una unidad cuyo valor sea superior al precio pactado al entrar. El resultado depende del proyecto y del mercado.",
        },
        {
          question: "¿Cuánto se deposita?",
          answer:
            "Depende del proyecto. Muchos desarrolladores solicitan depósitos escalonados, pero el calendario y los porcentajes exactos quedan definidos en el contrato.",
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
            "No en todos los proyectos. La posibilidad de ceder el contrato, sus plazos y costos dependen del propio contrato.",
        },
        {
          question: "¿Por qué conviene entrar en las primeras etapas?",
          answer:
            "Porque suele haber mayor disponibilidad de unidades, más opciones de pisos, vistas y distribuciones, y la posibilidad de asegurar el precio antes de futuras etapas de comercialización.",
        },
        {
          question: "¿Qué costos existen al cierre?",
          answer:
            "Además del saldo, puede haber costos del comprador y cargos específicos del proyecto o desarrollador. Deben estimarse con la documentación vigente.",
        },
        {
          question: "¿Cómo ayuda Esteban a elegir el proyecto adecuado?",
          answer:
            "Esteban compara ubicación, etapa de venta, unidades disponibles, estructura de depósitos, política de renta y objetivos del comprador para identificar las opciones con mejor encaje.",
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
      title: "Buy today. Participate in the project’s growth.",
      copy:
        "Preconstruction allows you to enter at an early stage, stage your capital throughout construction, and reach delivery with a new residence that may have increased in value from the contract price.",
      highlight: "More time, more choice, and more appreciation potential.",
      primaryCta: "Explore projects",
      secondaryCta: "Talk with Esteban",
      microcopy: "The entire process can be coordinated remotely.",
      whatsappMessage:
        "Hi Esteban, I would like to explore Miami preconstruction projects and understand which options may fit my goals.",
      imageAlt: "Conceptual model of a contemporary residential tower",
      imageCaption: "Conceptual visualization",
    },
    benefits: {
      eyebrow: "Advantages of entering early",
      title: "Why invest in preconstruction",
      items: [
        {
          title: "Appreciation can begin before delivery",
          copy:
            "You secure a contract price while the project is still being developed. As construction and sales progress, listing prices often evolve. When the project and market perform well, that difference can become appreciation before closing.",
          support: "Entering early positions you ahead of future pricing stages.",
        },
        {
          title: "Capital distributed during construction",
          copy:
            "In many projects, deposits are made in stages. Instead of concentrating all capital into an immediate closing, you can distribute it throughout construction.",
        },
        {
          title: "Greater selection when entering early",
          copy:
            "Earlier stages often provide more choice of floors, views, orientation, layouts, and position within the tower. The most desirable residences may sell first.",
        },
        {
          title: "New and competitive product",
          copy:
            "You gain access to design, systems, finishes, technology, and amenities created for current and future demand.",
        },
        {
          title: "Time to prepare for closing",
          copy:
            "The construction period gives you time to prepare liquidity, documentation, ownership structure, and financing strategy before closing.",
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
      note:
        "While you complete each stage, the project continues progressing in construction, sales, and market positioning.",
    },
    capital: {
      eyebrow: "Cash-flow example",
      title: "Stage your capital while the project progresses",
      copy:
        "Preconstruction can allow you to commit capital in stages, preserve liquidity during part of the construction period, and prepare the closing balance in advance.",
      examplePrice: "Hypothetical price · US$1,000,000",
      segments: [
        { label: "Reservation and contract", value: "20%", width: 20 },
        { label: "Second deposit", value: "10%", width: 10 },
        { label: "Third deposit", value: "10%", width: 10 },
        { label: "Balance at closing", value: "60%", width: 60 },
      ],
      explanation:
        "In this example, the buyer would commit US$400,000 before closing and fund the remaining US$600,000 at closing through cash or approved financing.",
      opportunity:
        "During that period, the residence retains its contract price while the project may continue advancing through its sales pricing.",
      disclaimer: "Illustrative example. This is not a standard payment plan.",
    },
    newProduct: {
      eyebrow: "A future residence",
      title: "New product designed for future demand",
      copy:
        "New construction combines contemporary design, current systems, modern finishes, and amenities that can increase the property’s appeal to future buyers, residents, or tenants.",
      points: [
        "Recent design, systems, and building codes.",
        "Contemporary finishes and amenities.",
        "Warranties and a delivery process defined by the project.",
        "Greater appeal for future demand.",
        "Less initial exposure to wear in older buildings.",
      ],
      imageAlt: "Contemporary residential architecture with current materials and finishes",
    },
    comparison: {
      eyebrow: "The early-entry advantage",
      title: "Why many investors prefer to enter earlier",
      copy:
        "A completed property is purchased at today’s market value and concentrates capital at closing. Preconstruction allows you to enter earlier, stage deposits, and participate in the project’s evolution through delivery.",
      variableLabel: "Variable",
      advantageLabel: "Preconstruction advantage",
      rows: [
        {
          label: "Price",
          advantage: "You secure a contract at an early stage of the project.",
        },
        {
          label: "Appreciation",
          advantage: "Value may evolve between contract and delivery.",
        },
        {
          label: "Capital",
          advantage: "Deposits may be staged throughout construction.",
        },
        {
          label: "Selection",
          advantage:
            "Greater availability of floors, views, and layouts when entering early.",
        },
        {
          label: "Product",
          advantage: "You receive a new residence with current design and systems.",
        },
        {
          label: "Time",
          advantage: "You can prepare for closing and financing in advance.",
        },
        {
          label: "Market",
          advantage: "You enter before the project completes its sales cycle.",
        },
      ],
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
      eyebrow: "Selection and review",
      title: "Choosing well strengthens the advantage of entering early",
      copy:
        "Choosing the right project strengthens the advantages of entering early: price, appreciation, selection, product, and exit strategy.",
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
        "Comparing these points helps you choose with clarity and make better use of the entry stage.",
    },
    fit: {
      eyebrow: "Investor profile",
      title: "Preconstruction may be ideal if you want to grow with the project",
      copy:
        "Your horizon, ability to complete deposits, and goals help identify which project can best capture the advantages of entering early.",
      profileTitle: "It may fit especially well if:",
      profileItems: [
        "You have a medium- or long-term horizon.",
        "You want to participate in appreciation potential during construction.",
        "You can complete staged deposits.",
        "You prioritize medium- or long-term capital growth.",
        "You value new product.",
        "You want to organize capital in advance.",
        "You seek diversification in Miami and U.S. dollars.",
        "You are buying from abroad.",
      ],
      objectivesTitle: "What it can help you achieve:",
      objectivesItems: [
        "Enter at an early-stage price.",
        "Access better unit options.",
        "Stage your capital.",
        "Prepare financing for closing.",
        "Receive a new asset.",
        "Position yourself for future appreciation.",
      ],
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "What matters before comparing projects",
      copy:
        "Clear answers to understand how to enter early, organize capital, and move toward delivery.",
      items: [
        {
          question: "Why is appreciation an advantage of preconstruction?",
          answer:
            "Because you enter at a contract price before delivery. During construction, the developer may advance its listing prices and the market may increase the value of the project and its location. When that evolution is favorable, you may reach closing with a residence worth more than the price secured when you entered. Results depend on the project and market.",
        },
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
          question: "Why is it attractive to enter during the early stages?",
          answer:
            "Early stages often provide greater unit availability, more choice of floors, views, and layouts, and the opportunity to secure the price before future sales stages.",
        },
        {
          question: "What costs are due at closing?",
          answer:
            "In addition to the balance, there may be buyer closing costs and project- or developer-specific charges. They should be estimated from current documents.",
        },
        {
          question: "How does Esteban help you choose the right project?",
          answer:
            "Esteban compares location, sales stage, available residences, deposit structure, rental policy, and the buyer’s goals to identify the options with the strongest fit.",
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

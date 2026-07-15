import "server-only";

import type { Locale } from "@/i18n/config";

type MiamiReason = {
  title: string;
  copy: string;
  support?: string;
};

type MiamiFeature = {
  title: string;
  copy: string;
};

type MiamiStrategy = MiamiFeature & {
  cta?: string;
};

type MiamiFaqItem = {
  question: string;
  answer: string;
};

export type MiamiContent = {
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
  };
  reasons: {
    eyebrow: string;
    title: string;
    copy: string;
    items: MiamiReason[];
  };
  scale: {
    eyebrow: string;
    title: string;
    copy: string;
    verificationNote: string;
    sourcesSummary: string;
    sourceLabel: string;
    geographyLabel: string;
    periodLabel: string;
    verifiedLabel: string;
    methodologyLabel: string;
  };
  globalPlatform: {
    eyebrow: string;
    title: string;
    copy: string;
    highlight: string;
    points: string[];
    imageAlt: string;
  };
  infrastructure: {
    eyebrow: string;
    title: string;
    copy: string;
    items: MiamiFeature[];
  };
  lifestyle: {
    eyebrow: string;
    title: string;
    copy: string;
    points: string[];
    imageAlt: string;
  };
  strategies: {
    eyebrow: string;
    title: string;
    copy: string;
    items: MiamiStrategy[];
  };
  remote: {
    eyebrow: string;
    title: string;
    copy: string;
    centerTitle: string;
    roles: string[];
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    copy: string;
    items: MiamiFaqItem[];
    ctaTitle: string;
    ctaCopy: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappMessage: string;
    disclaimer: string;
  };
};

type LocalizedText = Record<Locale, string>;

export type MiamiMetric = {
  id: "metropolitan-gdp" | "mia-passengers" | "portmiami-cruise" | "international-share" | "florida-income-tax";
  value: LocalizedText;
  label: LocalizedText;
  geography: LocalizedText;
  period: LocalizedText;
  sourceName: string;
  sourceUrl: string;
  verifiedAt: "2026-07-14";
  methodologyNote?: LocalizedText;
};

export type MiamiMetricView = {
  id: MiamiMetric["id"];
  value: string;
  label: string;
  geography: string;
  period: string;
  sourceName: string;
  verifiedAt: string;
  methodologyNote?: string;
};

const metrics: MiamiMetric[] = [
  {
    id: "metropolitan-gdp",
    value: { es: "≈US$575B", en: "≈$575B" },
    label: {
      es: "PIB nominal de la economía metropolitana",
      en: "Nominal GDP of the metropolitan economy",
    },
    geography: {
      es: "MSA Miami–Fort Lauderdale–West Palm Beach",
      en: "Miami–Fort Lauderdale–West Palm Beach MSA",
    },
    period: { es: "2024", en: "2024" },
    sourceName: "U.S. Bureau of Economic Analysis (BEA)",
    sourceUrl: "https://apps.bea.gov/regional/zip/CAGDP2.zip",
    verifiedAt: "2026-07-14",
    methodologyNote: {
      es: "PIB nominal 2024 de todas las industrias, calculado a partir de CAGDP2 mediante la suma de Broward, Miami-Dade y Palm Beach: US$574.994.257.000, redondeado a aproximadamente US$575 mil millones para el área metropolitana Miami–Fort Lauderdale–West Palm Beach.",
      en: "2024 all-industry nominal GDP from CAGDP2, summed for Broward, Miami-Dade, and Palm Beach counties: $574,994,257,000, rounded to approximately $575 billion for the Miami–Fort Lauderdale–West Palm Beach metropolitan area.",
    },
  },
  {
    id: "mia-passengers",
    value: { es: "55,3 M", en: "55.3M" },
    label: {
      es: "Pasajeros en Miami International Airport",
      en: "Passengers at Miami International Airport",
    },
    geography: {
      es: "Miami International Airport, Miami-Dade",
      en: "Miami International Airport, Miami-Dade",
    },
    period: { es: "Año calendario 2025", en: "Calendar year 2025" },
    sourceName: "Miami International Airport",
    sourceUrl:
      "https://news.miami-airport.com/mia-soars-to-sixth-straight-record-year-in-cargo-growth/",
    verifiedAt: "2026-07-14",
  },
  {
    id: "portmiami-cruise",
    value: { es: "8,56 M", en: "8.56M" },
    label: {
      es: "Cruceristas movilizados por PortMiami",
      en: "Cruise passengers handled by PortMiami",
    },
    geography: { es: "PortMiami, Miami-Dade", en: "PortMiami, Miami-Dade" },
    period: { es: "Año fiscal 2025", en: "Fiscal year 2025" },
    sourceName: "Miami-Dade County / PortMiami",
    sourceUrl: "https://www.miamidade.gov/global/release.page?Mduid_release=rel1764622080449470",
    verifiedAt: "2026-07-14",
  },
  {
    id: "international-share",
    value: { es: "52 %", en: "52%" },
    label: {
      es: "Participación de compradores globales en obra nueva",
      en: "Global buyer share of new-construction sales",
    },
    geography: { es: "Sur de Florida", en: "South Florida" },
    period: {
      es: "Informe de noviembre de 2025 · 22 meses previos",
      en: "November 2025 report · prior 22 months",
    },
    sourceName: "MIAMI Association of REALTORS® · PR Newswire",
    sourceUrl:
      "https://www.prnewswire.com/news-releases/new-international-report-global-buyer-share-increases-for-miami-new-construction-units-buyers-from-73-countries-302613034.html",
    verifiedAt: "2026-07-14",
  },
  {
    id: "florida-income-tax",
    value: { es: "0 %", en: "0%" },
    label: {
      es: "Impuesto estatal sobre la renta personal",
      en: "State personal income tax",
    },
    geography: { es: "Estado de Florida", en: "State of Florida" },
    period: {
      es: "Vigente al 14 de julio de 2026",
      en: "Current as of July 14, 2026",
    },
    sourceName: "Florida Department of Revenue",
    sourceUrl: "https://floridarevenue.com/faq/Pages/FAQDetails.aspx?FAQID=1466",
    verifiedAt: "2026-07-14",
  },
];

const verifiedAtLabels = {
  "2026-07-14": {
    es: "14 de julio de 2026",
    en: "July 14, 2026",
  },
} satisfies Record<MiamiMetric["verifiedAt"], LocalizedText>;

const content = {
  es: {
    hero: {
      eyebrow: "Invertir en Miami",
      title: "Miami atrae al mundo. Tu inversión puede formar parte de ese crecimiento.",
      copy:
        "Invertí en un mercado en dólares con demanda internacional, conectividad global, una economía de gran escala y oportunidades para distintos objetivos patrimoniales.",
      highlight:
        "Capital internacional, infraestructura real y una ciudad que continúa transformándose.",
      primaryCta: "Explorar proyectos",
      secondaryCta: "Hablar con Esteban",
      microcopy: "Todo el proceso puede coordinarse desde el exterior.",
      whatsappMessage:
        "Hola Esteban, quiero conocer oportunidades de inversión inmobiliaria en Miami y entender qué estrategia puede encajar mejor con mi objetivo.",
      imageAlt: "Vista editorial del skyline y la costa de Miami",
    },
    reasons: {
      eyebrow: "Por qué Miami",
      title: "Por qué el capital internacional elige Miami",
      copy:
        "Miami combina activos en dólares, demanda global, una economía internacional y un estilo de vida que continúa atrayendo residentes, empresas y compradores de distintos países.",
      items: [
        {
          title: "Demanda internacional que sostiene el mercado",
          copy:
            "Miami recibe compradores domésticos e internacionales, con una relación especialmente fuerte con América Latina. Esa diversidad amplía la base de demanda para propiedades residenciales, obra nueva y activos premium.",
          support: "Miami no depende de un único perfil comprador.",
        },
        {
          title: "Patrimonio en dólares",
          copy:
            "Invertir en Miami permite incorporar un activo real denominado en dólares dentro del mercado estadounidense.",
        },
        {
          title: "Economía y negocios",
          copy:
            "South Florida opera sobre una economía metropolitana de gran escala, con empresas, comercio, finanzas, turismo, salud, logística y servicios internacionales.",
        },
        {
          title: "Conectividad internacional",
          copy:
            "MIA, PortMiami y Brightline conectan Miami por aire, mar y tierra con Estados Unidos, América Latina y el resto del mundo.",
        },
        {
          title: "Marco estatal competitivo",
          copy:
            "Florida no cobra impuesto estatal sobre la renta personal, una ventaja comparativa para muchos residentes, empresarios e inversores.",
        },
      ],
    },
    scale: {
      eyebrow: "Miami en cifras",
      title: "Una ciudad respaldada por escala real",
      copy:
        "La fuerza de Miami no se explica solamente por su imagen. También se refleja en el tamaño de su economía, sus conexiones internacionales y el volumen de personas y capital que circulan por la región.",
      verificationNote:
        "Datos verificados con fuentes públicas e institucionales al 14 de julio de 2026.",
      sourcesSummary: "Fuentes y metodología",
      sourceLabel: "Fuente",
      geographyLabel: "Geografía",
      periodLabel: "Período",
      verifiedLabel: "Verificado",
      methodologyLabel: "Metodología",
    },
    globalPlatform: {
      eyebrow: "Una ciudad conectada al mundo",
      title: "Miami conecta capital, negocios y Latinoamérica",
      copy:
        "Para muchos compradores internacionales, Miami funciona como residencia, segunda base, centro de negocios y plataforma patrimonial dentro de Estados Unidos. Su conexión cultural y comercial con América Latina continúa siendo uno de sus mayores diferenciales.",
      highlight: "Una ciudad estadounidense con alcance verdaderamente internacional.",
      points: [
        "Compradores internacionales",
        "Capital latinoamericano",
        "Operaciones en dólares",
        "Empresas y hubs regionales",
      ],
      imageAlt: "Globo editorial con Miami como conexión entre mercados internacionales",
    },
    infrastructure: {
      eyebrow: "Escala y conectividad",
      title: "Una economía que se mueve por aire, mar y tierra",
      copy:
        "La demanda inmobiliaria se apoya en una región conectada con los principales centros de negocios y turismo, y en una economía diversificada que va mucho más allá de la playa.",
      items: [
        {
          title: "MIA",
          copy:
            "Conecta residentes, visitantes, empresas y capital con Estados Unidos y mercados internacionales, reforzando la visibilidad global y la actividad de la región.",
        },
        {
          title: "PortMiami",
          copy:
            "El movimiento de cruceros y comercio sostiene turismo, logística, servicios y llegada de personas con impacto en la economía metropolitana.",
        },
        {
          title: "Brightline",
          copy:
            "Amplía la movilidad regional entre Miami, Fort Lauderdale, West Palm Beach y Orlando para residentes, profesionales y visitantes.",
        },
        {
          title: "Economía metropolitana",
          copy:
            "Negocios, finanzas, salud, turismo, comercio y servicios internacionales generan empleo y respaldan una base amplia de demanda residencial.",
        },
      ],
    },
    lifestyle: {
      eyebrow: "Una ciudad donde la gente quiere estar",
      title: "Un estilo de vida que también genera demanda",
      copy:
        "Clima, costa, gastronomía, cultura, deporte y actividad internacional convierten a Miami en un lugar atractivo para vivir, trabajar, vacacionar y tener una segunda residencia. Ese deseo también forma parte de la demanda inmobiliaria.",
      points: [
        "Vida frente al agua",
        "Clima todo el año",
        "Cultura y gastronomía",
        "Deportes y eventos",
        "Turismo y segunda residencia",
        "Atractivo para vivir e invertir",
      ],
      imageAlt: "Estilo de vida urbano y costero en Miami",
    },
    strategies: {
      eyebrow: "Una estrategia para cada objetivo",
      title: "Distintas formas de invertir. Un mismo mercado global.",
      copy:
        "Miami permite construir estrategias diferentes según el horizonte, el uso esperado y la forma de organizar el capital.",
      items: [
        {
          title: "Preconstrucción",
          copy:
            "Entrar en una etapa temprana, distribuir depósitos y posicionarse para participar del crecimiento del proyecto.",
          cta: "Conocer la preconstrucción",
        },
        {
          title: "Renta",
          copy:
            "Seleccionar propiedades y edificios cuya demanda, ubicación y reglas acompañen la estrategia de alquiler.",
        },
        {
          title: "Segunda residencia",
          copy:
            "Combinar uso personal, exposición en dólares y un activo en una ciudad de alcance internacional.",
        },
        {
          title: "Diversificación patrimonial",
          copy:
            "Incorporar bienes raíces de Estados Unidos dentro de una estrategia patrimonial más amplia.",
        },
      ],
    },
    remote: {
      eyebrow: "Coordinación internacional",
      title: "Podés invertir en Miami sin vivir en Miami",
      copy:
        "La búsqueda, comparación, selección, documentación y gran parte del cierre pueden coordinarse a distancia. Esteban funciona como punto de contacto para ordenar el proceso y conectar a los profesionales necesarios.",
      centerTitle: "Esteban + Miami Life Realty",
      roles: [
        "Comprador",
        "Esteban + Miami Life Realty",
        "Vendedor o desarrollador",
        "Abogado",
        "Compañía de títulos",
        "Financiación",
      ],
      note:
        "La aprobación financiera, los requisitos documentales y las condiciones de cierre dependen del comprador, la propiedad y cada proveedor.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Respuestas para avanzar con claridad",
      copy:
        "Una primera orientación sobre el mercado, las estrategias disponibles y la coordinación de una compra desde el exterior.",
      items: [
        {
          question: "¿Por qué Miami atrae inversión internacional?",
          answer:
            "Miami combina compradores domésticos e internacionales, conexión con América Latina, una economía de gran escala y una marca global que atrae capital, empresas y residentes.",
        },
        {
          question: "¿Qué ventaja tiene invertir en un activo en dólares?",
          answer:
            "Permite incorporar un activo real denominado en dólares dentro del mercado estadounidense y diversificar el patrimonio geográfica y monetariamente.",
        },
        {
          question: "¿La demanda internacional sigue siendo relevante?",
          answer:
            "Sí. Miami y el sur de Florida continúan recibiendo compradores de distintos países, especialmente en obra nueva y propiedades premium.",
        },
        {
          question: "¿Florida cobra impuesto estatal sobre la renta personal?",
          answer:
            "Florida no cobra impuesto estatal sobre la renta personal. La compra y tenencia de una propiedad sí puede generar otros impuestos y costos que deben revisarse con profesionales especializados.",
        },
        {
          question: "¿Qué tipo de inversión puedo hacer en Miami?",
          answer:
            "Podés evaluar preconstrucción, renta, segunda residencia, diversificación patrimonial o una combinación de objetivos.",
        },
        {
          question: "¿Puedo invertir en preconstrucción?",
          answer:
            "Sí. Miami cuenta con una oferta importante de obra nueva y proyectos en desarrollo. La selección depende de la ubicación, etapa, depósitos y objetivo del comprador.",
        },
        {
          question: "¿Puedo comprar desde el exterior?",
          answer:
            "Sí. Gran parte del proceso puede coordinarse a distancia mediante videollamadas, visitas virtuales, firmas electrónicas y trabajo conjunto con los profesionales del cierre.",
        },
        {
          question: "¿Puedo financiar siendo extranjero?",
          answer:
            "Puede ser posible. La aprobación, el pago inicial y las condiciones dependen del perfil, la documentación, la propiedad y el proveedor de financiación.",
        },
        {
          question: "¿Puedo alquilar la propiedad?",
          answer:
            "Sí, cuando las reglas del edificio, el condominio y el municipio permiten la estrategia de renta buscada. Esteban puede ayudar a filtrar opciones alineadas con ese objetivo.",
        },
        {
          question: "¿Cómo me ayuda Esteban a elegir?",
          answer:
            "Esteban compara zonas, proyectos, propiedades, precios, etapas de venta, reglas de uso y objetivos patrimoniales para ayudarte a concentrarte en las opciones con mejor encaje.",
        },
      ],
      ctaTitle: "Miami puede ser parte de tu próxima decisión patrimonial",
      ctaCopy:
        "Contale a Esteban qué buscás, cuánto querés invertir y cuál es tu horizonte. A partir de ahí puede ayudarte a comparar zonas, proyectos y oportunidades.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Explorar proyectos",
      whatsappMessage:
        "Hola Esteban, quiero conocer oportunidades de inversión inmobiliaria en Miami y entender qué estrategia puede encajar mejor con mi objetivo.",
      disclaimer:
        "La información es general y puede cambiar. Impuestos, financiación, reglas de renta, costos y condiciones dependen de cada comprador, propiedad y operación. No sustituye asesoramiento legal, fiscal o financiero.",
    },
  },
  en: {
    hero: {
      eyebrow: "Investing in Miami",
      title: "Miami attracts the world. Your investment can be part of that growth.",
      copy:
        "Invest in a dollar-based market with international demand, global connectivity, a large-scale economy, and opportunities for different wealth-building goals.",
      highlight:
        "International capital, real infrastructure, and a city that continues to transform.",
      primaryCta: "Explore projects",
      secondaryCta: "Talk with Esteban",
      microcopy: "The entire process can be coordinated from abroad.",
      whatsappMessage:
        "Hi Esteban, I would like to explore Miami real estate opportunities and understand which investment strategy may best fit my goals.",
      imageAlt: "Editorial view of Miami’s skyline and waterfront",
    },
    reasons: {
      eyebrow: "Why Miami",
      title: "Why international capital chooses Miami",
      copy:
        "Miami combines dollar-based assets, global demand, an international economy, and a lifestyle that continues to attract residents, companies, and buyers from around the world.",
      items: [
        {
          title: "International demand that supports the market",
          copy:
            "Miami attracts domestic and international buyers, with an especially strong connection to Latin America. That diversity expands the demand base for residential property, new development, and premium assets.",
          support: "Miami does not depend on a single buyer profile.",
        },
        {
          title: "Dollar-denominated wealth",
          copy:
            "Investing in Miami adds a dollar-denominated real asset within the U.S. market.",
        },
        {
          title: "Economy and business",
          copy:
            "South Florida operates within a large-scale metropolitan economy spanning business, commerce, finance, tourism, healthcare, logistics, and international services.",
        },
        {
          title: "International connectivity",
          copy:
            "MIA, PortMiami, and Brightline connect Miami by air, sea, and rail with the United States, Latin America, and the rest of the world.",
        },
        {
          title: "Competitive state framework",
          copy:
            "Florida does not impose a state personal income tax, a comparative advantage for many residents, business owners, and investors.",
        },
      ],
    },
    scale: {
      eyebrow: "Miami by the numbers",
      title: "A city supported by real scale",
      copy:
        "Miami’s strength is not explained by image alone. It is also reflected in the size of its economy, international connections, and the volume of people and capital moving through the region.",
      verificationNote:
        "Data verified with public and institutional sources as of July 14, 2026.",
      sourcesSummary: "Sources and methodology",
      sourceLabel: "Source",
      geographyLabel: "Geography",
      periodLabel: "Period",
      verifiedLabel: "Verified",
      methodologyLabel: "Methodology",
    },
    globalPlatform: {
      eyebrow: "A city connected to the world",
      title: "Miami connects capital, business, and Latin America",
      copy:
        "For many international buyers, Miami serves as a residence, second base, business center, and wealth platform within the United States. Its cultural and commercial connection with Latin America remains one of its strongest differentiators.",
      highlight: "A U.S. city with truly international reach.",
      points: [
        "International buyers",
        "Latin American capital",
        "Dollar-based transactions",
        "Companies and regional hubs",
      ],
      imageAlt: "Editorial globe showing Miami connecting international markets",
    },
    infrastructure: {
      eyebrow: "Scale and connectivity",
      title: "An economy moving by air, sea, and rail",
      copy:
        "Real estate demand is supported by a region connected to major business and tourism centers, and by a diversified economy that reaches far beyond the beach.",
      items: [
        {
          title: "MIA",
          copy:
            "It connects residents, visitors, companies, and capital with the United States and international markets, reinforcing the region’s global visibility and activity.",
        },
        {
          title: "PortMiami",
          copy:
            "Cruise and trade activity supports tourism, logistics, services, and the arrival of people across the metropolitan economy.",
        },
        {
          title: "Brightline",
          copy:
            "It expands regional mobility between Miami, Fort Lauderdale, West Palm Beach, and Orlando for residents, professionals, and visitors.",
        },
        {
          title: "Metropolitan economy",
          copy:
            "Business, finance, healthcare, tourism, commerce, and international services create employment and support a broad base of residential demand.",
        },
      ],
    },
    lifestyle: {
      eyebrow: "A city where people want to be",
      title: "A lifestyle that also creates demand",
      copy:
        "Climate, waterfront living, dining, culture, sports, and international activity make Miami an attractive place to live, work, visit, and own a second residence. That desire also contributes to real estate demand.",
      points: [
        "Waterfront living",
        "Year-round climate",
        "Culture and dining",
        "Sports and events",
        "Tourism and second homes",
        "Appeal for living and investing",
      ],
      imageAlt: "Urban waterfront lifestyle in Miami",
    },
    strategies: {
      eyebrow: "A strategy for every goal",
      title: "Different ways to invest. One global market.",
      copy:
        "Miami supports different strategies depending on the investment horizon, intended use, and capital plan.",
      items: [
        {
          title: "Preconstruction",
          copy:
            "Enter during an early stage, distribute deposits, and position yourself to participate in the project’s growth.",
          cta: "Explore preconstruction",
        },
        {
          title: "Rental",
          copy:
            "Select properties and buildings whose demand, location, and rules support the rental strategy.",
        },
        {
          title: "Second residence",
          copy:
            "Combine personal use, dollar exposure, and an asset in an internationally connected city.",
        },
        {
          title: "Wealth diversification",
          copy: "Add U.S. real estate to a broader wealth strategy.",
        },
      ],
    },
    remote: {
      eyebrow: "International coordination",
      title: "You can invest in Miami without living in Miami",
      copy:
        "The search, comparison, selection, documentation, and much of the closing process can be coordinated remotely. Esteban serves as the point of contact who organizes the process and connects the necessary professionals.",
      centerTitle: "Esteban + Miami Life Realty",
      roles: [
        "Buyer",
        "Esteban + Miami Life Realty",
        "Seller or developer",
        "Attorney",
        "Title company",
        "Financing",
      ],
      note:
        "Financing approval, documentation requirements, and closing conditions depend on the buyer, property, and each provider.",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Answers to move forward with clarity",
      copy:
        "An initial guide to the market, available strategies, and coordinating a purchase from abroad.",
      items: [
        {
          question: "Why does Miami attract international investment?",
          answer:
            "Miami combines domestic and international buyers, a strong connection with Latin America, a large-scale economy, and a global brand that attracts capital, companies, and residents.",
        },
        {
          question: "What is the advantage of investing in a dollar-based asset?",
          answer:
            "It adds a dollar-denominated real asset within the U.S. market and helps diversify wealth geographically and across currencies.",
        },
        {
          question: "Is international demand still relevant?",
          answer:
            "Yes. Miami and South Florida continue to attract buyers from many countries, especially for new development and premium properties.",
        },
        {
          question: "Does Florida impose a state personal income tax?",
          answer:
            "Florida does not impose a state personal income tax. Buying and owning property may still involve other taxes and costs that should be reviewed with specialized professionals.",
        },
        {
          question: "What type of investment can I make in Miami?",
          answer:
            "You can evaluate preconstruction, rental property, a second residence, wealth diversification, or a combination of goals.",
        },
        {
          question: "Can I invest in preconstruction?",
          answer:
            "Yes. Miami offers a significant selection of new development and projects under construction. The right choice depends on location, sales stage, deposits, and the buyer’s goals.",
        },
        {
          question: "Can I buy from abroad?",
          answer:
            "Yes. Much of the process can be coordinated remotely through video calls, virtual tours, electronic signatures, and collaboration with the professionals involved in closing.",
        },
        {
          question: "Can I obtain financing as a foreign buyer?",
          answer:
            "It may be possible. Approval, down payment, and terms depend on the buyer’s profile, documentation, property, and financing provider.",
        },
        {
          question: "Can I rent the property?",
          answer:
            "Yes, when the building, condominium, and municipal rules allow the intended rental strategy. Esteban can help filter options aligned with that goal.",
        },
        {
          question: "How does Esteban help me choose?",
          answer:
            "Esteban compares areas, projects, properties, prices, sales stages, use rules, and wealth goals to help you focus on the options with the strongest fit.",
        },
      ],
      ctaTitle: "Miami can be part of your next wealth decision",
      ctaCopy:
        "Tell Esteban what you are looking for, how much you plan to invest, and your timeline. From there, he can help you compare areas, projects, and opportunities.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Explore projects",
      whatsappMessage:
        "Hi Esteban, I would like to explore Miami real estate opportunities and understand which investment strategy may best fit my goals.",
      disclaimer:
        "This information is general and may change. Taxes, financing, rental rules, costs, and terms depend on each buyer, property, and transaction. It does not replace legal, tax, or financial advice.",
    },
  },
} satisfies Record<Locale, MiamiContent>;

export function getMiamiContent(locale: Locale): MiamiContent {
  return content[locale];
}

export function getMiamiMetrics(locale: Locale): MiamiMetricView[] {
  return metrics.map((metric) => ({
    id: metric.id,
    value: metric.value[locale],
    label: metric.label[locale],
    geography: metric.geography[locale],
    period: metric.period[locale],
    sourceName: metric.sourceName,
    verifiedAt: verifiedAtLabels[metric.verifiedAt][locale],
    methodologyNote: metric.methodologyNote?.[locale],
  }));
}

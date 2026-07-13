import "server-only";

import type {
  GovernedField,
  LocalizedText,
  PriorityProjectGovernance,
  ProjectSource,
} from "./types";

const AUDIT_DATE = "2026-07-13";
const AUDIT_RESPONSIBLE = "Phase 3A source audit";

const text = (es: string, en: string): LocalizedText => ({ es, en });

function reconfirm<T>(
  value: T,
  sourceIds: string[],
  note: LocalizedText,
): GovernedField<T> {
  return {
    value,
    status: "reconfirmation_required",
    sourceIds,
    reviewedAt: AUDIT_DATE,
    reviewedBy: AUDIT_RESPONSIBLE,
    validity: { kind: "reconfirm_before_use" },
    note,
  };
}

function unverified<T>(
  note: LocalizedText,
  sourceIds: string[] = [],
): GovernedField<T> {
  return {
    value: null,
    status: "unverified",
    sourceIds,
    reviewedAt: AUDIT_DATE,
    reviewedBy: AUDIT_RESPONSIBLE,
    validity: { kind: "reconfirm_before_use" },
    note,
  };
}

const internalSources = (
  idPrefix: string,
  modulePath: string,
): ProjectSource[] => [
  {
    id: `${idPrefix}-legacy-catalog`,
    title: text("Módulo histórico del catálogo", "Legacy catalog module"),
    kind: "internal_catalog",
    repositoryPath: modulePath,
    observedAt: AUDIT_DATE,
    public: false,
    note: text(
      "Inventario interno útil para detectar contradicciones; no se considera evidencia comercial.",
      "Internal inventory used to identify contradictions; it is not treated as commercial evidence.",
    ),
  },
  {
    id: `${idPrefix}-asset-inventory`,
    title: text(
      "Inventario técnico de assets de Fase 2",
      "Phase 2 technical asset inventory",
    ),
    kind: "asset_inventory",
    repositoryPath: "docs/phase-2-project-asset-inventory.tsv",
    observedAt: "2026-07-12",
    public: false,
    note: text(
      "Confirma disponibilidad técnica y dimensiones; no acredita derechos de uso.",
      "Confirms technical availability and dimensions; it does not establish usage rights.",
    ),
  },
];

const theWilliam: PriorityProjectGovernance = {
  slug: "the-william",
  overallStatus: "reconfirmation_required",
  location: text(
    "2040 NE 163rd St, North Miami Beach, FL 33162",
    "2040 NE 163rd St, North Miami Beach, FL 33162",
  ),
  developer: text(
    "Blue Road e ILIA Development Group",
    "Blue Road and ILIA Development Group",
  ),
  summary: text(
    "Condominio residencial de 26 pisos y 374 residencias, con tipologías desde estudios hasta tres dormitorios, según el sitio oficial y Fortune Development Sales.",
    "A 26-story residential condominium with 374 residences ranging from studios to three bedrooms, according to the official site and Fortune Development Sales.",
  ),
  profileFit: [
    text(
      "Personas que quieren explorar North Miami Beach con una variedad amplia de tipologías.",
      "Buyers exploring North Miami Beach with a broad range of residence types.",
    ),
    text(
      "Quienes valoran servicios residenciales, coworking y amenidades de bienestar dentro del edificio.",
      "Those who value residential services, coworking, and wellness amenities within the building.",
    ),
    text(
      "Compradores dispuestos a reconfirmar precio, uso y calendario antes de comparar.",
      "Buyers willing to reconfirm price, use terms, and timing before comparing options.",
    ),
  ],
  factualHighlights: [
    text("Estudios a tres dormitorios.", "Studios to three bedrooms."),
    text(
      "Arquitectura de Carlos Ott y Behar Font; interiores de Urban Robot.",
      "Architecture by Carlos Ott and Behar Font; interiors by Urban Robot.",
    ),
    text(
      "Dos niveles de amenidades comunicados por el sitio oficial.",
      "Two amenity levels communicated by the official site.",
    ),
  ],
  risks: [
    text(
      "El catálogo histórico conserva un precio fechado 25/09/2025 y una política de renta sin documento asociado.",
      "The legacy catalog retains a price dated September 25, 2025 and a rental policy without an associated document.",
    ),
    text(
      "Los sitios públicos de terceros muestran cifras y condiciones distintas; no se trasladan a esta ficha.",
      "Third-party public sites show different figures and terms; they are not carried into this page.",
    ),
    text(
      "La procedencia y autorización web de las imágenes existentes siguen pendientes.",
      "The provenance and web usage authorization for existing images remain pending.",
    ),
  ],
  openQuestions: [
    text("Price sheet e inventario vigente.", "Current price sheet and inventory."),
    text(
      "Política de renta contenida en documentos del condominio.",
      "Rental policy stated in the condominium documents.",
    ),
    text(
      "Plan de pagos, financiación y derechos de imágenes.",
      "Payment plan, financing, and image rights.",
    ),
  ],
  fields: {
    commercialStatus: reconfirm(
      text(
        "El proyecto mantiene sitio oficial y canal de consultas activos.",
        "The project maintains an active official site and inquiry channel.",
      ),
      ["william-official", "william-fortune"],
      text(
        "El estado comercial y el inventario puntual deben confirmarse con Esteban.",
        "Commercial status and unit-level inventory must be confirmed with Esteban.",
      ),
    ),
    price: unverified(
      text(
        "No se encontró un price sheet vigente proporcionado por Esteban.",
        "No current price sheet provided by Esteban was found.",
      ),
    ),
    delivery: reconfirm(
      text("2029, informado por Fortune.", "2029, reported by Fortune."),
      ["william-fortune"],
      text(
        "Fecha estimada; requiere documento vigente antes de utilizarse en una decisión.",
        "Estimated date; a current document is required before using it in a decision.",
      ),
    ),
    rentalPolicy: unverified(
      text(
        "El sitio oficial revisado no publica condiciones contractuales de renta.",
        "The reviewed official site does not publish contractual rental terms.",
      ),
    ),
    financing: unverified(
      text(
        "No se encontró una propuesta de financiación vigente y aplicable al comprador internacional.",
        "No current financing offer applicable to an international buyer was found.",
      ),
    ),
    availability: unverified(
      text(
        "La disponibilidad requiere inventario fechado o confirmación autorizada.",
        "Availability requires dated inventory or authorized confirmation.",
      ),
    ),
    paymentPlan: unverified<LocalizedText[]>(
      text(
        "No se publica hasta contar con un cronograma vigente y trazable.",
        "Not published until a current, traceable schedule is available.",
      ),
    ),
    imageRights: unverified(
      text(
        "Los assets responden correctamente, pero no se encontró autorización de uso.",
        "The assets respond correctly, but no usage authorization was found.",
      ),
      ["william-asset-inventory"],
    ),
  },
  sources: [
    {
      id: "william-official",
      title: text(
        "Sitio oficial de The William",
        "The William official website",
      ),
      kind: "official_project_site",
      url: "https://www.thewilliamresidencesmiami.com/",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Identidad, equipo, tipologías y amenidades.",
        "Identity, team, residence types, and amenities.",
      ),
    },
    {
      id: "william-fortune",
      title: text(
        "Ficha de Fortune Development Sales",
        "Fortune Development Sales project page",
      ),
      kind: "official_sales_site",
      url: "https://fortuneintlgroup.com/property/the-william/",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Dirección, equipo, cantidad de unidades y entrega estimada.",
        "Address, team, unit count, and estimated completion.",
      ),
    },
    ...internalSources(
      "william",
      "src/data/projects/the-william.ts",
    ),
  ],
};

const fridaKahlo: PriorityProjectGovernance = {
  slug: "frida-kahlo",
  overallStatus: "reconfirmation_required",
  location: text(
    "119 NW 29th St, Miami, FL 33127 — Wynwood",
    "119 NW 29th St, Miami, FL 33127 — Wynwood",
  ),
  developer: text(
    "Property Markets Group (PMG) y LNDMRK Development",
    "Property Markets Group (PMG) and LNDMRK Development",
  ),
  summary: text(
    "Desarrollo residencial de 244 unidades en Wynwood, diseñado por Carlos Ott en colaboración con CUBE 3; el sitio oficial limita algunas oficinas con escritura a residencias seleccionadas.",
    "A 244-residence development in Wynwood designed by Carlos Ott with CUBE 3; the official site limits certain deeded offices to select residences.",
  ),
  profileFit: [
    text(
      "Personas que quieren comparar una propuesta residencial vinculada al entorno cultural de Wynwood.",
      "Buyers comparing a residential concept tied to Wynwood's cultural setting.",
    ),
    text(
      "Quienes consideran residencias terminadas y amuebladas, sujeto a confirmar inclusiones contractuales.",
      "Those considering finished and furnished residences, subject to confirming contractual inclusions.",
    ),
    text(
      "Compradores que necesitan revisar con precisión uso, oficina y reglas de renta antes de avanzar.",
      "Buyers who need to review use, office, and rental rules carefully before proceeding.",
    ),
  ],
  factualHighlights: [
    text("244 residencias.", "244 residences."),
    text(
      "Estudios a tres dormitorios; oficina con escritura en residencias seleccionadas.",
      "Studios to three bedrooms; deeded office in select residences.",
    ),
    text(
      "Piscina, fitness y circuito termal comunicados por el developer.",
      "Pool, fitness, and thermal circuit communicated by the developer.",
    ),
  ],
  risks: [
    text(
      "El catálogo histórico indica entrega 2029, pero su plan de pagos menciona cierre Q3 2028.",
      "The legacy catalog states 2029 completion, while its payment plan references a Q3 2028 closing.",
    ),
    text(
      "La flexibilidad de renta publicada no define mínimos, licencias ni restricciones finales.",
      "Published rental flexibility does not define minimum stays, licensing, or final restrictions.",
    ),
    text(
      "Las imágenes se conservan de forma provisional; su licencia web no está documentada.",
      "Images are retained provisionally; their web license is not documented.",
    ),
  ],
  openQuestions: [
    text("Entrega y plan de pagos vigentes.", "Current completion and payment plan."),
    text(
      "Qué unidades incluyen oficina y qué derechos la acompañan.",
      "Which units include an office and what rights accompany it.",
    ),
    text(
      "Reglas exactas de renta, inventario, precio y derechos de imágenes.",
      "Exact rental rules, inventory, price, and image rights.",
    ),
  ],
  fields: {
    commercialStatus: reconfirm(
      text("PMG informa “Active Sales”.", "PMG reports “Active Sales”."),
      ["frida-pmg"],
      text(
        "La disponibilidad puntual no se infiere de ese estado general.",
        "Unit-level availability is not inferred from that general status.",
      ),
    ),
    price: unverified(
      text(
        "No se encontró un price sheet vigente proporcionado por Esteban.",
        "No current price sheet provided by Esteban was found.",
      ),
    ),
    delivery: unverified(
      text(
        "Las fechas del catálogo interno se contradicen y no hay documento vigente aportado.",
        "Dates in the internal catalog conflict and no current supplied document is available.",
      ),
    ),
    rentalPolicy: reconfirm(
      text(
        "El sitio oficial comunica flexibilidad para renta corta; faltan condiciones exactas.",
        "The official site communicates short-term rental flexibility; exact terms are missing.",
      ),
      ["frida-official-residences"],
      text(
        "Debe revisarse contra documentos del condominio y regulación aplicable.",
        "Must be checked against condominium documents and applicable regulations.",
      ),
    ),
    financing: unverified(
      text(
        "No se encontró financiación vigente documentada.",
        "No documented current financing was found.",
      ),
    ),
    availability: unverified(
      text(
        "“Active Sales” no sustituye un inventario fechado.",
        "“Active Sales” does not replace dated inventory.",
      ),
      ["frida-pmg"],
    ),
    paymentPlan: unverified<LocalizedText[]>(
      text(
        "El plan histórico no se muestra por la contradicción de fechas y falta de fuente vigente.",
        "The legacy plan is not displayed because of conflicting dates and the absence of a current source.",
      ),
    ),
    imageRights: unverified(
      text(
        "Disponibilidad técnica confirmada; autorización de uso pendiente.",
        "Technical availability confirmed; usage authorization pending.",
      ),
      ["frida-asset-inventory"],
    ),
  },
  sources: [
    {
      id: "frida-official-residences",
      title: text(
        "Sitio oficial — Residencias",
        "Official website — Residences",
      ),
      kind: "official_project_site",
      url: "https://fridakahloresidences.com/residences/",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Tipologías, amoblamiento, oficina selectiva y lenguaje de renta.",
        "Residence types, furnishing, select offices, and rental language.",
      ),
    },
    {
      id: "frida-pmg",
      title: text("Portfolio oficial de PMG", "Official PMG portfolio"),
      kind: "official_developer_site",
      url: "https://propertymg.com/portfolio/frida-kahlo-wynwood-residences",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Dirección, equipo, cantidad de residencias y estado general de ventas.",
        "Address, team, residence count, and general sales status.",
      ),
    },
    ...internalSources(
      "frida",
      "src/data/projects/frida-kahlo.ts",
    ),
  ],
};

const twentySixAndSecond: PriorityProjectGovernance = {
  slug: "26-and-2nd",
  overallStatus: "reconfirmation_required",
  location: text(
    "223 NW 26th St, Miami, FL 33127 — Wynwood",
    "223 NW 26th St, Miami, FL 33127 — Wynwood",
  ),
  developer: text(
    "Property Markets Group (PMG) y LNDMRK Development",
    "Property Markets Group (PMG) and LNDMRK Development",
  ),
  summary: text(
    "Edificio residencial de ocho pisos y 233 unidades en Wynwood. PMG comunica oficinas con escritura y una alianza con Airbnb, cuyos términos deben revisarse antes de interpretar el uso permitido.",
    "An eight-story, 233-residence building in Wynwood. PMG communicates deeded offices and an Airbnb partnership, whose terms must be reviewed before interpreting permitted use.",
  ),
  profileFit: [
    text(
      "Personas que quieren explorar una combinación de residencia y espacio de trabajo en Wynwood.",
      "Buyers exploring a home-and-work configuration in Wynwood.",
    ),
    text(
      "Quienes necesitan comparar una propuesta amueblada con otros formatos de uso flexible.",
      "Those comparing a furnished concept with other flexible-use formats.",
    ),
    text(
      "Compradores dispuestos a verificar reglas, licencias y operatoria antes de proyectar rentas.",
      "Buyers willing to verify rules, licenses, and operations before projecting rental use.",
    ),
  ],
  factualHighlights: [
    text("Ocho pisos y 233 residencias.", "Eight stories and 233 residences."),
    text(
      "Arquitectura de CUBE 3 e interiores de Cotofana Designs.",
      "Architecture by CUBE 3 and interiors by Cotofana Designs.",
    ),
    text(
      "Rooftop, fitness y circuito termal comunicados por PMG.",
      "Rooftop, fitness, and thermal circuit communicated by PMG.",
    ),
  ],
  risks: [
    text(
      "El módulo histórico afirma que no hay plan oficial y luego publica un cronograma detallado.",
      "The legacy module says there is no official plan and then publishes a detailed schedule.",
    ),
    text(
      "“Partnered with Airbnb” no equivale por sí solo a una autorización irrestricta de renta.",
      "“Partnered with Airbnb” does not by itself establish unrestricted rental permission.",
    ),
    text(
      "No se encontró documentación de financiación ni derechos de las imágenes.",
      "No financing documentation or image rights documentation was found.",
    ),
  ],
  openQuestions: [
    text("Precio, inventario y entrega vigentes.", "Current price, inventory, and completion."),
    text(
      "Reglas del condominio, licencias y alcance de la alianza con Airbnb.",
      "Condominium rules, licensing, and scope of the Airbnb partnership.",
    ),
    text(
      "Plan de pagos, financiación y alcance de las oficinas con escritura.",
      "Payment plan, financing, and scope of deeded offices.",
    ),
  ],
  fields: {
    commercialStatus: reconfirm(
      text("PMG informa “Active Sales”.", "PMG reports “Active Sales”."),
      ["twenty-six-pmg"],
      text(
        "Requiere confirmación de inventario y estado por unidad.",
        "Inventory and unit-level status require confirmation.",
      ),
    ),
    price: unverified(
      text(
        "No se encontró un price sheet vigente proporcionado por Esteban.",
        "No current price sheet provided by Esteban was found.",
      ),
    ),
    delivery: unverified(
      text(
        "La entrega del catálogo interno no cuenta con documento vigente asociado.",
        "The completion date in the internal catalog has no associated current document.",
      ),
    ),
    rentalPolicy: reconfirm(
      text(
        "PMG comunica oficinas con escritura y alianza con Airbnb; faltan reglas operativas finales.",
        "PMG communicates deeded offices and an Airbnb partnership; final operating rules are missing.",
      ),
      ["twenty-six-pmg"],
      text(
        "Debe verificarse contra documentos del condominio y requisitos de licencia.",
        "Must be verified against condominium documents and licensing requirements.",
      ),
    ),
    financing: unverified(
      text(
        "La afirmación histórica sobre financiación para extranjeros no tiene fuente vigente.",
        "The legacy statement about financing for foreign buyers has no current source.",
      ),
    ),
    availability: unverified(
      text(
        "El estado general de ventas no constituye inventario vigente.",
        "General sales status does not constitute current inventory.",
      ),
      ["twenty-six-pmg"],
    ),
    paymentPlan: unverified<LocalizedText[]>(
      text(
        "No se publica hasta resolver la contradicción interna y obtener una fuente fechada.",
        "Not published until the internal contradiction is resolved and a dated source is obtained.",
      ),
    ),
    imageRights: unverified(
      text(
        "La portada local y las imágenes remotas no incluyen autorización de uso documentada.",
        "The local cover and remote images have no documented usage authorization.",
      ),
      ["twenty-six-asset-inventory"],
    ),
  },
  sources: [
    {
      id: "twenty-six-pmg",
      title: text("Portfolio oficial de PMG", "Official PMG portfolio"),
      kind: "official_developer_site",
      url: "https://propertymg.com/portfolio/26th-and-Second-Wynwood",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Dirección, equipo, escala, estado general y propuesta de uso.",
        "Address, team, scale, general status, and use concept.",
      ),
    },
    {
      id: "twenty-six-collateral",
      title: text(
        "Collateral local de flyers",
        "Local flyer collateral",
      ),
      kind: "internal_collateral",
      repositoryPath: "external workspace: estebanfirpo-flyers/src/data/flyers.json",
      observedAt: AUDIT_DATE,
      public: false,
      note: text(
        "Material derivado, útil como inventario; no acredita vigencia comercial.",
        "Derived material useful as inventory; it does not establish commercial currency.",
      ),
    },
    ...internalSources(
      "twenty-six",
      "src/data/projects/twenty-six-and-2nd.ts",
    ),
  ],
};

const sevenPark: PriorityProjectGovernance = {
  slug: "seven-park",
  overallStatus: "reconfirmation_required",
  location: text(
    "218–220 SE 7th St, Hallandale Beach, FL 33009",
    "218–220 SE 7th St, Hallandale Beach, FL 33009",
  ),
  developer: text("Kadima Developers", "Kadima Developers"),
  summary: text(
    "Proyecto residencial de ocho pisos frente al entorno de Peter Bluesten Park. El sitio comercial y el expediente municipal difieren en la cantidad de residencias, por lo que la escala exacta queda pendiente de reconfirmación.",
    "An eight-story residential project by the Peter Bluesten Park area. The commercial site and municipal record differ on residence count, so the exact scale remains subject to reconfirmation.",
  ),
  profileFit: [
    text(
      "Personas que quieren explorar Hallandale Beach en un edificio de escala media.",
      "Buyers exploring Hallandale Beach in a mid-scale building.",
    ),
    text(
      "Quienes comparan tipologías desde estudio hasta tres dormitorios.",
      "Those comparing layouts from studios to three bedrooms.",
    ),
    text(
      "Compradores que necesitan confirmar con precisión la flexibilidad de uso y renta.",
      "Buyers who need precise confirmation of use and rental flexibility.",
    ),
  ],
  factualHighlights: [
    text("Edificio de ocho pisos.", "Eight-story building."),
    text(
      "Estudios a tres dormitorios según el sitio del proyecto.",
      "Studios to three bedrooms according to the project website.",
    ),
    text(
      "Amenidades de piscina, wellness, coworking y media room comunicadas por el proyecto.",
      "Pool, wellness, coworking, and media room amenities communicated by the project.",
    ),
  ],
  risks: [
    text(
      "El sitio del proyecto informa 121 residencias; el expediente municipal de mayo de 2025 informa 124.",
      "The project website reports 121 residences; the May 2025 municipal record reports 124.",
    ),
    text(
      "El plan histórico y su FAQ discrepan entre cierre de 50% y 60%, y sobre los hitos.",
      "The legacy payment plan and FAQ conflict between a 50% and 60% closing balance and on milestones.",
    ),
    text(
      "El incentivo histórico de hasta USD 20,000 no tiene fuente ni vigencia.",
      "The legacy incentive of up to USD 20,000 has no source or validity period.",
    ),
  ],
  openQuestions: [
    text("Cantidad final de unidades aprobadas.", "Final approved unit count."),
    text(
      "Reglas exactas de renta y requisitos municipales.",
      "Exact rental rules and municipal requirements.",
    ),
    text(
      "Precio, inventario, entrega, plan de pagos y derechos de imágenes.",
      "Price, inventory, completion, payment plan, and image rights.",
    ),
  ],
  fields: {
    commercialStatus: reconfirm(
      text(
        "El sitio mantiene formularios comerciales y acceso a pricing/floor plans.",
        "The site maintains sales inquiries and access to pricing/floor plans.",
      ),
      ["seven-official"],
      text(
        "No equivale a inventario vigente ni confirma todas las unidades.",
        "This does not equal current inventory or confirm every unit.",
      ),
    ),
    price: unverified(
      text(
        "El material de pricing está mediado por un formulario y no se encontró una hoja vigente aportada por Esteban.",
        "Pricing material is gated by a form and no current sheet supplied by Esteban was found.",
      ),
    ),
    delivery: unverified(
      text(
        "No se encontró un documento vigente proporcionado por Esteban.",
        "No current document provided by Esteban was found.",
      ),
    ),
    rentalPolicy: reconfirm(
      text(
        "El sitio oficial usa la expresión general “flexible rental”.",
        "The official website uses the general phrase “flexible rental”.",
      ),
      ["seven-official"],
      text(
        "Faltan mínimos, frecuencia, licencia y reglas del condominio.",
        "Minimum stays, frequency, licensing, and condominium rules are missing.",
      ),
    ),
    financing: unverified(
      text(
        "No se encontró financiación vigente documentada.",
        "No documented current financing was found.",
      ),
    ),
    availability: unverified(
      text(
        "Requiere inventario fechado o confirmación autorizada.",
        "Requires dated inventory or authorized confirmation.",
      ),
    ),
    paymentPlan: unverified<LocalizedText[]>(
      text(
        "No se muestra porque las versiones internas se contradicen.",
        "Not displayed because the internal versions conflict.",
      ),
    ),
    imageRights: unverified(
      text(
        "Los assets responden, pero no se encontró licencia o autorización escrita.",
        "The assets respond, but no license or written authorization was found.",
      ),
      ["seven-asset-inventory"],
    ),
  },
  sources: [
    {
      id: "seven-official",
      title: text(
        "Sitio oficial de Seven Park",
        "Seven Park official website",
      ),
      kind: "official_project_site",
      url: "https://7parkresidences.com/",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Developer, tipologías, amenidades y lenguaje general de renta.",
        "Developer, residence types, amenities, and general rental language.",
      ),
    },
    {
      id: "seven-city-record",
      title: text(
        "Aviso de proyecto de la ciudad de Hallandale Beach",
        "City of Hallandale Beach project notice",
      ),
      kind: "official_public_record",
      url: "https://hallandalebeachfl.gov/Calendar.aspx?EID=7726",
      issuedAt: "2025-05-08",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Dirección, altura y cantidad de unidades del expediente municipal.",
        "Address, height, and unit count in the municipal record.",
      ),
    },
    {
      id: "seven-collateral",
      title: text("Flyer local de Seven Park", "Local Seven Park flyer"),
      kind: "internal_collateral",
      repositoryPath:
        "external workspace: estebanfirpo-flyers/public/exports/seven-park-4x5.png",
      observedAt: AUDIT_DATE,
      public: false,
      note: text(
        "Material derivado sin fuente comercial ni autorización asociada.",
        "Derived material without an associated commercial source or authorization.",
      ),
    },
    ...internalSources("seven", "src/data/projects/seven-park.ts"),
  ],
};

const oasisHallandale: PriorityProjectGovernance = {
  slug: "oasis-hallandale",
  overallStatus: "reconfirmation_required",
  location: text(
    "1000 E Hallandale Beach Blvd, Hallandale Beach, FL 33009",
    "1000 E Hallandale Beach Blvd, Hallandale Beach, FL 33009",
  ),
  developer: text(
    "Hallandale Oasis 2019 LLC (developer legal informado por el sitio oficial)",
    "Hallandale Oasis 2019 LLC (legal developer stated by the official site)",
  ),
  summary: text(
    "Desarrollo de uso mixto de aproximadamente 10 acres en Hallandale Beach, con dos torres residenciales de 25 pisos y componentes comerciales.",
    "An approximately 10-acre mixed-use development in Hallandale Beach with two 25-story residential towers and commercial components.",
  ),
  profileFit: [
    text(
      "Personas que quieren comparar una propuesta residencial integrada a un desarrollo de uso mixto.",
      "Buyers comparing a residential option within a mixed-use development.",
    ),
    text(
      "Quienes evalúan Hallandale Beach y valoran servicios, retail y espacios de bienestar cercanos.",
      "Those evaluating Hallandale Beach who value nearby services, retail, and wellness spaces.",
    ),
    text(
      "Compradores que aceptan revisar por torre la entrega, disponibilidad y condiciones.",
      "Buyers prepared to review completion, availability, and terms on a tower-by-tower basis.",
    ),
  ],
  factualHighlights: [
    text(
      "Desarrollo de uso mixto de aproximadamente 10 acres.",
      "Approximately 10-acre mixed-use development.",
    ),
    text("Dos torres residenciales de 25 pisos.", "Two 25-story residential towers."),
    text(
      "Arquitectura de Arquitectonica comunicada por el proyecto.",
      "Architecture by Arquitectonica as communicated by the project.",
    ),
  ],
  risks: [
    text(
      "La portada del sitio conserva un estado antiguo de la East Tower, mientras noticias del mismo sitio informan top-off en marzo de 2026.",
      "The website hero retains an older East Tower status while news on the same site reports topping off in March 2026.",
    ),
    text(
      "El catálogo histórico usa referencias de precio 2024–2025 y un cronograma con hitos ya transcurridos.",
      "The legacy catalog uses 2024–2025 pricing references and a schedule with elapsed milestones.",
    ),
    text(
      "Las condiciones pueden variar por torre y etapa; no deben combinarse como una única oferta.",
      "Terms may vary by tower and phase and should not be combined into one offer.",
    ),
  ],
  openQuestions: [
    text(
      "Estado, inventario y precio por torre.",
      "Status, inventory, and price by tower.",
    ),
    text(
      "Entrega, plan de pagos y política de renta vigentes por torre.",
      "Current completion, payment plan, and rental policy by tower.",
    ),
    text(
      "Financiación, inclusiones y derechos de imágenes.",
      "Financing, inclusions, and image rights.",
    ),
  ],
  fields: {
    commercialStatus: reconfirm(
      text(
        "El sitio informa comercialización por torres y mantiene canal de consultas.",
        "The site communicates tower-specific sales and maintains an inquiry channel.",
      ),
      ["oasis-official"],
      text(
        "El estado visible del sitio presenta inconsistencias internas y debe confirmarse.",
        "The visible website status has internal inconsistencies and must be confirmed.",
      ),
    ),
    price: unverified(
      text(
        "No se encontró un price sheet vigente proporcionado por Esteban.",
        "No current price sheet provided by Esteban was found.",
      ),
    ),
    delivery: unverified(
      text(
        "Debe documentarse por torre; el rango histórico ya no es suficiente.",
        "Must be documented by tower; the legacy range is no longer sufficient.",
      ),
    ),
    rentalPolicy: unverified(
      text(
        "No se encontró una fuente vigente con reglas completas por torre.",
        "No current source with complete tower-specific rules was found.",
      ),
    ),
    financing: unverified(
      text(
        "La mención histórica de financiación para extranjeros no tiene proveedor ni vigencia documentados.",
        "The legacy mention of financing for foreign buyers has no documented provider or validity period.",
      ),
    ),
    availability: unverified(
      text(
        "Los porcentajes y estados generales del sitio no sustituyen inventario fechado.",
        "Website percentages and general status do not replace dated inventory.",
      ),
      ["oasis-official"],
    ),
    paymentPlan: unverified<LocalizedText[]>(
      text(
        "No se publica hasta obtener estructura vigente por torre.",
        "Not published until a current tower-specific structure is obtained.",
      ),
    ),
    imageRights: unverified(
      text(
        "Disponibilidad técnica confirmada; procedencia y licencia pendientes.",
        "Technical availability confirmed; provenance and license pending.",
      ),
      ["oasis-asset-inventory"],
    ),
  },
  sources: [
    {
      id: "oasis-official",
      title: text(
        "Sitio oficial de Oasis Hallandale",
        "Oasis Hallandale official website",
      ),
      kind: "official_project_site",
      url: "https://hallandaleoasis.com/",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Escala, dirección, developer legal, materiales y actualizaciones de obra.",
        "Scale, address, legal developer, materials, and construction updates.",
      ),
    },
    ...internalSources("oasis", "src/data/projects/oasis.ts"),
  ],
};

const midtownPark: PriorityProjectGovernance = {
  slug: "midtown-park",
  overallStatus: "reconfirmation_required",
  location: text(
    "Midtown Miami, entre Wynwood, Design District y Edgewater",
    "Midtown Miami, between Wynwood, the Design District, and Edgewater",
  ),
  developer: text(
    "RM MP DEV VENTURE, LLC (developer legal); Rosso Development y Midtown Development (equipos de desarrollo); marca Proper Hospitality",
    "RM MP DEV VENTURE, LLC (legal developer); Rosso Development and Midtown Development (development teams); Proper Hospitality brand",
  ),
  summary: text(
    "Desarrollo maestro de aproximadamente cinco acres con residencias, hospitalidad, oficinas, retail y espacios públicos. La ficha distingue el developer legal de los equipos y la marca participantes.",
    "An approximately five-acre master-planned development with residences, hospitality, offices, retail, and public spaces. This page distinguishes the legal developer from the participating teams and brand.",
  ),
  profileFit: [
    text(
      "Personas que quieren comparar una propuesta urbana y caminable en Midtown Miami.",
      "Buyers comparing an urban, walkable option in Midtown Miami.",
    ),
    text(
      "Quienes valoran un entorno mixto con residencias, retail, gastronomía y espacios abiertos.",
      "Those who value a mixed-use setting with residences, retail, dining, and open space.",
    ),
    text(
      "Compradores que entienden que marca, servicios y usos proyectados pueden cambiar según contratos y permisos.",
      "Buyers who understand that branding, services, and projected uses may change under contracts and permits.",
    ),
  ],
  factualHighlights: [
    text(
      "Plan maestro de aproximadamente cinco acres.",
      "Approximately five-acre master plan.",
    ),
    text(
      "Residencias, oficinas, hospitalidad, retail y espacios públicos.",
      "Residences, offices, hospitality, retail, and public spaces.",
    ),
    text(
      "Arquitectura de Arquitectonica e interiores de Meyer Davis Studio.",
      "Architecture by Arquitectonica and interiors by Meyer Davis Studio.",
    ),
  ],
  risks: [
    text(
      "El fact sheet aclara que Rosso Development y Midtown Development no son el developer legal del condominio.",
      "The fact sheet states that Rosso Development and Midtown Development are not the condominium's legal developer.",
    ),
    text(
      "La licencia de la marca Proper puede terminar; servicios, comercios y beach club pueden cambiar o tener costos adicionales.",
      "The Proper brand license may end; services, commercial uses, and the beach club may change or carry additional fees.",
    ),
    text(
      "La renta corta requiere certificate of use y cumplimiento de zoning y normativa aplicable.",
      "Short-term rentals require a certificate of use and compliance with zoning and applicable law.",
    ),
    text(
      "El fact sheet declara que sus gráficos y textos tienen copyright del developer; los assets actuales no tienen autorización documentada.",
      "The fact sheet states its graphics and text are developer-copyrighted; current assets have no documented authorization.",
    ),
  ],
  openQuestions: [
    text("Dirección canónica de la torre residencial.", "Canonical address of the residential tower."),
    text(
      "Precio, inventario, entrega y plan de pagos vigentes.",
      "Current price, inventory, completion, and payment plan.",
    ),
    text(
      "Condiciones de renta, financiación, servicios incluidos y derechos de imágenes.",
      "Rental terms, financing, included services, and image rights.",
    ),
  ],
  fields: {
    commercialStatus: reconfirm(
      text(
        "El sitio oficial mantiene materiales y canal de prioridad activos.",
        "The official site maintains current materials and a priority inquiry channel.",
      ),
      ["midtown-official", "midtown-fact-sheet"],
      text(
        "El estado por unidad y la disponibilidad requieren confirmación independiente.",
        "Unit-level status and availability require independent confirmation.",
      ),
    ),
    price: unverified(
      text(
        "El fact sheet exige consultar precios actuales y no se encontró un price sheet proporcionado por Esteban.",
        "The fact sheet requires checking current prices and no price sheet provided by Esteban was found.",
      ),
      ["midtown-fact-sheet"],
    ),
    delivery: unverified(
      text(
        "No se encontró un documento vigente aportado por Esteban.",
        "No current document supplied by Esteban was found.",
      ),
    ),
    rentalPolicy: reconfirm(
      text(
        "El fact sheet indica que la renta corta requiere certificate of use y está sujeta a zoning y otras leyes.",
        "The fact sheet states that short-term rentals require a certificate of use and remain subject to zoning and other laws.",
      ),
      ["midtown-fact-sheet"],
      text(
        "No define frecuencia, mínimos ni reglas finales del condominio.",
        "It does not define frequency, minimum stays, or final condominium rules.",
      ),
    ),
    financing: unverified(
      text(
        "No se encontró una oferta de financiación vigente documentada.",
        "No documented current financing offer was found.",
      ),
    ),
    availability: unverified(
      text(
        "El canal de prioridad no sustituye inventario fechado.",
        "A priority inquiry channel does not replace dated inventory.",
      ),
    ),
    paymentPlan: unverified<LocalizedText[]>(
      text(
        "El plan histórico contiene hitos ya transcurridos y no se publica.",
        "The legacy plan contains elapsed milestones and is not published.",
      ),
    ),
    imageRights: unverified(
      text(
        "El fact sheet reserva el copyright al developer; falta autorización para los assets actuales.",
        "The fact sheet reserves copyright to the developer; authorization for current assets is missing.",
      ),
      ["midtown-fact-sheet", "midtown-asset-inventory"],
    ),
  },
  sources: [
    {
      id: "midtown-official",
      title: text(
        "Sitio oficial de Midtown Park by Proper",
        "Midtown Park by Proper official website",
      ),
      kind: "official_project_site",
      url: "https://www.midtownparkbyproper.com/",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Plan maestro, ubicación relativa, equipos, residencias y materiales.",
        "Master plan, relative location, teams, residences, and materials.",
      ),
    },
    {
      id: "midtown-fact-sheet",
      title: text(
        "Fact sheet oficial de Midtown Park",
        "Midtown Park official fact sheet",
      ),
      kind: "official_fact_sheet",
      url: "https://www.midtownparkbyproper.com/wp-content/uploads/2026/03/MP-FactSheet-Digital-Branded-1.pdf",
      issuedAt: "2026-02-27",
      observedAt: AUDIT_DATE,
      public: true,
      note: text(
        "Características, servicios, developer legal, restricciones, copyright y condiciones de renta corta.",
        "Features, services, legal developer, restrictions, copyright, and short-term rental conditions.",
      ),
    },
    ...internalSources("midtown", "src/data/projects/midtown-park.ts"),
  ],
};

export const PRIORITY_PROJECTS = {
  [theWilliam.slug]: theWilliam,
  [fridaKahlo.slug]: fridaKahlo,
  [twentySixAndSecond.slug]: twentySixAndSecond,
  [sevenPark.slug]: sevenPark,
  [oasisHallandale.slug]: oasisHallandale,
  [midtownPark.slug]: midtownPark,
} satisfies Record<string, PriorityProjectGovernance>;

export type PriorityProjectSlug = keyof typeof PRIORITY_PROJECTS;

export function getPriorityProjectGovernance(
  slug: string,
): PriorityProjectGovernance | null {
  return slug in PRIORITY_PROJECTS
    ? PRIORITY_PROJECTS[slug as PriorityProjectSlug]
    : null;
}

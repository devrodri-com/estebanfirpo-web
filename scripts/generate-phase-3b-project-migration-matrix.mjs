import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import canonicalProjectModule from "../src/features/projects/server/get-canonical-project.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(repositoryRoot, "src/data");
const projectsRoot = path.join(dataRoot, "projects");
const catalogEntry = path.join(projectsRoot, "index.ts");
const baseCatalogEntry = path.join(dataRoot, "projects.ts");
const slugManifestEntry = path.join(projectsRoot, "public-slugs.generated.ts");
const outputFile = path.join(repositoryRoot, "docs/phase-3b-project-migration-matrix.tsv");
const temporaryOutput = fs.mkdtempSync(path.join(os.tmpdir(), "estebanfirpo-phase-3b-matrix-"));
const checkOnly = process.argv.includes("--check");
const { getAllCanonicalProjects } = canonicalProjectModule;

const FUNCTION_COLUMNS = [
  "name",
  "location",
  "hero",
  "price_inventory",
  "delivery",
  "rental",
  "delivery_condition",
  "key_facts",
  "gallery",
  "highlights_amenities",
  "unit_types_floorplans",
  "features_materials",
  "faq",
  "payment_plan",
  "map",
  "contact_disclaimer",
];

const DECISIONS = new Set(["preserve", "qualify", "request", "omit_optional", "needs_content"]);
const CONDITION_FROM_EXISTING_CONTENT = new Set([
  "/proyectos/faena",
  "/proyectos/gaia-residences",
  "/proyectos/jean-georges-tropic",
  "/proyectos/nickelodeon-orlando",
  "/proyectos/oasis-hallandale",
]);
const FUNCTION_CONFLICTS = {
  "/proyectos/26-and-2nd": {
    faq: "No existe contenido FAQ ES/EN en el baseline.",
  },
  "/proyectos/72-park": {
    delivery: "La entrega legacy 2025 ya quedó en el pasado; se conserva como estimación histórica y se califica una sola vez.",
    delivery_condition:
      "furnished=true convive con copy específico sobre paquetes de muebles opcionales; se preserva el detalle sin afirmar que los muebles estén incluidos.",
  },
  "/proyectos/ambar-orlando": {
    delivery: "No existe un valor de entrega en el baseline.",
  },
  "/proyectos/cassia": {
    price_inventory:
      "El precio principal registra US$773.000, mientras el FAQ ES/EN indica aproximadamente US$823.000.",
  },
  "/proyectos/flow-house": {
    delivery: "La entrega legacy 2025 ya quedó en el pasado; se conserva como estimación histórica y se califica una sola vez.",
  },
  "/proyectos/ella-miami": {
    delivery_condition:
      "furnished=true convive con copy específico sobre paquetes de muebles opcionales; se preserva el detalle sin afirmar que los muebles estén incluidos.",
  },
  "/proyectos/faena": {
    rental: "No existe una política de renta en el baseline.",
    delivery_condition:
      "El booleano furnished está ausente, pero features y FAQ describen residencias terminadas y el alcance del amoblamiento.",
  },
  "/proyectos/gaia-residences": {
    delivery_condition:
      "El booleano furnished está ausente, pero features y FAQ registran paquetes de mobiliario opcionales.",
  },
  "/proyectos/jean-georges-tropic": {
    delivery_condition:
      "El booleano furnished está ausente, pero el FAQ describe entrega terminada, muebles no incluidos y paquetes opcionales.",
  },
  "/proyectos/midtown-park": {
    delivery_condition: "No existe un valor de condición de entrega en el baseline.",
  },
  "/proyectos/nickelodeon-orlando": {
    delivery_condition:
      "El booleano furnished está ausente, pero microclaims y features indican que las residencias se entregan amuebladas.",
  },
  "/proyectos/nomad": {
    delivery:
      "El commit 9b2a39cadb1b3395c4f61e94b8f63cd340747a18 corrigió explícitamente Q4 2025 a 2026; el FAQ quedó desactualizado.",
  },
  "/proyectos/one-park-tower": {
    delivery: "La entrega legacy 2025 ya quedó en el pasado; se conserva como estimación histórica y se califica una sola vez.",
    payment_plan: "Los arrays ES/EN del plan están vacíos.",
  },
  "/proyectos/oasis-hallandale": {
    delivery_condition:
      "El booleano furnished está ausente, pero el FAQ describe unidades terminadas, sin muebles y con paquetes externos disponibles.",
  },
  "/proyectos/the-william": {
    price_inventory: "El tratamiento aprobado conserva la función como consulta de precio e inventario vigente.",
    delivery: "El tratamiento aprobado presenta 2029 como entrega estimada y sujeta a confirmación.",
    rental: "El tratamiento aprobado conserva el mínimo de renta de 90 días con una sola nota prudente de bloque.",
    delivery_condition: "El tratamiento aprobado conserva la función como consulta de especificaciones y condición de entrega.",
    key_facts: "El tratamiento aprobado conserva los tres datos clave con una sola nota prudente de bloque.",
    payment_plan: "El tratamiento aprobado conserva la función como solicitud del plan de pagos vigente.",
  },
  "/proyectos/viceroy-brickell-residences": {
    delivery_condition: "No existe un valor de condición de entrega en el baseline.",
    features_materials: "No existe contenido de características ES/EN en el baseline.",
  },
};

const formatHost = {
  getCanonicalFileName: (fileName) => fileName,
  getCurrentDirectory: () => repositoryRoot,
  getNewLine: () => "\n",
};

function compact(value) {
  if (Array.isArray(value)) {
    return value.map((item) =>
      typeof item === "string" ? item : item && typeof item === "object" ? item.label ?? item : item,
    );
  }
  return value;
}

function present(value) {
  return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && value !== "";
}

function bilingual(es, en) {
  if (present(es) && present(en)) return "ES y EN dedicados";
  if (present(es)) return "ES disponible; EN ausente";
  if (present(en)) return "EN disponible; ES ausente";
  return "sin contenido ES/EN";
}

function sourceFilesFor(project) {
  const candidates = fs
    .readdirSync(projectsRoot)
    .filter((file) => file.endsWith(".ts") && !["index.ts", "public-slugs.generated.ts"].includes(file))
    .filter((file) => {
      const source = fs.readFileSync(path.join(projectsRoot, file), "utf8");
      return source.includes(`id: "${project.id}"`) || source.includes(`id: '${project.id}'`);
    })
    .map((file) => `src/data/projects/${file}`);

  return candidates.length > 0 ? candidates.join(", ") : "src/data/projects.ts (capa base)";
}

function generalSource(project) {
  const localSource = sourceFilesFor(project);
  if (project.slug === "/proyectos/the-william") {
    return `${localSource}; ALL_PROJECTS efectivo en src/data/projects/index.ts; tratamiento aprobado registrado en docs/phase-3b-the-william-functional-comparison.md`;
  }
  return `${localSource}; ALL_PROJECTS efectivo en src/data/projects/index.ts; contenido público actual adoptado como baseline de migración`;
}

function projectConflict(project, functionName) {
  return (
    FUNCTION_CONFLICTS[project.slug]?.[functionName] ??
    "Sin conflicto concreto registrado para esta función."
  );
}

function makeCell({
  legacy,
  languages,
  source,
  conflict,
  proposed,
  decision,
  omissionReason,
  lossRisk,
  allowLegacyOmission = false,
}) {
  if (!DECISIONS.has(decision)) throw new Error(`Invalid decision: ${decision}`);
  if (["request", "omit_optional", "needs_content"].includes(decision) && !omissionReason) {
    throw new Error(`Decision ${decision} requires an omission reason.`);
  }
  if (decision === "omit_optional" && present(legacy) && !allowLegacyOmission) {
    throw new Error("omit_optional cannot be used when legacy content exists.");
  }
  return {
    legacy,
    languages,
    source,
    conflict,
    proposed,
    decision,
    omission_reason: omissionReason || "No se omite contenido legacy.",
    loss_risk: lossRisk,
  };
}

function mapLegacy(project) {
  if (typeof project.lat === "number" && typeof project.lng === "number") {
    return `lat=${project.lat}; lng=${project.lng}`;
  }
  const query = /\d/.test(project.city) ? project.city : `${project.name} ${project.city}`;
  return `sin coordenadas; query pública actual=${query}`;
}

function cellsFor(project, canonicalModels) {
  const source = generalSource(project);
  const conflictFor = (functionName) => projectConflict(project, functionName);
  const rentalEs = project.rentalPolicyEs ?? project.rentalPolicy;
  const rentalEn = project.rentalPolicyEn ?? project.rentalPolicy;
  const rentalFallback = [
    !project.rentalPolicyEs && project.rentalPolicy ? "ES usa rentalPolicy compartido" : "",
    !project.rentalPolicyEn && project.rentalPolicy ? "EN usa rentalPolicy compartido" : "",
    !project.rentalPolicyEn && project.rentalPolicyEs ? "EN puede caer al texto ES en la ruta legacy" : "",
  ].filter(Boolean).join("; ");
  const paymentEs = compact(project.paymentPlanEs);
  const paymentEn = compact(project.paymentPlanEn);
  const hasPayment = present(paymentEs) || present(paymentEn);
  const isWilliam = project.slug === "/proyectos/the-william";
  const conditionFromExistingContent = CONDITION_FROM_EXISTING_CONTENT.has(project.slug);
  const keyFactsEs = canonicalModels.es.metrics.items;
  const keyFactsEn = canonicalModels.en.metrics.items;
  const legacyKeyFactsEs = compact(project.microClaimsEs);
  const legacyKeyFactsEn = compact(project.microClaimsEn);
  const hasLegacyKeyFacts = present(legacyKeyFactsEs) || present(legacyKeyFactsEn);
  const hasVisibleKeyFacts = keyFactsEs.length > 0 || keyFactsEn.length > 0;
  const removedKeyFacts =
    (legacyKeyFactsEs?.length ?? 0) +
    (legacyKeyFactsEn?.length ?? 0) -
    keyFactsEs.length -
    keyFactsEn.length;

  const cells = {
    name: makeCell({
      legacy: project.name,
      languages: "compartido ES/EN",
      source,
      conflict: conflictFor("name"),
      proposed: `Conservar ${project.name} en ambas versiones`,
      decision: "preserve",
      lossRisk: "Alto: pérdida de identidad y reconocimiento de la URL.",
    }),
    location: makeCell({
      legacy: project.city,
      languages: "compartido ES/EN",
      source,
      conflict: conflictFor("location"),
      proposed: "Conservar la ubicación textual; estructurar dirección y ciudad durante la migración.",
      decision: "preserve",
      lossRisk: "Alto: se perdería contexto geográfico y una función esencial.",
    }),
    hero: makeCell({
      legacy: project.image,
      languages: "asset compartido; alt localizado pendiente",
      source,
      conflict: conflictFor("hero"),
      proposed: "Conservar el hero publicado y añadir un alt localizado sin sustituir el asset.",
      decision: "preserve",
      lossRisk: "Alto: la ficha perdería su ancla visual; riesgo adicional si se migra una URL incorrecta.",
    }),
    price_inventory: makeCell({
      legacy: `priceFromUsd=${project.priceFromUsd ?? "ausente"}; inventario no modelado`,
      languages: "valor compartido; etiquetas ES/EN",
      source,
      conflict: conflictFor("price_inventory"),
      proposed: isWilliam
        ? "ES: Consultar precio e inventario vigente | EN: Inquire about current pricing and inventory"
        : project.slug === "/proyectos/cassia"
          ? "Resolver el precio inicial incompatible antes del cambio atómico; mientras tanto conservar la función como consulta."
          : `Conservar el precio desde actual (US$${project.priceFromUsd?.toLocaleString?.("es-AR") ?? "sin valor"}) y el CTA canónico para inventario vigente.`,
      decision:
        isWilliam || project.slug === "/proyectos/cassia"
          ? "request"
          : present(project.priceFromUsd)
            ? "preserve"
            : "request",
      omissionReason:
        isWilliam || project.slug === "/proyectos/cassia" || !present(project.priceFromUsd)
          ? "No se omite la función: se usa consulta únicamente por tratamiento aprobado, contradicción concreta o ausencia real."
          : "",
      lossRisk: "Alto: precio e inventario son datos de decisión y conversión.",
    }),
    delivery: makeCell({
      legacy: project.delivery ?? "ausente",
      languages: "valor compartido; etiquetas ES/EN",
      source,
      conflict: conflictFor("delivery"),
      proposed: isWilliam
        ? "ES: Entrega estimada 2029 · sujeta a confirmación | EN: Estimated completion 2029 · subject to confirmation"
        : project.slug === "/proyectos/nomad"
          ? "Conservar 2026 como corrección más reciente y alinear únicamente la respuesta de FAQ ES/EN."
        : present(project.delivery)
          ? `Conservar ${project.delivery} como entrega estimada del baseline; el disclaimer general cubre cambios y reconfirmación.`
          : "Conservar la función mediante una consulta de entrega estimada.",
      decision:
        isWilliam || ["/proyectos/72-park", "/proyectos/flow-house", "/proyectos/one-park-tower"].includes(project.slug)
          ? "qualify"
          : !present(project.delivery)
            ? "request"
            : "preserve",
      omissionReason:
        !present(project.delivery)
          ? "No se omite la función: el valor está realmente ausente."
          : "",
      lossRisk: "Alto: la ventana de entrega es central para comparar proyectos.",
    }),
    rental: makeCell({
      legacy: `ES=${rentalEs ?? "ausente"}; EN=${rentalEn ?? "ausente"}${rentalFallback ? `; fallback=${rentalFallback}` : ""}`,
      languages:
        project.rentalPolicy && !project.rentalPolicyEs && !project.rentalPolicyEn
          ? "valor compartido; el adaptador debe localizar la etiqueta EN"
          : bilingual(project.rentalPolicyEs ?? project.rentalPolicy, project.rentalPolicyEn ?? project.rentalPolicy),
      source,
      conflict: conflictFor("rental"),
      proposed: isWilliam
        ? "ES: Alquiler mínimo de 90 días | EN: Minimum rental term of 90 days; una sola nota de bloque indica que las condiciones dependen del reglamento del condominio y deben reconfirmarse."
        : present(rentalEs) || present(rentalEn)
          ? "Conservar la política publicada; localizar los fallbacks compartidos sin cambiar su alcance comercial."
          : "Consultar política de renta aplicable.",
      decision: !present(rentalEs) && !present(rentalEn) ? "request" : isWilliam ? "qualify" : "preserve",
      omissionReason:
        !present(rentalEs) && !present(rentalEn)
          ? "No se omite la función: no existe una política de renta en el baseline."
          : "",
      lossRisk: "Alto: la política de renta puede cambiar la viabilidad del objetivo del comprador.",
    }),
    delivery_condition: makeCell({
      legacy:
        typeof project.furnished === "boolean"
          ? `furnished=${project.furnished} (${project.furnished ? "amueblado/furnished" : "sin amueblar/unfurnished"})`
          : conditionFromExistingContent
            ? "furnished ausente; condición explícita en features, microclaims o FAQ ES/EN"
            : "ausente",
      languages: conditionFromExistingContent ? "ES y EN dedicados" : "valor compartido; labels ES/EN",
      source,
      conflict: conflictFor("delivery_condition"),
      proposed: isWilliam
        ? "ES: Consultar especificaciones y condición de entrega | EN: Ask about specifications and delivery condition"
        : conditionFromExistingContent
          ? "Conservar la condición explícita ya publicada en features, microclaims o FAQ, con copy breve ES/EN."
        : typeof project.furnished === "boolean"
          ? "Conservar la condición y el copy específico actuales; no interpretar furnished=true como muebles incluidos cuando el detalle publicado indica paquetes opcionales."
          : "Consultar especificaciones y condición de entrega.",
      decision:
        isWilliam || (typeof project.furnished !== "boolean" && !conditionFromExistingContent)
          ? "request"
          : "preserve",
      omissionReason:
        isWilliam || (typeof project.furnished !== "boolean" && !conditionFromExistingContent)
          ? "No se omite la función: se mantiene la consulta aprobada o el baseline no contiene un valor estructurado."
          : "",
      lossRisk: "Alto: evita inferencias sobre muebles, acabados y equipamiento incluidos.",
    }),
    key_facts: makeCell({
      legacy: `ES=${JSON.stringify(compact(project.microClaimsEs))}; EN=${JSON.stringify(compact(project.microClaimsEn))}`,
      languages: bilingual(project.microClaimsEs, project.microClaimsEn),
      source,
      conflict: conflictFor("key_facts"),
      proposed: isWilliam
        ? "Conservar 26 pisos, 374 residencias y aproximadamente 3.760 m² de amenidades con una sola nota prudente para Datos clave."
        : !hasVisibleKeyFacts && hasLegacyKeyFacts
          ? "Omitir Datos clave: sus microclaims ya están representados íntegramente en precio, entrega, renta, condición o ubicación."
          : removedKeyFacts > 0
            ? `Conservar los datos clave no redundantes y retirar ${removedKeyFacts} duplicado(s) ES/EN mediante comparación normalizada con el resumen superior.`
            : "Conservar los datos clave actuales como texto opaco, sin reinterpretar su contenido.",
      decision: hasLegacyKeyFacts
        ? isWilliam
          ? "qualify"
          : hasVisibleKeyFacts
            ? "preserve"
            : "omit_optional"
        : "needs_content",
      omissionReason:
        !hasLegacyKeyFacts
          ? "No hay datos clave legacy; la carencia queda registrada sin inventar contenido."
          : !hasVisibleKeyFacts
            ? "La sección opcional se omite sin hueco ni fallback porque todo su contenido permanece visible en el resumen superior o la ubicación."
            : "",
      lossRisk:
        "Medio-alto: una deduplicación demasiado amplia podría retirar atributos adicionales; el filtro conserva cualquier detalle no representado arriba.",
      allowLegacyOmission: true,
    }),
    gallery: makeCell({
      legacy: JSON.stringify((project.images ?? []).map((image) => ({ src: image.src, alt: image.alt ?? null }))),
      languages: "assets compartidos; alt ES/EN no modelado",
      source,
      conflict: conflictFor("gallery"),
      proposed: "Conservar todos los assets y su orden; usar alt localizado con nombre e índice cuando no exista texto editorial.",
      decision: present(project.images) ? "preserve" : "needs_content",
      omissionReason: present(project.images)
        ? ""
        : "No hay galería legacy; el hero se conserva y la ausencia debe aprobarse antes de omitir la galería.",
      lossRisk: "Alto: una migración parcial puede perder imágenes, orden o acceso al lightbox.",
    }),
    highlights_amenities: makeCell({
      legacy: `ES=${JSON.stringify(compact(project.highlights))}; EN=${JSON.stringify(compact(project.highlightsEn))}`,
      languages: bilingual(project.highlights, project.highlightsEn),
      source,
      conflict: conflictFor("highlights_amenities"),
      proposed: isWilliam
        ? "Conservar los seis contenidos existentes, sin advertencias por ítem."
        : "Conservar todos los destacados y amenidades actuales, con soporte para cantidades variables.",
      decision: present(project.highlights) || present(project.highlightsEn) ? "preserve" : "needs_content",
      omissionReason:
        present(project.highlights) || present(project.highlightsEn)
          ? ""
          : "No hay contenido legacy; registrar la ausencia y solicitar aprobación antes de omitir el bloque.",
      lossRisk: "Alto: pérdida de propuesta material del proyecto o desincronización ES/EN.",
    }),
    unit_types_floorplans: makeCell({
      legacy: `ES=${JSON.stringify(compact(project.unitMixEs))}; EN=${JSON.stringify(compact(project.unitMixEn))}; planos no modelados; CTA mailto en la ruta`,
      languages: bilingual(project.unitMixEs, project.unitMixEn),
      source,
      conflict: conflictFor("unit_types_floorplans"),
      proposed: isWilliam
        ? "Conservar estudios a tres dormitorios; solicitar planos y consultar disponibilidad por tipología."
        : "Conservar tipologías existentes y la acción de solicitar planos; controlar una futura descarga por versión y derechos.",
      decision: present(project.unitMixEs) || present(project.unitMixEn) ? "preserve" : "request",
      omissionReason:
        present(project.unitMixEs) || present(project.unitMixEn)
          ? ""
          : "La función es esencial; solicitar tipologías/planos en vez de retirar el bloque.",
      lossRisk: "Alto: se perderían tipologías y el acceso actual a planos/disponibilidad.",
    }),
    features_materials: makeCell({
      legacy: `ES=${JSON.stringify(compact(project.featuresEs))}; EN=${JSON.stringify(compact(project.featuresEn))}; materiales no modelados; CTA mailto en la ruta`,
      languages: bilingual(project.featuresEs, project.featuresEn),
      source,
      conflict: conflictFor("features_materials"),
      proposed: isWilliam
        ? "Conservar los tres grupos existentes con lenguaje prudente y mantener la solicitud de materiales."
        : "Conservar todas las características actuales y la solicitud de materiales/especificaciones.",
      decision: present(project.featuresEs) || present(project.featuresEn) ? "preserve" : "needs_content",
      omissionReason:
        present(project.featuresEs) || present(project.featuresEn)
          ? ""
          : "No hay características legacy; conservar la solicitud de materiales y decidir el bloque editorial antes de omitirlo.",
      lossRisk: "Alto: una migración puede perder acabados, equipamiento o la vía para pedir materiales.",
    }),
    faq: makeCell({
      legacy: `ES=${JSON.stringify(project.faqsEs ?? [])}; EN=${JSON.stringify(project.faqsEn ?? [])}`,
      languages: bilingual(project.faqsEs, project.faqsEn),
      source,
      conflict: conflictFor("faq"),
      proposed: isWilliam
        ? "Conservar FAQ de dirección, renta y precio con respuestas útiles y prudentes."
        : project.slug === "/proyectos/cassia"
          ? "Conservar preguntas y orden; sustituir únicamente la respuesta de precio contradictoria por la consulta aprobada."
          : project.slug === "/proyectos/nomad"
            ? "Conservar preguntas y orden; alinear únicamente la respuesta de entrega con el valor 2026 del baseline corregido."
        : "Conservar preguntas y respuestas exactas por idioma; no aplicar heurísticas por palabras al migrarlas.",
      decision: present(project.faqsEs) || present(project.faqsEn) ? "preserve" : "needs_content",
      omissionReason:
        present(project.faqsEs) || present(project.faqsEn)
          ? ""
          : "No hay FAQ legacy; preparar respuestas esenciales o solicitar aprobación antes de omitir la sección.",
      lossRisk: "Medio-alto: se pierden respuestas y enlaces contextuales; riesgo de paridad.",
    }),
    payment_plan: makeCell({
      legacy: `ES=${JSON.stringify(paymentEs)}; EN=${JSON.stringify(paymentEn)}`,
      languages: bilingual(paymentEs, paymentEn),
      source,
      conflict: conflictFor("payment_plan"),
      proposed: isWilliam
        ? "ES: Solicitar plan de pagos vigente | EN: Request the current payment plan"
        : hasPayment
          ? "Conservar todos los pasos actuales y permitir solicitar la versión vigente."
          : "Solicitar plan de pagos vigente; nunca renderizar una tarjeta vacía.",
      decision: isWilliam || !hasPayment ? "request" : "preserve",
      omissionReason:
        isWilliam || !hasPayment
          ? "No se omite la función: contradicción o ausencia impide mostrar pasos como vigentes."
          : "",
      lossRisk: "Alto: el plan es una función comercial esencial y hoy puede quedar vacío o desactualizado.",
    }),
    map: makeCell({
      legacy: mapLegacy(project),
      languages: "query compartida; título ES/EN",
      source,
      conflict: conflictFor("map"),
      proposed: isWilliam
        ? "Conservar mapa con 2040 NE 163rd St, North Miami Beach, FL 33162 como dirección estructurada y resultado verificado."
        : "Conservar exactamente la query pública actual y su fallback externo; sólo revisar una dirección si el QA detecta un pin incorrecto.",
      decision: "preserve",
      lossRisk: "Alto: un mapa incorrecto puede desinformar; retirar ubicación también rompe una función esencial.",
    }),
    contact_disclaimer: makeCell({
      legacy:
        "Agenda, WhatsApp contextual, email, compartir, CTA repetido; disclaimer de plan y disclosure breve/completo del footer.",
      languages: "ES/EN en ruta y footer",
      source: "src/app/[locale]/proyectos/[slug]/page.tsx; src/components/Footer.tsx; src/lib/site.ts",
      conflict: "Configuración parcialmente duplicada en la ruta; el disclaimer no tiene un alcance único por ficha.",
      proposed:
        "Conservar WhatsApp, agenda, email y compartir; jerarquizar sin eliminar acciones y coordinar un disclaimer breve con el footer existente.",
      decision: "preserve",
      lossRisk: "Crítico: se perderían conversión, contacto o el marco prudente del sitio.",
    }),
  };

  return cells;
}

function serializeCell(cell) {
  return JSON.stringify(cell).replaceAll("\t", "\\t").replaceAll("\r", "\\r").replaceAll("\n", "\\n");
}

try {
  const program = ts.createProgram([catalogEntry, baseCatalogEntry, slugManifestEntry], {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true,
    noEmitOnError: true,
    rootDir: dataRoot,
    outDir: temporaryOutput,
  });
  const emitResult = program.emit();
  const errors = [...ts.getPreEmitDiagnostics(program), ...emitResult.diagnostics].filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length > 0) throw new Error(ts.formatDiagnostics(errors, formatHost));

  const effectiveCatalog = require(path.join(temporaryOutput, "projects/index.js")).ALL_PROJECTS;
  const publicSlugs = require(path.join(temporaryOutput, "projects/public-slugs.generated.js"))
    .PUBLIC_PROJECT_SLUGS;

  if (!Array.isArray(effectiveCatalog) || effectiveCatalog.length !== 36) {
    throw new Error(`Expected 36 projects in ALL_PROJECTS; received ${effectiveCatalog?.length}.`);
  }
  const ids = effectiveCatalog.map((project) => project.id);
  const slugs = effectiveCatalog.map((project) => project.slug);
  if (new Set(ids).size !== 36 || new Set(slugs).size !== 36) {
    throw new Error("Project IDs and slugs must be unique.");
  }
  if (JSON.stringify([...slugs].sort()) !== JSON.stringify([...publicSlugs].sort())) {
    throw new Error("ALL_PROJECTS and PUBLIC_PROJECT_SLUGS do not contain the same slugs.");
  }

  const modelsByLocale = {
    es: new Map(getAllCanonicalProjects("es").map((model) => [model.identity.slug, model])),
    en: new Map(getAllCanonicalProjects("en").map((model) => [model.identity.slug, model])),
  };

  const rows = [...effectiveCatalog]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((project) => {
      const slug = project.slug.slice("/proyectos/".length);
      const es = modelsByLocale.es.get(slug);
      const en = modelsByLocale.en.get(slug);
      if (!es || !en) throw new Error(`${project.slug} is missing a canonical ES/EN view model.`);
      const cells = cellsFor(project, { es, en });
      if (Object.keys(cells).length !== FUNCTION_COLUMNS.length) {
        throw new Error(`${project.slug} does not contain exactly 16 function records.`);
      }
      return [project.id, project.slug, project.name, ...FUNCTION_COLUMNS.map((column) => serializeCell(cells[column]))]
        .map((value) => String(value).replaceAll("\t", "\\t").replaceAll("\r", "\\r").replaceAll("\n", "\\n"))
        .join("\t");
    });

  const generated = [["project_id", "slug", "project_name", ...FUNCTION_COLUMNS].join("\t"), ...rows].join("\n") + "\n";
  const current = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, "utf8") : "";

  if (checkOnly) {
    if (current !== generated) {
      throw new Error("phase-3b-project-migration-matrix.tsv is out of date. Run npm run phase3b:matrix.");
    }
  } else if (current !== generated) {
    fs.writeFileSync(outputFile, generated, "utf8");
  }

  console.log(`Phase 3B migration matrix: ${rows.length} projects × ${FUNCTION_COLUMNS.length} functions${checkOnly ? " (verified)" : ""}.`);
} finally {
  fs.rmSync(temporaryOutput, { recursive: true, force: true });
}

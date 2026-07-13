import fs from "node:fs";
import path from "node:path";
import { ALL_PROJECTS } from "../src/data/projects/index";
import { PUBLIC_PROJECT_SLUGS } from "../src/data/projects/public-slugs.generated";
import type { Project } from "../src/data/types";
import { locales, type Locale } from "../src/i18n/config";
import { SITE_URL } from "../src/lib/metadata";
import { CALENDAR_URL, PUBLIC_EMAIL, WHATSAPP_NUMBER } from "../src/lib/site";
import { getProjectPageCopy } from "../src/features/projects/project-page-copy";
import type { CanonicalProjectViewModel } from "../src/features/projects/project-view-model";
import { filterRedundantKeyFacts } from "../src/features/projects/server/filter-redundant-key-facts";
import { getAllCanonicalProjects } from "../src/features/projects/server/get-canonical-project";
import { projectMigrationAdjustments } from "../src/features/projects/server/project-migration-adjustments";

const FUNCTION_CONTRACTS = [
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
] as const;

const errors: string[] = [];
const repositoryRoot = process.cwd();
const EXPECTED_MATRIX_TOTALS = {
  preserve: 556,
  qualify: 6,
  request: 9,
  omit_optional: 3,
  needs_content: 2,
} as const;
const EXPECTED_MATRIX_BY_FUNCTION: Record<
  (typeof FUNCTION_CONTRACTS)[number],
  Partial<Record<keyof typeof EXPECTED_MATRIX_TOTALS, number>>
> = {
  name: { preserve: 36 },
  location: { preserve: 36 },
  hero: { preserve: 36 },
  price_inventory: { preserve: 34, request: 2 },
  delivery: { preserve: 31, qualify: 4, request: 1 },
  rental: { preserve: 34, qualify: 1, request: 1 },
  delivery_condition: { preserve: 33, request: 3 },
  key_facts: { preserve: 32, qualify: 1, omit_optional: 3 },
  gallery: { preserve: 36 },
  highlights_amenities: { preserve: 36 },
  unit_types_floorplans: { preserve: 36 },
  features_materials: { preserve: 35, needs_content: 1 },
  faq: { preserve: 35, needs_content: 1 },
  payment_plan: { preserve: 34, request: 2 },
  map: { preserve: 36 },
  contact_disclaimer: { preserve: 36 },
};

const sharedRentalTranslations: Record<string, Record<Locale, string>> = {
  "30 días": { es: "30 días", en: "30 days" },
  "90 días": { es: "90 días", en: "90 days" },
  Tradicional: { es: "Tradicional", en: "Traditional leasing" },
  "No restr.": { es: "Sin restricciones", en: "No rental restrictions" },
  "Sin restricciones": { es: "Sin restricciones", en: "No rental restrictions" },
};

function check(condition: unknown, message: string): asserts condition {
  if (!condition) errors.push(message);
}

function checkKeys(value: object, expected: readonly string[], context: string) {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  check(JSON.stringify(actual) === JSON.stringify(wanted), `${context}: keys ${actual.join(", ")} != ${wanted.join(", ")}`);
}

function checkTrimmed(value: string, context: string) {
  check(typeof value === "string" && value.trim().length > 0, `${context}: empty string`);
}

function formatUsd(value: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    maximumFractionDigits: 0,
  }).format(value);
  return locale === "en" ? `From US$${formatted}` : `Desde US$${formatted}`;
}

function expectedDecisions(project: Project, locale: Locale) {
  const adjustment = projectMigrationAdjustments[project.slug];
  const price =
    adjustment?.price?.[locale] ??
    (typeof project.priceFromUsd === "number"
      ? formatUsd(project.priceFromUsd, locale)
      : locale === "en"
        ? "Inquire about current pricing and inventory"
        : "Consultar precio e inventario vigente");
  const priceWithRate =
    !adjustment?.price && typeof project.pricePerSfApprox === "number"
      ? `${price} · ~US$${new Intl.NumberFormat("en-US").format(project.pricePerSfApprox)}/sf`
      : price;
  const sharedRental = project.rentalPolicy?.trim();
  const rental =
    adjustment?.rental?.[locale] ??
    (locale === "en" ? project.rentalPolicyEn : project.rentalPolicyEs)?.trim() ??
    (sharedRental ? sharedRentalTranslations[sharedRental]?.[locale] ?? sharedRental : undefined) ??
    (locale === "en"
      ? "Ask about the applicable rental policy"
      : "Consultar política de renta aplicable");
  const condition =
    adjustment?.condition?.[locale] ??
    (typeof project.furnished === "boolean"
      ? locale === "en"
        ? project.furnished
          ? "Furnished"
          : "Unfurnished"
        : project.furnished
          ? "Amueblado"
          : "Sin amueblar"
      : locale === "en"
        ? "Ask about specifications and delivery condition"
        : "Consultar especificaciones y condición de entrega");

  return {
    price: priceWithRate,
    delivery:
      adjustment?.delivery?.[locale] ??
      project.delivery?.trim() ??
      (locale === "en" ? "Request the estimated completion" : "Consultar entrega estimada"),
    rental,
    condition,
  };
}

function legacyLabels(items: Project["unitMixEs"] | Project["featuresEs"]): string[] {
  return (items ?? []).map((item) => (typeof item === "string" ? item : item.label));
}

function checkArrayEqual(actual: readonly string[], expected: readonly string[], context: string) {
  check(JSON.stringify(actual) === JSON.stringify(expected), `${context}: content/order changed`);
}

function checkMatrixContract() {
  const matrixPath = path.join(repositoryRoot, "docs/phase-3b-project-migration-matrix.tsv");
  const lines = fs.readFileSync(matrixPath, "utf8").trimEnd().split("\n");
  const headers = lines[0].split("\t");
  const functionHeaders = headers.slice(3);
  check(
    JSON.stringify(functionHeaders) === JSON.stringify(FUNCTION_CONTRACTS),
    `Matrix function IDs changed: ${functionHeaders.join(", ")}`,
  );
  check(lines.length === 37, `Matrix must contain one header plus 36 rows; got ${lines.length}`);

  const totals: Record<keyof typeof EXPECTED_MATRIX_TOTALS, number> = {
    preserve: 0,
    qualify: 0,
    request: 0,
    omit_optional: 0,
    needs_content: 0,
  };
  const totalsByFunction = Object.fromEntries(
    FUNCTION_CONTRACTS.map((functionName) => [
      functionName,
      { preserve: 0, qualify: 0, request: 0, omit_optional: 0, needs_content: 0 },
    ]),
  ) as Record<
    (typeof FUNCTION_CONTRACTS)[number],
    Record<keyof typeof EXPECTED_MATRIX_TOTALS, number>
  >;
  const keyFactDecisions = new Map<string, keyof typeof EXPECTED_MATRIX_TOTALS>();

  for (const [rowIndex, line] of lines.slice(1).entries()) {
    const columns = line.split("\t");
    check(columns.length === headers.length, `Matrix row ${rowIndex + 2}: wrong column count`);
    for (const [columnIndex, cell] of columns.slice(3).entries()) {
      try {
        const parsed = JSON.parse(cell) as { decision?: keyof typeof EXPECTED_MATRIX_TOTALS };
        check(
          Boolean(parsed.decision && parsed.decision in totals),
          `Matrix row ${rowIndex + 2}, ${functionHeaders[columnIndex]}: invalid decision`,
        );
        if (parsed.decision && parsed.decision in totals) {
          totals[parsed.decision] += 1;
          totalsByFunction[functionHeaders[columnIndex] as (typeof FUNCTION_CONTRACTS)[number]][
            parsed.decision
          ] += 1;
          if (functionHeaders[columnIndex] === "key_facts") {
            keyFactDecisions.set(columns[1], parsed.decision);
          }
        }
      } catch {
        check(false, `Matrix row ${rowIndex + 2}, ${functionHeaders[columnIndex]}: invalid JSON`);
      }
    }
  }

  for (const [decision, expected] of Object.entries(EXPECTED_MATRIX_TOTALS)) {
    check(
      totals[decision as keyof typeof EXPECTED_MATRIX_TOTALS] === expected,
      `Matrix ${decision}: expected ${expected}, got ${totals[decision as keyof typeof EXPECTED_MATRIX_TOTALS]}`,
    );
  }
  for (const functionName of FUNCTION_CONTRACTS) {
    for (const decision of Object.keys(EXPECTED_MATRIX_TOTALS) as Array<
      keyof typeof EXPECTED_MATRIX_TOTALS
    >) {
      const expected = EXPECTED_MATRIX_BY_FUNCTION[functionName][decision] ?? 0;
      check(
        totalsByFunction[functionName][decision] === expected,
        `Matrix ${functionName}/${decision}: expected ${expected}, got ${totalsByFunction[functionName][decision]}`,
      );
    }
  }
  check(keyFactDecisions.size === 36, `Matrix key facts decisions: expected 36, got ${keyFactDecisions.size}`);
  return keyFactDecisions;
}

function expectedMapQuery(project: Project) {
  if (typeof project.lat === "number" && typeof project.lng === "number") {
    return `${project.lat},${project.lng}`;
  }
  return /\d/.test(project.city) ? project.city : `${project.name} ${project.city}`;
}

function checkImageSource(src: string, context: string) {
  if (/^https?:\/\//.test(src)) {
    const url = new URL(src);
    check(url.protocol === "https:", `${context}: remote image must use HTTPS`);
    return;
  }
  const localPath = path.join(repositoryRoot, "public", src.replace(/^\//, ""));
  check(fs.existsSync(localPath), `${context}: missing local image ${src}`);
}

function checkCanonicalPublicRouteContract() {
  const routePath = path.join(
    repositoryRoot,
    "src/app/[locale]/proyectos/[slug]/page.tsx",
  );
  const source = fs.readFileSync(routePath, "utf8");
  for (const required of [
    "CanonicalProjectPage",
    "getCanonicalProject",
    "PUBLIC_PROJECT_SLUGS",
    "createProjectMetadata",
    "dynamicParams = false",
  ]) {
    check(source.includes(required), `Public project route: missing ${required}`);
  }
  for (const forbidden of [
    "PriorityProjectPage",
    "ALL_PROJECTS",
    "GalleryLightbox",
    "PaymentPlan",
    "ShareButtons",
    "project-template-preview",
  ]) {
    check(!source.includes(forbidden), `Public project route: legacy branch ${forbidden} remains`);
  }

  for (const removedPath of [
    "src/app/[locale]/project-template-preview",
    "src/components/GalleryLightbox.tsx",
    "src/components/PaymentPlan.tsx",
    "src/components/ShareButtons.tsx",
  ]) {
    check(!fs.existsSync(path.join(repositoryRoot, removedPath)), `${removedPath}: retired file still exists`);
  }
}

function checkMailto(href: string, projectName: string, context: string) {
  const url = new URL(href);
  check(url.protocol === "mailto:", `${context}: expected mailto`);
  check(decodeURIComponent(url.pathname) === PUBLIC_EMAIL, `${context}: wrong recipient`);
  const subject = url.searchParams.get("subject") ?? "";
  const body = url.searchParams.get("body") ?? "";
  checkTrimmed(subject, `${context}.subject`);
  checkTrimmed(body, `${context}.body`);
  check(subject.includes(projectName) || body.includes(projectName), `${context}: project name missing`);
}

function checkAllowedShape(model: CanonicalProjectViewModel, context: string) {
  checkKeys(
    model,
    [
      "locale",
      "identity",
      "location",
      "hero",
      "decisions",
      "metrics",
      "gallery",
      "highlights",
      "unitTypes",
      "features",
      "faqs",
      "payment",
      "contact",
      "disclaimer",
    ],
    context,
  );
  checkKeys(model.identity, ["id", "slug", "name", "publicPath", "canonicalUrl"], `${context}.identity`);
  checkKeys(
    model.location,
    model.location.structuredAddress
      ? ["display", "mapQuery", "interactiveMap", "structuredAddress"]
      : ["display", "mapQuery", "interactiveMap"],
    `${context}.location`,
  );
  if (model.location.structuredAddress) {
    checkKeys(
      model.location.structuredAddress,
      ["streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"],
      `${context}.location.structuredAddress`,
    );
  }
  checkKeys(model.hero, ["src", "alt"], `${context}.hero`);
  checkKeys(model.decisions, ["price", "delivery", "rental", "condition", "note"], `${context}.decisions`);
  checkKeys(model.metrics, ["items", "note"], `${context}.metrics`);
  model.metrics.items.forEach((item, index) =>
    checkKeys(item, item.label ? ["id", "label", "value"] : ["id", "value"], `${context}.metrics.${index}`),
  );
  model.gallery.forEach((image, index) => checkKeys(image, ["src", "alt"], `${context}.gallery.${index}`));
  model.faqs.forEach((faq, index) =>
    checkKeys(faq, ["id", "question", "answer"], `${context}.faqs.${index}`),
  );
  checkKeys(
    model.payment,
    model.payment.kind === "steps" ? ["kind", "steps"] : ["kind", "copy"],
    `${context}.payment`,
  );
  checkKeys(
    model.contact,
    [
      "whatsappHref",
      "calendarHref",
      "emailHref",
      "plansHref",
      "availabilityHref",
      "materialsHref",
      "paymentPlanHref",
      "shareUrl",
    ],
    `${context}.contact`,
  );
}

function checkNoPrivateData(model: CanonicalProjectViewModel, context: string) {
  const serialized = JSON.stringify(model);
  const forbidden = [
    "/Users/",
    "file://",
    "src/data/",
    "docs/phase-",
    "Dropbox",
    ".env",
    "needs_content",
    "omit_optional",
    "sourceId",
    "estado editorial",
    "fuente interna",
    "contradicción interna",
    "responsable de validación",
    "revisión pendiente",
  ];
  for (const token of forbidden) {
    check(!serialized.includes(token), `${context}: serialized private marker ${token}`);
  }
  check(JSON.parse(serialized) !== null, `${context}: not JSON serializable`);
}

function checkFunctionContract(
  model: CanonicalProjectViewModel,
  context: string,
  keyFactDecision: keyof typeof EXPECTED_MATRIX_TOTALS,
) {
  const copy = getProjectPageCopy(model.locale);
  const present: Record<(typeof FUNCTION_CONTRACTS)[number], boolean> = {
    name: Boolean(model.identity.id && model.identity.name && model.identity.slug),
    location: Boolean(model.location.display),
    hero: Boolean(model.hero.src && model.hero.alt),
    price_inventory: Boolean(model.decisions.price),
    delivery: Boolean(model.decisions.delivery),
    rental: Boolean(model.decisions.rental),
    delivery_condition: Boolean(model.decisions.condition),
    key_facts: model.metrics.items.length > 0 || keyFactDecision === "omit_optional",
    gallery: model.gallery.length > 0 || Boolean(copy.empty.gallery),
    highlights_amenities: model.highlights.length > 0 || Boolean(copy.empty.highlights),
    unit_types_floorplans:
      model.unitTypes.length > 0 || Boolean(copy.empty.unitTypes && model.contact.plansHref),
    features_materials:
      model.features.length > 0 || Boolean(copy.empty.features && model.contact.materialsHref),
    faq: model.faqs.length > 0 || Boolean(copy.empty.faq),
    payment_plan:
      model.payment.kind === "steps"
        ? model.payment.steps.length > 0
        : Boolean(model.payment.copy && model.contact.paymentPlanHref),
    map: Boolean(model.location.display && model.location.mapQuery),
    contact_disclaimer: Boolean(
      model.contact.whatsappHref &&
        model.contact.calendarHref &&
        model.contact.emailHref &&
        model.contact.shareUrl &&
        model.disclaimer,
    ),
  };
  check(Object.keys(present).length === 16, `${context}: function contract count is not 16`);
  for (const id of FUNCTION_CONTRACTS) check(present[id], `${context}: missing function ${id}`);
}

function checkPreservation(project: Project, model: CanonicalProjectViewModel, locale: Locale) {
  const context = `${locale}/${model.identity.slug}`;
  const expectedSlug = project.slug.slice("/proyectos/".length);
  const expectedPublicPath = `/${locale}${project.slug}`;
  const decisions = expectedDecisions(project, locale);
  check(model.identity.id === project.id, `${context}: id changed`);
  check(model.identity.slug === expectedSlug, `${context}: slug changed`);
  check(model.identity.name === project.name, `${context}: name changed`);
  check(model.identity.publicPath === expectedPublicPath, `${context}: public path changed`);
  check(
    model.identity.canonicalUrl === new URL(expectedPublicPath, SITE_URL).toString(),
    `${context}: canonical URL changed`,
  );
  check(model.location.display === project.city, `${context}: location changed`);
  check(model.location.mapQuery === expectedMapQuery(project), `${context}: map query changed`);
  check(model.location.interactiveMap, `${context}: interactive legacy map was disabled`);
  check(model.hero.src === project.image, `${context}: hero changed`);
  check(model.decisions.price === decisions.price, `${context}: price changed unexpectedly`);
  check(model.decisions.delivery === decisions.delivery, `${context}: delivery changed unexpectedly`);
  check(model.decisions.rental === decisions.rental, `${context}: rental changed unexpectedly`);
  check(model.decisions.condition === decisions.condition, `${context}: condition changed unexpectedly`);
  checkArrayEqual(
    model.gallery.map((image) => image.src),
    (project.images ?? []).map((image) => image.src),
    `${context}.gallery`,
  );
  checkArrayEqual(
    model.highlights,
    locale === "en" ? project.highlightsEn ?? [] : project.highlights ?? [],
    `${context}.highlights`,
  );
  checkArrayEqual(
    model.unitTypes,
    legacyLabels(locale === "en" ? project.unitMixEn : project.unitMixEs),
    `${context}.unitTypes`,
  );
  checkArrayEqual(
    model.features,
    legacyLabels(locale === "en" ? project.featuresEn : project.featuresEs),
    `${context}.features`,
  );
  const legacyFaqs = locale === "en" ? project.faqsEn ?? [] : project.faqsEs ?? [];
  checkArrayEqual(
    model.faqs.map((faq) => faq.question),
    legacyFaqs.map((faq) => faq.q),
    `${context}.faq.questions`,
  );
  const faqOverrides = projectMigrationAdjustments[project.slug]?.faqAnswerOverrides?.[locale] ?? {};
  checkArrayEqual(
    model.faqs.map((faq) => faq.answer),
    legacyFaqs.map((faq) => faqOverrides[faq.q] ?? faq.a),
    `${context}.faq.answers`,
  );
  const legacyPayment = locale === "en" ? project.paymentPlanEn ?? [] : project.paymentPlanEs ?? [];
  const paymentRequest = projectMigrationAdjustments[project.slug]?.paymentRequest || legacyPayment.length === 0;
  check(model.payment.kind === (paymentRequest ? "request" : "steps"), `${context}: payment kind changed`);
  if (model.payment.kind === "steps") {
    checkArrayEqual(model.payment.steps, legacyPayment, `${context}.payment.steps`);
  }
  const rawMetrics = projectMigrationAdjustments[project.slug]?.metrics?.[locale] ??
    (locale === "en" ? project.microClaimsEn ?? [] : project.microClaimsEs ?? []).map(
      (value, index) => ({ id: `${project.id}-metric-${index + 1}`, value }),
    );
  const expectedMetrics = filterRedundantKeyFacts(rawMetrics, {
    projectName: project.name,
    location: project.city,
    price: decisions.price,
    delivery: decisions.delivery,
    rental: decisions.rental,
    condition: decisions.condition,
  });
  check(
    JSON.stringify(model.metrics.items) === JSON.stringify(expectedMetrics),
    `${context}.metrics: normalized deduplication changed content/order`,
  );
}

function checkCtas(model: CanonicalProjectViewModel, context: string) {
  const whatsapp = new URL(model.contact.whatsappHref);
  check(whatsapp.protocol === "https:", `${context}: WhatsApp must use HTTPS`);
  check(whatsapp.hostname === "wa.me", `${context}: WhatsApp host changed`);
  check(whatsapp.pathname === `/${WHATSAPP_NUMBER}`, `${context}: WhatsApp number changed`);
  check(
    (whatsapp.searchParams.get("text") ?? "").includes(model.identity.name),
    `${context}: WhatsApp context missing project name`,
  );
  check(model.contact.calendarHref === CALENDAR_URL, `${context}: calendar URL changed`);
  for (const [key, href] of Object.entries({
    email: model.contact.emailHref,
    plans: model.contact.plansHref,
    availability: model.contact.availabilityHref,
    materials: model.contact.materialsHref,
    payment: model.contact.paymentPlanHref,
  })) {
    checkMailto(href, model.identity.name, `${context}.${key}`);
  }
  check(model.contact.shareUrl === model.identity.canonicalUrl, `${context}: share URL is not canonical`);
}

function findModel(models: CanonicalProjectViewModel[], locale: Locale, slug: string) {
  const model = models.find((item) => item.locale === locale && item.identity.slug === slug);
  check(model, `Missing regression model ${locale}/${slug}`);
  return model as CanonicalProjectViewModel;
}

const keyFactDecisions = checkMatrixContract();
checkCanonicalPublicRouteContract();
check(FUNCTION_CONTRACTS.length === 16, "Expected exactly 16 function contracts");
check(ALL_PROJECTS.length === 36, `Expected 36 effective projects; got ${ALL_PROJECTS.length}`);
check(new Set(ALL_PROJECTS.map((project) => project.id)).size === 36, "Project IDs are not unique");
check(new Set(ALL_PROJECTS.map((project) => project.slug)).size === 36, "Project slugs are not unique");
check(
  JSON.stringify([...ALL_PROJECTS.map((project) => project.slug)].sort()) ===
    JSON.stringify([...PUBLIC_PROJECT_SLUGS].sort()),
  "ALL_PROJECTS and PUBLIC_PROJECT_SLUGS differ",
);

const models = locales.flatMap((locale) => getAllCanonicalProjects(locale));
check(models.length === 72, `Expected 72 canonical models; got ${models.length}`);

for (const locale of locales) {
  const localized = models.filter((model) => model.locale === locale);
  check(localized.length === 36, `${locale}: expected 36 models`);
  check(new Set(localized.map((model) => model.identity.slug)).size === 36, `${locale}: duplicate slugs`);
}

for (const model of models) {
  const context = `${model.locale}/${model.identity.slug}`;
  const project = ALL_PROJECTS.find((item) => item.id === model.identity.id);
  check(project, `${context}: source project missing`);
  if (!project) continue;

  checkAllowedShape(model, context);
  checkNoPrivateData(model, context);
  const matrixDecision = keyFactDecisions.get(`/proyectos/${model.identity.slug}`);
  check(matrixDecision, `${context}: missing matrix decision for key facts`);
  if (!matrixDecision) continue;
  checkFunctionContract(model, context, matrixDecision);
  check(
    (model.metrics.items.length === 0) === (matrixDecision === "omit_optional"),
    `${context}: empty key facts and matrix omit_optional are out of sync`,
  );
  checkPreservation(project, model, model.locale);
  checkCtas(model, context);
  checkImageSource(model.hero.src, `${context}.hero`);
  model.gallery.forEach((image, index) => checkImageSource(image.src, `${context}.gallery.${index}`));
  [
    model.identity.id,
    model.identity.slug,
    model.identity.name,
    model.identity.publicPath,
    model.identity.canonicalUrl,
    model.location.display,
    model.location.mapQuery,
    model.hero.alt,
    model.decisions.price,
    model.decisions.delivery,
    model.decisions.rental,
    model.decisions.condition,
    model.decisions.note,
    model.metrics.note,
    model.disclaimer,
  ].forEach((value, index) => checkTrimmed(value, `${context}.required.${index}`));
  model.metrics.items.forEach((item, index) => {
    checkTrimmed(item.id, `${context}.metrics.${index}.id`);
    checkTrimmed(item.value, `${context}.metrics.${index}.value`);
    if (item.label !== undefined) checkTrimmed(item.label, `${context}.metrics.${index}.label`);
  });
  model.gallery.forEach((image, index) => {
    checkTrimmed(image.src, `${context}.gallery.${index}.src`);
    checkTrimmed(image.alt, `${context}.gallery.${index}.alt`);
  });
  model.highlights.forEach((value, index) => checkTrimmed(value, `${context}.highlights.${index}`));
  model.unitTypes.forEach((value, index) => checkTrimmed(value, `${context}.unitTypes.${index}`));
  model.features.forEach((value, index) => checkTrimmed(value, `${context}.features.${index}`));
  model.faqs.forEach((faq, index) => {
    checkTrimmed(faq.id, `${context}.faqs.${index}.id`);
    checkTrimmed(faq.question, `${context}.faqs.${index}.question`);
    checkTrimmed(faq.answer, `${context}.faqs.${index}.answer`);
  });
  if (model.payment.kind === "steps") {
    model.payment.steps.forEach((step, index) =>
      checkTrimmed(step, `${context}.payment.steps.${index}`),
    );
  } else {
    checkTrimmed(model.payment.copy, `${context}.payment.copy`);
  }
  if (model.location.structuredAddress) {
    Object.entries(model.location.structuredAddress).forEach(([key, value]) =>
      checkTrimmed(value, `${context}.structuredAddress.${key}`),
    );
  }
  check(
    new Set(model.metrics.items.map((item) => item.id)).size === model.metrics.items.length,
    `${context}: duplicate metric IDs`,
  );
  check(
    new Set(model.faqs.map((item) => item.id)).size === model.faqs.length,
    `${context}: duplicate FAQ IDs`,
  );
}

for (const project of ALL_PROJECTS) {
  const slug = project.slug.slice("/proyectos/".length);
  const es = findModel(models, "es", slug);
  const en = findModel(models, "en", slug);
  check(es.identity.id === en.identity.id, `${slug}: ES/EN identity mismatch`);
  check(es.hero.src === en.hero.src, `${slug}: ES/EN hero mismatch`);
  check(es.location.mapQuery === en.location.mapQuery, `${slug}: ES/EN map mismatch`);
  check(es.location.interactiveMap === en.location.interactiveMap, `${slug}: ES/EN map mode mismatch`);
  check(
    JSON.stringify(es.location.structuredAddress) === JSON.stringify(en.location.structuredAddress),
    `${slug}: ES/EN structured address mismatch`,
  );
  check(es.metrics.items.length === en.metrics.items.length, `${slug}: ES/EN metric length mismatch`);
  check(es.gallery.length === en.gallery.length, `${slug}: ES/EN gallery length mismatch`);
  check(es.highlights.length === en.highlights.length, `${slug}: ES/EN highlights length mismatch`);
  check(es.unitTypes.length === en.unitTypes.length, `${slug}: ES/EN unit length mismatch`);
  check(es.features.length === en.features.length, `${slug}: ES/EN feature length mismatch`);
  check(es.faqs.length === en.faqs.length, `${slug}: ES/EN FAQ length mismatch`);
  check(es.payment.kind === en.payment.kind, `${slug}: ES/EN payment kind mismatch`);
  if (es.payment.kind === "steps" && en.payment.kind === "steps") {
    check(es.payment.steps.length === en.payment.steps.length, `${slug}: ES/EN payment length mismatch`);
  }
}

const williamEs = findModel(models, "es", "the-william");
const williamEn = findModel(models, "en", "the-william");
check(williamEs.decisions.rental.includes("90"), "William: rental 90 days missing");
check(williamEs.decisions.delivery.includes("2029"), "William: 2029 delivery missing");
check(williamEn.decisions.rental === "Minimum rental term of 90 days", "William EN: rental changed");
check(
  williamEn.decisions.delivery === "Estimated completion 2029 · subject to confirmation",
  "William EN: delivery changed",
);
check(
  williamEn.decisions.price === "Inquire about current pricing and inventory",
  "William EN: price fallback changed",
);
check(
  williamEn.decisions.condition === "Ask for current specifications and delivery condition",
  "William EN: condition fallback changed",
);
check(
  ["26", "374", "3.760"].every((value) => williamEs.metrics.items.some((item) => item.value.includes(value))),
  "William: approved metrics missing",
);
check(williamEs.gallery.length === 4, "William: gallery changed");
check(williamEs.highlights.length === 6, "William: amenities changed");
check(williamEs.payment.kind === "request", "William: payment must remain request");
check(Boolean(williamEs.location.structuredAddress), "William: structured address missing");
check(williamEn.payment.kind === "request", "William EN: payment must remain request");
check(williamEn.metrics.items.length === 3, "William EN: approved metrics missing");
check(
  ["26", "374", "40,459"].every((value) =>
    williamEn.metrics.items.some((item) => item.value.includes(value)),
  ),
  "William EN: approved metric values changed",
);
check(Boolean(williamEn.location.structuredAddress), "William EN: structured address missing");
check(getProjectPageCopy("es").sections.metrics === "Datos clave", "ES key facts heading changed");
check(getProjectPageCopy("en").sections.metrics === "Key facts", "EN key facts heading changed");

for (const locale of locales) {
  const cassia = findModel(models, locale, "cassia");
  check(
    locale === "en"
      ? cassia.decisions.price === "Inquire about current pricing and inventory"
      : cassia.decisions.price === "Consultar precio e inventario vigente",
    `Cassia ${locale}: unresolved price must use approved fallback`,
  );
  check(!cassia.faqs[0]?.answer.includes("823"), `Cassia ${locale}: conflicting FAQ price leaked`);
  check(cassia.metrics.items.length === 1, `Cassia ${locale}: key facts deduplication changed`);
  check(
    /(?:RH|Restoration Hardware)/.test(cassia.metrics.items[0]?.value ?? ""),
    `Cassia ${locale}: non-redundant RH detail was lost`,
  );

  const viceroyMetrics = findModel(models, locale, "viceroy-brickell-residences").metrics.items;
  check(viceroyMetrics.length === 0, `Viceroy ${locale}: duplicated key facts remain`);
  check(
    findModel(models, locale, "26-and-2nd").metrics.items.length === 3,
    `26 & 2nd ${locale}: non-redundant key facts were removed`,
  );
  check(
    findModel(models, locale, "ambar-orlando").metrics.items.length === 3,
    `Ambar ${locale}: non-redundant key facts were removed`,
  );
  check(
    findModel(models, locale, "one-park-tower").metrics.items.length === 3,
    `One Park ${locale}: non-redundant key facts were removed`,
  );

  const nomad = findModel(models, locale, "nomad");
  check(nomad.decisions.delivery === "2026", `NoMad ${locale}: delivery must preserve 2026`);
  check(nomad.faqs.some((faq) => faq.answer.includes("2026")), `NoMad ${locale}: FAQ not aligned to 2026`);
  check(!nomad.faqs.some((faq) => faq.answer.includes("Q4 2025")), `NoMad ${locale}: stale FAQ leaked`);

  check(findModel(models, locale, "one-park-tower").payment.kind === "request", `One Park ${locale}: empty plan fallback missing`);
  check(findModel(models, locale, "26-and-2nd").faqs.length === 0, `26 & 2nd ${locale}: FAQ should remain absent`);
  check(findModel(models, locale, "viceroy-brickell-residences").features.length === 0, `Viceroy ${locale}: features should remain absent`);
  check(
    findModel(models, locale, "ambar-orlando").decisions.delivery ===
      (locale === "en" ? "Request the estimated completion" : "Consultar entrega estimada"),
    `Ambar ${locale}: delivery fallback missing`,
  );
  const faena = findModel(models, locale, "faena");
  check(
    faena.decisions.rental ===
      (locale === "en" ? "Ask about the applicable rental policy" : "Consultar política de renta aplicable"),
    `Faena ${locale}: rental fallback missing`,
  );
  check(
    faena.decisions.condition ===
      (locale === "en"
        ? "Residences delivered fully finished; furnishing not specified"
        : "Residencias entregadas totalmente terminadas; amoblamiento no especificado"),
    `Faena ${locale}: existing condition content was not preserved`,
  );
}

const preservedConditionCases = {
  "gaia-residences": {
    es: "Paquetes de mobiliario a medida disponibles (opcional)",
    en: "Bespoke custom furniture packages available (optional)",
  },
  "jean-georges-tropic": {
    es: "Unidades terminadas; muebles no incluidos; paquetes opcionales disponibles",
    en: "Delivered fully finished; furniture not included; optional furniture packages available",
  },
  "nickelodeon-orlando": {
    es: "Residencias entregadas amuebladas",
    en: "Residences delivered furnished",
  },
  "oasis-hallandale": {
    es: "Unidades terminadas, sin muebles; paquetes externos disponibles",
    en: "Delivered fully finished; furniture not included; third-party packages available",
  },
} as const;
for (const [slug, expected] of Object.entries(preservedConditionCases)) {
  for (const locale of locales) {
    check(
      findModel(models, locale, slug).decisions.condition === expected[locale],
      `${slug} ${locale}: existing condition content was not preserved`,
    );
  }
}

const englishRentalCases = {
  "2200-brickell": "90 days",
  "ave-maria": "Traditional leasing",
  "flow-house": "30 days",
  "one-park-tower": "30 days",
};
for (const [slug, expected] of Object.entries(englishRentalCases)) {
  check(findModel(models, "en", slug).decisions.rental === expected, `${slug}: EN rental localization failed`);
}

const viceroy = findModel(models, "es", "viceroy-brickell-residences");
check(viceroy.gallery.some((image) => image.src === viceroy.hero.src), "Viceroy: repeated hero was not preserved in gallery");

if (errors.length > 0) {
  console.error(`Canonical project model validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Canonical project models: ${ALL_PROJECTS.length} projects × ${locales.length} locales = ${models.length} verified; ${FUNCTION_CONTRACTS.length} functions preserved.`,
);

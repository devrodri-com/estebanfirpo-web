import type { CanonicalProjectMetric } from "../project-view-model";

export type KeyFactSummary = {
  projectName: string;
  location: string;
  price: string;
  delivery: string;
  rental: string;
  condition: string;
};

const PRICE_WORDS = new Set([
  "a",
  "and",
  "at",
  "aprox",
  "approx",
  "approximately",
  "desde",
  "dollar",
  "dollars",
  "el",
  "en",
  "from",
  "in",
  "la",
  "los",
  "price",
  "prices",
  "precio",
  "precios",
  "starting",
  "the",
  "us",
  "usd",
]);

const DELIVERY_WORDS = new Set([
  "completion",
  "date",
  "de",
  "delivery",
  "entrega",
  "estimated",
  "estimada",
  "estimado",
  "fecha",
  "finalizacion",
  "prevista",
  "previsto",
]);

const RENTAL_WORDS = new Set([
  "a",
  "airbnb",
  "alquiler",
  "alquileres",
  "allowed",
  "ano",
  "aprobada",
  "aprobado",
  "approved",
  "corta",
  "cortas",
  "corto",
  "cortos",
  "daily",
  "day",
  "days",
  "de",
  "desde",
  "dia",
  "dias",
  "diaria",
  "diarias",
  "diario",
  "diarios",
  "estadia",
  "estadias",
  "estancia",
  "estancias",
  "flexible",
  "friendly",
  "hasta",
  "lease",
  "leases",
  "lodging",
  "long",
  "min",
  "minima",
  "minimo",
  "minimum",
  "night",
  "nightly",
  "nights",
  "no",
  "noche",
  "noches",
  "per",
  "permitida",
  "permitidas",
  "permitido",
  "permitidos",
  "plazo",
  "renta",
  "rentas",
  "rental",
  "rentals",
  "restriction",
  "restrictions",
  "restriccion",
  "restricciones",
  "short",
  "sin",
  "stay",
  "stays",
  "str",
  "temporal",
  "term",
  "times",
  "to",
  "tradicional",
  "traditional",
  "up",
  "use",
  "uso",
  "veces",
  "with",
  "year",
  "y",
]);

const CONDITION_WORDS = new Set([
  "and",
  "amueblada",
  "amuebladas",
  "amueblado",
  "amueblados",
  "completa",
  "completamente",
  "completas",
  "complete",
  "delivered",
  "entregada",
  "entregadas",
  "entregado",
  "entregados",
  "finished",
  "fully",
  "furnished",
  "muebles",
  "residence",
  "residences",
  "residencia",
  "residencias",
  "sin",
  "terminada",
  "terminadas",
  "terminado",
  "terminados",
  "totalmente",
  "unfurnished",
  "unit",
  "units",
  "unidad",
  "unidades",
  "y",
]);

const LOCATION_BOILERPLATE = new Set([
  "address",
  "at",
  "corazon",
  "de",
  "del",
  "direccion",
  "el",
  "en",
  "heart",
  "in",
  "la",
  "location",
  "of",
  "one",
  "prime",
  "the",
  "ubicacion",
]);

const GENERIC_PROJECT_WORDS = new Set([
  "condo",
  "condominiums",
  "hotel",
  "hotels",
  "project",
  "proyecto",
  "residence",
  "residences",
  "residencia",
  "residencias",
  "resort",
  "resorts",
  "the",
  "tower",
]);

export function normalizeKeyFactText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[™®©]/g, "")
    .replace(/&/g, " and ")
    .replace(/\$/g, " ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}$]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokens(value: string): string[] {
  const normalized = normalizeKeyFactText(value);
  return normalized ? normalized.split(" ") : [];
}

function hasOnlyAllowedTokens(value: string, allowed: ReadonlySet<string>): boolean {
  const valueTokens = tokens(value);
  return (
    valueTokens.length > 0 &&
    valueTokens.every((token) => allowed.has(token) || /^\d+(?:k|ks|m)?$/.test(token) || /^q[1-4]$/.test(token))
  );
}

function moneyValues(value: string): number[] {
  if (!/(?:us\s*\$|usd|\$|precio|precios|price|prices|desde|from|starting)/i.test(value)) {
    return [];
  }

  const compactThousands = value.replace(/(?<=\d)[.,](?=\d{3}(?:\D|$))/g, "");
  const values: number[] = [];

  for (const match of compactThousands.matchAll(/(\d+(?:\.\d+)?)\s*(ks|k|m)?\b/gi)) {
    const raw = Number(match[1]);
    if (!Number.isFinite(raw)) continue;
    const suffix = match[2]?.toLowerCase();
    const amount = suffix === "m" ? raw * 1_000_000 : suffix === "k" || suffix === "ks" ? raw * 1_000 : raw;
    if (amount >= 100_000) values.push(Math.round(amount));
  }

  return values;
}

function isPriceDuplicate(value: string, price: string): boolean {
  const factValues = moneyValues(value);
  const summaryValues = new Set(moneyValues(price));
  return (
    factValues.some((amount) => summaryValues.has(amount)) &&
    hasOnlyAllowedTokens(value.replace(/[.,]/g, ""), PRICE_WORDS)
  );
}

function deliveryPeriod(value: string): { years: string[]; quarters: string[] } {
  const normalized = normalizeKeyFactText(value);
  return {
    years: normalized.match(/\b20\d{2}\b/g) ?? [],
    quarters: normalized.match(/\bq[1-4]\b/g) ?? [],
  };
}

function isDeliveryDuplicate(value: string, delivery: string): boolean {
  const factPeriod = deliveryPeriod(value);
  const summaryPeriod = deliveryPeriod(delivery);
  if (factPeriod.years.length === 0 || summaryPeriod.years.length === 0) return false;
  if (!factPeriod.years.some((year) => summaryPeriod.years.includes(year))) return false;
  if (
    factPeriod.quarters.length > 0 &&
    summaryPeriod.quarters.length > 0 &&
    !factPeriod.quarters.some((quarter) => summaryPeriod.quarters.includes(quarter))
  ) {
    return false;
  }
  return hasOnlyAllowedTokens(value, DELIVERY_WORDS);
}

function rentalSignals(value: string) {
  const normalized = normalizeKeyFactText(value);
  const minimums = [...normalized.matchAll(/\b(\d+)\s*(?:day|days|dia|dias|night|nights|noche|noches)\b/g)].map(
    (match) => Number(match[1]),
  );
  return {
    isRental:
      /\b(?:airbnb|alquiler|alquileres|lease|leases|lodging|renta|rentas|rental|rentals|str)\b/.test(normalized),
    shortTerm:
      /\b(?:airbnb|daily|diaria|diarias|diario|diarios|estadia corta|estadias cortas|estancia corta|estancias cortas|lodging|nightly|renta corta|short term|str)\b/.test(
        normalized,
      ),
    noRestrictions:
      /\b(?:no rental restrictions|no restrictions|sin restriccion|sin restricciones)\b/.test(normalized),
    minimums,
  };
}

function isRentalDuplicate(value: string, rental: string): boolean {
  if (/\b(?:ask|consultar|request)\b/.test(normalizeKeyFactText(rental))) return false;
  const fact = rentalSignals(value);
  const summary = rentalSignals(rental);
  if (!fact.isRental || !hasOnlyAllowedTokens(value, RENTAL_WORDS)) return false;

  const sharedMinimum = fact.minimums.some((minimum) => summary.minimums.includes(minimum));
  return (
    sharedMinimum ||
    (fact.shortTerm && summary.shortTerm) ||
    (fact.noRestrictions && summary.noRestrictions) ||
    (fact.shortTerm && summary.noRestrictions) ||
    (fact.noRestrictions && summary.shortTerm)
  );
}

function conditionSignals(value: string): Set<"furnished" | "unfurnished" | "finished"> {
  const normalized = normalizeKeyFactText(value);
  const signals = new Set<"furnished" | "unfurnished" | "finished">();
  if (
    /\b(?:unfurnished|sin amueblar|furniture not included|muebles no incluidos)\b/.test(normalized)
  ) {
    signals.add("unfurnished");
  } else if (/\b(?:furnished|amueblada|amuebladas|amueblado|amueblados)\b/.test(normalized)) {
    signals.add("furnished");
  }
  if (/\b(?:finished|terminada|terminadas|terminado|terminados)\b/.test(normalized)) {
    signals.add("finished");
  }
  return signals;
}

function isConditionDuplicate(value: string, condition: string): boolean {
  const factSignals = conditionSignals(value);
  const summarySignals = conditionSignals(condition);
  if (factSignals.size === 0 || ![...factSignals].every((signal) => summarySignals.has(signal))) {
    return false;
  }

  const normalizedCondition = normalizeKeyFactText(condition);
  if (/\b(?:optional|opcional|opcionales)\b/.test(normalizedCondition)) return false;
  return hasOnlyAllowedTokens(value, CONDITION_WORDS);
}

function meaningfulLocationTokens(value: string): Set<string> {
  return new Set(
    tokens(value).filter(
      (token) =>
        token.length > 2 && !LOCATION_BOILERPLATE.has(token) && !GENERIC_PROJECT_WORDS.has(token),
    ),
  );
}

function isLocationDuplicate(value: string, location: string, projectName: string): boolean {
  const normalizedValue = normalizeKeyFactText(value);
  const normalizedLocation = normalizeKeyFactText(location);
  const withoutLabel = normalizedValue.replace(/^(?:address|direccion|location|ubicacion)\s+/, "");

  if (
    (withoutLabel === normalizedLocation && withoutLabel.length >= 4) ||
    (withoutLabel.split(" ").length >= 2 && normalizedLocation.includes(withoutLabel))
  ) {
    return true;
  }

  if (!/\b(?:address|corazon|direccion|heart|location|ubicacion)\b/.test(normalizedValue)) {
    return false;
  }

  const referenceTokens = meaningfulLocationTokens(`${location} ${projectName}`);
  const factTokens = meaningfulLocationTokens(value);
  const overlaps = [...factTokens].some((token) => referenceTokens.has(token));
  const residual = tokens(value).filter(
    (token) =>
      !LOCATION_BOILERPLATE.has(token) &&
      !GENERIC_PROJECT_WORDS.has(token) &&
      !referenceTokens.has(token),
  );
  return overlaps && residual.length === 0;
}

export function isRedundantKeyFact(
  metric: CanonicalProjectMetric,
  summary: KeyFactSummary,
): boolean {
  const value = [metric.label, metric.value].filter(Boolean).join(" ");
  return (
    isPriceDuplicate(value, summary.price) ||
    isDeliveryDuplicate(value, summary.delivery) ||
    isRentalDuplicate(value, summary.rental) ||
    isConditionDuplicate(value, summary.condition) ||
    isLocationDuplicate(value, summary.location, summary.projectName)
  );
}

export function filterRedundantKeyFacts(
  metrics: readonly CanonicalProjectMetric[],
  summary: KeyFactSummary,
): CanonicalProjectMetric[] {
  return metrics.filter((metric) => !isRedundantKeyFact(metric, summary)).map((metric) => ({ ...metric }));
}

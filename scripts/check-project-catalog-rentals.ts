import { ALL_PROJECTS } from "../src/data/projects/index";
import { PUBLIC_PROJECT_SLUGS } from "../src/data/projects/public-slugs.generated";
import {
  PROJECT_RENTAL_CATEGORY_BY_SLUG,
  type PublicProjectSlug,
} from "../src/features/catalog/rental-classification";
import type { ProjectRentalCategory } from "../src/features/catalog/project-catalog-types";
import { getProjectCatalogCardViewModels } from "../src/features/catalog/server/get-project-catalog";

const errors: string[] = [];
const expectedCounts: Record<ProjectRentalCategory, number> = {
  flexible: 22,
  "30-days": 9,
  "60-days": 0,
  "90-days": 2,
  traditional: 2,
};
const counts: Record<ProjectRentalCategory, number> = {
  flexible: 0,
  "30-days": 0,
  "60-days": 0,
  "90-days": 0,
  traditional: 0,
};

const projectSlugs = ALL_PROJECTS.map((project) => project.slug);
const rentalEsBySlug = new Map(
  getProjectCatalogCardViewModels("es").map((project) => [
    project.slug,
    project.rentalPolicy,
  ]),
);
const rentalEnBySlug = new Map(
  getProjectCatalogCardViewModels("en").map((project) => [
    project.slug,
    project.rentalPolicy,
  ]),
);
const duplicateSlugs = projectSlugs.filter(
  (slug, index) => projectSlugs.indexOf(slug) !== index,
);
if (duplicateSlugs.length) {
  errors.push(`Duplicate project slugs: ${[...new Set(duplicateSlugs)].join(", ")}`);
}

const publicSlugSet = new Set<string>(PUBLIC_PROJECT_SLUGS);
const projectSlugSet = new Set(projectSlugs);
const missingProjects = PUBLIC_PROJECT_SLUGS.filter(
  (slug) => !projectSlugSet.has(slug),
);
const unexpectedProjects = projectSlugs.filter((slug) => !publicSlugSet.has(slug));
if (missingProjects.length) {
  errors.push(`Public slugs missing from ALL_PROJECTS: ${missingProjects.join(", ")}`);
}
if (unexpectedProjects.length) {
  errors.push(`Unexpected ALL_PROJECTS slugs: ${unexpectedProjects.join(", ")}`);
}

console.log("project\trental_es\trental_en\tcategory");
const uncategorized: string[] = [];

for (const project of ALL_PROJECTS) {
  const slug = project.slug as PublicProjectSlug;
  if (!Object.hasOwn(PROJECT_RENTAL_CATEGORY_BY_SLUG, slug)) {
    errors.push(`Missing explicit rental category entry: ${project.name} (${slug})`);
    continue;
  }

  const category = PROJECT_RENTAL_CATEGORY_BY_SLUG[slug];
  if (category) counts[category] += 1;
  else uncategorized.push(`${project.name} (${slug})`);

  const rentalEs = rentalEsBySlug.get(slug) || "—";
  const rentalEn = rentalEnBySlug.get(slug) || "—";
  console.log(
    [project.name, rentalEs, rentalEn, category ?? "uncategorized"]
      .map((value) => value.replaceAll("\t", " "))
      .join("\t"),
  );
}

const mappingExtras = Object.keys(PROJECT_RENTAL_CATEGORY_BY_SLUG).filter(
  (slug) => !projectSlugSet.has(slug),
);
if (mappingExtras.length) {
  errors.push(`Rental category entries without a public project: ${mappingExtras.join(", ")}`);
}

for (const [category, expected] of Object.entries(expectedCounts)) {
  const actual = counts[category as ProjectRentalCategory];
  if (actual !== expected) {
    errors.push(`${category}: expected ${expected}, received ${actual}`);
  }
}
if (uncategorized.length !== 1 || !uncategorized[0]?.includes("/proyectos/faena")) {
  errors.push(
    `Expected only Faena without category; received ${uncategorized.join(", ") || "none"}`,
  );
}

const zeroCategories = Object.entries(counts)
  .filter(([, count]) => count === 0)
  .map(([category]) => category);

console.log("\nRental category counts");
console.log(`all\t${ALL_PROJECTS.length}`);
for (const [category, count] of Object.entries(counts)) {
  console.log(`${category}\t${count}`);
}
console.log(`zero-result categories\t${zeroCategories.join(", ") || "none"}`);
console.log(`projects without category\t${uncategorized.join(", ") || "none"}`);

if (errors.length) {
  console.error("\nCatalog rental classification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("\nCatalog rental classification passed.");

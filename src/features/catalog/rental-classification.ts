import { PUBLIC_PROJECT_SLUGS } from "@/data/projects/public-slugs.generated";
import type { ProjectRentalCategory } from "./project-catalog-types";

export type PublicProjectSlug = (typeof PUBLIC_PROJECT_SLUGS)[number];

/**
 * Editorial filter categories derived from the currently published rental copy.
 * These values are navigational only and never replace the visible policy text.
 */
export const PROJECT_RENTAL_CATEGORY_BY_SLUG = {
  "/proyectos/2200-brickell": "90-days",
  "/proyectos/26-and-2nd": "flexible",
  "/proyectos/72-park": "flexible",
  "/proyectos/7200-collins": "flexible",
  "/proyectos/ambar-orlando": "flexible",
  "/proyectos/ave-maria": "traditional",
  "/proyectos/baccarat": "30-days",
  "/proyectos/cassia": "flexible",
  "/proyectos/cipriani": "30-days",
  "/proyectos/domus-brickell-center": "flexible",
  "/proyectos/domus-brickell-park": "flexible",
  "/proyectos/edge-house": "flexible",
  "/proyectos/ella-miami": "flexible",
  "/proyectos/elle-residences": "flexible",
  "/proyectos/faena": null,
  "/proyectos/flow-house": "30-days",
  "/proyectos/frida-kahlo": "flexible",
  "/proyectos/gaia-residences": "flexible",
  "/proyectos/jean-georges-tropic": "flexible",
  "/proyectos/midtown-park": "30-days",
  "/proyectos/millenia-park": "30-days",
  "/proyectos/millux-place-brickell": "flexible",
  "/proyectos/nexo": "flexible",
  "/proyectos/nickelodeon-orlando": "flexible",
  "/proyectos/nomad": "flexible",
  "/proyectos/oasis-hallandale": "traditional",
  "/proyectos/okan-tower": "flexible",
  "/proyectos/one-park-tower": "30-days",
  "/proyectos/palma-miami-beach": "flexible",
  "/proyectos/parkside-brickell": "flexible",
  "/proyectos/seven-park": "flexible",
  "/proyectos/the-lauderdale": "30-days",
  "/proyectos/the-rider-wynwood": "flexible",
  "/proyectos/the-standard-brickell": "30-days",
  "/proyectos/the-william": "90-days",
  "/proyectos/viceroy-brickell-residences": "30-days",
} satisfies Record<PublicProjectSlug, ProjectRentalCategory | null>;

export function isPublicProjectSlug(slug: string): slug is PublicProjectSlug {
  return (PUBLIC_PROJECT_SLUGS as readonly string[]).includes(slug);
}

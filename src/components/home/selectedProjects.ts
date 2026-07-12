import type { Locale } from "@/i18n/config";
import { pTheWilliam } from "@/data/projects/the-william";
import { pFridaKahlo } from "@/data/projects/frida-kahlo";
import { pTwentySixAndSecond } from "@/data/projects/twenty-six-and-2nd";
import { pSevenPark } from "@/data/projects/seven-park";
import { pOasis } from "@/data/projects/oasis";
import { pMidtownPark } from "@/data/projects/midtown-park";

const candidates = [
  {
    project: pTheWilliam,
    location: { es: "North Miami Beach", en: "North Miami Beach" },
    imagePosition: "50% 34%",
  },
  {
    project: pFridaKahlo,
    location: { es: "Wynwood, Miami", en: "Wynwood, Miami" },
    imagePosition: "50% 50%",
  },
  {
    project: pTwentySixAndSecond,
    location: { es: "Wynwood, Miami", en: "Wynwood, Miami" },
    imagePosition: "50% 50%",
  },
  {
    project: pSevenPark,
    location: { es: "Hallandale Beach", en: "Hallandale Beach" },
    imagePosition: "50% 50%",
  },
  {
    project: pOasis,
    location: { es: "Hallandale Beach", en: "Hallandale Beach" },
    imagePosition: "50% 50%",
  },
  {
    project: pMidtownPark,
    location: { es: "Miami", en: "Miami" },
    imagePosition: "50% 50%",
  },
] as const;

export function getHomeProjects(locale: Locale) {
  return candidates.map(({ project, location, imagePosition }) => ({
    id: project.id,
    name: project.name,
    slug: project.slug,
    image: project.image,
    location: location[locale],
    imagePosition,
  }));
}

import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeDecisions } from "@/components/home/HomeDecisions";
import { HomeEducation } from "@/components/home/HomeEducation";
import { HomeFaqContact } from "@/components/home/HomeFaqContact";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomeTrust } from "@/components/home/HomeTrust";
import type { Locale } from "@/i18n/config";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "es";

  return (
    <div className="pb-4">
      <HomeHero locale={locale} />
      <HomeTrust locale={locale} />
      <HomeDecisions locale={locale} />
      <HomeProcess locale={locale} />
      <HomeProjects locale={locale} />
      <HomeEducation locale={locale} />
      <HomeAbout locale={locale} />
      <HomeFaqContact locale={locale} />
    </div>
  );
}

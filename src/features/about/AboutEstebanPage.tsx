import { getAboutContent } from "@/content/about";
import type { Locale } from "@/i18n/config";
import { AboutApproach } from "./AboutApproach";
import { AboutFinalCta } from "./AboutFinalCta";
import { AboutHero } from "./AboutHero";
import { AboutJourney } from "./AboutJourney";
import { AboutProcess } from "./AboutProcess";

type AboutEstebanPageProps = {
  locale: Locale;
};

export function AboutEstebanPage({ locale }: AboutEstebanPageProps) {
  const copy = getAboutContent(locale);

  return (
    <>
      <AboutHero locale={locale} copy={copy.hero} />
      <AboutJourney copy={copy.journey} />
      <AboutApproach copy={copy.approach} />
      <AboutProcess copy={copy.process} />
      <AboutFinalCta
        locale={locale}
        copy={copy.finalCta}
        whatsappMessage={copy.hero.whatsappMessage}
      />
    </>
  );
}

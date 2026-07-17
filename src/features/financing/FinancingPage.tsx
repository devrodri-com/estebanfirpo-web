import { getFinancingContent } from "@/content/financing";
import type { Locale } from "@/i18n/config";
import { FinancingCoordination } from "./FinancingCoordination";
import { FinancingFinalCta } from "./FinancingFinalCta";
import { FinancingHero } from "./FinancingHero";
import { FinancingReview } from "./FinancingReview";
import { FinancingVariables } from "./FinancingVariables";

type FinancingPageProps = {
  locale: Locale;
};

export function FinancingPage({ locale }: FinancingPageProps) {
  const copy = getFinancingContent(locale);

  return (
    <article data-financing-page className="text-[#0D1521]">
      <FinancingHero locale={locale} copy={copy.hero} />
      <FinancingVariables copy={copy.variables} />
      <FinancingReview copy={copy.review} />
      <FinancingCoordination copy={copy.coordination} />
      <FinancingFinalCta
        locale={locale}
        copy={copy.finalCta}
        whatsappMessage={copy.hero.whatsappMessage}
      />
    </article>
  );
}

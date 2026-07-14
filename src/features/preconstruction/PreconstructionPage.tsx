import type { Locale } from "@/i18n/config";
import { getPreconstructionContent } from "@/content/preconstruction";
import { PreconstructionHero } from "./PreconstructionHero";
import { PreconstructionBenefits } from "./PreconstructionBenefits";
import { PreconstructionTimeline } from "./PreconstructionTimeline";
import { CapitalPlanExample } from "./CapitalPlanExample";
import { NewProductSection } from "./NewProductSection";
import { PreconstructionComparison } from "./PreconstructionComparison";
import { RemotePurchaseProcess } from "./RemotePurchaseProcess";
import { PreconstructionChecklist } from "./PreconstructionChecklist";
import { PreconstructionBuyerFit } from "./PreconstructionBuyerFit";
import { PreconstructionFaqCta } from "./PreconstructionFaqCta";

type PreconstructionPageProps = {
  locale: Locale;
};

export function PreconstructionPage({ locale }: PreconstructionPageProps) {
  const copy = getPreconstructionContent(locale);

  return (
    <article data-preconstruction-page className="pb-8">
      <PreconstructionHero locale={locale} copy={copy.hero} />
      <PreconstructionBenefits copy={copy.benefits} />
      <PreconstructionTimeline copy={copy.timeline} />
      <CapitalPlanExample copy={copy.capital} />
      <NewProductSection copy={copy.newProduct} />
      <PreconstructionComparison copy={copy.comparison} />
      <RemotePurchaseProcess copy={copy.remote} />
      <PreconstructionChecklist copy={copy.checklist} />
      <PreconstructionBuyerFit copy={copy.fit} />
      <PreconstructionFaqCta locale={locale} copy={copy.faq} />
    </article>
  );
}

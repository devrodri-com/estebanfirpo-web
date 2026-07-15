import type { Locale } from "@/i18n/config";
import type { MiamiContent, MiamiMetricView } from "@/content/miami";
import { MiamiFaqCta } from "./MiamiFaqCta";
import { MiamiGlobalPlatform } from "./MiamiGlobalPlatform";
import { MiamiHero } from "./MiamiHero";
import { MiamiInfrastructure } from "./MiamiInfrastructure";
import { MiamiLifestyle } from "./MiamiLifestyle";
import { MiamiReasons } from "./MiamiReasons";
import { MiamiRemotePurchase } from "./MiamiRemotePurchase";
import { MiamiScale } from "./MiamiScale";
import { MiamiStrategies } from "./MiamiStrategies";

type MiamiInvestmentPageProps = {
  locale: Locale;
  content: MiamiContent;
  metrics: MiamiMetricView[];
};

export function MiamiInvestmentPage({ locale, content, metrics }: MiamiInvestmentPageProps) {
  return (
    <article data-miami-page className="pb-8 text-[#0D1521]">
      <MiamiHero locale={locale} copy={content.hero} />
      <MiamiReasons copy={content.reasons} />
      <MiamiScale copy={content.scale} metrics={metrics} />
      <MiamiGlobalPlatform copy={content.globalPlatform} />
      <MiamiInfrastructure copy={content.infrastructure} />
      <MiamiLifestyle copy={content.lifestyle} />
      <MiamiStrategies locale={locale} copy={content.strategies} />
      <MiamiRemotePurchase copy={content.remote} />
      <MiamiFaqCta locale={locale} copy={content.faq} />
    </article>
  );
}

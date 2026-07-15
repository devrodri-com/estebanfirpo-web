import type { Metadata } from "next";
import { getMiamiContent, getMiamiMetrics } from "@/content/miami";
import { MiamiInvestmentPage } from "@/features/miami/MiamiInvestmentPage";
import { createStaticPageMetadata, getLocale } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata(locale, "miami");
}

export default async function MiamiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);

  return (
    <MiamiInvestmentPage
      locale={locale}
      content={getMiamiContent(locale)}
      metrics={getMiamiMetrics(locale)}
    />
  );
}

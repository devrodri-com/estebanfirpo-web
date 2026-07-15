import { notFound } from "next/navigation";
import { ContactPage } from "@/features/contact/ContactPage";
import { isLocale } from "@/i18n/config";

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  return <ContactPage locale={rawLocale} />;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createStaticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata(locale, "contacto");
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}

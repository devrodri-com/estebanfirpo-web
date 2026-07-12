import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { getLocale, SITE_URL } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: { absolute: "Página no encontrada | Page not found | Esteban Firpo" },
  robots: { index: false, follow: false },
};

export default async function GlobalNotFound() {
  const locale = getLocale((await headers()).get("x-next-intl-locale") ?? "es");
  const isEnglish = locale === "en";

  return (
    <html lang={locale}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <main className="mx-auto max-w-6xl px-4 pb-8 pt-0">
          <section className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center">
            <p className="text-sm font-semibold tracking-[0.12em] text-[#0A2540]/60">404</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
              {isEnglish ? "Page not found" : "Página no encontrada"}
            </h1>
            <p className="mt-3 max-w-lg text-[15px] leading-7 text-[#0D1521]/75">
              {isEnglish
                ? "The page you requested does not exist or is no longer available."
                : "La página que buscás no existe o ya no está disponible."}
            </p>
            <Link
              href={`/${locale}`}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#0A2540] px-5 text-sm font-medium text-white hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540]"
            >
              {isEnglish ? "Back to home" : "Volver al inicio"}
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}

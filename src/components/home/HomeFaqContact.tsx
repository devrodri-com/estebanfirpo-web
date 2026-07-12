import Link from "next/link";
import { CalendarDays, ChevronDown, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";
import { CALENDAR_URL, createWhatsAppUrl } from "@/lib/site";

type HomeFaqContactProps = {
  locale: Locale;
};

export function HomeFaqContact({ locale }: HomeFaqContactProps) {
  const copy = getHomeContent(locale).contact;

  return (
    <section aria-labelledby="home-contact-title" className="py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
            {copy.eyebrow}
          </p>
          <h2
            id="home-contact-title"
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>

          <div className="mt-8 divide-y divide-[#0A2540]/10 border-y border-[#0A2540]/10">
            {copy.faqs.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-semibold text-[#0A2540] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540] [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 transition group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-[#0D1521]/68">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[#0A2540] p-6 text-white shadow-[0_18px_55px_rgba(10,37,64,0.14)] sm:p-8 lg:self-start">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Esteban Firpo · Miami Life Realty
          </p>
          <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
            {locale === "en" ? "Ready to talk through your goals?" : "¿Listo para conversar sobre tu objetivo?"}
          </h3>
          <p className="mt-4 text-sm leading-6 text-white/70">{copy.responseNote}</p>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={createWhatsAppUrl(copy.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-[#0A2540] transition hover:-translate-y-0.5 hover:bg-[#F6F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37] motion-reduce:transform-none"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.primaryCta}
            </a>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {copy.secondaryCta}
            </a>
          </div>
          <Link
            href={`/${locale}/contacto`}
            className="mt-5 inline-flex rounded-sm text-sm text-white/72 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
          >
            {copy.formCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

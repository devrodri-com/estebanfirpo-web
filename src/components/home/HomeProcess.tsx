import { MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";
import { createWhatsAppUrl } from "@/lib/site";

type HomeProcessProps = {
  locale: Locale;
};

export function HomeProcess({ locale }: HomeProcessProps) {
  const content = getHomeContent(locale);
  const copy = content.process;

  return (
    <section
      aria-labelledby="home-process-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0A2540] text-white"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              {copy.eyebrow}
            </p>
            <h2
              id="home-process-title"
              className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl"
            >
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">{copy.copy}</p>
            <a
              href={createWhatsAppUrl(content.hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.cta}
            </a>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 sm:grid-cols-2">
            {copy.items.map((item, index) => (
              <li key={item.title} className="bg-[#0B1F3A] p-6 sm:p-7">
                <span className="text-xs font-semibold tracking-[0.18em] text-[#D4AF37]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

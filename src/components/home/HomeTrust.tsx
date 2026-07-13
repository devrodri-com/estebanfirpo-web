import Image from "next/image";
import { Building2, Globe2, MapPinned, UserRound } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";

type HomeTrustProps = {
  locale: Locale;
};

const trustIcons = [UserRound, Building2, MapPinned, Globe2] as const;

export function HomeTrust({ locale }: HomeTrustProps) {
  const copy = getHomeContent(locale).trust;

  return (
    <section
      aria-labelledby="home-trust-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#0A2540]/10 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex shrink-0 items-center gap-4 lg:w-56">
            <div className="rounded-lg border border-[#0A2540]/10 bg-white px-3 py-2">
              <Image
                src="/images/miamiliferealty_logo.png"
                alt="Miami Life Realty"
                width={160}
                height={40}
                sizes="140px"
                className="h-7 w-auto object-contain"
              />
            </div>
            <h2 id="home-trust-title" className="sr-only">
              {copy.label}
            </h2>
          </div>
          <ul className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.items.map((item, index) => {
              const Icon = trustIcons[index];
              return (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6F5F0] text-[#0A2540]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0A2540]">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#0D1521]/65">{item.copy}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

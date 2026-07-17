import {
  BriefcaseBusiness,
  Building2,
  UserRound,
  WalletCards,
} from "lucide-react";
import type { FinancingContent } from "@/content/financing";
import { eyebrowClass, sectionTitleClass } from "./financing-styles";

const reviewIcons = [
  UserRound,
  BriefcaseBusiness,
  WalletCards,
  Building2,
] as const;

type FinancingReviewProps = {
  copy: FinancingContent["review"];
};

export function FinancingReview({ copy }: FinancingReviewProps) {
  return (
    <section
      data-financing-block="review"
      aria-labelledby="financing-review-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[#0A2540]/10 bg-[#F3F1EA]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="financing-review-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-6 text-base leading-7 text-[#0D1521]/72 sm:text-lg sm:leading-8">
            {copy.copy}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A2540]/12 bg-white shadow-[0_18px_55px_rgba(10,37,64,0.08)]">
          <ul className="divide-y divide-[#0A2540]/10">
            {copy.items.map((item, index) => {
              const Icon = reviewIcons[index];
              return (
                <li
                  key={item.title}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 px-5 py-6 sm:px-7 md:grid-cols-[2.75rem_minmax(12rem,0.55fr)_1fr] md:items-center md:gap-6 md:py-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F1EA] text-[#755B14]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold leading-6 text-[#0A2540] sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="col-start-2 text-sm leading-6 text-[#0D1521]/68 md:col-start-3 md:text-base md:leading-7">
                    {item.copy}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="border-t border-[#0A2540]/10 bg-[#FBFAF7] px-5 py-5 text-sm leading-6 text-[#0A2540]/70 sm:px-7">
            {copy.note}
          </p>
        </div>
      </div>
    </section>
  );
}

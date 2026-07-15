import type { AboutContent } from "@/content/about";
import { lightEyebrowClass } from "./about-styles";

type AboutJourneyProps = {
  copy: AboutContent["journey"];
};

export function AboutJourney({ copy }: AboutJourneyProps) {
  return (
    <section
      data-about-block="journey"
      aria-labelledby="about-journey-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#0A2540]/8 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div className="flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0A2540] p-7 text-white shadow-[0_22px_65px_rgba(10,37,64,0.14)] sm:p-10 lg:min-h-[560px]">
            <div>
              <p className={lightEyebrowClass}>{copy.eyebrow}</p>
              <h2
                id="about-journey-title"
                className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl"
              >
                {copy.title}
              </h2>
            </div>
            <div className="mt-14 border-t border-[#D4AF37]/45 pt-8">
              <p className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                {copy.featured}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
                {copy.support}
              </p>
            </div>
          </div>
          <div className="lg:py-3">
            <div className="space-y-5 text-base leading-7 text-[#0D1521]/72 sm:text-lg sm:leading-8">
              <p>{copy.copy}</p>
              <p>{copy.secondaryCopy}</p>
            </div>
            <ol className="mt-10 border-b border-[#0A2540]/14">
              {copy.chapters.map((chapter, index) => (
                <li
                  key={chapter.title}
                  className="grid gap-3 border-t border-[#0A2540]/14 py-5 sm:grid-cols-[3.25rem_1fr] sm:gap-5 sm:py-6"
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-[#755B14]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#0A2540]">
                      {chapter.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#0D1521]/65">
                      {chapter.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

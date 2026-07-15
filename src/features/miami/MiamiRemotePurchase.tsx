import Image from "next/image";
import { Building2, Landmark, Scale, UserRound, WalletCards } from "lucide-react";
import type { MiamiContent } from "@/content/miami";
import { eyebrowClass, sectionTitleClass } from "./miami-styles";

const roleIcons = [UserRound, Building2, Scale, Landmark, WalletCards] as const;

type MiamiRemotePurchaseProps = {
  copy: MiamiContent["remote"];
};

export function MiamiRemotePurchase({ copy }: MiamiRemotePurchaseProps) {
  const externalRoles = copy.roles.filter((_, index) => index !== 1);

  return (
    <section
      data-miami-block="remote"
      aria-labelledby="miami-remote-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[#0A2540]/8 bg-[#F6F5F0]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
          <div>
            <p className={eyebrowClass}>{copy.eyebrow}</p>
            <h2 id="miami-remote-title" className={sectionTitleClass}>
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#0D1521]/72">{copy.copy}</p>
            <p className="mt-6 border-l-2 border-[#D4AF37] pl-4 text-sm leading-6 text-[#0D1521]/66">
              {copy.note}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-white p-6 shadow-[0_18px_55px_rgba(10,37,64,0.08)] sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <Image
                src="/images/Esteban.jpg"
                alt="Esteban Firpo"
                width={96}
                height={96}
                sizes="72px"
                className="h-[72px] w-[72px] rounded-full object-cover ring-4 ring-[#F6F5F0]"
              />
              <p className="mt-4 text-lg font-semibold text-[#0A2540]">{copy.centerTitle}</p>
              <span className="mt-5 h-8 w-px bg-gradient-to-b from-[#D4AF37] to-[#0A2540]/15" aria-hidden="true" />
            </div>

            <div className="relative">
              <span className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-[#0A2540]/12 lg:block" aria-hidden="true" />
              <ul className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {externalRoles.map((role, index) => {
                  const Icon = roleIcons[index];
                  return (
                    <li key={role} className="relative flex min-h-24 flex-col items-center justify-center rounded-xl border border-[#0A2540]/10 bg-[#FBFAF7] px-3 py-4 text-center">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A2540] text-white">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="mt-2 text-xs font-semibold leading-5 text-[#0A2540]">{role}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

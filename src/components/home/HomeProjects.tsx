import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";
import { createWhatsAppUrl } from "@/lib/site";
import { getHomeProjects } from "./selectedProjects";

type HomeProjectsProps = {
  locale: Locale;
};

export function HomeProjects({ locale }: HomeProjectsProps) {
  const copy = getHomeContent(locale).projects;
  const projects = getHomeProjects(locale);

  return (
    <section
      aria-labelledby="home-projects-title"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
            {copy.eyebrow}
          </p>
          <h2
            id="home-projects-title"
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-[#FBFAF7] shadow-[0_8px_30px_rgba(10,37,64,0.05)]"
            >
              <Link
                href={`/${locale}${project.slug}`}
                aria-hidden="true"
                tabIndex={-1}
                className="block focus-visible:outline-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E5DE]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.025] group-focus-within:scale-[1.025] motion-reduce:transform-none"
                    style={{ objectPosition: project.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/25 via-transparent to-transparent" />
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#0A2540]/65">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.location}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#0A2540]">
                  <Link
                    href={`/${locale}${project.slug}`}
                    className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-3 text-xs leading-5 text-[#0D1521]/60">
                  {locale === "en"
                    ? "Information and availability subject to reconfirmation."
                    : "Información y disponibilidad sujetas a reconfirmación."}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#0A2540]/10 pt-4">
                  <Link
                    href={`/${locale}${project.slug}`}
                    className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#0A2540] underline decoration-[#D4AF37]/55 decoration-2 underline-offset-4 hover:decoration-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
                  >
                    {copy.detailCta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={createWhatsAppUrl(copy.whatsappMessage(project.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${copy.whatsappCta}: ${project.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0A2540]/18 text-[#0A2540] transition hover:border-[#0A2540]/40 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-5 border-t border-[#0A2540]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-xs leading-5 text-[#0D1521]/60">{copy.disclosure}</p>
          <Link
            href={`/${locale}/proyectos`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-[#0A2540]/25 px-4 text-sm font-semibold text-[#0A2540] transition hover:border-[#0A2540]/50 hover:bg-[#F6F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
          >
            {copy.allCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

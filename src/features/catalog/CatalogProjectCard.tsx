import Image from "next/image";
import Link from "next/link";
import { getCatalogCopy } from "./catalog-copy";
import type { ProjectCatalogCardViewModel } from "./project-catalog-types";

interface CatalogProjectCardProps {
  project: ProjectCatalogCardViewModel;
  prioritizeImage?: boolean;
}

export function CatalogProjectCard({
  project,
  prioritizeImage = false,
}: CatalogProjectCardProps) {
  const copy = getCatalogCopy(project.locale);
  const numberLocale = project.locale === "en" ? "en-US" : "es-ES";
  const formatPrice = (value: number) =>
    new Intl.NumberFormat(numberLocale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  const href = `/${project.locale}${project.slug}`;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[14px] bg-[#0A2540] text-white ring-1 ring-white/10 transition hover:-translate-y-[1px] hover:shadow-sm">
      <Link
        href={href}
        className="relative block aspect-[3/2] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#D4AF37]"
        aria-label={`${copy.viewDetails}: ${project.name}`}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          sizes="(min-width: 1152px) 358px, (min-width: 1024px) calc(33.333vw - 1.667rem), (min-width: 768px) calc(50vw - 1.75rem), calc(100vw - 2rem)"
          priority={prioritizeImage}
          fetchPriority={prioritizeImage ? "high" : undefined}
          loading={prioritizeImage ? "eager" : "lazy"}
          decoding="async"
        />
        {project.delivery ? (
          <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] rounded-full bg-white/85 px-2 py-1 text-[11px] leading-tight text-[#0A2540]">
            {project.delivery}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-white md:text-[16px]">
          <Link
            href={href}
            className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            {project.name}
          </Link>
        </h2>

        <p className="mt-1.5 text-[12px] leading-relaxed text-white/72">
          <span>{project.location}</span>
          {project.rentalPolicy ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{project.rentalPolicy}</span>
            </>
          ) : null}
        </p>

        <p className="mt-2 text-[14px] font-semibold text-white">
          {typeof project.priceFromUsd === "number"
            ? `${copy.from} ${formatPrice(project.priceFromUsd)}`
            : copy.inquire}
          {typeof project.pricePerSfApprox === "number" ? (
            <span className="ml-1 text-[12px] font-normal text-white/70">
              {` · ~$${project.pricePerSfApprox}/sf`}
            </span>
          ) : null}
        </p>

        {project.highlights.length ? (
          <ul className="mt-3 flex flex-col items-start gap-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="max-w-full break-words rounded-full bg-white px-2 py-1.5 text-[11px] leading-snug text-[#0A2540] ring-1 ring-[#0A2540]/15"
              >
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-4">
          <Link
            href={href}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-white/25 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            {copy.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}

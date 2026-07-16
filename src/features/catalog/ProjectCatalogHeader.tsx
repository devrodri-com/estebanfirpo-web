import type { ReactNode } from "react";

interface ProjectCatalogHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  mobileAction?: ReactNode;
}

export function ProjectCatalogHeader({
  eyebrow,
  title,
  description,
  mobileAction,
}: ProjectCatalogHeaderProps) {
  return (
    <div>
      <header className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6917]">
          {eyebrow}
        </p>
        <h1
          id="catalog-title"
          className="mt-4 text-balance text-[2.7rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#0A2540] sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#0D1521]/70 sm:text-lg sm:leading-8">
          {description}
        </p>
      </header>

      <div className="mt-6 flex min-h-11 justify-end sm:hidden">
        {mobileAction}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { preserveCatalogQueryParams } from "./catalog-query";
import type { CatalogLocale } from "./project-catalog-types";

interface CatalogAwareLanguageLinkProps {
  switchTo: CatalogLocale;
  ariaLabel: string;
  className: string;
  children: ReactNode;
  onNavigate?: () => void;
}

export function CatalogAwareLanguageLink({
  switchTo,
  ariaLabel,
  className,
  children,
  onNavigate,
}: CatalogAwareLanguageLinkProps) {
  const pathname = usePathname() || "/es";
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const [catalogQuery, setCatalogQuery] = useState("");
  const localizedPath = `/${switchTo}${pathname.replace(/^\/(es|en)/, "")}`;

  useEffect(() => {
    setCatalogQuery(
      preserveCatalogQueryParams(pathname, new URLSearchParams(queryKey)),
    );
  }, [pathname, queryKey]);

  const href = catalogQuery ? `${localizedPath}?${catalogQuery}` : localizedPath;

  return (
    <Link
      href={href}
      title={switchTo.toUpperCase()}
      aria-label={ariaLabel}
      className={className}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

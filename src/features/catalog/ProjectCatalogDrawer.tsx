"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getCatalogCopy } from "./catalog-copy";
import {
  ProjectCatalogFilters,
  type ProjectCatalogFiltersProps,
} from "./ProjectCatalogFilters";

interface ProjectCatalogDrawerProps extends ProjectCatalogFiltersProps {
  resultCount: number;
  activeFilterCount: number;
}

export function ProjectCatalogDrawer({
  resultCount,
  activeFilterCount,
  ...filterProps
}: ProjectCatalogDrawerProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copy = getCatalogCopy(filterProps.locale);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 640px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3 text-sm font-medium text-[#0A2540] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] sm:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          {copy.filters}
          {activeFilterCount ? ` (${activeFilterCount})` : ""}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/45 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            closeButtonRef.current?.focus();
          }}
          className="fixed inset-y-0 right-0 z-[71] flex h-dvh w-[90%] max-w-sm flex-col border-l border-black/10 bg-[#F7F5EF] shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
        >
          <header className="flex min-h-16 items-center justify-between gap-3 border-b border-black/10 px-4">
            <Dialog.Title className="text-lg font-semibold text-[#0A2540]">
              {copy.filters}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={copy.closeFilters}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 text-[#0A2540] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </header>

          <Dialog.Description className="sr-only">
            {copy.pricesHelp}
          </Dialog.Description>

          <div className="flex-1 overflow-y-auto overscroll-contain p-4">
            <ProjectCatalogFilters {...filterProps} />
          </div>

          <footer className="border-t border-black/10 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#0A2540] px-4 text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                {copy.viewResults(resultCount)}
              </button>
            </Dialog.Close>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

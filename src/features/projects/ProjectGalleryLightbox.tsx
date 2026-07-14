"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";

type GalleryImage = { src: string; alt?: string };

const labels = {
  es: {
    open: "Abrir imagen",
    image: "Imagen",
    of: "de",
    dialog: "Galería de imágenes",
    previous: "Imagen anterior",
    next: "Imagen siguiente",
    close: "Cerrar galería",
  },
  en: {
    open: "Open image",
    image: "Image",
    of: "of",
    dialog: "Image gallery",
    previous: "Previous image",
    next: "Next image",
    close: "Close gallery",
  },
} as const;

export default function ProjectGalleryLightbox({
  images,
  name,
  locale,
  emptyLabel,
}: {
  images: readonly GalleryImage[];
  name: string;
  locale: Locale;
  emptyLabel: string;
}) {
  const copy = labels[locale];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const returnFocusIndexRef = useRef(0);
  const galleryId = useId();
  const titleId = useId();

  const previous = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => {
      const originalTrigger = returnFocusRef.current;
      if (originalTrigger?.getClientRects().length) {
        originalTrigger.focus();
        return;
      }

      const matchingTriggers = document.querySelectorAll<HTMLButtonElement>(
        `[data-gallery-id="${galleryId}"][data-gallery-index="${returnFocusIndexRef.current}"]`,
      );
      Array.from(matchingTriggers).find((trigger) => trigger.getClientRects().length)?.focus();
    }, 0);
  }, [galleryId]);

  const openAt = useCallback((nextIndex: number, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    returnFocusIndexRef.current = nextIndex;
    setIndex(nextIndex);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, next, open, previous]);

  if (images.length === 0) {
    return <p className="mt-5 text-sm leading-6 text-white/75">{emptyLabel}</p>;
  }

  return (
    <>
      <div className="mt-5 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, imageIndex) => (
          <button
            key={`${image.src}-${imageIndex}`}
            type="button"
            data-gallery-id={galleryId}
            data-gallery-index={imageIndex}
            onClick={(event) => openAt(imageIndex, event.currentTarget)}
            className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/15 transition hover:ring-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
            aria-label={`${copy.open} ${imageIndex + 1} ${copy.of} ${images.length}`}
          >
            <Image
              src={image.src}
              alt={image.alt ?? `${name} — ${copy.image.toLowerCase()} ${imageIndex + 1}`}
              fill
              sizes="(min-width: 1024px) 240px, 50vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="-mx-4 mt-5 overflow-x-auto px-4 sm:hidden">
        <ul className="flex snap-x snap-mandatory gap-3" role="list">
          {images.map((image, imageIndex) => (
            <li key={`mobile-${image.src}-${imageIndex}`} className="w-[82vw] shrink-0 snap-start">
              <button
                type="button"
                data-gallery-id={galleryId}
                data-gallery-index={imageIndex}
                onClick={(event) => openAt(imageIndex, event.currentTarget)}
                className="relative block h-52 w-full overflow-hidden rounded-xl ring-1 ring-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
                aria-label={`${copy.open} ${imageIndex + 1} ${copy.of} ${images.length}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt ?? `${name} — ${copy.image.toLowerCase()} ${imageIndex + 1}`}
                  fill
                  sizes="82vw"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[94dvh] w-full max-w-6xl flex-col items-center rounded-xl bg-[#071a2d] p-3 shadow-2xl sm:p-5"
          >
            <h2 id={titleId} className="sr-only">
              {copy.dialog}: {name}
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0A2540] text-xl text-white ring-1 ring-white/25 hover:bg-[#12385c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              aria-label={copy.close}
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="relative h-[70dvh] w-full">
              <Image
                src={images[index].src}
                alt={images[index].alt ?? `${name} — ${copy.image.toLowerCase()} ${index + 1}`}
                fill
                sizes="94vw"
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 ? (
              <div className="mt-3 flex w-full items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={previous}
                  aria-label={copy.previous}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/25 px-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37] sm:px-4"
                >
                  <span aria-hidden="true">←</span>
                  <span className="ml-2 hidden sm:inline">{copy.previous}</span>
                </button>
                <p className="text-sm text-white/75" aria-live="polite">
                  {index + 1} {copy.of} {images.length}
                </p>
                <button
                  type="button"
                  onClick={next}
                  aria-label={copy.next}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/25 px-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37] sm:px-4"
                >
                  <span className="mr-2 hidden sm:inline">{copy.next}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

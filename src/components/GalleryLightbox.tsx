// src/components/GalleryLightbox.tsx

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Img = { src: string; alt?: string };

type GalleryLightboxProps = {
  images: Img[];
  name: string;
  locale?: "es" | "en";
};

export default function GalleryLightbox({
  images,
  name,
  locale = "en",
}: GalleryLightboxProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openAt = useCallback((i: number) => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setIdx(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  // Close on ESC, navigate with arrows
  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowLeft") return prev();
      if (e.key === "ArrowRight") return next();
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const displayImages = images.slice(0, 12);
  const labels = locale === "es"
    ? {
        open: (index: number, total: number) => `Abrir imagen ${index} de ${total}`,
        image: (index: number, total: number) => `Imagen ${index} de ${total}`,
        alt: (index: number) => `${name}, imagen ${index}`,
        previous: "Imagen anterior",
        next: "Imagen siguiente",
        close: "Cerrar galería",
      }
    : {
        open: (index: number, total: number) => `Open image ${index} of ${total}`,
        image: (index: number, total: number) => `Image ${index} of ${total}`,
        alt: (index: number) => `${name}, image ${index}`,
        previous: "Previous image",
        next: "Next image",
        close: "Close gallery",
      };

  return (
    <>
      {/* Desktop/tablet: grid */}
      <div className="mt-3 hidden sm:grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {displayImages.map((g, i) => (
          <button
            key={`${g.src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 [@media(hover:hover)]:hover:ring-white/30 transition"
            aria-label={labels.open(i + 1, images.length)}
          >
            <Image
              src={g.src}
              alt={g.alt ?? labels.alt(i + 1)}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 320px, 50vw"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {/* Mobile: horizontal carousel */}
      <div className="sm:hidden mt-3 -mx-4 px-4 overflow-x-auto">
        <ul className="flex gap-3 snap-x snap-mandatory" role="list">
          {displayImages.map((g, i) => (
            <li key={`mimg-${g.src}-${i}`} className="snap-start shrink-0 first:pl-0 last:pr-0">
              <button
                type="button"
                onClick={() => openAt(i)}
                className="relative h-48 w-[85vw] overflow-hidden rounded-xl ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                aria-label={labels.open(i + 1, images.length)}
              >
                <Image
                  src={g.src}
                  alt={g.alt ?? labels.alt(i + 1)}
                  fill
                  sizes="85vw"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80"
          aria-modal="true"
          role="dialog"
          aria-label={labels.image(idx + 1, images.length)}
          tabIndex={-1}
          onClick={close}
        >
          <div
            className="relative flex max-h-[90%] max-w-[90%] flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative inline-block max-h-[90vh] max-w-[90vw]">
              <Image
                src={images[idx].src}
                alt={images[idx].alt ?? labels.alt(idx + 1)}
                width={1600}
                height={1000}
                className="h-auto w-auto max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                priority
              />

              {/* Controls */}
              {images.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="h-9 w-9 rounded-md bg-[#0A2540]/85 text-white hover:bg-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                    aria-label={labels.previous}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="h-9 w-9 rounded-md bg-[#0A2540]/85 text-white hover:bg-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                    aria-label={labels.next}
                  >
                    ›
                  </button>
                </div>
              )}

              <button
                ref={closeButtonRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-[#0A2540]/90 text-white hover:bg-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                aria-label={labels.close}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Indicator */}
          <div
            className="pb-4 pt-2"
            onClick={(e) => e.stopPropagation()}
            aria-hidden
          >
            <span className="rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              {idx + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

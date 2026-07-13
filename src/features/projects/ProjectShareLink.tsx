"use client";

import type { MouseEvent } from "react";

export default function ProjectShareLink({
  canonicalUrl,
  projectName,
  shareText,
  label,
  className,
}: {
  canonicalUrl: string;
  projectName: string;
  shareText: string;
  label: string;
  className: string;
}) {
  const fallbackUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText} ${canonicalUrl}`,
  )}`;

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") return;

    event.preventDefault();

    try {
      await navigator.share({
        title: projectName,
        text: shareText,
        url: canonicalUrl,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      window.location.assign(fallbackUrl);
    }
  }

  return (
    <a
      href={fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={`${label}: ${projectName}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

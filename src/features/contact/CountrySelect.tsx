"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Country } from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";
import type { ContactContent } from "@/content/contact";

interface CountryOption {
  value: Country | undefined;
  label: string;
}

interface CountryLabel {
  [key: string]: string;
}

interface CustomCountrySelectProps {
  value?: Country;
  onChange: (country: Country | undefined) => void;
  options: CountryOption[];
  labels?: CountryLabel;
  countries?: readonly Country[];
  copy: ContactContent["countrySelector"];
  className?: string;
  disabled?: boolean;
}

export function CountrySelect({
  value,
  onChange,
  options,
  labels,
  copy,
  ...props
}: CustomCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Map<string | number, HTMLButtonElement>>(new Map());
  const instanceId = useId().replaceAll(":", "");
  const listboxId = `country-listbox-${instanceId}`;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const filteredOptions = useMemo(() => {
    const countryOptions = options.filter((option) => option.value !== undefined);
    if (!search.trim()) return countryOptions;

    const normalizedSearch = search.toLowerCase();
    return countryOptions.filter((option) => {
      const label = option.label.toLowerCase();
      const country = option.value ?? "";
      return label.includes(normalizedSearch) || country.toLowerCase().includes(normalizedSearch);
    });
  }, [options, search]);

  const allOptions = useMemo(
    () => [{ value: undefined, label: copy.international }, ...filteredOptions],
    [copy.international, filteredOptions],
  );

  useEffect(() => {
    if (!open) return;

    if (value !== undefined) {
      const selectedIndex = filteredOptions.findIndex((option) => option.value === value);
      setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex + 1);
    } else {
      setActiveIndex(0);
    }
  }, [filteredOptions, open, value]);

  useEffect(() => {
    if (!open) return;

    setActiveIndex((currentIndex) => {
      if (currentIndex >= allOptions.length) return Math.max(0, allOptions.length - 1);

      if (value !== undefined) {
        const selectedIndex = filteredOptions.findIndex((option) => option.value === value);
        if (selectedIndex !== -1) return selectedIndex + 1;
      }

      return currentIndex;
    });
  }, [allOptions.length, filteredOptions, open, value]);

  useEffect(() => {
    if (!open || activeIndex < 0 || activeIndex >= allOptions.length) return;

    const option = allOptions[activeIndex];
    optionRefs.current.get(option.value ?? "intl")?.scrollIntoView({
      block: "nearest",
      behavior: "auto",
    });
  }, [activeIndex, allOptions, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function closeAndRestoreFocus() {
    setOpen(false);
    setSearch("");
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleSelect(country: Country | undefined) {
    onChange(country);
    closeAndRestoreFocus();
  }

  function handleTriggerClick() {
    if (open) setSearch("");
    setOpen(!open);
  }

  function closeForTab(shiftKey: boolean) {
    setOpen(false);
    setSearch("");
    requestAnimationFrame(() => {
      if (shiftKey) {
        triggerRef.current?.focus();
        return;
      }

      containerRef.current
        ?.closest(".PhoneInput")
        ?.querySelector<HTMLInputElement>(".PhoneInputInput")
        ?.focus();
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, allOptions.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
        break;
      case "Enter": {
        event.preventDefault();
        const option = allOptions[activeIndex];
        if (option) handleSelect(option.value);
        break;
      }
      case "Escape":
        event.preventDefault();
        closeAndRestoreFocus();
        break;
      case "Tab":
        event.preventDefault();
        closeForTab(event.shiftKey);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(allOptions.length - 1);
        break;
    }
  }

  function getOptionId(country: Country | undefined) {
    return `${listboxId}-option-${country ?? "intl"}`;
  }

  const activeOption = allOptions[activeIndex];

  return (
    <div ref={containerRef} className={`relative ${props.className ?? ""}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        disabled={props.disabled}
        className="flex h-12 min-w-[92px] items-center gap-2 rounded-lg border border-[#0A2540]/18 bg-white px-3 text-sm font-medium text-[#0A2540] transition hover:border-[#0A2540]/35 hover:bg-[#F9F8F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={copy.selectCountry}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
      >
        {value ? (
          <>
            <span className="text-xl" aria-hidden="true">{getCountryEmoji(value)}</span>
            <span className="hidden sm:inline">{labels?.[value] ?? value}</span>
            <span className="text-[#0A2540]/58">+{getCountryCallingCode(value)}</span>
          </>
        ) : (
          <>
            <span className="text-xl" aria-hidden="true">🌐</span>
            <span className="hidden sm:inline">{copy.international}</span>
            <span className="text-[#0A2540]/58">+</span>
          </>
        )}
        <svg
          className={`ml-auto h-4 w-4 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 flex max-h-[320px] w-[min(320px,calc(100vw-3rem))] flex-col rounded-xl border border-[#0A2540]/14 bg-white shadow-[0_18px_50px_rgba(10,37,64,0.2)] ring-1 ring-black/5">
          <div className="border-b border-[#0A2540]/10 p-2.5">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={copy.search}
              autoComplete="off"
              role="combobox"
              aria-label={copy.search}
              aria-expanded="true"
              aria-controls={listboxId}
              aria-activedescendant={activeOption ? getOptionId(activeOption.value) : undefined}
              aria-autocomplete="list"
              className="h-11 w-full rounded-lg border border-[#0A2540]/18 bg-white px-3 text-sm text-[#0A2540] outline-none placeholder:text-[#0A2540]/42 focus-visible:border-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/30"
            />
          </div>

          <div id={listboxId} className="flex-1 overflow-y-auto py-1" role="listbox">
            <button
              ref={(element) => {
                if (element) optionRefs.current.set("intl", element);
                else optionRefs.current.delete("intl");
              }}
              type="button"
              id={getOptionId(undefined)}
              onClick={() => handleSelect(undefined)}
              className={`flex min-h-12 w-full items-center gap-3 px-3 py-2 text-left text-sm text-[#0A2540] transition hover:bg-[#0A2540]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D4AF37] ${
                value === undefined ? "font-medium" : ""
              } ${activeIndex === 0 ? "bg-[#D4AF37]/16" : ""}`}
              role="option"
              aria-selected={value === undefined}
              tabIndex={-1}
            >
              <span className="text-xl" aria-hidden="true">🌐</span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{copy.international}</span>
                <span className="block text-xs text-[#0A2540]/58">{copy.manualEntry}</span>
              </span>
            </button>

            {filteredOptions.length > 0 ? <div className="mx-3 my-1 h-px bg-[#0A2540]/8" /> : null}

            {filteredOptions.map((option, index) => {
              const country = option.value;
              if (!country) return null;

              const isSelected = value === country;
              const isActive = index + 1 === activeIndex;

              return (
                <button
                  key={country}
                  ref={(element) => {
                    if (element) optionRefs.current.set(country, element);
                    else optionRefs.current.delete(country);
                  }}
                  type="button"
                  id={getOptionId(country)}
                  onClick={() => handleSelect(country)}
                  className={`flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left text-sm text-[#0A2540] transition hover:bg-[#0A2540]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D4AF37] ${
                    isSelected ? "font-medium" : ""
                  } ${isActive ? "bg-[#D4AF37]/16" : ""}`}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                >
                  <span className="shrink-0 text-xl" aria-hidden="true">{getCountryEmoji(country)}</span>
                  <span className="min-w-0 flex-1 truncate">{option.label || labels?.[country] || country}</span>
                  <span className="shrink-0 text-xs text-[#0A2540]/58">
                    +{getCountryCallingCode(country)}
                  </span>
                </button>
              );
            })}

            {filteredOptions.length === 0 ? (
              <p className="px-3 py-5 text-center text-sm text-[#0A2540]/58">{copy.noResults}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function getCountryEmoji(country: Country): string {
  const codePoints = country
    .toUpperCase()
    .split("")
    .map((character) => 127397 + character.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

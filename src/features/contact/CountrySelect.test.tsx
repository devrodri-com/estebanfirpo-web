// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import type { Country } from "react-phone-number-input";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactContent } from "@/content/contact";
import { CountrySelect } from "./CountrySelect";

const options = [
  { value: undefined, label: "International" },
  { value: "US" as Country, label: "Estados Unidos" },
  { value: "ES" as Country, label: "España" },
  { value: "MX" as Country, label: "México" },
];

const labels = {
  US: "Estados Unidos",
  ES: "España",
  MX: "México",
};

const copy = {
  selectCountry: "Seleccionar país",
  international: "Internacional",
  manualEntry: "Ingreso manual",
  search: "Buscar país...",
  noResults: "No se encontraron países",
} satisfies ContactContent["countrySelector"];

type HarnessProps = {
  initialValue?: Country;
  onChange?: (country: Country | undefined) => void;
};

function ControlledCountrySelect({ initialValue, onChange = () => undefined }: HarnessProps) {
  const [value, setValue] = useState<Country | undefined>(initialValue);

  return (
    <CountrySelect
      value={value}
      onChange={(country) => {
        onChange(country);
        setValue(country);
      }}
      options={options}
      labels={labels}
      copy={copy}
    />
  );
}

let originalScrollIntoView: PropertyDescriptor | undefined;

beforeEach(() => {
  originalScrollIntoView = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "scrollIntoView",
  );
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
});

afterEach(() => {
  cleanup();
  if (originalScrollIntoView) {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", originalScrollIntoView);
  } else {
    delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
  }
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CountrySelect", () => {
  it("renders the selected country and calling code in the initial closed state", () => {
    render(
      <CountrySelect
        value="US"
        onChange={vi.fn()}
        options={options}
        labels={labels}
        copy={copy}
      />,
    );

    const trigger = screen.getByRole("button", { name: copy.selectCountry });
    expect(trigger.textContent).toContain("Estados Unidos");
    expect(trigger.textContent).toContain("+1");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens by click with a focused search, listbox, and International option", async () => {
    const user = userEvent.setup();
    render(<ControlledCountrySelect />);

    await user.click(screen.getByRole("button", { name: copy.selectCountry }));

    const search = screen.getByRole("combobox", { name: copy.search });
    expect(document.activeElement).toBe(search);
    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(screen.getByRole("option", { name: /Internacional.*Ingreso manual/ })).toBeTruthy();
    expect(screen.getByRole("option", { name: /Estados Unidos/ })).toBeTruthy();
  });

  it("opens through the native keyboard action on its trigger", async () => {
    const user = userEvent.setup();
    render(<ControlledCountrySelect />);
    const trigger = screen.getByRole("button", { name: copy.selectCountry });

    trigger.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole("combobox", { name: copy.search }));
  });

  it("filters labels and ISO codes without regard to case", async () => {
    const user = userEvent.setup();
    render(<ControlledCountrySelect />);
    await user.click(screen.getByRole("button", { name: copy.selectCountry }));
    const search = screen.getByRole("combobox", { name: copy.search });

    await user.type(search, "MÉX");
    expect(screen.getByRole("option", { name: /México/ })).toBeTruthy();
    expect(screen.queryByRole("option", { name: /Estados Unidos/ })).toBeNull();

    await user.clear(search);
    await user.type(search, "US");
    expect(screen.getByRole("option", { name: /Estados Unidos/ })).toBeTruthy();
    expect(screen.queryByRole("option", { name: /México/ })).toBeNull();
  });

  it("moves with Arrow keys and selects the active option with Enter", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ControlledCountrySelect onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: copy.selectCountry }));
    const search = screen.getByRole("combobox", { name: copy.search });

    await user.keyboard("{ArrowDown}");
    expect(search.getAttribute("aria-activedescendant")).toMatch(/option-US$/);
    await user.keyboard("{Enter}");

    expect(onChange).toHaveBeenCalledWith("US");
    const trigger = screen.getByRole("button", { name: copy.selectCountry });
    expect(trigger.textContent).toContain("Estados Unidos");
    expect(trigger.textContent).toContain("+1");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("supports End, ArrowUp, and Home while exposing the active option", async () => {
    const user = userEvent.setup();
    render(<ControlledCountrySelect />);
    await user.click(screen.getByRole("button", { name: copy.selectCountry }));
    const search = screen.getByRole("combobox", { name: copy.search });

    await user.keyboard("{End}");
    expect(search.getAttribute("aria-activedescendant")).toMatch(/option-MX$/);
    await user.keyboard("{ArrowUp}");
    expect(search.getAttribute("aria-activedescendant")).toMatch(/option-ES$/);
    await user.keyboard("{Home}");
    expect(search.getAttribute("aria-activedescendant")).toMatch(/option-intl$/);
  });

  it("closes with Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<ControlledCountrySelect />);
    const trigger = screen.getByRole("button", { name: copy.selectCountry });
    await user.click(trigger);

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("moves focus toward the phone input on Tab and back to the trigger on Shift+Tab", async () => {
    const user = userEvent.setup();
    render(
      <div className="PhoneInput">
        <ControlledCountrySelect />
        <input className="PhoneInputInput" aria-label="Teléfono" />
      </div>,
    );
    const trigger = screen.getByRole("button", { name: copy.selectCountry });
    const phone = screen.getByRole("textbox", { name: "Teléfono" });

    await user.click(trigger);
    await user.keyboard("{Tab}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(phone);

    await user.click(trigger);
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("selects International as undefined and updates the controlled UI", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ControlledCountrySelect initialValue="US" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: copy.selectCountry }));

    await user.click(screen.getByRole("option", { name: /Internacional.*Ingreso manual/ }));

    expect(onChange).toHaveBeenCalledWith(undefined);
    const trigger = screen.getByRole("button", { name: copy.selectCountry });
    expect(trigger.textContent).toContain("Internacional");
    expect(trigger.textContent).toContain("+");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("reflects a new controlled value without invoking onChange", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <CountrySelect
        value="US"
        onChange={onChange}
        options={options}
        labels={labels}
        copy={copy}
      />,
    );

    rerender(
      <CountrySelect
        value="ES"
        onChange={onChange}
        options={options}
        labels={labels}
        copy={copy}
      />,
    );

    const trigger = screen.getByRole("button", { name: copy.selectCountry });
    expect(trigger.textContent).toContain("España");
    expect(trigger.textContent).toContain("+34");
    expect(onChange).not.toHaveBeenCalled();
  });
});

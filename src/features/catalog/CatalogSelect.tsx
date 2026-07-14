"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useId } from "react";

export interface CatalogSelectOption<Value extends string> {
  value: Value;
  label: string;
  count?: number;
  countLabel?: string;
}

interface CatalogSelectProps<Value extends string> {
  label: string;
  value: Value;
  options: readonly CatalogSelectOption<Value>[];
  onValueChange: (value: Value) => void;
}

export function CatalogSelect<Value extends string>({
  label,
  value,
  options,
  onValueChange,
}: CatalogSelectProps<Value>) {
  const labelId = useId();
  const valueId = `${labelId}-value`;

  return (
    <div className="block text-[12px] font-medium text-white/90">
      <span id={labelId}>{label}</span>
      <Select.Root
        value={value}
        onValueChange={(nextValue) => {
          const selectedOption = options.find(
            (option) => option.value === nextValue,
          );
          if (selectedOption) onValueChange(selectedOption.value);
        }}
      >
        <Select.Trigger
          type="button"
          aria-labelledby={`${labelId} ${valueId}`}
          className="group mt-1 flex min-h-11 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-white/20 bg-white px-3 py-2 text-left text-sm text-[#0A2540] outline-none transition hover:bg-[#FBFAF7] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60"
        >
          <Select.Value
            id={valueId}
            className="min-w-0 flex-1 whitespace-normal leading-snug"
          />
          <Select.Icon asChild>
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform duration-150 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            align="start"
            sideOffset={8}
            collisionPadding={16}
            sticky="partial"
            hideWhenDetached
            className="z-[90] max-h-[min(20rem,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-md border border-[#0A2540]/15 bg-[#FBFAF7] text-[#0A2540] shadow-[0_18px_45px_rgba(10,37,64,0.18)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1"
          >
            <Select.ScrollUpButton className="flex h-7 cursor-default items-center justify-center bg-[#FBFAF7] text-[#0A2540]">
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            </Select.ScrollUpButton>

            <Select.Viewport className="max-h-[min(18rem,var(--radix-select-content-available-height))] p-1">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  textValue={option.label}
                  className="relative flex min-h-11 w-full cursor-default select-none items-center gap-3 rounded-md px-3 py-2 text-sm leading-snug text-[#0A2540] outline-none transition-colors hover:bg-[#F4F1E8] data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[highlighted]:bg-[#F4F1E8] data-[state=checked]:bg-[#F7F2E4] data-[state=checked]:font-medium data-[state=checked]:shadow-[inset_3px_0_0_#D4AF37]"
                >
                  <Select.ItemText>
                    {option.label}
                    {typeof option.count === "number" ? (
                      <span className="sr-only">
                        {`, ${option.countLabel ?? option.count}`}
                      </span>
                    ) : null}
                  </Select.ItemText>
                  {typeof option.count === "number" ? (
                    <span
                      aria-hidden="true"
                      className="ml-auto shrink-0 rounded-full bg-[#0A2540]/[0.07] px-2 py-0.5 text-[11px] font-medium text-[#0A2540]/65"
                    >
                      {option.count}
                    </span>
                  ) : null}
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex h-7 cursor-default items-center justify-center bg-[#FBFAF7] text-[#0A2540]">
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

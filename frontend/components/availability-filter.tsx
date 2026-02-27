"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

interface AvailabilityFilterProps {
  options: string[];
  current?: string;
}

/**
 * Filter chips for availability – light glass style.
 */
export function AvailabilityFilter({ options, current }: AvailabilityFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (options.length === 0) return null;

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (current === value) {
      params.delete("availability");
    } else {
      params.set("availability", value);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-400">Filter:</span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleClick(opt)}
          disabled={isPending}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            current === opt
              ? "bg-gray-900 text-white"
              : "glass text-gray-600 hover:text-gray-900"
          }`}
        >
          {opt}
        </button>
      ))}
      {current && (
        <button
          onClick={() => handleClick(current)}
          disabled={isPending}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          × zurücksetzen
        </button>
      )}
    </div>
  );
}

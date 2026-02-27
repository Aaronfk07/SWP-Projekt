"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

interface SearchBarProps {
  defaultValue?: string;
}

/**
 * Live search input – light glass style.
 */
export function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder="Produkte suchen…"
        className="w-full glass rounded-xl px-4 py-3 pl-11 text-sm text-gray-900
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
      />
      {isPending && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin
          rounded-full border-2 border-gray-200 border-t-gray-600" />
      )}
    </div>
  );
}

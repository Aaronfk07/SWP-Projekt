"use client";

import Link from "next/link";
import { GlassCard } from "@/components/glass-card";

interface ErrorPageProps {
  error: Error & { digest?: string };
}

/**
 * Error boundary for the product detail page.
 * Shown when the API throws (network failure, 500, etc.).
 */
export default function ProductDetailError({ error }: ErrorPageProps) {
  const code = error.message.includes("403")
    ? "ACCESS_DENIED"
    : error.message.includes("404")
    ? "PRODUCT_NOT_FOUND"
    : "LOAD_ERROR";

  const status = error.message.includes("403")
    ? 403
    : error.message.includes("404")
    ? 404
    : 500;

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6">
      <GlassCard className="max-w-md p-12 text-center animate-fade-in-up">
        <p className="text-6xl font-bold text-gray-200">{status}</p>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Produkt konnte nicht geladen werden
        </h1>
        <p className="mt-2 font-mono text-xs tracking-widest text-gray-400 uppercase">
          {code}
        </p>
        <p className="mt-3 text-gray-500">{error.message}</p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200
            bg-white/60 px-6 py-3 text-sm text-gray-600 transition-all
            hover:bg-white hover:text-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Zurück zu den Produkten
        </Link>
      </GlassCard>
    </section>
  );
}

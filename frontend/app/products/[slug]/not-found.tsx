import Link from "next/link";
import { GlassCard } from "@/components/glass-card";

/**
 * Custom 404 page with liquid glass styling.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6">
      <GlassCard className="max-w-md p-12 text-center animate-fade-in-up">
        <p className="text-6xl font-bold text-white/20">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-white/80">
          Produkt nicht gefunden
        </h1>
        <p className="mt-3 text-white/40">
          Das gesuchte Produkt existiert nicht oder wurde entfernt.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10
            bg-white/5 px-6 py-3 text-sm text-white/70 transition-all
            hover:bg-white/10 hover:text-white"
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

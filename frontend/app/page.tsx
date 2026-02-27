import Link from "next/link";
import { GlassCard } from "@/components/glass-card";

/**
 * Landing page – hero section with CTA to browse products.
 * Apple-inspired minimal design with liquid glass aesthetics.
 */
export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
        {/* Decorative glow ring */}
        <div className="mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl animate-glass-glow">
          <svg
            className="h-14 w-14 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Willkommen im
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            SWP Shop
          </span>
        </h1>

        <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          Entdecke unsere Produkte in einer einzigartigen Shopping-Erfahrung.
          Qualität trifft auf elegantes Design.
        </p>

        {/* CTA Button */}
        <div className="mt-12">
          <Link href="/products">
            <GlassCard
              hover
              className="inline-flex items-center gap-3 px-8 py-4 cursor-pointer"
            >
              <span className="text-lg font-medium text-white/90">
                Produkte entdecken
              </span>
              <svg
                className="h-5 w-5 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </GlassCard>
          </Link>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {["Schnelle Lieferung", "Sichere Zahlung", "Top Qualität"].map(
            (feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/40"
              >
                {feature}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

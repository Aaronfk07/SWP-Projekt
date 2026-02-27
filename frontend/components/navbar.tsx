import Link from "next/link";

/**
 * Navbar component with liquid glass styling.
 * Fixed at the top with a frosted glass background.
 */
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className="mx-4 mt-4 rounded-2xl border border-white/10
          bg-white/5 backdrop-blur-2xl shadow-lg shadow-black/10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-white/90
              hover:text-white transition-colors"
          >
            SWP Shop
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Start
            </Link>
            <Link
              href="/products"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Produkte
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

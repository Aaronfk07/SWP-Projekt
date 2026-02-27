import Link from "next/link";

/**
 * Floating glass navbar – Apple-style with specular liquid glass.
 */
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="glass rounded-2xl mx-auto max-w-7xl">
        <div className="flex items-center justify-between px-6 py-3.5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
          >
            GoonerShop
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 px-4 py-2 rounded-full transition-colors hover:bg-black/5"
            >
              Start
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              Produkte
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

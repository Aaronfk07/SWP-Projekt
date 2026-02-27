import { productService } from "@/lib/api/product-service";
import { ProductCard } from "@/components/product-card";
import { GlassCard } from "@/components/glass-card";

/**
 * Product listing page.
 * Server component – fetches products from the backend API.
 */
export default async function ProductsPage() {
  let products;
  let error: string | null = null;

  try {
    products = await productService.getAll();
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Produkte konnten nicht geladen werden.";
    products = [];
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Unsere Produkte
          </span>
        </h1>
        <p className="mt-4 text-lg text-white/40">
          Stöbere durch unser Sortiment und finde genau das Richtige.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <GlassCard className="p-8 text-center">
          <p className="text-red-300">{error}</p>
          <p className="mt-2 text-sm text-white/40">
            Bitte stelle sicher, dass der Backend-Server läuft.
          </p>
        </GlassCard>
      )}

      {/* Empty State */}
      {!error && products.length === 0 && (
        <GlassCard className="p-12 text-center">
          <p className="text-xl text-white/50">Keine Produkte gefunden.</p>
        </GlassCard>
      )}

      {/* Product Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

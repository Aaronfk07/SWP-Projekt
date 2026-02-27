import { notFound } from "next/navigation";
import Link from "next/link";
import { productService } from "@/lib/api/product-service";
import { GlassCard } from "@/components/glass-card";
import { ImageGallery } from "@/components/image-gallery";
import { PriceTag } from "@/components/price-tag";
import { AvailabilityBadge } from "@/components/availability-badge";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Product detail page.
 * Server component – fetches a single product by slug.
 * Returns 404 if the product does not exist.
 */
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 animate-fade-in-up">
        <ol className="flex items-center gap-2 text-sm text-white/40">
          <li>
            <Link href="/" className="hover:text-white/70 transition-colors">
              Start
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/products"
              className="hover:text-white/70 transition-colors"
            >
              Produkte
            </Link>
          </li>
          <li>/</li>
          <li className="text-white/70 truncate max-w-xs">{product.name}</li>
        </ol>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 animate-fade-in-up [animation-delay:0.1s]">
        {/* Left: Image Gallery */}
        <ImageGallery images={product.images} alt={product.name} />

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {product.name}
            </h1>

            {product.availability && (
              <AvailabilityBadge availability={product.availability} />
            )}
          </div>

          {/* Price */}
          <div>
            <PriceTag price={product.price} size="lg" />
          </div>

          {/* Description */}
          {product.description && (
            <GlassCard className="p-6">
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/40">
                Beschreibung
              </h2>
              <div
                className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </GlassCard>
          )}

          {/* Back link */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-white/40
              hover:text-white/70 transition-colors w-fit"
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
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </section>
  );
}

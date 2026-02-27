import Link from "next/link";
import type { Product } from "@/lib/types/product";
import { GlassCard } from "@/components/glass-card";
import { ProductImage } from "@/components/product-image";
import { PriceTag } from "@/components/price-tag";
import { AvailabilityBadge } from "@/components/availability-badge";

interface ProductCardProps {
  product: Product;
}

/**
 * Displays a product as a clickable glass card in the product grid.
 * Links to the product detail page via slug.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <GlassCard hover className="overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <ProductImage
            src={product.images[0] ?? null}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-medium text-white/90 truncate">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <PriceTag price={product.price} />
            {product.availability && (
              <AvailabilityBadge availability={product.availability} />
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

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
 * Product card – Apple Liquid Glass with light design.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <GlassCard hover className="overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-3xl">
          <ProductImage
            src={product.images[0]?.url ?? null}
            alt={product.images[0]?.alt ?? product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {product.name}
          </h3>

          <div className="flex items-center justify-between pt-1">
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

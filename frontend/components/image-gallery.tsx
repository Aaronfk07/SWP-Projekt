"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product-image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

/**
 * Image gallery for the product detail page.
 * Main image with thumbnail selector strip below.
 */
export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <ProductImage
          src={hasImages ? images[selectedIndex] : null}
          alt={alt}
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border
                transition-all duration-200
                ${
                  index === selectedIndex
                    ? "border-white/40 ring-2 ring-white/20"
                    : "border-white/10 hover:border-white/25 opacity-60 hover:opacity-100"
                }
              `}
            >
              <ProductImage src={src} alt={`${alt} – Bild ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

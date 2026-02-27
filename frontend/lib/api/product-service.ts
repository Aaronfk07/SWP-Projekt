import type {
  Product,
  ProductListResponse,
  ProductDetailResponse,
} from "@/lib/types/product";

/**
 * ProductService encapsulates all product-related API calls.
 * Follows an object-oriented pattern with a single responsibility.
 */
class ProductService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  /**
   * Fetches all products from the backend API.
   * Uses Next.js fetch with revalidation for ISR caching.
   */
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${this.baseUrl}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const json: ProductListResponse = await response.json();
    return json.data;
  }

  /**
   * Fetches a single product by its slug.
   * Returns null if the product is not found (404).
   */
  async getBySlug(slug: string): Promise<Product | null> {
    const response = await fetch(
      `${this.baseUrl}/api/products/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const json: ProductDetailResponse = await response.json();
    return json.data;
  }
}

/** Singleton instance configured via environment variable. */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const productService = new ProductService(API_BASE_URL);

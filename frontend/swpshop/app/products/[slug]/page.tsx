import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProductBySlug } from "@/lib/products-service";

type PageProps = {
  params: { slug: string };
};

export default async function ProductDetailPage({ params }: PageProps) {
  const result = await getProductBySlug(params.slug);

  if (!result.ok) {
    if (result.error.type === "not_found") {
      notFound();
    }

    return (
      <div className="page">
        <div className="container">
          <Link href="/" className="back-link">
            Zuruck zur Auswahl
          </Link>
          <div className="error-card">
            {result.error.message || "Produkt konnte nicht geladen werden."}
          </div>
        </div>
      </div>
    );
  }

  const product = result.data;
  const imageUrl = product.images[0] || "/product-fallback.svg";

  return (
    <div className="page">
      <div className="container">
        <Link href="/" className="back-link">
          Zuruck zur Auswahl
        </Link>
        <div className="detail-layout">
          <div className="detail-image">
            <img src={imageUrl} alt={product.name} />
          </div>
          <div className="detail-card">
            <h1 className="brand">{product.name}</h1>
            <p className="lede">
              {product.description ||
                "Derzeit ist keine Beschreibung hinterlegt. Schau spater noch einmal vorbei."}
            </p>
            <div className="product-meta">
              <span className="price">{formatPrice(product.price)}</span>
              {product.availability ? (
                <span className="availability">{product.availability}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

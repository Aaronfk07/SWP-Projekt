import Link from "next/link";
import { formatPrice, getProductList } from "@/lib/products-service";

export default async function Home() {
  const result = await getProductList();

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <p className="cta-pill">Kuratiert fur deinen Alltag</p>
            <h1 className="brand">SWP Shop Auswahl</h1>
            <p className="lede">
              Echte Details, klare Preise, ehrliche Verfugbarkeit. Jedes Produkt
              fuhrt direkt zu einer Detailseite mit Bildern und Beschreibung.
            </p>
          </div>
          <div className="cta-pill">Direkt aus deinem Backend</div>
        </header>

        <main>
          {!result.ok ? (
            <div className="error-card">
              {result.error.message || "Produkte konnten nicht geladen werden."}
            </div>
          ) : result.data.length === 0 ? (
            <div className="error-card">Noch keine Produkte verfugbar.</div>
          ) : (
            <section className="product-grid">
              {result.data.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="product-card"
                >
                  <div className="product-image">
                    <img
                      src={product.images[0] || "/product-fallback.svg"}
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-body">
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-desc">
                      {product.description ||
                        "Keine Beschreibung hinterlegt. Details findest du im Produkt."}
                    </p>
                    <div className="product-meta">
                      <span className="price">
                        {formatPrice(product.price)}
                      </span>
                      {product.availability ? (
                        <span className="availability">
                          {product.availability}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

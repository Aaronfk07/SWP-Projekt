import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="brand">Produkt nicht gefunden</h1>
        <p className="lede">
          Diese Seite existiert nicht oder das Produkt ist nicht mehr verfugbar.
        </p>
        <Link href="/" className="back-link">
          Zuruck zur Produktliste
        </Link>
      </div>
    </div>
  );
}

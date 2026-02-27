interface PriceTagProps {
  price: number | null;
  size?: "sm" | "lg";
}

/**
 * Displays a formatted price tag.
 * Shows "Preis auf Anfrage" when price is null.
 */
export function PriceTag({ price, size = "sm" }: PriceTagProps) {
  if (price === null) {
    return (
      <span className="text-sm text-white/40 italic">Preis auf Anfrage</span>
    );
  }

  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return (
    <span
      className={`font-semibold tracking-tight ${
        size === "lg" ? "text-3xl text-white" : "text-lg text-white/80"
      }`}
    >
      {formatted}
    </span>
  );
}

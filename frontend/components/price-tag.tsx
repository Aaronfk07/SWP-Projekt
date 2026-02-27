interface PriceTagProps {
  price: number | null;
  size?: "sm" | "lg";
}

/**
 * Formatted price – dark text for light glass design.
 */
export function PriceTag({ price, size = "sm" }: PriceTagProps) {
  if (price === null) {
    return <span className="text-sm text-gray-400 italic">Preis auf Anfrage</span>;
  }

  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return (
    <span
      className={`font-semibold tracking-tight ${
        size === "lg" ? "text-3xl text-gray-900" : "text-lg text-gray-800"
      }`}
    >
      {formatted}
    </span>
  );
}

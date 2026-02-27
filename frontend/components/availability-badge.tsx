interface AvailabilityBadgeProps {
  availability: string;
}

/**
 * Displays stock/availability status as a pill badge.
 * Color-coded: green for available, yellow for limited, red/gray for out of stock.
 */
export function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  const lower = availability.toLowerCase();

  let colorClasses: string;

  if (
    lower.includes("verfügbar") ||
    lower.includes("available") ||
    lower.includes("in_stock") ||
    lower.includes("in stock") ||
    lower.includes("auf lager")
  ) {
    colorClasses = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  } else if (
    lower.includes("wenig") ||
    lower.includes("limited") ||
    lower.includes("low")
  ) {
    colorClasses = "bg-amber-500/20 text-amber-300 border-amber-500/30";
  } else {
    colorClasses = "bg-red-500/20 text-red-300 border-red-500/30";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1
        text-xs font-medium ${colorClasses}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {availability}
    </span>
  );
}

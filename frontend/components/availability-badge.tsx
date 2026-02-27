interface AvailabilityBadgeProps {
  availability: string;
}

/**
 * Stock status badge – light colors for glass design.
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
    colorClasses = "bg-emerald-100 text-emerald-700 border-emerald-200";
  } else if (
    lower.includes("wenig") ||
    lower.includes("limited") ||
    lower.includes("low")
  ) {
    colorClasses = "bg-amber-100 text-amber-700 border-amber-200";
  } else {
    colorClasses = "bg-red-100 text-red-700 border-red-200";
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

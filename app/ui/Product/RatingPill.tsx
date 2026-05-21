import { Star } from "lucide-react";

type RatingPillProps = {
  rating?: number | string | null;
  reviewCount?: number | string | null;
  label?: string | null;
  labelBgColor?: string | null;
  labelTextColor?: string | null;
  showLabel?: boolean;
  compact?: boolean;
  className?: string;
};

const toNumber = (value: RatingPillProps["rating"]) => {
  return parseFloat(String(value ?? "").replace(/[^0-9.-]+/g, "")) || 0;
};

export default function RatingPill({
  rating,
  reviewCount,
  label,
  labelBgColor,
  labelTextColor,
  showLabel = false,
  compact = false,
  className = "",
}: RatingPillProps) {
  const ratingValue = toNumber(rating);
  const countValue = Math.round(toNumber(reviewCount));
  const hasRating = ratingValue > 0;
  const hasCount = countValue > 0;
  const hasLabel = showLabel;
  const resolvedLabel = label?.trim() || "Top Rated";
  const resolvedBgColor = labelBgColor || "#ff5f8f";
  const resolvedTextColor = labelTextColor || "#ffffff";

  if (!hasLabel && !hasRating && !hasCount) {
    return null;
  }

  return (
    <div
      className={`inline-flex overflow-hidden bg-white shadow-[0_1px_4px_rgba(15,23,42,0.16)] ${
        hasLabel ? "flex-col rounded-[10px]" : "rounded-[7px] border border-[#dfe5ea]"
      } ${className}`}
      style={hasLabel ? { border: `1px solid ${resolvedBgColor}` } : undefined}
    >
      {hasLabel && (
        <div
          className={`text-center font-semibold leading-none ${
            compact ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-[12px]"
          }`}
          style={{
            backgroundColor: resolvedBgColor,
            color: resolvedTextColor,
          }}
        >
          {resolvedLabel}
        </div>
      )}

      {(hasRating || hasCount) && (
        <div
          className={`flex items-center justify-center gap-1.5 bg-white ${
            compact ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-[12px]"
          } ${hasLabel ? "rounded-b-[9px]" : "rounded-[7px]"}`}
        >
          {hasRating && (
            <span className="flex items-center gap-1 font-semibold leading-none text-[#111827]">
              {ratingValue.toFixed(1)}
              <Star className="h-3 w-3 fill-[#009a73] text-[#009a73]" />
            </span>
          )}
          {hasRating && hasCount && <span className="h-3 w-px bg-[#d9dee4]" />}
          {hasCount && <span className="font-semibold text-[#4b5563]">{countValue}</span>}
        </div>
      )}
    </div>
  );
}

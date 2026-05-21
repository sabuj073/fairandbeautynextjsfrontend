import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type SkinAnalyzerEntryCardProps = {
  compact?: boolean;
  className?: string;
};

export default function SkinAnalyzerEntryCard({
  compact = false,
  className = "",
}: SkinAnalyzerEntryCardProps) {
  return (
    <section className={`w-full ${className}`}>
      <Link
        href="/skin-analyzer"
        className={`group relative block overflow-hidden border border-[#f5d8e7] bg-[#fff7fb] ${
          compact ? "rounded-lg" : "rounded-none md:rounded-lg"
        }`}
      >
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(240,68,125,0.18),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(19,152,4,0.12),transparent_38%)]" />
        <div
          className={`relative flex items-center justify-between gap-4 ${
            compact ? "px-4 py-4" : "px-5 py-5 md:px-8 md:py-7"
          }`}
        >
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#d6336c] shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Skin Analyzer
            </div>
            <h2
              className={`font-semibold leading-tight text-gray-950 ${
                compact ? "text-base" : "text-xl md:text-2xl"
              }`}
            >
              Find your routine in 2 minutes
            </h2>
            <p
              className={`mt-1 max-w-[520px] text-gray-600 ${
                compact ? "text-xs leading-5" : "text-sm leading-6"
              }`}
            >
              Answer a few quick questions and get morning and evening product
              recommendations matched to your skin.
            </p>
          </div>

          <div className="shrink-0">
            <span
              className={`inline-flex items-center justify-center gap-2 bg-[#f0447d] font-semibold text-white shadow-sm transition group-hover:bg-[#dd2f6c] ${
                compact
                  ? "h-10 w-10 rounded-full"
                  : "rounded-sm px-4 py-2 text-sm"
              }`}
            >
              {!compact && <span>Start</span>}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

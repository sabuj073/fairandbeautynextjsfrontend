"use client";

import { useMemo, useState } from "react";
import ProductItem from "@/app/ui/Product/ProductItem";
import type { HomeProductPill } from "./HomeProductPills";

type Props = {
  pills: HomeProductPill[];
};

export default function HomeProductPillsClient({ pills }: Props) {
  const [activePillId, setActivePillId] = useState(pills[0]?.id);
  const activePill = useMemo(
    () => pills.find((pill) => pill.id === activePillId) || pills[0],
    [activePillId, pills]
  );

  if (!activePill) {
    return null;
  }

  return (
    <section className="home-section">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[18px] sm:text-[22px] font-semibold text-neutral-black">
          Glam Under Budget
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 max-w-[760px]">
        {pills.map((pill) => {
          const isActive = pill.id === activePill.id;

          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => setActivePillId(pill.id)}
              className="min-h-[58px] sm:min-h-[66px] rounded-[7px] border-2 px-2 py-2 text-center shadow-[0_2px_6px_rgba(183,106,242,0.22)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c084fc]"
              style={{
                backgroundColor: pill.bg_color || "#FFF2FF",
                borderColor: pill.border_color || "#DDB3FF",
                color: pill.text_color || "#B76AF2",
                boxShadow: isActive
                  ? `0 0 0 2px ${pill.border_color || "#DDB3FF"}, 0 4px 10px rgba(183, 106, 242, 0.32)`
                  : undefined,
              }}
              aria-pressed={isActive}
            >
              <span className="block text-[13px] sm:text-[16px] font-extrabold leading-none">
                {pill.title || "Under"}
              </span>
              <span className="mt-1 block text-[21px] sm:text-[28px] font-black leading-none">
                {pill.highlight || "৳99"}
              </span>
            </button>
          );
        })}
      </div>

      {activePill.products?.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-4">
          {activePill.products.map((product) => (
            <ProductItem key={product.id} {...product} compact />
          ))}
        </div>
      )}
    </section>
  );
}

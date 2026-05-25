"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BASE_URL } from "@/app/config/api";

type Product = {
  id: number;
  name: string;
  slug: string;
  thumbnail_image: string;
  brand?: string;
  discount?: number | string;
  discount_text?: string;
  stroked_price?: string;
  main_price?: string;
};

type Brand = {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  discount?: number | string | null;
  products?: Product[];
  links?: {
    products: string;
  };
};

type Background = {
  color?: string | null;
  image?: string | null;
};

type Props = {
  brands: Brand[];
  style: string;
  backgrounds: Record<string, Background>;
  title?: string | null;
  subtitle?: string | null;
};

const imageSrc = (src?: string | null) => {
  const fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23f8f3eb'/%3E%3Cpath d='M170 390h260L348 282l-58 72-42-48-78 84Z' fill='%23d8c8b6'/%3E%3Ccircle cx='230' cy='222' r='34' fill='%23d8c8b6'/%3E%3C/svg%3E";
  if (!src) return fallback;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return `${BASE_URL}${src}`;
  if (src.startsWith("uploads/")) return `${BASE_URL}/public/${src}`;
  if (src.startsWith("public/") || src.startsWith("storage/")) return `${BASE_URL}/${src}`;
  return `${BASE_URL}/public/${src}`;
};

const backgroundStyle = (background?: Background) => ({
  backgroundColor: background?.color || "#ffffff",
  backgroundImage: background?.image ? `url(${imageSrc(background.image)})` : undefined,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

function BrandTile({ brand, active, onClick }: { brand: Brand; active?: boolean; onClick?: () => void }) {
  const tileImage = brand.logo;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative shrink-0 snap-start rounded-t-[18px] border px-4 pt-3 pb-2 text-center transition-all duration-300 ${
        active
          ? "min-w-[140px] border-[#ddb64f] border-b-[#fff8ee] bg-[#fff8ee] text-slate-950 shadow-[0_18px_36px_-30px_rgba(97,67,47,0.3)]"
          : "min-w-[132px] border-transparent bg-transparent text-slate-700 hover:text-slate-950"
      }`}
    >
      <div className={`mx-auto mb-2 h-20 w-24 overflow-hidden rounded-t-[14px] ${
        active ? "bg-white" : "bg-transparent"
      }`}>
        <img src={imageSrc(tileImage)} alt={brand.name} className="h-full w-full object-contain p-2" />
      </div>
      <p className={`min-h-[22px] truncate text-sm transition ${active ? "font-bold text-slate-950" : "font-medium text-slate-700"}`}>{brand.name}</p>
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const offerText = product.discount_text && product.discount
    ? `Up To ${product.discount}${product.discount_text}`
    : product.discount_text;

  return (
    <Link href={`/product/${product.slug}`} className="group block overflow-hidden rounded-lg border border-[#e3ded6] bg-white shadow-sm transition hover:-translate-y-1">
      <div className="h-[170px] overflow-hidden bg-white p-3 sm:h-[190px] md:h-[210px]">
        <img
          src={imageSrc(product.thumbnail_image)}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = imageSrc(null);
          }}
        />
      </div>
      <div className="px-3 py-3 text-center">
        <p className="line-clamp-2 min-h-[36px] text-[13px] font-semibold leading-[18px] text-slate-950 sm:text-sm">{product.name}</p>
        {product.brand ? <p className="mt-1 line-clamp-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">{product.brand}</p> : null}
        {offerText ? <p className="mt-1 text-xs font-semibold text-slate-800 sm:text-[13px]">{offerText}</p> : null}
      </div>
    </Link>
  );
}

export default function BrandClient({ brands, style, backgrounds, title, subtitle }: Props) {
  if (!brands?.length) return null;

  const bg = backgrounds?.[style];
  const headingTitle = title || 'FRAGRANCE & BEAUTY';
  const headingSubtitle = subtitle || 'The Quiet Statement';
  const heroBrands = brands.slice(0, 4);
  const firstBrandWithProducts = brands.find((brand) => brand.products?.length);
  const initialBrandId = (style === "design_1" ? firstBrandWithProducts?.id : null) ?? heroBrands[0]?.id ?? brands[0].id;
  const [activeBrandId, setActiveBrandId] = useState(initialBrandId);
  const activeBrand = useMemo(
    () => brands.find((brand) => brand.id === activeBrandId) ?? (style === "design_1" ? firstBrandWithProducts : null) ?? brands[0],
    [activeBrandId, brands, firstBrandWithProducts, style]
  );

  if (style === "design_1") {
    const brandTabs = brands.filter((brand) => brand.products?.length).slice(0, 6);
    const visibleTabs = brandTabs.length ? brandTabs : heroBrands;
    const sliderProducts = activeBrand.products ?? [];

    return (
      <section className="overflow-hidden rounded-[34px] px-4 pt-7 pb-6 sm:px-6 sm:pt-8" style={backgroundStyle(bg)}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-normal uppercase tracking-wide text-[#2b211d] sm:text-4xl">{headingTitle}</h2>
            <p className="mt-1 text-xl text-[#4b4540] sm:text-2xl">{headingSubtitle}</p>
          </div>

          <div className="mt-6 border-b border-[#e3c66e]">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {visibleTabs.map((brand) => (
                <div key={brand.id} className="snap-start">
                  <BrandTile
                    brand={brand}
                    active={brand.id === activeBrandId}
                    onClick={() => setActiveBrandId(brand.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="-mx-4 bg-[#fff8ee] px-4 py-5 sm:-mx-6 sm:px-6">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {sliderProducts.length ? (
                sliderProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[190px] max-w-[220px] shrink-0 snap-start sm:min-w-[210px] md:min-w-[230px] lg:min-w-[240px]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="min-w-[72%] shrink-0 rounded-[16px] border border-dashed border-[#d8c8b6] bg-white p-6 text-center text-sm text-slate-600 sm:min-w-[44%] md:min-w-[320px]">
                  No products available for this brand yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (style === "design_2") {
    return (
      <section className="overflow-hidden rounded-[30px] bg-[#7a0f58] px-4 py-8 text-white" style={{ ...backgroundStyle(bg), backgroundColor: bg?.color || "#7a0f58" }}>
        <div className="mx-auto max-w-6xl text-center text-white">
          <p className="text-sm uppercase tracking-[0.28em] opacity-80">{headingSubtitle}</p>
          <h2 className="mt-3 text-3xl font-semibold">{headingTitle}</h2>
        </div>
        <div className="mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="group min-w-[190px] max-w-[190px] snap-start overflow-hidden rounded-[18px] border border-white/20 bg-white text-center shadow-sm transition hover:-translate-y-1 sm:min-w-[230px] sm:max-w-[230px] lg:min-w-[260px] lg:max-w-[260px]"
            >
              <div className="aspect-square w-full overflow-hidden bg-[#f7f7f7] p-4">
                <img src={imageSrc(brand.logo)} alt={brand.name} className="h-full w-full object-contain" />
              </div>
              <div className="px-3 py-3">
                <p className="line-clamp-2 min-h-[40px] text-base font-semibold leading-tight text-slate-900">{brand.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (style === "design_3") {
    return (
      <section className="overflow-hidden rounded-[22px] bg-white px-4 py-8" style={backgroundStyle(bg)}>
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-[#7a2d16]">{headingSubtitle}</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#7a2d16]">{headingTitle}</h2>
        </div>
        <div className="mt-7 grid auto-cols-[170px] grid-flow-col grid-rows-2 gap-4 overflow-x-auto pb-3 sm:auto-cols-[210px] lg:auto-cols-[240px]">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="group snap-start overflow-hidden rounded-[14px] bg-white text-center transition hover:-translate-y-1"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[14px] border border-[#f0d88a] bg-[#f7f7f7] p-3">
                <img src={imageSrc(brand.logo)} alt={brand.name} className="h-full w-full object-contain" />
              </div>
              <div className="px-2 pt-2">
                <p className="line-clamp-1 text-base font-medium leading-tight text-slate-800">{brand.name}</p>
                <span className="text-base font-semibold text-slate-950">Min. {brand.discount ?? 0}% Off</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (style === "design_4") {
    return (
      <section className="overflow-hidden rounded-[30px] px-4 py-8 text-white" style={backgroundStyle(bg)}>
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.28em] text-white/80">{headingSubtitle}</p>
          <h2 className="mt-3 text-3xl font-semibold">{headingTitle}</h2>
          <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {brands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => setActiveBrandId(brand.id)}
                className={`min-w-max snap-start rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  brand.id === activeBrandId
                    ? "border-white bg-white text-slate-950"
                    : "border-white/25 bg-white/10 text-white hover:border-white/50"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
          <div className="mt-8">
            {activeBrand.products?.length ? (
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
                {activeBrand.products.map((product) => (
                  <div key={product.id} className="min-w-[180px] max-w-[180px] snap-start sm:min-w-[220px] sm:max-w-[220px] lg:min-w-[250px] lg:max-w-[250px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/40 bg-white/10 p-8 text-center text-sm text-white/80">
                No products available for this brand yet.
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (style === "design_5") {
    return (
      <section className="overflow-hidden bg-white px-4 py-8" style={backgroundStyle(bg)}>
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-[#254c26]">{headingSubtitle}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-[#254c26]">{headingTitle}</h2>
        </div>
        <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto border-t border-b border-slate-200 py-1">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="group min-w-[165px] max-w-[165px] snap-start overflow-hidden rounded-[12px] border border-slate-200 bg-white text-center transition hover:-translate-y-1 sm:min-w-[210px] sm:max-w-[210px] lg:min-w-[245px] lg:max-w-[245px]"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#f7f7f7] p-4">
                <img src={imageSrc(brand.logo)} alt={brand.name} className="h-full w-full object-contain" />
              </div>
              <div className="border-t border-slate-200 px-3 py-3">
                <p className="line-clamp-1 text-base font-bold uppercase text-slate-950">{brand.name}</p>
                <p className="mt-1 line-clamp-1 text-sm uppercase text-slate-500">Up To {brand.discount ?? 0}% Off</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[30px] bg-white px-4 py-8" style={backgroundStyle(bg)}>
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-600">{headingSubtitle}</p>
        <h2 className="text-2xl font-semibold text-slate-900">{headingTitle}</h2>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brand/${brand.slug}`}
            className="group overflow-hidden rounded-[30px] border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1"
          >
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-[#f7f7f7] p-3">
              <img src={imageSrc(brand.logo)} alt={brand.name} className="h-full w-full object-contain" />
            </div>
            <p className="text-sm font-semibold text-slate-900">{brand.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

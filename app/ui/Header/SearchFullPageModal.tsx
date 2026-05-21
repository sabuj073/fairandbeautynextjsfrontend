"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ArrowLeft, ChevronRight, Loader2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListProductSkeleton } from "../skeletons";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/config/api";

type SearchFullPageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  menuCategories?: any[];
};

type SearchTile = {
  id: string | number;
  name: string;
  slug?: string;
  image?: string | null;
  href: string;
};

type SearchRow = {
  id: string | number;
  title: string;
  items: SearchTile[];
};

type BannerTile = {
  id: string | number;
  image: string;
  url?: string;
};

type BrandTile = {
  id: string | number;
  name: string;
  slug?: string;
  logo?: string | null;
};

type SearchPageData = {
  recentSearches: SearchTile[];
  banners: BannerTile[];
  promoBanners: BannerTile[];
  categoryRows: SearchRow[];
  popularCategories: SearchTile[];
  brands: BrandTile[];
};

export default function SearchFullPageModal({
  isOpen,
  onClose,
  menuCategories = [],
}: SearchFullPageModalProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchProducts, setSearchProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<SearchPageData>({
    recentSearches: [],
    banners: [],
    promoBanners: [],
    categoryRows: [],
    popularCategories: [],
    brands: [],
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showSuggestions = searchInput.trim() !== "";
  const showExploreContent = !showSuggestions;

  const navigateAndClose = (path: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    // Brief loading feedback so transition feels smooth, then navigate and close
    setTimeout(() => {
      router.push(path);
      onClose();
    }, 280);
  };

  useEffect(() => {
    if (!isOpen) return;
    const lang =
      typeof window !== "undefined" ? document.documentElement.lang || "en" : "en";
    fetch(`/api/search/page-data?lang=${encodeURIComponent(lang)}`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(buildSearchPageData(data, menuCategories));
      })
      .catch(() => setPageData(buildSearchPageData({}, menuCategories)));
  }, [isOpen, menuCategories]);

  useEffect(() => {
    if (!isOpen) return;
    if (searchInput.trim() === "") {
      setSuggestions([]);
      setSearchProducts([]);
      return;
    }
    setLoading(true);
    const q = searchInput.trim();
    Promise.all([
      axios.get(`/api/search/suggestions?query_key=${encodeURIComponent(q)}`).then((res) => (Array.isArray(res.data) ? res.data : [])).catch(() => []),
      axios.get(`/api/search?name=${encodeURIComponent(q)}`).then((res) => (Array.isArray(res.data?.data) ? res.data.data : [])).catch(() => []),
    ])
      .then(([sug, products]) => {
        setSuggestions(sug);
        setSearchProducts(products);
      })
      .finally(() => setLoading(false));
  }, [searchInput, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSearchInput("");
      setIsNavigating(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigateAndClose(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSuggestionClick = (query: string) => {
    navigateAndClose(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigateAndClose(path);
  };

  const handleVoiceSearchClick = () => {
    window.alert("Voice search is not available yet.");
  };

  const popularCategoryRows =
    pageData.categoryRows.slice(2, 6).length > 0
      ? pageData.categoryRows.slice(2, 6)
      : [
          {
            id: "popular-categories",
            title: "For All",
            items: pageData.popularCategories.slice(0, 10),
          },
        ].filter((row) => row.items.length > 0);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-white flex flex-col transition-opacity duration-200 ${
        isNavigating ? "opacity-95" : "opacity-100"
      }`}
    >
      {isNavigating && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
          <Loader2 className="w-10 h-10 text-[#139804] animate-spin" />
          <p className="mt-3 text-sm font-medium text-gray-600">Opening...</p>
        </div>
      )}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-3 border-b border-gray-100 bg-white max-w-4xl mx-auto w-full">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <ArrowLeft className="w-5 h-5 text-gray-950" />
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center gap-2 min-w-0"
        >
          <div className="hidden sm:flex h-10 items-center gap-1 rounded-md bg-gray-50 px-3 text-sm font-semibold text-gray-900">
            Fair & Beauty
            <ChevronRight className="h-4 w-4 rotate-90 text-gray-500" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search in Fair And Beauty store"
            className="flex-1 min-w-0 h-10 px-1 border-0 text-[15px] font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleVoiceSearchClick}
            className="p-2 text-gray-700"
            aria-label="Voice search"
          >
            <Mic className="h-5 w-5" />
          </button>
          <Button
            type="submit"
            className="hidden h-10 px-4 rounded-lg text-white text-sm font-semibold shrink-0 sm:inline-flex"
            style={{
              background: "linear-gradient(180deg, #139804 0%, #063B00 100%)",
            }}
          >
            Search
          </Button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto">
        {showSuggestions && (
          <div className="p-4 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 md:w-[280px]">
              <h3 className="text-base font-bold text-gray-900 mb-3">Quick Links</h3>
              {loading ? (
                <ListProductSkeleton />
              ) : suggestions.length > 0 ? (
                <ul className="space-y-2">
                  {suggestions.map((item: any) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(item?.query || item)}
                        className="text-left text-base border-b border-primary pb-1 text-[#139804] hover:underline"
                      >
                        {item?.query || item}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No suggestions.</p>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-3">Products</h3>
              {loading ? (
                <ListProductSkeleton />
              ) : searchProducts.length > 0 ? (
                <ul className="space-y-3">
                  {searchProducts.map((item: any) => (
                    <li key={item.id || item.slug}>
                      <button
                        type="button"
                        className="w-full flex items-center gap-3 text-left p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200"
                        onClick={() => navigateAndClose(`/product/${item.slug}`)}
                      >
                        <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <SearchImage
                            src={item.thumbnail_image || item.image}
                            width={56}
                            height={56}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                          <p className="text-sm text-[#139804] font-semibold">{item.main_price || item.unit_price}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No products found.</p>
              )}
            </div>
          </div>
        )}

        {showExploreContent && (
          <>
            {pageData.recentSearches.length > 0 && (
              <section className="px-5 pt-6 pb-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold uppercase tracking-[0.01em] text-gray-900">
                    Recent Searches
                  </h3>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-1 scrollbar-hide">
                  {pageData.recentSearches.map((item) => (
                    <RoundSearchTile
                      key={item.id}
                      item={item}
                      onClick={(e) => handleCategoryClick(e, item.href)}
                    />
                  ))}
                </div>
              </section>
            )}

            {pageData.promoBanners.length > 0 && (
              <section className="px-4 pb-3">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {pageData.promoBanners.slice(0, 3).map((banner, index) => (
                    <button
                      type="button"
                      key={banner.id}
                      onClick={() => navigateAndClose(banner.url || "/")}
                      className={`relative shrink-0 overflow-hidden border border-gray-100 bg-gray-50 ${
                        index === 0
                          ? "h-[88px] w-[45%]"
                          : "h-[88px] w-[52%]"
                      }`}
                    >
                      <SearchImage
                        src={banner.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {pageData.categoryRows.length > 0 && (
              <section className="bg-[#fff6e8] py-3">
                {pageData.categoryRows.slice(0, 2).map((row) => (
                  <div key={row.id} className="flex min-h-[122px]">
                    <button
                      type="button"
                      onClick={(e) => {
                        const firstHref = row.items[0]?.href || "/search";
                        handleCategoryClick(e, firstHref);
                      }}
                      className="flex w-[88px] shrink-0 flex-col items-center justify-center bg-white/55 text-center"
                    >
                      <span className="max-w-[62px] text-[15px] font-semibold leading-tight text-gray-900">
                        {row.title}
                      </span>
                      <span className="mt-3 grid h-5 w-5 place-items-center rounded-full bg-white text-gray-400 shadow-sm">
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>
                    <div className="flex gap-3 overflow-x-auto px-2 pb-3 scrollbar-hide">
                      {row.items.map((item) => (
                        <SquareSearchTile
                          key={item.id}
                          item={item}
                          onClick={(e) => handleCategoryClick(e, item.href)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {popularCategoryRows.length > 0 && (
              <section className="px-5 py-5">
                <h3 className="mb-4 text-[17px] font-semibold text-gray-900">
                  Popular search categories
                </h3>
                <div className="space-y-5">
                  {popularCategoryRows.map((row) => (
                    <div key={row.id} className="flex min-h-[118px]">
                      <button
                        type="button"
                        onClick={(e) => handleCategoryClick(e, row.items[0]?.href || "/search")}
                        className="mr-3 flex w-[74px] shrink-0 flex-col items-center justify-center bg-gray-50 text-center"
                      >
                        <span className="text-[16px] font-semibold leading-tight text-gray-900">
                          {row.title}
                        </span>
                        <ChevronRight className="mt-4 h-4 w-4 text-gray-400" />
                      </button>
                      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                        {row.items.map((item) => (
                          <SquareSearchTile
                            key={item.id}
                            item={item}
                            onClick={(e) => handleCategoryClick(e, item.href)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {pageData.brands.length > 0 && (
              <section className="px-5 pb-9">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[17px] font-semibold text-gray-900">
                    Popular searched brands
                  </h3>
                  <button
                    type="button"
                    onClick={() => navigateAndClose("/brands")}
                    className="rounded-sm bg-[#f0447d] px-4 py-2 text-[12px] font-semibold text-white shadow-sm"
                  >
                    Explore More
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {pageData.brands.slice(0, 6).map((brand) => (
                    <button
                      type="button"
                      key={brand.id}
                      onClick={() => navigateAndClose(`/brand/${brand.slug}`)}
                      className="grid h-[104px] place-items-center border border-gray-100 bg-white p-3 shadow-sm"
                    >
                      {brand.logo ? (
                        <SearchImage
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-[72px] w-full object-contain"
                        />
                      ) : (
                        <span className="text-center text-sm font-bold text-gray-900">
                          {brand.name}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}

function buildSearchPageData(data: any, fallbackMenu: any[] = []): SearchPageData {
  const menu = Array.isArray(data?.menu) && data.menu.length ? data.menu : fallbackMenu;
  const flatCategories = flattenCategories(menu);
  const rows = buildCategoryRows(menu, flatCategories);
  const recentSearches = normalizeRecentSearches(data?.recent_searches || data?.recentSearches);
  const banners = normalizeBanners(data?.banners);
  const promoBanners = normalizeBanners(data?.promo_banners || data?.promoBanners || data?.banners);
  const brands = normalizeBrands(data?.brands);

  return {
    recentSearches: recentSearches.length
      ? recentSearches
      : flatCategories.slice(0, 5).map((item) => ({ ...item, href: `/category/${item.slug}` })),
    banners,
    promoBanners,
    categoryRows: rows,
    popularCategories: flatCategories.slice(0, 24).map((item) => ({
      ...item,
      href: `/category/${item.slug}`,
    })),
    brands,
  };
}

function normalizeRecentSearches(items: any[] = []): SearchTile[] {
  if (!Array.isArray(items)) return [];

  return items
    .slice(0, 8)
    .map((item, index) => {
    const query = item?.query || item?.name || String(item || "");
    return {
      id: item?.id || query || index,
      name: titleCaseSearch(query),
      image: item?.image || item?.icon || item?.logo || null,
      href: `/search?query=${encodeURIComponent(query)}`,
    };
    })
    .filter((item) => item.name && item.name.toLowerCase() !== "undefined");
}

function normalizeBanners(items: any[] = []): BannerTile[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => ({
      id: item?.id || index,
      image: item?.photo || item?.image || item?.banner || "",
      url: item?.url || "/",
    }))
    .filter((item) => item.image);
}

function normalizeBrands(items: any[] = []): BrandTile[] {
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => ({
    id: item?.id || item?.slug || index,
    name: item?.name || "",
    slug: item?.slug,
    logo: item?.logo || item?.image || null,
  }));
}

function flattenCategories(categories: any[]): SearchTile[] {
  const output: SearchTile[] = [];

  const visit = (items: any[]) => {
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      if (item?.id && item?.name && item?.slug) {
        output.push({
          id: item.id,
          name: item.name,
          slug: item.slug,
          image: item.icon || item.icon_menu || null,
          href: `/category/${item.slug}`,
        });
      }
      visit(item?.children);
    });
  };

  visit(categories);
  return output;
}

function buildCategoryRows(menu: any[], flatCategories: SearchTile[]): SearchRow[] {
  const rows = Array.isArray(menu)
    ? menu
        .map((category) => {
          const children = flattenCategories(category?.children || []);
          const sourceItems = children.length ? children : flatCategories;
          const imageBackedItems = sourceItems.filter((item) => Boolean(item.image));
          const items = (imageBackedItems.length >= 4 ? imageBackedItems : sourceItems)
            .filter((item) => item.id !== category?.id)
            .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)))
            .slice(0, 10);

          return {
            id: category?.id,
            title: category?.name,
            items,
          };
        })
        .filter((row) => row.id && row.title && row.items.length)
    : [];

  if (rows.length >= 4) return rows;

  const chunkSize = 8;
  const generatedRows = [];
  for (let index = 0; index < flatCategories.length; index += chunkSize) {
    generatedRows.push({
      id: `popular-${index}`,
      title: index === 0 ? "For All" : "Explore",
      items: flatCategories.slice(index, index + chunkSize),
    });
  }

  return [...rows, ...generatedRows].slice(0, 6);
}

function SearchImage({ src, alt, className, ...props }: any) {
  const normalizedSrc = normalizeImageSrc(src);

  if (!normalizedSrc) {
    return (
      <span className="grid h-full w-full place-items-center border border-gray-100 bg-gradient-to-br from-white to-gray-50">
        <span className="text-[18px] font-semibold text-gray-500">
          {getInitial(alt)}
        </span>
      </span>
    );
  }

  return <img src={normalizedSrc} alt={alt || ""} className={className} {...props} />;
}

function normalizeImageSrc(src?: string | null) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return src;
  return `${BASE_URL}/public/${src}`;
}

function titleCaseSearch(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getInitial(value?: string) {
  const initial = value?.trim()?.charAt(0);
  return initial ? initial.toUpperCase() : "?";
}

function RoundSearchTile({
  item,
  onClick,
}: {
  item: SearchTile;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[68px] shrink-0 text-center"
    >
      <span className="grid h-[58px] w-[58px] place-items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
        {item.image ? (
          <SearchImage
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="grid h-full w-full place-items-center bg-gradient-to-br from-white to-gray-50">
            <span className="text-[16px] font-semibold text-gray-500">
              {getInitial(item.name)}
            </span>
          </span>
        )}
      </span>
      <span className="mt-2 block text-[12px] font-normal leading-[15px] text-gray-600 line-clamp-2">
        {item.name}
      </span>
    </button>
  );
}

function SquareSearchTile({
  item,
  onClick,
}: {
  item: SearchTile;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[86px] shrink-0 text-center"
    >
      <span className="grid h-[82px] w-[86px] place-items-center overflow-hidden border border-gray-100 bg-white">
        {item.image ? (
          <SearchImage
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="grid h-full w-full place-items-center bg-gradient-to-br from-white to-gray-50">
            <span className="text-[20px] font-semibold text-gray-500">
              {getInitial(item.name)}
            </span>
          </span>
        )}
      </span>
      <span className="mt-1.5 block text-[11px] font-medium leading-[13px] text-gray-800 line-clamp-2">
        {item.name}
      </span>
    </button>
  );
}

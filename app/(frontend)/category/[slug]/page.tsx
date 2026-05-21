
import FilterProduct from "@/app/ui/FilterProduct/FilterProduct";
import { ProductSkeletonGrid } from "@/app/ui/skeletons";
import { API_BASE_URL } from "@/app/config/api";
import { Suspense } from "react";

async function getCategoryId(slug: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/category/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) return "";
  const data: any = await response.json();
  return data?.data?.category?.id ? String(data.data.category.id) : "";
}

async function getFilterLabels(categoryIds = "", brandIds = ""): Promise<string[]> {
  const [categoryResponse, brandResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/filter/categories`, { cache: "no-store" }).catch(() => null),
    fetch(`${API_BASE_URL}/filter/brands`, { cache: "no-store" }).catch(() => null),
  ]);

  const [categoryData, brandData] = await Promise.all([
    categoryResponse?.ok ? categoryResponse.json() : Promise.resolve({ data: [] }),
    brandResponse?.ok ? brandResponse.json() : Promise.resolve({ data: [] }),
  ]);

  const selectedCategoryIds = categoryIds.split(",").filter(Boolean).map(Number);
  const selectedBrandIds = brandIds.split(",").filter(Boolean).map(Number);

  const labels = [
    ...(categoryData?.data || [])
      .filter((item: any) => selectedCategoryIds.includes(Number(item.id)))
      .map((item: any) => item.name),
    ...(brandData?.data || [])
      .filter((item: any) => selectedBrandIds.includes(Number(item.id)))
      .map((item: any) => item.name),
  ];

  return labels;
}

export default async function Page({ searchParams,
  params }: {
    params: {
      slug: string
    };
    searchParams?: {
      categories?: string;
      subCategory?: string;
      brands?: string;
      price_range?: any;
      discount?: any;
      sort_by?: any;
      page?: string;
      min_price?: number;
      max_price?: number;
    };
  }) {

  const currentCategoryId = await getCategoryId(params.slug);
  const categories = searchParams?.categories || currentCategoryId;
  const subCategory = searchParams?.subCategory || '';
  const brands = searchParams?.brands || '';
  const discount = searchParams?.discount || '';
  const sort_by = searchParams?.sort_by || '';
  const currentPage = Number(searchParams?.page) || 1;
  const minPrice = Number(searchParams?.min_price);
  const maxPrice = Number(searchParams?.max_price);
  const selectedLabels = await getFilterLabels(categories, brands);
  const hasActiveFilters = Boolean(
    searchParams?.categories ||
    subCategory ||
    brands ||
    discount ||
    sort_by ||
    searchParams?.min_price ||
    searchParams?.max_price
  );
  const heading = hasActiveFilters && selectedLabels.length > 0
    ? selectedLabels.join(", ")
    : undefined;


  // Pass categories and page to getProducts
  const data = {
    categories: categories,
    subCategory: subCategory,
    brands: brands,
    discount: discount,
    sort_by: sort_by,
    currentPage: currentPage,
    minPrice: minPrice,
    maxPrice: maxPrice,
    heading,
    itemLabel: "item",
  }
  return <>
    <Suspense key={JSON.stringify(searchParams)} fallback={<ProductSkeletonGrid />} >
      <FilterProduct query={data} />
    </Suspense>

  </>
}

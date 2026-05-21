
import { API_BASE_URL } from "@/app/config/api";
import Container from "@/app/ui/Container/Container";
import FilterProduct from "@/app/ui/FilterProduct/FilterProduct";
import FilterSidebar from "@/app/ui/FilterSection/FilterSection";
import MobileFilterSortBar from "@/app/ui/FilterSection/MobileFilterSortBar";
import SortByFilter from "@/app/ui/FilterSection/SortByFilter";
import { ProductSkeletonGrid } from "@/app/ui/skeletons";
import { Suspense } from "react";

// Fetch data functions
async function getSearch(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/search_data/`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return null;
  }
  const data: any = await response.json();
  return data.data as any;
}

async function getAllCategory(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/filter/categories`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}

async function getAllBrand(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/filter/brands`);
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}


export default async function Page({ searchParams }: {
  searchParams?: {
    query?: string;
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
  const { discount_data, min_price, max_price, translate_data } = await getSearch();
  const filter_categories = await getAllCategory();
  const filter_brand = await getAllBrand();

  const query = searchParams?.query || '';
  const categories = searchParams?.categories || '';
  const subCategory = searchParams?.subCategory || '';
  const brands = searchParams?.brands || '';
  const discount = searchParams?.discount || '';
  const sort_by = searchParams?.sort_by || '';
  const currentPage = Number(searchParams?.page) || 1;
  const search_min_price = Number(searchParams?.min_price);
  const search_max_price = Number(searchParams?.max_price);

  return <>
    <Container>
      <div className="filter_header flex items-center justify-between pt-8 pb-8">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Search by : {searchParams?.query || 'No query'}</h2>
        </div>
        <div className="hidden md:block">
          <SortByFilter translate_data={translate_data} />
        </div>
      </div>
      <div className="flex xl:gap-4 items-start">

        <FilterSidebar
          discount_data={discount_data}
          translate_data={translate_data}
          minPrice={min_price}
          maxPrice={max_price}
          filter_categories={filter_categories}
          filter_brand={filter_brand}
        />
        <div className="content flex-1 pb-20 md:pb-0">
          <Suspense key={JSON.stringify(searchParams)} fallback={<ProductSkeletonGrid />} >
            <FilterProduct query={{
              name: query,
              categories: categories,
              subCategory: subCategory,
              brands: brands,
              discount: discount,
              sort_by: sort_by,
              currentPage: currentPage,
              minPrice: search_min_price,
              maxPrice: search_max_price,
            }} />
          </Suspense>
        </div>
      </div>
    </Container>

    <MobileFilterSortBar translate_data={translate_data} />
  </>
}

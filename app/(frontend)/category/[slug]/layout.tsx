import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import Breadcrumb from "@/app/ui/Breadcrumb/Breadcrumb";
import Category from "@/app/ui/Category/Category";
import ShopByBrand from "@/app/ui/Category/ShopBy/ShopByBrand";
import ShopByCategory from "@/app/ui/Category/ShopBy/ShopByCategory";
import ShopByConcern from "@/app/ui/Category/ShopBy/ShopByConcern";
import ShopByIngredient from "@/app/ui/Category/ShopBy/ShopByIngredient";
import ShopByRoutine from "@/app/ui/Category/ShopBy/ShopByRoutine";
import Container from "@/app/ui/Container/Container";
import CustomImage from "@/app/ui/CustomImage/CustomImage";
import FilterSidebar from "@/app/ui/FilterSection/FilterSection";
import MobileFilterSortBar from "@/app/ui/FilterSection/MobileFilterSortBar";
import SortByFilter from "@/app/ui/FilterSection/SortByFilter";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


type Props = {
  params: { slug: string };
};

// all category 
async function getCategory(slug: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/category/${slug}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return null;
  }
  const data: any = await response.json();
  return data.data as any;
}

// all category 
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
  const response = await fetch(`${API_BASE_URL}/filter/brands`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, banner } = await getCategory(params.slug);

  return {
    title: category.meta_title,
    description: category.meta_description,
    openGraph: {
      title: category.meta_title,
      description: category.meta_description,
      images: [
        {
          url: `${BASE_URL}/public/${banner}`,
          width: 800,
          height: 600,
          alt: `${category.meta_title} image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.meta_title,
      description: category.meta_description,
      images: [`${BASE_URL}/public/${banner}`],
    },
  };
}

// product search 
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    slug?: string
  }
}) {
  const { discount_data, category, banner,
     attributes,
      product_count,
      subcategories,
       minPrice,
       maxPrice, 
       translate_data,
       shop_by_category,
       shop_by_category_tile,
       shop_by_brand ,
       shop_by_brand_tile ,
       shop_by_routine,
       shop_by_routine_tile,
       shop_by_ingredient,
       shop_by_ingredient_tile,
       shop_by_concern,
       shop_by_concern_tile,
      } = await getCategory(params.slug as string);
  const filter_categories = await getAllCategory();
  const filter_brand = await getAllBrand();

  return <Container>
    <div className="md:w-[91%] md:mx-auto">
      <Breadcrumb link={category.slug} name={category.name} />

{/* shop by start  */}
      {/* category  */}
      {
        shop_by_category.length > 0 && 
      <ShopByCategory  title={shop_by_category_tile} data={shop_by_category} />
      }
    {
      banner && <div className="banner mx-3 my-6 md:mx-0 md:mb-8 overflow-hidden rounded-xl">
        <CustomImage width={1060} height={340} alt={category?.name} src={banner} className="w-full rounded-xl object-cover" />
      </div>
    }
    {
      subcategories?.length > 0 &&
      <div className="sub_category mx-3 mb-6 md:mx-0 md:mb-8">
        <div className="grid auto-cols-[72px] grid-flow-col grid-rows-2 gap-x-3 gap-y-4 overflow-x-auto pb-2 md:auto-cols-auto md:grid-flow-row md:grid-cols-6 md:grid-rows-none lg:grid-cols-8 xl:grid-cols-10">
          {
            subcategories.map((itemChild: any) => (
              <Link href={`/category/${itemChild.slug}`} key={itemChild.id || itemChild.slug} className="group block text-center">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#f6f0e8]">
                  <Image
                    src={`${BASE_URL}/public/${itemChild?.icon}`}
                    width={160}
                    height={160}
                    alt={itemChild.name}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-1 line-clamp-1 text-[10px] font-bold text-neutral-black duration-300 ease-in-out group-hover:text-primary md:text-sm">
                  {itemChild.name}
                </h3>
              </Link>
            ))
          }
        </div>
      </div>
    }
      {
        shop_by_brand.length > 0 && 
      <ShopByBrand  title={shop_by_brand_tile} data={shop_by_brand} />
      }
      {
        shop_by_ingredient.length > 0 && 
      <ShopByIngredient  title={shop_by_ingredient_tile} data={shop_by_ingredient} />
      }
      {
        shop_by_routine.length > 0 && 
      <ShopByRoutine  title={shop_by_routine_tile} data={shop_by_routine} />
      }
      {
        shop_by_concern.length > 0 && 
      <ShopByConcern  title={shop_by_concern_tile} data={shop_by_concern} />
      }
      
{/* shop by end */}

    {/* <Category data={{ data: subcategories }} title={false} className=" pb-1 px-0  md:px-0 lg:px-0 xl:px-0" /> */}

    <div className="filter_header hidden md:flex items-center justify-between mx-4 md:mx-0 pt-8 pb-8 ">
      <div className="flex items-center">

        <h2 className="text-lg font-semibold"> {category?.name} ({product_count} {translate_data?.item})</h2>
      </div>
      <div className="hidden md:block">
        <SortByFilter translate_data={translate_data} />
      </div>
    </div>
    <MobileFilterSortBar
      inline
      totalItems={product_count}
      itemLabel={translate_data?.item || "item"}
      translate_data={translate_data}
    />
    <div className="flex xl:gap-4 items-start ">

      <FilterSidebar discount_data={discount_data} translate_data={translate_data} category_id={category.id} minPrice={minPrice} maxPrice={maxPrice}
        subcategories={subcategories} filter_categories={filter_categories} filter_brand={filter_brand} attributes={attributes} />

      <div className="content flex-1 pb-20 md:pb-0">
        {children}
        <div className="category_description pb-8">
          <div
            dangerouslySetInnerHTML={{ __html: category.meta_description }}
          />
        </div>
      </div>

    </div>
    </div>

  </Container>
}

import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import Breadcrumb from "@/app/ui/Breadcrumb/Breadcrumb";
import Container from "@/app/ui/Container/Container";
import CustomImage from "@/app/ui/CustomImage/CustomImage";
import FilterSidebar from "@/app/ui/FilterSection/FilterSection";
import SortByFilter from "@/app/ui/FilterSection/SortByFilter";
import { Metadata } from "next";


type Props = {
  params: { slug: string };
};

// all category 
async function getBrand(slug: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/brand/${slug}`, {
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
  const { brand, banner } = await getBrand(params.slug);

  return {
    title: brand.meta_title,
    description: brand.meta_description,
    openGraph: {
      title: brand.meta_title,
      description: brand.meta_description,
      images: [
        {
          url: `${BASE_URL}/upload/${banner}`,
          width: 800,
          height: 600,
          alt: `${brand.meta_title} image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: brand.meta_title,
      description: brand.meta_description,
      images: [`${BASE_URL}/upload/${banner}`],
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
  };
}) {
  const { discount_data, brand, banner, product_count, subcategories, minPrice, maxPrice, translate_data } = await getBrand(params.slug as string);
  const filter_categories = await getAllCategory();
  const filter_brand = await getAllBrand();

  return <Container>
    <div className="md:w-[91%] md:mx-auto">
      <Breadcrumb link={brand.slug} name={brand.name} />
    {
      banner && <div className="banner md:mx-0 mx-2">
        <CustomImage width={1000} height={340} alt={brand?.name} src={banner} />
      </div>
    }

    <div className="filter_header flex items-center justify-between md:mx-0 mx-2 pt-8 pb-8 ">
      <div className="flex items-center">

        <h2 className="text-lg font-semibold"> {brand?.name} ({product_count} {translate_data?.item})</h2>
      </div>
      <div>

        <SortByFilter translate_data={translate_data} />
      </div>
    </div>
    <div className="flex md:gap-4 items-start ">

      <FilterSidebar discount_data={discount_data} translate_data={translate_data} brand_id={brand.id} minPrice={minPrice} maxPrice={maxPrice}
        subcategories={subcategories} filter_categories={filter_categories} filter_brand={filter_brand} />

      <div className="content  flex-1">
        {children}
        <div className="category_description pb-8 md:mx-0 mx-2">
          <div
            dangerouslySetInnerHTML={{ __html: brand.meta_description }}
          />
        </div>
      </div>

    </div>
    </div>

  </Container>
}
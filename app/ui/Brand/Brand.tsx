import { BASE_URL } from '@/app/config/api';
import { getTopBrands } from '@/lib/apiData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TranslateHeading from '../TranslateHeading';
import Link from 'next/link';
import Container from '../Container/Container';
import BrandItem from './BrandItem'; // ✅ NEW

export default async function Brand() {
  const brands = await getTopBrands();

  return (
    <Container className="pb-[66px]">
      <div className="brand_section flex flex-col gap-6 xl:px-[13px]">
        <TranslateHeading translateKey={"shop_by_brands"} />

        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full hidden lg:block"
        >
          <CarouselContent>
            {brands?.data &&
              brands?.data.map((item: any) => (
                <CarouselItem
                  key={item.id}
                  className="basis-[30%] sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <BrandItem item={item} size="large" />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-0px] sm:left-[-17px] lg:top-[40%]" />
          <CarouselNext className="right-[-0px] sm:right-[-17px] lg:top-[40%]" />
        </Carousel>

        {/* Mobile view */}
        <div className="grid grid-cols-2 mx-4 md:grid-cols-3 gap-2 lg:hidden">
          {brands?.data &&
            brands?.data.map((item: any) => (
              <BrandItem key={item.id} item={item} size="small" />
            ))}
        </div>
      </div>
    </Container>
  );
}

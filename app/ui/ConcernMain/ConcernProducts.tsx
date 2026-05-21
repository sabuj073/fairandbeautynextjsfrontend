import { getProductByCategory } from '@/lib/apiData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductItem from '@/app/ui/Product/ProductItem';
import { Product } from '@/types/api';

interface ConcernProductsProps {
    products: Product[];
}

export default async function ConcernProducts({ products }: ConcernProductsProps) {

    return (
        <div className="concern_right w-full xl:w-[700px]">
            <Carousel opts={{ align: 'center' }} className="w-full">
                <CarouselContent className='ml-0'>
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="pl-0 lg:pl-2 basis-[50%] sm:basis-1/3 md:basis-1/3 xl:basis-1/3">
                            <ProductItem {...product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-12px] sm:left-[-17px]" />
                <CarouselNext className="right-[-12px] sm:right-[-17px]" />
            </Carousel>
        </div>
    );
}

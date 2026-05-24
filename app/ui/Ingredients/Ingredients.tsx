
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import IngredientItem from './IngredientItem'
import TranslateHeading from '../TranslateHeading'
import Container from '../Container/Container'
import { API_BASE_URL } from '@/app/config/api'
async function getFlashIngredients(): Promise<{
    id: number,
    title?: string,
    short_description?: string,
    description?: string,
    banner?: string,
}[]> {
    const response = await fetch(`${API_BASE_URL}/flash-deals-ingredients`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data.data as any;
}

export default async function Ingredients() {
    const data = await getFlashIngredients();

    return (
        <Container className='home-section'>
            <div className='ingredients flex flex-col md:gap-6 py-[20px] md:py-[37px]' >
                <TranslateHeading translateKey={"ingredints"} />
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full hidden lg:block "
                >
                    <CarouselContent>
                        {data.map((item, index) => (
                            <CarouselItem key={index} className={`basis-[100%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 ${index === 0 && 'md:-ml-4'}`}>
                                <IngredientItem data={item} key={index} desk={true} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className='flex w-full flex-row mx-4 overflow-scroll gap-x-3 px-1 py-3 sm:hidden '>
                    {data.map((item, index) => (
                        <IngredientItem data={item} key={index} />
                    ))}
                </div>
            </div>
        </Container >
    )
}


import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { API_BASE_URL } from '@/app/config/api';
import CustomImage from '../CustomImage/CustomImage';
import TranslateHeading from '../TranslateHeading';
import CustomTranslateHeading from '../CustomTranslateHeading';
import clsx from 'clsx';
import CustomLink from '../CustomLink';
import ViewAll from '../Product/ViewAll/ViewAll';


async function getReviews_home(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/reviews_home`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        ;
        return [];
    }
    const data: any = await response.json();
    return data as any;
}


export default async function CustomerReview() {
    const reviews_home = await getReviews_home() as any;

    return (
        <div className={clsx("home-section")}>
                    <div className={clsx('arrival_section md:mx-0 mx-2 rounded-lg flex flex-col gap-[15px] sm:gap-6 py-[20px] md:py-[37px] md:px-[10px] sm:px-4')}>
                        <div className="flex section_heading text-center items-center justify-between">
                            <h2 className={clsx('ml-2 relative text-[18px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max font-semibold uppercase gap-1 flex items-center justify-start flex-wrap')}>
                                <div className={clsx('text-neutral-black relative')}>Customer Review</div>
                            </h2>
                            <div className="view_all flex justify-center items-center">
                                    <CustomLink href={'/'} className="text-neutral-black mr-2">
                                        <ViewAll />
                                    </CustomLink>
                                </div>
                        </div>
                        
                        <Carousel
                        opts={{
                            align: "center",
                        }}
                        className="w-full  "
                    >
                        <CarouselContent className='pt-[8px] sm:pt-[25px] md:px-0 md:pr-0 px-2 pr-3 ml-0 gap-2' >
                            {reviews_home && reviews_home?.data && reviews_home.data.map((item: any, index: any) => (
                                <CarouselItem key={index} className="pl-0 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4  ">
                                    <div className="md:min-h-[520px] sm:min-h-[420px] md:min-w-[220px] md:max-w-full max-w-[185px] rounded-lg">
                                        <img
                                        src={item?.image || item?.images?.[0] || '/fallback-image.png'}
                                        width={200}
                                        height={520}
                                        alt={item?.alt_text || 'Customer Review'}
                                        className="object-cover transition-transform duration-300 ease-in-out transform h-full w-full rounded-lg md:px-3"
                                        />
                                        </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    </div>
                </div>
    )
}

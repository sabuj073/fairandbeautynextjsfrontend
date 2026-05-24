"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import { cookieStore } from '@/lib/hooks/useCookieStore'
import { get_setting } from '@/lib/utils'
import CustomImage from '../CustomImage/CustomImage'
import TranslateHeading from '../TranslateHeading'


export default function ResonShop() {
    const { settingValue } = cookieStore();
    const reson_to_shop_images = get_setting(settingValue, 'reson_to_shop_images')?.value || [];

    return (
        <div className="container home-section mx-auto">
            <div style={{background: "linear-gradient(180deg, #139804 0%, #063b00 100%)"}} className='reason rounded-[16px] py-[10px] md:p-[20px] sm:p-[35px] flex flex-col gap-1 md:gap-6 ' >
                <TranslateHeading isFromReason={true} translateKey={"reason_to_shop"} className="text-white" />
                <div className="reason_item">
                    <Carousel
                        opts={{
                            align: "center",
                            loop: true
                        }}
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                        className="w-full "
                    >
                        <CarouselContent>
                            {reson_to_shop_images.map((item: any, index: any) => (
                                <CarouselItem key={index} className="basis-[33%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5  ">
                                    <div className="resons_item sm:mb-7 xl:mb-0 flex items-center justify-center flex-col md:gap-3 " key={index} >
                                        <div className=' w-[80px] h-[70px] sm:w-[175px]  sm:h-[125px]' >
                                            <CustomImage
                                                src={item?.url}
                                                width={175}
                                                height={137}
                                                alt={item?.title}
                                                className="object-contain transition-transform duration-300 ease-in-out transform w-full "
                                            />
                                        </div>
                                        {
                                            item?.title &&
                                            <h3 className='text-[14px] font-medium text-white ' >{item.title}</h3>
                                        }
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {/* <CarouselPrevious className=' top-[50px] left-[-12px] sm:left-[-17px]' />
                        <CarouselNext className='top-[50px] right-[-12px] sm:right-[-17px]' /> */}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

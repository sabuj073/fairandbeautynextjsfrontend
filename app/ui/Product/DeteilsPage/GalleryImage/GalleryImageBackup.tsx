import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'

export default function GalleryImageBackup() {
    const images = [
        {
            id: 1,
            url: '/product/g1.webp'
        },
        {
            id: 2,
            url: '/product/g2.webp'
        },
        {
            id: 3,
            url: '/product/g3.webp'
        },
        {
            id: 4,
            url: '/product/g4.webp'
        },
        {
            id: 5,
            url: '/product/g1.webp'
        },
        {
            id: 6,
            url: '/product/g2.webp'
        },
        {
            id: 7,
            url: '/product/g3.webp'
        },
    ]
    return (
        <div className='flex gap-3 relative aspect-[1.2/1] ' >
            <div className="side_image w-[173px] h-auto  ">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full  overflow-hidden h-full "
                >
                    <CarouselContent className="">
                        {images.map((item, index) => (
                            <CarouselItem key={index} className="shrink-0 rounded-sm shadow-sm p-1 pt-1 mr-4 py-1 relative h-fit w-full basis-1/6">
                                <Image
                                    src={item.url}
                                    width={173}
                                    height={173}
                                    alt=""
                                    className="object-contain transition-transform duration-300 ease-in-out transform w-full aspect-[1.00067 / 1]  "
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                </Carousel>
            </div>
            <div className="main_image w-full ">
                <Carousel className="w-full ">
                    <CarouselContent>
                        {images.map((item, index) => (
                            <CarouselItem key={index} className="basis-[100%]">
                                <div className="brand_item flex items-center justify-center flex-col gap-3 " key={item.id} >
                                    <Image
                                        src={item.url}
                                        width={526}
                                        height={526}
                                        alt=""
                                        className="object-contain transition-transform duration-300 ease-in-out transform w-full aspect-[100/100]  "
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='left-0' />
                    <CarouselNext className='right-0' />
                </Carousel>
            </div>
        </div>
    )
}

"use client"
import Image from 'next/image'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { BASE_URL } from '@/app/config/api'
import Link from 'next/link'
import TranslateHeading from '@/app/ui/TranslateHeading'
import { cn, transformData } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
type PropType = {
    data: any,
    title: boolean,
    className?: string,
}
const Category: React.FC<PropType> = (props) => {
    const { data, title, className } = props
    const formattedData = transformData(data.data);
    return (
        <div className={cn("container block md:hidden home-section mx-auto", className)}>
            {
                title && <TranslateHeading translateKey="trending_category" />
            }

            <div className='category_tranding   flex flex-col pt-2 md:pt-6 lg:px-4 px-2' >

                <Carousel
                    opts={{
                        align: "center",
                        loop: false,
                        slidesToScroll: 3
                    }}

                    plugins={[
                        Autoplay({
                            delay: 2000,

                        }),
                    ]}
                    className="w-full lg:px-4"
                >
                    <CarouselContent>
                        {formattedData.map((item: any, index: any) => (
                            <CarouselItem key={index} className="hidden lg:block pl-2 lg:pl-0 basis-1/4 sm:basis-1/4 md:basis-1/5 xl:basis-[12.5%]  ">
                                <div>
                                    {
                                        item?.column.map((itemChild: any, index: any) => (

                                            <div className="md:p-1" key={index} >
                                                <div className="tranding_item group md:pt-3 " >
                                                    <Link href={`/category/${itemChild.slug}`} >
                                                        <div className="cat_logo justify-center items-center flex flex-col md:gap-3 pb-3 ">

                                                            <div className=' overflow-hidden w-[90px] h-[90px] md:w-[140px] md:h-[140px] rounded-[50%] border-primary border-[0px] flex justify-center items-center '>
                                                                <img
                                                                    loading="lazy"
                                                                    src={`${BASE_URL}/public/${itemChild?.icon}`}
                                                                    width={140}
                                                                    height={140}
                                                                    alt={itemChild.name}
                                                                    className='object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto w-full '
                                                                />
                                                                {/* <Image
                                                                    loading="lazy"
                                                                    src={`${BASE_URL}/public/${itemChild?.icon}`}
                                                                    width={140}
                                                                    height={140}
                                                                    alt={itemChild.name}
                                                                    className='object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto w-full '
                                                                /> */}
                                                            </div>

                                                            <h3 className=' text-[.8rem] md:text-base text-neutral-black group-hover:font-medium group-hover:text-primary text-center uppercase duration-300 ease-in-out h-[20px] md:h-[25px] line-clamp-1 ' >{itemChild.name}</h3>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            </CarouselItem>
                        ))}

                        {/* mobile for  */}

                        {data?.data?.map((itemChild: any, index: any) => (
                            <CarouselItem key={index} className="block lg:hidden pl-2 lg:pl-0 basis-1/4 sm:basis-1/4 md:basis-1/4 xl:basis-[12.5%]  ">
                                <div>

                                    <div className="md:p-1" key={index} >
                                        <div className="tranding_item group md:pt-3 " >
                                            <Link href={`/category/${itemChild.slug}`} >
                                                <div className="cat_logo justify-center items-center flex flex-col md:gap-3  ">

                                                    <div className='sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] '>
                                                        <Image
                                                            loading="lazy"
                                                            src={`${BASE_URL}/public/${itemChild?.icon}`}
                                                            width={150}
                                                            height={150}
                                                            alt={itemChild.name}
                                                            className='object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto w-full rounded-lg'
                                                        />
                                                    </div>

                                                    <h3 className='mt-2 text-[10px] sm:text-[.8rem] md:text-base text-neutral-black group-hover:font-medium group-hover:text-primary text-center uppercase duration-300 ease-in-out h-[15px] sm:h-[20px] md:h-[25px] line-clamp-1 ' >{itemChild.name}</h3>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className=" hidden md:block left-[0px] sm:left-[-17px]" />
                    <CarouselNext className="hidden md:block right-[-0px] sm:right-[-17px]" />
                </Carousel>
            </div>
        </div>
    )
}
export default Category

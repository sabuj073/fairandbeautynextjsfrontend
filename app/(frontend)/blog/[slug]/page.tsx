import { API_BASE_URL, BASE_URL } from '@/app/config/api'
import { formatDate } from '@/app/lib/utils';
import RelativeBlog from '@/app/ui/Blog/RelativeBlog';
import Breadcrumb from '@/app/ui/Breadcrumb/Breadcrumb';
import Container from '@/app/ui/Container/Container'
import SocialLink from '@/app/ui/Product/DeteilsPage/SocialLink';
import { Metadata } from 'next';
import React from 'react'

async function getBlogDetails(slug: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { data, meta_img } = await getBlogDetails(params.slug);

    return {
        title: data.meta_title,
        description: data.meta_description,
        openGraph: {
            title: data.meta_title,
            description: data.meta_description,
            images: [
                {
                    url: `${BASE_URL}/public/${meta_img}`,
                    width: 800,
                    height: 600,
                    alt: `${data.meta_title} image`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.meta_title,
            description: data.meta_description,
            images: [`${BASE_URL}/public/${meta_img}`],
        },
    };
}





export default async function Page({ params, searchParams }: any) {
    const { data, banner } = await getBlogDetails(params.slug);
    const currentPage = Number(searchParams?.page) || 1;
    const formattedDate = formatDate(data.created_at);
    return (
        <div className="blog_section pb-[70px]">
            <Container>
                <Breadcrumb link={`/blog/${data.slug}`} name={data?.title} />
                <div className="grid grid-cols-12 gap-4  ">
                    <div className="blog_content col-span-12 lg:col-span-8 ">
                        <div className="blog_thumb h-[300px] lg:h-[600px] ">
                            <img src={`${BASE_URL}/public/${banner}`} alt={data?.title} className="img_fluid w-full h-full rounded-lg object-contain " />
                        </div>
                        <div className="blog_details">

                            <div className="bg-white rounded shadow-sm p-4">
                                <div className="text-center">
                                    <h1 className="blog_title_details text-neutral-black font-semibold text-xl ">
                                        {data?.title}
                                    </h1>
                                    <div className="mb-2 author_area ">
                                        {/* <span className=" text-neutral-black font-medium text-lg">by </span> */}
                                        <span className=" text-neutral-black font-medium text-lg">{formattedDate}</span>
                                    </div>
                                </div>
                                <div className='mb-3 flex flex-col justify-center items-center'>
                                    <SocialLink  slug={data.slug} />
                                </div>
                                <div className="mb-4 overflow-hidden">
                                    <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                                        __html: data.description
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ral_product col-span-12 lg:col-span-4 ">
                        <RelativeBlog category_id={data?.category_id} />
                    </div>
                </div>

            </Container>
        </div>
    )
}

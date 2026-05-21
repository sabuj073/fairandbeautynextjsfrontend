import React from 'react'
import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import Container from '@/app/ui/Container/Container';
import Heading from '@/app/ui/Section/Heading';
import { Metadata } from 'next';

async function getABout(slug: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/about_page/${slug}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { data, meta_img } = await getABout(params.slug);

    return {
        title: data?.meta_title,
        description: data?.meta_description,
        openGraph: {
            title: data?.meta_title,
            description: data?.meta_description,
            images: [
                {
                    url: `${BASE_URL}/public/${meta_img}`,
                    width: 400,
                    height: 300,
                    alt: `${data?.meta_title} image`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: data?.meta_title,
            description: data?.meta_description,
            images: [`${BASE_URL}/public/${meta_img}`],
        },
    };
}
export default async function Page({ params }: any) {
    const result = await getABout(params.slug);
    return (
        <Container className='pb-[66px] pt-[100px] '>
            <Heading title={result?.data?.title} />
            <div className='About   flex flex-col gap-6 py-[37px]  ' >
                {
                    result?.data && (
                        <div className="about_description pt-6">
                            <div
                                className="text-[12px] lg:text-base uppercase flex flex-col   "
                                dangerouslySetInnerHTML={{ __html: result?.data.content }}
                            />
                        </div>
                    )
                }
               
            </div>
        </Container >
    )
}

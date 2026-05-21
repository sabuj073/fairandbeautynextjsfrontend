import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import Breadcrumb from '@/app/ui/Breadcrumb/Breadcrumb'
import Container from '@/app/ui/Container/Container'
import CountdownTimer from '@/app/ui/CountdownTimer/CountdownTimer'
import ViewProduct from '@/app/ui/FilterProduct/ViewProduct';
import { ProductSkeletonGrid } from '@/app/ui/skeletons';
import React, { Suspense } from 'react'
async function getFlashCollectionDetails(slug: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/flash-deals-recommendation/${slug}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function CollectionPage({ params, searchParams }: any) {
    const { data, banner } = await getFlashCollectionDetails(params.slug);
    const currentPage = Number(searchParams?.page) || 1;
    // console.log(data)
    return (
        <Container>
            <div className='md:w-[92%] md:mx-auto'>
                <Breadcrumb link={`/recommendation/${data.slug}`} name={data?.title} />
            {
                banner && <div className="banner h-[320px] pb-[40px] pt-[20px] md:mx-0 mx-2  ">
                    <img src={`${BASE_URL}/public/${banner}`} alt="Makeup Products" className="w-full h-full rounded-lg object-contain " />

                </div>
            }
            <div className='mx-2'>
                <CountdownTimer endTime={data?.end_date} />
            </div>

            <div className="flashDeal_product  py-[40px] md:px-0 px-3 ">
                <Suspense key={JSON.stringify(searchParams)} fallback={<ProductSkeletonGrid count={5} />} >
                    <ViewProduct query={{
                        currentPage: currentPage,
                        apiUrl: `flash-deal-products/${data?.id}`
                    }} />
                </Suspense>
            </div>
            </div>
        </Container>
    )
}

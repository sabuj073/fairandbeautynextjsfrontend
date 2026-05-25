import React from 'react'
import  ProductItem from '../Product/ProductItem'
import PaginationFilter from './PaginationFilter'
import { API_BASE_URL } from '@/app/config/api';
import ProductNotFound from '../Product/ProductNotFound/ProductNotFound';

async function getProducts(name: string = '', categories: string = '', subCategory: string = '', brands: string = '', discount: any, sort_by: any, minPrice: any, maxPrice: any, page: number = 1, buy1get1: any = '', clearence: any = ''): Promise<any> {

    const url = new URL(`${API_BASE_URL}/products/search`);
    if (name) url.searchParams.append('name', name);
    if (categories) url.searchParams.append('categories', categories);
    if (subCategory) url.searchParams.append('subCategory', subCategory);
    if (brands) url.searchParams.append('brands', brands);
    if (discount) url.searchParams.append('discount', discount);
    if (sort_by) url.searchParams.append('sort_key', sort_by);
    if (minPrice) url.searchParams.append('min', minPrice);
    if (maxPrice) url.searchParams.append('max', maxPrice);
    if (buy1get1) url.searchParams.append('buy1get1', '1');
    if (clearence) url.searchParams.append('clearence', '1');

    url.searchParams.append('page', page.toString());


    const response = await fetch(url.toString(), {
        cache: 'no-store',
    });

    if (!response.ok) {
        return [];
    }
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const data: any = await response.json();
    return data as any;
}


export default async function FilterProduct({ query }: any) {
    const { name, categories, subCategory, brands, discount, sort_by, minPrice, maxPrice, currentPage, buy1get1, clearence } = query
    const result = await getProducts(name, categories, subCategory, brands, discount, sort_by, minPrice, maxPrice, currentPage, buy1get1, clearence);
    const heading = query?.heading;
    const itemLabel = query?.itemLabel || "item";
    const totalItems = result?.meta?.total ?? result?.data?.length ?? 0;

    return (
        <>
            {heading && (
                <div className="mx-1 md:mx-0 pt-8 pb-4">
                    <h2 className="text-lg font-semibold">
                        {heading} ({totalItems} {itemLabel})
                    </h2>
                </div>
            )}

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pt-4 gap-1 md:gap-3 mx-1 md:mx-0'>

                {
                    result.data.length > 0 && result.data.map((item: any) => (
                        <ProductItem {...item} key={item.id} compact />
                    ))
                }

            </div>
            {
                result.data.length === 0 && <div className="product_not_found">
                    <ProductNotFound />
                </div>
            }

            {
                result.data.length > 0 && <PaginationFilter meta={result.meta} />
            }

        </>
    )
}

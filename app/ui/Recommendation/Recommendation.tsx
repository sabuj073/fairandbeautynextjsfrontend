

import ProductSlider from '@/app/ui/Product/ProductSlider';
import { getFeaturedProduct } from '@/lib/apiData';

export default async function Recommendation() {
    const result = await getFeaturedProduct() as any;
    const products = result.data as any
    return (
        <ProductSlider
            products={products}
            view_link="product"
            translateKey='authentic_recommendation'
        />

    )
}

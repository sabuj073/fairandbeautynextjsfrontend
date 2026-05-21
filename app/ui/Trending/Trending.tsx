
import ProductSlider from '@/app/ui/Product/ProductSlider';
import { getTrandingProduct } from '@/lib/apiData';

export default async function Trending() {
    const result = await getTrandingProduct() as any;
    const products = result.data as any

    return (
        <ProductSlider
            products={products}
            view_link="/tranding"
            translateKey={'trending_produts'}
            slide_button={false}
        />

    )
}

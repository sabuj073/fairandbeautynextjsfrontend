
import ProductSlider from '@/app/ui/Product/ProductSlider';
import { getNewArrivalsProduct } from '@/lib/apiData';
export default async function ArriVal() {
    const result = await getNewArrivalsProduct();

    const products = result.data as any
    return (
        <ProductSlider
            products={products}
            view_link="product"
            translateKey={'new_arrivals'}
            slide_button={false}
        />

    )
}

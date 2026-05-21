import { getNewArrivalsProduct } from '@/lib/apiData';
import CustomHeadProductSlider from '../Product/CustomHeadProductSlider';
export default async function Featured() {
    const result = await getNewArrivalsProduct();

    const products = result.data as any
    return (
        <CustomHeadProductSlider
            products={products}
            view_link="product"
            translateKey={'new_arrivals'}
            slide_button={false}
            title={'Featured Products'}
        />

    )
}


import { API_BASE_URL } from '@/app/config/api';
import { ApiResponse, NumberType, Product } from '@/types/api';
import ProductSlider from '@/app/ui/Product/ProductSlider'
import { fetchData } from '@/lib/dataFetching';


async function getProductBoughtTogether(id: number | string | undefined) {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/bought_together/${id}`, { revalidate: 0 });
    return response.data;
}


export default async function Frequently({ id }: NumberType) {
    try {
        const products = await getProductBoughtTogether(id);

        return (
            <ProductSlider
                title="Frequently"
                sub_title="Bought Together"
                products={products}
                view_link="/frequently"
                translateKey={"bought_together"}
                view_all_button={false}
            />
        );
    } catch (error) {
        console.error("Failed to load frequently bought together products:", error);
        return <p>Failed to load products. Please try again later.</p>;
    }
}

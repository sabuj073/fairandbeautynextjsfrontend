
import { API_BASE_URL } from '@/app/config/api';
import { ApiResponse, NumberType, Product } from '@/types/api';
import ProductSlider from '@/app/ui/Product/ProductSlider'
import { fetchData } from '@/lib/dataFetching';

async function getProductRelated(id: number | string | undefined): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/related/${id}`, { revalidate: 0 });
    return response.data as any;
}
export default async function SimilarProduct({ id }: NumberType) {
    const products = await getProductRelated(id);
    return (
        <ProductSlider
            title="Similar   "
            sub_title='Product'
            products={products}
            view_link="/relative"
            className='bg-transparent mx-0 p-0'
            ContainerClassName="!pb-[29px]"
            translateKey='similarProduct'
            view_all_button={false}
        />
    )
}

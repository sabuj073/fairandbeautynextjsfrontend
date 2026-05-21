'use server'
import { API_BASE_URL } from '@/app/config/api';
import { ApiResponse, Blog, Brand, CategoryFeatured, NumberType, Offer, Product, ProductDetails, Review, Slider } from '@/types/api';
import { fetchData } from '@/lib/dataFetching';



/**
 * Fetches slider data from the server.
 * 
 * This function retrieves a list of Sliders by making a request to the `/sliders` endpoint.
 * The data is cached and revalidated every 10 seconds to ensure that the Sliders are kept up-to-date 
 * while still benefiting from caching for performance.
 * 
 * @returns {Promise<Slider[]>} - A promise that resolves to an array of Slider objects.
 * @throws {Error} - If the request fails, an error is thrown with the corresponding status code.
 */
export async function getSliders(): Promise<Slider[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/sliders`, { revalidate: 10 });
    return response.data as any;
}

/**
 * Fetches the featured categories from the API.
 * 
 * @returns {Promise<Category[]>} - An array of featured categories.
 */
export async function getFeaturedCategories(): Promise<CategoryFeatured[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/categories/featured`, { revalidate: 0 });
    return response as any;
}
/**
 * Fetches the shop by concern  from the API.
 * 
 * @returns {Promise<Category[]>} - An array of featured categories.
 */
export async function getShopByConcernCategory(): Promise<CategoryFeatured[]> {

    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/categories/concern`, { revalidate: 0 });

    return response.data as any;
}



/**
 * Fetches the products/featured categories from the API.
 * 
 * @returns {Promise<Category[]>} - An array of featured categories.
 */
export async function getFeaturedProduct(): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/featured`, { revalidate: 0 });
    return response as any;
}

/**
 * Fetches the products/New Arrivals categories from the API.
 * 
 * @returns {Promise<Product[]>} - An array of featured categories.
 */
export async function getNewArrivalsProduct(): Promise<any> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/featured`, { revalidate: 0 });
    return response as any;
}

/**
 * Fetches the products/New Arrivals categories from the API.
 * 
 * @returns {Promise<Product[]>} - An array of featured categories.
 */
export async function getTrandingProduct(): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/tranding`, { revalidate: 0 });
    return response as any;
}

/**
 * Fetches the products/featured categories from the API.
 * 
 * @returns {Promise<Product[]>} - An array of featured categories.
 */
export async function getProductByCategory(id: string | number): Promise<any> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/category/${id}`, { revalidate: 0 });
    return response.data as any;
}



/**
 * Fetches the product details  from the API.
 * 
 * @returns {Promise<Category[]>} - An array of featured categories.
 */
export async function getProductDetails({ slug }: any): Promise<ProductDetails[]> {

    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/${slug}`, { revalidate: 0 });
    return response.data as any;
}
export async function getProductBoughtTogether({ id }: NumberType): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/bought_together/${id}`, { revalidate: 0 });
    return response.data as any;
}
export async function getProductRelated({ id }: NumberType): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/related/${id}`, { revalidate: 0 });
    return response.data as any;
}
export async function getProductRecentlyView({ id }: NumberType): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/recently_view/${id}`, { revalidate: 0 });
    return response.data as any;
}

// export async function getProductReviewView({ id, page }: NumberType): Promise<Product[]> {
//     const response = await fetchData<ApiResponse>(`${API_BASE_URL}/reviews/product/${id}?page=${page}`, { revalidate: 0 });
//     return response.data;
// }
export async function fetchReviews(url: string): Promise<any> {
    const response = await fetchData<any>(`${url}`, { revalidate: 0 });
    return response;
}


/**
 * Fetches the brands/top categories from the API.
 * 
 * @returns {Promise<Category[]>} - An array of featured categories.
 */
export async function getTopBrands(): Promise<any> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/brands/top`, { revalidate: 0 });
    return response as any;
}

/**
 * Fetches the offers  from the API.
 * 
 * @returns {Promise<Category[]>} - An array of featured categories.
 */
export async function getOffer(): Promise<any> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/flash-deals`, { revalidate: 0 });
    return response as any;
}
/**
 * Fetches the blogs  from the API.
 * 
 * @returns {Promise<Category[]>} - An array of featured categories.
 */
export async function getBlogs(): Promise<any> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/blogs_home`, { revalidate: 0 });
    return response as any;
}


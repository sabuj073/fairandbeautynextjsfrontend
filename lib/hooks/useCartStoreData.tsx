import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Define the types for the cart item and cart data
interface CartItem {
    id: number;
    owner_id: number;
    user_id: number;
    product_id: number;
    product_name: string;
    product_thumbnail_image: string;
    variation: string | null;
    price: number;
    currency_symbol: string;
    tax: number;
    shipping_cost: number;
    quantity: number;
    lower_limit: number;
    upper_limit: number;
}

interface CartData {
    name: string;
    owner_id: number;
    cart_items: CartItem[];
}

interface CartState {
    temp_user_id: string | null;
    cartData: CartData[]; // Initialize as empty array instead of null
    totalQuantity: number;
    setCartData: (data: CartData[], totalQty?: number) => void;
    setTempUserId: () => string; // Returns the temp user ID
    setRemoveTempUserId: () => void;
    wishlist: number[]; // Specify the type for wishlist if possible
    setWishlist: (id: number) => void; // Specify type for id
    setWishlistArray: (data: number[]) => void; // Specify type for data
    setWishlistRemove: (id: number) => void; // Specify type for id
    setWishlistEmpty: () => void;
    resetProduct: number[]; // Specify the type for resetProduct
    setResetProduct: (productId: number) => void;
    languageData: any; // Specify the type for resetProduct
    setLanguage: (data: string) => void;
}

const useCartStoreData = create<CartState>()(
    persist(
        (set, get) => ({
            temp_user_id: null,
            cartData: [], // Initialize as empty array
            totalQuantity: 0,
            setTempUserId: () => {
                const tempId = uuidv4();
                set({ temp_user_id: tempId });
                if (typeof window !== 'undefined') {
                    localStorage.setItem('temp_user_id', tempId);
                }
                return tempId;
            },
            setRemoveTempUserId: () => {
                set({ temp_user_id: null });
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('temp_user_id');
                }
            },
            setCartData: (data, totalQty) => {
                set({
                    cartData: data,
                    totalQuantity: totalQty ?? 0, // Default to 0 if not provided
                });
            },
            wishlist: [],
            setWishlist: (id) => set((state) => ({ wishlist: [...state.wishlist, id] })),
            setWishlistRemove: (id) => set((state) => ({ wishlist: state.wishlist.filter((item) => item !== id) })),
            setWishlistEmpty: () => set({ wishlist: [] }),
            setWishlistArray: (data) => set({ wishlist: data }),
            resetProduct: [],
            setResetProduct: (productId) => set((state) => {
                if (productId && !state.resetProduct.includes(productId)) {
                    return { resetProduct: [...state.resetProduct, productId] }; // Return new state
                }
                return state; // Return current state if no change
            }),
            languageData: null,
            setLanguage: (data) => set({ languageData: data }),
        }),
        {
            name: 'cart-storage', // Name of the storage item
        }
    )
);

export default useCartStoreData;

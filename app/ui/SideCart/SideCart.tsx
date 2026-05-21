"use client"
import { Button } from '@/app/ui/button';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { X, MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { getCart } from '@/lib/cartApi';
import CustomImage from '../CustomImage/CustomImage';
import { productStore } from '@/lib/hooks/useProductStore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function SideCart() {
    const { openCart, setOpenCart } = productStore()
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const { setTempUserId, temp_user_id } = useCartStoreData((state) => ({
        setTempUserId: state.setTempUserId,
        temp_user_id: state.temp_user_id,
    }));

    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setCartData, cartData, totalQuantity } = useCartStoreData();

    const isLoggedIn = !!cookieValue?.user?.id;
    const userId = isLoggedIn ? cookieValue?.user?.id : temp_user_id;

    const [summary, setSummary] = useState<any>({
        sub_total: 0,
        discount: 0,
        grand_total: 0,
    });

    useEffect(() => {
        getSummary()
        calculateSummary();
    }, [cartData]);

    useEffect(() => {
        if (pathname === '/checkout') {
            setOpenCart(false);
        }
    }, [pathname]);

    const calculateSummary = () => {
        let subTotal = 0;
        let totalDiscount = 0;
        cartData?.forEach((parentItem: any) => {
            parentItem.cart_items.forEach((item: any) => {
                const itemTotal = item.price * item.quantity;
                const discountForItem = (item.previous_price - item.price) * item.quantity;
                subTotal += itemTotal;
                totalDiscount += discountForItem;
            });
        });

        const grandTotal = subTotal - totalDiscount;

        setSummary({
            sub_total: subTotal,
            discount: totalDiscount,
            grand_total: grandTotal,
        });
    };

    const getSummary = async () => {
        try {
            const response: any = await axios.post(
                `/api/cart/summary`,
                {
                    user_id: userId || null,
                }
            );
            console.log(response.data.data)
            setSummary(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const decreaseQty = (id: any, qty: any) => {
        if (qty > 1) {
            let qtyD = qty - 1
            changeQuantity(id, qtyD)
        }
    };

    const increaseQty = (id: any, qty: any) => {
        let qtyD = qty + 1
        changeQuantity(id, qtyD)
    };

    const handleDelete = async (id: any) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/cart/delete', {
                id: id,
            });
            const data = response.data;
            // Use userId instead of cookieValue?.user?.id to handle both logged-in and guest users
            const cartData: any = await getCart(userId || null);
            console.log("cartData", cartData)
            if (cartData && cartData.data) {
                setCartData(cartData.data, cartData.totalQuantity);
            } else {
                // If cart is empty, set empty array
                setCartData([], 0);
            }
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            } else {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            }
        } catch (error) {
            console.log(error);
            // On error, try to refresh cart data
            try {
                const cartData: any = await getCart(userId || null);
                if (cartData && cartData.data) {
                    setCartData(cartData.data, cartData.totalQuantity);
                } else {
                    setCartData([], 0);
                }
            } catch (refreshError) {
                console.log("Error refreshing cart:", refreshError);
            }
        } finally {
            setLoading(false);
        }
    };

    const changeQuantity = async (id: any, qty: any) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/cart/change-quantity', {
                quantity: qty,
                id: id,
            });
            const data = response.data;

            const responseData: any = await axios.post(
                `/api/cart/get`,
                {
                    user_id: userId || null,
                }
            );

            setCartData(responseData.data.data, responseData.data.totalQuantity);

            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            } else {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = () => {
        setOpenCart(false);
        setTimeout(() => {
            router.push('/checkout');
        }, 50);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    return (
        <div className='w-full lg:w-[500px] h-full'>
            <div className='flex flex-row bg-[#F5F5F5] h-full'>
                <div className='flex flex-col flex-1 flex-shrink flex-basis-0 h-full w-full' style={{ zIndex: 1000000 }}>
                    {/* Header with Close Button */}
                    <div className="cart_header py-[10px] border-b-[1px] border-[#6B6B6B] bg-white flex pl-3 pr-3 items-center justify-between flex-row">
                        <h4 className='text-[20px] text-neutral-black font-semibold'>Cart</h4>
                        <button 
                            onClick={handleCloseCart}
                            className=" hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Close cart"
                        >
                            <X className='text-[#6B6B6B] w-6 h-6' />
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className='flex shadow-md overflow-auto flex-row h-full w-full bg-white'>
                        <div className='flex flex-col w-full h-full bg-white'>
                            <div className="cart_items w-full flex flex-col overflow-auto h-full bg-white">
                                {/* Items */}
                                {cartData && cartData?.map((parentItem: any) => (
                                    parentItem.cart_items.map((item: any) => (
                                        <div key={item.id} className="single_item relative border-[#6B6B6B] flex flex-col gap-3 border-b p-4">
                                            <div className='flex gap-3 relative overflow-hidden'>
                                                <div className="cart_image w-[80px] h-[80px] aspect-[1/1]">
                                                    <CustomImage alt="" src={item.product_thumbnail_image} width={80} height={80} className="w-full" />
                                                </div>
                                                <div className="product_info_cart flex flex-col flex-1 gap-3">
                                                    <h2 className='title text-neutral-black font-medium text-sm md:text-lg'>{item.product_name}</h2>
                                                    <div className="price_area flex items-center gap-2 justify-between">
                                                        <div className="price flex items-center gap-2 justify-center">
                                                            <div className="regular_price text-primary text-sm font-bold">{item.currency_symbol}{item.price}</div>
                                                            <div className="sale_price text-arival_var relative line-through">
                                                                {item.currency_symbol}{item.previous_price}
                                                            </div>
                                                            {item?.discount_in_percent && item?.discount_in_percent > 0 && (
                                                                <div className="offer max-w-max bg-accent-lightPink mx-auto rounded-[12px] px-[15px] py-[6px] text-[12px]">
                                                                    <span>{item.discount_in_percent}% OFF</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {item?.variation && (
                                                        <div>
                                                            <h4>Variation: {item?.variation}</h4>
                                                        </div>
                                                    )}
                                                    <div className="action_area flex items-center gap-3">
                                                        <div className='flex items-center w-full md:max-w-max gap-3'>
                                                            <span className='text-base text-neutral-black'>Quantity:</span>
                                                            <div className="qty_input_area flex items-center w-1/2 md:max-w-max flex-1">
                                                                <Button onClick={() => decreaseQty(item.id, item.quantity)} className='w-[45px] h-[35px] !bg-p_light !rounded-l-[5px] !rounded-r-[0px] hover:text-white !p-0 flex items-center justify-center transition-all duration-300 ease-in-out'>
                                                                    <MinusIcon className={`!text-primary hover:!text-white transition-all duration-300 ease-in-out`} />
                                                                </Button>
                                                                <div className='w-[45px] h-[35px] flex items-center justify-center bg-primary text-center text-white'>{item.quantity}</div>
                                                                <Button onClick={() => increaseQty(item.id, item.quantity)} className='w-[45px] h-[35px] !bg-p_light !rounded-r-[5px] !rounded-l-[0px] hover:text-white !p-0 flex items-center justify-center transition-all duration-300 ease-in-out'>
                                                                    <PlusIcon className={`!text-primary hover:!text-white transition-all duration-300 ease-in-out`} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item_close relative cursor-pointer" onClick={() => handleDelete(item.id)}>
                                                    <X className='text-[#6B6B6B]' />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex sticky flex-col right-0 left-0 bottom-0 bg-white">
                        <h3 className='text-[18px] text-neutral-black font-semibold px-4 mt-4 bg-white'>Cart Details</h3>
                        <div className="details_cart flex px-4 py-1.5 flex-col gap-2 bg-white">
                            <div className="cart_details_item flex justify-between">
                                <div className='text-neutral-black text-base'>Product Price:</div>
                                <div className='text-neutral-black text-base'>{summary && summary?.sub_total}</div>
                            </div>

                            <div className="cart_details_item flex justify-between">
                                <div className='text-neutral-black text-base'>Quantity of product:</div>
                                <div className='text-neutral-black text-base'>{totalQuantity}</div>
                            </div>
                        </div>

                        <div className="cart_details_item flex justify-between pt-3 p-4 bg-white">
                            <div className='text-neutral-black text-lg font-semibold'>Total amount:</div>
                            <div className='text-primary text-lg font-semibold'>{summary && summary?.grand_total}</div>
                        </div>
                        <div className="flex flex-col flex-1 flex-shrink flex-basis-0">
                            <div className="flex p-2 flex-col flex-1 flex-shrink flex-basis-0">
                                <Button onClick={handleCheckout} className="w-full text-center rounded-[10px] py-[6px] sm:py-[10px] !text-[18px] capitalize bg-primary btn relative flex btn-solid btn-md btn-solid-primary justify-center font-medium">
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
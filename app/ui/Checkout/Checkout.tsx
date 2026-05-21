"use client";
import Container from "@/app/ui/Container/Container";
import CustomInput from "@/app/ui/CustomInput";
import { Button } from "@/components/ui/button";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { useEffect, useState, useRef } from "react";
import CustomImage from "../CustomImage/CustomImage";
import axios from "axios";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import AddressForm from "./AddressForm";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { get_setting } from "@/lib/utils";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import Link from "next/link";
import Script from 'next/script';

export default function Checkout({ total_point, data, addressList }: any) {
  const router = useRouter();
  const session = useSession();
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [pointLoading, setPointLoading] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");
  const [shipping, setShipping] = useState<number>(0);
  const { setCartData, cartData, totalQuantity, temp_user_id } =
    useCartStoreData();
  const cookieValue = cookieStore((state) => state.cookieValue);
  const { settingValue } = cookieStore((state) => ({
    settingValue: state.settingValue,
  }));

  const [summary, setSummary] = useState<any>({
    sub_total: 0,
    discount: 0,
    grand_total: 0,
    shipping_cost: 0,
  });
  const [country, setCountry] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [state, setState] = useState<any[]>([]);

  const [citiesBil, setCitiesBil] = useState<any[]>([]);
  const [stateBil, setStateBil] = useState<any[]>([]);

  const [payment_types, setPayment_types] = useState<[]>([]);
  const [selectedPayment, setSelectedPayment] =
    useState<string>("cash_payment");
  const [coupon, setCoupon] = useState<string>("");
  const [openPromo, setOpenPromo] = useState<boolean>(false);
  const [formData, setFormData] = useState(
    (data && data) ||
      ({
        country: "",
        fullName: "",
        email: "",
        phone: "",
        cities: "",
        address: "",
        saveAddress: false,
        term: true,
        address_type: 1,
        shipping: shipping,
        fastDelivery: false,
      } as any)
  );
  const [selectedAddress, setSelectedAddress] = useState<any>(
    (data && data) || null
  );

  const [billingAddress, setBillingAddress] = useState({
    country: "",
    fullName: "",
    email: "",
    phone: "",
    cities: "",
    address: "",
  } as any);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleShipping = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Don't allow shipping selection if free shipping is applied
    if (summary?.free_shipping_applied) {
      setShipping(0);
      setFormData((prev: any) => ({
        ...prev,
        shipping: 0,
      }));
      return;
    }
    const { value } = e.target;
    setShipping(Number(value));
    setFormData((prev: any) => ({
      ...prev,
      shipping: Number(value),
    }));
  };

  useEffect(() => {
    // Set shipping to 0 if free shipping is applied
    if (summary?.free_shipping_applied) {
      setShipping(0);
      setFormData((prev: any) => ({
        ...prev,
        shipping: 0,
      }));
      return;
    }
    
    if (formData.state_id == 4122) {
      setShipping((prev: number) =>
        prev !== Number(inside_dhaka?.value)
          ? Number(inside_dhaka?.value)
          : prev
      );
    } else {
      setShipping((prev: number) =>
        prev !== Number(outSide_dhaka?.value)
          ? Number(outSide_dhaka?.value)
          : prev
      );
    }
  }, [formData.state_id, summary?.free_shipping_applied]);

  useEffect(() => {
    if (session?.data?.user) {
      setFormData({
        ...formData,
        fullName: session?.data?.user?.name,
        email: session?.data?.user?.email,
      });
    }
  }, [session?.data?.user]);

  useEffect(() => {
    if (cookieValue || temp_user_id) {
      getSummary();
    }
  }, [cookieValue, temp_user_id]);

  useEffect(() => {
    getCountry();
    getPayment_types();
  }, []);
  // address form
  useEffect(() => {
    const fetchStates = async () => {
      if (formData?.country_id) {
        const result = await states_by_country(formData?.country_id);
        setState(result as any);
      }
    };

    fetchStates();
  }, [formData?.country_id]);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData?.country_id) {
        if (formData?.state_id) {
          const result = await getCities(formData?.state_id);
          setCities(result as any);
        }
      }
    };
    fetchCities();
  }, [formData?.state_id]);
  // address form

  // billing address form
  useEffect(() => {
    const fetchStates = async () => {
      if (billingAddress?.country_id) {
        const result = await states_by_country(billingAddress?.country_id);
        setStateBil(result as any);
      }
    };

    fetchStates();
  }, [billingAddress?.country_id]);

  useEffect(() => {
    const fetchCities = async () => {
      if (billingAddress?.country_id) {
        if (billingAddress?.state_id) {
          const result = await getCities(billingAddress?.state_id);
          setCitiesBil(result as any);
        }
      }
    };
    fetchCities();
  }, [billingAddress?.state_id]);

  // pointApply
  const pointApply = async () => {
    setPointLoading(true);
    try {
      const response: any = await axios.post(`/api/club/point/apply_point`, {
        user_id: cookieValue?.user?.id || temp_user_id,
        shipping_price: shipping,
      });
      if (response?.data.result) {
        toast.success(response?.data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#8E2581", secondary: "#fff" },
        });
        getSummary();
        setPointLoading(false);
      } else {
        toast.error(response?.data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#8E2581", secondary: "#fff" },
        });
      }
      setPointLoading(false);
      router.push("/checkout");
    } catch (error) {
      console.log(error);
      setPointLoading(false);
    }
  };
  // pointRemove
  const pointRemove = async () => {
    setPointLoading(true);
    try {
      const response: any = await axios.post(`/api/club/point/remove_point`, {
        user_id: cookieValue?.user?.id || temp_user_id,
      });
      if (response?.data.result) {
        toast.success(response?.data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#8E2581", secondary: "#fff" },
        });
        getSummary();
      } else {
        toast.error(response?.data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#8E2581", secondary: "#fff" },
        });
      }
      router.push("/checkout");
      setPointLoading(false);
    } catch (error) {
      console.log(error);
      setPointLoading(false);
    }
  };

  // couponApply
  const couponApply = async () => {
    if (coupon == "") {
      setCouponError("Coupon is not empty");
      return false;
    }
    setCouponLoading(true);
    try {
      const response: any = await axios.post(`/api/coupon/apply`, {
        user_id: cookieValue?.user?.id ?? null,
        temp_user_id: !cookieValue?.user?.id ? temp_user_id : null,
        coupon_code: coupon,
      });
      console.log(response);
      if (response?.data.result) {
        getSummary();
      }
      setCouponError(response?.data.message);
      setCouponLoading(false);
    } catch (error) {
      console.log(error);
      setCouponLoading(false);
    }
  };
  // couponRemove
  const couponRemove = async () => {
    if (coupon == "") {
      setCouponError("Coupon is not empty");
      return false;
    }
    setCouponLoading(true);
    try {
      const response: any = await axios.post(`/api/coupon/remove`, {
        user_id: cookieValue?.user?.id || temp_user_id,
      });
      console.log(response);
      if (response?.data.result) {
        getSummary();
      }
      setCouponError(response?.data.message);
      setCouponLoading(false);
    } catch (error) {
      console.log(error);
      setCouponLoading(false);
    }
  };

  // summary
  const getSummary = async () => {
    try {
      const response: any = await axios.post(`/api/cart/summary`, {
        user_id: cookieValue?.user?.id ?? temp_user_id,
      });

      setSummary(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // getCountry
  const getCountry = async () => {
    try {
      const response: any = await axios.get(`/api/country`);
      setCountry(response.data.data);
      setFormData({
        ...formData,
        country_id: response.data.data[0]?.id,
        country_name: response.data.data[0]?.name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // states-by-country
  const states_by_country = async (id: any) => {
    try {
      const response: any = await axios.post(`/api/states-by-country/`, {
        id: id,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  // getCountry
  const getCities = async (id: any) => {
    try {
      const response: any = await axios.post(`/api/cities-by-state`, {
        id: id,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  // getCountry
  const getPayment_types = async () => {
    try {
      const response: any = await axios.get(`/api/payment-types`);

      setPayment_types(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const inside_dhaka = get_setting(settingValue, "flat_rate_shipping_cost");
  const outSide_dhaka = get_setting(settingValue, "shipping_cost_admin");
  useEffect(() => {
    setShipping(Number(inside_dhaka?.value));
  }, [inside_dhaka]);

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.country_id) newErrors.country_id = "Country is required";
    if (!formData.city_id) newErrors.city_id = "City is required";
    if (!formData.state_id) newErrors.state_id = "State is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, you can proceed with submission
      console.log("Form is valid. Submitting:", formData);
      // Add your submission logic here
      await handle_order();
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const handle_order = async () => {
    setLoading(true);
    try {
      const orderData = {
        user_id: cookieValue?.user?.id || temp_user_id,
        ...formData,
        billing_address: billingAddress,
        shipping,
        payment_type: selectedPayment,
      };

      const response = await axios.post("/api/order", orderData);

      const data = response.data;

      if (data.result && selectedPayment == "sslcommerz_payment") {
        const paymentData = {
          payment_type: "cart_payment",
          combined_order_id: data.combined_order_id,
          amount: Number(summary?.grand_total_value) + (summary?.free_shipping_applied ? 0 : Number(shipping)),
          user_id: cookieValue?.user?.id || temp_user_id,
        };
        const paymentRes: any = await axios.post(
          "/api/order/sslcommerz",
          paymentData
        );
        if (paymentRes.data.result) {
          window.location.href = paymentRes.data.url;
        }
      }
      if (data.result && selectedPayment == "cash_payment") {
        router.push(`/order/success?order_id=${data.combined_order_id}`);
      }
      if (!data.result) {
        toast.error(data.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#A020F0", secondary: "#fff" },
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const didPushRef = useRef(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      Array.isArray(cartData) &&
      cartData.length > 0
    ) {
      if (didPushRef.current) return;

      (window as any).dataLayer = (window as any).dataLayer || [];

      const items = cartData.flatMap((parentItem: any) =>
        parentItem.cart_items.map((item: any) => {
          const price =
            typeof item.price === 'string'
              ? parseFloat(item.price.replace(/[৳,]/g, '') || '0')
              : item.price;

          return {
            item_id: item.product_id,
            item_name: item.product_name,
            quantity: item.quantity,
            price: price,
            item_variant: item.variation,
          };
        })
      );

      // ✅ Calculate total value from items
      const totalValue = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      (window as any).dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'BDT',
          value: totalValue,
          items,
        },
      });

      didPushRef.current = true;
    }
  }, [cartData]);


  return (
    <Container className="overflow-x-hidden max-w-full">

      {cartData && cartData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 md:p-4 overflow-x-hidden">
          <div className="p-4 md:p-6 bg-white shadow-md rounded-md overflow-x-hidden">
            <div className="flex flex-wrap justify-between ">
              <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
              {addressList && addressList.length > 0 && (
                <div>
                  <Button onClick={() => setIsAddressModal(!isAddressModal)}>
                    Use Other Address
                  </Button>
                </div>
              )}
              {session?.data?.user === null ? (
                ""
              ) : (
                <Link
                  className="uppercase bg-primary px-4 rounded-lg py-2 flex items-center justify-center text-white "
                  href="/login"
                >
                  Login
                </Link>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <AddressForm
                errors={errors}
                setErrors={setErrors}
                formData={formData}
                setFormData={setFormData}
                country={country}
                state={state}
                cities={cities}
              />

              {/* Save Address */}
              <div className="mb-4 flex items-center">
                <label className="flex items-center space-x-2 text-base">
                  <input
                    type="checkbox"
                    className="form-checkbox text-primary"
                    onChange={handleCheckboxChange}
                    name="saveAddress"
                  />
                  <span>Save this address</span>
                </label>
              </div>

              {/* Payment Start */}
              <div className="p-4 border-2 border-purple-300 rounded-md">
                <div className="flex justify-start gap-3 flex-wrap items-center">
                  {payment_types.map((item: any) => (
                    <div
                      key={item.payment_type}
                      onClick={() => setSelectedPayment(item.payment_type)}
                      className={`w-[100px] md:w-[100px] flex-shrink-0 cursor-pointer rounded-lg border-[1px] p-2 ${
                        selectedPayment === item.payment_type
                          ? "border-[2px] border-[#1A0000] "
                          : "border-[#6B6B6B]"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 mb-2 mx-auto"
                      />
                      <span className="text-center text-xs md:text-sm block">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center">
                  <label className="flex items-center space-x-2 text-base">
                    <input
                      type="checkbox"
                      className="form-checkbox text-primary"
                      onChange={handleCheckboxChange}
                      name="term"
                      checked={formData.term}
                    />
                    <span>
                      I agree to the terms and conditions, return policy &
                      privacy policy
                    </span>
                  </label>
                </div>
              </div>
              {/* Payment End */}

              <h2 className="text-lg font-semibold mb-4 mt-4">
                Billing Address
              </h2>

              {/* Radio Group */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="same_address"
                    name="address_type"
                    value={1}
                    onChange={handleInputChange}
                    className="form-radio text-primary"
                    checked={Number(formData.address_type) === 1}
                  />
                  <label htmlFor="same_address" className="text-sm font-medium">
                    Same As Delivery Address
                  </label>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <input
                    checked={Number(formData.address_type) === 2}
                    type="radio"
                    id="different_address"
                    name="address_type"
                    value={2}
                    onChange={handleInputChange}
                    className="form-radio text-primary"
                  />
                  <label
                    htmlFor="different_address"
                    className="text-sm font-medium"
                  >
                    Use Different Address
                  </label>
                </div>
                {Number(formData.address_type) === 2 && (
                  <AddressForm
                    formData={billingAddress}
                    setFormData={setBillingAddress}
                    country={country}
                    state={stateBil}
                    cities={citiesBil}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center mt-6 gap-6">
                <Link
                  href={"/"}
                  className="w-1/2 flex justify-center items-center border border-primary text-primary rounded-[30px] hover:bg-primary/10"
                >
                  RETURN TO SHOP
                </Link>
                <Button
                  type="submit"
                  disabled={loading}
                  // onClick={handle_order}
                  className="bg-primary w-1/2 text-white hover:bg-primary-dark rounded-[30px]"
                >
                  {selectedPayment === "cash_payment" ? "Order Now" : "Pay Now"}
                  {/* PAY NOW{" "} */}
                  {loading && (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Cart Summary Start */}
          <div className="p-4 bg-[#F6E9FE] rounded-md text-gray-800 space-y-6 sticky h-fit top-0 overflow-x-hidden">
            {/* Shipping Method */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Shipping Method</h2>
              {summary?.free_shipping_applied ? (
                <div className="bg-[#F6E9FE] border-2 border-primary rounded-md p-3">
                  <p className="text-primary font-semibold text-base">
                    🎉 FREE SHIPPING APPLIED
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    Your order qualifies for free shipping!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 border-b-[1px] pb-2 text-base">
                    <input
                      checked={
                        formData.state_id == "4122"
                      }
                      type="radio"
                      name="shipping"
                      value={Number(inside_dhaka?.value)}
                      className="form-radio text-primary"
                      onChange={handleShipping}
                    />
                    <span>Inside Dhaka - ৳{Number(inside_dhaka?.value)}</span>
                  </label>
                  <label className="flex items-center space-x-2 border-b-[1px] pb-2 text-base">
                    <input
                      checked={
                        formData.state_id != "4122"
                      }
                      type="radio"
                      name="shipping"
                      value={Number(outSide_dhaka?.value)}
                      className="form-radio text-primary"
                      onChange={handleShipping}
                    />
                    <span>Outside Dhaka - ৳{Number(outSide_dhaka?.value)}</span>
                  </label>
                </div>
              )}
            </div>
            {/* Cart Summary */}
            {/* Order Summary */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="space-y-1 flex flex-col gap-2 ">
                {total_point > 0 && (
                  <div className="flex justify-between  text-base items-center font-bold rounded-md relative mb-3 ">
                    <span>Club Point Balance :</span>
                    <div className="relative">
                      <span>৳{total_point}</span>
                      {summary?.point_applied ? (
                        <span
                          onClick={pointRemove}
                          className="text-sm left-[-15px] py-[1px] px-[6px] bottom-[-18px] absolute bg-red-600 cursor-pointer text-white font-semibold  rounded-lg shadow-md hover:bg-red-900 transition duration-300"
                        >
                          Remove
                        </span>
                      ) : (
                        <span
                          onClick={pointApply}
                          className=" text-sm left-[-30px] py-[1px] px-[6px] bottom-[-18px] absolute bg-accent-lightPink cursor-pointer text-white font-semibold  rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                        >
                          Redeem
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex justify-between font-medium text-base items-center">
                  <span>Subtotal :</span>
                  <span>{summary && summary?.sub_total}</span>
                </div>
                <div className="flex justify-between font-medium text-base items-center">
                  <span>Delivery Charge :</span>
                  <span>
                    {summary?.free_shipping_applied ? (
                      <span className="text-primary font-semibold">FREE</span>
                    ) : (
                      shipping
                    )}
                  </span>
                </div>
                {summary?.free_shipping_applied && (
                  <div className="bg-[#F6E9FE] border-2 border-primary rounded-md p-3 text-sm">
                    <p className="text-primary font-semibold">
                      🎉 YOU'VE SCORED FREE SHIPPING. IT'S ON US!
                    </p>
                  </div>
                )}
                {!summary?.free_shipping_applied && summary?.amount_needed_for_free_shipping > 0 && (
                  <div className="bg-[#F6E9FE] border-2 border-purple-300 rounded-md p-3 text-sm">
                    <p className="text-primary font-semibold">
                      SPEND {summary?.amount_needed_for_free_shipping} MORE AND SHIPPING ON US!
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Free shipping over {summary?.free_shipping_threshold} order
                    </p>
                  </div>
                )}
                <div className="flex justify-between font-medium text-base items-center">
                  <span>Discount :</span>
                  <span> {summary && summary?.discount} </span>
                </div>
                <div className="flex flex-col font-medium text-base  border-b-[1px] pb-2 cursor-pointer ">
                  <div
                    className="flex items-center space-x-1  "
                    onClick={() => setOpenPromo(!openPromo)}
                  >
                    <span>Promo Code</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.65 12.65C9.75 12.75 9.86667 12.8 10 12.8C10.1333 12.8 10.25 12.75 10.35 12.65L13.15 9.85C13.3167 9.68333 13.3583 9.5 13.275 9.3C13.1917 9.1 13.0333 9 12.8 9H7.2C6.96667 9 6.80833 9.1 6.725 9.3C6.64167 9.5 6.68333 9.68333 6.85 9.85L9.65 12.65ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                        fill="#2B2B2B"
                      />
                    </svg>
                  </div>
                  {openPromo && (
                    <div className="flex p-4 flex-col">
                      <div>
                        <label className="group w-full flex items-center gap-x-2 border border-neutral-300 focus-within:border-black h-12 px-3 rounded-md pl-2 pr-1 ">
                          <div className="flex-1 flex-col">
                            <CustomInput
                              disabled={summary?.coupon_applied}
                              type="text"
                              value={coupon}
                              onChange={(e) => {
                                setCoupon(e.target.value);
                                setCouponError("");
                              }}
                              className=" flex-1 "
                              placeholder="Enter coupon code"
                            />
                          </div>

                          <div className="center">
                            {summary?.coupon_applied ? (
                              <Button
                                onClick={couponRemove}
                                disabled={couponLoading}
                                title="label"
                                type="button"
                                className="btn relative flex  !bg-red-500 rounded-md"
                              >
                                <div className="btn-label">
                                  {" "}
                                  {couponLoading ? "Remove..." : "Remove"}{" "}
                                </div>
                              </Button>
                            ) : (
                              <Button
                                onClick={couponApply}
                                disabled={couponLoading}
                                title="label"
                                type="button"
                                className="btn relative flex  bg-primary rounded-md"
                              >
                                <div className="btn-label">
                                  {" "}
                                  {couponLoading ? "Apply..." : "Apply"}{" "}
                                </div>
                              </Button>
                            )}
                          </div>
                        </label>
                        {couponError && (
                          <p className="text-red-500 text-sm mt-1">
                            {couponError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-base items-center font-semibold text-primary">
                  <span>Total Amount:</span>
                  <span>
                    ৳
                    {summary &&
                      Number(summary?.grand_total_value) + (summary?.free_shipping_applied ? 0 : Number(shipping))}
                  </span>
                </div>
              </div>
            </div>
            {/* cart start  */}{" "}
            <div className="cart_items w-full flex flex-col overflow-hidden">
              {/* item  */}
              {cartData &&
                cartData?.map((parentItem: any, index: any) => (
                  <div key={index}>
                    {parentItem.cart_items.map((item: any, index: any) => (
                      <div
                        key={index}
                        className="single_item relative   border-[#6B6B6B]  flex flex-col gap-3 border-b p-4 "
                      >
                        <div className="flex gap-3 relative overflow-hidden">
                          <div className="cart_image w-[80px] h-[80px] aspect-[1/1] ">
                            <CustomImage
                              alt=""
                              src={item.product_thumbnail_image}
                              width={80}
                              height={80}
                              className="w-full"
                            />
                          </div>
                          <div className="product_info_cart flex flex-col flex-1 gap-3 ">
                            <h2 className="title  text-neutral-black font-medium text-lg ">
                              {item.product_name}
                            </h2>
                            <div className="price_area flex items-center gap-2 justify-between  ">
                              <div className="price flex items-center gap-2 justify-center">
                                <div className="regular_price text-primary text-base font-medium">
                                  {item.currency_symbol}
                                  {item.price}
                                </div>
                                <div className="sale_price text-arival_var text-[12px] sm:text-sm relative line-through font-medium">
                                  {item.currency_symbol}
                                  {item.previous_price}
                                </div>

                                {item?.discount_in_percent && (
                                  <div className="offer max-w-max text-primary text-[12px] sm:text-[12px]">
                                    <span>
                                      {item.discount_in_percent}% OFF{" "}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {item?.variation && (
                              <div>
                                <h4>Variation: {item?.variation} </h4>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
          {/* Cart Summary End */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 rounded-lg ">
          <span>Cart is empty. </span>
          <Link className="text-primary underline " href={"/"}>
            RETURN TO SHOP
          </Link>
        </div>
      )}

      {/* selected address modal  */}
      {isAddressModal && (
        <Dialog open={isAddressModal} onOpenChange={setIsAddressModal}>
          <DialogOverlay className="z-[9999999] ">
            <DialogClose className="hidden" />
            <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center z-[99999999]">
              <div className="bg-white relative rounded-lg  ">
                <div
                  onClick={() => setIsAddressModal(false)}
                  className=" cursor-pointer absolute top-2 right-3 "
                >
                  <X className="text-black" />
                </div>
                <div className="bg-white pt-8 p-4 text-center rounded-lg w-full md:w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addressList?.map((item: any) => (
                      <div className="col-span-1 lg:col-span-1  " key={item.id}>
                        <div
                          onClick={() => {
                            setSelectedAddress(item);
                          }}
                          className={` cursor-pointer border p-3 pr-5 rounded mb-3 relative text-left ${
                            selectedAddress?.id === item.id
                              ? "border-primary"
                              : ""
                          } `}
                        >
                          <div>
                            <span className="w-1/2 font-semibold">
                              Address:
                            </span>
                            <span className="ml-2">{item?.address}</span>
                          </div>
                          <div>
                            <span className="w-1/2 font-semibold">
                              Postal code:
                            </span>
                            <span className="ml-2">{item?.postal_code}</span>
                          </div>
                          <div>
                            <span className="w-1/2 font-semibold">City:</span>
                            <span className="ml-2">{item?.city_name}</span>
                          </div>
                          <div>
                            <span className="w-1/2 font-semibold">State:</span>
                            <span className="ml-2">{item?.city_name}</span>
                          </div>
                          <div>
                            <span className="w-1/2 font-semibold">
                              Country:
                            </span>
                            <span className="ml-2">{item?.country_name}</span>
                          </div>
                          <div>
                            <span className="w-1/2 font-semibold">Phone:</span>
                            <span className="ml-2">{item?.phone}</span>
                          </div>
                          {item?.set_default > 0 && (
                            <div className="absolute right-0 bottom-0 pr-2 pb-3">
                              <span className="text-white inline bg-primary rounded-sm py-1 px-2 ">
                                Default
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end ">
                    <div className="outer button_area !m-0 group !w-[230px] hover:!h-[40px] ">
                      <Button
                        disabled={loading}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            ...selectedAddress,
                          });
                          setIsAddressModal(false);
                        }}
                        className=" text-center !w-[228px] font-normal px-4 justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  "
                      >
                        <div className="text_shadow">Select Address</div>
                      </Button>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </DialogOverlay>
        </Dialog>
      )}
    </Container>
  );
}

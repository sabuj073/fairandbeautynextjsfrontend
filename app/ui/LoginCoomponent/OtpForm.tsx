"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { useState } from "react";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { signIn } from "next-auth/react";
import { Button } from "@/app/ui/button";
import { Eye, EyeOff, KeyRound, Loader2, User } from "lucide-react";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import toast from "react-hot-toast";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: " Otp is required",
  }),
});

export function OtpForm({ forget,useEmailOrPhone, formData, referral_code }: any) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [cShowPassword, setCShowPassword] = useState(false);
  const { temp_user_id } = useCartStoreData();
  const [showSignUpForm, setShowSignUpForm] = useState<boolean>(false);
  const [otpInfo, setOtpInfo] = useState<any>(null);
  const [otpResendCode, setResendCode] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [isPendingSignUp, setIsPendingSignUp] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const cookieValue = cookieStore((state) => state.cookieValue);
  const isLoggedIn = !!cookieValue?.user?.id;

  const [formDataSignUp, setFormData] = useState({
    name: "",
    email_or_phone: "",
    password: "",
    confirmPassword: "",
  });

  // otp submit
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setIsPending(true);
    try {
      const response: any = await axios.post(`/api/auth/confirmOtp`, {
        phone: formData?.phone,
        otp_code: data.pin,
      });
      console.log(response?.data);
      if (response?.data?.result) {
        setOtpInfo(response.data);
        setShowSignUpForm(true);
      } else {
        console.log("not",response?.data)
            toast.error(response?.data?.message, {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#A020F0', secondary: '#fff' },
            });
            setIsPendingSignUp(false);
        
        setOtpInfo(response.data);
        setShowSignUpForm(false);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
      setIsPending(false);
      setShowSignUpForm(false);
    }
  }

  // resend otp
  async function onResendCode() {
    setResendCode(null);
    try {
      const response: any = await axios.post(`/api/auth/send_otp`, {
        phone: formData.phone,
      });
      setResendCode(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formDataSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, password, confirmPassword } = formDataSignUp;
    if ((!name && !forget) || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleSubmitSignUp = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsPendingSignUp(true);
    
    if (forget) {
        try {
            const response: any = await axios.post(
                `/api/confirmResetPassword`, {
                    ...formDataSignUp,
                email: useEmailOrPhone ? formData?.phone : formData?.email,
                register_by: useEmailOrPhone ? 'phone' : 'email'
            });
            if (response?.data.result) {
                setIsPendingSignUp(false);
                
                toast.success(response?.data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                await signIn('credentials', {
                    email: useEmailOrPhone ? formData?.phone : formData?.email,
                    password: formDataSignUp.password,
                    temp_user_id: temp_user_id
                });

            } else {
                toast.error(response?.data?.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setIsPendingSignUp(false);
            }
        } catch (error) {
            setIsPendingSignUp(false);
        }
    } else {
    try {
      const response: any = await axios.post(`/api/auth/signup`, {
        ...formDataSignUp,
        email_or_phone: formData?.phone,
        register_by: "phone",
        referral_code: referral_code,
      });
      console.log(response);
      if (response?.data.result) {
        console.log(response?.data);
        setIsPendingSignUp(false);
        await signIn("credentials", {
          email: formDataSignUp.email_or_phone,
          password: formDataSignUp.password,
          temp_user_id: temp_user_id,
          redirect: true,
          callbackUrl: "/user/dashboard",
        });
      } else {
        setErrorMessage(
          response?.data.message || "Login failed. Please try again."
        );
        setIsPendingSignUp(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setIsPendingSignUp(false);
    } finally {
      setIsPendingSignUp(false);
    }
}
  };

  return (
    <>
      {showSignUpForm ? (
        <>
          <form onSubmit={handleSubmitSignUp}>
            <div className="w-full flex flex-col gap-4">
              {!isLoggedIn && (
                <input
                  value={temp_user_id ?? ""} // Default to an empty string if temp_user_id is undefined
                  type="hidden"
                  name="temp_user_id"
                />
              )}
              {
                !forget &&
              
              <div className="relative h-[42px]">
                <input
                  className="peer block w-full  rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formDataSignUp.name}
                  onChange={handleInputChange}
                  required
                />
                <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              }
              <div className="relative h-[42px]">
                <input
                  className="peer block w-full  rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter password"
                  value={formDataSignUp.password}
                  onChange={handleInputChange}
                  required
                />
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-gray-500 text-black" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-500 text-black" />
                  )}
                </button>
              </div>

              <div className="relative h-[42px]">
                <input
                  className="peer block w-full  rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="confirmPassword"
                  type={`${cShowPassword ? "text" : "password"}`}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formDataSignUp.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                <button
                  type="button"
                  onClick={() => setCShowPassword(!cShowPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {cShowPassword ? (
                    <Eye className="h-5 w-5 text-gray-500 text-black" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-500 text-black" />
                  )}
                </button>
              </div>
              {
                errorMessage &&
             
              <div className=" text-red-600 ">
              {errorMessage}
              </div>
               }
              <div className="flex items-center justify-between  ">
                <Button
                  type="submit"
                  className=" w-full px-10 flex items-center justify-center uppercase"
                  disabled={isPendingSignUp}
                >
                  Submit{" "}
                  {isPendingSignUp && (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full ">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  {otpInfo?.result !== true && (
                    <>
                      <FormLabel className="text-neutral-black text-sm">
                        Confirm the mobile otp
                      </FormLabel>
                      <FormControl>
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </>
                  )}
                </FormItem>
              )}
            />
            {otpResendCode && otpResendCode?.result && (
              <div className=" text-red-700 text-sm ">
                <span>{otpResendCode?.message}</span>
              </div>
            )}
            {otpInfo?.result !== true && (
              <div className="flex justify-center flex-col gap-2 mt-3">
                <div
                  onClick={onResendCode}
                  className="flex justify-end text-neutral-black cursor-pointer "
                >
                  <span>Send again the OTP code</span>
                </div>
                <Button
                  disabled={isPending}
                  className=" flex justify-center items-center px-10 uppercase "
                >
                  {isPending ? "Submit..." : "Submit"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/app/ui/button';
import { Loader2, Phone, } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import {  useSession } from 'next-auth/react';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import TitleLoginHeading from './LoginCoomponent/TitleLoginHeading';
import { OtpForm } from './LoginCoomponent/OtpForm';
import SocialSection from './LoginCoomponent/SocialSection';
import toast from 'react-hot-toast';

export default function SigninUpForm({forget, setActiveForm }: any) {
  const router = useRouter();
  const { setTempUserId, temp_user_id } = useCartStoreData((state) => ({
    setTempUserId: state.setTempUserId,
    temp_user_id: state.temp_user_id,
  }));
  const { data: session } = useSession()
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email_or_phone: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // State for validation errors and submission status
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [activeOtpForm, setActiveOtpForm] = useState(false);
  const [user_info, setUser_info] = useState<any>(null);
  const cookieValue = cookieStore((state) => state.cookieValue);
  const isLoggedIn = !!cookieValue?.user?.id;
  const [useEmailOrPhone, setUseEmailOrPhone] = useState(true)

  const params = useSearchParams()
  let callbackUrl = params.get('redirect') || '/user/dashboard'
  let referral_code = params.get('referral_code') || ''

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Basic form validation
  const validateForm = () => {
    const { name, phone, email_or_phone, password, confirmPassword } = formData;

    if (!phone) {
      setErrorMessage('Phone are required.');
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (cookieValue && cookieValue.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session, cookieValue])

  // Handle form submission
  const handleOtpSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsPending(true);
    try {
      const response: any = await axios.post(
        `/api/auth/send_otp`, {
        phone: formData.phone
      });
      if (response?.data.result) {
        setActiveOtpForm(true)
        setIsPending(false);
        toast.success(response?.data?.message, {
          style: { color: '#404042', fontWeight: 600 },
          iconTheme: { primary: '#A020F0', secondary: '#fff' },
      });
      } else {
        toast.error(response?.data?.message, {
          style: { color: '#404042', fontWeight: 600 },
          iconTheme: { primary: '#A020F0', secondary: '#fff' },
      });
        setIsPending(false);
        setActiveOtpForm(false);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setIsPending(false);
      setActiveOtpForm(false);
    } finally {
      setIsPending(false);
    }
  };


  return (

    <div className="flex-1 bg-gray-50 px-6 pb-4 pt-8 flex-col gap-6 flex bg-login rounded-[30px] lg:rounded-r-[0] ">
      <TitleLoginHeading title={` ${forget ? 'Forget password' : "Sign Up with"} `} />
      {
        activeOtpForm ? <OtpForm
          forget={forget}
          useEmailOrPhone={useEmailOrPhone}
          formData={formData}
          user_info={user_info}
          referral_code={referral_code}
          redirectPath={callbackUrl}
        />
        : <>


          <div className="w-full flex flex-col gap-2">


            <div className="relative h-[42px]">
              <input
                className="peer block w-full  rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="phone"
                type="text"
                name="phone"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                autoComplete=''
              />
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>


            {errorMessage && (
              <div className="flex  items-start" aria-live="polite" aria-atomic="true">
                {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                <p className="text-sm text-red-500 m-0 p-0">{errorMessage}</p>
              </div>
            )}
            <div className='flex items-center justify-between  '>
              <Button
                onClick={handleOtpSend}
                className=" w-full px-10 flex items-center justify-center uppercase"
                disabled={isPending}
              >
                Send Authentication  Number {isPending && <Loader2 className="animate-spin h-5 w-5 text-white" />}
              </Button>
            </div>

          </div>
          {
            !isLoggedIn && (
              <input
                value={temp_user_id ?? ""}
                type="hidden"
                name="temp_user_id"
              />
            )
          }


          <div className="social_login flex-col flex items-center gap-6 justify-center">
            <h3 className='text-neutral-black text-base'>OR</h3>
            <h3 className='text-neutral-black text-base'>
              <span className='font-bold'>Login</span> with Other Accounts
            </h3>
            <div className='w-full grid grid-cols-1 xl:grid-cols-1 items-center gap-4'>
              <SocialSection />
            </div>

            <div className='w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-4'>
              <div className='text-center'>Don’t have an account?</div>
              <Button type='button' className='w-full justify-center items-center' onClick={() => setActiveForm(0)}>
                Sign In
              </Button>
            </div>
          </div>


        </>
      }

    </div>

  );
}

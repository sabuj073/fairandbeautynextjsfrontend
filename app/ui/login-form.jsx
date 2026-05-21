"use client";

import { useState } from "react";
import Image from "next/image";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { signIn } from "next-auth/react";
import FormHeader from "./FormHeader";
import SigninUpForm from "./signup-form";
import axios from "axios";
import LoginFormAction from "./LoginForm";

export default function LoginForm({ reg,forget }) {
  const [activeForm, setActiveForm] = useState(reg || forget ? 1 : 0);
  const { temp_user_id } = useCartStoreData((state) => ({
    setTempUserId: state.setTempUserId,
    temp_user_id: state.temp_user_id,
  }));
  const cookieValue = cookieStore((state) => state.cookieValue);
  const isLoggedIn = !!cookieValue?.user?.id;
  const [useEmailOrPhone, setUseEmailOrPhone] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    temp_user_id: temp_user_id,
  });

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    setIsPending(true);

    try {
      const { data } = await axios.post(`/api/auth/login`, formData);

      if (data?.result) {
        await signIn("credentials", formData);
      }
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Invalid credentials");
      setIsPending(false);
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = () => {
    const { email, password } = formData;

    if (!email && !useEmailOrPhone) {
      setErrorMessage("Phone are required.");
      return false;
    }

    if (!password) {
      setErrorMessage("Password are required.");
      return false;
    }
    return true;
  };

  return (
    <>
      <FormHeader setActiveForm={setActiveForm} activeForm={activeForm} />
      <div className="grid grig-cols-1 lg:grid-cols-2  w-full ">
        {activeForm === 0 && (
          <LoginFormAction
            handleInputChange={handleInputChange}
            useEmailOrPhone={useEmailOrPhone}
            formData={formData}
            isLoggedIn={isLoggedIn}
            temp_user_id={temp_user_id}
            setUseEmailOrPhone={setUseEmailOrPhone}
            handleLogin={handleLogin}
            isPending={isPending}
            setActiveForm={setActiveForm}
            errorMessage={errorMessage}
          />
        )}
        {activeForm === 1 && <SigninUpForm  setActiveForm={setActiveForm} forget={forget} />}

        <div className="welcome hidden lg:flex flex-col items-center gap-[30px] justify-center bg-login_right py-[55px] px-[28px]  rounded-[30px] lg:rounded-l-[0] ">
          <h2 className="text-neutral-black text-[60px]">Welcome To</h2>
          <Image
            src="/login_logo.svg"
            width={507}
            height={40}
            alt="Login"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
}

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { Button } from "../button";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";

export default function AffiliateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm() as any;
  const [loading,setLoading] = useState<boolean>(false)
  const session = useSession() as any;
  const router = useRouter()
  const { setTempUserId, temp_user_id } = useCartStoreData();
  const formData = [
    { type: "text", label: "Your name" },
    { type: "text", label: "Email" },
    { type: "text", label: "Full Address" },
    { type: "text", label: "Phone Number" },
    { type: "text", label: "How will you affiliate?" },
  ];
  const password = watch("password");

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
        const response: any = await axios.post(
            `/api/affiliate/store`,
            {
                ...data,
                id: session?.data?.user?.id,
                
            }
        );
        if (response?.data.result) {
            await signIn('credentials', {
                email:data?.phone,
                password:data?.password,
                temp_user_id:temp_user_id,
                redirect: false, 
            });
           
            toast.success(response?.data.message, {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#8E2581', secondary: '#fff' },
            });
            router.push(routes.user_affiliate)

        } else {
            toast.error(response?.data.message, {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#8E2581', secondary: '#fff' },
            });
        }
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }

  };

  //   renderFormField
  const renderFormField = (element: any, index: any) => {
    if (element.type === "text") {
      return (
        <div key={index} className="mb-3">
          <label className="block text-sm font-medium mb-2">
            {element.label}
          </label>
          <CustomInput
            type="text"
            {...register(`element_${index}`, {
              required: `${element.label} is required`,
            })}
            placeholder={element.label}
            className="w-full"
          />
          {errors[`element_${index}`] && (
            <p className="text-red-600">{errors[`element_${index}`].message}</p>
          )}
        </div>
      );
    }

  };

  return (
    <div>
      <div className="welcome hidden lg:flex flex-col items-center gap-[30px] justify-center bg-login_right py-[55px] px-[28px] rounded-[30px]">
        <h2 className="text-neutral-black text-xl">Apply Affiliate</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card_box flex flex-col gap-4 w-full  "
        >
          

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
            <h3>User Info</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">Name</label>
                <CustomInput
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Name"
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <CustomInput
                  type="number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Phone number is not valid",
                    },
                  })}
                  placeholder="Phone number"
                  className="w-full"
                />
                {errors.phone && (
                  <p className="text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <CustomInput
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Password"
                  className="w-full"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <CustomInput
                  type="password"
                  {...register("password_confirmation", {
                    required: "Confirm Password is required",
                    validate: (value: any) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Password confirmation"
                  className="w-full"
                />
                {errors.password_confirmation && (
                  <p className="text-red-600">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
                <h3>Verification Form</h3>
            {formData.map((element, index) => renderFormField(element, index))}
            </div>
          </div>

         
          <div className='flex items-center justify-between '>

              <Button type="submit" className=" w-full px-10 flex items-center uppercase justify-center " disabled={loading}>
                Submit
              </Button>
            </div>
        </form>
      </div>
    </div>
  );
}

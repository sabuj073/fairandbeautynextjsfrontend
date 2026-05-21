import { Button } from "@/app/ui/button";
import { ExpandIcon, Eye, EyeOff, KeyIcon, Phone } from "lucide-react";
import SocialSection from "./LoginCoomponent/SocialSection";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginForm({
  handleInputChange,
  formData,
  isLoggedIn,
  temp_user_id,
  setUseEmailOrPhone,
  useEmailOrPhone,
  handleLogin,
  isPending,
  setActiveForm,
  errorMessage,
  cookieValue,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex-1  bg-gray-50 px-6 pb-8 pt-8  flex-col gap-6 flex bg-login rounded-[30px] lg:rounded-r-[0] ">
        <div className="login_header flex items-center justify-center pb-3 border-b-[2px] border-neutral-black ">
          <h3 className="text-2xl text-neutral-black font-semibold ">
            Login with
          </h3>
        </div>

        <div className="w-full flex flex-col gap-4 ">
          <div>
            <div className="relative h-[42px]">
              <input
                className="peer block w-full  rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="number"
                name="email"
                placeholder="Enter your phone"
                onChange={handleInputChange}
              />
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              
            </div>
          </div>

          <div className="relative h-[42px]">
            <input
              className="peer block w-full  rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              placeholder="Enter password"
              onChange={handleInputChange}
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
          {!isLoggedIn && (
            <input
              value={temp_user_id ?? ""}
              type="hidden"
              name="temp_user_id"
            />
          )}
          <div className="flex items-center justify-between ">
            <Button
              className=" w-full px-10 flex items-center uppercase justify-center "
              onClick={handleLogin}
              disabled={isPending}
            >
              Log in
            </Button>
          </div>
        </div>
        <div>
          <Link href={"/forget-password"}>Forget password</Link>
        </div>
        {errorMessage && (
          <>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            </div>
          </>
        )}
        {cookieValue && cookieValue?.result !== true && (
          <>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <ExpandIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{cookieValue?.message}</p>
              </div>
            </div>
          </>
        )}

        <div className="social_login flex-col flex items-center gap-3 justify-center">
          <h3 className="text-neutral-black text-base ">OR</h3>
          <h3 className="text-neutral-black text-base ">
            {" "}
            <span className=" font-bold "> Login</span> with Others Account
          </h3>
          <div className="w-full grid grid-cols-1 xl:grid-cols-1 items-center gap-4 ">
            <SocialSection />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-4 ">
            <div className="text-center">Don’t have and account?</div>
            <Button
              type="button"
              className="w-full text-center justify-center "
              onClick={() => setActiveForm(1)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}


// 'use client';

// import { Button } from "@/app/ui/button";
// import { ExpandIcon, Eye, EyeOff, KeyIcon, Phone } from "lucide-react";
// import SocialSection from "./LoginCoomponent/SocialSection";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { signIn } from "next-auth/react";

// export default function LoginForm({
//   handleInputChange,
//   formData,
//   isLoggedIn,
//   temp_user_id,
//   setUseEmailOrPhone,
//   useEmailOrPhone,
//   isPending,
//   setActiveForm,
//   errorMessage,
//   cookieValue,
// }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const callbackUrl = searchParams.get('callbackUrl'); // ✅ this now works
//   console.log('Callback URL =>', callbackUrl); // Should now log: `/previous-page`

//   const handleLoginWithRedirect = async () => {
//       setLoading(true);

//       const res = await signIn('credentials', {
//         redirect: false,
//         email: formData.email,
//         password: formData.password,
//       });

//       setLoading(false);

//       if (res?.ok) {
//         router.push(callbackUrl); // fallback in case it's still null
//       } else {
//         console.error('Login failed');
//       }
//     };

//   return (
//     <div className="flex-1 bg-gray-50 px-6 pb-8 pt-8 flex-col gap-6 flex bg-login rounded-[30px] lg:rounded-r-[0]">
//       <div className="login_header flex items-center justify-center pb-3 border-b-[2px] border-neutral-black">
//         <h3 className="text-2xl text-neutral-black font-semibold">Login with</h3>
//       </div>

//       <div className="w-full flex flex-col gap-4">
//         {/* Phone input */}
//         <div className="relative h-[42px]">
//           <input
//             className="peer block w-full rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//             id="email"
//             type="text"
//             name="email"
//             placeholder="Enter your email or phone"
//             onChange={handleInputChange}
//           />
//           <Phone className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//         </div>

//         {/* Password input */}
//         <div className="relative h-[42px]">
//           <input
//             className="peer block w-full rounded-[30px] border border-neutral-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//             id="password"
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Enter password"
//             onChange={handleInputChange}
//             minLength={6}
//           />
//           <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2"
//           >
//             {showPassword ? (
//               <Eye className="h-5 w-5 text-gray-500 text-black" />
//             ) : (
//               <EyeOff className="h-5 w-5 text-gray-500 text-black" />
//             )}
//           </button>
//         </div>

//         {!isLoggedIn && (
//           <input value={temp_user_id ?? ""} type="hidden" name="temp_user_id" />
//         )}

//         {/* Login button */}
//         <div className="flex items-center justify-between">
//           <Button
//             className="w-full px-10 flex items-center uppercase justify-center"
//             onClick={handleLoginWithRedirect}
//             disabled={isPending || loading}
//           >
//             {loading ? "Logging in..." : "Log in"}
//           </Button>
//         </div>
//       </div>

//       <div>
//         <Link href={"/forget-password"}>Forget password</Link>
//       </div>

//       {errorMessage && (
//         <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500">{errorMessage}</p>
//         </div>
//       )}

//       {cookieValue && cookieValue?.result !== true && (
//         <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
//           <ExpandIcon className="h-5 w-5 text-red-500" />
//           <p className="text-sm text-red-500">{cookieValue?.message}</p>
//         </div>
//       )}

//       <div className="social_login flex-col flex items-center gap-3 justify-center">
//         <h3 className="text-neutral-black text-base">OR</h3>
//         <h3 className="text-neutral-black text-base">
//           <span className="font-bold"> Login</span> with Others Account
//         </h3>
//         <div className="w-full grid grid-cols-1 xl:grid-cols-1 items-center gap-4">
//           <SocialSection />
//         </div>
//         <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-4">
//           <div className="text-center">Don’t have an account?</div>
//           <Button
//             type="button"
//             className="w-full text-center justify-center"
//             onClick={() => setActiveForm(1)}
//           >
//             Sign Up
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'
import Image from 'next/image';
import { CustomButton } from '../CustomLink';
import { signIn } from 'next-auth/react';
export default function SocialSection() {

    return <>
        <CustomButton onClick={() => signIn('facebook')} className="group button flex items-center justify-center gap-2 hover:!text-white border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out">
            <Image
                src="/facebook.svg"
                width={20}
                height={20}
                alt="email"
                className="w-[20px] h-[20px] transition duration-300 ease-in-out "
            />
            <span className="text-neutral-black text-base capitalize group-hover:!text-white transition duration-300 ease-in-out">
                Sign Up with Facebook
            </span>
        </CustomButton>

        <CustomButton onClick={() => signIn('google')} className="group button flex flex-warp justify-center items-center gap-2 hover:!text-white border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out !px-[0px]">
            <Image
                src="/google.svg"
                width={20}
                height={20}
                alt="email"
                className="w-[20px] h-[20px] transition duration-300 ease-in-out "
            />
            <span className="text-neutral-black text-base capitalize group-hover:!text-white transition duration-300 ease-in-out">
                Sign Up with google
            </span>
        </CustomButton>

    </>

}

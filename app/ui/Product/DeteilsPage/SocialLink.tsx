"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ShareIcon } from "../../Icons/Icons";

export default function SocialLink({ slug }: any) {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

  const social_link = [
    {
      id: 1,
      name: "Facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${NEXTAUTH_URL}/product/${slug}`,
      icon: "/social/fb.png",
    },
    {
      id: 2,
      name: "Telegram",
      link: `https://t.me/share/url?url=${NEXTAUTH_URL}/product/${slug}&text=Check%20out%20this%20product!`,
      icon: "/social/telegram.webp",
    },
    {
      id: 4,
      name: "WhatsApp",
      link: `https://wa.me/?text=Check%20out%20this%20product%20${NEXTAUTH_URL}/product/${slug}`,
      icon: "/social/wp.png",
    },
    {
      id: 5,
      name: "X", // Formerly Twitter
      link: `https://twitter.com/share?url=${NEXTAUTH_URL}/product/${slug}&text=Check%20out%20this%20product!`,
      icon: "/social/tw.png",
    },
  ];

  

  return (
    <div className="share_area relative flex items-center gap-3 text-base text-neutral-black mt-3 md:mt-0">
      
      <div 
        className={`share_icon flex gap-3 flex-wrap items-center transition-all duration-300 ease-in-out overflow-hidden max-w-[500px] opacity-100`}
      >
        <span>Share :</span>
        {social_link.map((item) => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className={`transform transition-transform duration-300 ease-in-out translate-x-0 scale-100`}
            style={{ transitionDelay: `${item.id * 75}ms` }}
          >
            <Image
              src={item.icon}
              width={30}
              height={30}
              alt={item.name}
              className="object-contain hover:scale-110 transition-transform duration-200"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
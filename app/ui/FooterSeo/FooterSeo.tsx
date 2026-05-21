import Link from "next/link";
import React from "react";
import Container from "../Container/Container";
import { API_BASE_URL } from "@/app/config/api";
import { get_setting } from "@/lib/utils";
import {
  EmailIcon,
  LocationIcon,
  PhoneIcon,
  TimeIcon,
} from "@/app/ui/Icons/Icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function getABout(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/about_page/footerseo`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

async function getPopular_right_now(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/get-search-suggestions`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

export default async function FooterSeo({ isMobile, translate, setting }: any) {
  const { data, meta_img } = await getABout();
  const search_query = await getPopular_right_now();

  const about_authentic_bd = translate?.about_authentic_bd;
  const footer_about_us = translate?.footer_about_us;
  const footer_faq = translate?.footer_faq;
  const footer_contact_us = translate?.footer_contact_us;
  const footer_shipping_return = translate?.footer_shipping_return;
  const footer_privacy_policy = translate?.footer_privacy_policy;
  const footer_term_condition = translate?.footer_term_condition;
  const be_an_affiliate_partner = translate?.be_an_affiliate_partner;
  const customer_care = translate?.customer_care;
  const contact_address = get_setting(setting, "contact_address");
  const contact_email = get_setting(setting, "contact_email");
  const contact_phone = get_setting(setting, "contact_phone");
  const timings = translate?.timings;

  return (
    <div className="footerSeo bg-black py-4 md:py-10 px-5 md:px-[0px] xxl:px-[200px]">
      {/* Popular search */}
      <section className="flex-col md:max-w-[85%] xxl:max-w-[1500px] md:mx-auto text-center md:text-start">
        <h4 className="text-xl font-bold text-white">Popular Search</h4>
        <div className="flex flex-row w-full overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
  <div className="flex flex-nowrap gap-2 min-w-max">
    {search_query &&
      search_query.map((item: any, index: any) => (
        <div className="flex flex-col flex-shrink-0" key={index}>
          {/* Popular search */}
          <Link
            className={`text-sm md:text-base ${
              isMobile ? "!text-white" : "text-neutral-black"
            }`}
            href={`/search?q=${item.query}`}
          >
            {item.query} |{" "}
          </Link>
        </div>
      ))}
  </div>
</div>
      </section>
    </div>
  );
}

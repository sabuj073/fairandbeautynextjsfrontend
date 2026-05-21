import Link from "next/link";
import React from "react";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LocationIcon,
  MessengerIcon,
  PhoneIcon,
  TiktokIcon,
  TimeIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/app/ui/Icons/Icons";
import CustomImage from "../CustomImage/CustomImage";
import { get_setting } from "@/lib/utils";
import Subscriber from "./Subscriber";
import { routes } from "@/lib/routes";
import FooterSeo from "../FooterSeo/FooterSeo";
import MobileFooterMenu from "./FooterMenu";
import SslFooter from "@/public/ssl.jpg";
import Image from "next/image";

export default async function Footer({ setting, translate }: any) {
  const footer_logo = await get_setting(setting, "footer_logo");
  const payment_method_images = await get_setting(
    setting,
    "payment_method_images"
  );
  const payment_method_images_mobile = await get_setting(
    setting,
    "payment_method_images_mobile"
  );
  const about_us_description = await get_setting(
    setting,
    "about_us_description"
  );
  const frontend_copyright_text = get_setting(
    setting,
    "frontend_copyright_text"
  );

  const contact_address = get_setting(setting, "contact_address");
  const contact_email = get_setting(setting, "contact_email");
  const contact_phone = get_setting(setting, "contact_phone");
  // social link
  const facebook_link = get_setting(setting, "facebook_link");
  const instagram_link = get_setting(setting, "instagram_link");
  const youtube_link = get_setting(setting, "youtube_link");
  const linkedin_link = get_setting(setting, "linkedin_link");
  // console.log(translate)
  // text start
  const about_authentic_bd = translate?.about_authentic_bd;

  const customer_care = translate?.customer_care;
  const contact_with_us = translate?.contact_with_us;
  const footer_my_account = translate?.footer_my_account;

  const footer_about_us = translate?.footer_about_us;
  const footer_faq = translate?.footer_faq;
  const footer_contact_us = translate?.footer_contact_us;
  const footer_shipping_return = translate?.footer_shipping_return;
  const footer_privacy_policy = translate?.footer_privacy_policy;
  const footer_term_condition = translate?.footer_term_condition;
  const be_an_affiliate_partner = translate?.be_an_affiliate_partner;
  const footer_order_histroy = translate?.footer_order_histroy;
  const footer_my_wishlist = translate?.footer_my_wishlist;
  const footer_track_order = translate?.footer_track_order;
  const footer_newsletter = translate?.footer_newsletter;
  const footer_subscribe = translate?.footer_subscribe;
  const timings = translate?.timings;
  const footer_email = translate?.footer_email;
  const footer_phone = translate?.footer_phone;
  const login = translate?.login;

  return (
    <div className="footer_section">
      {/* footer */}
      <div className="mx-auto pt-12 flex flex-col gap-[30px] sm:gap-[65px]  bg-white">
        {/* Footers descriptions */}
        <div className="flex flex-col md:flex-row md:max-w-[85%] xxl:max-w-[1500px] mx-auto px-4 sm:px-2 md:px-0 w-full text-center md:text-start justify-center md:justify-between">
          {/* Descriptions */}
          <div className="footer_header flex flex-col gap-3 items-center md:items-start justify-center text-black">
            <div className="footer_logo max-w-md  p-2"> 
              <CustomImage
                src={footer_logo?.value}
                width={320}
                height={25}
                alt={`Logo`}
              />
              {/* 448px = max-w-md */}
            </div>
            <div className="footer_content">
              <div
                className=" text-sm md:text-base"
                dangerouslySetInnerHTML={{
                  __html: about_us_description?.value,
                }}
              />
            </div>
          </div>

          {/* Contact Us */}
          <div className="widget_four pt-[30px] sm:pt-[80px] xl:pt-0 w-full md:w-auto text-center sm:text-start">
            <h4 className="font-bold uppercase text-base ">
              {contact_with_us}
            </h4>
            <div className="social_link flex items-center sm:items-start gap-3 pt-[16px] sm:pt-[27px] text-sm sm:text-base justify-center sm:justify-start  ">
              <div className="social bg-[#1877F2] p-2 rounded-full">
                <Link href={facebook_link?.value || "#"}>
                  <FacebookIcon />
                </Link>
              </div>
              <div className="social bg-gray rounded-full">
                <Link href={youtube_link?.value || "#"}>
                  <MessengerIcon />
                </Link>
              </div>
              <div className="social bg-gray rounded-full">
                <Link href={linkedin_link?.value || "#"}>
                  <WhatsAppIcon />
                </Link>
              </div>
              <div className="social bg-gray rounded-full">
                <Link href={youtube_link?.value || "#"}>
                  <TiktokIcon />
                </Link>
              </div>
              <div className="social rounded-full">
                <Link href={instagram_link?.value || "#"}>
                  <InstagramIcon />
                </Link>
              </div>
              <div className="social bg-gray rounded-full">
                <Link href={youtube_link?.value || "#"}>
                  <YouTubeIcon />
                </Link>
              </div>
              {/* <div className="social bg-gray p-2 rounded-full">
                <Link href={youtube_link?.value}>
                  <MessengerIcon />
                </Link>
              </div> */}
              
            </div>

            {/* Send Email */}
            <div className="flex  flex-col items-center sm:items-start justify-center sm:justify-start ">
              <div className=" relative mt-6 max-w-max ">
                <div className="absolute top-0 -left-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="16"
                    viewBox="0 0 25 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.657 2.71973L24.657 0.719727L7.62939e-06 0.719726L6.95577e-06 15.7197L2.05478 15.7197L2.05478 2.71973L24.657 2.71973Z"
                      fill="#EBE9E3"
                    />
                  </svg>
                </div>
                <h4 className="text-[20px] font-bold ">
                  Mobile App
                </h4>
                <div className="absolute bottom-0 -right-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="16"
                    viewBox="0 0 25 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M-8.9816e-08 13.1162L0 15.1162L24.657 15.1162L24.657 0.116209L22.6022 0.116209L22.6022 13.1162L-8.9816e-08 13.1162Z"
                      fill="#EBE9E3"
                    />
                  </svg>
                </div>
              </div>
              <Subscriber footer_subscribe={footer_subscribe || "Subscribe"} />
            </div>
          </div>
        </div>

        {/* Popular search */}
        <div className="block">
          <FooterSeo isMobile={true} />
        </div>

        {/* Footers Quick links */}
        <div className="footer_widget_area w-full px-5 sm:px-2 md:px-0 md:max-w-[85%] xxl:max-w-[1500px] md:mx-auto flex flex-col md:flex-row md:gap-x-32  items-start gap-y-20  justify-between">
          {/* First part fo quick link */}
          <div className="widget_left w-full md:mx-0 flex justify-between items-start">
            {/* About Authentic.com.bd */}
            <div className="widget_one w-[50%] text-start">
              <h4 className="font-bold uppercase text-base ">
                {about_authentic_bd}
              </h4>
              <ul className="flex flex-col items-start gap-2">
                <li>
                  <Link href="/page/new-about-us">{footer_about_us}</Link>
                </li>
                <li>
                  <Link href="/page/faq">{footer_faq}</Link>
                </li>
                <li>
                  <Link href="/page/contact-us">{footer_contact_us}</Link>
                </li>
                <li>
                  <Link href="/page/shipping-and-return">
                    {footer_shipping_return}
                  </Link>
                </li>
                <li>
                  <Link href="/page/privacy-policy">
                    {footer_privacy_policy}
                  </Link>
                </li>
                <li>
                  <Link href="/page/terms-and-condition">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate">{be_an_affiliate_partner}</Link>
                </li>
                <li>
                  <Link href="/skin-analyzer" className="font-medium text-primary">
                    Analyze your skin
                  </Link>
                </li>
              </ul>
            </div>

            {/* My Account */}
            <div className="widget_three w-[50%] flex justify-end items-center text-start md:pr-0 pr-7">
              <div>
                <h4 className="font-bold uppercase text-base ">
                {footer_my_account}
              </h4>
              <div className="flex flex-col items-start gap-2">
                <div>
                  <Link href="/login">{login}</Link>
                </div>
                <div>
                  <Link href={routes.user_purchase_history}>
                    {footer_order_histroy}
                  </Link>
                </div>
                <div>
                  <Link href={routes.user_wish_list}>{footer_my_wishlist}</Link>
                </div>
                <div>
                  <Link href={routes.track_order}>{footer_track_order}</Link>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Second part of quick link */}
          <div className="widget_left w-full md:mx-0 flex justify-between items-start">
            {/* CUSTOMER CARE */}
            <div className="widget_two w-[50%] text-start">
              <h4 className="font-bold uppercase text-base ">
                {customer_care}
              </h4>
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3 text-black">
                  <span className="bg-gray p-1 rounded-full">
                    <LocationIcon />{" "}
                  </span>
                  <p>{contact_address?.value}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray p-1 rounded-full">
                    <TimeIcon />
                  </span>
                  <p>{timings}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray p-1 rounded-full">
                    <EmailIcon />
                  </span>
                  <p>{contact_email?.value}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray p-1 rounded-full">
                    <PhoneIcon />
                  </span>
                  <p>{contact_phone?.value}</p>
                </div>
              </div>
            </div>

            {/* About Authentic.com.bd */}
            <div className="widget_one w-[50%] flex justify-end items-center text-start">
              <div>
                <h4 className="font-bold uppercase text-base ">About Us</h4>
              <div>
                <ul className="flex items-start flex-col gap-2">
                  <li>
                    <Link href="/page/new-about-us">{footer_about_us}</Link>
                  </li>
                  <li>
                    <Link href="/page/faq">{footer_faq}</Link>
                  </li>
                  <li>
                    <Link href="/page/contact-us">{footer_contact_us}</Link>
                  </li>
                  <li>
                    <Link href="/page/shipping-and-return">
                      {footer_shipping_return}
                    </Link>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment methods image */}
        <div className="footer_payment px-4 pb-10  md:px-0 md:max-w-[85%] xxl:max-w-[1500px] md:mx-auto">
          {payment_method_images?.value && (
            <CustomImage
              className="hidden md:block h-20 w-[500px]"
              src={payment_method_images?.value}
              width={1600}
              height={54}
              alt={`Payment`}
            />
          )}

          {payment_method_images_mobile?.value && (
            <CustomImage
              className="block md:hidden"
              src={payment_method_images_mobile?.value}
              width={600}
              height={100}
              alt={`Payment`}
            />
          )}
        </div>

        {/* Copyright */}
      </div>
      <div className="md:mb-0 mb-[58px]">
        <div className="bg-[#DFE8DE] w-full">
          <div className="copy_right flex flex-col px-6 md:px-0 md:max-w-[85%] xxl:max-w-[1500px] md:mx-auto md:flex-row-reverse md:justify-between justify-center items-center text-center py-4 text-[16px] text-black ">
          <div className="max-w-[150px] mb-2 md:mb-0">
          <Image
              style={{ width: "100%", }}
              src={SslFooter}
              width={120}
              height={120}
              alt={"ssl"}
              className="object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto"
            />
        </div>
          <Link href={frontend_copyright_text?.value || "#"}>
            <div
              className=" text-[16px]"
              dangerouslySetInnerHTML={{
                __html: frontend_copyright_text?.value || "",
              }}
            />
          </Link>
        </div>
        </div>
      </div>
      <div>
        <MobileFooterMenu/>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Heart,
  Languages,
  Menu,
  PackageSearch,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchContainer from "./SearchContainer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CartIcon, LoveIcon, PhoneIcon, ProfileIcon } from "../Icons/Icons";
import SideCart from "../SideCart/SideCart";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { get_setting } from "@/lib/utils";
import CustomImage from "../CustomImage/CustomImage";
import Link from "next/link";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import SignOutForm from "../SignOutForm";
import { routes, routes_with_out_slash } from "@/lib/routes";
import axios from "axios";
import toast from "react-hot-toast";
import AuthenticLoves from "./AuthenticLoves";
import AccountMenu from "./AccountMenu";
import MobileSidebarCategories from "./MobileSidebarCategories";
import MobileSidebarBrands from "./MobileSidebarBrands";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface MenuItem {
  id: number;
  slug: string;
  name: string;
  icon_menu?: string;
  children?: MenuItem[]; // Optional property for nested menu items
}

const MobileNav = ({
  authentic_loves,
  authentic_loves_text,
  authentic_recommends,
  authentic_recommends_text,
  authentic_fresh_drops,
  authentic_fresh_drops_text,
  authentic_brand,
  authentic_brand_text,
  brand_menu,
  languages,
  blog,
  offerMenu,
  menus,
  setting,
  onOpenSearchModal,
}: any) => {
  const [activeTab, setActiveTab] = useState("categories");
  const [isProductDetail, setIsProductDetail] = useState(false);
  const { totalQuantity, wishlist, setLanguage } = useCartStoreData();
  const [mounted, setMounted] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const cookieValue = cookieStore((state) => state.cookieValue);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const menu_data: any[] = menus;
  const user_data = [
    {
      id: 1,
      name: "Sign In",
      slug: "/login",
      children: [
        {
          id: 1,
          slug: "login",
          name: "Sign In",
        },
        {
          id: 2,
          name: "Register",
          slug: "register",
        },
        {
          id: 3,
          name: "Track Order",
          slug: "track-order",
        },
      ],
    },
  ];
  const profile_data = [
    {
      id: 1,
      name: "Account",
      slug: routes_with_out_slash.user_dashboard,
      children: [
        {
          id: 1,
          name: "Dashboard",
          slug: routes_with_out_slash.user_dashboard,
        },
        {
          id: 1,
          name: "Purchase history",
          slug: routes_with_out_slash.user_purchase_history,
        },
        {
          id: 2,
          name: "Wish list",
          slug: routes_with_out_slash.user_wish_list,
        },
        {
          id: 3,
          name: "Profile",
          slug: routes_with_out_slash.user_profile,
        },
        {
          id: 3,
          name: "Address",
          slug: routes_with_out_slash.user_address,
        },
      ],
    },
  ];

  const lang_data = [
    {
      id: 1,
      name: "Language",
      slug: "/language",
      children: [
        {
          id: 1,
          slug: "bn",
          name: "Bangla",
        },
        {
          id: 2,
          name: "English",
          slug: "/english",
        },
      ],
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [labelMenu, setLabelMenu] = useState<number>(1);
  const [langValue, setLangValue] = useState<boolean>(false);
  const [labelMenuData2, setLabelMenuData2] = useState<MenuItem[]>([]);
  const [labelMenuData3, setLabelMenuData3] = useState<MenuItem[]>([]);
  const [label1, setLabel1] = useState<MenuItem | null>(null);
  const [label2, setLabel2] = useState<MenuItem | null>(null);
  const header_logo = get_setting(setting, "header_logo");
  const handCloseMenu = () => {
    setOpenMenu(false);
    setLabelMenu(1);
    return true;
  };
  const pathname = usePathname();

  const handleBackMenu = (val: number) => {
    setLabelMenu(val);
  };
  const handleLanguage = async (item: any) => {
    setLanguage(item);
    // console.log("handleLanguage", item)
    // return false
    try {
      let langData = {
        lang: item,
      };
      const response: any = await axios.post("/api/languages-change", langData);

      toast.success(response.data.massage, {
        style: { color: "#404042", fontWeight: 600 },
        iconTheme: { primary: "#A020F0", secondary: "#fff" },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const stickyThreshold = 50;
      if (window.scrollY > stickyThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/checkout") {
      setOpenCart(false);
    }
    if (pathname && pathname.includes("/product/")) {
      setIsProductDetail(true);
    } else {
      setIsProductDetail(false);
    }
  }, [pathname]);

  return (
    <>
      <div className={`md:hidden sticky top-[0px] z-[999999] bg-white py-2`}>
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center w-full gap-[10px]">
            <Button
              className="items-center justify-end border-0 p-0"
              variant="outline"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <Menu className="text-sm w-[30px]" />
            </Button>
            {/* Logo moved here next to the menu button */}
            {isProductDetail === false && (
              <div className="logo w-[180px] h-[25px] flex items-center">
                <Link href="/">
                  <CustomImage
                    src={header_logo?.value}
                    width={180}
                    height={25}
                    alt={"Logo"}
                  />
                </Link>
              </div>
            )}
            {isProductDetail === true && (
              <div className="search flex flex-grow items-center" onClick={() => onOpenSearchModal?.()}>
                <SearchContainer />
              </div>
            )}
          </div>

          <div className="flex items-center gap-[20px]">
            {isProductDetail === false && (
              <>
                <div className="star relative">
                  <Link
                    className="flex items-center gap-1 text-base capitalize"
                    href="/wishlist"
                  >
                    <LoveIcon />
                    <span className="mini_cart__qty">
                      {(mounted && wishlist.length) || 0}
                    </span>
                  </Link>
                </div>
                <div className="star relative">
                  <Link
                    className="flex items-center gap-1 text-base capitalize"
                    href="/wishlist"
                  >
                    <PhoneIcon />
                  </Link>
                </div>
              </>
            )}
            <div className="shoppingCart relative pr-2 mt-2">
              <Dialog open={openCart} onOpenChange={setOpenCart}>
                <DialogTrigger>
                  <div
                    className="flex items-center gap-1 text-base capitalize"
                    onClick={() => setOpenCart(!openCart)}
                  >
                    <CartIcon />
                  </div>
                  <span className="mini_cart__qty">
                    {(mounted && totalQuantity) || 0}
                  </span>
                </DialogTrigger>
                <DialogContent className="border-0 max-w-[500px] flex grow flex-col repeat-1 duration-300 animate-in bottom-0 top-0 right-0 slide-in-from-right fixed">
                  <SideCart />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div
        id="main-navigation"
        className={`b-menu_panel ${openMenu ? "m-active" : ""}`}
      >
        <div
          className={`b-menu_panel-inner m-fullwidth ${openMenu ? "m-opened" : "m-closed"}`}
        >
          <div className={`b-menu_subpanel m-active_level_${labelMenu}`}>
            {/* label 1 start  */}
            <div className="b-menu_subpanel-container m-level_1">
              <div className="b-menu_panel-head flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handCloseMenu}
                  className="p-2 -ml-2 rounded-full hover:bg-gray-200"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setActiveTab("categories")}
                  className={`flex-1 min-w-0 py-2 px-2 rounded-full text-[10px] font-bold uppercase ${
                    activeTab === "categories"
                      ? "text-white"
                      : "bg-white text-[#139804] border-2 border-[#139804]"
                  }`}
                  style={
                    activeTab === "categories"
                      ? {
                          background: "linear-gradient(90deg, #1BA809 0%, #063B00 100%)",
                        }
                      : undefined
                  }
                >
                  Categories
                </button>
                <button
                  onClick={() => setActiveTab("brands")}
                  className={`flex-1 min-w-0 py-2 px-2 rounded-full text-[10px] font-bold uppercase ${
                    activeTab === "brands"
                      ? "text-white"
                      : "bg-white text-[#139804] border-2 border-[#139804]"
                  }`}
                  style={
                    activeTab === "brands"
                      ? {
                          background: "linear-gradient(90deg, #1BA809 0%, #063B00 100%)",
                        }
                      : undefined
                  }
                >
                  Brands
                </button>
                <Link
                  href="/login"
                  onClick={handCloseMenu}
                  className="flex items-center justify-center gap-1 py-2 px-2 rounded-full text-[10px] font-bold uppercase text-white shrink-0"
                  style={{
                    background: "linear-gradient(90deg, #1BA809 0%, #063B00 100%)",
                  }}
                >
                  <CircleUserRound className="w-3.5 h-3.5 shrink-0 text-black stroke-[2]" />
                  Login
                </Link>
                <button
                  className="b-menu_panel-close p-2 rounded-full hover:bg-gray-200 shrink-0"
                  title="Close"
                  type="button"
                  onClick={handCloseMenu}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {activeTab === "brands" && (
                <MobileSidebarBrands
                  brands={brand_menu || []}
                  handCloseMenu={handCloseMenu}
                />
              )}
              {activeTab === "categories" && (
                <MobileSidebarCategories
                  menu_data={menu_data}
                  handCloseMenu={handCloseMenu}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isProductDetail === false && (
        <div
          className="search bg-white flex items-center sm:hidden sticky top-[55px] z-[999999] cursor-pointer"
          onClick={() => onOpenSearchModal?.()}
        >
          <SearchContainer />
        </div>
      )}
    </>
  );
};

export default MobileNav;

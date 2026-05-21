"use client"
import { DownArrowIcon, SearchIcon } from "@/app/ui/Icons/Icons";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import SignOutForm from "../SignOutForm";
import AccountNav from "./AccountNav";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import axios from "axios";
import { useEffect, useState } from "react";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import CustomImage from "../CustomImage/CustomImage";
import { get_setting } from "@/lib/utils";
import { useSession } from "next-auth/react";
import DesktopSearch from "./DesktopSearch";
import { usePathname } from "next/navigation";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import toast from "react-hot-toast";


export default function MiddleNav({ languages, setting, onOpenSearchModal }: any) {
  const cookieValue = cookieStore((state) => state.cookieValue);
  const pathName = usePathname()
  const { translateValue } = cookieStore();
  const { data: session, update } = useSession() as any
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { setCartData, temp_user_id, setWishlistArray, setLanguage, languageData } = useCartStoreData((state) => ({
    setCartData: state.setCartData,
    temp_user_id: state.temp_user_id,
    setWishlistArray: state.setWishlistArray,
    setLanguage: state.setLanguage,
    languageData: state.languageData,
  }));


  const getData = async () => {
    const userId = cookieValue?.user?.id;
    try {
      const response: any = await axios.post(
        `/api/product/wishlists/list`,
        {
          user_id: userId || null,
        }
      );
      const getIdes = response.data.data.map((item: any) => item.id)

      setWishlistArray(getIdes)

    } catch (error) {
      console.log(error)
    }
  }

  const getCart = async () => {
    const isLoggedIn = !!cookieValue?.user?.id;
    const userId = isLoggedIn ? cookieValue?.user?.id : temp_user_id;
    try {
      const response: any = await axios.post(
        `/api/cart/get`,
        {
          user_id: userId || null,
        }
      );

      setCartData(response.data.data, response.data.totalQuantity);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCart()
    getData()

  }, [cookieValue, temp_user_id, pathName])
  // header logo 

  const header_logo = get_setting(setting, 'header_logo')
  const language = translateValue?.language
  const sign_out = translateValue?.sign_out
  useEffect(() => {
    if (languageData) {
      handleInitial(languageData)
    }

  }, [languageData])


  const handleInitial = async (item: any) => {
    console.log("item lang",item)
    try {
      let langData = {
        lang: item,
      }
      const response: any = await axios.post('/api/languages-change', langData);
      console.log("response", response.data)

    } catch (error) {
      console.log(error)
    }

  }

  const handleLanguage = async (item: any) => {
    setLanguage(item)
    // console.log("handleLanguage", item)
    // return false
    try {
      let langData = {
        lang: item,
      }
      const response: any = await axios.post('/api/languages-change', langData);

      toast.success(response.data.massage, {
        style: { color: '#404042', fontWeight: 600 },
        iconTheme: { primary: '#A020F0', secondary: '#fff' },
      });
      window.location.reload();

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="sticky h-fit top-0 bg-white z-[99999] w-full">
      <div className="hidden md:flex  items-center justify-between flex-col md:max-w-[85%] xxl:max-w-[1500px] xl:flex-row gap-6 py-[10px] lg:py-[22px] flex-wrap   mx-2 md:mx-auto px-4 sm:px-2 md:px-0  ">
        <div className="logo hidden md:block" style={{ maxWidth: '220px' }}>
          <Link href='/' >
            <CustomImage
              src={header_logo?.value}
              width={220}
              height={25}
              alt={`Logo`}
            />
          </Link>
        </div>
        <div className="search  gap-3 items-center hidden md:flex ">
          <div className="flex  items-center relative gap-1" >
            <Menubar>
              <MenubarMenu>
                {/* <MenubarTrigger><div className="text-base text-neutral-black flex gap-2 items-center " ><span>{language}</span> <DownArrowIcon /></div> </MenubarTrigger> */}
                <MenubarContent>

                  {
                    languages.map((item: any) => (
                      <MenubarItem key={item.id} onClick={() => handleLanguage(item.code)}>
                        <div  >{item?.name}</div>
                      </MenubarItem>
                    ))
                  }
                </MenubarContent>
              </MenubarMenu>


            </Menubar>
          </div>

          <div
            className="search_input flex relative cursor-pointer"
            onClick={() => onOpenSearchModal?.() ?? setIsDialogOpen(!isDialogOpen)}
          >
            <DesktopSearch isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
          </div>


          {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  >

            <div className="search_input flex relative  " onClick={() => setIsDialogOpen(!isDialogOpen)} >

              

              <input
                type="text"
                placeholder="Search the item"
                className="max-w-[245px] border-0 border-b border-gray-400 shadow-none focus:shadow-none focus:outline-none ring-0"
              />
              <div className="search_icon absolute right-0 top-1.5">
                <SearchIcon />
              </div>
            </div>


            <DialogContent className=" translate-x-0-inherit translate-y-inherit  border-0  max-w-full flex grow flex-col repeat-1 duration-300 animate-in slide-in-from-top fixed items-center  bg-white top-0 right-0 left-0 z-[999999] max-h-full search_content">
              <DesktopSearch isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            </DialogContent>
          </Dialog> */}

        </div>
        
        <div className="account_nav   items-center gap-4 flex-wrap hidden md:flex">
          <AccountNav />


          {/* <SignOutForm sign_out={sign_out} /> */}

        </div>


      </div>


    </div>
  )
}

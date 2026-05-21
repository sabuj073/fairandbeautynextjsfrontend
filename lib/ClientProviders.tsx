"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import useLayoutService from "@/lib/hooks/useLayout";
import { usePathname, useSearchParams } from "next/navigation";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const { theme } = useLayoutService();
  const [selectedTheme, setSelectedTheme] = useState("system");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  useEffect(() => {
    const contentArea = document.getElementById('filter_product');
    const main_category_show_home = document.getElementById('main_category_show_home');
    if (contentArea) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    if (pathname !== '/') {
      if (main_category_show_home) main_category_show_home.style.display = "none";
    } else {
      if (main_category_show_home) main_category_show_home.style.display = "";
    }
  }, [searchParams, pathname]);

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          toast.error(error.message);
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res.ok) {
            throw new Error("An error occurred while fetching the data.");
          }
          return res.json();
        },
      }}
    >
      <div data-theme={selectedTheme}>
        <Toaster containerStyle={{ zIndex: 9999999999999 }} toastOptions={{ className: "toaster-con z-[999999999] " }} />
        {children}
      </div>
    </SWRConfig>
  );
}

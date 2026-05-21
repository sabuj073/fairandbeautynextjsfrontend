"use client";

import React, { useState } from "react";
import MiddleNav from "./MiddleNav";
import Navbar from "./Navbar";
import CategoryMobileResponsive from "../CategoryMobile/CategoryMobileResponsive";
import SearchFullPageModal from "./SearchFullPageModal";

export default function HeaderWithSearchModal({
  translate,
  languages,
  setting,
  menus,
  menuData,
}: any) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <MiddleNav
        languages={languages}
        setting={setting}
        onOpenSearchModal={() => setSearchModalOpen(true)}
      />
      <Navbar
        authentic_loves={menus?.authentic_loves}
        authentic_loves_text={menus?.translate?.authentic_loves_text}
        authentic_recommends={menus?.authentic_recommends}
        authentic_recommends_text={menus?.translate?.authentic_recommends_text}
        authentic_fresh_drops={menus?.authentic_fresh_drops}
        authentic_fresh_drops_text={menus?.translate?.authentic_fresh_drops_text}
        authentic_brand={menus?.authentic_brand}
        authentic_brand_text={menus?.translate?.authentic_brand}
        brand_menu={menus?.brand_menu}
        languages={languages}
        offerMenu={menus?.offerMenu}
        menus={menuData}
        translate={translate}
        setting={setting}
        onOpenSearchModal={() => setSearchModalOpen(true)}
      />
      <CategoryMobileResponsive menus={menuData} />
      <SearchFullPageModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        menuCategories={menuData}
      />
    </>
  );
}

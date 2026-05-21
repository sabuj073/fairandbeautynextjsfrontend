// import { ChevronDown, ChevronUp } from 'lucide-react';
// import React, { useState, useMemo, useCallback } from 'react';
// import CustomImage from '../CustomImage/CustomImage';
// import Link from 'next/link';

// interface MenuItem {
//     id: number;
//     slug: string;
//     name: string;
//     icon_menu?: string;
//     children?: MenuItem[];
// }

// interface BeautyAppProps {
//     menu_data: MenuItem[];
//     handCloseMenu: ()=>void;
// }


// const BeautyApp: React.FC<BeautyAppProps> = ({ menu_data,handCloseMenu }) => {
//     const [activeSection, setActiveSection] = useState<number | null>(null);
//     const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
//     const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
//     const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
//     const [dropDownMenu, setDropDownMenu] = useState<MenuItem[]>([]);

//     const mainMenu = useMemo(() => {
//         const pairs = [];
//         for (let i = 0; i < menu_data.length; i += 2) {
//             pairs.push(menu_data.slice(i, i + 2));
//         }
//         return pairs;
//     }, [menu_data]);

//     const toggleSection = useCallback((sectionIndex: number, itemIndex: number, item: MenuItem) => {
//         setCurrentSectionIndex(sectionIndex);
//         const findIndexMenu = mainMenu[sectionIndex][itemIndex];

//         if (activeSection === item.id && activeSectionId === findIndexMenu.id) {
//             // If clicking the same item, close it
//             setActiveSection(null);
//             setActiveSectionId(null);
//             setDropDownMenu([]);
//         } else {
//             // If clicking a different item, open it
//             setActiveSection(item.id);
//             setActiveSectionId(findIndexMenu.id);
//             setDropDownMenu(item.children || []);
//         }

//         setActiveSubSection(null);
//     }, [mainMenu, activeSection, activeSectionId]);

//     const toggleSubSection = useCallback((subSectionSlug: string) => {
//         setActiveSubSection(prevState => prevState === subSectionSlug ? null : subSectionSlug);
//     }, []);

//     const MenuIcon = useCallback(({ icon_menu, name }: { icon_menu?: string; name: string }) => (
//         icon_menu ? (
//             <div className="menu_img w-[50px] h-[50px] rounded-[50%] overflow-hidden">
//                 <CustomImage
//                     src={icon_menu}
//                     alt={name}
//                     layout="responsive"
//                     width={50}
//                     height={50}
//                     loading="lazy"
//                 />
//             </div>
//         ) : null
//     ), []);

//     const MenuItem = useCallback(({ item, sectionIndex, itemIndex }: { item: MenuItem; sectionIndex: number; itemIndex: number }) => (
//         <div key={item.slug} className="relative main_item border-b border-gray-300 pb-2">
//             <div className='flex flex-col items-center gap-3'>
//                 <MenuIcon icon_menu={item.icon_menu} name={item.name} />
//                 <Link onClick={handCloseMenu}  href={`/category/${item.slug}`} className="text-sm font-medium">{item.name}</Link>
//             </div>
//             {item.children && item.children.length > 0 && (
//                 <button
//                     className="absolute top-[20%] right-0 text-gray-400 hover:text-gray-600 focus:outline-none"
//                     onClick={() => toggleSection(sectionIndex, itemIndex, item)}
//                 >
//                     {activeSection === item.id ? <ChevronUp /> : <ChevronDown />}
//                 </button>
//             )}
//         </div>
//     ), [activeSection, toggleSection]);

//     const SubMenuItem = useCallback(({ item }: any) => (
//         <div key={item.slug} className="relative sub_item flex flex-col py-2 border-b border-gray-300">
//             <a href={`/category/${item.slug}`} className="text-base font-medium">{item.name}</a>
//             {item?.children?.length > 0 && (
//                 <>
//                     <div className={`overflow-hidden transition-all duration-300 ${activeSubSection === item.slug ? 'max-h-[1000px] pb-2' : 'max-h-0'}`}>
//                         <ul className="pl-4 flex flex-col gap-2">
//                             {item.children.map((subItem: any,index:number) => (
//                                 <li key={index}>
//                                     <a href={`/category/${subItem.slug}`} className="text-base font-medium">{subItem.name}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <button
//                         className="absolute top-[10px] right-0 text-gray-400 hover:text-gray-600 focus:outline-none"
//                         onClick={() => toggleSubSection(item.slug)}
//                     >
//                         {activeSubSection === item.slug ? <ChevronUp /> : <ChevronDown />}
//                     </button>
//                 </>
//             )}
//         </div>
//     ), [activeSubSection, toggleSubSection]);

//     return (
//         <div className="bg-gray-100 flex justify-center items-start">
//             <div className="bg-white shadow-lg rounded-lg w-full max-w-xl px-3 pt-2">
//                 <div className="grid grid-cols-2 gap-3">
//                     {mainMenu.map((section:any, sectionIndex:number) => (
//                         <React.Fragment key={sectionIndex}>
//                             {section.map((item:any, itemIndex:number) => (
//                                 <MenuItem key={itemIndex} item={item} sectionIndex={sectionIndex} itemIndex={itemIndex} />
//                             ))}
//                             <div className={`col-span-2 overflow-hidden transition-all duration-300 ${currentSectionIndex === sectionIndex &&
//                                 section.some((sectionItem: { id: number | null; }) =>
//                                     activeSection === sectionItem.id &&
//                                     activeSectionId === sectionItem.id
//                                 )
//                                 ? 'max-h-[1000px]'
//                                 : 'max-h-0'
//                                 }`}>
//                                 {dropDownMenu.map((item:any,index:number) => (
//                                     <SubMenuItem key={index} item={item} />
//                                 ))}
//                             </div>
//                         </React.Fragment>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default React.memo(BeautyApp);



import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState, useMemo, useCallback } from 'react';
import CustomImage from '../CustomImage/CustomImage';
import Link from 'next/link';

interface MenuItem {
  id: number;
  slug: string;
  name: string;
  icon_menu?: string;
  children?: MenuItem[];
}

interface BeautyAppProps {
  menu_data?: MenuItem[];
  handCloseMenu: () => void;
}

const BeautyApp: React.FC<BeautyAppProps> = ({ menu_data = [], handCloseMenu }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const [dropDownMenu, setDropDownMenu] = useState<MenuItem[]>([]);

  const mainMenu = useMemo(() => {
    if (!Array.isArray(menu_data)) return [];
    const pairs = [];
    for (let i = 0; i < menu_data.length; i += 2) {
      pairs.push(menu_data.slice(i, i + 2));
    }
    return pairs;
  }, [menu_data]);

  const toggleSection = useCallback(
    (sectionIndex: number, itemIndex: number, item: MenuItem) => {
      setCurrentSectionIndex(sectionIndex);
      const findIndexMenu = mainMenu[sectionIndex][itemIndex];

      if (activeSection === item.id && activeSectionId === findIndexMenu?.id) {
        setActiveSection(null);
        setActiveSectionId(null);
        setDropDownMenu([]);
      } else {
        setActiveSection(item.id);
        setActiveSectionId(findIndexMenu?.id);
        setDropDownMenu(Array.isArray(item.children) ? item.children : []);
      }

      setActiveSubSection(null);
    },
    [mainMenu, activeSection, activeSectionId]
  );

  const toggleSubSection = useCallback((subSectionSlug: string) => {
    setActiveSubSection(prev => (prev === subSectionSlug ? null : subSectionSlug));
  }, []);

  const MenuIcon = useCallback(
    ({ icon_menu, name }: { icon_menu?: string; name: string }) =>
      icon_menu ? (
        <div className="menu_img w-[50px] h-[50px] rounded-[50%] overflow-hidden">
          <CustomImage
            src={icon_menu}
            alt={name}
            layout="responsive"
            width={50}
            height={50}
            loading="lazy"
          />
        </div>
      ) : null,
    []
  );

  const MenuItem = useCallback(
    ({ item, sectionIndex, itemIndex }: { item: MenuItem; sectionIndex: number; itemIndex: number }) => (
      <div key={item.slug} className="relative main_item border-b border-gray-300 pb-2">
        <div className="flex flex-col items-center gap-3">
          <MenuIcon icon_menu={item.icon_menu} name={item.name} />
          <Link onClick={handCloseMenu} href={`/category/${item.slug}`} className="text-sm font-medium">
            {item.name}
          </Link>
        </div>
        {Array.isArray(item.children) && item.children.length > 0 && (
          <button
            className="absolute top-[20%] right-0 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => toggleSection(sectionIndex, itemIndex, item)}
          >
            {activeSection === item.id ? <ChevronUp /> : <ChevronDown />}
          </button>
        )}
      </div>
    ),
    [activeSection, toggleSection, handCloseMenu]
  );

  const SubMenuItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <div key={item.slug} className="relative sub_item flex flex-col py-2 border-b border-gray-300">
        <a href={`/category/${item.slug}`} className="text-base font-medium">
          {item.name}
        </a>
        {Array.isArray(item.children) && item.children.length > 0 && (
          <>
            <div className={`overflow-hidden transition-all duration-300 ${
              activeSubSection === item.slug ? 'max-h-[1000px] pb-2' : 'max-h-0'
            }`}>
              <ul className="pl-4 flex flex-col gap-2">
                {item.children.map((subItem, index) => (
                  <li key={index}>
                    <a href={`/category/${subItem.slug}`} className="text-base font-medium">
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="absolute top-[10px] right-0 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => toggleSubSection(item.slug)}
            >
              {activeSubSection === item.slug ? <ChevronUp /> : <ChevronDown />}
            </button>
          </>
        )}
      </div>
    ),
    [activeSubSection, toggleSubSection]
  );

  return (
    <div className="bg-gray-100 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl px-3 pt-2">
        <div className="grid grid-cols-2 gap-3">
          {mainMenu.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {section.map((item, itemIndex) => (
                <MenuItem key={item.slug} item={item} sectionIndex={sectionIndex} itemIndex={itemIndex} />
              ))}
              <div
                className={`col-span-2 overflow-hidden transition-all duration-300 ${
                  currentSectionIndex === sectionIndex &&
                  section.some(
                    sectionItem =>
                      activeSection === sectionItem.id &&
                      activeSectionId === sectionItem.id
                  )
                    ? 'max-h-[1000px]'
                    : 'max-h-0'
                }`}
              >
                {dropDownMenu.map((item, index) => (
                  <SubMenuItem key={index} item={item} />
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BeautyApp);

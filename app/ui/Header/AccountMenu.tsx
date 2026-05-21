import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const AccountMenu = ({ profile_data, sign_out }: any) => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (sectionName: any) => {
        setActiveSection(activeSection === sectionName ? null : sectionName);
    };



    return (
        <div className="bg-gray-100  flex justify-center items-start hidden">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-xl px-3 pt-2">
                <div className="flex flex-col  gap-3">
                    {profile_data.map((section: any) => (
                        <div key={section.slug} className="relative main_item border-b border-gray-300 pb-2 ">
                            <div className='flex items-center gap-3'>
                                <a href={`/${section.slug}`} className="text-lg font-medium">{section.name}</a>
                            </div>
                            <div className={` overflow-hidden transition-all duration-300 ${activeSection === section.slug ? 'max-h-[1000px] pt-2 ' : 'max-h-0'}`}>
                                {section.children.map((item: any) => (
                                    <div key={item.slug} className="  relative sub_item flex flex-col py-2 border-b border-gray-300 ">
                                        <a href={`/${item.slug}`} className="text-base font-medium">{item.name}</a>

                                    </div>
                                ))}
                            </div>
                            <button
                                className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={() => toggleSection(section.slug)}
                            >
                                {activeSection === section.slug ? <ChevronUp /> : <ChevronDown />}
                            </button>
                        </div>

                    ))}
                    {
                        sign_out && sign_out
                    }
                </div>
            </div>
        </div>
    );
};

export default AccountMenu;
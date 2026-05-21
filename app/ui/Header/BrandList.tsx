import React from 'react';

const BrandList = ({ brands }: any) => {


    return (
        <div className="max-w-lg mx-auto p-4">
            {brands.map((section: any) => (
                <div key={section.letter} className="mb-6">
                    {/* Letter Header */}
                    <div className="border-b border-pink-300 mb-3">
                        <h2 className="text-xl font-bold text-gray-800 py-2">
                            {section.letter}
                        </h2>
                    </div>

                    {/* Brand Items */}
                    <div className="space-y-3">
                        {section.items.map((brand: any) => (
                            <div
                                key={brand.id}
                                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                            >
                                <a href={`/brand/${brand.slug}`} className="w-full text-left py-2 px-1">
                                    <span className="text-gray-700 text-sm">
                                        {brand.name}
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BrandList;
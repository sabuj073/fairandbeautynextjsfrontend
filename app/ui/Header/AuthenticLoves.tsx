import React from 'react';
import CustomImage from '../CustomImage/CustomImage';

const AuthenticLoves = ({ authentic_loves, authentic_loves_text, brand = false }: any) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex px-4 flex-col">
                <p className="text-sm font-semibold">{authentic_loves_text}</p>
            </div>

            <div className="flex flex-col w-full">
                <div className="flex w-full flex-row overflow-x-auto gap-x-2 px-3 py-3">
                    {authentic_loves?.data.map((image: any, index: any) => (
                        <a href={`/category/${image?.slug}`} key={index} className="flex-none">
                            <div className="flex grow items-center justify-center flex-col gap-y-1">
                                <div className="w-16 h-16">
                                    <CustomImage
                                        src={brand ? image?.logo : image?.icon || '/'}
                                        alt={`OHSOGO Love ${index + 1}`}
                                        className="rounded-md overflow-hidden w-16 h-16 object-cover"
                                        loading="lazy"
                                        width={64}
                                        height={64}
                                    />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthenticLoves;
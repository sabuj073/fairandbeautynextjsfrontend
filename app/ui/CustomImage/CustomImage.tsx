import { BASE_URL } from '@/app/config/api';
import Image from 'next/image';
import React from 'react';

export default function CustomImage({ borderRadius, src, fill, width, height, ...rest }: any) {
  return (
    <img
      src={`${BASE_URL}/public/${src}`}
      alt={rest.alt || 'Image'} // Ensure alt is always provided
      fill={fill} // Use fill if provided
      width={!fill ? width : undefined} // Avoid setting width if fill is true
      height={!fill ? height : undefined} // Avoid setting height if fill is true
      className={`object-contain w-full transition-transform duration-300 ease-in-out transform ${borderRadius ? borderRadius : ''}`}
      {...rest} // Pass remaining valid props
    />
    // <Image
    //   src={`${BASE_URL}/public/${src}`}
    //   alt={rest.alt || 'Image'} // Ensure alt is always provided
    //   fill={fill} // Use fill if provided
    //   width={!fill ? width : undefined} // Avoid setting width if fill is true
    //   height={!fill ? height : undefined} // Avoid setting height if fill is true
    //   className="w-full object-contain transition-transform duration-300 ease-in-out transform"
    //   {...rest} // Pass remaining valid props
    // />
  );
}

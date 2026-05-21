'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-[9999]">
      <img src="/Free loading animation.gif" alt="Loading..." className="w-26 h-26" />
      
    </div>
  );
}

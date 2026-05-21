import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CookieStoreProps = {
  cookieValue: any;
  settingValue: any;
  translateValue: any;
  heading_title_value: any;
  setCookieValue: (value: any) => void; 
  setCookieSetting: (value: any) => void; 
  setTranslate: (value: any) => void; 
  setHeading_title: (value: any) => void; 
};

export const cookieStore = create<CookieStoreProps>()(
  persist(
    (set) => ({
      cookieValue: null, 
      settingValue: null, 
      translateValue: null, 
      heading_title_value: null, 
      setCookieValue: (value) => set({ cookieValue: value }), 
      setCookieSetting: (value) => set({ settingValue: value }), 
      setTranslate: (value) => set({ translateValue: value }), 
      setHeading_title: (value) => set({ heading_title_value: value }), 
    }),
    {
      name: 'cookieStore',
    }
  )
);

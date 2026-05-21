import React from 'react'
import { fetchData } from '@/lib/dataFetching'
import { API_BASE_URL } from '@/app/config/api'
import { cookies } from 'next/headers'
import HeaderWithSearchModal from './HeaderWithSearchModal'

export async function getMenu(): Promise<any> {
  const lang = cookies().get('lang')?.value || 'en';
  const response = await fetchData<any>(`${API_BASE_URL}/categories/menu?lang=${lang}`, { revalidate: 10 });
  return response as any;
}

export default async function Header({ translate, languages, setting }: any) {

  const menus = await getMenu();

  let menuData = menus?.menu || [];

  if (!Array.isArray(menuData)) {
    menuData = [];
  }

  return (
    <HeaderWithSearchModal
      translate={translate}
      languages={languages}
      setting={setting}
      menus={menus}
      menuData={menuData}
    />
  )
}

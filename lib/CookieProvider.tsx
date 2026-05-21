
'use client';

import { useEffect } from 'react';
import { cookieStore } from './hooks/useCookieStore';
import useCartStoreData from './hooks/useCartStoreData';
import { useSession } from 'next-auth/react';

interface CookieProviderProps {
    children: React.ReactNode;
    cookieData?: any;
    settingData?: any;
    translate?: any;
    heading_title?: any;
}
export default function CookieProvider({ children, cookieData, settingData, translate, heading_title }: CookieProviderProps) {
    // const session = useSession()
    const { data: session, update } = useSession() as any
    const { setCookieValue, setCookieSetting, setTranslate, setHeading_title } = cookieStore(state => ({
        setCookieValue: state.setCookieValue,
        setCookieSetting: state.setCookieSetting,
        setTranslate: state.setTranslate,
        setHeading_title: state.setHeading_title,
    }));

    const { setRemoveTempUserId, temp_user_id, setWishlistEmpty } = useCartStoreData((state) => ({
        setRemoveTempUserId: state.setRemoveTempUserId,
        temp_user_id: state.temp_user_id,
        setWishlistEmpty: state.setWishlistEmpty,
    }));

    useEffect(() => {
        if (cookieData || session?.data?.user) {
            setCookieValue(cookieData || session?.data?.user);
            setRemoveTempUserId()
        } else {
            setCookieValue(null)
            setWishlistEmpty()
        }
    }, [cookieData, setCookieValue, session]);

    useEffect(() => {
        if (settingData) {
            setCookieSetting(settingData);
        } else {
            setCookieSetting(null)
        }
    }, [settingData, setCookieSetting]);
    useEffect(() => {
        if (translate) {
            setTranslate(translate);
        } else {
            setTranslate(null)
        }
    }, [translate, setTranslate]);

    const handleHeading = async () => {

        if (heading_title) {
            setHeading_title(heading_title);
        } else {
            setHeading_title(null)
        }

    }


    useEffect(() => {
        handleHeading()
    }, [heading_title, setHeading_title]);



    return <>{children}</>;
}

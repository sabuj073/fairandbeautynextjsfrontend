import { SessionProvider } from 'next-auth/react'
import ClientProviders from './ClientProviders'
import { auth } from '@/auth'
import { cookies } from 'next/headers'
import CookieProvider from './CookieProvider'
import { get_setting } from './utils'

export default async function Providers({
  children,
  setting,
  translate
}: {
  children: React.ReactNode,
  setting: any,
  translate: any,
}) {
  const session = await auth()
  const cookieStore = cookies();
  const exist = cookieStore.has('auth');
  const cookieData = exist && cookieStore.get('auth')?.value ? JSON.parse(cookieStore.get('auth')!.value) : null;
  const hasCookie = cookieStore.has('recentData')


  const heading_title = {
    trending_category: translate.trending_category,
    new_arrivals: translate.new_arrivals,
    special_offers: translate.special_offers,
    trending_produts: translate.trending_produts,
    shop_by_concern: translate.shop_by_concern,
    customer_reviews: translate.customer_reviews,
    reason_to_shop: translate.reason_to_shop,
    ingredints: translate.ingredints,
    shop_by_brands: translate.shop_by_brands,
    authentic_recommendation: translate.authentic_recommendation,
    lates_blog: translate.lates_blog,
    view_all: translate.view_all,
    viewCollection: translate?.viewCollection,
    readMore: translate?.readMore,
    addToCart: translate?.addToCart,
    shop_by_looks: translate?.shop_by_looks,
    add_look_to_cart: translate?.add_look_to_cart,
    bought_together: translate?.bought_together,
    similarProduct: translate?.similarProduct,
    recently_view_product: translate?.recently_view_product,
    concern_banner: get_setting(setting, 'concern_banner')?.value || '',
    notice: translate?.notice,
    authentic_rewards: translate?.authentic_rewards,
    authentic_rewards_value: translate?.authentic_rewards_value,
    referral: translate?.referral
  }

  return (
    <SessionProvider session={session}>
      <CookieProvider cookieData={cookieData} heading_title={heading_title} settingData={setting} translate={translate}>
        <ClientProviders>{children}</ClientProviders>
      </CookieProvider>
    </SessionProvider>
  )
}

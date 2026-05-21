"use client"
import { Button } from "@/components/ui/button";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import React from "react";

export default function Rewards() {
    const { translateValue } = cookieStore();
    const rewards = translateValue?.rewards
    const authentic_rewards = translateValue?.authentic_rewards
    const redeemable_exclusively_on_shop = translateValue?.redeemable_exclusively_on_shop
    const login_to_see_balance = translateValue?.login_to_see_balance
    const shop_and_earn_rewards = translateValue?.shop_and_earn_rewards
    const get_coins_on_every_purchase_and_redeem_them_while_checkout_for_additional_discount = translateValue?.get_coins_on_every_purchase_and_redeem_them_while_checkout_for_additional_discount
    const login = translateValue?.login
  return (
    <div className="flex grow flex-col shadow-md pt-16 items-center justify-center py-10 ">
      <div className="flex flex-row">
        <div className="flex p-4 pb-6 flex-col">
          <div className="flex flex-col">
            <p className="text-center text-2xl uppercase ">{authentic_rewards} {rewards} </p>
          </div>
          <div className="flex flex-col">
            <p className="text-center text-2xl font-medium">
              {redeemable_exclusively_on_shop}
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex flex-row pt-6 pb-4 px-4 justify-center shadow-xl rounded-lg  "
      >
        <div className="flex flex-col" >
          <div className="flex flex-col" >
            <p className="text-center font-semibold" >
              {shop_and_earn_rewards}
            </p>
          </div>
          <div className="flex mt-2 flex-col" >
            <p className="text-center font-medium" >
              {get_coins_on_every_purchase_and_redeem_them_while_checkout_for_additional_discount}
            </p>
          </div>
          <div className="flex mt-4 flex-col" >
            <a
              href="/login"
              className="absolute start-0 top-0 -z-50 h-0 w-0 overflow-hidden"
            >
              {login}
            </a>
            <Button
            >
              <div className="btn-label">{login_to_see_balance}</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

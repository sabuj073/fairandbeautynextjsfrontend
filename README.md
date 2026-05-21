## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

referral
authentic_rewards
my_account
cart
login
sign_out
language

trending
trending_category
new
arrivals
special
Offers
products
shop_by
concern
customer
review
reason
reason_shop
ingredints
brands
authentic
recommendation
blog
latest
view_all
about_authentic_bd
customer_care
footer_my_account
contact_with_us
footer_about_us
footer_faq
footer_contact_us
footer_shipping_return
footer_privacy_policy
footer_term_condition
footer_order_histroy
footer_my_wishlist
footer_track_order
footer_newsletter
footer_subscribe

"scripts": {
"dev": "node server.js",
"build": "next build",
"start": "NODE_ENV=production node server.js"
},

"scripts": {
"build": "next build",
"dev": "next dev",
"start": "next start"
},

==========================Note======================
=======Setting =============

1. meta_title
2. meta_description
3. meta_image (img)
4. site_icon (img)
5. site_icon (img)
6. flat_rate_shipping_cost
7. shipping_cost_admin
8. footer_logo
9. payment_method_images
10. about_us_description
11. frontend_copyright_text
12. contact_address
13. contact_email
14. contact_phone
15. facebook_link
16. instagram_link
17. youtube_link
18. linkedin_link
19. header_logo

---------Cutom-------- 6. concern_banner (img) 6. reson_to_shop (array json)

-----------Tranding----------

================Home Page=================
---------------Feature Category Section --------------------
1. api-----(categories/featured)  

2. New new_arrivals --- api-----(products)  

3. Offer Setion api -> flash-deals

4. Trending Products api -> products/best-seller

5.  Concern  Section  api -> categories/concern

6. Reason to Shop  setting key -> reson_to_shop

7. Authentic Recommendation api ->  flash-deals-recommendation

8. Ingredients api ->    flash-deals-ingredients 

9.  Shop by BRANDS  api ->  brands/top  (static %)

10. Shop by looks api -> get-look-points  and get-products-for-look-point/{point_id}

11. Customer Reviews  api -> reviews_home 

11. Blog  api -> blogs_home 


=======Product details=========
1. Frequently Bought Together  api-> products/bought_together/{id}
2. Similar Product product  api-> products/related/{id}
3. Recently viewed Product  api-> products/recently_view/{id} (post) body=> [id,id,id]

=======Missing=========
<!-- Like and Unlike not work  -->
Referal 
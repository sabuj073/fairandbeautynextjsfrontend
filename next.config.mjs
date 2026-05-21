/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ecomm.test",
      "autyhenticbd_api.test",
      "ecom_s.test",
      "autyhenticbdapi.techdynobdltd.com",
      "localhost",
      "admin.fairandbeautybd.com",
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;

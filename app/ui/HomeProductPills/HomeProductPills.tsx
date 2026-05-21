import { API_BASE_URL } from "@/app/config/api";
import { Product } from "@/types/api";
import HomeProductPillsClient from "./HomeProductPillsClient";

export type HomeProductPill = {
  id: number;
  title: string;
  highlight: string | null;
  bg_color: string;
  text_color: string;
  border_color: string;
  products: Product[];
};

async function getHomeProductPills(): Promise<HomeProductPill[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/home-product-pills`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return Array.isArray(payload?.data) ? payload.data : [];
  } catch (error) {
    console.error("Failed to fetch homepage product pills:", error);
    return [];
  }
}

export default async function HomeProductPills() {
  const pills = await getHomeProductPills();

  if (!pills.length) {
    return null;
  }

  return <HomeProductPillsClient pills={pills} />;
}

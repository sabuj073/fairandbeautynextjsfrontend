import { API_BASE_URL } from "@/app/config/api";
import TopValueCombosClient, { ComboDeal } from "./TopValueCombosClient";

async function getCombos(): Promise<ComboDeal[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/combo-deals`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return Array.isArray(payload?.data) ? payload.data : [];
  } catch (error) {
    console.error("Failed to fetch top value combos:", error);
    return [];
  }
}

export default async function TopValueCombos() {
  const combos = await getCombos();

  if (!combos.length) {
    return null;
  }

  return <TopValueCombosClient combos={combos} />;
}

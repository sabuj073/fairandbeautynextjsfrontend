import { cookies } from "next/headers";
import { fetchData } from "@/lib/dataFetching";
import { API_BASE_URL } from "../../config/api";

export async function getMenu(): Promise<any> {
  const lang = cookies().get("lang")?.value || "en";
  const response = await fetchData<any>(
    `${API_BASE_URL}/categories/menu?lang=${lang}`,
    { revalidate: 10 }
  );
  return response;
}

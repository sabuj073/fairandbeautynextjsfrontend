
import Category from "@/app/ui/Category/Category";
import { getFeaturedCategories } from '@/lib/apiData';
export default async function CategoryWrapper() {
  const data = await getFeaturedCategories();
  return <Category data={data} title={true} />;
}
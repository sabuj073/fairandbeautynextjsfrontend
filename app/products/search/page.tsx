// app/products/search/page.tsx
import FilterProduct from "@/app/ui/FilterProduct/FilterProduct";

export default function SearchPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <main className="container mx-auto px-4">
      <FilterProduct query={searchParams} />
    </main>
  );
}

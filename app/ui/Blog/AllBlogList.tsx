import React from "react";
import Container from "../Container/Container";
import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import PaginationFilter from "../FilterProduct/PaginationFilter";
import Link from "next/link";
import CustomLink from "../CustomLink";
import Image from "next/image";
import BlogSearch from "./BlogSearch";
import ReadMore from "./ReadMore";

async function getBlogs(
  page: any,
  query: any,
  category_search: any,
  subcategory_search: any
): Promise<any> {
  const url = new URL(
    `${API_BASE_URL}/blogs?query=${query}&category=${category_search}&subcategory=${subcategory_search}`
  );
  url.searchParams.append("page", page.toString());
  const response = await fetch(url.toString(), {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

export default async function AllBlogList({
  currentPage,
  query,
  category_search,
  subcategory_search,
}: any) {
  const result = await getBlogs(
    currentPage,
    query,
    category_search,
    subcategory_search
  );

  return (
    <div className="py-5">
      <Container>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 ">
          {result?.data.map((item: any) => (
            <div
              key={item.id}
              className="blog_item mb-5 p-0 lg:p-4 flex flex-col flex-wrap gap-1 lg:gap-2 "
            >
              <div className="thumbnail w-full h-[150px] lg:h-[250px] overflow-hidden flex items-start justify-start ">
                <Image
                  width={250}
                  height={220}
                  src={`${BASE_URL}/public/${item?.banner}`}
                  alt={item.title}
                  className=" img_fluid w-full h-auto rounded-lg object-contain "
                />
              </div>
              <h2 className="text-sm lg:text-lg text-neutral-black font-semibold mt-2 line-clamp-2 ">
                <Link href={`/blog/${item.slug}`} className="text-reset">
                  {item.title}
                </Link>
              </h2>
              <div>
                <span className=" text-neutral-black font-medium text-sm lg:text-lg">
                  {" "}
                  {item.created_at}
                </span>
              </div>
              <div>
                <ReadMore link={item.slug} />
                {/* <CustomLink href={`/blog/${item.slug}`} >Read more</CustomLink> */}
              </div>
            </div>
          ))}
        </div>
        {result.data.length > 0 && <PaginationFilter meta={result.meta} />}
      </Container>
    </div>
  );
}

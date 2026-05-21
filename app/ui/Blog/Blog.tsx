import React from "react";
import { getBlogs } from "@/lib/apiData";
import TranslateHeading from "../TranslateHeading";
import Container from "../Container/Container";
import ViewAll from "../ViewAll/ViewAll";
import BlogItem from "./BlogItem";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export default async function Blog() {
  const blogs = (await getBlogs()) as any;

  return (
    <Container className="pb-[70px] mb-2">
      <div className="blog flex flex-col gap-6 md:mx-0 mx-4">
        <div><TranslateHeading translateKey={"lates_blog"} /></div>
        <div className="blog_area relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="gap-2">
              {blogs?.data?.map((item: any, index: any) => (
                <CarouselItem key={item.id} className={`basis-full ${index !== 0 ? "px-1" : "px-0"}  sm:basis-1/2 md:basis-1/3 lg:basis-1/4`}>
                  <BlogItem item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" /> */}
          </Carousel>
        </div>
        <ViewAll link="/blog" />
      </div>
    </Container>
  );
}
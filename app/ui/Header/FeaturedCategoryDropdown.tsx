import Link from "next/link"
import CustomImage from "../CustomImage/CustomImage"

const FeaturedCategoryDropdown = ({ category }: any) => {
  if (!category?.children || category.children.length === 0) {
    return null
  }

  return (
    <div className="mt-[10px] flex gap-6 rounded-bl-xl rounded-br-xl shadow-md p-6 justify-between flex-row w-[80%] bg-pink-50">
      <div className="w-[100%] grid grid-cols-8">
        {category.children.map((subCategory: any, index: number) => (
          <div className="col-span-1 w-[160px]" key={index}>
            <div className="flex flex-col flex-1">
              <div className="flex pb-4 px-4 flex-col">
                <Link
                  href={`/category/${subCategory.slug}`}
                  aria-hidden="true"
                  className="absolute start-0 top-0 -z-50 h-0 w-0 overflow-hidden"
                >
                  {subCategory.name}
                </Link>
                <Link href={`/category/${subCategory.slug}`}>
                  <p className="body2 cursor-pointer font-semibold text-black">
                    {subCategory.name}
                  </p>
                </Link>
              </div>
              {subCategory.children && subCategory.children.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex flex-col px-4">
                    {subCategory.children.map((item: any, idx: number) => (
                      <div className="flex flex-col pb-3 max-w-[120px]" key={idx}>
                        <Link href={`/category/${item.slug}`}>
                          <p className="body3 cursor-pointer font-medium text-black">
                            {item.name}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-[20%]">
        {category?.icon && (
          <div className="relative">
            <CustomImage
              src={category.icon}
              alt={category.name}
              layout="responsive"
              width={250}
              height={250}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturedCategoryDropdown


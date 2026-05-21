import Image from "next/image";
import CustomImage from "../CustomImage/CustomImage";

const CollectionSection = ({ item, children }: any) => {

  return (
    <div className=" mt-[10px] flex gap-6 rounded-bl-xl rounded-br-xl shadow-md p-6 justify-between flex-row w-[80%] bg-pink-50">
      <div className=" w-[100%] grid grid-cols-8 ">
      {children.map((collection: any, index: any) => (
        <div className=" col-span-1 w-[160px] " key={index}  >
          <div className="flex flex-col flex-1">
            <div className="flex pb-4 px-4 flex-col">
              <a
                href={`/category/${collection.slug}`}
                aria-hidden="true"
                className="absolute start-0 top-0 -z-50 h-0 w-0 overflow-hidden"
              >
                {collection.name}
              </a>
              <a
                href={`/category/${collection.slug}`}>
                <p className="body2 cursor-pointer font-semibold text-black">
                  {collection.name}
                </p>
              </a>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col px-4">
                {collection.children.map((item: any, idx: any) => (
                  <div className="flex flex-col pb-3 max-w-[120px]" key={idx}>
                    <a
                      href={`/category/${item.slug}`}>

                      <p className="body3 cursor-pointer font-medium text-black">

                        {item.name}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className="flex flex-col w-[20%] ">
        {
          item?.icon_menu &&

          <div className="relative  ">
            <CustomImage
              src={item?.icon_menu}
              alt={item?.name}
              layout="responsive"
              width={250}
              height={250}
              loading="lazy"
            />
          </div>
        }
      </div>
    </div>
  );
};


export default CollectionSection;

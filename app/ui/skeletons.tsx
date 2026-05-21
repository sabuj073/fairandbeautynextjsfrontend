import { Skeleton } from "@/components/ui/skeleton";

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="p-1">
      <div className="product_item relative text-center">
        <div className="wishlist absolute top-0 right-4 w-[25px] h-[25px] bg-gray-200 rounded-2xl">
          <Skeleton className="h-full w-full rounded-2xl" />
        </div>
        <div className="product_thumb flex flex-col gap-[9px] sm:gap-4 pb-3">
          <Skeleton className="w-[200px] h-[200px] mx-auto rounded-md" />
          <Skeleton className="w-[50%] h-[16px] mx-auto mt-2 rounded-md" />
          <Skeleton className="w-[30%] h-[16px] mx-auto mt-2 rounded-md" />
          <Skeleton className="w-[70%] h-[16px] mx-auto mt-4 rounded-md" />
          <Skeleton className="w-[40%] h-[16px] mx-auto mt-2 rounded-md" />
          <Skeleton className="w-[80%] h-[16px] mx-auto mt-4 rounded-md" />
          <Skeleton className="w-full h-[40px] mt-4 rounded-md" />
        </div>
      </div>
    </div>
  );
};
export function ImageSkeleton({ width, height }: any) {
  return <Skeleton className={`w-[${width}px] h-[${height}px] mx-auto rounded-md"`} />
}
export function ReviewSkeleton() {
  return <>
    <div className="flex items-start gap-3 md:gap-6 w-full flex-wrap ">
      <div className="flex items-start md:basis-[20%] ">
        <Skeleton className="w-[250px] h-[20px] rounded-md" />
      </div>
      <div className=" flex flex-col gap-1 md:gap-[15px] flex-1">
        <Skeleton className="w-[250px] h-[15px]  rounded-md" />
        <Skeleton className="w-[340px] h-[15px]  rounded-md" />
        <Skeleton className="w-full h-[60px]  rounded-md" />
        <div className="flex gap-3 items-center" >
          <Skeleton className="w-[120px] h-[120px]  rounded-md" />
          <Skeleton className="w-[120px] h-[120px]  rounded-md" />
          <Skeleton className="w-[120px] h-[120px]  rounded-md" />
          <Skeleton className="w-[120px] h-[120px]  rounded-md" />
        </div>
      </div>

    </div>


  </>
}

export function CategorySkeleton({ width, height }: any) {
  return <Skeleton className={`w-[${width}px] h-[${height}px] mx-auto rounded-md"`} />
}
export function SearchProductSkeleton() {
  return <div>
    <div className="flex items-center justify-start gap-4 mb-4 mt-4">
      <div className="w-[60px] h-[60px]" >
        <Skeleton className={`w-[60px] h-[60px] rounded-md"`} />
      </div>
      <div>
        <p className="text-sm text-gray-600"><Skeleton className={`w-[250px] h-[20px] rounded-md"`} /></p>
        <div className="flex items-center mt-2">
          <span className="text-primary-500 text-lg font-semibold"><Skeleton className={`w-[100px] h-[20px] rounded-md"`} /> </span>
          <span className="text-gray-400 text-sm ml-2 line-through"><Skeleton className={`w-[100px] h-[20px] rounded-md"`} /></span>
          <span className="text-green-500 text-sm ml-2"><Skeleton className={`w-[50px] h-[20px] rounded-md"`} /></span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-start gap-4 mb-4 mt-4">
      <div className="w-[60px] h-[60px]" >
        <Skeleton className={`w-[60px] h-[60px] rounded-md"`} />
      </div>
      <div>
        <p className="text-sm text-gray-600"><Skeleton className={`w-[250px] h-[20px] rounded-md"`} /></p>
        <div className="flex items-center mt-2">
          <span className="text-primary-500 text-lg font-semibold"><Skeleton className={`w-[100px] h-[20px] rounded-md"`} /> </span>
          <span className="text-gray-400 text-sm ml-2 line-through"><Skeleton className={`w-[100px] h-[20px] rounded-md"`} /></span>
          <span className="text-green-500 text-sm ml-2"><Skeleton className={`w-[50px] h-[20px] rounded-md"`} /></span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-start gap-4 mb-4 mt-4">
      <div className="w-[60px] h-[60px]" >
        <Skeleton className={`w-[60px] h-[60px] rounded-md"`} />
      </div>
      <div>
        <p className="text-sm text-gray-600"><Skeleton className={`w-[250px] h-[20px] rounded-md"`} /></p>
        <div className="flex items-center mt-2">
          <span className="text-primary-500 text-lg font-semibold"><Skeleton className={`w-[100px] h-[20px] rounded-md"`} /> </span>
          <span className="text-gray-400 text-sm ml-2 line-through"><Skeleton className={`w-[100px] h-[20px] rounded-md"`} /></span>
          <span className="text-green-500 text-sm ml-2"><Skeleton className={`w-[50px] h-[20px] rounded-md"`} /></span>
        </div>
      </div>
    </div>
  </div>
}

export function ListProductSkeleton() {
  const skeletons = Array(10).fill(null)
  return <div className="space-y-4">
    {skeletons.map((_, index) => (
      <Skeleton key={index} className="w-[80%] h-[25px] rounded-sm mb-3 " />
    ))}
  </div>
}

export function ProductSkeletonGrid({ count = 4 }) {
  const skeletons = Array(10).fill(null)
  return <div className={`grid  pt-4  grid-cols-2 md:grid-cols-3 lg:grid-cols-${count} xl:grid-cols-${count} `} >
    {skeletons.map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
}

export function BlogSkeletonGrid({ count = 4 }) {
  const skeletons = Array(10).fill(null)
  return <div className={`grid  pt-4  grid-cols-2 md:grid-cols-3 lg:grid-cols-${count} xl:grid-cols-${count} `} >
    {skeletons.map((_, index) => (
      <div className="p-1" key={index} >
        <div className="product_item relative text-center">
          <div className="product_thumb flex flex-col gap-[9px] sm:gap-4 pb-3">
            <div className="w-[200px] h-[200px] mx-auto rounded-md">
              <Skeleton className="w-[200px] h-[200px] mx-auto rounded-md" />
            </div>
            <Skeleton className="w-full h-[16px] mx-auto mt-2 rounded-md" />
            <Skeleton className="w-full h-[16px] mx-auto mt-2 rounded-md" />
          </div>
        </div>
      </div>
    ))}
  </div>
}

export function CollectionSkelton() {
  const skeletons = Array(4).fill(null)
  return <div className={`grid  grid-cols-2 `} >
    {skeletons.map((_, index) => (
      <Skeleton key={index} className="w-full h-[294px] rounded-sm mb-3 " />
    ))}
  </div>
}
export function TableSkeletonGrid() {
  const skeletons = Array(5).fill(null)
  return <div className=" mt-3" >
    <Skeleton className="w-[200px] h-[30px] rounded-sm mb-3 " />
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="pb-3 font-medium">Code</th>
          <th className="pb-3 font-medium">Date</th>
          <th className="pb-3 font-medium">Amount</th>
          <th className="pb-3 font-medium">Delivery Status</th>
          <th className="pb-3 font-medium">Payment Status</th>
          <th className="pb-3 font-medium">Options</th>
        </tr>
      </thead>
      <tbody>
        {skeletons.map((_, index) => (
          <tr key={index} className="border-b last:border-b-0">
            <td className="py-4 text-red-500"><Skeleton key={index} className="w-[100px] h-[20px] rounded-sm mb-3 " /></td>
            <td className="py-4"><Skeleton key={index} className="w-[100px] h-[20px] rounded-sm mb-3 " /></td>
            <td className="py-4"><Skeleton key={index} className="w-[100px] h-[20px] rounded-sm mb-3 " /></td>
            <td className="py-4">
              <Skeleton key={index} className="w-[100px] h-[20px] rounded-sm mb-3 " />
            </td>
            <td className="py-4">
              <Skeleton key={index} className="w-[100px] h-[20px] rounded-sm mb-3 " />
            </td>
            <td className="py-4">
              <div className="flex items-center justify-center ">
                <Skeleton key={index} className="w-[50px] h-[20px] rounded-sm mb-3 " />
                <Skeleton key={index} className="w-[50px] h-[20px] rounded-sm mb-3 " />
                <Skeleton key={index} className="w-[50px] h-[20px] rounded-sm mb-3 " />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}
export function ShopLookProductSkelton() {
  const skeletons = Array(5).fill(null)
  return <div className=" mt-3 overflow-scroll md:flex-col flex " >
    {skeletons.map((_, index) => (

      <Skeleton key={index} className="w-full h-[110px] rounded-sm mb-3 " />
    ))}
  </div>
}

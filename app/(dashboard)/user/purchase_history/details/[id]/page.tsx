
import OrderDetails from '@/app/ui/dashboard/OrderDetailsModal';
import { TableSkeletonGrid } from '@/app/ui/skeletons';
import React, { Suspense } from 'react'



export default async function Page({ params }: any) {

  return (
    <Suspense key={JSON.stringify(params)} fallback={<TableSkeletonGrid />} >
      <OrderDetails params={params} />
    </Suspense>
  )
}

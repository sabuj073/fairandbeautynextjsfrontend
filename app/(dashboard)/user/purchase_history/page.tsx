import PurchaseHistoryTable from '@/app/ui/dashboard/PurchaseHistoryTable'
import { TableSkeletonGrid } from '@/app/ui/skeletons';
import React, { Suspense } from 'react'

export default function Page({ searchParams }: any) {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<TableSkeletonGrid />} >
      <PurchaseHistoryTable currentPage={currentPage} />
    </Suspense>
  )
}

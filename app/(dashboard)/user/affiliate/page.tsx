import { API_BASE_URL } from '@/app/config/api';
import AffiliateDashboard from '@/app/ui/AffiliateDashboard/AffiliateDashboard'
import React from 'react'



export default async function page({params}:any) {
 
console.log("get params",params)
  return (
    <div>
        <AffiliateDashboard/>
    </div>
  )
}

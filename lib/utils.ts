import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { cookieStore } from "./hooks/useCookieStore"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString()
  return doc
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`
}
export const get_setting = (data: any, type: any) => {
  return data?.find((item: any) => {
    if (item.type === type) {
      return item
    }
  })
}
export const get_translate = (translate: any) => {
  let title = null
  let subtitle = null
  if (translate) {
    const data = translate.split(" ")
    if (data.length > 0) {
      title = translate || null;
      subtitle = data.slice(1).join(" ") || null;
    }
  }
  return { title, subtitle }
}
export const transformData = (data: any) => {
  const result = [];
  if (data) {
    for (let i = 0; i < data.length; i += 2) {
      result.push({
        column: data.slice(i, i + 2)
      });
    }
  }

  return result;
}



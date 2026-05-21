// utils/dataFetching.ts

import { REVALIDATE } from "@/app/config/api";

type FetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

type MutationMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';


export async function fetchData<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const {
    revalidate = REVALIDATE,
    tags,
  } = options;

  const res = await fetch(url, {
    next: {
      revalidate: revalidate,
      tags: tags,
    },
  });
  if (!res.ok) {
    return [] as any
  }

  return res.json() as Promise<T>;
}

export async function mutateData<T, U>(url: string, method: MutationMethod, body: T): Promise<U> {

  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return res.json() as Promise<U>;
  }

  return res.json() as Promise<U>;
}
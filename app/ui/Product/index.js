// pages/products/index.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductListPage() {
  const router = useRouter();
  const { filter } = router.query; // get ?filter=buy1get1

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!filter) return;

    let apiUrl = "";
    if (filter === "buy1get1") {
      apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/buy-1-get-1`;
    } else if (filter === "clearance") {
      apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/clearance`;
    } else {
      // fallback or default
      return;
    }

    axios.get(apiUrl)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

  }, [filter]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-4 font-bold capitalize">{filter?.replace("-", " ")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="font-semibold">{product.name}</h2>
            <p>Price: {product.unit_price}</p>
          </div>
        )) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { ProductDetails } from "@/types/api";

interface ProductDetailsTableProps {
  productDetails: ProductDetails;
}

export default function ProductDetailsTable({ productDetails }: ProductDetailsTableProps) {
  // Helper function to check if a row should be displayed
  const shouldShowRow = (value: any) => {
    return value !== null && value !== undefined && value !== '';
  };

  const tableRows = [
    {
      label: "Product Category",
      value: productDetails.category?.name || null,
      bgColor: 'rgb(245 241 241)',
      isHtml: false,
    },
    {
      label: "Brand",
      value: productDetails.brand?.name || null,
      bgColor: '',
      isHtml: false,
    },
    {
      label: "Size",
      value: productDetails.product_size || null,
      bgColor: 'rgb(245 241 241)',
      isHtml: false,
    },
    {
      label: "Ideal For",
      value: productDetails.ideal_for || null,
      bgColor: '',
      isHtml: false,
    },
    {
      label: "Function",
      value: productDetails.product_function || null,
      bgColor: 'rgb(245 241 241)',
      isHtml: false,
    },
    {
      label: "Key Ingredients",
      value: productDetails.key_ingredient || null,
      bgColor: '',
      isHtml: false,
    },
    {
      label: "Country",
      value: productDetails.country || null,
      bgColor: 'rgb(245 241 241)',
      isHtml: false,
    },
  ].filter(row => shouldShowRow(row.value));

  if (tableRows.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h1 className="text-base font-semibold md:ml-2 mb-3">
        Product Info of {productDetails.name}
      </h1>

      <div className="overflow-x-auto md:mx-2">
        <table className="min-w-full border border-gray-300 text-sm border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th
                colSpan={2}
                style={{background: "linear-gradient(180deg, #139804 0%, #063B00 100%)"}}
                className="px-4 py-2 font-medium border text-white text-center border-gray-300"
              >
                Product Info
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr 
                key={index}
                style={{ backgroundColor: row.bgColor || '' }} 
                className={row.bgColor ? "bg-black" : "bg-gray-50"}
              >
                <td className="px-4 py-2 font-semibold text-sm border border-gray-300 w-40">
                  {row.label}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {row.isHtml ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: String(row.value),
                      }}
                    />
                  ) : (
                    row.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

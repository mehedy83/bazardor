
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

interface CategoryProductListProps {
  products: Product[];
}

export default function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sort === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <div>
      {/* Sorting */}
      <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
        <p className="text-xs text-gray-500">
          মোট {new Intl.NumberFormat("bn-BD").format(products.length)} টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="product-sort"
            className="text-xs text-gray-600"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম দাম</option>
            <option value="high-to-low">বেশি দাম</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 min-[600px]:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
          <p className="text-3xl">🛒</p>
          <p className="mt-3 text-sm text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
}

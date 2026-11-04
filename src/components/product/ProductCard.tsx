
"use client";

import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD").format(price);

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeColor = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-500";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-3 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50">
          <span className="text-3xl">
            {product.image || "🛒"}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-bold text-gray-800 group-hover:text-green-700">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-800">প্রতি কেজি</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-800">আজকের দাম</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatPrice(product.today)}  
            <span className="ml-1 text-14 font-normal text-gray-800">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${changeColor}`}
        >
          {changeIcon} {formatPrice(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}

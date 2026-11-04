
"use client";

import Marquee from "react-fast-marquee";
import type { Product } from "@/types/product";
import Link from "next/link";

interface PriceTickerProps {
  products: Product[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

export default function PriceTicker({ products }: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-green-100 bg-green-50">
      <Marquee
        speed={45}
        gradient={false}
        pauseOnHover
        className="py-3"
      >
        {products.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="mx-7 flex shrink-0 items-center gap-2 text-sm transition hover:opacity-70 cursor-pointer"
              >
              {/* Product Emoji */}
              <span className="text-lg">
                {product.image || "🛒"}
              </span>

              {/* Product Name */}
              <span className="font-semibold text-gray-800">
                {product.nameBn}
              </span>

              {/* Current Price */}
              <span className="text-gray-600">
                ৳{formatPrice(product.today)}/{product.unit}
              </span>

              {/* Price Change */}
              <span
                className={`font-bold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-green-700"
                      : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {formatPrice(product.change.pct)}%
              </span>

              <span className="ml-5 text-green-200">|</span>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}

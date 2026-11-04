
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const markets = product.markets;

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : 0;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : 0;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : 0;

  const priceDifference = Math.abs(
    product.today - product.yesterday
  );

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#f1f6f1]">
      <div className="container-custom px-4 py-6">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-semibold text-gray-800">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <section className="flex items-center justify-between gap-4 rounded-2xl border border-[#e1e9e1] bg-white/80 p-4 sm:p-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] sm:h-16 sm:w-16">
              <span className="text-4xl">
                {product.image || "🛒"}
              </span>
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-xs text-gray-700">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-semibold">
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                </span>
                {product.change.dir !== "flat" &&
                  ` · ${formatPrice(priceDifference)} টাকা`}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-[#f1f6f1] px-3 py-3 text-center sm:px-5">
            <p className="text-[10px] text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {product.unit}
            </p>

            <p
              className={`mt-1 text-xs font-bold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Summary + Market Table */}
        <section className="mt-5 rounded-2xl border border-[#e1e9e1] bg-white/80 p-4 sm:p-5">

          <h2 className="mb-4 text-base font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-xl border border-[#e1e9e1] p-4">
              <p className="text-xs text-gray-600">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-2 text-lg font-bold text-green-700">
                {markets.length > 0
                  ? `${formatPrice(lowestPrice)} টাকা`
                  : "তথ্য নেই"}
              </p>
              <p className="mt-1 text-[10px] text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#e1e9e1] p-4">
              <p className="text-xs text-gray-600">
                সর্বোচ্চ দাম
              </p>
              <p className="mt-2 text-lg font-bold text-red-600">
                {markets.length > 0
                  ? `${formatPrice(highestPrice)} টাকা`
                  : "তথ্য নেই"}
              </p>
              <p className="mt-1 text-[10px] text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#e1e9e1] p-4">
              <p className="text-xs text-gray-600">
                গড় দাম
              </p>
              <p className="mt-2 text-lg font-bold text-green-700">
                {markets.length > 0
                  ? `${formatPrice(Math.ceil(averagePrice))} টাকা`
                  : "তথ্য নেই"}
              </p>
              <p className="mt-1 text-[10px] text-gray-500">
                প্রতি {product.unit}-এর হিসাবে
              </p>
            </div>

          </div>

          {/* Market Table */}
          <h2 className="mb-3 mt-6 text-base font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-[#e1e9e1]">
              <table className="w-full min-w-[600px] border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-[#f8faf8] text-gray-500">
                    <th className="p-3 font-semibold">বাজার</th>
                    <th className="p-3 font-semibold">বিভাগ</th>
                    <th className="p-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="p-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="p-3 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className={`border-t border-gray-100 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-[#f1f6f1]"
                      }`}
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {market.market}
                      </td>

                      <td className="p-3 text-gray-600">
                        {market.division}
                      </td>

                      <td className="p-3 text-right text-gray-700">
                        {formatPrice(market.min)} টাকা
                      </td>

                      <td className="p-3 text-right text-gray-700">
                        {formatPrice(market.max)} টাকা
                      </td>

                      <td className="p-3 text-right font-semibold text-gray-800">
                        {formatPrice(
                          (market.min + market.max) / 2
                        )} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">
              বাজারের তথ্য পাওয়া যায়নি।
            </p>
          )}

        </section>
      </div>
    </main>
  );
}

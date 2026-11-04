
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import CategoryProductList from "@/components/category/CategoryProductList";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const allProducts = await getProducts();

  const products = allProducts.filter(
    (product) => product.category === slug
  );

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-[#f1f6f1]">
      <div className="container-custom px-4 py-6">

        {/* Category Header */}
        <section className="mb-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f6f1]">
            <span className="text-3xl">
              {categoryIcon}
            </span>
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {categoryName}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {categoryName} সম্পর্কিত সকল পণ্যের বর্তমান বাজারদর
            </p>
          </div>
        </section>

        {/* Product Count and Sorting */}
        <p className="mb-3 text-xs text-gray-500">
          {categoryName} বিভাগের সকল পণ্য
        </p>

        <CategoryProductList products={products} />

        {/* Back to Home */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-sm font-semibold text-green-700 hover:underline"
          >
            ← সকল পণ্যে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
}

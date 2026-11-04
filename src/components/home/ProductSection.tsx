
import type { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  icon: string;
  id?: string;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  icon,
  id,
}: ProductSectionProps) {
  const indicatorColor =
    icon === "📈"
      ? "text-red-600"
      : icon === "📉"
        ? "text-green-600"
        : "text-gray-400";

  const indicator =
    icon === "📈" ? "▲" : icon === "📉" ? "▼" : "";

  return (
    <section id={id} className="container-custom scroll-mt-32 px-4 py-6">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          {indicator && (
            <span className={`text-sm ${indicatorColor}`}>
              {indicator}
            </span>
          )}
          {title}
        </h2>

        <p className="mt-2 text-xs text-gray-700">
          {subtitle}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 min-[600px]:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}

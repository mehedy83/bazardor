import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  // যেসব পণ্যের দাম বেড়েছে
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // যেসব পণ্যের দাম কমেছে
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <>
      <Hero />

      <div className="bg-[#f1f6f1]">
        <ProductSection
          title="যেসব পণ্যের দাম বেড়েছে"
          subtitle="আজকের বাজারে সবচেয়ে বেশি দাম বেড়েছে"
          products={risers}
          icon="📈"
        />

        <ProductSection
          title="যেসব পণ্যের দাম কমেছে"
          subtitle="আজকের বাজারে যেসব পণ্যের দাম কমেছে"
          products={fallers}
          icon="📉"
        />

        <ProductSection
          title="সকল পণ্য"
          subtitle="নিত্যপ্রয়োজনীয় সব পণ্যের বর্তমান বাজারদর"
          products={products}
          icon="🛒"
          id="সব-পণ্য"
        />
      </div>
    </>
  );
}
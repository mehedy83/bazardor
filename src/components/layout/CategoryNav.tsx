
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "সব পণ্য", slug: "" },
  { name: "🍚চাল", slug: "chal" },
  { name: "🫘ডাল", slug: "dal" },
  { name: "🛢️তেল", slug: "tel" },
  { name: "🥬সবজি", slug: "sobji" },
  { name: "🐟মাছ", slug: "mach" },
  { name: "🥩মাংস", slug: "mangsho" },
  { name: "🥛ডিম-দুধ", slug: "dim-dui" },
  { name: "🌶️মসলা", slug: "mosla" },


];

interface CategoryNavProps {
  mobile?: boolean;
}

export default function CategoryNav({
  mobile = false,
}: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-1"
          : "flex items-center gap-2 overflow-x-auto border-t border-gray-100"
      }
    >
      {categories.map((category) => {
        const href = category.slug
          ? `/category/${category.slug}`
          : "/";

        const active = category.slug
          ? pathname === href
          : pathname === "/";

        return (
          <Link
            key={category.slug || "all"}
            href={href}
            className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${
              active
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
            } ${mobile ? "w-full" : ""}`}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}

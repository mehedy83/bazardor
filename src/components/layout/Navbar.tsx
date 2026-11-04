
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import type { Product } from "@/types/product";

interface NavbarProps {
  products: Product[];
}

export default function Navbar({ products }: NavbarProps) {
  const pathname = usePathname();

  const [date, setDate] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-gray-100">
        <div className="container-custom">
          <div className="flex min-h-[76px] items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-2xl">
                <img src="/logo-icon.png" alt="Logo" />
              </span>

              <span>
                <span className="block text-2xl font-bold leading-tight text-green-700">
                  বাজার দর
                </span>

                <span className="text-xs text-gray-500">
                  {date || "বাংলাদেশের বাজারদর"}
                </span>
              </span>
            </Link>

            {/* Desktop Authentication Buttons */}
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/signin"
                className="rounded-lg border border-green-700 px-5 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 sm:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenu}
            >
              {mobileMenu ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <div className="hidden sm:block">
            <CategoryNav />
          </div>

          {/* Mobile Navigation */}
          {mobileMenu && (
            <div className="border-t border-gray-100 py-4 sm:hidden">
              <CategoryNav mobile />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/signin"
                  className="rounded-lg border border-green-700 py-2.5 text-center font-semibold text-green-700"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-green-700 py-2.5 text-center font-semibold text-white"
                >
                  সাইন আপ
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* API Based Price Ticker */}
      <PriceTicker products={products} />
    </header>
  );
}

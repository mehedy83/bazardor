"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, UserRound, LogOut } from "lucide-react";
import toast from "react-hot-toast";

import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import { authClient } from "@/lib/auth-client";
import type { Product } from "@/types/product";

interface NavbarProps {
  products: Product[];
}

export default function Navbar({ products }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [date, setDate] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

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
    setProfileMenu(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      setProfileMenu(false);
      setMobileMenu(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    }
  };

  const user = session?.user;

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

            {/* Desktop Authentication */}
            <div className="hidden items-center gap-3 sm:flex">
              {!isPending && (
                <>
                  {user ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setProfileMenu(!profileMenu)}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
                        aria-expanded={profileMenu}
                      >
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        )}

                        <span className="max-w-28 truncate text-sm font-medium text-gray-800">
                          {user.name}
                        </span>

                        <ChevronDown size={15} />
                      </button>

                      {profileMenu && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                          <div className="border-b border-gray-100 px-2 pb-3">
                            <p className="truncate text-sm font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>

                          <Link
                            href="/profile"
                            className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                          >
                            <UserRound size={16} />
                            আমার প্রোফাইল
                          </Link>

                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 transition hover:bg-red-50"
                          >
                            <LogOut size={16} />
                            সাইন আউট
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </>
              )}
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

              <div className="mt-4 border-t border-gray-100 pt-4">
                {!isPending && (
                  <>
                    {user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                              {user.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/profile"
                          className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-sm font-semibold text-green-700"
                        >
                          <UserRound size={17} />
                          আমার প্রোফাইল
                        </Link>

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600"
                        >
                          <LogOut size={17} />
                          সাইন আউট
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
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
                    )}
                  </>
                )}
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
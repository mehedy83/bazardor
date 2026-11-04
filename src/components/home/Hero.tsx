
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date())
    );
  }, []);

  return (
    <section className="bg-[#f1f6f1] px-4 py-8 sm:py-10">
      <div className="container-custom">
        <div className="grid  gap-6 overflow-hidden rounded-2xl border border-[#e3ebe3] bg-[#f9fcf9] px-6 py-8 sm:px-10 md:grid-cols-[1.4fr_0.8fr] md:py-10">

          {/* Hero Content */}
          <div>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {today || "আজকের বাজারদর"}
            </span>

            <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-6 max-w-xl text-md leading-6 text-gray-500">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="/#সব-পণ্য"
              className="mt-10 inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              সব দাম দেখুন
            </Link>
          </div>

          {/* Hero Image */}
          <div className="flex items-center justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের তাজা পণ্য"
              width={420}
              height={300}
              priority
              className="h-auto w-full max-w-[320px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

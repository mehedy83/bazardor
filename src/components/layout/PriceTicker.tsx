
"use client";

import Marquee from "react-fast-marquee";

const tickerItems = [
  { emoji: "🍚", name: "চাল", price: "৭০ টাকা/কেজি", change: "▲ ২.১%", up: true },
  { emoji: "🥔", name: "আলু", price: "৩৫ টাকা/কেজি", change: "▼ ১.৫%", up: false },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৬০ টাকা/কেজি", change: "▲ ৩.২%", up: true },
  { emoji: "🥚", name: "ডিম", price: "১৩০ টাকা/ডজন", change: "▼ ০.৮%", up: false },
  { emoji: "🌶️", name: "মরিচ", price: "১২০ টাকা/কেজি", change: "▲ ২.৫%", up: true },
  { emoji: "🫘", name: "মসুর ডাল", price: "১১০ টাকা/কেজি", change: "— ০.০%", up: null },
];

export default function PriceTicker() {
  return (
    <div className="border-b border-green-100 bg-green-50">
      <Marquee
        speed={45}
        gradient={false}
        pauseOnHover
        className="py-3"
      >
        {tickerItems.map((item, index) => (
          <div
            key={index}
            className="mx-7 flex shrink-0 items-center gap-2 text-sm"
          >
            <span className="text-lg">{item.emoji}</span>

            <span className="font-semibold text-gray-800">
              {item.name}
            </span>

            <span className="text-gray-600">{item.price}</span>

            <span
              className={`font-bold ${
                item.up === true
                  ? "text-red-600"
                  : item.up === false
                    ? "text-green-700"
                    : "text-gray-500"
              }`}
            >
              {item.change}
            </span>

            <span className="ml-5 text-green-200">|</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

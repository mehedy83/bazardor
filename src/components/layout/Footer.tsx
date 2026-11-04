
export default function Footer() {
  return (
    <footer className="border-t border-[#e1e9e1] bg-white">
      <div className="container-custom flex flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:text-left">
        {/* Left */}
        <p className="text-sm font-semibold text-gray-700">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right */}
        <p className="text-xs leading-5 text-gray-800">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}

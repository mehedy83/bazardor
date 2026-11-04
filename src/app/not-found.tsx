import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-custom flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-7xl">🔍</div>

      <h1 className="text-4xl font-bold text-gray-800">
        404
      </h1>

      <h2 className="mt-3 text-2xl font-semibold text-gray-700">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
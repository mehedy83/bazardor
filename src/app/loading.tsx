export default function Loading() {
  return (
    <div className="container-custom min-h-[60vh] py-12">
      <div className="mb-8 space-y-3">
        <div className="skeleton h-8 w-48 rounded-lg"></div>
        <div className="skeleton h-4 w-72 rounded-lg"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-4"
          >
            <div className="skeleton mb-4 h-32 w-full rounded-xl"></div>
            <div className="skeleton mb-3 h-5 w-3/4"></div>
            <div className="skeleton mb-4 h-4 w-1/2"></div>
            <div className="skeleton h-7 w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
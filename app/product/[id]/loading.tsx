export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 animate-pulse">
        <div className="bg-gray-100 rounded-3xl aspect-square w-full"></div>
        <div className="flex flex-col py-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-32 bg-gray-200 rounded w-full mb-8"></div>
          <div className="flex gap-4 mt-auto">
            <div className="h-14 bg-gray-200 rounded w-32"></div>
            <div className="h-14 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

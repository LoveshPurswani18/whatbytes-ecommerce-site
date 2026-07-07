export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl w-full px-6 py-8 md:px-12 flex-1 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-gray-200 rounded-xl h-[400px]"></div>
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 h-[400px]">
                <div className="aspect-square w-full rounded-lg bg-gray-200 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

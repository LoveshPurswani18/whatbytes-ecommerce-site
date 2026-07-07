"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "../ui/Button";

export function EmptyState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const categories = searchParams.getAll("category");
  const price = searchParams.get("price");

  const hasFilters = query || categories.length > 0 || price;

  const removeFilter = (key: string, valueToRemove?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (valueToRemove) {
      const values = params.getAll(key);
      params.delete(key);
      values.filter(v => v !== valueToRemove).forEach(v => params.append(key, v));
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-2xl shadow-sm border border-gray-50 min-h-[400px]">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        We couldn't find any products matching your current criteria. 
        {hasFilters && " Try removing some filters to see more results."}
      </p>

      {hasFilters && (
        <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-lg">
          {query && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
              <span>Search: "{query}"</span>
              <button onClick={() => removeFilter("q")} className="hover:text-blue-900 transition-colors rounded-full p-0.5 hover:bg-blue-200" aria-label="Remove search filter">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}
          {categories.map(cat => (
            <div key={cat} className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
              <span className="capitalize">Category: {cat}</span>
              <button onClick={() => removeFilter("category", cat)} className="hover:text-purple-900 transition-colors rounded-full p-0.5 hover:bg-purple-200" aria-label="Remove category filter">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          {price && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
              <span>Price: ${price.replace("-", " - $")}</span>
              <button onClick={() => removeFilter("price")} className="hover:text-green-900 transition-colors rounded-full p-0.5 hover:bg-green-200" aria-label="Remove price filter">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}
        </div>
      )}

      <Button 
        onClick={() => router.push("/")}
        className="px-8 py-2.5 rounded-xl font-medium shadow-sm transition-all hover:shadow-md"
      >
        Reset All Filters
      </Button>
    </div>
  );
}

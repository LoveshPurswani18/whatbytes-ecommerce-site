"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export function EmptyState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-2xl shadow-sm border border-gray-50 h-[400px]">
      <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        We couldn't find any products matching your current filters and search query.
      </p>
      <Button 
        onClick={() => router.push("/")}
        className="px-8 rounded-xl font-medium shadow-sm"
      >
        Reset Filters
      </Button>
    </div>
  );
}

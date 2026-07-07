"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface CategoryFilterProps {
  categories: string[];
}

function CategoryFilterContent({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "all";
  const options = ["all", ...categories];

  const handleSelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    // Update URL as the single source of truth using replace
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4">Category</h3>
      <div className="space-y-2">
        {options.map((category) => {
          const isSelected = currentCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className="flex items-center space-x-3 group w-full text-left"
            >
              <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                <div className={cn("w-5 h-5 border-2 rounded-full transition-colors", isSelected ? "border-white" : "border-white/50")}></div>
                {isSelected && (
                  <div className="absolute w-2.5 h-2.5 bg-white rounded-full"></div>
                )}
              </div>
              <span
                className={cn(
                  "capitalize transition-colors",
                  isSelected ? "text-white font-medium" : "text-gray-300 group-hover:text-white"
                )}
              >
                {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CategoryFilter(props: CategoryFilterProps) {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse bg-white/5 rounded-xl"></div>}>
      <CategoryFilterContent {...props} />
    </Suspense>
  );
}

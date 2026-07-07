"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const [isPending, startTransition] = useTransition();

  const handleSelect = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category === "all") {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const options = ["all", ...categories];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4">Category</h3>
      <div className={cn("space-y-2", isPending && "opacity-70")}>
        {options.map((category) => {
          const isSelected = currentCategory === category;
          return (
            <label
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={isSelected}
                  onChange={() => handleSelect(category)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-white/50 rounded-full peer-checked:border-white transition-colors"></div>
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
            </label>
          );
        })}
      </div>
    </div>
  );
}

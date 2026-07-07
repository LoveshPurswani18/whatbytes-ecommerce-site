"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
}

function PriceFilterContent({ minPrice, maxPrice }: PriceFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const priceParam = searchParams.get("price");
  let parsedMax = priceParam ? parseFloat(priceParam.split("-")[1]) : maxPrice;
  const urlMaxPrice = isNaN(parsedMax) ? maxPrice : parsedMax;
  
  // Local state purely for visual UX while dragging
  const [localMax, setLocalMax] = useState(urlMaxPrice);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local state when URL changes (e.g., reset filters or back button)
  useEffect(() => {
    setLocalMax(urlMaxPrice);
  }, [urlMaxPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setLocalMax(val); // Instant UI update

    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (val >= maxPrice) {
        params.delete("price");
      } else {
        params.set("price", `${Math.floor(minPrice)}-${Math.ceil(val)}`);
      }
      // Apply filter to URL
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);
  };

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-semibold text-white">Price</h3>
      
      <div className="relative w-full flex items-center py-2">
        <input
          type="range"
          min={Math.floor(minPrice)}
          max={Math.ceil(maxPrice)}
          value={localMax}
          onChange={handleChange}
          className="w-full cursor-pointer accent-white"
          style={{ accentColor: "white" }}
        />
      </div>

      <div className="flex justify-between text-white font-medium text-sm">
        <span>${Math.floor(minPrice)}</span>
        <span>${Math.ceil(localMax)}</span>
      </div>
    </div>
  );
}

export function PriceFilter(props: PriceFilterProps) {
  return (
    <Suspense fallback={<div className="h-16 animate-pulse bg-white/5 rounded-xl mt-8"></div>}>
      <PriceFilterContent {...props} />
    </Suspense>
  );
}

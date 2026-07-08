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
  let parsedMin = priceParam ? parseFloat(priceParam.split("-")[0]) : minPrice;
  let parsedMax = priceParam ? parseFloat(priceParam.split("-")[1]) : maxPrice;
  const urlMinPrice = isNaN(parsedMin) ? minPrice : parsedMin;
  const urlMaxPrice = isNaN(parsedMax) ? maxPrice : parsedMax;

  // Local state purely for visual UX while dragging
  const [localMin, setLocalMin] = useState(urlMinPrice);
  const [localMax, setLocalMax] = useState(urlMaxPrice);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local state when URL changes (e.g., reset filters or back button)
  useEffect(() => {
    setLocalMin(urlMinPrice);
    setLocalMax(urlMaxPrice);
  }, [urlMinPrice, urlMaxPrice]);

  const pushToUrl = (newMin: number, newMax: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      // If the selected bounds match or exceed the contextual bounds, we can clear the param entirely.
      if (newMin <= minPrice && newMax >= maxPrice) {
        params.delete("price");
      } else {
        params.set("price", `${Math.floor(newMin)}-${Math.ceil(newMax)}`);
      }
      // Apply filter to URL
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const newMin = Math.min(val, localMax); // Prevent crossing
    setLocalMin(newMin);
    pushToUrl(newMin, localMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const newMax = Math.max(val, localMin); // Prevent crossing
    setLocalMax(newMax);
    pushToUrl(localMin, newMax);
  };

  const range = maxPrice - minPrice || 1;
  const leftPercent = ((localMin - minPrice) / range) * 100;
  const rightPercent = 100 - ((localMax - minPrice) / range) * 100;

  const thumbStyles = "absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer";

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-semibold text-white">Price</h3>

      <div className="relative w-full h-1 bg-white/20 rounded-full flex items-center">
        {/* Active Track Highlight */}
        <div 
          className="absolute h-full bg-white rounded-full"
          style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
        />
        
        {/* Min Thumb */}
        <input
          type="range"
          min={Math.floor(minPrice)}
          max={Math.ceil(maxPrice)}
          value={localMin}
          onChange={handleMinChange}
          className={thumbStyles}
          style={{ zIndex: localMin > maxPrice - 100 ? 5 : 3 }}
        />
        
        {/* Max Thumb */}
        <input
          type="range"
          min={Math.floor(minPrice)}
          max={Math.ceil(maxPrice)}
          value={localMax}
          onChange={handleMaxChange}
          className={thumbStyles}
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="flex justify-between text-white font-medium text-sm">
        <span>${Math.floor(localMin)}</span>
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

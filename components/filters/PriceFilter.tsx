"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
}

export function PriceFilter({ minPrice, maxPrice }: PriceFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceParam = searchParams.get("price");
  const [isPending, startTransition] = useTransition();

  // Parse URL param or fallback to actual min/max
  const initialMax = priceParam ? parseFloat(priceParam.split("-")[1]) : maxPrice;
  const [currentMax, setCurrentMax] = useState(initialMax);

  // Sync state if props/url change
  useEffect(() => {
    if (priceParam) {
      setCurrentMax(parseFloat(priceParam.split("-")[1]));
    } else {
      setCurrentMax(maxPrice);
    }
  }, [priceParam, maxPrice]);

  const handleUpdate = useCallback(
    (newMax: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newMax >= maxPrice) {
        params.delete("price");
      } else {
        params.set("price", `${Math.floor(minPrice)}-${Math.ceil(newMax)}`);
      }
      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
    [router, searchParams, minPrice, maxPrice]
  );

  // Debounce the URL update while dragging
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMax !== (priceParam ? parseFloat(priceParam.split("-")[1]) : maxPrice)) {
        handleUpdate(currentMax);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [currentMax, handleUpdate, priceParam, maxPrice]);

  const percentage = ((currentMax - minPrice) / (maxPrice - minPrice)) * 100 || 0;

  return (
    <div className={cn("space-y-6 mt-8", isPending && "opacity-70")}>
      <h3 className="text-lg font-semibold text-white">Price</h3>
      
      <div className="relative w-full h-1 bg-white/30 rounded-full">
        {/* Active Track */}
        <div 
          className="absolute h-full bg-white rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
        
        {/* Range Input overlaid */}
        <input
          type="range"
          min={Math.floor(minPrice)}
          max={Math.ceil(maxPrice)}
          value={currentMax}
          onChange={(e) => setCurrentMax(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {/* Custom Thumb */}
        <div 
          className="absolute top-1/2 -mt-2.5 -ml-2.5 w-5 h-5 bg-white rounded-full shadow pointer-events-none"
          style={{ left: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-white font-medium text-sm">
        <span>${Math.floor(minPrice)}</span>
        <span>${Math.ceil(currentMax)}</span>
      </div>
    </div>
  );
}

import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import { useMemo } from "react";

export function useFilteredProducts(initialProducts: Product[]) {
  const searchParams = useSearchParams();

  // URL is the absolute single source of truth
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  
  // Calculate dynamic bounds from the initial products array
  const prices = useMemo(() => initialProducts.map(p => p.price), [initialProducts]);
  const minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 1000;

  const priceParam = searchParams.get("price");
  const currentMaxPrice = priceParam ? parseFloat(priceParam.split("-")[1]) : maxPrice;

  // Filter products synchronously during render based on URL state
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (product.price > currentMaxPrice) return false;
      if (query && !product.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [initialProducts, category, currentMaxPrice, query]);

  console.log({
    query,
    category,
    currentMaxPrice
});

  return {
    filteredProducts,
    minPrice,
    maxPrice
  };
}

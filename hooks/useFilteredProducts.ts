import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import { useMemo } from "react";

export function useFilteredProducts(initialProducts: Product[]) {
  const searchParams = useSearchParams();

  // URL is the absolute single source of truth
  const query = searchParams.get("q") || "";
  const categories = searchParams.getAll("category"); // Support multiple categories if present in URL
  
  // 1. Compute dynamic bounds by filtering ONLY by category and query (ignoring price)
  const productsWithoutPriceFilter = useMemo(() => {
    if (!initialProducts || !Array.isArray(initialProducts)) return [];

    return initialProducts.filter((product) => {
      if (!product) return false;

      // Category Filter
      if (categories.length > 0 && !categories.includes("all")) {
        const productCategory = (product.category || "").toLowerCase().trim();
        const matchesCategory = categories.some(cat => productCategory === cat.toLowerCase().trim());
        if (!matchesCategory) return false;
      }

      // Search Query Filter
      if (query) {
        const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const searchableText = `${product.title || ""} ${product.description || ""} ${product.category || ""}`.toLowerCase();
        
        const matchesAllTerms = searchTerms.every(term => searchableText.includes(term));
        if (!matchesAllTerms) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, categories, query]);

  // Compute boundaries based on contextual products
  const prices = useMemo(() => productsWithoutPriceFilter.map(p => p?.price || 0), [productsWithoutPriceFilter]);
  
  // Fallback to initial products if current search yields 0 items to prevent broken UI sliders
  const fallbackPrices = useMemo(() => (initialProducts || []).map(p => p?.price || 0), [initialProducts]);
  const activePrices = prices.length ? prices : fallbackPrices;

  const minPrice = activePrices.length ? Math.floor(Math.min(...activePrices)) : 0;
  const maxPrice = activePrices.length ? Math.ceil(Math.max(...activePrices)) : 1000;

  const priceParam = searchParams.get("price");
  let currentMinPrice = minPrice;
  let currentMaxPrice = maxPrice;

  if (priceParam) {
    if (priceParam.includes("-")) {
      const [minStr, maxStr] = priceParam.split("-");
      const parsedMin = parseFloat(minStr);
      const parsedMax = parseFloat(maxStr);
      if (!isNaN(parsedMin)) currentMinPrice = parsedMin;
      if (!isNaN(parsedMax)) currentMaxPrice = parsedMax;
    } else {
      const parsedMax = parseFloat(priceParam);
      if (!isNaN(parsedMax)) {
        currentMaxPrice = parsedMax;
      }
    }
  }

  // Filter products synchronously during render based on URL state (including Price this time)
  const filteredProducts = useMemo(() => {
    let filtered = productsWithoutPriceFilter.filter((product) => {
      // 2. Price Filter: ensuring product price is strictly within valid bounds
      const productPrice = product.price || 0;
      if (productPrice < currentMinPrice || productPrice > currentMaxPrice) {
        return false;
      }
      return true;
    });
    return filtered;
  }, [productsWithoutPriceFilter, currentMinPrice, currentMaxPrice]);

  return {
    filteredProducts,
    minPrice,
    maxPrice,
    currentMinPrice,
    currentMaxPrice
  };
}


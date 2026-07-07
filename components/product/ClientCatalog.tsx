"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getProductsClient, getCategoriesClient } from "@/lib/api";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";

interface ClientCatalogProps {
  initialProducts: Product[] | null;
  initialCategories: string[] | null;
}

export function ClientCatalog({ initialProducts, initialCategories }: ClientCatalogProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [categories, setCategories] = useState<string[]>(initialCategories || []);
  
  // If we didn't get initial products (e.g. server fetch failed due to Cloudflare), we load on client
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch on client if the server-side fetch failed (returned null)
    if (initialProducts !== null && initialCategories !== null) return;

    async function loadData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProductsClient(),
          getCategoriesClient()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to load catalog data on client:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [initialProducts, initialCategories]);

  const { filteredProducts, minPrice, maxPrice } = useFilteredProducts(products);

  if (loading) {
    return <div className="animate-pulse h-96 bg-gray-100 rounded-2xl w-full" />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-[280px] flex-shrink-0">
        <FilterSidebar 
          categories={categories}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </aside>

      <main className="flex-1 min-w-0">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product Listing</h1>
          <span className="text-gray-500 font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

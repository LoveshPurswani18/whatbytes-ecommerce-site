"use client";

import { Product } from "@/lib/types";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";

interface ClientCatalogProps {
  initialProducts: Product[];
  categories: string[];
}

export function ClientCatalog({ initialProducts, categories }: ClientCatalogProps) {
  const { filteredProducts, minPrice, maxPrice } = useFilteredProducts(initialProducts);

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

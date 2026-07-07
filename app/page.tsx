import { getProducts, getCategories } from "@/lib/api";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { EmptyState } from "@/components/ui/EmptyState";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const params = await searchParams;

  const searchQuery = params.q?.toLowerCase() || "";
  const selectedCategory = params.category || "";
  const priceRange = params.price || ""; // "min-max"

  let minPrice = 0;
  let maxPrice = 1000;

  if (products.length > 0) {
    const prices = products.map((p) => p.price);
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
  }

  // Parse price filter from URL if present
  let filterMax = maxPrice;
  if (priceRange) {
    const [_, maxStr] = priceRange.split("-");
    if (maxStr) filterMax = parseFloat(maxStr);
  }

  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery)) {
      return false;
    }
    
    // Category filter
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // Price filter (only filter by max price as per our simple dual slider/max slider approach)
    if (product.price > filterMax) {
      return false;
    }

    return true;
  });

  return (
    <div className="mx-auto max-w-7xl w-full px-6 py-8 md:px-12 flex-1">
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
    </div>
  );
}

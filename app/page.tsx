import { getProducts } from "@/lib/api";
import { ProductGrid } from "@/components/product/ProductGrid";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl w-full px-6 py-8 md:px-12 flex-1">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar skeleton for phase 2 - actual filters built in phase 3 */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-primary rounded-xl p-6 text-white h-[400px]">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <p className="text-sm text-gray-200">Filters will be implemented in Phase 3.</p>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Product Listing</h1>
          </div>
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}

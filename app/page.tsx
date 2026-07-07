import { getProductsServer, getCategoriesServer } from "@/lib/api";
import { ClientCatalog } from "@/components/product/ClientCatalog";
import { Suspense } from "react";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProductsServer(),
    getCategoriesServer(),
  ]);

  return (
    <div className="mx-auto max-w-7xl w-full px-6 py-8 md:px-12 flex-1">
      <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-2xl" />}>
        <ClientCatalog initialProducts={products} initialCategories={categories} />
      </Suspense>
    </div>
  );
}

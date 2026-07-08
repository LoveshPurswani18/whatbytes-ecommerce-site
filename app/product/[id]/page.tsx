import { getProductByIdServer } from "@/lib/api";
import { ProductDetailWrapper } from "@/components/product/ProductDetailWrapper";

export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductByIdServer(id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-24">
      <ProductDetailWrapper initialProduct={product} productId={id} />
    </div>
  );
}

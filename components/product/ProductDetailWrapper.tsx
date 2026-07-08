"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getProductByIdClient } from "@/lib/api";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { notFound } from "next/navigation";

interface ProductDetailWrapperProps {
  initialProduct: Product | null;
  productId: string;
}

export function ProductDetailWrapper({ initialProduct, productId }: ProductDetailWrapperProps) {
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!initialProduct) {
      getProductByIdClient(productId)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [initialProduct, productId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 animate-pulse">
        <div className="bg-gray-100 rounded-3xl aspect-square w-full"></div>
        <div className="flex flex-col py-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-32 bg-gray-200 rounded w-full mb-8"></div>
          <div className="flex gap-4 mt-auto">
            <div className="h-14 bg-gray-200 rounded w-32"></div>
            <div className="h-14 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    // This will gracefully trigger a 404 rather than a runtime crash overlay in dev mode
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
      <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)]">
        <ProductImage
          src={product.image}
          alt={product.title}
          className="aspect-square w-full"
          priority={true}
        />
      </div>
      <div className="flex flex-col">
        <ProductInfo product={product} />
      </div>
    </div>
  );
}

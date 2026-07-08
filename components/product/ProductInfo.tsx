"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { StarRating } from "../ui/StarRating";
import { QuantitySelector } from "./QuantitySelector";
import { AddToCartButton } from "./AddToCartButton";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 text-sm font-semibold text-primary uppercase tracking-wider">
        {product.category}
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {product.title}
      </h1>
      
      {product.rating && (
        <div className="flex items-center gap-2 mb-6">
          <StarRating rating={product.rating.rate} />
          <span className="text-sm text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </div>
      )}

      <p className="text-3xl font-bold text-gray-900 mb-6">
        ${product.price.toFixed(2)}
      </p>

      <div className="prose prose-sm sm:prose-base text-gray-600 mb-8 max-w-none">
        <p>{product.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <AddToCartButton 
          product={product} 
          quantity={quantity} 
          className="flex-1 rounded-xl py-4 sm:py-6 font-semibold text-base shadow-sm"
        />
      </div>
    </div>
  );
}

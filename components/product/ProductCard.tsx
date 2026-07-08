import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductImage } from "./ProductImage";
import { StarRating } from "../ui/StarRating";
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-shadow h-full border border-gray-50">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
        <ProductImage
          src={product.image}
          alt={product.title}
          className="aspect-[4/3] w-full bg-white mb-4 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-snug">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-gray-900 mt-1 mb-2">
            ${product.price.toFixed(2)}
          </p>
          {product.rating && (
            <div className="mt-auto">
              <StarRating rating={product.rating.rate} />
            </div>
          )}
        </div>
      </Link>
      <div className="mt-5">
        <AddToCartButton 
          product={product} 
          className="w-full rounded-xl py-6 font-semibold text-base shadow-sm" 
        />
      </div>
    </div>
  );
}

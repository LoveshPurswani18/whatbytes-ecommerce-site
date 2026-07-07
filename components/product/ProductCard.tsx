import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductImage } from "./ProductImage";
import { StarRating } from "../ui/StarRating";
import { Button } from "../ui/Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md h-full">
      <Link href={`/product/${product.id}`} className="flex-1">
        <ProductImage
          src={product.image}
          alt={product.title}
          className="aspect-square w-full rounded-lg bg-gray-50 mb-4 group-hover:opacity-90 transition-opacity"
        />
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          {product.rating && (
            <StarRating rating={product.rating.rate} />
          )}
        </div>
      </Link>
      <div className="mt-4">
        <Button className="w-full font-semibold">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

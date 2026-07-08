"use client";

import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { Button, ButtonProps } from "../ui/Button";

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  quantity?: number;
}

export function AddToCartButton({ product, quantity = 1, className, ...props }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event bubbling which can cause touch issues on mobile
    addToCart(product, quantity);
  };

  return (
    <Button type="button" onClick={handleAddToCart} className={className} {...props}>
      Add to Cart
    </Button>
  );
}

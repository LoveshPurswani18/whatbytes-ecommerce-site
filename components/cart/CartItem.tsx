"use client";

import { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { ProductImage } from "../product/ProductImage";
import { QuantitySelector } from "../product/QuantitySelector";
import { Trash2, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();
  const addToast = useToastStore((state) => state.addToast);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
    addToast(
      <span>Updated quantity for <span className="font-bold italic text-gray-900">{item.title}</span></span>
    );
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    addToast(
      <span>Removed <span className="font-bold italic text-gray-900">{item.title}</span> from cart</span>, 
      'info'
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <Link href={`/product/${item.id}`} className="shrink-0">
        <ProductImage 
          src={item.image} 
          alt={item.title} 
          className="w-full sm:w-32 aspect-square rounded-xl bg-gray-50 p-2" 
        />
      </Link>
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/product/${item.id}`} className="hover:underline text-gray-900 font-semibold text-lg line-clamp-2">
            {item.title}
          </Link>
          <p className="font-bold text-lg text-gray-900 shrink-0">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
        
        <p className="text-gray-500 text-sm mt-1">
          ${item.price.toFixed(2)} each
        </p>

        <div className="flex justify-between items-center mt-auto pt-4">
          <QuantitySelector 
            value={item.quantity} 
            onChange={handleQuantityChange}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

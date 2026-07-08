"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";

import { useToastStore } from "@/store/toastStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const addToast = useToastStore((state) => state.addToast);
  const [mounted, setMounted] = useState(false);

  const handleClearCart = () => {
    clearCart();
    addToast("Cart cleared", "info");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-24 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-48 mb-12"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
             <div className="h-40 bg-gray-200 rounded-2xl w-full"></div>
             <div className="h-40 bg-gray-200 rounded-2xl w-full"></div>
          </div>
          <div className="lg:col-span-1">
             <div className="h-80 bg-gray-200 rounded-2xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 text-primary rounded-full mb-8">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-xl px-8 py-6 text-lg shadow-sm">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-16">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Shopping Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
        </h1>
        <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

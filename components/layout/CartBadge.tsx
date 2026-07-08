"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";

export function CartBadge() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart">
      <Button variant="icon" className="h-11 px-6 rounded-lg font-semibold gap-2 relative">
        <ShoppingCart className="h-5 w-5" />
        Cart
        {mounted && itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-primary">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}

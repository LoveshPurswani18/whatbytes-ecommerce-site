import Link from "next/link";
import { Suspense } from "react";
import { SearchBar } from "../filters/SearchBar";
import { Button } from "../ui/Button";
import { ShoppingCart } from "lucide-react";
import { CartBadge } from "./CartBadge";

export function Header() {
  return (
    <header className="bg-primary sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <div className="flex-shrink-0">
          <Link href="/" className="text-3xl font-bold text-white tracking-tight">
            Logo
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center px-8">
          <Suspense fallback={<div className="w-full max-w-xl h-10 bg-white/10 rounded-md"></div>}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex items-center space-x-4">
          <CartBadge />
        </div>
      </div>
      <div className="md:hidden px-6 pb-4">
        <Suspense fallback={<div className="w-full max-w-xl h-10 bg-white/10 rounded-md"></div>}>
          <SearchBar />
        </Suspense>
      </div>
    </header>
  );
}

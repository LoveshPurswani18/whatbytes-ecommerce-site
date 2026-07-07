"use client";

import { Search } from "lucide-react";
import React from "react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="h-5 w-5 text-gray-300" />
      </div>
      <input
        type="text"
        className="block w-full rounded-md border border-white/30 bg-white/10 py-2.5 pl-12 pr-4 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm transition-colors"
        placeholder="Search for products..."
      />
    </div>
  );
}

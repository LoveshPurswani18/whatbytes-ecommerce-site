"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { Search } from "lucide-react";

function SearchBarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const urlQuery = searchParams.get("q") || "";
  
  // Local state purely for instant typing UX
  const [localQuery, setLocalQuery] = useState(urlQuery);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local state if URL changes externally
  useEffect(() => {
    setLocalQuery(urlQuery);
  }, [urlQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (val) {
        params.set("q", val);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="h-5 w-5 text-gray-300" />
      </div>
      <input
        type="text"
        value={localQuery}
        onChange={handleChange}
        className="block w-full rounded-md border border-white/30 bg-white/10 py-2.5 pl-12 pr-4 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm transition-colors"
        placeholder="Search for products..."
      />
    </div>
  );
}

export function SearchBar() {
  return (
    <Suspense fallback={<div className="w-full max-w-xl h-10 bg-white/10 rounded-md"></div>}>
      <SearchBarContent />
    </Suspense>
  );
}

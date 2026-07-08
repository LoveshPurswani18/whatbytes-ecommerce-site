"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, Package, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        type="button"
        variant="icon" 
        className={`h-11 w-11 rounded-full text-white transition-colors ${isOpen ? 'bg-white/20 ring-2 ring-white/50' : 'bg-white/10 hover:bg-white/20'}`} 
        aria-label="User Profile"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <p className="text-sm font-semibold text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500 truncate mt-0.5">john.doe@example.com</p>
          </div>
          
          <div className="py-2">
            <Link 
              href="#" 
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <Package className="h-4 w-4 mr-3 text-gray-400" />
              My Orders
            </Link>
            <Link 
              href="#" 
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <Settings className="h-4 w-4 mr-3 text-gray-400" />
              Settings
            </Link>
          </div>
          
          <div className="py-2 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3 text-red-500" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

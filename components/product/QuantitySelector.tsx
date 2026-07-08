"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-lg w-max">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-10 w-10 text-gray-500 hover:text-gray-900 rounded-l-lg rounded-r-none"
        onClick={handleDecrease}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="w-12 text-center font-medium text-gray-900">
        {value}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-10 w-10 text-gray-500 hover:text-gray-900 rounded-r-lg rounded-l-none"
        onClick={handleIncrease}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

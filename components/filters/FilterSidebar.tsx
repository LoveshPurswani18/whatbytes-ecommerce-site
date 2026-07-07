import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";

interface FilterSidebarProps {
  categories: string[];
  minPrice: number;
  maxPrice: number;
}

export function FilterSidebar({ categories, minPrice, maxPrice }: FilterSidebarProps) {
  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm sticky top-28">
      <h2 className="text-2xl font-bold text-white mb-8">Filters</h2>
      <CategoryFilter categories={categories} />
      <div className="mt-8 pt-8 border-t border-white/10">
        <PriceFilter minPrice={minPrice} maxPrice={maxPrice} />
      </div>
    </div>
  );
}

"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "Beachfront", icon: "🌊" },
  { name: "Cabins", icon: "🪵" },
  { name: "Trending", icon: "🔥" },
  { name: "Mansions", icon: "🏛️" },
  { name: "Amazing pools", icon: "🏊‍♂️" },
  { name: "Design", icon: "📐" },
  { name: "Lakefront", icon: "🛶" },
  { name: "Castles", icon: "🏰" },
  { name: "Treehouses", icon: "🌲" },
  { name: "Farms", icon: "🚜" },
  { name: "Tiny homes", icon: "🛖" }
];

export default function FiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || categories[0].name;

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryName);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-6 md:px-12 pt-8 pb-4 flex items-center justify-between gap-4 sticky top-[88px] z-40 bg-[var(--background)]">
      {/* Category Tabs */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth w-full pr-10">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className={`flex flex-col items-center gap-2 pb-3 border-b-2 whitespace-nowrap transition-colors min-w-max ${
              active === cat.name
                ? "border-black dark:border-white text-black dark:text-white font-medium"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <div className={`text-2xl transition-opacity ${active === cat.name ? 'opacity-100' : 'opacity-60'}`}>
              {cat.icon}
            </div>
            <span className="text-sm">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Filter Button */}
      <button className="hidden md:flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-3 rounded-2xl hover:shadow-soft transition text-sm font-medium whitespace-nowrap bg-white dark:bg-black">
        <SlidersHorizontal size={16} />
        Filters
      </button>
    </div>
  );
}

import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { 
  Sparkles, 
  Heart, 
  Shirt, 
  Smile, 
  Scissors, 
  Crown, 
  Activity,
  ShoppingBag
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Heart,
  Shirt,
  Smile,
  Scissors,
  Crown,
  Activity,
  ShoppingBag
};

export default function CategoryGrid({ activeCategory, onSelectCategory }) {
  return (
    <div className="px-3 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-black text-gray-900 tracking-tight">
          Danh Mục Dịch Vụ
        </h2>
        <span className="text-[10px] text-gray-400">
          Chọn để lọc nhanh
        </span>
      </div>

      {/* Grid of round category icons */}
      <div className="grid grid-cols-4 gap-2">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all group text-center ${
                isActive 
                  ? 'bg-noti-500 text-white shadow-2xs scale-102' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-2xs border border-gray-100'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 ${
                  isActive ? 'bg-white text-noti-600' : cat.color
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold leading-tight truncate w-full ${isActive ? 'text-white' : 'text-gray-700'}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

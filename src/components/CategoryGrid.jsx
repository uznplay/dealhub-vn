import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { 
  Sparkles, 
  Utensils, 
  Smartphone, 
  Shirt, 
  Heart, 
  ShoppingBag, 
  Tag, 
  Ticket 
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Utensils,
  Smartphone,
  Shirt,
  Heart,
  ShoppingBag,
  Tag,
  Ticket
};

export default function CategoryGrid({ activeCategory, onSelectCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            Danh Mục Ngành Hàng
          </h2>
          <p className="text-xs text-gray-500">
            Khám phá ưu đãi theo nhu cầu mua sắm và tiêu dùng của bạn
          </p>
        </div>
      </div>

      {/* Grid of round category icons */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 group text-center ${
                isActive 
                  ? 'bg-noti-500 text-white shadow-md scale-105' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100 hover:border-gray-200'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                  isActive ? 'bg-white text-noti-600' : cat.color
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-bold leading-tight ${isActive ? 'text-white' : 'text-gray-700'}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

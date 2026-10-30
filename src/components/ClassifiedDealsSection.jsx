import React, { useState } from 'react';
import { MapPin, Heart, Store, Filter, Bookmark, Check, Ticket } from 'lucide-react';
import { CITIES } from '../data/mockData';

export default function ClassifiedDealsSection({
  deals,
  selectedCity,
  setSelectedCity,
  activeCategory,
  searchQuery,
  onSelectDeal,
  onSaveDeal,
  savedDealIds = []
}) {
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredDeals = deals.filter(deal => {
    if (selectedCity !== 'Toàn quốc' && deal.city !== selectedCity) {
      return false;
    }
    if (activeCategory !== 'all' && deal.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = deal.title.toLowerCase().includes(q);
      const matchStore = deal.storeName.toLowerCase().includes(q);
      const matchAddress = deal.address.toLowerCase().includes(q);
      if (!matchTitle && !matchStore && !matchAddress) return false;
    }
    if (priceFilter === 'under100k' && deal.salePrice > 100000) return false;
    if (priceFilter === '100k-300k' && (deal.salePrice < 100000 || deal.salePrice > 300000)) return false;
    if (priceFilter === 'deepDiscount' && parseInt(deal.discount.replace(/[^0-9]/g, '')) < 50) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'lowestPrice') return a.salePrice - b.salePrice;
    if (sortBy === 'highestDiscount') {
      const discA = parseInt(a.discount.replace(/[^0-9]/g, '')) || 0;
      const discB = parseInt(b.discount.replace(/[^0-9]/g, '')) || 0;
      return discB - discA;
    }
    return (b.likes || 0) - (a.likes || 0);
  });

  return (
    <section className="px-3 mt-4 space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-gray-900 tracking-tight flex items-center gap-1.5">
            <Store className="w-4 h-4 text-noti-600" />
            <span>Ưu Đãi Làm Đẹp Mới Nhất</span>
          </h2>
          <p className="text-[10px] text-gray-400">
            {filteredDeals.length} dịch vụ áp dụng voucher tại tiệm
          </p>
        </div>

        {/* Quick price filter */}
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="bg-gray-100 text-gray-700 text-[10px] font-bold py-1 px-2 rounded-lg border-0 focus:ring-1 focus:ring-noti-500"
        >
          <option value="all">Mức giá: Tất cả</option>
          <option value="under100k">Dưới 100k</option>
          <option value="100k-300k">100k - 300k</option>
          <option value="deepDiscount">Giảm trên 50%</option>
        </select>
      </div>

      {/* Grid of Deal Cards: EXACTLY 2 COLUMNS FOR MOBILE (NEVER SQUISHED) */}
      {filteredDeals.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 p-4">
          <p className="font-bold text-xs text-gray-600">Không tìm thấy ưu đãi phù hợp</p>
          <p className="text-[10px] text-gray-400 mt-1">Hãy thử chọn lại khu vực hoặc mức giá khác</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {filteredDeals.map((deal) => {
            const isSaved = savedDealIds.includes(deal.id);

            return (
              <div
                key={deal.id}
                onClick={() => onSelectDeal && onSelectDeal(deal)}
                className="bg-white rounded-2xl overflow-hidden shadow-2xs border border-gray-100 flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all active:scale-98"
              >
                {/* Image & Discount Badge */}
                <div className="relative h-28 overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-red-600 text-white font-black text-[9px] px-1.5 py-0.2 rounded shadow">
                    {deal.discount}
                  </span>

                  <span className="absolute top-1.5 right-1.5 bg-gray-900/70 text-white font-bold text-[8px] px-1.5 py-0.2 rounded">
                    {deal.city}
                  </span>

                  {/* Bookmark directly into Kho Voucher */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSaveDeal) onSaveDeal(deal);
                    }}
                    className={`absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center shadow transition-all ${
                      isSaved 
                        ? 'bg-noti-500 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-white hover:text-noti-600'
                    }`}
                    title="Lưu vào Kho Voucher"
                  >
                    {isSaved ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                  </button>
                </div>

                {/* Content */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[9px] text-gray-500 mb-0.5">
                      <span className="truncate font-semibold text-noti-700">
                        {deal.storeName}
                      </span>
                      <span className="text-[9px] text-gray-400">
                        {deal.distance}
                      </span>
                    </div>

                    <h3 className="font-bold text-[11px] text-gray-900 line-clamp-2 leading-snug group-hover:text-noti-600 transition-colors">
                      {deal.title}
                    </h3>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-gray-100">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[11px] font-black text-red-600 leading-none">
                          {deal.salePrice.toLocaleString('vi-VN')}₫
                        </div>
                        <div className="text-[9px] text-gray-400 line-through">
                          {deal.originalPrice.toLocaleString('vi-VN')}₫
                        </div>
                      </div>

                      <span className="text-[9px] font-bold text-noti-700 bg-green-50 px-1.5 py-0.5 rounded">
                        Xem tin
                      </span>
                    </div>

                    <div className="mt-1 text-[9px] text-gray-400 truncate flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{deal.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

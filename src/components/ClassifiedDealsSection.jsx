import React, { useState } from 'react';
import { MapPin, Heart, Store, Filter } from 'lucide-react';
import { CITIES } from '../data/mockData';

export default function ClassifiedDealsSection({
  deals,
  selectedCity,
  setSelectedCity,
  activeCategory,
  searchQuery,
  onSelectDeal
}) {
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [likedDeals, setLikedDeals] = useState({});

  const toggleLike = (dealId, e) => {
    e.stopPropagation();
    setLikedDeals(prev => ({
      ...prev,
      [dealId]: !prev[dealId]
    }));
  };

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
    if (priceFilter === 'under50k' && deal.salePrice > 50000) return false;
    if (priceFilter === '50k-200k' && (deal.salePrice < 50000 || deal.salePrice > 200000)) return false;
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
    <section id="deals-section" className="max-w-7xl mx-auto px-4 mt-12 mb-16">
      {/* Filter Header Box */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-noti-500" />
              <span>Ưu Đãi & Khuyến Mãi Mới Nhất</span>
              <span className="text-xs bg-noti-50 text-noti-700 font-bold px-2.5 py-1 rounded-full border border-noti-200">
                {filteredDeals.length} Deal
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Các chương trình giảm giá được cập nhật mới nhất từ các cửa hàng uy tín
            </p>
          </div>

          {/* Quick City Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
            {CITIES.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCity === city
                    ? 'bg-noti-500 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-noti-600" /> Mức giá:
            </span>
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                priceFilter === 'all' ? 'bg-noti-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setPriceFilter('under50k')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                priceFilter === 'under50k' ? 'bg-noti-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Dưới 50.000₫
            </button>
            <button
              onClick={() => setPriceFilter('50k-200k')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                priceFilter === '50k-200k' ? 'bg-noti-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              50.000₫ - 200.000₫
            </button>
            <button
              onClick={() => setPriceFilter('deepDiscount')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                priceFilter === 'deepDiscount' ? 'bg-noti-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Giảm từ 50%
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-semibold">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-noti-500 font-medium"
            >
              <option value="popular">Phổ biến nhất</option>
              <option value="lowestPrice">Giá thấp đến cao</option>
              <option value="highestDiscount">Mức giảm nhiều nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredDeals.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto mb-3 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 text-2xl">
            🔍
          </div>
          <h3 className="text-base font-bold text-gray-800">Không tìm thấy ưu đãi phù hợp</h3>
          <p className="text-xs text-gray-500 mt-1">
            Vui lòng thử thay đổi tiêu chí lọc hoặc chọn khu vực khác.
          </p>
          <button
            onClick={() => {
              setSelectedCity('Toàn quốc');
              setPriceFilter('all');
            }}
            className="mt-3 px-4 py-2 bg-noti-500 text-white rounded-xl text-xs font-bold hover:bg-noti-600"
          >
            Xem tất cả ưu đãi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDeals.map((deal) => {
            const isLiked = likedDeals[deal.id];
            return (
              <div
                key={deal.id}
                onClick={() => onSelectDeal(deal)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded-md shadow-sm">
                    {deal.discount}
                  </span>

                  <span className="absolute top-2.5 right-2.5 bg-gray-900/70 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-sm">
                    {deal.city}
                  </span>

                  <button
                    onClick={(e) => toggleLike(deal.id, e)}
                    className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white text-gray-500"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                      <span className="truncate max-w-[150px] font-semibold text-gray-700 flex items-center gap-1">
                        <Store className="w-3.5 h-3.5 text-noti-600" />
                        {deal.storeName}
                      </span>
                      <span className="text-gray-500 text-[10px]">
                        {deal.distance}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-noti-600 transition-colors">
                      {deal.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-gray-400 line-through">
                          {deal.originalPrice.toLocaleString('vi-VN')}₫
                        </div>
                        <div className="text-base sm:text-lg font-black text-red-600 leading-none mt-0.5">
                          {deal.salePrice.toLocaleString('vi-VN')}₫
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDeal(deal);
                        }}
                        className="px-3 py-1.5 bg-noti-500 group-hover:bg-noti-600 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                      >
                        Xem chi tiết
                      </button>
                    </div>

                    <div className="mt-2 text-[10px] text-gray-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{deal.address}</span>
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

import React, { useState, useEffect } from 'react';
import { Flame, Clock, MapPin } from 'lucide-react';
import { FLASH_DEALS } from '../data/mockData';

export default function FlashSaleSection({ onSelectDeal }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: '01',
    minutes: '42',
    seconds: '15'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const s = 59 - (now.getSeconds() % 60);
      const m = 59 - (now.getMinutes() % 60);
      const h = 23 - (now.getHours() % 24);

      setTimeLeft({
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-noti-600 rounded-3xl p-4 sm:p-6 shadow-md text-white">
        
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-400 text-red-600 rounded-xl shadow-inner">
              <Flame className="w-6 h-6 fill-red-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                  GIỜ VÀNG SĂN DEAL
                </h2>
                <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Số lượng có hạn
                </span>
              </div>
              <p className="text-xs text-orange-100 font-medium">
                Khung giờ vàng giảm giá độc quyền từ các cửa hàng đối tác
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-2 bg-black/25 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/20 self-start sm:self-auto">
            <Clock className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-semibold text-yellow-200">Kết thúc sau:</span>
            <div className="flex items-center space-x-1 font-mono font-black text-sm">
              <span className="bg-white text-red-600 px-2 py-0.5 rounded">{timeLeft.hours}</span>
              <span>:</span>
              <span className="bg-white text-red-600 px-2 py-0.5 rounded">{timeLeft.minutes}</span>
              <span>:</span>
              <span className="bg-white text-red-600 px-2 py-0.5 rounded">{timeLeft.seconds}</span>
            </div>
          </div>
        </div>

        {/* Flash Sale Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {FLASH_DEALS.map((deal) => (
            <div
              key={deal.id}
              onClick={() => onSelectDeal(deal)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm text-gray-800 flex flex-col group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow">
                  {deal.discount}
                </span>
                <span className="absolute top-2 right-2 bg-gray-900/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {deal.city}
                </span>
              </div>

              {/* Info */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 leading-snug group-hover:text-noti-600 transition-colors">
                    {deal.title}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-red-600 font-black text-lg">
                      {deal.salePrice.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-gray-400 line-through text-xs font-semibold">
                      {deal.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>

                  {/* Store */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="truncate max-w-[130px] font-medium">{deal.storeName}</span>
                    <span className="flex items-center text-noti-600 font-semibold">
                      <MapPin className="w-3 h-3 mr-0.5" />
                      {deal.distance}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-3">
                  <div className="relative w-full h-3.5 bg-orange-100 rounded-full overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      style={{ width: `${deal.soldPercent}%` }}
                    />
                    <span className="relative z-10 text-[9px] font-bold text-white uppercase tracking-wider">
                      Đã bán {deal.soldPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Flame, Clock, MapPin, Ticket } from 'lucide-react';
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
    <div className="px-3 mt-4">
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-noti-600 rounded-3xl p-3.5 shadow-md text-white">
        
        {/* Flash Sale Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-yellow-400 text-red-600 rounded-lg">
              <Flame className="w-4 h-4 fill-red-600" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <h2 className="text-sm font-black uppercase text-white">
                  GIỜ VÀNG SĂN DEAL
                </h2>
                <span className="bg-yellow-400 text-gray-900 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  HOT
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-1 font-mono font-black text-xs bg-black/25 px-2 py-0.5 rounded-lg border border-white/20">
            <Clock className="w-3 h-3 text-yellow-300 mr-0.5" />
            <span className="bg-white text-red-600 px-1 rounded">{timeLeft.hours}</span>
            <span>:</span>
            <span className="bg-white text-red-600 px-1 rounded">{timeLeft.minutes}</span>
            <span>:</span>
            <span className="bg-white text-red-600 px-1 rounded">{timeLeft.seconds}</span>
          </div>
        </div>

        {/* Flash Sale Horizontal Scrollable Cards (No more narrow squished columns!) */}
        <div className="flex gap-2.5 overflow-x-auto pt-3 pb-1 scrollbar-none snap-x">
          {FLASH_DEALS.map((deal) => (
            <div
              key={deal.id}
              onClick={() => onSelectDeal(deal)}
              className="w-[145px] min-w-[145px] bg-white rounded-2xl overflow-hidden shadow-sm text-gray-800 flex flex-col group cursor-pointer hover:shadow-md transition-all flex-shrink-0 snap-start"
            >
              {/* Image */}
              <div className="relative h-28 overflow-hidden bg-gray-100">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow">
                  {deal.discount}
                </span>
                <span className="absolute top-1.5 right-1.5 bg-gray-900/70 text-white text-[8px] font-bold px-1 rounded">
                  {deal.city}
                </span>
              </div>

              {/* Info */}
              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-noti-700 font-bold block truncate">
                    {deal.storeName}
                  </span>
                  <h3 className="font-bold text-[11px] text-gray-900 line-clamp-2 leading-snug mt-0.5 group-hover:text-noti-600">
                    {deal.title}
                  </h3>

                  {/* Price */}
                  <div className="mt-1.5 flex items-baseline space-x-1">
                    <span className="text-red-600 font-black text-xs">
                      {deal.salePrice.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-gray-400 line-through text-[9px]">
                      {deal.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <div className="relative w-full h-3 bg-orange-100 rounded-full overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      style={{ width: `${deal.soldPercent}%` }}
                    />
                    <span className="relative z-10 text-[8px] font-bold text-white uppercase tracking-wider">
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

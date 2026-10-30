import React from 'react';
import { Compass, Sparkles, MapPin, ShieldCheck, Ticket } from 'lucide-react';

export default function HeroBanner({ onViewFeed, onViewMap }) {
  return (
    <div className="bg-gradient-to-b from-noti-700 via-noti-600 to-noti-500 text-white p-4 space-y-3 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-black/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-yellow-300">
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>BẢN ĐỒ VOUCHER LÀM ĐẸP & DỊCH VỤ ĐỊA PHƯƠNG</span>
        </div>

        <h1 className="text-xl font-black leading-tight tracking-tight">
          Săn Voucher Spa & Tiệm Gần Bạn
        </h1>

        <p className="text-xs text-green-100 leading-relaxed font-normal">
          Khám phá ưu đãi giảm đến 70% từ các spa chăm sóc da, viện thẩm mỹ, salon tóc và showroom thời trang có mặt trên bản đồ.
        </p>

        {/* Quick action buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onViewMap}
            className="py-2.5 px-3 bg-white text-noti-700 hover:bg-yellow-300 hover:text-gray-950 font-black text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1.5 transition-all active:scale-95"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Bản đồ quanh đây</span>
          </button>

          <button
            onClick={onViewFeed}
            className="py-2.5 px-3 bg-black/25 hover:bg-black/35 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center justify-center space-x-1.5 transition-all active:scale-95"
          >
            <Ticket className="w-3.5 h-3.5 text-yellow-300" />
            <span>Bảng tin săn deal</span>
          </button>
        </div>

        {/* Stats Pill */}
        <div className="pt-1 flex items-center justify-around text-[10px] text-green-100/90 border-t border-white/15">
          <div className="text-center">
            <span className="font-black text-white text-xs block">1,250+</span>
            <span>Tiệm & Spa</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="text-center">
            <span className="font-black text-white text-xs block">100%</span>
            <span>Xác thực tại quán</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="text-center">
            <span className="font-black text-white text-xs block">4.9 / 5.0</span>
            <span>Đánh giá thực tế</span>
          </div>
        </div>
      </div>
    </div>
  );
}

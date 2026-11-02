import React from 'react';
import { Compass, Sparkles, Crown, Ticket, ShieldCheck, Flame } from 'lucide-react';

export default function HeroBanner({ onViewFeed, onViewMap, onOpenDealPass }) {
  return (
    <div className="bg-gradient-to-b from-noti-700 via-noti-600 to-noti-500 text-white p-4 space-y-3 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-yellow-400/15 blur-xl pointer-events-none" />

      <div className="relative z-10 space-y-2.5">
        {/* DealPass Badge Banner */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-1.5 bg-black/25 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-yellow-300 border border-yellow-300/30">
            <Crown className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>HỘI VIÊN DEALPASS 49K/THÁNG</span>
          </div>

          <button
            onClick={onOpenDealPass}
            className="text-[10px] font-black bg-yellow-400 hover:bg-yellow-300 text-gray-950 px-2 py-0.5 rounded-md shadow flex items-center gap-1 active:scale-95 transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span>Kích hoạt ngay</span>
          </button>
        </div>

        <h1 className="text-xl font-black leading-tight tracking-tight">
          Xài Đồ Xịn Giá Rẻ Quanh Bạn
        </h1>

        <p className="text-xs text-green-100 leading-relaxed font-normal">
          Mở khóa voucher giảm thật 30% - 70% tại hàng ngàn quán ăn uống, cafe, bida club, rạp chiếu phim & cửa hàng địa phương. Không lo giá đắt, không sợ deal ảo!
        </p>

        {/* Quick action buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onViewMap}
            className="py-2.5 px-3 bg-white text-noti-700 hover:bg-yellow-300 hover:text-gray-950 font-black text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1.5 transition-all active:scale-95"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Bản đồ GPS quanh đây</span>
          </button>

          <button
            onClick={onViewFeed}
            className="py-2.5 px-3 bg-black/25 hover:bg-black/35 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center justify-center space-x-1.5 transition-all active:scale-95"
          >
            <Ticket className="w-3.5 h-3.5 text-yellow-300" />
            <span>Bảng tin săn deal</span>
          </button>
        </div>

        {/* Value metrics */}
        <div className="pt-1.5 flex items-center justify-around text-[10px] text-green-100/90 border-t border-white/15">
          <div className="text-center">
            <span className="font-black text-white text-xs block">2,500+</span>
            <span>Quán xá liên kết</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="text-center">
            <span className="font-black text-white text-xs block">49.000₫</span>
            <span>Phí tháng tiết kiệm triệu đồng</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="text-center">
            <span className="font-black text-white text-xs block">0đ Cọc</span>
            <span>Quét QR tại quầy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

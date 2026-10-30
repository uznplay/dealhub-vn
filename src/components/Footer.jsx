import React from 'react';
import { MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-[11px] p-4 pt-6 pb-12 space-y-4">
      {/* Brand */}
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-lg bg-noti-500 p-1 flex items-center justify-center">
          <img src="/logo.svg" alt="DealHub" className="w-full h-full object-contain" />
        </div>
        <div>
          <span className="text-sm font-black text-white tracking-tight leading-none">
            DEAL<span className="text-yellow-400">HUB</span>
          </span>
          <p className="text-[9px] text-gray-400 mt-0.5">Bản Đồ Deal Làm Đẹp & Dịch Vụ Địa Phương</p>
        </div>
      </div>

      <p className="text-gray-400 text-[11px] leading-relaxed">
        Nền tảng tổng hợp ưu đãi, voucher và khuyến mãi địa phương. Kết nối khách hàng với các cơ sở Spa, làm đẹp và cửa hàng chính hãng gần nhất.
      </p>

      {/* Support Info */}
      <div className="space-y-1.5 pt-2 border-t border-gray-800 text-[10px] text-gray-400">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-noti-400 flex-shrink-0" />
          <span>Hà Nội, TP. Hồ Chí Minh & Đà Nẵng</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-noti-400 flex-shrink-0" />
          <span>hotro@dealhub.vn • 1900 6868</span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-800 text-[9px] text-gray-500 flex items-center justify-between">
        <span>© 2026 DealHub.vn</span>
        <div className="flex items-center gap-1 text-noti-400">
          <ShieldCheck className="w-3 h-3" />
          <span>Đã xác thực</span>
        </div>
      </div>
    </footer>
  );
}

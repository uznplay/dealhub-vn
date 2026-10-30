import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-noti-500 p-1.5 flex items-center justify-center">
                <img src="/logo.svg" alt="DealHub" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                DEAL<span className="text-yellow-400">HUB</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed">
              Nền tảng thương mại điện tử tổng hợp ưu đãi, voucher và khuyến mãi địa phương trên toàn quốc. Giúp người dùng khám phá các ưu đãi gần nhất và hỗ trợ các cửa hàng bán lẻ tiếp cận khách hàng tiềm năng.
            </p>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Trung tâm trợ giúp</li>
              <li className="hover:text-white cursor-pointer transition-colors">Hướng dẫn tìm kiếm ưu đãi</li>
              <li className="hover:text-white cursor-pointer transition-colors">Chính sách bảo vệ người dùng</li>
              <li className="hover:text-white cursor-pointer transition-colors">Quy trình giải quyết khiếu nại</li>
              <li className="hover:text-white cursor-pointer transition-colors">Câu hỏi thường gặp (FAQ)</li>
            </ul>
          </div>

          {/* For Merchants / Partners */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Dành Cho Đối Tác
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Đăng ký đối tác cửa hàng</li>
              <li className="hover:text-white cursor-pointer transition-colors">Quy định đăng tin khuyến mãi</li>
              <li className="hover:text-white cursor-pointer transition-colors">Gói tài khoản Merchant Pro</li>
              <li className="hover:text-white cursor-pointer transition-colors">Giải pháp quảng cáo địa phương</li>
              <li className="hover:text-white cursor-pointer transition-colors">Hợp tác nhượng quyền & chuỗi F&B</li>
            </ul>
          </div>

          {/* Contact & Headquarters */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Liên Hệ & Trụ Sở
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-noti-400 flex-shrink-0 mt-0.5" />
                <span>Trụ sở chính: Hà Nội & TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-noti-400 flex-shrink-0" />
                <span>hotro@dealhub.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-noti-400 flex-shrink-0" />
                <span>Hotline: 1900 6868 (8:00 - 21:00)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <p>© 2026 DealHub.vn - Nền tảng tổng hợp khuyến mãi địa phương toàn quốc. Mọi quyền được bảo lưu.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-gray-300 cursor-pointer">Điều khoản sử dụng</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">Chính sách bảo mật</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">Quy chế hoạt động sàn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

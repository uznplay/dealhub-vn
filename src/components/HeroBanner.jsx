import React from 'react';
import { ArrowRight, MapPin, Map, ShieldCheck, Tag, Compass } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-noti-600 via-noti-500 to-[#147a06] text-white pt-8 pb-12 px-4 sm:px-6">
      {/* Decorative background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#f6faf6] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-yellow-300">
            <Tag className="w-3.5 h-3.5" />
            <span>NỀN TẢNG TỔNG HỢP KHUYẾN MÃI TOÀN QUỐC</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Khám Phá Khuyến Mãi <br />
            <span className="text-yellow-300">Gần Vị Trí Của Bạn</span>
          </h1>

          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Tìm kiếm nhanh chóng các ưu đãi ẩm thực, đồ công nghệ, thời trang và dịch vụ đang diễn ra tại các cửa hàng xung quanh bạn với bản đồ trực quan và chỉ đường chi tiết.
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start text-xs font-medium">
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/20">
              <Map className="w-3.5 h-3.5 text-yellow-300" />
              <span>Bản đồ ưu đãi quanh bạn</span>
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Cửa hàng & Giá đã xác thực</span>
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-orange-300" />
              <span>Hỗ trợ toàn quốc</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <a 
              href="#dealmap-section"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-noti-700 font-extrabold text-sm shadow-lg hover:bg-yellow-300 hover:text-gray-900 transition-all flex items-center justify-center space-x-2 group"
            >
              <Compass className="w-4 h-4 text-noti-600 group-hover:rotate-45 transition-transform" />
              <span>Xem Bản Đồ Khuyến Mãi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#deals-section"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>Xem Tất Cả Deal Hôm Nay</span>
            </a>
          </div>

          {/* Verified Stats */}
          <div className="pt-2 flex items-center justify-center lg:justify-start space-x-6 text-xs text-white/80">
            <div>
              <p className="text-xl font-black text-white">2,500+</p>
              <p>Cửa hàng tham gia</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xl font-black text-white">63 Tỉnh/Thành</p>
              <p>Phủ sóng toàn quốc</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xl font-black text-white">100%</p>
              <p>Deal đã kiểm duyệt</p>
            </div>
          </div>
        </div>

        {/* Right Column: Clean App Mockup with Map Preview */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-72 sm:w-80 bg-gray-900 rounded-[40px] p-3 shadow-2xl border border-white/20">
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30" />

            {/* Screen Inner */}
            <div className="bg-[#f8fbf8] rounded-[32px] overflow-hidden text-gray-800 pt-7 pb-4 px-3.5 relative">
              {/* Header inside phone */}
              <div className="flex items-center justify-between pb-2 text-[11px] font-semibold text-gray-600 border-b border-gray-100">
                <div className="flex items-center space-x-1.5">
                  <span className="w-6 h-6 rounded-lg bg-noti-500 text-white flex items-center justify-center font-bold text-[10px]">
                    DH
                  </span>
                  <span className="font-bold text-gray-800">DealHub App</span>
                </div>
                <span className="text-[10px] bg-noti-50 text-noti-700 font-bold px-2 py-0.5 rounded-full border border-noti-200">
                  Gần bạn
                </span>
              </div>

              {/* Map Preview Card */}
              <div className="mt-2.5 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative h-40 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
                  alt="Bản đồ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Simulated Pins */}
                <div className="absolute top-6 left-6 bg-white px-2 py-1 rounded-lg shadow-md text-[10px] font-bold text-gray-800 flex items-center gap-1 border border-gray-100">
                  <span>🧋</span>
                  <span>-55%</span>
                </div>
                <div className="absolute bottom-8 right-6 bg-red-600 text-white px-2 py-1 rounded-lg shadow-md text-[10px] font-bold flex items-center gap-1">
                  <span>🍗</span>
                  <span>-42%</span>
                </div>
                
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl text-[9px] font-semibold text-gray-700 flex items-center justify-between shadow">
                  <span className="truncate">📍 12 cửa hàng ưu đãi quanh bạn</span>
                  <span className="text-noti-600 font-bold">Xem bản đồ</span>
                </div>
              </div>

              {/* Quick Categories inside phone */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5 text-center text-[9px] font-bold text-gray-700">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">Ẩm thực</div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">Công nghệ</div>
                <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">Thời trang</div>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">Voucher</div>
              </div>

              {/* Sample Deal in Phone */}
              <div className="mt-2.5 bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1558857563-b37fc820a4b1?w=200&auto=format&fit=crop&q=80"
                    alt="ToCoToCo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-800 truncate">Trà Sữa ToCoToCo</p>
                  <p className="text-[9px] text-red-600 font-black">29.000₫ <span className="line-through text-gray-400 font-normal">65.000₫</span></p>
                </div>
                <span className="text-[9px] bg-noti-50 text-noti-700 font-bold px-1.5 py-0.5 rounded">
                  Cách 350m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

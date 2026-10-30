import React from 'react';
import { ArrowRight, MapPin, Map, ShieldCheck, Tag, Compass, Sparkles, Store, Heart } from 'lucide-react';

export default function HeroBanner({ onOpenMerchantDashboard }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-600 via-rose-500 to-[#b51740] text-white pt-8 pb-12 px-4 sm:px-6">
      {/* Decorative background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#f6faf6] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-yellow-300">
            <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
            <span>SÀN ƯU ĐÃI THỜI TRANG • SPA • LÀM ĐẸP • MỸ PHẨM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Tỏa Sáng Rạng Rỡ <br />
            <span className="text-yellow-300">Với Ưu Đãi Làm Đẹp Gần Bạn</span>
          </h1>

          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Khám phá các chương trình giảm giá đến 70% từ các viện thẩm mỹ uy tín, spa chăm sóc da y khoa, salon nail & gội đầu thảo dược cùng các shop thời trang thiết kế hot trend quanh bạn.
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start text-xs font-medium">
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/20">
              <Map className="w-3.5 h-3.5 text-yellow-300" />
              <span>Bản đồ Spa & Tiệm gần bạn</span>
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Dịch vụ chuẩn y khoa & chính hãng</span>
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Lưu Deal Passport dùng tại quán</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <a 
              href="#dealmap-section"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-rose-700 font-extrabold text-sm shadow-lg hover:bg-yellow-300 hover:text-gray-900 transition-all flex items-center justify-center space-x-2 group"
            >
              <Compass className="w-4 h-4 text-rose-600 group-hover:rotate-45 transition-transform" />
              <span>Xem Bản Đồ Làm Đẹp Quanh Bạn</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenMerchantDashboard}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-black/25 hover:bg-black/35 border border-yellow-300/40 text-yellow-300 font-bold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Store className="w-4 h-4" />
              <span>Bạn là Chủ Spa / Shop? Xem Kênh Người Bán</span>
            </button>
          </div>

          {/* Verified Stats */}
          <div className="pt-2 flex items-center justify-center lg:justify-start space-x-6 text-xs text-white/80">
            <div>
              <p className="text-xl font-black text-white">1,250+</p>
              <p>Spa & Thẩm mỹ viện</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xl font-black text-white">680+</p>
              <p>Shop Thời trang & Mỹ phẩm</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-xl font-black text-white">4.9 / 5.0 ⭐</p>
              <p>Đánh giá khách hàng</p>
            </div>
          </div>
        </div>

        {/* Right Column: Clean App Mockup with Beauty Card */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-72 sm:w-80 bg-gray-900 rounded-[40px] p-3 shadow-2xl border border-white/20">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30" />

            {/* Screen Inner */}
            <div className="bg-[#fff9fa] rounded-[32px] overflow-hidden text-gray-800 pt-7 pb-4 px-3.5 relative">
              <div className="flex items-center justify-between pb-2 text-[11px] font-semibold text-gray-600 border-b border-pink-100">
                <div className="flex items-center space-x-1.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-[10px]">
                    DH
                  </span>
                  <span className="font-bold text-gray-800">DealHub Beauty</span>
                </div>
                <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  Gần bạn 650m
                </span>
              </div>

              {/* Map Preview Card */}
              <div className="mt-2.5 rounded-2xl overflow-hidden border border-rose-100 shadow-sm relative h-40 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80"
                  alt="Spa Làm Đẹp"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-rose-600 text-white px-2 py-0.5 rounded-md text-[10px] font-black shadow">
                  -62% OFF
                </div>
                
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="text-[9px] font-bold text-yellow-300 block">An Nhiên Beauty Spa</span>
                  <p className="text-[11px] font-black leading-tight line-clamp-1">Chăm Sóc Da Y Khoa 12 Bước</p>
                </div>
              </div>

              {/* Quick Categories inside phone */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5 text-center text-[9px] font-bold text-gray-700">
                <div className="p-2 bg-rose-50 text-rose-700 rounded-xl">Chăm sóc da</div>
                <div className="p-2 bg-pink-50 text-pink-700 rounded-xl">Đầm thiết kế</div>
                <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">Làm Nail</div>
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">Gội đầu</div>
              </div>

              {/* Sample Deal in Phone */}
              <div className="mt-2.5 bg-white p-2 rounded-xl border border-rose-100 shadow-sm flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&auto=format&fit=crop&q=80"
                    alt="Chic Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-800 truncate">Đầm Lụa Tơ Tằm Dáng Xòe</p>
                  <p className="text-[9px] text-red-600 font-black">249.000₫ <span className="line-through text-gray-400 font-normal">550.000₫</span></p>
                </div>
                <span className="text-[9px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                  Cách 850m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

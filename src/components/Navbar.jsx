import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  Bell, 
  ChevronDown, 
  User, 
  Map, 
  Wallet, 
  Target, 
  BarChart3 
} from 'lucide-react';
import { CITIES } from '../data/mockData';

export default function Navbar({
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
  onOpenPostDeal,
  onOpenPassport,
  onOpenMissions,
  onOpenMerchantDashboard,
  savedDealsCount = 0
}) {
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-gradient-to-r from-noti-700 via-noti-600 to-[#189a07] text-white">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs border-b border-white/10 text-white/90">
        <div className="flex items-center space-x-4">
          <span className="font-medium">Nền tảng tìm kiếm ưu đãi & khuyến mãi địa phương</span>
          <span className="hidden md:inline text-white/30">|</span>
          <a href="#dealmap-section" className="hidden md:flex items-center gap-1 hover:text-white text-yellow-300 font-semibold transition-colors">
            <Map className="w-3.5 h-3.5" />
            <span>Bản đồ khuyến mãi</span>
          </a>
        </div>
        <div className="flex items-center space-x-4 font-medium text-white/90">
          <button 
            onClick={onOpenMerchantDashboard}
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-yellow-300" />
            <span>Kênh người bán (Đo hiệu quả)</span>
          </button>
          <span className="text-white/30">|</span>
          <button 
            onClick={onOpenMissions}
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
          >
            <Target className="w-3.5 h-3.5 text-yellow-300" />
            <span>Nhiệm vụ săn deal</span>
          </button>
          <span className="text-white/30">|</span>
          <span className="cursor-pointer hover:text-white transition-colors">Trợ giúp</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 md:gap-5">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white p-1.5 shadow flex items-center justify-center">
            <img src="/logo.svg" alt="DealHub" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 leading-none">
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                DEAL<span className="text-yellow-300">HUB</span>
              </span>
            </div>
            <p className="text-[10px] text-white/80 font-medium tracking-wider mt-0.5 hidden sm:block uppercase">
              Sàn Khuyến Mãi Địa Phương
            </p>
          </div>
        </a>

        {/* Location selector */}
        <div className="relative hidden lg:block flex-shrink-0">
          <button
            onClick={() => setShowCityDropdown(!showCityDropdown)}
            className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/20 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-yellow-300" />
            <span className="truncate max-w-[120px]">{selectedCity}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {showCityDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 text-gray-800 border border-gray-100">
              <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Chọn khu vực
              </div>
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCityDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${
                    selectedCity === city ? 'bg-noti-50 text-noti-700 font-bold' : ''
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm món ăn, dịch vụ, cửa hàng đang có ưu đãi..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-inner"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <button className="absolute right-1.5 px-3.5 py-1.5 bg-noti-500 hover:bg-noti-600 active:scale-95 text-white font-bold text-xs rounded-lg shadow-sm transition-all">
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* Deal Passport Wallet Button */}
          <button
            onClick={onOpenPassport}
            className="flex items-center space-x-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-2 rounded-xl text-xs font-bold border border-white/25 transition-all text-white relative shadow-sm"
          >
            <Wallet className="w-4 h-4 text-yellow-300" />
            <span className="hidden sm:inline">Deal Passport</span>
            {savedDealsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
                {savedDealsCount}
              </span>
            )}
          </button>

          {/* Post Deal Button (Chotot Style) */}
          <button
            onClick={onOpenPostDeal}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-gray-900 font-extrabold px-3 py-2 rounded-xl text-xs sm:text-sm shadow hover:shadow-md active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-gray-900" />
            <span className="hidden sm:inline">ĐĂNG DEAL</span>
            <span className="sm:hidden">ĐĂNG</span>
          </button>

          {/* User Profile */}
          <button 
            onClick={onOpenMissions}
            className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            title="Xem nhiệm vụ & thành tích"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}

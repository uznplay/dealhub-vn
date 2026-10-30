import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Ticket, 
  Store, 
  Target
} from 'lucide-react';
import { CITIES } from '../data/mockData';

export default function Navbar({
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
  onOpenPassport,
  onOpenMissions,
  onOpenMerchantDashboard,
  savedDealsCount = 0
}) {
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-noti-700 via-noti-600 to-noti-500 text-white shadow-md">
      {/* Top Bar with Brand & Merchant Switcher */}
      <div className="px-3.5 pt-2.5 pb-2 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
            <img src="/logo.svg" alt="DealHub" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight leading-none text-white block">
              DEAL<span className="text-yellow-300">HUB</span>
            </span>
            <span className="text-[9px] text-green-100 font-bold uppercase tracking-wider block">
              Bản Đồ Deal Địa Phương
            </span>
          </div>
        </div>

        {/* Right tools: Kho voucher & Kênh người bán */}
        <div className="flex items-center space-x-1.5">
          {/* Mission */}
          <button
            onClick={onOpenMissions}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Nhiệm vụ săn deal"
          >
            <Target className="w-4 h-4 text-yellow-300" />
          </button>

          {/* Kho Voucher Button */}
          <button
            onClick={onOpenPassport}
            className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all relative border border-white/20"
          >
            <Ticket className="w-3.5 h-3.5 text-yellow-300" />
            <span className="text-[11px]">Kho Voucher</span>
            {savedDealsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-yellow-400 text-gray-950 text-[10px] font-black flex items-center justify-center">
                {savedDealsCount}
              </span>
            )}
          </button>

          {/* Kênh Người Bán icon link */}
          <button
            onClick={onOpenMerchantDashboard}
            className="p-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-gray-950 transition-colors flex items-center gap-1 px-2 text-[10px] font-black shadow-xs"
            title="Dành cho chủ cửa hàng"
          >
            <Store className="w-3.5 h-3.5" />
            <span>KÊNH BÁN</span>
          </button>
        </div>
      </div>

      {/* Search & Location Row */}
      <div className="px-3 pb-2.5 flex items-center gap-2">
        {/* City selector */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowCityDropdown(!showCityDropdown)}
            className="flex items-center space-x-1 bg-black/20 hover:bg-black/30 px-2.5 py-2 rounded-xl text-[11px] font-semibold border border-white/15"
          >
            <MapPin className="w-3 h-3 text-yellow-300" />
            <span className="truncate max-w-[80px]">{selectedCity}</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {showCityDropdown && (
            <div className="absolute left-0 mt-1.5 w-40 bg-white rounded-xl shadow-xl py-1 z-50 text-gray-800 border border-gray-100 text-xs">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCityDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 font-medium hover:bg-green-50 ${
                    selectedCity === city ? 'bg-green-100 text-noti-700 font-bold' : ''
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm spa, tiệm tóc, nail gần bạn..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-inner"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2 pointer-events-none" />
        </div>
      </div>
    </header>
  );
}

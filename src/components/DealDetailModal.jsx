import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Navigation, 
  Check, 
  ShieldCheck, 
  Clock, 
  FileText,
  Wallet,
  Bookmark
} from 'lucide-react';

export default function DealDetailModal({ deal, onClose, onSaveDeal, onViewOnMap, isSaved = false }) {
  const [copied, setCopied] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  if (!deal) return null;

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToPassport = () => {
    if (onSaveDeal) {
      onSaveDeal(deal);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-44 w-full bg-gray-900 flex-shrink-0">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Badges on image */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded shadow">
                {deal.discount}
              </span>
              <span className="bg-gray-900/80 text-white font-medium text-[10px] px-2 py-0.5 rounded shadow">
                {deal.city}
              </span>
            </div>
            <h2 className="text-white font-black text-sm line-clamp-1 drop-shadow">
              {deal.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 space-y-3 text-gray-800 overflow-y-auto flex-1">
          
          {/* Price & Code Bar */}
          <div className="flex items-center justify-between gap-2 bg-[#f4faf4] p-3 rounded-2xl border border-green-200">
            <div>
              <span className="text-[10px] text-gray-500 font-medium block">Giá ưu đãi</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-lg font-black text-red-600">
                  {deal.salePrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {deal.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Promo Code Box */}
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1.5 bg-white text-gray-800 border border-dashed border-green-400 rounded-xl text-xs font-mono font-bold flex items-center gap-1 shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-noti-600" /> : null}
              <span>{copied ? 'Đã sao chép' : `MÃ: DEALHUB${deal.id.slice(-3).toUpperCase()}`}</span>
            </button>
          </div>

          {/* Kho Voucher Save CTA Button */}
          <button
            onClick={handleSaveToPassport}
            className={`w-full py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-95 ${
              isSaved || justSaved
                ? 'bg-noti-500 text-white'
                : 'bg-yellow-400 hover:bg-yellow-300 text-gray-950'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isSaved || justSaved ? '✓ Đã Lưu Vào Kho Voucher' : 'Lưu Vào Kho Voucher (Dùng Tại Quán)'}</span>
          </button>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3 text-noti-600" /> Chi tiết chương trình
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed font-normal">
              {deal.description}
            </p>
          </div>

          {/* Store Info */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Cửa hàng áp dụng</div>
              <div className="font-bold text-xs text-gray-900">{deal.storeName}</div>
              <div className="flex items-center gap-1 text-[11px] text-gray-600 mt-0.5">
                <MapPin className="w-3 h-3 text-noti-600 flex-shrink-0" />
                <span className="truncate">{deal.address}</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-gray-200 text-xs">
              {onViewOnMap ? (
                <button
                  onClick={() => {
                    onViewOnMap(deal);
                    onClose();
                  }}
                  className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-green-50 hover:bg-green-100 text-noti-700 rounded-lg font-bold border border-green-200 text-[10px]"
                >
                  <MapPin className="w-3 h-3 text-noti-600" />
                  <span>Bản đồ</span>
                </button>
              ) : null}

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(deal.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-white text-blue-700 rounded-lg font-bold border border-blue-200 text-[10px]"
              >
                <Navigation className="w-3 h-3" />
                <span>Chỉ đường</span>
              </a>

              <a
                href="tel:19001234"
                className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-white text-emerald-700 rounded-lg font-bold border border-emerald-200 text-[10px]"
              >
                <Phone className="w-3 h-3" />
                <span>Gọi điện</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-1 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-noti-600" />
            <span>Xác thực bởi DealHub</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

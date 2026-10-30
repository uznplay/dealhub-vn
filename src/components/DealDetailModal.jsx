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

export default function DealDetailModal({ deal, onClose, onSaveDeal, isSaved = false }) {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-gray-900">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Badges on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded-md shadow">
                {deal.discount}
              </span>
              <span className="bg-gray-900/80 text-white font-medium text-xs px-2.5 py-0.5 rounded-md shadow">
                {deal.city}
              </span>
            </div>
            <h2 className="text-white font-black text-lg sm:text-xl line-clamp-2 drop-shadow">
              {deal.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 text-gray-800">
          
          {/* Price & Code Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-noti-50 p-4 rounded-2xl border border-noti-200">
            <div>
              <span className="text-xs text-gray-500 font-medium">Giá khuyến mãi:</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-black text-red-600">
                  {deal.salePrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-sm text-gray-400 line-through font-semibold">
                  {deal.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-dashed border-noti-400 shadow-sm">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Mã ưu đãi</span>
                <span className="font-mono font-black text-noti-700 text-sm">DEALHUB{deal.id.slice(-3).toUpperCase()}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1 bg-noti-500 hover:bg-noti-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          {/* Deal Passport Save CTA Button (Feature 1) */}
          <button
            onClick={handleSaveToPassport}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
              isSaved || justSaved
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-gray-900'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>{isSaved || justSaved ? '✓ Đã Lưu Vào Deal Passport' : 'Lưu Vào Ví Deal Passport (Dùng Khi Đi Ăn / Đi Chơi)'}</span>
          </button>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-noti-600" /> Chi tiết chương trình
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {deal.description}
            </p>
          </div>

          {/* Store Info & Direct O2O Action */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase">Cửa hàng áp dụng</div>
              <div className="font-black text-base text-gray-900">{deal.storeName}</div>
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-noti-600" />
                <span>{deal.address}</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200 text-xs">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(deal.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-white hover:bg-blue-50 text-blue-700 rounded-xl font-bold border border-blue-200 shadow-sm transition-colors"
              >
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>Chỉ đường</span>
              </a>

              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-white hover:bg-cyan-50 text-cyan-700 rounded-xl font-bold border border-cyan-200 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-cyan-600" />
                <span>Nhắn tin</span>
              </a>

              <a
                href="tel:19001234"
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-white hover:bg-emerald-50 text-emerald-700 rounded-xl font-bold border border-emerald-200 shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Gọi điện</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-noti-600" />
            <span>Thông tin đã được xác thực</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-noti-500 hover:bg-noti-600 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

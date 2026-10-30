import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  QrCode, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Navigation,
  Trash2,
  Filter
} from 'lucide-react';

export default function DealPassportModal({ savedDeals = [], onRemoveDeal, onMarkUsed, onClose }) {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'used'
  const [activeQrDeal, setActiveQrDeal] = useState(null);

  const filtered = savedDeals.filter(deal => {
    if (filterStatus === 'active') return !deal.isUsed;
    if (filterStatus === 'used') return deal.isUsed;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-noti-600 via-noti-500 to-emerald-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner">
              <Wallet className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-lg">DEAL PASSPORT</h3>
                <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Ví Cá Nhân
                </span>
              </div>
              <p className="text-xs text-white/90">
                Lưu trữ và xuất trình mã ưu đãi khi đến trải nghiệm tại quán
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">Trạng thái:</span>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterStatus === 'all' ? 'bg-noti-500 text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tất cả ({savedDeals.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterStatus === 'active' ? 'bg-noti-500 text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Còn hạn ({savedDeals.filter(d => !d.isUsed).length})
            </button>
            <button
              onClick={() => setFilterStatus('used')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterStatus === 'used' ? 'bg-noti-500 text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Đã dùng ({savedDeals.filter(d => d.isUsed).length})
            </button>
          </div>

          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Tự động đồng bộ với tài khoản của bạn
          </span>
        </div>

        {/* List of Saved Deals */}
        <div className="p-5 max-h-[460px] overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                <Wallet className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">Chưa có ưu đãi nào trong ví</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                Hãy nhấn nút "Lưu vào ví" ở các ưu đãi bạn thích để dễ dàng sử dụng khi đến cửa hàng.
              </p>
            </div>
          ) : (
            filtered.map((deal) => (
              <div
                key={deal.id}
                className={`p-4 rounded-2xl border transition-all ${
                  deal.isUsed 
                    ? 'bg-gray-50/80 border-gray-200 opacity-60' 
                    : 'bg-white border-gray-200 hover:border-noti-300 hover:shadow-md'
                }`}
              >
                <div className="flex gap-3.5">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                      {deal.discount}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-noti-700 truncate">
                        {deal.storeName}
                      </span>
                      {deal.isUsed ? (
                        <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-gray-500" /> Đã sử dụng
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-600" /> Còn hạn sử dụng
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1 mt-0.5">
                      {deal.title}
                    </h4>

                    <div className="flex items-center justify-between text-xs mt-2">
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-red-600 font-black text-sm">
                          {deal.salePrice.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-gray-400 line-through text-[11px]">
                          {deal.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        {!deal.isUsed && (
                          <>
                            <button
                              onClick={() => setActiveQrDeal(deal)}
                              className="px-2.5 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>Mở mã QR</span>
                            </button>

                            <button
                              onClick={() => onMarkUsed(deal.id)}
                              className="px-2.5 py-1.5 bg-noti-50 hover:bg-noti-100 text-noti-700 rounded-xl font-bold text-[11px] transition-colors"
                              title="Đánh dấu đã sử dụng"
                            >
                              Đã dùng
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => onRemoveDeal(deal.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          title="Xóa khỏi ví"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* QR Code Popup when clicking "Mở mã QR" */}
        {activeQrDeal && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl">
              <button
                onClick={() => setActiveQrDeal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-noti-100 text-noti-600 flex items-center justify-center mx-auto mb-2">
                <QrCode className="w-6 h-6" />
              </div>

              <h4 className="font-black text-gray-900 text-base">Xác Nhận Ưu Đãi Tại Quán</h4>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{activeQrDeal.storeName}</p>

              {/* QR Code display */}
              <div className="my-4 p-3 bg-white border-2 border-dashed border-noti-400 rounded-2xl inline-block shadow-inner">
                {/* SVG QR Code Illustration */}
                <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
                  {/* Position squares */}
                  <rect x="5" y="5" width="28" height="28" rx="4" stroke="#1faa08" strokeWidth="4" />
                  <rect x="11" y="11" width="16" height="16" fill="#1faa08" />
                  
                  <rect x="67" y="5" width="28" height="28" rx="4" stroke="#1faa08" strokeWidth="4" />
                  <rect x="73" y="11" width="16" height="16" fill="#1faa08" />

                  <rect x="5" y="67" width="28" height="28" rx="4" stroke="#1faa08" strokeWidth="4" />
                  <rect x="11" y="73" width="16" height="16" fill="#1faa08" />

                  {/* Center Pattern */}
                  <rect x="38" y="15" width="8" height="8" fill="#1faa08" />
                  <rect x="50" y="10" width="6" height="18" fill="#333333" />
                  <rect x="42" y="38" width="18" height="18" rx="3" fill="#1faa08" />
                  <rect x="15" y="42" width="12" height="6" fill="#333333" />
                  <rect x="70" y="45" width="16" height="8" fill="#333333" />
                  <rect x="40" y="65" width="10" height="25" fill="#333333" />
                  <rect x="60" y="65" width="18" height="10" fill="#1faa08" />
                  <rect x="75" y="80" width="12" height="12" fill="#333333" />
                </svg>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-xs">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Mã xác thực</span>
                <span className="font-mono font-black text-noti-700 text-base">DH-{activeQrDeal.id.slice(-4).toUpperCase()}</span>
              </div>

              <p className="text-[11px] text-gray-500 mt-3">
                Đưa mã này cho nhân viên thu ngân quét để áp dụng giảm giá trực tiếp.
              </p>

              <button
                onClick={() => {
                  onMarkUsed(activeQrDeal.id);
                  setActiveQrDeal(null);
                }}
                className="mt-3 w-full py-2.5 bg-noti-500 hover:bg-noti-600 text-white rounded-xl font-bold text-xs transition-colors shadow"
              >
                Xác nhận đã dùng thành công
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


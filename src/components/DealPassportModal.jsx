import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  QrCode, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  Trash2, 
  Copy, 
  Check,
  Gift,
  Coins
} from 'lucide-react';

export default function DealPassportModal({ 
  savedDeals = [], 
  onRemoveDeal, 
  onMarkUsed, 
  onClose,
  userPoints = 150,
  onOpenRewards
}) {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'used'
  const [activeQrDeal, setActiveQrDeal] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const filtered = savedDeals.filter(deal => {
    if (filterStatus === 'active') return !deal.isUsed;
    if (filterStatus === 'used') return deal.isUsed;
    return true;
  });

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Kho Voucher */}
        <div className="bg-gradient-to-r from-noti-600 to-emerald-700 p-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
              <Ticket className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-black text-sm uppercase tracking-wide">KHO VOUCHER CỦA BẠN</h3>
              </div>
              <p className="text-[11px] text-green-100">
                Xuất trình mã này cho nhân viên tại tiệm để áp dụng
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs flex-shrink-0">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                filterStatus === 'all' 
                  ? 'bg-noti-500 text-white shadow-2xs' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tất cả ({savedDeals.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                filterStatus === 'active' 
                  ? 'bg-noti-500 text-white shadow-2xs' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Chưa dùng ({savedDeals.filter(d => !d.isUsed).length})
            </button>
            <button
              onClick={() => setFilterStatus('used')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                filterStatus === 'used' 
                  ? 'bg-noti-500 text-white shadow-2xs' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Đã dùng ({savedDeals.filter(d => d.isUsed).length})
            </button>
          </div>
        </div>

        {/* Điểm thưởng & Đổi voucher thêm banner */}
        <div className="px-3.5 py-2 bg-gradient-to-r from-amber-50 to-emerald-50 border-b border-amber-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-black text-amber-950">
              ⭐
            </div>
            <span className="text-[11px] text-gray-700 font-bold">
              Có <strong className="text-amber-700">{userPoints}</strong> điểm thưởng
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onOpenRewards) onOpenRewards();
            }}
            className="text-[10px] font-black text-noti-700 bg-white hover:bg-noti-50 px-2 py-1 rounded-lg border border-noti-200 shadow-2xs transition-all flex items-center gap-1"
          >
            <Gift className="w-3 h-3 text-amber-500" />
            <span>Đổi Quà Thêm</span>
          </button>
        </div>

        {/* List of Saved Vouchers */}
        <div className="p-3.5 overflow-y-auto space-y-2.5 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2 text-gray-400">
                <Ticket className="w-7 h-7" />
              </div>
              <p className="font-bold text-gray-700 text-xs">Kho voucher đang trống</p>
              <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto">
                Hãy lướt bản đồ hoặc bảng tin để lưu các voucher làm đẹp quanh bạn vào đây.
              </p>
            </div>
          ) : (
            filtered.map((deal) => {
              const voucherCode = deal.code || `DH-${Math.abs(deal.id.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 9000 + 1000)}`;

              return (
                <div
                  key={deal.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    deal.isUsed 
                      ? 'bg-gray-50 border-gray-200 opacity-70' 
                      : 'bg-white border-green-200 shadow-2xs hover:border-noti-400'
                  }`}
                >
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-noti-700 uppercase tracking-wider truncate">
                            {deal.storeName}
                          </span>
                          {deal.isUsed ? (
                            <span className="bg-gray-200 text-gray-600 text-[9px] font-black px-1.5 py-0.2 rounded">
                              ĐÃ DÙNG
                            </span>
                          ) : (
                            <span className="bg-green-100 text-noti-800 text-[9px] font-black px-1.5 py-0.2 rounded">
                              CÒN HẠN
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1 mt-0.5">
                          {deal.title}
                        </h4>

                        <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span>{deal.address}</span>
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-black text-red-600">
                          {deal.salePrice?.toLocaleString('vi-VN')}₫
                        </div>
                        <div className="text-[9px] text-gray-400 line-through">
                          {deal.originalPrice?.toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                    </div>

                    {/* Voucher Code Box */}
                    <div className="mt-2.5 p-2 bg-[#f4faf4] rounded-xl border border-dashed border-green-300 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <Ticket className="w-3.5 h-3.5 text-noti-600" />
                        <span className="font-mono font-black text-xs text-gray-900 tracking-wider">
                          {voucherCode}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleCopy(voucherCode)}
                          className="px-2 py-0.5 bg-white text-gray-700 hover:bg-gray-100 rounded text-[10px] font-bold border border-gray-200 flex items-center gap-1"
                        >
                          {copiedCode === voucherCode ? (
                            <Check className="w-3 h-3 text-noti-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-500" />
                          )}
                          <span>{copiedCode === voucherCode ? 'Đã chép' : 'Sao chép'}</span>
                        </button>

                        {!deal.isUsed && (
                          <button
                            onClick={() => setActiveQrDeal({ ...deal, voucherCode })}
                            className="px-2 py-0.5 bg-noti-500 hover:bg-noti-600 text-white rounded text-[10px] font-bold flex items-center gap-1 shadow-2xs"
                          >
                            <QrCode className="w-3 h-3" />
                            <span>Mã QR</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                      <span>Lưu: {deal.savedAt || 'Hôm nay'}</span>
                      <button
                        onClick={() => onRemoveDeal && onRemoveDeal(deal.id)}
                        className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* QR Code Popup for In-Store Verification */}
        {activeQrDeal && (
          <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm p-4 flex flex-col items-center justify-center text-center animate-fadeIn">
            <button
              onClick={() => setActiveQrDeal(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-bold text-noti-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200 uppercase mb-1">
              Đưa mã cho thu ngân quét
            </span>
            <h4 className="font-black text-sm text-gray-900 max-w-xs line-clamp-1">
              {activeQrDeal.title}
            </h4>
            <p className="text-[11px] text-gray-500">{activeQrDeal.storeName}</p>

            {/* QR Visual */}
            <div className="my-3 p-3 bg-white border-2 border-dashed border-noti-400 rounded-2xl shadow-md">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${activeQrDeal.voucherCode}&color=16a34a`}
                alt="Voucher QR Code"
                className="w-36 h-36 object-contain"
              />
            </div>

            <div className="bg-gray-100 px-4 py-1.5 rounded-xl text-center">
              <span className="text-[10px] text-gray-500 block">MÃ XÁC NHẬN</span>
              <span className="font-mono text-base font-black text-gray-900 tracking-wider">
                {activeQrDeal.voucherCode}
              </span>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  if (onMarkUsed) onMarkUsed(activeQrDeal.id);
                  setActiveQrDeal(null);
                }}
                className="px-4 py-2 bg-noti-500 hover:bg-noti-600 text-white rounded-xl text-xs font-black shadow-sm"
              >
                Xác nhận đã dùng xong
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

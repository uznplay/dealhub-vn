import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  ArrowRight, 
  Zap, 
  Clock, 
  Utensils, 
  Gamepad2, 
  Film, 
  Coffee 
} from 'lucide-react';

export default function DealPassModal({ isOpen, onClose, isSubscribed, onSubscribeSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' | 'yearly'
  const [step, setStep] = useState('plans'); // 'plans' | 'qr_payment' | 'success'
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStartPayment = () => {
    setStep('qr_payment');
  };

  const handleConfirmPaid = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      if (onSubscribeSuccess) {
        onSubscribeSuccess();
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 p-1.5 rounded-full transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Crown className="w-5 h-5 text-yellow-200 fill-yellow-200" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-yellow-200 block">
                B2C VIP MEMBERSHIP
              </span>
              <h2 className="text-base font-black leading-tight">Gói Hội Viên DealPass</h2>
            </div>
          </div>
          <p className="text-[11px] text-white/90">
            Xài đồ xịn giá giảm 30% - 70% tại hàng ngàn quán ăn, cafe, bida & rạp phim quanh bạn!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {step === 'plans' && (
            <>
              {/* Value Proposition Pills */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-amber-50 rounded-xl border border-amber-100 text-amber-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Ăn uống giảm 50%</span>
                </div>
                <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Bida & Game máy lạnh</span>
                </div>
                <div className="p-2 bg-rose-50 rounded-xl border border-rose-100 text-rose-900 flex items-center gap-2">
                  <Film className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Vé xem phim cuối tuần</span>
                </div>
                <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mua 1 tặng 1 Cafe</span>
                </div>
              </div>

              {/* Package Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 block">Chọn gói hội viên:</label>
                
                {/* Monthly Plan */}
                <div 
                  onClick={() => setSelectedPlan('monthly')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'monthly'
                      ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-gray-900">Gói Tháng</span>
                      <span className="text-[9px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded-full">
                        Phổ biến nhất
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">Tiết kiệm 500k - 1.5M mỗi tháng</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-orange-600">49.000₫</span>
                    <span className="text-[10px] text-gray-400 block">/tháng</span>
                  </div>
                </div>

                {/* Yearly Plan */}
                <div 
                  onClick={() => setSelectedPlan('yearly')}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'yearly'
                      ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-gray-900">Gói Năm</span>
                      <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full">
                        Tặng 2 tháng
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">Tiết kiệm trọn gói 12 tháng</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-orange-600">499.000₫</span>
                    <span className="text-[10px] text-gray-400 block">/năm</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-1.5 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lưu deal 0đ không cần cọc tiền trước</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cam kết deal thật 100%, không phụ thu ẩn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Hoàn tiền nếu không tiết kiệm được gấp đôi phí</span>
                </div>
              </div>

              <button
                onClick={handleStartPayment}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Thanh Toán {selectedPlan === 'monthly' ? '49.000₫' : '499.000₫'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'qr_payment' && (
            <div className="space-y-3 text-center">
              <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                <span className="text-xs text-orange-800 font-bold block mb-1">
                  Quét mã QR VietQR / MoMo để kích hoạt
                </span>
                <div className="w-44 h-44 mx-auto bg-white p-2 rounded-xl shadow-inner border border-gray-200 flex items-center justify-center">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=DEALPASS_${selectedPlan.toUpperCase()}_49000_VND`} 
                    alt="VietQR DealPass" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-2 text-xs font-black text-gray-900">
                  Số tiền: {selectedPlan === 'monthly' ? '49.000₫' : '499.000₫'}
                </div>
                <p className="text-[10px] text-gray-500">Nội dung: DEALPASS {Date.now().toString().slice(-6)}</p>
              </div>

              <button
                onClick={handleConfirmPaid}
                disabled={isProcessing}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang kích hoạt gói hội viên...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tôi Đã Chuyển Khoản Thành Công</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setStep('plans')}
                className="text-[11px] text-gray-400 hover:text-gray-600"
              >
                Quay lại chọn gói khác
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-3 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <Crown className="w-9 h-9 fill-emerald-600" />
              </div>
              <h3 className="text-base font-black text-gray-900">
                Chúc Mừng Bạn Đã Trở Thành Hội Viên DealPass!
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed px-2">
                Gói DealPass của bạn đã được kích hoạt. Bạn hiện có quyền lưu không giới hạn tất cả các deal ăn uống, bida, rạp phim và mua sắm giảm 30% - 70%.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-noti-500 text-white font-bold text-xs rounded-xl shadow active:scale-98"
              >
                Bắt Đầu Săn Deal Ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


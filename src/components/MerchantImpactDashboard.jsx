import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  Eye, 
  Bookmark, 
  Ticket, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ScanLine,
  ArrowUpRight,
  Filter,
  DollarSign
} from 'lucide-react';

export default function MerchantImpactDashboard({ onClose }) {
  const [selectedCampaign, setSelectedCampaign] = useState('c1');
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  // Sample real data from the prompt & local merchant metrics
  const CAMPAIGNS = {
    c1: {
      name: 'ToCoToCo Tea - Trà Sữa Mua 1 Tặng 1 Giờ Vàng',
      views: 2450,
      saves: 580,
      claims: 290,
      redemptions: 142,
      newCustomers: 98,
      estimatedRevenue: '18.460.000₫',
      status: 'Đang diễn ra'
    },
    c2: {
      name: 'Ưu Đãi Khai Trương Giảm 15% Toàn Bộ Hóa Đơn',
      views: 200,
      saves: 60,
      claims: 25,
      redemptions: 12,
      newCustomers: 9,
      estimatedRevenue: '4.200.000₫',
      status: 'Đang diễn ra'
    }
  };

  const current = CAMPAIGNS[selectedCampaign];

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;

    setVerifyResult({
      success: true,
      code: verifyCode.toUpperCase(),
      discount: 'Giảm 25.000₫ đơn từ 60.000₫',
      customer: 'Khách hàng DealHub #8492'
    });
    setVerifyCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-noti-500 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-lg">DEAL IMPACT DASHBOARD</h3>
                <span className="bg-noti-500/20 text-noti-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-noti-500/30">
                  Dành Cho Cửa Hàng B2B
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Đo lường hiệu quả chuyển đổi từ lượt xem online sang lượt khách đến quán thực tế (O2O)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Campaign Switcher Bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-600">Chiến dịch:</span>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-noti-500"
            >
              <option value="c1">ToCoToCo Tea - Trà Sữa Mua 1 Tặng 1</option>
              <option value="c2">Ưu Đãi Khai Trương Giảm 15% Toàn Menu</option>
            </select>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              {current.status}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-gray-500">
            <span>Doanh thu ước tính mang lại:</span>
            <b className="text-sm font-black text-noti-600">{current.estimatedRevenue}</b>
          </div>
        </div>

        {/* 5 Core Metrics Cards (As requested in prompt) */}
        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* 1. Deal views */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Deal Views</span>
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-gray-900">{current.views.toLocaleString('vi-VN')}</p>
            <p className="text-[10px] text-gray-500 mt-1">Lượt xem ưu đãi</p>
          </div>

          {/* 2. Saves */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Saves</span>
              <Bookmark className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-gray-900">{current.saves.toLocaleString('vi-VN')}</p>
            <p className="text-[10px] text-gray-500 mt-1">Lưu vào Deal Passport</p>
          </div>

          {/* 3. Claims */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Claims</span>
              <Ticket className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-gray-900">{current.claims.toLocaleString('vi-VN')}</p>
            <p className="text-[10px] text-gray-500 mt-1">Lượt nhận mã ưu đãi</p>
          </div>

          {/* 4. Redemptions */}
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-sm bg-emerald-50/30">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Redemptions</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-600">{current.redemptions.toLocaleString('vi-VN')}</p>
            <p className="text-[10px] text-emerald-700 font-medium mt-1">Đã dùng tại quán</p>
          </div>

          {/* 5. New Customers */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">New Guests</span>
              <Users className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-gray-900">+{current.newCustomers}</p>
            <p className="text-[10px] text-gray-500 mt-1">Khách mới ghi nhận</p>
          </div>
        </div>

        {/* Funnel & In-store Redemption Form */}
        <div className="px-5 pb-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Conversion Funnel */}
          <div className="lg:col-span-7 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-noti-600" /> Phễu Chuyển Đổi Thực Tế (Conversion Rate)
              </h4>
              <span className="text-[11px] text-noti-600 font-bold">
                Tỷ lệ về quán: {((current.redemptions / current.views) * 100).toFixed(1)}%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                  <span>1. Lượt xem ưu đãi (Deal Views)</span>
                  <span className="font-bold text-gray-900">{current.views} (100%)</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                  <span>2. Lưu vào ví Deal Passport (Saves)</span>
                  <span className="font-bold text-gray-900">{current.saves} ({Math.round((current.saves / current.views) * 100)}%)</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(current.saves / current.views) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                  <span>3. Nhận mã ưu đãi (Claims)</span>
                  <span className="font-bold text-gray-900">{current.claims} ({Math.round((current.claims / current.views) * 100)}%)</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(current.claims / current.views) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                  <span>4. Sử dụng tại quán (Redemptions)</span>
                  <span className="font-bold text-emerald-600">{current.redemptions} ({((current.redemptions / current.views) * 100).toFixed(1)}%)</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(current.redemptions / current.views) * 100 * 2}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* In-store Cashier Redemption Tool */}
          <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-gray-900 font-black text-xs uppercase mb-1">
                <ScanLine className="w-4 h-4 text-noti-600" />
                <span>Xác Nhận Mã Ưu Đãi Tại Quán</span>
              </div>
              <p className="text-[11px] text-gray-500 mb-3">
                Nhân viên thu ngân nhập mã hoặc quét mã QR từ Deal Passport của khách để ghi nhận Redemption.
              </p>

              <form onSubmit={handleVerify} className="space-y-2">
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  placeholder="Nhập mã ưu đãi (VD: DH-7828)"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-noti-500"
                />

                <button
                  type="submit"
                  className="w-full py-2 bg-noti-500 hover:bg-noti-600 text-white rounded-xl font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Xác Nhận Sử Dụng Mã</span>
                </button>
              </form>

              {verifyResult && (
                <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Mã {verifyResult.code} hợp lệ!
                  </div>
                  <p className="text-gray-600 mt-0.5">{verifyResult.discount}</p>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
              * Dữ liệu được đồng bộ hóa tức thì với báo cáo kinh doanh của đối tác.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Hỗ trợ đối tác cửa hàng: <b>merchant@dealhub.vn</b>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors"
          >
            Đóng bảng đo lường
          </button>
        </div>
      </div>
    </div>
  );
}

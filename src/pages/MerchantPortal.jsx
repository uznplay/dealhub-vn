import React, { useState } from 'react';
import { 
  BarChart3, 
  Eye, 
  Bookmark, 
  Ticket, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ScanLine, 
  Plus, 
  Store, 
  Clock, 
  Sparkles, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Star, 
  ArrowLeft,
  Settings,
  Bell,
  HelpCircle,
  ExternalLink,
  DollarSign,
  AlertCircle,
  Check
} from 'lucide-react';
import { redeemVoucherBackend } from '../lib/supabase';

export default function MerchantPortal({ onBackToHome, onOpenPostDeal, onTriggerPushNoti }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'deals' | 'scanner' | 'profile'
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  // Store's active deals list
  const [merchantDeals, setMerchantDeals] = useState([
    {
      id: 'm-deal-1',
      title: 'Gói Chăm Sóc Da Y Khoa Chuyên Sâu 12 Bước',
      category: 'Spa & Chăm sóc da',
      originalPrice: 500000,
      salePrice: 189000,
      discount: '-62%',
      views: 1420,
      saves: 320,
      redemptions: 84,
      revenue: '15.876.000₫',
      status: 'active'
    },
    {
      id: 'm-deal-2',
      title: 'Triệt Lông Nách & Tay Diode Laser Âm 5 Độ C',
      category: 'Thẩm mỹ viện',
      originalPrice: 800000,
      salePrice: 299000,
      discount: '-63%',
      views: 1030,
      saves: 260,
      redemptions: 58,
      revenue: '17.342.000₫',
      status: 'active'
    },
    {
      id: 'm-deal-3',
      title: 'Gội Đầu Dưỡng Sinh Thảo Dược 75 Phút',
      category: 'Hair Salon',
      originalPrice: 250000,
      salePrice: 99000,
      discount: '-60%',
      views: 890,
      saves: 195,
      redemptions: 45,
      revenue: '4.455.000₫',
      status: 'paused'
    }
  ]);

  // Real-time checkin history
  const [recentRedemptions, setRecentRedemptions] = useState([
    { id: 'ck-1', code: 'DH-7828', customer: 'Ngọc Mai', service: 'Chăm Sóc Da Y Khoa 12 Bước', time: '10 phút trước', amount: '189.000₫' },
    { id: 'ck-2', code: 'DH-5058', customer: 'Thu Hương', service: 'Gội Đầu Dưỡng Sinh Thảo Dược', time: '35 phút trước', amount: '99.000₫' },
    { id: 'ck-3', code: 'DH-3435', customer: 'Thanh Hằng', service: 'Triệt Lông Diode Laser', time: '1 giờ trước', amount: '299.000₫' }
  ]);

  const toggleDealStatus = (id) => {
    setMerchantDeals(merchantDeals.map(d => {
      if (d.id === id) {
        return { ...d, status: d.status === 'active' ? 'paused' : 'active' };
      }
      return d;
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;

    const res = await redeemVoucherBackend(verifyCode);
    if (res.success) {
      setVerifyResult({
        success: true,
        code: res.voucher.code,
        service: res.voucher.title,
        discount: `Khách thanh toán ${res.voucher.salePrice?.toLocaleString('vi-VN')}₫`
      });
      setRecentRedemptions([res.record, ...recentRedemptions]);
      setVerifyCode('');
    } else {
      setVerifyResult({
        success: false,
        message: res.message
      });
    }
  };

  return (
    <div className="w-full min-h-full bg-[#f4f7f4] flex flex-col font-sans pb-10">
      
      {/* 1. Header Kênh Người Bán */}
      <header className="sticky top-0 z-40 bg-[#14532d] text-white p-3 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-2 min-w-0">
          <button
            onClick={onBackToHome}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex-shrink-0"
            title="Về trang mua sắm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-black uppercase text-white">KÊNH NGƯỜI BÁN</span>
              <span className="bg-yellow-400 text-gray-950 text-[8px] font-black px-1 rounded">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-green-200 truncate mt-0.5">
              An Nhiên Beauty Spa • 12 Liễu Giai
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 flex-shrink-0">
          <button
            onClick={onOpenPostDeal}
            className="px-2.5 py-1 bg-yellow-400 hover:bg-yellow-300 text-gray-950 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-xs transition-transform active:scale-95"
            title="Đăng deal mới và tự động gửi Push Notification"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Đăng Deal</span>
          </button>

          {onTriggerPushNoti && (
            <button
              onClick={onTriggerPushNoti}
              className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white"
              title="Bắn Push Notification thử nghiệm"
            >
              <Bell className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
            </button>
          )}
        </div>
      </header>

      {/* 2. Top Horizontal Tab Switcher (Mobile Native - No broken sidebars!) */}
      <div className="bg-white border-b border-gray-200 px-2 py-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none flex-shrink-0">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-noti-500 text-white shadow-2xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Đo Hiệu Quả
        </button>

        <button
          onClick={() => setActiveTab('deals')}
          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
            activeTab === 'deals'
              ? 'bg-noti-500 text-white shadow-2xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Quản Lý Deal ({merchantDeals.length})
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
            activeTab === 'scanner'
              ? 'bg-noti-500 text-white shadow-2xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Quét Thu Ngân
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
            activeTab === 'profile'
              ? 'bg-noti-500 text-white shadow-2xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Hồ Sơ Tiệm
        </button>
      </div>

      {/* 3. Main Content Body */}
      <div className="p-3 space-y-3 flex-1">
        
        {/* TAB 1: ĐO HIỆU QUẢ CHIẾN DỊCH (DEAL IMPACT DASHBOARD) */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900 leading-tight">
                  Báo Cáo Hiệu Quả Chiến Dịch
                </h3>
                <p className="text-[10px] text-gray-500">
                  Số lượng khách hàng từ online đến trải nghiệm thực tế tại quán
                </p>
              </div>
            </div>

            {/* Live Push Notification Banner */}
            <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200 rounded-2xl p-2.5 flex items-start justify-between gap-2 shadow-2xs">
              <div className="flex items-start space-x-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                  <Bell className="w-4 h-4 text-gray-950" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[11px] font-black text-gray-900 leading-tight">
                    Hỗ Trợ Live Push Notification
                  </h5>
                  <p className="text-[10px] text-gray-600 leading-snug mt-0.5">
                    Đăng deal sẽ bắn thông báo đẩy trực tiếp sang màn hình điện thoại khách hàng bên trái!
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenPostDeal}
                className="px-2.5 py-1.5 bg-noti-600 hover:bg-noti-700 text-white rounded-xl font-bold text-[10px] whitespace-nowrap shadow-xs flex-shrink-0"
              >
                + Đăng Ngay
              </button>
            </div>

            {/* 5 Core Impact Metrics (Grid 2-3 Columns for clean mobile display) */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-2xs">
                <span className="text-[9px] font-bold text-gray-400 uppercase block">1. Deal Views</span>
                <span className="text-lg font-black text-blue-600">2,450</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Lượt xem online</span>
              </div>

              <div className="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-2xs">
                <span className="text-[9px] font-bold text-gray-400 uppercase block">2. Saves (Kho Voucher)</span>
                <span className="text-lg font-black text-amber-500">580</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Lưu vào kho cá nhân</span>
              </div>

              <div className="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-2xs">
                <span className="text-[9px] font-bold text-gray-400 uppercase block">3. Claims</span>
                <span className="text-lg font-black text-purple-600">290</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Lượt nhận mã giảm giá</span>
              </div>

              <div className="bg-white p-2.5 rounded-2xl border border-green-200 bg-green-50/50 shadow-2xs">
                <span className="text-[9px] font-bold text-noti-700 uppercase block">4. Redemptions</span>
                <span className="text-lg font-black text-noti-700">142</span>
                <span className="text-[9px] text-noti-600 block mt-0.5">Khách đã đến làm tại tiệm</span>
              </div>

              <div className="col-span-2 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">5. Khách Hàng Mới</span>
                  <span className="text-base font-black text-rose-600">+98 khách mới</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">Tỷ Lệ Chuyển Đổi</span>
                  <span className="text-xs font-black text-noti-700">5.8% (Online-to-Offline)</span>
                </div>
              </div>
            </div>

            {/* Total Revenue Box */}
            <div className="bg-gradient-to-r from-noti-600 to-emerald-700 rounded-2xl p-3.5 text-white shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-green-200 block">
                  Doanh Thu Thực Tế Mang Lại
                </span>
                <span className="text-xl font-black text-white">
                  37.673.000₫
                </span>
                <span className="text-[10px] text-green-100 block mt-0.5">
                  Tính từ 142 lượt khách đã xác nhận tại quán
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-300" />
              </div>
            </div>

            {/* O2O Conversion Funnel */}
            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-2">
              <h4 className="font-black text-xs text-gray-900">
                Phễu Chuyển Đổi Thực Tế (O2O Funnel)
              </h4>

              <div className="space-y-1.5 text-[10px]">
                <div>
                  <div className="flex justify-between font-bold text-gray-600">
                    <span>Lượt xem ưu đãi (Views)</span>
                    <span>2,450 (100%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div className="bg-blue-500 h-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-gray-600">
                    <span>Lưu vào Kho Voucher (Saves)</span>
                    <span>580 (23.6%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div className="bg-amber-500 h-full w-[23.6%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-gray-600">
                    <span>Khách đến làm dịch vụ (Redemptions)</span>
                    <span>142 (5.8%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div className="bg-noti-500 h-full w-[5.8%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUẢN LÝ DỊCH VỤ & ƯU ĐÃI */}
        {activeTab === 'deals' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900">Danh Sách Ưu Đãi Của Tiệm</h3>
                <p className="text-[10px] text-gray-500">Bật/tắt hoặc tạo voucher mới</p>
              </div>

              <button
                onClick={onOpenPostDeal}
                className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-black text-xs rounded-xl shadow-2xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tạo Deal</span>
              </button>
            </div>

            <div className="space-y-2">
              {merchantDeals.map((d) => (
                <div key={d.id} className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-noti-700 bg-green-50 px-1.5 rounded">
                          {d.category}
                        </span>
                        <span className={`text-[8px] font-black px-1.5 rounded ${d.status === 'active' ? 'bg-green-100 text-noti-800' : 'bg-gray-100 text-gray-500'}`}>
                          {d.status === 'active' ? 'ĐANG CHẠY' : 'TẠM DỪNG'}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 mt-1 line-clamp-1">{d.title}</h4>
                      <div className="flex items-baseline space-x-1 mt-0.5">
                        <span className="text-xs font-black text-red-600">{d.salePrice.toLocaleString('vi-VN')}₫</span>
                        <span className="text-[9px] text-gray-400 line-through">{d.originalPrice.toLocaleString('vi-VN')}₫</span>
                        <span className="text-[9px] font-black text-red-600">({d.discount})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleDealStatus(d.id)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        d.status === 'active'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-green-100 text-noti-800 hover:bg-green-200'
                      }`}
                    >
                      {d.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-gray-100 text-[10px] text-gray-500 text-center">
                    <div>
                      <span className="font-bold text-gray-900 block">{d.views}</span>
                      <span>Lượt xem</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">{d.saves}</span>
                      <span>Lưu kho</span>
                    </div>
                    <div>
                      <span className="font-bold text-noti-700 block">{d.redemptions}</span>
                      <span>Đã làm tiệm</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUÉT THU NGÂN TẠI TIỆM (REDEMPTION CHECK-IN) */}
        {activeTab === 'scanner' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-noti-500 text-white flex items-center justify-center">
                  <ScanLine className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-xs text-gray-900">Quét Mã Xác Nhận Thu Ngân</h3>
                  <p className="text-[10px] text-gray-500">Nhập mã voucher từ điện thoại của khách</p>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleVerify} className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                    placeholder="VD: DH-7828 hoặc DH-5058"
                    className="w-full text-center font-mono font-black text-base py-2.5 px-3 rounded-xl border-2 border-dashed border-noti-400 bg-green-50/30 uppercase tracking-widest focus:outline-none focus:border-noti-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-noti-500 hover:bg-noti-600 active:scale-98 text-white font-black text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>XÁC NHẬN MÃ TẠI QUẦY</span>
                </button>
              </form>

              {/* Result Notification */}
              {verifyResult && (
                <div className={`p-3 rounded-xl text-xs ${
                  verifyResult.success 
                    ? 'bg-green-100 border border-green-300 text-green-950' 
                    : 'bg-red-100 border border-red-300 text-red-950'
                }`}>
                  {verifyResult.success ? (
                    <div>
                      <span className="font-bold block text-noti-800">XÁC THỰC THÀNH CÔNG!</span>
                      <p className="font-bold text-xs mt-0.5">{verifyResult.service}</p>
                      <p className="text-[10px] text-gray-600">{verifyResult.discount}</p>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold block text-red-700">KHÔNG THỂ XÁC NHẬN</span>
                      <p className="text-[10px] text-red-800 mt-0.5">{verifyResult.message}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recent Redemptions Log */}
            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-2">
              <h4 className="font-black text-xs text-gray-900">Lịch Sử Quét Gần Đây</h4>
              <div className="space-y-1.5 text-[10px]">
                {recentRedemptions.map((r) => (
                  <div key={r.id} className="p-2 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-mono font-black text-noti-700">{r.code}</span>
                      <p className="font-semibold text-gray-800 truncate max-w-[170px]">{r.service}</p>
                      <span className="text-gray-400 text-[9px]">{r.customer} • {r.time}</span>
                    </div>
                    <span className="font-black text-red-600">{r.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HỒ SƠ TIỆM */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-3 text-xs">
            <h3 className="font-black text-sm text-gray-900">Hồ Sơ Cửa Hàng</h3>

            <div className="space-y-2 text-[11px] text-gray-700">
              <div>
                <span className="text-gray-400 block text-[10px]">Tên cửa hàng</span>
                <span className="font-bold">An Nhiên Beauty & Clinic Spa</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Địa chỉ thực tế</span>
                <span className="font-bold">12 Liễu Giai, Ba Đình, Hà Nội</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Giờ mở cửa</span>
                <span className="font-bold">08:30 - 21:00 hàng ngày</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Hotline đặt hẹn</span>
                <span className="font-bold">0988 123 456</span>
              </div>
            </div>

            <div className="p-2.5 bg-green-50 rounded-xl border border-green-200 text-[10px] text-noti-800 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-noti-600 flex-shrink-0" />
              <span>Gian hàng đã được xác minh y khoa & giấy phép kinh doanh</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

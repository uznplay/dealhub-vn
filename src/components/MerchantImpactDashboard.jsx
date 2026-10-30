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
  Plus,
  Store,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  Calendar,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Star,
  DollarSign
} from 'lucide-react';

export default function MerchantImpactDashboard({ onClose, onOpenPostDeal }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'deals' | 'scanner' | 'profile'
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  // Store's active deals list in the merchant portal
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
      title: 'Triệt Lông Nách & Tay Công Nghệ Diode Laser Âm 5 Độ C',
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

  // Check-in history
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

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;

    const newRecord = {
      id: `ck-${Date.now()}`,
      code: verifyCode.toUpperCase(),
      customer: 'Khách hàng DealHub',
      service: 'Chăm Sóc Da Y Khoa 12 Bước',
      time: 'Vừa xong',
      amount: '189.000₫'
    };

    setVerifyResult({
      success: true,
      code: verifyCode.toUpperCase(),
      service: 'Chăm Sóc Da Y Khoa 12 Bước',
      discount: 'Giảm 62% - Khách thanh toán 189.000₫'
    });

    setRecentRedemptions([newRecord, ...recentRedemptions]);
    setVerifyCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Portal Header */}
        <div className="bg-gray-900 p-4 sm:p-5 text-white flex items-center justify-between flex-shrink-0 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-lg text-white">KÊNH NGƯỜI BÁN DEALHUB</h3>
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Spa & Beauty Partner
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Gian hàng: <b className="text-white">An Nhiên Beauty & Clinic Spa</b> • 12 Liễu Giai, Ba Đình
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (onOpenPostDeal) onOpenPostDeal();
              }}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo Deal Mới</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 overflow-x-auto flex-shrink-0 text-xs font-bold text-gray-300 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-rose-600 text-white shadow'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>1. Đo Hiệu Quả (Deal Impact)</span>
          </button>

          <button
            onClick={() => setActiveTab('deals')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'deals'
                ? 'bg-rose-600 text-white shadow'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Quản Lý Dịch Vụ & Ưu Đãi ({merchantDeals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'scanner'
                ? 'bg-rose-600 text-white shadow'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <ScanLine className="w-4 h-4 text-yellow-400" />
            <span>3. Xác Nhận Thu Ngân Tại Quán</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-rose-600 text-white shadow'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>4. Hồ Sơ Tiệm & Đánh Giá</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: DEAL IMPACT DASHBOARD (5 Core Metrics & Funnel) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top 5 Metrics */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-black text-sm text-gray-900 uppercase tracking-wider">
                    5 Chỉ Số Hiệu Quả Chiến Dịch (Real Impact Metrics)
                  </h4>
                  <span className="text-xs text-gray-500">Cập nhật 5 phút trước</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block">1. Deal Views</span>
                    <p className="text-2xl font-black text-blue-900 mt-1">2,450</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Lượt xem online</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">2. Saves (Passport)</span>
                    <p className="text-2xl font-black text-amber-900 mt-1">580</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Lưu vào ví cá nhân</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                    <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider block">3. Claims</span>
                    <p className="text-2xl font-black text-purple-900 mt-1">290</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Lượt nhận mã giảm giá</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">4. Redemptions</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">142</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-0.5">Khách đã đến làm tại tiệm</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">5. New Customers</span>
                    <p className="text-2xl font-black text-rose-900 mt-1">+98</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Khách mới lần đầu đến</p>
                  </div>
                </div>
              </div>

              {/* Conversion Funnel & Revenue Box */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7 bg-gray-50 p-5 rounded-3xl border border-gray-200">
                  <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-rose-600" />
                    <span>Phễu Chuyển Đổi Thực Tế (Online-To-Offline Conversion)</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-gray-700 mb-1">
                        <span>Lượt xem ưu đãi (Views)</span>
                        <b>2,450 lượt (100%)</b>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-gray-700 mb-1">
                        <span>Lưu vào Deal Passport (Saves)</span>
                        <b>580 lượt (23.6%)</b>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '23.6%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-gray-700 mb-1">
                        <span>Nhận mã ưu đãi (Claims)</span>
                        <b>290 lượt (11.8%)</b>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '11.8%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-emerald-800 mb-1">
                        <span>Khách đến làm dịch vụ tại tiệm (Redemptions)</span>
                        <b className="text-emerald-600">142 khách (5.8% O2O rate)</b>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '14.2%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Card */}
                <div className="lg:col-span-5 bg-gradient-to-br from-rose-500 to-pink-600 p-5 rounded-3xl text-white shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-rose-100 tracking-wider block">
                      Tổng Doanh Thu Thực Tế Mang Lại
                    </span>
                    <h3 className="text-3xl font-black mt-2">37.673.000₫</h3>
                    <p className="text-xs text-rose-100 mt-1">
                      Tính từ 142 lượt khách đã xác nhận tại quầy thu ngân trong tháng này.
                    </p>
                  </div>

                  <div className="bg-white/15 backdrop-blur-sm p-3.5 rounded-2xl border border-white/20 mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-rose-100">Chi phí chiến dịch:</span>
                      <b>199.000₫ (Gói Pro)</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-rose-100">Tỷ lệ ROAS:</span>
                      <b className="text-yellow-300 text-sm">189x Lần</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUẢN LÝ DỊCH VỤ & ƯU ĐÃI (Deals Management) */}
          {activeTab === 'deals' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-black text-sm text-gray-900">Danh Sách Dịch Vụ Đang Áp Dụng Khuyến Mãi</h4>
                  <p className="text-xs text-gray-500">Bật/tắt hoặc chỉnh sửa giá dịch vụ của tiệm bạn trên DealHub</p>
                </div>
                <button
                  onClick={() => {
                    if (onOpenPostDeal) onOpenPostDeal();
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Dịch Vụ Mới</span>
                </button>
              </div>

              <div className="space-y-3">
                {merchantDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md">
                          {deal.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          deal.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {deal.status === 'active' ? 'Đang hiển thị' : 'Đang tạm dừng'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900">{deal.title}</h4>
                      <div className="flex items-baseline space-x-2 text-xs">
                        <span className="text-red-600 font-black">{deal.salePrice.toLocaleString('vi-VN')}₫</span>
                        <span className="text-gray-400 line-through">{deal.originalPrice.toLocaleString('vi-VN')}₫</span>
                        <span className="text-rose-600 font-bold">{deal.discount}</span>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-4 text-xs border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right hidden md:block">
                        <span className="text-gray-400 text-[10px] block">Doanh thu mang lại</span>
                        <span className="font-bold text-gray-900">{deal.revenue}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-gray-400 text-[10px] block">Khách đến quán</span>
                        <span className="font-bold text-emerald-600">{deal.redemptions} lượt</span>
                      </div>

                      <button
                        onClick={() => toggleDealStatus(deal.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                          deal.status === 'active'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        }`}
                      >
                        {deal.status === 'active' ? 'Tạm Dừng' : 'Kích Hoạt'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: XÁC THỰC THU NGÂN TẠI QUÁN (Cashier Scanner Tool) */}
          {activeTab === 'scanner' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Cashier input tool */}
              <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                    <ScanLine className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Thu Ngân Xác Nhận Mã Khách Hàng</h4>
                    <p className="text-xs text-gray-500">Khách xuất trình mã từ Deal Passport</p>
                  </div>
                </div>

                <form onSubmit={handleVerify} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nhập mã ưu đãi của khách hàng:
                    </label>
                    <input
                      type="text"
                      required
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      placeholder="Ví dụ: DH-7828 hoặc DH-5058"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-base font-mono font-bold uppercase focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác Nhận Giảm Giá Cho Khách</span>
                  </button>
                </form>

                {verifyResult && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 animate-fadeIn space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Mã {verifyResult.code} Hợp Lệ!
                    </div>
                    <p className="text-gray-700 font-medium">Dịch vụ: <b>{verifyResult.service}</b></p>
                    <p className="text-emerald-700 font-bold">{verifyResult.discount}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Đã cộng +1 lượt Redemption vào báo cáo doanh thu.</p>
                  </div>
                )}
              </div>

              {/* Recent check-in history */}
              <div className="lg:col-span-6 bg-gray-50 p-5 rounded-3xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider">
                    Lịch Sử Khách Vừa Sử Dụng Tại Tiệm
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-bold">● Trực tiếp</span>
                </div>

                <div className="space-y-2.5">
                  {recentRedemptions.map((item) => (
                    <div key={item.id} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[10px]">
                            {item.code}
                          </span>
                          <span className="font-bold text-gray-800">{item.customer}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{item.service}</p>
                      </div>

                      <div className="text-right">
                        <span className="font-black text-gray-900 block">{item.amount}</span>
                        <span className="text-[10px] text-gray-400">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HỒ SƠ TIỆM & ĐÁNH GIÁ (Store Profile) */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <div className="p-5 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border border-rose-100 overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=200&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-black text-base text-gray-900">An Nhiên Beauty & Clinic Spa</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      12 Liễu Giai, Ba Đình, Hà Nội
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 5.0 (128 Đánh giá)
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-emerald-600 font-semibold">Giờ mở cửa: 08:30 - 21:00</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-gray-500 block">Hotline đặt lịch</span>
                  <b className="text-base font-black text-rose-600">0987 654 321</b>
                </div>
              </div>

              {/* Customer Reviews List */}
              <div>
                <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-3">
                  Đánh Giá Từ Khách Hàng Săn Deal Mới Nhất
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 bg-white rounded-2xl border border-gray-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Nguyễn Hải Yến (Đã dùng gói Chăm Sóc Da Y Khoa)</span>
                      <div className="flex text-amber-400 text-xs">★★★★★</div>
                    </div>
                    <p className="text-gray-600">
                      "Spa làm cực kỳ có tâm, nhân viên lấy nhân mụn rất nhẹ nhàng không bị sưng đỏ. Mình đặt qua DealHub được giảm hơn 60% mà chất lượng dịch vụ vẫn nguyên vẹn 100%!"
                    </p>
                    <span className="text-[10px] text-gray-400 block">Đánh giá ngày 28/10/2026</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-gray-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Trần Phương Linh (Gói Gội Đầu Dưỡng Sinh)</span>
                      <div className="flex text-amber-400 text-xs">★★★★★</div>
                    </div>
                    <p className="text-gray-600">
                      "Nước gội thảo dược thơm dễ chịu, bài massage bấm huyệt cổ vai gáy làm xong nhẹ cả đầu. Chắc chắn sẽ tiếp tục ủng hộ tiệm."
                    </p>
                    <span className="text-[10px] text-gray-400 block">Đánh giá ngày 26/10/2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-shrink-0 text-xs">
          <span className="text-gray-500">
            Hỗ trợ đối tác Merchant: <b>hotro-doitac@dealhub.vn</b>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors shadow"
          >
            Quay Lại Trang Khách Hàng
          </button>
        </div>
      </div>
    </div>
  );
}

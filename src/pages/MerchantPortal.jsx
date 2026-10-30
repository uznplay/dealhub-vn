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
  DollarSign
} from 'lucide-react';

export default function MerchantPortal({ onBackToHome, onOpenPostDeal }) {
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
    <div className="min-h-screen bg-[#f4f7f4] flex flex-col font-sans">
      
      {/* 1. Merchant Dedicated Top Header */}
      <header className="sticky top-0 z-50 bg-[#14532d] text-white shadow-md border-b border-green-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Brand & Store Selector */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Quay lại trang mua sắm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Về Trang Chủ</span>
            </button>

            <div className="h-6 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-noti-500 p-1 flex items-center justify-center shadow">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-base font-black text-white">KÊNH NGƯỜI BÁN</span>
                  <span className="bg-yellow-400 text-gray-950 text-[10px] font-black px-1.5 py-0.2 rounded uppercase">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-green-200 mt-0.5 truncate max-w-[200px] sm:max-w-none">
                  An Nhiên Beauty & Clinic Spa • 12 Liễu Giai, Ba Đình
                </p>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => {
                if (onOpenPostDeal) onOpenPostDeal();
              }}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-gray-950 font-black px-3.5 py-2 rounded-xl text-xs shadow transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">TẠO ƯU ĐÃI MỚI</span>
              <span className="sm:hidden">TẠO DEAL</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-3 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold text-white transition-colors"
            >
              Xem Trang Khách
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Portal Body with Left Navigation & Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-2">
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-200 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'overview'
                  ? 'bg-noti-500 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>1. Đo Hiệu Quả (Deal Impact)</span>
            </button>

            <button
              onClick={() => setActiveTab('deals')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'deals'
                  ? 'bg-noti-500 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. Quản Lý Dịch Vụ ({merchantDeals.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'scanner'
                  ? 'bg-noti-500 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ScanLine className="w-4 h-4" />
              <span>3. Quét Thu Ngân Tại Tiệm</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'profile'
                  ? 'bg-noti-500 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>4. Hồ Sơ Tiệm & Đánh Giá</span>
            </button>
          </div>

          {/* Store Quick Summary Card */}
          <div className="bg-gradient-to-br from-green-900 to-noti-700 text-white p-4 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-200">Gói dịch vụ</span>
              <span className="bg-yellow-400 text-gray-950 font-black px-2 py-0.5 rounded text-[10px]">Merchant Pro</span>
            </div>
            <p className="text-xl font-black text-white">37.673.000₫</p>
            <p className="text-[11px] text-green-100">Doanh thu O2O ghi nhận tháng này</p>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-200 min-h-[500px]">

          {/* TAB 1: DEAL IMPACT DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    Báo Cáo Hiệu Quả Chiến Dịch (Deal Impact Dashboard)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Đo lường số lượng khách hàng từ kênh online đến trải nghiệm trực tiếp tại tiệm Spa / Shop
                  </p>
                </div>
                <span className="text-xs font-semibold text-noti-600 bg-noti-50 px-2.5 py-1 rounded-lg border border-noti-200 self-start sm:self-auto">
                  Dữ liệu thời gian thực
                </span>
              </div>

              {/* 5 Core Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block">1. Deal Views</span>
                  <p className="text-2xl font-black text-blue-900 mt-1">2,450</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Lượt xem ưu đãi</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">2. Saves (Passport)</span>
                  <p className="text-2xl font-black text-amber-900 mt-1">580</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Lưu vào ví cá nhân</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider block">3. Claims</span>
                  <p className="text-2xl font-black text-purple-900 mt-1">290</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Lượt lấy mã ưu đãi</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">4. Redemptions</span>
                  <p className="text-2xl font-black text-emerald-600 mt-1">142</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-0.5">Khách đã dùng tại tiệm</p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">5. New Guests</span>
                  <p className="text-2xl font-black text-rose-900 mt-1">+98</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Khách hàng mới</p>
                </div>
              </div>

              {/* Conversion Funnel */}
              <div className="bg-gray-50 p-5 rounded-3xl border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-noti-600" />
                    <span>Phễu Chuyển Đổi Thực Tế (Online-To-Offline Conversion)</span>
                  </h4>
                  <span className="text-xs font-bold text-noti-700">Tỷ lệ về tiệm: 5.8%</span>
                </div>

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
            </div>
          )}

          {/* TAB 2: QUẢN LÝ DỊCH VỤ & ƯU ĐÃI */}
          {activeTab === 'deals' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-black text-gray-900">Danh Sách Ưu Đãi Đang Chạy Của Tiệm</h3>
                  <p className="text-xs text-gray-500">Bật/tắt hoặc chỉnh sửa giá các gói dịch vụ làm đẹp & thời trang</p>
                </div>
                <button
                  onClick={() => {
                    if (onOpenPostDeal) onOpenPostDeal();
                  }}
                  className="px-4 py-2 bg-noti-500 hover:bg-noti-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Dịch Vụ Mới</span>
                </button>
              </div>

              <div className="space-y-3">
                {merchantDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-noti-300 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-green-50 text-noti-700 px-2 py-0.5 rounded-md">
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
                        <span className="text-noti-600 font-bold">{deal.discount}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-gray-400 text-[10px] block">Doanh thu tiệm</span>
                        <span className="font-bold text-gray-900">{deal.revenue}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-gray-400 text-[10px] block">Khách đến làm</span>
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

          {/* TAB 3: THU NGÂN QUÉT MÃ TẠI TIỆM */}
          {activeTab === 'scanner' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-gray-100">
                <h3 className="text-lg font-black text-gray-900">Xác Nhận Ưu Đãi Tại Quầy Thu Ngân</h3>
                <p className="text-xs text-gray-500">Khách hàng xuất trình mã QR từ Deal Passport khi thanh toán</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 bg-gray-50 p-5 rounded-3xl border border-gray-200 space-y-4">
                  <div className="flex items-center space-x-2 text-gray-900 font-black text-sm">
                    <ScanLine className="w-5 h-5 text-noti-600" />
                    <span>Nhập Mã Xác Nhận Khách Hàng</span>
                  </div>

                  <form onSubmit={handleVerify} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                        placeholder="Ví dụ: DH-7828 hoặc DH-5058"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-300 text-lg font-mono font-black uppercase focus:outline-none focus:border-noti-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-noti-500 hover:bg-noti-600 text-white rounded-2xl font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
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
                      <p className="text-gray-700">Dịch vụ: <b>{verifyResult.service}</b></p>
                      <p className="text-emerald-700 font-bold">{verifyResult.discount}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Đã cộng +1 lượt Redemption vào báo cáo doanh thu.</p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider">
                    Khách Hàng Vừa Check-in Gần Nhất
                  </h4>

                  <div className="space-y-2.5">
                    {recentRedemptions.map((item) => (
                      <div key={item.id} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-noti-700 bg-green-50 px-1.5 py-0.5 rounded text-[10px]">
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
            </div>
          )}

          {/* TAB 4: HỒ SƠ TIỆM & ĐÁNH GIÁ */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border border-green-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border border-gray-100 overflow-hidden flex-shrink-0">
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
                      <MapPin className="w-3.5 h-3.5 text-noti-500" />
                      12 Liễu Giai, Ba Đình, Hà Nội
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 5.0 (128 Đánh giá)
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-emerald-700 font-semibold">Giờ mở cửa: 08:30 - 21:00</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-gray-500 block">Hotline đặt lịch</span>
                  <b className="text-base font-black text-noti-600">0987 654 321</b>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-3">
                  Đánh Giá Từ Khách Hàng Săn Deal Mới Nhất
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 bg-white rounded-2xl border border-gray-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Nguyễn Hải Yến (Gói Chăm Sóc Da Y Khoa)</span>
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

        </main>
      </div>

    </div>
  );
}

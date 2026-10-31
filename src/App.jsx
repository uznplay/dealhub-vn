import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SmartDealFinder from './components/SmartDealFinder';
import ZenlyDealMap from './components/ZenlyDealMap';
import CategoryGrid from './components/CategoryGrid';
import FlashSaleSection from './components/FlashSaleSection';
import ClassifiedDealsSection from './components/ClassifiedDealsSection';
import DealFeed from './components/DealFeed';
import DealDetailModal from './components/DealDetailModal';
import PostDealModal from './components/PostDealModal';
import DealPassportModal from './components/DealPassportModal';
import DealMissionModal from './components/DealMissionModal';
import PhoneLockScreen from './components/PhoneLockScreen';
import InAppPushBanner from './components/InAppPushBanner';
import MerchantPortal from './pages/MerchantPortal';
import Footer from './components/Footer';
import { 
  fetchDealsFromBackend, 
  fetchVouchersBackend, 
  saveVoucherBackend, 
  removeVoucherBackend,
  createNewDealBackend
} from './lib/supabase';
import { 
  Home, 
  Map, 
  Ticket, 
  Flame, 
  CheckCircle2,
  Smartphone,
  Store,
  Bell,
  Sparkles,
  Layers,
  Send
} from 'lucide-react';

// Chime sound generator for Web Audio API
function playNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}

export default function App() {
  // Dual Screen Display Mode: 'both' | 'consumer' | 'merchant'
  const [deviceViewMode, setDeviceViewMode] = useState('both');

  // Consumer Phone Inner Tabs: 'home' (Khám phá) | 'map' (Bản đồ) | 'feed' (Bảng tin)
  const [userTab, setUserTab] = useState('home');

  const [deals, setDeals] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Toàn quốc');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Consumer Phone Lock Screen (Chỉ khóa khi tải/reload trang)
  const [isCustomerLocked, setIsCustomerLocked] = useState(true);

  // Live Push Notification system
  const [liveNotifications, setLiveNotifications] = useState([]);
  const [activeInAppNotif, setActiveInAppNotif] = useState(null);

  // Modals state
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showPostDealModal, setShowPostDealModal] = useState(false);
  const [showKhoVoucherModal, setShowKhoVoucherModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [missionModalInitialTab, setMissionModalInitialTab] = useState('missions');

  // User Reward Points state (Tích điểm & Đổi voucher)
  const [userPoints, setUserPoints] = useState(() => {
    const saved = localStorage.getItem('dealhub_user_points');
    return saved !== null ? parseInt(saved, 10) : 150;
  });

  const handleUpdatePoints = (newPoints) => {
    setUserPoints(newPoints);
    localStorage.setItem('dealhub_user_points', newPoints.toString());
  };

  const handleOpenMissions = (tab = 'missions') => {
    setMissionModalInitialTab(tab);
    setShowMissionModal(true);
  };

  // Kho Voucher Saved Deals state
  const [savedDeals, setSavedDeals] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initialize from backend (Supabase / Local persistence)
  useEffect(() => {
    fetchDealsFromBackend().then(d => setDeals(d || []));
    fetchVouchersBackend().then(v => setSavedDeals(v || []));
  }, []);

  const handleSaveDeal = async (dealToSave) => {
    const res = await saveVoucherBackend(dealToSave);
    if (!res.success) {
      showToast(res.message);
      return;
    }
    setSavedDeals(res.allVouchers);
    showToast('Đã lưu ưu đãi vào Kho Voucher của bạn!');
  };

  const handleRemoveSavedDeal = async (voucherId) => {
    const updated = await removeVoucherBackend(voucherId);
    setSavedDeals(updated);
    showToast('Đã xóa voucher khỏi Kho Voucher.');
  };

  const handleMarkUsed = (dealId) => {
    setSavedDeals(savedDeals.map(d => d.id === dealId ? { ...d, isUsed: true } : d));
    showToast('Đã đánh dấu voucher đã sử dụng!');
  };

  // Khi Người Bán tạo deal mới -> Tự động kích hoạt Push Notification sang điện thoại Khách Hàng
  const handleAddDeal = async (newDeal) => {
    const updated = await createNewDealBackend(newDeal);
    setDeals(updated);
    setShowPostDealModal(false);

    // Kích hoạt Push Notification
    const notif = {
      id: `push-${Date.now()}`,
      title: `🔥 ${newDeal.storeName} vừa đăng deal mới!`,
      body: `${newDeal.title} - Giảm ${newDeal.discount}! Chạm để xem và lưu ngay.`,
      deal: newDeal,
      time: 'Vừa xong'
    };

    setLiveNotifications(prev => [notif, ...prev]);
    setActiveInAppNotif(notif);
    playNotificationChime();
    showToast('Đã đăng ưu đãi & Bắn Push Notification sang máy khách hàng!');
  };

  // Nút bắn Push Notification thử nghiệm
  const handleTriggerDemoPush = () => {
    const sampleDeal = deals[0] || {
      id: 'demo-deal',
      title: 'Chăm Sóc Da Y Khoa Chuyên Sâu 12 Bước',
      storeName: 'An Nhiên Beauty & Clinic Spa',
      discount: '-62%',
      salePrice: 189000,
      originalPrice: 500000,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
      address: '12 Liễu Giai, Ba Đình, Hà Nội'
    };

    const notif = {
      id: `push-${Date.now()}`,
      title: `⚡ Deal chớp nhoáng từ ${sampleDeal.storeName}!`,
      body: `${sampleDeal.title} giảm ${sampleDeal.discount}. Số lượng có hạn!`,
      deal: sampleDeal,
      time: 'Vừa xong'
    };

    setLiveNotifications(prev => [notif, ...prev]);
    setActiveInAppNotif(notif);
    playNotificationChime();
    showToast('Đã bắn Push Notification tới điện thoại khách hàng!');
  };

  return (
    <div className="min-h-screen w-screen bg-slate-950 flex flex-col items-center justify-start lg:justify-center p-2 sm:p-5 overflow-x-hidden overflow-y-auto select-none font-sans">
      
      {/* TOP CONTROL BAR: Brand & Dual Screen Mode Switcher */}
      <header className="w-full max-w-5xl mb-3 flex flex-wrap items-center justify-between gap-2.5 px-3 py-2 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 text-white shadow-xl flex-shrink-0 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-noti-500 p-1 flex items-center justify-center shadow-xs">
            <img src="/logo.svg" alt="DealHub" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-black tracking-tight text-white">
                DEAL<span className="text-yellow-400">HUB</span>
              </span>
              <span className="text-[10px] font-black bg-noti-600 text-white px-2 py-0.5 rounded-full border border-noti-400">
                MÔ PHỎNG SONG HÀNH O2O
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Push Test button */}
          <button
            onClick={handleTriggerDemoPush}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-gray-950 rounded-xl text-xs font-black transition-all shadow-xs"
            title="Bắn thông báo thử nghiệm từ Người bán sang Khách hàng"
          >
            <Send className="w-3.5 h-3.5 text-gray-950" />
            <span className="text-[11px]">Bắn Push Noti Test</span>
          </button>

          {/* Mode Switcher on mobile/tablet */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center space-x-1 text-[11px] font-bold border border-slate-700">
            <button
              onClick={() => setDeviceViewMode('both')}
              className={`px-2.5 py-1 rounded-lg transition-all hidden lg:block ${
                deviceViewMode === 'both' ? 'bg-noti-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              2 Điện Thoại
            </button>
            <button
              onClick={() => setDeviceViewMode('consumer')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                deviceViewMode === 'consumer' ? 'bg-noti-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              📱 Khách Hàng
            </button>
            <button
              onClick={() => setDeviceViewMode('merchant')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                deviceViewMode === 'merchant' ? 'bg-noti-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏪 Người Bán
            </button>
          </div>
        </div>
      </header>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 z-[9999999] bg-gray-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center space-x-2.5 text-xs font-bold border-2 border-noti-400 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-noti-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          DUAL SMARTPHONE CONTAINER (2 KHUNG ĐIỆN THOẠI SONG SONG - CÁCH NHAU RỘNG RÃI)
          ======================================================== */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-20 xl:gap-28 w-full max-w-7xl py-4">
        
        {/* ===================================================
            PHONE 1: ĐIỆN THOẠI NGƯỜI DÙNG BÌNH THƯỜNG (CONSUMER)
            =================================================== */}
        {(deviceViewMode === 'both' || deviceViewMode === 'consumer') && (
          <div className="flex flex-col items-center">
            {/* Smartphone Device Frame 1 */}
            <div className="w-[390px] h-[810px] bg-[#f8faf8] shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative flex flex-col overflow-hidden rounded-[42px] border-[8px] border-slate-800">
              
              {/* Dynamic Island / Notch */}
              <div className="flex justify-between items-center px-6 pt-2 pb-1 text-xs font-bold bg-noti-700 text-white flex-shrink-0 select-none z-40">
                <span>9:41</span>
                <div className="w-20 h-4 bg-slate-900 rounded-full" />
                <div className="flex items-center space-x-1 text-[10px]">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-white/60 rounded-2xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-white rounded-3xs" />
                  </div>
                </div>
              </div>

              {/* LOCK SCREEN OVERLAY ON CONSUMER PHONE (Chỉ khóa khi reload lại trang) */}
              {isCustomerLocked && (
                <PhoneLockScreen 
                  onUnlock={() => setIsCustomerLocked(false)}
                  liveNotifications={liveNotifications}
                  onNotificationClick={(notif) => {
                    setIsCustomerLocked(false);
                    if (notif.deal) setSelectedDeal(notif.deal);
                  }}
                />
              )}

              {/* IN-APP PUSH NOTIFICATION BANNER (Khi màn hình đã mở khóa) */}
              {!isCustomerLocked && activeInAppNotif && (
                <InAppPushBanner
                  notification={activeInAppNotif}
                  onClose={() => setActiveInAppNotif(null)}
                  onSelectDeal={(deal) => {
                    setSelectedDeal(deal);
                    setActiveInAppNotif(null);
                  }}
                />
              )}

              {/* CONSUMER APP CONTENT */}
              <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header Navbar */}
                <div className="flex-shrink-0 z-30">
                  <Navbar
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onOpenPassport={() => setShowKhoVoucherModal(true)}
                    onOpenMissions={handleOpenMissions}
                    onOpenMerchantDashboard={() => setDeviceViewMode('merchant')}
                    savedDealsCount={savedDeals.filter(d => !d.isUsed).length}
                    userPoints={userPoints}
                  />

                  {/* Sub-nav Tab Bar (Săn Deal • Bản Đồ • Bảng Tin) */}
                  <div className="bg-white border-b border-gray-100 shadow-2xs">
                    <div className="grid grid-cols-3 p-1 text-center font-bold text-xs">
                      <button
                        onClick={() => setUserTab('home')}
                        className={`py-1.5 rounded-xl transition-all ${
                          userTab === 'home'
                            ? 'bg-noti-500 text-white shadow-2xs'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Săn Deal
                      </button>
                      <button
                        onClick={() => setUserTab('map')}
                        className={`py-1.5 rounded-xl transition-all ${
                          userTab === 'map'
                            ? 'bg-noti-500 text-white shadow-2xs'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Bản Đồ Deal
                      </button>
                      <button
                        onClick={() => setUserTab('feed')}
                        className={`py-1.5 rounded-xl transition-all relative ${
                          userTab === 'feed'
                            ? 'bg-noti-500 text-white shadow-2xs'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Bảng Tin
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-1 right-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scrollable Consumer Body */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  {userTab === 'home' && (
                    <main className="space-y-4 pb-4">
                      <HeroBanner 
                        onViewFeed={() => setUserTab('feed')}
                        onViewMap={() => setUserTab('map')}
                      />
                      <SmartDealFinder
                        allDeals={deals}
                        onSelectDeal={(deal) => setSelectedDeal(deal)}
                        onSaveDeal={handleSaveDeal}
                      />
                      <CategoryGrid
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                      />
                      <FlashSaleSection
                        onSelectDeal={(deal) => setSelectedDeal(deal)}
                      />
                      <ClassifiedDealsSection
                        deals={deals}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        activeCategory={activeCategory}
                        searchQuery={searchQuery}
                        onSelectDeal={(deal) => setSelectedDeal(deal)}
                        onSaveDeal={handleSaveDeal}
                        savedDealIds={savedDeals.map(d => d.dealId || d.id)}
                      />
                      <Footer />
                    </main>
                  )}

                  {userTab === 'map' && (
                    <main className="pb-4">
                      <ZenlyDealMap
                        selectedCity={selectedCity}
                        onSelectDeal={(deal) => setSelectedDeal(deal)}
                        onSaveDeal={handleSaveDeal}
                      />
                      <Footer />
                    </main>
                  )}

                  {userTab === 'feed' && (
                    <main className="pb-4">
                      <DealFeed 
                        onSaveDeal={handleSaveDeal}
                        onSelectDeal={(deal) => setSelectedDeal(deal)}
                        savedDealIds={savedDeals.map(d => d.dealId || d.id)}
                      />
                      <Footer />
                    </main>
                  )}
                </div>

                {/* Fixed Bottom Navigation Bar */}
                <nav className="flex-shrink-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-3 flex items-center justify-around z-30 shadow-lg">
                  <button 
                    onClick={() => setUserTab('home')}
                    className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
                      userTab === 'home' ? 'text-noti-600' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Home className="w-5 h-5 mb-0.5" />
                    <span>Khám phá</span>
                  </button>

                  <button 
                    onClick={() => setUserTab('map')}
                    className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
                      userTab === 'map' ? 'text-noti-600' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Map className="w-5 h-5 mb-0.5" />
                    <span>Bản đồ</span>
                  </button>

                  <button 
                    onClick={() => setUserTab('feed')}
                    className={`flex flex-col items-center text-[10px] font-bold transition-colors relative ${
                      userTab === 'feed' ? 'text-noti-600' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Flame className="w-5 h-5 mb-0.5 text-amber-500" />
                    <span>Bảng tin</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-0 right-2" />
                  </button>

                  <button
                    onClick={() => setShowKhoVoucherModal(true)}
                    className="flex flex-col items-center text-[10px] font-bold text-gray-500 hover:text-noti-600 relative"
                  >
                    <Ticket className="w-5 h-5 mb-0.5 text-yellow-600" />
                    <span>Kho voucher</span>
                    {savedDeals.filter(d => !d.isUsed).length > 0 && (
                      <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[8px] font-black flex items-center justify-center">
                        {savedDeals.filter(d => !d.isUsed).length}
                      </span>
                    )}
                  </button>
                </nav>

                {/* Modals for Consumer */}
                {showKhoVoucherModal && (
                  <DealPassportModal
                    savedDeals={savedDeals}
                    userPoints={userPoints}
                    onOpenRewards={() => handleOpenMissions('rewards')}
                    onRemoveDeal={handleRemoveSavedDeal}
                    onMarkUsed={handleMarkUsed}
                    onClose={() => setShowKhoVoucherModal(false)}
                  />
                )}

                {showMissionModal && (
                  <DealMissionModal
                    initialTab={missionModalInitialTab}
                    userPoints={userPoints}
                    onUpdatePoints={handleUpdatePoints}
                    onSaveDeal={handleSaveDeal}
                    onClose={() => setShowMissionModal(false)}
                    onOpenPassport={() => setShowKhoVoucherModal(true)}
                    showToast={showToast}
                  />
                )}

                {selectedDeal && (
                  <DealDetailModal
                    deal={selectedDeal}
                    isSaved={savedDeals.some(d => d.dealId === selectedDeal.id || d.id === selectedDeal.id)}
                    onSaveDeal={handleSaveDeal}
                    onViewOnMap={() => setUserTab('map')}
                    onClose={() => setSelectedDeal(null)}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            PHONE 2: ĐIỆN THOẠI CHỦ TIỆM / NGƯỜI BÁN (MERCHANT)
            =================================================== */}
        {(deviceViewMode === 'both' || deviceViewMode === 'merchant') && (
          <div className="flex flex-col items-center">
            {/* Smartphone Device Frame 2 */}
            <div className="w-[390px] h-[810px] bg-[#f8faf8] shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative flex flex-col overflow-hidden rounded-[42px] border-[8px] border-slate-800">
              
              {/* Dynamic Island / Notch */}
              <div className="flex justify-between items-center px-6 pt-2 pb-1 text-xs font-bold bg-noti-800 text-white flex-shrink-0 select-none z-40">
                <span>9:41</span>
                <div className="w-20 h-4 bg-slate-900 rounded-full" />
                <div className="flex items-center space-x-1 text-[10px]">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-white/60 rounded-2xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-white rounded-3xs" />
                  </div>
                </div>
              </div>

              {/* Merchant Portal Content */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                <MerchantPortal
                  onBackToHome={() => setDeviceViewMode('consumer')}
                  onOpenPostDeal={() => setShowPostDealModal(true)}
                  onTriggerPushNoti={handleTriggerDemoPush}
                />
              </div>

              {/* Post Deal Modal on Merchant Phone */}
              {showPostDealModal && (
                <PostDealModal
                  onClose={() => setShowPostDealModal(false)}
                  onAddDeal={handleAddDeal}
                />
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

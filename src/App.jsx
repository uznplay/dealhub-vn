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
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Navigation View: 'home' | 'merchant'
  const [currentView, setCurrentView] = useState(() => {
    return window.location.pathname === '/merchant' ? 'merchant' : 'home';
  });

  // User Inner Tabs: 'home' (Khám phá) | 'map' (Bản đồ) | 'feed' (Bảng tin)
  const [userTab, setUserTab] = useState('home');

  const [deals, setDeals] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Toàn quốc');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Smartphone Lock Screen state (chỉ khóa khi tải trang / reload trang)
  const [isDeviceLocked, setIsDeviceLocked] = useState(true);

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
    setTimeout(() => setToastMessage(null), 3000);
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

  const handleAddDeal = async (newDeal) => {
    const updated = await createNewDealBackend(newDeal);
    setDeals(updated);
    setShowPostDealModal(false);
    showToast('Tạo ưu đãi mới thành công!');
  };

  // Sync with browser URL
  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'merchant') {
      window.history.pushState({}, '', '/merchant');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/merchant') {
        setCurrentView('merchant');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    // Outer Desktop Container: Fits the screen cleanly without outer scrollbar
    <div className="h-screen w-screen bg-slate-950 flex items-center justify-center sm:p-4 overflow-hidden select-none">
      
      {/* Smartphone Device Frame (Fixed Height on Desktop so it never stretches out) */}
      <div className="w-full max-w-[412px] h-full sm:h-[844px] bg-[#f8faf8] shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden sm:rounded-[44px] sm:border-[8px] sm:border-slate-800">
        
        {/* Smartphone Lock Screen (Nền xanh DealHub, chạm để mở khóa, chỉ khóa khi reload trang) */}
        {isDeviceLocked && (
          <PhoneLockScreen onUnlock={() => setIsDeviceLocked(false)} />
        )}

        {/* Dynamic Island / Mobile Phone Top Notch on Desktop */}
        <div className="hidden sm:flex justify-between items-center px-6 pt-2.5 pb-1 text-xs font-bold bg-noti-700 text-white flex-shrink-0 select-none">
          <span>9:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full" />
          <div className="flex items-center space-x-1 text-[10px]">
            <span>5G</span>
            <div className="w-4 h-2 border border-white/60 rounded-2xs p-0.5 flex items-center">
              <div className="w-full h-full bg-white rounded-3xs" />
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-12 inset-x-3 z-[999999] bg-gray-900 text-white px-3.5 py-2 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-bold border border-noti-400 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-noti-400 flex-shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* 1. MERCHANT PORTAL VIEW (Giao diện Kênh Người Bán) */}
        {currentView === 'merchant' ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            <MerchantPortal
              onBackToHome={() => navigateTo('home')}
              onOpenPostDeal={() => setShowPostDealModal(true)}
            />

            {showPostDealModal && (
              <PostDealModal
                onClose={() => setShowPostDealModal(false)}
                onAddDeal={handleAddDeal}
              />
            )}
          </div>
        ) : (
          /* 2. CONSUMER SHOPPING VIEW (Trang Người Dùng - Đúng Kích Thước Mobile) */
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* Top Fixed Header */}
            <div className="flex-shrink-0 z-30">
              <Navbar
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenPassport={() => setShowKhoVoucherModal(true)}
                onOpenMissions={handleOpenMissions}
                onOpenMerchantDashboard={() => navigateTo('merchant')}
                savedDealsCount={savedDeals.filter(d => !d.isUsed).length}
                userPoints={userPoints}
              />

              {/* Sub-nav App Bar (Khám Phá • Bản Đồ • Bảng Tin) */}
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

            {/* SCROLLABLE MAIN BODY INSIDE THE PHONE */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              
              {/* TAB 1: KHÁM PHÁ (HOME) */}
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

              {/* TAB 2: BẢN ĐỒ DEAL (MAP) */}
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

              {/* TAB 3: BẢNG TIN SĂN DEAL (FEED) */}
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

            {/* FIXED BOTTOM NAVIGATION BAR (LUÔN NẰM CỐ ĐỊNH Ở ĐÁY ĐIỆN THOẠI) */}
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

            {/* Kho Voucher Modal */}
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

            {/* Deal Mission & Reward Store Modal */}
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

            {/* Deal Detail Modal */}
            {selectedDeal && (
              <DealDetailModal
                deal={selectedDeal}
                isSaved={savedDeals.some(d => d.dealId === selectedDeal.id || d.id === selectedDeal.id)}
                onSaveDeal={handleSaveDeal}
                onViewOnMap={(d) => {
                  setUserTab('map');
                }}
                onClose={() => setSelectedDeal(null)}
              />
            )}

          </div>
        )}

      </div>
    </div>
  );
}

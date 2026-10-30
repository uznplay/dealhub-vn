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
import MerchantPortal from './pages/MerchantPortal';
import Footer from './components/Footer';
import { ALL_DEALS } from './data/mockData';
import { 
  Sparkles, 
  PlusCircle, 
  Home, 
  Map, 
  Wallet, 
  Target, 
  Store,
  Flame,
  Compass
} from 'lucide-react';

export default function App() {
  // Navigation View: 'home' | 'merchant'
  const [currentView, setCurrentView] = useState(() => {
    return window.location.pathname === '/merchant' ? 'merchant' : 'home';
  });

  // User Inner Tabs: 'home' (Khám phá) | 'feed' (Bảng tin FB) | 'map' (Bản đồ DealMap)
  const [userTab, setUserTab] = useState('home');

  const [deals, setDeals] = useState(ALL_DEALS);
  const [selectedCity, setSelectedCity] = useState('Toàn quốc');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showPostDealModal, setShowPostDealModal] = useState(false);
  const [showPassportModal, setShowPassportModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);

  // Deal Passport Saved Deals (with initial default demo data for Spa & Fashion)
  const [savedDeals, setSavedDeals] = useState(() => {
    return [
      {
        ...ALL_DEALS[0], // An Nhiên Beauty Spa
        isUsed: false,
        savedAt: 'Hôm nay'
      },
      {
        ...ALL_DEALS[1], // Chic Studio Thời Trang
        isUsed: false,
        savedAt: 'Hôm qua'
      }
    ];
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveDeal = (dealToSave) => {
    const exists = savedDeals.some(d => d.id === dealToSave.id);
    if (exists) {
      showToast('Ưu đãi này đã có trong Deal Passport của bạn!');
      return;
    }
    setSavedDeals([
      { ...dealToSave, isUsed: false, savedAt: 'Vừa xong' },
      ...savedDeals
    ]);
    showToast('⭐ Đã lưu ưu đãi vào Deal Passport của bạn!');
  };

  const handleRemoveSavedDeal = (dealId) => {
    setSavedDeals(savedDeals.filter(d => d.id !== dealId));
    showToast('Đã xóa ưu đãi khỏi Deal Passport.');
  };

  const handleMarkUsed = (dealId) => {
    setSavedDeals(savedDeals.map(d => d.id === dealId ? { ...d, isUsed: true } : d));
    showToast('✓ Đã xác nhận sử dụng ưu đãi tại tiệm thành công!');
  };

  const handleAddDeal = (newDeal) => {
    setDeals([newDeal, ...deals]);
    showToast('Đăng tin ưu đãi làm đẹp / thời trang thành công!');
  };

  // Sync with browser URL
  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // 1. IF USER IS IN MERCHANT PORTAL VIEW: RENDER FULL SCREEN DEDICATED MERCHANT PAGE!
  if (currentView === 'merchant') {
    return (
      <>
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold border border-green-400 animate-bounce">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{toastMessage}</span>
          </div>
        )}

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
      </>
    );
  }

  // 2. STANDARD CONSUMER SHOPPING & COMMUNITY VIEW (Trang Chủ Khách Hàng)
  return (
    <div className="min-h-screen flex flex-col bg-[#f6faf6] text-gray-800 pb-20 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold border border-noti-400 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Consumer Navbar */}
      <Navbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={userTab}
        setActiveTab={setUserTab}
        onOpenPostDeal={() => setShowPostDealModal(true)}
        onOpenPassport={() => setShowPassportModal(true)}
        onOpenMissions={() => setShowMissionModal(true)}
        onOpenMerchantDashboard={() => navigateTo('merchant')}
        savedDealsCount={savedDeals.filter(d => !d.isUsed).length}
      />

      {/* Sub-nav App Bar (Khám Phá • Bảng Tin FB • Bản Đồ) */}
      <div className="sticky top-[58px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-4 py-2">
          <button
            onClick={() => setUserTab('home')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
              userTab === 'home'
                ? 'bg-noti-500 text-white shadow-sm scale-102'
                : 'text-gray-600 hover:bg-gray-100 hover:text-noti-600'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Săn Deal Hot</span>
          </button>

          <button
            onClick={() => setUserTab('feed')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all relative ${
              userTab === 'feed'
                ? 'bg-noti-500 text-white shadow-sm scale-102'
                : 'text-gray-600 hover:bg-gray-100 hover:text-noti-600'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Bảng Tin Săn Deal</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute top-1.5 right-1.5" />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
          </button>

          <button
            onClick={() => setUserTab('map')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
              userTab === 'map'
                ? 'bg-noti-500 text-white shadow-sm scale-102'
                : 'text-gray-600 hover:bg-gray-100 hover:text-noti-600'
            }`}
          >
            <Map className="w-4 h-4 text-emerald-600" />
            <span>Bản Đồ Làm Đẹp</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: HOME (Khám Phá Ưu Đãi) */}
      {userTab === 'home' && (
        <main className="space-y-6">
          {/* Hero Banner (Consumer Beauty & Fashion only) */}
          <HeroBanner 
            onViewFeed={() => setUserTab('feed')}
            onViewMap={() => setUserTab('map')}
          />

          {/* AI Smart Beauty & Fashion Finder */}
          <SmartDealFinder
            allDeals={deals}
            onSelectDeal={(deal) => setSelectedDeal(deal)}
            onSaveDeal={handleSaveDeal}
          />

          {/* Quick Map Teaser */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-emerald-600 to-noti-600 text-white rounded-3xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="bg-yellow-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Tọa độ quanh bạn
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  Khám Phá Spa, Nail & Shop Quanh Đây
                </h3>
                <p className="text-xs text-white/90">
                  Xem ngay các viện thẩm mỹ, tiệm làm tóc và shop thời trang đang có voucher giảm giá trong bán kính 2km.
                </p>
              </div>
              <button
                onClick={() => setUserTab('map')}
                className="px-5 py-2.5 bg-white text-noti-700 hover:bg-yellow-300 hover:text-gray-950 font-black text-xs rounded-xl shadow transition-all flex items-center space-x-2 flex-shrink-0"
              >
                <Compass className="w-4 h-4" />
                <span>Mở Bản Đồ Vệ Tinh</span>
              </button>
            </div>
          </div>

          {/* Category Icons Grid */}
          <CategoryGrid
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {/* Flash Sale Section */}
          <FlashSaleSection
            onSelectDeal={(deal) => setSelectedDeal(deal)}
          />

          {/* All Deals Section */}
          <ClassifiedDealsSection
            deals={deals}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onSelectDeal={(deal) => setSelectedDeal(deal)}
            onSaveDeal={handleSaveDeal}
            savedDealIds={savedDeals.map(d => d.id)}
          />
        </main>
      )}

      {/* VIEW 2: DEAL FEED (Bảng Tin Săn Deal Giống Facebook / NOTI) */}
      {userTab === 'feed' && (
        <main className="py-2">
          <DealFeed 
            onSaveDeal={handleSaveDeal}
            onSelectDeal={(deal) => setSelectedDeal(deal)}
            savedDealIds={savedDeals.map(d => d.id)}
          />
        </main>
      )}

      {/* VIEW 3: MAP (Zenly / Google Maps toàn màn hình) */}
      {userTab === 'map' && (
        <main className="max-w-7xl mx-auto px-4 py-4">
          <ZenlyDealMap
            selectedCity={selectedCity}
            onSelectDeal={(deal) => setSelectedDeal(deal)}
          />
        </main>
      )}

      {/* Mobile-First Bottom Navigation Bar (Giống Ứng Dụng NOTI / App Di Động) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 py-1.5 px-2 flex items-center justify-around md:hidden shadow-2xl">
        {/* Tab 1: Trang chủ */}
        <button 
          onClick={() => {
            setUserTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            userTab === 'home' ? 'text-noti-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Săn Deal</span>
        </button>

        {/* Tab 2: Bảng tin (Facebook style) */}
        <button 
          onClick={() => {
            setUserTab('feed');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors relative ${
            userTab === 'feed' ? 'text-noti-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Flame className="w-5 h-5 mb-0.5 text-amber-500 fill-amber-500" />
          <span>Bảng tin</span>
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-1" />
        </button>

        {/* Tab 3: Center Đăng Deal */}
        <button
          onClick={() => setShowPostDealModal(true)}
          className="-mt-5 w-11 h-11 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 shadow-xl flex items-center justify-center font-black active:scale-90 transition-transform"
          title="Chia sẻ deal mới"
        >
          <PlusCircle className="w-6 h-6 text-gray-900" />
        </button>

        {/* Tab 4: Bản đồ */}
        <button 
          onClick={() => {
            setUserTab('map');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            userTab === 'map' ? 'text-noti-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Map className="w-5 h-5 mb-0.5 text-emerald-600" />
          <span>Bản đồ</span>
        </button>

        {/* Tab 5: Deal Passport */}
        <button
          onClick={() => setShowPassportModal(true)}
          className="flex flex-col items-center text-[10px] font-medium text-gray-500 hover:text-noti-600 relative"
        >
          <Wallet className="w-5 h-5 mb-0.5 text-yellow-600" />
          <span>Ví voucher</span>
          {savedDeals.filter(d => !d.isUsed).length > 0 && (
            <span className="absolute -top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {savedDeals.filter(d => !d.isUsed).length}
            </span>
          )}
        </button>
      </nav>

      {/* Deal Passport Modal */}
      {showPassportModal && (
        <DealPassportModal
          savedDeals={savedDeals}
          onRemoveDeal={handleRemoveSavedDeal}
          onMarkUsed={handleMarkUsed}
          onClose={() => setShowPassportModal(false)}
        />
      )}

      {/* Deal Mission Modal */}
      {showMissionModal && (
        <DealMissionModal
          onClose={() => setShowMissionModal(false)}
          onOpenPassport={() => setShowPassportModal(true)}
        />
      )}

      {/* Deal Details Modal */}
      {selectedDeal && (
        <DealDetailModal
          deal={selectedDeal}
          isSaved={savedDeals.some(d => d.id === selectedDeal.id)}
          onSaveDeal={handleSaveDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}

      {/* Post Deal Modal */}
      {showPostDealModal && (
        <PostDealModal
          onClose={() => setShowPostDealModal(false)}
          onAddDeal={handleAddDeal}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SmartDealFinder from './components/SmartDealFinder';
import ZenlyDealMap from './components/ZenlyDealMap';
import CategoryGrid from './components/CategoryGrid';
import FlashSaleSection from './components/FlashSaleSection';
import ClassifiedDealsSection from './components/ClassifiedDealsSection';
import DealDetailModal from './components/DealDetailModal';
import PostDealModal from './components/PostDealModal';
import DealPassportModal from './components/DealPassportModal';
import DealMissionModal from './components/DealMissionModal';
import MerchantPortal from './pages/MerchantPortal';
import Footer from './components/Footer';
import { ALL_DEALS } from './data/mockData';
import { Sparkles, PlusCircle, Home, Tag, Map, Wallet, Target, Store } from 'lucide-react';

export default function App() {
  // Navigation View: 'home' | 'merchant'
  const [currentView, setCurrentView] = useState(() => {
    return window.location.pathname === '/merchant' ? 'merchant' : 'home';
  });

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

  // IF USER IS IN MERCHANT PORTAL VIEW: RENDER FULL SCREEN DEDICATED MERCHANT PAGE!
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

  // STANDARD USER SHOPPING VIEW (Trang Chủ Khách Hàng)
  return (
    <div className="min-h-screen flex flex-col bg-[#f6faf6] text-gray-800 pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold border border-noti-400 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenPostDeal={() => setShowPostDealModal(true)}
        onOpenPassport={() => setShowPassportModal(true)}
        onOpenMissions={() => setShowMissionModal(true)}
        onOpenMerchantDashboard={() => navigateTo('merchant')}
        savedDealsCount={savedDeals.filter(d => !d.isUsed).length}
      />

      {/* Hero Banner */}
      <HeroBanner 
        onOpenMerchantDashboard={() => navigateTo('merchant')}
      />

      {/* AI Smart Beauty & Fashion Finder */}
      <SmartDealFinder
        allDeals={deals}
        onSelectDeal={(deal) => setSelectedDeal(deal)}
        onSaveDeal={handleSaveDeal}
      />

      {/* Google Maps DealMap Section (Spa, Thẩm mỹ viện, Thời trang) */}
      <div id="dealmap-section">
        <ZenlyDealMap
          selectedCity={selectedCity}
          onSelectDeal={(deal) => setSelectedDeal(deal)}
        />
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 py-1.5 px-3 flex items-center justify-around md:hidden shadow-xl">
        <button 
          onClick={() => {
            setActiveCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center text-[10px] font-bold text-noti-600"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Trang chủ</span>
        </button>

        <a 
          href="#dealmap-section"
          className="flex flex-col items-center text-[10px] font-semibold text-gray-600 hover:text-noti-600"
        >
          <Map className="w-5 h-5 mb-0.5 text-noti-600" />
          <span>Bản đồ</span>
        </a>

        {/* Center Post Deal button */}
        <button
          onClick={() => setShowPostDealModal(true)}
          className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 shadow-xl flex items-center justify-center font-black active:scale-90 transition-transform"
          title="Đăng Deal Mới"
        >
          <PlusCircle className="w-7 h-7 text-gray-900" />
        </button>

        {/* Deal Passport */}
        <button
          onClick={() => setShowPassportModal(true)}
          className="flex flex-col items-center text-[10px] font-medium text-gray-600 hover:text-noti-600 relative"
        >
          <Wallet className="w-5 h-5 mb-0.5 text-yellow-600" />
          <span>Deal Passport</span>
          {savedDeals.filter(d => !d.isUsed).length > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center">
              {savedDeals.filter(d => !d.isUsed).length}
            </span>
          )}
        </button>

        {/* Kênh Người Bán (Dedicated Page) on Mobile Bottom Bar */}
        <button
          onClick={() => navigateTo('merchant')}
          className="flex flex-col items-center text-[10px] font-bold text-amber-600 hover:text-noti-600"
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span>Kênh người bán</span>
        </button>
      </div>

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

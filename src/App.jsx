import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ZenlyDealMap from './components/ZenlyDealMap';
import CategoryGrid from './components/CategoryGrid';
import FlashSaleSection from './components/FlashSaleSection';
import ClassifiedDealsSection from './components/ClassifiedDealsSection';
import DealDetailModal from './components/DealDetailModal';
import PostDealModal from './components/PostDealModal';
import Footer from './components/Footer';
import { ALL_DEALS } from './data/mockData';
import { Sparkles, PlusCircle, Home, Tag, Map, User } from 'lucide-react';

export default function App() {
  const [deals, setDeals] = useState(ALL_DEALS);
  const [selectedCity, setSelectedCity] = useState('Toàn quốc');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showPostDealModal, setShowPostDealModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddDeal = (newDeal) => {
    setDeals([newDeal, ...deals]);
    showToast('Đăng tin khuyến mãi thành công!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6faf6] text-gray-800 pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold border border-noti-400">
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
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Google Maps DealMap Section */}
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
      />

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 py-1.5 px-4 flex items-center justify-around md:hidden shadow-lg">
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
        >
          <PlusCircle className="w-7 h-7 text-gray-900" />
        </button>

        <a 
          href="#deals-section"
          className="flex flex-col items-center text-[10px] font-medium text-gray-600 hover:text-noti-600"
        >
          <Tag className="w-5 h-5 mb-0.5" />
          <span>Ưu đãi</span>
        </a>

        <button
          onClick={() => showToast('Tính năng tài khoản đang được phát triển')}
          className="flex flex-col items-center text-[10px] font-medium text-gray-600 hover:text-noti-600"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Tài khoản</span>
        </button>
      </div>

      {/* Modals */}
      {selectedDeal && (
        <DealDetailModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}

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

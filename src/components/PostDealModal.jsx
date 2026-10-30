import React, { useState } from 'react';
import { X, Store, CheckCircle2 } from 'lucide-react';
import { CITIES, CATEGORIES } from '../data/mockData';

export default function PostDealModal({ onClose, onAddDeal }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'fnb',
    storeName: '',
    city: 'Hà Nội',
    address: '',
    originalPrice: '',
    salePrice: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    badge: 'Mới đăng'
  });

  const [submitted, setSubmitted] = useState(false);

  const calculateDiscount = () => {
    const orig = parseFloat(formData.originalPrice);
    const sale = parseFloat(formData.salePrice);
    if (orig && sale && orig > sale) {
      const pct = Math.round(((orig - sale) / orig) * 100);
      return `-${pct}%`;
    }
    return '-20%';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.salePrice || !formData.storeName) {
      alert('Vui lòng điền đầy đủ tiêu đề, tên cửa hàng và giá khuyến mãi!');
      return;
    }

    const newDeal = {
      id: `deal-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      originalPrice: parseInt(formData.originalPrice) || parseInt(formData.salePrice) * 1.3,
      salePrice: parseInt(formData.salePrice),
      discount: calculateDiscount(),
      image: formData.image,
      storeName: formData.storeName,
      city: formData.city,
      address: formData.address || `${formData.storeName}, ${formData.city}`,
      distance: 'Gần bạn',
      badge: 'Vừa đăng',
      likes: 1,
      rating: 5.0,
      description: formData.description || 'Ưu đãi đặc biệt áp dụng trực tiếp tại cửa hàng.'
    };

    onAddDeal(newDeal);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-400 p-5 text-gray-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
              <Store className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <h3 className="font-black text-lg">ĐĂNG TIN KHUYẾN MÃI</h3>
              <p className="text-xs text-gray-800">
                Dành cho các cửa hàng, quán ăn và doanh nghiệp bán lẻ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-gray-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-noti-100 rounded-full flex items-center justify-center mx-auto text-noti-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-gray-900">Đăng Tin Thành Công!</h4>
            <p className="text-xs text-gray-500">
              Chương trình khuyến mãi của bạn đã được xuất bản và hiển thị trên DealHub.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Tiêu đề chương trình khuyến mãi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Giảm 40% Toàn bộ Menu Trà Sữa & Đồ Uống..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Ngành hàng</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500 bg-white"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Khu vực / Tỉnh thành</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500 bg-white"
                >
                  {CITIES.filter(c => c !== 'Toàn quốc').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200">
              <div>
                <label className="block font-bold text-gray-600 mb-1">Giá niêm yết (VNĐ)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="Ví dụ: 65000"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500"
                />
              </div>

              <div>
                <label className="block font-bold text-red-600 mb-1">Giá khuyến mãi (VNĐ) *</label>
                <input
                  type="number"
                  required
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  placeholder="Ví dụ: 29000"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500 font-bold text-red-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Tên cửa hàng / Thương hiệu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  placeholder="Ví dụ: ToCoToCo Tea"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Địa chỉ cụ thể</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ví dụ: 157 Xuân Thủy, Cầu Giấy"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Mô tả chi tiết & Điều kiện áp dụng</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Khung giờ áp dụng, điều kiện hóa đơn, liên hệ đặt bàn..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-noti-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-noti-500 hover:bg-noti-600 active:scale-98 text-white font-bold text-sm rounded-xl shadow transition-all"
              >
                Đăng Tin Khuyến Mãi Ngay
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

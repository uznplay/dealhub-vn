import React, { useState } from 'react';
import { X, Store, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { CITIES, CATEGORIES } from '../data/mockData';

export default function PostDealModal({ onClose, onAddDeal }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'spa',
    storeName: '',
    city: 'Hà Nội',
    address: '',
    originalPrice: '',
    salePrice: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    badge: 'Ưu đãi mới'
  });

  const [submitted, setSubmitted] = useState(false);

  const calculateDiscount = () => {
    const orig = parseFloat(formData.originalPrice);
    const sale = parseFloat(formData.salePrice);
    if (orig && sale && orig > sale) {
      const pct = Math.round(((orig - sale) / orig) * 100);
      return `-${pct}%`;
    }
    return '-30%';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.salePrice || !formData.storeName) {
      alert('Vui lòng điền đầy đủ tiêu đề dịch vụ, tên tiệm và giá ưu đãi!');
      return;
    }

    const newDeal = {
      id: `deal-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      originalPrice: parseInt(formData.originalPrice) || parseInt(formData.salePrice) * 1.5,
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
      description: formData.description || 'Ưu đãi độc quyền áp dụng trực tiếp tại tiệm spa / shop thời trang.'
    };

    onAddDeal(newDeal);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-noti-600 to-emerald-700 p-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Store className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase">TẠO ƯU ĐÃI CHO TIỆM</h3>
              <p className="text-[10px] text-green-100">
                Hiển thị ngay trên bản đồ và bảng tin người dùng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-gray-900">Đăng Ưu Đãi Thành Công!</h4>
            <p className="text-xs text-gray-500">
              Dịch vụ của bạn đã được xuất bản trên bản đồ và danh sách DealHub Beauty & Fashion.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Tên gói dịch vụ / Sản phẩm khuyến mãi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Gói Chăm Sóc Da Y Khoa 12 Bước hoặc Set Váy Thiết Kế..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Danh mục làm đẹp / thời trang</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
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
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                >
                  {CITIES.filter(c => c !== 'Toàn quốc').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
              <div>
                <label className="block font-bold text-gray-600 mb-1">Giá gốc niêm yết (VNĐ)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="Ví dụ: 500000"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-red-600 mb-1">Giá ưu đãi DealHub (VNĐ) *</label>
                <input
                  type="number"
                  required
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  placeholder="Ví dụ: 189000"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 font-bold text-red-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Tên tiệm Spa / Thẩm mỹ viện / Shop <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  placeholder="Ví dụ: An Nhiên Beauty Spa"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Địa chỉ tiệm cụ thể</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ví dụ: 12 Liễu Giai, Ba Đình"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Mô tả quy trình liệu trình & Điều kiện áp dụng</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Các bước liệu trình, thời gian làm dịch vụ, liên hệ đặt lịch trước..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow transition-all"
              >
                Đăng Ưu Đãi Lên Sàn Ngay
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

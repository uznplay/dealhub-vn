import React, { useState } from 'react';
import { 
  X, 
  Store, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Camera, 
  Tag, 
  FileText, 
  DollarSign, 
  Layers,
  Send,
  Image as ImageIcon
} from 'lucide-react';

const PHOTO_PRESETS = [
  {
    id: 'p1',
    label: 'Chăm sóc da',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'p2',
    label: 'Gội dưỡng sinh',
    url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'p3',
    label: 'Triệt lông Laser',
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'p4',
    label: 'Massage trị liệu',
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'p5',
    label: 'Thời trang',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80'
  }
];

export default function PostDealModal({ onClose, onAddDeal }) {
  // Tiệm mặc định gắn liền hồ sơ đối tác
  const storeProfile = {
    storeName: 'An Nhiên Beauty & Clinic Spa',
    address: '12 Liễu Giai, Ba Đình, Hà Nội',
    city: 'Hà Nội',
    avatar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80',
    lat: 21.0335,
    lng: 105.8145
  };

  const [formData, setFormData] = useState({
    title: 'Gói Chăm Sóc Da Y Khoa Chuyên Sâu 12 Bước + Chiếu Ánh Sáng Sinh Học',
    category: 'spa',
    originalPrice: '500000',
    salePrice: '189000',
    postContent: 'Ưu đãi giờ vàng dành riêng cho khách hàng DealHub! Giảm ngay 62% cho 20 khách hàng đầu tiên đặt lịch trải nghiệm liệu trình chuẩn y khoa tuần này. Cam kết không phát sinh phụ phí!',
    image: PHOTO_PRESETS[0].url
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
    if (!formData.title.trim() || !formData.salePrice) {
      alert('Vui lòng điền tiêu đề dịch vụ và giá ưu đãi!');
      return;
    }

    const discountStr = calculateDiscount();
    const dealId = `deal-${Date.now()}`;

    // 1. Unified Deal object for Trang Chủ & Bản Đồ Deal
    const newDeal = {
      id: dealId,
      title: formData.title,
      category: formData.category,
      originalPrice: parseInt(formData.originalPrice) || parseInt(formData.salePrice) * 1.5,
      salePrice: parseInt(formData.salePrice),
      discount: discountStr,
      image: formData.image,
      storeName: storeProfile.storeName,
      city: storeProfile.city,
      address: storeProfile.address,
      distance: '650m',
      lat: storeProfile.lat,
      lng: storeProfile.lng,
      badge: 'Vừa đăng',
      likes: 1,
      rating: 5.0,
      description: formData.postContent || 'Ưu đãi độc quyền áp dụng trực tiếp tại tiệm.'
    };

    // 2. Unified Feed Post for Bảng Tin Săn Deal
    const newFeedPost = {
      id: `post-${Date.now()}`,
      author: {
        name: storeProfile.storeName,
        avatar: storeProfile.avatar,
        role: 'Chủ Tiệm Spa (Đối tác xác thực)',
        isVerified: true
      },
      role: 'Chủ Tiệm Spa (Đối tác xác thực)',
      avatar: storeProfile.avatar,
      time: 'Vừa xong',
      location: storeProfile.address,
      content: formData.postContent,
      image: formData.image,
      images: [formData.image],
      deal: newDeal,
      attachedDeal: newDeal,
      likes: 5,
      commentsCount: 0,
      comments: [],
      tags: ['#DealMoi', '#AnNhienSpa', '#UuDaiGioVang']
    };

    onAddDeal({ deal: newDeal, feedPost: newFeedPost });
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
        <div className="bg-gradient-to-r from-noti-700 to-noti-600 p-3.5 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase">ĐĂNG BÀI & ƯU ĐÃI CHO TIỆM</h3>
              <p className="text-[10px] text-green-100">
                Tự động xuất bản lên Bản Đồ, Bảng Tin & Bắn Noti
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-noti-50 text-noti-600 rounded-full flex items-center justify-center mx-auto border border-noti-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-gray-900">Đăng Bài Thành Công!</h4>
            <p className="text-xs text-gray-500">
              Đã đồng bộ lên <b>Bản Đồ Deal</b>, <b>Bảng Tin</b> và bắn <b>Push Notification</b> tới khách hàng.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto flex-1 text-xs">
            
            {/* 1. Hồ Sơ Tiệm (Gắn liền mặc định) */}
            <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center space-x-2.5">
              <img 
                src={storeProfile.avatar} 
                alt="" 
                className="w-9 h-9 rounded-xl object-cover border border-gray-200 flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-gray-900 truncate text-[11px]">
                    {storeProfile.storeName}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-noti-600 flex-shrink-0" />
                </div>
                <p className="text-[10px] text-gray-500 truncate flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  {storeProfile.address}
                </p>
              </div>
            </div>

            {/* 2. Tiêu Đề Dịch Vụ / Ưu Đãi */}
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block text-[11px]">
                Tiêu đề gói dịch vụ / Ưu đãi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Gói Chăm Sóc Da Y Khoa Chuyên Sâu 12 Bước"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-noti-500 outline-none text-xs"
              />
            </div>

            {/* 3. Chọn & Xem Trước Hình Ảnh */}
            <div className="space-y-1.5">
              <label className="font-bold text-gray-700 block text-[11px] flex items-center justify-between">
                <span>Hình ảnh ưu đãi thực tế</span>
                <span className="text-[10px] text-noti-700 font-semibold">Chạm để chọn ảnh mẫu</span>
              </label>

              {/* Image Preview Box */}
              <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 group">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {calculateDiscount()}
                </div>
              </div>

              {/* Preset Photo Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {PHOTO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`flex-shrink-0 p-1 rounded-xl border text-[10px] font-bold flex items-center gap-1 transition-all ${
                      formData.image === preset.url
                        ? 'border-noti-600 bg-noti-50 text-noti-700 ring-1 ring-noti-500'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <img src={preset.url} alt="" className="w-5 h-5 rounded-md object-cover" />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Giá Gốc & Giá Ưu Đãi */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block text-[11px]">
                  Giá gốc niêm yết (₫)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="500000"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-medium outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block text-[11px]">
                  Giá ưu đãi DealHub (₫) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="189000"
                    className="w-full px-3 py-2 bg-white border border-noti-300 rounded-xl font-bold text-noti-700 outline-none text-xs pr-12"
                  />
                  <span className="absolute right-2 top-2 text-[10px] font-black text-red-500 bg-red-50 px-1 rounded">
                    {calculateDiscount()}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Nội Dung Bài Viết (Hiện trên Bảng Tin Feed) */}
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block text-[11px]">
                Nội dung bài viết (Hiển thị lên Bảng Tin Deal Feed)
              </label>
              <textarea
                rows={3}
                value={formData.postContent}
                onChange={(e) => setFormData({ ...formData, postContent: e.target.value })}
                placeholder="Mô tả liệu trình, điều kiện áp dụng, cam kết chất lượng..."
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-medium outline-none text-xs leading-relaxed resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-noti-600 hover:bg-noti-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Xuất Bản Deal Lên Sàn & Bảng Tin</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

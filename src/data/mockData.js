export const CITIES = [
  'Toàn quốc',
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'Bình Dương'
];

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả ưu đãi', icon: 'Sparkles', color: 'bg-noti-500 text-white' },
  { id: 'spa', name: 'Spa & Chăm sóc da', icon: 'Heart', color: 'bg-emerald-50 text-emerald-700' },
  { id: 'fashion', name: 'Thời trang & Quần áo', icon: 'Shirt', color: 'bg-teal-50 text-teal-700' },
  { id: 'cosmetics', name: 'Mỹ phẩm & Skincare', icon: 'Sparkles', color: 'bg-green-50 text-green-700' },
  { id: 'nail_eyelash', name: 'Nail & Nối mi', icon: 'Smile', color: 'bg-lime-50 text-lime-700' },
  { id: 'hair_salon', name: 'Hair Salon & Gội đầu', icon: 'Scissors', color: 'bg-emerald-50 text-emerald-700' },
  { id: 'perfume', name: 'Nước hoa & Phụ kiện', icon: 'Crown', color: 'bg-emerald-50 text-emerald-800' },
  { id: 'massage', name: 'Massage & Dưỡng sinh', icon: 'Activity', color: 'bg-teal-50 text-teal-800' },
];

export const FLASH_DEALS = [
  {
    id: 'flash-1',
    title: 'Gói Chăm Sóc Da Y Khoa Chuyên Sâu 12 Bước + Chiếu Ánh Sáng Sinh Học',
    category: 'spa',
    originalPrice: 500000,
    salePrice: 189000,
    discount: '-62%',
    soldPercent: 88,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    storeName: 'An Nhiên Beauty & Clinic Spa',
    city: 'Hà Nội',
    address: '12 Liễu Giai, Ba Đình, Hà Nội',
    distance: '650m',
    badge: 'Bán chạy nhất',
    likes: 840,
    rating: 5.0,
    description: 'Quy trình chuẩn y khoa: Khử khuẩn, tẩy tế bào chết enzyme, hút bã nhờn, lấy nhân mụn bằng tăm bông, đắp mặt nạ bạc hà dịu da và chiếu đèn sinh học.'
  },
  {
    id: 'flash-2',
    title: 'Đầm Thiết Kế Lụa Tơ Tằm Dáng Xòe Đi Tiệc & Dạo Phố Cao Cấp',
    category: 'fashion',
    originalPrice: 550000,
    salePrice: 249000,
    discount: '-55%',
    soldPercent: 92,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    storeName: 'Chic Studio Thời Trang Thiết Kế',
    city: 'TP. Hồ Chí Minh',
    address: '104 Lê Văn Sỹ, Phường 10, Quận 3, TP. Hồ Chí Minh',
    distance: '1.2km',
    badge: 'Xu hướng hè',
    likes: 620,
    rating: 4.9,
    description: 'Chất liệu lụa mềm mịn mát tay, tôn dáng che khuyết điểm hoàn hảo. Đầy đủ size S, M, L cho nàng tự tin tỏa sáng.'
  },
  {
    id: 'flash-3',
    title: 'Bộ Đôi Serum B5 Phục Hồi Da & Kem Chống Nắng Phổ Rộng La Roche-Posay',
    category: 'cosmetics',
    originalPrice: 850000,
    salePrice: 489000,
    discount: '-42%',
    soldPercent: 78,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    storeName: 'Beauty Garden Mỹ Phẩm Chính Hãng',
    city: 'Đà Nẵng',
    address: '45 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    distance: '800m',
    badge: 'Chính hãng 100%',
    likes: 710,
    rating: 4.9,
    description: 'Hàng nhập khẩu chính ngạch tem phụ đầy đủ. Giúp cấp ẩm sâu, phục hồi màng bảo vệ da yếu, ngăn ngừa lão hóa do tia UV.'
  },
  {
    id: 'flash-4',
    title: 'Gội Đầu Dưỡng Sinh Trung Hoa Thảo Dược 75 Phút Kèm Massage Cổ Vai Gáy',
    category: 'hair_salon',
    originalPrice: 250000,
    salePrice: 99000,
    discount: '-60%',
    soldPercent: 95,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&auto=format&fit=crop&q=80',
    storeName: 'Mộc Trà Dưỡng Sinh Spa',
    city: 'Hà Nội',
    address: '157 Xuân Thủy, Cầu Giấy, Hà Nội',
    distance: '320m',
    badge: 'Ưu đãi giờ vàng',
    likes: 930,
    rating: 5.0,
    description: 'Nấu nước gội từ 18 vị thảo mộc thiên nhiên (bồ kết, vỏ bưởi, sả chanh). Kết hợp bài massage bấm huyệt đả thông kinh lạc giảm stress.'
  }
];

export const ALL_DEALS = [
  ...FLASH_DEALS,
  {
    id: 'deal-5',
    title: 'Combo Làm Nail Hàn Quốc Vẽ Nghệ Thuật & Đính Đá Xà Cừ Sang Trọng',
    category: 'nail_eyelash',
    originalPrice: 220000,
    salePrice: 99000,
    discount: '-55%',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=80',
    storeName: 'Luna Nail & Eyelash Bar',
    city: 'TP. Hồ Chí Minh',
    address: '215 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
    distance: '950m',
    badge: 'Deal hot sinh viên',
    likes: 480,
    rating: 4.8,
    description: 'Sơn gel bền màu trên 4 tuần không bong tróc, phụ kiện đính đá phong cách tiểu thư Hàn Quốc sang trọng.'
  },
  {
    id: 'deal-6',
    title: 'Áo Blazer Unisex Form Rộng Dáng Dài Chất Liệu Tuyết Mưa Cao Cấp',
    category: 'fashion',
    originalPrice: 420000,
    salePrice: 199000,
    discount: '-53%',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
    storeName: 'The Cosmo Club - Thời Trang Giới Trẻ',
    city: 'Hà Nội',
    address: '82 Chùa Bộc, Đống Đa, Hà Nội',
    distance: '1.8km',
    badge: 'Best seller',
    likes: 560,
    rating: 4.9,
    description: 'Chất vải tuyết mưa đứng form không nhăn, lót lụa mềm mại 2 lớp, mặc đi học đi làm hay đi cà phê đều cực kỳ cuốn hút.'
  },
  {
    id: 'deal-7',
    title: 'Liệu Trình Triệt Lông Vĩnh Viễn Diode Laser 808nm Không Đau Rát (Bảo Hành 5 Năm)',
    category: 'spa',
    originalPrice: 1200000,
    salePrice: 350000,
    discount: '-71%',
    image: 'https://images.unsplash.com/photo-1512290900672-1f55a1538350?w=600&auto=format&fit=crop&q=80',
    storeName: 'Seoul Center Beauty Clinic',
    city: 'Đà Nẵng',
    address: '120 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
    distance: '1.4km',
    badge: 'Bảo hành 5 năm',
    likes: 670,
    rating: 5.0,
    description: 'Công nghệ đầu lạnh âm 5 độ C làm dịu da tức thì, se khít lỗ chân lông, ngăn ngừa lông mọc lại và hỗ trợ sáng mịn vùng da thâm.'
  },
  {
    id: 'deal-8',
    title: 'Nước Hoa Chiết Pháp Chanel Coco Mademoiselle & Dior Sauvage 20ml',
    category: 'perfume',
    originalPrice: 450000,
    salePrice: 220000,
    discount: '-51%',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
    storeName: 'Paris Authentic Perfume',
    city: 'TP. Hồ Chí Minh',
    address: '58 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh',
    distance: '2.1km',
    badge: 'Hương thơm 12h',
    likes: 890,
    rating: 4.9,
    description: 'Được chiết trực tiếp từ chai fullbox 100ml chính hãng, độ lưu hương từ 8 đến 12 tiếng, tỏa hương trong bán kính 2m.'
  },
  {
    id: 'deal-9',
    title: 'Massage Body Đá Nóng Himalaya & Thải Độc Cơ Thể 90 Phút',
    category: 'massage',
    originalPrice: 480000,
    salePrice: 219000,
    discount: '-54%',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80',
    storeName: 'Sen Vàng Massage & Trị Liệu',
    city: 'Hà Nội',
    address: '26 Ngõ 337 Cầu Giấy, Hà Nội',
    distance: '450m',
    badge: 'Trị liệu chuyên sâu',
    likes: 420,
    rating: 4.9,
    description: 'Sử dụng đá muối khoáng nóng Himalaya kết hợp tinh dầu gừng sả làm ấm cơ thể, giải tỏa căng cơ thắt lưng và vai gáy.'
  },
  {
    id: 'deal-10',
    title: 'Set Áo Croptop & Chân Váy Chữ A Tennis Xếp Ly Dễ Phối Đồ',
    category: 'fashion',
    originalPrice: 320000,
    salePrice: 139000,
    discount: '-57%',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    storeName: 'Mây Boutique Thời Trang Nữ',
    city: 'Hải Phòng',
    address: '88 Lạch Tray, Ngô Quyền, Hải Phòng',
    distance: '1.7km',
    badge: 'Xả kho mẫu mới',
    likes: 310,
    rating: 4.8,
    description: 'Chất vải tuyết thun co giãn nhẹ nhàng có quần bảo hộ bên trong, phong cách trẻ trung năng động chuẩn Hàn Quốc.'
  }
];

export const MOCK_FEED_POSTS = [
  {
    id: 'post-1',
    author: {
      name: 'Thu Trang Beauty',
      role: 'Reviewer Làm Đẹp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      isVerified: true
    },
    time: '25 phút trước',
    location: 'Ba Đình, Hà Nội • Cách bạn 650m',
    content: '🔥 Deal cứu cánh làn da mụn bí bách sau đợt hè đây cả nhà ơi! Mình vừa test xong gói Chăm Sóc Da Y Khoa 12 bước tại An Nhiên Spa Liễu Giai. Kỹ thuật viên lấy nhân mụn bằng tăm bông cực êm, không sưng đỏ tí nào, đắp mặt nạ bạc hà mát lịm. Đang flash sale giảm 62% chỉ còn 189k thôi nha, các nàng bấm Lưu ví gấp kẻo hết lượt!',
    tags: ['#ReviewSpa', '#ChamSocDaYKhoa', '#DealHotHaNoi', '#AnNhienSpa'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    deal: {
      id: 'flash-1',
      title: 'Gói Chăm Sóc Da Y Khoa Chuyên Sâu 12 Bước + Chiếu Đèn Sinh Học',
      storeName: 'An Nhiên Beauty & Clinic Spa',
      originalPrice: 500000,
      salePrice: 189000,
      discount: '-62%',
      address: '12 Liễu Giai, Ba Đình, Hà Nội'
    },
    likes: 342,
    commentsCount: 48,
    shares: 19,
    comments: [
      { id: 'c-1', author: 'Minh Anh', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', text: 'Có cần đặt lịch trước không bạn ơi? Giá 189k này có phát sinh tip không ạ?', time: '12 phút trước' },
      { id: 'c-2', author: 'Thu Trang Beauty', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', text: '@Minh Anh Giá trọn gói không bắt buộc tip nha nàng! Chỉ cần lưu mã vào Deal Passport rồi đưa nhân viên quét là xong nha.', time: '8 phút trước' },
      { id: 'c-3', author: 'Khánh Vy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', text: 'Vừa lưu ví xong, chiều nay ghé luôn đây hihi!', time: '3 phút trước' }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Chic Studio Thời Trang',
      role: 'Shop Đối Tác DealHub',
      avatar: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=120&auto=format&fit=crop&q=80',
      isVerified: true
    },
    time: '1 giờ trước',
    location: 'Quận 3, TP. Hồ Chí Minh • Cách bạn 1.2km',
    content: '✨ BÙNG NỔ XẢ KHO ĐẦM LỤA THIẾT KẾ ĐI TIỆC CAO CẤP! \nChỉ duy nhất 50 suất giảm 55% từ 550.000₫ xuống còn 249.000₫ cho hội chị em DealHub. Chất liệu lụa tơ tằm dệt cao cấp, dáng xòe bay bổng che khuyết điểm bụng mỡ siêu tốt. Ghé shop thử trực tiếp hoặc đặt giữ size qua ví Deal Passport nhé!',
    tags: ['#ThoiTrangNu', '#DamDiTiec', '#ChicStudio', '#Sale55%'],
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80',
    deal: {
      id: 'flash-2',
      title: 'Đầm Thiết Kế Lụa Tơ Tằm Dáng Xòe Đi Tiệc & Dạo Phố',
      storeName: 'Chic Studio Thời Trang Thiết Kế',
      originalPrice: 550000,
      salePrice: 249000,
      discount: '-55%',
      address: '104 Lê Văn Sỹ, Phường 10, Quận 3, TP.HCM'
    },
    likes: 518,
    commentsCount: 65,
    shares: 34,
    comments: [
      { id: 'c-4', author: 'Thảo My', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', text: 'Mẫu này 52kg mặc vừa size M không shop ơi?', time: '40 phút trước' },
      { id: 'c-5', author: 'Chic Studio', avatar: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=120&auto=format&fit=crop&q=80', text: '@Thảo My Dạ vừa vặn cực kỳ nàng nha, form co giãn nhẹ rất tôn dáng ạ!', time: '30 phút trước' }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Ngọc Hân Skincare',
      role: 'Thành viên Săn Sale Tích Cực',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
      isVerified: false
    },
    time: '3 giờ trước',
    location: 'Hải Châu, Đà Nẵng • Cách bạn 800m',
    content: 'Ai ở Đà Nẵng qua hốt lẹ combo serum B5 La Roche-Posay + Kem chống nắng chính hãng bên Beauty Garden đang sale sập sàn 489k này! Có hóa đơn VAT và tem chống hàng giả đầy đủ, check mã thoải mái tại quầy. Bấm lưu ngay kẻo hết hạn nhé mọi người ơi.',
    tags: ['#SanSaleDaNang', '#MyPhamChinhHang', '#LaRochePosay', '#BeautyGarden'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    deal: {
      id: 'flash-3',
      title: 'Bộ Đôi Serum B5 Phục Hồi Da & Kem Chống Nắng La Roche-Posay',
      storeName: 'Beauty Garden Mỹ Phẩm Chính Hãng',
      originalPrice: 850000,
      salePrice: 489000,
      discount: '-42%',
      address: '45 Nguyễn Văn Linh, Hải Châu, Đà Nẵng'
    },
    likes: 289,
    commentsCount: 22,
    shares: 11,
    comments: [
      { id: 'c-6', author: 'Phương Linh', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', text: 'Cảm ơn bạn đã share nha, sáng mai mình ghé lấy liền!', time: '1 giờ trước' }
    ]
  },
  {
    id: 'post-4',
    author: {
      name: 'Mộc Trà Dưỡng Sinh',
      role: 'Shop Đối Tác DealHub',
      avatar: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=120&auto=format&fit=crop&q=80',
      isVerified: true
    },
    time: '5 giờ trước',
    location: 'Cầu Giấy, Hà Nội • Cách bạn 320m',
    content: '🌿 Đi làm cả tuần mỏi vai gáy thì ghé Mộc Trà gội đầu dưỡng sinh thư giãn nha! Gói 75 phút gội nước thảo mộc đun trong ngày, massage bấm huyệt đả thông kinh lạc, đắp mắt thảo dược chỉ 99k (giá gốc 250k). Đặc biệt tặng thêm trà sen tuyết dưỡng nhan miễn phí cho khách lưu mã từ DealHub!',
    tags: ['#GoiDauDuongSinh', '#GiamStress', '#SpaCauGiay', '#MocTraSpa'],
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&auto=format&fit=crop&q=80',
    deal: {
      id: 'flash-4',
      title: 'Gội Đầu Dưỡng Sinh Thảo Dược 75 Phút Kèm Massage Vai Gáy',
      storeName: 'Mộc Trà Dưỡng Sinh Spa',
      originalPrice: 250000,
      salePrice: 99000,
      discount: '-60%',
      address: '157 Xuân Thủy, Cầu Giấy, Hà Nội'
    },
    likes: 640,
    commentsCount: 89,
    shares: 45,
    comments: [
      { id: 'c-7', author: 'Hoàng Anh', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', text: 'Mình từng đi ở đây 2 lần rồi, nước bồ kết nấu thơm nức mũi, bấm huyệt bao phê luôn ạ!', time: '3 giờ trước' }
    ]
  }
];

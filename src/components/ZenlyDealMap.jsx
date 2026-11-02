import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Navigation, 
  MapPin, 
  Store, 
  Ticket,
  Compass,
  Layers,
  ChevronRight,
  X,
  Minus,
  ExternalLink
} from 'lucide-react';

export const NATIONWIDE_DEALS = [
  {
    id: 'deal-hn-1',
    title: 'Set Lẩu Nướng Bò Mỹ Thượng Hạng 4 Người',
    category: 'food',
    badge: '-55%',
    salePrice: 289000,
    originalPrice: 650000,
    discount: '-55%',
    storeName: 'Bulgogi King - Lẩu Nướng Hàn Quốc',
    city: 'Hà Nội',
    address: '12 Liễu Giai, Ba Đình, Hà Nội',
    distance: '650m',
    lat: 21.0320,
    lng: 105.8140,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    description: 'Bò Mỹ tươi ngon nướng xèo xèo cuốn kim chi sốt Bulgogi, rau nấm và nước ngọt gọi thả ga.'
  },
  {
    id: 'deal-hn-2',
    title: 'Gói Chơi Billiards Máy Lạnh 3 Giờ + Tặng 2 Cafe Muối',
    category: 'billiards',
    badge: '-59%',
    salePrice: 99000,
    originalPrice: 240000,
    discount: '-59%',
    storeName: 'Ares Billiards & Lounge Club',
    city: 'Hà Nội',
    address: '157 Xuân Thủy, Cầu Giấy, Hà Nội',
    distance: '320m',
    lat: 21.0368,
    lng: 105.7828,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    description: 'Bàn Aileex 9020 chuẩn thi đấu quốc tế, cơ mới tinh êm tay, phòng điều hòa mát lạnh 24/24.'
  },
  {
    id: 'deal-hn-3',
    title: 'Áo Thun Unisex Cotton 100% 250GSM Form Rộng',
    category: 'fashion',
    badge: '-54%',
    salePrice: 129000,
    originalPrice: 280000,
    discount: '-54%',
    storeName: 'Local Streetwear Studio',
    city: 'Hà Nội',
    address: '82 Chùa Bộc, Đống Đa, Hà Nội',
    distance: '1.8km',
    lat: 21.0080,
    lng: 105.8272,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: 'Vải cotton 2 chiều dày dặn không bai xù cổ, ghé showroom thử đồ nhận voucher giảm thêm.'
  },
  {
    id: 'deal-hcm-1',
    title: 'Combo 2 Vé Xem Phim 2D + 1 Bắp Rang Bơ & 2 Nước Ngọt',
    category: 'cinema',
    badge: '-50%',
    salePrice: 145000,
    originalPrice: 290000,
    discount: '-50%',
    storeName: 'CineStar Complex Cinema',
    city: 'TP. Hồ Chí Minh',
    address: '135 Hai Bà Trưng, Quận 1, TP. Hồ Chí Minh',
    distance: '850m',
    lat: 10.7915,
    lng: 106.6740,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    description: 'Áp dụng cho mọi suất chiếu phim rạp cuối tuần, phòng chiếu laser âm thanh vòm Dolby Atmos.'
  },
  {
    id: 'deal-hcm-2',
    title: 'Rửa Xe Bọt Tuyết + Hút Bụi & Khử Mùi Nội Thất Sonax',
    category: 'services',
    badge: '-56%',
    salePrice: 79000,
    originalPrice: 180000,
    discount: '-56%',
    storeName: 'Auto Care & Detailing Pro',
    city: 'TP. Hồ Chí Minh',
    address: '215 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
    distance: '1.1km',
    lat: 10.7645,
    lng: 106.6875,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80',
    description: 'Quy trình 6 bước rửa bằng dung dịch Sonax của Đức, xịt gầm chống rỉ và lau khô microfiber.'
  },
  {
    id: 'deal-dn-1',
    title: 'Combo 2 Ly Trà Sữa Ô Long Nướng + Bánh Mì Phô Mai',
    category: 'coffee',
    badge: '-55%',
    salePrice: 59000,
    originalPrice: 130000,
    discount: '-55%',
    storeName: 'Kohi Tea & Coffee Roastery',
    city: 'Đà Nẵng',
    address: '45 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    distance: '800m',
    lat: 16.0610,
    lng: 108.2185,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&auto=format&fit=crop&q=80',
    description: 'Trà ô long nướng thơm lừng, trân châu hoàng kim dẻo mềm, không gian máy lạnh view kính ngắm phố.'
  },
  {
    id: 'deal-dn-2',
    title: 'Chơi Game PS5 Màn Hình 65 Inch 4K 120Hz 2 Giờ',
    category: 'billiards',
    badge: '-51%',
    salePrice: 79000,
    originalPrice: 160000,
    discount: '-51%',
    storeName: 'NextGen Gaming & PS5 Lounge',
    city: 'Đà Nẵng',
    address: '120 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
    distance: '1.4km',
    lat: 16.0680,
    lng: 108.1960,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    description: 'Máy PlayStation 5 thế hệ mới kèm 2 tay cầm DualSense, có FC24, Black Myth: Wukong, Mortal Kombat 1.'
  },
  {
    id: 'deal-hn-4',
    title: 'Buffet Tokbokki Phô Mai & Gà Rán Cay Không Giới Hạn',
    category: 'food',
    badge: '-50%',
    salePrice: 159000,
    originalPrice: 320000,
    discount: '-50%',
    storeName: 'K-Street Tokbokki & Chicken',
    city: 'Hà Nội',
    address: '18 Chùa Láng, Đống Đa, Hà Nội',
    distance: '500m',
    lat: 21.0245,
    lng: 105.8020,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    description: 'Quầy line hơn 30 món tokbokki phô mai kéo sợi, gà rán sốt cay giòn rụm và rau củ nhúng lẩu thả ga.'
  },
  {
    id: 'deal-hn-5',
    title: 'Bát Phở Bò Thăn Lõi Gầu Giòn Hầm Xương 24 Giờ',
    category: 'food',
    badge: '-40%',
    salePrice: 45000,
    originalPrice: 75000,
    discount: '-40%',
    storeName: 'Phở Gia Truyền Bát Đàn Phố Cổ',
    city: 'Hà Nội',
    address: '49 Bát Đàn, Hoàn Kiếm, Hà Nội',
    distance: '1.5km',
    lat: 21.0340,
    lng: 105.8470,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop&q=80',
    description: 'Nước dùng trong veo ngọt từ tủy xương hầm, thịt thăn mềm ngọt giòn sần sật ăn kèm quẩy giòn.'
  },
  {
    id: 'deal-hn-6',
    title: 'Combo 2 Ly Cà Phê Muối Kem Béo + Bánh Mì Chảo Bò',
    category: 'coffee',
    badge: '-46%',
    salePrice: 59000,
    originalPrice: 110000,
    discount: '-46%',
    storeName: 'Cà Phê Muối Xứ Huế & Bữa Sáng',
    city: 'Hà Nội',
    address: '76 Nguyễn Khang, Cầu Giấy, Hà Nội',
    distance: '420m',
    lat: 21.0180,
    lng: 105.7990,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Cà phê Robusta Đắk Lắk béo ngậy kem muối hòa quyện, kèm bánh mì chảo pate lòng đào nóng hổi.'
  },
  {
    id: 'deal-hcm-3',
    title: 'Pizza Bò Bắp Nướng Củi Viền Phô Mai + Khoai Tây Lắc',
    category: 'food',
    badge: '-48%',
    salePrice: 189000,
    originalPrice: 360000,
    discount: '-48%',
    storeName: 'Wood-Fired Crust Pizza & Pasta',
    city: 'TP. Hồ Chí Minh',
    address: '42 Trần Cao Vân, Quận 3, TP. Hồ Chí Minh',
    distance: '620m',
    lat: 10.7830,
    lng: 106.6940,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    description: 'Bột ủ men tươi 48h nướng lò củi phô mai Mozzarella chảy béo ngậy kèm thịt bò xay ướp gia vị Ý.'
  },
  {
    id: 'deal-hcm-4',
    title: 'Cơm Tấm Sườn Cọng Nướng Than Hoa + Chả Cua Ba Cường',
    category: 'food',
    badge: '-42%',
    salePrice: 49000,
    originalPrice: 85000,
    discount: '-42%',
    storeName: 'Cơm Tấm Đêm Ba Cường Sài Gòn',
    city: 'TP. Hồ Chí Minh',
    address: '189 Đinh Tiên Hoàng, Quận 1, TP. Hồ Chí Minh',
    distance: '700m',
    lat: 10.7930,
    lng: 106.6970,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Sườn cọng nướng than hoa thơm lừng mỡ màng, chả cua hoàng kim đậm đà nước mắm kẹo ngọt ngào.'
  },
  {
    id: 'deal-hcm-5',
    title: 'Cold Brew Cam Sả Cỡ Lớn + Bánh Croissant Bơ Pháp',
    category: 'coffee',
    badge: '-52%',
    salePrice: 69000,
    originalPrice: 145000,
    discount: '-52%',
    storeName: 'The Hideout Cafe & Bakery',
    city: 'TP. Hồ Chí Minh',
    address: '58 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh',
    distance: '900m',
    lat: 10.7790,
    lng: 106.6920,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    description: 'Arabica Cầu Đất ủ lạnh 18h thơm mát, croissant nướng nóng hổi ngập tràn bơ Pháp thơm nức mũi.'
  }
];

const CITY_CENTERS = {
  'Hà Nội': { center: [21.0320, 105.8050], zoom: 14 },
  'TP. Hồ Chí Minh': { center: [10.7760, 106.6850], zoom: 14 },
  'Đà Nẵng': { center: [16.0650, 108.2100], zoom: 14 },
  'Toàn quốc': { center: [16.0470, 108.2062], zoom: 6 }
};

export default function ZenlyDealMap({ onSelectDeal, onSaveDeal, selectedCity = 'Hà Nội' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeCityTab, setActiveCityTab] = useState('Hà Nội');
  const [selectedMapDeal, setSelectedMapDeal] = useState(NATIONWIDE_DEALS[0]);
  const [mapType, setMapType] = useState('google-roadmap');

  const TILE_URLS = {
    'google-roadmap': 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    'google-satellite': 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
  };

  useEffect(() => {
    if (selectedCity && selectedCity !== 'Toàn quốc' && CITY_CENTERS[selectedCity]) {
      setActiveCityTab(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initial = CITY_CENTERS['Hà Nội'];

    const map = L.map(mapContainerRef.current, {
      center: initial.center,
      zoom: initial.zoom,
      zoomControl: false,
      attributionControl: false
    });

    const tileLayer = L.tileLayer(TILE_URLS['google-roadmap'], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const cityInfo = CITY_CENTERS[activeCityTab] || CITY_CENTERS['Hà Nội'];
    mapInstanceRef.current.flyTo(cityInfo.center, cityInfo.zoom, { duration: 1 });
  }, [activeCityTab]);

  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(TILE_URLS[mapType]);
  }, [mapType]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filteredDeals = NATIONWIDE_DEALS.filter(deal => {
      return activeCityTab === 'Toàn quốc' || deal.city === activeCityTab;
    });

    filteredDeals.forEach(deal => {
      const isSelected = selectedMapDeal?.id === deal.id;
      const borderCol = isSelected ? '#16a34a' : '#ffffff';
      const shadowStyle = isSelected ? 'box-shadow: 0 0 0 3px rgba(22,163,74,0.45), 0 4px 12px rgba(0,0,0,0.3);' : 'box-shadow: 0 3px 8px rgba(0,0,0,0.25);';
      const scale = isSelected ? 'transform: scale(1.15);' : '';

      const markerHtml = `
        <div style="display:flex; flex-direction:column; align-items:center; cursor:pointer; user-select:none; width:52px; ${scale} transition:transform 0.2s;">
          <div style="background:#dc2626; color:white; font-size:9px; font-weight:900; padding:1px 6px; border-radius:9999px; box-shadow:0 2px 5px rgba(0,0,0,0.3); border:1px solid #ffffff; margin-bottom:2px; white-space:nowrap;">
            ${deal.badge}
          </div>
          <div style="width:38px; height:38px; border-radius:50%; border:2.5px solid ${borderCol}; overflow:hidden; background:#ffffff; ${shadowStyle}">
            <img src="${deal.image}" alt="" style="width:100%; height:100%; object-fit:cover; display:block;" />
          </div>
          <div style="width:6px; height:6px; background:${isSelected ? '#16a34a' : '#1f2937'}; border-radius:50%; margin-top:-3px; border:1px solid #ffffff;"></div>
          <div style="background:rgba(15,23,42,0.85); color:#ffffff; font-size:8px; font-weight:700; padding:1px 5px; border-radius:4px; margin-top:2px; white-space:nowrap; box-shadow:0 1px 3px rgba(0,0,0,0.3);">
            ${deal.distance}
          </div>
        </div>
      `;

      const dealIcon = L.divIcon({
        className: 'custom-deal-marker',
        html: markerHtml,
        iconSize: [52, 68],
        iconAnchor: [26, 60]
      });

      const marker = L.marker([deal.lat, deal.lng], { icon: dealIcon });

      marker.on('click', () => {
        setSelectedMapDeal(deal);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([deal.lat, deal.lng], 15, { duration: 0.6 });
        }
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [activeCityTab, selectedMapDeal]);

  return (
    <div className="w-full flex flex-col space-y-1.5">
      {/* City Switcher Row: Clean full width scrolling, no overlapping buttons */}
      <div className="px-3 pt-2 pb-1 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Toàn quốc'].map((city) => (
          <button
            key={city}
            onClick={() => setActiveCityTab(city)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
              activeCityTab === city
                ? 'bg-noti-500 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[360px] bg-gray-100 overflow-hidden shadow-inner isolate">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Map Type Switcher on Top-Right of Map (Never collides with city tabs!) */}
        <div className="absolute top-2.5 right-2.5 z-10 bg-white/95 backdrop-blur-md rounded-xl p-0.5 shadow-md border border-gray-200 flex text-[10px] font-bold">
          <button
            onClick={() => setMapType('google-roadmap')}
            className={`px-2 py-0.5 rounded-lg transition-colors ${
              mapType === 'google-roadmap' ? 'bg-noti-500 text-white shadow-2xs' : 'text-gray-600'
            }`}
          >
            Đường phố
          </button>
          <button
            onClick={() => setMapType('google-satellite')}
            className={`px-2 py-0.5 rounded-lg transition-colors ${
              mapType === 'google-satellite' ? 'bg-noti-500 text-white shadow-2xs' : 'text-gray-600'
            }`}
          >
            Vệ tinh
          </button>
        </div>

        {/* Floating Selected Deal Card at Bottom with CLOSE BUTTON (Dấu trừ / X ẩn đi) */}
        {selectedMapDeal && (
          <div className="absolute bottom-2.5 inset-x-2.5 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-gray-100 flex items-center gap-2.5">
            
            {/* Close / Minimize button at top-right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMapDeal(null);
              }}
              className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center shadow hover:bg-black transition-colors"
              title="Ẩn ưu đãi này"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Thumbnail: Clicking opens detail */}
            <div 
              onClick={() => onSelectDeal && onSelectDeal(selectedMapDeal)}
              className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer group"
            >
              <img
                src={selectedMapDeal.image}
                alt={selectedMapDeal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-0.5 left-0.5 bg-red-600 text-white text-[8px] font-black px-1 py-0.2 rounded">
                {selectedMapDeal.badge}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-noti-700 truncate">
                  {selectedMapDeal.storeName}
                </span>
                <span className="text-[9px] text-gray-400">
                  {selectedMapDeal.distance}
                </span>
              </div>

              {/* Title: Clickable to view details */}
              <h4 
                onClick={() => onSelectDeal && onSelectDeal(selectedMapDeal)}
                className="font-bold text-xs text-gray-900 truncate mt-0.5 cursor-pointer hover:text-noti-600"
              >
                {selectedMapDeal.title}
              </h4>

              <p className="text-[10px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-noti-600 flex-shrink-0" />
                <span>{selectedMapDeal.address}</span>
              </p>

              <div className="mt-1.5 flex items-center justify-between">
                <div>
                  <span className="text-red-600 font-black text-xs">
                    {selectedMapDeal.salePrice?.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="line-through text-gray-400 text-[10px] ml-1">
                    {selectedMapDeal.originalPrice?.toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onSelectDeal && onSelectDeal(selectedMapDeal)}
                    className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[10px] font-bold"
                  >
                    Chi tiết
                  </button>

                  <button
                    onClick={() => {
                      if (onSaveDeal) onSaveDeal(selectedMapDeal);
                    }}
                    className="px-2 py-0.5 bg-noti-500 hover:bg-noti-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-0.5 shadow-2xs"
                  >
                    <Ticket className="w-3 h-3" />
                    <span>Lưu kho</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nearby Deals List */}
      <div className="p-3 bg-white space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-gray-900">
            Quán xá & Điểm đến gần bạn tại {activeCityTab}
          </span>
          <span className="text-[10px] text-gray-500">
            {NATIONWIDE_DEALS.filter(d => activeCityTab === 'Toàn quốc' || d.city === activeCityTab).length} địa điểm
          </span>
        </div>

        <div className="space-y-2">
          {NATIONWIDE_DEALS.filter(d => activeCityTab === 'Toàn quốc' || d.city === activeCityTab).map((deal) => (
            <div
              key={deal.id}
              onClick={() => {
                setSelectedMapDeal(deal);
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo([deal.lat, deal.lng], 15, { duration: 0.6 });
                }
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${
                selectedMapDeal?.id === deal.id 
                  ? 'border-noti-500 bg-green-50/50' 
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-noti-700 font-bold truncate">{deal.storeName}</span>
                  <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1 rounded">{deal.badge}</span>
                </div>
                <p className="text-xs font-bold text-gray-900 truncate mt-0.5">{deal.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{deal.distance} • {deal.address}</span>
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-xs font-black text-red-600 block">
                  {deal.salePrice?.toLocaleString('vi-VN')}₫
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectDeal) onSelectDeal(deal);
                  }}
                  className="mt-1 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[9px] font-bold"
                >
                  Xem tin
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

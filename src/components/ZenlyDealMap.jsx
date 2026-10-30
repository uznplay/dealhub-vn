import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Navigation, 
  Footprints,
  ExternalLink,
  LocateFixed,
  ChevronRight,
  Store
} from 'lucide-react';

// Real coordinates across Vietnam (Hà Nội, TP.HCM, Đà Nẵng)
export const NATIONWIDE_DEALS = [
  {
    id: 'deal-hn-1',
    title: 'ToCoToCo Tea - Trà Sữa Mua 1 Tặng 1',
    category: 'fnb',
    icon: '🧋',
    badge: 'Giảm 55%',
    salePrice: 29000,
    originalPrice: 65000,
    discount: '-55%',
    storeName: 'ToCoToCo Tea Cầu Giấy',
    city: 'Hà Nội',
    address: '157 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    distance: '350m',
    walkingTime: '4 phút đi bộ',
    lat: 21.0368,
    lng: 105.7828,
    color: 'from-amber-400 to-orange-500',
    hot: true,
    image: 'https://images.unsplash.com/photo-1558857563-b37fc820a4b1?w=600&auto=format&fit=crop&q=80',
    description: 'Áp dụng cho khách hàng đến trực tiếp quán hoặc đặt qua DealHub. Tặng 01 ly trà sữa trân châu size M khi mua size L.'
  },
  {
    id: 'deal-hn-2',
    title: 'Cơm Đùi Gà Xối Mỡ Cô Ba Giòn Rụm',
    category: 'fnb',
    icon: '🍗',
    badge: 'Giảm 42%',
    salePrice: 32000,
    originalPrice: 55000,
    discount: '-42%',
    storeName: 'Quán Cơm Cô Ba',
    city: 'Hà Nội',
    address: '26 Ngõ 337 Cầu Giấy, Dịch Vọng, Cầu Giấy, Hà Nội',
    distance: '480m',
    walkingTime: '6 phút đi bộ',
    lat: 21.0345,
    lng: 105.7950,
    color: 'from-red-500 to-rose-600',
    hot: true,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
    description: 'Đùi gà xối mỡ giòn rụm bên ngoài, mềm thơm bên trong kèm cơm hoàng bào và canh súp miễn phí.'
  },
  {
    id: 'deal-hcm-1',
    title: 'Củ Sạc Nhanh Baseus GaN 30W Type-C Chuẩn PD',
    category: 'tech',
    icon: '⚡',
    badge: 'Giảm 68%',
    salePrice: 89000,
    originalPrice: 280000,
    discount: '-68%',
    storeName: 'Phụ Kiện Số Sài Gòn',
    city: 'TP. Hồ Chí Minh',
    address: '215 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP. Hồ Chí Minh',
    distance: '1.2km',
    walkingTime: '4 phút đi xe máy',
    lat: 10.7645,
    lng: 106.6875,
    color: 'from-blue-500 to-indigo-600',
    hot: true,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    description: 'Bảo hành chính hãng 12 tháng 1 đổi 1. Hỗ trợ sạc nhanh cho iPhone, Samsung, Xiaomi.'
  },
  {
    id: 'deal-hcm-2',
    title: 'Áo Thun Cotton Form Rộng Unisex Nhiều Màu',
    category: 'fashion',
    icon: '👕',
    badge: 'Đồng giá 79K',
    salePrice: 79000,
    originalPrice: 180000,
    discount: '-56%',
    storeName: 'Basic Wear Vietnam',
    city: 'TP. Hồ Chí Minh',
    address: '104 Lê Văn Sỹ, Phường 10, Quận 3, TP. Hồ Chí Minh',
    distance: '850m',
    walkingTime: '10 phút đi bộ',
    lat: 10.7915,
    lng: 106.6740,
    color: 'from-pink-500 to-purple-600',
    hot: false,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: 'Vải cotton 100% 2 chiều thấm hút mồ hôi, bao giặt máy không bai xù. Đầy đủ size từ M đến XXL.'
  },
  {
    id: 'deal-dn-1',
    title: 'Buffet Nướng & Lẩu Hàn Quốc - Giảm 50% Đi 4 Tính 2',
    category: 'fnb',
    icon: '🥩',
    badge: 'Giảm 50%',
    salePrice: 149000,
    originalPrice: 299000,
    discount: '-50%',
    storeName: 'K-BBQ Restaurant',
    city: 'Đà Nẵng',
    address: '45 Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng',
    distance: '900m',
    walkingTime: '3 phút đi xe máy',
    lat: 16.0610,
    lng: 108.2185,
    color: 'from-orange-500 to-red-600',
    hot: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    description: 'Áp dụng toàn bộ menu buffet nướng lẩu buổi trưa và tối. Vui lòng đặt bàn trước 1 tiếng.'
  },
  {
    id: 'deal-dn-2',
    title: 'Thanh Lý Màn Hình Đồ Họa Dell 24 Inch IPS',
    category: 'tech',
    icon: '🖥️',
    badge: 'Giảm 45%',
    salePrice: 1550000,
    originalPrice: 2800000,
    discount: '-45%',
    storeName: 'Nguyễn Văn Minh (Cá nhân)',
    city: 'Đà Nẵng',
    address: '120 Điện Biên Phủ, Chính Gián, Thanh Khê, Đà Nẵng',
    distance: '1.5km',
    walkingTime: '5 phút đi xe máy',
    lat: 16.0680,
    lng: 108.1960,
    color: 'from-blue-600 to-cyan-600',
    hot: false,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    description: 'Màn hình không điểm chết, viền mỏng, hiển thị màu sắc chuẩn cho đồ họa văn phòng. Còn bảo hành 8 tháng.'
  }
];

// City Center Coordinates
const CITY_CENTERS = {
  'Hà Nội': { center: [21.0340, 105.7890], zoom: 14 },
  'TP. Hồ Chí Minh': { center: [10.7760, 106.6900], zoom: 14 },
  'Đà Nẵng': { center: [16.0650, 108.2100], zoom: 14 },
  'Toàn quốc': { center: [16.0470, 108.2062], zoom: 6 }
};

export default function ZenlyDealMap({ onSelectDeal, selectedCity = 'Hà Nội' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeCityTab, setActiveCityTab] = useState('Hà Nội');
  const [selectedMapDeal, setSelectedMapDeal] = useState(NATIONWIDE_DEALS[0]);
  const [mapCategory, setMapCategory] = useState('all');
  const [mapType, setMapType] = useState('google-roadmap'); // 'google-roadmap' | 'google-satellite'

  const TILE_URLS = {
    'google-roadmap': 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    'google-satellite': 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
  };

  // Sync with parent selectedCity if provided
  useEffect(() => {
    if (selectedCity && selectedCity !== 'Toàn quốc' && CITY_CENTERS[selectedCity]) {
      setActiveCityTab(selectedCity);
    }
  }, [selectedCity]);

  // Initialize Map
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

    // Layer group for deals
    markersLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle City Change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const cityInfo = CITY_CENTERS[activeCityTab] || CITY_CENTERS['Hà Nội'];
    mapInstanceRef.current.flyTo(cityInfo.center, cityInfo.zoom, { duration: 1 });
  }, [activeCityTab]);

  // Switch Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(TILE_URLS[mapType]);
  }, [mapType]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filteredDeals = NATIONWIDE_DEALS.filter(deal => {
      const matchCity = activeCityTab === 'Toàn quốc' || deal.city === activeCityTab;
      const matchCat = mapCategory === 'all' || deal.category === mapCategory;
      return matchCity && matchCat;
    });

    filteredDeals.forEach(deal => {
      const isSelected = selectedMapDeal?.id === deal.id;

      const markerHtml = `
        <div class="relative group cursor-pointer" id="marker-${deal.id}">
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-black shadow-md transition-all ${
            isSelected 
              ? 'bg-red-600 text-white ring-2 ring-white scale-110' 
              : 'bg-white text-gray-800 border border-gray-200'
          }">
            ${deal.badge}
          </div>

          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br ${deal.color} border-2 border-white shadow-lg flex items-center justify-center text-base text-white transform transition-transform hover:scale-120 ${
            isSelected ? 'ring-4 ring-noti-500 scale-115' : ''
          }">
            <span>${deal.icon}</span>
          </div>

          <div class="mt-0.5 text-center">
            <span class="bg-gray-900/80 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow">
              ${deal.distance}
            </span>
          </div>
        </div>
      `;

      const dealIcon = L.divIcon({
        className: 'zenly-marker',
        html: markerHtml,
        iconSize: [40, 50],
        iconAnchor: [20, 25]
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
  }, [activeCityTab, mapCategory, selectedMapDeal]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>Bản Đồ Khuyến Mãi Quanh Bạn</span>
            <span className="text-xs bg-noti-50 text-noti-700 font-bold px-2 py-0.5 rounded-md border border-noti-200">
              Toàn quốc
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Tìm kiếm các cửa hàng và dịch vụ đang áp dụng chương trình giảm giá gần vị trí của bạn
          </p>
        </div>

        {/* City selection pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Toàn quốc'].map((city) => (
            <button
              key={city}
              onClick={() => setActiveCityTab(city)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCityTab === city
                  ? 'bg-noti-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Box */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-[500px] sm:h-[540px] bg-gray-100">
        
        {/* Leaflet Container */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Top-Right Controls */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
          {/* Switch Roadmap / Satellite */}
          <div className="bg-white/95 backdrop-blur-sm p-1 rounded-xl shadow border border-gray-200 flex gap-1">
            <button
              onClick={() => setMapType('google-roadmap')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors ${
                mapType === 'google-roadmap'
                  ? 'bg-noti-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Đường phố
            </button>
            <button
              onClick={() => setMapType('google-satellite')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors ${
                mapType === 'google-satellite'
                  ? 'bg-noti-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vệ tinh
            </button>
          </div>

          {/* Reset position */}
          <button
            onClick={() => {
              const info = CITY_CENTERS[activeCityTab] || CITY_CENTERS['Hà Nội'];
              if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo(info.center, info.zoom);
              }
            }}
            className="w-9 h-9 rounded-xl bg-white shadow border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors self-end"
            title="Định vị lại khu vực"
          >
            <LocateFixed className="w-4 h-4 text-noti-600" />
          </button>
        </div>

        {/* Bottom Floating Card */}
        {selectedMapDeal && (
          <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] z-[400] bg-white rounded-2xl p-3.5 shadow-xl border border-gray-200">
            <div className="flex gap-3">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={selectedMapDeal.image}
                  alt={selectedMapDeal.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                  {selectedMapDeal.discount}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-noti-700 truncate max-w-[150px]">
                      {selectedMapDeal.storeName}
                    </span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-1.5 py-0.5 rounded">
                      {selectedMapDeal.distance}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-gray-900 line-clamp-1 mt-0.5">
                    {selectedMapDeal.title}
                  </h4>

                  <p className="text-[10px] text-gray-500 truncate mt-0.5">
                    {selectedMapDeal.address}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-600 font-black text-sm">
                      {selectedMapDeal.salePrice.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-[10px] text-gray-400 line-through">
                      {selectedMapDeal.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(selectedMapDeal.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      title="Chỉ đường Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onSelectDeal(selectedMapDeal)}
                      className="px-2.5 py-1.5 bg-noti-500 hover:bg-noti-600 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

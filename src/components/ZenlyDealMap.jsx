import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Navigation, 
  LocateFixed,
  ChevronRight,
  Heart,
  Sparkles
} from 'lucide-react';

// Real coordinates across Vietnam for Spa, Beauty, Fashion & Cosmetics
export const NATIONWIDE_DEALS = [
  {
    id: 'deal-hn-1',
    title: 'An Nhiên Beauty Spa - Chăm Sóc Da Y Khoa 12 Bước',
    category: 'spa',
    icon: '💆‍♀️',
    badge: 'Giảm 62%',
    salePrice: 189000,
    originalPrice: 500000,
    discount: '-62%',
    storeName: 'An Nhiên Beauty & Clinic Spa',
    city: 'Hà Nội',
    address: '12 Liễu Giai, Ba Đình, Hà Nội',
    distance: '650m',
    walkingTime: '7 phút đi bộ',
    lat: 21.0320,
    lng: 105.8140,
    color: 'from-rose-500 to-pink-600',
    hot: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    description: 'Quy trình chuẩn y khoa: Lấy nhân mụn không đau, đắp mặt nạ dịu da và chiếu đèn ánh sáng sinh học.'
  },
  {
    id: 'deal-hn-2',
    title: 'Mộc Trà Dưỡng Sinh - Gội Đầu Thảo Dược 75 Phút',
    category: 'hair_salon',
    icon: '🌿',
    badge: 'Đồng giá 99K',
    salePrice: 99000,
    originalPrice: 250000,
    discount: '-60%',
    storeName: 'Mộc Trà Dưỡng Sinh Spa',
    city: 'Hà Nội',
    address: '157 Xuân Thủy, Cầu Giấy, Hà Nội',
    distance: '320m',
    walkingTime: '4 phút đi bộ',
    lat: 21.0368,
    lng: 105.7828,
    color: 'from-emerald-500 to-teal-600',
    hot: true,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&auto=format&fit=crop&q=80',
    description: 'Nấu nước từ 18 vị thảo mộc thiên nhiên, massage bấm huyệt đả thông kinh lạc vai gáy.'
  },
  {
    id: 'deal-hn-3',
    title: 'The Cosmo Club - Áo Blazer Form Rộng Unisex',
    category: 'fashion',
    icon: '👗',
    badge: 'Giảm 53%',
    salePrice: 199000,
    originalPrice: 420000,
    discount: '-53%',
    storeName: 'The Cosmo Club',
    city: 'Hà Nội',
    address: '82 Chùa Bộc, Đống Đa, Hà Nội',
    distance: '1.8km',
    walkingTime: '5 phút đi xe máy',
    lat: 21.0080,
    lng: 105.8272,
    color: 'from-pink-500 to-purple-600',
    hot: false,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
    description: 'Vải tuyết mưa đứng form không nhăn, lót lụa 2 lớp cực chuẩn cho nàng và chàng.'
  },
  {
    id: 'deal-hcm-1',
    title: 'Chic Studio - Đầm Thiết Kế Lụa Tơ Tằm Đi Tiệc',
    category: 'fashion',
    icon: '✨',
    badge: 'Giảm 55%',
    salePrice: 249000,
    originalPrice: 550000,
    discount: '-55%',
    storeName: 'Chic Studio Thời Trang Thiết Kế',
    city: 'TP. Hồ Chí Minh',
    address: '104 Lê Văn Sỹ, Phường 10, Quận 3, TP. Hồ Chí Minh',
    distance: '850m',
    walkingTime: '9 phút đi bộ',
    lat: 10.7915,
    lng: 106.6740,
    color: 'from-amber-400 to-rose-500',
    hot: true,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    description: 'Lụa tơ tằm mềm mịn mát tay, tôn dáng che khuyết điểm, đủ size S, M, L.'
  },
  {
    id: 'deal-hcm-2',
    title: 'Luna Nail Bar - Làm Nail Hàn Quốc Đính Đá',
    category: 'nail_eyelash',
    icon: '💅',
    badge: 'Đồng giá 99K',
    salePrice: 99000,
    originalPrice: 220000,
    discount: '-55%',
    storeName: 'Luna Nail & Eyelash Bar',
    city: 'TP. Hồ Chí Minh',
    address: '215 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
    distance: '1.1km',
    walkingTime: '4 phút đi xe máy',
    lat: 10.7645,
    lng: 106.6875,
    color: 'from-purple-500 to-indigo-600',
    hot: false,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=80',
    description: 'Sơn gel bền màu trên 4 tuần, đính đá phong cách tiểu thư Hàn Quốc sang chảnh.'
  },
  {
    id: 'deal-dn-1',
    title: 'Beauty Garden - Combo Serum B5 & Kem Chống Nắng',
    category: 'cosmetics',
    icon: '💄',
    badge: 'Giảm 42%',
    salePrice: 489000,
    originalPrice: 850000,
    discount: '-42%',
    storeName: 'Beauty Garden Mỹ Phẩm',
    city: 'Đà Nẵng',
    address: '45 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    distance: '800m',
    walkingTime: '3 phút đi xe máy',
    lat: 16.0610,
    lng: 108.2185,
    color: 'from-rose-500 to-red-600',
    hot: true,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    description: 'Mỹ phẩm chính hãng 100% tem phụ, dưỡng ẩm phục hồi và chống nắng toàn diện.'
  },
  {
    id: 'deal-dn-2',
    title: 'Seoul Center Clinic - Triệt Lông Diode Laser',
    category: 'spa',
    icon: '⚡',
    badge: 'Giảm 71%',
    salePrice: 350000,
    originalPrice: 1200000,
    discount: '-71%',
    storeName: 'Seoul Center Beauty Clinic',
    city: 'Đà Nẵng',
    address: '120 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
    distance: '1.4km',
    walkingTime: '5 phút đi xe máy',
    lat: 16.0680,
    lng: 108.1960,
    color: 'from-blue-500 to-cyan-600',
    hot: false,
    image: 'https://images.unsplash.com/photo-1512290900672-1f55a1538350?w=600&auto=format&fit=crop&q=80',
    description: 'Đầu lạnh âm 5 độ C không đau rát, se khít chân lông, bảo hành 5 năm toàn quốc.'
  }
];

const CITY_CENTERS = {
  'Hà Nội': { center: [21.0320, 105.8050], zoom: 14 },
  'TP. Hồ Chí Minh': { center: [10.7760, 106.6850], zoom: 14 },
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
              ? 'bg-rose-600 text-white ring-2 ring-white scale-110' 
              : 'bg-white text-gray-800 border border-gray-200'
          }">
            ${deal.badge}
          </div>

          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br ${deal.color} border-2 border-white shadow-lg flex items-center justify-center text-base text-white transform transition-transform hover:scale-120 ${
            isSelected ? 'ring-4 ring-rose-400 scale-115' : ''
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>Bản Đồ Spa, Làm Đẹp & Thời Trang</span>
            <span className="text-xs bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-md border border-rose-200">
              Chuyên biệt sắc đẹp
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Định vị các tiệm Spa, thẩm mỹ viện, nail bar và shop thời trang đang có ưu đãi gần bạn
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
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Top-Right Controls */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
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
                    <span className="text-[10px] font-bold text-rose-600 truncate max-w-[150px]">
                      {selectedMapDeal.storeName}
                    </span>
                    <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded">
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

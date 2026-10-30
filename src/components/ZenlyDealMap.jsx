import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Navigation, 
  MapPin, 
  Store, 
  Ticket,
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';

export const NATIONWIDE_DEALS = [
  {
    id: 'deal-hn-1',
    title: 'Chăm Sóc Da Y Khoa Chuyên Sâu 12 Bước',
    category: 'spa',
    badge: '-62%',
    salePrice: 189000,
    originalPrice: 500000,
    discount: '-62%',
    storeName: 'An Nhiên Beauty & Clinic Spa',
    city: 'Hà Nội',
    address: '12 Liễu Giai, Ba Đình, Hà Nội',
    distance: '650m',
    lat: 21.0320,
    lng: 105.8140,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    description: 'Quy trình y khoa: Khử khuẩn, lấy nhân mụn bằng tăm bông, đắp mặt nạ bạc hà dịu da và chiếu đèn sinh học.'
  },
  {
    id: 'deal-hn-2',
    title: 'Gội Đầu Dưỡng Sinh Thảo Dược 75 Phút',
    category: 'hair_salon',
    badge: '-60%',
    salePrice: 99000,
    originalPrice: 250000,
    discount: '-60%',
    storeName: 'Mộc Trà Dưỡng Sinh Spa',
    city: 'Hà Nội',
    address: '157 Xuân Thủy, Cầu Giấy, Hà Nội',
    distance: '320m',
    lat: 21.0368,
    lng: 105.7828,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&auto=format&fit=crop&q=80',
    description: 'Nấu nước từ 18 vị thảo mộc thiên nhiên, massage bấm huyệt đả thông kinh lạc vai gáy.'
  },
  {
    id: 'deal-hn-3',
    title: 'Áo Blazer Unisex Form Rộng Dáng Dài',
    category: 'fashion',
    badge: '-53%',
    salePrice: 199000,
    originalPrice: 420000,
    discount: '-53%',
    storeName: 'The Cosmo Club - Showroom',
    city: 'Hà Nội',
    address: '82 Chùa Bộc, Đống Đa, Hà Nội',
    distance: '1.8km',
    lat: 21.0080,
    lng: 105.8272,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
    description: 'Vải tuyết mưa đứng form không nhăn, lót lụa 2 lớp cực chuẩn cho khách ghé thử đồ tại cửa hàng.'
  },
  {
    id: 'deal-hcm-1',
    title: 'Đầm Lụa Tơ Tằm Dáng Xòe Đi Tiệc',
    category: 'fashion',
    badge: '-55%',
    salePrice: 249000,
    originalPrice: 550000,
    discount: '-55%',
    storeName: 'Chic Studio Thời Trang Thiết Kế',
    city: 'TP. Hồ Chí Minh',
    address: '104 Lê Văn Sỹ, Phường 10, Quận 3, TP. Hồ Chí Minh',
    distance: '850m',
    lat: 10.7915,
    lng: 106.6740,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    description: 'Lụa tơ tằm mềm mịn mát tay, tôn dáng che khuyết điểm, áp dụng khi lưu mã đến thử trực tiếp tại showroom.'
  },
  {
    id: 'deal-hcm-2',
    title: 'Làm Nail Hàn Quốc Đính Đá Sang Trọng',
    category: 'nail_eyelash',
    badge: '-55%',
    salePrice: 99000,
    originalPrice: 220000,
    discount: '-55%',
    storeName: 'Luna Nail & Eyelash Bar',
    city: 'TP. Hồ Chí Minh',
    address: '215 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
    distance: '1.1km',
    lat: 10.7645,
    lng: 106.6875,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=80',
    description: 'Sơn gel bền màu trên 4 tuần không bong tróc, đính đá phong cách tiểu thư Hàn Quốc.'
  },
  {
    id: 'deal-dn-1',
    title: 'Combo Serum B5 & Kem Chống Nắng',
    category: 'cosmetics',
    badge: '-42%',
    salePrice: 489000,
    originalPrice: 850000,
    discount: '-42%',
    storeName: 'Beauty Garden Mỹ Phẩm Chính Hãng',
    city: 'Đà Nẵng',
    address: '45 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    distance: '800m',
    lat: 16.0610,
    lng: 108.2185,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    description: 'Mỹ phẩm chính hãng 100% có tem phụ, trải nghiệm mẫu thử miễn phí tại quầy.'
  },
  {
    id: 'deal-dn-2',
    title: 'Triệt Lông Vĩnh Viễn Diode Laser',
    category: 'spa',
    badge: '-71%',
    salePrice: 350000,
    originalPrice: 1200000,
    discount: '-71%',
    storeName: 'Seoul Center Beauty Clinic',
    city: 'Đà Nẵng',
    address: '120 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
    distance: '1.4km',
    lat: 16.0680,
    lng: 108.1960,
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

      const markerHtml = `
        <div class="relative cursor-pointer select-none">
          <div class="px-2 py-0.5 rounded-full text-[10px] font-black shadow-md border flex items-center gap-1 transition-transform ${
            isSelected 
              ? 'bg-noti-600 text-white border-white scale-110 ring-2 ring-noti-400' 
              : 'bg-white text-gray-900 border-gray-300 hover:scale-105'
          }">
            <span class="w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-yellow-300' : 'bg-noti-500'}"></span>
            <span>${deal.badge}</span>
          </div>
          <div class="w-2 h-2 bg-noti-600 rotate-45 mx-auto -mt-1 ${isSelected ? 'bg-noti-600' : 'bg-gray-700'}"></div>
        </div>
      `;

      const dealIcon = L.divIcon({
        className: 'custom-deal-marker',
        html: markerHtml,
        iconSize: [60, 30],
        iconAnchor: [30, 28]
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
    <div className="w-full flex flex-col space-y-2">
      {/* City Switcher Bar */}
      <div className="px-3 pt-2 flex items-center justify-between gap-1">
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-[11px] font-bold">
          {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Toàn quốc'].map((city) => (
            <button
              key={city}
              onClick={() => setActiveCityTab(city)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                activeCityTab === city
                  ? 'bg-noti-500 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Map Type toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-[10px] font-bold flex-shrink-0">
          <button
            onClick={() => setMapType('google-roadmap')}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              mapType === 'google-roadmap' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500'
            }`}
          >
            Đường phố
          </button>
          <button
            onClick={() => setMapType('google-satellite')}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              mapType === 'google-satellite' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500'
            }`}
          >
            Vệ tinh
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[460px] bg-gray-100 overflow-hidden shadow-inner isolate">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Selected Deal Card at Bottom */}
        {selectedMapDeal && (
          <div className="absolute bottom-3 inset-x-3 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-gray-100 flex items-center gap-2.5">
            <img
              src={selectedMapDeal.image}
              alt={selectedMapDeal.title}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-noti-700 truncate">
                  {selectedMapDeal.storeName}
                </span>
                <span className="text-[9px] bg-red-100 text-red-700 font-black px-1.5 py-0.2 rounded">
                  {selectedMapDeal.badge}
                </span>
              </div>

              <h4 className="font-bold text-xs text-gray-900 truncate mt-0.5">
                {selectedMapDeal.title}
              </h4>

              <p className="text-[10px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-noti-600 flex-shrink-0" />
                <span>{selectedMapDeal.address} • Cách {selectedMapDeal.distance}</span>
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

                <button
                  onClick={() => {
                    if (onSaveDeal) onSaveDeal(selectedMapDeal);
                  }}
                  className="px-2.5 py-1 bg-noti-500 hover:bg-noti-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs active:scale-95 transition-transform"
                >
                  <Ticket className="w-3 h-3" />
                  <span>Lưu kho</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nearby Deals Horizontal List */}
      <div className="p-3 bg-white space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-gray-900">
            Tiệm gần bạn tại {activeCityTab}
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
                <p className="text-[10px] text-noti-700 font-bold truncate">{deal.storeName}</p>
                <p className="text-xs font-bold text-gray-900 truncate">{deal.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{deal.distance} • {deal.address}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-black text-red-600 block">
                  {deal.salePrice?.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-[9px] text-gray-400 line-through">
                  {deal.originalPrice?.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

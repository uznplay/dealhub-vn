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

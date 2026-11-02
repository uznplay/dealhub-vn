import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Bookmark, 
  Lightbulb, 
  X,
  Store,
  MapPin
} from 'lucide-react';

const SMART_PRESETS = [
  'Set lẩu nướng bò Mỹ 4 người dưới 300k gần tôi',
  'Quán bida máy lạnh bàn chuẩn thi đấu tặng nước',
  'Combo 2 vé xem phim rạp kèm bắp nước cuối tuần',
  'Cafe muối view kính sống ảo chill'
];

export default function SmartDealFinder({ allDeals = [], onSelectDeal, onSaveDeal }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSearch = (customText) => {
    const searchText = (customText || query).trim().toLowerCase();
    if (!searchText) return;

    setAnalyzing(true);
    setResults(null);

    setTimeout(() => {
      let matched = [];
      let reason = '';

      if (searchText.includes('lẩu') || searchText.includes('nướng') || searchText.includes('ăn') || searchText.includes('gà') || searchText.includes('bò')) {
        matched = allDeals.filter(d => d.category === 'food');
        reason = 'Phù hợp vì set ăn no nê cho nhóm bạn/gia đình, thịt tươi ngon tẩm ướp đậm đà, giảm sâu hơn 50% có mã DealPass.';
      } else if (searchText.includes('bida') || searchText.includes('billiards') || searchText.includes('game') || searchText.includes('ps5')) {
        matched = allDeals.filter(d => d.category === 'billiards');
        reason = 'Phù hợp vì quán có phòng máy lạnh mát mẻ, bàn thi đấu chuẩn xịn hoặc máy game mới nhất kèm nước uống miễn phí.';
      } else if (searchText.includes('phim') || searchText.includes('vé') || searchText.includes('rạp') || searchText.includes('cinema')) {
        matched = allDeals.filter(d => d.category === 'cinema');
        reason = 'Phù hợp vì áp dụng trọn gói cả vé xem phim bom tấn + bắp nước khổng lồ mọi khung giờ cuối tuần.';
      } else if (searchText.includes('cafe') || searchText.includes('cà phê') || searchText.includes('trà sữa') || searchText.includes('uống')) {
        matched = allDeals.filter(d => d.category === 'coffee');
        reason = 'Phù hợp vì không gian đẹp mát mẻ, đồ uống pha chế ngon chuẩn vị Arabica/trà ô long nướng và có giá ưu đãi mua 1 tặng 1.';
      } else if (searchText.includes('áo') || searchText.includes('quần') || searchText.includes('thời trang') || searchText.includes('jean')) {
        matched = allDeals.filter(d => d.category === 'fashion');
        reason = 'Phù hợp vì các mẫu thời trang local brand hot trend, chất vải cotton/denim dày dặn bền đẹp có đủ size.';
      } else {
        matched = allDeals.slice(0, 3);
        reason = 'Đề xuất dựa trên các quán xá & dịch vụ được hội viên DealPass đánh giá 5 sao cao nhất quanh vị trí của bạn.';
      }

      setResults({
        deals: matched.length > 0 ? matched : allDeals.slice(0, 3),
        reason,
        queryText: customText || query
      });
      setAnalyzing(false);
    }, 450);
  };

  const handleClear = () => {
    setQuery('');
    setResults(null);
  };

  return (
    <div className="px-3 mt-4">
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-200/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-noti-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-noti-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 tracking-tight flex items-center gap-1.5">
                <span>Tìm Quán Ăn, Cafe & Chỗ Chơi Quanh Đây</span>
                <span className="text-[9px] bg-noti-500 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                  DealPass AI
                </span>
              </h3>
              <p className="text-[11px] text-gray-500">
                Nhập địa điểm hoặc dịch vụ bạn muốn trải nghiệm hôm nay
              </p>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="VD: lẩu nướng bò Mỹ 4 người, quán bida máy lạnh, vé xem phim..."
                className="w-full pl-9 pr-9 py-2.5 bg-white text-gray-800 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-noti-500 focus:border-transparent placeholder:text-gray-400 font-medium transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={analyzing || !query.trim()}
              className="px-5 py-2.5 bg-noti-500 hover:bg-noti-600 active:scale-95 text-white font-extrabold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5 disabled:opacity-60 flex-shrink-0"
            >
              {analyzing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang tìm kiếm...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Tìm Quán Ngay</span>
                </>
              )}
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-500 flex-wrap">
            <span className="font-semibold text-noti-700 flex items-center gap-1 text-[10px]">
              <Lightbulb className="w-3 h-3 text-amber-500" /> Gợi ý nhanh:
            </span>
            {SMART_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(p);
                  handleSearch(p);
                }}
                className="px-2 py-0.5 bg-white hover:bg-green-50 text-gray-700 hover:text-noti-700 rounded-md border border-gray-200 transition-colors text-[10px]"
              >
                {p}
              </button>
            ))}
          </div>

          {/* AI Result Card */}
          {results && (
            <div className="bg-white rounded-xl p-3 border border-green-200 space-y-2 mt-2 shadow-2xs animate-fade-in">
              <div className="flex items-start space-x-2 text-[11px] text-noti-800 bg-green-50 p-2 rounded-lg border border-green-100">
                <CheckCircle2 className="w-4 h-4 text-noti-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Lý do gợi ý cho "{results.queryText}":</span>{' '}
                  <span>{results.reason}</span>
                </div>
              </div>

              {/* Matched Deals List */}
              <div className="space-y-1.5">
                {results.deals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => onSelectDeal && onSelectDeal(deal)}
                    className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-gray-50 border border-gray-100 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative bg-gray-100">
                      <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-0.5 left-0.5 bg-red-600 text-white text-[8px] font-black px-1 rounded shadow">
                        {deal.discount}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-noti-700 truncate text-[11px]">{deal.storeName}</span>
                        <span className="text-[9px] bg-green-50 text-noti-700 px-1 py-0.2 rounded font-bold">{deal.distance}</span>
                      </div>
                      <h4 className="text-[11px] font-bold text-gray-900 truncate">
                        {deal.title}
                      </h4>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-red-600 font-black text-xs">
                          {deal.salePrice.toLocaleString()}₫
                        </span>
                        <span className="text-[9px] text-gray-400 line-through">
                          {deal.originalPrice.toLocaleString()}₫
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveDeal && onSaveDeal(deal);
                      }}
                      className="px-2.5 py-1.5 bg-noti-50 text-noti-700 hover:bg-noti-500 hover:text-white rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all active:scale-95 shrink-0"
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>Lưu deal</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  Bookmark,
  Lightbulb,
  X
} from 'lucide-react';

const SMART_PRESETS = [
  'Quán cà phê có ưu đãi, cách dưới 2km, có chỗ ngồi học và Wi-Fi',
  'Buffet nướng lẩu cho nhóm 4 người giá dưới 200k',
  'Củ sạc nhanh Type-C chính hãng giảm sâu gần tôi'
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

      if (searchText.includes('cà phê') || searchText.includes('học') || searchText.includes('wi-fi') || searchText.includes('cafe')) {
        matched = allDeals.filter(d => d.category === 'fnb' && (d.title.includes('Trà Sữa') || d.title.includes('ToCoToCo') || d.category === 'fnb'));
        reason = 'Phù hợp vì nằm trong bán kính 1.5km, có ưu đãi giảm tới 55% còn hạn và cửa hàng có chỗ ngồi học, Wi-Fi.';
      } else if (searchText.includes('lẩu') || searchText.includes('nướng') || searchText.includes('buffet') || searchText.includes('nhóm')) {
        matched = allDeals.filter(d => d.title.includes('Buffet') || d.title.includes('Lẩu') || d.title.includes('Nướng') || d.category === 'fnb');
        reason = 'Phù hợp vì áp dụng chương trình đi 4 tính 2 (tiết kiệm 50%), mức chi phí dưới 150.000₫/người.';
      } else if (searchText.includes('sạc') || searchText.includes('công nghệ') || searchText.includes('tai nghe')) {
        matched = allDeals.filter(d => d.category === 'tech');
        reason = 'Phù hợp vì phụ kiện chính hãng bảo hành 12 tháng, mức giảm sâu hơn 60% và có sẵn tại cửa hàng gần bạn.';
      } else {
        matched = allDeals.slice(0, 3);
        reason = 'Đề xuất dựa trên các ưu đãi đang được đánh giá cao nhất và có khoảng cách tối ưu.';
      }

      setResults({
        items: matched,
        explanation: reason,
        queryText: customText || query
      });
      setAnalyzing(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="bg-gradient-to-br from-white to-noti-50/70 rounded-3xl p-5 sm:p-7 shadow-sm border border-noti-100">
        
        {/* Title */}
        <div className="max-w-2xl mb-4">
          <div className="inline-flex items-center space-x-1.5 bg-noti-100 text-noti-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-noti-200">
            <Sparkles className="w-3.5 h-3.5 text-noti-600" />
            <span>SMART DEAL FINDER • TÌM ƯU ĐÃI THEO NHU CẦU</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Mô Tả Nhu Cầu Tự Nhiên Của Bạn
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Nhập tiêu chí cụ thể (khoảng cách, tiện ích, ngân sách, đi cùng ai) để nhận đề xuất ưu đãi chuẩn xác kèm lý do gợi ý.
          </p>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                placeholder="Ví dụ: Tôi muốn tìm quán cà phê có khuyến mãi, cách dưới 2 km, có chỗ ngồi học và giá hợp lý..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-xs sm:text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-noti-500 shadow-sm text-gray-800"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={analyzing || !query.trim()}
              className="px-6 py-3 bg-noti-500 hover:bg-noti-600 active:scale-95 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60 flex-shrink-0"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang phân tích...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Tìm Thông Minh</span>
                </>
              )}
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-gray-500 flex-wrap">
            <span className="font-semibold text-gray-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-500" /> Gợi ý tìm kiếm:
            </span>
            {SMART_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(p);
                  handleSearch(p);
                }}
                className="px-2.5 py-1 bg-white hover:bg-noti-50 text-gray-600 hover:text-noti-700 rounded-lg border border-gray-200 transition-colors text-[11px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {results && (
          <div className="mt-5 pt-5 border-t border-gray-200/80 animate-fadeIn">
            {/* Explanation Banner */}
            <div className="p-3.5 bg-noti-100/70 border border-noti-300 rounded-2xl flex items-start gap-2.5 mb-4 text-xs text-noti-950">
              <CheckCircle2 className="w-4 h-4 text-noti-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Lý do gợi ý cho yêu cầu "{results.queryText}":</span>
                <p className="text-gray-700 mt-0.5">{results.explanation}</p>
              </div>
            </div>

            {/* Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {results.items.map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => onSelectDeal(deal)}
                  className="p-3.5 bg-white rounded-2xl border border-gray-200 hover:border-noti-400 hover:shadow-lg transition-all flex gap-3 cursor-pointer group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                      {deal.discount}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="font-semibold text-noti-700 truncate max-w-[130px]">{deal.storeName}</span>
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{deal.distance}</span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 line-clamp-1 mt-0.5 group-hover:text-noti-600 transition-colors">
                        {deal.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                      <span className="text-red-600 font-black text-sm">
                        {deal.salePrice.toLocaleString('vi-VN')}₫
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveDeal(deal);
                        }}
                        className="p-1.5 bg-noti-50 hover:bg-noti-100 text-noti-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                        title="Lưu vào Deal Passport"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Lưu</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Bookmark, 
  Lightbulb, 
  X,
  Heart
} from 'lucide-react';

const SMART_PRESETS = [
  'Gói chăm sóc da mụn y khoa và ánh sáng sinh học dưới 200k',
  'Shop thời trang thiết kế đầm váy lụa cao cấp dưới 300k',
  'Tiệm làm nail art Hàn Quốc đính đá và nối mi đẹp gần tôi',
  'Gội đầu dưỡng sinh thảo dược massage cổ vai gáy thư giãn'
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

      if (searchText.includes('da') || searchText.includes('spa') || searchText.includes('mụn') || searchText.includes('triệt lông')) {
        matched = allDeals.filter(d => d.category === 'spa');
        reason = 'Phù hợp vì liệu trình chuẩn y khoa tại phòng khám Spa uy tín, mức giảm trên 60% và có bảo hành kết quả.';
      } else if (searchText.includes('váy') || searchText.includes('đầm') || searchText.includes('thời trang') || searchText.includes('blazer')) {
        matched = allDeals.filter(d => d.category === 'fashion');
        reason = 'Phù hợp vì các mẫu thiết kế hot trend lụa tơ tằm và blazer cao cấp, chất vải đẹp và có đầy đủ size.';
      } else if (searchText.includes('nail') || searchText.includes('móng') || searchText.includes('mi')) {
        matched = allDeals.filter(d => d.category === 'nail_eyelash');
        reason = 'Phù hợp vì tiệm sử dụng sơn gel chính hãng Hàn Quốc, đính đá xà cừ bền màu trên 4 tuần và gần vị trí của bạn.';
      } else if (searchText.includes('gội') || searchText.includes('dưỡng sinh') || searchText.includes('massage')) {
        matched = allDeals.filter(d => d.category === 'hair_salon' || d.category === 'massage');
        reason = 'Phù hợp vì liệu trình gội đầu 75 phút 18 vị thảo mộc thiên nhiên kèm bài bấm huyệt cổ vai gáy giảm đau mỏi.';
      } else {
        matched = allDeals.slice(0, 3);
        reason = 'Đề xuất dựa trên các dịch vụ làm đẹp & thời trang đang được đánh giá 5 sao cao nhất.';
      }

      setResults({
        items: matched,
        explanation: reason,
        queryText: customText || query
      });
      setAnalyzing(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="bg-gradient-to-br from-white to-pink-50/60 rounded-3xl p-5 sm:p-7 shadow-sm border border-rose-100">
        {/* Title */}
        <div className="max-w-2xl mb-4">
          <div className="inline-flex items-center space-x-1.5 bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>AI BEAUTY FINDER • TÌM ƯU ĐÃI LÀM ĐẸP & THỜI TRANG</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Mô Tả Nhu Cầu Làm Đẹp Của Bạn
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Tìm nhanh tiệm Spa, thẩm mỹ viện, salon gội đầu dưỡng sinh hoặc shop thời trang theo đúng mong muốn của bạn.
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
                placeholder="Ví dụ: Gói chăm sóc da mụn y khoa và triệt lông gần Ba Đình dưới 200k..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-xs sm:text-sm border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm text-gray-800"
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
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60 flex-shrink-0"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang tìm kiếm...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Tìm Deal Làm Đẹp</span>
                </>
              )}
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-gray-500 flex-wrap">
            <span className="font-semibold text-rose-500 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Gợi ý dịch vụ:
            </span>
            {SMART_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(p);
                  handleSearch(p);
                }}
                className="px-2.5 py-1 bg-white hover:bg-rose-50 text-gray-700 hover:text-rose-700 rounded-lg border border-gray-200 transition-colors text-[11px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {results && (
          <div className="mt-5 pt-5 border-t border-rose-100 animate-fadeIn">
            {/* Explanation Banner */}
            <div className="p-3.5 bg-rose-100/70 border border-rose-300 rounded-2xl flex items-start gap-2.5 mb-4 text-xs text-rose-950">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Lý do gợi ý cho "{results.queryText}":</span>
                <p className="text-gray-700 mt-0.5">{results.explanation}</p>
              </div>
            </div>

            {/* Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {results.items.map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => onSelectDeal(deal)}
                  className="p-3.5 bg-white rounded-2xl border border-gray-200 hover:border-rose-300 hover:shadow-lg transition-all flex gap-3 cursor-pointer group"
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
                        <span className="font-semibold text-rose-700 truncate max-w-[130px]">{deal.storeName}</span>
                        <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded">{deal.distance}</span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 line-clamp-1 mt-0.5 group-hover:text-rose-600 transition-colors">
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
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                        title="Lưu vào Deal Passport"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Lưu ví</span>
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

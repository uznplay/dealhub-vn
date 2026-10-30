import React from 'react';
import { 
  X, 
  Target, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Bookmark, 
  QrCode, 
  Trophy,
  ChevronRight,
  ShieldCheck,
  Flame
} from 'lucide-react';

export default function DealMissionModal({ onClose, onOpenPassport }) {
  const MISSIONS = [
    {
      id: 'm1',
      title: 'Khám phá 3 tiệm Spa & Làm đẹp trên bản đồ',
      category: 'Bản đồ',
      icon: Sparkles,
      progress: 2,
      total: 3,
      reward: '50 Điểm Thưởng + Huy hiệu Làm Đẹp',
      isCompleted: false,
      color: 'text-noti-600 bg-green-50'
    },
    {
      id: 'm2',
      title: 'Lưu 3 ưu đãi vào Kho Voucher',
      category: 'Cá nhân',
      icon: Bookmark,
      progress: 2,
      total: 3,
      reward: 'Huy hiệu Nhà Tiết Kiệm',
      isCompleted: false,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'm3',
      title: 'Sử dụng 1 voucher xác thực tại cửa hàng',
      category: 'Trải nghiệm',
      icon: QrCode,
      progress: 1,
      total: 1,
      reward: '100 Điểm Thưởng + Huy hiệu Khách Quen',
      isCompleted: true,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'm4',
      title: 'Hoàn thành bộ sưu tập Ưu Đãi Spa & Làm Đẹp',
      category: 'Bộ sưu tập',
      icon: Trophy,
      progress: 3,
      total: 4,
      reward: 'Voucher Độc Quyền 50.000₫',
      isCompleted: false,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-noti-600 to-emerald-700 p-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
              <Target className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-black text-sm uppercase">NHIỆM VỤ SĂN DEAL</h3>
              </div>
              <p className="text-[11px] text-green-100">
                Khám phá trải nghiệm thực tế và tích lũy điểm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress header */}
        <div className="p-3.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
              Hạng thành viên
            </span>
            <span className="text-xs font-black text-gray-900">
              Thợ Săn Deal Đồng Hành
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
              Điểm thưởng
            </span>
            <span className="text-sm font-black text-noti-700">
              150 Điểm
            </span>
          </div>
        </div>

        {/* Missions List */}
        <div className="p-3.5 space-y-2.5 overflow-y-auto flex-1">
          {MISSIONS.map((m) => {
            const Icon = m.icon;
            const percent = Math.min(100, Math.round((m.progress / m.total) * 100));

            return (
              <div 
                key={m.id}
                className="p-3 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${m.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-gray-900 leading-snug">
                        {m.title}
                      </h4>
                      <p className="text-[10px] text-noti-700 font-semibold mt-0.5 truncate">
                        Phần thưởng: {m.reward}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-black text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                    {m.progress}/{m.total}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-noti-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => {
              onClose();
              if (onOpenPassport) onOpenPassport();
            }}
            className="w-full py-2 bg-noti-500 hover:bg-noti-600 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
          >
            Mở Kho Voucher
          </button>
        </div>
      </div>
    </div>
  );
}

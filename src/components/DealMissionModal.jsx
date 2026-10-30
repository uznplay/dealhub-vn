import React from 'react';
import { 
  X, 
  Target, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Coffee, 
  Bookmark, 
  QrCode, 
  MessageSquareHeart, 
  ChevronRight,
  Trophy
} from 'lucide-react';

export default function DealMissionModal({ onClose, onOpenPassport }) {
  const MISSIONS = [
    {
      id: 'm1',
      title: 'Khám phá 3 quán cà phê quanh bạn',
      category: 'Ẩm thực',
      icon: Coffee,
      progress: 2,
      total: 3,
      reward: '50 Điểm Thưởng + Huy hiệu Cà Phê',
      isCompleted: false,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'm2',
      title: 'Lưu 3 ưu đãi vào Deal Passport',
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
      title: 'Sử dụng 1 ưu đãi xác thực tại cửa hàng',
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
      title: 'Hoàn thành bộ sưu tập Ưu Đãi Cuối Tuần',
      category: 'Bộ sưu tập',
      icon: Trophy,
      progress: 3,
      total: 4,
      reward: 'Voucher Độc Quyền 50.000₫',
      isCompleted: false,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const BADGES = [
    { id: 'b1', name: 'Tín Đồ Cafe', icon: '☕', desc: 'Ghé thăm 3 quán cafe đối tác', unlocked: true },
    { id: 'b2', name: 'Thợ Săn O2O', icon: '🎯', desc: 'Quét mã xác nhận tại quán', unlocked: true },
    { id: 'b3', name: 'Ví Vàng', icon: '⭐', desc: 'Lưu trên 5 ưu đãi vào ví', unlocked: false },
    { id: 'b4', name: 'Đại Sứ Deal', icon: '👑', desc: 'Hoàn thành 10 nhiệm vụ', unlocked: false }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-noti-500 to-teal-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner">
              <Target className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-lg">DEAL MISSION</h3>
                <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Nhiệm Vụ Săn Deal
                </span>
              </div>
              <p className="text-xs text-white/90">
                Khám phá trải nghiệm thực tế và mở khóa huy hiệu danh dự
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Rank Card */}
        <div className="p-5 bg-gradient-to-r from-gray-50 to-noti-50/50 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-2xl">
              🎖️
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Hạng thành viên</span>
              <h4 className="font-black text-sm text-gray-900">Thợ Săn Deal Đồng Hành</h4>
              <p className="text-[11px] text-noti-600 font-semibold">2/4 Nhiệm vụ đã hoàn thành</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-500 font-medium block">Điểm thưởng tích lũy</span>
            <span className="text-lg font-black text-yellow-500">150 ⭐</span>
          </div>
        </div>

        {/* Mission List */}
        <div className="p-5 max-h-[420px] overflow-y-auto space-y-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Nhiệm vụ tuần này
            </span>
            <span className="text-[11px] text-gray-400">Tự động làm mới sau 4 ngày</span>
          </div>

          {MISSIONS.map((mission) => {
            const Icon = mission.icon;
            const pct = Math.round((mission.progress / mission.total) * 100);

            return (
              <div
                key={mission.id}
                className="p-3.5 bg-white rounded-2xl border border-gray-200 hover:border-noti-300 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${mission.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900">{mission.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Phần thưởng: <b className="text-noti-600">{mission.reward}</b></p>
                    </div>
                  </div>

                  {mission.isCompleted ? (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-gray-500 flex-shrink-0">
                      {mission.progress}/{mission.total}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-2.5">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        mission.isCompleted ? 'bg-emerald-500' : 'bg-noti-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Badges Collection */}
          <div className="pt-3 mt-4 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
              Huy hiệu danh dự đã mở khóa
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              {BADGES.map((b) => (
                <div
                  key={b.id}
                  className={`p-2.5 rounded-2xl border transition-all ${
                    b.unlocked 
                      ? 'bg-amber-50/60 border-amber-200 text-gray-800' 
                      : 'bg-gray-50 border-gray-200 opacity-40 text-gray-400'
                  }`}
                >
                  <span className="text-2xl block mb-1">{b.icon}</span>
                  <span className="text-[10px] font-bold block truncate">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              if (onOpenPassport) onOpenPassport();
            }}
            className="text-xs font-bold text-noti-600 hover:text-noti-700 flex items-center gap-1"
          >
            <span>Mở Deal Passport kiểm tra ưu đãi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}


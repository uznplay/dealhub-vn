import React, { useState } from 'react';
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
  Gift,
  Coins,
  ArrowRight,
  Store,
  Check,
  ShoppingBag
} from 'lucide-react';

export default function DealMissionModal({ 
  userPoints = 150, 
  onUpdatePoints, 
  onSaveDeal, 
  onClose, 
  onOpenPassport,
  initialTab = 'missions',
  showToast
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'missions' | 'rewards'
  const [redeemedIds, setRedeemedIds] = useState([]);
  const [claimedMissionIds, setClaimedMissionIds] = useState(['m3']); // m3 was pre-completed

  // Danh sách nhiệm vụ tích điểm
  const MISSIONS = [
    {
      id: 'm1',
      title: 'Khám phá 3 tiệm Spa & Làm đẹp trên bản đồ',
      category: 'Bản đồ',
      icon: Sparkles,
      progress: 2,
      total: 3,
      rewardPoints: 50,
      rewardText: '+50 Điểm Thưởng + Huy hiệu Làm Đẹp',
      color: 'text-noti-600 bg-green-50'
    },
    {
      id: 'm2',
      title: 'Lưu 3 ưu đãi vào Kho Voucher',
      category: 'Cá nhân',
      icon: Bookmark,
      progress: 2,
      total: 3,
      rewardPoints: 30,
      rewardText: '+30 Điểm Thưởng + Huy hiệu Nhà Tiết Kiệm',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'm3',
      title: 'Sử dụng 1 voucher xác thực tại quầy thu ngân',
      category: 'Trải nghiệm',
      icon: QrCode,
      progress: 1,
      total: 1,
      rewardPoints: 100,
      rewardText: '+100 Điểm Thưởng (Đã nhận)',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'm4',
      title: 'Đánh giá 1 dịch vụ Spa / Salon sau trải nghiệm',
      category: 'Cộng đồng',
      icon: Trophy,
      progress: 0,
      total: 1,
      rewardPoints: 40,
      rewardText: '+40 Điểm Thưởng + Huy hiệu Reviewer',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  // Danh mục voucher đổi quà bằng điểm thưởng
  const REWARD_ITEMS = [
    {
      id: 'reward-spa-50k',
      title: 'Voucher Giảm 50.000₫ Dịch Vụ Spa & Clinic',
      storeName: 'An Nhiên Beauty & Clinic Spa',
      category: 'Spa & Làm đẹp',
      pointCost: 50,
      salePrice: 0,
      originalPrice: 50000,
      discount: 'TẶNG 50K',
      address: '12 Liễu Giai, Ba Đình, Hà Nội',
      condition: 'Áp dụng cho mọi hóa đơn Spa & Chăm sóc da từ 150.000₫',
      expiresIn: 'Còn 30 ngày',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'reward-fashion-100k',
      title: 'Voucher Giảm 100.000₫ Mua Sắm Thời Trang',
      storeName: 'The Cosette Chic - Showroom',
      category: 'Thời trang',
      pointCost: 100,
      salePrice: 0,
      originalPrice: 100000,
      discount: 'TẶNG 100K',
      address: '52 Chùa Bộc, Đống Đa, Hà Nội',
      condition: 'Áp dụng cho đơn mua sắm váy đầm, blazer từ 300.000₫',
      expiresIn: 'Còn 30 ngày',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'reward-goi-dau-free',
      title: 'Miễn Phí Gội Đầu Dưỡng Sinh Thảo Dược 45 Phút',
      storeName: 'Mộc Trà Dưỡng Sinh Spa',
      category: 'Dưỡng sinh',
      pointCost: 120,
      salePrice: 0,
      originalPrice: 150000,
      discount: '100% FREE',
      address: '157 Xuân Thủy, Cầu Giấy, Hà Nội',
      condition: 'Miễn phí trọn gói trị liệu thư giãn gội đầu bấm huyệt',
      expiresIn: 'Còn 15 ngày',
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'reward-massage-free',
      title: 'Gói Trị Liệu Massage Cổ Vai Gáy 30 Phút Miễn Phí',
      storeName: 'Seoul Spa Trị Liệu & Phục Hồi',
      category: 'Chăm sóc cá nhân',
      pointCost: 150,
      salePrice: 0,
      originalPrice: 200000,
      discount: '100% FREE',
      address: '88 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
      condition: 'Trị liệu giảm đau nhức mỏi cổ vai gáy bằng thảo mộc tự nhiên',
      expiresIn: 'Còn 20 ngày',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=80'
    }
  ];

  // Xử lý đổi điểm nhận voucher
  const handleRedeem = (item) => {
    if (userPoints < item.pointCost) {
      if (showToast) showToast(`Bạn còn thiếu ${item.pointCost - userPoints} điểm để đổi quà này!`);
      return;
    }

    const nextPoints = userPoints - item.pointCost;
    if (onUpdatePoints) {
      onUpdatePoints(nextPoints);
    }

    // Lưu voucher vào Kho Voucher
    if (onSaveDeal) {
      onSaveDeal({
        id: `gift-${Date.now()}`,
        title: item.title,
        storeName: item.storeName,
        salePrice: item.salePrice,
        originalPrice: item.originalPrice,
        discount: item.discount,
        address: item.address,
        category: item.category,
        description: item.condition,
        isGiftReward: true
      });
    }

    setRedeemedIds([...redeemedIds, item.id]);
    if (showToast) {
      showToast(`🎉 Đổi thành công "${item.title}"! Đã thêm vào Kho Voucher.`);
    }
  };

  // Xử lý nhận điểm khi hoàn thành nhiệm vụ
  const handleClaimMission = (mission) => {
    if (claimedMissionIds.includes(mission.id)) return;
    const nextPoints = userPoints + mission.rewardPoints;
    if (onUpdatePoints) {
      onUpdatePoints(nextPoints);
    }
    setClaimedMissionIds([...claimedMissionIds, mission.id]);
    if (showToast) {
      showToast(`⭐ Nhận thành công +${mission.rewardPoints} Điểm thưởng!`);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-noti-600 to-emerald-700 p-3.5 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 flex-shrink-0">
              <Gift className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-black text-sm uppercase tracking-wide">
                  ĐIỂM THƯỞNG & ĐỔI QUÀ
                </h3>
              </div>
              <p className="text-[11px] text-green-100">
                Tích lũy điểm săn deal - Đổi voucher miễn phí
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

        {/* User Balance Card */}
        <div className="p-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-gray-950 flex items-center justify-between flex-shrink-0 shadow-inner">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-xs">
              <Coins className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-800 tracking-wider block">
                Số điểm của bạn
              </span>
              <span className="text-base font-black text-gray-950 leading-none">
                {userPoints.toLocaleString('vi-VN')} <span className="text-xs font-bold">Điểm ⭐</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs flex items-center gap-1 ${
              activeTab === 'rewards'
                ? 'bg-gray-950 text-white ring-2 ring-white/50'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-amber-500" />
            <span>Đổi quà ngay</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-gray-100 border-b border-gray-200 text-xs font-bold flex-shrink-0">
          <button
            onClick={() => setActiveTab('missions')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'missions'
                ? 'bg-white text-noti-700 shadow-2xs font-black'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Target className="w-4 h-4 text-noti-600" />
            <span>Nhiệm Vụ Tích Điểm</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 relative ${
              activeTab === 'rewards'
                ? 'bg-white text-noti-700 shadow-2xs font-black'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-500" />
            <span>Đổi Quà Tặng ({REWARD_ITEMS.length})</span>
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-3" />
          </button>
        </div>

        {/* TAB 1: NHIỆM VỤ TÍCH ĐIỂM */}
        {activeTab === 'missions' && (
          <div className="p-3 space-y-2.5 overflow-y-auto flex-1">
            <div className="text-[11px] text-gray-500 font-semibold px-1 flex items-center justify-between">
              <span>Hoàn thành nhiệm vụ để nhận thêm điểm đổi voucher:</span>
              <span className="text-noti-700 font-bold">1/4 hoàn thành</span>
            </div>

            {MISSIONS.map((m) => {
              const Icon = m.icon;
              const percent = Math.min(100, Math.round((m.progress / m.total) * 100));
              const isFinished = m.progress >= m.total;
              const isClaimed = claimedMissionIds.includes(m.id);

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
                          Phần thưởng: {m.rewardText}
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

                  {/* Action button if finished */}
                  {isFinished && (
                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-noti-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Nhiệm vụ đã hoàn thành
                      </span>
                      {isClaimed ? (
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                          Đã nhận thưởng
                        </span>
                      ) : (
                        <button
                          onClick={() => handleClaimMission(m)}
                          className="px-2.5 py-1 bg-noti-500 hover:bg-noti-600 text-white rounded-lg font-black text-[10px] shadow-2xs"
                        >
                          Nhận +{m.rewardPoints} ⭐
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: ĐỔI QUÀ BẰNG ĐIỂM (REWARD STORE) */}
        {activeTab === 'rewards' && (
          <div className="p-3 space-y-3 overflow-y-auto flex-1">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-noti-600 flex-shrink-0" />
                <span className="text-[11px] text-noti-900 font-medium">
                  Voucher đổi thành công sẽ được tự động lưu vào <b>Kho Voucher</b>.
                </span>
              </div>
            </div>

            {REWARD_ITEMS.map((item) => {
              const canRedeem = userPoints >= item.pointCost;
              const isAlreadyRedeemed = redeemedIds.includes(item.id);

              return (
                <div 
                  key={item.id}
                  className="p-3 rounded-2xl border border-gray-200 bg-white shadow-2xs flex flex-col space-y-2.5 relative overflow-hidden"
                >
                  {/* Item Content */}
                  <div className="flex items-start space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span className="text-[9px] font-black text-noti-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        <span className="text-[9px] font-black text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-md">
                          {item.discount}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs text-gray-900 leading-snug line-clamp-2">
                        {item.title}
                      </h4>

                      <p className="text-[10px] text-gray-500 font-medium truncate mt-0.5">
                        {item.storeName}
                      </p>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="bg-gray-50 rounded-xl p-2 text-[10px] text-gray-600 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Điều kiện:</span>
                      <span className="font-bold text-gray-700 truncate max-w-[200px]">{item.condition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Thời hạn:</span>
                      <span className="font-bold text-gray-700">{item.expiresIn}</span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xs font-black text-amber-600">
                        {item.pointCost}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500">
                        Điểm ⭐
                      </span>
                      <span className="text-[10px] line-through text-gray-400 ml-1">
                        {item.originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    </div>

                    {isAlreadyRedeemed ? (
                      <button
                        onClick={() => {
                          onClose();
                          if (onOpenPassport) onOpenPassport();
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-noti-700 font-bold text-[11px] rounded-xl flex items-center space-x-1 transition-all"
                      >
                        <Check className="w-3.5 h-3.5 text-noti-600" />
                        <span>Xem trong Kho</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRedeem(item)}
                        disabled={!canRedeem}
                        className={`px-3 py-1.5 rounded-xl font-black text-[11px] transition-all flex items-center space-x-1 ${
                          canRedeem
                            ? 'bg-noti-500 hover:bg-noti-600 text-white shadow-2xs hover:scale-105 active:scale-95'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {canRedeem ? (
                          <>
                            <Gift className="w-3.5 h-3.5" />
                            <span>Đổi ngay</span>
                          </>
                        ) : (
                          <span>Thiếu {item.pointCost - userPoints}⭐</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between gap-2 flex-shrink-0">
          <button
            onClick={() => {
              onClose();
              if (onOpenPassport) onOpenPassport();
            }}
            className="flex-1 py-2 bg-noti-500 hover:bg-noti-600 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center space-x-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Mở Kho Voucher</span>
          </button>
        </div>
      </div>
    </div>
  );
}

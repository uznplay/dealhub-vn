import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  ChevronUp, 
  Flame, 
  Flashlight, 
  Camera, 
  Sparkles,
  Ticket,
  Bell,
  Radio,
  ExternalLink
} from 'lucide-react';

export default function PhoneLockScreen({ 
  onUnlock, 
  liveNotifications = [],
  onNotificationClick 
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [isUnlockedIcon, setIsUnlockedIcon] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const weekdayStr = new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(currentTime);
  const dateStr = `${weekdayStr.charAt(0).toUpperCase() + weekdayStr.slice(1)}, ${currentTime.getDate()} tháng ${currentTime.getMonth() + 1}`;

  const handleUnlock = () => {
    if (isSlidingUp) return;
    setIsUnlockedIcon(true);
    
    setTimeout(() => {
      setIsSlidingUp(true);
      setTimeout(() => {
        if (onUnlock) onUnlock();
      }, 450);
    }, 100);
  };

  const handleLiveNotifClick = (e, notif) => {
    e.stopPropagation();
    setIsUnlockedIcon(true);
    setTimeout(() => {
      setIsSlidingUp(true);
      setTimeout(() => {
        if (onUnlock) onUnlock();
        if (onNotificationClick) onNotificationClick(notif);
      }, 450);
    }, 100);
  };

  return (
    <div 
      onClick={handleUnlock}
      className={`absolute inset-0 z-[99999] flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-all duration-500 ease-in-out ${
        isSlidingUp ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } bg-gradient-to-b from-emerald-950 via-noti-800 to-noti-950 text-white`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.35) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.4) 0%, transparent 50%),
          linear-gradient(to bottom, #064e3b 0%, #047857 50%, #022c22 100%)
        `
      }}
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 -left-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-12 w-52 h-52 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* TOP: Status & Lock Icon */}
      <div className="pt-8 px-6 flex flex-col items-center relative z-10">
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 shadow-xs transition-transform duration-300">
          {isUnlockedIcon ? (
            <Unlock className="w-4 h-4 text-yellow-300 animate-bounce" />
          ) : (
            <Lock className="w-4 h-4 text-emerald-200" />
          )}
        </div>

        {/* Date */}
        <p className="text-xs font-semibold text-emerald-100 tracking-wide mb-1 drop-shadow-sm">
          {dateStr}
        </p>

        {/* Big Clock */}
        <h1 className="text-6xl font-black tracking-tight text-white drop-shadow-md font-sans">
          {timeString}
        </h1>

        {/* Mini DealHub Brand Badge */}
        <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/15">
          <img src="/logo.svg" alt="DealHub" className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black tracking-wider text-yellow-300 uppercase">
            DEALHUB OS
          </span>
        </div>
      </div>

      {/* CENTER: iOS-style Notification Cards */}
      <div className="px-5 space-y-2.5 relative z-10 w-full overflow-y-auto max-h-[48%] py-1">
        
        {/* LIVE PUSH NOTIFICATIONS FROM MERCHANT (Chuẩn phong cách iOS như card mẫu, không viền vàng, không nhảy) */}
        {liveNotifications && liveNotifications.length > 0 && liveNotifications.map((notif) => (
          <div 
            key={notif.id}
            onClick={(e) => handleLiveNotifClick(e, notif)}
            className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl space-y-1.5 transform hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-emerald-100">
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 rounded-md bg-white p-0.5 flex items-center justify-center shadow-xs">
                  <img src="/logo.svg" alt="logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-[11px] text-white">DEALHUB</span>
                <span className="text-[10px] text-emerald-200">• {notif.time || 'Vừa xong'}</span>
              </div>
              <span className="text-[10px] text-emerald-200 font-medium">Bây giờ</span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {notif.title}
              </h4>
              <p className="text-[11px] text-emerald-50 mt-0.5 line-clamp-2 leading-relaxed">
                {notif.body || `${notif.deal?.title} đang giảm giá ${notif.deal?.discount}. Chạm để mở xem ngay.`}
              </p>
            </div>
          </div>
        ))}

        {/* Default DealHub Notification 1 */}
        <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl space-y-1.5 transform hover:scale-[1.02] transition-all">
          <div className="flex items-center justify-between text-xs text-emerald-100">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-white p-0.5 flex items-center justify-center">
                <img src="/logo.svg" alt="logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-[11px] text-white">DEALHUB</span>
              <span className="text-[10px] text-emerald-200">• Gợi ý hôm nay</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              12 Ưu đãi Spa & Làm đẹp mới quanh bạn!
            </h4>
            <p className="text-[11px] text-emerald-50 mt-0.5 line-clamp-2 leading-relaxed">
              Các tiệm gần bạn đang giảm giá tới <strong>-62%</strong>. Chạm để mở bản đồ săn deal ngay.
            </p>
          </div>
        </div>

        {/* Kho Voucher Reminder Notification 2 */}
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/15 shadow-md flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-xl bg-yellow-400/20 border border-yellow-300/30 flex items-center justify-center text-yellow-300 flex-shrink-0">
              <Ticket className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white">Kho Voucher của bạn</p>
              <p className="text-[10px] text-emerald-100">Đang có 2 ưu đãi sẵn sàng xuất trình tại tiệm</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-yellow-300 bg-yellow-400/20 px-2 py-0.5 rounded-full border border-yellow-300/30">
            Mở ngay
          </span>
        </div>
      </div>

      {/* BOTTOM: Unlock Hint & Tools */}
      <div className="pb-6 px-7 flex flex-col items-center relative z-10 w-full">
        {/* Swipe / Tap prompt */}
        <div className="flex flex-col items-center mb-5 animate-pulse">
          <ChevronUp className="w-5 h-5 text-emerald-200 animate-bounce" />
          <span className="text-xs font-bold tracking-wide text-emerald-100 drop-shadow-sm">
            Chạm hoặc vuốt lên để mở khóa
          </span>
        </div>

        {/* Lockscreen Shortcut Buttons (Flashlight & Camera) */}
        <div className="flex items-center justify-between w-full px-2">
          <div className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
            <Flashlight className="w-5 h-5 text-emerald-100" />
          </div>

          {/* Bottom Home Indicator Bar (iPhone style) */}
          <div className="w-32 h-1 bg-white/80 rounded-full mx-auto" />

          <div className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
            <Camera className="w-5 h-5 text-emerald-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

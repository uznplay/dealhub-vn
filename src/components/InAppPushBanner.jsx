import React from 'react';
import { X, Sparkles, Flame, ExternalLink, Bell } from 'lucide-react';

export default function InAppPushBanner({ notification, onClose, onSelectDeal }) {
  if (!notification) return null;

  return (
    <div className="absolute top-2 inset-x-3 z-[999999] animate-bounce">
      <div 
        onClick={() => {
          if (onSelectDeal && notification.deal) {
            onSelectDeal(notification.deal);
          }
        }}
        className="bg-gray-950/95 backdrop-blur-xl text-white p-3 rounded-2xl shadow-2xl border-2 border-noti-400 flex items-start space-x-3 cursor-pointer select-none hover:bg-black transition-all"
      >
        {/* Deal Image or Icon */}
        {notification.deal?.image ? (
          <img 
            src={notification.deal.image} 
            alt="" 
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/20 mt-0.5" 
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-noti-500/20 border border-noti-400 flex items-center justify-center flex-shrink-0 text-yellow-300">
            <Bell className="w-5 h-5 text-yellow-300 animate-swing" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] font-black text-yellow-300 uppercase tracking-wide">
                DEALHUB PUSH NOTI
              </span>
            </div>
            <span className="text-[9px] text-gray-400">{notification.time || 'Vừa xong'}</span>
          </div>

          <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug">
            {notification.title}
          </h4>

          <p className="text-[11px] text-emerald-300 font-semibold line-clamp-1 mt-0.5">
            {notification.body || notification.deal?.title}
          </p>

          <div className="flex items-center space-x-2 mt-1">
            {notification.deal?.discount && (
              <span className="text-[9px] font-black bg-red-500 text-white px-1.5 py-0.2 rounded-md">
                {notification.deal.discount}
              </span>
            )}
            <span className="text-[10px] font-black text-yellow-400 hover:underline flex items-center gap-0.5">
              Chạm để xem deal &rarr;
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0 -mt-1 -mr-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

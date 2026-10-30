import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Send, 
  MapPin, 
  Store, 
  CheckCircle2,
  Ticket,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  fetchFeedPostsBackend, 
  likePostBackend, 
  addCommentBackend 
} from '../lib/supabase';

export default function DealFeed({ onSaveDeal, onSelectDeal, savedDealIds = [] }) {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'nearby' | 'spa' | 'fashion'
  const [likedPosts, setLikedPosts] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [newCommentText, setNewCommentText] = useState({});

  useEffect(() => {
    fetchFeedPostsBackend().then(data => {
      setPosts(data || []);
    });
  }, []);

  const handleToggleLike = async (postId) => {
    const isLiked = !likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: isLiked }));
    const updated = await likePostBackend(postId);
    setPosts(updated);
  };

  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = async (postId) => {
    const text = newCommentText[postId]?.trim();
    if (!text) return;

    const updated = await addCommentBackend(postId, text);
    setPosts(updated);
    setNewCommentText(prev => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'nearby') return p.location?.includes('Cách bạn');
    if (activeFilter === 'spa') return p.tags?.some(t => t.toLowerCase().includes('spa') || t.toLowerCase().includes('chamsoc'));
    if (activeFilter === 'fashion') return p.tags?.some(t => t.toLowerCase().includes('thoitrang') || t.toLowerCase().includes('dam'));
    return true;
  });

  return (
    <div className="w-full space-y-3 pb-4">
      
      {/* 1. Feed Header & Filter Tabs */}
      <div className="bg-white p-3 shadow-2xs border-b border-gray-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-noti-500 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 leading-tight">
                Bảng Tin Săn Deal Địa Phương
              </h2>
              <p className="text-[10px] text-gray-500">
                Ưu đãi và đánh giá từ các spa & cửa hàng làm đẹp chính thức
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-noti-500 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tất cả bài đăng
          </button>
          <button
            onClick={() => setActiveFilter('nearby')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'nearby'
                ? 'bg-noti-500 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Gần vị trí của bạn
          </button>
          <button
            onClick={() => setActiveFilter('spa')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'spa'
                ? 'bg-noti-500 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Spa & Chăm sóc da
          </button>
          <button
            onClick={() => setActiveFilter('fashion')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'fashion'
                ? 'bg-noti-500 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Showroom & Thời trang
          </button>
        </div>
      </div>

      {/* 2. Stream of Verified Store Posts (Consumers only view, like, comment, and save to Kho Voucher) */}
      <div className="space-y-3 px-3">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          const isCommentsOpen = openComments[post.id];
          const isDealSaved = savedDealIds.includes(post.deal?.id);

          return (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-2xs border border-gray-100 overflow-hidden"
            >
              {/* Post Author Header */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-100"
                    />
                    {post.author.isVerified && (
                      <span className="absolute -bottom-0.5 -right-0.5 bg-noti-500 text-white rounded-full p-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-xs text-gray-900 leading-none">
                        {post.author.name}
                      </span>
                      <span className="bg-green-50 text-noti-700 text-[9px] font-bold px-1.5 py-0.2 rounded border border-green-200">
                        {post.author.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] text-gray-400 mt-0.5">
                      <span>{post.time}</span>
                      <span>•</span>
                      <span className="flex items-center text-gray-500 truncate max-w-[150px]">
                        <MapPin className="w-2.5 h-2.5 mr-0.5 text-noti-600" />
                        {post.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Caption */}
              <div className="px-3 pb-2 text-xs text-gray-800 leading-relaxed whitespace-pre-line">
                {post.content}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-noti-600 font-bold text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative overflow-hidden bg-gray-100 max-h-72">
                  <img
                    src={post.image}
                    alt="Hình ảnh ưu đãi"
                    className="w-full h-auto object-cover max-h-72"
                    loading="lazy"
                  />
                  {post.deal?.discount && (
                    <div className="absolute top-2.5 left-2.5 bg-red-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-black shadow">
                      {post.deal.discount} OFF
                    </div>
                  )}
                </div>
              )}

              {/* Attached Deal Box (Lưu vào Kho Voucher) */}
              {post.deal && (
                <div className="p-2.5 bg-[#f4faf4] border-t border-b border-green-100 flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-noti-700 uppercase tracking-wide flex items-center gap-1">
                      <Store className="w-2.5 h-2.5" />
                      {post.deal.storeName}
                    </span>
                    <p className="font-bold text-xs text-gray-900 truncate mt-0.5">
                      {post.deal.title}
                    </p>
                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <span className="text-red-600 font-black text-xs">
                        {post.deal.salePrice?.toLocaleString('vi-VN')}₫
                      </span>
                      <span className="line-through text-gray-400 text-[10px]">
                        {post.deal.originalPrice?.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onSaveDeal) onSaveDeal(post.deal);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black shadow-2xs flex items-center space-x-1 transition-all active:scale-95 flex-shrink-0 ${
                      isDealSaved
                        ? 'bg-noti-500 text-white'
                        : 'bg-yellow-400 hover:bg-yellow-300 text-gray-950'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{isDealSaved ? 'ĐÃ LƯU KHO' : 'LƯU VOUCHER'}</span>
                  </button>
                </div>
              )}

              {/* Engagement Stats Bar */}
              <div className="px-3 py-1.5 flex items-center justify-between text-[10px] text-gray-500 border-b border-gray-100">
                <div className="flex items-center space-x-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[8px]">
                    ✓
                  </span>
                  <span>{post.likes} lượt thích</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px]">
                  <span 
                    onClick={() => toggleComments(post.id)}
                    className="hover:underline cursor-pointer"
                  >
                    {post.commentsCount || 0} bình luận
                  </span>
                  <span>•</span>
                  <span>{post.shares || 0} chia sẻ</span>
                </div>
              </div>

              {/* Action Buttons: Like / Comment / Share */}
              <div className="px-2 py-1 flex items-center justify-around text-xs font-bold text-gray-600">
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className={`flex-1 py-1.5 flex items-center justify-center space-x-1 rounded-lg hover:bg-gray-50 transition-colors ${
                    isLiked ? 'text-rose-600' : 'text-gray-600'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span className="text-[11px]">{isLiked ? 'Đã thích' : 'Thích'}</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex-1 py-1.5 flex items-center justify-center space-x-1 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Bình luận</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Đã sao chép liên kết bài viết!');
                  }}
                  className="flex-1 py-1.5 flex items-center justify-center space-x-1 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Chia sẻ</span>
                </button>
              </div>

              {/* Comment Drawer */}
              {isCommentsOpen && (
                <div className="bg-gray-50 p-3 border-t border-gray-100 space-y-2">
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {post.comments?.map((comm) => (
                      <div key={comm.id} className="flex items-start space-x-2 text-xs">
                        <img
                          src={comm.avatar}
                          alt={comm.author}
                          className="w-6 h-6 rounded-full object-cover border border-gray-200 mt-0.5"
                        />
                        <div className="flex-1 bg-white p-2 rounded-xl border border-gray-100 text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900">{comm.author}</span>
                            <span className="text-[9px] text-gray-400">{comm.time}</span>
                          </div>
                          <p className="text-gray-700 mt-0.5">{comm.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-1.5 pt-1">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      value={newCommentText[post.id] || ''}
                      onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      className="flex-1 bg-white text-xs px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-noti-500"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-1.5 bg-noti-500 hover:bg-noti-600 text-white rounded-lg shadow-2xs"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

    </div>
  );
}

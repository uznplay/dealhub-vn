import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Send, 
  Image, 
  MapPin, 
  Tag, 
  Sparkles, 
  CheckCircle, 
  Store, 
  MoreHorizontal,
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { MOCK_FEED_POSTS } from '../data/mockData';

export default function DealFeed({ onSaveDeal, onSelectDeal, savedDealIds = [] }) {
  const [posts, setPosts] = useState(MOCK_FEED_POSTS);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'nearby' | 'spa' | 'fashion'
  const [likedPosts, setLikedPosts] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [newCommentText, setNewCommentText] = useState({});
  
  // Post Creator State
  const [newPostContent, setNewPostContent] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleToggleLike = (postId) => {
    setLikedPosts(prev => {
      const isLiked = !prev[postId];
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      }));
      return { ...prev, [postId]: isLiked };
    });
  };

  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId) => {
    const text = newCommentText[postId]?.trim();
    if (!text) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newC = {
          id: `c-${Date.now()}`,
          author: 'Bạn (Người săn deal)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
          text,
          time: 'Vừa xong'
        };
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newC]
        };
      }
      return p;
    }));

    setNewCommentText(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Bạn (Deal Hunter)',
        role: 'Thành viên Săn Sale',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        isVerified: true
      },
      time: 'Vừa xong',
      location: 'Hà Nội • Gần vị trí bạn',
      content: newPostContent,
      tags: ['#DealHubCộngĐồng', '#SanSaleThoiTrangSpa'],
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&auto=format&fit=crop&q=80',
      deal: {
        id: `deal-user-${Date.now()}`,
        title: 'Ưu Đãi Spa & Làm Đẹp Được Cộng Đồng Đề Xuất',
        storeName: 'Tiệm Đối Tác Uy Tín',
        originalPrice: 400000,
        salePrice: 159000,
        discount: '-60%',
        address: 'Hà Nội'
      },
      likes: 1,
      commentsCount: 0,
      shares: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowCreateModal(false);
  };

  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'nearby') return p.location.includes('Cách bạn');
    if (activeFilter === 'spa') return p.tags.some(t => t.toLowerCase().includes('spa') || t.toLowerCase().includes('chamsoc'));
    if (activeFilter === 'fashion') return p.tags.some(t => t.toLowerCase().includes('thoitrang') || t.toLowerCase().includes('dam'));
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 space-y-4">
      
      {/* 1. Feed Header & Filter Tabs */}
      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-noti-500 text-white flex items-center justify-center shadow">
              <Flame className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 leading-tight">
                Bảng Tin Săn Deal Cộng Đồng
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">
                Review & chia sẻ mã giảm giá Spa, Làm đẹp & Thời trang hot nhất
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-noti-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🔥 Dành cho bạn
          </button>
          <button
            onClick={() => setActiveFilter('nearby')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'nearby'
                ? 'bg-noti-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📍 Gần bạn nhất (GPS)
          </button>
          <button
            onClick={() => setActiveFilter('spa')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'spa'
                ? 'bg-noti-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            💆 Spa & Chăm sóc da
          </button>
          <button
            onClick={() => setActiveFilter('fashion')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'fashion'
                ? 'bg-noti-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            👗 Thời trang & Đầm tiệc
          </button>
        </div>
      </div>

      {/* 2. Facebook-style "Post Creator" Bar */}
      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-3">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
          />
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-1 text-left bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs sm:text-sm px-4 py-2.5 rounded-full transition-colors"
          >
            Bạn vừa săn được deal gì hot hôm nay? Chia sẻ ngay...
          </button>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-around text-xs font-semibold text-gray-600">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-1.5 hover:text-noti-600 py-1 transition-colors"
          >
            <Image className="w-4 h-4 text-emerald-500" />
            <span>Ảnh review</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-1.5 hover:text-noti-600 py-1 transition-colors"
          >
            <Tag className="w-4 h-4 text-amber-500" />
            <span>Gắn mã ưu đãi</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-1.5 hover:text-noti-600 py-1 transition-colors"
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Check-in tiệm</span>
          </button>
        </div>
      </div>

      {/* 3. Stream of Community Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          const isCommentsOpen = openComments[post.id];
          const isDealSaved = savedDealIds.includes(post.deal?.id);

          return (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Post Author Header */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                    />
                    {post.author.isVerified && (
                      <span className="absolute -bottom-0.5 -right-0.5 bg-noti-500 text-white rounded-full p-0.5 shadow">
                        <CheckCircle className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-sm text-gray-900 leading-none">
                        {post.author.name}
                      </span>
                      <span className="bg-green-50 text-noti-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-green-200">
                        {post.author.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[11px] text-gray-400 mt-1">
                      <span>{post.time}</span>
                      <span>•</span>
                      <span className="flex items-center text-gray-500">
                        <MapPin className="w-3 h-3 mr-0.5 text-noti-600" />
                        {post.location}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Caption / Review Text */}
              <div className="px-3.5 pb-2 text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                {post.content}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-noti-600 font-bold hover:underline cursor-pointer text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative overflow-hidden bg-gray-100 max-h-96">
                  <img
                    src={post.image}
                    alt="Review visual"
                    className="w-full h-auto object-cover max-h-96"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-lg">
                    {post.deal?.discount} OFF
                  </div>
                </div>
              )}

              {/* Attached Deal Box (Direct Passport Wallet Link) */}
              {post.deal && (
                <div className="p-3 bg-gradient-to-r from-emerald-50/70 to-green-50/50 border-t border-b border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-noti-700 uppercase tracking-wide flex items-center gap-1">
                      <Store className="w-3 h-3" />
                      {post.deal.storeName}
                    </span>
                    <p className="font-extrabold text-xs sm:text-sm text-gray-900 truncate mt-0.5">
                      {post.deal.title}
                    </p>
                    <div className="flex items-baseline space-x-2 mt-0.5">
                      <span className="text-red-600 font-black text-sm">
                        {post.deal.salePrice?.toLocaleString('vi-VN')}₫
                      </span>
                      <span className="line-through text-gray-400 text-xs font-medium">
                        {post.deal.originalPrice?.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onSaveDeal) onSaveDeal(post.deal);
                    }}
                    className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black shadow-sm flex items-center justify-center space-x-1.5 transition-all active:scale-95 flex-shrink-0 ${
                      isDealSaved
                        ? 'bg-noti-500 text-white'
                        : 'bg-yellow-400 hover:bg-yellow-300 text-gray-950 hover:shadow'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isDealSaved ? 'fill-white' : ''}`} />
                    <span>{isDealSaved ? 'ĐÃ LƯU VÍ' : 'LƯU VÀO VÍ DEAL'}</span>
                  </button>
                </div>
              )}

              {/* Engagement Stats Bar */}
              <div className="px-3.5 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100">
                <div className="flex items-center space-x-1">
                  <span className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-white text-[9px]">
                    ❤️
                  </span>
                  <span>{post.likes} lượt thích</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span 
                    onClick={() => toggleComments(post.id)}
                    className="hover:underline cursor-pointer"
                  >
                    {post.commentsCount} bình luận
                  </span>
                  <span>•</span>
                  <span>{post.shares} chia sẻ</span>
                </div>
              </div>

              {/* Action Buttons: Like / Comment / Share */}
              <div className="px-2 py-1 flex items-center justify-around text-xs font-bold text-gray-600">
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className={`flex-1 py-2 flex items-center justify-center space-x-1.5 rounded-xl hover:bg-gray-50 transition-colors ${
                    isLiked ? 'text-rose-600' : 'text-gray-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isLiked ? 'Đã thích' : 'Thích'}</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex-1 py-2 flex items-center justify-center space-x-1.5 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Bình luận</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('✓ Đã sao chép liên kết ưu đãi để chia sẻ với bạn bè!');
                  }}
                  className="flex-1 py-2 flex items-center justify-center space-x-1.5 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </button>
              </div>

              {/* Comment Drawer / Expandable List */}
              {isCommentsOpen && (
                <div className="bg-gray-50 p-3.5 border-t border-gray-100 space-y-3">
                  {/* Comments List */}
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {post.comments.map((comm) => (
                      <div key={comm.id} className="flex items-start space-x-2 text-xs">
                        <img
                          src={comm.avatar}
                          alt={comm.author}
                          className="w-7 h-7 rounded-full object-cover border border-gray-200 mt-0.5"
                        />
                        <div className="flex-1 bg-white p-2.5 rounded-2xl shadow-2xs border border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900">{comm.author}</span>
                            <span className="text-[10px] text-gray-400">{comm.time}</span>
                          </div>
                          <p className="text-gray-700 mt-0.5">{comm.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comment Input */}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="text"
                      placeholder="Viết bình luận hoặc hỏi về ưu đãi này..."
                      value={newCommentText[post.id] || ''}
                      onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      className="flex-1 bg-white text-xs px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-noti-500 shadow-2xs"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2 bg-noti-500 hover:bg-noti-600 text-white rounded-xl shadow-sm transition-transform active:scale-90"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Modal Đăng Bài Viết / Review Mới */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-gray-900 text-base">Chia Sẻ Deal Lên Bảng Tin</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="Me"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <p className="font-bold text-xs text-gray-900">Bạn (Người săn deal)</p>
                <span className="text-[10px] bg-green-50 text-noti-700 font-bold px-2 py-0.5 rounded-full">
                  Công khai với mọi người
                </span>
              </div>
            </div>

            <textarea
              rows={4}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Chia sẻ trải nghiệm làm đẹp, mẹo săn mã giảm giá, hoặc pass đồ hot tại đây..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-noti-500"
            />

            <div className="p-3 bg-green-50 rounded-2xl border border-green-200 flex items-center justify-between text-xs">
              <span className="font-bold text-noti-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-noti-600" />
                Tự động gắn mã ưu đãi giảm 60%
              </span>
              <span className="text-[10px] text-gray-500">Đã chọn</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleCreatePost}
                className="px-5 py-2 bg-noti-500 hover:bg-noti-600 text-white rounded-xl text-xs font-black shadow transition-all active:scale-95"
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

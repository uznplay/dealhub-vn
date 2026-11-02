import { createClient } from '@supabase/supabase-js';
import { ALL_DEALS, MOCK_FEED_POSTS } from '../data/mockData.js';

export const SUPABASE_URL = 'https://yawwxxhbuosnqmhthsar.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_fsjJScmTzob2VhkvDhSS5w_8CSudH9m';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Local storage keys for hybrid persistence (v4 for full multi-category retail & O2O deals)
const STORAGE_KEYS = {
  DEALS: 'dealhub_local_deals_v4',
  VOUCHERS: 'dealhub_local_vouchers_v4',
  POSTS: 'dealhub_local_posts_v4',
  REDEMPTIONS: 'dealhub_local_redemptions_v4'
};

// Auto purge obsolete spa cache in client browser
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  try {
    const legacyKeys = [
      'dealhub_local_deals',
      'dealhub_local_vouchers',
      'dealhub_local_posts',
      'dealhub_local_redemptions',
      'dealhub_local_deals_v2',
      'dealhub_local_vouchers_v2'
    ];
    legacyKeys.forEach(k => {
      const v = localStorage.getItem(k);
      if (v && (v.includes('spa') || v.includes('Spa') || v.includes('chăm sóc da') || v.includes('Beauty'))) {
        localStorage.removeItem(k);
      }
    });
  } catch (e) {
    // ignore
  }
}

// Seed initial data if localStorage is empty
const getInitialVouchers = () => {
  return [
    {
      id: 'vouch-1',
      dealId: 'flash-1',
      code: 'DH-7828',
      title: 'Set Lẩu Nướng Bò Mỹ Thượng Hạng 4 Người',
      storeName: 'Bulgogi King - Lẩu Nướng Hàn Quốc',
      salePrice: 289000,
      originalPrice: 650000,
      discount: '-55%',
      address: '12 Liễu Giai, Ba Đình, Hà Nội',
      isUsed: false,
      savedAt: 'Hôm nay',
      expiresAt: 'Còn 14 ngày'
    },
    {
      id: 'vouch-2',
      dealId: 'flash-2',
      code: 'DH-5058',
      title: 'Gói Chơi Billiards Máy Lạnh 3 Giờ + 2 Cafe Muối',
      storeName: 'Ares Billiards & Lounge Club',
      salePrice: 99000,
      originalPrice: 240000,
      discount: '-59%',
      address: '157 Xuân Thủy, Cầu Giấy, Hà Nội',
      isUsed: false,
      savedAt: 'Hôm qua',
      expiresAt: 'Còn 7 ngày'
    }
  ];
};

// ========================
// 1. DEALS API
// ========================
export async function fetchDealsFromBackend() {
  try {
    const { data, error } = await supabase.from('deals').select('*');
    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('Supabase deals table not ready, using local data store:', err);
  }

  // Fallback to localStorage or mockData (auto-purging obsolete data)
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.DEALS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 6 && !stored.includes('Spa') && !stored.includes('chăm sóc da')) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(ALL_DEALS));
  }
  return ALL_DEALS;
}

export async function createNewDealBackend(newDeal) {
  // 1. Try Supabase
  try {
    await supabase.from('deals').insert([
      {
        id: newDeal.id,
        title: newDeal.title,
        category: newDeal.category,
        original_price: newDeal.originalPrice,
        sale_price: newDeal.salePrice,
        discount: newDeal.discount,
        image: newDeal.image,
        store_name: newDeal.storeName,
        city: newDeal.city,
        address: newDeal.address,
        distance: newDeal.distance || 'Gần bạn',
        badge: newDeal.badge || 'Ưu đãi mới',
        description: newDeal.description
      }
    ]);
  } catch (err) {
    console.warn('Supabase create deal fallback:', err);
  }

  // 2. Persist locally
  const current = await fetchDealsFromBackend();
  const updated = [newDeal, ...current];
  localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(updated));
  return updated;
}

// Helper to normalize voucher schema between Supabase snake_case and Frontend camelCase
export function normalizeVoucher(v) {
  if (!v) return null;
  const isUsed = Boolean(v.isUsed || v.is_used || v.status === 'used');
  const code = (v.code || v.voucher_code || '').trim().toUpperCase();
  return {
    id: v.id || v.deal_id || `vouch-${code || Date.now()}`,
    dealId: v.dealId || v.deal_id || v.id,
    code: code,
    voucherCode: code,
    title: v.title || v.deal_title || 'Ưu đãi DealHub',
    storeName: v.storeName || v.store_name || 'Quán Đối Tác',
    salePrice: Number(v.salePrice ?? v.sale_price ?? 0),
    originalPrice: Number(v.originalPrice ?? v.original_price ?? 0),
    discount: v.discount || '-50%',
    address: v.address || 'Quận trung tâm, Hà Nội',
    isUsed: isUsed,
    is_used: isUsed,
    savedAt: v.savedAt || v.saved_at || 'Hôm nay',
    expiresAt: v.expiresAt || v.expires_at || 'Còn 30 ngày',
    usedAt: v.usedAt || v.used_at || ''
  };
}

// ========================
// 2. KHO VOUCHER API
// ========================
export async function fetchVouchersBackend() {
  try {
    const { data, error } = await supabase.from('vouchers').select('*');
    if (!error && data && data.length > 0) {
      const normalized = data.map(normalizeVoucher);
      localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(normalized));
      return normalized;
    }
  } catch (err) {
    console.warn('Supabase vouchers table not ready, using local data store');
  }

  const stored = localStorage.getItem(STORAGE_KEYS.VOUCHERS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeVoucher);
      }
    } catch (e) {
      console.error(e);
    }
  }
  const initial = getInitialVouchers().map(normalizeVoucher);
  localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(initial));
  return initial;
}

export async function saveVoucherBackend(deal) {
  const current = await fetchVouchersBackend();
  const exists = current.some(v => v.dealId === deal.id || v.id === deal.id);
  if (exists) {
    return { success: false, message: 'Voucher này đã có trong Kho Voucher của bạn!' };
  }

  const randomCode = `DH-${Math.floor(1000 + Math.random() * 9000)}`;
  const newVoucher = {
    id: `vouch-${Date.now()}`,
    dealId: deal.id,
    code: randomCode,
    title: deal.title,
    storeName: deal.storeName,
    salePrice: deal.salePrice,
    originalPrice: deal.originalPrice,
    discount: deal.discount,
    address: deal.address,
    isUsed: false,
    savedAt: 'Vừa xong',
    expiresAt: 'Còn 30 ngày'
  };

  // Try Supabase insert
  try {
    await supabase.from('vouchers').insert([
      {
        id: newVoucher.id,
        deal_id: deal.id,
        voucher_code: randomCode,
        deal_title: deal.title,
        store_name: deal.storeName,
        sale_price: deal.salePrice,
        discount: deal.discount,
        address: deal.address,
        is_used: false
      }
    ]);
  } catch (err) {
    console.warn('Supabase save voucher fallback:', err);
  }

  const updated = [newVoucher, ...current];
  localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(updated));
  return { success: true, voucher: newVoucher, allVouchers: updated };
}

export async function removeVoucherBackend(voucherId) {
  const current = await fetchVouchersBackend();
  const updated = current.filter(v => v.id !== voucherId && v.code !== voucherId);
  localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(updated));

  try {
    await supabase.from('vouchers').delete().eq('id', voucherId);
  } catch (err) {
    console.warn('Supabase remove voucher fallback:', err);
  }

  return updated;
}

// Cashier verify and redeem voucher in store
export async function redeemVoucherBackend(code) {
  const cleanCode = code.trim().toUpperCase();
  const current = await fetchVouchersBackend();
  const index = current.findIndex(v => 
    v.code === cleanCode || 
    (v.voucher_code && v.voucher_code.trim().toUpperCase() === cleanCode) || 
    v.id === cleanCode
  );

  if (index === -1) {
    return {
      success: false,
      message: `Mã "${cleanCode}" không tồn tại trên hệ thống Kho Voucher!`
    };
  }

  if (current[index].isUsed || current[index].is_used) {
    return {
      success: false,
      message: `Mã "${cleanCode}" đã được sử dụng trước đó!`,
      voucher: current[index]
    };
  }

  // Mark as used
  current[index].isUsed = true;
  current[index].is_used = true;
  current[index].usedAt = 'Vừa xong';
  localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(current));

  // Log redemption record
  const redemptionRecord = {
    id: `redem-${Date.now()}`,
    code: cleanCode,
    customer: 'Khách hàng DealHub',
    service: current[index].title,
    store: current[index].storeName,
    time: 'Vừa xong',
    amount: `${current[index].salePrice?.toLocaleString('vi-VN')}₫`
  };

  const storedRedemptions = JSON.parse(localStorage.getItem(STORAGE_KEYS.REDEMPTIONS) || '[]');
  const updatedRedemptions = [redemptionRecord, ...storedRedemptions];
  localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(updatedRedemptions));

  try {
    await supabase.from('vouchers').update({ is_used: true }).or(`voucher_code.eq.${cleanCode},id.eq.${current[index].id}`);
    await supabase.from('redemptions').insert([{
      id: redemptionRecord.id,
      voucher_code: cleanCode,
      customer_name: redemptionRecord.customer,
      service_title: redemptionRecord.service,
      store_name: redemptionRecord.store,
      amount: current[index].salePrice
    }]);
  } catch (err) {
    console.warn('Supabase redemption sync fallback:', err);
  }

  // Broadcast sync event to notify any open UI components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dealhub:voucher_updated', {
      detail: { voucher: current[index], allVouchers: current }
    }));
  }

  return {
    success: true,
    message: `Xác nhận thành công voucher ${cleanCode}`,
    voucher: current[index],
    record: redemptionRecord,
    allVouchers: current
  };
}

// Mark voucher as used / unused from customer wallet
export async function markVoucherUsedBackend(idOrCode, markAs = true) {
  const clean = String(idOrCode).trim().toUpperCase();
  const current = await fetchVouchersBackend();
  const updated = current.map(v => {
    if (v.id === idOrCode || v.code === clean || v.dealId === idOrCode) {
      return {
        ...v,
        isUsed: markAs,
        is_used: markAs,
        usedAt: markAs ? 'Vừa xong' : null
      };
    }
    return v;
  });

  localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(updated));

  try {
    await supabase.from('vouchers').update({ is_used: markAs }).or(`id.eq.${idOrCode},voucher_code.eq.${clean}`);
  } catch (err) {
    console.warn('Supabase mark voucher used fallback:', err);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dealhub:voucher_updated', {
      detail: { idOrCode, markAs, allVouchers: updated }
    }));
  }

  return updated;
}

// ========================
// 3. FEED POSTS API
// ========================
export async function fetchFeedPostsBackend() {
  try {
    const { data, error } = await supabase.from('feed_posts').select('*');
    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('Supabase feed_posts fallback');
  }

  const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(MOCK_FEED_POSTS));
  return MOCK_FEED_POSTS;
}

export async function likePostBackend(postId) {
  const current = await fetchFeedPostsBackend();
  const updated = current.map(p => {
    if (p.id === postId) {
      return { ...p, likes: (p.likes || 0) + 1 };
    }
    return p;
  });
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  return updated;
}

export async function addCommentBackend(postId, commentText) {
  const current = await fetchFeedPostsBackend();
  const updated = current.map(p => {
    if (p.id === postId) {
      const newComment = {
        id: `c-${Date.now()}`,
        author: 'Khách hàng',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: commentText,
        time: 'Vừa xong'
      };
      return {
        ...p,
        commentsCount: (p.commentsCount || 0) + 1,
        comments: [...(p.comments || []), newComment]
      };
    }
    return p;
  });
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  return updated;
}

export async function updateDealBackend(updatedDeal) {
  const current = await fetchDealsFromBackend();
  const updated = current.map(d => d.id === updatedDeal.id ? { ...d, ...updatedDeal } : d);
  localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(updated));
  try {
    await supabase.from('deals').update(updatedDeal).eq('id', updatedDeal.id);
  } catch (err) {
    console.warn('Supabase update deal fallback:', err);
  }
  return updated;
}

export async function deleteDealBackend(dealId) {
  const current = await fetchDealsFromBackend();
  const updated = current.filter(d => d.id !== dealId);
  localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(updated));
  try {
    await supabase.from('deals').delete().eq('id', dealId);
  } catch (err) {
    console.warn('Supabase delete deal fallback:', err);
  }
  return updated;
}

export async function createFeedPostBackend(newPost) {
  const current = await fetchFeedPostsBackend();
  const updated = [newPost, ...current];
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  try {
    await supabase.from('feed_posts').insert([{
      id: newPost.id,
      author: newPost.author,
      role: newPost.role,
      avatar: newPost.avatar,
      time: newPost.time,
      content: newPost.content,
      images: newPost.images,
      likes: newPost.likes,
      comments_count: newPost.commentsCount,
      attached_deal: newPost.attachedDeal,
      tags: newPost.tags,
      location: newPost.location
    }]);
  } catch (err) {
    console.warn('Supabase create feed post fallback:', err);
  }
  return updated;
}

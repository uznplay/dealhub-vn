-- ===================================================
-- DEALHUB DATABASE SCHEMA FOR SUPABASE
-- Run this script in your Supabase SQL Editor if you wish
-- ===================================================

-- 1. Table: merchants (Thông tin cửa hàng / thương hiệu)
CREATE TABLE IF NOT EXISTS public.merchants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT,
  rating NUMERIC DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: deals (Danh sách ưu đãi địa phương trên bản đồ)
CREATE TABLE IF NOT EXISTS public.deals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  original_price NUMERIC NOT NULL,
  sale_price NUMERIC NOT NULL,
  discount TEXT NOT NULL,
  image TEXT,
  store_name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  distance TEXT,
  badge TEXT,
  description TEXT,
  views_count INT DEFAULT 0,
  saves_count INT DEFAULT 0,
  claims_count INT DEFAULT 0,
  redemptions_count INT DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: vouchers (Kho Voucher của khách hàng)
CREATE TABLE IF NOT EXISTS public.vouchers (
  id TEXT PRIMARY KEY,
  deal_id TEXT NOT NULL,
  voucher_code TEXT UNIQUE NOT NULL,
  customer_name TEXT DEFAULT 'Khách hàng',
  deal_title TEXT NOT NULL,
  store_name TEXT NOT NULL,
  sale_price NUMERIC NOT NULL,
  discount TEXT NOT NULL,
  address TEXT,
  is_used BOOLEAN DEFAULT FALSE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  used_at TIMESTAMPTZ
);

-- 4. Table: feed_posts (Bảng tin săn deal do cửa hàng đăng)
CREATE TABLE IF NOT EXISTS public.feed_posts (
  id TEXT PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  author_role TEXT,
  is_verified BOOLEAN DEFAULT TRUE,
  location TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  image TEXT,
  deal_id TEXT,
  likes INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table: redemptions (Lịch sử quét mã thu ngân tại tiệm)
CREATE TABLE IF NOT EXISTS public.redemptions (
  id TEXT PRIMARY KEY,
  voucher_code TEXT NOT NULL,
  customer_name TEXT,
  service_title TEXT NOT NULL,
  store_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Enable for public read & write demo
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read deals" ON public.deals FOR SELECT USING (true);
CREATE POLICY "Allow public insert deals" ON public.deals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update deals" ON public.deals FOR UPDATE USING (true);

CREATE POLICY "Allow public all vouchers" ON public.vouchers FOR ALL USING (true);
CREATE POLICY "Allow public all feed_posts" ON public.feed_posts FOR ALL USING (true);
CREATE POLICY "Allow public all redemptions" ON public.redemptions FOR ALL USING (true);


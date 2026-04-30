-- ============================================
-- 奋斗日志 - Supabase 数据库一键建表
-- 复制以下所有内容，粘贴到 Supabase SQL Editor 执行
-- ============================================

-- 1. 创建日志表
CREATE TABLE IF NOT EXISTS public.logs (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  day_of_week TEXT NOT NULL DEFAULT '',
  number BIGINT NOT NULL DEFAULT 1,
  quote JSONB NOT NULL DEFAULT '{}'::jsonb,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  slogan TEXT NOT NULL DEFAULT '全心奋进每一天',
  created_at BIGINT NOT NULL DEFAULT extract(epoch from now()) * 1000
);

-- 2. 添加注释（方便查看）
COMMENT ON TABLE public.logs IS '奋斗日志数据表';
COMMENT ON COLUMN public.logs.id IS '主键，使用日期格式 YYYY-MM-DD';
COMMENT ON COLUMN public.logs.date IS '日志日期';
COMMENT ON COLUMN public.logs.day_of_week IS '星期几';
COMMENT ON COLUMN public.logs.number IS '日志编号 NO.XXX';
COMMENT ON COLUMN public.logs.quote IS '每日金句 {line1, line2}';
COMMENT ON COLUMN public.logs.sections IS '内容板块数组 [{id, title, description, imageUrl}]';
COMMENT ON COLUMN public.logs.slogan IS '底部SLOGAN';
COMMENT ON COLUMN public.logs.created_at IS '创建时间戳';

-- 3. 创建索引（加速查询）
CREATE INDEX IF NOT EXISTS idx_logs_date ON public.logs(date DESC);
CREATE INDEX IF NOT EXISTS idx_logs_number ON public.logs(number DESC);

-- 4. 关闭行级安全策略（让API可以读写）
ALTER TABLE public.logs DISABLE ROW LEVEL SECURITY;

-- 5. 创建存储桶（图片上传用）
-- 注意：存储桶需要通过Supabase控制台手动创建，SQL无法创建
-- 请在控制台左侧 Storage → New bucket → 名称填 "images" → 勾选 Public bucket → Create

-- ============================================
-- 执行完成后，左侧 Table Editor 应该能看到 logs 表
-- ============================================

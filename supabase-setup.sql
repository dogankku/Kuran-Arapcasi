-- Ayet Hafızası — Supabase kurulum SQL'i
-- Supabase Dashboard → SQL Editor → New query → bu dosyanın tamamını yapıştır → Run.
-- Birden fazla kez çalıştırmak güvenlidir.

-- Kullanıcı ilerleme tablosu (her kullanıcı için tek satır)
create table if not exists public.user_progress (
  id         uuid primary key references auth.users(id) on delete cascade,
  progress   jsonb       not null default '{}',
  streak     jsonb       not null default '{}',
  updated_at timestamptz not null default now()
);

-- Satır düzeyi güvenlik: herkes yalnızca kendi satırını görebilir ve değiştirebilir
alter table public.user_progress enable row level security;

drop policy if exists "own_data" on public.user_progress;
create policy "own_data" on public.user_progress
  for all
  to authenticated
  using      ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- GitHub → Settings → Secrets and variables → Actions altına eklenecek gizli değerler:
--   NEXT_PUBLIC_SUPABASE_URL             = https://<proje-id>.supabase.co
--   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = sb_publishable_...   (Publishable key)
-- Yerel geliştirme için aynı iki değeri .env.local dosyasına yaz.

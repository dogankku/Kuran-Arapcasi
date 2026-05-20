-- Supabase kurulum SQL'i
-- Bu dosyayı Supabase Dashboard > SQL Editor'da çalıştır

-- Kullanıcı ilerleme tablosu
create table if not exists public.user_progress (
  id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}',
  streak   jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Satır düzeyi güvenlik (RLS)
alter table public.user_progress enable row level security;

-- Her kullanıcı yalnızca kendi verisini okuyabilir / yazabilir
create policy "own_data" on public.user_progress
  using      (auth.uid() = id)
  with check (auth.uid() = id);

-- Ortam değişkenleri (.env.local dosyasına veya GitHub Secrets'a ekle):
--   NEXT_PUBLIC_SUPABASE_URL  = https://<proje-id>.supabase.co
--   NEXT_PUBLIC_SUPABASE_ANON_KEY = <anon-public-key>

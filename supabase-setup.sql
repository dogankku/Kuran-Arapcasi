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

-- Hoca (kişisel ders planı, eksikler, tekrar takvimi)
alter table public.user_progress add column if not exists tutor jsonb not null default '{}';

-- Satır düzeyi güvenlik: herkes yalnızca kendi satırını görebilir ve değiştirebilir
alter table public.user_progress enable row level security;

drop policy if exists "own_data" on public.user_progress;
create policy "own_data" on public.user_progress
  for all
  to authenticated
  using      ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Tablo izni: bu olmadan giriş yapmış kullanıcılar 403 (permission denied) alır
-- ve ilerleme cihazlar arasında senkronlanmaz.
grant select, insert, update on public.user_progress to authenticated;

-- Proje URL'si ve publishable anahtarı .github/workflows/deploy.yml içinde tanımlıdır.
-- Yerel geliştirme için aynı iki değeri .env.local dosyasına yaz.

import { createClient } from "@supabase/supabase-js";

// Supabase'in yeni "publishable" anahtarı (sb_publishable_...) tercih edilir;
// eski "anon" anahtarı da geriye dönük olarak desteklenir. İkisi de tarayıcıda
// kullanılmak üzere tasarlanmış, herkese açık olabilen anahtarlardır.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export const supabase = url && key
  ? createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;
export const isConfigured = !!(url && key);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** E-posta doğrulama ve şifre sıfırlama bağlantılarının döneceği adres. */
export function authRedirectUrl(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${BASE}/dashboard/`;
}

/** Supabase hata mesajlarını Türkçeye çevirir. */
export function authErrorTr(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-posta veya şifre hatalı.";
  if (m.includes("email not confirmed")) return "E-posta adresin henüz doğrulanmadı. Gelen kutunu (ve gereksiz klasörünü) kontrol et.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Bu e-posta zaten kayıtlı. Giriş yapmayı dene.";
  if (m.includes("password should be at least") || m.includes("weak password")) return "Şifre çok zayıf. En az 6 karakter kullan.";
  if (m.includes("same as the old") || m.includes("different from the old")) return "Yeni şifre eskisinden farklı olmalı.";
  if (m.includes("rate limit") || m.includes("too many") || m.includes("security purposes")) return "Çok fazla deneme yapıldı. Lütfen biraz bekleyip tekrar dene.";
  if (m.includes("invalid email") || m.includes("unable to validate email")) return "Geçerli bir e-posta adresi gir.";
  if (m.includes("failed to fetch") || m.includes("network")) return "Sunucuya ulaşılamadı. İnternet bağlantını kontrol et.";
  return msg;
}

export interface DbProgress {
  id: string;
  progress: Record<string, unknown>;
  streak: Record<string, unknown>;
  updated_at: string;
}

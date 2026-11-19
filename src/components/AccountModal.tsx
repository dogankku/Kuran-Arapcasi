"use client";
import { useState } from "react";
import { supabase, authErrorTr } from "@/lib/supabase";
import { PasswordInput, Notice, SubmitButton, type AuthUser } from "@/components/AuthModal";
import Icon from "@/components/Icon";

/**
 * Hesap paneli (mode="account") veya şifre sıfırlama bağlantısından gelindiğinde
 * yeni şifre belirleme ekranı (mode="recovery").
 */
export default function AccountModal({ user, mode, onClose, onLogout, onUsernameChange }: {
  user: AuthUser | null;
  mode: "account" | "recovery";
  onClose: () => void;
  onLogout: () => void;
  onUsernameChange: (name: string) => void;
}) {
  const [name, setName] = useState(user?.username ?? "");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState<"" | "name" | "pw">("");

  async function saveName(e: React.FormEvent) {
    e.preventDefault(); setError(""); setInfo("");
    const n = name.trim();
    if (!n) { setError("Kullanıcı adı boş olamaz."); return; }
    if (!supabase) return;
    setLoading("name");
    try {
      const { error: err } = await supabase.auth.updateUser({ data: { username: n } });
      if (err) throw err;
      onUsernameChange(n); setInfo("Kullanıcı adı güncellendi.");
    } catch (err) { setError(authErrorTr(err)); }
    finally { setLoading(""); }
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault(); setError(""); setInfo("");
    if (pw.length < 6) { setError("Şifre en az 6 karakter olmalı."); return; }
    if (pw !== pw2) { setError("Şifreler birbiriyle aynı değil."); return; }
    if (!supabase) return;
    setLoading("pw");
    try {
      const { error: err } = await supabase.auth.updateUser({ password: pw });
      if (err) throw err;
      setPw(""); setPw2("");
      setInfo(mode === "recovery" ? "Yeni şifren kaydedildi. Artık bu şifreyle giriş yapabilirsin." : "Şifren güncellendi.");
    } catch (err) { setError(authErrorTr(err)); }
    finally { setLoading(""); }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto"
         style={{ background: "rgba(10,16,22,0.88)", backdropFilter: "blur(6px)" }}
         onClick={e => { if (e.target === e.currentTarget && mode === "account") onClose(); }}>
      <div className="w-full max-w-md my-auto duo-card rounded-[1.75rem] p-6 sm:p-8 relative">
        <button onClick={onClose} aria-label="Kapat"
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-stone-400 hover:text-white bg-black/30"><Icon name="carpi" size="1em" /></button>

        {mode === "account" ? (
          <>
            <h2 className="text-xl font-bold text-white mb-1">Hesabım</h2>
            <p className="text-stone-400 text-sm mb-6 break-all">{user?.email}</p>
            <form onSubmit={saveName} className="space-y-2 mb-6">
              <label className="block text-stone-300 text-sm font-medium">Kullanıcı adı</label>
              <div className="flex gap-2">
                <input value={name} onChange={e => setName(e.target.value)} maxLength={40}
                  className="flex-1 min-w-0 bg-stone-900/70 border border-stone-700 focus:border-emerald-500/60 rounded-xl px-4 py-2.5 text-white outline-none text-sm" />
                <button type="submit" disabled={loading === "name"}
                  className="px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold disabled:opacity-60">
                  {loading === "name" ? "..." : "Kaydet"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-1">Yeni şifre belirle</h2>
            <p className="text-stone-400 text-sm mb-6">Hesabın için yeni bir şifre yaz.</p>
          </>
        )}

        <form onSubmit={savePassword} className="space-y-3">
          {mode === "account" && <div className="text-stone-300 text-sm font-medium">Şifre değiştir</div>}
          <PasswordInput value={pw} onChange={setPw} placeholder="Yeni şifre (en az 6 karakter)" autoComplete="new-password" />
          <PasswordInput value={pw2} onChange={setPw2} placeholder="Yeni şifre (tekrar)" autoComplete="new-password" />
          {error && <Notice kind="error">{error}</Notice>}
          {info && <Notice kind="ok">{info}</Notice>}
          <SubmitButton loading={loading === "pw"} label="Şifreyi Kaydet" loadingLabel="Kaydediliyor..." />
        </form>

        {mode === "account" && (
          <button onClick={onLogout}
            className="w-full mt-5 py-2.5 rounded-xl border border-red-500/40 text-red-300 hover:bg-red-500/10 text-sm font-semibold transition">
            Çıkış Yap
          </button>
        )}
      </div>
    </div>
  );
}

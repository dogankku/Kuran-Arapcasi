"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  onSuccess: (user: { id: string; email: string; username: string }) => void;
}

export default function AuthModal({ onSuccess }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("E-posta ve şifre zorunludur."); return; }
    if (mode === "register" && !username.trim()) { setError("Kullanıcı adı zorunludur."); return; }
    if (password.length < 6) { setError("Şifre en az 6 karakter olmalı."); return; }
    if (!supabase) { setError("Sunucu bağlantısı yapılandırılmamış."); return; }

    setLoading(true);
    try {
      if (mode === "register") {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: { data: { username: username.trim() } },
        });
        if (err) throw err;
        if (data.user) {
          onSuccess({ id: data.user.id, email: data.user.email!, username: username.trim() });
        } else {
          setError("Kayıt başarılı! E-postanı doğruladıktan sonra giriş yap.");
        }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (err) throw err;
        const u = data.user;
        onSuccess({
          id: u.id,
          email: u.email!,
          username: (u.user_metadata?.username as string) || u.email!.split("@")[0],
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Invalid login credentials")) setError("E-posta veya şifre hatalı.");
      else if (msg.includes("Email not confirmed")) setError("E-postanı doğrulamanı bekliyoruz. Gelen kutunu kontrol et.");
      else if (msg.includes("User already registered")) setError("Bu e-posta zaten kayıtlı. Giriş yap.");
      else setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
         style={{background:"rgba(10,16,22,0.92)", backdropFilter:"blur(8px)"}}>
      <div className="w-full max-w-md">
        {/* Logo / başlık */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🕌</div>
          <h1 className="text-3xl font-bold text-white mb-1">Ayet Hafızası</h1>
          <p className="text-stone-400 text-sm">300 kelimeyle Kur'an'ın %90'ını anla</p>
        </div>

        <div className="duo-card rounded-[1.75rem] p-6 sm:p-8">
          {/* Mod seçici */}
          <div className="flex gap-2 mb-6 p-1 bg-stone-900/60 rounded-2xl">
            {(["login","register"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition ${mode===m ? "bg-emerald-500 text-white shadow-lg" : "text-stone-400 hover:text-white"}`}>
                {m === "login" ? "Giriş Yap" : "Kayıt Ol"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-stone-300 text-sm font-medium mb-1.5">Kullanıcı Adı</label>
                <input value={username} onChange={e => setUsername(e.target.value)}
                  placeholder="Adın ya da takma adın"
                  className="w-full bg-stone-900/70 border border-stone-700 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-white placeholder-stone-500 outline-none transition text-sm" />
              </div>
            )}
            <div>
              <label className="block text-stone-300 text-sm font-medium mb-1.5">E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ornek@email.com" autoComplete="email"
                className="w-full bg-stone-900/70 border border-stone-700 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-white placeholder-stone-500 outline-none transition text-sm" />
            </div>
            <div>
              <label className="block text-stone-300 text-sm font-medium mb-1.5">Şifre</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="En az 6 karakter" autoComplete={mode==="login" ? "current-password" : "new-password"}
                  className="w-full bg-stone-900/70 border border-stone-700 focus:border-emerald-500/60 rounded-xl px-4 py-3 pr-12 text-white placeholder-stone-500 outline-none transition text-sm" />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-lg">
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="duo-btn duo-btn-green w-full mt-2 text-base"
              style={{minHeight:"3rem"}}>
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Giriş yapılıyor..." : "Kayıt olunuyor..."}
                </span>
              ) : (mode === "login" ? "Giriş Yap" : "Kayıt Ol")}
            </button>
          </form>

          <p className="text-center text-stone-500 text-xs mt-5">
            {mode === "login" ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}{" "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition">
              {mode === "login" ? "Kayıt ol" : "Giriş yap"}
            </button>
          </p>
        </div>

        <p className="text-center text-stone-600 text-xs mt-4">
          Kur'an öğrenme yolculuğun burada başlıyor 🌿
        </p>
      </div>
    </div>
  );
}

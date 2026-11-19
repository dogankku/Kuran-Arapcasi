"use client";
import { useState } from "react";
import { supabase, authRedirectUrl, authErrorTr } from "@/lib/supabase";

export type AuthUser = { id: string; email: string; username: string };

interface Props {
  onSuccess: (user: AuthUser) => void;
}

type Mode = "login" | "register" | "forgot";

const inputCls =
  "w-full bg-stone-900/70 border border-stone-700 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-white placeholder-stone-500 outline-none transition text-sm";

export function PasswordInput({ value, onChange, placeholder, autoComplete }: {
  value: string; onChange: (v: string) => void; placeholder: string; autoComplete: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoComplete={autoComplete} className={`${inputCls} pr-12`} />
      <button type="button" onClick={() => setShow(v => !v)} aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-lg">
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}

export function Notice({ kind, children }: { kind: "error" | "ok"; children: React.ReactNode }) {
  return (
    <div className={kind === "error"
      ? "bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm"
      : "bg-emerald-500/15 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-200 text-sm"}>
      {children}
    </div>
  );
}

export function SubmitButton({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  return (
    <button type="submit" disabled={loading} className="duo-btn duo-btn-green w-full mt-2 text-base" style={{ minHeight: "3rem" }}>
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {loadingLabel}
        </span>
      ) : label}
    </button>
  );
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default function AuthModal({ onSuccess }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  function switchMode(m: Mode) { setMode(m); setError(""); setInfo(""); setPassword(""); setPassword2(""); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setInfo("");
    const mail = email.trim().toLowerCase();
    if (!isEmail(mail)) { setError("Geçerli bir e-posta adresi gir."); return; }
    if (!supabase) { setError("Giriş sistemi henüz yapılandırılmamış."); return; }

    if (mode === "forgot") {
      setLoading(true);
      try {
        const { error: err } = await supabase.auth.resetPasswordForEmail(mail, { redirectTo: authRedirectUrl() });
        if (err) throw err;
        setInfo("Bu e-posta kayıtlıysa şifre sıfırlama bağlantısı gönderildi. Gelen kutunu kontrol et.");
      } catch (err) { setError(authErrorTr(err)); }
      finally { setLoading(false); }
      return;
    }

    if (password.length < 6) { setError("Şifre en az 6 karakter olmalı."); return; }
    if (mode === "register") {
      if (!username.trim()) { setError("Kullanıcı adı zorunludur."); return; }
      if (password !== password2) { setError("Şifreler birbiriyle aynı değil."); return; }
    }

    setLoading(true);
    try {
      if (mode === "register") {
        const { data, error: err } = await supabase.auth.signUp({
          email: mail, password,
          options: { data: { username: username.trim() }, emailRedirectTo: authRedirectUrl() },
        });
        if (err) throw err;
        if (data.session && data.user) {
          onSuccess({ id: data.user.id, email: data.user.email!, username: username.trim() });
        } else {
          setMode("login"); setPassword(""); setPassword2("");
          setInfo(`Kayıt alındı! ${mail} adresine bir doğrulama e-postası gönderdik. Bağlantıya tıkladıktan sonra giriş yapabilirsin.`);
        }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email: mail, password });
        if (err) throw err;
        const u = data.user;
        onSuccess({ id: u.id, email: u.email!, username: (u.user_metadata?.username as string) || u.email!.split("@")[0] });
      }
    } catch (err) {
      setError(authErrorTr(err));
    } finally {
      setLoading(false);
    }
  }

  async function resendConfirmation() {
    const mail = email.trim().toLowerCase();
    if (!supabase || !isEmail(mail)) { setError("Önce e-posta adresini yaz."); return; }
    setLoading(true); setError("");
    try {
      const { error: err } = await supabase.auth.resend({ type: "signup", email: mail, options: { emailRedirectTo: authRedirectUrl() } });
      if (err) throw err;
      setInfo("Doğrulama e-postası tekrar gönderildi.");
    } catch (err) { setError(authErrorTr(err)); }
    finally { setLoading(false); }
  }

  const title = mode === "forgot" ? "Şifreni sıfırla" : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
         style={{ background: "rgba(10,16,22,0.94)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-md my-auto">
        <div className="text-center mb-7">
          <div className="text-5xl mb-3">🕌</div>
          <h1 className="text-3xl font-bold text-white mb-1">Ayet Hafızası</h1>
          <p className="text-stone-400 text-sm">En sık geçen kelimelerle Kur'an'ı anlamaya başla</p>
        </div>

        <div className="duo-card rounded-[1.75rem] p-6 sm:p-8">
          {mode !== "forgot" ? (
            <div className="flex gap-2 mb-6 p-1 bg-stone-900/60 rounded-2xl" role="tablist">
              {(["login", "register"] as const).map(m => (
                <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => switchMode(m)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition ${mode === m ? "bg-emerald-500 text-white shadow-lg" : "text-stone-400 hover:text-white"}`}>
                  {m === "login" ? "Giriş Yap" : "Kayıt Ol"}
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
              <p className="text-stone-400 text-sm">Kayıtlı e-posta adresini yaz; sana yeni şifre belirleme bağlantısı gönderelim.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === "register" && (
              <div>
                <label className="block text-stone-300 text-sm font-medium mb-1.5">Kullanıcı Adı</label>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Adın ya da takma adın"
                  autoComplete="nickname" maxLength={40} className={inputCls} />
              </div>
            )}
            <div>
              <label className="block text-stone-300 text-sm font-medium mb-1.5">E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@email.com"
                autoComplete="email" inputMode="email" className={inputCls} />
            </div>
            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-stone-300 text-sm font-medium">Şifre</label>
                  {mode === "login" && (
                    <button type="button" onClick={() => switchMode("forgot")} className="text-xs text-emerald-400 hover:text-emerald-300">
                      Şifremi unuttum
                    </button>
                  )}
                </div>
                <PasswordInput value={password} onChange={setPassword} placeholder="En az 6 karakter"
                  autoComplete={mode === "login" ? "current-password" : "new-password"} />
              </div>
            )}
            {mode === "register" && (
              <div>
                <label className="block text-stone-300 text-sm font-medium mb-1.5">Şifre (tekrar)</label>
                <PasswordInput value={password2} onChange={setPassword2} placeholder="Şifreni tekrar yaz" autoComplete="new-password" />
              </div>
            )}

            {error && (
              <Notice kind="error">
                {error}
                {error.includes("doğrulanmadı") && (
                  <button type="button" onClick={resendConfirmation} className="block mt-2 underline text-red-200 hover:text-white">
                    Doğrulama e-postasını tekrar gönder
                  </button>
                )}
              </Notice>
            )}
            {info && <Notice kind="ok">{info}</Notice>}

            <SubmitButton loading={loading}
              label={mode === "login" ? "Giriş Yap" : mode === "register" ? "Kayıt Ol" : "Sıfırlama Bağlantısı Gönder"}
              loadingLabel={mode === "login" ? "Giriş yapılıyor..." : mode === "register" ? "Kayıt olunuyor..." : "Gönderiliyor..."} />
          </form>

          <p className="text-center text-stone-500 text-xs mt-5">
            {mode === "forgot" ? (
              <button type="button" onClick={() => switchMode("login")} className="text-emerald-400 hover:text-emerald-300 font-medium">← Girişe dön</button>
            ) : (
              <>
                {mode === "login" ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}{" "}
                <button type="button" onClick={() => switchMode(mode === "login" ? "register" : "login")}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition">
                  {mode === "login" ? "Kayıt ol" : "Giriş yap"}
                </button>
              </>
            )}
          </p>
        </div>

        <p className="text-center text-stone-600 text-xs mt-4">
          İlerlemen hesabına kaydedilir; her cihazdan kaldığın yerden devam edersin 🌿
        </p>
      </div>
    </div>
  );
}

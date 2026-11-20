"use client";
// Kelime Kelime Meal: Kur'an'ın tamamı, sure sure.
// Her kelime üç satır: Arapça (üstte), okunuş (ortada), Türkçe anlam (altta), ayrı renklerde.
// Hafız sesine göre ok takibi (QDC kelime zamanlamaları), yoksa tahmini zamanlama.
import { useCallback, useEffect, useRef, useState, memo } from "react";
import Link from "next/link";
import { SURAH_LIST, getGlobalAyah } from "@/data/surahList";
import Icon from "@/components/Icon";
import { SurahSidebar } from "@/components/HatimModule";
import {
  fetchSurahVerses, fetchWordTimings, getHatimAudioUrl, HATIM_RECITERS,
  type HatimReciter, type Segment,
} from "@/lib/hatimApi";

// ── Renkler ────────────────────────────────────────────────────────────────
const C = {
  ar: "#f5e6c0",        // Arapça: krem
  tl: "#7dd3fc",        // okunuş: açık mavi
  tr: "#fbbf24",        // anlam: kehribar
  active: "rgba(239,68,68,0.22)",
  arrow: "#ef4444",
};
const AR_FONT = '"KFGQPC Uthmanic Script HAFS","Amiri Quran","Scheherazade New","Noto Naskh Arabic","Traditional Arabic",serif';
const BASMALA = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
const LAST_KEY = "kelime-meal-last-v1";
const SETTINGS_KEY = "kelime-meal-settings-v1";

// ── Veri ───────────────────────────────────────────────────────────────────
interface WbwWord { ar: string; tl: string; tr: string }
interface WbwVerse { n: number; words: WbwWord[]; meal: string }

/** Akademik transliterasyonu (al-ḥamdu) Türkçe okunuşa (el-hamdu) yaklaştırır. */
export function toTurkishReading(s: string): string {
  if (!s) return "";
  let t = s.replace(/'/g, "").toLowerCase(); // Quran.com'da ' hece ayıracı; ayın ʿ ile gelir
  const pairs: [RegExp, string][] = [
    [/sh/g, "ş"], [/kh/g, "h"], [/gh/g, "ğ"], [/th/g, "s"], [/dh/g, "z"],
    [/ḥ/g, "h"], [/ṣ/g, "s"], [/ḍ/g, "d"], [/ṭ/g, "t"], [/ẓ/g, "z"], [/ḏ/g, "z"], [/ṯ/g, "s"],
    [/q/g, "k"], [/j/g, "c"], [/w/g, "v"],
    [/ā/g, "â"], [/ī/g, "î"], [/ū/g, "û"],
    [/ʿ/g, "'"], [/ʾ/g, "'"], [/’/g, "'"],
    [/^al-/g, "el-"],
  ];
  for (const [re, rep] of pairs) t = t.replace(re, rep);
  return t;
}

const wbwCache = new Map<number, WbwVerse[]>();

async function fetchWbw(ch: number): Promise<WbwVerse[]> {
  if (wbwCache.has(ch)) return wbwCache.get(ch)!;
  const ssKey = `wbw_tr_${ch}`;
  try {
    const s = sessionStorage.getItem(ssKey);
    if (s) { const v = JSON.parse(s) as WbwVerse[]; wbwCache.set(ch, v); return v; }
  } catch { /* yoksay */ }

  type ApiWord = { text_uthmani?: string; char_type_name?: string; transliteration?: { text?: string | null }; translation?: { text?: string | null } };
  type ApiVerse = { verse_number: number; words: ApiWord[] };
  const out: WbwVerse[] = [];
  let page: number | null = 1;
  while (page) {
    const res: Response = await fetch(
      `https://api.qurancdn.com/api/qdc/verses/by_chapter/${ch}?words=true&word_fields=text_uthmani&word_translation_language=tr&per_page=50&page=${page}`,
      { mode: "cors" },
    );
    if (!res.ok) throw new Error(`Kelime meali alınamadı (HTTP ${res.status})`);
    const data: { verses: ApiVerse[]; pagination?: { next_page?: number | null } } = await res.json();
    for (const v of data.verses) {
      out.push({
        n: v.verse_number,
        meal: "",
        words: v.words.filter(w => w.char_type_name === "word").map(w => ({
          ar: w.text_uthmani ?? "",
          tl: toTurkishReading(w.transliteration?.text ?? ""),
          tr: w.translation?.text ?? "",
        })),
      });
    }
    page = data.pagination?.next_page ?? null;
  }
  // Ayet meali (Diyanet)
  try {
    const meal = await fetchSurahVerses(ch);
    const m = new Map(meal.map(v => [v.n, v.tr]));
    for (const v of out) v.meal = m.get(v.n) ?? "";
  } catch { /* meal olmadan da çalışır */ }

  wbwCache.set(ch, out);
  try { sessionStorage.setItem(ssKey, JSON.stringify(out)); } catch { /* kota */ }
  return out;
}

type Settings = { showTl: boolean; showTr: boolean; showMeal: boolean; size: number };
const DEFAULT_SETTINGS: Settings = { showTl: true, showTr: true, showMeal: true, size: 1 };

// ── Ayet satırı ────────────────────────────────────────────────────────────
const VerseBlock = memo(function VerseBlock({
  verse, isActive, settings, onSelect, onWordPlay,
}: {
  verse: WbwVerse; isActive: boolean; settings: Settings;
  onSelect: (n: number) => void; onWordPlay: (n: number, idx: number) => void;
}) {
  const s = settings.size;
  return (
    <div
      data-verse-n={verse.n}
      onClick={() => onSelect(verse.n)}
      className={`rounded-2xl p-3 sm:p-4 mb-3 cursor-pointer border transition-colors
        ${isActive ? "bg-amber-500/10 border-amber-500/40" : "bg-[#1F2F38]/60 border-[#2A4050] hover:border-amber-500/30"}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border"
          style={{ borderColor: isActive ? "#f59e0b" : "#2A4050", color: isActive ? "#fbbf24" : "#8FA8B4" }}>{verse.n}</span>
      </div>
      <div dir="rtl" className="flex flex-wrap justify-start gap-x-1 gap-y-3">
        {verse.words.map((w, idx) => (
          <div
            key={idx}
            data-word-key={`${verse.n}-${idx}`}
            onClick={e => { e.stopPropagation(); onWordPlay(verse.n, idx); }}
            title="Bu kelimeden itibaren dinle"
            className="flex flex-col items-center text-center rounded-xl px-1.5 pt-1 pb-0.5 transition-colors"
            style={{ minWidth: `${3.2 * s}rem`, maxWidth: `${9 * s}rem` }}
          >
            <span dir="rtl" style={{ fontFamily: AR_FONT, fontSize: `${1.75 * s}rem`, lineHeight: 1.5, color: C.ar }}>{w.ar}</span>
            {settings.showTl && (
              <span dir="ltr" className="italic leading-tight" style={{ fontSize: `${0.78 * s}rem`, color: C.tl }}>{w.tl}</span>
            )}
            {settings.showTr && (
              <span dir="ltr" className="leading-tight mt-0.5" style={{ fontSize: `${0.78 * s}rem`, color: C.tr }}>{w.tr}</span>
            )}
            <span data-arrow="1" style={{ height: 14, lineHeight: "14px", fontSize: 12, fontWeight: 700, color: "transparent" }}>▲</span>
          </div>
        ))}
      </div>
      {settings.showMeal && verse.meal && (
        <p className="mt-2 text-sm text-stone-400 leading-relaxed border-t border-[#2A4050] pt-2">{verse.meal}</p>
      )}
    </div>
  );
});

// ── Ana modül ──────────────────────────────────────────────────────────────
export default function WordByWordModule() {
  const [surahNum, setSurahNum] = useState(1);
  const [verses, setVerses] = useState<WbwVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reciter, setReciter] = useState<HatimReciter>(HATIM_RECITERS[1]);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasTimings, setHasTimings] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [reloadKey, setReloadKey] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef(0);
  const activeElemRef = useRef<HTMLElement | null>(null);
  const timingsRef = useRef<Map<number, Segment[]>>(new Map());
  const curVerseRef = useRef(1);
  const autoNextRef = useRef(true);
  const versesRef = useRef<WbwVerse[]>([]);
  const playVerseRef = useRef<(n: number, fromWord?: number) => void>(() => {});
  const restoredRef = useRef(false);
  const pendingVerseRef = useRef<number | null>(null);
  const surahMeta = SURAH_LIST[surahNum - 1];

  curVerseRef.current = currentVerse;
  autoNextRef.current = autoNext;
  versesRef.current = verses;

  // Son kalınan yer ve ayarlar
  useEffect(() => {
    try {
      const last = JSON.parse(localStorage.getItem(LAST_KEY) || "null") as { s: number; v: number } | null;
      if (last && last.s >= 1 && last.s <= 114) { setSurahNum(last.s); pendingVerseRef.current = last.v; }
      const st = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
      if (st) setSettings({ ...DEFAULT_SETTINGS, ...st });
    } catch { /* yoksay */ }
    restoredRef.current = true;
  }, []);
  useEffect(() => {
    if (!restoredRef.current) return;
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* yoksay */ }
  }, [settings]);
  useEffect(() => {
    if (!restoredRef.current || !verses.length) return;
    try { localStorage.setItem(LAST_KEY, JSON.stringify({ s: surahNum, v: currentVerse })); } catch { /* yoksay */ }
  }, [surahNum, currentVerse, verses.length]);

  const paint = (el: HTMLElement | null, on: boolean) => {
    if (!el) return;
    el.style.background = on ? C.active : "transparent";
    el.style.boxShadow = on ? "0 0 16px rgba(239,68,68,0.45)" : "none";
    const a = el.querySelector<HTMLElement>('[data-arrow="1"]');
    if (a) a.style.color = on ? C.arrow : "transparent";
  };
  const clearActive = useCallback(() => { paint(activeElemRef.current, false); activeElemRef.current = null; }, []);

  // Sure yükle
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(""); setVerses([]); setHasTimings(false); setIsPlaying(false);
    timingsRef.current = new Map(); clearActive();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.removeAttribute("src"); }
    Promise.all([fetchWbw(surahNum), fetchWordTimings(surahNum, reciter.qdcId)])
      .then(([v, t]) => {
        if (cancelled) return;
        setVerses(v);
        timingsRef.current = t; setHasTimings(t.size > 0);
        const start = pendingVerseRef.current && pendingVerseRef.current <= v.length ? pendingVerseRef.current : 1;
        pendingVerseRef.current = null;
        setCurrentVerse(start);
        requestAnimationFrame(() => document.querySelector(`[data-verse-n="${start}"]`)?.scrollIntoView({ block: "center" }));
      })
      .catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : String(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [surahNum, reciter, clearActive, reloadKey]);

  // Ok takibi
  const track = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    const ms = audio.currentTime * 1000;
    const vn = curVerseRef.current;
    const segs = timingsRef.current.get(vn);
    let found = -1;
    if (segs?.length) for (const [w, start] of segs) { if (ms >= start) found = w - 1; else break; }
    const el = found >= 0 ? document.querySelector<HTMLElement>(`[data-word-key="${vn}-${found}"]`) : null;
    if (activeElemRef.current !== el) {
      paint(activeElemRef.current, false);
      paint(el, true);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      activeElemRef.current = el;
    }
    rafRef.current = requestAnimationFrame(track);
  }, []);

  const playVerse = useCallback((vn: number, fromWord?: number) => {
    cancelAnimationFrame(rafRef.current);
    clearActive();
    setCurrentVerse(vn); curVerseRef.current = vn;
    document.querySelector(`[data-verse-n="${vn}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.onplay = null; audio.onended = null; audio.onloadedmetadata = null;
    audio.pause();
    audio.src = getHatimAudioUrl(reciter, getGlobalAyah(surahNum, vn));
    audio.playbackRate = speed;
    audio.onloadedmetadata = () => {
      // Zamanlama yoksa: ayet süresini kelimelere eşit böl
      if (!timingsRef.current.has(vn)) {
        const n = versesRef.current.find(v => v.n === vn)?.words.length ?? 0;
        if (n && isFinite(audio.duration)) {
          const per = (audio.duration * 1000) / n;
          const m = new Map(timingsRef.current);
          m.set(vn, Array.from({ length: n }, (_, i): Segment => [i + 1, Math.round(i * per), Math.round((i + 1) * per)]));
          timingsRef.current = m; setHasTimings(true);
        }
      }
      if (fromWord !== undefined) {
        const seg = timingsRef.current.get(vn)?.find(s => s[0] === fromWord + 1);
        if (seg) audio.currentTime = seg[1] / 1000;
      }
    };
    audio.onplay = () => { setIsPlaying(true); cancelAnimationFrame(rafRef.current); rafRef.current = requestAnimationFrame(track); };
    audio.onended = () => {
      clearActive(); cancelAnimationFrame(rafRef.current); setIsPlaying(false);
      if (autoNextRef.current && vn < versesRef.current.length) playVerseRef.current(vn + 1);
    };
    audio.play().catch(() => setIsPlaying(false));
  }, [surahNum, reciter, speed, track, clearActive]);
  playVerseRef.current = playVerse;

  useEffect(() => { if (audioRef.current) audioRef.current.playbackRate = speed; }, [speed]);
  useEffect(() => () => { cancelAnimationFrame(rafRef.current); audioRef.current?.pause(); }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (isPlaying) { a?.pause(); cancelAnimationFrame(rafRef.current); setIsPlaying(false); return; }
    if (a?.src && a.paused && a.currentTime > 0 && !a.ended) { a.play().catch(() => {}); return; }
    playVerse(currentVerse);
  };
  const onSelect = useCallback((n: number) => playVerseRef.current(n), []);
  const onWordPlay = useCallback((n: number, idx: number) => playVerseRef.current(n, idx), []);
  const toggle = (k: keyof Omit<Settings, "size">) => setSettings(s => ({ ...s, [k]: !s[k] }));
  const chip = (on: boolean) => `shrink-0 text-xs px-2.5 py-1 rounded-full border transition-colors ${on ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "border-[#2A4050] text-stone-500"}`;

  return (
    <div className="flex h-screen bg-[#0F1923] text-white overflow-hidden" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Sure listesi */}
      <div className={`fixed inset-0 z-40 transition-opacity md:static md:opacity-100 md:pointer-events-auto
        ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"}`}>
        <div className="absolute inset-0 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
        <div className="absolute inset-y-0 left-0 w-72 z-10 md:static md:w-64 md:shrink-0 h-full">
          <SurahSidebar selected={surahNum} onSelect={n => { setSurahNum(n); setSidebarOpen(false); }} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-[#2A4050] bg-[#111C24]">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-[#1F2F38] text-stone-400" aria-label="Sure listesi">☰</button>
          <Link href="/dashboard" className="text-stone-500 hover:text-amber-400 text-sm">← Derse Dön</Link>
          <div className="flex-1 text-center">
            <div className="text-xl font-bold text-amber-400" style={{ fontFamily: AR_FONT }}>{surahMeta.ar}</div>
            <div className="text-xs text-stone-400">{surahMeta.n}. {surahMeta.tr} · {surahMeta.meaning} · {surahMeta.vc} ayet</div>
          </div>
          <Link href="/hatim" className="text-stone-500 hover:text-amber-400 text-xs hidden sm:inline">Hatim görünümü</Link>
        </header>

        {/* Görünüm ayarları + renk açıklaması */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2 border-b border-[#2A4050] overflow-x-auto no-scrollbar bg-[#111C24]/50">
          <span className="shrink-0 text-xs font-bold" style={{ color: C.ar, fontFamily: AR_FONT }}>عربي</span>
          <button onClick={() => toggle("showTl")} className={chip(settings.showTl)}><span style={{ color: C.tl }}>●</span> Okunuş</button>
          <button onClick={() => toggle("showTr")} className={chip(settings.showTr)}><span style={{ color: C.tr }}>●</span> Kelime anlamı</button>
          <button onClick={() => toggle("showMeal")} className={chip(settings.showMeal)}>Ayet meali</button>
          <div className="shrink-0 flex items-center gap-1 ml-1">
            <button onClick={() => setSettings(s => ({ ...s, size: Math.max(0.8, +(s.size - 0.1).toFixed(1)) }))} className={chip(false)} aria-label="Yazıyı küçült">A−</button>
            <button onClick={() => setSettings(s => ({ ...s, size: Math.min(1.6, +(s.size + 0.1).toFixed(1)) }))} className={chip(false)} aria-label="Yazıyı büyüt">A+</button>
          </div>
          <div className="flex-1" />
          {HATIM_RECITERS.map(r => (
            <button key={r.qdcId} onClick={() => setReciter(r)} className={chip(reciter.qdcId === r.qdcId)}>{r.name}</button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
          {loading && (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <p className="text-stone-400 text-sm">{surahMeta.tr} yükleniyor…</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12 text-red-400 text-sm">
              {error}
              <button onClick={() => setReloadKey(k => k + 1)} className="block mt-3 underline text-amber-400 mx-auto">Tekrar dene</button>
            </div>
          )}
          {!loading && !error && verses.length > 0 && (
            <>
              {surahNum !== 1 && surahNum !== 9 && (
                <div dir="rtl" className="text-center text-2xl mb-5 py-3 border-b border-[#2A4050] text-amber-200/70" style={{ fontFamily: AR_FONT }}>{BASMALA}</div>
              )}
              {verses.map(v => (
                <VerseBlock key={v.n} verse={v} isActive={currentVerse === v.n} settings={settings} onSelect={onSelect} onWordPlay={onWordPlay} />
              ))}
              <div className="flex justify-between gap-3 py-4">
                <button disabled={surahNum <= 1} onClick={() => setSurahNum(n => n - 1)} className={chip(false) + " disabled:opacity-30"}>← Önceki sure</button>
                <button disabled={surahNum >= 114} onClick={() => setSurahNum(n => n + 1)} className={chip(true) + " disabled:opacity-30"}>Sonraki sure →</button>
              </div>
              <p className="text-center text-[10px] text-stone-600 pb-24">Kelime meali ve okunuş: Quran.com (Quran Foundation) · Ayet meali: Diyanet</p>
            </>
          )}
        </main>

        <footer className="shrink-0 border-t border-[#2A4050] bg-[#111C24] px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-stone-500 w-16">{currentVerse}. ayet</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#2A4050] overflow-hidden">
              <div className="h-full rounded-full bg-amber-500 transition-all duration-300" style={{ width: `${verses.length ? (currentVerse / verses.length) * 100 : 0}%` }} />
            </div>
            <span className="text-xs text-stone-500 w-8 text-right">{verses.length}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-1">
              {([0.5, 0.75, 1, 1.25] as const).map(s => (
                <button key={s} onClick={() => setSpeed(s)} className={`text-xs px-1.5 py-1 rounded-lg border ${speed === s ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "border-[#2A4050] text-stone-500"}`}>{s}×</button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => playVerse(Math.max(1, currentVerse - 1))} disabled={currentVerse <= 1}
                className="w-10 h-10 rounded-full border border-[#2A4050] text-stone-400 hover:text-white disabled:opacity-30" aria-label="Önceki ayet">⏮</button>
              <button onClick={togglePlay} disabled={loading || !verses.length}
                className="w-14 h-14 rounded-full border-2 border-amber-500 text-amber-400 hover:bg-amber-500/20 disabled:opacity-30 text-2xl" aria-label="Oynat / duraklat">{isPlaying ? "⏸" : "▶"}</button>
              <button onClick={() => playVerse(Math.min(verses.length, currentVerse + 1))} disabled={currentVerse >= verses.length}
                className="w-10 h-10 rounded-full border border-[#2A4050] text-stone-400 hover:text-white disabled:opacity-30" aria-label="Sonraki ayet">⏭</button>
            </div>
            <button onClick={() => setAutoNext(p => !p)} className={chip(autoNext)}>
              <Icon name={autoNext ? "tekrarOk" : "ileri"} /> <span className="hidden sm:inline">{autoNext ? "Otomatik" : "Manuel"}</span>
            </button>
          </div>
          <p className="text-center text-[10px] mt-2 text-stone-600">
            {hasTimings ? `▲ ok takibi aktif · ${reciter.name}` : "▶ oynat · ok takibi otomatik başlar"} · Kelimeye dokun → oradan dinle
          </p>
        </footer>
      </div>
    </div>
  );
}

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SURAH_LIST, getGlobalAyah } from "@/data/surahList";
import {
  fetchSurahVerses, fetchWordTimings,
  getHatimAudioUrl, HATIM_RECITERS,
  type HatimReciter, type Segment, type VerseText,
} from "@/lib/hatimApi";

const BASMALA = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ";

// ── Surah sidebar ──────────────────────────────────────────────────────────
function SurahSidebar({
  selected, onSelect, onClose,
}: {
  selected: number;
  onSelect: (n: number) => void;
  onClose?: () => void;
}) {
  const [q, setQ] = useState("");
  const filtered = q
    ? SURAH_LIST.filter(s =>
        s.tr.toLowerCase().includes(q.toLowerCase()) ||
        s.ar.includes(q) ||
        String(s.n).includes(q)
      )
    : SURAH_LIST;

  return (
    <aside className="flex flex-col h-full bg-[#111C24] border-r border-[#2A4050]">
      <div className="p-3 border-b border-[#2A4050] flex items-center gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Sure ara..."
          className="flex-1 bg-[#1F2F38] text-white text-sm rounded-xl px-3 py-2 border border-[#2A4050] outline-none focus:border-amber-500"
        />
        {onClose && (
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1 text-lg">✕</button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map(s => (
          <button
            key={s.n}
            onClick={() => { onSelect(s.n); onClose?.(); }}
            className={`w-full flex items-center gap-2 px-3 py-2.5 text-left border-b border-[#1a2930] transition-colors
              ${selected === s.n
                ? "bg-amber-500/20 border-l-2 border-l-amber-500"
                : "hover:bg-[#1F2F38]"}`}
          >
            <span className="text-xs font-mono w-7 text-stone-500 shrink-0">{s.n}</span>
            <span
              className="font-bold arabic-text text-base leading-none shrink-0"
              style={{ color: selected === s.n ? "#f59e0b" : "#e2d5a0", fontFamily: "serif", direction: "rtl" }}
            >
              {s.ar}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{s.tr}</div>
              <div className="text-[10px] text-stone-500">{s.vc} ayet · {s.type === "M" ? "Mekki" : "Medeni"}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

// ── Single verse row ───────────────────────────────────────────────────────
function VerseRow({
  verse, activeWordIdx, isActive, showTr, onClick,
}: {
  verse: VerseText;
  activeWordIdx: number;
  isActive: boolean;
  showTr: boolean;
  onClick: () => void;
}) {
  const activeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (isActive && activeWordIdx >= 0 && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [isActive, activeWordIdx]);

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 mb-3 cursor-pointer border transition-all
        ${isActive
          ? "bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/10"
          : "bg-[#1F2F38]/60 border-[#2A4050] hover:border-amber-500/30"}`}
    >
      {/* Verse number + Arabic words */}
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border mt-1"
          style={{
            background: isActive ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)",
            borderColor: isActive ? "#f59e0b" : "#2A4050",
            color: isActive ? "#fbbf24" : "#8FA8B4",
          }}
        >
          {verse.n}
        </div>
        {/* RTL Arabic text */}
        <div dir="rtl" className="flex-1 text-right leading-[3rem] flex flex-wrap-reverse gap-x-2 justify-start">
          {verse.words.map((word, idx) => {
            const active = isActive && idx === activeWordIdx;
            return (
              <span
                key={idx}
                ref={active ? activeRef : undefined}
                className="hatim-word relative inline-block"
                style={{
                  fontSize: "1.6rem",
                  fontFamily: "serif",
                  padding: "2px 4px",
                  borderRadius: "6px",
                  color: active ? "#fde68a" : "#f5e6c0",
                  background: active ? "rgba(245,158,11,0.25)" : "transparent",
                  boxShadow: active ? "0 0 16px rgba(245,158,11,0.5)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {/* Arrow indicator above active word */}
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 text-amber-400 text-[11px] leading-none select-none animate-hatim-arrow"
                    style={{ top: "-18px" }}
                  >
                    ▼
                  </span>
                )}
                {word}
              </span>
            );
          })}
        </div>
      </div>
      {/* Turkish translation */}
      {showTr && verse.tr && (
        <p className="mt-2 ml-11 text-sm text-stone-400 leading-relaxed">{verse.tr}</p>
      )}
    </div>
  );
}

// ── Main HatimModule ───────────────────────────────────────────────────────
export default function HatimModule() {
  const [surahNum, setSurahNum]       = useState(1);
  const [verses, setVerses]           = useState<VerseText[]>([]);
  const [timings, setTimings]         = useState<Map<number, Segment[]>>(new Map());
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [reciter, setReciter]         = useState<HatimReciter>(HATIM_RECITERS[0]);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [activeWord, setActiveWord]   = useState(-1);   // 0-indexed
  const [isPlaying, setIsPlaying]     = useState(false);
  const [autoNext, setAutoNext]       = useState(true);
  const [showTr, setShowTr]           = useState(true);
  const [speed, setSpeed]             = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasTimings, setHasTimings]   = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef   = useRef<number>(0);
  const surahMeta = SURAH_LIST[surahNum - 1];

  // ── Load surah data ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setVerses([]);
    setTimings(new Map());
    setCurrentVerse(1);
    setActiveWord(-1);
    setIsPlaying(false);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }

    Promise.all([
      fetchSurahVerses(surahNum),
      fetchWordTimings(surahNum, reciter.qdcId),
    ])
      .then(([v, t]) => {
        if (cancelled) return;
        setVerses(v);
        setTimings(t);
        setHasTimings(t.size > 0);
      })
      .catch(e => { if (!cancelled) setError(String(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [surahNum, reciter]);

  // ── Word-tracking RAF loop ───────────────────────────────────────────────
  const trackWords = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    const ms = audio.currentTime * 1000;
    const segs = timings.get(currentVerse);
    if (segs) {
      let found = -1;
      for (const [wIdx, startMs, endMs] of segs) {
        if (ms >= startMs && ms < endMs) { found = wIdx - 1; break; }
      }
      setActiveWord(prev => (prev !== found ? found : prev));
    }
    rafRef.current = requestAnimationFrame(trackWords);
  }, [timings, currentVerse]);

  // ── Play a specific verse ────────────────────────────────────────────────
  const playVerse = useCallback((verseN: number) => {
    cancelAnimationFrame(rafRef.current);
    setCurrentVerse(verseN);
    setActiveWord(-1);

    const globalAyah = getGlobalAyah(surahNum, verseN);
    const url = getHatimAudioUrl(reciter, globalAyah);

    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.pause();
    audio.src = url;
    audio.playbackRate = speed;
    audio.play()
      .then(() => { setIsPlaying(true); rafRef.current = requestAnimationFrame(trackWords); })
      .catch(() => setIsPlaying(false));

    audio.onended = () => {
      setActiveWord(-1);
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current);
      if (autoNext && verseN < verses.length) {
        playVerse(verseN + 1);
      }
    };
  }, [surahNum, reciter, speed, autoNext, verses.length, trackWords]);

  // Keep speed in sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  // Cleanup on unmount
  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    audioRef.current?.pause();
  }, []);

  // ── Controls ─────────────────────────────────────────────────────────────
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      cancelAnimationFrame(rafRef.current);
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          rafRef.current = requestAnimationFrame(trackWords);
        });
      } else {
        playVerse(currentVerse);
      }
    }
  };

  const handlePrevVerse = () => {
    const prev = Math.max(1, currentVerse - 1);
    playVerse(prev);
  };

  const handleNextVerse = () => {
    const next = Math.min(verses.length, currentVerse + 1);
    playVerse(next);
  };

  const handleSelectVerse = (verseN: number) => {
    if (isPlaying || currentVerse !== verseN) playVerse(verseN);
  };

  const handleSurahSelect = (n: number) => {
    setSurahNum(n);
    setSidebarOpen(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-[#0F1923] text-white overflow-hidden" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* Sidebar — desktop always visible, mobile overlay */}
      <div className={`
        fixed inset-0 z-40 transition-opacity md:static md:opacity-100 md:pointer-events-auto
        ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"}
      `}>
        {/* Mobile backdrop */}
        <div
          className="absolute inset-0 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="absolute inset-y-0 left-0 w-72 z-10 md:static md:w-64 md:shrink-0 h-full">
          <SurahSidebar
            selected={surahNum}
            onSelect={handleSurahSelect}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Main reading area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-[#2A4050] bg-[#111C24]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-xl hover:bg-[#1F2F38] text-stone-400"
            aria-label="Sure listesi"
          >
            ☰
          </button>
          <Link href="/dashboard" className="text-stone-500 hover:text-amber-400 text-sm transition-colors">
            ← Derse Dön
          </Link>
          <div className="flex-1 text-center">
            <div className="arabic-text text-xl font-bold text-amber-400" style={{ fontFamily: "serif" }}>
              {surahMeta.ar}
            </div>
            <div className="text-xs text-stone-400">{surahMeta.tr} · {surahMeta.meaning} · {surahMeta.vc} ayet</div>
          </div>
          <div className="flex items-center gap-2">
            {/* Show translation toggle */}
            <button
              onClick={() => setShowTr(p => !p)}
              title="Türkçe meali göster/gizle"
              className={`text-xs px-2 py-1 rounded-lg border transition-colors
                ${showTr ? "border-amber-500/50 text-amber-400 bg-amber-500/10" : "border-[#2A4050] text-stone-500"}`}
            >
              TR
            </button>
          </div>
        </header>

        {/* Reciter selector */}
        <div className="shrink-0 flex gap-2 px-4 py-2 border-b border-[#2A4050] overflow-x-auto no-scrollbar bg-[#111C24]/50">
          {HATIM_RECITERS.map(r => (
            <button
              key={r.qdcId}
              onClick={() => setReciter(r)}
              className={`shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors
                ${reciter.qdcId === r.qdcId
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "border-[#2A4050] text-stone-400 hover:border-amber-500/30"}`}
            >
              <span>{r.flag}</span>
              <span>{r.name}</span>
            </button>
          ))}
          {!hasTimings && !loading && (
            <span className="shrink-0 self-center text-xs text-stone-600 ml-2">· kelime takibi yükleniyor…</span>
          )}
        </div>

        {/* Verses */}
        <main className="flex-1 overflow-y-auto px-4 py-4">
          {loading && (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <p className="text-stone-400 text-sm">{surahMeta.tr} yükleniyor…</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12 text-red-400 text-sm">
              Yüklenemedi: {error}
              <br />
              <button onClick={() => setSurahNum(surahNum)} className="mt-3 underline text-amber-400">
                Tekrar dene
              </button>
            </div>
          )}
          {!loading && !error && verses.length > 0 && (
            <>
              {/* Basmala header (not for At-Tawbah) */}
              {surahNum !== 9 && (
                <div
                  dir="rtl"
                  className="text-center arabic-text text-2xl mb-6 py-4 border-b border-[#2A4050] text-amber-200/70"
                  style={{ fontFamily: "serif", letterSpacing: "0.05em" }}
                >
                  {surahNum === 1 ? "" : BASMALA}
                </div>
              )}
              {verses.map(verse => (
                <VerseRow
                  key={verse.n}
                  verse={verse}
                  activeWordIdx={currentVerse === verse.n ? activeWord : -1}
                  isActive={currentVerse === verse.n}
                  showTr={showTr}
                  onClick={() => handleSelectVerse(verse.n)}
                />
              ))}
              <div className="h-28" />
            </>
          )}
        </main>

        {/* Sticky audio controls */}
        <footer className="shrink-0 border-t border-[#2A4050] bg-[#111C24] px-4 py-3">
          {/* Verse progress */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-stone-500 w-16">{currentVerse}. ayet</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#2A4050] overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-300"
                style={{ width: `${verses.length ? (currentVerse / verses.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-stone-500 w-8 text-right">{verses.length}</span>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between gap-3">
            {/* Speed */}
            <div className="flex gap-1">
              {[0.75, 1, 1.25, 1.5].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`text-xs px-2 py-1 rounded-lg border transition-colors
                    ${speed === s
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                      : "border-[#2A4050] text-stone-500 hover:text-stone-300"}`}
                >
                  {s}×
                </button>
              ))}
            </div>

            {/* Prev / Play-Pause / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevVerse}
                disabled={currentVerse <= 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2A4050] text-stone-400 hover:text-white hover:border-amber-500/40 disabled:opacity-30 transition-colors"
              >
                ⏮
              </button>
              <button
                onClick={handlePlayPause}
                disabled={loading || verses.length === 0}
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl border-2 border-amber-500 text-amber-400 hover:bg-amber-500/20 disabled:opacity-30 transition-colors"
                style={{ fontSize: "1.4rem" }}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                onClick={handleNextVerse}
                disabled={currentVerse >= verses.length}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2A4050] text-stone-400 hover:text-white hover:border-amber-500/40 disabled:opacity-30 transition-colors"
              >
                ⏭
              </button>
            </div>

            {/* Auto-next toggle */}
            <button
              onClick={() => setAutoNext(p => !p)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors
                ${autoNext
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "border-[#2A4050] text-stone-500"}`}
            >
              <span>{autoNext ? "🔁" : "➡️"}</span>
              <span className="hidden sm:inline">{autoNext ? "Otomatik" : "Manuel"}</span>
            </button>
          </div>

          {/* Timing status */}
          {hasTimings && (
            <p className="text-center text-[10px] text-stone-600 mt-2">
              ▼ ok takibi aktif — {reciter.name}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

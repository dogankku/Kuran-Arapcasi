"use client";
import { useCallback, useEffect, useRef, useState, memo } from "react";
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

// ── Single verse row — memoized so React re-renders don't reset direct DOM styles ──
const VerseRow = memo(function VerseRow({
  verse, isActive, showTr, onSelect,
}: {
  verse: VerseText;
  isActive: boolean;
  showTr: boolean;
  onSelect: (n: number) => void;
}) {
  return (
    <div
      onClick={() => onSelect(verse.n)}
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
        {/* RTL Arabic words — data-word-key used for direct DOM targeting */}
        <div dir="rtl" className="flex-1 flex flex-wrap gap-x-1 gap-y-1 justify-end">
          {verse.words.map((word, idx) => (
            <span
              key={idx}
              data-word-key={`${verse.n}-${idx}`}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4px 6px 2px",
                borderRadius: "8px",
                color: "#f5e6c0",
                background: "transparent",
                userSelect: "none",
              }}
            >
              <span style={{
                fontSize: "1.6rem",
                fontFamily: '"Traditional Arabic","Noto Naskh Arabic","Scheherazade New","Amiri","Arial",serif',
                lineHeight: 1.4,
              }}>
                {word}
              </span>
              {/* Arrow below word, pointing up — hidden until RAF activates it */}
              <span
                data-arrow="1"
                style={{
                  height: "16px",
                  lineHeight: "16px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "transparent",
                  userSelect: "none",
                }}
              >▲</span>
            </span>
          ))}
        </div>
      </div>
      {/* Turkish translation */}
      {showTr && verse.tr && (
        <p className="mt-2 ml-11 text-sm text-stone-400 leading-relaxed">{verse.tr}</p>
      )}
    </div>
  );
});

// ── Main HatimModule ───────────────────────────────────────────────────────
export default function HatimModule() {
  const [surahNum, setSurahNum]         = useState(1);
  const [verses, setVerses]             = useState<VerseText[]>([]);
  const [timings, setTimings]           = useState<Map<number, Segment[]>>(new Map());
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [reciter, setReciter]           = useState<HatimReciter>(HATIM_RECITERS[0]);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [autoNext, setAutoNext]         = useState(true);
  const [showTr, setShowTr]             = useState(true);
  const [speed, setSpeed]               = useState(1);
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [hasTimings, setHasTimings]     = useState(false);

  const audioRef      = useRef<HTMLAudioElement | null>(null);
  const rafRef        = useRef<number>(0);
  // Direct DOM ref — bypasses React re-renders for zero-lag word highlighting
  const activeElemRef = useRef<HTMLElement | null>(null);
  const surahMeta     = SURAH_LIST[surahNum - 1];

  // Refs to avoid stale closures in the RAF loop
  const timingsRef     = useRef<Map<number, Segment[]>>(new Map());
  const curVerseRef    = useRef(1);
  const autoNextRef    = useRef(true);
  const versesLenRef   = useRef(0);
  const versesRef      = useRef<VerseText[]>([]);
  const playVerseRef   = useRef<(n: number) => void>(() => {});

  // Keep refs in sync every render
  timingsRef.current   = timings;
  curVerseRef.current  = currentVerse;
  autoNextRef.current  = autoNext;
  versesLenRef.current = verses.length;
  versesRef.current    = verses;

  // ── Clear word highlight (direct DOM, no re-render) ───────────────────────
  const clearActiveWord = useCallback(() => {
    const elem = activeElemRef.current;
    if (!elem) return;
    elem.style.color      = "#f5e6c0";
    elem.style.background = "transparent";
    elem.style.boxShadow  = "none";
    const arrow = elem.querySelector<HTMLElement>('[data-arrow="1"]');
    if (arrow) arrow.style.color = "transparent";
    activeElemRef.current = null;
  }, []);

  // ── Load surah data ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setVerses([]);
    setTimings(new Map());
    timingsRef.current = new Map();
    setCurrentVerse(1);
    curVerseRef.current = 1;
    clearActiveWord();
    setIsPlaying(false);
    setHasTimings(false);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }

    Promise.all([
      fetchSurahVerses(surahNum),
      fetchWordTimings(surahNum, reciter.qdcId),
    ])
      .then(([v, t]) => {
        if (cancelled) return;
        setVerses(v);
        versesLenRef.current = v.length;
        setTimings(t);
        timingsRef.current = t;
        setHasTimings(t.size > 0);
      })
      .catch(e => { if (!cancelled) setError(String(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [surahNum, reciter, clearActiveWord]);

  // ── Word-tracking RAF — direct DOM, zero React re-render lag ─────────────
  const trackWords = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    const ms     = audio.currentTime * 1000;
    const verseN = curVerseRef.current;
    const segs   = timingsRef.current.get(verseN);

    // "Last passed" logic: stay on the most recent word whose startMs has been
    // reached. This fills inter-word gaps and keeps the arrow in sync.
    let found = -1;
    if (segs && segs.length > 0) {
      for (const [wIdx, startMs] of segs) {
        if (ms >= startMs) found = wIdx - 1;
        else break; // segments are in ascending time order
      }
    }

    const nextKey  = found >= 0 ? `${verseN}-${found}` : null;
    const nextElem = nextKey
      ? document.querySelector<HTMLElement>(`[data-word-key="${nextKey}"]`)
      : null;

    if (activeElemRef.current !== nextElem) {
      // Deactivate previous word
      const prev = activeElemRef.current;
      if (prev) {
        prev.style.color      = "#f5e6c0";
        prev.style.background = "transparent";
        prev.style.boxShadow  = "none";
        const pa = prev.querySelector<HTMLElement>('[data-arrow="1"]');
        if (pa) pa.style.color = "transparent";
      }
      // Activate next word
      if (nextElem) {
        nextElem.style.color      = "#fff";
        nextElem.style.background = "rgba(239,68,68,0.25)";
        nextElem.style.boxShadow  = "0 0 20px rgba(239,68,68,0.5)";
        const na = nextElem.querySelector<HTMLElement>('[data-arrow="1"]');
        if (na) na.style.color = "#ef4444";
        nextElem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
      activeElemRef.current = nextElem;
    }

    rafRef.current = requestAnimationFrame(trackWords);
  }, []); // intentionally empty — all state read via refs or activeElemRef

  // ── Estimated timing fallback ─────────────────────────────────────────────
  const buildEstimatedTimings = useCallback((verseN: number, durationSec: number) => {
    if (timingsRef.current.has(verseN)) return;
    const words = versesRef.current.find(v => v.n === verseN)?.words ?? [];
    if (words.length === 0 || !isFinite(durationSec) || durationSec <= 0) return;
    const msPerWord = (durationSec * 1000) / words.length;
    const est: Segment[] = words.map((_, i): Segment => [
      i + 1,
      Math.round(i * msPerWord),
      Math.round((i + 1) * msPerWord),
    ]);
    const updated = new Map(timingsRef.current);
    updated.set(verseN, est);
    timingsRef.current = updated; // immediate RAF visibility
    setTimings(updated);          // persist so re-renders don't reset timingsRef
    setHasTimings(true);
  }, []);

  // ── Play a specific verse ────────────────────────────────────────────────
  const playVerse = useCallback((verseN: number) => {
    cancelAnimationFrame(rafRef.current);
    clearActiveWord();
    setCurrentVerse(verseN);
    curVerseRef.current = verseN;

    const globalAyah = getGlobalAyah(surahNum, verseN);
    const url = getHatimAudioUrl(reciter, globalAyah);

    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.onplay          = null;
    audio.onloadedmetadata = null;
    audio.onended         = null;
    audio.pause();
    audio.src = url;
    audio.playbackRate = speed;

    audio.onloadedmetadata = () => {
      buildEstimatedTimings(verseN, audio.duration);
    };

    // Start RAF exactly when audio begins (onplay fires before first frame)
    audio.onplay = () => {
      setIsPlaying(true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(trackWords);
    };

    audio.play().catch(() => setIsPlaying(false));

    audio.onended = () => {
      clearActiveWord();
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current);
      if (autoNextRef.current && verseN < versesLenRef.current) {
        playVerseRef.current(verseN + 1);
      }
    };
  }, [surahNum, reciter, speed, trackWords, buildEstimatedTimings, clearActiveWord]);

  playVerseRef.current = playVerse;

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    audioRef.current?.pause();
  }, []);

  // ── Controls ─────────────────────────────────────────────────────────────
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      cancelAnimationFrame(rafRef.current);
      clearActiveWord();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src && audioRef.current.paused) {
        audioRef.current.onplay = () => {
          setIsPlaying(true);
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(trackWords);
        };
        audioRef.current.play().catch(() => {});
      } else {
        playVerse(currentVerse);
      }
    }
  };

  const handlePrevVerse = () => playVerse(Math.max(1, currentVerse - 1));
  const handleNextVerse = () => playVerse(Math.min(verses.length, currentVerse + 1));

  // Stable callback — always calls latest playVerse via ref, so VerseRow memo works
  const handleSelectVerse = useCallback((verseN: number) => {
    playVerseRef.current(verseN);
  }, []);

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
          {loading && (
            <span className="shrink-0 self-center text-xs text-stone-600 ml-2">· yükleniyor…</span>
          )}
          {!loading && !hasTimings && (
            <span className="shrink-0 self-center text-xs text-amber-700/70 ml-2">· ▶ oynat → ok takibi aktif olacak</span>
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
                  isActive={currentVerse === verse.n}
                  showTr={showTr}
                  onSelect={handleSelectVerse}
                />
              ))}
              <div className="h-28" />
            </>
          )}
        </main>

        {/* Sticky audio controls */}
        <footer className="shrink-0 border-t border-[#2A4050] bg-[#111C24] px-4 py-3">
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

          <div className="flex items-center justify-between gap-3">
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

          <p className="text-center text-[10px] mt-2" style={{ color: hasTimings ? "#92400e" : "#374151" }}>
            {hasTimings
              ? `▲ ok takibi aktif — ${reciter.name}`
              : "▶ oynat butonuna bas — ok takibi otomatik başlar"}
          </p>
        </footer>
      </div>
    </div>
  );
}

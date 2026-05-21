"use client";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import Link from "next/link";
import { SURAH_LIST, getGlobalAyah } from "@/data/surahList";
import { words as vocabWords } from "@/data/words";
import { keywordHints } from "@/data/keywordHints";
import { KeywordArt } from "@/components/KeywordArt";
import { CardImage } from "@/components/CardImage";
import { getCardSlug } from "@/data/cardSlugs";
import {
  fetchSurahVerses, fetchWordTimings,
  getHatimAudioUrl, HATIM_RECITERS,
  type HatimReciter, type Segment, type VerseText,
} from "@/lib/hatimApi";

const BASMALA = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ";

// ── Arabic utilities ───────────────────────────────────────────────────────
function stripTashkeel(s: string) {
  return s.replace(/[ؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ۭ]/g, "")
          .replace(/[أإآا]/g, "ا").replace(/[ىئ]/g, "ي").replace(/ة/g, "ه").trim();
}

function lookupLocal(word: string) {
  const bare = stripTashkeel(word);
  return vocabWords.find(w => stripTashkeel(w.arabic) === bare) ?? null;
}

function lookupKeyword(word: string) {
  if (keywordHints[word]) return keywordHints[word];
  const bare = stripTashkeel(word);
  return Object.entries(keywordHints).find(([k]) => stripTashkeel(k) === bare)?.[1] ?? null;
}

// QDC word-level data cache: "ch:v" → WordInfo[]
interface WordInfo { idx: number; ar: string; translit: string; en: string; }
const wdCache = new Map<string, WordInfo[]>();

async function fetchWordDetails(ch: number, v: number): Promise<WordInfo[]> {
  const key = `${ch}:${v}`;
  if (wdCache.has(key)) return wdCache.get(key)!;
  try {
    const res = await fetch(
      `https://api.qurancdn.com/api/qdc/verses/by_key/${ch}:${v}?words=true&word_fields=text_uthmani,transliteration,translation`,
      { mode: "cors" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const result: WordInfo[] = (data.verse?.words ?? [])
      .filter((w: Record<string, unknown>) => w.char_type_name !== "end")
      .map((w: Record<string, unknown>, i: number) => ({
        idx: i,
        ar: (w.text_uthmani as string) ?? "",
        translit: ((w.transliteration as Record<string,string>)?.text) ?? "",
        en: ((w.translation as Record<string,string>)?.text) ?? "",
      }));
    wdCache.set(key, result);
    return result;
  } catch { return []; }
}

// ── Word Popup — anahtar kelime hafıza kartı ──────────────────────────────
function WordPopup({
  word, wordIdx, verseN, surahNum, onClose,
}: {
  word: string; wordIdx: number; verseN: number; surahNum: number; onClose: () => void;
}) {
  const [info, setInfo]     = useState<WordInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const local   = lookupLocal(word);
  const keyword = lookupKeyword(word);
  const cardSlug = getCardSlug(word);

  useEffect(() => {
    let live = true;
    setLoading(true);
    fetchWordDetails(surahNum, verseN).then(list => {
      if (!live) return;
      setInfo(list[wordIdx] ?? null);
      setLoading(false);
    });
    return () => { live = false; };
  }, [surahNum, verseN, wordIdx]);

  const translit = info?.translit || keyword?.phonetic || local?.transliteration || "";
  const meaning  = local?.turkish_meaning || info?.en || "";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-32 px-3 pointer-events-none">
      <div
        className="pointer-events-auto w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative"
        style={{ background: "#0e1a24", border: "1px solid rgba(245,158,11,0.25)" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full text-stone-400 hover:text-white text-sm"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >✕</button>

        {/* ── Üst: Kart görseli (varsa) veya KeywordArt SVG sahnesi ── */}
        <div className="relative">
          <CardImage
            slug={cardSlug ?? ""}
            arabic={word}
            meaning={meaning || keyword?.bridge || ""}
            fallback={
              <KeywordArt
                sceneId={keyword?.sceneId ?? (keyword?.cognate ? "cognate" : "default")}
                cognateLabel={keyword?.bridge}
                cognateEmoji={keyword?.emoji}
              />
            }
          />

          {/* "Zaten biliyorsun" rozeti */}
          {keyword?.cognate && (
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.85)", color: "#fff" }}>
                ✅ Türkçe&apos;de de var!
              </span>
            </div>
          )}

          {/* Ses köprüsü — altta yarı şeffaf bant */}
          {keyword && (
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}>
              <span className="text-xs text-stone-400">ses →</span>
              <span className="text-sm font-bold px-2 py-0.5 rounded-lg"
                style={{
                  background: keyword.cognate ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.25)",
                  color: keyword.cognate ? "#86efac" : "#fbbf24",
                  border: `1px solid ${keyword.cognate ? "rgba(34,197,94,0.4)" : "rgba(245,158,11,0.4)"}`,
                }}>
                {keyword.bridge}
              </span>
            </div>
          )}
        </div>

        {/* ── Alt: anlam + bilgi ── */}
        <div className="px-5 py-4 space-y-2.5">
          {loading && <p className="text-center text-stone-500 text-sm py-1">yükleniyor…</p>}

          {!loading && (
            <>
              {/* Türkçe anlam — büyük ve net */}
              {meaning && (
                <div className="flex items-center justify-between rounded-2xl px-4 py-2.5"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <span className="text-xs text-stone-500">Türkçe anlamı</span>
                  <span className="text-lg font-bold text-amber-300">{meaning}</span>
                </div>
              )}

              {/* Kök · tür · frekans */}
              {local && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  {local.root && (
                    <div className="rounded-xl py-2 px-1" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="text-[10px] text-stone-600 mb-0.5">kök</div>
                      <div className="text-sm font-bold text-stone-300" dir="rtl"
                        style={{ fontFamily: "serif" }}>{local.root}</div>
                    </div>
                  )}
                  <div className="rounded-xl py-2 px-1" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-[10px] text-stone-600 mb-0.5">tür</div>
                    <div className="text-xs text-stone-400">{local.part_of_speech}</div>
                  </div>
                  <div className="rounded-xl py-2 px-1" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-[10px] text-stone-600 mb-0.5">Kur&apos;an&apos;da</div>
                    <div className="text-sm font-bold text-amber-600">{local.frequency}×</div>
                  </div>
                </div>
              )}

              {/* Örnek ayet */}
              {local?.example_arabic && (
                <div className="rounded-xl px-3 py-2.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p dir="rtl" className="text-sm text-stone-300 text-right mb-1"
                    style={{ fontFamily: "serif" }}>{local.example_arabic}</p>
                  <p className="text-xs text-stone-500">{local.example_turkish}</p>
                </div>
              )}

              {/* Fallback İngilizce */}
              {!local && !keyword && info?.en && (
                <div className="text-center text-stone-500 text-sm">
                  {info.en} <span className="text-stone-700 text-xs">(İngilizce)</span>
                </div>
              )}

              {!meaning && !keyword && !loading && (
                <p className="text-center text-stone-600 text-sm">Bu kelime için bilgi bulunamadı.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Surah sidebar ──────────────────────────────────────────────────────────
function SurahSidebar({
  selected, onSelect, onClose,
}: {
  selected: number; onSelect: (n: number) => void; onClose?: () => void;
}) {
  const [q, setQ] = useState("");
  const filtered = q
    ? SURAH_LIST.filter(s =>
        s.tr.toLowerCase().includes(q.toLowerCase()) || s.ar.includes(q) || String(s.n).includes(q))
    : SURAH_LIST;

  return (
    <aside className="flex flex-col h-full bg-[#111C24] border-r border-[#2A4050]">
      <div className="p-3 border-b border-[#2A4050] flex items-center gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Sure ara…"
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
              ${selected === s.n ? "bg-amber-500/20 border-l-2 border-l-amber-500" : "hover:bg-[#1F2F38]"}`}
          >
            <span className="text-xs font-mono w-7 text-stone-500 shrink-0">{s.n}</span>
            <span
              className="font-bold text-base leading-none shrink-0"
              style={{ color: selected === s.n ? "#f59e0b" : "#e2d5a0", fontFamily: "serif", direction: "rtl" }}
            >{s.ar}</span>
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

// ── Single verse row — memoized so direct DOM word styles aren't reset ─────
const VerseRow = memo(function VerseRow({
  verse, isActive, showTr, onSelect, onWordTap,
}: {
  verse: VerseText;
  isActive: boolean;
  showTr: boolean;
  onSelect: (n: number) => void;
  onWordTap: (verseN: number, wordIdx: number, word: string, e: React.MouseEvent) => void;
}) {
  return (
    <div
      data-verse-n={verse.n}
      onClick={() => onSelect(verse.n)}
      className={`rounded-2xl p-4 mb-3 cursor-pointer border transition-all
        ${isActive
          ? "bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/10"
          : "bg-[#1F2F38]/60 border-[#2A4050] hover:border-amber-500/30"}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border mt-1"
          style={{
            background: isActive ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)",
            borderColor: isActive ? "#f59e0b" : "#2A4050",
            color: isActive ? "#fbbf24" : "#8FA8B4",
          }}
        >{verse.n}</div>

        <div dir="rtl" className="flex-1 flex flex-wrap gap-x-1 gap-y-1 justify-end">
          {verse.words.map((word, idx) => (
            <span
              key={idx}
              data-word-key={`${verse.n}-${idx}`}
              onClick={e => { e.stopPropagation(); onWordTap(verse.n, idx, word, e); }}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4px 6px 2px",
                borderRadius: "8px",
                color: "#f5e6c0",
                background: "transparent",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span style={{
                fontSize: "1.6rem",
                fontFamily: '"Traditional Arabic","Noto Naskh Arabic","Scheherazade New","Amiri","Arial",serif',
                lineHeight: 1.4,
              }}>{word}</span>
              {/* Arrow below word — RAF controls visibility directly via DOM */}
              <span
                data-arrow="1"
                style={{ height: "16px", lineHeight: "16px", fontSize: "13px", fontWeight: "bold", color: "transparent", userSelect: "none" }}
              >▲</span>
            </span>
          ))}
        </div>
      </div>

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
  // Loop: 0=kapalı, 1=1×, 3=3×, 99=∞
  const [loopMode, setLoopMode]         = useState<0 | 1 | 3 | 99>(0);
  // Word popup
  const [popup, setPopup]               = useState<{ verseN: number; wordIdx: number; word: string } | null>(null);

  const audioRef      = useRef<HTMLAudioElement | null>(null);
  const rafRef        = useRef<number>(0);
  const activeElemRef = useRef<HTMLElement | null>(null);
  const loopLeftRef   = useRef(0); // remaining repeats for current loop session
  const surahMeta     = SURAH_LIST[surahNum - 1];

  // Stale-closure refs for RAF loop
  const timingsRef     = useRef<Map<number, Segment[]>>(new Map());
  const curVerseRef    = useRef(1);
  const autoNextRef    = useRef(true);
  const loopModeRef    = useRef<0 | 1 | 3 | 99>(0);
  const versesLenRef   = useRef(0);
  const versesRef      = useRef<VerseText[]>([]);
  const playVerseRef   = useRef<(n: number) => void>(() => {});

  timingsRef.current   = timings;
  curVerseRef.current  = currentVerse;
  autoNextRef.current  = autoNext;
  loopModeRef.current  = loopMode;
  versesLenRef.current = verses.length;
  versesRef.current    = verses;

  // ── Clear word highlight ──────────────────────────────────────────────────
  const clearActiveWord = useCallback(() => {
    const e = activeElemRef.current;
    if (!e) return;
    e.style.color = "#f5e6c0"; e.style.background = "transparent"; e.style.boxShadow = "none";
    const a = e.querySelector<HTMLElement>('[data-arrow="1"]');
    if (a) a.style.color = "transparent";
    activeElemRef.current = null;
  }, []);

  // ── Load surah ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(""); setVerses([]); setTimings(new Map());
    timingsRef.current = new Map(); setCurrentVerse(1); curVerseRef.current = 1;
    clearActiveWord(); setIsPlaying(false); setHasTimings(false);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }

    Promise.all([fetchSurahVerses(surahNum), fetchWordTimings(surahNum, reciter.qdcId)])
      .then(([v, t]) => {
        if (cancelled) return;
        setVerses(v); versesLenRef.current = v.length;
        setTimings(t); timingsRef.current = t; setHasTimings(t.size > 0);
      })
      .catch(e => { if (!cancelled) setError(String(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [surahNum, reciter, clearActiveWord]);

  // ── Scroll active verse into view ─────────────────────────────────────────
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-verse-n="${currentVerse}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentVerse]);

  // ── RAF word tracker — direct DOM ─────────────────────────────────────────
  const trackWords = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    const ms     = audio.currentTime * 1000;
    const verseN = curVerseRef.current;
    const segs   = timingsRef.current.get(verseN);

    let found = -1;
    if (segs?.length) {
      for (const [wIdx, startMs] of segs) {
        if (ms >= startMs) found = wIdx - 1;
        else break;
      }
    }

    const nextKey  = found >= 0 ? `${verseN}-${found}` : null;
    const nextElem = nextKey
      ? document.querySelector<HTMLElement>(`[data-word-key="${nextKey}"]`)
      : null;

    if (activeElemRef.current !== nextElem) {
      const prev = activeElemRef.current;
      if (prev) {
        prev.style.color = "#f5e6c0"; prev.style.background = "transparent"; prev.style.boxShadow = "none";
        const pa = prev.querySelector<HTMLElement>('[data-arrow="1"]');
        if (pa) pa.style.color = "transparent";
      }
      if (nextElem) {
        nextElem.style.color = "#fff"; nextElem.style.background = "rgba(239,68,68,0.25)"; nextElem.style.boxShadow = "0 0 20px rgba(239,68,68,0.5)";
        const na = nextElem.querySelector<HTMLElement>('[data-arrow="1"]');
        if (na) na.style.color = "#ef4444";
        nextElem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
      activeElemRef.current = nextElem;
    }

    rafRef.current = requestAnimationFrame(trackWords);
  }, []);

  // ── Estimated timing fallback ─────────────────────────────────────────────
  const buildEstimatedTimings = useCallback((verseN: number, durationSec: number) => {
    if (timingsRef.current.has(verseN)) return;
    const ws = versesRef.current.find(v => v.n === verseN)?.words ?? [];
    if (!ws.length || !isFinite(durationSec) || durationSec <= 0) return;
    const msPer = (durationSec * 1000) / ws.length;
    const est: Segment[] = ws.map((_, i): Segment => [i + 1, Math.round(i * msPer), Math.round((i + 1) * msPer)]);
    const updated = new Map(timingsRef.current);
    updated.set(verseN, est);
    timingsRef.current = updated;
    setTimings(updated);
    setHasTimings(true);
  }, []);

  // ── Play verse ────────────────────────────────────────────────────────────
  const playVerse = useCallback((verseN: number) => {
    cancelAnimationFrame(rafRef.current);
    clearActiveWord();
    setCurrentVerse(verseN);
    curVerseRef.current = verseN;
    loopLeftRef.current = loopModeRef.current === 99 ? 99 : loopModeRef.current;

    const url = getHatimAudioUrl(reciter, getGlobalAyah(surahNum, verseN));
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.onplay = null; audio.onloadedmetadata = null; audio.onended = null;
    audio.pause(); audio.src = url; audio.playbackRate = speed;

    audio.onloadedmetadata = () => buildEstimatedTimings(verseN, audio.duration);

    audio.onplay = () => {
      setIsPlaying(true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(trackWords);
    };

    audio.play().catch(() => setIsPlaying(false));

    audio.onended = () => {
      clearActiveWord();
      cancelAnimationFrame(rafRef.current);

      const mode = loopModeRef.current;
      if (mode === 99) {
        // infinite loop — replay
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
        return;
      }
      if (mode > 0 && loopLeftRef.current > 1) {
        loopLeftRef.current--;
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
        return;
      }

      setIsPlaying(false);
      if (autoNextRef.current && verseN < versesLenRef.current) {
        playVerseRef.current(verseN + 1);
      }
    };
  }, [surahNum, reciter, speed, trackWords, buildEstimatedTimings, clearActiveWord]);

  playVerseRef.current = playVerse;

  useEffect(() => { if (audioRef.current) audioRef.current.playbackRate = speed; }, [speed]);
  useEffect(() => () => { cancelAnimationFrame(rafRef.current); audioRef.current?.pause(); }, []);

  // ── Controls ──────────────────────────────────────────────────────────────
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      cancelAnimationFrame(rafRef.current);
      clearActiveWord();
      setIsPlaying(false);
    } else {
      if (audioRef.current?.src && audioRef.current.paused) {
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

  const handlePrevVerse    = () => playVerse(Math.max(1, currentVerse - 1));
  const handleNextVerse    = () => playVerse(Math.min(verses.length, currentVerse + 1));
  const handleSelectVerse  = useCallback((n: number) => { playVerseRef.current(n); }, []);

  const handleWordTap = useCallback((verseN: number, wordIdx: number, word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPopup(prev => (prev?.verseN === verseN && prev.wordIdx === wordIdx) ? null : { verseN, wordIdx, word });
  }, []);

  const cycleLoop = () => {
    setLoopMode(m => m === 0 ? 1 : m === 1 ? 3 : m === 3 ? 99 : 0);
  };

  const loopLabel = loopMode === 0 ? "🔂 Kapalı" : loopMode === 1 ? "🔂 1×" : loopMode === 3 ? "🔂 3×" : "🔂 ∞";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="flex h-screen bg-[#0F1923] text-white overflow-hidden"
      style={{ fontFamily: "system-ui, sans-serif" }}
      onClick={() => popup && setPopup(null)}
    >

      {/* Sidebar */}
      <div className={`
        fixed inset-0 z-40 transition-opacity md:static md:opacity-100 md:pointer-events-auto
        ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"}
      `}>
        <div className="absolute inset-0 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
        <div className="absolute inset-y-0 left-0 w-72 z-10 md:static md:w-64 md:shrink-0 h-full">
          <SurahSidebar selected={surahNum} onSelect={n => { setSurahNum(n); setSidebarOpen(false); }} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-[#2A4050] bg-[#111C24]">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-[#1F2F38] text-stone-400">☰</button>
          <Link href="/dashboard" className="text-stone-500 hover:text-amber-400 text-sm transition-colors">← Derse Dön</Link>
          <div className="flex-1 text-center">
            <div className="text-xl font-bold text-amber-400" style={{ fontFamily: "serif" }}>{surahMeta.ar}</div>
            <div className="text-xs text-stone-400">{surahMeta.tr} · {surahMeta.meaning} · {surahMeta.vc} ayet</div>
          </div>
          <button
            onClick={() => setShowTr(p => !p)}
            title="Türkçe meali göster/gizle"
            className={`text-xs px-2 py-1 rounded-lg border transition-colors
              ${showTr ? "border-amber-500/50 text-amber-400 bg-amber-500/10" : "border-[#2A4050] text-stone-500"}`}
          >TR</button>
        </header>

        {/* Hint bar */}
        <div className="shrink-0 px-4 py-1.5 bg-[#0d161e] border-b border-[#1a2930] text-[11px] text-stone-600 text-center">
          Kelimeye dokun → anlamını gör &nbsp;·&nbsp; Ayete dokun → sesini çal
        </div>

        {/* Reciter + loop row */}
        <div className="shrink-0 flex gap-2 px-4 py-2 border-b border-[#2A4050] overflow-x-auto no-scrollbar bg-[#111C24]/50">
          {HATIM_RECITERS.map(r => (
            <button
              key={r.qdcId}
              onClick={() => setReciter(r)}
              className={`shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors
                ${reciter.qdcId === r.qdcId ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "border-[#2A4050] text-stone-400 hover:border-amber-500/30"}`}
            >
              <span>{r.flag}</span><span>{r.name}</span>
            </button>
          ))}
          <div className="flex-1" />
          {/* Loop button */}
          <button
            onClick={cycleLoop}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors
              ${loopMode > 0 ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "border-[#2A4050] text-stone-500"}`}
            title="Tekrar modu: kapalı → 1× → 3× → ∞"
          >{loopLabel}</button>

          {loading && <span className="shrink-0 self-center text-xs text-stone-600 ml-1">yükleniyor…</span>}
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
              <button onClick={() => setSurahNum(surahNum)} className="block mt-3 underline text-amber-400 mx-auto">Tekrar dene</button>
            </div>
          )}
          {!loading && !error && verses.length > 0 && (
            <>
              {surahNum !== 9 && (
                <div dir="rtl" className="text-center text-2xl mb-6 py-4 border-b border-[#2A4050] text-amber-200/70" style={{ fontFamily: "serif" }}>
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
                  onWordTap={handleWordTap}
                />
              ))}
              <div className="h-28" />
            </>
          )}
        </main>

        {/* Footer controls */}
        <footer className="shrink-0 border-t border-[#2A4050] bg-[#111C24] px-4 py-3">
          {/* Progress bar */}
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
            {/* Speed — includes 0.5× for beginners */}
            <div className="flex gap-1">
              {([0.5, 0.75, 1, 1.25, 1.5] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`text-xs px-1.5 py-1 rounded-lg border transition-colors
                    ${speed === s ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "border-[#2A4050] text-stone-500 hover:text-stone-300"}`}
                >{s}×</button>
              ))}
            </div>

            {/* Playback */}
            <div className="flex items-center gap-3">
              <button onClick={handlePrevVerse} disabled={currentVerse <= 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2A4050] text-stone-400 hover:text-white hover:border-amber-500/40 disabled:opacity-30 transition-colors">⏮</button>
              <button onClick={handlePlayPause} disabled={loading || verses.length === 0}
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-amber-500 text-amber-400 hover:bg-amber-500/20 disabled:opacity-30 transition-colors"
                style={{ fontSize: "1.4rem" }}>{isPlaying ? "⏸" : "▶"}</button>
              <button onClick={handleNextVerse} disabled={currentVerse >= verses.length}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2A4050] text-stone-400 hover:text-white hover:border-amber-500/40 disabled:opacity-30 transition-colors">⏭</button>
            </div>

            {/* Auto-next */}
            <button
              onClick={() => setAutoNext(p => !p)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors
                ${autoNext ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "border-[#2A4050] text-stone-500"}`}
            >
              <span>{autoNext ? "🔁" : "➡️"}</span>
              <span className="hidden sm:inline">{autoNext ? "Otomatik" : "Manuel"}</span>
            </button>
          </div>

          <p className="text-center text-[10px] mt-2" style={{ color: hasTimings ? "#92400e" : "#374151" }}>
            {hasTimings ? `▲ ok takibi aktif — ${reciter.name}` : "▶ oynat — ok takibi otomatik başlar"}
          </p>
        </footer>
      </div>

      {/* Word meaning popup */}
      {popup && (
        <WordPopup
          word={popup.word}
          wordIdx={popup.wordIdx}
          verseN={popup.verseN}
          surahNum={surahNum}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}

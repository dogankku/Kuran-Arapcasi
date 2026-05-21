'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { grammarTopics } from "@/data/grammar";
import { memoryImagesByArabic } from "@/data/memoryImages";
import { imgSrc } from "@/lib/asset";
import { getCardSlug } from "@/data/cardSlugs";
import { memoryCards } from "@/data/memoryEmojis";
import { sentenceAnalyses } from "@/data/sentences";
import type { Level, ProgressMap, QuizMode, StreakData, Word } from "@/data/types";
import { surahs } from "@/data/surahs";
import { morphPatterns } from "@/data/morphology";
import { words } from "@/data/words";
import { APP_VERSION, BUILD_DATE, BUILD_TIME, CHANGELOG } from "@/data/version";
import {
  STORAGE_KEY, STREAK_KEY, buildQuizOptions, emptyProgress,
  getDailyWords, getLevelDescription, getLevelIcon,
  getLevelShort, getLevelTitle, getMilestone, getNextReviewInfo, getQuizPrompt,
  getQuranCoverage, getReviewWords, getStageProgress, getStreak, searchWords,
  speakArabic, updateProgress, updateStreak,
} from "@/lib/learning";
import { supabase, isConfigured } from "@/lib/supabase";
import { getRank, getNextRank, RANKS } from "@/data/ranks";
import AuthModal from "@/components/AuthModal";
import RankBadge from "@/components/RankBadge";
import { RECITERS, DEFAULT_RECITER, RECITER_STORAGE_KEY, getVerseAudioUrl } from "@/lib/quranAudio";
import { stopAudio } from "@/lib/learning";
import { MemoryScene } from "@/components/MemoryScene";

type Panel = "yol" | "kelime" | "kokler" | "gramer" | "ayet" | "sure" | "morfo" | "quiz" | "tekrar" | "gorseller" | "rutbe";

interface AuthUser { id: string; email: string; username: string; }

export default function DashboardPage() {
  const [level, setLevel] = useState<Level>(1);
  const [panel, setPanel] = useState<Panel>("yol");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [quizMode, setQuizMode] = useState<QuizMode>("meaning");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [activeRootFilter, setActiveRootFilter] = useState<string | null>(null);
  const [grammarIndex, setGrammarIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [activeSurah, setActiveSurah] = useState(0);
  const [morphIndex, setMorphIndex] = useState(0);
  const [activeSurahVerse, setActiveSurahVerse] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastStudyDate: null, todayCount: 0 });
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [visualFilter, setVisualFilter] = useState("tümü");
  const [reciter, setReciter] = useState(DEFAULT_RECITER);
  const [playingVerse, setPlayingVerse] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const levelWords = useMemo(() => words.filter((w) => w.level === level), [level]);
  const activeWord = levelWords[index] || levelWords[0] || words[0];
  const activeCardSlug = getCardSlug(activeWord.arabic);
  const activeImage = activeCardSlug
    ? `/cards/${activeCardSlug}.png`
    : (memoryImagesByArabic[activeWord.arabic] || null);
  const visualWords = useMemo(() => words.filter((w) => getCardSlug(w.arabic) || memoryImagesByArabic[w.arabic]), []);
  const reviewWords = useMemo(() => getReviewWords(words, progress), [progress]);

  // --- Auth + sync helpers ---

  const loadProgressFromDb = useCallback(async (userId: string) => {
    if (!supabase) return;
    const { data } = await supabase.from("user_progress").select("progress,streak").eq("id", userId).single();
    if (data) {
      if (data.progress) setProgress(data.progress as ProgressMap);
      if (data.streak) {
        const s = data.streak as StreakData;
        setStreak(s);
        localStorage.setItem(STREAK_KEY, JSON.stringify(s));
      }
    }
  }, []);

  const syncProgressToDb = useCallback((userId: string, prog: ProgressMap, str: StreakData) => {
    if (!supabase) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(async () => {
      if (!supabase) return;
      setSyncing(true);
      await supabase.from("user_progress").upsert({
        id: userId, progress: prog, streak: str, updated_at: new Date().toISOString(),
      });
      setSyncing(false);
    }, 1500);
  }, []);

  // Auth state init
  useEffect(() => {
    if (!isConfigured || !supabase) { setAuthReady(true); return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const authUser = { id: u.id, email: u.email!, username: (u.user_metadata?.username as string) || u.email!.split("@")[0] };
        setUser(authUser);
        loadProgressFromDb(u.id).finally(() => setAuthReady(true));
      } else {
        setAuthReady(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setUser({ id: u.id, email: u.email!, username: (u.user_metadata?.username as string) || u.email!.split("@")[0] });
      } else {
        setUser(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [loadProgressFromDb]);

  // Local storage init (when not using Supabase or while loading)
  useEffect(() => {
    if (!isConfigured) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { try { setProgress(JSON.parse(saved)); } catch { setProgress({}); } }
    }
  }, []);

  // Persist progress locally always
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);

  // Sync to DB on progress change
  useEffect(() => {
    if (user) syncProgressToDb(user.id, progress, streak);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  useEffect(() => { setStreak(getStreak()); }, []);
  useEffect(() => {
    const saved = localStorage.getItem(RECITER_STORAGE_KEY);
    if (saved) setReciter(saved);
  }, []);

  function changeReciter(id: string) {
    setReciter(id);
    localStorage.setItem(RECITER_STORAGE_KEY, id);
    stopCurrentAudio();
  }

  function stopCurrentAudio() {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; audioRef.current = null; }
    setPlayingVerse(null);
    stopAudio();
  }

  function playVerse(key: string, url: string) {
    stopCurrentAudio();
    const a = new Audio(url);
    audioRef.current = a;
    setPlayingVerse(key);
    a.onended = () => setPlayingVerse(null);
    a.onerror = () => setPlayingVerse(null);
    a.play().catch(() => setPlayingVerse(null));
  }

  async function playSurahSequential(surahAppIndex: number) {
    const surah = surahs[surahAppIndex];
    stopCurrentAudio();
    for (let vi = 0; vi < surah.verses.length; vi++) {
      const verseNum = surah.verses[vi].number;
      const url = getVerseAudioUrl(surahAppIndex + 1, verseNum, reciter);
      const key = `s${surahAppIndex}:${verseNum}`;
      setPlayingVerse(key);
      await new Promise<void>(resolve => {
        const a = new Audio(url);
        audioRef.current = a;
        a.onended = () => resolve();
        a.onerror = () => resolve();
        a.play().catch(() => resolve());
      });
    }
    setPlayingVerse(null);
  }

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  }

  const learned = Object.values(progress).filter((p) => p.known).length;
  const coverage = getQuranCoverage(learned);
  const milestone = getMilestone(learned);
  const rank = getRank(learned);
  const nextRank = getNextRank(learned);
  const rankPct = nextRank ? Math.round(((learned - rank.min) / (nextRank.min - rank.min)) * 100) : 100;
  const activeProgress = progress[activeWord.id] || emptyProgress();
  const dailyWords = useMemo(() => getDailyWords(words, progress, 5), [progress]);

  const stageProgress = useMemo(() => getStageProgress(words, progress), [progress]);
  const quizPrompt = useMemo(() => getQuizPrompt(activeWord, quizMode), [activeWord, quizMode]);
  const quizOptions = useMemo(() => buildQuizOptions(words, activeWord, quizMode), [activeWord, quizMode]);
  const searchResults = useMemo(() => searchWords(words, searchQuery), [searchQuery]);

  // Kök ailesi verileri
  const rootFamilies = useMemo(() => {
    const map = new Map<string, Word[]>();
    words.forEach(w => {
      if (w.root) {
        if (!map.has(w.root)) map.set(w.root, []);
        map.get(w.root)!.push(w);
      }
    });
    return Array.from(map.entries())
      .filter(([, ws]) => ws.length >= 2)
      .sort((a, b) => b[1].length - a[1].length);
  }, []);

  function save(word: Word, type: "known" | "hard" | "wrong") {
    setProgress((cur) => ({ ...cur, [word.id]: updateProgress(cur[word.id] || emptyProgress(), type) }));
    setStreak(cur => {
      const updated = updateStreak(cur);
      localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
      return updated;
    });
  }
  function next() {
    setSelectedAnswer(null); setShowAnswer(false);
    setIndex((i) => (i + 1 >= levelWords.length ? 0 : i + 1));
  }
  function openWord(word: Word) {
    const list = words.filter((w) => w.level === word.level);
    setLevel(word.level);
    setIndex(Math.max(0, list.findIndex((w) => w.id === word.id)));
    setShowAnswer(true); setSelectedAnswer(null); setPanel("kelime");
  }
  function answerQuiz(answer: string) {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    save(activeWord, answer === quizPrompt.answer ? "known" : "wrong");
  }

  // Show auth modal when Supabase is configured and user not logged in
  const showAuthModal = isConfigured && authReady && !user;

  return (
    <main className="min-h-screen text-white" style={{background:"var(--duo-bg)"}}>
      {showAuthModal && <AuthModal onSuccess={async (u) => { setUser(u); await loadProgressFromDb(u.id); }} />}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        {/* HEADER */}
        <header className="glass-card rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 mb-5 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 sm:mb-4 flex-wrap">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">Ayet Hafızası · Kur&apos;an Öğrenme Sistemi</span>
                  <span className="sm:hidden">Ayet Hafızası</span>
                </div>
                <button onClick={() => setChangelogOpen(c => !c)}
                  className="inline-flex items-center gap-1.5 bg-stone-800/80 border border-stone-600/40 text-stone-300 hover:text-white rounded-full px-3 py-1.5 text-xs sm:text-sm transition">
                  <span className="text-amber-400 font-mono font-bold">v{APP_VERSION}</span>
                  <span className="text-stone-500 hidden sm:inline">{BUILD_DATE} {BUILD_TIME}</span>
                  <span className="text-stone-500 sm:hidden">{BUILD_TIME}</span>
                  <span className="text-xs">{changelogOpen ? "▲" : "▼"}</span>
                </button>
                {/* Yenile butonu */}
                <button onClick={() => window.location.reload()}
                  title="Sayfayı yenile"
                  className="inline-flex items-center gap-1 bg-stone-800/60 border border-stone-700/60 text-stone-400 hover:text-white hover:border-emerald-500/40 rounded-full px-2.5 py-1.5 text-xs transition">
                  🔄 <span className="hidden sm:inline">Yenile</span>
                </button>
                {/* Kuran Hatim modülü linki */}
                <Link href="/hatim"
                  className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 rounded-full px-3 py-1.5 text-xs font-semibold transition">
                  📖 <span>Kuran Oku</span>
                </Link>
                {/* Kullanıcı bilgisi */}
                {user && (
                  <div className="ml-auto flex items-center gap-2 flex-wrap">
                    <RankBadge learned={learned} compact />
                    {syncing && <span className="text-stone-500 text-xs animate-pulse">↑ kaydediliyor</span>}
                    <span className="text-stone-400 text-xs hidden sm:inline">{user.username}</span>
                    <button onClick={handleLogout}
                      className="text-xs text-stone-500 hover:text-red-400 transition border border-stone-700 rounded-full px-2.5 py-1">
                      Çıkış
                    </button>
                  </div>
                )}
              </div>
              {changelogOpen && (
                <div className="bg-stone-900/80 border border-stone-700 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm space-y-2">
                  {CHANGELOG.map(c => (
                    <div key={c.version} className="flex gap-3 items-start">
                      <span className="text-amber-400 font-mono shrink-0">v{c.version}</span>
                      <span className="text-stone-600 shrink-0">{c.date} {c.time}</span>
                      <span className="text-stone-400">{c.note}</span>
                    </div>
                  ))}
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Kur&apos;an&apos;ı Anlıyorum</h1>
              <p className="text-stone-300 mt-1 sm:mt-2 text-xs sm:text-sm">En sık geçen kelimeleri öğrenerek Kur&apos;an&apos;ın %90&apos;ını anlayabilirsin.</p>
            </div>
            <div className="md:w-72 space-y-3">
              {/* Kur'an anlama oranı */}
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                  <span className="text-stone-400">Kur&apos;an Anlama Oranı</span>
                  <span className="text-emerald-300 font-bold">%{coverage}</span>
                </div>
                <div className="duo-progress-track mb-1">
                  <div className="duo-progress-fill" style={{ width: `${coverage}%` }} />
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>{learned} kelime öğrenildi</span>
                  <span className="hidden sm:inline">Sonraki: {milestone.next} → {milestone.label}</span>
                  <span className="sm:hidden">{milestone.label}</span>
                </div>
              </div>
              {/* Rütbe kartı */}
              <div className="rounded-2xl p-3 border flex items-center gap-3"
                   style={{background:`${rank.color}12`, borderColor:`${rank.color}35`}}>
                <span className="text-2xl">{rank.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white text-sm">{rank.title}</span>
                    <span className="arabic-text text-sm shrink-0" style={{color:rank.color}}>{rank.arabic}</span>
                  </div>
                  {nextRank && (
                    <>
                      <div className="h-1.5 rounded-full mt-1 mb-0.5 overflow-hidden" style={{background:"rgba(255,255,255,0.08)"}}>
                        <div className="h-full rounded-full transition-all duration-700"
                             style={{width:`${rankPct}%`, background:rank.color}} />
                      </div>
                      <div className="text-stone-500 text-xs">{nextRank.icon} {nextRank.title} için {nextRank.min - learned} kelime kaldı</div>
                    </>
                  )}
                  {!nextRank && <div className="text-xs mt-0.5" style={{color:rank.color}}>En yüksek rütbe! 🎉</div>}
                </div>
              </div>
            </div>
          </div>
            <div className="relative mt-4 sm:mt-5">
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Kelime ara... (Arapça, Türkçe veya transliterasyon)"
                className="w-full bg-stone-900/60 border border-stone-700 rounded-2xl px-4 sm:px-5 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500/50"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white">✕</button>
              )}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden z-50 shadow-2xl">
                  {searchResults.map(w => (
                    <button key={w.id} onClick={() => { openWord(w); setSearchQuery(""); setSearchOpen(false); }}
                      className="w-full flex items-center gap-4 px-5 py-3 hover:bg-stone-800 transition text-left border-b border-stone-800 last:border-0">
                      <span className="arabic-text text-2xl min-w-[48px] text-right">{w.arabic}</span>
                      <span className="text-emerald-300 flex-1">{w.turkish_meaning}</span>
                      <span className="text-stone-500 text-xs">{w.part_of_speech}</span>
                      {w.root && <span className="text-amber-400/60 text-xs">{w.root}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            <MiniMetric label="Toplam kelime" value={words.length} icon="📚" highlight="blue" />
            <MiniMetric label="Öğrenilen" value={learned} icon="✅" highlight="green" />
            <MiniMetric label="Günlük seri" value={streak.currentStreak} icon="🔥" suffix="gün" highlight="orange" />
            <MiniMetric label="Bugün çalışıldı" value={streak.todayCount} icon="⚡" suffix="kez" />
          </div>
        </header>

        {/* NAVİGASYON */}
        <nav className="duo-card p-2 mb-8 flex gap-1 overflow-x-auto no-scrollbar" style={{borderRadius:"1.4rem"}}>
          {([
            ["yol", "Yol", "🗺️"],
            ["kelime", "Kelime", "📖"],
            ["kokler", "Kökler", "🌿"],
            ["gramer", "Gramer", "✏️"],
            ["ayet", "Ayet", "📜"],
            ["sure", "Sure", "🕌"],
            ["morfo", "Kalıp", "🔤"],
            ["quiz", "Test", "🎯"],
            ["tekrar", `Tekrar${reviewWords.length ? ` (${reviewWords.length})` : ""}`, "🔄"],
            ["gorseller", "Görsel", "🖼️"],
            ["rutbe", "Rütbe", "🏅"],
          ] as [Panel, string, string][]).map(([p, label, icon]) => (
            <Tab key={p} active={panel === p} onClick={() => setPanel(p)} label={label} icon={icon} />
          ))}
        </nav>

        {/* ÖĞRENME YOLU */}
        {panel === "yol" && (
          <div className="space-y-6">
            <section className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-bold mb-1">Bugünün Dersi</h2>
              <p className="text-stone-400 text-sm mb-5">Kur&apos;an&apos;da en sık geçen, henüz öğrenmediğin kelimeler:</p>
              <div className="grid md:grid-cols-5 gap-3">
                {dailyWords.map((w) => (
                  <button key={w.id} onClick={() => openWord(w)}
                    className="soft-card rounded-[1.5rem] p-4 text-center hover:border-emerald-400/50 transition">
                    <div className="arabic-text text-4xl mb-2">{w.arabic}</div>
                    <div className="text-emerald-300 text-sm font-medium">{w.turkish_meaning}</div>
                    <div className="text-stone-500 text-xs mt-1">{w.part_of_speech}</div>
                    {(w as any).frequency && (
                      <div className="text-amber-400/70 text-xs mt-1">{(w as any).frequency.toLocaleString()}× Kur&apos;an&apos;da</div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-4">
              {stageProgress.stages.map((stage) => {
                const l = stage.id as Level;
                return (
                  <div key={l} className={`rounded-[1.5rem] p-5 border transition ${!stage.unlocked ? "opacity-60 cursor-not-allowed bg-stone-900/40 border-stone-700/40" : level === l ? "bg-emerald-700/80 border-emerald-300 cursor-pointer" : "glass-card cursor-pointer hover:border-emerald-400/30"}`}
                    onClick={() => { if (stage.unlocked) { setLevel(l); setIndex(0); setPanel("kelime"); } }}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-xs text-stone-400">{stage.label}</div>
                        <div className="font-bold text-lg">{stage.title}</div>
                      </div>
                      <div className="text-3xl">{!stage.unlocked ? "🔒" : getLevelIcon(l)}</div>
                    </div>
                    <p className="text-stone-300 text-xs mb-3">{getLevelDescription(l)}</p>
                    <div className="duo-progress-track mb-1" style={{height:"0.875rem"}}>
                      <div className="duo-progress-fill" style={{ width: `${stage.pct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-stone-500">{stage.learned}/{stage.total} öğrenildi</span>
                      <span className={stage.pct >= 100 ? "text-emerald-400" : "text-stone-400"}>{stage.pct}%</span>
                    </div>
                    {!stage.unlocked && stage.unlockAt !== null && (
                      <div className="mt-3 bg-amber-900/30 border border-amber-700/30 rounded-xl px-3 py-2 text-xs text-amber-300 text-center">
                        🔓 {stage.unlockAt} kelime daha öğren → kilidi aç
                      </div>
                    )}
                    {stage.unlocked && stage.pct < 100 && (
                      <div className="mt-3 bg-emerald-900/20 border border-emerald-700/20 rounded-xl px-3 py-2 text-xs text-emerald-400 text-center">
                        ✓ Açık · Devam et
                      </div>
                    )}
                  </div>
                );
              })}
            </section>

            <section className="glass-card rounded-[2rem] p-6">
              <h2 className="text-xl font-bold mb-4">Öğrenme Yol Haritası</h2>
              <div className="space-y-3">
                {[
                  { threshold: 10, label: "Temel Başlangıç", desc: "10 kelime → Kur'an'ın %25'i", icon: "◇" },
                  { threshold: 30, label: "İlk Adım", desc: "30 kelime → Kur'an'ın %50'si", icon: "◈" },
                  { threshold: 75, label: "Orta Yol", desc: "75 kelime → Kur'an'ın %70'i", icon: "◆" },
                  { threshold: 150, label: "İleri Seviye", desc: "150 kelime → Kur'an'ın %80'i", icon: "★" },
                  { threshold: 300, label: "Hedef", desc: "300 kelime → Kur'an'ın %90'ı", icon: "🎯" },
                ].map(({ threshold, label, desc, icon }) => (
                  <div key={threshold} className={`flex items-center gap-4 p-4 rounded-2xl border transition ${learned >= threshold ? "bg-emerald-900/40 border-emerald-400/40" : "bg-black/20 border-stone-700/50"}`}>
                    <div className={`text-2xl ${learned >= threshold ? "text-emerald-300" : "text-stone-600"}`}>{icon}</div>
                    <div className="flex-1">
                      <div className={`font-semibold ${learned >= threshold ? "text-emerald-200" : "text-stone-300"}`}>{label}</div>
                      <div className="text-stone-400 text-sm">{desc}</div>
                    </div>
                    {learned >= threshold && <div className="text-emerald-400 text-sm font-bold">✓ Tamamlandı</div>}
                    {learned < threshold && <div className="text-stone-500 text-sm">{threshold - learned} kelime kaldı</div>}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* KELİME DERSİ */}
        {panel === "kelime" && (
          <section className="space-y-4">
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              {stageProgress.stages.map((stage) => {
                const l = stage.id as Level;
                return (
                  <button key={l}
                    onClick={() => { if (stage.unlocked) { setLevel(l); setIndex(0); } }}
                    disabled={!stage.unlocked}
                    className={`rounded-2xl p-3 text-sm font-semibold border transition ${!stage.unlocked ? "opacity-40 cursor-not-allowed bg-stone-900/30 border-stone-700/30" : level === l ? "bg-emerald-700 border-emerald-300" : "glass-card"}`}>
                    {!stage.unlocked ? "🔒 " : ""}{getLevelShort(l)}: {getLevelTitle(l)}
                    {!stage.unlocked && <div className="text-xs font-normal text-stone-500 mt-0.5">{stage.unlockAt} kelime kaldı</div>}
                  </button>
                );
              })}
            </div>
            <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">
              <div className="glass-card rounded-[2rem] p-6">
                {/* Word header */}
                <div className="text-center mb-4">
                  <button onClick={() => speakArabic(activeWord.arabic)} className="arabic-text arabic-clickable text-7xl md:text-8xl bg-transparent w-full">{activeWord.arabic}</button>
                  <div className="text-stone-600 text-xs text-center mt-1">▶ tıkla → seslendir</div>
                </div>

                {/* Visual memory card */}
                {activeImage
                  ? (
                    <div className="rounded-3xl overflow-hidden border border-amber-400/25 mb-4" style={{boxShadow:'0 0 0 1px rgba(251,191,36,0.06),0 6px 40px rgba(0,0,0,0.6)'}}>
                      <img src={imgSrc(activeImage)} alt={activeWord.turkish_meaning} className="w-full block" />
                    </div>
                  )
                  : <MemoryScene arabic={activeWord.arabic} transliteration={activeWord.transliteration} partOfSpeech={activeWord.part_of_speech} memoryHint={activeWord.memory_hint} />
                }

                {/* Hafıza çapası — always visible */}
                {activeWord.memory_hint && (
                  <div className="flex items-start gap-2.5 rounded-2xl px-4 py-3 mb-3" style={{background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.2)'}}>
                    <span className="text-base mt-0.5 shrink-0">💡</span>
                    <span className="text-amber-200/85 text-sm leading-relaxed">{activeWord.memory_hint}</span>
                  </div>
                )}

                {/* Örnek ayet — always visible */}
                <div className="rounded-2xl px-4 py-3 mb-4" style={{background:'rgba(52,211,153,0.04)',border:'1px solid rgba(52,211,153,0.12)'}}>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="bg-emerald-700/50 border border-emerald-600/30 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-semibold shrink-0">Örnek</span>
                    <button onClick={() => speakArabic(activeWord.example_arabic)} className="arabic-text arabic-clickable text-xl bg-transparent text-right flex-1 min-w-0">{activeWord.example_arabic}</button>
                  </div>
                  <div className="text-stone-300 text-sm">{activeWord.example_turkish}</div>
                </div>

                {/* Compact badges row */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs">
                  {activeImage && <span className="text-amber-300/70">{activeWord.transliteration}</span>}
                  {activeWord.root && <span className="bg-amber-500/10 border border-amber-400/20 text-amber-300/80 px-2.5 py-1 rounded-full">Kök: {activeWord.root}</span>}
                  <span className="bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 px-2.5 py-1 rounded-full">{activeWord.part_of_speech}</span>
                  {(activeWord as any).frequency && <span className="text-amber-400/50">Kur&apos;an&apos;da {(activeWord as any).frequency.toLocaleString()}×</span>}
                  <span className="text-stone-600">{activeProgress.known ? "✓ Öğrenildi" : activeProgress.hard ? "⟳ Tekrar" : "◌ Yeni"}</span>
                </div>

                {/* Expandable: Anlam + Gramer */}
                {showAnswer && (
                  <div className="mb-4 grid gap-3">
                    <Info title="Anlam" value={activeWord.turkish_meaning} />
                    <Info title="Gramer Notu" value={activeWord.grammar_note} />
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-3">
                  <button onClick={() => setShowAnswer(!showAnswer)} className="duo-btn duo-btn-blue flex-1">
                    {showAnswer ? "Cevabı Gizle" : "Cevabı Göster"}
                  </button>
                  <button onClick={next} className="duo-btn duo-btn-outline flex-1">Sonraki →</button>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <button onClick={() => { save(activeWord, "known"); next(); }} className="duo-btn duo-btn-green">✓ Bildim</button>
                  <button onClick={() => { save(activeWord, "hard"); next(); }} className="duo-btn duo-btn-yellow">~ Zorlandım</button>
                  <button onClick={() => { save(activeWord, "wrong"); next(); }} className="duo-btn duo-btn-red">✗ Bilemedim</button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-[2rem] p-5">
                  <h2 className="font-bold mb-2">Kademe Notu</h2>
                  <p className="text-stone-300 text-sm">{getLevelDescription(level)}</p>
                </div>
                <div className="glass-card rounded-[2rem] p-5">
                  <h2 className="font-bold mb-3">Bu Kademeden Kelimeler</h2>
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {levelWords.map((w, i) => (
                      <button key={w.id} onClick={() => { setIndex(i); setShowAnswer(false); setSelectedAnswer(null); }}
                        className={`text-left rounded-xl p-2 text-xs border transition ${i === index ? "bg-emerald-700/60 border-emerald-400/50" : progress[w.id]?.known ? "bg-green-900/20 border-green-700/30" : "bg-black/20 border-stone-700/30"}`}>
                        <div className="arabic-text text-xl">{w.arabic}</div>
                        <div className="text-stone-400 truncate">{w.turkish_meaning}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* KÖK AİLESİ */}
        {panel === "kokler" && (
          <section className="space-y-4">
            <div className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-bold mb-2">Kök Ailesi Öğrenimi</h2>
              <p className="text-stone-400 text-sm mb-5">Aynı kökten gelen kelimeleri birlikte öğren. Bir kök öğrenmek birçok kelimeyi kapılar.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {rootFamilies.map(([root, fam]) => (
                  <button key={root}
                    onClick={() => setActiveRootFilter(activeRootFilter === root ? null : root)}
                    className={`text-left rounded-2xl p-5 border transition ${activeRootFilter === root ? "bg-emerald-800/60 border-emerald-400/50" : "bg-black/20 border-stone-700/40 hover:border-emerald-400/30"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="arabic-text text-2xl text-amber-300">{root}</div>
                      <div className="text-xs text-stone-400 bg-stone-800 rounded-full px-2 py-1">{fam.length} kelime</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {fam.map(w => (
                        <span key={w.id} className="bg-emerald-900/30 border border-emerald-700/30 rounded-xl px-3 py-1 text-sm">
                          <span className="arabic-text text-base mr-1">{w.arabic}</span>
                          <span className="text-stone-400 text-xs">{w.turkish_meaning}</span>
                        </span>
                      ))}
                    </div>
                    {activeRootFilter === root && (
                      <div className="mt-4 pt-4 border-t border-stone-700/30">
                        {fam.map(w => (
                          <div key={w.id} className="flex items-center gap-3 py-2 border-b border-stone-800/50 last:border-0">
                            <button onClick={(e) => { e.stopPropagation(); speakArabic(w.arabic); }} className="arabic-text text-3xl bg-transparent text-right min-w-[60px]">{w.arabic}</button>
                            <div className="flex-1">
                              <div className="text-emerald-300 font-medium text-sm">{w.turkish_meaning}</div>
                              <div className="text-stone-500 text-xs">{w.part_of_speech} · {w.transliteration}</div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); openWord(w); }} className="text-xs bg-stone-700 hover:bg-stone-600 rounded-xl px-3 py-1 transition">Öğren</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GRAMER */}
        {panel === "gramer" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold mb-5">Gramer Dersleri</h2>
            <div className="grid md:grid-cols-[1fr_2fr] gap-6">
              <div className="space-y-2">
                {grammarTopics.map((g, i) => (
                  <button key={g.id} onClick={() => setGrammarIndex(i)}
                    className={`w-full text-left rounded-2xl p-4 border transition ${grammarIndex === i ? "bg-emerald-700/60 border-emerald-400/40" : "bg-black/20 border-stone-700/30 hover:border-emerald-400/20"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs rounded-full px-2 py-0.5 ${g.level === 1 ? "bg-blue-900/50 text-blue-300" : g.level === 2 ? "bg-amber-900/50 text-amber-300" : "bg-purple-900/50 text-purple-300"}`}>
                        {g.level === 1 ? "Temel" : g.level === 2 ? "Orta" : "İleri"}
                      </span>
                      <span className="font-medium text-sm">{g.title}</span>
                    </div>
                  </button>
                ))}
              </div>
              {grammarTopics[grammarIndex] && (
                <div className="soft-card rounded-[1.7rem] p-6">
                  <div className={`inline-block text-xs rounded-full px-3 py-1 mb-3 ${grammarTopics[grammarIndex].level === 1 ? "bg-blue-900/50 text-blue-300" : grammarTopics[grammarIndex].level === 2 ? "bg-amber-900/50 text-amber-300" : "bg-purple-900/50 text-purple-300"}`}>
                    {grammarTopics[grammarIndex].level === 1 ? "Temel" : grammarTopics[grammarIndex].level === 2 ? "Orta" : "İleri"}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{grammarTopics[grammarIndex].title}</h3>
                  <p className="text-stone-300 leading-relaxed mb-5">{grammarTopics[grammarIndex].description}</p>
                  <div className="bg-black/25 border border-stone-700 rounded-2xl p-5 mb-4">
                    <button onClick={() => speakArabic(grammarTopics[grammarIndex].example_arabic)} className="arabic-text arabic-clickable text-4xl mb-3 bg-transparent w-full text-right">{grammarTopics[grammarIndex].example_arabic}</button>
                    <div className="text-stone-300">{grammarTopics[grammarIndex].example_turkish}</div>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-400/20 rounded-2xl p-4">
                    <div className="text-amber-200 text-xs font-medium mb-1">Hafıza Tekniği</div>
                    <div className="text-stone-300 text-sm">{grammarTopics[grammarIndex].memory_hint}</div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* AYET ANALİZİ */}
        {panel === "ayet" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold mb-5">Ayet Analizi</h2>
            <div className="grid md:grid-cols-[1fr_2fr] gap-6">
              <div className="space-y-2">
                {sentenceAnalyses.map((s, i) => (
                  <button key={s.id} onClick={() => setSentenceIndex(i)}
                    className={`w-full text-left rounded-2xl p-4 border transition ${sentenceIndex === i ? "bg-emerald-700/60 border-emerald-400/40" : "bg-black/20 border-stone-700/30 hover:border-emerald-400/20"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs rounded-full px-2 py-0.5 ${s.level === 1 ? "bg-blue-900/50 text-blue-300" : s.level === 2 ? "bg-amber-900/50 text-amber-300" : "bg-purple-900/50 text-purple-300"}`}>
                        {s.level === 1 ? "Temel" : s.level === 2 ? "Orta" : "İleri"}
                      </span>
                      <span className="font-medium text-sm truncate">{s.title}</span>
                    </div>
                    <div className="arabic-text text-right text-sm text-stone-400 truncate">{s.arabic}</div>
                  </button>
                ))}
              </div>
              {sentenceAnalyses[sentenceIndex] && (() => {
                const s = sentenceAnalyses[sentenceIndex];
                return (
                  <div className="soft-card rounded-[1.7rem] p-6">
                    <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                    <button onClick={() => speakArabic(s.arabic)} className="arabic-text arabic-clickable text-4xl md:text-5xl mb-3 bg-transparent w-full text-right">{s.arabic}</button>
                    <div className="text-stone-300 mb-4">{s.turkish}</div>
                    <div className="bg-black/25 border border-stone-700 rounded-2xl p-4 mb-5">
                      <div className="text-stone-400 text-xs mb-1">Kalıp</div>
                      <div className="font-semibold text-amber-200">{s.pattern}</div>
                      <p className="text-stone-300 text-sm mt-2">{s.explanation}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {s.tokens.map((t, i) => (
                        <div key={i} className="rounded-2xl border border-stone-700 p-4 bg-black/20">
                          <button onClick={() => speakArabic(t.arabic)} className="arabic-text text-3xl bg-transparent w-full text-right mb-2">{t.arabic}</button>
                          <div className="text-emerald-300 text-sm font-medium">{t.meaning}</div>
                          <div className="text-stone-400 text-xs mt-1">{t.role}</div>
                          {t.note && <div className="text-stone-500 text-xs mt-1 italic">{t.note}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* SURE MODU */}
        {panel === "sure" && (
          <section className="space-y-4">
            <div className="grid md:grid-cols-[280px_1fr] gap-6">
              <div className="space-y-3">
                <h2 className="text-xl font-bold px-1">Sureler</h2>
                {surahs.map((surah, i) => {
                  const totalWords = surah.verses.reduce((acc, v) => acc + v.words.length, 0);
                  const knownWords = surah.verses.reduce((acc, v) =>
                    acc + v.words.filter(w => {
                      const match = words.find(wd => wd.arabic === w.arabic || wd.transliteration === w.transliteration);
                      return match && progress[match.id]?.known;
                    }).length, 0);
                  return (
                    <button key={surah.id} onClick={() => { setActiveSurah(i); setActiveSurahVerse(null); }}
                      className={`w-full text-left rounded-2xl p-4 border transition ${activeSurah === i ? "bg-emerald-800/60 border-emerald-400/40" : "glass-card hover:border-emerald-400/20"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">{surah.name}</span>
                        <span className="arabic-text text-xl text-amber-200">{surah.arabicName}</span>
                      </div>
                      <div className="text-stone-400 text-xs mb-2">{surah.turkishName} · {surah.totalVerses} ayet</div>
                      <div className="duo-progress-track" style={{height:"0.625rem"}}>
                        <div className="duo-progress-fill" style={{ width: totalWords > 0 ? `${Math.round((knownWords / totalWords) * 100)}%` : "0%" }} />
                      </div>
                      <div className={`text-xs mt-1 ${surah.level === 1 ? "text-blue-400" : surah.level === 2 ? "text-amber-400" : "text-purple-400"}`}>
                        {surah.level === 1 ? "Temel" : surah.level === 2 ? "Orta" : "İleri"}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="glass-card rounded-[2rem] p-5 sm:p-6">
                {/* Okuyucu seçici */}
                <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-stone-700/40">
                  <span className="text-stone-400 text-xs font-medium shrink-0">🎙️ Okuyucu:</span>
                  {RECITERS.map(r => (
                    <button key={r.id} onClick={() => changeReciter(r.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition ${reciter === r.id ? "bg-emerald-600 border-emerald-400 text-white" : "border-stone-600 text-stone-400 hover:border-emerald-500/50 hover:text-white"}`}>
                      {r.flag} {r.name}
                    </button>
                  ))}
                </div>

                {surahs[activeSurah] && (() => {
                  const surah = surahs[activeSurah];
                  const surahIdx = activeSurah + 1; // 1-based app surah index
                  const isSurahPlaying = surah.verses.some(v => playingVerse === `s${activeSurah}:${v.number}`);
                  return (
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-xl sm:text-2xl font-bold">{surah.name}</h2>
                            <span className="arabic-text text-2xl text-amber-200">{surah.arabicName}</span>
                          </div>
                          <p className="text-stone-400 text-sm mt-1">{surah.theme}</p>
                        </div>
                        <button
                          onClick={() => isSurahPlaying ? stopCurrentAudio() : playSurahSequential(activeSurah)}
                          className={`duo-btn shrink-0 text-sm ${isSurahPlaying ? "duo-btn-red" : "duo-btn-blue"}`}>
                          {isSurahPlaying ? "⏹ Durdur" : "▶ Tümünü Dinle"}
                        </button>
                      </div>

                      <div className="space-y-3">
                        {surah.verses.map((verse, vi) => {
                          const verseKey = `s${activeSurah}:${verse.number}`;
                          const isPlaying = playingVerse === verseKey;
                          return (
                          <div key={vi} className={`rounded-2xl border transition ${activeSurahVerse === vi ? "bg-emerald-900/20 border-emerald-400/30" : isPlaying ? "bg-blue-900/20 border-blue-400/40" : "bg-black/20 border-stone-700/30"}`}>
                            <div className="p-4 sm:p-5">
                              <div className="flex items-center gap-3 mb-2">
                                {/* Ayet numarası + ses butonu */}
                                <button
                                  onClick={() => isPlaying ? stopCurrentAudio() : playVerse(verseKey, getVerseAudioUrl(surahIdx, verse.number, reciter))}
                                  className={`w-8 h-8 rounded-full text-xs font-bold shrink-0 flex items-center justify-center transition border ${isPlaying ? "bg-blue-500 border-blue-400 text-white animate-pulse" : "bg-emerald-800/60 border-emerald-600/40 text-emerald-300 hover:bg-emerald-600"}`}>
                                  {isPlaying ? "⏸" : verse.number}
                                </button>
                                {/* Ayet metni */}
                                <div className="arabic-text text-xl sm:text-2xl md:text-3xl text-right flex-1 leading-loose cursor-pointer"
                                     onClick={() => setActiveSurahVerse(activeSurahVerse === vi ? null : vi)}>
                                  {verse.arabic}
                                </div>
                              </div>
                              <div className="text-stone-400 text-sm pl-11">{verse.turkish}</div>
                              {isPlaying && (
                                <div className="pl-11 mt-2 flex items-center gap-1.5">
                                  {[1,2,3,4,5].map(i => (
                                    <div key={i} className="w-1 rounded-full bg-blue-400"
                                         style={{height:`${6 + (i%3)*4}px`, animation:`pulse ${0.4 + i*0.1}s ease-in-out infinite alternate`}} />
                                  ))}
                                  <span className="text-blue-400 text-xs ml-1">oynuyor...</span>
                                </div>
                              )}
                            </div>

                            {activeSurahVerse === vi && (
                              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-stone-700/30">
                                <div className="text-stone-500 text-xs mb-3">Kelime Kelime Analiz:</div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                  {verse.words.map((w, wi) => (
                                    <div key={wi} className="rounded-xl border border-stone-700/50 bg-stone-900/40 p-3">
                                      <button onClick={() => speakArabic(w.arabic)} className="arabic-text text-2xl bg-transparent w-full text-right mb-2 hover:text-emerald-300 transition">{w.arabic}</button>
                                      <div className="text-stone-400 text-xs mb-1">{w.transliteration}</div>
                                      <div className="text-emerald-300 text-sm font-medium">{w.meaning}</div>
                                      <div className="text-stone-500 text-xs mt-1">{w.role}</div>
                                      {w.root && <div className="text-amber-400/60 text-xs mt-1">Kök: {w.root}</div>}
                                      {w.note && <div className="text-stone-600 text-xs mt-1 italic">{w.note}</div>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );})}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {/* MORFOLOJİ */}
        {panel === "morfo" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold mb-2">Arapça Kelime Kalıpları</h2>
            <p className="text-stone-400 text-sm mb-6">
              Arapçada kelimeler belirli kalıplardan türer. Bir kalıbı tanıyınca yüzlerce kelimeyi anlayabilirsin.
            </p>
            <div className="grid md:grid-cols-[260px_1fr] gap-6">
              <div className="space-y-2">
                {morphPatterns.map((mp, i) => (
                  <button key={mp.id} onClick={() => setMorphIndex(i)}
                    className={`w-full text-left rounded-2xl p-4 border transition ${morphIndex === i ? "bg-emerald-800/60 border-emerald-400/40" : "bg-black/20 border-stone-700/30 hover:border-emerald-400/20"}`}>
                    <div className="arabic-text text-2xl text-amber-200 mb-1">{mp.patternArabic}</div>
                    <div className="font-medium text-sm">{mp.name}</div>
                  </button>
                ))}
              </div>
              {morphPatterns[morphIndex] && (() => {
                const mp = morphPatterns[morphIndex];
                return (
                  <div className="soft-card rounded-[1.7rem] p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <button onClick={() => speakArabic(mp.patternArabic)} className="arabic-text text-6xl bg-transparent text-amber-200">{mp.patternArabic}</button>
                      <div>
                        <div className="text-xl font-bold">{mp.name}</div>
                        <div className="text-stone-400 text-sm font-mono">{mp.pattern}</div>
                      </div>
                    </div>
                    <p className="text-stone-300 leading-relaxed mb-6">{mp.description}</p>
                    <div className="mb-2 text-stone-400 text-sm font-medium">Bu kalıptan örnekler:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {mp.examples.map((ex, i) => (
                        <div key={i} className="rounded-2xl border border-stone-700/50 bg-black/20 p-4 text-center">
                          <button onClick={() => speakArabic(ex.arabic)} className="arabic-text text-3xl bg-transparent w-full mb-2">{ex.arabic}</button>
                          <div className="text-stone-400 text-xs mb-1">{ex.transliteration}</div>
                          <div className="text-emerald-300 text-sm font-medium">{ex.meaning}</div>
                          <div className="text-amber-400/60 text-xs mt-1">Kök: {ex.root}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* TEST */}
        {panel === "quiz" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold mb-4">Kelime Testi</h2>
            <div className="flex flex-wrap gap-2 mb-5">
              {(["meaning", "reverse", "role", "root"] as QuizMode[]).map((m) => (
                <button key={m} onClick={() => { setQuizMode(m); setSelectedAnswer(null); }}
                  className={`duo-tab${quizMode === m ? " active" : ""}`}>
                  {m === "meaning" ? "Anlam" : m === "reverse" ? "Arapça" : m === "role" ? "Görev" : "Kök"}
                </button>
              ))}
            </div>
            <div className="soft-card rounded-[1.7rem] p-6 text-center">
              {activeImage && <img src={imgSrc(activeImage)} alt="" className="w-full max-w-[200px] mx-auto mb-5 rounded-3xl border border-emerald-400/20" />}
              <div className="mb-6">
                <button onClick={() => quizPrompt.questionIsArabic && speakArabic(quizPrompt.question)}
                  className={`${quizPrompt.questionIsArabic ? "arabic-text text-6xl" : "text-2xl font-bold"} bg-transparent w-full`}>
                  {quizPrompt.question}
                </button>
                {quizPrompt.questionIsArabic && <div className="text-stone-600 text-xs text-center mt-1">▶ tıkla → seslendir</div>}
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {quizOptions.map((o) => (
                  <button key={o} onClick={() => answerQuiz(o)}
                    className={`quiz-option ${selectedAnswer
                      ? o === quizPrompt.answer ? "correct"
                        : selectedAnswer === o ? "wrong"
                          : "dimmed"
                      : ""}`}>
                    {o}
                  </button>
                ))}
              </div>
              {selectedAnswer && (
                <button onClick={next} className="duo-btn duo-btn-green mt-5 w-full">
                  Sonraki Soru →
                </button>
              )}
            </div>
          </section>
        )}

        {/* TEKRAR */}
        {panel === "tekrar" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold mb-1">Akıllı Tekrar</h2>
            <p className="text-stone-400 text-sm mb-5">
              SM-2 algoritması — doğru yaptıkça aralık uzar, yanlışta sıfırlanır.
            </p>
            {reviewWords.length === 0
              ? <div className="soft-card rounded-2xl p-10 text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <div className="text-stone-300 font-medium">Şu an tekrar bekleyen kelime yok.</div>
                  <div className="text-stone-500 text-sm mt-2">
                    Kelime derslerinde "Zorlandım" veya "Bilemedim" dersen buraya düşer.
                  </div>
                </div>
              : <>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-black/20 border border-stone-700/60 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-300">{reviewWords.length}</div>
                      <div className="text-stone-400 text-xs mt-1">Bekleyen</div>
                    </div>
                    <div className="bg-black/20 border border-stone-700/60 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-red-400">
                        {Object.values(progress).filter(p => p.wrongCount > 0).length}
                      </div>
                      <div className="text-stone-400 text-xs mt-1">Yanlış yapılan</div>
                    </div>
                    <div className="bg-black/20 border border-stone-700/60 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{learned}</div>
                      <div className="text-stone-400 text-xs mt-1">Öğrenildi</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviewWords.map((w) => {
                      const p = progress[w.id];
                      return (
                        <button key={w.id} onClick={() => openWord(w)}
                          className="soft-card rounded-[1.5rem] p-4 text-left hover:border-emerald-400/50 transition">
                          <div className="arabic-text text-4xl text-right mb-2">{w.arabic}</div>
                          <div className="text-emerald-300 font-medium">{w.turkish_meaning}</div>
                          <div className="text-stone-400 text-xs mt-1">{w.part_of_speech}</div>
                          {p && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                              <span className="bg-red-900/30 text-red-300 text-xs rounded-full px-2 py-0.5">{p.wrongCount} yanlış</span>
                              <span className="bg-amber-900/30 text-amber-300 text-xs rounded-full px-2 py-0.5">{p.hardCount} zorlandım</span>
                              <span className="bg-stone-800 text-stone-400 text-xs rounded-full px-2 py-0.5">{getNextReviewInfo(p)}</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
            }
          </section>
        )}

        {/* GÖRSELLER */}
        {panel === "gorseller" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold mb-2">Görsel Hafıza Kartları</h2>
            <p className="text-stone-400 text-sm mb-6">Her görsele tıkla, sesini duy ve anlam bağlantısını güçlendir.</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {["tümü", "görselli", "isim", "fiil", "edat"].map(f => (
                  <button key={f} onClick={() => setVisualFilter(f)}
                    className={`duo-tab${visualFilter === f ? " active" : ""}`}>
                    {f === "tümü" ? `Tümü (${words.length})` : f === "görselli" ? `Görselli (${visualWords.length})` : f}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(visualFilter === "görselli" ? visualWords
                  : visualFilter === "tümü" ? [...visualWords, ...words.filter(w => !memoryImagesByArabic[w.arabic])]
                  : words.filter(w => w.part_of_speech.includes(visualFilter === "isim" ? "isim" : visualFilter === "fiil" ? "fiil" : "harf") || (visualFilter === "edat" && (w.part_of_speech.includes("edat") || w.part_of_speech.includes("bağlaç") || w.part_of_speech.includes("olumsuzluk"))))
                ).map((w) => <WordCard key={w.id} word={w} onClick={() => openWord(w)} large />)}
              </div>
          </section>
        )}

        {/* RÜTBELER PANELİ */}
        {panel === "rutbe" && (
          <section className="glass-card rounded-[2rem] p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏅</span>
              <div>
                <h2 className="text-2xl font-bold">Rütbeler</h2>
                <p className="text-stone-400 text-sm">Öğrendikçe yüksel, Kur'an yolunda ilerle</p>
              </div>
            </div>

            {/* Mevcut rütbe vurgusu */}
            <div className="mb-6 mt-4 rounded-2xl p-5 border-2 text-center"
                 style={{background:`${rank.color}18`, borderColor:`${rank.color}55`}}>
              <div className="text-5xl mb-2">{rank.icon}</div>
              <div className="text-2xl font-bold text-white">{rank.title}</div>
              <div className="arabic-text text-xl mb-2" style={{color:rank.color}}>{rank.arabic}</div>
              <div className="text-stone-300 text-sm">{rank.desc}</div>
              <div className="text-stone-500 text-xs mt-2">{learned} kelime öğrenildi</div>
              {nextRank && (
                <div className="mt-3">
                  <div className="h-2 rounded-full overflow-hidden mx-auto max-w-xs" style={{background:"rgba(255,255,255,0.1)"}}>
                    <div className="h-full rounded-full transition-all duration-700" style={{width:`${rankPct}%`, background:rank.color}} />
                  </div>
                  <div className="text-stone-500 text-xs mt-1">
                    {nextRank.icon} {nextRank.title} için {nextRank.min - learned} kelime daha
                  </div>
                </div>
              )}
            </div>

            {/* Tüm rütbeler */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RANKS.map((r, i) => {
                const isActive = rank.min === r.min;
                const isUnlocked = learned >= r.min;
                const isNext = nextRank?.min === r.min;
                return (
                  <div key={i} className="rounded-2xl p-4 border transition-all"
                       style={{
                         background: isActive ? `${r.color}22` : isUnlocked ? `${r.color}0e` : "rgba(255,255,255,0.03)",
                         borderColor: isActive ? `${r.color}80` : isNext ? `${r.color}50` : "rgba(255,255,255,0.08)",
                         opacity: isUnlocked ? 1 : 0.45,
                       }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-2xl ${!isUnlocked ? "grayscale" : ""}`}>{r.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-white">{r.title}</div>
                        <div className="arabic-text text-sm" style={{color: isUnlocked ? r.color : "#8FA8B4"}}>{r.arabic}</div>
                      </div>
                      {isActive && <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                        style={{background:`${r.color}33`, color:r.color}}>Mevcut</span>}
                      {!isUnlocked && !isNext && <span className="text-xs text-stone-600">🔒</span>}
                      {isNext && <span className="text-xs text-stone-400 font-medium">Sonraki</span>}
                    </div>
                    <div className="text-stone-400 text-xs mb-1">{r.desc}</div>
                    <div className="text-stone-600 text-xs">{r.min} kelimeden itibaren</div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <footer className="text-center text-stone-500 text-xs py-8 mt-4 space-y-1">
          <div>Ayet Hafızası · {words.length} kelime · {visualWords.length} görsel kart</div>
          <div className="text-stone-600">v{APP_VERSION} · {BUILD_DATE} {BUILD_TIME}</div>
        </footer>
      </div>
    </main>
  );
}

function WordCard({ word, onClick, large = false }: { word: Word; onClick: () => void; large?: boolean }) {
  const _slug = getCardSlug(word.arabic);
  const image = _slug ? `/cards/${_slug}.png` : (memoryImagesByArabic[word.arabic] || null);
  const card = memoryCards[word.arabic];

  const fallbackBg: Record<string, string> = {
    "isim": "from-blue-900 to-slate-950",
    "fiil": "from-purple-900 to-slate-950",
    "sıfat": "from-amber-900 to-slate-950",
    "harf-i cer": "from-teal-900 to-slate-950",
    "bağlaç": "from-rose-900 to-slate-950",
    "zamir": "from-indigo-900 to-slate-950",
    "edat": "from-emerald-900 to-slate-950",
    "zarf": "from-orange-900 to-slate-950",
    "özel isim": "from-yellow-900 to-slate-950",
    "olumsuzluk": "from-red-900 to-slate-950",
    "soru": "from-cyan-900 to-slate-950",
    "ism-i mevsûl": "from-violet-900 to-slate-950",
  };
  const posKey = Object.keys(fallbackBg).find(k => word.part_of_speech.includes(k)) || "isim";
  const bg = card?.bg || fallbackBg[posKey];

  const heightClass = large ? "h-52" : "h-40";

  return (
    <button onClick={onClick} className="rounded-[1.5rem] overflow-hidden text-left hover:scale-[1.02] transition-transform duration-200 w-full"
      style={{background:"var(--duo-card)", border:"2px solid var(--duo-card-border)", borderBottom:"4px solid var(--duo-card-shadow)"}}>
      {/* Görsel alan */}
      {image ? (
        <img src={imgSrc(image)} alt={word.turkish_meaning}
          className={`w-full ${heightClass} object-cover`} />
      ) : (
        <div className={heightClass} style={{overflow:"hidden"}}>
          <MemoryScene arabic={word.arabic} transliteration={word.transliteration} partOfSpeech={word.part_of_speech} memoryHint={word.memory_hint} compact />
        </div>
      )}
      {/* Bilgi alanı */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-white/90 font-semibold text-sm truncate">{word.turkish_meaning}</div>
            {word.root && <div className="text-amber-400/70 text-xs mt-0.5 font-mono">{word.root}</div>}
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0 mt-0.5"
            style={{background:"rgba(255,255,255,0.06)", color:"var(--duo-muted)"}}>
            {word.part_of_speech.split(" ")[0]}
          </span>
        </div>
        {word.memory_hint && (
          <div className="flex items-start gap-1 mt-1.5">
            <span className="text-[11px] shrink-0">💡</span>
            <div className="text-[11px] italic text-amber-300/60 leading-tight line-clamp-2">{word.memory_hint}</div>
          </div>
        )}
        {(word as any).frequency && (
          <div className="text-[11px] mt-1" style={{color:"var(--duo-muted)"}}>
            {(word as any).frequency.toLocaleString()}× Kur&apos;an&apos;da
          </div>
        )}
      </div>
    </button>
  );
}
function Tab({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon?: string }) {
  return (
    <button onClick={onClick} className={`duo-tab${active ? " active" : ""}`}>
      {icon && <span className="tab-icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
function MiniMetric({ label, value, icon, suffix, highlight }: { label: string; value: number; icon: string; suffix?: string; highlight?: "green"|"orange"|"blue"|"red" }) {
  const colors: Record<string, string> = { green:"#58CC02", orange:"#FF9600", blue:"#1CB0F6", red:"#FF4B4B" };
  const c = highlight ? colors[highlight] : "#FFFEF9";
  return (
    <div className="duo-card p-4 text-center">
      <div className={`text-2xl mb-1 ${highlight === "orange" ? "streak-glow" : ""}`}>{icon}</div>
      <div className="text-2xl font-bold" style={{color: c}}>{value}{suffix ? ` ${suffix}` : ""}</div>
      <div className="text-xs mt-1" style={{color:"var(--duo-muted)"}}>{label}</div>
    </div>
  );
}
function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="soft-card rounded-2xl p-5">
      <div className="text-stone-400 text-sm mb-1">{title}</div>
      <div className="text-stone-100 leading-relaxed">{value}</div>
    </div>
  );
}

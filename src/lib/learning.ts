import type { Level, ProgressMap, QuizMode, StreakData, Word, WordProgress } from "@/data/types";
import { getWordAudioUrl } from "@/lib/quranAudio";
import { QURAN_TOTAL_SEGMENTS, WORD_LEMMA } from "@/data/quranFreq";

export const STORAGE_KEY = "ayet-hafizasi-clean-v1";

let _currentAudio: HTMLAudioElement | null = null;

export function stopAudio() {
  if (_currentAudio) { _currentAudio.pause(); _currentAudio = null; }
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}

export function speakArabic(text: string) {
  if (typeof window === "undefined") return;
  stopAudio();

  const wordUrl = getWordAudioUrl(text);
  if (wordUrl) {
    const a = new Audio(wordUrl);
    _currentAudio = a;
    a.play().catch(() => _webSpeech(text));
    return;
  }
  _webSpeech(text);
}

function _webSpeech(text: string) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA"; u.rate = 0.72; u.pitch = 1;
  window.speechSynthesis.speak(u);
}
export function emptyProgress(): WordProgress {
  return {
    known: false, hard: false,
    correctCount: 0, hardCount: 0, wrongCount: 0,
    lastAnswer: null, lastStudiedAt: null, nextReviewAt: null,
    interval: 1, easeFactor: 2.5, repetitions: 0,
  };
}
/** Bir kelimenin "öğrenildi" sayılması için doğru cevap verilmiş farklı gün sayısı. */
export const KNOWN_MIN_DAYS = 2;

export function updateProgress(old: WordProgress, type: "known" | "hard" | "wrong"): WordProgress {
  const today = new Date().toISOString().split("T")[0];
  // Eski kayıtlar: daha önce "öğrenildi" sayılmış kelime, yeni kuralla düşmesin
  let correctDays = old.correctDays ?? (old.known && old.lastStudiedAt ? [old.lastStudiedAt.split("T")[0]] : []);
  const alreadyCorrectToday = type === "known" && correctDays.includes(today);
  if (alreadyCorrectToday) {
    // Aynı gün tekrar doğru bilmek kısa süreli hafızadır: aralığı büyütme, sadece sayacı artır
    return { ...old, correctDays, correctCount: old.correctCount + 1, lastAnswer: type, lastStudiedAt: new Date().toISOString() };
  }
  if (type === "known") correctDays = [...correctDays, today].slice(-5);
  else if (type === "wrong") correctDays = [];

  let interval = old.interval ?? 1;
  let easeFactor = old.easeFactor ?? 2.5;
  let repetitions = old.repetitions ?? 0;
  const correctCount = type === "known" ? old.correctCount + 1 : old.correctCount;
  const hardCount = type === "hard" ? old.hardCount + 1 : old.hardCount;
  const wrongCount = type === "wrong" ? old.wrongCount + 1 : old.wrongCount;

  if (type === "known") {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
    easeFactor = Math.max(1.3, easeFactor + 0.1);
  } else if (type === "hard") {
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    repetitions = Math.max(0, repetitions - 1);
  } else {
    interval = 1;
    repetitions = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  }

  const nextReviewAt = new Date(Date.now() + interval * 86400000).toISOString();
  const known = type === "known" ? correctDays.length >= KNOWN_MIN_DAYS : false;
  const hard = type === "wrong" || type === "hard" ? true : correctCount >= 3 ? false : old.hard;

  return {
    ...old, known, hard, correctCount, hardCount, wrongCount, correctDays,
    lastAnswer: type, lastStudiedAt: new Date().toISOString(),
    nextReviewAt, interval, easeFactor, repetitions,
  };
}
export function getReviewWords(words: Word[], progress: ProgressMap): Word[] {
  const now = Date.now();
  return words.filter(w => {
    const item = progress[w.id];
    if (!item) return false;
    if (item.nextReviewAt && new Date(item.nextReviewAt).getTime() <= now) return true;
    return item.hard || item.wrongCount > 0;
  }).sort((a, b) => {
    const ra = progress[a.id]?.nextReviewAt;
    const rb = progress[b.id]?.nextReviewAt;
    if (!ra) return 1;
    if (!rb) return -1;
    return new Date(ra).getTime() - new Date(rb).getTime();
  });
}
export function getLevelTitle(level:Level){ if(level===1)return "Edatlar ve Bağlaçlar"; if(level===2)return "İsimler ve Anlamlar"; return "Fiiller"; }
export function getLevelShort(level:Level){ return `Kademe ${level}`; }
export function getLevelDescription(level:Level){ if(level===1)return "Kısa ama çok sık geçen bağlantı kelimeleri."; if(level===2)return "Kur’an’da sık geçen isim ve kavramlar."; return "Fiiller ve cümle hareketleri."; }
export function getLevelIcon(level:Level){ if(level===1)return "◇"; if(level===2)return "◈"; return "◆"; }
export function buildQuizOptions(words:Word[],activeWord:Word,mode:QuizMode){ const getAnswer=(w:Word)=>mode==="meaning"?w.turkish_meaning:mode==="reverse"?w.arabic:mode==="role"?w.part_of_speech:(w.root||"kök yok"); const correct=getAnswer(activeWord); const wrong=words.filter(w=>w.id!==activeWord.id).map(getAnswer).filter(x=>x!==correct).filter((x,i,a)=>a.indexOf(x)===i).sort(()=>Math.random()-.5).slice(0,3); return [...wrong,correct].sort(()=>Math.random()-.5); }
export function getQuizPrompt(activeWord:Word,mode:QuizMode){ if(mode==="meaning")return{title:"Arapça kelimenin Türkçe anlamını seç.",question:activeWord.arabic,answer:activeWord.turkish_meaning,questionIsArabic:true}; if(mode==="reverse")return{title:"Türkçe anlamın Arapça karşılığını seç.",question:activeWord.turkish_meaning,answer:activeWord.arabic,questionIsArabic:false}; if(mode==="role")return{title:"Kelimenin görevini seç.",question:activeWord.arabic,answer:activeWord.part_of_speech,questionIsArabic:true}; return{title:"Kelimenin kökünü seç.",question:activeWord.arabic,answer:activeWord.root||"kök yok",questionIsArabic:true}; }

/**
 * Kur'an metin kapsamı (%): bilinen kelimelerin lemmalarının Kur'an'daki toplam geçişi / Kur'an'ın toplam kelime+edat sayısı.
 * Aynı lemmaya bağlı kelimeler bir kez sayılır. Bu "anlama" değil, metinde tanıdığın kelimelerin oranıdır.
 */
export function coverageOf(words: Word[], isKnown: (w: Word) => boolean): number {
  const seen = new Set<string>();
  let sum = 0;
  for (const w of words) {
    if (!isKnown(w)) continue;
    const lemma = WORD_LEMMA[w.id] ?? `id:${w.id}`;
    if (seen.has(lemma)) continue;
    seen.add(lemma);
    sum += w.frequency ?? 0;
  }
  return (sum / QURAN_TOTAL_SEGMENTS) * 100;
}

const byFrequency = (a: Word, b: Word) => (b.frequency ?? 0) - (a.frequency ?? 0);

export function getQuranCoverage(words: Word[], progress: ProgressMap): number {
  return Math.round(coverageOf(words, w => !!progress[w.id]?.known));
}

/** En sık n kelimeyi bilen birinin metin kapsamı (%). */
export function topCoverage(words: Word[], n: number): number {
  const top = new Set([...words].sort(byFrequency).slice(0, n).map(w => w.id));
  return Math.round(coverageOf(words, w => top.has(w.id)));
}

const MILESTONES = [10, 20, 30, 50, 75, 100, 150, 200, 300, 420];

export function getMilestone(words: Word[], progress: ProgressMap): { current: number; next: number; label: string } {
  const known = (w: Word) => !!progress[w.id]?.known;
  const learnedCount = words.filter(known).length;
  const next = MILESTONES.find(t => learnedCount < t) ?? words.length;
  const current = [...MILESTONES].reverse().find(t => learnedCount >= t) ?? 0;
  // Sıradaki hedefe kadar en sık bilinmeyen kelimeler de öğrenilirse kapsam ne olur?
  const upcoming = new Set(words.filter(w => !known(w)).sort(byFrequency).slice(0, Math.max(0, next - learnedCount)).map(w => w.id));
  const pct = Math.round(coverageOf(words, w => known(w) || upcoming.has(w.id)));
  return { current, next, label: `%${pct} metin` };
}

export function getDailyWords(words: Word[], progress: ProgressMap, count = 5): Word[] {
  // Önce bilinmeyen kelimeleri frekansa göre sırala (frequency alanı varsa büyükten küçüğe)
  const unknown = words.filter(w => {
    const p = progress[w.id];
    return !p || !p.known;
  });
  const sorted = [...unknown].sort((a, b) => {
    const fa = (a as any).frequency ?? 0;
    const fb = (b as any).frequency ?? 0;
    return fb - fa;
  });
  return sorted.slice(0, count);
}

export function searchWords(words: Word[], query: string): Word[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return words.filter(w =>
    w.arabic.includes(query.trim()) ||
    w.transliteration.toLowerCase().includes(q) ||
    w.turkish_meaning.toLowerCase().includes(q) ||
    (w.root && w.root.includes(query.trim()))
  ).slice(0, 20);
}

export const STREAK_KEY = "ayet-streak-v1";

export function getStreak(): StreakData {
  if (typeof window === "undefined") return { currentStreak: 0, longestStreak: 0, lastStudyDate: null, todayCount: 0 };
  try {
    const saved = localStorage.getItem(STREAK_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastStudyDate: null, todayCount: 0 };
}

const dayKey = (d: Date) => d.toISOString().split("T")[0];
const prevDay = (key: string) => dayKey(new Date(new Date(key + "T00:00:00Z").getTime() - 86400000));

/**
 * Hoca'da bitirilen derslerin tarihlerinden seriyi tamamlar.
 * Seri kaydında olmayan (daha yeni) çalışma günleri varsa seriyi ve bugünkü sayıyı onlara göre günceller.
 * Seri zaten güncelse aynen döner, bu yüzden tekrar tekrar çağrılabilir.
 */
export function reconcileStreak(streak: StreakData, lessonDates: string[]): StreakData {
  const counts = new Map<string, number>();
  for (const at of lessonDates) {
    const t = Date.parse(at);
    if (isNaN(t)) continue;
    const k = dayKey(new Date(t));
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  if (!counts.size) return streak;
  const latest = [...counts.keys()].sort().pop()!;
  if (streak.lastStudyDate && latest <= streak.lastStudyDate) return streak;
  let chain = 0;
  let d: string = latest;
  while (true) {
    if (d === streak.lastStudyDate) { chain += streak.currentStreak; break; }
    if (!counts.has(d)) break;
    chain++;
    d = prevDay(d);
  }
  return {
    currentStreak: chain,
    longestStreak: Math.max(chain, streak.longestStreak),
    lastStudyDate: latest,
    todayCount: counts.get(latest) ?? 0,
  };
}

/** Ekranda gösterilecek seri: bugün/dün çalışılmadıysa seri 0, bugün çalışılmadıysa bugünkü sayı 0. */
export function displayStreak(streak: StreakData): StreakData {
  const today = dayKey(new Date());
  const yesterday = prevDay(today);
  const last = streak.lastStudyDate;
  return {
    ...streak,
    currentStreak: last === today || last === yesterday ? streak.currentStreak : 0,
    todayCount: last === today ? streak.todayCount : 0,
  };
}

export function getNextReviewInfo(p: WordProgress): string {
  if (!p.nextReviewAt) return "Bugün";
  const diff = Math.ceil((new Date(p.nextReviewAt).getTime() - Date.now()) / 86400000);
  if (diff <= 0) return "Bugün tekrar!";
  if (diff === 1) return "Yarın";
  return `${diff} gün sonra`;
}

export function getStageProgress(words: Word[], progress: ProgressMap) {
  const stage1Words = words.filter(w => w.level === 1);
  const stage2Words = words.filter(w => w.level === 2);
  const stage3Words = words.filter(w => w.level === 3);

  const learned1 = stage1Words.filter(w => progress[w.id]?.known).length;
  const learned2 = stage2Words.filter(w => progress[w.id]?.known).length;
  const learned3 = stage3Words.filter(w => progress[w.id]?.known).length;

  const pct1 = stage1Words.length > 0 ? Math.round((learned1 / stage1Words.length) * 100) : 0;
  const pct2 = stage2Words.length > 0 ? Math.round((learned2 / stage2Words.length) * 100) : 0;
  const pct3 = stage3Words.length > 0 ? Math.round((learned3 / stage3Words.length) * 100) : 0;

  const stage2Unlocked = pct1 >= 70;
  const stage3Unlocked = pct2 >= 60;

  return {
    stages: [
      { id: 1, label: "Kademe 1", title: "Temel Edatlar & Bağlaçlar", total: stage1Words.length, learned: learned1, pct: pct1, unlocked: true, unlockAt: null },
      { id: 2, label: "Kademe 2", title: "İsimler & Kavramlar", total: stage2Words.length, learned: learned2, pct: pct2, unlocked: stage2Unlocked, unlockAt: Math.max(0, Math.ceil(stage1Words.length * 0.7) - learned1) },
      { id: 3, label: "Kademe 3", title: "Fiiller & Eylemler", total: stage3Words.length, learned: learned3, pct: pct3, unlocked: stage3Unlocked, unlockAt: Math.max(0, Math.ceil(stage2Words.length * 0.6) - learned2) },
    ],
    stage2Unlocked,
    stage3Unlocked,
  };
}

export function updateStreak(streak: StreakData): StreakData {
  const today = new Date().toISOString().split("T")[0];
  const last = streak.lastStudyDate;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  let currentStreak = streak.currentStreak;
  if (last === today) {
    return { ...streak, todayCount: streak.todayCount + 1 };
  } else if (last === yesterday) {
    currentStreak = streak.currentStreak + 1;
  } else if (last !== today) {
    currentStreak = 1;
  }
  const updated = {
    currentStreak,
    longestStreak: Math.max(currentStreak, streak.longestStreak),
    lastStudyDate: today,
    todayCount: streak.todayCount + 1,
  };
  if (typeof window !== "undefined") localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return updated;
}

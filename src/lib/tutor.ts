// Ayet Hafızası — uygulama içi hoca motoru
// Seviye testi, sıralı öğrenme yolu (okuma + anlama), günlük plan, eksik takibi ve aralıklı tekrar.

import type { GrammarTopic, ProgressMap, SentenceAnalysis, Word } from "@/data/types";
import type { Letter, PlacementQ, ReadingItem, ReadingLesson } from "@/data/readingTypes";
import { READING } from "@/data/reading";

export const TUTOR_STORAGE_KEY = "ayet-hoca-v1";
export type Minutes = 10 | 25 | 60;

export type Mistake = { key: string; label: string; count: number; last: string; stepId?: string };

export type TutorState = {
  v: 1;
  placementDone: boolean;
  minutes: Minutes;
  done: Record<string, { score: number; at: string; viaPlacement?: boolean }>;
  mistakes: Record<string, Mistake>;
  review: Record<string, { due: string; interval: number }>;
  sessions: number;
  lastSessionAt: string | null;
};

export function emptyTutor(): TutorState {
  return { v: 1, placementDone: false, minutes: 25, done: {}, mistakes: {}, review: {}, sessions: 0, lastSessionAt: null };
}

export function normalizeTutor(x: unknown): TutorState {
  const base = emptyTutor();
  if (!x || typeof x !== "object") return base;
  const o = x as Partial<TutorState>;
  return {
    ...base, ...o,
    done: o.done ?? {}, mistakes: o.mistakes ?? {}, review: o.review ?? {},
    minutes: (o.minutes === 10 || o.minutes === 25 || o.minutes === 60) ? o.minutes : 25,
  };
}

// ─── Öğrenme yolu ────────────────────────────────────────────────────────────

export type StepKind = "reading" | "words" | "grammar" | "sentence";
export type Step = {
  id: string;
  track: "okuma" | "anlama";
  kind: StepKind;
  title: string;
  subtitle: string;
  lessonId?: string;
  wordIds?: number[];
  grammarId?: number;
  sentenceId?: number;
};

const READING_ORDER = [
  "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "B1",
  "K1", "K2", "K3", "K4", "K5", "K6", "K7",
  "P1", "T1", "P112", "T2", "P113", "T3", "P114", "T4", "P108", "T5", "P103", "T6",
  "P110", "P111", "P109", "P106", "P105", "P107",
];
/** Bu ders bitince anlama yolu açılır (harekeli okuyabilmek yeterli). */
export const UNDERSTANDING_UNLOCK = "K3";

export const lessonById: Record<string, ReadingLesson> =
  Object.fromEntries(READING.lessons.map(l => [l.id, l]));
export const letterByChar: Record<string, Letter> =
  Object.fromEntries(READING.letters.map(l => [l.char, l]));

const UNIT_LABEL: Record<string, string> = {
  harfler: "Harfler", harekeler: "Harekeler", tecvid: "Tecvid", pratik: "Okuma pratiği",
};

export function wordLearningOrder(words: Word[]): Word[] {
  // Önce çekirdek 420 kelime: kademe (edatlar → isimler → fiiller), kademe içinde Kur'an'da geçiş sıklığı.
  // Sonra ek kelimeler: tür ayrımı yapmadan yalnız sıklığa göre (en çok kapsam kazandıran önce).
  return [...words].sort((a, b) =>
    (Number(!!a.extended) - Number(!!b.extended)) ||
    (a.extended ? 0 : a.level - b.level) ||
    ((b.frequency ?? 100) - (a.frequency ?? 100)) || (a.id - b.id));
}

export function buildPath(words: Word[], grammar: GrammarTopic[], sentences: SentenceAnalysis[]): Step[] {
  const reading: Step[] = READING_ORDER.filter(id => lessonById[id]).map(id => {
    const l = lessonById[id];
    return { id: `r:${id}`, track: "okuma", kind: "reading", lessonId: id, title: l.title, subtitle: UNIT_LABEL[l.unit] };
  });

  const ordered = wordLearningOrder(words);
  const gOrder = [...grammar].sort((a, b) => (a.level - b.level) || (a.id - b.id));
  const sOrder = [...sentences].sort((a, b) => (a.level - b.level) || (a.id - b.id));
  const und: Step[] = [];
  const BLOCK = 8;
  let gi = 0, si = 0, block = 0;
  for (let i = 0; i < ordered.length; i += BLOCK) {
    block++;
    const ids = ordered.slice(i, i + BLOCK).map(w => w.id);
    und.push({
      id: `w:${block}`, track: "anlama", kind: "words", wordIds: ids,
      title: `Kelimeler ${block}`, subtitle: ordered.slice(i, i + 3).map(w => w.turkish_meaning.split(" / ")[0]).join(", ") + "…",
    });
    if (block % 2 === 0 && gi < gOrder.length) {
      const g = gOrder[gi++];
      und.push({ id: `g:${g.id}`, track: "anlama", kind: "grammar", grammarId: g.id, title: `Gramer: ${g.title}`, subtitle: "Gramer" });
    }
    if (block % 3 === 0 && si < sOrder.length) {
      const s = sOrder[si++];
      und.push({ id: `s:${s.id}`, track: "anlama", kind: "sentence", sentenceId: s.id, title: `Ayet: ${s.title}`, subtitle: "Ayet analizi" });
    }
  }
  while (gi < gOrder.length) { const g = gOrder[gi++]; und.push({ id: `g:${g.id}`, track: "anlama", kind: "grammar", grammarId: g.id, title: `Gramer: ${g.title}`, subtitle: "Gramer" }); }
  while (si < sOrder.length) { const s = sOrder[si++]; und.push({ id: `s:${s.id}`, track: "anlama", kind: "sentence", sentenceId: s.id, title: `Ayet: ${s.title}`, subtitle: "Ayet analizi" }); }
  return [...reading, ...und];
}

export function isDone(state: TutorState, stepId: string) { return !!state.done[stepId]; }
export function understandingUnlocked(state: TutorState) { return isDone(state, `r:${UNDERSTANDING_UNLOCK}`); }

export function nextSteps(state: TutorState, path: Step[], track: "okuma" | "anlama", n: number): Step[] {
  if (track === "anlama" && !understandingUnlocked(state)) return [];
  return path.filter(s => s.track === track && !isDone(state, s.id)).slice(0, n);
}

export function trackProgress(state: TutorState, path: Step[], track: "okuma" | "anlama") {
  const all = path.filter(s => s.track === track);
  const done = all.filter(s => isDone(state, s.id)).length;
  return { done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 0 };
}

// ─── Günlük plan ────────────────────────────────────────────────────────────

export type PlanItem =
  | { type: "step"; step: Step; isReview?: boolean }
  | { type: "words-review"; wordIds: number[] }
  | { type: "mistakes"; keys: string[] };

const PLAN_SIZE: Record<Minutes, { okuma: number; anlama: number; reviewWords: number; reviewSteps: number }> = {
  10: { okuma: 1, anlama: 1, reviewWords: 5, reviewSteps: 0 },
  25: { okuma: 1, anlama: 1, reviewWords: 8, reviewSteps: 1 },
  60: { okuma: 2, anlama: 3, reviewWords: 15, reviewSteps: 2 },
};

export function dueWordIds(progress: ProgressMap, limit: number): number[] {
  const now = Date.now();
  return Object.entries(progress)
    .filter(([, p]) => p && ((p.nextReviewAt && new Date(p.nextReviewAt).getTime() <= now) || p.wrongCount > p.correctCount))
    .sort((a, b) => (new Date(a[1].nextReviewAt ?? 0).getTime()) - (new Date(b[1].nextReviewAt ?? 0).getTime()))
    .slice(0, limit)
    .map(([id]) => Number(id));
}

export function buildDailyPlan(state: TutorState, path: Step[], progress: ProgressMap): PlanItem[] {
  const size = PLAN_SIZE[state.minutes];
  const plan: PlanItem[] = [];
  const topMistakes = sortedMistakes(state).filter(m => !m.key.startsWith("word:") && mistakeIsStudied(state, m.key)).slice(0, 4).map(m => m.key);
  if (topMistakes.length >= 2) plan.push({ type: "mistakes", keys: topMistakes });
  const now = Date.now();
  const dueSteps = Object.entries(state.review)
    .filter(([, r]) => new Date(r.due).getTime() <= now)
    .sort((a, b) => new Date(a[1].due).getTime() - new Date(b[1].due).getTime())
    .map(([id]) => path.find(s => s.id === id))
    .filter((s): s is Step => !!s)
    .slice(0, size.reviewSteps);
  for (const s of dueSteps) plan.push({ type: "step", step: s, isReview: true });
  const wr = dueWordIds(progress, size.reviewWords);
  if (wr.length >= 3) plan.push({ type: "words-review", wordIds: wr });

  const anlama = nextSteps(state, path, "anlama", size.anlama);
  // Anlama yolu henüz kilitliyse o süreyi okumaya ver
  const okuma = nextSteps(state, path, "okuma", size.okuma + (anlama.length === 0 && state.minutes !== 10 ? size.anlama : 0));
  // Okuma bitmediyse ve anlama kilitliyse, kısa planda bile okuma önceliklidir
  if (state.minutes === 10 && okuma.length && anlama.length) {
    // 10 dakikada günler arasında dönüşümlü: tek seans sayısında okuma, çiftte anlama
    plan.push({ type: "step", step: state.sessions % 2 === 0 ? okuma[0] : anlama[0] });
  } else {
    for (const s of okuma) plan.push({ type: "step", step: s });
    for (const s of anlama) plan.push({ type: "step", step: s });
  }
  return plan;
}

// ─── Eksik takibi ───────────────────────────────────────────────────────────

export function recordMistake(state: TutorState, key: string, label: string, stepId?: string): TutorState {
  const m = state.mistakes[key];
  return {
    ...state,
    mistakes: { ...state.mistakes, [key]: { key, label, stepId: stepId ?? m?.stepId, count: (m?.count ?? 0) + 1, last: new Date().toISOString() } },
  };
}

export function recordCorrect(state: TutorState, key: string): TutorState {
  const m = state.mistakes[key];
  if (!m) return state;
  const mistakes = { ...state.mistakes };
  if (m.count <= 1) delete mistakes[key]; else mistakes[key] = { ...m, count: m.count - 1 };
  return { ...state, mistakes };
}

/** Eksik, henüz işlenmemiş bir dersin konusuysa tekrar edilmez (önce öğretilir). */
export function mistakeIsStudied(state: TutorState, key: string): boolean {
  const [type, a] = key.split(":");
  if (type === "lesson") return isDone(state, `r:${a}`);
  if (type === "letter") { const l = READING.lessons.find(x => x.kind === "letters" && x.letters?.includes(a)); return !l || isDone(state, `r:${l.id}`); }
  if (type === "rule") { const l = READING.lessons.find(x => x.kind === "rules" && x.rules?.includes(a)); return !l || isDone(state, `r:${l.id}`); }
  if (type === "ayah") return isDone(state, `r:P${a}`);
  return true; // kelime, gramer ve ayet analizleri: soruldukları anda işlenmiş sayılır
}

export function sortedMistakes(state: TutorState): Mistake[] {
  return Object.values(state.mistakes).sort((a, b) => (b.count - a.count) || (b.last.localeCompare(a.last)));
}

export function completeStep(state: TutorState, stepId: string, score: number, isReview = false): TutorState {
  const prev = state.review[stepId];
  const interval = isReview && prev ? (score >= 0.8 ? Math.round(prev.interval * 2.5) : 1) : (score >= 0.9 ? 3 : 1);
  const due = new Date(Date.now() + interval * 86400000).toISOString();
  return {
    ...state,
    done: { ...state.done, [stepId]: { score: Math.max(score, state.done[stepId]?.score ?? 0), at: new Date().toISOString() } },
    review: interval > 60 ? omit(state.review, stepId) : { ...state.review, [stepId]: { due, interval } },
  };
}

function omit<T extends Record<string, unknown>>(o: T, k: string): T { const c = { ...o }; delete c[k]; return c; }

export function finishSession(state: TutorState): TutorState {
  return { ...state, sessions: state.sessions + 1, lastSessionAt: new Date().toISOString() };
}

// ─── Alıştırma üretimi ──────────────────────────────────────────────────────

export type Drill = {
  id: string;
  prompt: string;
  ar?: string;                    // büyük gösterilecek Arapça
  audioWord?: [number, number, number] | null;
  audioAyah?: number;
  options: string[];
  optionsArabic?: boolean;
  answer: string;
  explain?: string;
  mistakeKey: string;
  mistakeLabel: string;
  wordId?: number;                // anlama yolunda kelime ilerlemesi için
};

const shuffle = <T,>(a: T[]): T[] => { const c = [...a]; for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; } return c; };
const uniq = <T,>(a: T[]) => a.filter((x, i) => a.indexOf(x) === i);

function opts(correct: string, pool: string[], n = 4): string[] {
  return shuffle([correct, ...shuffle(uniq(pool.filter(x => x && x !== correct))).slice(0, n - 1)]);
}

/** Şekil olarak karıştırılan harf grupları */
const CONFUSABLE: string[][] = [
  ["ب", "ت", "ث", "ن", "ي"], ["ج", "ح", "خ"], ["د", "ذ"], ["ر", "ز"], ["س", "ش"], ["ص", "ض"],
  ["ط", "ظ"], ["ع", "غ"], ["ف", "ق"], ["ك", "ل"], ["ه", "ة"], ["س", "ث", "ص"], ["ح", "ه"], ["ك", "ق"], ["ز", "ذ", "ظ"], ["ء", "ع"],
];
function confusablesOf(ch: string): string[] {
  return uniq(CONFUSABLE.filter(g => g.includes(ch)).flat().filter(c => c !== ch && letterByChar[c]));
}

export function letterLabel(l: Letter) { return `${l.name} (${l.sound})`; }

function firstLetterBare(ar: string): string {
  const s = ar.replace(/[ً-ٰٟۡ]/g, "").replace(/^ٱ/, "ا");
  const c = s[0];
  return "أإآا".includes(c) ? "ا" : c;
}

export function lessonDrills(lesson: ReadingLesson): Drill[] {
  const out: Drill[] = [];
  const stepId = `r:${lesson.id}`;
  if (lesson.kind === "letters" && lesson.letters) {
    const all = READING.letters;
    for (const ch of lesson.letters) {
      const L = letterByChar[ch];
      const conf = confusablesOf(ch);
      const namePool = [...conf.map(c => letterLabel(letterByChar[c])), ...shuffle(all).map(letterLabel)];
      out.push({
        id: `${lesson.id}:name:${ch}`, prompt: "Bu harfin adı ne?", ar: ch,
        options: opts(letterLabel(L), namePool), answer: letterLabel(L),
        explain: `${ch} = ${L.name}. ${L.tip}`, mistakeKey: `letter:${ch}`, mistakeLabel: `${ch} harfi (${L.name})`,
      });
      const charPool = [...conf, ...shuffle(all).map(x => x.char)];
      out.push({
        id: `${lesson.id}:char:${ch}`, prompt: `Hangisi "${L.name}" harfi?`,
        options: opts(ch, charPool), optionsArabic: true, answer: ch,
        explain: `${L.name}: ${ch}. ${L.tip}`, mistakeKey: `letter:${ch}`, mistakeLabel: `${ch} harfi (${L.name})`,
      });
      if (L.example.audio && firstLetterBare(L.example.ar) === ch) {
        out.push({
          id: `${lesson.id}:listen:${ch}`, prompt: "Dinle: bu kelime hangi harfle başlıyor?",
          audioWord: L.example.audio, options: opts(ch, charPool), optionsArabic: true, answer: ch,
          explain: `${L.example.ar} (${L.example.tr}) kelimesi ${ch} (${L.name}) ile başlar.`,
          mistakeKey: `letter:${ch}`, mistakeLabel: `${ch} harfi (${L.name})`,
        });
      }
    }
    return shuffle(out);
  }
  if (lesson.kind === "rules" && lesson.items && lesson.rules) {
    for (const it of lesson.items) {
      if (!it.rule) continue;
      out.push({
        id: `${lesson.id}:${it.ar}`, prompt: "Bu örnekte hangi kural var?", ar: it.ar, audioWord: it.audio ?? null, audioAyah: it.audio ? undefined : it.ayah,
        options: shuffle(lesson.rules.slice(0, 4)), answer: it.rule,
        explain: `${it.ar} → ${it.tr}${it.note ? ` (${it.note})` : ""}: ${it.rule}.`,
        mistakeKey: `rule:${it.rule}`, mistakeLabel: `Tecvid: ${it.rule}`,
      });
    }
    return shuffle(out);
  }
  if ((lesson.kind === "syllables" || lesson.kind === "forms") && lesson.items) {
    const pool = lesson.items.map(i => i.tr);
    for (const it of lesson.items) {
      out.push({
        id: `${lesson.id}:${it.ar}`, prompt: "Nasıl okunur?", ar: it.ar, audioWord: it.audio ?? null,
        options: opts(it.tr, pool), answer: it.tr,
        explain: `${it.ar} = ${it.tr}${it.note ? ` — ${it.note}` : ""}.`,
        mistakeKey: `lesson:${lesson.id}`, mistakeLabel: lesson.title.replace(/^Tecvid: /, "Tecvid — "),
      });
    }
    if (lesson.kind === "forms") {
      out.push({
        id: `${lesson.id}:noconnect`, prompt: "Hangi harf kendinden sonraki harfe BAĞLANMAZ?",
        options: shuffle(["ر", "ب", "م", "ل"]), optionsArabic: true, answer: "ر",
        explain: "ا د ذ ر ز و harfleri kendinden sonrakine bağlanmaz.", mistakeKey: `lesson:${lesson.id}`, mistakeLabel: "Bitişik yazım",
      });
    }
    return shuffle(out).slice(0, 10);
  }
  if (lesson.kind === "surah" && lesson.verses) {
    for (const v of lesson.verses) {
      if (v.words.length < 2) continue;
      const wi = Math.floor(Math.random() * v.words.length);
      const correct = v.words[wi];
      const pool = lesson.verses.flatMap(x => x.words);
      out.push({
        id: `${lesson.id}:${v.n}:${wi}`, prompt: `${v.n}. ayet — dinle: hangi kelimeyi duydun?`,
        audioWord: [lesson.surah!, v.n, wi + 1], options: opts(correct, pool), optionsArabic: true, answer: correct,
        explain: `Duyduğun kelime: ${correct}`, mistakeKey: `ayah:${lesson.surah}:${v.n}`, mistakeLabel: `${lesson.title.replace("Okuma pratiği: ", "")} ${v.n}. ayet`,
      });
    }
    return out;
  }
  return out;
}

export function wordDrills(ws: Word[], allWords: Word[], stepId: string): Drill[] {
  const out: Drill[] = [];
  const meanPool = allWords.map(w => w.turkish_meaning);
  const arPool = allWords.map(w => w.arabic);
  for (const w of ws) {
    out.push({
      id: `${stepId}:m:${w.id}`, prompt: "Anlamı ne?", ar: w.arabic,
      options: opts(w.turkish_meaning, meanPool), answer: w.turkish_meaning,
      explain: `${w.arabic} (${w.transliteration}) = ${w.turkish_meaning}. ${w.memory_hint}`,
      mistakeKey: `word:${w.id}`, mistakeLabel: `${w.arabic} — ${w.turkish_meaning}`, wordId: w.id,
    });
  }
  for (const w of shuffle(ws).slice(0, Math.ceil(ws.length / 2))) {
    out.push({
      id: `${stepId}:r:${w.id}`, prompt: `"${w.turkish_meaning}" Arapçası hangisi?`,
      options: opts(w.arabic, arPool), optionsArabic: true, answer: w.arabic,
      explain: `${w.turkish_meaning} = ${w.arabic} (${w.transliteration}).`,
      mistakeKey: `word:${w.id}`, mistakeLabel: `${w.arabic} — ${w.turkish_meaning}`, wordId: w.id,
    });
  }
  return shuffle(out);
}

export function grammarDrills(g: GrammarTopic, all: GrammarTopic[]): Drill[] {
  const others = all.filter(x => x.id !== g.id);
  return [
    {
      id: `g:${g.id}:ex`, prompt: "Bu örneğin anlamı hangisi?", ar: g.example_arabic,
      options: opts(g.example_turkish, others.map(o => o.example_turkish)), answer: g.example_turkish,
      explain: g.memory_hint, mistakeKey: `grammar:${g.id}`, mistakeLabel: `Gramer: ${g.title}`,
    },
    {
      id: `g:${g.id}:topic`, prompt: "Bu örnek hangi konuyu gösteriyor?", ar: g.example_arabic,
      options: opts(g.title, others.map(o => o.title)), answer: g.title,
      explain: `${g.title}: ${g.description.slice(0, 160)}${g.description.length > 160 ? "…" : ""}`,
      mistakeKey: `grammar:${g.id}`, mistakeLabel: `Gramer: ${g.title}`,
    },
  ];
}

export function sentenceDrills(s: SentenceAnalysis, all: SentenceAnalysis[]): Drill[] {
  const out: Drill[] = [];
  const meanPool = all.flatMap(x => x.tokens.map(t => t.meaning));
  for (const t of shuffle(s.tokens).slice(0, Math.min(4, s.tokens.length))) {
    out.push({
      id: `s:${s.id}:${t.arabic}`, prompt: "Bu kelimenin cümledeki anlamı?", ar: t.arabic,
      options: opts(t.meaning, meanPool), answer: t.meaning,
      explain: `${t.arabic} = ${t.meaning} (${t.role})${t.note ? `. ${t.note}` : ""}`,
      mistakeKey: `sentence:${s.id}`, mistakeLabel: `Ayet: ${s.title}`,
    });
  }
  out.push({
    id: `s:${s.id}:all`, prompt: "Ayetin anlamı hangisi?", ar: s.arabic,
    options: opts(s.turkish, all.filter(x => x.id !== s.id).map(x => x.turkish)), answer: s.turkish,
    explain: s.explanation, mistakeKey: `sentence:${s.id}`, mistakeLabel: `Ayet: ${s.title}`,
  });
  return out;
}

/** Eksik listesinden hedefli alıştırma üretir */
export function drillsForMistakes(keys: string[], words: Word[], grammar: GrammarTopic[], sentences: SentenceAnalysis[]): Drill[] {
  const out: Drill[] = [];
  for (const k of keys) {
    const [type, a, b] = k.split(":");
    if (type === "letter") {
      const lesson = READING.lessons.find(l => l.kind === "letters" && l.letters?.includes(a));
      if (lesson) out.push(...lessonDrills(lesson).filter(d => d.mistakeKey === k));
    } else if (type === "rule") {
      const lesson = READING.lessons.find(l => l.kind === "rules" && l.rules?.includes(a));
      if (lesson) out.push(...lessonDrills(lesson).filter(d => d.mistakeKey === k));
    } else if (type === "lesson" && lessonById[a]) {
      out.push(...lessonDrills(lessonById[a]).slice(0, 4));
    } else if (type === "ayah") {
      const lesson = lessonById[`P${a}`];
      if (lesson) out.push(...lessonDrills(lesson).filter(d => d.mistakeKey === k));
    } else if (type === "word") {
      const w = words.find(x => x.id === Number(a));
      if (w) out.push(...wordDrills([w], words, "mistake").slice(0, 2));
    } else if (type === "grammar") {
      const g = grammar.find(x => x.id === Number(a));
      if (g) out.push(...grammarDrills(g, grammar));
    } else if (type === "sentence") {
      const s = sentences.find(x => x.id === Number(a));
      if (s) out.push(...sentenceDrills(s, sentences).slice(0, 3));
    }
    void b;
  }
  return shuffle(out).slice(0, 12);
}

// ─── Seviye testi ───────────────────────────────────────────────────────────

export function placementReadingQs(): PlacementQ[] { return READING.placement; }

export function placementWordSample(words: Word[], n = 10): Word[] {
  const ordered = wordLearningOrder(words);
  const step = Math.max(1, Math.floor(ordered.length / n));
  return Array.from({ length: n }, (_, i) => ordered[Math.min(ordered.length - 1, i * step)]);
}

/** Okuma sorularının sonucuna göre bilinen dersleri işaretler; başlangıç dersini döner. */
export function applyPlacement(state: TutorState, wrongLessons: string[]): { state: TutorState; startLesson: string | null } {
  const firstWrongIdx = wrongLessons.length
    ? Math.min(...wrongLessons.map(l => READING_ORDER.indexOf(l)).filter(i => i >= 0))
    : READING_ORDER.indexOf("P1");
  const done = { ...state.done };
  const now = new Date().toISOString();
  READING_ORDER.slice(0, firstWrongIdx).forEach(id => {
    if (!id.startsWith("P")) done[`r:${id}`] = { score: 1, at: now, viaPlacement: true };
  });
  return { state: { ...state, done, placementDone: true }, startLesson: READING_ORDER[firstWrongIdx] ?? null };
}

// ─── Hocanın sözleri ────────────────────────────────────────────────────────

export function coachGreeting(name: string | undefined, state: TutorState, path: Step[]): string {
  const hitap = name ? `${name}, ` : "";
  if (!state.placementDone) {
    return `Esselâmu aleyküm ${hitap}ben senin Kur'an hocanım. Önce seni tanıyayım: yaklaşık 5 dakikalık kısa bir seviye testi yapacağız. Bildiklerini atlayıp tam eksik olduğun yerden başlayacağız.`;
  }
  const ok = trackProgress(state, path, "okuma");
  const an = trackProgress(state, path, "anlama");
  const mistakes = sortedMistakes(state).filter(m => mistakeIsStudied(state, m.key));
  const hours = state.lastSessionAt ? (Date.now() - new Date(state.lastSessionAt).getTime()) / 3600000 : null;
  let s = hours !== null && hours > 48 ? `Tekrar hoş geldin ${hitap}seni özledim. ` : `Hoş geldin ${hitap}`;
  if (ok.pct < 100) {
    const next = nextSteps(state, path, "okuma", 1)[0];
    s += next ? `Okuma yolunda sıradaki dersin: "${next.title}". ` : "";
  } else s += "Okuma yolunu tamamladın, maşallah! ";
  if (!understandingUnlocked(state)) s += "Uzatma harflerini öğrenince anlama yolu da açılacak. ";
  else if (an.pct < 100) s += `Anlama yolunda %${an.pct} ilerledin. `;
  if (mistakes.length) s += `En çok zorlandığın konu: ${mistakes[0].label}. Bugün onu da tekrar edeceğiz.`;
  else s += "Bugünkü planın hazır.";
  return s;
}

export function coachAfterSession(score: number, wrongLabels: string[]): string {
  const pct = Math.round(score * 100);
  if (pct >= 90) return `Çok güzel! %${pct} doğru. Böyle düzenli devam edersen kısa sürede akıcı okursun.`;
  if (pct >= 70) return `İyi gidiyorsun, %${pct} doğru.${wrongLabels.length ? ` Şunlara biraz daha dikkat: ${uniq(wrongLabels).slice(0, 3).join(", ")}.` : ""} Bunları eksik listene ekledim, tekrar edeceğiz.`;
  return `%${pct} doğru. Moral bozmak yok; bu konu tekrar ister. ${uniq(wrongLabels).slice(0, 3).join(", ")} konularını eksik listene ekledim ve yarın yeniden önüne getireceğim.`;
}

export type { ReadingItem };

"use client";
import { useMemo, useState } from "react";
import type { GrammarTopic, ProgressMap, SentenceAnalysis, Word } from "@/data/types";
import type { ReadingItem, ReadingLesson } from "@/data/readingTypes";
import { READING } from "@/data/reading";
import {
  type Drill, type Minutes, type PlanItem, type Step, type TutorState,
  applyPlacement, buildDailyPlan, emptyTutor, buildPath, coachAfterSession, coachGreeting, completeStep,
  drillsForMistakes, finishSession, grammarDrills, lessonById, lessonDrills, letterByChar,
  nextSteps, placementReadingQs, placementWordSample, recordCorrect, recordMistake, sentenceDrills,
  sortedMistakes, mistakeIsStudied, trackProgress, understandingUnlocked, wordDrills, UNDERSTANDING_UNLOCK,
} from "@/lib/tutor";
import { ayahUrlByGlobal, playUrl, wbwUrl } from "@/lib/quranAudio";
import { speakArabic } from "@/lib/learning";
import { getCardImage } from "@/data/cardSlugs";
import { imgSrc } from "@/lib/asset";
import Icon, { type IconName } from "@/components/Icon";

type Props = {
  words: Word[];
  grammar: GrammarTopic[];
  sentences: SentenceAnalysis[];
  progress: ProgressMap;
  tutor: TutorState;
  setTutor: (fn: (t: TutorState) => TutorState) => void;
  onWordResult: (wordId: number, result: "known" | "wrong") => void;
  /** Bir ders başarıyla bittiğinde çağrılır (günlük seri / bugün çalışıldı için). */
  onLessonComplete?: () => void;
  userName?: string;
};

const cap = (x: string) => x.charAt(0).toLocaleUpperCase("tr-TR") + x.slice(1);
const lessonLabel = (id: string) => { const t = lessonById[id]?.title ?? id; return cap(t.replace(/^Tecvid: /, "Tecvid — ")); };

// ─── Küçük yardımcı bileşenler ──────────────────────────────────────────────

function AudioBtn({ word, ayah, text, label, big }: {
  word?: [number, number, number] | null; ayah?: number; text?: string; label?: string; big?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  if (!word && !ayah && !text) return null;
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(true);
    if (word) playUrl(wbwUrl(...word), () => setPlaying(false));
    else if (ayah) playUrl(ayahUrlByGlobal(ayah), () => setPlaying(false));
    else if (text) { speakArabic(text); setTimeout(() => setPlaying(false), 1200); }
  };
  return (
    <button type="button" onClick={onClick} title={word || ayah ? "Hafızdan dinle" : "Bilgisayar sesiyle dinle"}
      className={`inline-flex items-center gap-1.5 rounded-full border transition shrink-0 ${playing ? "border-amber-400 text-amber-300 bg-amber-500/10" : "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"} ${big ? "px-4 py-2 text-sm" : "px-2.5 py-1 text-xs"}`}>
      <span aria-hidden><Icon name={playing ? "ses" : "play"} size="0.95em" /></span>{label ?? (ayah && !word ? "Ayeti dinle" : "Dinle")}
    </button>
  );
}

function Bar({ pct, color = "bg-emerald-500" }: { pct: number; color?: string }) {
  return (
    <div className="h-2.5 rounded-full bg-stone-800 overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function CoachBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl text-amber-200"
        style={{ background: "linear-gradient(135deg,#065f46,#0f766e)", border: "2px solid rgba(52,211,153,.4)" }} aria-hidden><Icon name="mihrap" size="1.3em" /></div>
      <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-stone-200 text-sm sm:text-base leading-relaxed flex-1"
        style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.25)" }}>{children}</div>
    </div>
  );
}

function ItemRow({ it }: { it: ReadingItem }) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-black/20 border border-stone-700/40">
      <span className="arabic-text text-3xl text-white min-w-[4.5rem] text-right" dir="rtl">{it.ar}</span>
      <div className="flex-1 min-w-0">
        <div className="text-amber-300 font-semibold text-sm">{it.tr}</div>
        {(it.note || it.rule) && <div className="text-stone-400 text-xs mt-0.5">{[it.rule, it.note].filter(Boolean).join(" · ")}</div>}
      </div>
      {it.ref && <span className="text-[10px] text-stone-500 hidden sm:inline">{it.ref}</span>}
      <AudioBtn word={it.audio ?? undefined} ayah={it.audio ? undefined : it.ayah} text={!it.audio && !it.ayah ? it.ar : undefined}
        label={!it.audio && !it.ayah ? "Dinle*" : undefined} />
    </div>
  );
}

// ─── Ders anlatımı ──────────────────────────────────────────────────────────

function LessonIntro({ step, words, grammar, sentences, onStart }: {
  step: Step; words: Word[]; grammar: GrammarTopic[]; sentences: SentenceAnalysis[]; onStart: () => void;
}) {
  const startBtn = (
    <button onClick={onStart} className="duo-btn duo-btn-green w-full text-base mt-5" style={{ minHeight: "3rem" }}>
      Alıştırmaya geç →
    </button>
  );

  if (step.kind === "reading" && step.lessonId) {
    const l: ReadingLesson = lessonById[step.lessonId];
    const hasSynth = (l.items ?? []).some(i => !i.audio && !i.ayah);
    return (
      <div>
        <CoachBubble>{l.explain}</CoachBubble>
        {l.kind === "letters" && l.letters && (
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            {l.letters.map(ch => {
              const L = letterByChar[ch];
              return (
                <div key={ch} className="rounded-2xl p-4 bg-black/20 border border-stone-700/40">
                  <div className="flex items-center gap-4">
                    <span className="arabic-text text-6xl text-white w-16 text-center">{ch}</span>
                    <div className="flex-1">
                      <div className="text-white font-bold">{L.name} <span className="text-amber-300 font-normal text-sm">· {L.sound}</span></div>
                      <div className="text-stone-400 text-xs mt-1 leading-relaxed">{L.tip}</div>
                    </div>
                  </div>
                  {ch !== "ء" && (
                    <div className="mt-3 flex items-center gap-2 text-stone-400 text-xs">
                      <span>Şekilleri:</span>
                      <span className="arabic-text text-2xl text-stone-200" dir="rtl">
                        {L.connects ? `${ch}‍ · ‍${ch}‍ · ‍${ch}` : `${ch} · ‍${ch}`}
                      </span>
                      <span className="text-stone-500">(baş · orta · son)</span>
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-stone-400 text-xs">Kur&apos;an&apos;dan:</span>
                    <span className="arabic-text text-2xl text-emerald-200" dir="rtl">{L.example.ar}</span>
                    <span className="text-amber-300/80 text-xs">{L.example.tr}</span>
                    <span className="ml-auto"><AudioBtn word={L.example.audio ?? undefined} /></span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {l.items && (
          <div className="space-y-2 mt-5">
            {l.items.map((it, i) => <ItemRow key={i} it={it} />)}
            {hasSynth && <p className="text-stone-500 text-xs mt-1">* Tek hecelerde hafız kaydı olmadığı için bilgisayar sesi kullanılır; Kur&apos;an örneklerinde hafız sesi çalar.</p>}
          </div>
        )}
        {l.kind === "surah" && l.verses && (
          <div className="space-y-3 mt-5">
            {l.verses.map(v => (
              <div key={v.n} className="rounded-2xl p-4 bg-black/20 border border-stone-700/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-stone-500 text-xs">{v.n}. ayet</span>
                  <AudioBtn ayah={v.ayah} label="Ayeti dinle" />
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 justify-start" dir="rtl">
                  {v.words.map((w, wi) => (
                    <button key={wi} onClick={() => playUrl(wbwUrl(l.surah!, v.n, wi + 1))}
                      className="arabic-text text-3xl text-white hover:text-emerald-300 transition bg-transparent">{w}</button>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-stone-500 text-xs">İpucu: önce ayeti dinle, sonra kelimelere tek tek dokunarak kendin tekrar et.</p>
          </div>
        )}
        {startBtn}
      </div>
    );
  }

  if (step.kind === "words" && step.wordIds) {
    const ws = step.wordIds.map(id => words.find(w => w.id === id)).filter((w): w is Word => !!w);
    return (
      <div>
        <CoachBubble>Bu derste {ws.length} yeni kelime öğreneceksin. Her kartı incele, kelimeyi dinle ve hafıza ipucunu oku. Sonra küçük bir sınav yapacağız.</CoachBubble>
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          {ws.map(w => {
            const img = getCardImage(w.arabic);
            return (
              <div key={w.id} className="rounded-2xl overflow-hidden bg-black/20 border border-stone-700/40 flex">
                {img && <img src={imgSrc(img)} alt="" className="w-28 h-auto object-contain shrink-0" style={{ background: "#0b1511" }} loading="lazy" />}
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="arabic-text text-3xl text-white">{w.arabic}</span>
                    <AudioBtn text={w.arabic} />
                  </div>
                  <div className="text-amber-300 text-sm font-semibold">{w.transliteration} · <span className="text-white">{w.turkish_meaning}</span></div>
                  <div className="text-stone-400 text-xs mt-1 leading-relaxed"><Icon name="kandil" className="text-amber-300" /> {w.memory_hint}</div>
                  <div className="arabic-text text-lg text-emerald-200/90 mt-2" dir="rtl">{w.example_arabic}</div>
                  <div className="text-stone-400 text-xs">{w.example_turkish}{w.example_ref ? ` (${w.example_ref})` : ""}</div>
                </div>
              </div>
            );
          })}
        </div>
        {startBtn}
      </div>
    );
  }

  if (step.kind === "grammar") {
    const g = grammar.find(x => x.id === step.grammarId)!;
    return (
      <div>
        <CoachBubble><b className="text-white">{g.title}</b><br />{g.description}</CoachBubble>
        <div className="rounded-2xl p-5 mt-5 bg-black/20 border border-stone-700/40 text-center">
          <div className="arabic-text text-4xl text-white mb-2" dir="rtl">{g.example_arabic}</div>
          <div className="text-stone-300">{g.example_turkish}</div>
          <div className="mt-3"><AudioBtn text={g.example_arabic} /></div>
        </div>
        <div className="mt-3 text-amber-200/85 text-sm"><Icon name="kandil" /> {g.memory_hint}</div>
        {startBtn}
      </div>
    );
  }

  const s = sentences.find(x => x.id === step.sentenceId)!;
  return (
    <div>
      <CoachBubble>{s.explanation}</CoachBubble>
      <div className="rounded-2xl p-5 mt-5 bg-black/20 border border-stone-700/40 text-center">
        <div className="arabic-text text-4xl text-white mb-2" dir="rtl">{s.arabic}</div>
        <div className="text-stone-300">{s.turkish}</div>
        <div className="text-stone-500 text-xs mt-1">{s.pattern}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3" dir="rtl">
        {s.tokens.map((t, i) => (
          <div key={i} className="rounded-xl p-3 bg-black/20 border border-stone-700/40 text-center">
            <div className="arabic-text text-2xl text-white">{t.arabic}</div>
            <div className="text-amber-300 text-xs font-semibold" dir="ltr">{t.meaning}</div>
            <div className="text-stone-500 text-[11px]" dir="ltr">{t.role}</div>
          </div>
        ))}
      </div>
      {startBtn}
    </div>
  );
}

// ─── Alıştırma ekranı ───────────────────────────────────────────────────────

function DrillRunner({ drills, onFinish, onAnswer }: {
  drills: Drill[];
  onFinish: (correct: number, total: number, wrong: Drill[]) => void;
  onAnswer: (d: Drill, ok: boolean) => void;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState<Drill[]>([]);
  if (!drills.length) {
    return <button onClick={() => onFinish(0, 0, [])} className="duo-btn duo-btn-green w-full">Devam</button>;
  }
  const d = drills[i];
  const ok = picked === d.answer;
  const choose = (o: string) => {
    if (picked) return;
    setPicked(o);
    const good = o === d.answer;
    if (good) setCorrect(c => c + 1); else setWrong(w => [...w, d]);
    onAnswer(d, good);
    if (d.audioWord && good) playUrl(wbwUrl(...d.audioWord));
  };
  const next = () => {
    if (i + 1 >= drills.length) { onFinish(correct, drills.length, wrong); return; }
    setI(i + 1); setPicked(null);
  };
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1"><Bar pct={Math.round((i / drills.length) * 100)} /></div>
        <span className="text-stone-400 text-xs">{i + 1}/{drills.length}</span>
      </div>
      <div className="text-stone-300 font-semibold mb-3">{d.prompt}</div>
      {(d.ar || d.audioWord || d.audioAyah) && (
        <div className="rounded-2xl p-5 bg-black/25 border border-stone-700/40 text-center mb-4">
          {d.ar && <div className="arabic-text text-5xl sm:text-6xl text-white leading-relaxed" dir="rtl">{d.ar}</div>}
          {(d.audioWord || d.audioAyah) && (
            <div className="mt-3 flex justify-center">
              <AudioBtn word={d.audioWord ?? undefined} ayah={d.audioWord ? undefined : d.audioAyah} big label={d.ar ? "Dinle" : "▶ Dinle"} />
            </div>
          )}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-2.5">
        {d.options.map(o => {
          const state = !picked ? "idle" : o === d.answer ? "right" : o === picked ? "wrong" : "dim";
          return (
            <button key={o} onClick={() => choose(o)}
              className={`rounded-2xl px-4 py-3 border-2 text-left transition ${d.optionsArabic ? "arabic-text text-3xl text-center" : "text-sm sm:text-base"} ${
                state === "idle" ? "border-stone-700 bg-stone-900/50 hover:border-emerald-500/60 text-white" :
                state === "right" ? "border-emerald-400 bg-emerald-500/15 text-emerald-100" :
                state === "wrong" ? "border-red-400 bg-red-500/15 text-red-100" : "border-stone-800 bg-stone-900/30 text-stone-500"}`}>
              {o}
            </button>
          );
        })}
      </div>
      {picked && (
        <div className={`mt-4 rounded-2xl p-4 text-sm ${ok ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-100" : "bg-red-500/10 border border-red-500/30 text-red-100"}`}>
          <div className="font-bold mb-1">{ok ? "Doğru!" : `Doğrusu: ${d.answer}`}</div>
          {d.explain && <div className="opacity-90 leading-relaxed">{d.explain}</div>}
          <button onClick={next} className="duo-btn duo-btn-green w-full mt-3">{i + 1 >= drills.length ? "Bitir" : "Sonraki →"}</button>
        </div>
      )}
    </div>
  );
}

// ─── Oturum ─────────────────────────────────────────────────────────────────

type Unit =
  | { kind: "step"; step: Step; isReview?: boolean }
  | { kind: "drills"; title: string; drills: Drill[] };

function Session({ units, words, grammar, sentences, tutor, setTutor, onWordResult, onLessonComplete, onExit }: {
  units: Unit[]; words: Word[]; grammar: GrammarTopic[]; sentences: SentenceAnalysis[];
  tutor: TutorState; setTutor: Props["setTutor"]; onWordResult: Props["onWordResult"];
  onLessonComplete?: Props["onLessonComplete"]; onExit: () => void;
}) {
  const [ui, setUi] = useState(0);
  const [phase, setPhase] = useState<"intro" | "drills" | "result">(units[0]?.kind === "step" ? "intro" : "drills");
  const [totals, setTotals] = useState({ correct: 0, total: 0, wrong: [] as string[] });
  const [unitResult, setUnitResult] = useState<{ correct: number; total: number } | null>(null);
  const [finished, setFinished] = useState(false);
  const unit = units[ui];

  const drills = useMemo<Drill[]>(() => {
    if (!unit) return [];
    if (unit.kind === "drills") return unit.drills;
    const s = unit.step;
    if (s.kind === "reading" && s.lessonId) return lessonDrills(lessonById[s.lessonId]);
    if (s.kind === "words" && s.wordIds) return wordDrills(s.wordIds.map(id => words.find(w => w.id === id)!).filter(Boolean), words, s.id);
    if (s.kind === "grammar") return grammarDrills(grammar.find(g => g.id === s.grammarId)!, grammar);
    if (s.kind === "sentence") return sentenceDrills(sentences.find(x => x.id === s.sentenceId)!, sentences);
    return [];
  }, [unit, words, grammar, sentences]);

  const onAnswer = (d: Drill, ok: boolean) => {
    setTutor(t => ok ? recordCorrect(t, d.mistakeKey) : recordMistake(t, d.mistakeKey, d.mistakeLabel, unit?.kind === "step" ? unit.step.id : undefined));
    if (d.wordId) onWordResult(d.wordId, ok ? "known" : "wrong");
  };

  const onUnitDone = (correct: number, total: number, wrong: Drill[]) => {
    const score = total ? correct / total : 1;
    if (unit?.kind === "step" && score >= 0.6) {
      setTutor(t => completeStep(t, unit.step.id, score, unit.isReview));
      onLessonComplete?.();
    }
    setTotals(x => ({ correct: x.correct + correct, total: x.total + total, wrong: [...x.wrong, ...wrong.map(w => w.mistakeLabel)] }));
    setUnitResult({ correct, total });
    setPhase("result");
  };

  const nextUnit = () => {
    if (ui + 1 >= units.length) { setTutor(finishSession); setFinished(true); return; }
    setUi(ui + 1); setUnitResult(null);
    setPhase(units[ui + 1].kind === "step" ? "intro" : "drills");
  };

  if (finished || !unit) {
    const score = totals.total ? totals.correct / totals.total : 1;
    return (
      <div className="duo-card rounded-[1.75rem] p-6 sm:p-8">
        <div className="text-center text-5xl mb-3"><span className="text-amber-300"><Icon name={score >= 0.9 ? "yildiz8" : score >= 0.7 ? "hilal" : "filiz"} /></span></div>
        <h2 className="text-2xl font-bold text-white text-center mb-1">Bugünkü ders bitti</h2>
        <p className="text-stone-400 text-center mb-5">{totals.correct}/{totals.total} doğru</p>
        <CoachBubble>{coachAfterSession(score, totals.wrong)}</CoachBubble>
        <button onClick={onExit} className="duo-btn duo-btn-green w-full mt-6">Hocaya dön</button>
      </div>
    );
  }

  const title = unit.kind === "step" ? unit.step.title : unit.title;
  return (
    <div className="duo-card rounded-[1.75rem] p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="min-w-0">
          <div className="text-stone-500 text-xs">Bölüm {ui + 1}/{units.length}{unit.kind === "step" && unit.isReview ? " · tekrar" : ""}</div>
          <h2 className="text-lg sm:text-xl font-bold text-white truncate">{title}</h2>
        </div>
        <button onClick={onExit} className="text-stone-400 hover:text-white text-sm border border-stone-700 rounded-full px-3 py-1 shrink-0">Ara ver</button>
      </div>
      {phase === "intro" && unit.kind === "step" && (
        <LessonIntro step={unit.step} words={words} grammar={grammar} sentences={sentences} onStart={() => setPhase("drills")} />
      )}
      {phase === "drills" && <DrillRunner key={ui} drills={drills} onFinish={onUnitDone} onAnswer={onAnswer} />}
      {phase === "result" && unitResult && (
        <div className="text-center">
          <div className="text-4xl mb-2"><Icon name={unitResult.total === 0 || unitResult.correct / unitResult.total >= 0.6 ? "onayDaire" : "tekrarOk"} /></div>
          <div className="text-white font-bold text-lg">{unitResult.correct}/{unitResult.total} doğru</div>
          <p className="text-stone-400 text-sm mt-1 mb-5">
            {unitResult.total === 0 || unitResult.correct / unitResult.total >= 0.6
              ? (unit.kind === "step" ? "Bu ders tamamlandı ve tekrar takvimine eklendi." : "Eksiklerin üzerinden geçtik.")
              : "Bu dersi henüz geçmedin; yanlışlarını eksik listene ekledim, bir sonraki derste yeniden çalışacağız."}
          </p>
          <button onClick={nextUnit} className="duo-btn duo-btn-green w-full">{ui + 1 >= units.length ? "Dersi bitir" : "Sonraki bölüm →"}</button>
        </div>
      )}
      {(() => { void tutor; return null; })()}
    </div>
  );
}

// ─── Seviye testi ───────────────────────────────────────────────────────────

function Placement({ words, tutor, setTutor, onWordResult, onDone }: {
  words: Word[]; tutor: TutorState; setTutor: Props["setTutor"]; onWordResult: Props["onWordResult"]; onDone: () => void;
}) {
  const rq = placementReadingQs();
  const ws = useMemo(() => placementWordSample(words, 10), [words]);
  const drills: Drill[] = useMemo(() => {
    const meanPool = words.map(w => w.turkish_meaning);
    const r: Drill[] = rq.map(q => ({
      id: q.id, prompt: q.q, ar: q.ar, options: [...q.options].sort(() => Math.random() - 0.5), answer: q.answer,
      mistakeKey: `lesson:${q.lesson}`, mistakeLabel: lessonLabel(q.lesson),
    }));
    const w: Drill[] = ws.map(x => ({
      id: `pw:${x.id}`, prompt: "Bu kelimenin anlamını biliyor musun? Bilmiyorsan \"Bilmiyorum\"u seç.", ar: x.arabic,
      options: [...[x.turkish_meaning, ...meanPool.filter(m => m !== x.turkish_meaning).sort(() => Math.random() - 0.5).slice(0, 2)].sort(() => Math.random() - 0.5), "Bilmiyorum"],
      answer: x.turkish_meaning, mistakeKey: `word:${x.id}`, mistakeLabel: `${x.arabic} — ${x.turkish_meaning}`, wordId: x.id,
    }));
    return [...r, ...w];
  }, [rq, ws, words]);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<{ start: string | null; readingWrong: number; wordsRight: number } | null>(null);
  const wrongLessons = useMemo(() => new Set<string>(), []);
  const wordRight = useMemo(() => new Set<number>(), []);

  if (!started) {
    return (
      <div className="duo-card rounded-[1.75rem] p-6 sm:p-8">
        <CoachBubble>
          Seviye testi iki bölüm: önce {rq.length} okuma sorusu (harfler, harekeler, tecvid), sonra {ws.length} kelime sorusu.
          Bilmediğin soruyu tahmin etmeye çalışma; yanlış cevap seni geri götürmez, sadece doğru yerden başlamamızı sağlar.
        </CoachBubble>
        <button onClick={() => setStarted(true)} className="duo-btn duo-btn-green w-full mt-6 text-base" style={{ minHeight: "3rem" }}>Teste başla</button>
        <button onClick={() => { setTutor(t => ({ ...t, placementDone: true })); onDone(); }}
          className="w-full mt-3 text-stone-400 hover:text-white text-sm">Testi atla, en baştan (harflerden) başla</button>
      </div>
    );
  }
  if (result) {
    const startTitle = result.start ? lessonById[result.start]?.title : null;
    return (
      <div className="duo-card rounded-[1.75rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Seviye testi sonucu</h2>
        <CoachBubble>
          {result.readingWrong === 0
            ? "Okuma temellerin sağlam. Tecvid ve okuma pratiğiyle devam edeceğiz. "
            : `Okumada eksiklerini buldum. ${startTitle ? `"${startTitle}" dersinden başlıyoruz; öncesini zaten biliyorsun. ` : ""}`}
          Kelimelerden {result.wordsRight}/{ws.length} tanesini bildin.
          {" "}Günde {tutor.minutes} dakika ayırırsan her gün okuma ve anlama yolunda birer adım atacağız.
        </CoachBubble>
        <button onClick={onDone} className="duo-btn duo-btn-green w-full mt-6">Planımı göster</button>
      </div>
    );
  }
  return (
    <div className="duo-card rounded-[1.75rem] p-5 sm:p-7">
      <h2 className="text-lg font-bold text-white mb-4">Seviye testi</h2>
      <DrillRunner drills={drills}
        onAnswer={(d, ok) => {
          if (d.wordId) { if (ok) { wordRight.add(d.wordId); onWordResult(d.wordId, "known"); } }
          else if (!ok) { wrongLessons.add(d.mistakeKey.replace("lesson:", "")); setTutor(t => recordMistake(t, d.mistakeKey, d.mistakeLabel)); }
        }}
        onFinish={() => {
          const wl = [...wrongLessons];
          const start = applyPlacement(emptyTutor(), wl).startLesson;
          setTutor(t => applyPlacement(t, wl).state);
          setResult({ start, readingWrong: wl.length, wordsRight: wordRight.size });
        }} />
    </div>
  );
}

// ─── Ana panel ──────────────────────────────────────────────────────────────

export default function TutorPanel(props: Props) {
  const { words, grammar, sentences, progress, tutor, setTutor, onWordResult, onLessonComplete, userName } = props;
  const path = useMemo(() => buildPath(words, grammar, sentences), [words, grammar, sentences]);
  const [view, setView] = useState<"home" | "placement" | "session">("home");
  const [units, setUnits] = useState<Unit[]>([]);
  const [showMap, setShowMap] = useState(false);

  const plan = useMemo(() => buildDailyPlan(tutor, path, progress), [tutor, path, progress]);
  const ok = trackProgress(tutor, path, "okuma");
  const an = trackProgress(tutor, path, "anlama");
  const allMistakes = sortedMistakes(tutor);
  const mistakes = allMistakes.filter(m => mistakeIsStudied(tutor, m.key));
  const upcoming = allMistakes.length - mistakes.length;

  const planToUnits = (p: PlanItem[]): Unit[] => p.map((it): Unit => {
    if (it.type === "step") return { kind: "step", step: it.step, isReview: it.isReview };
    if (it.type === "words-review") {
      const ws = it.wordIds.map(id => words.find(w => w.id === id)).filter((w): w is Word => !!w);
      return { kind: "drills", title: "Kelime tekrarı", drills: wordDrills(ws, words, "review").slice(0, ws.length + 2) };
    }
    return { kind: "drills", title: "Eksiklerin üzerinden geçelim", drills: drillsForMistakes(it.keys, words, grammar, sentences) };
  }).filter(u => u.kind === "step" || u.drills.length > 0);

  const start = (u: Unit[]) => { if (!u.length) return; setUnits(u); setView("session"); };

  if (view === "placement") {
    return <Placement words={words} tutor={tutor} setTutor={setTutor} onWordResult={onWordResult} onDone={() => setView("home")} />;
  }
  if (view === "session") {
    return <Session units={units} words={words} grammar={grammar} sentences={sentences} tutor={tutor} setTutor={setTutor}
      onWordResult={onWordResult} onLessonComplete={onLessonComplete} onExit={() => setView("home")} />;
  }

  const planLabel = (it: PlanItem) =>
    it.type === "step" ? `${it.isReview ? "Tekrar: " : ""}${it.step.title}` :
    it.type === "words-review" ? `Kelime tekrarı (${it.wordIds.length} kelime)` : "Eksiklerin üzerinden geçiş";
  const planIcon = (it: PlanItem): IconName =>
    it.type === "step" ? (it.step.track === "okuma" ? "kitap" : "kandil") : it.type === "words-review" ? "tekrarOk" : "yildiz8";

  return (
    <div className="space-y-5">
      <div className="duo-card rounded-[1.75rem] p-5 sm:p-7">
        <CoachBubble>{coachGreeting(userName, tutor, path)}</CoachBubble>

        {!tutor.placementDone ? (
          <button onClick={() => setView("placement")} className="duo-btn duo-btn-green w-full mt-6 text-base" style={{ minHeight: "3rem" }}>
            Seviye testine başla
          </button>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-stone-400 text-sm mr-1">Bugün ne kadar vaktin var?</span>
              {([10, 25, 60] as Minutes[]).map(m => (
                <button key={m} onClick={() => setTutor(t => ({ ...t, minutes: m }))}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${tutor.minutes === m ? "bg-emerald-500 border-emerald-400 text-white" : "border-stone-700 text-stone-300 hover:border-emerald-500/50"}`}>
                  {m === 60 ? "1 saat" : `${m} dk`}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl p-4 bg-black/20 border border-stone-700/40">
              <div className="text-white font-bold mb-2">Bugünkü planın</div>
              {plan.length === 0 ? (
                <div className="text-stone-400 text-sm">Tebrikler, bütün yolu tamamladın! Tekrarlarla bilgini taze tut.</div>
              ) : (
                <ol className="space-y-1.5">
                  {plan.map((it, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-stone-200">
                      <span className="w-6 text-center" aria-hidden><Icon name={planIcon(it)} /></span>{planLabel(it)}
                    </li>
                  ))}
                </ol>
              )}
              {plan.length > 0 && (
                <button onClick={() => start(planToUnits(plan))} className="duo-btn duo-btn-green w-full mt-4 text-base" style={{ minHeight: "3rem" }}>
                  Bugünkü derse başla
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {tutor.placementDone && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="duo-card rounded-[1.5rem] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-bold"><Icon name="kitap" /> Okuma yolu</span>
              <span className="text-emerald-300 text-sm font-bold">%{ok.pct}</span>
            </div>
            <Bar pct={ok.pct} />
            <div className="text-stone-400 text-xs mt-2">{ok.done}/{ok.total} ders · harfler → harekeler → tecvid → sure pratiği</div>
          </div>
          <div className="duo-card rounded-[1.5rem] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-bold"><Icon name="kandil" /> Anlama yolu</span>
              <span className="text-amber-300 text-sm font-bold">{understandingUnlocked(tutor) ? `%${an.pct}` : <Icon name="kilit" />}</span>
            </div>
            <Bar pct={an.pct} color="bg-amber-500" />
            <div className="text-stone-400 text-xs mt-2">
              {understandingUnlocked(tutor) ? `${an.done}/${an.total} adım · kelime + gramer + ayet` : `"${lessonById[UNDERSTANDING_UNLOCK].title}" dersinden sonra açılır`}
            </div>
          </div>
        </div>
      )}

      {tutor.placementDone && (
        <div className="duo-card rounded-[1.5rem] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold"><Icon name="yildiz8" /> Eksiklerin</span>
            {mistakes.length > 0 && (
              <button onClick={() => start([{ kind: "drills", title: "Eksiklerin üzerinden geçelim", drills: drillsForMistakes(mistakes.slice(0, 6).map(m => m.key), words, grammar, sentences) }])}
                className="text-xs text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-1 hover:bg-emerald-500/10">Hepsini çalış</button>
            )}
          </div>
          {mistakes.length === 0 ? (
            <div className="text-stone-400 text-sm">Henüz tekrar edilecek eksik yok. Yanlış yaptığın her harf, kural ve kelime burada listelenir; doğru yaptıkça listeden düşer.</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {mistakes.slice(0, 12).map(m => (
                <button key={m.key} onClick={() => start([{ kind: "drills", title: m.label, drills: drillsForMistakes([m.key, m.key], words, grammar, sentences) }])}
                  className="text-sm rounded-full px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-200 hover:bg-red-500/20 transition">
                  {m.label} <span className="text-red-300/70">×{m.count}</span>
                </button>
              ))}
            </div>
          )}
          {upcoming > 0 && (
            <div className="text-stone-500 text-xs mt-3">Seviye testinde zorlandığın {upcoming} konu daha var; o derslere sıra geldiğinde önce öğreteceğim, sonra burada tekrar edeceğiz.</div>
          )}
        </div>
      )}

      {tutor.placementDone && (
        <div className="duo-card rounded-[1.5rem] p-5">
          <button onClick={() => setShowMap(v => !v)} className="w-full flex items-center justify-between text-white font-bold">
            <span><Icon name="pusula" /> Yol haritası</span><span className="text-stone-400 text-sm">{showMap ? "Gizle ▲" : "Göster ▼"}</span>
          </button>
          {showMap && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {(["okuma", "anlama"] as const).map(track => {
                const nxt = nextSteps(tutor, path, track, 1)[0];
                return (
                  <div key={track}>
                    <div className="text-stone-400 text-xs uppercase tracking-wide mb-2">{track === "okuma" ? "Okuma yolu" : "Anlama yolu"}</div>
                    <ol className="space-y-1 max-h-96 overflow-y-auto pr-1">
                      {path.filter(s => s.track === track).map(s => {
                        const done = !!tutor.done[s.id];
                        const isNext = nxt?.id === s.id;
                        const locked = !done && !isNext;
                        return (
                          <li key={s.id}>
                            <button disabled={locked} onClick={() => start([{ kind: "step", step: s, isReview: done }])}
                              className={`w-full text-left flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${isNext ? "bg-emerald-500/15 border border-emerald-500/40 text-white" : done ? "text-stone-300 hover:bg-white/5" : "text-stone-600 cursor-not-allowed"}`}>
                              <span className="w-5 text-center">{done ? <Icon name="onayDaire" /> : isNext ? <Icon name="play" /> : <Icon name="kilit" />}</span>
                              <span className="truncate">{s.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <p className="text-stone-600 text-xs text-center">Hoca sesleri: kelimeler Quran.com kelime kelime tilavetinden, ayetler Mahmud Halil el-Husarî tilavetinden.</p>
      {READING.letters.length === 0 && null}
    </div>
  );
}

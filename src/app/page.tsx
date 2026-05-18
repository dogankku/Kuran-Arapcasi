"use client";

import { useEffect, useMemo, useState } from "react";
import { memoryImagesByArabic } from "@/data/memoryImages";
import { sentenceAnalyses } from "@/data/sentences";
import type { Level, ProgressMap, QuizMode, Word } from "@/data/types";
import { words } from "@/data/words";
import {
  STORAGE_KEY,
  buildQuizOptions,
  emptyProgress,
  getLevelDescription,
  getLevelIcon,
  getLevelShort,
  getLevelTitle,
  getQuizPrompt,
  getReviewWords,
  speakArabic,
  updateProgress
} from "@/lib/learning";

type Panel =
  | "daily"
  | "lesson"
  | "quiz"
  | "analysis"
  | "review"
  | "visuals";

export default function DashboardPage() {
  const [level, setLevel] = useState<Level>(1);
  const [panel, setPanel] = useState<Panel>("daily");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [quizMode, setQuizMode] = useState<QuizMode>("meaning");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const levelWords = useMemo(
    () => words.filter((word) => word.level === level),
    [level]
  );

  const activeWord = levelWords[index] || levelWords[0] || words[0];
  const activeImage = memoryImagesByArabic[activeWord.arabic] || null;

  const visualWords = useMemo(
    () => words.filter((word) => memoryImagesByArabic[word.arabic]),
    []
  );

  const reviewWords = useMemo(
    () => getReviewWords(words, progress),
    [progress]
  );

  const sentence =
    sentenceAnalyses.find((item) => item.level === level) ||
    sentenceAnalyses[0];

  const quizPrompt = useMemo(
    () => getQuizPrompt(activeWord, quizMode),
    [activeWord, quizMode]
  );

  const quizOptions = useMemo(
    () => buildQuizOptions(words, activeWord, quizMode),
    [activeWord, quizMode]
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        setProgress({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const learned = Object.values(progress).filter((item) => item.known).length;
  const activeProgress = progress[activeWord.id] || emptyProgress();

  function save(word: Word, type: "known" | "hard" | "wrong") {
    setProgress((current) => ({
      ...current,
      [word.id]: updateProgress(current[word.id] || emptyProgress(), type)
    }));
  }

  function next() {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setIndex((current) =>
      current + 1 >= levelWords.length ? 0 : current + 1
    );
  }

  function openWord(word: Word) {
    const list = words.filter((item) => item.level === word.level);
    const foundIndex = list.findIndex((item) => item.id === word.id);

    setLevel(word.level);
    setIndex(Math.max(0, foundIndex));
    setShowAnswer(true);
    setSelectedAnswer(null);
    setPanel("lesson");
  }

  function answerQuiz(answer: string) {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    save(activeWord, answer === quizPrompt.answer ? "known" : "wrong");
  }

  function resetProgress() {
    const ok = confirm("Tüm ilerleme sıfırlansın mı?");
    if (!ok) return;

    localStorage.removeItem(STORAGE_KEY);
    setProgress({});
  }

  return (
    <main className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="glass-card rounded-[2rem] p-6 mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 rounded-full px-4 py-2 text-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Temiz Sürüm · Supabase Yok
          </div>

          <h1 className="text-3xl md:text-5xl font-bold">
            Ayet Hafızası
          </h1>

          <p className="text-stone-300 mt-3">
            Görsel hafıza, kelime kartı, test ve akıllı tekrar.
          </p>

          <div className="grid md:grid-cols-3 gap-3 mt-6">
            <MiniMetric label="Toplam kelime" value={words.length} />
            <MiniMetric label="Görsel kart" value={visualWords.length} />
            <MiniMetric label="Öğrenilen" value={learned} />
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((item) => {
            const currentLevel = item as Level;
            const count = words.filter(
              (word) => word.level === currentLevel
            ).length;

            return (
              <button
                key={currentLevel}
                onClick={() => {
                  setLevel(currentLevel);
                  setIndex(0);
                  setPanel("daily");
                }}
                className={`text-left rounded-[1.5rem] p-5 border ${
                  level === currentLevel
                    ? "bg-emerald-700/80 border-emerald-300"
                    : "glass-card"
                }`}
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <div className="text-sm text-stone-300">
                      {getLevelShort(currentLevel)}
                    </div>
                    <div className="font-bold text-xl">
                      {getLevelTitle(currentLevel)}
                    </div>
                  </div>

                  <div className="text-3xl text-amber-200">
                    {getLevelIcon(currentLevel)}
                  </div>
                </div>

                <p className="text-stone-300 text-sm mt-3">
                  {getLevelDescription(currentLevel)}
                </p>

                <div className="text-xs text-emerald-200 mt-4">
                  {count} kelime
                </div>
              </button>
            );
          })}
        </section>

        <nav className="glass-card rounded-[1.4rem] p-2 mb-6 flex gap-2 overflow-x-auto no-scrollbar">
          <Tab
            active={panel === "daily"}
            onClick={() => setPanel("daily")}
            label="Günlük Ders"
          />
          <Tab
            active={panel === "lesson"}
            onClick={() => setPanel("lesson")}
            label="Kelime Dersi"
          />
          <Tab
            active={panel === "quiz"}
            onClick={() => setPanel("quiz")}
            label="Test"
          />
          <Tab
            active={panel === "analysis"}
            onClick={() => setPanel("analysis")}
            label="Ayet Çözümleme"
          />
          <Tab
            active={panel === "review"}
            onClick={() => setPanel("review")}
            label={`Tekrar ${reviewWords.length}`}
          />
          <Tab
            active={panel === "visuals"}
            onClick={() => setPanel("visuals")}
            label={`Görsel Hafıza ${visualWords.length}`}
          />
        </nav>

        {panel === "daily" && (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levelWords.slice(0, 9).map((word) => (
              <WordCard
                key={word.id}
                word={word}
                onClick={() => openWord(word)}
              />
            ))}
          </section>
        )}

        {panel === "lesson" && (
          <section className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">
            <div className="glass-card rounded-[2rem] p-6">
              <div className="soft-card rounded-[1.7rem] p-6 text-center">
                <button
                  onClick={() => speakArabic(activeWord.arabic)}
                  className="arabic-text arabic-clickable text-7xl md:text-8xl bg-transparent w-full"
                >
                  {activeWord.arabic}
                </button>

                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={activeWord.turkish_meaning}
                    className="w-full max-w-[300px] h-[220px] object-contain mx-auto mt-5 rounded-3xl border border-emerald-400/20 bg-black/30 p-2"
                  />
                ) : (
                  <div className="my-5 rounded-3xl border border-dashed border-stone-700 bg-black/20 p-6 text-stone-500">
                    Bu kelime için görsel yok.
                  </div>
                )}

                <div className="text-stone-400 mt-4">
                  Okunuş: {activeWord.transliteration}
                </div>

                <div className="mt-3 inline-flex bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 px-4 py-2 rounded-full text-sm">
                  {activeWord.part_of_speech}
                </div>

                <div className="text-xs text-stone-500 mt-3">
                  Durum:{" "}
                  {activeProgress.known
                    ? "Öğrenildi"
                    : activeProgress.hard
                      ? "Tekrar gerekli"
                      : "Yeni"}
                </div>
              </div>

              {showAnswer && (
                <div className="mt-5 grid gap-4">
                  <Info title="Anlam" value={activeWord.turkish_meaning} />
                  <Info title="Hafıza Tekniği" value={activeWord.memory_hint} />

                  <div className="soft-card rounded-2xl p-5">
                    <div className="text-stone-400 text-sm">Ayet Örneği</div>

                    <button
                      onClick={() => speakArabic(activeWord.example_arabic)}
                      className="arabic-text arabic-clickable text-3xl my-3 bg-transparent w-full text-right"
                    >
                      {activeWord.example_arabic}
                    </button>

                    <div>{activeWord.example_turkish}</div>
                  </div>

                  <Info
                    title="Cümlede Görevi"
                    value={activeWord.grammar_note}
                  />
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-3 mt-5">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex-1 bg-emerald-600 rounded-2xl py-3 font-semibold"
                >
                  {showAnswer ? "Cevabı Gizle" : "Cevabı Göster"}
                </button>

                <button
                  onClick={next}
                  className="flex-1 bg-stone-800 border border-stone-700 rounded-2xl py-3 font-semibold"
                >
                  Sonraki
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-4">
                <button
                  onClick={() => {
                    save(activeWord, "known");
                    next();
                  }}
                  className="bg-green-700 rounded-2xl py-3 font-semibold"
                >
                  Bildim
                </button>

                <button
                  onClick={() => {
                    save(activeWord, "hard");
                    next();
                  }}
                  className="bg-yellow-700 rounded-2xl py-3 font-semibold"
                >
                  Zorlandım
                </button>

                <button
                  onClick={() => {
                    save(activeWord, "wrong");
                    next();
                  }}
                  className="bg-red-700 rounded-2xl py-3 font-semibold"
                >
                  Bilemedim
                </button>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-bold">Kademe Notu</h2>
              <p className="text-stone-300 mt-3">
                {getLevelDescription(level)}
              </p>
            </div>
          </section>
        )}

        {panel === "quiz" && (
          <section className="glass-card rounded-[2rem] p-6">
            <div className="flex flex-wrap gap-2 mb-5">
              {(["meaning", "reverse", "role", "root"] as QuizMode[]).map(
                (mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setQuizMode(mode);
                      setSelectedAnswer(null);
                    }}
                    className={`rounded-xl px-3 py-2 text-sm ${
                      quizMode === mode ? "bg-emerald-600" : "bg-stone-800"
                    }`}
                  >
                    {mode}
                  </button>
                )
              )}
            </div>

            <div className="soft-card rounded-[1.7rem] p-6 text-center">
              {activeImage && (
                <img
                  src={activeImage}
                  alt=""
                  className="w-full max-w-[240px] h-[170px] object-contain mx-auto mb-5 rounded-3xl border border-emerald-400/20 bg-black/30 p-2"
                />
              )}

              <button
                onClick={() =>
                  quizPrompt.questionIsArabic &&
                  speakArabic(quizPrompt.question)
                }
                className={`${
                  quizPrompt.questionIsArabic
                    ? "arabic-text text-7xl"
                    : "text-3xl font-bold"
                } bg-transparent w-full mb-6`}
              >
                {quizPrompt.question}
              </button>

              <div className="grid md:grid-cols-2 gap-3">
                {quizOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => answerQuiz(option)}
                    className={`rounded-2xl p-5 text-left border ${
                      selectedAnswer
                        ? option === quizPrompt.answer
                          ? "bg-green-800 border-green-400"
                          : selectedAnswer === option
                            ? "bg-red-800 border-red-400"
                            : "bg-stone-950/60 border-stone-700 opacity-50"
                        : "bg-stone-950/70 border-stone-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selectedAnswer && (
                <button
                  onClick={next}
                  className="mt-5 bg-emerald-600 rounded-xl px-5 py-3 font-semibold"
                >
                  Sonraki Soru
                </button>
              )}
            </div>
          </section>
        )}

        {panel === "analysis" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold">Ayet / Cümle Çözümleme</h2>

            <div className="soft-card rounded-[1.7rem] p-6 mt-5">
              <button
                onClick={() => speakArabic(sentence.arabic)}
                className="arabic-text arabic-clickable text-4xl md:text-5xl mb-4 bg-transparent w-full text-right"
              >
                {sentence.arabic}
              </button>

              <div>{sentence.turkish}</div>

              <div className="bg-black/25 border border-stone-700 rounded-2xl p-5 my-5">
                <div className="text-stone-400 text-sm">Kalıp</div>
                <div className="text-lg font-semibold">
                  {sentence.pattern}
                </div>
                <p className="text-stone-300 mt-3">{sentence.explanation}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {sentence.tokens.map((token, tokenIndex) => (
                  <div
                    key={tokenIndex}
                    className="rounded-2xl border border-stone-700 p-5 bg-black/20"
                  >
                    <button
                      onClick={() => speakArabic(token.arabic)}
                      className="arabic-text text-4xl bg-transparent w-full text-right"
                    >
                      {token.arabic}
                    </button>
                    <div className="text-emerald-300 mt-3">
                      {token.meaning}
                    </div>
                    <div className="text-stone-400 text-sm">
                      {token.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {panel === "review" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold">Akıllı Tekrar</h2>

            {reviewWords.length === 0 ? (
              <div className="soft-card rounded-2xl p-8 mt-6">
                Şu an tekrar yok.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {reviewWords.map((word) => (
                  <WordCard
                    key={word.id}
                    word={word}
                    onClick={() => openWord(word)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {panel === "visuals" && (
          <section className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold">Görsel Hafıza Kartları</h2>

            <p className="text-stone-400 mt-2 mb-6">
              Bu bölümde görsel çağrışım kartları daha kompakt gösterilir.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visualWords.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  onClick={() => openWord(word)}
                  large
                />
              ))}
            </div>
          </section>
        )}

        <footer className="text-center text-stone-500 text-sm py-8">
          Ayet Hafızası · Temiz yeni repo sürümü
          <div className="mt-3">
            <button
              onClick={resetProgress}
              className="text-stone-500 hover:text-red-300 underline"
            >
              İlerlemeyi sıfırla
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

function WordCard({
  word,
  onClick,
  large = false
}: {
  word: Word;
  onClick: () => void;
  large?: boolean;
}) {
  const image = memoryImagesByArabic[word.arabic] || null;

  return (
    <button
      onClick={onClick}
      className="soft-card rounded-[1.5rem] p-4 text-left hover:border-emerald-400/50 transition"
    >
      {image && (
        <img
          src={image}
          alt={word.turkish_meaning}
          className={`w-full ${
            large ? "h-44" : "h-32"
          } object-contain rounded-2xl border border-emerald-400/20 mb-4 bg-black/30 p-2`}
        />
      )}

      <div className="arabic-text text-4xl text-right">{word.arabic}</div>
      <div className="text-emerald-300 mt-2">{word.turkish_meaning}</div>
      <div className="text-stone-400 text-sm mt-1">
        {word.part_of_speech}
      </div>
    </button>
  );
}

function Tab({
  active,
  onClick,
  label
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-2xl px-5 py-3 font-semibold ${
        active
          ? "bg-emerald-600 text-white"
          : "text-stone-300 hover:bg-stone-800"
      }`}
    >
      {label}
    </button>
  );
}

function MiniMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-black/20 border border-stone-700/60 rounded-2xl p-4">
      <div className="text-stone-400 text-xs">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="soft-card rounded-2xl p-5">
      <div className="text-stone-400 text-sm">{title}</div>
      <div className="text-lg text-stone-100 mt-2 leading-relaxed">
        {value}
      </div>
    </div>
  );
}

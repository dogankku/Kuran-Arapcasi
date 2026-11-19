export type ReadingItem = {
  ar: string;
  tr: string;
  note?: string;
  rule?: string;
  ref?: string;                       // "sure:ayet"
  audio?: [number, number, number] | null; // kelime kelime tilavet konumu
  ayah?: number;                      // global ayet numarası
};

export type Letter = {
  char: string;
  name: string;
  sound: string;
  tip: string;
  connects: boolean;
  example: ReadingItem;
};

export type SurahVerseRead = { n: number; ar: string; ayah: number; words: string[] };

export type ReadingLesson = {
  id: string;
  unit: "harfler" | "harekeler" | "tecvid" | "pratik";
  title: string;
  explain: string;
  kind: "letters" | "forms" | "syllables" | "rules" | "surah";
  letters?: string[];
  items?: ReadingItem[];
  rules?: string[];
  surah?: number;
  verses?: SurahVerseRead[];
};

export type PlacementQ = {
  id: string; lesson: string; q: string; ar: string; options: string[]; answer: string;
};

export type ReadingData = { letters: Letter[]; lessons: ReadingLesson[]; placement: PlacementQ[] };

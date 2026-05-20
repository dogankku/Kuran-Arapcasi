// Quran audio CDN utilities
// Verse audio: cdn.islamic.network — CORS açık, global ayet numarası sistemi
// Word audio:  audio.qurancdn.com — kelime bazlı tilavetwbw

export interface Reciter {
  id: string;
  name: string;
  flag: string;
  edition: string; // Islamic Network edition kodu
}

export const RECITERS: Reciter[] = [
  { id: "alafasy",   name: "Mishary Raşid",         flag: "🇰🇼", edition: "ar.alafasy" },
  { id: "husary",    name: "Mahmud Halil Husari",   flag: "🇪🇬", edition: "ar.husary" },
  { id: "basit",     name: "Abdülbasit (Murattal)", flag: "🇪🇬", edition: "ar.abdulbasitmurattal" },
  { id: "muaiqly",   name: "Mahir el-Muaykıli",     flag: "🇸🇦", edition: "ar.mahermuaiqly" },
];

export const DEFAULT_RECITER = RECITERS[0].id;
export const RECITER_STORAGE_KEY = "ayet-reciter-v1";

// Uygulamamızdaki sure indeksi (1-9) → sure başlangıç global ayet numarası
// Global ayet sayımı: Kur'an'daki toplam 6236 ayetin sıra numarası
// Son 12 surenin geriye doğru hesabı:
//   114(6v)=6231-6236, 113(5v)=6226-6230, 112(4v)=6222-6225,
//   111(5v)=6217-6221, 110(3v)=6214-6216, 109(6v)=6208-6213,
//   108(3v)=6205-6207, 107(7v)=6198-6204, 106(4v)=6194-6197,
//   105(5v)=6189-6193, 104(9v)=6180-6188, 103(3v)=6177-6179
export const SURAH_GLOBAL_START: Record<number, number> = {
  1: 1,     // El-Fatiha  (ch.1,  7 ayet → global 1-7)
  2: 6222,  // El-İhlas   (ch.112, 4 ayet → global 6222-6225)
  3: 6205,  // El-Kevser  (ch.108, 3 ayet → global 6205-6207)
  4: 6226,  // El-Felak   (ch.113, 5 ayet → global 6226-6230)
  5: 6231,  // En-Nas     (ch.114, 6 ayet → global 6231-6236)
  6: 6177,  // El-Asr     (ch.103, 3 ayet → global 6177-6179)
  7: 6208,  // El-Kafirûn (ch.109, 6 ayet → global 6208-6213)
  8: 6214,  // En-Nasr    (ch.110, 3 ayet → global 6214-6216)
  9: 6217,  // El-Mesed   (ch.111, 5 ayet → global 6217-6221)
};

// Uygulamamızdaki sure sırası → Kur'an bölüm numarası (kelime haritası için)
export const SURAH_CHAPTERS: Record<number, number> = {
  1: 1, 2: 112, 3: 108, 4: 113, 5: 114, 6: 103, 7: 109, 8: 110, 9: 111,
};

// Islamic Network CDN — CORS destekli, ücretsiz
export function getVerseAudioUrl(surahAppIdx: number, verseNumber: number, reciterId: string): string {
  const startGlobal = SURAH_GLOBAL_START[surahAppIdx];
  if (!startGlobal) return "";
  const globalAyah = startGlobal + verseNumber - 1;
  const reciter = RECITERS.find(r => r.id === reciterId) ?? RECITERS[0];
  return `https://cdn.islamic.network/quran/audio/128/${reciter.edition}/${globalAyah}.mp3`;
}

export function getWordAudioUrl(arabic: string): string | null {
  const pos = WORD_AUDIO_MAP[arabic];
  if (!pos) return null;
  const [ch, vs, wpos] = pos;
  return `https://audio.qurancdn.com/wbw/${ch}/${vs}/${wpos}.mp3`;
}

// Kelime → [bölüm, ayet, kelime_sırası] haritası
// Kaynak: Quran.com kelime bazlı tilavetwbw CDN
export const WORD_AUDIO_MAP: Record<string, [number, number, number]> = {
  // ── Fatiha (1) ──────────────────────────────────────────
  "اللَّه":       [1, 1, 2],
  "الرَّحْمَنِ": [1, 1, 3],
  "الرَّحِيمِ":  [1, 1, 4],
  "الْحَمْدُ":   [1, 2, 1],
  "رَبِّ":       [1, 2, 3],
  "الْعَالَمِينَ": [1, 2, 4],
  "الدِّينِ":    [1, 4, 3],
  "الصِّرَاطَ":  [1, 6, 2],
  "صِرَاطٍ":     [1, 6, 2],
  "مُسْتَقِيمٍ": [1, 6, 3],
  "الَّذِينَ":   [1, 7, 2],

  // ── İhlas (112) ──────────────────────────────────────────
  "هُوَ":        [112, 1, 2],
  "أَحَد":       [112, 1, 4],
  "لَمْ":        [112, 3, 1],

  // ── Felak (113) ──────────────────────────────────────────
  "خَلَقَ":      [113, 2, 4],
  "شَرّ":        [113, 2, 2],

  // ── Nas (114) ─────────────────────────────────────────────
  "النَّاس":     [114, 1, 4],
  "مَلِك":       [114, 2, 1],

  // ── Asr (103) ─────────────────────────────────────────────
  "آمَنُوا":     [103, 3, 3],
  "صَبْر":       [103, 3, 9],
  "إِنَّ":       [103, 2, 1],

  // ── Nasr (110) ────────────────────────────────────────────
  "نَصْر":       [110, 1, 3],
  "جَاءَ":       [110, 1, 2],
  "النُّور":     [24, 35, 1],
  "نُور":        [24, 35, 1],

  // ── Bakara (2) ────────────────────────────────────────────
  "هُدًى":       [2, 2, 3],
  "الْكِتَاب":   [2, 2, 2],
  "كِتَاب":      [2, 2, 2],
  "مُتَّقِينَ":  [2, 2, 4],
  "السَّمَاوَاتِ": [2, 255, 3],
  "الْأَرْضَ":   [2, 255, 5],
  "أَرْض":       [2, 255, 5],
  "السَّمَاء":   [2, 22, 2],
  "سَمِيع":      [2, 127, 6],
  "عَلِيم":      [2, 127, 7],
  "حَقّ":        [2, 26, 4],
  "آيَة":        [2, 99, 1],
  "عِلْم":       [2, 31, 2],
  "يَعْلَمُ":    [2, 77, 1],
  "بَصِير":      [2, 110, 4],
  "إِيمَان":     [2, 108, 4],
  "كُفْر":       [2, 108, 5],
  "تَوْبَة":     [2, 37, 3],
  "رَحْمَة":     [2, 157, 3],
  "جَنَّة":      [2, 25, 1],
  "نَار":        [2, 24, 1],
  "عَذَاب":      [2, 10, 5],
  "صَلَاة":      [2, 3, 3],
  "يَوْم":       [2, 8, 4],
  "كَانَ":       [2, 75, 5],
  "قَالَ":       [2, 30, 1],
  "رَسُول":      [2, 87, 2],
  "نَبِيّ":      [2, 61, 7],
  "قَوْم":       [2, 54, 5],
  "كُلّ":        [2, 20, 6],
  "مَا":         [2, 20, 3],
  "لَا":         [2, 2, 0],
  "مِنْ":        [2, 3, 1],
  "فِي":         [2, 10, 3],
  "إِلَى":       [2, 14, 3],
  "عَلَى":       [2, 5, 3],
  "وَ":          [2, 3, 2],
  "هُمْ":        [2, 5, 1],
  "الَّذِينَ_2": [2, 5, 2],  // suppressed duplicate

  // ── Al-i İmran (3) ────────────────────────────────────────
  "الْإِسْلَامُ": [3, 19, 3],
  "إِسْلَام":    [3, 19, 3],
  "مُسْلِم":     [3, 52, 4],
  "صِرَاط":      [3, 51, 3],
  "حَكِيم":      [3, 6, 5],

  // ── Nisa (4) ─────────────────────────────────────────────
  "النِّسَاء":   [4, 1, 3],
  "نِسَاء":      [4, 1, 3],
  "أَب":         [4, 11, 6],

  // ── Maide (5) ────────────────────────────────────────────
  "الْيَوْم":    [5, 3, 1],
  "طَعَام":      [5, 5, 2],

  // ── Enam (6) ─────────────────────────────────────────────
  "بَعْدَ":      [6, 45, 5],

  // ── Kehf (18) ────────────────────────────────────────────
  "قُرْآن":      [18, 1, 3],

  // ── Yasin (36) ───────────────────────────────────────────
  "رَحِيم":      [36, 5, 2],
  "غَفُور":      [36, 5, 3],

  // ── Zuhruf (43) ──────────────────────────────────────────
  "عَزِيز":      [43, 9, 5],

  // ── Rehman (55) ──────────────────────────────────────────
  "الرَّحْمَن":  [55, 1, 1],
  "عَلَّمَ":     [55, 2, 1],
  "الْإِنسَان":  [55, 3, 1],
  "الْبَيَان":   [55, 4, 1],
  "شَمْس":       [55, 5, 2],
  "قَمَر":       [55, 5, 3],
  "نَجْم":       [55, 6, 2],
  "شَجَر":       [55, 6, 3],

  // ── Mülk (67) ────────────────────────────────────────────
  "مُلْك":       [67, 1, 2],
  "حَيَاة":      [67, 2, 4],
  "مَوْت":       [67, 2, 5],
  "قَدِير":      [67, 1, 5],

  // ── Nebe (78) ────────────────────────────────────────────
  "جَبَل":       [78, 7, 2],
  "نَوْم":       [78, 9, 2],

  // ── Fecr (89) ────────────────────────────────────────────
  "رَبّ":        [89, 15, 2],

  // ── Dua / zikir kelimeleri ────────────────────────────────
  "سُبْحَانَ":   [17, 1, 1],
  "الْحَمْد":    [1, 2, 1],
  "أَكْبَر":     [29, 45, 5],
  "لَا إِلَهَ": [47, 19, 1],
};

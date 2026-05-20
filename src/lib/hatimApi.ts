// Quran hatim module — verse text, Turkish translation, word-level timing
// Text:    api.alquran.cloud (CORS-open, free)
// Timings: api.qurancdn.com segments endpoint (Quran Foundation)
// Audio:   cdn.islamic.network (same recordings, CORS-open)

export interface VerseText {
  n: number;       // verse number in surah (1-based)
  ar: string;      // full Arabic text
  tr: string;      // Diyanet Turkish translation
  words: string[]; // Arabic split by whitespace
}

// [word_index_1based, start_ms, end_ms]
export type Segment = [number, number, number];

export interface HatimReciter {
  qdcId: number;
  name: string;
  flag: string;
  islamicNetEdition: string;
}

export const HATIM_RECITERS: HatimReciter[] = [
  { qdcId: 7,  name: "Mishary Raşid",         flag: "🇰🇼", islamicNetEdition: "ar.alafasy" },
  { qdcId: 3,  name: "M. Halil Husari",        flag: "🇪🇬", islamicNetEdition: "ar.husary" },
  { qdcId: 9,  name: "Mahir el-Muaykıli",      flag: "🇸🇦", islamicNetEdition: "ar.mahermuaiqly" },
  { qdcId: 1,  name: "Abdülbasit (Murattal)",  flag: "🇪🇬", islamicNetEdition: "ar.abdulbasitmurattal" },
];

export function getHatimAudioUrl(reciter: HatimReciter, globalAyah: number): string {
  return `https://cdn.islamic.network/quran/audio/128/${reciter.islamicNetEdition}/${globalAyah}.mp3`;
}

// ── Caching ────────────────────────────────────────────────────────────────
const memTextCache = new Map<number, VerseText[]>();
const memTimingCache = new Map<string, Map<number, Segment[]>>();

function ssGet<T>(key: string): T | null {
  try {
    const s = sessionStorage.getItem(key);
    return s ? (JSON.parse(s) as T) : null;
  } catch { return null; }
}
function ssSet(key: string, value: unknown): void {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ── Text fetch ─────────────────────────────────────────────────────────────
export async function fetchSurahVerses(ch: number): Promise<VerseText[]> {
  if (memTextCache.has(ch)) return memTextCache.get(ch)!;

  const ssKey = `hatim_text_${ch}`;
  const cached = ssGet<VerseText[]>(ssKey);
  if (cached) { memTextCache.set(ch, cached); return cached; }

  const [arabicRes, turkishRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${ch}`),
    fetch(`https://api.alquran.cloud/v1/surah/${ch}/tr.diyanet`),
  ]);
  if (!arabicRes.ok) throw new Error(`alquran.cloud HTTP ${arabicRes.status}`);

  const arabicData = await arabicRes.json();
  const trMap: Record<number, string> = {};
  if (turkishRes.ok) {
    const turkishData = await turkishRes.json();
    for (const a of turkishData.data.ayahs as Array<{numberInSurah:number;text:string}>) {
      trMap[a.numberInSurah] = a.text;
    }
  }

  const verses: VerseText[] = (arabicData.data.ayahs as Array<{numberInSurah:number;text:string}>).map(a => ({
    n: a.numberInSurah,
    ar: a.text,
    tr: trMap[a.numberInSurah] ?? "",
    words: a.text.split(/\s+/).filter(Boolean),
  }));

  memTextCache.set(ch, verses);
  ssSet(ssKey, verses);
  return verses;
}

// ── Word-timing fetch ──────────────────────────────────────────────────────
// QDC segments format: audio_files[].segments = [[wordIdx1based, startMs, endMs], ...]
// verse_key = "chapter:verseInChapter"
export async function fetchWordTimings(
  ch: number,
  qdcReciterId: number
): Promise<Map<number, Segment[]>> {
  const cacheKey = `${ch}_${qdcReciterId}`;
  if (memTimingCache.has(cacheKey)) return memTimingCache.get(cacheKey)!;

  const ssKey = `hatim_timing_${cacheKey}`;
  const cachedObj = ssGet<Record<string, Segment[]>>(ssKey);
  if (cachedObj) {
    const map = new Map<number, Segment[]>(
      Object.entries(cachedObj).map(([k, v]) => [Number(k), v])
    );
    memTimingCache.set(cacheKey, map);
    return map;
  }

  const map = new Map<number, Segment[]>();

  // Try two endpoints — direct QDC, then Quran.com v4 as fallback
  const endpoints = [
    `https://api.qurancdn.com/api/qdc/audio/reciters/${qdcReciterId}/audio_files?chapter_number=${ch}&segments=true`,
    `https://api.quran.com/api/v4/recitations/${qdcReciterId}/by_chapter/${ch}?per_page=300`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) continue;
      const data = await res.json();

      // QDC format: { audio_files: [{verse_key, segments}] }
      // Quran.com v4 format: { audio_files: [{verse_key, audio_url, duration}] } — no segments
      const files: Array<{verse_key?:string; verse_number?:number; segments?:Segment[]}> =
        data.audio_files ?? [];

      let found = 0;
      for (const file of files) {
        if (!file.segments?.length) continue;
        const verseN = file.verse_key
          ? parseInt(file.verse_key.split(":")[1])
          : (file.verse_number ?? NaN);
        if (!isNaN(verseN)) { map.set(verseN, file.segments); found++; }
      }
      if (found > 0) break; // got timing data, stop trying
    } catch {
      // network/CORS failure — try next endpoint
    }
  }

  if (map.size > 0) {
    const obj: Record<string, Segment[]> = {};
    map.forEach((v, k) => { obj[String(k)] = v; });
    ssSet(ssKey, obj);
  } else {
    // Both endpoints failed — timing unavailable, playback still works
  }

  memTimingCache.set(cacheKey, map);
  return map;
}

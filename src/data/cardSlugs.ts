// Kart görsel dosya adları (slug) — 200 kart, 10 paket × 20
// Arapça kelime (tashkil dahil veya yakın form) → dosya adı
// public/cards/{slug}.png formatında aranır

export const CARD_SLUGS: Record<string, string> = {

  // ── Paket 1/10 — Temel Kelimeler ─────────────────────────────────────────
  "اللَّه":            "allah",
  "النَّاس":           "an-nas",
  "الْأَرْض":          "ard",
  "الْأَرْضَ":         "ard",
  "السَّمَاء":         "sama",
  "النُّور":           "nur",
  "نُور":              "nur",
  "الْحَمْد":          "hamd",
  "الْحَمْدُ":         "hamd",
  "رَبّ":              "rabbi",
  "رَبِّ":             "rabbi",
  "الْعَالَمِين":      "alamin",
  "الْعَالَمِينَ":     "alamin",
  "الدِّين":           "ad-din",
  "الدِّينِ":          "ad-din",
  "صِرَاط":            "sirat",
  "صِرَاطٍ":           "sirat",
  "مُسْتَقِيم":        "mustaqim",
  "مُسْتَقِيمٍ":       "mustaqim",
  "الَّذِين":          "alladhina",
  "الَّذِينَ":         "alladhina",
  "هُدَى":             "huda",
  "هُدًى":             "huda",
  "آيَة":              "ayah",
  "ذِكْر":             "dhikr",
  "مِن":               "min",
  "مِنْ":              "min",
  "فِي":               "fi",
  "إِلَى":             "ila",
  "عَلَى":             "ala",
  "لَا":               "la",

  // ── Paket 2/10 — İman & İbadet ──────────────────────────────────────────
  "إِيمَان":           "iman",
  "إِسْلَام":          "islam",
  "تَقْوَى":           "taqwa",
  "صَلَاة":            "salah",
  "زَكَاة":            "zakah",
  "صَوْم":             "sawm",
  "حَجّ":              "hajj",
  "دُعَاء":            "dua",
  "عِبَادَة":          "ibadah",
  "عَبْد":             "abd",
  "رَحْمَة":           "rahma",
  "مَغْفِرَة":         "maghfirah",
  "تَوْبَة":           "tawbah",
  "أَجْر":             "ajr",
  "نِعْمَة":           "nimah",
  "شُكْر":             "shukr",
  "كُفْر":             "kufr",
  "صَبْر":             "sabr",
  "حَقّ":              "haqq",
  "عَدْل":             "adl",

  // ── Paket 3/10 — (Gelecek) ───────────────────────────────────────────────

  // ── Paket 4/10 — (Gelecek) ───────────────────────────────────────────────

  // ── Paket 5/10 — Doğa & Mekan ───────────────────────────────────────────
  "السَّمَاوَات":      "samawat",
  "السَّمَاوَاتِ":     "samawat",
  "بَحْر":             "bahr",
  "نَهَر":             "nahr",
  "جَبَل":             "jabal",
  "شَجَر":             "shajar",
  "ثَمَر":             "thamar",
  "مَاء":              "maa",
  "رِيح":              "rih",
  "سَحَاب":            "sahab",
  "مَطَر":             "matar",
  "شَمْس":             "shams",
  "قَمَر":             "qamar",
  "نَجْم":             "najm",
  "طَيْر":             "tayr",
  "دَابَّة":           "dabba",
  "أَنْعَام":          "anam",
  "بَلَد":             "balad",
  "قَرْيَة":           "qaryah",
  "بَيْت":             "bayt",
  "مَسْجِد":           "masjid",

  // ── Paket 6/10 — Ahiret & Duygular ──────────────────────────────────────
  "دُنْيَا":           "dunya",
  "آخِرَة":            "akhirah",
  "قِيَامَة":          "qiyamah",
  "جَنَّة":            "jannah",
  "فِرْدَوْس":         "firdaus",
  "جَحِيم":            "jahim",
  "نَار":              "nar",
  "رِزْق":             "rizq",
  "فَضْل":             "fadl",
  "سَلَام":            "salam",
  "أَمْن":             "amn",
  "خَوْف":             "khawf",
  "حُزْن":             "huzn",
  "فَرَح":             "farah",
  "حُبّ":              "hubb",
  "بُغْض":             "bughd",
  "فِتْنَة":           "fitnah",
  "بَلَاء":            "bala",
  "نَصْر":             "nasr",
  "فَتْح":             "fath",

  // ── Paket 7/10 — (Gelecek) ───────────────────────────────────────────────

  // ── Paket 8/10 — (Gelecek) ───────────────────────────────────────────────

  // ── Paket 9/10 — (Gelecek) ───────────────────────────────────────────────

  // ── Paket 10/10 — Fiiller ────────────────────────────────────────────────
  "ذَكَرَ":            "dhakara",
  "نَسِيَ":            "nasiya",
  "دَعَا":             "daaa",
  "عَبَدَ":            "abada",
  "سَجَدَ":            "sajada",
  "رَكَعَ":            "rakaa",
  "صَلَّى":            "salla",
  "صَامَ":             "saama",
  "شَكَرَ":            "shakara",
  "كَفَرَ":            "kafara",
  "آمَنَ":             "amana",
  "اتَّقَى":           "ittaqa",
  "غَفَرَ":            "ghafara",
  "رَحِمَ":            "rahima",
  "هَدَى":             "hada",
  "ضَلَّ":             "dalla",
  "نَصَرَ":            "nasara",
  "قَتَلَ":            "qatala",
  "مَاتَ":             "maata",
  "بَعَثَ":            "baatha",
};

// Tashkil temizleyerek arama — harekeleri yoksay
function strip(s: string) {
  return s.replace(/[ؐ-ًؚ-ٰٟ]/g, "")
          .replace(/[أإآا]/g, "ا").replace(/[ىئ]/g, "ي").replace(/ة/g, "ه").trim();
}

const STRIPPED_MAP: Record<string, string> = {};
for (const [ar, slug] of Object.entries(CARD_SLUGS)) {
  STRIPPED_MAP[strip(ar)] = slug;
}

export function getCardSlug(arabic: string): string | null {
  return CARD_SLUGS[arabic] ?? STRIPPED_MAP[strip(arabic)] ?? null;
}

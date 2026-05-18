import type { MorphPattern } from "./types";

export const morphPatterns: MorphPattern[] = [
  {
    id: 1,
    pattern: "فَعَلَ",
    patternArabic: "فَعَلَ",
    name: "Mazi Fiil (Geçmiş)",
    description: "Üç harfli kök + harekelerle geçmiş zaman bildiren temel fiil kalıbı. خَلَقَ, قَالَ, كَتَبَ gibi.",
    examples: [
      { arabic: "خَلَقَ", transliteration: "halaka", meaning: "yarattı", root: "خ-ل-ق" },
      { arabic: "قَالَ", transliteration: "kâle", meaning: "dedi", root: "ق-و-ل" },
      { arabic: "كَتَبَ", transliteration: "ketebe", meaning: "yazdı", root: "ك-ت-ب" },
      { arabic: "نَصَرَ", transliteration: "nasara", meaning: "yardım etti", root: "ن-ص-ر" }
    ]
  },
  {
    id: 2,
    pattern: "يَفْعَلُ",
    patternArabic: "يَفْعَلُ",
    name: "Muzari Fiil (Geniş/Şimdiki)",
    description: "يَ ön eki + kök + ُ sonu: 3. tekil eril muzari. Hem 'yapar' hem 'yapıyor' anlamı verir.",
    examples: [
      { arabic: "يَعْلَمُ", transliteration: "ya'lemu", meaning: "bilir", root: "ع-ل-م" },
      { arabic: "يَخْلُقُ", transliteration: "yahluku", meaning: "yaratır", root: "خ-ل-ق" },
      { arabic: "يَقُولُ", transliteration: "yekûlu", meaning: "der / söyler", root: "ق-و-ل" },
      { arabic: "يَكْتُبُ", transliteration: "yektubu", meaning: "yazar", root: "ك-ت-ب" }
    ]
  },
  {
    id: 3,
    pattern: "اِفْعَلْ",
    patternArabic: "اِفْعَلْ",
    name: "Emir Fiili",
    description: "İkinci şahsa verilen emir. اقْرَأْ (oku!), قُلْ (de!), اذْهَبْ (git!). Kur'an'da sıkça geçer.",
    examples: [
      { arabic: "قُلْ", transliteration: "kul", meaning: "de!", root: "ق-و-ل" },
      { arabic: "اقْرَأْ", transliteration: "ikra'", meaning: "oku!", root: "ق-ر-أ" },
      { arabic: "اهْدِ", transliteration: "ihdi", meaning: "ilet! / hidayet et!", root: "ه-د-ي" },
      { arabic: "سَبِّحْ", transliteration: "sebbih", meaning: "tesbih et!", root: "س-ب-ح" }
    ]
  },
  {
    id: 4,
    pattern: "فَاعِل",
    patternArabic: "فَاعِل",
    name: "İsm-i Fâil (Yapan / Eden)",
    description: "Eylemi yapan kişiyi/şeyi ifade eder. Türkçede '-en / -an' eki gibi. كَاتِب = yazan, عَالِم = bilen.",
    examples: [
      { arabic: "عَالِم", transliteration: "âlim", meaning: "bilen / âlim", root: "ع-ل-م" },
      { arabic: "مَالِك", transliteration: "mâlik", meaning: "sahip / malik", root: "م-ل-ك" },
      { arabic: "كَافِر", transliteration: "kâfir", meaning: "inkârcı", root: "ك-ف-ر" },
      { arabic: "صَابِر", transliteration: "sâbir", meaning: "sabreden", root: "ص-ب-ر" }
    ]
  },
  {
    id: 5,
    pattern: "مَفْعُول",
    patternArabic: "مَفْعُول",
    name: "İsm-i Mef'ûl (Yapılan / Edilen)",
    description: "Eylemin üzerine yapıldığı şeyi ifade eder. Türkçede edilgen '-ilmiş / -ılmış' gibi. مَكْتُوب = yazılmış.",
    examples: [
      { arabic: "مَعْلُوم", transliteration: "ma'lûm", meaning: "bilinen / malum", root: "ع-ل-م" },
      { arabic: "مَكْتُوب", transliteration: "mektûb", meaning: "yazılmış / mektup", root: "ك-ت-ب" },
      { arabic: "مَغْفُور", transliteration: "mağfûr", meaning: "bağışlanmış", root: "غ-ف-ر" },
      { arabic: "مَنْصُور", transliteration: "mansûr", meaning: "yardım görmüş / muzaffer", root: "ن-ص-ر" }
    ]
  },
  {
    id: 6,
    pattern: "فُعُول",
    patternArabic: "فُعُول",
    name: "Çoğul Kalıbı (Kırık Çoğul)",
    description: "Arapçada çoğul kelimeler kök harflerinin içine farklı harekeler girerek oluşur. كِتَاب → كُتُب gibi.",
    examples: [
      { arabic: "قُلُوب", transliteration: "kulûb", meaning: "kalpler", root: "ق-ل-ب" },
      { arabic: "كُتُب", transliteration: "kutub", meaning: "kitaplar", root: "ك-ت-ب" },
      { arabic: "رُسُل", transliteration: "rusül", meaning: "elçiler / resuller", root: "ر-س-ل" },
      { arabic: "سُبُل", transliteration: "sübül", meaning: "yollar", root: "س-ب-ل" }
    ]
  },
  {
    id: 7,
    pattern: "فَعَّال",
    patternArabic: "فَعَّال",
    name: "Mübalağa Sıfatı (Çok Yapan)",
    description: "Bir eylemi çok yapanı ya da mesleği ifade eder. غَفَّار = çok bağışlayan, وَهَّاب = çok veren gibi.",
    examples: [
      { arabic: "غَفَّار", transliteration: "gaffâr", meaning: "çok bağışlayan", root: "غ-ف-ر" },
      { arabic: "وَهَّاب", transliteration: "vehhâb", meaning: "çok bağışlayan / Vehhab", root: "و-ه-ب" },
      { arabic: "تَوَّاب", transliteration: "tevvâb", meaning: "tövbeleri çok kabul eden", root: "ت-و-ب" },
      { arabic: "بَصِير", transliteration: "basîr", meaning: "her şeyi gören", root: "ب-ص-ر" }
    ]
  },
  {
    id: 8,
    pattern: "مَفْعَل",
    patternArabic: "مَفْعَل / مَفْعِل",
    name: "İsm-i Mekân / İsm-i Âlet (Yer / Araç)",
    description: "Eylemin gerçekleştiği yer ya da kullanılan araç-gereci ifade eder. مَسْجِد = secde yeri, مَكْتَب = yazı yeri.",
    examples: [
      { arabic: "مَسْجِد", transliteration: "mescid", meaning: "mescit / secde yeri", root: "س-ج-د" },
      { arabic: "مَدْرَسَة", transliteration: "medrese", meaning: "okul / ders yeri", root: "د-ر-س" },
      { arabic: "مَغْرِب", transliteration: "mağrib", meaning: "batı / güneş batısı", root: "غ-ر-ب" },
      { arabic: "مَشْرِق", transliteration: "meşrik", meaning: "doğu / güneş doğuşu", root: "ش-ر-ق" }
    ]
  }
];

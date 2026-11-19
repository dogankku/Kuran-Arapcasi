// OTOMATİK ÜRETİLDİ — Kur'an okuma müfredatı (harfler, harekeler, tecvid, pratik).
// Örnek kelimeler Kur'an metninden alınmıştır; audio = [sure, ayet, kelime sırası] (kelime kelime tilavet),
// ayah = global ayet numarası (tam ayet tilaveti).

import type { ReadingData } from "./readingTypes";

export const READING: ReadingData = {
 "letters": [
  {
   "char": "ا",
   "name": "Elif",
   "sound": "a / uzatma",
   "tip": "Kendi başına sesi yoktur: hareke alınca hemze gibi okunur, harekesiz gelince önceki sesi uzatır.",
   "connects": false,
   "example": {
    "ar": "أَحَدٌ",
    "tr": "ehadun",
    "ref": "112:1",
    "audio": [
     112,
     1,
     4
    ],
    "ayah": 6222
   }
  },
  {
   "char": "ب",
   "name": "Be",
   "sound": "b",
   "tip": "Türkçe b gibi.",
   "connects": true,
   "example": {
    "ar": "بِسْمِ",
    "tr": "bismi",
    "ref": "1:1",
    "audio": [
     1,
     1,
     1
    ],
    "ayah": 1
   }
  },
  {
   "char": "ت",
   "name": "Te",
   "sound": "t",
   "tip": "Türkçe t gibi, ince.",
   "connects": true,
   "example": {
    "ar": "تَبَّتْ",
    "tr": "tebbet",
    "ref": "111:1",
    "audio": [
     111,
     1,
     1
    ],
    "ayah": 6217
   }
  },
  {
   "char": "ث",
   "name": "Se",
   "sound": "s (peltek)",
   "tip": "Dil ucu ön dişlerin arasına konur; İngilizce \"think\"teki ses. س ile karıştırma.",
   "connects": true,
   "example": {
    "ar": "ثُمَّ",
    "tr": "summe",
    "ref": "102:4",
    "audio": [
     102,
     4,
     1
    ],
    "ayah": 6172
   }
  },
  {
   "char": "ج",
   "name": "Cim",
   "sound": "c",
   "tip": "Türkçe c gibi.",
   "connects": true,
   "example": {
    "ar": "جَاءَ",
    "tr": "câe",
    "ref": "110:1",
    "audio": [
     110,
     1,
     2
    ],
    "ayah": 6214
   }
  },
  {
   "char": "ح",
   "name": "Ha",
   "sound": "h (boğazdan)",
   "tip": "Boğazın ortasından, nefesi sıkıştırarak çıkan temiz h. ه'den daha güçlü, خ gibi hırıltılı değil.",
   "connects": true,
   "example": {
    "ar": "حَاسِدٍ",
    "tr": "hâsidin",
    "ref": "113:5",
    "audio": [
     113,
     5,
     3
    ],
    "ayah": 6230
   }
  },
  {
   "char": "خ",
   "name": "Hı",
   "sound": "h (hırıltılı)",
   "tip": "Gırtlağın üstünden hırıltıyla çıkar; kalın harftir.",
   "connects": true,
   "example": {
    "ar": "خَلَقَ",
    "tr": "halaka",
    "ref": "113:2",
    "audio": [
     113,
     2,
     4
    ],
    "ayah": 6227
   }
  },
  {
   "char": "د",
   "name": "Dal",
   "sound": "d",
   "tip": "Türkçe d gibi.",
   "connects": false,
   "example": {
    "ar": "دِينِ",
    "tr": "dîni",
    "ref": "110:2",
    "audio": [
     110,
     2,
     5
    ],
    "ayah": 6215
   }
  },
  {
   "char": "ذ",
   "name": "Zel",
   "sound": "z (peltek)",
   "tip": "Dil ucu dişlerin arasında; İngilizce \"this\"teki ses. ز ile karıştırma.",
   "connects": false,
   "example": {
    "ar": "ذَاتَ",
    "tr": "zâte",
    "ref": "111:3",
    "audio": [
     111,
     3,
     3
    ],
    "ayah": 6219
   }
  },
  {
   "char": "ر",
   "name": "Ra",
   "sound": "r",
   "tip": "Türkçe r gibi; üstün ve ötreli iken kalın okunur.",
   "connects": false,
   "example": {
    "ar": "رَبِّ",
    "tr": "rabbi",
    "ref": "1:2",
    "audio": [
     1,
     2,
     3
    ],
    "ayah": 2
   }
  },
  {
   "char": "ز",
   "name": "Ze",
   "sound": "z",
   "tip": "Türkçe z gibi.",
   "connects": false,
   "example": {
    "ar": "زُرْتُمُ",
    "tr": "zurtumu",
    "ref": "102:2",
    "audio": [
     102,
     2,
     2
    ],
    "ayah": 6170
   }
  },
  {
   "char": "س",
   "name": "Sin",
   "sound": "s",
   "tip": "İnce, Türkçe s gibi.",
   "connects": true,
   "example": {
    "ar": "سِجِّيلٍ",
    "tr": "siccîlin",
    "ref": "105:4",
    "audio": [
     105,
     4,
     4
    ],
    "ayah": 6192
   }
  },
  {
   "char": "ش",
   "name": "Şın",
   "sound": "ş",
   "tip": "Türkçe ş gibi.",
   "connects": true,
   "example": {
    "ar": "شَرِّ",
    "tr": "şerri",
    "ref": "113:2",
    "audio": [
     113,
     2,
     2
    ],
    "ayah": 6227
   }
  },
  {
   "char": "ص",
   "name": "Sad",
   "sound": "s (kalın)",
   "tip": "Dil geriye çekilip ağız dolgun açılır; kalın s.",
   "connects": true,
   "example": {
    "ar": "صِرَاطَ",
    "tr": "sırâta",
    "ref": "1:7",
    "audio": [
     1,
     7,
     1
    ],
    "ayah": 7
   }
  },
  {
   "char": "ض",
   "name": "Dad",
   "sound": "d (kalın)",
   "tip": "Dilin kenarı azı dişlere dayanır; kalın ve güçlü d.",
   "connects": true,
   "example": {
    "ar": "ضَبْحًا",
    "tr": "dabhan",
    "ref": "100:1",
    "audio": [
     100,
     1,
     2
    ],
    "ayah": 6147
   }
  },
  {
   "char": "ط",
   "name": "Tı",
   "sound": "t (kalın)",
   "tip": "Kalın ve güçlü t.",
   "connects": true,
   "example": {
    "ar": "طَيْرًا",
    "tr": "tayran",
    "ref": "105:3",
    "audio": [
     105,
     3,
     3
    ],
    "ayah": 6191
   }
  },
  {
   "char": "ظ",
   "name": "Zı",
   "sound": "z (kalın, peltek)",
   "tip": "Peltek z'nin kalın hâli.",
   "connects": true,
   "example": {
    "ar": "ظَهْرَكَ",
    "tr": "zahrake",
    "ref": "94:3",
    "audio": [
     94,
     3,
     3
    ],
    "ayah": 6093
   }
  },
  {
   "char": "ع",
   "name": "Ayn",
   "sound": "' (boğaz)",
   "tip": "Boğazın ortası sıkıştırılarak çıkan kendine has ses; Türkçede karşılığı yok. Hafızdan dinleyerek öğren.",
   "connects": true,
   "example": {
    "ar": "عَنْهُ",
    "tr": "anhu",
    "ref": "111:2",
    "audio": [
     111,
     2,
     3
    ],
    "ayah": 6218
   }
  },
  {
   "char": "غ",
   "name": "Ğayın",
   "sound": "ğ (gırtlak)",
   "tip": "Gırtlağın üstünden, gargara yapar gibi çıkan kalın ğ.",
   "connects": true,
   "example": {
    "ar": "غَيْرِ",
    "tr": "ğayri",
    "ref": "1:7",
    "audio": [
     1,
     7,
     5
    ],
    "ayah": 7
   }
  },
  {
   "char": "ف",
   "name": "Fe",
   "sound": "f",
   "tip": "Türkçe f gibi.",
   "connects": true,
   "example": {
    "ar": "فِي",
    "tr": "fî",
    "ref": "113:4",
    "audio": [
     113,
     4,
     4
    ],
    "ayah": 6229
   }
  },
  {
   "char": "ق",
   "name": "Kaf",
   "sound": "k (kalın)",
   "tip": "Dil kökü damağa dayanır; kalın k. ك ile karıştırma.",
   "connects": true,
   "example": {
    "ar": "قُلْ",
    "tr": "kul",
    "ref": "112:1",
    "audio": [
     112,
     1,
     1
    ],
    "ayah": 6222
   }
  },
  {
   "char": "ك",
   "name": "Kef",
   "sound": "k (ince)",
   "tip": "İnce, Türkçe k gibi.",
   "connects": true,
   "example": {
    "ar": "كُفُوًا",
    "tr": "kufuven",
    "ref": "112:4",
    "audio": [
     112,
     4,
     4
    ],
    "ayah": 6225
   }
  },
  {
   "char": "ل",
   "name": "Lam",
   "sound": "l",
   "tip": "Türkçe l gibi.",
   "connects": true,
   "example": {
    "ar": "لِلَّهِ",
    "tr": "lillâhi",
    "ref": "1:2",
    "audio": [
     1,
     2,
     2
    ],
    "ayah": 2
   }
  },
  {
   "char": "م",
   "name": "Mim",
   "sound": "m",
   "tip": "Türkçe m gibi.",
   "connects": true,
   "example": {
    "ar": "مَالِكِ",
    "tr": "mâliki",
    "ref": "1:4",
    "audio": [
     1,
     4,
     1
    ],
    "ayah": 4
   }
  },
  {
   "char": "ن",
   "name": "Nun",
   "sound": "n",
   "tip": "Türkçe n gibi.",
   "connects": true,
   "example": {
    "ar": "نَعْبُدُ",
    "tr": "na'budu",
    "ref": "1:5",
    "audio": [
     1,
     5,
     2
    ],
    "ayah": 5
   }
  },
  {
   "char": "ه",
   "name": "He",
   "sound": "h (hafif)",
   "tip": "Göğüsten gelen hafif, nefesli h.",
   "connects": true,
   "example": {
    "ar": "هُوَ",
    "tr": "huve",
    "ref": "112:1",
    "audio": [
     112,
     1,
     2
    ],
    "ayah": 6222
   }
  },
  {
   "char": "و",
   "name": "Vav",
   "sound": "v / w",
   "tip": "Dudaklar yuvarlanarak İngilizce w gibi okunur; ötreden sonra uzatma harfidir.",
   "connects": false,
   "example": {
    "ar": "وَلَا",
    "tr": "velâ",
    "ref": "1:7",
    "audio": [
     1,
     7,
     8
    ],
    "ayah": 7
   }
  },
  {
   "char": "ي",
   "name": "Ye",
   "sound": "y",
   "tip": "Türkçe y gibi; esreden sonra uzatma harfidir.",
   "connects": true,
   "example": {
    "ar": "يَوْمِ",
    "tr": "yevmi",
    "ref": "1:4",
    "audio": [
     1,
     4,
     2
    ],
    "ayah": 4
   }
  },
  {
   "char": "ء",
   "name": "Hemze",
   "sound": "' (kesik ses)",
   "tip": "Gırtlakta kısa bir duruş: \"saat\" kelimesindeki iki a arasındaki kesinti gibi. Elif, vav veya ye üzerinde ya da tek başına yazılır.",
   "connects": false,
   "example": {
    "ar": "جَاءَ",
    "tr": "câe",
    "ref": "110:1",
    "audio": [
     110,
     1,
     2
    ],
    "ayah": 6214
   }
  }
 ],
 "lessons": [
  {
   "id": "H1",
   "unit": "harfler",
   "title": "Harfler 1: Elif, Be, Te, Se",
   "explain": "Arap alfabesi sağdan sola yazılır ve 28 harften oluşur. Benzer şekilli harfler noktalarıyla ayrılır: ب altında bir nokta, ت üstünde iki, ث üstünde üç.",
   "kind": "letters",
   "letters": [
    "ا",
    "ب",
    "ت",
    "ث"
   ]
  },
  {
   "id": "H2",
   "unit": "harfler",
   "title": "Harfler 2: Cim, Ha, Hı",
   "explain": "Bu üç harf aynı gövdeyi paylaşır: ج içinde nokta, ح noktasız, خ üstünde nokta. ح ve خ Türkçede olmayan boğaz sesleridir; mutlaka hafızdan dinle.",
   "kind": "letters",
   "letters": [
    "ج",
    "ح",
    "خ"
   ]
  },
  {
   "id": "H3",
   "unit": "harfler",
   "title": "Harfler 3: Dal, Zel, Ra, Ze",
   "explain": "Bu dört harf kendinden sonrakine bitişmez. د ve ذ (noktalı), ر ve ز (noktalı) çiftler hâlinde öğrenilir. ذ peltek okunur.",
   "kind": "letters",
   "letters": [
    "د",
    "ذ",
    "ر",
    "ز"
   ]
  },
  {
   "id": "H4",
   "unit": "harfler",
   "title": "Harfler 4: Sin, Şın, Sad, Dad",
   "explain": "س ve ش dişli harflerdir (ش üstünde üç nokta). ص ve ض kalın harflerdir: ağzı dolgun açarak oku.",
   "kind": "letters",
   "letters": [
    "س",
    "ش",
    "ص",
    "ض"
   ]
  },
  {
   "id": "H5",
   "unit": "harfler",
   "title": "Harfler 5: Tı, Zı, Ayn, Ğayın",
   "explain": "ط ve ظ kalın harflerdir. ع ve غ boğaz harfleridir; ع Türkçede hiç yoktur, kulakla öğrenilir.",
   "kind": "letters",
   "letters": [
    "ط",
    "ظ",
    "ع",
    "غ"
   ]
  },
  {
   "id": "H6",
   "unit": "harfler",
   "title": "Harfler 6: Fe, Kaf, Kef, Lam",
   "explain": "ف üstünde bir, ق üstünde iki nokta taşır; ق kalın okunur. ك ince k'dir. ل en sık geçen harflerdendir (ال takısı).",
   "kind": "letters",
   "letters": [
    "ف",
    "ق",
    "ك",
    "ل"
   ]
  },
  {
   "id": "H7",
   "unit": "harfler",
   "title": "Harfler 7: Mim, Nun, He, Vav, Ye",
   "explain": "م, ن, ه ve iki \"yarı ünlü\" harf: و ve ي. Bunlar harekesiz gelince uzatma (med) harfi olur.",
   "kind": "letters",
   "letters": [
    "م",
    "ن",
    "ه",
    "و",
    "ي"
   ]
  },
  {
   "id": "H8",
   "unit": "harfler",
   "title": "Harfler 8: Hemze",
   "explain": "Hemze (ء) kısa bir gırtlak duruşudur. Çoğunlukla elif (أ إ), vav (ؤ) veya ye (ئ) üzerinde yazılır; bazen tek başına durur.",
   "kind": "letters",
   "letters": [
    "ء"
   ]
  },
  {
   "id": "B1",
   "unit": "harfler",
   "title": "Bitişik yazım: harflerin şekilleri",
   "kind": "forms",
   "explain": "Arapça el yazısı gibi bitişik yazılır. Harfin kelimenin başında, ortasında ve sonunda farklı görünen şekilleri vardır. ا د ذ ر ز و harfleri kendinden sonrakine bağlanmaz; bu yüzden onlardan sonra kelime içinde boşluk varmış gibi görünür.",
   "items": [
    {
     "ar": "الْحَمْدُ",
     "tr": "el-hamdu",
     "ref": "1:2",
     "audio": [
      1,
      2,
      1
     ],
     "ayah": 2,
     "note": "ح ortada bağlı şekliyle yazılmış"
    },
    {
     "ar": "قُلْ",
     "tr": "kul",
     "ref": "112:1",
     "audio": [
      112,
      1,
      1
     ],
     "ayah": 6222
    },
    {
     "ar": "يَوْمِ",
     "tr": "yevmi",
     "ref": "1:4",
     "audio": [
      1,
      4,
      2
     ],
     "ayah": 4
    },
    {
     "ar": "نَعْبُدُ",
     "tr": "na'budu",
     "ref": "1:5",
     "audio": [
      1,
      5,
      2
     ],
     "ayah": 5,
     "note": "ع ortada küçülür"
    },
    {
     "ar": "رَبِّ",
     "tr": "rabbi",
     "ref": "1:2",
     "audio": [
      1,
      2,
      3
     ],
     "ayah": 2,
     "note": "ر kendinden sonrakine bağlanmaz"
    },
    {
     "ar": "الدِّينِ",
     "tr": "ed-dîni",
     "ref": "1:4",
     "audio": [
      1,
      4,
      3
     ],
     "ayah": 4,
     "note": "د bağlanmaz"
    }
   ]
  },
  {
   "id": "K1",
   "unit": "harekeler",
   "title": "Harekeler: üstün, esre, ötre",
   "kind": "syllables",
   "explain": "Harekeler harflerin üstüne/altına konan kısa ünlü işaretleridir. Üstün (ـَ) \"e\" veya kalın harflerde \"a\"; esre (ـِ) \"i\" veya kalın harflerde \"ı\"; ötre (ـُ) \"u\" sesi verir. Kalın harfler: خ ص ض غ ط ق ظ (ر de üstün/ötreyle kalınlaşır).",
   "items": [
    {
     "ar": "بَ",
     "tr": "be"
    },
    {
     "ar": "بِ",
     "tr": "bi"
    },
    {
     "ar": "بُ",
     "tr": "bu"
    },
    {
     "ar": "تَ",
     "tr": "te"
    },
    {
     "ar": "سِ",
     "tr": "si"
    },
    {
     "ar": "نُ",
     "tr": "nu"
    },
    {
     "ar": "قَ",
     "tr": "ka",
     "note": "kalın harf: a"
    },
    {
     "ar": "صِ",
     "tr": "sı",
     "note": "kalın harf: ı"
    },
    {
     "ar": "طُ",
     "tr": "tu"
    },
    {
     "ar": "خَ",
     "tr": "ha",
     "note": "kalın, hırıltılı"
    },
    {
     "ar": "رَ",
     "tr": "ra",
     "note": "ر üstünle kalın"
    },
    {
     "ar": "عَ",
     "tr": "'a"
    },
    {
     "ar": "تَبَّتْ",
     "tr": "tebbet",
     "ref": "111:1",
     "audio": [
      111,
      1,
      1
     ],
     "ayah": 6217
    },
    {
     "ar": "خَلَقَ",
     "tr": "halaka",
     "ref": "113:2",
     "audio": [
      113,
      2,
      4
     ],
     "ayah": 6227,
     "note": "üç harf, üç üstün: ha-la-ka"
    }
   ]
  },
  {
   "id": "K2",
   "unit": "harekeler",
   "title": "Sükun (cezm): harekesiz harf",
   "kind": "syllables",
   "explain": "Sükun (ـْ) harfin harekesiz olduğunu gösterir; harf önceki heceye eklenerek kapalı hece oluşur: مِنْ = min, لَمْ = lem.",
   "items": [
    {
     "ar": "أَبْ",
     "tr": "eb"
    },
    {
     "ar": "مِنْ",
     "tr": "min"
    },
    {
     "ar": "لَمْ",
     "tr": "lem"
    },
    {
     "ar": "قُلْ",
     "tr": "kul"
    },
    {
     "ar": "عَنْ",
     "tr": "'an"
    },
    {
     "ar": "قُلْ",
     "tr": "kul",
     "ref": "112:1",
     "audio": [
      112,
      1,
      1
     ],
     "ayah": 6222
    },
    {
     "ar": "الْحَمْدُ",
     "tr": "el-hamdu",
     "ref": "1:2",
     "audio": [
      1,
      2,
      1
     ],
     "ayah": 2,
     "note": "لْ ve مْ sakin"
    },
    {
     "ar": "نَعْبُدُ",
     "tr": "na'budu",
     "ref": "1:5",
     "audio": [
      1,
      5,
      2
     ],
     "ayah": 5,
     "note": "عْ sakin"
    }
   ]
  },
  {
   "id": "K3",
   "unit": "harekeler",
   "title": "Uzatma (med) harfleri",
   "kind": "syllables",
   "explain": "Üstünden sonra harekesiz elif (ـَا), esreden sonra harekesiz ye (ـِي), ötreden sonra harekesiz vav (ـُو) gelirse ses iki hareke boyu uzatılır: بَا = bâ, بِي = bî, بُو = bû. Uzatmayı kısaltmak anlamı değiştirebilir.",
   "items": [
    {
     "ar": "بَا",
     "tr": "bâ"
    },
    {
     "ar": "بِي",
     "tr": "bî"
    },
    {
     "ar": "بُو",
     "tr": "bû"
    },
    {
     "ar": "قَا",
     "tr": "kâ"
    },
    {
     "ar": "فِي",
     "tr": "fî"
    },
    {
     "ar": "نُو",
     "tr": "nû"
    },
    {
     "ar": "مَالِكِ",
     "tr": "mâliki",
     "ref": "1:4",
     "audio": [
      1,
      4,
      1
     ],
     "ayah": 4,
     "note": "مَا uzun"
    },
    {
     "ar": "فِي",
     "tr": "fî",
     "ref": "113:4",
     "audio": [
      113,
      4,
      4
     ],
     "ayah": 6229
    },
    {
     "ar": "هُوَ",
     "tr": "huve",
     "ref": "112:1",
     "audio": [
      112,
      1,
      2
     ],
     "ayah": 6222,
     "note": "dikkat: burada vav harekeli, uzatma yok"
    },
    {
     "ar": "جَاءَ",
     "tr": "câe",
     "ref": "110:1",
     "audio": [
      110,
      1,
      2
     ],
     "ayah": 6214
    }
   ]
  },
  {
   "id": "K4",
   "unit": "harekeler",
   "title": "Şedde: çift harf",
   "kind": "syllables",
   "explain": "Şedde (ـّ) harfin iki kez okunduğunu gösterir: ilki sakin, ikincisi harekeli. رَبِّ = rab-bi, إِنَّ = in-ne. Şeddeyi atlamak en sık yapılan okuma hatasıdır.",
   "items": [
    {
     "ar": "رَبِّ",
     "tr": "rabbi"
    },
    {
     "ar": "إِنَّ",
     "tr": "inne"
    },
    {
     "ar": "ثُمَّ",
     "tr": "summe"
    },
    {
     "ar": "رَبِّ",
     "tr": "rabbi",
     "ref": "1:2",
     "audio": [
      1,
      2,
      3
     ],
     "ayah": 2
    },
    {
     "ar": "تَبَّتْ",
     "tr": "tebbet",
     "ref": "111:1",
     "audio": [
      111,
      1,
      1
     ],
     "ayah": 6217
    },
    {
     "ar": "ثُمَّ",
     "tr": "summe",
     "ref": "102:4",
     "audio": [
      102,
      4,
      1
     ],
     "ayah": 6172
    },
    {
     "ar": "سِجِّيلٍ",
     "tr": "siccîlin",
     "ref": "105:4",
     "audio": [
      105,
      4,
      4
     ],
     "ayah": 6192
    }
   ]
  },
  {
   "id": "K5",
   "unit": "harekeler",
   "title": "Tenvin: çift hareke",
   "kind": "syllables",
   "explain": "Kelime sonundaki çift hareke (ـً ـٍ ـٌ) okunurken sonuna \"n\" eklenir: ـً = en/an, ـٍ = in, ـٌ = un. أَحَدٌ = ehadun. Üstün tenvinde genellikle bir elif de yazılır (ـًا) ama okunmaz.",
   "items": [
    {
     "ar": "بًا",
     "tr": "ben"
    },
    {
     "ar": "بٍ",
     "tr": "bin"
    },
    {
     "ar": "بٌ",
     "tr": "bun"
    },
    {
     "ar": "أَحَدٌ",
     "tr": "ehadun",
     "ref": "112:1",
     "audio": [
      112,
      1,
      4
     ],
     "ayah": 6222
    },
    {
     "ar": "طَيْرًا",
     "tr": "tayran",
     "ref": "105:3",
     "audio": [
      105,
      3,
      3
     ],
     "ayah": 6191
    },
    {
     "ar": "حَاسِدٍ",
     "tr": "hâsidin",
     "ref": "113:5",
     "audio": [
      113,
      5,
      3
     ],
     "ayah": 6230
    },
    {
     "ar": "كُفُوًا",
     "tr": "kufuven",
     "ref": "112:4",
     "audio": [
      112,
      4,
      4
     ],
     "ayah": 6225
    }
   ]
  },
  {
   "id": "K6",
   "unit": "harekeler",
   "title": "El- takısı: ay ve güneş harfleri",
   "kind": "syllables",
   "explain": "ال takısındaki lam, ay (kameri) harflerinden önce okunur: الْحَمْدُ = el-hamdu. Güneş (şemsi) harflerinden önce okunmaz ve sonraki harf şeddeli okunur: الرَّحْمَنِ = er-rahmâni, الشَّمْسِ = eş-şemsi. Güneş harfleri: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.",
   "items": [
    {
     "ar": "الْحَمْدُ",
     "tr": "el-hamdu",
     "ref": "1:2",
     "audio": [
      1,
      2,
      1
     ],
     "ayah": 2,
     "note": "kameri: lam okunur"
    },
    {
     "ar": "الْعَالَمِينَ",
     "tr": "el-'âlemîne",
     "ref": "1:2",
     "audio": [
      1,
      2,
      4
     ],
     "ayah": 2,
     "note": "kameri"
    },
    {
     "ar": "وَالْعَصْرِ",
     "tr": "ve'l-'asri",
     "ref": "103:1",
     "audio": [
      103,
      1,
      1
     ],
     "ayah": 6177,
     "note": "kameri"
    },
    {
     "ar": "الرَّحْمَنِ",
     "tr": "er-rahmâni",
     "ref": "1:3",
     "audio": [
      1,
      3,
      1
     ],
     "ayah": 3,
     "note": "şemsi: lam okunmaz"
    },
    {
     "ar": "الدِّينِ",
     "tr": "ed-dîni",
     "ref": "1:4",
     "audio": [
      1,
      4,
      3
     ],
     "ayah": 4,
     "note": "şemsi"
    },
    {
     "ar": "النَّاسِ",
     "tr": "en-nâsi",
     "ref": "114:1",
     "audio": [
      114,
      1,
      4
     ],
     "ayah": 6231,
     "note": "şemsi"
    },
    {
     "ar": "وَالشَّمْسِ",
     "tr": "ve'ş-şemsi",
     "ref": "91:1",
     "audio": [
      91,
      1,
      1
     ],
     "ayah": 6044,
     "note": "şemsi"
    }
   ]
  },
  {
   "id": "K7",
   "unit": "harekeler",
   "title": "Özel yazımlar: küçük elif ve vasl hemzesi",
   "kind": "syllables",
   "explain": "Mushafta bazı kelimelerde uzatma harfi küçük bir elifle (ـٰ) gösterilir ve uzatılarak okunur: الرَّحْمَٰنِ = er-rahmâni, ذَٰلِكَ = zâlike. Kelime başındaki ٱ (vasl hemzesi) cümle ortasında okunmaz, önceki kelimeye bağlanılır: بِسْمِ ٱللَّهِ = bismillâhi. اللَّه kelimesindeki lam üstün veya ötreden sonra kalın (Allâh), esreden sonra ince (lillâh) okunur.",
   "items": [
    {
     "ar": "بِسْمِ اللَّهِ",
     "tr": "bismillâhi",
     "ref": "1:1",
     "audio": null,
     "ayah": 1,
     "note": "vasl: elif okunmaz"
    },
    {
     "ar": "ذَلِكَ",
     "tr": "zâlike",
     "ref": "2:2",
     "audio": [
      2,
      2,
      1
     ],
     "ayah": 9,
     "note": "küçük elifle uzatılır"
    },
    {
     "ar": "الرَّحْمَنِ",
     "tr": "er-rahmâni",
     "ref": "1:3",
     "audio": [
      1,
      3,
      1
     ],
     "ayah": 3
    },
    {
     "ar": "اللَّهُ",
     "tr": "allâhu",
     "ref": "112:2",
     "audio": [
      112,
      2,
      1
     ],
     "ayah": 6223,
     "note": "lafzatullah kalın"
    },
    {
     "ar": "لِلَّهِ",
     "tr": "lillâhi",
     "ref": "1:2",
     "audio": [
      1,
      2,
      2
     ],
     "ayah": 2,
     "note": "esreden sonra ince"
    }
   ]
  },
  {
   "id": "T1",
   "unit": "tecvid",
   "title": "Tecvid: med (uzatma) çeşitleri",
   "kind": "rules",
   "rules": [
    "Med-i tabii",
    "Med-i muttasıl",
    "Med-i munfasıl",
    "Med-i lâzım"
   ],
   "explain": "Uzatma harfinden sonra ne geldiğine göre uzatma süresi değişir. Med-i tabii: sonrasında hemze veya sükun yoksa 2 hareke (normal uzatma). Med-i muttasıl: aynı kelimede hemze gelirse 4–5 hareke (جَاءَ). Med-i munfasıl: sonraki kelime hemzeyle başlarsa 4–5 hareke (مَا أَدْرَاكَ). Med-i lâzım: şeddeli harf gelirse 6 hareke (الضَّالِّينَ). Mushafta uzun med üzerinde dalgalı işaret (~) bulunur.",
   "items": [
    {
     "ar": "مَالِكِ",
     "tr": "mâliki",
     "ref": "1:4",
     "audio": [
      1,
      4,
      1
     ],
     "ayah": 4,
     "rule": "Med-i tabii"
    },
    {
     "ar": "صِرَاطَ",
     "tr": "sırâta",
     "ref": "1:7",
     "audio": [
      1,
      7,
      1
     ],
     "ayah": 7,
     "rule": "Med-i tabii"
    },
    {
     "ar": "جَاءَ",
     "tr": "câe",
     "ref": "110:1",
     "audio": [
      110,
      1,
      2
     ],
     "ayah": 6214,
     "note": "aynı kelimede hemze",
     "rule": "Med-i muttasıl"
    },
    {
     "ar": "السُّفَهَاءُ",
     "tr": "es-sufehâu",
     "ref": "2:13",
     "audio": [
      2,
      13,
      12
     ],
     "ayah": 20,
     "rule": "Med-i muttasıl"
    },
    {
     "ar": "وَمَا أَدْرَاكَ",
     "tr": "ve mâ edrâke",
     "ref": "101:3",
     "audio": null,
     "ayah": 6160,
     "note": "iki kelime arası",
     "rule": "Med-i munfasıl"
    },
    {
     "ar": "هُوَ اللَّهُ",
     "tr": "huvallâhu",
     "ref": "112:1",
     "audio": null,
     "ayah": 6222,
     "rule": "Med-i tabii"
    },
    {
     "ar": "الضَّالِّينَ",
     "tr": "ved-dâllîn",
     "ref": "1:7",
     "audio": [
      1,
      7,
      9
     ],
     "ayah": 7,
     "note": "şeddeli lamdan önce",
     "rule": "Med-i lâzım"
    },
    {
     "ar": "الصَّاخَّةُ",
     "tr": "es-sâhhatu",
     "ref": "80:33",
     "audio": [
      80,
      33,
      3
     ],
     "ayah": 5791,
     "rule": "Med-i lâzım"
    }
   ]
  },
  {
   "id": "T2",
   "unit": "tecvid",
   "title": "Tecvid: nun sakin ve tenvin",
   "kind": "rules",
   "rules": [
    "İzhar",
    "İdğam",
    "İklab",
    "İhfa"
   ],
   "explain": "Sakin nun (نْ) veya tenvinden sonra gelen harfe göre dört okunuş vardır. İzhar: boğaz harflerinden (ء ه ع ح غ خ) önce n açıkça okunur. İdğam: ي ر م ل و ن harflerinden önce n sonraki harfe katılır (ي م و ن ile genizden). İklab: ب'den önce n, m'ye döner. İhfa: geri kalan 15 harften önce n genizden, gizlice okunur.",
   "items": [
    {
     "ar": "أَنْعَمْتَ",
     "tr": "en'amte",
     "ref": "1:7",
     "audio": [
      1,
      7,
      3
     ],
     "ayah": 7,
     "note": "نْ + ع (boğaz harfi)",
     "rule": "İzhar"
    },
    {
     "ar": "مِنَ الْجِنَّةِ",
     "tr": "minel-cinneti",
     "ref": "114:6",
     "audio": null,
     "ayah": 6236,
     "rule": "İzhar"
    },
    {
     "ar": "مِّن رَّبِّهِمْ",
     "tr": "mir-rabbihim",
     "ref": "2:5",
     "audio": null,
     "ayah": 12,
     "note": "n okunmaz, ر'ye katılır",
     "rule": "İdğam"
    },
    {
     "ar": "كُفُوًا أَحَدٌ",
     "tr": "kufuven ehad",
     "ref": "112:4",
     "audio": null,
     "ayah": 6225,
     "note": "tenvin + hemze",
     "rule": "İzhar"
    },
    {
     "ar": "لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ",
     "tr": "li-kulli humezetil-lumezeh",
     "ref": "104:1",
     "audio": null,
     "ayah": 6180,
     "note": "tenvin + ل",
     "rule": "İdğam"
    },
    {
     "ar": "بِحِجَارَةٍ مِّن",
     "tr": "bi-hicâratim-min",
     "ref": "105:4",
     "audio": null,
     "ayah": 6192,
     "note": "tenvin + م (genizden)",
     "rule": "İdğam"
    },
    {
     "ar": "مِنْ بَعْدِ",
     "tr": "mim-ba'di",
     "ref": "2:27",
     "audio": null,
     "ayah": 34,
     "note": "n → m",
     "rule": "İklab"
    },
    {
     "ar": "مِن شَرِّ",
     "tr": "min şerri",
     "ref": "113:2",
     "audio": null,
     "ayah": 6227,
     "note": "n genizden gizli",
     "rule": "İhfa"
    },
    {
     "ar": "مِن شَرِّ",
     "tr": "min şerri",
     "ref": "114:4",
     "audio": null,
     "ayah": 6234,
     "rule": "İhfa"
    },
    {
     "ar": "مِّن جُوعٍ",
     "tr": "min cû'",
     "ref": "106:4",
     "audio": null,
     "ayah": 6197,
     "note": "n + ج",
     "rule": "İhfa"
    },
    {
     "ar": "مِّنْ خَوْفٍ",
     "tr": "min havf",
     "ref": "106:4",
     "audio": null,
     "ayah": 6197,
     "note": "n + خ (boğaz harfi)",
     "rule": "İzhar"
    }
   ]
  },
  {
   "id": "T3",
   "unit": "tecvid",
   "title": "Tecvid: mim sakin",
   "kind": "rules",
   "rules": [
    "İhfa-i şefevî",
    "İdğam-ı misleyn",
    "İzhar-ı şefevî"
   ],
   "explain": "Sakin mim (مْ) üç şekilde okunur. İhfa-i şefevî: ب'den önce dudaklar hafif kapalı, genizden. İdğam-ı misleyn: م'den önce iki mim birleşir, genizden şeddeli okunur. İzhar-ı şefevî: diğer harflerden önce mim açıkça okunur (özellikle و ve ف önünde dikkat).",
   "items": [
    {
     "ar": "تَرْمِيهِم بِحِجَارَةٍ",
     "tr": "termîhim bi-hicâratin",
     "ref": "105:4",
     "audio": null,
     "ayah": 6192,
     "note": "مْ + ب",
     "rule": "İhfa-i şefevî"
    },
    {
     "ar": "أَطْعَمَهُم مِّن",
     "tr": "at'amehum-min",
     "ref": "106:4",
     "audio": null,
     "ayah": 6197,
     "note": "مْ + م",
     "rule": "İdğam-ı misleyn"
    },
    {
     "ar": "عَلَيْهِمْ وَلَا",
     "tr": "aleyhim velâ",
     "ref": "1:7",
     "audio": null,
     "ayah": 7,
     "note": "مْ + و: açık oku",
     "rule": "İzhar-ı şefevî"
    },
    {
     "ar": "أَنْعَمْتَ",
     "tr": "en'amte",
     "ref": "1:7",
     "audio": [
      1,
      7,
      3
     ],
     "ayah": 7,
     "note": "مْ + ت",
     "rule": "İzhar-ı şefevî"
    },
    {
     "ar": "فَجَعَلَهُمْ كَعَصْفٍ",
     "tr": "fe-ce'alehum ke-'asf",
     "ref": "105:5",
     "audio": null,
     "ayah": 6193,
     "rule": "İzhar-ı şefevî"
    }
   ]
  },
  {
   "id": "T4",
   "unit": "tecvid",
   "title": "Tecvid: kalkale",
   "kind": "rules",
   "rules": [
    "Kalkale",
    "Kalkale yok"
   ],
   "explain": "ق ط ب ج د harfleri (kısaltması: \"kutbu ced\") sakin olduğunda sesleri hafifçe sıçratılarak okunur. Ayet sonunda durulduğunda kalkale daha belirgindir: أَحَدْ, الْفَلَقْ.",
   "items": [
    {
     "ar": "أَحَدٌ",
     "tr": "ehad (durunca)",
     "ref": "112:1",
     "audio": [
      112,
      1,
      4
     ],
     "ayah": 6222,
     "note": "د sakin olunca sıçrar",
     "rule": "Kalkale"
    },
    {
     "ar": "الْفَلَقِ",
     "tr": "el-felak (durunca)",
     "ref": "113:1",
     "audio": [
      113,
      1,
      4
     ],
     "ayah": 6226,
     "note": "ق",
     "rule": "Kalkale"
    },
    {
     "ar": "لَهَبٍ",
     "tr": "leheb (durunca)",
     "ref": "111:1",
     "audio": [
      111,
      1,
      4
     ],
     "ayah": 6217,
     "note": "ب",
     "rule": "Kalkale"
    },
    {
     "ar": "يَلِدْ",
     "tr": "yelid",
     "ref": "112:3",
     "audio": [
      112,
      3,
      2
     ],
     "ayah": 6224,
     "note": "د sakin",
     "rule": "Kalkale"
    },
    {
     "ar": "وَقَبَ",
     "tr": "vekab (durunca)",
     "ref": "113:3",
     "audio": [
      113,
      3,
      5
     ],
     "ayah": 6228,
     "rule": "Kalkale"
    },
    {
     "ar": "قُلْ",
     "tr": "kul",
     "ref": "112:1",
     "audio": [
      112,
      1,
      1
     ],
     "ayah": 6222,
     "note": "ق harekeli: kalkale yok",
     "rule": "Kalkale yok"
    },
    {
     "ar": "نَعْبُدُ",
     "tr": "na'budu",
     "ref": "1:5",
     "audio": [
      1,
      5,
      2
     ],
     "ayah": 5,
     "note": "ب harekeli",
     "rule": "Kalkale yok"
    }
   ]
  },
  {
   "id": "T5",
   "unit": "tecvid",
   "title": "Tecvid: kalın ve ince okuma",
   "kind": "rules",
   "rules": [
    "Kalın",
    "İnce"
   ],
   "explain": "خ ص ض غ ط ق ظ harfleri her zaman kalın okunur. ر üstün veya ötreli iken kalın, esreli iken incedir. اللَّه lafzındaki lam önündeki harf üstün veya ötreli ise kalın (Allâh), esreli ise incedir (lillâh, bismillâh).",
   "items": [
    {
     "ar": "رَبِّ",
     "tr": "rabbi",
     "ref": "1:2",
     "audio": [
      1,
      2,
      3
     ],
     "ayah": 2,
     "note": "ر üstünlü",
     "rule": "Kalın"
    },
    {
     "ar": "صِرَاطَ",
     "tr": "sırâta",
     "ref": "1:7",
     "audio": [
      1,
      7,
      1
     ],
     "ayah": 7,
     "note": "ص kalın; ر esreli ince",
     "rule": "Kalın"
    },
    {
     "ar": "غَيْرِ",
     "tr": "ğayri",
     "ref": "1:7",
     "audio": [
      1,
      7,
      5
     ],
     "ayah": 7,
     "note": "غ kalın",
     "rule": "Kalın"
    },
    {
     "ar": "لِلَّهِ",
     "tr": "lillâhi",
     "ref": "1:2",
     "audio": [
      1,
      2,
      2
     ],
     "ayah": 2,
     "note": "lafzatullah esreden sonra",
     "rule": "İnce"
    },
    {
     "ar": "اللَّهُ",
     "tr": "allâhu",
     "ref": "112:2",
     "audio": [
      112,
      2,
      1
     ],
     "ayah": 6223,
     "note": "cümle başında: kalın",
     "rule": "Kalın"
    },
    {
     "ar": "بِرَبِّ",
     "tr": "bi-rabbi",
     "ref": "113:1",
     "audio": [
      113,
      1,
      3
     ],
     "ayah": 6226,
     "note": "ر üstünlü",
     "rule": "Kalın"
    },
    {
     "ar": "الدِّينِ",
     "tr": "ed-dîni",
     "ref": "1:4",
     "audio": [
      1,
      4,
      3
     ],
     "ayah": 4,
     "note": "د ince harf",
     "rule": "İnce"
    }
   ]
  },
  {
   "id": "T6",
   "unit": "tecvid",
   "title": "Vakıf: ayet sonunda durmak",
   "kind": "rules",
   "rules": [
    "Sakin okunur",
    "Elif okunur",
    "He okunur"
   ],
   "explain": "Ayet sonunda veya bir yerde durulduğunda son harfin harekesi okunmaz, harf sakin okunur: الْعَالَمِينَ → el-âlemîn. Üstün tenvinde durulursa tenvin uzun \"a\"ya döner: أَفْوَاجًا → efvâcâ. Yuvarlak te (ة) ile biten kelimede durulursa \"h\" okunur: الْقَارِعَةُ → el-kâri'ah.",
   "items": [
    {
     "ar": "الْعَالَمِينَ",
     "tr": "el-'âlemîn",
     "ref": "1:2",
     "audio": [
      1,
      2,
      4
     ],
     "ayah": 2,
     "note": "son hareke düşer",
     "rule": "Sakin okunur"
    },
    {
     "ar": "الدِّينِ",
     "tr": "ed-dîn",
     "ref": "1:4",
     "audio": [
      1,
      4,
      3
     ],
     "ayah": 4,
     "rule": "Sakin okunur"
    },
    {
     "ar": "أَفْوَاجًا",
     "tr": "efvâcâ",
     "ref": "110:2",
     "audio": [
      110,
      2,
      7
     ],
     "ayah": 6215,
     "note": "üstün tenvin → â",
     "rule": "Elif okunur"
    },
    {
     "ar": "ضَبْحًا",
     "tr": "dabhâ",
     "ref": "100:1",
     "audio": [
      100,
      1,
      2
     ],
     "ayah": 6147,
     "rule": "Elif okunur"
    },
    {
     "ar": "الْقَارِعَةُ",
     "tr": "el-kâri'ah",
     "ref": "101:1",
     "audio": [
      101,
      1,
      1
     ],
     "ayah": 6158,
     "note": "ة → h",
     "rule": "He okunur"
    },
    {
     "ar": "لُّمَزَةٍ",
     "tr": "lumezeh",
     "ref": "104:1",
     "audio": [
      104,
      1,
      4
     ],
     "ayah": 6180,
     "rule": "He okunur"
    }
   ]
  },
  {
   "id": "P1",
   "unit": "pratik",
   "title": "Okuma pratiği: Fatiha suresi",
   "kind": "surah",
   "surah": 1,
   "explain": "Fatiha suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
     "ayah": 1,
     "words": [
      "بِسْمِ",
      "اللَّهِ",
      "الرَّحْمَنِ",
      "الرَّحِيمِ"
     ]
    },
    {
     "n": 2,
     "ar": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
     "ayah": 2,
     "words": [
      "الْحَمْدُ",
      "لِلَّهِ",
      "رَبِّ",
      "الْعَالَمِينَ"
     ]
    },
    {
     "n": 3,
     "ar": "الرَّحْمَنِ الرَّحِيمِ",
     "ayah": 3,
     "words": [
      "الرَّحْمَنِ",
      "الرَّحِيمِ"
     ]
    },
    {
     "n": 4,
     "ar": "مَالِكِ يَوْمِ الدِّينِ",
     "ayah": 4,
     "words": [
      "مَالِكِ",
      "يَوْمِ",
      "الدِّينِ"
     ]
    },
    {
     "n": 5,
     "ar": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
     "ayah": 5,
     "words": [
      "إِيَّاكَ",
      "نَعْبُدُ",
      "وَإِيَّاكَ",
      "نَسْتَعِينُ"
     ]
    },
    {
     "n": 6,
     "ar": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
     "ayah": 6,
     "words": [
      "اهْدِنَا",
      "الصِّرَاطَ",
      "الْمُسْتَقِيمَ"
     ]
    },
    {
     "n": 7,
     "ar": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
     "ayah": 7,
     "words": [
      "صِرَاطَ",
      "الَّذِينَ",
      "أَنْعَمْتَ",
      "عَلَيْهِمْ",
      "غَيْرِ",
      "الْمَغْضُوبِ",
      "عَلَيْهِمْ",
      "وَلَا",
      "الضَّالِّينَ"
     ]
    }
   ]
  },
  {
   "id": "P112",
   "unit": "pratik",
   "title": "Okuma pratiği: İhlas suresi",
   "kind": "surah",
   "surah": 112,
   "explain": "İhlas suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "قُلْ هُوَ اللَّهُ أَحَدٌ",
     "ayah": 6222,
     "words": [
      "قُلْ",
      "هُوَ",
      "اللَّهُ",
      "أَحَدٌ"
     ]
    },
    {
     "n": 2,
     "ar": "اللَّهُ الصَّمَدُ",
     "ayah": 6223,
     "words": [
      "اللَّهُ",
      "الصَّمَدُ"
     ]
    },
    {
     "n": 3,
     "ar": "لَمْ يَلِدْ وَلَمْ يُولَدْ",
     "ayah": 6224,
     "words": [
      "لَمْ",
      "يَلِدْ",
      "وَلَمْ",
      "يُولَدْ"
     ]
    },
    {
     "n": 4,
     "ar": "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
     "ayah": 6225,
     "words": [
      "وَلَمْ",
      "يَكُن",
      "لَّهُ",
      "كُفُوًا",
      "أَحَدٌ"
     ]
    }
   ]
  },
  {
   "id": "P113",
   "unit": "pratik",
   "title": "Okuma pratiği: Felak suresi",
   "kind": "surah",
   "surah": 113,
   "explain": "Felak suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
     "ayah": 6226,
     "words": [
      "قُلْ",
      "أَعُوذُ",
      "بِرَبِّ",
      "الْفَلَقِ"
     ]
    },
    {
     "n": 2,
     "ar": "مِن شَرِّ مَا خَلَقَ",
     "ayah": 6227,
     "words": [
      "مِن",
      "شَرِّ",
      "مَا",
      "خَلَقَ"
     ]
    },
    {
     "n": 3,
     "ar": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
     "ayah": 6228,
     "words": [
      "وَمِن",
      "شَرِّ",
      "غَاسِقٍ",
      "إِذَا",
      "وَقَبَ"
     ]
    },
    {
     "n": 4,
     "ar": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
     "ayah": 6229,
     "words": [
      "وَمِن",
      "شَرِّ",
      "النَّفَّاثَاتِ",
      "فِي",
      "الْعُقَدِ"
     ]
    },
    {
     "n": 5,
     "ar": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
     "ayah": 6230,
     "words": [
      "وَمِن",
      "شَرِّ",
      "حَاسِدٍ",
      "إِذَا",
      "حَسَدَ"
     ]
    }
   ]
  },
  {
   "id": "P114",
   "unit": "pratik",
   "title": "Okuma pratiği: Nas suresi",
   "kind": "surah",
   "surah": 114,
   "explain": "Nas suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
     "ayah": 6231,
     "words": [
      "قُلْ",
      "أَعُوذُ",
      "بِرَبِّ",
      "النَّاسِ"
     ]
    },
    {
     "n": 2,
     "ar": "مَلِكِ النَّاسِ",
     "ayah": 6232,
     "words": [
      "مَلِكِ",
      "النَّاسِ"
     ]
    },
    {
     "n": 3,
     "ar": "إِلَهِ النَّاسِ",
     "ayah": 6233,
     "words": [
      "إِلَهِ",
      "النَّاسِ"
     ]
    },
    {
     "n": 4,
     "ar": "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
     "ayah": 6234,
     "words": [
      "مِن",
      "شَرِّ",
      "الْوَسْوَاسِ",
      "الْخَنَّاسِ"
     ]
    },
    {
     "n": 5,
     "ar": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
     "ayah": 6235,
     "words": [
      "الَّذِي",
      "يُوَسْوِسُ",
      "فِي",
      "صُدُورِ",
      "النَّاسِ"
     ]
    },
    {
     "n": 6,
     "ar": "مِنَ الْجِنَّةِ وَالنَّاسِ",
     "ayah": 6236,
     "words": [
      "مِنَ",
      "الْجِنَّةِ",
      "وَالنَّاسِ"
     ]
    }
   ]
  },
  {
   "id": "P108",
   "unit": "pratik",
   "title": "Okuma pratiği: Kevser suresi",
   "kind": "surah",
   "surah": 108,
   "explain": "Kevser suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
     "ayah": 6205,
     "words": [
      "إِنَّا",
      "أَعْطَيْنَاكَ",
      "الْكَوْثَرَ"
     ]
    },
    {
     "n": 2,
     "ar": "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
     "ayah": 6206,
     "words": [
      "فَصَلِّ",
      "لِرَبِّكَ",
      "وَانْحَرْ"
     ]
    },
    {
     "n": 3,
     "ar": "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
     "ayah": 6207,
     "words": [
      "إِنَّ",
      "شَانِئَكَ",
      "هُوَ",
      "الْأَبْتَرُ"
     ]
    }
   ]
  },
  {
   "id": "P103",
   "unit": "pratik",
   "title": "Okuma pratiği: Asr suresi",
   "kind": "surah",
   "surah": 103,
   "explain": "Asr suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "وَالْعَصْرِ",
     "ayah": 6177,
     "words": [
      "وَالْعَصْرِ"
     ]
    },
    {
     "n": 2,
     "ar": "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
     "ayah": 6178,
     "words": [
      "إِنَّ",
      "الْإِنسَانَ",
      "لَفِي",
      "خُسْرٍ"
     ]
    },
    {
     "n": 3,
     "ar": "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
     "ayah": 6179,
     "words": [
      "إِلَّا",
      "الَّذِينَ",
      "آمَنُوا",
      "وَعَمِلُوا",
      "الصَّالِحَاتِ",
      "وَتَوَاصَوْا",
      "بِالْحَقِّ",
      "وَتَوَاصَوْا",
      "بِالصَّبْرِ"
     ]
    }
   ]
  },
  {
   "id": "P110",
   "unit": "pratik",
   "title": "Okuma pratiği: Nasr suresi",
   "kind": "surah",
   "surah": 110,
   "explain": "Nasr suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
     "ayah": 6214,
     "words": [
      "إِذَا",
      "جَاءَ",
      "نَصْرُ",
      "اللَّهِ",
      "وَالْفَتْحُ"
     ]
    },
    {
     "n": 2,
     "ar": "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
     "ayah": 6215,
     "words": [
      "وَرَأَيْتَ",
      "النَّاسَ",
      "يَدْخُلُونَ",
      "فِي",
      "دِينِ",
      "اللَّهِ",
      "أَفْوَاجًا"
     ]
    },
    {
     "n": 3,
     "ar": "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا",
     "ayah": 6216,
     "words": [
      "فَسَبِّحْ",
      "بِحَمْدِ",
      "رَبِّكَ",
      "وَاسْتَغْفِرْهُ",
      "إِنَّهُ",
      "كَانَ",
      "تَوَّابًا"
     ]
    }
   ]
  },
  {
   "id": "P111",
   "unit": "pratik",
   "title": "Okuma pratiği: Tebbet suresi",
   "kind": "surah",
   "surah": 111,
   "explain": "Tebbet suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
     "ayah": 6217,
     "words": [
      "تَبَّتْ",
      "يَدَا",
      "أَبِي",
      "لَهَبٍ",
      "وَتَبَّ"
     ]
    },
    {
     "n": 2,
     "ar": "مَا أَغْنَى عَنْهُ مَالُهُ وَمَا كَسَبَ",
     "ayah": 6218,
     "words": [
      "مَا",
      "أَغْنَى",
      "عَنْهُ",
      "مَالُهُ",
      "وَمَا",
      "كَسَبَ"
     ]
    },
    {
     "n": 3,
     "ar": "سَيَصْلَى نَارًا ذَاتَ لَهَبٍ",
     "ayah": 6219,
     "words": [
      "سَيَصْلَى",
      "نَارًا",
      "ذَاتَ",
      "لَهَبٍ"
     ]
    },
    {
     "n": 4,
     "ar": "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ",
     "ayah": 6220,
     "words": [
      "وَامْرَأَتُهُ",
      "حَمَّالَةَ",
      "الْحَطَبِ"
     ]
    },
    {
     "n": 5,
     "ar": "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ",
     "ayah": 6221,
     "words": [
      "فِي",
      "جِيدِهَا",
      "حَبْلٌ",
      "مِّن",
      "مَّسَدٍ"
     ]
    }
   ]
  },
  {
   "id": "P109",
   "unit": "pratik",
   "title": "Okuma pratiği: Kâfirûn suresi",
   "kind": "surah",
   "surah": 109,
   "explain": "Kâfirûn suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "قُلْ يَا أَيُّهَا الْكَافِرُونَ",
     "ayah": 6208,
     "words": [
      "قُلْ",
      "يَا أَيُّهَا",
      "الْكَافِرُونَ"
     ]
    },
    {
     "n": 2,
     "ar": "لَا أَعْبُدُ مَا تَعْبُدُونَ",
     "ayah": 6209,
     "words": [
      "لَا",
      "أَعْبُدُ",
      "مَا",
      "تَعْبُدُونَ"
     ]
    },
    {
     "n": 3,
     "ar": "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
     "ayah": 6210,
     "words": [
      "وَلَا",
      "أَنتُمْ",
      "عَابِدُونَ",
      "مَا",
      "أَعْبُدُ"
     ]
    },
    {
     "n": 4,
     "ar": "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ",
     "ayah": 6211,
     "words": [
      "وَلَا",
      "أَنَا",
      "عَابِدٌ",
      "مَّا",
      "عَبَدتُّمْ"
     ]
    },
    {
     "n": 5,
     "ar": "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
     "ayah": 6212,
     "words": [
      "وَلَا",
      "أَنتُمْ",
      "عَابِدُونَ",
      "مَا",
      "أَعْبُدُ"
     ]
    },
    {
     "n": 6,
     "ar": "لَكُمْ دِينُكُمْ وَلِيَ دِينِ",
     "ayah": 6213,
     "words": [
      "لَكُمْ",
      "دِينُكُمْ",
      "وَلِيَ",
      "دِينِ"
     ]
    }
   ]
  },
  {
   "id": "P106",
   "unit": "pratik",
   "title": "Okuma pratiği: Kureyş suresi",
   "kind": "surah",
   "surah": 106,
   "explain": "Kureyş suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "لِإِيلَافِ قُرَيْشٍ",
     "ayah": 6194,
     "words": [
      "لِإِيلَافِ",
      "قُرَيْشٍ"
     ]
    },
    {
     "n": 2,
     "ar": "إِلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",
     "ayah": 6195,
     "words": [
      "إِلَافِهِمْ",
      "رِحْلَةَ",
      "الشِّتَاءِ",
      "وَالصَّيْفِ"
     ]
    },
    {
     "n": 3,
     "ar": "فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ",
     "ayah": 6196,
     "words": [
      "فَلْيَعْبُدُوا",
      "رَبَّ",
      "هَذَا",
      "الْبَيْتِ"
     ]
    },
    {
     "n": 4,
     "ar": "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
     "ayah": 6197,
     "words": [
      "الَّذِي",
      "أَطْعَمَهُم",
      "مِّن",
      "جُوعٍ",
      "وَآمَنَهُم",
      "مِّنْ",
      "خَوْفٍ"
     ]
    }
   ]
  },
  {
   "id": "P105",
   "unit": "pratik",
   "title": "Okuma pratiği: Fîl suresi",
   "kind": "surah",
   "surah": 105,
   "explain": "Fîl suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ",
     "ayah": 6189,
     "words": [
      "أَلَمْ",
      "تَرَ",
      "كَيْفَ",
      "فَعَلَ",
      "رَبُّكَ",
      "بِأَصْحَابِ",
      "الْفِيلِ"
     ]
    },
    {
     "n": 2,
     "ar": "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ",
     "ayah": 6190,
     "words": [
      "أَلَمْ",
      "يَجْعَلْ",
      "كَيْدَهُمْ",
      "فِي",
      "تَضْلِيلٍ"
     ]
    },
    {
     "n": 3,
     "ar": "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ",
     "ayah": 6191,
     "words": [
      "وَأَرْسَلَ",
      "عَلَيْهِمْ",
      "طَيْرًا",
      "أَبَابِيلَ"
     ]
    },
    {
     "n": 4,
     "ar": "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ",
     "ayah": 6192,
     "words": [
      "تَرْمِيهِم",
      "بِحِجَارَةٍ",
      "مِّن",
      "سِجِّيلٍ"
     ]
    },
    {
     "n": 5,
     "ar": "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ",
     "ayah": 6193,
     "words": [
      "فَجَعَلَهُمْ",
      "كَعَصْفٍ",
      "مَّأْكُولٍ"
     ]
    }
   ]
  },
  {
   "id": "P107",
   "unit": "pratik",
   "title": "Okuma pratiği: Mâûn suresi",
   "kind": "surah",
   "surah": 107,
   "explain": "Mâûn suresini önce hafızdan ayet ayet dinle, sonra kendin oku. Bir kelimeye dokunursan o kelimeyi tek başına dinlersin. Zorlandığın ayeti tekrar et.",
   "verses": [
    {
     "n": 1,
     "ar": "أَرَءَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ",
     "ayah": 6198,
     "words": [
      "أَرَءَيْتَ",
      "الَّذِي",
      "يُكَذِّبُ",
      "بِالدِّينِ"
     ]
    },
    {
     "n": 2,
     "ar": "فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ",
     "ayah": 6199,
     "words": [
      "فَذَلِكَ",
      "الَّذِي",
      "يَدُعُّ",
      "الْيَتِيمَ"
     ]
    },
    {
     "n": 3,
     "ar": "وَلَا يَحُضُّ عَلَى طَعَامِ الْمِسْكِينِ",
     "ayah": 6200,
     "words": [
      "وَلَا",
      "يَحُضُّ",
      "عَلَى",
      "طَعَامِ",
      "الْمِسْكِينِ"
     ]
    },
    {
     "n": 4,
     "ar": "فَوَيْلٌ لِّلْمُصَلِّينَ",
     "ayah": 6201,
     "words": [
      "فَوَيْلٌ",
      "لِّلْمُصَلِّينَ"
     ]
    },
    {
     "n": 5,
     "ar": "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ",
     "ayah": 6202,
     "words": [
      "الَّذِينَ",
      "هُمْ",
      "عَن",
      "صَلَاتِهِمْ",
      "سَاهُونَ"
     ]
    },
    {
     "n": 6,
     "ar": "الَّذِينَ هُمْ يُرَاءُونَ",
     "ayah": 6203,
     "words": [
      "الَّذِينَ",
      "هُمْ",
      "يُرَاءُونَ"
     ]
    },
    {
     "n": 7,
     "ar": "وَيَمْنَعُونَ الْمَاعُونَ",
     "ayah": 6204,
     "words": [
      "وَيَمْنَعُونَ",
      "الْمَاعُونَ"
     ]
    }
   ]
  }
 ],
 "placement": [
  {
   "id": "p1",
   "lesson": "H1",
   "q": "Bu harf hangisi?",
   "ar": "ث",
   "options": [
    "Se (peltek s)",
    "Te",
    "Be",
    "Nun"
   ],
   "answer": "Se (peltek s)"
  },
  {
   "id": "p2",
   "lesson": "H2",
   "q": "Bu harf hangisi?",
   "ar": "خ",
   "options": [
    "Hı (hırıltılı h)",
    "Ha (boğazdan h)",
    "Cim",
    "Ğayın"
   ],
   "answer": "Hı (hırıltılı h)"
  },
  {
   "id": "p3",
   "lesson": "H5",
   "q": "Bu harf hangisi?",
   "ar": "ع",
   "options": [
    "Ayn",
    "Ğayın",
    "He",
    "Hemze"
   ],
   "answer": "Ayn"
  },
  {
   "id": "p4",
   "lesson": "K1",
   "q": "Nasıl okunur?",
   "ar": "بِ",
   "options": [
    "bi",
    "be",
    "bu",
    "ben"
   ],
   "answer": "bi"
  },
  {
   "id": "p5",
   "lesson": "K2",
   "q": "Nasıl okunur?",
   "ar": "مِنْ",
   "options": [
    "min",
    "mine",
    "mini",
    "mîn"
   ],
   "answer": "min"
  },
  {
   "id": "p6",
   "lesson": "K3",
   "q": "Nasıl okunur?",
   "ar": "فِي",
   "options": [
    "fî (uzun)",
    "fi (kısa)",
    "fe",
    "fiy"
   ],
   "answer": "fî (uzun)"
  },
  {
   "id": "p7",
   "lesson": "K4",
   "q": "Nasıl okunur?",
   "ar": "رَبِّ",
   "options": [
    "rabbi",
    "rabi",
    "rebî",
    "rubbi"
   ],
   "answer": "rabbi"
  },
  {
   "id": "p8",
   "lesson": "K5",
   "q": "Nasıl okunur?",
   "ar": "أَحَدٌ",
   "options": [
    "ehadun",
    "ehadu",
    "ehad",
    "ahadî"
   ],
   "answer": "ehadun"
  },
  {
   "id": "p9",
   "lesson": "K6",
   "q": "Nasıl okunur?",
   "ar": "الرَّحْمَنِ",
   "options": [
    "er-rahmâni",
    "el-rahmâni",
    "ar-rehmeni",
    "el-rahmen"
   ],
   "answer": "er-rahmâni"
  },
  {
   "id": "p10",
   "lesson": "T2",
   "q": "مِنْ شَرِّ ifadesinde sakin nun nasıl okunur?",
   "ar": "مِنْ شَرِّ",
   "options": [
    "Genizden gizli (ihfa)",
    "Açıkça (izhar)",
    "Okunmaz, katılır (idğam)",
    "m'ye döner (iklab)"
   ],
   "answer": "Genizden gizli (ihfa)"
  },
  {
   "id": "p11",
   "lesson": "T1",
   "q": "الضَّالِّينَ kelimesindeki uzatma ne kadardır?",
   "ar": "الضَّالِّينَ",
   "options": [
    "6 hareke (med-i lâzım)",
    "2 hareke",
    "Uzatma yok",
    "1 hareke"
   ],
   "answer": "6 hareke (med-i lâzım)"
  },
  {
   "id": "p12",
   "lesson": "T4",
   "q": "Hangi harf sakin olunca sıçratılarak (kalkale) okunur?",
   "ar": "ق ط ب ج د",
   "options": [
    "ق ط ب ج د",
    "س ش ص ض",
    "م ن",
    "ا و ي"
   ],
   "answer": "ق ط ب ج د"
  }
 ]
};

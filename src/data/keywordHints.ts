// Anahtar kelime yöntemi (Keyword Method)
// Her kelime için: sesinin Türkçe'de neyi çağrıştırdığı + o çağrışımı anlama bağlayan canlı sahne
// Türkçe'ye geçmiş Arapça kökenli kelimeler ayrıca işaretlendi (cognate: true)

export interface KeywordHint {
  emoji: string;
  phonetic: string;   // Türkçe okunuş
  bridge: string;     // Sesi çağrıştıran Türkçe kelime
  scene: string;      // Anlamı + sesi birleştiren canlı sahne (max ~12 kelime)
  cognate?: boolean;  // Türkçe'de zaten var!
}

export const keywordHints: Record<string, KeywordHint> = {

  // ══ Türkçe'de zaten var! (Arapça kökenli) ══════════════════════════════

  "اللَّه":         { emoji: "✨", phonetic: "Allah",     bridge: "Allah",    scene: "Türkçe'de de aynı — en merkezi isim.",                    cognate: true },
  "نُور":           { emoji: "💡", phonetic: "nûr",       bridge: "nur",      scene: "Türkçe'de de nur — ışık, aydınlık.",                      cognate: true },
  "عِلْم":          { emoji: "📚", phonetic: "ilm",       bridge: "ilim",     scene: "Türkçe'de de ilim — bilgi, öğrenme.",                     cognate: true },
  "رُوح":           { emoji: "💨", phonetic: "rûh",       bridge: "ruh",      scene: "Türkçe'de de ruh — can, öz benlik.",                      cognate: true },
  "نَفْس":          { emoji: "🫁", phonetic: "nefs",      bridge: "nefis",    scene: "Türkçe'de de nefis — can, benlik, iç ses.",               cognate: true },
  "قَلْب":          { emoji: "❤️", phonetic: "kalb",      bridge: "kalp",     scene: "Türkçe'de de kalp — yüreğin tam kendisi.",                cognate: true },
  "مَلَك":          { emoji: "👼", phonetic: "melek",     bridge: "melek",    scene: "Türkçe'de de melek — kanatlı, saf varlık.",               cognate: true },
  "كِتَاب":         { emoji: "📖", phonetic: "kitâb",     bridge: "kitap",    scene: "Türkçe'de de kitap — yazılı bilgi.",                      cognate: true },
  "صَبْر":          { emoji: "🧘", phonetic: "sabr",      bridge: "sabır",    scene: "Türkçe'de de sabır — beklemek, dayanmak.",                cognate: true },
  "حَقّ":           { emoji: "⚖️", phonetic: "hakk",      bridge: "hak",      scene: "Türkçe'de de hak — adalet, gerçek.",                     cognate: true },
  "غَيْب":          { emoji: "🌫️", phonetic: "gayb",      bridge: "gayb",     scene: "Türkçe'de de gayb — görünmez, bilinmez.",                 cognate: true },
  "شُكْر":          { emoji: "🙏", phonetic: "şükr",      bridge: "şükür",    scene: "Türkçe'de de şükür — teşekkür etmek.",                    cognate: true },
  "عَدْل":          { emoji: "⚖️", phonetic: "adl",       bridge: "adalet",   scene: "Türkçe'de de adalet — denge, eşitlik.",                   cognate: true },
  "آيَة":           { emoji: "📜", phonetic: "âye",       bridge: "ayet",     scene: "Türkçe'de de ayet — ilahi işaret.",                       cognate: true },
  "أُمَّة":          { emoji: "👥", phonetic: "umme",      bridge: "ümmet",    scene: "Türkçe'de de ümmet — birlikte yaşayan topluluk.",         cognate: true },
  "عِبَادَة":        { emoji: "🕌", phonetic: "ibâde",     bridge: "ibadet",   scene: "Türkçe'de de ibadet — kulluk, secde etmek.",              cognate: true },
  "تَوْبَة":         { emoji: "🔄", phonetic: "tevbe",     bridge: "tevbe",    scene: "Türkçe'de de tevbe — dönmek, pişmanlık.",                 cognate: true },
  "عَظِيم":         { emoji: "🏔️", phonetic: "azîm",      bridge: "azim",     scene: "Türkçe'de de azim — büyük, heybetli.",                    cognate: true },
  "كَرِيم":         { emoji: "🎁", phonetic: "kerîm",     bridge: "kerim",    scene: "Türkçe'de de kerim — cömert, değerli.",                   cognate: true },
  "حَكِيم":         { emoji: "🩺", phonetic: "hakîm",     bridge: "hekim",    scene: "Türkçe'de de hekim — bilge doktor, hikmet sahibi.",       cognate: true },
  "رَحِيم":         { emoji: "🤱", phonetic: "rahîm",     bridge: "rahim",    scene: "Türkçe'de de rahim — ana karnı gibi sonsuz merhamet.",    cognate: true },
  "رَحْمَن":        { emoji: "🤲", phonetic: "rahmân",    bridge: "rahman",   scene: "Türkçe'de de rahman — çok merhametli, bağışlayan.",       cognate: true },
  "مَلِك":          { emoji: "👑", phonetic: "melik",     bridge: "melik",    scene: "Türkçe'de de melik — sultan, kral.",                      cognate: true },
  "آمَنَ":          { emoji: "🙏", phonetic: "âmene",     bridge: "iman",     scene: "Türkçe'de de iman — güvenmek, inanmak.",                  cognate: true },
  "الدِّين":        { emoji: "🕌", phonetic: "ed-dîn",    bridge: "din",      scene: "Türkçe'de de din — inanç, yaşam sistemi.",                cognate: true },
  "صِرَاط":         { emoji: "🌉", phonetic: "sırât",     bridge: "sırat",    scene: "Türkçe'de de sırat — köprü yol, doğru yol.",             cognate: true },
  "الْحَمْد":       { emoji: "🙌", phonetic: "el-hamd",   bridge: "hamd",     scene: "Türkçe'de de hamd — övgü, şükran.",                      cognate: true },
  "رَبّ":           { emoji: "👑", phonetic: "rabb",      bridge: "rab",      scene: "Türkçe'de de rab — efendi, terbiye eden.",                cognate: true },
  "النَّاس":        { emoji: "👨‍👩‍👧‍👦", phonetic: "en-nâs", bridge: "nas",  scene: "Türkçe'de de nas — halk, insanlar (Nas suresi).",          cognate: true },
  "الْعَالَمِين":   { emoji: "🌌", phonetic: "el-âlemîn", bridge: "âlemler",  scene: "Türkçe'de de âlem — evren, tüm varlık dünyaları.",        cognate: true },
  "النُّور":        { emoji: "💡", phonetic: "en-nûr",    bridge: "nur",      scene: "Türkçe'de de nur — ışık (belirli hal).",                  cognate: true },
  "الْحَيَاة":      { emoji: "🌱", phonetic: "el-hayât",  bridge: "hayat",    scene: "Türkçe'de de hayat — yaşam, canlılık.",                   cognate: true },
  "أَمْر":          { emoji: "📣", phonetic: "emr",       bridge: "emir",     scene: "Türkçe'de de emir — buyruk, komuta.",                     cognate: true },
  "فِكْر":          { emoji: "💭", phonetic: "fikr",      bridge: "fikir",    scene: "Türkçe'de de fikir — düşünce, tasavvur.",                 cognate: true },
  "حَال":           { emoji: "🔄", phonetic: "hâl",       bridge: "hal",      scene: "Türkçe'de de hal — durum, vaziyet.",                      cognate: true },
  "وَقْت":          { emoji: "⏰", phonetic: "vakt",      bridge: "vakit",    scene: "Türkçe'de de vakit — zaman, an.",                         cognate: true },

  // ══ Anahtar kelime köprüsü (Türkçe'de yok ama sesi benziyor) ══════════

  "خَلَقَ":         { emoji: "🧱", phonetic: "halaka",    bridge: "HALA + KA", scene: "Halan kalıba döküp bir şey YARATTI. 👵🏻🧱" },
  "قَالَ":          { emoji: "🏰", phonetic: "kâle",      bridge: "KALE",      scene: "Kalenin duvarları DEDİ ki... 🏰💬" },
  "يَعْلَمُ":       { emoji: "🔭", phonetic: "ya'lemu",   bridge: "ilim",      scene: "İlim sahibi her şeyi BİLİR. 🔭📚" },
  "السَّمَاء":      { emoji: "🌀", phonetic: "es-semâ",   bridge: "SEMA",      scene: "Semazen dönerek GÖĞE yükseliyor. 🌀🌌" },
  "الْأَرْض":       { emoji: "🌍", phonetic: "el-ard",    bridge: "ARDA",      scene: "Arda YERE çökmüş, toprağa bakıyor. 🧍🌍" },
  "نَار":           { emoji: "🔥", phonetic: "nâr",       bridge: "NAR",       scene: "Tutuşan NAR gibi kıpkırmızı ATEŞ. 🍎🔥" },
  "مَاء":           { emoji: "💧", phonetic: "mâ",        bridge: "MA (anne)", scene: "Anne 'MA' der, emzirmek = SU vermek. 👩💧" },
  "عَيْن":          { emoji: "🪞", phonetic: "ayn",       bridge: "AYNA",      scene: "AYNAYA baktın, içinde bir GÖZ var. 👁️🪞" },
  "يَوْم":          { emoji: "☀️", phonetic: "yevm",      bridge: "YAVRUM",    scene: "Yavrum, her GÜN yeni bir güneş doğar. ☀️" },
  "غَفَرَ":         { emoji: "🤝", phonetic: "gafara",    bridge: "GAFA",      scene: "Gafa attı ama yine de BAĞIŞLANDI. 🤦🤝" },
  "فَتَحَ":         { emoji: "🚪", phonetic: "fetaha",    bridge: "FETİH",     scene: "Fetih gibi kapıyı ardına kadar AÇTI. 🚪⚔️" },
  "أَخَذَ":         { emoji: "💡", phonetic: "ahaze",     bridge: "AHA!",      scene: "AHA! deyip hemen kapıp ALDI. 💡🤚" },
  "كَتَبَ":         { emoji: "✍️", phonetic: "ketebe",    bridge: "KÂTİP",     scene: "Kâtip dürüstçe kaleme alıp YAZDI. ✍️📜" },
  "عَرَفَ":         { emoji: "📅", phonetic: "arafe",     bridge: "AREFE",     scene: "Arefe günü herkesi görüp TANIDI. 📅🤝" },
  "خَيْر":          { emoji: "🌟", phonetic: "hayr",      bridge: "HAYIR → iyilik", scene: "Hayır verirsin = İYİLİK edersin. 🌟🎁" },
  "شَرّ":           { emoji: "😈", phonetic: "şerr",      bridge: "ŞER",       scene: "Türkçe'de de şer — kötülük, bela. 😈",   cognate: true },
  "حُبّ":           { emoji: "❤️‍🔥", phonetic: "hubb",   bridge: "HUB",       scene: "Kalp bir SEVGİ hub'ı — her şeyi çeker. ❤️‍🔥" },
  "آمَنُوا":        { emoji: "🙌", phonetic: "âmenû",     bridge: "AMEN",      scene: "Dua sonunda 'amen' diyenler İMAN ETTİ. 🙌" },
  "مُسْتَقِيم":     { emoji: "📏", phonetic: "mustakîm",  bridge: "MUSTAKİL",  scene: "Mustakil gibi bağımsız, sapasağlam DOĞRU. 📏" },
  "السَّمَاوَات":   { emoji: "🌌", phonetic: "es-semâvât", bridge: "SEMA+VAT",  scene: "Birçok sema, birçok GÖKLER. 🌌🌀" },
  "رَحْمَة":        { emoji: "🤲", phonetic: "rahme",     bridge: "RAHMET",    scene: "Türkçe'de de rahmet — ilahi merhamet yağmuru. 🌧️🤲", cognate: true },
  "صَلَاة":         { emoji: "🕌", phonetic: "salât",     bridge: "SALAT",     scene: "Türkçe'de de salat — namaz, dua. 🕌",    cognate: true },
  "زَكَاة":         { emoji: "💰", phonetic: "zekât",     bridge: "ZEKÂT",     scene: "Türkçe'de de zekât — arınma vergisi. 💰", cognate: true },
  "حَجّ":           { emoji: "🕋", phonetic: "hacc",      bridge: "HAC",       scene: "Türkçe'de de hac — Kâbe yolculuğu. 🕋",  cognate: true },
  "ذِكْر":          { emoji: "📿", phonetic: "zikr",      bridge: "ZİKİR",     scene: "Türkçe'de de zikir — Allah'ı anmak. 📿",  cognate: true },
  "قَلَم":          { emoji: "🖊️", phonetic: "kalem",     bridge: "KALEM",     scene: "Türkçe'de de kalem — yazan araç. 🖊️",    cognate: true },
  "عَقْل":          { emoji: "🧠", phonetic: "akl",       bridge: "AKIL",      scene: "Türkçe'de de akıl — düşünen beyin. 🧠",  cognate: true },
  "نِعْمَة":        { emoji: "🎁", phonetic: "ni'me",     bridge: "NİMET",     scene: "Türkçe'de de nimet — ilahi hediye. 🎁",  cognate: true },
  "حِكْمَة":        { emoji: "🦉", phonetic: "hikme",     bridge: "HİKMET",    scene: "Türkçe'de de hikmet — derin bilgelik. 🦉", cognate: true },
  "أَمَانَة":       { emoji: "🔐", phonetic: "emâne",     bridge: "EMANET",    scene: "Türkçe'de de emanet — güvenle saklanan. 🔐", cognate: true },
  "عِبَادَة":        { emoji: "🕌", phonetic: "ibâde",     bridge: "ibadet",    scene: "Türkçe'de de ibadet — kulluk etmek. 🕌",  cognate: true },
  "جَمَال":         { emoji: "🌸", phonetic: "cemâl",     bridge: "CEMAL",     scene: "Türkçe'de de cemal — yüz güzelliği. 🌸",  cognate: true },
  "كَمَال":         { emoji: "💎", phonetic: "kemâl",     bridge: "KEMAL",     scene: "Türkçe'de de kemal — olgunluk, mükemmellik. 💎", cognate: true },
};

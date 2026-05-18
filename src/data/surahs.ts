import type { Surah } from "./types";

export const surahs: Surah[] = [
  {
    id: 1,
    name: "El-Fatiha",
    arabicName: "الْفَاتِحَة",
    turkishName: "Açılış",
    level: 1,
    theme: "Namazın her rekatında okunan sure. Allah'a hamd, O'nun sıfatları ve hidayet duası.",
    totalVerses: 7,
    verses: [
      {
        number: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
        turkish: "Rahmân ve Rahîm olan Allah'ın adıyla.",
        words: [
          { arabic: "بِسْمِ", transliteration: "bismi", meaning: "adıyla", role: "harf-i cer + isim", root: "س-م-و", note: "بِ (ile) + اسم (isim) birleşimi" },
          { arabic: "اللَّهِ", transliteration: "allâhi", meaning: "Allah'ın", role: "mecrur (tamlayan)", root: null, note: "İzafet terkibinin ikinci unsuru" },
          { arabic: "الرَّحْمَنِ", transliteration: "er-rahmâni", meaning: "Rahmân'ın", role: "sıfat", root: "ر-ح-م", note: "Dünyada herkese merhamet eden" },
          { arabic: "الرَّحِيمِ", transliteration: "er-rahîmi", meaning: "Rahîm'in", role: "sıfat", root: "ر-ح-م", note: "Ahirette mü'minlere özel rahmet eden" }
        ]
      },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        turkish: "Hamd (bütün övgü) âlemlerin Rabbi Allah'a mahsustur.",
        words: [
          { arabic: "الْحَمْدُ", transliteration: "el-hamdu", meaning: "hamd / övgü", role: "mubtedâ (özne)", root: "ح-م-د", note: "Belirli takılı, tüm övgüleri kapsar" },
          { arabic: "لِلَّهِ", transliteration: "lillâhi", meaning: "Allah'a", role: "haber (yüklem)", root: null, note: "لِ (için/ait) + الله" },
          { arabic: "رَبِّ", transliteration: "rabbi", meaning: "Rabbi", role: "tamlanan (sıfat)", root: "ر-ب-ب", note: "Yetiştiren, eğiten, terbiye eden" },
          { arabic: "الْعَالَمِينَ", transliteration: "el-âlemîne", meaning: "âlemlerin", role: "tamlayan", root: "ع-ل-م", note: "Çoğul: tüm âlemler, varlık türleri" }
        ]
      },
      {
        number: 3,
        arabic: "الرَّحْمَنِ الرَّحِيمِ",
        turkish: "Rahmân ve Rahîm (olan Allah).",
        words: [
          { arabic: "الرَّحْمَنِ", transliteration: "er-rahmâni", meaning: "Rahmân", role: "sıfat/haber", root: "ر-ح-م", note: "Allah'ın sıfatı: sonsuz rahmet sahibi" },
          { arabic: "الرَّحِيمِ", transliteration: "er-rahîmi", meaning: "Rahîm", role: "sıfat", root: "ر-ح-م", note: "Allah'ın sıfatı: özellikle mü'minlere rahmet eden" }
        ]
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        turkish: "Din (hesap) gününün sahibi.",
        words: [
          { arabic: "مَالِكِ", transliteration: "mâliki", meaning: "sahibi / maliki", role: "sıfat/tamlanan", root: "م-ل-ك", note: "İsm-i fâil: gerçek mülk sahibi" },
          { arabic: "يَوْمِ", transliteration: "yevmi", meaning: "günün", role: "tamlayan", root: "ي-و-م", note: "İzafet terkibinin ilk unsuru" },
          { arabic: "الدِّينِ", transliteration: "ed-dîni", meaning: "dinin / hesabın / karşılığın", role: "tamlayan", root: "د-ي-ن", note: "Kıyamet günü: herkesin hesabının görüleceği gün" }
        ]
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        turkish: "Yalnız Sana ibadet ederiz ve yalnız Senden yardım dileriz.",
        words: [
          { arabic: "إِيَّاكَ", transliteration: "iyyâke", meaning: "yalnız sana", role: "öne alınmış nesne (vurgu)", root: null, note: "Münhasırlık: başkasına değil yalnız Sana" },
          { arabic: "نَعْبُدُ", transliteration: "na'budu", meaning: "ibadet ederiz", role: "muzari fiil", root: "ع-ب-د", note: "نَ ön eki: biz. 'Abd = kul, köle" },
          { arabic: "وَ", transliteration: "ve", meaning: "ve", role: "bağlaç", root: null, note: "Atıf bağlacı" },
          { arabic: "إِيَّاكَ", transliteration: "iyyâke", meaning: "yalnız senden", role: "öne alınmış nesne (vurgu)", root: null, note: "Tekrar: vurguyu pekiştirir" },
          { arabic: "نَسْتَعِينُ", transliteration: "nesta'înu", meaning: "yardım dileriz", role: "muzari fiil", root: "ع-و-ن", note: "İstiâne (yardım isteme) babından" }
        ]
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        turkish: "Bizi dosdoğru yola ilet.",
        words: [
          { arabic: "اهْدِنَا", transliteration: "ihdinâ", meaning: "bizi ilet / hidayet et", role: "emir fiil + ek zamir", root: "ه-د-ي", note: "اهْدِ (emir) + نَا (bizi)" },
          { arabic: "الصِّرَاطَ", transliteration: "es-sırâte", meaning: "yolu", role: "mef'ûl (nesne)", root: "ص-ر-ط", note: "Mansub (üstün): fiilin nesnesi" },
          { arabic: "الْمُسْتَقِيمَ", transliteration: "el-mustakîme", meaning: "dosdoğruyu", role: "sıfat", root: "ق-و-م", note: "İstif'âl kalıbı ism-i fâil: tam doğru duran" }
        ]
      },
      {
        number: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        turkish: "Kendilerine nimet verdiğin kimselerin yolunu; gazaba uğrayanların ve sapkınların yolunu değil.",
        words: [
          { arabic: "صِرَاطَ", transliteration: "sırâte", meaning: "yolunu", role: "bedel (öncekinin açıklaması)", root: "ص-ر-ط", note: "6. ayetteki الصِّرَاط'ın açıklaması" },
          { arabic: "الَّذِينَ", transliteration: "ellezîne", meaning: "onlar ki / kimseler ki", role: "ism-i mevsûl", root: null, note: "Eril çoğul ism-i mevsûl" },
          { arabic: "أَنْعَمْتَ", transliteration: "en'amte", meaning: "nimet verdin", role: "mazi fiil", root: "ن-ع-م", note: "Muhatap (sen) mazi: Allah'a hitap" },
          { arabic: "عَلَيْهِمْ", transliteration: "aleyhim", meaning: "onlara", role: "cer-mecrur", root: null, note: "عَلَى + هِمْ (onlara)" },
          { arabic: "غَيْرِ", transliteration: "gayri", meaning: "başkasının / değil", role: "istisna", root: "غ-ي-ر", note: "Olumsuz ayırım: 'onlar değil'" },
          { arabic: "الْمَغْضُوبِ", transliteration: "el-mağdûbi", meaning: "gazaba uğrayanların", role: "mecrur (tamlayan)", root: "غ-ض-ب", note: "İsm-i mef'ûl: edilgen sıfat" },
          { arabic: "عَلَيْهِمْ", transliteration: "aleyhim", meaning: "onların üzerine", role: "cer-mecrur", root: null, note: "" },
          { arabic: "وَلَا", transliteration: "ve lâ", meaning: "ve ne de", role: "olumsuz bağlaç", root: null, note: "İkinci grubu da istisna eder" },
          { arabic: "الضَّالِّينَ", transliteration: "ed-dâllîne", meaning: "sapkınların", role: "mecrur (atıf)", root: "ض-ل-ل", note: "İsm-i fâil çoğul: yolunu kaybedenler" }
        ]
      }
    ]
  },
  {
    id: 112,
    name: "El-İhlâs",
    arabicName: "الْإِخْلَاص",
    turkishName: "Samimiyet / Tevhid",
    level: 1,
    theme: "Allah'ın birliğini ve eşsizliğini anlatan tevhid suresi. Kur'an'ın üçte birine eşdeğer tutulur.",
    totalVerses: 4,
    verses: [
      {
        number: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        turkish: "De ki: O Allah birdir.",
        words: [
          { arabic: "قُلْ", transliteration: "kul", meaning: "de!", role: "emir fiil", root: "ق-و-ل", note: "Kur'an'da 332 kez geçer: Allah'ın emri" },
          { arabic: "هُوَ", transliteration: "huve", meaning: "o", role: "özne zamiri", root: null, note: "Eril tekil: Allah'a işaret" },
          { arabic: "اللَّهُ", transliteration: "allâhu", meaning: "Allah", role: "mubtedâ", root: null, note: "Özel isim" },
          { arabic: "أَحَدٌ", transliteration: "ehadun", meaning: "birdir / tektir", role: "haber (yüklem)", root: "أ-ح-د", note: "Sayısal bir değil; eşi benzeri olmayan tek" }
        ]
      },
      {
        number: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        turkish: "Allah Samed'dir.",
        words: [
          { arabic: "اللَّهُ", transliteration: "allâhu", meaning: "Allah", role: "mubtedâ", root: null, note: "" },
          { arabic: "الصَّمَدُ", transliteration: "es-samedü", meaning: "Samed", role: "haber", root: "ص-م-د", note: "Her şey O'na muhtaç, O hiçbir şeye muhtaç değil" }
        ]
      },
      {
        number: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        turkish: "Doğurmadı ve doğurulmadı.",
        words: [
          { arabic: "لَمْ", transliteration: "lem", meaning: "-medi", role: "olumsuzluk edatı", root: null, note: "Muzariyi mazi olumsuz yapar" },
          { arabic: "يَلِدْ", transliteration: "yelid", meaning: "doğurdu", role: "meczum muzari", root: "و-ل-د", note: "Aktif: O doğurmadı" },
          { arabic: "وَ", transliteration: "ve", meaning: "ve", role: "bağlaç", root: null, note: "" },
          { arabic: "لَمْ", transliteration: "lem", meaning: "-medi", role: "olumsuzluk edatı", root: null, note: "" },
          { arabic: "يُولَدْ", transliteration: "yûled", meaning: "doğuruldu", role: "meczum edilgen muzari", root: "و-ل-د", note: "Edilgen (yü'âl kalıbı): O doğurulmadı" }
        ]
      },
      {
        number: 4,
        arabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
        turkish: "Ve hiçbir şey O'na denk değildir.",
        words: [
          { arabic: "وَ", transliteration: "ve", meaning: "ve", role: "bağlaç", root: null, note: "" },
          { arabic: "لَمْ", transliteration: "lem", meaning: "-medi", role: "olumsuzluk edatı", root: null, note: "" },
          { arabic: "يَكُنْ", transliteration: "yekun", meaning: "oldu / vardı", role: "meczum muzari (كَانَ)", root: "ك-و-ن", note: "كَانَ fiilinin meczum hali" },
          { arabic: "لَهُ", transliteration: "lehu", meaning: "O'na / O'nun için", role: "cer-mecrur", root: null, note: "لِ + هُ (O'na)" },
          { arabic: "كُفُوًا", transliteration: "küfüven", meaning: "denk / eş", role: "haber (öne alınmış)", root: "ك-ف-أ", note: "Mansub: denk, eş, ortak" },
          { arabic: "أَحَدٌ", transliteration: "ehadun", meaning: "hiç kimse / bir şey", role: "كَانَ'nın ismi", root: "أ-ح-د", note: "Olumsuz bağlamda: 'hiç kimse'" }
        ]
      }
    ]
  },
  {
    id: 108,
    name: "El-Kevser",
    arabicName: "الْكَوْثَر",
    turkishName: "Kevser",
    level: 1,
    theme: "En kısa sure. Allah'ın Hz. Peygamber'e Kevser nehrini verdiği ve düşmanlarının asıl yok olacağı anlatılır.",
    totalVerses: 3,
    verses: [
      {
        number: 1,
        arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        turkish: "Şüphesiz Biz sana Kevser'i verdik.",
        words: [
          { arabic: "إِنَّا", transliteration: "innâ", meaning: "şüphesiz biz", role: "vurgu edatı + zamir", root: null, note: "إِنَّ + نَا (biz): ilâhî çoğul/azamet" },
          { arabic: "أَعْطَيْنَاكَ", transliteration: "a'taynâke", meaning: "sana verdik", role: "mazi fiil + zamirler", root: "ع-ط-و", note: "أَعْطَى + نَا (biz) + كَ (seni)" },
          { arabic: "الْكَوْثَرَ", transliteration: "el-kevsera", meaning: "Kevser'i", role: "mef'ûl (nesne)", root: "ك-ث-ر", note: "Çokluk, bolluk anlamından; cennet nehri" }
        ]
      },
      {
        number: 2,
        arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        turkish: "O hâlde Rabbine namaz kıl ve kurban kes.",
        words: [
          { arabic: "فَ", transliteration: "fe", meaning: "o hâlde / öyleyse", role: "bağlaç (sonuç)", root: null, note: "Önceki nimete karşılık emir geliyor" },
          { arabic: "صَلِّ", transliteration: "salli", meaning: "namaz kıl!", role: "emir fiil", root: "ص-ل-و", note: "صَلَّى fiilinden emir" },
          { arabic: "لِرَبِّكَ", transliteration: "li-rabbike", meaning: "Rabbine", role: "cer-mecrur", root: "ر-ب-ب", note: "لِ + رَبّ + كَ (senin)" },
          { arabic: "وَ", transliteration: "ve", meaning: "ve", role: "bağlaç", root: null, note: "" },
          { arabic: "انْحَرْ", transliteration: "inhar", meaning: "kurban kes!", role: "emir fiil", root: "ن-ح-ر", note: "نَحَرَ: deve/büyük baş kurban kesmek" }
        ]
      },
      {
        number: 3,
        arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
        turkish: "Şüphesiz seni kınayanın kendisi soyu kesik olandır.",
        words: [
          { arabic: "إِنَّ", transliteration: "inne", meaning: "şüphesiz", role: "vurgu edatı", root: null, note: "" },
          { arabic: "شَانِئَكَ", transliteration: "şâni'eke", meaning: "seni kınayan", role: "إِنَّ'nin ismi", root: "ش-ن-أ", note: "İsm-i fâil + كَ (seni): düşmanın" },
          { arabic: "هُوَ", transliteration: "huve", meaning: "o / kendisi", role: "fasıl zamiri (vurgu)", root: null, note: "Haber ile isim arasında vurgu için" },
          { arabic: "الْأَبْتَرُ", transliteration: "el-ebteru", meaning: "soyu kesik olan", role: "haber", root: "ب-ت-ر", note: "Kesik, sürgün, devamsız: hakiki soyu kesik o!" }
        ]
      }
    ]
  },
  {
    id: 113,
    name: "El-Felak",
    arabicName: "الْفَلَق",
    turkishName: "Sabahın Aydınlığı",
    level: 2,
    theme: "Her türlü kötülükten, büyüden ve hasetten Allah'a sığınma. Muavvizeteyn'in ilki.",
    totalVerses: 5,
    verses: [
      {
        number: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        turkish: "De ki: Sabahın Rabbine sığınırım.",
        words: [
          { arabic: "قُلْ", transliteration: "kul", meaning: "de!", role: "emir fiil", root: "ق-و-ل", note: "" },
          { arabic: "أَعُوذُ", transliteration: "e'ûzu", meaning: "sığınırım", role: "muzari fiil", root: "ع-و-ذ", note: "1. tekil: 'Ben sığınırım'" },
          { arabic: "بِرَبِّ", transliteration: "bi-rabbi", meaning: "Rabbine", role: "cer-mecrur", root: "ر-ب-ب", note: "بِ + رَبّ: sığınılan" },
          { arabic: "الْفَلَقِ", transliteration: "el-felaki", meaning: "sabahın / şafağın", role: "tamlayan", root: "ف-ل-ق", note: "Yarılan, açılan: karanlığı yaran sabah" }
        ]
      },
      {
        number: 2,
        arabic: "مِنْ شَرِّ مَا خَلَقَ",
        turkish: "Yarattığı şeylerin kötülüğünden.",
        words: [
          { arabic: "مِنْ", transliteration: "min", meaning: "-den", role: "harf-i cer", root: null, note: "Başlangıç noktası: sığınma konusu" },
          { arabic: "شَرِّ", transliteration: "şerri", meaning: "kötülüğünden", role: "mecrur (tamlanan)", root: "ش-ر-ر", note: "Tüm kötülükleri kapsar" },
          { arabic: "مَا", transliteration: "mâ", meaning: "şeyin / olanın", role: "ism-i mevsûl", root: null, note: "Varlıkları kapsayan genel zamir" },
          { arabic: "خَلَقَ", transliteration: "halaka", meaning: "yarattı", role: "mazi fiil (sıla)", root: "خ-ل-ق", note: "Allah'ın yarattığı her şey" }
        ]
      },
      {
        number: 3,
        arabic: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        turkish: "Bastırdığında karanlığın kötülüğünden.",
        words: [
          { arabic: "وَمِنْ", transliteration: "ve min", meaning: "ve -den", role: "bağlaç + harf-i cer", root: null, note: "" },
          { arabic: "شَرِّ", transliteration: "şerri", meaning: "kötülüğünden", role: "mecrur", root: "ش-ر-ر", note: "" },
          { arabic: "غَاسِقٍ", transliteration: "gâsikin", meaning: "karanlığın / gecenin", role: "mecrur", root: "غ-س-ق", note: "İsm-i fâil: kaplayan, bastıran gece" },
          { arabic: "إِذَا", transliteration: "izâ", meaning: "bastırınca / gelince", role: "zaman zarfı", root: null, note: "Şart anlamlı zaman edatı" },
          { arabic: "وَقَبَ", transliteration: "vekabe", meaning: "bastırdı / büründü", role: "mazi fiil (sıla)", root: "و-ق-ب", note: "Derin karanlığın kaplamak anlamı" }
        ]
      },
      {
        number: 4,
        arabic: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        turkish: "Düğümlere üfleyenlerin kötülüğünden.",
        words: [
          { arabic: "وَمِنْ شَرِّ", transliteration: "ve min şerri", meaning: "ve kötülüğünden", role: "bağlaç + cer-mecrur", root: "ش-ر-ر", note: "" },
          { arabic: "النَّفَّاثَاتِ", transliteration: "en-neffâsâti", meaning: "üfleyenlerin", role: "mecrur", root: "ن-ف-ث", note: "Dişil çoğul ism-i fâil: büyü için üfleyenler" },
          { arabic: "فِي", transliteration: "fî", meaning: "içine", role: "harf-i cer", root: null, note: "" },
          { arabic: "الْعُقَدِ", transliteration: "el-ukadi", meaning: "düğümlerin", role: "mecrur", root: "ع-ق-د", note: "Çoğul: bağlanmış, atılmış düğümler (büyü)" }
        ]
      },
      {
        number: 5,
        arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        turkish: "Kıskandığında kıskancın kötülüğünden.",
        words: [
          { arabic: "وَمِنْ شَرِّ", transliteration: "ve min şerri", meaning: "ve kötülüğünden", role: "bağlaç + cer-mecrur", root: "ش-ر-ر", note: "" },
          { arabic: "حَاسِدٍ", transliteration: "hâsidin", meaning: "kıskancın / hasûdun", role: "mecrur", root: "ح-س-د", note: "İsm-i fâil: kıskanan kişi" },
          { arabic: "إِذَا", transliteration: "izâ", meaning: "kıskandığında", role: "zaman zarfı", root: null, note: "" },
          { arabic: "حَسَدَ", transliteration: "hasede", meaning: "kıskandı", role: "mazi fiil (sıla)", root: "ح-س-د", note: "Kök tekrarı: أَصَحَّ vurgu yapar" }
        ]
      }
    ]
  },
  {
    id: 114,
    name: "En-Nâs",
    arabicName: "النَّاس",
    turkishName: "İnsanlar",
    level: 1,
    theme: "İnsanların kalbine vesvese veren şeytandan Allah'a sığınma. Muavvizeteyn'in ikincisi.",
    totalVerses: 6,
    verses: [
      {
        number: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        turkish: "De ki: İnsanların Rabbine sığınırım.",
        words: [
          { arabic: "قُلْ", transliteration: "kul", meaning: "de!", role: "emir fiil", root: "ق-و-ل", note: "" },
          { arabic: "أَعُوذُ", transliteration: "e'ûzu", meaning: "sığınırım", role: "muzari fiil", root: "ع-و-ذ", note: "" },
          { arabic: "بِرَبِّ", transliteration: "bi-rabbi", meaning: "Rabbine", role: "cer-mecrur", root: "ر-ب-ب", note: "" },
          { arabic: "النَّاسِ", transliteration: "en-nâsi", meaning: "insanların", role: "tamlayan", root: "أ-ن-س", note: "İnsanlık, insan topluluğu" }
        ]
      },
      {
        number: 2,
        arabic: "مَلِكِ النَّاسِ",
        turkish: "İnsanların Melik'ine (Hükümdarına).",
        words: [
          { arabic: "مَلِكِ", transliteration: "meliki", meaning: "Melik'ine / Hükümdarına", role: "sıfat (bedel)", root: "م-ل-ك", note: "Hem 'sahip' hem 'hükümdar' anlamı" },
          { arabic: "النَّاسِ", transliteration: "en-nâsi", meaning: "insanların", role: "tamlayan", root: "أ-ن-س", note: "" }
        ]
      },
      {
        number: 3,
        arabic: "إِلَهِ النَّاسِ",
        turkish: "İnsanların İlahına.",
        words: [
          { arabic: "إِلَهِ", transliteration: "ilâhi", meaning: "İlahına / Tanrısına", role: "sıfat (bedel)", root: "أ-ل-ه", note: "Üç sıfat: Rab + Melik + İlah = tam egemenlik" },
          { arabic: "النَّاسِ", transliteration: "en-nâsi", meaning: "insanların", role: "tamlayan", root: "أ-ن-س", note: "" }
        ]
      },
      {
        number: 4,
        arabic: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        turkish: "Sinsi vesvesecinin kötülüğünden.",
        words: [
          { arabic: "مِنْ شَرِّ", transliteration: "min şerri", meaning: "kötülüğünden", role: "cer-mecrur", root: "ش-ر-ر", note: "" },
          { arabic: "الْوَسْوَاسِ", transliteration: "el-vesvâsi", meaning: "vesvesecinin", role: "mecrur", root: "و-س-و-س", note: "Fâl kalıbı: çok vesvese veren; aynı zamanda vesvese" },
          { arabic: "الْخَنَّاسِ", transliteration: "el-hannâsi", meaning: "sinsi olanın / geri çekilenin", role: "sıfat", root: "خ-ن-س", note: "Allah anılınca geri çekilen şeytan" }
        ]
      },
      {
        number: 5,
        arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        turkish: "İnsanların göğüslerine vesvese veren.",
        words: [
          { arabic: "الَّذِي", transliteration: "ellezî", meaning: "o ki / kim ki", role: "ism-i mevsûl (tekil)", root: null, note: "الَّذِينَ'nin tekil hali" },
          { arabic: "يُوَسْوِسُ", transliteration: "yüvesvisü", meaning: "vesvese verir", role: "muzari fiil", root: "و-س-و-س", note: "Tef'îl kalıbı: tekrarlı, sürekli vesvese" },
          { arabic: "فِي", transliteration: "fî", meaning: "içine", role: "harf-i cer", root: null, note: "" },
          { arabic: "صُدُورِ", transliteration: "sudûri", meaning: "göğüslerin", role: "mecrur", root: "ص-د-ر", note: "Çoğul: göğüsler, kalpler" },
          { arabic: "النَّاسِ", transliteration: "en-nâsi", meaning: "insanların", role: "tamlayan", root: "أ-ن-س", note: "" }
        ]
      },
      {
        number: 6,
        arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        turkish: "Cinlerden ve insanlardan.",
        words: [
          { arabic: "مِنَ", transliteration: "mine", meaning: "-den", role: "harf-i cer", root: null, note: "Cins/kaynak bildirir" },
          { arabic: "الْجِنَّةِ", transliteration: "el-cinneti", meaning: "cinlerin", role: "mecrur", root: "ج-ن-ن", note: "Gizli varlıklar: cin. جَنَّة ile aynı kök" },
          { arabic: "وَ", transliteration: "ve", meaning: "ve", role: "bağlaç", root: null, note: "" },
          { arabic: "النَّاسِ", transliteration: "en-nâsi", meaning: "insanların", role: "mecrur", root: "أ-ن-س", note: "Sure adıyla biter: insanlar" }
        ]
      }
    ]
  }
];

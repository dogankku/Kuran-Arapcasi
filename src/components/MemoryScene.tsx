import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SceneType =
  | "divine"
  | "celestial"
  | "earth"
  | "water"
  | "fire"
  | "people"
  | "knowledge"
  | "path"
  | "paradise"
  | "faith"
  | "speech"
  | "time"
  | "shelter"
  | "hand"
  | "door"
  | "victory"
  | "barrier"
  | "heart"
  | "cosmos";

interface Props {
  arabic: string;
  transliteration: string;
  partOfSpeech: string;
  memoryHint?: string;
  compact?: boolean;
}

// ─── Color Palettes ───────────────────────────────────────────────────────────

interface Palette {
  bg1: string;
  bg2: string;
  accent: string;
}

const PALETTES: Record<SceneType, Palette> = {
  divine:    { bg1: "#1a1000", bg2: "#2a1a00", accent: "#FFD700" },
  celestial: { bg1: "#060a1f", bg2: "#0d1240", accent: "#93C5FD" },
  earth:     { bg1: "#0a1a0a", bg2: "#162616", accent: "#86EFAC" },
  water:     { bg1: "#04111c", bg2: "#071e30", accent: "#38BDF8" },
  fire:      { bg1: "#1a0400", bg2: "#2a0800", accent: "#F97316" },
  people:    { bg1: "#0f0a1e", bg2: "#180e2a", accent: "#C084FC" },
  knowledge: { bg1: "#050e1a", bg2: "#0b1a2e", accent: "#34D399" },
  path:      { bg1: "#050f08", bg2: "#0a1a10", accent: "#6EE7B7" },
  paradise:  { bg1: "#031408", bg2: "#052010", accent: "#4ADE80" },
  faith:     { bg1: "#150508", bg2: "#200a10", accent: "#F472B6" },
  speech:    { bg1: "#100d00", bg2: "#1c1500", accent: "#FCD34D" },
  time:      { bg1: "#0f0900", bg2: "#1a1200", accent: "#FBBF24" },
  shelter:   { bg1: "#100a00", bg2: "#1e1200", accent: "#FCD34D" },
  hand:      { bg1: "#0a0a10", bg2: "#14142a", accent: "#A78BFA" },
  door:      { bg1: "#080a0e", bg2: "#0f1218", accent: "#60A5FA" },
  victory:   { bg1: "#001208", bg2: "#001e0a", accent: "#34D399" },
  barrier:   { bg1: "#1a0000", bg2: "#2a0000", accent: "#F87171" },
  heart:     { bg1: "#150008", bg2: "#220010", accent: "#FB7185" },
  cosmos:    { bg1: "#050510", bg2: "#0a0a20", accent: "#818CF8" },
};

// ─── Word → Scene Mapping ─────────────────────────────────────────────────────

const WORD_SCENE: Record<string, SceneType> = {
  // divine
  "اللَّه": "divine", "النُّور": "divine", "نُور": "divine", "رَبِّ": "divine", "رَبّ": "divine",
  "مَلِك": "divine", "مُلْك": "divine", "حُكْم": "divine", "فَضْل": "divine", "عَدْل": "divine",
  "حَقّ": "divine", "قَدِير": "divine", "كَبِير": "divine", "عَظِيم": "divine", "هُوَ": "divine",
  "هِيَ": "divine", "عَرْش": "divine", "كُرْسِيّ": "divine", "سُلْطَان": "divine", "مُحَمَّد": "divine",

  // celestial
  "السَّمَاء": "celestial", "السَّمَاوَاتِ": "celestial", "مَلَك": "celestial", "قَمَر": "celestial",
  "نَجْم": "celestial", "سَحَاب": "celestial", "رُوح": "celestial", "أَبْيَض": "celestial",
  "نَزَلَ": "celestial", "رَفَعَ": "celestial", "طَيْر": "celestial", "فَوْقَ": "celestial",

  // earth
  "الْأَرْضَ": "earth", "أَرْض": "earth", "جَبَل": "earth", "شَجَر": "earth", "دَابَّة": "earth",
  "أَنْعَام": "earth", "بَلَد": "earth", "قَرْيَة": "earth", "مَال": "earth", "دُنْيَا": "earth",
  "تَحْتَ": "earth", "مَاتَ": "earth", "حَيِيَ": "earth", "حَيّ": "earth", "مَيِّت": "earth",

  // water
  "بَحْر": "water", "نَهَر": "water", "مَاء": "water", "رِيح": "water", "مَطَر": "water",
  "نُوح": "water", "شَرِبَ": "water", "شَرَاب": "water",

  // fire
  "نَار": "fire", "جَحِيم": "fire", "عَذَاب": "fire", "شَيْطَان": "fire", "إِبْلِيس": "fire",
  "شَرّ": "fire", "سَيِّئَة": "fire", "إِثْم": "fire", "ذَنْب": "fire", "كُفْر": "fire",
  "خَبِيث": "fire", "أَسْوَد": "fire", "أَحْمَر": "fire", "خَافَ": "fire", "ظَلَمَ": "fire",
  "كَذَبَ": "fire", "قَتَلَ": "fire", "دَم": "fire", "وَعِيد": "fire", "فِتْنَة": "fire",
  "بَلَاء": "fire", "بُغْض": "fire", "خَوْف": "fire",

  // people
  "النَّاس": "people", "الَّذِينَ": "people", "هُمْ": "people", "أَنْتَ": "people", "نَحْنُ": "people",
  "مَنْ": "people", "قَوْم": "people", "أَهْل": "people", "بَنُو": "people", "ابْن": "people",
  "بِنْت": "people", "أَب": "people", "أُمّ": "people", "أَخ": "people", "زَوْج": "people",
  "وَلَد": "people", "رَجُل": "people", "امْرَأَة": "people", "نِسَاء": "people", "رَسُول": "people",
  "نَبِيّ": "people", "آدَم": "people", "مُوسَى": "people", "عِيسَى": "people", "إِبْرَاهِيم": "people",
  "يُوسُف": "people", "مَرْيَم": "people", "فِرْعَوْن": "people", "عَبْد": "people", "جَسَد": "people",
  "وَجْه": "people", "رَأْس": "people", "جَمَعَ": "people", "فَرَّقَ": "people", "زَكَاة": "people",
  "لِبَاس": "people",

  // knowledge
  "عِلْم": "knowledge", "يَعْلَمُ": "knowledge", "بَصِير": "knowledge", "الْكِتَاب": "knowledge",
  "كِتَاب": "knowledge", "قُرْآن": "knowledge", "آيَة": "knowledge", "حَكِيم": "knowledge",
  "عَلِيم": "knowledge", "رَأَى": "knowledge", "نَظَرَ": "knowledge", "عَرَفَ": "knowledge",
  "قَرَأَ": "knowledge", "كَتَبَ": "knowledge", "عَيْن": "knowledge", "كَيْفَ": "knowledge",
  "لِمَاذَا": "knowledge", "أَيّ": "knowledge", "لَوْح": "knowledge", "قَلَم": "knowledge",
  "صَحِيفَة": "knowledge", "بُرْهَان": "knowledge", "بَيِّنَة": "knowledge", "سَمِيع": "knowledge",
  "أُذُن": "knowledge",

  // path
  "صِرَاطٍ": "path", "مُسْتَقِيمٍ": "path", "هُدًى": "path", "ضَلَّ": "path", "أَضَلَّ": "path",
  "هَدَى": "path", "مَشَى": "path", "سَعَى": "path", "جَاءَ": "path", "ذَهَبَ": "path",
  "رَجَعَ": "path", "أَيْنَ": "path", "حَتَّى": "path", "مِنْ": "path", "إِلَى": "path",
  "فِي": "path", "عَلَى": "path", "عِنْدَ": "path", "بَيْنَ": "path", "أَمَامَ": "path",
  "خَلْفَ": "path", "وَ": "path", "أَوْ": "path", "ثُمَّ": "path", "مَا": "path", "كُلّ": "path",
  "نَسِيَ": "path", "قَرِيب": "path", "بَعِيد": "path", "بَعْدَ": "path", "قَبْلَ": "path",

  // paradise
  "جَنَّة": "paradise", "فِرْدَوْس": "paradise", "رِزْق": "paradise", "ثَمَر": "paradise",
  "نِعْمَة": "paradise", "طَيِّب": "paradise", "أَجْر": "paradise", "سَلَام": "paradise",
  "فَرَح": "paradise", "طَعَام": "paradise", "أَكَلَ": "paradise", "كَرِيم": "paradise",
  "فَرِحَ": "paradise",

  // faith
  "آمَنُوا": "faith", "الْحَمْدُ": "faith", "الدِّينِ": "faith", "إِيمَان": "faith",
  "إِسْلَام": "faith", "تَقْوَى": "faith", "صَلَاة": "faith", "صَوْم": "faith", "حَجّ": "faith",
  "دُعَاء": "faith", "عِبَادَة": "faith", "ذِكْر": "faith", "صَبْر": "faith", "تَوْبَة": "faith",
  "مَغْفِرَة": "faith", "شُكْر": "faith", "خَيْر": "faith", "حَسَنَة": "faith", "صَالِح": "faith",
  "ذَكَرَ": "faith", "دَعَا": "faith", "عَبَدَ": "faith", "سَجَدَ": "faith", "رَكَعَ": "faith",
  "صَلَّى": "faith", "صَامَ": "faith", "شَكَرَ": "faith", "آمَنَ": "faith", "اتَّقَى": "faith",
  "رَجَا": "faith",

  // speech
  "قَالَ": "speech", "حَدِيث": "speech", "قَوْل": "speech", "كَلِمَة": "speech", "لِسَان": "speech",
  "إِنَّ": "speech", "أَنَّ": "speech", "قَدْ": "speech", "هَلْ": "speech", "أَمَرَ": "speech",
  "سَأَلَ": "speech", "أَجَابَ": "speech", "وَعَدَ": "speech", "أَمْر": "speech", "سَمِعَ": "speech",

  // time
  "يَوْم": "time", "لَيْل": "time", "نَهَار": "time", "شَهْر": "time", "سَنَة": "time",
  "سَاعَة": "time", "آخِرَة": "time", "قِيَامَة": "time", "كَانَ": "time", "يَكُونُ": "time",
  "سَوْفَ": "time", "مَتَى": "time", "لَمْ": "time", "لَنْ": "time", "لَا": "time",
  "بَلْ": "time", "لَكِنَّ": "time", "لَيْسَ": "time", "لَوْ": "time", "إِنْ": "time",
  "لَبِثَ": "time", "قَدِيم": "time", "جَدِيد": "time",

  // shelter
  "مَسْجِد": "shelter", "كَعْبَة": "shelter", "بَيْت (كعبة context)": "shelter", "أَمْن": "shelter",

  // hand
  "أَخَذَ": "hand", "أَعْطَى": "hand", "فَعَلَ": "hand", "عَمِلَ": "hand", "حَمَلَ": "hand",
  "وَضَعَ": "hand", "يَد": "hand",

  // door
  "دَخَلَ": "door", "خَرَجَ": "door", "فَتَحَ": "door", "أَغْلَقَ": "door", "بَاب": "door",
  "مِفْتَاح": "door",

  // victory
  "نَصْر": "victory", "فَتْح": "victory",

  // barrier
  "نَهَى": "barrier", "نَهْي": "barrier", "كَأَنَّ": "barrier",

  // heart
  "قَلْب": "heart", "نَفْس": "heart", "رَحْمَة": "heart", "حُبّ": "heart", "حُزْن": "heart",
  "غَفُور": "heart", "رَحِيم": "heart", "غَفَرَ": "heart", "رَحِمَ": "heart", "عَفْو": "heart",
  "حَزِنَ": "heart",

  // cosmos
  "الْعَالَمِينَ": "cosmos", "خَلَقَ": "cosmos", "جَعَلَ": "cosmos", "بَعَثَ": "cosmos",
};

// ─── POS → Scene Fallback ─────────────────────────────────────────────────────

function posToScene(pos: string): SceneType {
  if (pos.includes("fiil")) return "path";
  if (pos.includes("isim")) return "earth";
  if (pos.includes("sıfat")) return "faith";
  if (pos.includes("harf-i cer")) return "path";
  if (pos.includes("bağlaç")) return "path";
  if (pos.includes("zamir")) return "people";
  if (pos.includes("edat")) return "path";
  if (pos.includes("olumsuzluk")) return "fire";
  if (pos.includes("soru")) return "knowledge";
  if (pos.includes("ism-i mevsûl")) return "people";
  if (pos.includes("özel isim")) return "divine";
  if (pos.includes("zarf")) return "time";
  return "earth";
}

function getSceneType(arabic: string, partOfSpeech: string): SceneType {
  return WORD_SCENE[arabic] ?? posToScene(partOfSpeech);
}

// ─── SVG Art Components ───────────────────────────────────────────────────────

function DivineLightArt({ accent }: { accent: string }) {
  const rays = Array.from({ length: 9 }, (_, i) => {
    const angle = -90 + (i - 4) * 20;
    const rad = (angle * Math.PI) / 180;
    const x1 = 150;
    const y1 = -20;
    const len = 280;
    const x2 = x1 + Math.cos(rad) * len;
    const y2 = y1 + Math.sin(rad) * len;
    return { x1, y1, x2, y2, opacity: 0.06 + Math.abs(i - 4) * 0.01 };
  });

  return (
    <g>
      {/* Rays */}
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={accent} strokeWidth={i === 4 ? 3 : 1.5} opacity={i === 4 ? 0.18 : 0.08} />
      ))}
      {/* Glow at origin */}
      <radialGradient id="divineGlow" cx="50%" cy="0%" r="40%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <ellipse cx="150" cy="0" rx="120" ry="80" fill="url(#divineGlow)" />
      {/* Mosque silhouette at bottom */}
      {/* Main body */}
      <rect x="80" y="165" width="140" height="55" fill={accent} opacity="0.18" />
      {/* Dome */}
      <ellipse cx="150" cy="165" rx="40" ry="22" fill={accent} opacity="0.22" />
      {/* Left minaret */}
      <rect x="83" y="140" width="10" height="30" fill={accent} opacity="0.2" />
      <ellipse cx="88" cy="140" rx="5" ry="3" fill={accent} opacity="0.25" />
      {/* Right minaret */}
      <rect x="207" y="140" width="10" height="30" fill={accent} opacity="0.2" />
      <ellipse cx="212" cy="140" rx="5" ry="3" fill={accent} opacity="0.25" />
      {/* Center glow circle */}
      <circle cx="150" cy="0" r="18" fill={accent} opacity="0.15" />
    </g>
  );
}

function CelestialArt({ accent }: { accent: string }) {
  const stars = [
    { cx: 40, cy: 30, r: 1.5 }, { cx: 80, cy: 15, r: 1 }, { cx: 200, cy: 20, r: 2 },
    { cx: 240, cy: 45, r: 1.5 }, { cx: 260, cy: 15, r: 1 }, { cx: 120, cy: 10, r: 1 },
    { cx: 50, cy: 70, r: 1 }, { cx: 280, cy: 60, r: 1.5 }, { cx: 170, cy: 35, r: 1 },
    { cx: 30, cy: 50, r: 2 },
  ];
  return (
    <g>
      {/* Subtle glow band */}
      <linearGradient id="celestialBand" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={accent} stopOpacity="0" />
        <stop offset="50%" stopColor={accent} stopOpacity="0.06" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="70" width="300" height="30" fill="url(#celestialBand)" />
      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={accent} opacity="0.7" />
      ))}
      {/* Crescent moon — two circles subtract */}
      <defs>
        <mask id="crescentMask">
          <circle cx="145" cy="100" r="52" fill="white" />
          <circle cx="165" cy="92" r="44" fill="black" />
        </mask>
      </defs>
      <circle cx="145" cy="100" r="52" fill={accent} opacity="0.22" mask="url(#crescentMask)" />
      <circle cx="145" cy="100" r="52" fill="none" stroke={accent} strokeWidth="1"
        opacity="0.35" mask="url(#crescentMask)" />
    </g>
  );
}

function EarthArt({ accent }: { accent: string }) {
  return (
    <g>
      {/* Sky gradient */}
      <linearGradient id="earthSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a1e0a" stopOpacity="1" />
        <stop offset="60%" stopColor="#0d2210" stopOpacity="1" />
        <stop offset="100%" stopColor="#162616" stopOpacity="1" />
      </linearGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#earthSky)" />
      {/* Far mountains (gray) */}
      <path d="M-10,160 L40,90 L90,130 L140,70 L190,115 L240,80 L290,110 L310,160 Z"
        fill="#1a2e1a" opacity="0.7" />
      {/* Near mountains (darker) */}
      <path d="M-10,190 L50,120 L100,155 L160,100 L220,140 L270,115 L310,150 L310,220 L-10,220 Z"
        fill="#0e1e0e" opacity="0.9" />
      {/* Tree trunk */}
      <rect x="143" y="155" width="14" height="40" fill={accent} opacity="0.25" rx="3" />
      {/* Tree crown */}
      <ellipse cx="150" cy="145" rx="32" ry="28" fill={accent} opacity="0.2" />
      <ellipse cx="150" cy="138" rx="22" ry="18" fill={accent} opacity="0.15" />
    </g>
  );
}

function WaterArt({ accent }: { accent: string }) {
  return (
    <g>
      {/* Reflection glow */}
      <radialGradient id="waterGlow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#waterGlow)" />
      {/* Wave 1 */}
      <path d="M-10,90 C30,70 70,110 110,90 C150,70 190,110 230,90 C270,70 290,90 310,80 L310,115 C270,125 230,115 190,125 C150,135 110,115 70,125 C30,135 -10,115 -10,115 Z"
        fill={accent} opacity="0.12" />
      <path d="M-10,90 C30,70 70,110 110,90 C150,70 190,110 230,90 C270,70 290,90 310,80"
        fill="none" stroke={accent} strokeWidth="1.5" opacity="0.4" />
      {/* Wave 2 */}
      <path d="M-10,125 C30,105 70,145 110,125 C150,105 190,145 230,125 C270,105 290,125 310,115 L310,150 C270,160 230,150 190,160 C150,170 110,150 70,160 C30,170 -10,150 -10,150 Z"
        fill={accent} opacity="0.09" />
      <path d="M-10,125 C30,105 70,145 110,125 C150,105 190,145 230,125 C270,105 290,125 310,115"
        fill="none" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      {/* Wave 3 */}
      <path d="M-10,160 C30,140 70,180 110,160 C150,140 190,180 230,160 C270,140 290,160 310,150 L310,185 C270,195 230,185 190,195 C150,205 110,185 70,195 C30,205 -10,185 -10,185 Z"
        fill={accent} opacity="0.07" />
      <path d="M-10,160 C30,140 70,180 110,160 C150,140 190,180 230,160 C270,140 290,160 310,150"
        fill="none" stroke={accent} strokeWidth="1" opacity="0.25" />
    </g>
  );
}

function FireArt({ accent }: { accent: string }) {
  const embers = [
    { cx: 120, cy: 60 }, { cx: 150, cy: 40 }, { cx: 180, cy: 55 },
    { cx: 135, cy: 30 }, { cx: 165, cy: 25 }, { cx: 110, cy: 45 }, { cx: 190, cy: 35 },
  ];
  return (
    <g>
      <defs>
        <linearGradient id="flame1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#EF4444" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="flame2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Flame 1 - center */}
      <path d="M150,200 C130,180 110,150 130,110 C140,90 145,60 150,30 C155,60 160,90 170,110 C190,150 170,180 150,200 Z"
        fill="url(#flame1)" />
      {/* Flame 2 - left */}
      <path d="M110,200 C95,182 80,158 100,122 C108,107 112,82 115,58 C122,82 124,107 135,125 C150,155 130,182 110,200 Z"
        fill="url(#flame2)" />
      {/* Flame 3 - right */}
      <path d="M190,200 C175,182 165,158 170,122 C178,107 182,82 185,58 C192,82 194,107 200,125 C215,155 205,182 190,200 Z"
        fill="url(#flame2)" />
      {/* Embers */}
      {embers.map((e, i) => (
        <circle key={i} cx={e.cx} cy={e.cy} r={i % 3 === 0 ? 2.5 : 1.5}
          fill={accent} opacity={0.4 + (i % 3) * 0.1} />
      ))}
    </g>
  );
}

function PeopleArt({ accent }: { accent: string }) {
  const people = [
    { x: 90, scale: 0.85 }, { x: 150, scale: 1 }, { x: 210, scale: 0.9 },
  ];
  return (
    <g>
      {/* Glow from behind */}
      <radialGradient id="peopleGlow" cx="50%" cy="55%" r="40%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#peopleGlow)" />
      {people.map((p, i) => {
        const bodyH = 70 * p.scale;
        const bodyW = 30 * p.scale;
        const headR = 16 * p.scale;
        const bodyY = 170 - bodyH;
        return (
          <g key={i} transform={`translate(${p.x}, 0)`}>
            {/* Head */}
            <circle cx="0" cy={bodyY - headR - 4} r={headR} fill={accent} opacity="0.25" />
            {/* Body */}
            <rect x={-bodyW / 2} y={bodyY} width={bodyW} height={bodyH}
              rx={bodyW * 0.35} fill={accent} opacity="0.2" />
          </g>
        );
      })}
      {/* Ground line */}
      <line x1="40" y1="172" x2="260" y2="172" stroke={accent} strokeWidth="1" opacity="0.15" />
    </g>
  );
}

function KnowledgeArt({ accent }: { accent: string }) {
  const beams = Array.from({ length: 6 }, (_, i) => {
    const angle = i * 60;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 150 + Math.cos(rad) * 38,
      y1: 100 + Math.sin(rad) * 38,
      x2: 150 + Math.cos(rad) * 80,
      y2: 100 + Math.sin(rad) * 80,
    };
  });
  return (
    <g>
      {/* Radial beams */}
      {beams.map((b, i) => (
        <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
          stroke={accent} strokeWidth="1.5" opacity="0.25" />
      ))}
      {/* Eye outline */}
      <ellipse cx="150" cy="100" rx="60" ry="35" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.4" />
      {/* Iris */}
      <circle cx="150" cy="100" r="22" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" />
      {/* Pupil */}
      <circle cx="150" cy="100" r="10" fill={accent} opacity="0.3" />
      {/* Open book at bottom */}
      <path d="M105,185 L150,178 L195,185 L150,192 Z" fill={accent} opacity="0.15" />
      <line x1="150" y1="178" x2="150" y2="192" stroke={accent} strokeWidth="1" opacity="0.3" />
      <path d="M105,185 C120,178 135,175 150,178" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
      <path d="M195,185 C180,178 165,175 150,178" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
    </g>
  );
}

function PathArt({ accent }: { accent: string }) {
  return (
    <g>
      {/* Sky gradient top half */}
      <linearGradient id="pathSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#060d08" stopOpacity="1" />
        <stop offset="100%" stopColor="#0a1a10" stopOpacity="1" />
      </linearGradient>
      <rect x="0" y="0" width="300" height="110" fill="url(#pathSky)" />
      {/* Ground */}
      <rect x="0" y="110" width="300" height="110" fill="#0a1408" opacity="0.8" />
      {/* Horizon glow */}
      <radialGradient id="horizonGlow" cx="50%" cy="50%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <ellipse cx="150" cy="110" rx="90" ry="25" fill="url(#horizonGlow)" />
      {/* Two perspective path lines */}
      <line x1="0" y1="220" x2="150" y2="110" stroke={accent} strokeWidth="2" opacity="0.3" />
      <line x1="300" y1="220" x2="150" y2="110" stroke={accent} strokeWidth="2" opacity="0.3" />
      {/* Path fill */}
      <path d="M0,220 L150,110 L300,220 Z" fill={accent} opacity="0.06" />
      {/* Bright vanishing point */}
      <circle cx="150" cy="110" r="6" fill={accent} opacity="0.6" />
      <circle cx="150" cy="110" r="15" fill={accent} opacity="0.15" />
    </g>
  );
}

function ParadiseArt({ accent }: { accent: string }) {
  return (
    <g>
      {/* Rich green background handled by container gradient */}
      {/* Islamic pointed arch frame */}
      <path d="M70,210 L70,110 C70,60 130,30 150,20 C170,30 230,60 230,110 L230,210"
        fill="none" stroke={accent} strokeWidth="1.5" opacity="0.35" />
      <path d="M75,210 L75,112 C75,65 132,36 150,26 C168,36 225,65 225,112 L225,210"
        fill={accent} opacity="0.05" />
      {/* Left palm tree */}
      <rect x="22" y="140" width="8" height="75" fill={accent} opacity="0.2" rx="4" />
      <ellipse cx="26" cy="140" rx="20" ry="12" fill={accent} opacity="0.18" />
      <ellipse cx="14" cy="132" rx="14" ry="8" fill={accent} opacity="0.15" transform="rotate(-30,14,132)" />
      <ellipse cx="38" cy="130" rx="14" ry="8" fill={accent} opacity="0.15" transform="rotate(30,38,130)" />
      {/* Right palm tree */}
      <rect x="270" y="140" width="8" height="75" fill={accent} opacity="0.2" rx="4" />
      <ellipse cx="274" cy="140" rx="20" ry="12" fill={accent} opacity="0.18" />
      <ellipse cx="262" cy="132" rx="14" ry="8" fill={accent} opacity="0.15" transform="rotate(-30,262,132)" />
      <ellipse cx="286" cy="130" rx="14" ry="8" fill={accent} opacity="0.15" transform="rotate(30,286,130)" />
      {/* Reflection pool */}
      <rect x="60" y="195" width="180" height="8" rx="4" fill={accent} opacity="0.15" />
      <line x1="60" y1="195" x2="240" y2="195" stroke={accent} strokeWidth="1" opacity="0.3" />
    </g>
  );
}

function FaithArt({ accent }: { accent: string }) {
  const glowLines = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 150 + Math.cos(rad) * 40,
      y1: 105 + Math.sin(rad) * 40,
      x2: 150 + Math.cos(rad) * 75,
      y2: 105 + Math.sin(rad) * 75,
    };
  });
  return (
    <g>
      {/* Glow from center */}
      <radialGradient id="faithGlow" cx="50%" cy="47%" r="35%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#faithGlow)" />
      {/* Radiating glow lines */}
      {glowLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={accent} strokeWidth="1" opacity="0.18" />
      ))}
      {/* Halo circle (stroke only) */}
      <circle cx="150" cy="105" r="70" fill="none" stroke={accent} strokeWidth="1" opacity="0.2" />
      {/* Heart shape */}
      <path d="M150,140 C150,140 110,115 110,90 C110,72 122,62 135,65 C143,67 150,75 150,75 C150,75 157,67 165,65 C178,62 190,72 190,90 C190,115 150,140 150,140 Z"
        fill={accent} opacity="0.28" />
      <path d="M150,140 C150,140 110,115 110,90 C110,72 122,62 135,65 C143,67 150,75 150,75 C150,75 157,67 165,65 C178,62 190,72 190,90 C190,115 150,140 150,140 Z"
        fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
    </g>
  );
}

function SpeechArt({ accent }: { accent: string }) {
  return (
    <g>
      {/* Open book */}
      <path d="M80,160 C80,155 110,148 150,148 C190,148 220,155 220,160 L220,195 C220,200 190,195 150,195 C110,195 80,200 80,195 Z"
        fill={accent} opacity="0.12" stroke={accent} strokeWidth="1" />
      <line x1="150" y1="148" x2="150" y2="195" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      {/* Page lines left */}
      <line x1="95" y1="162" x2="145" y2="162" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      <line x1="95" y1="170" x2="145" y2="170" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      <line x1="95" y1="178" x2="145" y2="178" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      {/* Page lines right */}
      <line x1="155" y1="162" x2="205" y2="162" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      <line x1="155" y1="170" x2="205" y2="170" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      <line x1="155" y1="178" x2="205" y2="178" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      {/* Arabic calligraphy-like swirl */}
      <path d="M150,100 C165,85 185,85 190,100 C195,115 185,125 170,120 C158,116 152,105 160,95 C168,85 180,88 183,98"
        fill="none" stroke={accent} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      {/* Sound wave arcs to the right */}
      <path d="M205,95 C215,90 215,115 205,110" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <path d="M215,88 C230,80 230,122 215,115" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
      <path d="M225,80 C245,70 245,130 225,120" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
    </g>
  );
}

function TimeArt({ accent }: { accent: string }) {
  const stars = [
    { cx: 30, cy: 30, r: 1.5 }, { cx: 80, cy: 20, r: 1 }, { cx: 200, cy: 25, r: 1.5 },
    { cx: 250, cy: 40, r: 1 }, { cx: 270, cy: 15, r: 2 }, { cx: 130, cy: 15, r: 1 },
    { cx: 60, cy: 55, r: 1 }, { cx: 290, cy: 55, r: 1.5 },
  ];
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = -90 + i * 22.5;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 150 + Math.cos(rad) * 28,
      y1: 110 + Math.sin(rad) * 28,
      x2: 150 + Math.cos(rad) * 65,
      y2: 110 + Math.sin(rad) * 65,
    };
  });
  return (
    <g>
      {/* Horizon line */}
      <line x1="0" y1="110" x2="300" y2="110" stroke={accent} strokeWidth="0.5" opacity="0.2" />
      {/* Stars in upper half */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={accent} opacity="0.5" />
      ))}
      {/* Sun rays */}
      {rays.filter((_, i) => i < 8).map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={accent} strokeWidth="1.5" opacity="0.25" />
      ))}
      {/* Semi-circle sun */}
      <defs>
        <clipPath id="sunClip">
          <rect x="0" y="0" width="300" height="110" />
        </clipPath>
      </defs>
      <circle cx="150" cy="110" r="28" fill={accent} opacity="0.3" clipPath="url(#sunClip)" />
      <circle cx="150" cy="110" r="28" fill="none" stroke={accent} strokeWidth="1.5"
        opacity="0.5" clipPath="url(#sunClip)" />
      {/* Glow */}
      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <ellipse cx="150" cy="110" rx="70" ry="35" fill="url(#sunGlow)" />
    </g>
  );
}

function ShelterArt({ accent }: { accent: string }) {
  return (
    <g>
      {/* Golden glow above */}
      <radialGradient id="shelterGlow" cx="50%" cy="30%" r="40%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#shelterGlow)" />
      {/* Mosque body */}
      <rect x="75" y="145" width="150" height="70" fill={accent} opacity="0.18" rx="4" />
      {/* Main dome */}
      <ellipse cx="150" cy="145" rx="50" ry="30" fill={accent} opacity="0.22" />
      {/* Side domes */}
      <ellipse cx="100" cy="155" rx="25" ry="15" fill={accent} opacity="0.16" />
      <ellipse cx="200" cy="155" rx="25" ry="15" fill={accent} opacity="0.16" />
      {/* Left minaret */}
      <rect x="72" y="110" width="12" height="40" fill={accent} opacity="0.22" />
      <ellipse cx="78" cy="110" rx="6" ry="4" fill={accent} opacity="0.28" />
      {/* Right minaret */}
      <rect x="216" y="110" width="12" height="40" fill={accent} opacity="0.22" />
      <ellipse cx="222" cy="110" rx="6" ry="4" fill={accent} opacity="0.28" />
      {/* Door */}
      <path d="M138,215 L138,175 C138,168 162,168 162,175 L162,215 Z" fill={accent} opacity="0.3" />
    </g>
  );
}

function HandArt({ accent }: { accent: string }) {
  return (
    <g>
      <radialGradient id="handGlow" cx="50%" cy="60%" r="35%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#handGlow)" />
      {/* Palm */}
      <rect x="120" y="130" width="60" height="65" rx="15" fill={accent} opacity="0.2" />
      {/* Thumb */}
      <rect x="100" y="150" width="25" height="18" rx="9" fill={accent} opacity="0.18" transform="rotate(-20,112,159)" />
      {/* Fingers */}
      <rect x="122" y="100" width="12" height="38" rx="6" fill={accent} opacity="0.18" />
      <rect x="138" y="92" width="12" height="45" rx="6" fill={accent} opacity="0.2" />
      <rect x="154" y="97" width="12" height="40" rx="6" fill={accent} opacity="0.18" />
      <rect x="170" y="108" width="12" height="30" rx="6" fill={accent} opacity="0.15" />
    </g>
  );
}

function DoorArt({ accent }: { accent: string }) {
  return (
    <g>
      <radialGradient id="doorGlow" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#doorGlow)" />
      {/* Door frame */}
      <rect x="100" y="60" width="100" height="155" rx="2" fill="none" stroke={accent} strokeWidth="2" opacity="0.35" />
      {/* Arched top */}
      <path d="M100,105 C100,68 200,68 200,105" fill={accent} opacity="0.35" stroke={accent} strokeWidth="2" />
      {/* Door fill */}
      <rect x="100" y="105" width="100" height="110" fill={accent} opacity="0.08" />
      {/* Door knob */}
      <circle cx="188" cy="163" r="5" fill={accent} opacity="0.4" />
      {/* Keyhole */}
      <circle cx="150" cy="155" r="6" fill={accent} opacity="0.2" />
      <path d="M147,161 L153,161 L152,172 L148,172 Z" fill={accent} opacity="0.2" />
    </g>
  );
}

function VictoryArt({ accent }: { accent: string }) {
  return (
    <g>
      <radialGradient id="victoryGlow" cx="50%" cy="40%" r="40%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#victoryGlow)" />
      {/* Flagpole */}
      <rect x="148" y="40" width="4" height="170" fill={accent} opacity="0.3" />
      {/* Flag */}
      <path d="M152,45 L210,65 L152,85 Z" fill={accent} opacity="0.35" />
      {/* Flag pattern — crescent hint */}
      <path d="M175,62 C177,57 183,55 185,62 C183,58 179,58 175,62 Z" fill="#ffffff" opacity="0.3" />
      {/* Ground */}
      <ellipse cx="150" cy="210" rx="60" ry="8" fill={accent} opacity="0.08" />
    </g>
  );
}

function BarrierArt({ accent }: { accent: string }) {
  return (
    <g>
      {/* Circle */}
      <circle cx="150" cy="105" r="72" fill="none" stroke={accent} strokeWidth="4" opacity="0.4" />
      {/* Diagonal barrier line */}
      <line x1="99" y1="54" x2="201" y2="156" stroke={accent} strokeWidth="4" opacity="0.4" />
      {/* Inner fill */}
      <circle cx="150" cy="105" r="68" fill={accent} opacity="0.06" />
      {/* Text hint */}
      <text x="150" y="120" textAnchor="middle" fill={accent} fontSize="32" opacity="0.15" fontWeight="bold">✋</text>
    </g>
  );
}

function HeartArt({ accent }: { accent: string }) {
  const glowLines = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 150 + Math.cos(rad) * 45,
      y1: 100 + Math.sin(rad) * 45,
      x2: 150 + Math.cos(rad) * 80,
      y2: 100 + Math.sin(rad) * 80,
    };
  });
  return (
    <g>
      <radialGradient id="heartGlow" cx="50%" cy="45%" r="35%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#heartGlow)" />
      {glowLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={accent} strokeWidth="1" opacity="0.15" />
      ))}
      {/* Heart shape — larger */}
      <path d="M150,145 C150,145 100,112 100,82 C100,60 116,48 133,52 C143,55 150,65 150,65 C150,65 157,55 167,52 C184,48 200,60 200,82 C200,112 150,145 150,145 Z"
        fill={accent} opacity="0.3" />
      <path d="M150,145 C150,145 100,112 100,82 C100,60 116,48 133,52 C143,55 150,65 150,65 C150,65 157,55 167,52 C184,48 200,60 200,82 C200,112 150,145 150,145 Z"
        fill="none" stroke={accent} strokeWidth="2" opacity="0.55" />
    </g>
  );
}

function CosmosArt({ accent }: { accent: string }) {
  const burstLines = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 150 + Math.cos(rad) * 20,
      y1: 105 + Math.sin(rad) * 20,
      x2: 150 + Math.cos(rad) * 75,
      y2: 105 + Math.sin(rad) * 75,
    };
  });
  return (
    <g>
      <radialGradient id="cosmosGlow" cx="50%" cy="47%" r="45%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <rect x="0" y="0" width="300" height="220" fill="url(#cosmosGlow)" />
      {/* Starburst */}
      {burstLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={accent} strokeWidth={i % 3 === 0 ? 1.5 : 1} opacity={i % 3 === 0 ? 0.3 : 0.18} />
      ))}
      {/* Concentric rings */}
      <circle cx="150" cy="105" r="40" fill="none" stroke={accent} strokeWidth="1" opacity="0.2" />
      <circle cx="150" cy="105" r="65" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      <circle cx="150" cy="105" r="90" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.1" />
      {/* Center star */}
      <circle cx="150" cy="105" r="10" fill={accent} opacity="0.4" />
      <circle cx="150" cy="105" r="5" fill={accent} opacity="0.7" />
    </g>
  );
}

// ─── Scene Dispatcher ─────────────────────────────────────────────────────────

function SceneArt({ type, accent }: { type: SceneType; accent: string }) {
  switch (type) {
    case "divine":    return <DivineLightArt accent={accent} />;
    case "celestial": return <CelestialArt accent={accent} />;
    case "earth":     return <EarthArt accent={accent} />;
    case "water":     return <WaterArt accent={accent} />;
    case "fire":      return <FireArt accent={accent} />;
    case "people":    return <PeopleArt accent={accent} />;
    case "knowledge": return <KnowledgeArt accent={accent} />;
    case "path":      return <PathArt accent={accent} />;
    case "paradise":  return <ParadiseArt accent={accent} />;
    case "faith":     return <FaithArt accent={accent} />;
    case "speech":    return <SpeechArt accent={accent} />;
    case "time":      return <TimeArt accent={accent} />;
    case "shelter":   return <ShelterArt accent={accent} />;
    case "hand":      return <HandArt accent={accent} />;
    case "door":      return <DoorArt accent={accent} />;
    case "victory":   return <VictoryArt accent={accent} />;
    case "barrier":   return <BarrierArt accent={accent} />;
    case "heart":     return <HeartArt accent={accent} />;
    case "cosmos":    return <CosmosArt accent={accent} />;
    default:          return <EarthArt accent={accent} />;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MemoryScene({ arabic, transliteration, partOfSpeech, memoryHint, compact }: Props) {
  const scene = getSceneType(arabic, partOfSpeech);
  const col = PALETTES[scene];

  return (
    <div
      className={`relative w-full overflow-hidden${compact ? "" : " mb-4"}`}
      style={{
        borderRadius: "1.5rem",
        border: "1.5px solid rgba(217,119,6,0.25)",
        background: `linear-gradient(150deg, ${col.bg1}, ${col.bg2})`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* SVG illustrated art layer */}
      <svg
        viewBox="0 0 300 220"
        className="w-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: "block" }}
      >
        <SceneArt type={scene} accent={col.accent} />
      </svg>

      {/* Arabic text HTML overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: 0,
          left: 0,
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Traditional Arabic', 'Scheherazade New', 'Amiri', serif",
            fontSize: "3.5rem",
            lineHeight: 1.2,
            color: col.accent,
            textShadow: `0 0 24px ${col.accent}99, 0 0 8px ${col.accent}66`,
            direction: "rtl",
            padding: "0 1rem",
          }}
        >
          {arabic}
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            color: col.accent,
            opacity: 0.8,
            marginTop: "0.25rem",
            letterSpacing: "0.05em",
          }}
        >
          {transliteration}
        </div>
      </div>

      {/* Memory hint gradient overlay at bottom */}
      {memoryHint && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))",
            padding: "1.5rem 1rem 0.75rem",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
            💡 {memoryHint}
          </span>
        </div>
      )}
    </div>
  );
}

export default MemoryScene;

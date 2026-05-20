'use client';

export type SceneType =
  | 'divine-light' | 'celestial' | 'earth' | 'water' | 'fire'
  | 'people' | 'eye' | 'speech' | 'path' | 'garden'
  | 'cosmos' | 'faith' | 'time' | 'barrier' | 'shelter' | 'strength';

interface SC { bg1: string; bg2: string; accent: string }
const C: Record<SceneType, SC> = {
  'divine-light': { bg1:'#0a2a14', bg2:'#030a06', accent:'#f59e0b' },
  'celestial':    { bg1:'#050d28', bg2:'#020408', accent:'#93c5fd' },
  'earth':        { bg1:'#162a0c', bg2:'#060f04', accent:'#86efac' },
  'water':        { bg1:'#062030', bg2:'#020810', accent:'#7dd3fc' },
  'fire':         { bg1:'#2a0a04', bg2:'#0f0302', accent:'#fb923c' },
  'people':       { bg1:'#0c1634', bg2:'#040610', accent:'#a5b4fc' },
  'eye':          { bg1:'#100528', bg2:'#060210', accent:'#c084fc' },
  'speech':       { bg1:'#042030', bg2:'#020810', accent:'#38bdf8' },
  'path':         { bg1:'#080820', bg2:'#020208', accent:'#a78bfa' },
  'garden':       { bg1:'#082814', bg2:'#030f06', accent:'#4ade80' },
  'cosmos':       { bg1:'#060218', bg2:'#020108', accent:'#818cf8' },
  'faith':        { bg1:'#200c14', bg2:'#0a0408', accent:'#f472b6' },
  'time':         { bg1:'#201406', bg2:'#0a0602', accent:'#fdba74' },
  'barrier':      { bg1:'#2a0606', bg2:'#0f0202', accent:'#f87171' },
  'shelter':      { bg1:'#062020', bg2:'#020a0a', accent:'#5eead4' },
  'strength':     { bg1:'#180428', bg2:'#080210', accent:'#d946ef' },
};

// Word → scene type mapping
const WS: Record<string, SceneType> = {
  // Divine / light
  "اللَّه":"divine-light","نُور":"divine-light","النُّور":"divine-light",
  "الْحَمْدُ":"divine-light","رَبِّ":"divine-light","رَبّ":"divine-light",
  "مُحَمَّد":"divine-light","نَبِيّ":"divine-light","رَسُول":"divine-light",
  "قُرْآن":"divine-light","مَلَك":"divine-light","آخِرَة":"divine-light",
  "مُوسَى":"divine-light","عِيسَى":"divine-light","إِبْرَاهِيم":"divine-light",
  "يُوسُف":"divine-light","مَرْيَم":"divine-light","آيَة":"divine-light",
  "رَحِيم":"divine-light","حَكِيم":"divine-light","عَلِيم":"divine-light",
  "غَفُور":"divine-light","كَرِيم":"divine-light","عَظِيم":"divine-light",
  "قَدِيم":"divine-light","حَيّ":"divine-light","أَزَل":"divine-light",
  // Celestial
  "السَّمَاء":"celestial","السَّمَاوَاتِ":"celestial","شَمْس":"celestial",
  "قَمَر":"celestial","نَجْم":"celestial","لَيْل":"celestial",
  "نَهَار":"celestial","رِيح":"celestial","سَحَاب":"celestial","طَيْر":"celestial",
  // Earth
  "الْأَرْضَ":"earth","أَرْض":"earth","مَطَر":"water",
  // Water
  "مَاء":"water","بَحْر":"water","نَهَر":"water","رَحْمَة":"water",
  // Fire
  "نَار":"fire","جَحِيم":"fire","عَذَاب":"fire",
  // People
  "النَّاس":"people","قَوْم":"people","أَهْل":"people","رَجُل":"people",
  "امْرَأَة":"people","وَلَد":"people","ابْن":"people","بِنْت":"people",
  "أَب":"people","أُمّ":"people","أَخ":"people","زَوْج":"people",
  "نِسَاء":"people","بَنُو":"people","آدَم":"people","الَّذِينَ":"people",
  "عَبْد":"people","إِنْسَان":"people","نَفْس":"people","جَسَد":"people",
  "رُوح":"faith","وَجْه":"people","يَد":"people","رَأْس":"people",
  // Knowledge / sight
  "عِلْم":"eye","يَعْلَمُ":"eye","عَرَفَ":"eye","بَصِير":"eye",
  "رَأَى":"eye","نَظَرَ":"eye","الْكِتَاب":"eye","كِتَاب":"eye",
  "قَلَم":"eye","قَرَأَ":"eye","كَتَبَ":"eye","لَوْح":"eye",
  "صَحِيفَة":"eye","عَيْن":"eye","بُرْهَان":"eye","بَيِّنَة":"eye",
  "ذَكَرَ":"eye","نَسِيَ":"eye","مِفْتَاح":"eye",
  // Speech
  "قَالَ":"speech","قَوْل":"speech","كَلِمَة":"speech","لِسَان":"speech",
  "سَمِعَ":"speech","سَمِيع":"speech","أُذُن":"speech","دَعَا":"speech",
  "وَعَدَ":"speech","أَجَابَ":"speech","سَأَلَ":"speech","حَدِيث":"speech",
  "أَمَرَ":"speech","نَهَى":"speech","وَعْد":"speech","وَعِيد":"speech",
  // Path / guidance
  "صِرَاطٍ":"path","مُسْتَقِيمٍ":"path","هُدًى":"path","هَدَى":"path",
  "الدِّينِ":"path","حَقّ":"path","إِلَى":"path","ذَهَبَ":"path",
  "جَاءَ":"path","رَجَعَ":"path","مَشَى":"path","سَعَى":"path",
  "دَخَلَ":"path","خَرَجَ":"path","نَزَلَ":"path","رَفَعَ":"path",
  // Garden / paradise
  "جَنَّة":"garden","فِرْدَوْس":"garden","رِزْق":"garden","نِعْمَة":"garden",
  "فَضْل":"garden","خَيْر":"garden","حَسَنَة":"garden","شَجَر":"garden",
  "ثَمَر":"garden","طَعَام":"garden","جَبَل":"earth",
  // Cosmos / creation
  "خَلَقَ":"cosmos","الْعَالَمِينَ":"cosmos","دُنْيَا":"cosmos",
  "قِيَامَة":"cosmos","عَرْش":"cosmos","نُوح":"cosmos",
  "كَانَ":"cosmos","يَكُونُ":"cosmos","جَعَلَ":"cosmos","بَعَثَ":"cosmos",
  "جَمَعَ":"cosmos","فَرَّقَ":"cosmos",
  // Faith / worship
  "آمَنُوا":"faith","آمَنَ":"faith","إِيمَان":"faith","إِسْلَام":"faith",
  "تَقْوَى":"faith","صَلَاة":"faith","زَكَاة":"faith","صَوْم":"faith",
  "دُعَاء":"faith","عِبَادَة":"faith","عَبَدَ":"faith","سَجَدَ":"faith",
  "رَكَعَ":"faith","صَلَّى":"faith","قَلْب":"faith","حُبّ":"faith",
  "رَجَا":"faith","شَكَرَ":"faith","تَوْبَة":"faith","ذِكْر":"faith",
  "صَبْر":"faith","مَغْفِرَة":"faith","عَفْو":"faith","أَجْر":"faith",
  "شُكْر":"faith","فَرَح":"faith","اتَّقَى":"faith","رَحِمَ":"faith",
  "غَفَرَ":"faith","حَجّ":"shelter","صَادِق":"faith","خَشِيَ":"faith",
  // Time
  "يَوْم":"time","شَهْر":"time","سَنَة":"time","سَاعَة":"time",
  "بَعْدَ":"time","قَبْلَ":"time","حَتَّى":"time","ثُمَّ":"time",
  "مَتَى":"time","لَبِثَ":"time",
  // Barrier / negation / evil
  "لَا":"barrier","لَمْ":"barrier","لَنْ":"barrier","كَفَرَ":"barrier",
  "كُفْر":"barrier","شَيْطَان":"barrier","إِبْلِيس":"barrier","ظَلَمَ":"barrier",
  "فِتْنَة":"barrier","شَرّ":"barrier","سَيِّئَة":"barrier","إِثْم":"barrier",
  "ذَنْب":"barrier","خَبِيث":"barrier","مَيِّت":"barrier","ضَلَّ":"barrier",
  "أَضَلَّ":"barrier","قَتَلَ":"barrier","فِرْعَوْن":"barrier",
  "كَذَبَ":"barrier","بُغْض":"barrier","خَوْف":"barrier","حُزْن":"barrier",
  "عَذَّبَ":"barrier","بَلَاء":"barrier","مَاتَ":"barrier",
  // Shelter / mosque
  "مَسْجِد":"shelter","كَعْبَة":"shelter","بَيْت":"shelter",
  "كُرْسِيّ":"shelter","أَمْن":"shelter","سَلَام":"shelter",
  "بَلَد":"shelter","قَرْيَة":"shelter","مَدِينَة":"shelter",
  // Strength / power
  "عَزِيز":"strength","قَدِير":"strength","قَوِيّ":"strength","نَصَرَ":"strength",
  "فَتَحَ":"strength","نَصْر":"strength","فَتْح":"strength","سُلْطَان":"strength",
  "مُلْك":"strength","مَلِك":"strength","حُكْم":"strength","كَبِير":"strength",
};

export function getSceneForWord(arabic: string, pos: string): SceneType {
  if (WS[arabic]) return WS[arabic];
  if (pos.includes("bağlaç")) return "cosmos";
  if (pos.includes("harf-i cer")) return "path";
  if (pos.includes("zamir")) return "people";
  if (pos.includes("olumsuzluk")) return "barrier";
  if (pos.includes("edat")) return "path";
  if (pos.includes("soru")) return "eye";
  if (pos.includes("zarf")) return "time";
  if (pos.includes("fiil")) return "cosmos";
  if (pos.includes("sıfat")) return "faith";
  return "cosmos";
}

// ── Scene art components (SVG, viewBox 0 0 300 360) ──────────────────────────

function DivineLightArt({ a }: { a: string }) {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 - 90) * Math.PI / 180;
    return { x2: 150 + Math.cos(angle) * 320, y2: 80 + Math.sin(angle) * 320 };
  });
  return (
    <>
      <g opacity="0.28">
        {rays.map((r, i) => <line key={i} x1="150" y1="80" x2={r.x2} y2={r.y2} stroke={a} strokeWidth="2.5" />)}
      </g>
      <circle cx="150" cy="80" r="14" fill={a} opacity="0.95" />
      <circle cx="150" cy="80" r="35" fill={a} opacity="0.22" />
      <circle cx="150" cy="80" r="60" fill={a} opacity="0.1" />
      <circle cx="150" cy="80" r="95" fill={a} opacity="0.05" />
      {/* Mosque */}
      <g fill={a} opacity="0.55">
        <rect x="38" y="252" width="16" height="108" rx="2" />
        <polygon points="38,252 46,228 54,252" />
        <circle cx="46" cy="225" r="6" />
        <rect x="246" y="252" width="16" height="108" rx="2" />
        <polygon points="246,252 254,228 262,252" />
        <circle cx="254" cy="225" r="6" />
        <path d="M68,320 L68,272 C68,222 108,196 150,196 C192,196 232,222 232,272 L232,320Z" />
        <rect x="140" y="186" width="20" height="18" rx="3" />
        <ellipse cx="150" cy="184" rx="12" ry="16" />
        <rect x="0" y="320" width="300" height="40" />
      </g>
    </>
  );
}

function CelestialArt({ a }: { a: string }) {
  const stars = Array.from({ length: 42 }, (_, i) => ({
    x: ((i * 137.508) % 268) + 16,
    y: ((i * 89.47) % 320) + 16,
    r: [0.8, 1.3, 1.8, 1.0, 1.5][i % 5],
    o: [0.4, 0.65, 0.85, 0.5, 0.7][i % 5],
  }));
  return (
    <>
      {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={a} opacity={s.o} />)}
      <circle cx="150" cy="125" r="58" fill={a} opacity="0.82" />
      <circle cx="174" cy="113" r="50" fill="#030d28" />
      <g transform="translate(214,78) scale(0.9)">
        <polygon points="0,-14 3.3,-3.3 14,0 3.3,3.3 0,14 -3.3,3.3 -14,0 -3.3,-3.3" fill={a} opacity="0.9" />
      </g>
      <g transform="translate(88,52) scale(0.6)">
        <polygon points="0,-14 3.3,-3.3 14,0 3.3,3.3 0,14 -3.3,3.3 -14,0 -3.3,-3.3" fill={a} opacity="0.75" />
      </g>
    </>
  );
}

function EarthArt({ a }: { a: string }) {
  return (
    <>
      {[{x:40,y:45},{x:105,y:28},{x:185,y:58},{x:245,y:38},{x:275,y:80}].map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r="1.6" fill={a} opacity="0.55" />
      ))}
      <circle cx="230" cy="60" r="22" fill={a} opacity="0.65" />
      <circle cx="240" cy="54" r="18" fill="#102a0a" />
      <path d="M0,270 L75,148 L128,215 L188,118 L248,198 L300,155 L300,360 L0,360Z" fill={a} opacity="0.35" />
      <path d="M0,270 L75,148 L128,215 L188,118 L248,198 L300,155" fill="none" stroke={a} strokeWidth="2" opacity="0.55" />
      <path d="M0,310 Q150,285 300,310 L300,360 L0,360Z" fill={a} opacity="0.18" />
      <rect x="52" y="218" width="11" height="60" rx="2" fill={a} opacity="0.65" />
      <ellipse cx="57" cy="208" rx="24" ry="30" fill={a} opacity="0.5" />
    </>
  );
}

function WaterArt({ a }: { a: string }) {
  function wave(y: number, amp: number) {
    return `M0,${y} C50,${y - amp} 100,${y + amp} 150,${y} C200,${y - amp} 250,${y + amp} 300,${y} L300,360 L0,360Z`;
  }
  const waves = [{y:155,a:18},{y:190,a:20},{y:225,a:16},{y:258,a:18},{y:290,a:14}];
  return (
    <>
      <circle cx="150" cy="95" r="32" fill={a} opacity="0.55" />
      <circle cx="163" cy="87" r="27" fill="#041c2a" />
      {[{x:65,y:140},{x:180,y:125},{x:245,y:148}].map((s,i)=>(
        <ellipse key={i} cx={s.x} cy={s.y} rx="28" ry="4" fill={a} opacity="0.1" />
      ))}
      {waves.map((w, i) => (
        <path key={i} d={wave(w.y, w.a)} fill={a} opacity={0.07 + i * 0.038} />
      ))}
      {[148, 186, 222].map((y, i) => (
        <path key={i} d={`M8,${y} C55,${y-16} 108,${y+16} 150,${y} C192,${y-16} 245,${y+16} 292,${y}`}
              stroke={a} strokeWidth="1.8" fill="none" opacity="0.38" />
      ))}
    </>
  );
}

function FireArt({ a }: { a: string }) {
  return (
    <>
      {/* Main central flame */}
      <path d="M150,335 C128,278 95,248 128,185 C108,228 152,218 140,155 C158,212 186,200 173,148 C200,205 178,255 205,282 C216,248 198,185 225,155 C225,212 258,235 234,292 Z"
            fill={a} opacity="0.88" />
      {/* Left flame */}
      <path d="M108,335 C92,292 65,265 98,208 C82,245 122,242 105,182 C122,226 148,212 136,162 C132,222 168,238 148,292 Z"
            fill={a} opacity="0.58" />
      {/* Right flame */}
      <path d="M192,335 C205,295 235,268 200,212 C218,248 178,245 196,188 C178,228 152,215 165,170 C172,222 135,238 158,292 Z"
            fill={a} opacity="0.55" />
      {/* Embers */}
      {[{x:102,y:158},{x:140,y:120},{x:180,y:138},{x:205,y:102},{x:222,y:162},{x:125,y:100}].map((e,i)=>(
        <circle key={i} cx={e.x} cy={e.y} r="3.5" fill={a} opacity={0.38 + (i%3)*0.22} />
      ))}
      <ellipse cx="150" cy="345" rx="85" ry="12" fill={a} opacity="0.18" />
    </>
  );
}

function PeopleArt({ a }: { a: string }) {
  return (
    <>
      <path d="M0,308 Q150,288 300,308 L300,360 L0,360Z" fill={a} opacity="0.1" />
      {/* Left */}
      <g fill={a} opacity="0.68" transform="translate(72,268)">
        <circle cx="0" cy="-48" r="22" />
        <path d="M-24,-22 C-28,10 -22,66 0,66 C22,66 28,10 24,-22 C16,-34 -16,-34 -24,-22Z" />
      </g>
      {/* Center (larger) */}
      <g fill={a} opacity="0.92" transform="translate(150,258)">
        <circle cx="0" cy="-55" r="27" />
        <path d="M-29,-24 C-33,12 -25,78 0,78 C25,78 33,12 29,-24 C20,-40 -20,-40 -29,-24Z" />
      </g>
      {/* Right */}
      <g fill={a} opacity="0.68" transform="translate(228,268)">
        <circle cx="0" cy="-48" r="22" />
        <path d="M-24,-22 C-28,10 -22,66 0,66 C22,66 28,10 24,-22 C16,-34 -16,-34 -24,-22Z" />
      </g>
    </>
  );
}

function EyeArt({ a }: { a: string }) {
  const beams = Array.from({length:8}, (_,i) => {
    const ang = (i * 45) * Math.PI / 180;
    return { x1: Math.cos(ang)*46, y1: Math.sin(ang)*46, x2: Math.cos(ang)*95, y2: Math.sin(ang)*95 };
  });
  return (
    <>
      <g transform="translate(150,140)">
        <path d="M-105,0 C-85,-55 -32,-88 0,-88 C32,-88 85,-55 105,0 C85,55 32,88 0,88 C-32,88 -85,55 -105,0Z"
              fill={a} opacity="0.14" stroke={a} strokeWidth="2.5" />
        <circle cx="0" cy="0" r="42" fill={a} opacity="0.28" />
        <circle cx="0" cy="0" r="20" fill={a} opacity="0.85" />
        <circle cx="-8" cy="-8" r="5.5" fill="white" opacity="0.45" />
        <g opacity="0.38">
          {beams.map((b,i) => <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke={a} strokeWidth="1.8" />)}
        </g>
      </g>
      {/* Book */}
      <g transform="translate(150,272)" fill="none" stroke={a} strokeWidth="1.8" opacity="0.45">
        <path d="M-62,-28 C-62,-33 -6,-38 0,-32 L0,32 C-6,26 -62,22 -62,28Z" />
        <path d="M62,-28 C62,-33 6,-38 0,-32 L0,32 C6,26 62,22 62,28Z" />
        {[-18,-7,4].map((y,i) => <line key={i} x1="-42" y1={y} x2="-8" y2={y-1.5} strokeWidth="1.2" />)}
      </g>
    </>
  );
}

function SpeechArt({ a }: { a: string }) {
  const arcs = [70, 100, 132, 165];
  return (
    <>
      {/* Lips */}
      <g transform="translate(150,130)">
        <path d="M-58,0 C-42,-24 -22,-34 0,-34 C22,-34 42,-24 58,0 C42,24 22,34 0,34 C-22,34 -42,24 -58,0Z"
              fill={a} opacity="0.2" stroke={a} strokeWidth="2.2" />
        <path d="M-38,5 C-18,18 18,18 38,5" fill="none" stroke={a} strokeWidth="2" opacity="0.6" />
        <path d="M-58,0 C-32,-10 32,-10 58,0" fill={a} opacity="0.28" />
      </g>
      {/* Sound waves */}
      {arcs.map((r, i) => (
        <path key={i}
              d={`M${150+r*0.72},${130-r*0.42} A${r},${r} 0 0,1 ${150+r*0.72},${130+r*0.42}`}
              fill="none" stroke={a} strokeWidth="2" opacity={0.52 - i * 0.1} />
      ))}
      {/* Calligraphy stroke */}
      <path d="M55,248 C88,237 112,256 135,242 C152,230 162,252 182,240 C202,228 224,252 248,240"
            fill="none" stroke={a} strokeWidth="2.8" opacity="0.32" strokeLinecap="round" />
    </>
  );
}

function PathArt({ a }: { a: string }) {
  const hLines = [185, 220, 258, 300, 345];
  return (
    <>
      {[{x:42,y:55},{x:95,y:32},{x:195,y:60},{x:258,y:42},{x:148,y:18},{x:285,y:88}].map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r="1.8" fill={a} opacity="0.62" />
      ))}
      <path d="M0,360 L118,162 L182,162 L300,360Z" fill={a} opacity="0.07" />
      <line x1="0" y1="360" x2="150" y2="162" stroke={a} strokeWidth="2.2" opacity="0.55" />
      <line x1="300" y1="360" x2="150" y2="162" stroke={a} strokeWidth="2.2" opacity="0.55" />
      {hLines.map((y, i) => {
        const t = (y - 162) / 198;
        const w = t * 148;
        return <line key={i} x1={150-w} y1={y} x2={150+w} y2={y} stroke={a} strokeWidth="1" opacity={0.18 + i*0.08} />;
      })}
      <ellipse cx="150" cy="164" rx="42" ry="18" fill={a} opacity="0.42" />
      <ellipse cx="150" cy="164" rx="82" ry="30" fill={a} opacity="0.15" />
    </>
  );
}

function GardenArt({ a }: { a: string }) {
  const leftFronds = [[-22,-12],[-34,-32],[-18,-54],[6,-60],[22,-44],[28,-22]];
  const rightFronds = [[22,-12],[34,-32],[18,-54],[-6,-60],[-22,-44],[-28,-22]];
  return (
    <>
      {/* Arch */}
      <path d="M78,340 L78,198 C78,126 112,94 150,94 C188,94 222,126 222,198 L222,340Z"
            fill={a} opacity="0.1" stroke={a} strokeWidth="2.2" />
      <path d="M78,198 C78,126 112,94 150,94 C188,94 222,126 222,198"
            fill="none" stroke={a} strokeWidth="2.8" />
      <circle cx="150" cy="140" r="16" fill={a} opacity="0.52" />
      {/* Left palm */}
      <g transform="translate(32,252)" fill="none" stroke={a} strokeWidth="4.5" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="108" stroke={a} fill={a} strokeWidth="12" opacity="0.55" />
        {leftFronds.map(([dx,dy],i) => (
          <path key={i} d={`M0,0 C${dx/2},${dy/2} ${dx},${dy} ${dx},${dy}`} opacity="0.7" />
        ))}
      </g>
      {/* Right palm */}
      <g transform="translate(268,252) scale(-1,1)" fill="none" stroke={a} strokeWidth="4.5" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="108" stroke={a} fill={a} strokeWidth="12" opacity="0.55" />
        {rightFronds.map(([dx,dy],i) => (
          <path key={i} d={`M0,0 C${dx/2},${dy/2} ${dx},${dy} ${dx},${dy}`} opacity="0.7" />
        ))}
      </g>
      {/* Water */}
      <path d="M0,332 C55,318 105,345 150,332 C195,318 248,345 300,332 L300,360 L0,360Z"
            fill={a} opacity="0.22" />
    </>
  );
}

function CosmosArt({ a }: { a: string }) {
  const burst = Array.from({length:22}, (_, i) => {
    const ang = (i * (360/22)) * Math.PI / 180;
    return { x2: 150 + Math.cos(ang) * 230, y2: 160 + Math.sin(ang) * 230 };
  });
  const stars = Array.from({length:55}, (_, i) => ({
    x: ((i * 137.5) % 278) + 11,
    y: ((i * 89.7) % 348) + 8,
    r: [0.6, 1.1, 1.6, 0.9][i % 4],
  }));
  return (
    <>
      {stars.map((s,i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={a} opacity={0.28 + (i%3)*0.2} />)}
      <g opacity="0.25">
        {burst.map((r, i) => <line key={i} x1="150" y1="160" x2={r.x2} y2={r.y2} stroke={a} strokeWidth="1.2" />)}
      </g>
      <ellipse cx="150" cy="160" rx="62" ry="26" fill="none" stroke={a} strokeWidth="1.8" opacity="0.3" transform="rotate(-22,150,160)" />
      <ellipse cx="150" cy="160" rx="95" ry="38" fill="none" stroke={a} strokeWidth="1.2" opacity="0.2" transform="rotate(32,150,160)" />
      <ellipse cx="150" cy="160" rx="128" ry="52" fill="none" stroke={a} strokeWidth="1" opacity="0.14" transform="rotate(-45,150,160)" />
      <circle cx="150" cy="160" r="22" fill={a} opacity="0.72" />
      <circle cx="150" cy="160" r="42" fill={a} opacity="0.18" />
    </>
  );
}

function FaithArt({ a }: { a: string }) {
  const spokes = Array.from({length:12}, (_, i) => {
    const ang = (i * 30) * Math.PI / 180;
    return { x1: 150 + Math.cos(ang)*58, y1: 148 + Math.sin(ang)*58, x2: 150 + Math.cos(ang)*118, y2: 148 + Math.sin(ang)*118 };
  });
  return (
    <>
      <g opacity="0.22">
        {spokes.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={a} strokeWidth="1.8" />)}
      </g>
      <path d="M150,208 C96,174 55,120 78,76 C94,44 138,56 150,82 C162,56 206,44 222,76 C245,120 204,174 150,208Z"
            fill={a} opacity="0.78" />
      <path d="M150,192 C118,166 92,130 108,98 C118,76 142,86 150,104 C158,86 182,76 192,98 C208,130 182,166 150,192Z"
            fill="white" opacity="0.14" />
      {[{x:88,y:248},{x:150,y:264},{x:212,y:248}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="4" fill={a} opacity="0.48" />
      ))}
    </>
  );
}

function TimeArt({ a }: { a: string }) {
  const sunRays = Array.from({length:8}, (_, i) => {
    const ang = (i * 45) * Math.PI / 180;
    return { x1: 150 + Math.cos(ang)*54, y1: 100 + Math.sin(ang)*54, x2: 150 + Math.cos(ang)*76, y2: 100 + Math.sin(ang)*76 };
  });
  return (
    <>
      {[{x:30,y:62},{x:92,y:42},{x:205,y:72},{x:262,y:52}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1.8" fill={a} opacity="0.52" />
      ))}
      <path d="M0,268 Q150,245 300,268 L300,360 L0,360Z" fill={a} opacity="0.15" />
      <path d="M8,270 A175,175 0 0,1 292,270" fill="none" stroke={a} strokeWidth="2" opacity="0.32" strokeDasharray="9,7" />
      <circle cx="150" cy="100" r="38" fill={a} opacity="0.85" />
      <circle cx="150" cy="100" r="54" fill={a} opacity="0.18" />
      <g opacity="0.5">
        {sunRays.map((r,i) => <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={a} strokeWidth="3.5" strokeLinecap="round" />)}
      </g>
    </>
  );
}

function BarrierArt({ a }: { a: string }) {
  return (
    <>
      <circle cx="150" cy="158" r="98" fill="none" stroke={a} strokeWidth="12" opacity="0.82" />
      <line x1="80" y1="88" x2="220" y2="228" stroke={a} strokeWidth="12" opacity="0.82" strokeLinecap="round" />
      <circle cx="150" cy="158" r="98" fill={a} opacity="0.06" />
      <circle cx="150" cy="158" r="120" fill="none" stroke={a} strokeWidth="2" opacity="0.22" />
      <circle cx="150" cy="158" r="138" fill="none" stroke={a} strokeWidth="1" opacity="0.12" />
    </>
  );
}

function ShelterArt({ a }: { a: string }) {
  return (
    <>
      {[{x:55,y:62},{x:115,y:42},{x:195,y:58},{x:252,y:38}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1.8" fill={a} opacity="0.62" />
      ))}
      <g fill={a} opacity="0.65">
        {/* Left minaret */}
        <rect x="32" y="188" width="20" height="172" rx="3" />
        <polygon points="32,188 42,162 52,188" />
        <ellipse cx="42" cy="159" rx="8" ry="11" />
        {/* Right minaret */}
        <rect x="248" y="188" width="20" height="172" rx="3" />
        <polygon points="248,188 258,162 268,188" />
        <ellipse cx="258" cy="159" rx="8" ry="11" />
        {/* Main building */}
        <rect x="65" y="248" width="170" height="112" rx="3" opacity="0.8" />
        {/* Main dome */}
        <path d="M68,248 L68,205 C68,158 108,132 150,132 C192,132 232,158 232,205 L232,248Z" />
        {/* Dome finial */}
        <rect x="145" y="122" width="10" height="16" rx="2" />
        <ellipse cx="150" cy="120" rx="10" ry="14" />
        {/* Door */}
        <path d="M126,360 L126,308 C126,292 138,283 150,283 C162,283 174,292 174,308 L174,360Z"
              fill="none" stroke={a} strokeWidth="2" opacity="0.55" />
        {/* Windows */}
        {[88, 150, 212].map((x,i) => (
          <path key={i} d={`M${x-13},272 L${x-13},258 A13,13 0 0,1 ${x+13},258 L${x+13},272Z`}
                fill="none" stroke={a} strokeWidth="2" opacity="0.45" />
        ))}
      </g>
    </>
  );
}

function StrengthArt({ a }: { a: string }) {
  return (
    <>
      {[{x:42,y:75},{x:130,y:52},{x:225,y:68}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1.8" fill={a} opacity="0.55" />
      ))}
      <path d="M0,360 L62,218 L118,290 L172,158 L228,252 L282,178 L300,215 L300,360Z"
            fill={a} opacity="0.38" />
      <path d="M0,360 L62,218 L118,290 L172,158 L228,252 L282,178 L300,215"
            fill="none" stroke={a} strokeWidth="2.2" opacity="0.62" />
      {/* Lightning bolt */}
      <path d="M168,92 L138,178 L162,178 L132,268 L178,162 L154,162 L184,92Z"
            fill={a} opacity="0.82" />
      <ellipse cx="155" cy="180" rx="32" ry="42" fill={a} opacity="0.14" />
    </>
  );
}

// Border decoration (inner frame)
function BorderArt({ a }: { a: string }) {
  return (
    <rect x="2" y="2" width="296" height="356" rx="22" ry="22"
          fill="none" stroke={a} strokeWidth="1.2" opacity="0.32" />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  arabic: string;
  transliteration: string;
  partOfSpeech: string;
  memoryHint?: string | null;
  root?: string | null;
  compact?: boolean;
}

export function MemoryScene({ arabic, transliteration, partOfSpeech, memoryHint, root, compact }: Props) {
  const scene = getSceneForWord(arabic, partOfSpeech);
  const col = C[scene];

  const uniqueId = `ms-${arabic.charCodeAt(0)}-${scene}`;

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden${compact ? "" : " mb-4"}`}
         style={{
           background: `linear-gradient(145deg, ${col.bg1}, ${col.bg2})`,
           border: '1.5px solid rgba(217,119,6,0.3)',
           boxShadow: `0 0 0 1px rgba(217,119,6,0.06), 0 8px 40px rgba(0,0,0,0.65), 0 0 60px ${col.accent}12`,
         }}>

      {/* SVG illustration layer */}
      <svg viewBox="0 0 300 360" className="w-full" style={{display:'block'}}
           preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <radialGradient id={`${uniqueId}-rg`} cx="50%" cy="28%" r="52%">
            <stop offset="0%" stopColor={col.accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={col.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="300" height="360" fill={`url(#${uniqueId}-rg)`} />

        {scene === 'divine-light' && <DivineLightArt a={col.accent} />}
        {scene === 'celestial'    && <CelestialArt   a={col.accent} />}
        {scene === 'earth'        && <EarthArt        a={col.accent} />}
        {scene === 'water'        && <WaterArt        a={col.accent} />}
        {scene === 'fire'         && <FireArt         a={col.accent} />}
        {scene === 'people'       && <PeopleArt       a={col.accent} />}
        {scene === 'eye'          && <EyeArt          a={col.accent} />}
        {scene === 'speech'       && <SpeechArt       a={col.accent} />}
        {scene === 'path'         && <PathArt         a={col.accent} />}
        {scene === 'garden'       && <GardenArt       a={col.accent} />}
        {scene === 'cosmos'       && <CosmosArt       a={col.accent} />}
        {scene === 'faith'        && <FaithArt        a={col.accent} />}
        {scene === 'time'         && <TimeArt         a={col.accent} />}
        {scene === 'barrier'      && <BarrierArt      a={col.accent} />}
        {scene === 'shelter'      && <ShelterArt      a={col.accent} />}
        {scene === 'strength'     && <StrengthArt     a={col.accent} />}

        <BorderArt a={col.accent} />
      </svg>

      {/* Text overlay — centered on the card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none px-5">
        {root && (
          <div className="absolute arabic-text text-[8rem] text-white/[0.05] font-black leading-none"
               style={{top:'50%', transform:'translateY(-50%)'}}>{root}</div>
        )}
        <div className="arabic-text text-[4.5rem] leading-tight text-white/92 font-bold drop-shadow-xl z-10 text-center"
             style={{textShadow:`0 2px 20px ${col.accent}55`}}>{arabic}</div>
        <div className="text-[1.15rem] font-semibold z-10 mt-2 tracking-wide drop-shadow-md"
             style={{color: col.accent}}>{transliteration}</div>
      </div>

      {/* Memory anchor overlay at bottom */}
      {memoryHint && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/92 via-black/52 to-transparent px-4 pt-14 pb-4">
          <div className="flex items-start gap-2">
            <span className="text-[1.05rem] shrink-0 mt-0.5">💡</span>
            <span className="text-[0.82rem] font-medium leading-snug" style={{color:`${col.accent}f0`}}>{memoryHint}</span>
          </div>
        </div>
      )}

      {/* Corner ornaments */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 rounded-tl" style={{borderColor:`${col.accent}65`}} />
        <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 rounded-tr" style={{borderColor:`${col.accent}65`}} />
        <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 rounded-bl" style={{borderColor:`${col.accent}65`}} />
        <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 rounded-br" style={{borderColor:`${col.accent}65`}} />
      </div>
    </div>
  );
}

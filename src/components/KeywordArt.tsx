// Custom SVG illustrations for keyword method (anahtar kelime yöntemi)
// Each scene depicts the phonetic bridge story, not a generic background.

import React from "react";

export type KeywordSceneId =
  | "pomegranate-fire"   // نَار  → tutuşan NAR meyvesi
  | "castle-speech"      // قَالَ → KALE konuşuyor
  | "dervish-sky"        // السَّمَاء → SEMA göğe yükseliyor
  | "mirror-eye"         // عَيْن → AYNADA bir GÖZ
  | "mother-water"       // مَاء → MA (anne) su veriyor
  | "chick-sunrise"      // يَوْم → YAVRUM güneşin doğuşu
  | "door-light"         // فَتَحَ → FETİH gibi kapı AÇILDI
  | "forgiveness"        // غَفَرَ → GAFA yaptı, AFFOLUNDU
  | "scribe-quill"       // كَتَبَ → KÂTİP yazdı
  | "aunt-creating"      // خَلَقَ → HALA bir şey YARATTI
  | "praying-amen"       // آمَنُوا → AMEN diyenler iman etti
  | "aha-lightbulb"      // أَخَذَ → AHA! deyip ALDI
  | "gift-sparkle"       // خَيْر → HAYIR vermek = İYİLİK
  | "heart-network"      // حُبّ → HUB = SEVGİ merkezi
  | "straight-ruler"     // مُسْتَقِيم → MUSTAKİL gibi DOSDOĞRU
  | "person-ground"      // الْأَرْض → ARDA YERE oturdu
  | "cognate"            // Türkçe'de zaten var!
  | "default";

// ── 1. نَار → NAR meyvesi tutuşuyor ────────────────────────────────────────
function PomegranateFire() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="pfBg" cx="50%" cy="70%" r="70%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="100%" stopColor="#0d0000" />
        </radialGradient>
        <radialGradient id="pfGlow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pfFlame" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ef4444" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#pfBg)" />
      <ellipse cx="150" cy="140" rx="90" ry="65" fill="url(#pfGlow)" />
      {/* Pomegranate body */}
      <ellipse cx="150" cy="145" rx="50" ry="54" fill="#991b1b" />
      <ellipse cx="150" cy="145" rx="50" ry="54" fill="none" stroke="#7f1d1d" strokeWidth="2.5" />
      {/* Seeds through crack */}
      <path d="M146,100 Q143,125 153,140 Q148,158 150,178" fill="none" stroke="#fca5a5" strokeWidth="2" opacity="0.5" />
      <circle cx="136" cy="138" r="5.5" fill="#fca5a5" opacity="0.8" />
      <circle cx="152" cy="130" r="6.5" fill="#fca5a5" opacity="0.85" />
      <circle cx="165" cy="145" r="5" fill="#fca5a5" opacity="0.75" />
      <circle cx="140" cy="155" r="4.5" fill="#fca5a5" opacity="0.7" />
      <circle cx="160" cy="158" r="5" fill="#fca5a5" opacity="0.75" />
      <circle cx="148" cy="168" r="4" fill="#fca5a5" opacity="0.6" />
      {/* Crown */}
      <path d="M128,94 L132,83 L125,73 L137,78 L142,66 L150,79 L158,66 L163,78 L175,73 L168,83 L172,94 Z"
        fill="#166534" stroke="#14532d" strokeWidth="1.5" />
      {/* Flames erupting from top */}
      <path d="M150,94 C133,72 116,60 130,35 C134,51 139,45 142,30 C147,50 144,43 150,20 C156,43 153,50 158,30 C161,45 166,51 170,35 C184,60 167,72 150,94Z"
        fill="url(#pfFlame)" />
      {/* Sparks */}
      {[[118,52],[178,45],[130,30],[168,35],[148,22],[155,38],[125,43]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 2 : 1.5} fill="#fde68a" opacity={0.6 + (i % 3) * 0.1} />
      ))}
      {/* Labels */}
      <text x="150" y="13" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif" opacity="0.9">ATEŞ</text>
      <rect x="110" y="183" width="80" height="14" rx="7" fill="#991b1b" opacity="0.7" />
      <text x="150" y="193" textAnchor="middle" fill="#fca5a5" fontSize="10.5" fontWeight="bold" fontFamily="system-ui, sans-serif">NAR meyvesi 🍎</text>
    </svg>
  );
}

// ── 2. قَالَ → KALE konuşuyor ───────────────────────────────────────────────
function CastleSpeech() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="csBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c1445" />
          <stop offset="100%" stopColor="#050816" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#csBg)" />
      {/* Stars */}
      {[[28,18,1.5],[75,12,1],[205,22,2],[258,10,1.5],[48,38,1],[275,32,1],[170,8,1.2],[110,25,0.8]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="#e2e8f0" opacity={0.5+i*0.05}/>
      ))}
      {/* Crescent moon */}
      <circle cx="248" cy="32" r="16" fill="#dde3f0" opacity="0.18" />
      <circle cx="257" cy="27" r="12" fill="#050816" />
      {/* Ground */}
      <rect x="0" y="172" width="300" height="28" fill="#020510" />
      {/* Castle wall */}
      <rect x="60" y="115" width="180" height="60" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      {/* Gate arch */}
      <path d="M125,175 L125,148 Q150,133 175,148 L175,175Z" fill="#0a0f1e" />
      {/* Windows */}
      <rect x="73" y="127" width="20" height="26" rx="10" fill="#1d4ed8" opacity="0.55" />
      <rect x="207" y="127" width="20" height="26" rx="10" fill="#1d4ed8" opacity="0.55" />
      {/* Battlements - main wall */}
      {[64,79,94,109,124,139,154,169,184,199,214,229].map((x,i)=>(
        <rect key={i} x={x} y="106" width="10" height="13" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
      ))}
      {/* Left tower */}
      <rect x="48" y="88" width="34" height="52" fill="#253347" stroke="#334155" strokeWidth="1.5" />
      <rect x="48" y="80" width="9" height="12" fill="#253347" stroke="#334155" strokeWidth="1"/>
      <rect x="61" y="80" width="9" height="12" fill="#253347" stroke="#334155" strokeWidth="1"/>
      <rect x="74" y="80" width="9" height="12" fill="#253347" stroke="#334155" strokeWidth="1"/>
      <rect x="60" y="103" width="18" height="22" rx="9" fill="#1d4ed8" opacity="0.5" />
      {/* Right tower */}
      <rect x="218" y="88" width="34" height="52" fill="#253347" stroke="#334155" strokeWidth="1.5" />
      <rect x="218" y="80" width="9" height="12" fill="#253347" stroke="#334155" strokeWidth="1"/>
      <rect x="231" y="80" width="9" height="12" fill="#253347" stroke="#334155" strokeWidth="1"/>
      <rect x="244" y="80" width="9" height="12" fill="#253347" stroke="#334155" strokeWidth="1"/>
      {/* Speech bubble */}
      <path d="M50,30 Q50,10 80,10 L195,10 Q215,10 215,35 Q215,58 195,58 L140,58 L128,75 L132,58 L80,58 Q50,58 50,35 Z"
        fill="white" opacity="0.96" />
      {/* Text in bubble */}
      <text x="132" y="30" textAnchor="middle" fill="#0c1445" fontSize="11" fontFamily="system-ui,sans-serif">Kale şunu</text>
      <text x="132" y="47" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold" fontFamily="system-ui,sans-serif">DEDİ ki...</text>
      {/* KALE label */}
      <text x="65" y="170" fill="#64748b" fontSize="12" fontWeight="bold" fontFamily="system-ui,sans-serif">KALE 🏰</text>
    </svg>
  );
}

// ── 3. السَّمَاء → SEMA / Semazen göğe yükseliyor ──────────────────────────
function DervishSky() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="dsBg" cx="50%" cy="60%" r="70%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#050310" />
        </radialGradient>
        <radialGradient id="dsGlow" cx="50%" cy="65%" r="40%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#dsBg)" />
      <ellipse cx="150" cy="130" rx="70" ry="55" fill="url(#dsGlow)" />
      {/* Stars */}
      {[[20,15,1.5,0.9],[55,8,1,0.7],[100,20,1.2,0.8],[230,12,2,0.9],[270,25,1.5,0.8],[45,45,1,0.6],[285,10,1,0.7],[180,5,1.5,0.9],[130,10,0.8,0.6]].map(([x,y,r,o],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="#c7d2fe" opacity={o}/>
      ))}
      {/* Dervish spinning robe — big swooping ellipse */}
      <ellipse cx="150" cy="145" rx="65" ry="30" fill="#f5f3ff" opacity="0.2" transform="rotate(-15 150 145)" />
      <ellipse cx="150" cy="148" rx="72" ry="26" fill="#e0e7ff" opacity="0.15" transform="rotate(10 150 148)" />
      {/* Robe — main skirt */}
      <path d="M150,80 C170,95 215,130 220,160 Q190,175 150,175 Q110,175 80,160 C85,130 130,95 150,80Z"
        fill="#f5f3ff" opacity="0.85" />
      {/* Robe inner fold lines */}
      <path d="M150,85 C165,105 195,140 198,165" fill="none" stroke="#c7d2fe" strokeWidth="1" opacity="0.4" />
      <path d="M150,85 C135,105 105,140 102,165" fill="none" stroke="#c7d2fe" strokeWidth="1" opacity="0.4" />
      {/* Body */}
      <rect x="143" y="55" width="14" height="28" rx="7" fill="#e0e7ff" opacity="0.9" />
      {/* Head with conical hat */}
      <ellipse cx="150" cy="52" rx="10" ry="10" fill="#e0e7ff" opacity="0.9" />
      <path d="M140,50 L150,15 L160,50Z" fill="#c7d2fe" opacity="0.85" />
      {/* Arms outstretched */}
      <path d="M143,68 C125,60 100,65 88,70" fill="none" stroke="#e0e7ff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      <path d="M157,68 C175,60 200,65 212,70" fill="none" stroke="#e0e7ff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      {/* Spiral motion lines */}
      <path d="M150,100 Q230,120 240,150 Q230,175 190,170" fill="none" stroke="#818cf8" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,3" />
      <path d="M150,100 Q70,120 60,150 Q70,175 110,170" fill="none" stroke="#818cf8" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,3" />
      {/* Labels */}
      <text x="150" y="195" textAnchor="middle" fill="#a5b4fc" fontSize="10.5" fontWeight="bold" fontFamily="system-ui,sans-serif">SEMA 🌀 → GÖK</text>
    </svg>
  );
}

// ── 4. عَيْن → AYNADA GÖZ ────────────────────────────────────────────────────
function MirrorEye() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="meBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#134e4a" />
          <stop offset="100%" stopColor="#042f2e" />
        </radialGradient>
        <radialGradient id="meGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#meBg)" />
      <ellipse cx="150" cy="100" rx="80" ry="70" fill="url(#meGlow)" />
      {/* Mirror frame - ornate oval */}
      <ellipse cx="150" cy="96" rx="68" ry="80" fill="#92400e" opacity="0.9" />
      <ellipse cx="150" cy="96" rx="62" ry="74" fill="#78350f" />
      {/* Frame decorations */}
      {Array.from({length:12},(_,i)=>{
        const a=(i/12)*Math.PI*2; const rx=68,ry=80;
        return <circle key={i} cx={150+Math.cos(a)*rx} cy={96+Math.sin(a)*ry} r="4" fill="#d97706" opacity="0.8"/>;
      })}
      {/* Mirror glass surface */}
      <ellipse cx="150" cy="96" rx="55" ry="67" fill="#0d3330" opacity="0.95" />
      <ellipse cx="150" cy="96" rx="55" ry="67" fill="none" stroke="#2dd4bf" strokeWidth="1" opacity="0.3" />
      {/* Reflection shimmer */}
      <ellipse cx="128" cy="72" rx="14" ry="6" fill="white" opacity="0.07" transform="rotate(-30 128 72)" />
      {/* Large eye */}
      <path d="M95,96 C105,74 195,74 205,96 C195,118 105,118 95,96Z" fill="#0d3330" />
      <path d="M95,96 C105,74 195,74 205,96 C195,118 105,118 95,96Z" fill="none" stroke="#2dd4bf" strokeWidth="2.5" opacity="0.9" />
      {/* Iris */}
      <circle cx="150" cy="96" r="24" fill="#0e7490" opacity="0.9" />
      <circle cx="150" cy="96" r="18" fill="#0891b2" />
      <circle cx="150" cy="96" r="24" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
      {/* Pupil */}
      <circle cx="150" cy="96" r="10" fill="#042f2e" />
      <circle cx="150" cy="96" r="4" fill="black" />
      {/* Catchlight */}
      <circle cx="155" cy="91" r="3" fill="white" opacity="0.85" />
      {/* Eyelashes top */}
      {[-35,-20,-5,10,25,40].map((dx,i)=>(
        <line key={i} x1={150+dx} y1={74+(Math.abs(dx)<15?-3:0)} x2={150+dx*1.15} y2={62+(Math.abs(dx)<15?-3:0)}
          stroke="#2dd4bf" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
      ))}
      {/* Handle */}
      <rect x="144" y="176" width="12" height="20" rx="6" fill="#92400e" />
      {/* Labels */}
      <text x="10" y="195" fill="#67e8f9" fontSize="10.5" fontWeight="bold" fontFamily="system-ui,sans-serif">AYNA 🪞 → GÖZ</text>
    </svg>
  );
}

// ── 5. مَاء → MA (anne) su veriyor ─────────────────────────────────────────
function MotherWater() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="mwBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="100%" stopColor="#082f49" />
        </linearGradient>
        <linearGradient id="mwWater" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#mwBg)" />
      {/* Background ripples */}
      {[50,70,90].map((y,i)=>(
        <path key={i} d={`M0,${y} C50,${y-10} 100,${y+10} 150,${y} C200,${y-10} 250,${y+10} 300,${y}`}
          fill="none" stroke="#38bdf8" strokeWidth="1" opacity={0.08+i*0.04}/>
      ))}
      {/* Mother figure */}
      {/* Head */}
      <circle cx="150" cy="52" r="18" fill="#fde68a" />
      {/* Hair */}
      <path d="M132,52 Q134,30 150,28 Q166,30 168,52 Q160,40 150,42 Q140,40 132,52Z" fill="#92400e" />
      {/* Headscarf/hijab suggestion */}
      <path d="M131,50 Q132,38 150,36 Q168,38 169,50 L172,65 Q162,70 150,70 Q138,70 128,65Z" fill="#1d4ed8" opacity="0.7" />
      {/* Body */}
      <path d="M130,70 Q118,90 115,130 L115,165 L185,165 L185,130 Q182,90 170,70 Q160,75 150,75 Q140,75 130,70Z"
        fill="#1d4ed8" opacity="0.75" />
      {/* Arms raising */}
      <path d="M115,100 C100,90 85,85 75,90" fill="none" stroke="#fde68a" strokeWidth="10" strokeLinecap="round" />
      <path d="M185,100 C200,90 215,85 225,90" fill="none" stroke="#fde68a" strokeWidth="10" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="73" cy="92" r="9" fill="#fde68a" />
      <circle cx="227" cy="92" r="9" fill="#fde68a" />
      {/* Water drops from hands */}
      {[[65,110],[70,125],[60,120],[230,110],[235,125],[240,118],[150,90],[145,108],[155,108]].map(([x,y],i)=>(
        <path key={i} d={`M${x},${y-8} Q${x-4},${y} ${x},${y+6} Q${x+4},${y} ${x},${y-8}`}
          fill="url(#mwWater)" opacity={0.6+i*0.03}/>
      ))}
      {/* Water stream */}
      <path d="M73,101 Q80,130 85,160 L100,165" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.6" strokeLinecap="round"/>
      <path d="M227,101 Q220,130 215,160 L200,165" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.6" strokeLinecap="round"/>
      {/* Ground water pool */}
      <ellipse cx="150" cy="175" rx="100" ry="12" fill="#0369a1" opacity="0.4" />
      {/* MA label */}
      <text x="150" y="195" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">MA = anne → SU 💧</text>
    </svg>
  );
}

// ── 6. يَوْم → YAVRUM + güneş doğuşu ──────────────────────────────────────
function ChickSunrise() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="csBg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="40%" stopColor="#c2410c" />
          <stop offset="70%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient id="csSun" cx="50%" cy="65%" r="40%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#csBg2)" />
      {/* Sun glow */}
      <ellipse cx="150" cy="130" rx="90" ry="70" fill="url(#csSun)" />
      {/* Sun disc (half above horizon) */}
      <path d="M80,130 A70,70 0 0 1 220,130Z" fill="#fde68a" opacity="0.9" />
      <path d="M80,130 A70,70 0 0 1 220,130Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
      {/* Sun rays */}
      {Array.from({length:10},(_,i)=>{
        const a=-180+(i*18); const r=(a*Math.PI)/180;
        return <line key={i} x1={150+Math.cos(r)*72} y1={130+Math.sin(r)*72}
          x2={150+Math.cos(r)*95} y2={130+Math.sin(r)*95}
          stroke="#fde68a" strokeWidth="2" opacity={0.5} strokeLinecap="round"/>;
      })}
      {/* Horizon line */}
      <rect x="0" y="130" width="300" height="70" fill="#0a0500" />
      <path d="M0,130 Q150,120 300,130" fill="#0f0700" />
      {/* Baby chick body */}
      <ellipse cx="150" cy="162" rx="22" ry="18" fill="#fde68a" />
      {/* Chick head */}
      <circle cx="150" cy="143" r="15" fill="#fde68a" />
      {/* Chick eye */}
      <circle cx="155" cy="140" r="3.5" fill="#1a0a00" />
      <circle cx="156" cy="139" r="1" fill="white" />
      {/* Chick beak */}
      <path d="M160,143 L167,145 L160,147Z" fill="#f97316" />
      {/* Wing */}
      <path d="M130,158 Q122,150 128,142 Q138,155 128,158Z" fill="#fbbf24" opacity="0.8" />
      <path d="M170,158 Q178,150 172,142 Q162,155 172,158Z" fill="#fbbf24" opacity="0.8" />
      {/* Feet */}
      <line x1="143" y1="178" x2="138" y2="188" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="157" y1="178" x2="162" y2="188" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Labels */}
      <text x="150" y="199" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">YAVRUM ☀️ → GÜN</text>
    </svg>
  );
}

// ── 7. فَتَحَ → kapı AÇILIYOR ışık geliyor ──────────────────────────────────
function DoorLight() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="dlLight" cx="65%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="#0a0908" />
      {/* Dark room floor */}
      <path d="M0,180 L300,180 L300,200 L0,200Z" fill="#050403" />
      {/* Light rays through opening */}
      <ellipse cx="220" cy="100" rx="90" ry="80" fill="url(#dlLight)" />
      {/* Ray beams */}
      {[[-25,-20],[-10,-30],[0,-35],[10,-30],[25,-20],[35,-5],[30,15],[20,30]].map(([dx,dy],i)=>(
        <line key={i} x1={200} y1={100} x2={300+dx} y2={100+dy*3}
          stroke="#fde68a" strokeWidth={3-i*0.2} opacity={0.2-i*0.02} strokeLinecap="round"/>
      ))}
      {/* Door frame (static) */}
      <rect x="100" y="30" width="120" height="150" rx="4" fill="#2d1a0a" stroke="#78350f" strokeWidth="3" />
      {/* Open door panel (swinging inward) */}
      <path d="M100,30 Q100,105 100,180 L165,175 L165,35 Z" fill="#3d2210" stroke="#92400e" strokeWidth="2" />
      {/* Door knob */}
      <circle cx="160" cy="108" r="5" fill="#d97706" />
      {/* Door panel details */}
      <rect x="108" y="50" width="50" height="45" rx="3" fill="none" stroke="#78350f" strokeWidth="1.5" opacity="0.6" />
      <rect x="108" y="105" width="50" height="55" rx="3" fill="none" stroke="#78350f" strokeWidth="1.5" opacity="0.6" />
      {/* Bright opening through door */}
      <path d="M165,35 L220,30 L220,180 L165,175Z" fill="#fde68a" opacity="0.7" />
      {/* Silhouette of person in light */}
      <ellipse cx="220" cy="138" rx="10" ry="14" fill="#92400e" opacity="0.5" />
      <ellipse cx="220" cy="118" rx="7" ry="7" fill="#92400e" opacity="0.5" />
      {/* Labels */}
      <text x="50" y="20" fill="#d97706" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">FETİH</text>
      <text x="50" y="37" fill="#92400e" fontSize="10" fontFamily="system-ui,sans-serif">gibi AÇILDI 🚪</text>
    </svg>
  );
}

// ── 8. غَفَرَ → GAFA yaptı, AFFEDILDI ─────────────────────────────────────
function Forgiveness() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="fgBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
        <radialGradient id="fgGlow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#fgBg)" />
      <rect width="300" height="200" fill="url(#fgGlow)" />
      {/* LEFT person — ashamed (head down, hand on forehead) */}
      {/* Head */}
      <circle cx="90" cy="70" r="22" fill="#fde68a" />
      {/* Body */}
      <path d="M70,92 Q68,130 70,165 L110,165 Q112,130 110,92 Q100,98 90,98 Q80,98 70,92Z" fill="#6d28d9" opacity="0.8" />
      {/* Arms — head in hands */}
      <path d="M70,105 C55,95 40,88 30,88" fill="none" stroke="#fde68a" strokeWidth="9" strokeLinecap="round" />
      <path d="M110,105 C125,95 140,88 150,88" fill="none" stroke="#fde68a" strokeWidth="9" strokeLinecap="round" />
      <circle cx="28" cy="88" r="8" fill="#fde68a" />
      <circle cx="152" cy="88" r="8" fill="#fde68a" />
      {/* Shame hand on forehead */}
      <path d="M80,68 Q90,60 100,68" fill="none" stroke="#fde68a" strokeWidth="6" strokeLinecap="round" />
      {/* GAFA label above */}
      <text x="90" y="48" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="system-ui,sans-serif">GAFA!</text>
      <text x="90" y="35" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="system-ui,sans-serif">🤦</text>

      {/* RIGHT person — forgiving (arms open) */}
      <circle cx="220" cy="70" r="22" fill="#fde68a" />
      <path d="M200,92 Q198,130 200,165 L240,165 Q242,130 240,92 Q230,98 220,98 Q210,98 200,92Z" fill="#16a34a" opacity="0.8" />
      {/* Arms open in forgiveness */}
      <path d="M200,105 C185,95 170,90 155,92" fill="none" stroke="#fde68a" strokeWidth="9" strokeLinecap="round" />
      <path d="M240,105 C255,95 268,88 278,85" fill="none" stroke="#fde68a" strokeWidth="9" strokeLinecap="round" />
      <circle cx="153" cy="92" r="8" fill="#fde68a" />
      <circle cx="280" cy="84" r="8" fill="#fde68a" />
      {/* Smile on forgiving person */}
      <path d="M211,76 Q220,83 229,76" fill="none" stroke="#7f1d1d" strokeWidth="2.5" strokeLinecap="round" />
      {/* Forgiveness label */}
      <text x="220" y="48" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="bold" fontFamily="system-ui,sans-serif">AFFEDILDI</text>
      <text x="220" y="35" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="system-ui,sans-serif">🤝</text>

      {/* Arrow from left to right */}
      <path d="M125,140 L175,140" stroke="#a5b4fc" strokeWidth="2.5" strokeDasharray="5,3" />
      <path d="M170,135 L178,140 L170,145" fill="none" stroke="#a5b4fc" strokeWidth="2.5" />

      <text x="150" y="193" textAnchor="middle" fill="#a5b4fc" fontSize="10.5" fontWeight="bold" fontFamily="system-ui,sans-serif">GAFA → BAĞIŞLANDI</text>
    </svg>
  );
}

// ── 9. كَتَبَ → KÂTİP kalemle yazıyor ─────────────────────────────────────
function ScribeQuill() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="sqBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c1410" />
          <stop offset="100%" stopColor="#2d1f0e" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#sqBg)" />
      {/* Parchment background */}
      <rect x="40" y="25" width="220" height="155" rx="6" fill="#fef3c7" opacity="0.95" />
      <rect x="40" y="25" width="220" height="155" rx="6" fill="none" stroke="#d97706" strokeWidth="2" />
      {/* Parchment texture lines */}
      {[55,70,85,100,115,130,145].map((y,i)=>(
        <line key={i} x1="60" y1={y} x2="240" y2={y} stroke="#d97706" strokeWidth="0.8" opacity="0.2"/>
      ))}
      {/* Arabic text lines being written */}
      <text x="230" y="58" textAnchor="end" fill="#92400e" fontSize="16" fontFamily="serif" opacity="0.9" style={{fontFamily:"'Traditional Arabic',serif"}}>بِسْمِ اللَّهِ</text>
      <text x="230" y="84" textAnchor="end" fill="#92400e" fontSize="14" fontFamily="serif" opacity="0.75" style={{fontFamily:"'Traditional Arabic',serif"}}>الرَّحْمَنِ</text>
      <text x="230" y="108" textAnchor="end" fill="#92400e" fontSize="14" fontFamily="serif" opacity="0.6" style={{fontFamily:"'Traditional Arabic',serif"}}>الرَّحِيمِ</text>
      {/* Quill pen */}
      <path d="M80,50 C100,80 120,120 135,158" fill="none" stroke="#92400e" strokeWidth="2.5" />
      {/* Feather */}
      <path d="M80,50 C60,30 50,15 65,10 C90,8 95,35 80,50Z" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1" />
      <path d="M65,10 C80,30 80,50 80,50" fill="none" stroke="#a8a29e" strokeWidth="1" opacity="0.6" />
      {/* Feather barbs */}
      {[[72,16],[68,22],[66,30],[70,38],[74,45]].map(([x,y],i)=>(
        <line key={i} x1={x} y1={y} x2={x-8} y2={y-4} stroke="#d6d3d1" strokeWidth="1" opacity="0.5"/>
      ))}
      {/* Ink tip */}
      <ellipse cx="135" cy="159" rx="3" ry="5" fill="#1c1410" transform="rotate(-20 135 159)" />
      {/* Ink drop */}
      <circle cx="138" cy="163" r="3" fill="#1c1410" opacity="0.7" />
      {/* Inkwell */}
      <ellipse cx="58" cy="155" rx="16" ry="12" fill="#1c1410" />
      <ellipse cx="58" cy="148" rx="16" ry="8" fill="#374151" />
      <ellipse cx="58" cy="148" rx="12" ry="5" fill="#111827" />
      <ellipse cx="58" cy="147" rx="9" ry="3.5" fill="#1c1410" />
      {/* Labels */}
      <text x="150" y="193" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">KÂTİP ✍️ → YAZDI</text>
    </svg>
  );
}

// ── 10. خَلَقَ → HALA bir şey yarattı ────────────────────────────────────
function AuntCreating() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="acBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f0a30" />
        </radialGradient>
        <radialGradient id="acGlow" cx="50%" cy="40%" r="45%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#acBg)" />
      <ellipse cx="150" cy="90" rx="100" ry="80" fill="url(#acGlow)" />
      {/* Stars/sparks being created */}
      {[[55,55,4],[80,30,3],[42,80,3.5],[230,40,4],[260,70,3],[245,25,3.5],[210,60,2.5],[70,20,2]].map(([x,y,r],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#fde68a" opacity={0.7+i*0.03}/>
          <line x1={x} y1={y-r-3} x2={x} y2={y-r-8} stroke="#fde68a" strokeWidth="1.5" opacity="0.5"/>
          <line x1={x+r+2} y1={y} x2={x+r+6} y2={y} stroke="#fde68a" strokeWidth="1.5" opacity="0.5"/>
          <line x1={x-r-2} y1={y} x2={x-r-6} y2={y} stroke="#fde68a" strokeWidth="1.5" opacity="0.5"/>
        </g>
      ))}
      {/* Woman figure (older, aunt) */}
      {/* Head with head covering */}
      <circle cx="150" cy="68" r="20" fill="#fde68a" />
      <path d="M130,65 Q133,45 150,43 Q167,45 170,65 L174,82 Q163,88 150,88 Q137,88 126,82Z" fill="#7c3aed" opacity="0.8" />
      {/* Body */}
      <path d="M126,88 Q115,115 115,155 L185,155 Q185,115 174,88 Q162,95 150,95 Q138,95 126,88Z" fill="#7c3aed" opacity="0.75" />
      {/* Arms raised dramatically */}
      <path d="M120,105 C100,90 75,70 55,60" fill="none" stroke="#fde68a" strokeWidth="10" strokeLinecap="round" />
      <path d="M180,105 C200,90 225,70 245,60" fill="none" stroke="#fde68a" strokeWidth="10" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="53" cy="58" r="9" fill="#fde68a" />
      <circle cx="247" cy="58" r="9" fill="#fde68a" />
      {/* Creation sparks from hands */}
      {[[45,48],[55,44],[63,52],[237,46],[245,44],[253,52]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2.5" fill="#fbbf24" opacity="0.9"/>
      ))}
      {/* Smile */}
      <path d="M143,72 Q150,79 157,72" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Wrinkles (older person detail) */}
      <path d="M137,64 Q133,60 137,57" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.4"/>
      <path d="M163,64 Q167,60 163,57" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.4"/>
      {/* HALA label */}
      <text x="150" y="177" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold" fontFamily="system-ui,sans-serif">HALA 👵✨ → YARATTI</text>
    </svg>
  );
}

// ── 11. آمَنُوا → AMEN / dua eden eller ───────────────────────────────────
function PrayingAmen() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="paBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#0f0800" />
        </radialGradient>
        <radialGradient id="paLight" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#paBg)" />
      <ellipse cx="150" cy="80" rx="100" ry="80" fill="url(#paLight)" />
      {/* Light rays from above */}
      {Array.from({length:7},(_,i)=>{
        const a=-90+(i-3)*15; const r=a*Math.PI/180;
        return <line key={i} x1={150} y1={10} x2={150+Math.cos(r)*200} y2={10+Math.sin(r)*200}
          stroke="#fbbf24" strokeWidth={i===3?2:1} opacity={i===3?0.15:0.07} strokeLinecap="round"/>;
      })}
      {/* Praying hands - left */}
      <path d="M115,90 C108,75 108,60 118,55 C125,52 130,58 130,70 L130,130 C130,138 123,140 118,137 C113,134 112,125 115,115 Z"
        fill="#fde68a" />
      <path d="M123,90 C116,75 116,60 126,55 C133,52 138,58 138,70 L138,130 C138,138 131,140 126,137 C121,134 120,125 123,115 Z"
        fill="#fcd34d" />
      {/* Praying hands - right */}
      <path d="M185,90 C192,75 192,60 182,55 C175,52 170,58 170,70 L170,130 C170,138 177,140 182,137 C187,134 188,125 185,115 Z"
        fill="#fde68a" />
      <path d="M177,90 C184,75 184,60 174,55 C167,52 162,58 162,70 L162,130 C162,138 169,140 174,137 C179,134 180,125 177,115 Z"
        fill="#fcd34d" />
      {/* Fingernails */}
      {[[120,57],[128,56],[136,58],[164,57],[172,56],[180,58]].map(([x,y],i)=>(
        <ellipse key={i} cx={x} cy={y} rx="3" ry="2" fill="#f97316" opacity="0.4"/>
      ))}
      {/* AMEN text above */}
      <text x="150" y="38" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="bold" fontFamily="system-ui,sans-serif" opacity="0.9">AMEN</text>
      {/* Glow dots */}
      {[[95,80],[205,80],[150,148]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="#fbbf24" opacity="0.2"/>
      ))}
      <text x="150" y="193" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">AMEN 🙏 → İMAN ETTİLER</text>
    </svg>
  );
}

// ── 12. أَخَذَ → AHA! ampul + el ──────────────────────────────────────────
function AhaLightbulb() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="alBg" cx="40%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#1a1a00" />
          <stop offset="100%" stopColor="#0a0a00" />
        </radialGradient>
        <radialGradient id="alGlow" cx="40%" cy="35%" r="40%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#alBg)" />
      <ellipse cx="110" cy="80" rx="95" ry="75" fill="url(#alGlow)" />
      {/* Lightbulb shape */}
      {/* Glass globe */}
      <path d="M78,90 C78,55 142,45 142,90 L138,110 L82,110 Z" fill="#fef9c3" opacity="0.9" />
      <path d="M78,90 C78,55 142,45 142,90 L138,110 L82,110 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
      {/* Filament */}
      <path d="M95,95 L100,78 L108,85 L112,72 L120,80 L125,95" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      {/* Base/screw */}
      <rect x="90" y="110" width="40" height="8" rx="2" fill="#d97706" />
      <rect x="92" y="118" width="36" height="6" rx="2" fill="#b45309" />
      <rect x="94" y="124" width="32" height="6" rx="2" fill="#92400e" />
      {/* Glow spikes */}
      {Array.from({length:8},(_,i)=>{
        const a=(i/8)*Math.PI*2; const rx=55,ry=50;
        return <line key={i} x1={110+Math.cos(a)*rx} y1={78+Math.sin(a)*ry}
          x2={110+Math.cos(a)*(rx+20)} y2={78+Math.sin(a)*(ry+18)}
          stroke="#fde68a" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>;
      })}
      {/* AHA! text */}
      <text x="108" y="78" textAnchor="middle" fill="#1a1a00" fontSize="16" fontWeight="bold" fontFamily="system-ui,sans-serif">AHA!</text>
      {/* Hand reaching to grab */}
      <path d="M190,100 C195,85 205,80 215,82" fill="none" stroke="#fde68a" strokeWidth="12" strokeLinecap="round" />
      {/* Fingers */}
      <path d="M205,80 C210,65 218,62 222,68" fill="none" stroke="#fde68a" strokeWidth="8" strokeLinecap="round" />
      <path d="M210,82 C216,68 224,66 227,73" fill="none" stroke="#fde68a" strokeWidth="8" strokeLinecap="round" />
      <path d="M213,86 C220,74 228,73 230,80" fill="none" stroke="#fde68a" strokeWidth="7" strokeLinecap="round" />
      {/* Palm */}
      <ellipse cx="197" cy="100" rx="16" ry="12" fill="#fde68a" />
      {/* Arrow from bulb to hand */}
      <path d="M150,85 L183,90" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,3" />
      <path d="M179,85 L186,90 L179,95" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <text x="150" y="193" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">AHA! 💡 → ALDI</text>
    </svg>
  );
}

// ── 13. خَيْر → HAYIR vermek = İYİLİK ──────────────────────────────────────
function GiftSparkle() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="gsBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a1200" />
          <stop offset="100%" stopColor="#0d0900" />
        </radialGradient>
        <radialGradient id="gsGlow" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#gsBg)" />
      <ellipse cx="150" cy="120" rx="90" ry="70" fill="url(#gsGlow)" />
      {/* Hands giving — left hand */}
      <path d="M60,148 C65,135 72,130 80,132" fill="none" stroke="#fde68a" strokeWidth="11" strokeLinecap="round"/>
      <ellipse cx="80" cy="132" rx="11" ry="9" fill="#fde68a" />
      {/* Hands giving — right hand */}
      <path d="M240,148 C235,135 228,130 220,132" fill="none" stroke="#fde68a" strokeWidth="11" strokeLinecap="round"/>
      <ellipse cx="220" cy="132" rx="11" ry="9" fill="#fde68a" />
      {/* Gift box */}
      <rect x="105" y="110" width="90" height="70" rx="6" fill="#dc2626" />
      <rect x="105" y="110" width="90" height="70" rx="6" fill="none" stroke="#ef4444" strokeWidth="2" />
      {/* Box lid */}
      <rect x="100" y="100" width="100" height="18" rx="5" fill="#b91c1c" />
      <rect x="100" y="100" width="100" height="18" rx="5" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      {/* Ribbon vertical */}
      <rect x="143" y="100" width="14" height="80" fill="#fbbf24" opacity="0.9" />
      {/* Ribbon horizontal */}
      <rect x="100" y="106" width="100" height="10" fill="#fbbf24" opacity="0.9" />
      {/* Bow */}
      <path d="M150,100 C138,85 120,88 125,100 C130,108 145,102 150,100Z" fill="#fde68a" opacity="0.95" />
      <path d="M150,100 C162,85 180,88 175,100 C170,108 155,102 150,100Z" fill="#fde68a" opacity="0.95" />
      <circle cx="150" cy="100" r="7" fill="#fbbf24" />
      {/* Sparkles around gift */}
      {[[85,80,5],[215,90,4],[88,140,3.5],[220,145,4],[150,72,4.5],[105,170,3],[195,168,3.5]].map(([x,y,r],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#fde68a" opacity={0.6+i*0.05}/>
          <line x1={x} y1={y-r-4} x2={x} y2={y-r-9} stroke="#fde68a" strokeWidth="1.5" opacity="0.5"/>
          <line x1={x+r+3} y1={y} x2={x+r+8} y2={y} stroke="#fde68a" strokeWidth="1.5" opacity="0.5"/>
          <line x1={x-r-3} y1={y} x2={x-r-8} y2={y} stroke="#fde68a" strokeWidth="1.5" opacity="0.5"/>
          <line x1={x+r+2} y1={y-r-2} x2={x+r+6} y2={y-r-6} stroke="#fde68a" strokeWidth="1" opacity="0.4"/>
          <line x1={x-r-2} y1={y-r-2} x2={x-r-6} y2={y-r-6} stroke="#fde68a" strokeWidth="1" opacity="0.4"/>
        </g>
      ))}
      <text x="150" y="193" textAnchor="middle" fill="#fbbf24" fontSize="10.5" fontWeight="bold" fontFamily="system-ui,sans-serif">HAYIR vermek = İYİLİK 🌟</text>
    </svg>
  );
}

// ── 14. حُبّ → HUB merkezi / kalp ağı ──────────────────────────────────────
function HeartNetwork() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="hnBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#4c0519" />
          <stop offset="100%" stopColor="#1a000a" />
        </radialGradient>
        <radialGradient id="hnGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#hnBg)" />
      <ellipse cx="150" cy="105" rx="85" ry="75" fill="url(#hnGlow)" />
      {/* Connection nodes */}
      {[[40,45],[260,45],[25,130],[275,130],[70,175],[230,175]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#fb7185" opacity="0.5"/>
          <circle cx={x} cy={y} r="4" fill="#f43f5e" opacity="0.8"/>
          <line x1={x} y1={y} x2="150" y2="105" stroke="#f43f5e" strokeWidth="1.5" opacity="0.3" strokeDasharray="5,4"/>
        </g>
      ))}
      {/* Heart shape — central hub */}
      <path d="M150,145 C150,145 95,112 95,78 C95,56 113,44 132,48 C142,51 150,62 150,62 C150,62 158,51 168,48 C187,44 205,56 205,78 C205,112 150,145 150,145Z"
        fill="#f43f5e" opacity="0.85" />
      <path d="M150,145 C150,145 95,112 95,78 C95,56 113,44 132,48 C142,51 150,62 150,62 C150,62 158,51 168,48 C187,44 205,56 205,78 C205,112 150,145 150,145Z"
        fill="none" stroke="#fb7185" strokeWidth="2.5" opacity="0.9" />
      {/* HUB text in heart */}
      <text x="150" y="98" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="system-ui,sans-serif" opacity="0.9">HUB</text>
      {/* Pulse rings */}
      <circle cx="150" cy="95" r="45" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.2"/>
      <circle cx="150" cy="95" r="65" fill="none" stroke="#f43f5e" strokeWidth="0.8" opacity="0.12"/>
      <text x="150" y="193" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">HUB = SEVGİ merkezi ❤️</text>
    </svg>
  );
}

// ── 15. مُسْتَقِيم → MUSTAKİL / cetvel gibi dosdoğru ─────────────────────
function StraightRuler() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="srBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c1a2e" />
          <stop offset="100%" stopColor="#050e1a" />
        </linearGradient>
        <linearGradient id="srRuler" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#srBg)" />
      {/* Grid lines — perspective path */}
      {[30,50,70,90,110,130,150,170].map((y,i)=>(
        <line key={i} x1="0" y1={y} x2="300" y2={y} stroke="#1e3a5f" strokeWidth="0.8" opacity="0.4"/>
      ))}
      {[30,60,90,120,150,180,210,240,270].map((x,i)=>(
        <line key={i} x1={x} y1="0" x2={x} y2="200" stroke="#1e3a5f" strokeWidth="0.8" opacity="0.4"/>
      ))}
      {/* Ruler — horizontal, centred */}
      <rect x="20" y="90" width="260" height="36" rx="4" fill="url(#srRuler)" stroke="#d97706" strokeWidth="1.5" />
      {/* Ruler notches */}
      {Array.from({length:27},(_,i)=>(
        <line key={i} x1={20+i*10} y1="90" x2={20+i*10} y2={i%5===0?104:97}
          stroke="#92400e" strokeWidth={i%5===0?1.5:1} opacity={i%5===0?0.9:0.5}/>
      ))}
      {/* Ruler numbers */}
      {[0,5,10,15,20,25].map((n,i)=>(
        <text key={i} x={20+i*50} y="120" fill="#92400e" fontSize="8" fontFamily="system-ui,sans-serif" opacity="0.8">{n}</text>
      ))}
      {/* Person standing bolt upright */}
      {/* Shadow */}
      <ellipse cx="150" cy="178" rx="18" ry="5" fill="#000" opacity="0.4"/>
      {/* Legs */}
      <rect x="144" y="148" width="7" height="28" rx="3" fill="#3b82f6" />
      <rect x="153" y="148" width="7" height="28" rx="3" fill="#3b82f6" />
      {/* Body */}
      <rect x="138" y="96" width="24" height="55" rx="6" fill="#60a5fa" />
      {/* Arms straight down */}
      <rect x="130" y="100" width="8" height="35" rx="4" fill="#93c5fd" />
      <rect x="162" y="100" width="8" height="35" rx="4" fill="#93c5fd" />
      {/* Head */}
      <circle cx="150" cy="88" r="14" fill="#fde68a" />
      {/* Ruler line through person to show straightness */}
      <line x1="150" y1="22" x2="150" y2="180" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.4"/>
      {/* Level indicator arrow */}
      <path d="M30,108 L60,108" stroke="#22d3ee" strokeWidth="2" />
      <path d="M55,103 L62,108 L55,113" fill="none" stroke="#22d3ee" strokeWidth="2"/>
      <path d="M270,108 L240,108" stroke="#22d3ee" strokeWidth="2" />
      <path d="M245,103 L238,108 L245,113" fill="none" stroke="#22d3ee" strokeWidth="2"/>
      {/* Label */}
      <text x="150" y="16" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">MUSTAKİL → DOSDOĞRU 📏</text>
    </svg>
  );
}

// ── 16. الْأَرْض → ARDA YERE oturmuş ────────────────────────────────────────
function PersonGround() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="pgSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <linearGradient id="pgGround" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#854d0e" />
          <stop offset="100%" stopColor="#431407" />
        </linearGradient>
        <radialGradient id="pgSun" cx="75%" cy="20%" r="25%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="1" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Sky */}
      <rect width="300" height="130" fill="url(#pgSky)" />
      {/* Sun */}
      <circle cx="240" cy="38" r="24" fill="#fde68a" opacity="0.9" />
      <ellipse cx="240" cy="38" rx="60" ry="50" fill="url(#pgSun)" />
      {/* Clouds */}
      <ellipse cx="70" cy="30" rx="35" ry="15" fill="white" opacity="0.7"/>
      <ellipse cx="90" cy="22" rx="25" ry="13" fill="white" opacity="0.7"/>
      <ellipse cx="50" cy="25" rx="20" ry="11" fill="white" opacity="0.6"/>
      {/* Ground */}
      <rect x="0" y="130" width="300" height="70" fill="url(#pgGround)" />
      {/* Dirt texture */}
      {[[30,140],[80,150],[140,138],[190,152],[240,142],[270,148],[55,160],[170,162],[220,158]].map(([x,y],i)=>(
        <ellipse key={i} cx={x} cy={y} rx="12" ry="4" fill="#431407" opacity="0.3"/>
      ))}
      {/* Small plants/grass */}
      {[[40,130],[100,130],[160,130],[220,130],[280,130]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y} x2={x-5} y2={y-12} stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
          <line x1={x} y1={y} x2={x} y2={y-14} stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
          <line x1={x} y1={y} x2={x+5} y2={y-12} stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
        </g>
      ))}
      {/* Person sitting on ground — "ARDA" */}
      {/* Shadow */}
      <ellipse cx="150" cy="148" rx="28" ry="7" fill="#431407" opacity="0.5"/>
      {/* Legs (seated, bent) */}
      <path d="M138,145 Q130,160 120,165 L110,165 L108,160 Q115,155 122,145Z" fill="#2563eb" />
      <path d="M162,145 Q170,160 180,165 L190,165 L192,160 Q185,155 178,145Z" fill="#2563eb" />
      {/* Body */}
      <path d="M130,105 Q120,130 130,145 L170,145 Q180,130 170,105 Q160,112 150,112 Q140,112 130,105Z" fill="#3b82f6" />
      {/* Head */}
      <circle cx="150" cy="95" r="18" fill="#fde68a" />
      {/* Hair */}
      <path d="M132,92 Q135,76 150,74 Q165,76 168,92 Q158,83 150,84 Q142,83 132,92Z" fill="#1c0a00" />
      {/* Eyes (looking down at ground) */}
      <path d="M143,97 Q146,101 149,97" fill="none" stroke="#1c0a00" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M151,97 Q154,101 157,97" fill="none" stroke="#1c0a00" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Arms resting on knees */}
      <path d="M130,120 C118,130 112,145 115,162" fill="none" stroke="#fde68a" strokeWidth="9" strokeLinecap="round"/>
      <path d="M170,120 C182,130 188,145 185,162" fill="none" stroke="#fde68a" strokeWidth="9" strokeLinecap="round"/>
      {/* Hand touching ground */}
      <ellipse cx="115" cy="163" rx="9" ry="6" fill="#fde68a"/>
      <ellipse cx="185" cy="163" rx="9" ry="6" fill="#fde68a"/>
      {/* ARDA name tag */}
      <rect x="118" y="115" width="64" height="18" rx="9" fill="white" opacity="0.9"/>
      <text x="150" y="128" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">ARDA</text>
      {/* Ground label */}
      <text x="150" y="195" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif">ARDA YERE çöktü 🌍</text>
    </svg>
  );
}

// ── 17. Türkçe cognate — kutlama sahnesi ───────────────────────────────────
function CognateScene({ turkish, emoji }: { turkish: string; emoji: string }) {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="cgBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#052e16" />
          <stop offset="100%" stopColor="#022c22" />
        </radialGradient>
        <radialGradient id="cgGlow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#cgBg)" />
      <ellipse cx="150" cy="100" rx="120" ry="90" fill="url(#cgGlow)" />
      {/* Confetti particles */}
      {[[30,30,"#fbbf24"],[60,15,"#f87171"],[200,20,"#60a5fa"],[240,35,"#a78bfa"],[270,18,"#fbbf24"],[20,80,"#f87171"],[280,75,"#34d399"],[55,170,"#60a5fa"],[250,165,"#fbbf24"],[35,130,"#a78bfa"],[265,130,"#f87171"]].map(([x,y,c],i)=>(
        <rect key={i} x={Number(x)-3} y={Number(y)-3} width="6" height="6" rx="1" fill={String(c)} opacity="0.7" transform={`rotate(${i*35} ${x} ${y})`}/>
      ))}
      {/* Big checkmark circle */}
      <circle cx="150" cy="85" r="52" fill="#166534" opacity="0.7" stroke="#22c55e" strokeWidth="2.5" />
      <path d="M122,85 L140,103 L178,67" fill="none" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Emoji */}
      <text x="150" y="160" textAnchor="middle" fontSize="24" fontFamily="system-ui,sans-serif">{emoji}</text>
      {/* Turkish word */}
      <text x="150" y="185" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold" fontFamily="system-ui,sans-serif">{turkish}</text>
      <text x="150" y="16" textAnchor="middle" fill="#4ade80" fontSize="10.5" fontFamily="system-ui,sans-serif">Türkçe&apos;de de aynı kelime!</text>
    </svg>
  );
}

// ── 16. Default ─────────────────────────────────────────────────────────────
function DefaultScene() {
  return (
    <svg viewBox="0 0 300 200" width="100%" style={{ display: "block" }}>
      <rect width="300" height="200" fill="#0f1923" />
      <circle cx="150" cy="90" r="55" fill="#1e3a4a" opacity="0.7" />
      <circle cx="150" cy="90" r="40" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />
      <circle cx="150" cy="90" r="20" fill="#38bdf8" opacity="0.2" />
    </svg>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function KeywordArt({
  sceneId,
  cognateLabel,
  cognateEmoji,
}: {
  sceneId: KeywordSceneId;
  cognateLabel?: string;
  cognateEmoji?: string;
}) {
  switch (sceneId) {
    case "pomegranate-fire":  return <PomegranateFire />;
    case "castle-speech":     return <CastleSpeech />;
    case "dervish-sky":       return <DervishSky />;
    case "mirror-eye":        return <MirrorEye />;
    case "mother-water":      return <MotherWater />;
    case "chick-sunrise":     return <ChickSunrise />;
    case "door-light":        return <DoorLight />;
    case "forgiveness":       return <Forgiveness />;
    case "scribe-quill":      return <ScribeQuill />;
    case "aunt-creating":     return <AuntCreating />;
    case "praying-amen":      return <PrayingAmen />;
    case "aha-lightbulb":     return <AhaLightbulb />;
    case "gift-sparkle":      return <GiftSparkle />;
    case "heart-network":     return <HeartNetwork />;
    case "straight-ruler":    return <StraightRuler />;
    case "person-ground":     return <PersonGround />;
    case "cognate":           return <CognateScene turkish={cognateLabel ?? ""} emoji={cognateEmoji ?? "✅"} />;
    default:                  return <DefaultScene />;
  }
}

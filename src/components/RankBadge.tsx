"use client";
import { getRank, getNextRank } from "@/data/ranks";

interface Props {
  learned: number;
  compact?: boolean;
}

export default function RankBadge({ learned, compact }: Props) {
  const rank = getRank(learned);
  const next = getNextRank(learned);
  const pct = next ? Math.round(((learned - rank.min) / (next.min - rank.min)) * 100) : 100;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
            style={{background:`${rank.color}22`, border:`1px solid ${rank.color}55`, color:rank.color}}>
        <span>{rank.icon}</span>
        <span>{rank.title}</span>
      </span>
    );
  }

  return (
    <div className="rounded-2xl p-4 border"
         style={{background:`${rank.color}12`, borderColor:`${rank.color}30`}}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{rank.icon}</div>
        <div>
          <div className="font-bold text-white text-sm">{rank.title}</div>
          <div className="arabic-text text-sm" style={{color:rank.color}}>{rank.arabic}</div>
        </div>
        {!next && (
          <div className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
               style={{background:`${rank.color}33`, color:rank.color}}>MAX</div>
        )}
      </div>
      <p className="text-stone-400 text-xs mb-3">{rank.desc}</p>
      {next && (
        <>
          <div className="flex justify-between text-xs text-stone-500 mb-1.5">
            <span>{learned} kelime</span>
            <span>Sonraki: {next.icon} {next.title} ({next.min})</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.08)"}}>
            <div className="h-full rounded-full transition-all duration-700"
                 style={{width:`${pct}%`, background:rank.color}} />
          </div>
        </>
      )}
    </div>
  );
}

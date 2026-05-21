"use client";
// Fotogerçekçi kelime kartı görseli
// /public/cards/{slug}.png dosyası varsa gösterir, yoksa children (SVG sahne) fallback

import { useState } from "react";

interface CardImageProps {
  slug: string;
  arabic: string;
  meaning: string;
  fallback?: React.ReactNode;
}

export function CardImage({ slug, arabic, meaning, fallback }: CardImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !slug) {
    return <>{fallback}</>;
  }

  return (
    <div className="relative w-full" style={{ aspectRatio: "1/1", maxHeight: 280, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/cards/${slug}.png`}
        alt={`${arabic} — ${meaning}`}
        onError={() => setFailed(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
        }}
      />
      {/* Gradient overlay — Arabic word + meaning at bottom */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)" }}
      >
        <div className="px-4 pb-3 pt-6">
          <div
            dir="rtl"
            className="text-center text-3xl font-bold mb-1"
            style={{ fontFamily: "serif", color: "#f5e6c0", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            {arabic}
          </div>
          <div className="text-center text-sm font-semibold" style={{ color: "#fbbf24", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
            {meaning}
          </div>
        </div>
      </div>
    </div>
  );
}

// Küçük kart önizlemesi — dashboard listesi için
export function CardThumb({ slug, arabic, meaning }: { slug: string; arabic: string; meaning: string }) {
  const [failed, setFailed] = useState(false);

  if (failed || !slug) {
    return (
      <div
        className="w-full rounded-xl flex items-center justify-center"
        style={{ aspectRatio: "1/1", background: "#1F2F38" }}
      >
        <span dir="rtl" style={{ fontSize: 28, fontFamily: "serif", color: "#f5e6c0" }}>{arabic}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/cards/${slug}.png`}
        alt={`${arabic} — ${meaning}`}
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}
      >
        <div className="px-1 pb-1 text-center">
          <div dir="rtl" style={{ fontSize: 18, fontFamily: "serif", color: "#f5e6c0", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>{arabic}</div>
          <div style={{ fontSize: 10, color: "#fbbf24", textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>{meaning}</div>
        </div>
      </div>
    </div>
  );
}

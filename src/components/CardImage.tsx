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
    <div className="relative w-full overflow-hidden" style={{ borderRadius: "24px 24px 0 0" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/cards/${slug}.png`}
        alt={`${arabic} — ${meaning}`}
        onError={() => setFailed(true)}
        style={{ width: "100%", display: "block", maxHeight: 300, objectFit: "cover", objectPosition: "center top" }}
      />
      {/* Alttaki slug metnini kapat — gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10"
        style={{ background: "linear-gradient(to top, #0e1a24 0%, transparent 100%)" }}
      />
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
    </div>
  );
}

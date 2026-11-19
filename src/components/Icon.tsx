import type { ReactNode } from "react";

/**
 * Uygulamanın simge seti: İslami sanat motiflerinden esinlenen, tek renkli (currentColor)
 * çizgi simgeler. Emoji yerine kullanılır; metnin rengini ve boyutunu (1em) devralır.
 */
export type IconName =
  | "hilal" | "yildiz8" | "kitap" | "cami" | "mihrap" | "kandil" | "tesbih" | "kalem"
  | "filiz" | "ayet" | "ayn" | "elif" | "pusula" | "ses" | "play" | "kilit" | "kilitAcik"
  | "onay" | "onayDaire" | "carpi" | "yenile" | "kullanici" | "goz" | "gozKapali" | "resim"
  | "tekrarOk" | "ileri";

const P: Record<IconName, ReactNode> = {
  // Hilal ve yıldız
  hilal: (<>
    <path d="M19.5 14.6A8.3 8.3 0 1 1 9.4 4.5a6.6 6.6 0 0 0 10.1 10.1z" />
    <path d="M17.6 4.2l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z" fill="currentColor" stroke="none" />
  </>),
  // Rub el Hizb: iç içe iki kare ve merkez
  yildiz8: (<>
    <rect x="6" y="6" width="12" height="12" rx=".6" />
    <rect x="6" y="6" width="12" height="12" rx=".6" transform="rotate(45 12 12)" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
  </>),
  // Açık Kur'an
  kitap: <path d="M12 6.6C10 5 7 4.6 3.5 5v13c3.5-.4 6.5 0 8.5 1.6 2-1.6 5-2 8.5-1.6V5c-3.5-.4-6.5 0-8.5 1.6zM12 6.6v12" />,
  // Kubbe ve minareler
  cami: (<>
    <path d="M7 20v-5.5a5 5 0 0 1 10 0V20M12 9.5V7.2M4 20h16" />
    <path d="M3.2 20v-8.5l1.6-2.5 1.6 2.5V20M17.6 20v-8.5l1.6-2.5 1.6 2.5V20" />
    <path d="M10.4 20v-2.2a1.6 1.6 0 0 1 3.2 0V20" />
    <circle cx="12" cy="5.8" r="1" />
  </>),
  // Mihrap nişi
  mihrap: (<>
    <path d="M4.5 21V10.5a7.5 7.5 0 0 1 15 0V21M2.5 21h19" />
    <path d="M8.7 21v-9a3.3 3.3 0 0 1 6.6 0v9" />
    <path d="M12 2.2v1.6" />
  </>),
  // Kandil
  kandil: (<>
    <path d="M12 2v2.2M9.4 4.2h5.2l1.6 3H7.8z" />
    <path d="M8 7.2v7.6l2.2 3.2h3.6l2.2-3.2V7.2" />
    <path d="M12 10.2c1.2 1.3 1.2 2.6 0 3.9-1.2-1.3-1.2-2.6 0-3.9z" />
    <path d="M10 18v2.6h4V18" />
  </>),
  // Tesbih
  tesbih: (<>
    <circle cx="12" cy="4.6" r="2" />
    <circle cx="17.3" cy="6.9" r="1.5" /><circle cx="19.4" cy="12.2" r="1.5" />
    <circle cx="17.3" cy="17.5" r="1.5" /><circle cx="12" cy="19.6" r="1.5" />
    <circle cx="6.7" cy="17.5" r="1.5" /><circle cx="4.6" cy="12.2" r="1.5" />
    <circle cx="6.7" cy="6.9" r="1.5" />
  </>),
  // Kalem
  kalem: <path d="M4 20l1.1-4.2L16.6 4.3a2.1 2.1 0 0 1 3 3L8.2 18.9zM14.6 6.3l3 3M5.1 15.8l3.1 3.1" />,
  // Filiz
  filiz: <path d="M12 21v-9.5M12 11.5c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5zM12 14.5C12 11 9.5 9 5 9c0 3.5 2.5 5.5 7 5.5z" />,
  // Ayet sonu işareti
  ayet: (<>
    <circle cx="12" cy="12" r="8.6" /><circle cx="12" cy="12" r="5.4" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </>),
  ayn: <text x="12" y="18.5" fontSize="19" textAnchor="middle" fill="currentColor" stroke="none"
    fontFamily="'Traditional Arabic','Noto Naskh Arabic','Scheherazade New','Amiri',serif">ع</text>,
  elif: <text x="12" y="18.5" fontSize="19" textAnchor="middle" fill="currentColor" stroke="none"
    fontFamily="'Traditional Arabic','Noto Naskh Arabic','Scheherazade New','Amiri',serif">ا</text>,
  // Kıble pusulası
  pusula: (<>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z" />
  </>),
  ses: <path d="M4 9.5v5h3.5l4.5 4V5.5l-4.5 4zM15.5 9a4 4 0 0 1 0 6M18.2 6.3a8 8 0 0 1 0 11.4" />,
  play: <path d="M8.5 5.5v13l10.5-6.5z" fill="currentColor" />,
  kilit: (<><rect x="5" y="11" width="14" height="9.5" rx="2.2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  kilitAcik: (<><rect x="5" y="11" width="14" height="9.5" rx="2.2" /><path d="M8 11V8a4 4 0 0 1 7.6-1.8" /></>),
  onay: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  onayDaire: (<><circle cx="12" cy="12" r="9" /><path d="M7.8 12.3l3.3 3.3 5.6-6.2" /></>),
  carpi: <path d="M6 6l12 12M18 6L6 18" />,
  yenile: <path d="M20 11a8 8 0 0 0-14.5-3.5L4 9.5M4 4v5.5h5.5M4 13a8 8 0 0 0 14.5 3.5l1.5-2M20 20v-5.5h-5.5" />,
  tekrarOk: <path d="M17 3l3 3-3 3M4 11V9.5A3.5 3.5 0 0 1 7.5 6H20M7 21l-3-3 3-3M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H4" />,
  ileri: <path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" />,
  kullanici: (<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>),
  goz: (<><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>),
  gozKapali: <path d="M3 9.5c2.5 3.3 5.5 5 9 5s6.5-1.7 9-5M6.5 13.5L5 16.5M12 15v3.5M17.5 13.5L19 16.5" />,
  resim: (<><rect x="3" y="5" width="18" height="14" rx="2.5" /><circle cx="8.5" cy="10" r="1.5" /><path d="M3.5 17l5-4.5 4 3.5 3-2.5 5 4" /></>),
};

export default function Icon({ name, className, size = "1em", strokeWidth = 1.7, title }: {
  name: IconName; className?: string; size?: number | string; strokeWidth?: number; title?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={`inline-block shrink-0 align-[-0.125em] ${className ?? ""}`}
      role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {P[name]}
    </svg>
  );
}

/** Uygulama logosu: zümrüt zemin, altın rub el hizb, ortada hilal ve açık Kur'an */
export function Logo({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} role="img" aria-label="Ayet Hafızası">
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f766e" /><stop offset="1" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde68a" /><stop offset="1" stopColor="#d4a017" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#lg-bg)" />
      <g fill="none" stroke="url(#lg-gold)" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="14" y="14" width="36" height="36" rx="2" />
        <rect x="14" y="14" width="36" height="36" rx="2" transform="rotate(45 32 32)" />
      </g>
      <circle cx="32" cy="32" r="12.5" fill="#064e3b" stroke="url(#lg-gold)" strokeWidth="1.2" />
      <path d="M32 40.5c-2.6-1.8-5.8-2.2-9-1.9V25.5c3.2-.3 6.4.1 9 1.9 2.6-1.8 5.8-2.2 9-1.9v13.1c-3.2-.3-6.4.1-9 1.9zM32 27.4v13.1"
        fill="none" stroke="url(#lg-gold)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M36.2 20.4a3.8 3.8 0 1 1-4.4-4.8 3 3 0 0 0 4.4 4.8z" fill="url(#lg-gold)" transform="translate(0 -1)" />
    </svg>
  );
}

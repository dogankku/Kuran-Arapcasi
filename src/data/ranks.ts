export interface Rank {
  min: number;
  title: string;
  arabic: string;
  icon: string;
  color: string;
  desc: string;
}

export const RANKS: Rank[] = [
  { min:   0, title: "Yeni Başlayan", arabic: "مبتدئ",         icon: "🌱", color: "#8FA8B4", desc: "Kur'an yolculuğuna hoş geldin!" },
  { min:  10, title: "Talebe",        arabic: "طالب",           icon: "📚", color: "#58CC02", desc: "10 kelime — iyi bir başlangıç!" },
  { min:  25, title: "Mürid",         arabic: "مريد",           icon: "🕊️", color: "#1CB0F6", desc: "25 kelime — sağlam temeller attın." },
  { min:  50, title: "Zâkir",         arabic: "ذاكر",           icon: "🔤", color: "#FFC800", desc: "50 kelime — Kur'an'ın büyük bölümünü anlıyorsun!" },
  { min:  75, title: "Kâri",          arabic: "قارئ",           icon: "📖", color: "#FF9600", desc: "75 kelime — gerçek bir okuyucu oluyorsun." },
  { min: 100, title: "Hafız Adayı",   arabic: "حافظ مبتدئ",    icon: "⭐", color: "#FFD700", desc: "100 kelime — Kur'an'ın %70'ini anlıyorsun!" },
  { min: 150, title: "Ârif",          arabic: "عارف",           icon: "🌟", color: "#FF6B35", desc: "150 kelime — derin anlayışa ulaşıyorsun." },
  { min: 200, title: "Âlim",          arabic: "عالِم",          icon: "💫", color: "#9B59B6", desc: "200 kelime — gerçek bir ilim ehli." },
  { min: 250, title: "Müfessir",      arabic: "مفسِّر",         icon: "🏆", color: "#E67E22", desc: "250 kelime — neredeyse tam anlama!" },
  { min: 300, title: "Kur'an Dostu",  arabic: "صديق القرآن",   icon: "👑", color: "#FFD700", desc: "300 kelime — Kur'an'ın %90'ını anlıyorsun! Tebrikler!" },
];

export function getRank(learned: number): Rank {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (learned >= r.min) rank = r;
    else break;
  }
  return rank;
}

export function getNextRank(learned: number): Rank | null {
  for (const r of RANKS) {
    if (learned < r.min) return r;
  }
  return null;
}

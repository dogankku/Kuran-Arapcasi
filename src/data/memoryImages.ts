// Kelime kartı görselleri artık tek kaynaktan gelir: src/data/cardSlugs.ts → public/cards/*.webp
import { getCardImage } from "./cardSlugs";

export function getMemoryImage(arabic: string): string | null {
  return getCardImage(arabic);
}

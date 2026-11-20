import type { Metadata } from "next";
import WordByWordModule from "@/components/WordByWordModule";

export const metadata: Metadata = {
  title: "Kelime Kelime Meal — Ayet Hafızası",
  description: "Kur'an'ın tamamı sure sure: Arapça, okunuş ve kelime anlamı alt alta, hafız sesine göre ok takipli",
};

export default function KelimeMealPage() {
  return <WordByWordModule />;
}

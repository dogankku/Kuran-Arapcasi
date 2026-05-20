import type { Metadata } from "next";
import HatimModule from "@/components/HatimModule";

export const metadata: Metadata = {
  title: "Kuran Hatim — Ayet Hafızası",
  description: "Tüm 114 sure — hatip sesine göre ok takipli kelime vurgulama",
};

export default function HatimPage() {
  return <HatimModule />;
}

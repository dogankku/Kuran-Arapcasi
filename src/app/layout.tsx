import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayet Hafızası",
  description: "Kur'an Arapçası Öğrenme Sistemi – 300 kelimeyle Kur'an'ın %90'ını anla",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Ayet Hafızası" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F1923",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

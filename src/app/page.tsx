import Link from "next/link";
export default function HomePage() {
  return <main className="min-h-screen text-white flex items-center justify-center p-6">
    <section className="glass-card rounded-[2rem] p-8 md:p-12 max-w-5xl w-full">
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 rounded-full px-4 py-2 text-sm mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />Temiz Sürüm · Supabase Yok
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Ayet Hafızası</h1>
      <p className="text-stone-300 mt-5 text-lg leading-relaxed max-w-2xl">Görsel hafıza, kelime dersi, test ve akıllı tekrar paneli.</p>
      <Link href="/dashboard" className="inline-block mt-8 bg-emerald-600 hover:bg-emerald-500 rounded-2xl px-7 py-4 font-semibold">Panele Gir</Link>
    </section>
  </main>;
}

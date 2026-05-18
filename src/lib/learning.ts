import type { Level, ProgressMap, QuizMode, Word, WordProgress } from "@/data/types";
export const STORAGE_KEY = "ayet-hafizasi-clean-v1";
export function speakArabic(text:string){ if(typeof window==="undefined")return; window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="ar-SA"; u.rate=.75; u.pitch=1; window.speechSynthesis.speak(u); }
export function emptyProgress():WordProgress{ return {known:false,hard:false,correctCount:0,hardCount:0,wrongCount:0,lastAnswer:null,lastStudiedAt:null,nextReviewAt:null}; }
export function updateProgress(old:WordProgress,type:"known"|"hard"|"wrong"):WordProgress{ const correctCount=type==="known"?old.correctCount+1:old.correctCount; const hardCount=type==="hard"?old.hardCount+1:old.hardCount; const wrongCount=type==="wrong"?old.wrongCount+1:old.wrongCount; return {...old,known:type==="known"?correctCount>=2:old.known,hard:type==="hard"||type==="wrong"?true:(correctCount>=2?false:old.hard),correctCount,hardCount,wrongCount,lastAnswer:type,lastStudiedAt:new Date().toISOString(),nextReviewAt:new Date(Date.now()+86400000).toISOString()}; }
export function getReviewWords(words:Word[],progress:ProgressMap){ return words.filter(w=>{const item=progress[w.id]; return item ? item.hard||item.wrongCount>0 : false;}); }
export function getLevelTitle(level:Level){ if(level===1)return "Edatlar ve Bağlaçlar"; if(level===2)return "İsimler ve Anlamlar"; return "Fiiller"; }
export function getLevelShort(level:Level){ return `Kademe ${level}`; }
export function getLevelDescription(level:Level){ if(level===1)return "Kısa ama çok sık geçen bağlantı kelimeleri."; if(level===2)return "Kur’an’da sık geçen isim ve kavramlar."; return "Fiiller ve cümle hareketleri."; }
export function getLevelIcon(level:Level){ if(level===1)return "◇"; if(level===2)return "◈"; return "◆"; }
export function buildQuizOptions(words:Word[],activeWord:Word,mode:QuizMode){ const getAnswer=(w:Word)=>mode==="meaning"?w.turkish_meaning:mode==="reverse"?w.arabic:mode==="role"?w.part_of_speech:(w.root||"kök yok"); const correct=getAnswer(activeWord); const wrong=words.filter(w=>w.id!==activeWord.id).map(getAnswer).filter(x=>x!==correct).filter((x,i,a)=>a.indexOf(x)===i).sort(()=>Math.random()-.5).slice(0,3); return [...wrong,correct].sort(()=>Math.random()-.5); }
export function getQuizPrompt(activeWord:Word,mode:QuizMode){ if(mode==="meaning")return{title:"Arapça kelimenin Türkçe anlamını seç.",question:activeWord.arabic,answer:activeWord.turkish_meaning,questionIsArabic:true}; if(mode==="reverse")return{title:"Türkçe anlamın Arapça karşılığını seç.",question:activeWord.turkish_meaning,answer:activeWord.arabic,questionIsArabic:false}; if(mode==="role")return{title:"Kelimenin görevini seç.",question:activeWord.arabic,answer:activeWord.part_of_speech,questionIsArabic:true}; return{title:"Kelimenin kökünü seç.",question:activeWord.arabic,answer:activeWord.root||"kök yok",questionIsArabic:true}; }

export function getQuranCoverage(learnedCount: number): number {
  // Yaklaşık Quran kelime kapsama yüzdesi (frequency ağırlıklı)
  if (learnedCount >= 300) return 90;
  if (learnedCount >= 200) return 85;
  if (learnedCount >= 150) return 80;
  if (learnedCount >= 100) return 75;
  if (learnedCount >= 75) return 70;
  if (learnedCount >= 50) return 62;
  if (learnedCount >= 30) return 50;
  if (learnedCount >= 20) return 40;
  if (learnedCount >= 10) return 25;
  return Math.round(learnedCount * 2.5);
}

export function getMilestone(learnedCount: number): { current: number; next: number; label: string } {
  const milestones = [
    { threshold: 10, label: "%25 Kur'an" },
    { threshold: 20, label: "%40 Kur'an" },
    { threshold: 30, label: "%50 Kur'an" },
    { threshold: 50, label: "%62 Kur'an" },
    { threshold: 75, label: "%70 Kur'an" },
    { threshold: 100, label: "%75 Kur'an" },
    { threshold: 150, label: "%80 Kur'an" },
    { threshold: 200, label: "%85 Kur'an" },
    { threshold: 300, label: "%90 Kur'an" },
  ];
  const passed = milestones.filter(m => learnedCount >= m.threshold);
  const next = milestones.find(m => learnedCount < m.threshold) || milestones[milestones.length - 1];
  return {
    current: passed.length > 0 ? passed[passed.length - 1].threshold : 0,
    next: next.threshold,
    label: next.label,
  };
}

export function getDailyWords(words: Word[], progress: ProgressMap, count = 5): Word[] {
  // Önce bilinmeyen kelimeleri frekansa göre sırala (frequency alanı varsa büyükten küçüğe)
  const unknown = words.filter(w => {
    const p = progress[w.id];
    return !p || !p.known;
  });
  const sorted = [...unknown].sort((a, b) => {
    const fa = (a as any).frequency ?? 0;
    const fb = (b as any).frequency ?? 0;
    return fb - fa;
  });
  return sorted.slice(0, count);
}

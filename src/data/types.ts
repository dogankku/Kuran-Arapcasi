export type Level = 1 | 2 | 3;
export type QuizMode = "meaning" | "reverse" | "role" | "root";
export type Word = { id:number; level:Level; arabic:string; transliteration:string; turkish_meaning:string; root:string|null; part_of_speech:string; memory_hint:string; example_arabic:string; example_turkish:string; grammar_note:string; frequency?:number; };
export type WordProgress = { known:boolean; hard:boolean; correctCount:number; hardCount:number; wrongCount:number; lastAnswer:"known"|"hard"|"wrong"|null; lastStudiedAt:string|null; nextReviewAt:string|null; };
export type ProgressMap = Record<number, WordProgress>;
export type GrammarTopic = { id:number; level:Level; title:string; description:string; example_arabic:string; example_turkish:string; memory_hint:string; };
export type SentenceToken = { arabic:string; meaning:string; role:string; note:string; };
export type SentenceAnalysis = { id:number; level:Level; title:string; arabic:string; turkish:string; pattern:string; explanation:string; tokens:SentenceToken[]; };

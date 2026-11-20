#!/usr/bin/env python3
"""scripts/extended_words.json -> src/data/wordsExtended.ts

Ek kelimelere id (1001+), tür, kademe, okunuş (Türkçe), gramer notu ve
"aynı kökten" hafıza ipucu ekler. Önek ve zamirler elle yazılmıştır (MANUAL).
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from arabic_translit import arabic_to_turkish  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# lemma -> (arapça, okunuş, anlam, tür, not)
MANUAL = {
    "ل": ("لِ", "li-", "için / -e / -in", "edat", "Kelimenin başına bitişen harf-i cer: لِلَّهِ (Allah için), لَهُمْ (onlar için). Fiilin başında emir veya tekit (pekiştirme) lamı olabilir."),
    "ف": ("فَ", "fe-", "artık / böylece / o halde", "bağlaç", "Sıra ve sonuç bildiren bitişik bağlaç: فَقَالَ (bunun üzerine dedi)."),
    "ب": ("بِ", "bi-", "ile / -de / -e", "edat", "Bitişik harf-i cer: بِسْمِ (adıyla), بِاللَّهِ (Allah'a)."),
    "أ": ("أَ", "e-", "mi? (soru)", "edat", "Soru hemzesi; cümlenin başına bitişir: أَفَلَا تَعْقِلُونَ (hâlâ akıl erdirmez misiniz?)."),
    "س": ("سَ", "se-", "-ecek (yakın gelecek)", "edat", "Muzari fiilin başına bitişir ve yakın geleceği bildirir: سَيَقُولُ (diyecek)."),
    "ت": ("تَ", "te-", "andolsun (yemin)", "edat", "Yemin harfi, yalnız Allah lafzıyla gelir: تَاللَّهِ (Allah'a andolsun)."),
    "عَن": ("عَنْ", "'an", "-den (uzaklaşma) / hakkında", "edat", "Harf-i cer; uzaklaşma ve konu bildirir: يَسْأَلُونَكَ عَنِ (sana ... hakkında soruyorlar)."),
    "ك": ("ـكَ", "-ke", "seni / senin / sana", "zamir", "Çoğunlukla 2. tekil bitişik zamir: رَبُّكَ (Rabbin), لَكَ (sana). İsmin başına bitişen كَـ ise 'gibi' demektir: كَمَثَلِ (... misali gibi)."),
    "لَوْلا": ("لَوْلَا", "levlâ", "olmasaydı / -meli değil miydi?", "edat", "İsimden önce 'olmasaydı', fiilden önce sitem/teşvik: لَوْلَا فَضْلُ اللَّهِ (Allah'ın lütfu olmasaydı)."),
    "أَمّا": ("أَمَّا", "emmâ", "-e gelince", "edat", "Ayırma edatı; cevabı genellikle فَ ile başlar: فَأَمَّا الَّذِينَ آمَنُوا (iman edenlere gelince...)."),
    "أَلا": ("أَلَا", "elâ", "dikkat edin! / iyi bilin ki", "edat", "Dikkat çekme edatı: أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ (iyi bilin ki Allah'ın dostları...)."),
    "إِمّا": ("إِمَّا", "immâ", "ya ... ya da / eğer", "edat", "Seçenek bildirir: إِمَّا شَاكِرًا وَإِمَّا كَفُورًا (ya şükreden ya nankör)."),
    "لَيْت": ("لَيْتَ", "leyte", "keşke", "edat", "Temenni edatı, إِنَّ gibi ismini nasb eder: يَا لَيْتَنِي (keşke ben...)."),
    "كَي": ("كَيْ", "key", "-sın diye / için", "edat", "Amaç bildirir, muzariyi nasb eder: كَيْ لَا (... olmasın diye)."),
    "ه": ("ـهُ", "-hu", "onu / onun (eril)", "zamir", "Bitişik zamir, 3. tekil eril: كِتَابُهُ (onun kitabı), خَلَقَهُ (onu yarattı)."),
    "كُمْ": ("ـكُمْ", "-kum", "sizi / sizin", "zamir", "Bitişik zamir, 2. çoğul: رَبُّكُمْ (Rabbiniz), عَلَيْكُمْ (üzerinize)."),
    "أَنتُمْ": ("أَنْتُمْ", "entum", "siz", "zamir", "Ayrı zamir, 2. çoğul eril: وَأَنْتُمْ تَعْلَمُونَ (siz de bildiğiniz halde)."),
    "هَا": ("ـهَا", "-hâ", "onu / onun (dişil)", "zamir", "Bitişik zamir, 3. tekil dişil; cansız çoğullar için de: فِيهَا (onun içinde)."),
    "نَا": ("ـنَا", "-nâ", "bizi / bizim / biz", "zamir", "Bitişik zamir, 1. çoğul: رَبَّنَا (Rabbimiz), خَلَقْنَا (yarattık)."),
    "أَنَا۠": ("أَنَا", "ene", "ben", "zamir", "Ayrı zamir, 1. tekil: إِنِّي أَنَا اللَّهُ (şüphesiz ben Allah'ım)."),
    "هُنَّ": ("هُنَّ", "hunne", "onlar (dişil)", "zamir", "3. çoğul dişil zamir; bitişik hali ـهُنَّ: لَهُنَّ (onlar için)."),
    "إِيّا": ("إِيَّا", "iyyâ", "yalnız (zamir taşıyıcı)", "zamir", "Mef'ûl zamirini öne alıp vurgular: إِيَّاكَ نَعْبُدُ (yalnız sana kulluk ederiz)."),
    "هُمَا": ("هُمَا", "humâ", "o ikisi", "zamir", "3. ikil (tesniye) zamir; bitişik hali ـهُمَا: بَيْنَهُمَا (ikisinin arası)."),
    "كُمَا": ("ـكُمَا", "-kumâ", "siz ikiniz / ikinizin", "zamir", "2. ikil bitişik zamir: رَبُّكُمَا (ikinizin Rabbi)."),
}
ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]


def turkish_reading(s):
    t = (s or "").replace("'", "").lower()  # Quran.com'da ' hece ayıracı; ayın ʿ ile gelir
    for a, b in [("sh", "ş"), ("kh", "h"), ("gh", "ğ"), ("th", "s"), ("dh", "z"), ("ḥ", "h"), ("ṣ", "s"), ("ḍ", "d"),
                 ("ṭ", "t"), ("ẓ", "z"), ("q", "k"), ("j", "c"), ("w", "v"), ("ā", "â"), ("ī", "î"), ("ū", "û"),
                 ("ʿ", "'"), ("ʾ", "'"), ("’", "'")]:
        t = t.replace(a, b)
    return re.sub(r"^al-", "el-", t)


def roman(vf):
    try:
        return ROMAN[int(vf)]
    except (TypeError, ValueError, IndexError):
        return str(vf)


def main():
    data = json.load(open(os.path.join(ROOT, "scripts/extended_words.json"), encoding="utf8"))
    core_src = open(os.path.join(ROOT, "src/data/words.ts"), encoding="utf8").read()
    # Aynı kökten bilinen (çekirdek) kelimeler: hafıza ipucu için
    core = re.findall(r'"arabic":\s*"([^"]+)",[\s\S]*?"turkish_meaning":\s*"([^"]+)",\s*"root":\s*(null|"[^"]*")', core_src)
    by_root = {}
    for ar, tr, root in core:
        if root != "null":
            by_root.setdefault(json.loads(root), []).append(f"{ar} ({tr.split(' / ')[0]})")

    entries = []
    for i, w in enumerate(data["words"]):
        wid = 1001 + i
        if w["lemma"] in MANUAL:
            ar, tl, meaning, pos, note = MANUAL[w["lemma"]]
            level = 1
            hint = "Çok sık geçen yapı harfi/zamiri; kelimenin parçası olarak okunur."
        else:
            ar = w["arabic"]
            # Okunuş gösterilen Arapçadan üretilir; olmazsa Quran.com okunuşu
            tl = arabic_to_turkish(ar, keep_final=(w["tag"] == "V")) or turkish_reading(w["tl"])
            meaning = " / ".join([w["meaning"]] + w["alts"][:2]) if w["meaning"] else ""
            if w["tag"] == "V":
                pos, level, note = "fiil", 3, f"{roman(w['vf'] or 1)}. bab fiil"
            elif w["tag"] == "P":
                pos, level, note = "edat", 1, "Edat"
            elif w["pn"]:
                pos, level, note = "özel isim", 2, "Özel isim"
            elif w["pron"]:
                pos, level, note = "zamir", 1, "Zamir"
            elif w["adj"]:
                pos, level, note = "sıfat", 2, "Sıfat (niteleme kelimesi)"
            else:
                pos, level, note = "isim", 2, "İsim"
            if w["root"]:
                note += f"; kökü {w['root']}"
            note += f". Kur'an'da {w['count']} kez geçer."
            same = by_root.get(w["root"] or "", [])[:3]
            hint = (f"Aynı kökten bildiklerin: {', '.join(same)}." if same else
                    (f"Kökü {w['root']}; örnek ayette bağlamıyla tekrar et." if w["root"] else "Örnek ayette bağlamıyla tekrar et."))
        if not meaning:
            continue
        entries.append({
            "id": wid, "level": level, "arabic": ar, "transliteration": tl, "turkish_meaning": meaning,
            "root": w["root"], "part_of_speech": pos, "memory_hint": hint,
            "example_arabic": w["example_ar"], "example_turkish": w["example_tr"], "grammar_note": note,
            "frequency": w["count"], "example_ref": w["ref"], "lemma": w["key"], "extended": True,
        })
    body = ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in entries)
    open(os.path.join(ROOT, "src/data/wordsExtended.ts"), "w", encoding="utf8").write(
        "// Otomatik üretildi: scripts/build_extended_words.py (kaynak: Quranic Arabic Corpus + Quran.com kelime meali).\n"
        "// Kur'an metninin %95'ini kapsamak için çekirdek 420 kelimeye eklenen kelimeler. Elle düzenleme yerine betiği güncelleyin.\n"
        "import type { Word } from \"./types\";\n\n"
        f"export const extendedWords: Word[] = [\n{body}\n];\n")
    print("yazıldı", len(entries), "kelime;", len(data["words"]) - len(entries), "anlamı boş olduğu için atlandı")


if __name__ == "__main__":
    main()

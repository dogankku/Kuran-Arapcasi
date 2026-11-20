"""Harekeli Arapça kelimeyi Türkçe okunuşa çevirir (ör. أَقْبَلَ -> ekbele, أَصْحاب -> eshâb)."""
import re

CONS = {"ب":"b","ت":"t","ث":"s","ج":"c","ح":"h","خ":"h","د":"d","ذ":"z","ر":"r","ز":"z","س":"s","ش":"ş","ص":"s","ض":"d",
        "ط":"t","ظ":"z","ع":"'","غ":"ğ","ف":"f","ق":"k","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"v","ي":"y",
        "ء":"'","أ":"'","إ":"'","ؤ":"'","ئ":"'","ة":"t"}
KALIN = set("خصضطظغقحع")
FATHA, KASRA, DAMMA, SUKUN, SHADDA = "َ", "ِ", "ُ", "ْ", "ّ"
TAN = {"ً": "an", "ٍ": "in", "ٌ": "un"}


def arabic_to_turkish(word, keep_final=False):
    s = word.replace("ٱ", "ا").replace("ـ", "").replace("ٰ", "ا")
    s = "".join(ch for ch in s if not ("ۖ" <= ch <= "ۭ") and ch not in "ٕٓٔ")
    s = re.sub("\u0649(?=[\u064E\u064F\u0650\u0651])", "\u064A", s)  # harekeli elif-i maksure = ye
    out, i, n = [], 0, len(s)
    # baştaki elif: harekeye göre sesli
    while i < n:
        ch = s[i]
        nxt = s[i + 1] if i + 1 < n else ""
        if ch in "اآى":
            if ch == "آ":
                out.append("â")
            elif out and out[-1] and out[-1][-1] in "ae":
                out[-1] = out[-1][:-1] + "â"
            elif out and out[-1] and out[-1][-1] not in "âîûiu":
                out[-1] = out[-1] + "â"
            elif not out:
                # vasl/hemzesiz baş elif
                if nxt == FATHA: out.append("e"); i += 1
                elif nxt == KASRA: out.append("i"); i += 1
                elif nxt == DAMMA: out.append("u"); i += 1
                else: out.append("i")
            elif ch == "ى":
                out.append("â")
            i += 1
            continue
        if ch in TAN:
            out.append(TAN[ch]); i += 1; continue
        if ch in (FATHA, KASRA, DAMMA, SUKUN, SHADDA):
            i += 1; continue
        if ch in CONS:
            c = CONS[ch]
            if ch in "أإ" and not out:
                c = ""  # kelime başı hemze yazılmaz
            if ch == "ة" and (i + 1 >= n or s[i + 1] in (SUKUN,)):
                c = "t"
            j = i + 1
            doubled = False
            vowel = ""
            while j < n and s[j] in (FATHA, KASRA, DAMMA, SUKUN, SHADDA, *TAN.keys()):
                m = s[j]
                if m == SHADDA: doubled = True
                elif m == FATHA: vowel = "a" if ch in KALIN or (out and any(k in "".join(out[-2:]) for k in "a")) and ch in "رل" else ("a" if ch in KALIN else "e")
                elif m == KASRA: vowel = "i"
                elif m == DAMMA: vowel = "u"
                elif m in TAN: vowel = TAN[m]
                j += 1
            # uzun ünlüler
            if vowel == "i" and j < n and s[j] == "ي" and (j + 1 >= n or s[j + 1] not in (FATHA, KASRA, DAMMA, SHADDA)):
                vowel = "î"; j += 1
                if j < n and s[j] == SUKUN: j += 1
            elif vowel == "u" and j < n and s[j] == "و" and (j + 1 >= n or s[j + 1] not in (FATHA, KASRA, DAMMA, SHADDA)):
                vowel = "û"; j += 1
                if j < n and s[j] == SUKUN: j += 1
                if j < n and s[j] == "ا": j += 1  # fiil çoğul eki elifi okunmaz
            out.append(c * (2 if doubled and c else 1) + vowel)
            i = j
            continue
        i += 1
    t = "".join(out)
    if not keep_final:
        for suf in ("un", "in", "an", "u", "i", "a", "e"):
            if t.endswith(suf) and len(t) > len(suf) + 2 and not t.endswith("â" + suf):
                t = t[: -len(suf)]
                break
    t = t.replace("'", "'")
    return t.lstrip("'")

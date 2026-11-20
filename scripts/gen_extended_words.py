#!/usr/bin/env python3
"""Kur'an metninin %95'ini kapsamak için eksik kelimeleri (lemmaları) üretir.

Kaynaklar:
  - Quranic Arabic Corpus morfolojisi (github.com/mustafa0x/quran-morphology): lemma, kök, tür, sayım
  - Quran.com (Quran Foundation) kelime kelime meali: Türkçe anlam, okunuş, örnek bağlam
Çıktı: scripts/extended_words.json  (uygulama verisine scripts/build_extended_words.py ile dönüştürülür)
Sadece standart kütüphane kullanır; GitHub Actions'ta çalıştırılır.
"""
import collections, json, os, re, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MORPH_URL = "https://raw.githubusercontent.com/mustafa0x/quran-morphology/master/quran-morphology.txt"
QDC = "https://api.qurancdn.com/api/qdc/verses/by_chapter/{ch}?words=true&word_fields=text_uthmani&word_translation_language={lang}&per_page=50&page={page}"
TARGET = 0.95
SKIP_VERSES = {(2, 181)}  # iki kaynakta kelime bölünmesi farklı

DIAC = re.compile(r"[ً-ْٓ-ٟۖ-ۭـ]")
MARKS = re.compile(r"[ٓ-ٟۖ-ۭـ]")


def norm(s):
    s = s.replace("ٰ", "").replace("ٱ", "ا")
    s = DIAC.sub("", s)
    return s.replace("ءا", "ا").replace("آ", "ا").replace("ى", "ي").replace("ة", "ت").strip()


def display(s):
    """Kur'an'a özgü küçük işaretleri at, elif-i vasl'ı düz elif yap."""
    return MARKS.sub("", s.replace("ٱ", "ا")).strip()


def get(url, tries=5):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ayet-hafizasi-wordgen/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            if i == tries - 1:
                raise
            print("retry", url, e, file=sys.stderr)
            time.sleep(2 * (i + 1))


def tr_lower(s):
    return s.replace("I", "ı").replace("İ", "i").lower()


def clean_tr(t):
    t = (t or "").replace("[", "").replace("]", "").replace("“", "").replace("”", "").replace('"', "")
    return re.sub(r"\s+", " ", tr_lower(t)).strip(" ,.;")


COPULA = re.compile(r"(d|t)(ı|i|u|ü)r(lar|ler)?$")


def base_tr(t, proper=False):
    """Sözlük biçimine yaklaştır: 'bir oyundur' -> 'oyun', 'harun'u' -> 'Harun', 'cehennemdir' -> 'cehennem'."""
    t = re.sub(r"^(ve|bir|hiç|hiçbir)\s+", "", t)
    no_paren = re.sub(r"\s*\(.*?\)", "", t).strip()
    if no_paren:
        t = no_paren
    if proper or "'" in t:
        head = t.split("'")[0]
        if len(head) >= 2:
            t = head
    if " " not in t:
        u = COPULA.sub("", t)
        if len(u) >= 3:
            t = u
    if proper and t:
        t = t[0].upper().replace("I", "İ") + t[1:] if t[0] != "i" else "İ" + t[1:]
    return t.strip()


def main():
    # 1) Korpus
    toks = collections.OrderedDict()
    for line in get(MORPH_URL).decode("utf8").splitlines():
        p = line.split("\t")
        if len(p) < 4:
            continue
        s, a, w, _ = p[0].split(":")
        toks.setdefault((int(s), int(a), int(w)), []).append((p[1], p[2], p[3].split("|")))

    cnt = collections.Counter()
    total = 0
    info = collections.defaultdict(lambda: {"raw": collections.Counter(), "root": collections.Counter(),
                                            "pos": collections.Counter(), "vf": collections.Counter(),
                                            "clean": [], "any": [], "verbform": collections.Counter()})
    for loc, segs in toks.items():
        stems = [(f_, t_, g) for f_, t_, g in segs if "DET" not in g]
        for form, tag, f in segs:
            if "SUFF" in f or "DET" in f:
                continue
            lem = next((x[4:] for x in f if x.startswith("LEM:")), None)
            if not lem and "PRON" in f:
                lem = form
            if not lem:
                continue
            K = norm(lem)
            cnt[K] += 1
            total += 1
            I = info[K]
            I["raw"][lem] += 1
            root = next((x[5:] for x in f if x.startswith("ROOT:")), None)
            if root:
                I["root"][root] += 1
            I["pos"][(tag, "PN" in f, "ADJ" in f, "PRON" in f)] += 1
            vf = next((x[3:] for x in f if x.startswith("VF:")), None)
            if vf:
                I["vf"][vf] += 1
            if "PREF" in f or loc[:2] in SKIP_VERSES:
                continue
            pref = 0 if (("PERF" in f and "3MS" in f) or ("NOM" in f and "V" != tag) or tag == "P") else 3
            pref += 1 if any("DET" in g for _, _, g in segs) else 0
            I["any"].append((pref + 10 * (len(stems) - 1), loc))
            if len(stems) == 1:
                I["clean"].append((pref, loc))
                if tag == "V" and "PERF" in f and "3MS" in f:
                    I["verbform"][display(form)] += 1

    existing = set(re.findall(r':\s*"([^"]+)"', open(os.path.join(ROOT, "src/data/quranFreq.ts"), encoding="utf8").read()))
    run, targets = 0, []
    for K, v in cnt.most_common():
        run += v
        if K not in existing:
            targets.append(K)
        if run / total >= TARGET:
            break
    print(f"hedef: {len(targets)} yeni lemma, kapsam %{run / total * 100:.1f}", file=sys.stderr)

    # 2) Quran.com kelime meali (tr + en; en, Türkçe verisi eksik olan yerleri ayıklamak için)
    wbw = {}
    for ch in range(1, 115):
        for lang in ("tr", "en"):
            page = 1
            while page:
                d = json.loads(get(QDC.format(ch=ch, lang=lang, page=page)))
                for v in d["verses"]:
                    i = 0
                    for w in v["words"]:
                        if w.get("char_type_name") != "word":
                            continue
                        i += 1
                        k = (ch, v["verse_number"], i)
                        e = wbw.setdefault(k, {"ar": w.get("text_uthmani") or "", "tl": ((w.get("transliteration") or {}).get("text") or "")})
                        e[lang] = ((w.get("translation") or {}).get("text") or "")
                page = (d.get("pagination") or {}).get("next_page")
                time.sleep(0.15)
        print("sure", ch, file=sys.stderr)

    # 3) Her lemma için anlam, okunuş, örnek
    out = []
    for K in targets:
        I = info[K]
        (tag, pn, adj, pron), _ = I["pos"].most_common(1)[0]

        def vote(cs):
            tally = collections.Counter()
            for _, loc in cs[:300]:
                e = wbw.get(loc)
                if not e:
                    continue
                t = clean_tr(e.get("tr"))
                if t and t != clean_tr(e.get("en")):
                    b = base_tr(t, proper=pn)
                    if b:
                        tally[b] += 1
            return tally

        cands = sorted(I["clean"]) or sorted(I["any"])
        best_group = [c for c in cands if c[0] == cands[0][0]] if cands else []
        tally = vote(best_group) if len(best_group) >= 2 else collections.Counter()
        if not tally:
            tally = vote(cands)
        if not tally:
            tally = vote(sorted(I["any"]))
        top = tally.most_common(3)
        meaning = top[0][0] if top else ""
        alts = [t for t, c in top[1:] if top and c >= 0.3 * top[0][1] and t not in meaning]
        best = cands[0][1] if cands else None
        ex_ar = ex_tr = ref = tl = ""
        if best:
            s, a, w = best
            win = [wbw.get((s, a, j)) for j in range(max(1, w - 2), w + 3)]
            win = [x for x in win if x]
            ex_ar = " ".join(x["ar"] for x in win)
            ex_tr = " ".join(clean_tr(x.get("tr")) for x in win if clean_tr(x.get("tr")) != clean_tr(x.get("en")))
            ref = f"{s}:{a}"
            tl = wbw.get(best, {}).get("tl", "")
        raw = I["raw"].most_common(1)[0][0]
        ar = I["verbform"].most_common(1)[0][0] if tag == "V" and I["verbform"] else display(raw)
        root = I["root"].most_common(1)[0][0] if I["root"] else None
        out.append({
            "key": K, "lemma": raw, "arabic": ar, "count": cnt[K], "root": "-".join(root) if root else None,
            "tag": tag, "pn": pn, "adj": adj, "pron": pron, "vf": I["vf"].most_common(1)[0][0] if I["vf"] else None,
            "tl": tl, "meaning": meaning, "alts": alts, "votes": top[0][1] if top else 0,
            "example_ar": ex_ar, "example_tr": ex_tr, "ref": ref,
        })
    path = os.path.join(ROOT, "scripts/extended_words.json")
    json.dump({"total_segments": total, "target": TARGET, "words": out}, open(path, "w", encoding="utf8"), ensure_ascii=False, indent=0)
    print("yazıldı", path, len(out), "boş anlam:", sum(1 for o in out if not o["meaning"]), file=sys.stderr)


if __name__ == "__main__":
    main()

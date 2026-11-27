"""Expected Hafs phonetic script of every ayah, for the experimental tajweed check (voice-check.js).

Writes tj/<surah>.json:
  {"w": [[uthmani words] per ayah], "p": [phonemes per ayah], "s": [[word spans, flat]], "u": [[units]]}
  a unit = [start, end, kind, word, golden, allowed (list), rule, char]

Needs (not pip-installable here, cloned from GitHub):
  HisnLabs/tajweed (imam.py)       → TAJWEED_DIR
  obadx/quran-transcript (src/)    → PYTHONPATH
  a Levenshtein module (python-Levenshtein, or the small stub in tools/stubs)
Run:  PYTHONPATH=tools/stubs:<quran-transcript>/src TAJWEED_DIR=<tajweed> python3 tools/build_tajweed_refs.py
"""
import json, os, sys

sys.path.insert(0, os.environ.get('TAJWEED_DIR', '../ext/tajweed'))
import imam  # noqa: E402
from quran_transcript import Aya  # noqa: E402

LONG = set('اۥۦ')
HARAKAT = set('َُِ')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tj')
COUNTS = [7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64,
          77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49,
          62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
          29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4,
          5, 6]


def madd_units(ph, spans):
    """the madds, read from the script itself (this phonetizer version no longer tags them):
    a run of the long vowel: 2 = natural, 6 = lazim, 4 = muttasil / munfasil / ʿarid by what follows"""
    last = len(spans) - 1
    word_at = lambda i: next((k for k, (a, b) in enumerate(spans) if a <= i < b), last)
    units, i = [], 0
    while i < len(ph):
        j = i
        while j < len(ph) and ph[j] == ph[i]: j += 1
        c, n, w = ph[i], j - i, word_at(i)
        nxt = ph[j] if j < len(ph) else ''
        if c in LONG:
            if n >= 6: rule, allowed = 'LazemMaddRule', [6]
            elif n <= 2:
                rule, allowed = 'NormalMaddRule', [2]
            elif nxt == 'ء' and word_at(j) == w: rule, allowed = 'MottaselMaddRule', [4, 5, 6]
            elif nxt == 'ء': rule, allowed = 'MonfaselMaddRule', [2, 4, 5]
            elif w == last: rule, allowed = 'AaredMaddRule', [2, 4, 6]
            else: rule, allowed = 'MottaselMaddRule', [4, 5, 6]
            units.append([i, j, 'madd', w, n, allowed, rule, c])
        elif c in 'يو' and n >= 2 and i and ph[i - 1] == 'َ' and w == last and nxt and nxt not in HARAKAT and nxt not in LONG:
            # lin at a stop: خَوْفْ → خَوووف (the و itself is the first count)
            units.append([i, j, 'madd', w, n + 1, [2, 4, 6], 'LeenMaddRule', c])
        i = j
    return units


def one(su, a):
    words = Aya(su, a).get().uthmani.split(' ')
    r = imam.expected(words)
    ph = r.phonemes
    md = madd_units(ph, r.spans)
    taken = set(x for u in md for x in range(u[0], u[1]))
    units = [u for u in md]
    for u in r.units:
        if any(x in taken for x in range(u.s, u.e)): continue
        units.append([u.s, u.e, u.kind, u.word, u.golden, sorted(u.allowed), u.rule, u.char])
    for q, c in enumerate(ph):
        if c == 'ڇ': units.append([q, q + 1, 'qalqalah', next((k for k, (s, e) in enumerate(r.spans) if s <= q < e), len(words) - 1), 0, [], '', 'ڇ'])
    units.sort(key=lambda u: u[0])
    return words, ph, [x for sp in r.spans for x in sp], units


def main(which):
    os.makedirs(OUT, exist_ok=True)
    for su in which:
        d = {'w': [], 'p': [], 's': [], 'u': []}
        for a in range(1, COUNTS[su - 1] + 1):
            w, p, s, u = one(su, a)
            d['w'].append(w); d['p'].append(p); d['s'].append(s); d['u'].append(u)
        with open(os.path.join(OUT, f'{su}.json'), 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, separators=(',', ':'))
        print(su, len(d['p']), end='  ', flush=True)
    print()


if __name__ == '__main__':
    main([int(x) for x in sys.argv[1:]] or range(1, 115))

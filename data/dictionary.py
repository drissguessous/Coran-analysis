"""Dictionnaire de tous les mots du Coran.

Chaque mot du texte affiché est rattaché, d'après la morphologie du Quranic Arabic Corpus,
à son lemme et à sa racine. Les définitions des racines et des mots-outils sont dans data/dict/.
"""
import collections, difflib, glob, json, os, re, unicodedata

from q import V, norm

HERE = os.path.dirname(os.path.abspath(__file__))
ALPHA = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'
FOLD = {'أ': 'ا', 'ء': 'ا', 'إ': 'ا', 'آ': 'ا', 'ى': 'ي', 'ئ': 'ي', 'ؤ': 'و'}
SIGN = re.compile(r'^[ۖ-ۭ۞۩]+$')
VF = ['فَعَلَ', 'فَعَّلَ', 'فاعَلَ', 'أَفْعَلَ', 'تَفَعَّلَ', 'تَفاعَلَ', 'انْفَعَلَ', 'افْتَعَلَ', 'افْعَلَّ', 'اسْتَفْعَلَ', 'افْعالَّ', 'افْعَوْعَلَ']
FW_TAGS = ('P', 'PRON', 'DEM', 'REL', 'T', 'LOC', 'COND', 'INTG', 'NEG', 'ACC', 'CONJ', 'SUB', 'RES', 'CERT', 'PRO', 'RET', 'EXP',
           'EXL', 'AMD', 'ANS', 'AVR', 'CAUS', 'CIRC', 'COM', 'EQ', 'EXH', 'FUT', 'INC', 'INT', 'PREV', 'REM', 'RSLT', 'SUP', 'SUR',
           'VOC', 'ATT', 'DIST', 'ADDR', 'INL', 'EMPH', 'IMPV', 'PRP', 'DET', 'NV', 'PN')


def root_key(r):
    return [ALPHA.index(FOLD.get(c, c)) if FOLD.get(c, c) in ALPHA else 99 for c in r]


def load_morphology():
    W = collections.OrderedDict()
    for line in open(os.path.join(HERE, 'morphology', 'quran-morphology.txt'), encoding='utf-8'):
        loc, form, tag, feat = line.rstrip('\n').split('\t')
        s, a, w, g = map(int, loc.split(':'))
        f = feat.split('|')
        d = {'form': form, 'tag': tag, 'f': f}
        for x in f:
            if x.startswith('ROOT:'):
                d['root'] = x[5:]
            elif x.startswith('LEM:'):
                d['lem'] = x[4:]
        W.setdefault((s, a, w), []).append(d)
    return W


def stem_of(segs):
    for d in segs:
        if 'root' in d:
            return d
    for d in segs:
        if 'PREF' not in d['f'] and 'SUFF' not in d['f']:
            return d
    return segs[0]


def category(d):
    """Nature grammaticale du mot (arabe, français)."""
    f = d['f']
    vf = next((x for x in f if x.startswith('VF:')), None)
    n = int(vf[3:]) if vf else 1
    if d['tag'] == 'V':
        pat = VF[n - 1] if n <= len(VF) else ''
        return (f'فعل، باب {pat}', f'verbe, forme {n}' + (f' ({pat})' if pat else ''))
    if 'PN' in f:
        return ('اسم علم', 'nom propre')
    if 'ACT_PCPL' in f:
        return ('اسم فاعل', 'participe actif')
    if 'PASS_PCPL' in f:
        return ('اسم مفعول', 'participe passif')
    if 'VN' in f:
        return ('مصدر', 'nom verbal (maṣdar)')
    if 'ADJ' in f:
        return ('صفة', 'adjectif')
    if 'T' in f:
        return ('ظرف زمان', 'complément de temps')
    if 'LOC' in f:
        return ('ظرف مكان', 'complément de lieu')
    return ('اسم', 'nom')


def fw_key(d):
    lem = d.get('lem')
    if lem:
        return unicodedata.normalize('NFC', lem)
    if 'INL' in d['f']:
        return 'ضمير '
    per = [x for x in d['f'] if x[:1] in '123' and len(x) <= 3]
    return 'ضمير ' + (per[0] if per else '?')


def load_defs():
    roots = {}
    for f in sorted(glob.glob(os.path.join(HERE, 'dict', 'roots_*.txt'))):
        for l in open(f, encoding='utf-8'):
            l = l.strip()
            if l and not l.startswith('#'):
                r, ar, fr = l.split('|')
                roots[r] = (ar, fr)
    fw = {}
    for l in open(os.path.join(HERE, 'dict', 'particles.txt'), encoding='utf-8'):
        l = l.rstrip('\n')
        if l.strip() and not l.startswith('#'):
            k, ar, fr = l.split('|')
            fw[unicodedata.normalize('NFC', k)] = (ar, fr)
    return roots, fw


def align(W):
    """(sourate, verset, mot) du corpus → index du mot dans le texte affiché (signes de pause compris)."""
    words = collections.defaultdict(list)
    for (s, a, w), segs in W.items():
        words[(s, a)].append((w, norm(''.join(d['form'] for d in segs))))
    pos = {}
    mism = 0
    for (s, a), t in V.items():
        toks = t.split(' ')
        idx = [i for i, x in enumerate(toks) if x and not SIGN.match(x)]
        qw = sorted(words[(s, a)])
        if len(idx) == len(qw):
            for (w, _), i in zip(qw, idx):
                pos[(s, a, w)] = i
            continue
        mism += 1
        ours = [norm(toks[i]) for i in idx]
        theirs = [x for _, x in qw]
        sm = difflib.SequenceMatcher(a=theirs, b=ours, autojunk=False)
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            for k in range(i2 - i1):
                j = j1 + min(k, max(0, j2 - j1 - 1))
                if j < len(idx):
                    pos[(s, a, qw[i1 + k][0])] = idx[j]
    return pos, mism


B36 = '0123456789abcdefghijklmnopqrstuvwxyz'


def enc(gi, tok):
    n = gi * 256 + tok
    out = ''
    for _ in range(4):
        out = B36[n % 36] + out
        n //= 36
    return out


def build():
    W = load_morphology()
    rdefs, fdefs = load_defs()
    pos, mism = align(W)
    order = sorted(V.keys())
    gindex = {k: i for i, k in enumerate(order)}
    lem = {}        # (root, lemma) → données
    fw = {}         # mot-outil → données
    for (s, a, w), segs in W.items():
        tok = pos.get((s, a, w))
        if tok is None:
            continue
        surf = V[(s, a)].split(' ')[tok]
        st = stem_of(segs)
        ref = enc(gindex[(s, a)], tok)
        if 'root' in st:
            k = (st['root'], st.get('lem', ''))
            e = lem.setdefault(k, {'n': 0, 'cat': collections.Counter(), 'forms': collections.Counter(), 'refs': []})
            e['n'] += 1
            e['cat'][category(st)] += 1
            e['forms'][surf] += 1
            e['refs'].append(ref)
        for d in segs:
            if 'root' in d:
                continue
            if d is st and 'root' not in st and not any(t in d['f'] for t in FW_TAGS) and d['tag'] != 'N':
                continue
            k = fw_key(d)
            if k not in fdefs:
                continue
            e = fw.setdefault(k, {'n': 0, 'refs': [], 'pn': False})
            e['n'] += 1
            e['pn'] = e['pn'] or 'PN' in d['f']
            if not e['refs'] or e['refs'][-1] != ref:
                e['refs'].append(ref)
    roots = sorted({r for r, _ in lem}, key=root_key)
    missing = [r for r in roots if r not in rdefs]
    assert not missing, f'racines sans définition : {missing[:20]}'
    rid = {r: i for i, r in enumerate(roots)}
    L = []
    by_root = collections.defaultdict(list)
    for (r, l), e in sorted(lem.items(), key=lambda kv: (rid[kv[0][0]], -kv[1]['n'])):
        cat = e['cat'].most_common(1)[0][0]
        by_root[r].append(len(L))
        L.append([l, rid[r], cat[0], cat[1], e['n'], [[f, c] for f, c in e['forms'].most_common(12)], ''.join(e['refs'])])
    R = [[r, rdefs[r][0], rdefs[r][1], sum(L[i][4] for i in by_root[r]), by_root[r]] for r in roots]
    F = [[k, fdefs[k][0], fdefs[k][1], e['n'], ''.join(e['refs']), int(e['pn'])]
         for k, e in sorted(fw.items(), key=lambda kv: -kv[1]['n'])]
    unused = [k for k in fdefs if k not in fw]
    stats = dict(words=len(W), aligned=len(pos), mismatch=mism, roots=len(R), lemmas=len(L), fw=len(F), unused_fw=unused)
    return dict(roots=R, lemmas=L, fw=F, stats=dict(words=len(W), roots=len(R), lemmas=len(L), fw=len(F))), stats


if __name__ == '__main__':
    d, st = build()
    print(st)
    print(d['roots'][0][:4], d['lemmas'][0][:6])
    print(len(json.dumps(d, ensure_ascii=False, separators=(',', ':'))) // 1024, 'Ko')

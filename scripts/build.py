"""Construit l'application à partir des données vérifiées.

Sorties :
  web/dist/index.html + web/dist/quran.json   → version en ligne et contenu de l'application Android
  web/standalone/coran-tadabbur.html          → fichier unique hors ligne (iPhone, partage)
"""
import base64, json, os, re, sys, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'data'))

from q import V, D, N, norm                      # noqa: E402
from verify import rng                            # noqa: E402
from data_tree4 import TREE                       # noqa: E402
from data_people import P                         # noqa: E402
from data_qa import QA                            # noqa: E402
from data_lex import LEX                          # noqa: E402
from data_family import KIND, KINDS, LINEAGES, LINEAGE_INTRO          # noqa: E402
from data_tadabbur import METHOD, OBSTACLE, CALLS, APPLY, TQ, TQ_ROOT  # noqa: E402
import data_tajwid as TJ                          # noqa: E402
import data_genealogy as GEN                      # noqa: E402
import data_audio as AUD                          # noqa: E402

VERSES = sorted(V.items())


def snippet(text, s, e, before=3, after=4):
    """Fenêtre de quelques mots autour d'une correspondance, avec ses positions recalculées."""
    starts = [0] + [m.end() for m in re.finditer(' ', text)]
    wi = max(i for i, st in enumerate(starts) if st <= s)
    a = starts[max(0, wi - before)]
    ends = [m.start() for m in re.finditer(' ', text)] + [len(text)]
    we = min(i for i, en in enumerate(ends) if en >= e)
    b = ends[min(len(ends) - 1, we + after)]
    pre = '… ' if a > 0 else ''
    post = ' …' if b < len(text) else ''
    return pre + text[a:b] + post, s - a + len(pre), e - a + len(pre)


def matches(rx):
    out = []
    r = re.compile(rx)
    for (s, a), t in VERSES:
        for m in r.finditer(t):
            st = m.start()
            while st < m.end() and t[st] == ' ':
                st += 1
            out.append((f'{s}:{a}', t, st, m.end()))
    return out


def pick(ms, n=3):
    if not ms:
        return []
    idx = sorted({0, len(ms) // 3, (2 * len(ms)) // 3})[:n]
    res = []
    for i in idx:
        ref, t, s, e = ms[i]
        sn, ss, ee = snippet(t, s, e)
        res.append([ref, sn, ss, ee])
    return res


def tajwid():
    rules = []
    for (rid, grp, color, fr, ar, dfr, dar, hfr, har, rx, colored) in TJ.RULES:
        ms = matches(rx)
        assert ms, f'règle sans occurrence : {rid}'
        rules.append(dict(id=rid, group=grp, color=color if colored else None, fr=fr, ar=ar, dfr=dfr, dar=dar,
                          hfr=hfr, har=har, rx=rx, count=len(ms), ex=pick(ms)))
    special = []
    for (sid, fr, ar, dfr, dar, rx) in TJ.SPECIAL:
        ms = matches(rx)
        assert ms, f'cas sans occurrence : {sid}'
        refs = sorted({m[0] for m in ms}, key=lambda r: tuple(map(int, r.split(':'))))
        special.append(dict(id=sid, fr=fr, ar=ar, dfr=dfr, dar=dar, count=len(ms), refs=refs, ex=pick(ms, 2)))
    waqf = []
    for ch, label, fr, ar, dfr in TJ.WAQF:
        ms = matches(re.escape(ch))
        
        waqf.append(dict(label=label, fr=fr, ar=ar, dfr=dfr, count=len(ms), ex=pick(ms, 1)))
    for r, k, *_ in TJ.ADAB:
        assert norm(k) in ' '.join(N[x] for x in rng(r)), r
    demo_ref = (2, 10)
    signs = [
        ('ـۡ', "Sukūn : lettre au repos", 'سكون'), ('ـّ', 'Shadda : lettre doublée', 'شدّة'),
        ('ـْ', 'Petit cercle : lettre jamais prononcée', 'صفر مستدير: لا يُنطق'),
        ('ـ۠', "Zéro allongé : prononcée seulement à l'arrêt", 'صفر مستطيل: يُنطق وقفًا'),
        ('ـً ـٌ ـٍ', 'Tanwīn superposé : prononciation claire', 'تنوين متراكب: إظهار'),
        ('ـٗ ـٞ ـٖ', 'Tanwīn décalé : fusion ou dissimulation', 'تنوين متتابع: إدغام أو إخفاء'),
        ('ـۢ ـۭ', 'Petit mīm : le nūn devient mīm (iqlāb)', 'ميم صغيرة: إقلاب'),
        ('ـٓ', 'Madda : prolonger plus de 2 temps', 'مدّة: مدّ زائد'),
        ('ـٰ', 'Petit alif : voyelle longue de 2 temps', 'ألف خنجرية: مدّ طبيعي'),
        ('ـۥ ـۦ', 'Petit wāw / yāʾ : prolongation du pronom', 'واو وياء صغيرتان: مدّ الصلة'),
        ('ٱ', 'Alif de liaison : muet en continuité', 'همزة وصل'),
        ('ۘ ۗ ۚ ۖ ۛ', 'Signes de pause (voir « Pauses »)', 'علامات الوقف'),
        ('۩', 'Prosternation de récitation', 'سجدة التلاوة'), ('۞', 'Quart de ḥizb', 'ربع الحزب'),
    ]
    legend = [('ghunna', 'Ghunna / fusion nasale', 'غنّة'), ('ikhfa', 'Ikhfāʾ', 'إخفاء'), ('iqlab', 'Iqlāb', 'إقلاب'),
              ('qalqala', 'Qalqala', 'قلقلة'), ('madd2', 'Madd 2-5 (séparé)', 'مدّ منفصل'), ('madd4', 'Madd 4-5 (lié)', 'مدّ متصل'),
              ('madd6', 'Madd 6 (nécessaire)', 'مدّ لازم'), ('silent', 'Non prononcé', 'لا يُنطق')]
    secdesc = {
        'signes': ["Ce que signifie chaque petit signe du muṣḥaf.", 'معاني علامات الضبط في المصحف.'],
        'nun': ['Les 4 règles du nūn au repos et du tanwīn.', 'أحكام النون الساكنة والتنوين الأربعة.'],
        'mim': ['Les 3 règles du mīm au repos.', 'أحكام الميم الساكنة الثلاثة.'],
        'son': ['La nasalisation et le rebond sonore.', 'الغنّة والقلقلة.'],
        'lam': ["Quand le lām de l'article se prononce ou non.", 'اللام القمرية والشمسية.'],
        'madd': ['Combien de temps prolonger une voyelle.', 'مقادير المدود.'],
        'muet': ['Ce qui est écrit mais ne se prononce pas.', 'ما يُكتب ولا يُنطق.'],
        'waqf': ["Où s'arrêter, où continuer, et comment s'arrêter.", 'علامات الوقف وكيفيته.'],
        'cas': ['Saktah, imāla, ishmām, prosternations.', 'السكت والإمالة والإشمام والسجدات.'],
        'makharij': ["D'où sort chaque lettre, et les lettres emphatiques.", 'مخارج الحروف والتفخيم.'],
        'adab': ['Ce que le texte dit lui-même de sa récitation.', 'ما يقوله النص عن تلاوته.'],
        'qiraat': ['Les lectures les plus pratiquées, à écouter et comparer.', 'القراءات الأكثر انتشارًا للاستماع والمقارنة.'],
    }
    stoprules = [
        ["À l'arrêt, la dernière voyelle devient un sukūn.", 'يُسكَّن الحرف الأخير عند الوقف.'],
        ['Un tanwīn en fatḥa (ـًا) se prononce « ā ».', 'التنوين المنصوب يُبدل ألفًا.'],
        ['Le tāʾ marbūṭa (ة) se prononce « h ».', 'التاء المربوطة تُقرأ هاءً.'],
        ["La prolongation devant la dernière lettre peut aller à 2, 4 ou 6 temps (madd ʿāriḍ).", 'المدّ العارض للسكون: حركتان أو أربع أو ست.'],
        ["Reprendre la lecture à un endroit où le sens est complet.", 'الابتداء بما يستقيم به المعنى.'],
    ]
    return dict(rules=rules, special=special, waqf=waqf, makharij=TJ.MAKHARIJ, tafkhim=TJ.TAFKHIM,
                adab=[list(a) for a in TJ.ADAB], signs=signs, legend=legend, secdesc=secdesc, stoprules=stoprules,
                demo=[f'{demo_ref[0]}:{demo_ref[1]}', V[demo_ref]])


def genealogy():
    ids = {n[0] for n in GEN.NODES}
    for e in GEN.EDGES:
        assert e[0] in ids and e[1] in ids, e
        assert norm(e[6]) in ' '.join(N[x] for x in rng(e[5])), e
    for n in GEN.NODES:
        if n[6]:
            assert norm(n[7]) in ' '.join(N[x] for x in rng(n[6])), n
    return dict(note=list(GEN.GENEALOGY_NOTE),
                nodes=[dict(id=n[0], fr=n[1], ar=n[2], kind=n[3], col=n[4], row=n[5], ref=n[6], kw=n[7]) for n in GEN.NODES],
                edges=[dict(**{'from': e[0]}, to=e[1], type=e[2], fr=e[3], ar=e[4], ref=e[5], kw=e[6]) for e in GEN.EDGES])


def sura_weights():
    """Part de chaque sourate dans la longueur du texte (sert à estimer la taille des téléchargements)."""
    L = {}
    for (s, a), t in VERSES:
        L[s] = L.get(s, 0) + len(N[(s, a)])
    tot = sum(L.values())
    return [round(L[s] / tot, 6) for s in range(1, 115)]


def collect_refs():
    refs = []
    for t in TREE:
        refs += [r[0] for r in t['refs']]
    for p in P:
        refs.append(p['god'][2])
        refs += [r[3] for r in p['rel']]
    for q in QA:
        refs += [r for r, _ in q['refs']]
    refs += [l[5] for l in LEX]
    refs.append(LINEAGE_INTRO[0])
    for _, _, st in LINEAGES:
        refs += [s[3] for s in st if s[3]]
    for m in METHOD:
        refs += [r for r, _ in m[5]]
    refs += [o[0] for o in OBSTACLE]
    refs += [a[0] for a in TJ.ADAB]
    refs += [n[6] for n in GEN.NODES if n[6]] + [e[5] for e in GEN.EDGES]
    return {k for r in refs for k in rng(r)}


def main():
    cited = collect_refs()
    pkg = json.load(open(os.path.join(ROOT, 'package.json')))
    data = dict(
        version=pkg['version'] + ' · ' + datetime.date.today().isoformat(),
        tree=[dict(id=t['id'], p=t['parent'], fr=t['fr'], ar=t['ar'], sfr=t['sfr'], sar=t['sar'], refs=[list(r) for r in t['refs']]) for t in TREE],
        people=[dict(id=p['id'], fr=p['fr'], ar=p['ar'], cat=p['cat'], topic=p['topic'], god=list(p['god']),
                     rel=[list(r) + [KIND[(p['id'], r[0])]] for r in p['rel']]) for p in P],
        qa=QA, lex=[list(l) for l in LEX], kinds=KINDS, lineages=[[a, b, [list(s) for s in st]] for a, b, st in LINEAGES],
        lintro=list(LINEAGE_INTRO), method=[list(m) for m in METHOD], obstacle=[list(o) for o in OBSTACLE],
        apply=APPLY, tq=TQ, tqr=TQ_ROOT,
        calls=[[c[0], c[1], c[2], c[3], c[4], [f'{a}:{b}' for (a, b), v in sorted(N.items()) if re.search(c[5], v)]] for c in CALLS],
        tj=tajwid(),
        gen=genealogy(),
        audio=dict(intro=list(AUD.QIRAAT_INTRO),
                   reciters=[dict(id=r[0], riw=r[1], fr=r[2], ar=r[3], style=r[4], dir=r[5], learn=r[6], note=r[7],
                                  kbps=int(re.search(r'(\d+)kbps', r[5]).group(1)) if 'kbps' in r[5] else 128) for r in AUD.RECITERS],
                   weights=sura_weights(), hours=dict(murattal=24, muallim=44, mujawwad=40),
                   riwayat=[dict(id=w[0], fr=w[1], ar=w[2], city=w[3], dfr=w[4], dar=w[5], traits=w[6]) for w in AUD.RIWAYAT]),
        verses={f'{s}:{a}': V[(s, a)] for s, a in sorted(cited)},
        suras=[[c['id'], c['name'], c['transliteration'], c['type'], c['total_verses']] for c in D],
    )
    js = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    src = os.path.join(ROOT, 'web', 'src')
    icon = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(src, 'icon.png'), 'rb').read()).decode()
    font = 'data:font/woff2;base64,' + base64.b64encode(open(os.path.join(src, 'amiri-quran-arabic-400-normal.woff2'), 'rb').read()).decode()
    css = open(os.path.join(src, 'app.css')).read().replace('/*QFONT*/', font)
    app = '\n'.join(open(os.path.join(src, f)).read() for f in ('app.js', 'audio.js', 'offline.js', 'genealogy.js')) + '\nstart();\n'
    shell = open(os.path.join(src, 'index.html')).read()
    page = shell.replace('/*ICON*/', icon).replace('/*CSS*/', css).replace('/*DATA*/null', js).replace('/*JS*/', app)
    full = [[c['id'], v['id'], v['text']] for c in D for v in c['verses']]
    fulljs = json.dumps(full, ensure_ascii=False, separators=(',', ':'))
    dist = os.path.join(ROOT, 'web', 'dist')
    os.makedirs(dist, exist_ok=True)
    open(os.path.join(dist, 'index.html'), 'w').write(page.replace('<!--QFULL-->', ''))
    open(os.path.join(dist, 'quran.json'), 'w').write(fulljs)
    sa = os.path.join(ROOT, 'web', 'standalone')
    os.makedirs(sa, exist_ok=True)
    open(os.path.join(sa, 'coran-tadabbur.html'), 'w').write(page.replace('<!--QFULL-->', '<script>window.QFULL=' + fulljs + ';</script>'))
    n = sum(len(t['refs']) for t in TREE)
    print(f"{len(TREE)} nœuds, {n} passages, {len(cited)} versets cités, {len(data['tj']['rules'])} règles de lecture")
    print(f"index.html {os.path.getsize(os.path.join(dist, 'index.html')) // 1024} Ko · standalone {os.path.getsize(os.path.join(sa, 'coran-tadabbur.html')) // 1024} Ko")


if __name__ == '__main__':
    main()

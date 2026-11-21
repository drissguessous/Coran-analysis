from q import N,norm
from verify import rng
from data_qa import QA
from data_lex import LEX
from data_family import KIND,LINEAGES,LINEAGE_INTRO
from data_people import P
from data_tree4 import TREE
ids={p['id'] for p in P}; tids={t['id'] for t in TREE}
bad=0
def chk(w,ref,kw):
    global bad
    ks=rng(ref)
    if any(k not in N for k in ks): print('MISSING',w,ref);bad+=1;return
    if norm(kw) not in ' '.join(N[k] for k in ks): print('KW',w,ref,kw,'|',' '.join(N[k] for k in ks)[:170]);bad+=1
for q in QA:
    if q['topic'] not in tids: print('TOPIC',q['id'])
    for r,k in q['refs']: chk(q['id'],r,k)
for l in LEX: chk(l[1],l[5],l[6])
for p in P:
    for r in p['rel']:
        if (p['id'],r[0]) not in KIND: print('NOKIND',p['id'],r[0])
chk('intro',LINEAGE_INTRO[0],LINEAGE_INTRO[1])
for name,_,steps in LINEAGES:
    for s in steps:
        if s[0] not in ids: print('ID',s[0])
        if s[3]: chk(s[0],s[3],s[4])
print(len(QA),'QA',len(LEX),'lex',bad,'bad')
from data_tadabbur import METHOD,OBSTACLE,TQ,TQ_ROOT
for m in METHOD:
    for r,k in m[5]: chk(m[0],r,k)
for r,k,_,_ in OBSTACLE: chk('obs',r,k)
sub=[t['id'] for t in TREE if t['parent']]
print('missing TQ',[s for s in sub if s not in TQ],'extra',[s for s in TQ if s not in tids])
print('bad total',bad)

from q import N,norm
from verify import rng
from data_people import P
from data_tree4 import TREE
ids={p['id'] for p in P}; tids={t['id'] for t in TREE}
bad=0
def chk(where,ref,kw):
    global bad
    ks=rng(ref)
    if any(k not in N for k in ks): print('MISSING',where,ref);bad+=1;return
    if norm(kw) not in ' '.join(N[k] for k in ks): print('KW',where,ref,kw,'|',' '.join(N[k] for k in ks)[:150]);bad+=1
for p in P:
    if p['topic'] not in tids: print('TOPIC',p['id'],p['topic'])
    chk(p['id'],p['god'][2],p['god'][3])
    for r in p['rel']:
        if r[0] not in ids: print('TARGET',p['id'],r[0])
        chk(p['id']+'>'+r[0],r[3],r[4])
print(len(P),'persons',bad,'bad')

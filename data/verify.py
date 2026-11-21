import sys,importlib
from q import N,V,norm
def rng(ref):
    s,a=ref.split(':'); s=int(s)
    if '-' in a: x,y=map(int,a.split('-'))
    else: x=y=int(a)
    return [(s,i) for i in range(x,y+1)]
def check(tree):
    bad=0;n=0
    for t in tree:
        for r in t['refs']:
            n+=1
            ks=rng(r[0])
            if any(k not in N for k in ks): print('MISSING',t['id'],r[0]); bad+=1; continue
            txt=' '.join(N[k] for k in ks)
            if norm(r[3]) not in txt: print('KW',t['id'],r[0],r[3],'|',txt[:160]); bad+=1
    print(n,'refs',bad,'bad')
if __name__=='__main__':
    for m in sys.argv[1:]:
        check(importlib.import_module(m).TREE)

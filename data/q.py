import json,re,sys,os
D=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','node_modules','quran-json','dist','quran.json')))
V={(c['id'],v['id']):v['text'] for c in D for v in c['verses']}
NAMES={c['id']:c['name'] for c in D}
def norm(t):
    t=re.sub('[ً-ٰٟۖ-ۭـ]','',t)
    t=t.replace('ٱ','ا').replace('أ','ا').replace('إ','ا').replace('آ','ا').replace('ى','ي').replace('ئ','ي').replace('ؤ','و').replace('ة','ه').replace('ۦ','').replace('ء','')
    return t
N={k:norm(v) for k,v in V.items()}
def find(p,limit=60):
    r=[k for k,v in N.items() if re.search(p,v)]
    return r
if __name__=='__main__':
    p=sys.argv[1]; r=find(p); print(len(r))
    for k in r[:int(sys.argv[2]) if len(sys.argv)>2 else 15]: print(k,N[k][:140])

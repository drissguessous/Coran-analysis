"""Contrôle de toutes les références : chaque mot-clé arabe doit se trouver dans le verset cité."""
import os, subprocess, sys
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
ok = True
for cmd in (['verify.py', 'data_tree4'], ['verify_p.py'], ['verify2.py']):
    r = subprocess.run([sys.executable] + cmd, cwd=D, capture_output=True, text=True)
    print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr)
    if r.returncode or ' bad' in r.stdout and not r.stdout.strip().endswith('0') and '0 bad' not in r.stdout.splitlines()[-1]:
        ok = False
sys.exit(0 if ok else 1)

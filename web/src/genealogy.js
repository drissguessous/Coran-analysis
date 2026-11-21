/* ───────────────────────── Arbre généalogique (SVG) */
const GEN = DATA.gen;
const GN = Object.fromEntries(GEN.nodes.map(n => [n.id, n]));
const GUX = 128, GUY = 104, GW = 116, GH = 50, GOX = 0.6;
let GZ = S.get('genzoom', 0.8), GFOCUS = null;
const gx = n => (n.col + GOX) * GUX + 20, gy = n => n.row * GUY + 24;
const GSTYLE = {
  parent: 'stroke:var(--gold);stroke-width:2.4',
  desc: 'stroke:var(--gold);stroke-width:2;stroke-dasharray:7 6;opacity:.85',
  spouse: 'stroke:var(--tE);stroke-width:2',
  sibling: 'stroke:var(--muted);stroke-width:2;stroke-dasharray:2 5',
  ally: 'stroke:var(--lapis);stroke-width:2;stroke-dasharray:2 5',
  tribe: 'stroke:var(--muted);stroke-width:1.8;stroke-dasharray:6 5',
};
const GKIND = {
  prophet: 'fill:var(--panel);stroke:var(--gold);stroke-width:2.2',
  woman: 'fill:var(--panel);stroke:var(--tX);stroke-width:2',
  person: 'fill:var(--panel);stroke:var(--line);stroke-width:1.6',
  group: 'fill:var(--soft);stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4',
};
function genSVG() {
  const maxc = Math.max(...GEN.nodes.map(n => n.col)), maxr = Math.max(...GEN.nodes.map(n => n.row));
  const W = (maxc + GOX + 1) * GUX + 20, H = (maxr + 1) * GUY + 30;
  let edges = '', hits = '';
  GEN.edges.forEach((e, i) => {
    const a = GN[e.from], b = GN[e.to];
    const ax = gx(a), ay = gy(a), bx = gx(b), by = gy(b);
    let d;
    if (a.row === b.row) { const s = Math.sign(bx - ax); d = `M${ax + s * GW / 2} ${ay} L${bx - s * GW / 2} ${by}`; }
    else if (b.row < a.row) { d = `M${ax} ${ay - GH / 2} C${ax} ${(ay + by) / 2} ${bx} ${(ay + by) / 2} ${bx} ${by + GH / 2}`; }
    else { d = `M${ax} ${ay + GH / 2} C${ax} ${(ay + by) / 2} ${bx} ${(ay + by) / 2} ${bx} ${by - GH / 2}`; }
    edges += `<path d="${d}" fill="none" style="${GSTYLE[e.type]}"/>`;
    hits += `<path d="${d}" fill="none" stroke="transparent" stroke-width="18" data-gedge="${i}" style="cursor:pointer"><title>${esc(L([e.fr, e.ar]))}</title></path>`;
  });
  const nodes = GEN.nodes.map(n => {
    const x = gx(n) - GW / 2, y = gy(n) - GH / 2; const main = LANG === 'ar' ? n.ar : n.fr; const sub = LANG === 'fr' ? '' : (LANG === 'ar' ? '' : n.ar);
    return `<g data-gnode="${n.id}" style="cursor:pointer" id="gn-${n.id}"><rect x="${x}" y="${y}" width="${GW}" height="${GH}" rx="12" style="${GKIND[n.kind]}"/>
      ${n.kind === 'prophet' ? `<circle cx="${x + 11}" cy="${y + 11}" r="3.5" fill="var(--gold)"/>` : ''}
      <text x="${gx(n)}" y="${gy(n) + (sub ? -3 : 5)}" text-anchor="middle" style="font:${LANG === 'ar' ? '600 15px var(--f-ar)' : '700 13px var(--f-ui)'};fill:var(--ink)">${esc(main.length > 17 ? main.slice(0, 16) + '…' : main)}</text>
      ${sub ? `<text x="${gx(n)}" y="${gy(n) + 15}" text-anchor="middle" style="font:400 13px var(--f-ar);fill:var(--muted)">${esc(sub)}</text>` : ''}</g>`;
  }).join('');
  return { W, H, svg: `<svg viewBox="0 0 ${W} ${H}" width="${W * GZ}" height="${H * GZ}" role="img" aria-label="${esc(L(['Arbre généalogique', 'شجرة الأنساب']))}">${edges}${hits}${nodes}</svg>` };
}
function viewGenealogy() {
  const { svg } = genSVG();
  const focus = [['adam', 'Adam', 'آدم'], ['nuh', 'Nūḥ', 'نوح'], ['ibrahim', 'Ibrāhīm', 'إبراهيم'], ['yaqub', 'Yaʿqūb', 'يعقوب'], ['musa', 'Mūsā', 'موسى'], ['dawud', 'Dāwūd', 'داود'], ['isa', 'ʿĪsā', 'عيسى'], ['muhammad', 'Muḥammad', 'محمد'], ['hud', 'Hūd · Ṣāliḥ · Shuʿayb', 'هود · صالح · شعيب']];
  const legend = [['parent', ['Filiation explicite', 'نسب صريح']], ['desc', ['Descendance (ذرية) ou appartenance', 'ذرية أو انتماء']], ['spouse', ['Conjoint', 'زوج']], ['sibling', ['Frère, sœur', 'أخ، أخت']], ['ally', ['Foi, tutelle, adoption', 'إيمان، كفالة، تبنٍّ']], ['tribe', ['« Leur frère » (issu de son peuple)', '«أخاهم»']]];
  const html = `<p class="lead">${esc(L(GEN.note))}</p>
   <div class="chips">${focus.map(([id, fr, ar]) => `<button class="chip" data-gfocus="${id}">${esc(L([fr, ar]))}</button>`).join('')}</div>
   <div class="genbar"><button class="btn" id="gz-" aria-label="Dézoomer">${ico('minus', 'sm')}</button><button class="btn" id="gz+" aria-label="Zoomer">${ico('plus', 'sm')}</button><span class="n">${esc(L(['Touchez un nom pour sa fiche, un trait pour son verset.', 'المس اسمًا لصفحته أو خطًّا لآيته.']))}</span><a class="btn" href="#lignees-liste" style="margin-inline-start:auto">${ico('text', 'sm')}${esc(L(['Liste', 'قائمة']))}</a></div>
   <div class="gen" id="gen" dir="ltr">${svg}</div>
   <div class="genlegend">${legend.map(([k, l]) => `<span><svg width="34" height="10" aria-hidden="true"><line x1="2" y1="5" x2="32" y2="5" style="${GSTYLE[k]}"/></svg>${esc(L(l))}</span>`).join('')}<span><svg width="16" height="16" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="3" style="${GKIND.prophet}"/></svg>${esc(L(['Prophète', 'نبي']))}</span><span><svg width="16" height="16" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="3" style="${GKIND.woman}"/></svg>${esc(L(['Femme', 'امرأة']))}</span><span><svg width="16" height="16" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="3" style="${GKIND.group}"/></svg>${esc(L(['Groupe, peuple', 'جماعة، قوم']))}</span></div>`;
  return { title: esc(L(['Arbre généalogique', 'شجرة الأنساب'])), html, after() {
    const box = document.getElementById('gen');
    const center = id => { const n = GN[id]; if (!n) return; box.scrollTo({ left: gx(n) * GZ - box.clientWidth / 2, top: gy(n) * GZ - box.clientHeight / 2.6, behavior: 'smooth' });
      const g = document.getElementById('gn-' + id); if (g) { g.querySelector('rect').style.filter = 'drop-shadow(0 0 6px var(--gold))'; setTimeout(() => g && (g.querySelector('rect').style.filter = ''), 1600); } };
    const zoom = z => { const cx = (box.scrollLeft + box.clientWidth / 2) / GZ, cy = (box.scrollTop + box.clientHeight / 2) / GZ; GZ = Math.max(0.4, Math.min(1.6, z)); S.set('genzoom', GZ); const s = box.querySelector('svg'); const vb = s.viewBox.baseVal; s.setAttribute('width', vb.width * GZ); s.setAttribute('height', vb.height * GZ); box.scrollLeft = cx * GZ - box.clientWidth / 2; box.scrollTop = cy * GZ - box.clientHeight / 2; };
    document.getElementById('gz-').onclick = () => zoom(GZ - 0.2);
    document.getElementById('gz+').onclick = () => zoom(GZ + 0.2);
    M().querySelectorAll('[data-gfocus]').forEach(b => b.onclick = () => center(b.dataset.gfocus));
    box.addEventListener('click', ev => {
      const n = ev.target.closest('[data-gnode]'), e = ev.target.closest('[data-gedge]');
      if (n) { const id = n.dataset.gnode, node = GN[id]; if (P[id]) go('p-' + id); else openSheet(esc(L([node.fr, node.ar])), vcard({ ref: node.ref, kw: node.kw, sm: true })); return; }
      if (e) { const ed = GEN.edges[+e.dataset.gedge]; openSheet(esc(L([ed.fr, ed.ar])), `<p class="n">${esc(L([GN[ed.from].fr, GN[ed.from].ar]))} → ${esc(L([GN[ed.to].fr, GN[ed.to].ar]))}</p>${vcard({ ref: ed.ref, kw: ed.kw, sm: true })}`); }
    });
    setTimeout(() => center(GFOCUS || 'ibrahim'), 60); GFOCUS = null;
  } };
}

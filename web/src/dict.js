/* ───────────────────────── Dictionnaire : tous les mots du Coran, par racine
   dict.json : roots [racine, sens ar, sens fr, occurrences, [lemmes]]
               lemmas [lemme, racine, nature ar, nature fr, occurrences, [[forme, n]], références]
               fw [mot, sens ar, sens fr, occurrences, références, nom propre]
   Une référence = 4 caractères en base 36 : (index du verset × 256 + rang du mot dans le verset). */
let DICT = null, DREF = null, DFW = null;
let DQ = '', DLET = 'ا', DMODE = 'r';
const DALPHA = [...'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'];
const DFOLD = c => ('أإآءٱ'.includes(c) ? 'ا' : 'ىئ'.includes(c) ? 'ي' : c === 'ؤ' ? 'و' : c);
async function loadDict() {
  if (DICT) return;
  if (window.QDICT) DICT = window.QDICT; else { const r = await fetch('dict.json'); DICT = await r.json(); }
  DICT.roots.forEach(r => { r.k = norm(r[0]); r.l = DFOLD([...r[0]][0]); });
  DICT.lemmas.forEach(l => { l.k = ' ' + norm(l[0]) + ' ' + l[5].map(f => norm(f[0])).join(' ') + ' '; });
  DICT.fw.forEach(f => { f.k = norm(f[0].replace(/^ضمير ?.*/, '')); });
}
function dictIndex() {
  if (DREF) return;
  DREF = new Map(); DFW = new Map();
  DICT.lemmas.forEach((l, i) => { const s = l[6]; for (let j = 0; j < s.length; j += 4) DREF.set(s.substr(j, 4), i); });
  DICT.fw.forEach((f, i) => { const s = f[4]; for (let j = 0; j < s.length; j += 4) { const c = s.substr(j, 4); const a = DFW.get(c); a ? a.push(i) : DFW.set(c, [i]); } });
}
const dcode = (k, tok) => (QI[k] * 256 + tok).toString(36).padStart(4, '0');
const ddec = c => { const n = parseInt(c, 36); return [Math.floor(n / 256), n % 256]; };
const spaced = r => [...r].join(' ');
function dtokHL(text, tok) { return text.split(' ').map((x, i) => i === tok ? `<mark>${esc(x)}</mark>` : esc(x)).join(' '); }
function dhits(refs, from, n) {
  const out = [];
  for (let j = from * 4; j < refs.length && out.length < n; j += 4) {
    const [gi, tok] = ddec(refs.substr(j, 4)); const v = QURAN[gi]; if (!v) continue;
    out.push(`<a class="hit" href="#lire-${v[0]}-${v[1]}"><span class="ref"><b>${v[0]}:${v[1]}</b> · <span class="arsm">${esc(SURA[v[0]][1])}</span></span><div class="qtext sm">${dtokHL(v[2], tok)}</div></a>`);
  }
  return out.join('');
}
/* Liste de versets dépliable, 30 à la fois */
function dverses(id, refs) {
  const n = refs.length / 4;
  return `<button class="btn" data-dv="${id}" aria-expanded="false">${ico('book', 'sm')}${esc(L(['Versets','الآيات']))} (${n})</button><div class="list dvl" id="dv-${id}" hidden data-from="0"></div>`;
}
function bindVerses(getRefs) {
  M().querySelectorAll('[data-dv]').forEach(b => b.onclick = async () => {
    const box = document.getElementById('dv-' + b.dataset.dv); const open = box.hidden;
    box.hidden = !open; b.setAttribute('aria-expanded', open);
    if (open && !box.dataset.done) { await loadQ(); more(box, getRefs(b.dataset.dv)); box.dataset.done = 1; }
  });
  function more(box, refs) {
    const from = +box.dataset.from; box.querySelector('.dmore') && box.querySelector('.dmore').remove();
    box.insertAdjacentHTML('beforeend', dhits(refs, from, 30)); box.dataset.from = from + 30;
    if ((from + 30) * 4 < refs.length) {
      box.insertAdjacentHTML('beforeend', `<button class="btn dmore" style="margin:8px">${esc(L(['Afficher la suite','عرض المزيد']))}</button>`);
      box.querySelector('.dmore').onclick = () => more(box, refs);
    }
  }
}
function rootRow(i) {
  const r = DICT.roots[i];
  return listRow('dict-' + i, `<span class="droot">${esc(spaced(r[0]))}</span>`, LANG === 'ar' ? esc(r[1]) : esc(r[2]) + (LANG === 'both' ? ` <span class="arsm">${esc(r[1])}</span>` : ''), '', `<span class="n">${r[3]}</span>`);
}
function fwRow(i) {
  const f = DICT.fw[i]; const w = f[0].startsWith('ضمير') ? f[1].split(':')[1] || f[0] : f[0];
  return listRow('dictf-' + i, `<span class="droot" style="letter-spacing:0">${esc(w.trim())}</span>`, LANG === 'ar' ? esc(f[1]) : esc(f[2]) + (LANG === 'both' ? ` <span class="arsm">${esc(f[1])}</span>` : ''), '', `<span class="n">${f[3]}</span>`);
}
function dictMatch(raw) {
  const isAr = /[؀-ۿ]/.test(raw);
  if (isAr) {
    const k = norm(raw).replace(/\s+/g, '');
    const rs = new Set();
    DICT.roots.forEach((r, i) => { if (r.k === k || norm(r[1]).includes(k)) rs.add(i); });
    DICT.lemmas.forEach(l => { if (l.k.includes(' ' + k + ' ')) rs.add(l[1]); });
    if (rs.size < 40) DICT.lemmas.forEach(l => { if (l.k.includes(k)) rs.add(l[1]); });
    const fs = DICT.fw.map((f, i) => (f.k && (f.k === k || f.k.includes(k))) || norm(f[1]).includes(k) ? i : -1).filter(i => i >= 0);
    return [[...rs].sort((a, b) => (DICT.roots[a].k === k ? -1 : 0) - (DICT.roots[b].k === k ? -1 : 0) || a - b), fs];
  }
  const q = fold(raw);
  return [DICT.roots.map((r, i) => fold(r[2]).includes(q) ? i : -1).filter(i => i >= 0), DICT.fw.map((f, i) => fold(f[2]).includes(q) ? i : -1).filter(i => i >= 0)];
}
async function viewDict() {
  await loadDict();
  const st = DICT.stats;
  const html = `<p class="lead">${esc(L([`Chaque mot du Coran est rattaché à sa racine : ${st.words.toLocaleString('fr')} mots, ${st.roots.toLocaleString('fr')} racines, ${st.lemmas.toLocaleString('fr')} mots de base. Le sens est donné d'après l'arabe, sans tafsīr.`, `كل كلمة في القرآن مردودة إلى جذرها: ${toAr(st.words)} كلمة، ${toAr(st.roots)} جذرًا، ${toAr(st.lemmas)} لفظًا. والمعنى مأخوذ من العربية دون تفسير.`]))}</p>
   <input class="field" id="dq" type="search" placeholder="${esc(L(['Mot arabe, racine ou sens en français','كلمة أو جذر أو معنى']))}" value="${esc(DQ)}" autocomplete="off" aria-label="Rechercher dans le dictionnaire">
   <div class="seg" style="margin:10px 0" role="group">${[['r', ['Racines', 'الجذور']], ['f', ['Mots-outils', 'الأدوات والضمائر']], ['n', ['Noms propres', 'الأعلام']]].map(([k, l]) => `<button data-dm="${k}" aria-pressed="${DMODE === k}">${esc(L(l))}</button>`).join('')}</div>
   <div class="dletters" id="dlet"${DMODE === 'r' ? '' : ' hidden'}>${DALPHA.map(c => `<button data-dlet="${c}" aria-pressed="${DLET === c}">${c}</button>`).join('')}</div>
   <div class="list" id="dres"></div>`;
  return { title: esc(L(['Dictionnaire','القاموس'])), html, after() {
    const out = document.getElementById('dres');
    const draw = () => {
      const raw = DQ.trim();
      if (raw.length >= 2) {
        const [rs, fs] = dictMatch(raw);
        out.innerHTML = (rs.length ? `<div class="sec" style="padding:8px 12px">${B(['Racines', 'الجذور'])} <span class="n">${rs.length}</span></div>` + rs.slice(0, 80).map(rootRow).join('') : '')
          + (fs.length ? `<div class="sec" style="padding:8px 12px">${B(['Mots-outils et noms propres', 'الأدوات والأعلام'])} <span class="n">${fs.length}</span></div>` + fs.slice(0, 40).map(fwRow).join('') : '')
          || `<p class="empty">${esc(L(['Aucun mot trouvé.', 'لا نتائج.']))}</p>`;
        return;
      }
      if (DMODE === 'r') out.innerHTML = DICT.roots.map((r, i) => r.l === DLET ? rootRow(i) : '').join('');
      else out.innerHTML = DICT.fw.map((f, i) => (f[5] ? 'n' : 'f') === DMODE ? fwRow(i) : '').join('');
    };
    draw();
    let tm; document.getElementById('dq').oninput = e => { DQ = e.target.value; clearTimeout(tm); tm = setTimeout(draw, 180); };
    M().querySelectorAll('[data-dm]').forEach(b => b.onclick = () => { DMODE = b.dataset.dm; DQ = ''; document.getElementById('dq').value = ''; M().querySelectorAll('[data-dm]').forEach(x => x.setAttribute('aria-pressed', x === b)); document.getElementById('dlet').hidden = DMODE !== 'r'; draw(); });
    M().querySelectorAll('[data-dlet]').forEach(b => b.onclick = () => { DLET = b.dataset.dlet; DQ = ''; document.getElementById('dq').value = ''; M().querySelectorAll('[data-dlet]').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); });
  } };
}
async function viewDictRoot(i) {
  await loadDict();
  const r = DICT.roots[i]; if (!r) return viewDict();
  const lem = r[4].map(j => DICT.lemmas[j]);
  let h = `<a class="crumb" href="#dictionnaire">${B(['Dictionnaire', 'القاموس'])}</a>
   <div class="card dhead"><div class="droot big">${esc(spaced(r[0]))}</div>
   ${LANG !== 'fr' ? `<p class="arb" style="color:var(--ink);margin:6px 0 0">${esc(r[1])}</p>` : ''}${LANG !== 'ar' ? `<p style="margin:6px 0 0">${esc(r[2])}</p>` : ''}
   <p class="n" style="margin:8px 0 0">${esc(L([`${r[3]} occurrence(s) · ${lem.length} mot(s) de base`, `${toAr(r[3])} موضعًا · ${toAr(lem.length)} لفظًا`]))}</p></div>
   <div class="sec">${B(['Mots issus de cette racine', 'الألفاظ المشتقة'])}</div><div class="stack">`;
  lem.forEach((l, k) => {
    h += `<div class="card dlem"><div class="row" style="justify-content:space-between;align-items:baseline;gap:10px"><span class="dw">${esc(l[0])}</span><span class="n">${B([l[3], l[2]])} · ${l[4]}</span></div>
     <div class="chips" style="margin:8px 0">${l[5].map(([f, c]) => `<span class="chip"><span class="dform">${esc(f)}</span>${c > 1 ? ` <span class="n">${c}</span>` : ''}</span>`).join('')}</div>
     ${dverses(r[4][k], l[6])}</div>`;
  });
  h += `</div><div class="pager">${i > 0 ? `<a class="btn" href="#dict-${i - 1}" data-replace="1">${ico('prev', 'sm flip')}${esc(spaced(DICT.roots[i - 1][0]))}</a>` : '<span></span>'}${i < DICT.roots.length - 1 ? `<a class="btn" href="#dict-${i + 1}" data-replace="1">${esc(spaced(DICT.roots[i + 1][0]))}${ico('next', 'sm flip')}</a>` : ''}</div>`;
  return { title: `${esc(L(['Racine', 'الجذر']))} <span class="ar">${esc(r[0])}</span>`, html: h, after() { bindVerses(j => DICT.lemmas[+j][6]); } };
}
async function viewDictFw(i) {
  await loadDict();
  const f = DICT.fw[i]; if (!f) return viewDict();
  const h = `<a class="crumb" href="#dictionnaire">${B(['Dictionnaire', 'القاموس'])}</a>
   <div class="card dhead"><div class="droot big" style="letter-spacing:0">${esc(f[0].startsWith('ضمير') ? (f[1].split(':')[1] || f[0]).trim() : f[0])}</div>
   <p class="n" style="margin:4px 0 0">${esc(L(f[5] ? ['Nom propre', 'اسم علم'] : ['Mot-outil', 'أداة أو ضمير']))}</p>
   ${LANG !== 'fr' ? `<p class="arb" style="color:var(--ink);margin:6px 0 0">${esc(f[1])}</p>` : ''}${LANG !== 'ar' ? `<p style="margin:6px 0 0">${esc(f[2])}</p>` : ''}
   <p class="n" style="margin:8px 0 10px">${esc(L([`${f[3]} occurrence(s)`, `${toAr(f[3])} موضعًا`]))}</p>${dverses('f' + i, f[4])}</div>`;
  return { title: esc(L(['Dictionnaire', 'القاموس'])), html: h, after() { bindVerses(() => f[4]); } };
}
/* Fiche d'un mot touché dans le lecteur */
async function wordDictHTML(k, tok) {
  try { await loadDict(); } catch (e) { return ''; }
  dictIndex();
  const c = dcode(k, tok); const li = DREF.get(c); const fs = DFW.get(c) || [];
  let h = '';
  if (li != null) {
    const l = DICT.lemmas[li], r = DICT.roots[l[1]];
    h += `<a class="card dsheet" href="#dict-${l[1]}" style="display:block;text-decoration:none;color:var(--ink)"><div class="row" style="justify-content:space-between;gap:10px"><span class="dw">${esc(l[0])}</span><span class="n">${B([l[3], l[2]])}</span></div>
     <div class="n" style="margin-top:4px">${esc(L(['Racine', 'الجذر']))} <b class="droot" style="font-size:1.15rem">${esc(spaced(r[0]))}</b> · ${r[3]}</div>
     ${LANG !== 'fr' ? `<div class="arb" style="color:var(--ink)">${esc(r[1])}</div>` : ''}${LANG !== 'ar' ? `<div>${esc(r[2])}</div>` : ''}
     <div class="n" style="margin-top:6px;color:var(--gold)">${esc(L(['Ouvrir dans le dictionnaire', 'افتح في القاموس']))} ›</div></a>`;
  }
  fs.forEach(i => { const f = DICT.fw[i]; h += `<a class="card dsheet" href="#dictf-${i}" style="display:block;text-decoration:none;color:var(--ink);margin-top:6px"><b>${esc(f[0].startsWith('ضمير') ? (f[1].split(':')[1] || f[0]).trim() : f[0])}</b> — ${LANG === 'ar' ? esc(f[1]) : esc(f[2])}${LANG === 'both' ? ` <span class="arsm">${esc(f[1])}</span>` : ''}</a>`; });
  return h ? `<div style="margin-bottom:10px">${h}</div>` : '';
}
/* Section du dictionnaire dans la recherche globale */
async function dictSearchHTML(raw) {
  try { await loadDict(); } catch (e) { return ''; }
  const [rs, fs] = dictMatch(raw); const n = rs.length + fs.length; if (!n) return '';
  return `<div class="sec">${B(['Dictionnaire', 'القاموس'])} <span class="n">${n}</span></div><div class="list">${rs.slice(0, 10).map(rootRow).join('')}${fs.slice(0, 4).map(fwRow).join('')}</div>`;
}

'use strict';
/* Arbre des sujets du Coran — application (web, iOS, Android).
   Aucune dépendance : le contenu est dans window.DATA, le texte complet dans quran.json (ou window.QFULL). */
const DATA = window.DATA;

/* ───────────────────────── Constantes */
const TYPES = {D:['Définition','تعريف'],C:['Conseil','توجيه'],E:['Exigence','أمر ونهي'],X:['Explication','بيان'],H:['Histoire','قصة'],B:['Démonstration','برهان']};
const TQS = {D:["Qu'est-ce que c'est ?","ما هو؟"],X:["Comment et pourquoi ?","كيف ولماذا؟"],B:["Quelles preuves ?","ما البرهان؟"],H:["Que s'est-il passé ?","ماذا حدث؟"],E:["Qu'est-ce qui est demandé ?","ما المطلوب؟"],C:["Qu'est-ce qui est conseillé ?","ما الموصى به؟"]};
const ORDER = ['D','X','B','H','E','C'];
const TDESC = {D:["Dit ce qu'une chose est.","يبيّن ماهية الشيء."],C:["Recommande sans obliger.","يوصي دون إلزام."],E:["Ordonne ou interdit.","يأمر أو ينهى."],X:["Donne une cause, une conséquence ou un mécanisme.","يبيّن سببًا أو نتيجة أو آلية."],H:["Raconte un événement.","يروي حدثًا."],B:["Construit un raisonnement pour prouver.","يبني حجة للإثبات."]};
const CATS = {dieu:['Dieu','الله'],prophete:['Prophètes et messagers','الأنبياء والرسل'],ange:['Anges','الملائكة'],jinn:['Jinns','الجن'],femme:['Femmes','النساء'],humain:['Autres humains','بشر آخرون'],groupe:['Groupes','الجماعات'],animal:['Animaux','الحيوانات']};
const AR_SIZES = ['1.25rem','1.45rem','1.7rem','2rem','2.35rem'];
const TABS = ['accueil','lire','sujets','regles','plus'];

/* Icônes (traits) */
const IC = {
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h6"/>',
 tree:'<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v10M12 12H5v5M12 12h7v5"/>',
 rules:'<path d="M4 19h16M6 15l4-10 4 10M7.5 11.5h5"/><path d="M17 5v10"/><circle cx="17" cy="17" r="1.2"/>',
 more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
 star:'<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
 q:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.7M12 17h.01"/>',
 people:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>',
 lineage:'<circle cx="12" cy="4" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="20" r="2"/><path d="M12 6v2M12 8H6v2M12 8h6v2M6 14v4"/>',
 lex:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
 layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
 heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
 text:'<path d="M4 6h16M4 12h16M4 18h10"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
 close:'<path d="M6 6l12 12M18 6L6 18"/>',
 chev:'<path d="M9 6l6 6-6 6"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
 copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
 note:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
 palette:'<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-1.2-1-1.4-1-2.4 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4-4-7.5-9-7.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
 minus:'<path d="M5 12h14"/>', plus:'<path d="M12 5v14M5 12h14"/>',
 hash:'<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>',
 prev:'<path d="M15 5l-7 7 7 7"/>', next:'<path d="M9 5l7 7-7 7"/>',
};
const ico = (n, c = '') => `<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || ''}</svg>`;

/* ───────────────────────── Préférences (sur l'appareil) */
const S = {
  get(k, d) { try { const v = localStorage.getItem('ca.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('ca.' + k, JSON.stringify(v)); } catch (e) {} },
};
let LANG = S.get('lang', 'both'), THEME = S.get('theme', 'auto'), ARSIZE = S.get('arsize', 1), TJ = S.get('tj', true);
let FAVS = new Set(S.get('favs', [])), NOTES = S.get('notes', {}), LAST = S.get('last', null);

/* ───────────────────────── Utilitaires */
/* Le texte source note le tanwīn « ouvert » par U+0657/U+065E/U+0656 ; la police l'affiche avec les formes standard U+08F0-08F2 */
const OPEN_TANWIN = { '\u0657': '\u08F0', '\u065E': '\u08F1', '\u0656': '\u08F2' };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])).replace(/[\u0656\u0657\u065E]/g, c => OPEN_TANWIN[c]);
const L = p => LANG === 'ar' ? p[1] : p[0];
const B = p => LANG === 'both' ? `${esc(p[0])} <span class="arsm">${esc(p[1])}</span>` : esc(L(p));
const H2 = p => LANG === 'ar' ? esc(p[1]) : esc(p[0]) + (LANG === 'both' ? ` <span class="ar">${esc(p[1])}</span>` : '');
const toAr = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const fold = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function rng(ref) { const [s, a] = ref.split(':'); const [x, y] = a.split('-').map(Number); const o = []; for (let i = x; i <= (y || x); i++) o.push(s + ':' + i); return o; }
const T = Object.fromEntries(DATA.tree.map(t => [t.id, t]));
const P = Object.fromEntries(DATA.people.map(p => [p.id, p]));
const QA = Object.fromEntries(DATA.qa.map(q => [q.id, q]));
const SURA = Object.fromEntries(DATA.suras.map(s => [s[0], s]));
const kids = id => DATA.tree.filter(t => t.p === id);
const roots = DATA.tree.filter(t => !t.p);
/* Verset → sujets qui le citent */
const VTOP = {};
DATA.tree.forEach(t => t.refs.forEach(r => rng(r[0]).forEach(k => { (VTOP[k] = VTOP[k] || []).includes(t.id) || VTOP[k].push(t.id); })));

/* Normalisation arabe (identique au contrôle des références) */
const DIA = /[ً-ٰٟۖ-ۭـ]/;
function nc(c) { if (DIA.test(c) || c === 'ء') return ''; if ('ٱأإآ'.includes(c)) return 'ا'; if (c === 'ى' || c === 'ئ') return 'ي'; if (c === 'ؤ') return 'و'; if (c === 'ة') return 'ه'; return c; }
function norm(t) { let o = ''; for (const c of t) o += nc(c); return o; }
/* Surligne les mots entiers qui contiennent le mot-clé (évite de casser la liaison des lettres) */
function hl(text, kw) {
  if (!kw) return esc(text);
  const chars = [...text]; let n = ''; const idx = [];
  chars.forEach((c, i) => { const m = nc(c); if (m) { n += m; idx.push(i); } });
  const k = norm(kw); const p = n.indexOf(k); if (p < 0) return esc(text);
  let s = idx[p], e = idx[p + k.length - 1] + 1;
  while (s > 0 && chars[s - 1] !== ' ') s--; while (e < chars.length && chars[e] !== ' ') e++;
  return esc(chars.slice(0, s).join('')) + '<mark>' + esc(chars.slice(s, e).join('')) + '</mark>' + esc(chars.slice(e).join(''));
}

/* ───────────────────────── Tajwīd : coloration */
const TJR = DATA.tj.rules.filter(r => r.color).map(r => { let rx = null; try { rx = new RegExp(r.rx, 'gu'); } catch (e) {} return { ...r, rx }; }).filter(r => r.rx);
const TJPRIO = ['madd-lazim','madd-muttasil','madd-munfasil','iqlab','idgham-ng','idgham-g','idgham-mithlayn','ikhfa','ikhfa-shafawi','ghunna','qalqala','lam-shamsi','wasl','muet'];
TJR.sort((a, b) => TJPRIO.indexOf(a.id) - TJPRIO.indexOf(b.id));
const MARK = /[ً-ٰٟۡ-۪ۨ-ۭ]/;
function tjClasses(text) {
  const ch = [...text]; const cls = new Array(ch.length).fill(null);
  /* les index de RegExp sont en unités UTF-16 ; le texte arabe est entièrement dans le plan de base */
  for (const r of TJR) {
    r.rx.lastIndex = 0; let m;
    while ((m = r.rx.exec(text))) {
      let s = m.index, e = s + m[0].length;
      while (s < e && ch[s] === ' ') s++;
      while (e < ch.length && MARK.test(ch[e])) e++;
      if (m[0].length === 0) { r.rx.lastIndex++; continue; }
      let free = true; for (let i = s; i < e; i++) if (cls[i]) { free = false; break; }
      if (free) for (let i = s; i < e; i++) cls[i] = r.color;
    }
  }
  return { ch, cls };
}
/* Rendu d'un mot coloré : liaison des lettres préservée par des ZWJ aux frontières */
function runsHTML(ch, cls, a, b) {
  const runs = []; for (let i = a; i < b; i++) { const c = cls ? cls[i] : null; if (runs.length && runs[runs.length - 1].c === c) runs[runs.length - 1].t += ch[i]; else runs.push({ c, t: ch[i] }); }
  return runs.map((r, i) => { const t = (i > 0 ? '‍' : '') + esc(r.t) + (i < runs.length - 1 ? '‍' : ''); return r.c ? `<span class="tj-${r.c}">${t}</span>` : t; }).join('');
}
function verseHTML(text, { tj = TJ, words = false } = {}) {
  const { ch, cls } = tj ? tjClasses(text) : { ch: [...text], cls: null };
  let out = '', i = 0, w = 0;
  while (i < ch.length) {
    if (ch[i] === ' ') { out += ' '; i++; continue; }
    let j = i; while (j < ch.length && ch[j] !== ' ') j++;
    const word = ch.slice(i, j).join('');
    const isSign = /^[ۖ-ۭ۞۩]+$/.test(word);
    const inner = runsHTML(ch, cls, i, j);
    out += words && !isSign ? `<span class="w" data-w="${esc(word)}">${inner}</span>` : inner;
    i = j; w++;
  }
  return out;
}
/* Exemple de règle : lettres concernées colorées */
function exampleHTML(text, s, e, color) {
  const ch = [...text]; const cls = new Array(ch.length).fill(null);
  for (let i = s; i < e; i++) cls[i] = color || 'ex';
  let out = '', i = 0;
  while (i < ch.length) { if (ch[i] === ' ') { out += ' '; i++; continue; } let j = i; while (j < ch.length && ch[j] !== ' ') j++; const inWord = s < j && e > i; out += inWord ? `<span class="tjbg">${runsHTML(ch, cls, i, j)}</span>` : esc(ch.slice(i, j).join('')); i = j; }
  return out;
}

/* ───────────────────────── Texte complet (chargé à la demande) */
let QURAN = null, QN = null, QI = null, QBY = null;
async function loadQ() {
  if (QURAN) return;
  if (window.QFULL) QURAN = window.QFULL; else { const r = await fetch('quran.json'); QURAN = await r.json(); }
  QN = QURAN.map(v => norm(v[2])); QI = {}; QBY = {};
  QURAN.forEach((v, i) => { QI[v[0] + ':' + v[1]] = i; (QBY[v[0]] = QBY[v[0]] || []).push(i); });
}
const vtext = k => QURAN ? (QURAN[QI[k]] || [])[2] : DATA.verses[k];

/* ───────────────────────── Composants */
function refLabel(ref) { const s = +ref.split(':')[0]; return `<span class="ref"><b>${ref}</b> · <span class="arsm">${esc(SURA[s][1])}</span> · ${esc(SURA[s][2])}</span>`; }
function pill(ty) { return `<span class="pill t-${ty}"><span class="dot"></span>${B(TYPES[ty])}</span>`; }
function qhtml(ref, kw, cls = '') { return `<div class="qtext ${cls}">` + rng(ref).map(k => hl(DATA.verses[k] || vtext(k) || '', kw) + `<span class="an">﴿${toAr(k.split(':')[1])}﴾</span>`).join(' ') + `</div>`; }
const readHash = ref => { const [s, a] = ref.split(':'); return `lire-${s}-${a.split('-')[0]}`; };
let CID = 0; const CARDS = {};
function vcard(o) {
  const id = 'c' + (++CID); CARDS[id] = o; const ty = o.type; const first = rng(o.ref)[0];
  return `<article class="vcard ${ty ? 't-' + ty : ''}" style="${ty ? '' : 'border-inline-start-color:var(--gold)'}" id="${id}">
   <div class="vhead">${refLabel(o.ref)}${ty ? pill(ty) : ''}</div>
   ${o.note && LANG !== 'ar' ? `<p class="clear"><b>${esc(L(['En clair','باختصار']))}</b>${esc(o.note)}</p>` : ''}
   ${qhtml(o.ref, o.kw, o.sm ? 'sm' : '')}
   ${o.link ? `<p class="crumb" style="margin:2px 0 0"><a href="#t-${o.link}">${B([T[o.link].fr, T[o.link].ar])}</a></p>` : ''}
   <div class="tools">
     <button class="btn" data-a="ctx" data-c="${id}" aria-expanded="false">${esc(L(['Contexte','السياق']))}</button>
     ${o.kw ? `<button class="btn" data-a="word" data-c="${id}" aria-expanded="false">${esc(L(['Le mot ailleurs','اللفظ في القرآن']))}</button>` : ''}
     <button class="btn" data-a="med" data-c="${id}" aria-expanded="false">${esc(L(['Méditer','تدبّر']))}</button>
     <a class="btn" href="#${readHash(o.ref)}">${ico('book', 'sm')}${esc(L(['Lire','اقرأ']))}</a>
     <button class="btn star" data-a="fav" data-ref="${first}" aria-pressed="${FAVS.has(first)}" aria-label="${esc(L(['Favori','مفضلة']))}">${ico('star', 'sm')}</button>
   </div><div class="out"></div></article>`;
}
function reflectHTML(ref, type) {
  const ap = type ? DATA.apply[type] : ["Que me dit ce verset, à moi, aujourd'hui ?", 'ماذا تقول لي هذه الآية اليوم؟'];
  const steps = [[['Lire','اقرأ'],['Relisez lentement, à voix basse si possible.','أعد القراءة بتمهّل وبصوت خافت.']],[['Comprendre','افهم'],['Quel est le mot surligné ? Que dit sa racine ?','ما اللفظ المظلَّل؟ وما معنى جذره؟']],[['Relier','اربط'],['Ouvrez « Contexte » et « Le mot ailleurs » : le sens se confirme-t-il ?','افتح السياق واللفظ في القرآن: هل يتأكد المعنى؟']],[['Appliquer','طبّق'],ap]];
  return `<div class="reflect"><ol>` + steps.map(([t, d], i) => `<li><b>${B(t)}</b> — ${esc(L(d))}${LANG === 'both' && i === 3 ? `<div class="arb">${esc(d[1])}</div>` : ''}</li>`).join('') + `</ol>
  <label class="n" for="ta-${esc(ref)}">${esc(L(['Votre réflexion (gardée sur cet appareil)','تأملك (يُحفظ على هذا الجهاز)']))}</label>
  <textarea id="ta-${esc(ref)}" data-note="${esc(ref)}">${esc(NOTES[ref] || '')}</textarea></div>`;
}
function medBox(pair, label) { return `<div class="medit"><div class="h">${esc(L(label || ['Question de méditation','سؤال للتدبر']))}</div>${LANG !== 'ar' ? `<p>${esc(pair[0])}</p>` : ''}${LANG !== 'fr' ? `<p class="arb" style="color:var(--ink)">${esc(pair[1])}</p>` : ''}</div>`; }
function listRow(href, title, sub, left = '', right = '') { return `<a href="#${href}">${left}<span class="grow"><span class="t">${title}</span>${sub ? `<span class="s">${sub}</span>` : ''}</span>${right}${ico('chev', 'sm chev flip')}</a>`; }
function countRefs(id) { let n = T[id].refs.length; kids(id).forEach(k => n += countRefs(k.id)); return n; }
function typeCounts(id, acc = {}) { T[id].refs.forEach(r => acc[r[1]] = (acc[r[1]] || 0) + 1); kids(id).forEach(k => typeCounts(k.id, acc)); return acc; }
function bar(c, t) { return `<div style="display:flex;height:6px;border-radius:3px;overflow:hidden;margin-top:6px;background:var(--soft)">` + ORDER.map(k => c[k] ? `<span class="t-${k}" style="display:block;background:currentColor;width:${c[k] / t * 100}%"></span>` : '').join('') + `</div>`; }
function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 1800); }
function setFav(ref, on) { on ? FAVS.add(ref) : FAVS.delete(ref); S.set('favs', [...FAVS]); toast(L(on ? ['Ajouté aux favoris','أضيف إلى المفضلة'] : ['Retiré des favoris','حُذف من المفضلة'])); }

/* ───────────────────────── Feuille (bottom sheet) */
let SHEET = false;
function openSheet(title, html) {
  const sc = document.getElementById('scrim'), sh = document.getElementById('sheet');
  sh.querySelector('h3').innerHTML = title; sh.querySelector('.sb').innerHTML = html; sh.querySelector('.sb').scrollTop = 0;
  sc.hidden = false; sh.hidden = false; requestAnimationFrame(() => { sc.classList.add('on'); sh.classList.add('on'); }); SHEET = true;
}
function closeSheet() {
  const sc = document.getElementById('scrim'), sh = document.getElementById('sheet');
  sc.classList.remove('on'); sh.classList.remove('on'); SHEET = false;
  setTimeout(() => { if (!SHEET) { sc.hidden = true; sh.hidden = true; } }, 260);
  document.querySelectorAll('.w.sel').forEach(w => w.classList.remove('sel'));
}

/* ───────────────────────── Navigation (pile interne : fonctionne dans l'app Android, l'app Claude et Safari) */
let STACK = [], CUR = 'accueil';
const SCROLL = {};
function sectionOf(h) {
  if (h.startsWith('lire')) return 'lire';
  if (h.startsWith('regles')) return 'regles';
  if (h === 'sujets' || h.startsWith('t-') || h.startsWith('b-')) return 'sujets';
  if (h === 'accueil') return 'accueil';
  return 'plus';
}
function go(h, opt = {}) {
  h = h || 'accueil';
  if (SHEET) closeSheet();
  SCROLL[CUR] = window.pageYOffset;
  if (opt.tab) STACK = [h]; else if (opt.replace) STACK[STACK.length - 1] = h; else if (STACK[STACK.length - 1] !== h) STACK.push(h);
  if (!opt.fromPop) { try { history.pushState({ h }, '', '#' + h); } catch (e) {} }
  render(h, opt.restore ? SCROLL[h] : 0);
}
function back() {
  if (SHEET) { closeSheet(); return true; }
  if (STACK.length > 1) { STACK.pop(); const h = STACK[STACK.length - 1]; SCROLL[CUR] = 0; try { history.replaceState({ h }, '', '#' + h); } catch (e) {} render(h, SCROLL[h] || 0); return true; }
  if (CUR !== 'accueil') { STACK = ['accueil']; render('accueil', 0); return true; }
  return false;
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'), a = g ? null : e.target.closest('a[href^="#"]');
  if (!g && !a) return;
  e.preventDefault();
  const h = (g ? g.getAttribute('data-go') : a.getAttribute('href').slice(1));
  if (h === '__back') { back(); return; }
  const el = g || a;
  go(h, { tab: !!el.dataset.tab, replace: !!el.dataset.replace });
}, true);
window.addEventListener('popstate', () => { back(); });
/* Adresse modifiée à la main ou lien externe vers un écran */
window.addEventListener('hashchange', () => { let h = ''; try { h = decodeURIComponent((location.hash || '').slice(1)); } catch (e) {} if (h && h !== CUR) go(h, { fromPop: true }); });

/* ───────────────────────── Coquille */
const NAVITEMS = [['accueil','home',['Accueil','الرئيسية']],['lire','book',['Lire','اقرأ']],['sujets','tree',['Sujets','الموضوعات']],['regles','rules',['Règles','التجويد']],['plus','more',['Plus','المزيد']]];
const RAIL = [...NAVITEMS.slice(0, 4), null, ['questions','q',['Questions','أسئلة']],['tadabbur','eye',['Tadabbur','التدبر']],['personnages','people',['Personnages','الشخصيات']],['lignees','lineage',['Lignées','السلالات']],['lexique','lex',['Lexique','المعجم']],['nature','layers',['Natures','الأنواع']],['favoris','heart',['Favoris','المفضلة']], null, ['reglages','settings',['Réglages','الإعدادات']],['methode','info',['Méthode','المنهج']]];
function shell(title) {
  document.getElementById('ttl').innerHTML = title;
  const canBack = STACK.length > 1 || !TABS.includes(CUR);
  document.getElementById('bk').hidden = !canBack;
  const sec = sectionOf(CUR);
  document.getElementById('bnav').innerHTML = NAVITEMS.map(([h, i, l]) => `<a href="#${h}" data-tab="1" class="${sec === h ? 'on' : ''}" ${sec === h ? 'aria-current="page"' : ''}>${ico(i)}<span>${esc(L(l))}</span></a>`).join('');
  document.getElementById('rail').innerHTML = RAIL.map(x => x ? `<a href="#${x[0]}" data-tab="1" class="${(sec === x[0] || CUR === x[0]) && !(sec === 'plus' && x[0] === 'plus') ? 'on' : ''}">${ico(x[1])}<span>${esc(L(x[2]))}</span></a>` : '<div class="sep"></div>').join('');
}
const M = () => document.getElementById('main');

/* ───────────────────────── Vues */
async function render(h, y = 0) {
  CUR = h; let v;
  try {
    if (h.startsWith('t-') && T[h.slice(2)]) v = viewTopic(h.slice(2));
    else if (h.startsWith('b-') && T[h.slice(2)]) v = viewBranch(h.slice(2));
    else if (h.startsWith('p-') && P[h.slice(2)]) v = viewPerson(h.slice(2));
    else if (h.startsWith('q-') && QA[h.slice(2)]) v = viewQuestions(h.slice(2));
    else if (h.startsWith('lire-')) { const [, s, a] = h.split('-'); v = await viewSura(+s, a ? +a : 0); }
    else if (h.startsWith('regles-')) v = viewRules(h.slice(7));
    else if (h.startsWith('nature')) v = viewNature((h.split('-')[1] || 'E').toUpperCase());
    else v = ({ accueil: viewHome, lire: viewReadIndex, sujets: viewTopics, regles: () => viewRules(''), plus: viewMore, questions: () => viewQuestions(), tadabbur: viewTadabbur, personnages: () => viewPeople(), lignees: viewLineages, lexique: viewLex, favoris: viewFavs, reglages: viewSettings, methode: viewMethod, recherche: viewSearch }[h] || viewHome)();
  } catch (err) { console.error(err); v = { title: 'Erreur', html: `<p class="empty">${esc(String(err))}</p>` }; }
  if (CUR !== h) return;
  shell(v.title);
  M().innerHTML = v.html;
  window.scrollTo(0, y || 0);
  if (v.after) v.after();
}

function viewHome() {
  const all = []; DATA.tree.forEach(t => t.refs.forEach(r => all.push([r, t.id])));
  const day = Math.floor(Date.now() / 864e5); const [r, tid] = all[(day * 37) % all.length];
  const startQ = ['iblis-ange','terre-forme','isa-crucifie','fils-sacrifice','libre-arbitre','preuve-dieu'];
  const tiles = [['lire','book',['Lire le Coran','اقرأ القرآن'],['114 sourates, coloration du tajwīd','١١٤ سورة مع ألوان التجويد']],['sujets','tree',['Sujets','الموضوعات'],[`${roots.length} branches, ${DATA.tree.length - roots.length} sujets`,'']],['questions','q',['Questions','أسئلة'],[`${DATA.qa.length} réponses raisonnées`,'']],['regles','rules',['Règles de lecture','أحكام التلاوة'],['Tajwīd, pauses, articulation','التجويد والوقف والمخارج']],['tadabbur','eye',['Tadabbur','التدبر'],['Méditer comme le texte le demande','']],['personnages','people',['Personnages','الشخصيات'],[`${DATA.people.length} et leurs relations`,'']],['lignees','lineage',['Lignées','السلالات'],['Qui descend de qui','']],['lexique','lex',['Lexique','المعجم'],[`${DATA.lex.length} racines`,'']],['nature','layers',['Natures des versets','أنواع الآيات'],['Exigences, preuves, récits…','']],['favoris','heart',['Favoris','المفضلة'],[`${FAVS.size} verset(s)`,'']]];
  const last = LAST && SURA[LAST[0]] ? `<a class="card row" href="#lire-${LAST[0]}-${LAST[1]}" style="text-decoration:none;color:var(--ink);margin-top:12px">${ico('book')}<span class="grow" style="flex:1"><span class="n">${esc(L(['Reprendre la lecture','متابعة القراءة']))}</span><br><b>${esc(SURA[LAST[0]][2])}</b> <span class="arsm">${esc(SURA[LAST[0]][1])}</span> · ${esc(L(['verset','الآية']))} ${LAST[1]}</span>${ico('chev', 'sm chev flip')}</a>` : '';
  return { title: LANG === 'ar' ? 'شجرة موضوعات القرآن' : 'Arbre des sujets du Coran', html: `
   <button class="searchbtn" data-go="recherche">${ico('search')}<span>${esc(L(['Rechercher un sujet, un verset, un mot…','ابحث عن موضوع أو آية أو لفظ…']))}</span></button>
   ${last}
   <div class="sec">${B(['Méditation du jour','تدبّر اليوم'])}</div>
   ${vcard({ ref: r[0], type: r[1], note: r[2], kw: r[3], link: tid })}
   <div class="sec">${B(['Explorer','استكشف'])}</div>
   <div class="grid">${tiles.map(([h, i, t, s]) => `<a class="tile" href="#${h}">${ico(i)}<span class="t">${B(t)}</span><span class="s">${esc(L([s[0], s[1] || s[0]]))}</span></a>`).join('')}</div>
   <div class="sec">${B(['Commencez par une question','ابدأ بسؤال'])}</div>
   <div class="list">${startQ.map(id => listRow('q-' + id, esc(L([QA[id].qfr, QA[id].qar])), LANG === 'both' ? `<span class="arsm">${esc(QA[id].qar)}</span>` : '')).join('')}</div>` };
}

function viewMore() {
  const items = [['questions','q',['Questions logiques','أسئلة منطقية']],['tadabbur','eye',['Tadabbur','التدبر']],['personnages','people',['Personnages','الشخصيات']],['lignees','lineage',['Lignées','السلالات']],['lexique','lex',['Lexique des racines','معجم الجذور']],['nature','layers',['Natures des versets','أنواع الآيات']],['favoris','heart',['Favoris et notes','المفضلة والتأملات']],['recherche','search',['Recherche','البحث']]];
  const set = [['reglages','settings',['Réglages','الإعدادات']],['methode','info',['Méthode et sources','المنهج والمصادر']]];
  const li = a => `<div class="list">${a.map(([h, i, t]) => listRow(h, B(t), '', `<span class="badge" style="color:var(--gold)">${ico(i, 'sm')}</span>`)).join('')}</div>`;
  return { title: esc(L(['Plus','المزيد'])), html: li(items) + `<div style="height:14px"></div>` + li(set) };
}

/* ── Lecteur */
let RFILTER = 'all', RQUERY = '';
function viewReadIndex() {
  const last = LAST && SURA[LAST[0]] ? `<a class="card row" href="#lire-${LAST[0]}-${LAST[1]}" style="text-decoration:none;color:var(--ink);margin-bottom:12px">${ico('book')}<span style="flex:1"><span class="n">${esc(L(['Reprendre','متابعة']))}</span><br><b>${esc(SURA[LAST[0]][2])}</b> · ${LAST[1]}</span>${ico('chev', 'sm chev flip')}</a>` : '';
  const html = `${last}
   <input class="field" id="rq" type="search" placeholder="${esc(L(['Nom ou numéro de sourate','اسم السورة أو رقمها']))}" value="${esc(RQUERY)}" aria-label="Filtrer">
   <div class="seg" style="margin:10px 0" role="group">${[['all',['Toutes','الكل']],['meccan',['Mecquoises','مكية']],['medinan',['Médinoises','مدنية']]].map(([k, l]) => `<button data-rf="${k}" aria-pressed="${RFILTER === k}">${esc(L(l))}</button>`).join('')}</div>
   <div class="list" id="slist"></div>`;
  return { title: esc(L(['Lire le Coran','اقرأ القرآن'])), html, after() {
    const draw = () => { const q = fold(RQUERY.trim()); document.getElementById('slist').innerHTML = DATA.suras.filter(s => (RFILTER === 'all' || s[3] === RFILTER) && (!q || String(s[0]) === q || fold(s[2]).includes(q) || norm(s[1]).includes(norm(RQUERY.trim())))).map(s => listRow(`lire-${s[0]}`, `${esc(s[2])}`, `${s[3] === 'meccan' ? esc(L(['Mecquoise','مكية'])) : esc(L(['Médinoise','مدنية']))} · ${s[4]} ${esc(L(['versets','آية']))}`, `<span class="badge">${s[0]}</span>`, `<span style="font-family:var(--f-q);font-size:1.35rem;color:var(--gold)">${esc(s[1])}</span>`)).join('') || `<p class="empty">—</p>`; };
    draw();
    document.getElementById('rq').oninput = e => { RQUERY = e.target.value; draw(); };
    M().querySelectorAll('[data-rf]').forEach(b => b.onclick = () => { RFILTER = b.dataset.rf; M().querySelectorAll('[data-rf]').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); });
  } };
}
async function viewSura(s, a) {
  if (!SURA[s]) return viewReadIndex();
  await loadQ();
  const sura = SURA[s], idx = QBY[s];
  const legend = `<div class="legendtj">${DATA.tj.legend.map(([c, fr, ar]) => `<span class="tj-${c}"><span class="dot"></span><span style="color:var(--ink)">${esc(L([fr, ar]))}</span></span>`).join('')}</div>`;
  const verses = idx.map(i => { const v = QURAN[i], k = v[0] + ':' + v[1]; const tops = VTOP[k] || [];
    return `<div class="verse" id="v-${v[1]}" data-k="${k}"><div class="vt">${verseHTML(v[2], { words: true })}<span class="an">﴿${toAr(v[1])}﴾</span></div>
     <div class="vmeta"><span class="row" style="gap:6px;flex-wrap:wrap"><span class="vnum">${s}:${v[1]}</span>${tops.slice(0, 2).map(t => `<a class="tlink" href="#t-${t}">${ico('tree', 'sm')}${esc(L([T[t].fr, T[t].ar]))}</a>`).join('')}${tops.length > 2 ? `<span class="n">+${tops.length - 2}</span>` : ''}</span>
     <span class="vact"><button class="ib ${FAVS.has(k) ? 'on' : ''}" data-vfav="${k}" aria-label="Favori">${ico('star', 'sm')}</button><button class="ib" data-vmed="${k}" aria-label="Méditer">${ico('note', 'sm')}</button><button class="ib" data-vcopy="${k}" aria-label="Copier">${ico('copy', 'sm')}</button></span></div></div>`; }).join('');
  const html = `<div class="surahead"><div class="ar">${esc(sura[1])}</div><div><b>${esc(sura[2])}</b> · <span class="n">${sura[3] === 'meccan' ? esc(L(['Mecquoise','مكية'])) : esc(L(['Médinoise','مدنية']))} · ${sura[4]} ${esc(L(['versets','آية']))}</span></div></div>
   <div class="rtools">
     <button class="btn" id="tjt" aria-pressed="${TJ}">${ico('palette', 'sm')}${esc(L(['Tajwīd','التجويد']))}</button>
     <button class="btn" id="fz-" aria-label="Réduire">${ico('minus', 'sm')}</button><button class="btn" id="fz+" aria-label="Agrandir">${ico('plus', 'sm')}</button>
     <button class="btn" id="gov">${ico('hash', 'sm')}${esc(L(['Verset','آية']))}</button>
     <a class="btn" href="#regles">${ico('rules', 'sm')}${esc(L(['Règles','الأحكام']))}</a>
   </div>
   <div id="lg" ${TJ ? '' : 'hidden'}>${legend}<p class="n" style="margin:0 0 6px">${esc(L(['Touchez un mot pour voir ses autres occurrences.','المس كلمة لعرض مواضعها الأخرى.']))}</p></div>
   ${s !== 1 && s !== 9 ? `<div class="basmala">${verseHTML('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ')}</div>` : ''}
   <div id="verses">${verses}</div>
   <div class="pager">${s > 1 ? `<a class="btn" href="#lire-${s - 1}" data-replace="1">${ico('prev', 'sm flip')}${esc(SURA[s - 1][2])}</a>` : '<span></span>'}${s < 114 ? `<a class="btn" href="#lire-${s + 1}">${esc(SURA[s + 1][2])}${ico('next', 'sm flip')}</a>` : ''}</div>`;
  return { title: `${esc(sura[2])} <span class="ar">${esc(sura[1])}</span>`, html, after() {
    const vs = document.getElementById('verses');
    document.getElementById('tjt').onclick = e => { TJ = !TJ; S.set('tj', TJ); render(CUR, window.pageYOffset); };
    document.getElementById('fz-').onclick = () => setAr(ARSIZE - 1);
    document.getElementById('fz+').onclick = () => setAr(ARSIZE + 1);
    document.getElementById('gov').onclick = () => openSheet(esc(L(['Aller au verset','الانتقال إلى آية'])), `<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(56px,1fr))">${idx.map(i => `<button class="btn" style="justify-content:center" data-jump="${QURAN[i][1]}">${QURAN[i][1]}</button>`).join('')}</div>`);
    vs.addEventListener('click', ev => {
      const w = ev.target.closest('.w'); const f = ev.target.closest('[data-vfav]'), m = ev.target.closest('[data-vmed]'), c = ev.target.closest('[data-vcopy]');
      if (f) { const k = f.dataset.vfav; const on = !FAVS.has(k); setFav(k, on); f.classList.toggle('on', on); return; }
      if (m) { const k = m.dataset.vmed; openSheet(`${esc(L(['Méditer','تدبّر']))} · ${k}`, `<div class="qtext sm">${esc(vtext(k))}</div>${(VTOP[k] || []).map(t => `<a class="tlink" href="#t-${t}" style="margin:2px">${esc(L([T[t].fr, T[t].ar]))}</a>`).join('')}${reflectHTML(k, null)}`); return; }
      if (c) { const k = c.dataset.vcopy; const txt = `${vtext(k)} (${SURA[+k.split(':')[0]][2]} ${k})`; try { navigator.clipboard.writeText(txt).then(() => toast(L(['Verset copié','نُسخت الآية'])), () => toast(L(['Copie impossible ici','تعذّر النسخ']))); } catch (e) { toast(L(['Copie impossible ici','تعذّر النسخ'])); } return; }
      if (w) { w.classList.add('sel'); wordSheet(w.dataset.w); }
    });
    if (a) { const el = document.getElementById('v-' + a); if (el) { el.classList.add('hi'); setTimeout(() => { const y = el.getBoundingClientRect().top + window.pageYOffset - 130; window.scrollTo(0, y); }, 30); } }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => { const vis = es.filter(e => e.isIntersecting).map(e => +e.target.id.slice(2)); if (vis.length && CUR.startsWith('lire-' + s)) { LAST = [s, Math.min(...vis)]; S.set('last', LAST); } }, { rootMargin: '-30% 0px -60% 0px' });
      vs.querySelectorAll('.verse').forEach(el => io.observe(el));
    } else { LAST = [s, a || 1]; S.set('last', LAST); }
  } };
}
function setAr(i) { ARSIZE = Math.max(0, Math.min(AR_SIZES.length - 1, i)); S.set('arsize', ARSIZE); document.documentElement.style.setProperty('--ar-size', AR_SIZES[ARSIZE]); }
async function wordSheet(word) {
  await loadQ();
  const k = norm(word);
  const exact = [], contain = [];
  QN.forEach((v, i) => { if (!v.includes(k)) return; const toks = v.split(' '); if (toks.includes(norm(word))) exact.push(i); else contain.push(i); });
  const all = exact.concat(contain);
  openSheet(`<span style="font-family:var(--f-q);font-size:1.5rem">${esc(word)}</span>`, `<p class="n">${esc(L([`Forme exacte : ${exact.length} verset(s) · contenant « ${k} » : ${all.length}`, `الصيغة نفسها: ${exact.length} · ما يحتوي «${k}»: ${all.length}`]))}</p>
   <div class="list">${all.slice(0, 60).map(i => { const v = QURAN[i]; return `<a class="hit" href="#lire-${v[0]}-${v[1]}"><span class="ref"><b>${v[0]}:${v[1]}</b> · <span class="arsm">${esc(SURA[v[0]][1])}</span></span><div class="qtext">${hl(v[2], k)}</div></a>`; }).join('')}</div>${all.length > 60 ? `<p class="n">${esc(L(['60 premiers affichés. Affinez avec la recherche.','عرض أول ٦٠.']))}</p>` : ''}`);
}

/* ── Sujets */
function viewTopics() {
  return { title: esc(L(['Sujets','الموضوعات'])), html: `<p class="lead">${esc(L(['Douze branches, chacune divisée en sujets. La barre montre la part de chaque nature de verset.','اثنا عشر فرعًا، كلٌّ منها ينقسم إلى موضوعات.']))}</p>
   <div class="row" style="flex-wrap:wrap;gap:6px 12px;font-size:.8rem;margin-bottom:12px">${ORDER.map(k => `<span class="t-${k} row" style="gap:5px"><span class="dot"></span><span style="color:var(--ink)">${esc(L(TYPES[k]))}</span></span>`).join('')}</div>
   <div class="stack">${roots.map(r => { const c = typeCounts(r.id), n = countRefs(r.id); return `<a class="card" href="#b-${r.id}" style="text-decoration:none;color:var(--ink);display:block"><div class="row"><span style="flex:1"><b>${esc(L([r.fr, r.ar]))}</b>${LANG === 'both' ? ` <span class="arsm" style="color:var(--gold)">${esc(r.ar)}</span>` : ''}</span><span class="n">${kids(r.id).length} · ${n}</span>${ico('chev', 'sm chev flip')}</div><div class="n" style="margin-top:2px">${esc(L([r.sfr, r.sar]))}</div>${bar(c, n)}</a>`; }).join('')}</div>` };
}
function viewBranch(id) {
  const r = T[id];
  return { title: H2([r.fr, r.ar]), html: `<p class="lead">${esc(L([r.sfr, r.sar]))}</p>${DATA.tqr[id] ? medBox(DATA.tqr[id]) : ''}
   <div class="list" style="margin-top:14px">${kids(id).map(k => { const c = {}; k.refs.forEach(x => c[x[1]] = (c[x[1]] || 0) + 1); return `<a href="#t-${k.id}"><span class="grow"><span class="t">${esc(L([k.fr, k.ar]))}${LANG === 'both' ? ` <span class="arsm">${esc(k.ar)}</span>` : ''}</span><span class="s">${esc(L([k.sfr, k.sar]))}</span>${bar(c, k.refs.length)}</span><span class="n">${k.refs.length}</span>${ico('chev', 'sm chev flip')}</a>`; }).join('')}</div>` };
}
function viewTopic(id) {
  const t = T[id], par = T[t.p], isStory = t.p === 'recits';
  const qs = DATA.qa.filter(q => q.topic === id), ps = DATA.people.filter(p => p.topic === id);
  const present = ORDER.filter(k => t.refs.some(r => r[1] === k));
  let h = `<a class="crumb" href="#b-${par.id}">${B([par.fr, par.ar])}</a><h2>${H2([t.fr, t.ar])}</h2>
   ${LANG !== 'ar' ? `<p class="lead" style="margin-bottom:0">${esc(t.sfr)}</p>` : ''}${LANG !== 'fr' ? `<p class="lead arb">${esc(t.sar)}</p>` : ''}
   ${DATA.tq[id] ? medBox(DATA.tq[id]) : ''}`;
  if (!isStory && present.length > 1) h += `<div class="chips" style="margin-top:12px">${present.map(k => `<button class="chip t-${k}" data-scroll="sec-${k}"><span class="dot"></span><span style="color:var(--ink)">${esc(L(TQS[k]))}</span></button>`).join('')}</div>`;
  if (qs.length) h += `<div class="sec">${B(['Questions sur ce sujet','أسئلة حول الموضوع'])}</div><div class="list">${qs.map(q => listRow('q-' + q.id, esc(L([q.qfr, q.qar])), '')).join('')}</div>`;
  if (ps.length) h += `<div class="sec">${B(['Personnages','الشخصيات'])}</div><div class="chips">${ps.map(p => `<a class="chip" href="#p-${p.id}">${esc(L([p.fr, p.ar]))}</a>`).join('')}</div>`;
  if (isStory) h += `<div class="sec">${B(['Le récit, étape par étape','القصة خطوة خطوة'])}</div><div class="timeline">${t.refs.map((r, i) => `<p class="step-n">${esc(L(['Étape','مرحلة']))} ${i + 1}</p>${vcard({ ref: r[0], type: r[1], note: r[2], kw: r[3] })}`).join('')}</div>`;
  else present.forEach(k => { h += `<div class="sec t-${k}" id="sec-${k}"><span class="dot"></span><span style="color:var(--ink)">${esc(L(TQS[k]))}</span><span class="q">${esc(L(TYPES[k]))}</span></div><div class="stack">${t.refs.filter(r => r[1] === k).map(r => vcard({ ref: r[0], type: r[1], note: r[2], kw: r[3] })).join('')}</div>`; });
  const sib = kids(t.p), i = sib.findIndex(s => s.id === id);
  h += `<div class="pager">${sib[i - 1] ? `<a class="btn" href="#t-${sib[i - 1].id}">${ico('prev', 'sm flip')}${esc(L([sib[i - 1].fr, sib[i - 1].ar]))}</a>` : '<span></span>'}${sib[i + 1] ? `<a class="btn" href="#t-${sib[i + 1].id}">${esc(L([sib[i + 1].fr, sib[i + 1].ar]))}${ico('next', 'sm flip')}</a>` : ''}</div>`;
  return { title: esc(L([t.fr, t.ar])), html: h, after() { M().querySelectorAll('[data-scroll]').forEach(b => b.onclick = () => { const el = document.getElementById(b.dataset.scroll); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset - 70); }); } };
}

/* ── Natures */
function viewNature(ty) {
  if (!TYPES[ty]) ty = 'E';
  const all = {}; DATA.tree.forEach(t => t.refs.forEach(r => all[r[1]] = (all[r[1]] || 0) + 1));
  let h = `<p class="lead">${esc(L(["Un même texte définit, explique, prouve, raconte, exige et conseille. Choisissez une nature.","النص يعرّف ويبيّن ويبرهن ويقصّ ويأمر ويوجّه. اختر نوعًا."]))}</p>
   <div class="chips">${ORDER.map(k => `<a class="chip t-${k}" aria-pressed="${k === ty}" href="#nature-${k.toLowerCase()}" data-replace="1"><span class="dot"></span>${esc(L(TYPES[k]))} <span class="n">${all[k]}</span></a>`).join('')}</div>
   <p class="lead"><b class="t-${ty}">${esc(L(TQS[ty]))}</b> ${esc(L(TDESC[ty]))}</p>`;
  roots.forEach(r => { const it = []; kids(r.id).forEach(k => k.refs.forEach(x => { if (x[1] === ty) it.push([x, k.id]); })); if (!it.length) return;
    h += `<div class="sec">${B([r.fr, r.ar])} <span class="n">${it.length}</span></div><div class="stack">` + it.map(([x, tid]) => vcard({ ref: x[0], type: x[1], note: x[2], kw: x[3], link: tid })).join('') + `</div>`; });
  return { title: esc(L(['Natures des versets','أنواع الآيات'])), html: h };
}

/* ── Questions */
function qaHTML(q, open) {
  return `<details class="qa" id="q-${q.id}" ${open ? 'open' : ''}><summary>${LANG === 'ar' ? esc(q.qar) : esc(q.qfr)}${LANG === 'both' ? `<br><span class="arsm">${esc(q.qar)}</span>` : ''}</summary><div class="body">
   ${LANG !== 'ar' ? `<p class="answer">${esc(q.afr)}</p>` : ''}${LANG !== 'fr' ? `<p class="answer arb" style="color:var(--ink)">${esc(q.aar)}</p>` : ''}
   ${LANG !== 'ar' ? `<div class="crumb">${esc(L(['Le raisonnement','الاستدلال']))}</div><ol class="logic">${q.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
   <div class="stack">${q.refs.map(([r, k]) => vcard({ ref: r, kw: k, sm: true })).join('')}</div>
   <p><a class="btn" href="#t-${q.topic}">${ico('tree', 'sm')}${esc(L([T[q.topic].fr, T[q.topic].ar]))}</a></p></div></details>`;
}
function viewQuestions(open) {
  const groups = {}; DATA.qa.forEach(q => { const r = T[q.topic].p || q.topic; (groups[r] = groups[r] || []).push(q); });
  let h = `<p class="lead">${esc(L(["Chaque réponse part des mots du texte et suit un raisonnement pas à pas. Quand le texte ne tranche pas, la réponse le dit.","كل جواب ينطلق من ألفاظ النص ويتبع استدلالًا متدرّجًا."]))}</p>`;
  roots.forEach(r => { if (!groups[r.id]) return; h += `<div class="sec">${B([r.fr, r.ar])}</div><div class="stack">${groups[r.id].map(q => qaHTML(q, q.id === open)).join('')}</div>`; });
  return { title: esc(L(['Questions','أسئلة'])), html: h, after() { if (open) { const el = document.getElementById('q-' + open); if (el) setTimeout(() => window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset - 70), 30); } } };
}

/* ── Personnages, lignées, lexique */
function relationsOf(id) { const o = []; P[id].rel.forEach(r => o.push({ other: r[0], fr: r[1], ar: r[2], ref: r[3], kw: r[4], kind: r[5] })); DATA.people.forEach(q => q.rel.forEach(r => { if (r[0] === id) o.push({ other: q.id, fr: r[1], ar: r[2], ref: r[3], kw: r[4], kind: r[5], inv: true }); })); return o; }
function viewPeople() {
  let h = `<p class="lead">${esc(L(["Ceux que le texte ne nomme pas restent désignés par leur lien (« l'épouse de… »).","من لم يسمّهم النص يُذكرون بصلتهم."]))}</p>`;
  Object.keys(CATS).forEach(c => { const ps = DATA.people.filter(p => p.cat === c); if (!ps.length) return; h += `<div class="sec">${B(CATS[c])} <span class="n">${ps.length}</span></div><div class="list">${ps.map(p => listRow('p-' + p.id, esc(L([p.fr, p.ar])), LANG === 'both' ? `<span class="arsm">${esc(p.ar)}</span>` : '', '', `<span class="n">${relationsOf(p.id).length}</span>`)).join('')}</div>`; });
  return { title: esc(L(['Personnages','الشخصيات'])), html: h };
}
function viewPerson(id) {
  const p = P[id], rels = relationsOf(id);
  let h = `<div class="crumb">${B(CATS[p.cat])}</div><h2>${H2([p.fr, p.ar])}</h2>
   ${p.topic && T[p.topic] && id !== 'allah' ? `<a class="btn" href="#t-${p.topic}">${ico('tree', 'sm')}${esc(L([T[p.topic].fr, T[p.topic].ar]))}</a>` : ''}
   <div class="sec">${B(['Relation avec Dieu','العلاقة مع الله'])}</div>${vcard({ ref: p.god[2], kw: p.god[3], note: LANG === 'ar' ? '' : p.god[0], sm: true })}${LANG !== 'fr' ? `<p class="arb">${esc(p.god[1])}</p>` : ''}`;
  const by = {}; rels.forEach(r => (by[r.kind] = by[r.kind] || []).push(r));
  ['famille','allie','adversaire','mission','origine'].forEach(k => { if (!by[k]) return;
    h += `<div class="sec">${B(DATA.kinds[k])} <span class="n">${by[k].length}</span></div><div class="stack">` + by[k].map(r => `<div><p style="margin:0 0 6px"><a href="#p-${r.other}"><b>${esc(L([P[r.other].fr, P[r.other].ar]))}</b></a> — ${esc(LANG === 'ar' ? r.ar : r.fr)}</p>${vcard({ ref: r.ref, kw: r.kw, sm: true })}</div>`).join('') + `</div>`; });
  return { title: esc(L([p.fr, p.ar])), html: h };
}
function viewLineages() {
  const li = DATA.lintro;
  let h = `<p class="lead">${esc(L(["Seuls les liens affirmés par le texte sont tracés ; chaque lien porte son verset.","لا تُرسم إلا الصلات التي يثبتها النص، مع آيتها."]))}</p>${vcard({ ref: li[0], kw: li[1], note: li[2], sm: true })}`;
  DATA.lineages.forEach(([fr, ar, st]) => { h += `<div class="sec">${B([fr, ar])}</div><div class="chain">`;
    st.forEach(s => { if (s[3]) h += `<div class="link">↓ ${esc(LANG === 'ar' ? s[2] : s[1])} · <a href="#${readHash(s[3])}"><b>${s[3]}</b></a>${qhtml(s[3], s[4], 'sm')}</div>`; h += `<a class="node" href="#p-${s[0]}"><span>${esc(L([P[s[0]].fr, P[s[0]].ar]))}</span>${ico('chev', 'sm chev flip')}</a>`; }); h += '</div>'; });
  return { title: esc(L(['Lignées','السلالات'])), html: h };
}
function viewLex() {
  return { title: esc(L(['Lexique des racines','معجم الجذور'])), html: `<p class="lead">${esc(L(["L'arabe bâtit ses mots sur des racines de trois lettres : la racine donne l'image d'origine.","تُبنى الكلمة العربية على جذر ثلاثي يعطي الصورة الأصلية."]))}</p>
   <div class="stack">${DATA.lex.map(l => `<div class="card lex"><div class="row" style="justify-content:space-between"><div><b>${esc(l[1])}</b> <span class="n">· ${esc(L(['racine','الجذر']))} ${esc(l[2])}</span></div><div class="w">${esc(l[0])}</div></div>${LANG !== 'ar' ? `<div>${esc(l[3])}</div>` : ''}${LANG !== 'fr' ? `<div class="arb" style="color:var(--ink)">${esc(l[4])}</div>` : ''}<a class="ref" href="#${readHash(l[5])}"><b>${l[5]}</b></a>${qhtml(l[5], l[6], 'sm')}</div>`).join('')}</div>` };
}

/* ── Tadabbur */
function viewTadabbur() {
  const max = Math.max(...DATA.calls.map(c => c[5].length));
  let h = `<p class="lead">${esc(L(["Tadabbur vient de dubur, « la fin » : méditer, c'est regarder où mène un verset. Ces quatre étapes sont tirées du texte lui-même ; chaque carte verset les propose.","التدبّر من الدُّبُر: النظر في مآل الآية. وهذه الخطوات الأربع مستخرجة من النص نفسه."]))}</p>`;
  DATA.method.forEach((m, i) => { h += `<div class="sec">${i + 1}. ${B([m[1], m[2]])}</div><p class="lead" style="margin-top:0">${esc(L([m[3], m[4]]))}</p><div class="stack">${m[5].map(([r, k]) => vcard({ ref: r, kw: k, sm: true })).join('')}</div>`; });
  h += `<div class="sec">${B(['Ce qui empêche, ce qui facilite','الموانع والتيسير'])}</div><div class="stack">${DATA.obstacle.map(o => vcard({ ref: o[0], kw: o[1], note: o[2], sm: true })).join('')}</div>`;
  h += `<div class="sec">${B(['Combien de fois le texte appelle à réfléchir','كم مرة يدعو النص إلى التفكّر'])}</div><div class="list">${DATA.calls.map((c, i) => `<button class="callrow" data-call="${i}"><span><b>${esc(L([c[1], c[2]]))}</b><br><span class="arsm">${esc(c[2])}</span></span><span class="callbar" style="width:${c[5].length / max * 100}%"></span><span class="n">${c[5].length}</span></button>`).join('')}</div>`;
  return { title: esc(L(['Tadabbur','التدبر'])), html: h, after() {
    M().querySelectorAll('[data-call]').forEach(b => b.onclick = async () => { const c = DATA.calls[+b.dataset.call]; await loadQ();
      openSheet(esc(L([c[1], c[2]])) + ` · ${c[5].length}`, `<p class="n">${esc(L([c[3], c[4]]))}</p><div class="list">${c[5].map(r => { const v = QURAN[QI[r]]; return `<a class="hit" href="#lire-${v[0]}-${v[1]}"><span class="ref"><b>${r}</b> · <span class="arsm">${esc(SURA[v[0]][1])}</span></span><div class="qtext">${esc(v[2])}</div></a>`; }).join('')}</div>`); });
  } };
}

/* ── Règles de lecture */
const RSECS = [['signes',['Signes du muṣḥaf','علامات المصحف']],['nun',['Nūn et tanwīn','النون والتنوين']],['mim',['Mīm sākina','الميم الساكنة']],['son',['Ghunna et qalqala','الغنّة والقلقلة']],['lam',["L'article al-","لام التعريف"]],['madd',['Prolongations (madd)','المدود']],['muet',['Lettres muettes','ما لا يُنطق']],['waqf',['Pauses (waqf)','الوقف']],['cas',['Cas particuliers','مواضع خاصة']],['makharij',['Articulation','المخارج والصفات']],['adab',['Avant de lire','آداب التلاوة']]];
function ruleCard(r) {
  return `<div class="card rule" style="--rc:var(--tj-${r.color || 'izhar'});margin-bottom:12px">
   <h3>${r.color ? `<span class="tj-${r.color}"><span class="dot"></span></span> ` : ''}${esc(L([r.fr, r.ar]))}${LANG === 'both' ? ` <span class="arsm">${esc(r.ar)}</span>` : ''}</h3>
   ${LANG !== 'ar' ? `<p style="margin:4px 0">${esc(r.dfr)}</p>` : ''}${LANG !== 'fr' ? `<p class="arb" style="margin:4px 0;color:var(--ink)">${esc(r.dar)}</p>` : ''}
   <div class="meta"><span>⏱ ${esc(L([r.hfr, r.har]))}</span><span><b>${r.count.toLocaleString('fr-FR')}</b> ${esc(L(['fois dans le Coran','موضعًا في القرآن']))}</span></div>
   ${r.ex.map(([ref, snip, s, e]) => `<div class="ex"><a class="ref" href="#${readHash(ref)}"><b>${ref}</b> · <span class="arsm">${esc(SURA[+ref.split(':')[0]][1])}</span></a><div class="qtext">${exampleHTML(snip, s, e, r.color)}</div></div>`).join('')}
  </div>`;
}
function viewRules(sec) {
  const tj = DATA.tj;
  const chips = `<div class="chips" style="margin-bottom:6px">${RSECS.map(([k, l]) => `<a class="chip" href="#regles-${k}" aria-pressed="${sec === k}" ${sec ? 'data-replace="1"' : ''}>${esc(L(l))}</a>`).join('')}</div>`;
  let h = '';
  if (!sec) {
    h = `<p class="lead">${esc(L(["Règles de la lecture de Ḥafṣ ʿan ʿĀṣim, telles que les notent les signes du muṣḥaf de Médine. Les exemples et les nombres d'occurrences sont détectés automatiquement dans le texte.","أحكام رواية حفص عن عاصم كما تدلّ عليها علامات مصحف المدينة. الأمثلة والأعداد مستخرجة آليًّا من النص."]))}</p>
     ${chips}
     <div class="card" style="margin:10px 0 16px"><b>${esc(L(['Couleurs du lecteur','ألوان القارئ']))}</b><div class="legendtj">${tj.legend.map(([c, fr, ar]) => `<span class="tj-${c}"><span class="dot"></span><span style="color:var(--ink)">${esc(L([fr, ar]))}</span></span>`).join('')}</div><div class="qtext">${verseHTML(DATA.tj.demo[1])}</div><p class="n" style="margin:0">${DATA.tj.demo[0]} · <a href="#lire-${DATA.tj.demo[0].replace(':', '-')}">${esc(L(['Ouvrir dans le lecteur','افتح في القارئ']))}</a></p></div>
     <div class="list">${RSECS.map(([k, l]) => listRow('regles-' + k, B(l), esc(L(DATA.tj.secdesc[k])))).join('')}</div>`;
    return { title: esc(L(['Règles de lecture','أحكام التلاوة'])), html: h };
  }
  const title = RSECS.find(x => x[0] === sec) || RSECS[0];
  h = chips + `<h2 style="margin-top:8px">${H2(title[1])}</h2><p class="lead">${esc(L(DATA.tj.secdesc[sec] || ['','']))}</p>`;
  if (sec === 'signes') h += `<div class="signs">${tj.signs.map(([g, fr, ar]) => `<div class="sign"><div class="g">${esc(g)}</div><b style="font-size:.9rem">${esc(L([fr, ar]))}</b>${LANG === 'both' ? `<span class="arsm">${esc(ar)}</span>` : ''}</div>`).join('')}</div>`;
  else if (sec === 'waqf') h += tj.waqf.map(w => `<div class="card" style="margin-bottom:12px"><div class="row"><span class="badge" style="font-family:var(--f-q);font-size:1.4rem;min-width:52px;height:46px">${esc(w.label)}</span><span style="flex:1"><b>${esc(L([w.fr, w.ar]))}</b>${LANG === 'both' ? ` <span class="arsm">${esc(w.ar)}</span>` : ''}<br><span class="n">${esc(w.dfr)} · ${w.count.toLocaleString('fr-FR')} ${esc(L(['fois','مرة']))}</span></span></div>${w.ex.map(([ref, snip, s, e]) => `<div class="ex"><a class="ref" href="#${readHash(ref)}"><b>${ref}</b></a><div class="qtext">${exampleHTML(snip, s, e, 'madd4')}</div></div>`).join('')}</div>`).join('') + `<div class="card"><b>${esc(L(["Comment s'arrêter","كيفية الوقف"]))}</b><ul style="margin:6px 0 0;padding-inline-start:20px">${tj.stoprules.map(x => `<li>${esc(L(x))}</li>`).join('')}</ul></div>`;
  else if (sec === 'cas') h += tj.special.map(r => `<div class="card" style="margin-bottom:12px"><h3>${esc(L([r.fr, r.ar]))}${LANG === 'both' ? ` <span class="arsm">${esc(r.ar)}</span>` : ''}</h3><p style="margin:4px 0">${esc(L([r.dfr, r.dar]))}</p><div class="meta n">${r.count} ${esc(L(['occurrence(s)','موضع']))}${r.refs.length <= 20 ? ' : ' + r.refs.map(x => `<a href="#${readHash(x)}">${x}</a>`).join(', ') : ''}</div>${r.ex.map(([ref, snip, s, e]) => `<div class="ex"><a class="ref" href="#${readHash(ref)}"><b>${ref}</b></a><div class="qtext">${exampleHTML(snip, s, e, 'madd4')}</div></div>`).join('')}</div>`).join('');
  else if (sec === 'makharij') h += `<div class="stack">${tj.makharij.map(m => `<div class="card"><div class="row" style="justify-content:space-between"><b>${esc(L([m[0], m[1]]))}</b><span style="font-family:var(--f-q);font-size:1.4rem;color:var(--gold);direction:rtl">${esc(m[4])}</span></div><p style="margin:4px 0" class="${LANG === 'ar' ? 'arb' : ''}">${esc(L([m[2], m[3]]))}</p></div>`).join('')}<div class="card"><b>${esc(L(['Lettres emphatiques','حروف التفخيم']))}</b><p style="margin:4px 0">${esc(L(tj.tafkhim))}</p></div></div>`;
  else if (sec === 'adab') h += `<div class="stack">${tj.adab.map(a => vcard({ ref: a[0], kw: a[1], note: a[2], sm: true })).join('')}</div>`;
  else h += tj.rules.filter(r => r.group === sec).map(ruleCard).join('');
  const i = RSECS.findIndex(x => x[0] === sec);
  h += `<div class="pager">${RSECS[i - 1] ? `<a class="btn" href="#regles-${RSECS[i - 1][0]}" data-replace="1">${ico('prev', 'sm flip')}${esc(L(RSECS[i - 1][1]))}</a>` : '<span></span>'}${RSECS[i + 1] ? `<a class="btn" href="#regles-${RSECS[i + 1][0]}" data-replace="1">${esc(L(RSECS[i + 1][1]))}${ico('next', 'sm flip')}</a>` : ''}</div>`;
  return { title: esc(L(title[1])), html: h };
}

/* ── Favoris */
function viewFavs() {
  const favs = [...FAVS].sort((a, b) => { const [x, y] = a.split(':').map(Number), [u, w] = b.split(':').map(Number); return x - u || y - w; });
  const notes = Object.entries(NOTES).filter(([, v]) => v && v.trim());
  let h = favs.length ? `<div class="stack">${favs.map(k => vcard({ ref: k, sm: true })).join('')}</div>` : `<p class="empty">${esc(L(["Aucun favori. Touchez l'étoile d'un verset pour l'ajouter.",'لا مفضلات بعد. المس النجمة لإضافة آية.']))}</p>`;
  if (notes.length) h += `<div class="sec">${B(['Mes réflexions','تأملاتي'])} <span class="n">${notes.length}</span></div><div class="list">${notes.map(([k, v]) => `<a href="#${readHash(k)}"><span class="badge">${ico('note', 'sm')}</span><span class="grow"><span class="t">${k}</span><span class="s">${esc(v.slice(0, 140))}</span></span></a>`).join('')}</div>`;
  return { title: esc(L(['Favoris','المفضلة'])), html: h };
}

/* ── Recherche globale */
let SQ = '';
function viewSearch() {
  return { title: esc(L(['Recherche','البحث'])), html: `<div class="search-top"><input class="field" id="gs" type="search" placeholder="${esc(L(['Sujet, personnage, question, mot arabe…','موضوع، شخصية، سؤال، لفظ…']))}" value="${esc(SQ)}" autocomplete="off" aria-label="Recherche"></div>
   <p class="n" id="gst">${esc(L(["Le français cherche dans les sujets, questions, personnages et explications ; l'arabe cherche dans les 6 236 versets.","العربية تبحث في ٦٢٣٦ آية."]))}</p><div id="gres"></div>`, after() {
    const inp = document.getElementById('gs'); let tm;
    const run = async () => {
      SQ = inp.value; const raw = SQ.trim(); const out = document.getElementById('gres'); if (raw.length < 2) { out.innerHTML = ''; return; }
      const isAr = /[؀-ۿ]/.test(raw); const q = fold(raw); let h = '';
      const sec = (t, items) => items.length ? `<div class="sec">${t} <span class="n">${items.length}</span></div><div class="list">${items.slice(0, 12).join('')}</div>` : '';
      const m = (...xs) => xs.some(x => x && (isAr ? norm(x).includes(norm(raw)) : fold(x).includes(q)));
      h += sec(B(['Sujets','الموضوعات']), DATA.tree.filter(t => t.p && m(t.fr, t.ar, t.sfr, t.sar)).map(t => listRow('t-' + t.id, esc(L([t.fr, t.ar])), esc(L([T[t.p].fr, T[t.p].ar])))));
      h += sec(B(['Questions','أسئلة']), DATA.qa.filter(x => m(x.qfr, x.qar, x.afr, x.aar)).map(x => listRow('q-' + x.id, esc(L([x.qfr, x.qar])), '')));
      h += sec(B(['Personnages','الشخصيات']), DATA.people.filter(p => m(p.fr, p.ar)).map(p => listRow('p-' + p.id, esc(L([p.fr, p.ar])), esc(L(CATS[p.cat])))));
      h += sec(B(['Lexique','المعجم']), DATA.lex.filter(l => m(l[0], l[1], l[3], l[4])).map(l => listRow('lexique', `${esc(l[1])} <span class="arsm">${esc(l[0])}</span>`, esc(L([l[3], l[4]])))));
      h += sec(B(['Règles de lecture','أحكام التلاوة']), DATA.tj.rules.filter(r => m(r.fr, r.ar, r.dfr)).map(r => listRow('regles-' + r.group, esc(L([r.fr, r.ar])), '')));
      h += sec(B(['Sourates','السور']), DATA.suras.filter(s => m(s[1], s[2]) || String(s[0]) === raw).map(s => listRow('lire-' + s[0], `${s[0]}. ${esc(s[2])}`, `<span class="arsm">${esc(s[1])}</span>`)));
      if (!isAr) { const notes = []; DATA.tree.forEach(t => t.refs.forEach(r => { if (fold(r[2]).includes(q)) notes.push(`<a class="hit" href="#t-${t.id}"><span class="ref"><b>${r[0]}</b> · ${esc(L([t.fr, t.ar]))}</span><div>${esc(r[2])}</div></a>`); }));
        h += notes.length ? `<div class="sec">${B(['Dans les explications','في الشروح'])} <span class="n">${notes.length}</span></div><div class="list">${notes.slice(0, 25).join('')}</div>` : ''; }
      else { await loadQ(); const k = norm(raw); const hits = []; QN.forEach((v, i) => { if (v.includes(k)) hits.push(i); });
        h += hits.length ? `<div class="sec">${B(['Versets','الآيات'])} <span class="n">${hits.length}</span></div><div class="list">${hits.slice(0, 80).map(i => { const v = QURAN[i]; return `<a class="hit" href="#lire-${v[0]}-${v[1]}"><span class="ref"><b>${v[0]}:${v[1]}</b> · <span class="arsm">${esc(SURA[v[0]][1])}</span></span><div class="qtext">${hl(v[2], raw)}</div></a>`; }).join('')}</div>` : ''; }
      if (SQ !== inp.value) return;
      out.innerHTML = h || `<p class="empty">${esc(L(['Aucun résultat.','لا نتائج.']))}</p>`;
    };
    inp.oninput = () => { clearTimeout(tm); tm = setTimeout(run, 220); };
    if (SQ) run(); setTimeout(() => { try { inp.focus(); } catch (e) {} }, 60);
  } };
}

/* ── Réglages */
function viewSettings() {
  const seg = (id, opts, cur) => `<div class="seg" id="${id}">${opts.map(([k, l]) => `<button data-v="${k}" aria-pressed="${String(cur) === String(k)}">${l}</button>`).join('')}</div>`;
  return { title: esc(L(['Réglages','الإعدادات'])), html: `<div class="stack">
   <div class="card"><b>${esc(L(['Langue','اللغة']))}</b><div style="margin-top:8px">${seg('s-lang', [['fr','Français'],['both','FR + ع'],['ar','العربية']], LANG)}</div></div>
   <div class="card"><b>${esc(L(['Thème','المظهر']))}</b><div style="margin-top:8px">${seg('s-theme', [['auto', esc(L(['Auto','تلقائي']))],['light', esc(L(['Clair','فاتح']))],['dark', esc(L(['Sombre','داكن']))]], THEME)}</div></div>
   <div class="card"><b>${esc(L(['Taille du texte arabe','حجم النص العربي']))}</b><div style="margin-top:8px">${seg('s-size', AR_SIZES.map((_, i) => [i, ['S','M','L','XL','XXL'][i]]), ARSIZE)}</div><div class="qtext" style="margin-top:6px">${verseHTML('ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ')}</div></div>
   <div class="card"><b>${esc(L(['Coloration du tajwīd dans le lecteur','ألوان التجويد في القارئ']))}</b><div style="margin-top:8px">${seg('s-tj', [['true', esc(L(['Activée','مفعّلة']))],['false', esc(L(['Désactivée','معطّلة']))]], TJ)}</div></div>
   <div class="card"><b>${esc(L(['Mes données','بياناتي']))}</b><p class="n" style="margin:4px 0 8px">${FAVS.size} ${esc(L(['favori(s)','مفضلة']))} · ${Object.values(NOTES).filter(v => v && v.trim()).length} ${esc(L(['réflexion(s)','تأمل']))}. ${esc(L(["Elles restent uniquement sur cet appareil.","تبقى على هذا الجهاز فقط."]))}</p><button class="btn" id="s-reset">${esc(L(['Tout effacer','مسح الكل']))}</button></div>
  </div>`, after() {
    const bind = (id, fn) => document.querySelectorAll('#' + id + ' button').forEach(b => b.onclick = () => fn(b.dataset.v));
    bind('s-lang', v => { setLang(v); render('reglages'); });
    bind('s-theme', v => { THEME = v; S.set('theme', v); applyTheme(); render('reglages'); });
    bind('s-size', v => { setAr(+v); render('reglages', window.pageYOffset); });
    bind('s-tj', v => { TJ = v === 'true'; S.set('tj', TJ); render('reglages', window.pageYOffset); });
    const r = document.getElementById('s-reset'); let armed = false;
    r.onclick = () => { if (!armed) { armed = true; r.textContent = L(['Toucher encore pour confirmer','المس مرة أخرى للتأكيد']); return; } FAVS = new Set(); NOTES = {}; LAST = null; S.set('favs', []); S.set('notes', {}); S.set('last', null); toast(L(['Données effacées','تم المسح'])); render('reglages'); };
  } };
}
function viewMethod() {
  const nR = DATA.tree.reduce((a, t) => a + t.refs.length, 0);
  const fr = `<div class="prose"><h3>Source unique</h3><p>Le texte arabe du Coran (114 sourates, 6 236 versets), écriture ʿuthmānī du muṣḥaf de Médine (lecture de Ḥafṣ), issu de l'Encyclopédie du Noble Coran via le paquet open source quran-json (licence CC BY 4.0). Aucun tafsīr ni aucune traduction existante n'a servi à construire l'arbre.</p>
   <h3>Le texte s'explique par lui-même</h3><p>Un verset est éclairé par son contexte et par les autres emplois de ses mots, comme le texte le demande (4:82, 39:23).</p>
   <h3>Contenu</h3><p>${roots.length} branches, ${DATA.tree.length - roots.length} sujets, ${nR} passages classés, ${DATA.qa.length} questions, ${DATA.people.length} personnages, ${DATA.lex.length} racines, ${DATA.tj.rules.length} règles de lecture.</p>
   <h3>Six natures</h3><table>${ORDER.map(k => `<tr><td class="t-${k}"><b>${TYPES[k][0]}</b></td><td>${TDESC[k][0]}</td></tr>`).join('')}</table>
   <h3>Règles de lecture</h3><p>Les règles de tajwīd sont celles de la lecture de Ḥafṣ ʿan ʿĀṣim. Elles ne viennent pas du sens du texte mais de la tradition de récitation, que le muṣḥaf note par ses signes. Les exemples et les comptes sont détectés automatiquement à partir de ces signes ; la coloration est une aide et ne remplace pas l'écoute d'un récitateur.</p>
   <h3>Contrôle</h3><p>Chaque référence est vérifiée automatiquement : le mot-clé surligné doit se trouver dans le verset cité.</p>
   <h3>Limites</h3><p>L'arbre est une sélection organisée, pas un index complet. Les lectures sont des propositions à discuter, pas des avis religieux.</p><p class="n">Version ${esc(DATA.version)}</p></div>`;
  const ar = `<div class="prose arb" style="color:var(--ink)"><p>المصدر الوحيد هو النص العربي للقرآن برسم المصحف (رواية حفص). أحكام التلاوة مأخوذة من رواية حفص عن عاصم كما تدل عليها علامات المصحف، والأمثلة مستخرجة آليًّا. هذه قراءات للنقاش لا فتاوى.</p></div>`;
  return { title: esc(L(['Méthode et sources','المنهج والمصادر'])), html: LANG === 'fr' ? fr : LANG === 'ar' ? ar : fr + ar };
}

/* ───────────────────────── Actions des cartes verset */
document.addEventListener('click', async e => {
  const sc = e.target.closest('[data-jump]'); if (sc) { const a = sc.dataset.jump; closeSheet(); const el = document.getElementById('v-' + a); if (el) { document.querySelectorAll('.verse.hi').forEach(x => x.classList.remove('hi')); el.classList.add('hi'); window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset - 130); } return; }
  const b = e.target.closest('button[data-a]'); if (!b) return;
  if (b.dataset.a === 'fav') { const k = b.dataset.ref; const on = !FAVS.has(k); setFav(k, on); b.setAttribute('aria-pressed', on); return; }
  const card = document.getElementById(b.dataset.c), o = CARDS[b.dataset.c], out = card.querySelector('.out');
  const was = b.getAttribute('aria-expanded') === 'true';
  card.querySelectorAll('button[data-a][aria-expanded]').forEach(x => x.setAttribute('aria-expanded', 'false'));
  if (was) { out.innerHTML = ''; return; }
  b.setAttribute('aria-expanded', 'true');
  if (b.dataset.a === 'med') { out.innerHTML = reflectHTML(rng(o.ref)[0], o.type); return; }
  out.innerHTML = `<div class="panel n">…</div>`; await loadQ();
  if (b.dataset.a === 'ctx') {
    const ks = rng(o.ref), first = QI[ks[0]], last = QI[ks[ks.length - 1]], s = QURAN[first][0]; let h = '';
    for (let i = Math.max(0, first - 3); i <= Math.min(QURAN.length - 1, last + 3); i++) { const v = QURAN[i]; if (v[0] !== s) continue; const cur = i >= first && i <= last; h += `<span class="${cur ? 'cur' : 'ctx'}">${cur ? hl(v[2], o.kw) : esc(v[2])}<span class="an">﴿${toAr(v[1])}﴾</span></span> `; }
    out.innerHTML = `<div class="panel"><div class="n">${esc(L(['Les versets avant et après, dans la même sourate.','ما قبل الآية وما بعدها في السورة نفسها.']))}</div><div class="qtext sm">${h}</div></div>`;
  } else {
    const w = o.kw.split(' ').sort((a, c) => norm(c).length - norm(a).length)[0]; const k = norm(w); const hits = []; QN.forEach((v, i) => { if (v.includes(k)) hits.push(i); });
    const own = new Set(rng(o.ref)); const others = hits.filter(i => !own.has(QURAN[i][0] + ':' + QURAN[i][1]));
    out.innerHTML = `<div class="panel"><div class="n">« ${esc(w)} » : ${hits.length} ${esc(L(['verset(s) dans tout le Coran.','آية في القرآن كله.']))}</div>` + (others.length ? others.slice(0, 10).map(i => { const v = QURAN[i]; return `<a class="hit" href="#lire-${v[0]}-${v[1]}" style="padding-inline:0"><span class="ref"><b>${v[0]}:${v[1]}</b> · <span class="arsm">${esc(SURA[v[0]][1])}</span></span><div class="qtext sm">${hl(v[2], w)}</div></a>`; }).join('') : `<p class="n">${esc(L(['Expression unique dans le texte.','تعبير فريد في النص.']))}</p>`) + `</div>`;
  }
});
document.addEventListener('input', e => { const t = e.target; if (t.dataset && t.dataset.note) { NOTES[t.dataset.note] = t.value; S.set('notes', NOTES); } });

/* ───────────────────────── Thème, langue, démarrage */
function applyTheme() {
  const r = document.documentElement;
  if (THEME === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', THEME);
  const dark = THEME === 'dark' || (THEME === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  const bg = dark ? '#111715' : '#f3f4ee';
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', bg));
  const C = window.Capacitor; if (C && C.Plugins && C.Plugins.StatusBar) { try { C.Plugins.StatusBar.setStyle({ style: dark ? 'DARK' : 'LIGHT' }); C.Plugins.StatusBar.setBackgroundColor({ color: bg }); } catch (e) {} }
}
function setLang(l) { LANG = l; S.set('lang', l); document.documentElement.lang = l === 'ar' ? 'ar' : 'fr'; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; }
function start() {
  setLang(LANG); applyTheme(); setAr(ARSIZE);
  document.getElementById('bk').onclick = () => back();
  document.getElementById('sr').onclick = () => go('recherche');
  document.getElementById('scrim').onclick = closeSheet;
  document.getElementById('shx').onclick = closeSheet;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && SHEET) closeSheet(); });
  if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (e) {} }
  /* Android : bouton retour matériel */
  const C = window.Capacitor;
  if (C && C.isNativePlatform && C.isNativePlatform()) {
    document.documentElement.classList.add('native');
    try { C.Plugins.App.addListener('backButton', () => { if (!back()) C.Plugins.App.exitApp(); }); } catch (e) {}
    try { C.Plugins.SplashScreen.hide(); } catch (e) {}
  }
  let h = ''; try { h = decodeURIComponent((location.hash || '').slice(1)); } catch (e) {}
  h = h || 'accueil';
  STACK = TABS.includes(h) ? [h] : ['accueil', h];
  try { history.replaceState({ h }, '', '#' + h); } catch (e) {}
  render(h);
}
start();

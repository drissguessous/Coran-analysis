/* ───────────────────────── Audio : écoute et apprentissage du tajwīd
   Ḥafṣ : verset par verset (texte synchronisé, répétition, pause pour répéter).
   Autres lectures : sourate entière, la numérotation de leurs versets différant de celle de Ḥafṣ. */
const AU = {
  rec: S.get('rec', 'husary-muallim'), rep: S.get('rep', 1), gap: S.get('gap', 0), rate: S.get('rate', 1),
  s: 0, a: 0, single: false, count: 0, on: false, waiting: null, mode: 'verse',
};
const REC = Object.fromEntries(DATA.audio.reciters.map(r => [r.id, r]));
const RIW = Object.fromEntries(DATA.audio.riwayat.map(r => [r.id, r]));
if (!REC[AU.rec]) AU.rec = 'husary-muallim';
const audioEl = () => document.getElementById('au');
const isHafs = id => REC[id] && REC[id].riw === 'hafs';
const pad3 = n => String(n).padStart(3, '0');
function srcFor(rec, s, a) {
  /* Fichier présent sur le téléphone (application Android) en priorité, sinon la source en ligne */
  return (typeof localFor === 'function' && localFor(rec, s, a)) || srcRemote(rec, s, a);
}
function srcRemote(rec, s, a) {
  const r = REC[rec];
  return r.riw === 'hafs' ? `https://everyayah.com/data/${r.dir}/${pad3(s)}${pad3(a)}.mp3` : `${r.dir}${pad3(s)}.mp3`;
}
function recName(id) { const r = REC[id]; return `${L([r.fr, r.ar])} · ${L([RIW[r.riw].fr, RIW[r.riw].ar])}`; }

function playVerse(s, a, opt = {}) {
  if (!isHafs(AU.rec)) { if (opt.single || opt.forceHafs) AU.rec = S.get('recHafs', 'husary-muallim'); else return playSura(s); }
  clearTimeout(AU.waiting); AU.waiting = null;
  AU.mode = 'verse'; AU.s = s; AU.a = a; AU.single = !!opt.single; AU.count = 0; AU.on = true;
  /* Basmala jouée avant le premier verset (sauf al-Fātiḥa, où elle est le verset 1, et at-Tawba) */
  AU.basmala = a === 1 && s !== 1 && s !== 9 && !opt.single && !opt.noBasmala;
  const el = audioEl(); el.src = AU.basmala ? srcFor(AU.rec, 1, 1) : srcFor(AU.rec, s, a); el.playbackRate = AU.rate;
  const p = el.play(); if (p && p.catch) p.catch(audioFail);
  showPlayer(); markPlaying(); mediaMeta();
}
function playSura(s) {
  clearTimeout(AU.waiting); AU.waiting = null;
  AU.mode = 'sura'; AU.s = s; AU.a = 0; AU.single = false; AU.on = true;
  const el = audioEl(); el.src = srcFor(AU.rec, s, 1); el.playbackRate = AU.rate;
  const p = el.play(); if (p && p.catch) p.catch(audioFail);
  showPlayer(); markPlaying(); mediaMeta();
}
function audioFail(e) {
  if (e && e.name === 'AbortError') return;
  AU.on = false; showPlayer();
  if (NATIVE) { toast(L(["Cette sourate n'est pas sur le téléphone et la connexion manque. Téléchargez-la dans « Écoute hors ligne ».", 'هذه السورة غير محمّلة ولا يوجد اتصال.'])); return; }
  toast(L(["Lecture impossible : vérifiez la connexion. La page claude.ai bloque les sons externes ; utilisez l'application ou le fichier HTML.", 'تعذّر التشغيل: تحقق من الاتصال.']));
}
function stopAudio() { clearTimeout(AU.waiting); AU.waiting = null; const el = audioEl(); el.pause(); el.removeAttribute('src'); try { el.load(); } catch (e) {} AU.on = false; AU.s = 0; showPlayer(); markPlaying(); }
function togglePlay() {
  const el = audioEl();
  if (!AU.s) return;
  if (AU.waiting) { clearTimeout(AU.waiting); AU.waiting = null; AU.on = false; showPlayer(); return; }
  if (el.paused) { const p = el.play(); if (p && p.catch) p.catch(audioFail); AU.on = true; } else { el.pause(); AU.on = false; }
  showPlayer();
}
function stepVerse(d) {
  if (AU.mode === 'sura') { const n = AU.s + d; if (SURA[n]) playSura(n); return; }
  const n = AU.a + d, max = SURA[AU.s][4];
  if (n >= 1 && n <= max) playVerse(AU.s, n, { single: AU.single });
}
function onEnded() {
  if (AU.mode === 'sura') { AU.on = false; showPlayer(); return; }
  if (AU.basmala) { playVerse(AU.s, 1, { noBasmala: true }); return; }
  AU.count++;
  const el = audioEl(); const dur = (el.duration || 4) * 1000 / AU.rate;
  const again = AU.rep === 0 || AU.count < AU.rep;
  const next = () => {
    AU.waiting = null;
    if (again) { el.currentTime = 0; const p = el.play(); if (p && p.catch) p.catch(audioFail); showPlayer(); return; }
    if (AU.single || AU.a >= SURA[AU.s][4]) { AU.on = false; showPlayer(); markPlaying(); return; }
    playVerse(AU.s, AU.a + 1);
  };
  if (AU.gap) { AU.waiting = setTimeout(next, Math.min(dur, 30000)); showPlayer(true); } else next();
}
function markPlaying() {
  document.querySelectorAll('.verse.playing').forEach(v => v.classList.remove('playing'));
  if (!AU.s || AU.mode !== 'verse' || !CUR.startsWith('lire-' + AU.s)) return;
  const el = document.getElementById('v-' + AU.a); if (!el) return;
  el.classList.add('playing');
  const r = el.getBoundingClientRect(); const top = 120, bottom = window.innerHeight - 150;
  if (r.top < top || r.bottom > bottom) window.scrollTo({ top: r.top + window.pageYOffset - 130, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
function mediaMeta() {
  if (!('mediaSession' in navigator) || !AU.s) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({ title: `${SURA[AU.s][2]}${AU.mode === 'verse' ? ' · ' + AU.a : ''}`, artist: REC[AU.rec].fr, album: RIW[REC[AU.rec].riw].fr });
    navigator.mediaSession.setActionHandler('play', togglePlay); navigator.mediaSession.setActionHandler('pause', togglePlay);
    navigator.mediaSession.setActionHandler('previoustrack', () => stepVerse(-1)); navigator.mediaSession.setActionHandler('nexttrack', () => stepVerse(1));
  } catch (e) {}
}
const REPS = [1, 3, 5, 0], RATES = [0.75, 1, 1.25];
function showPlayer(waiting) {
  const p = document.getElementById('player');
  if (!AU.s) { p.hidden = true; document.body.classList.remove('has-player'); return; }
  p.hidden = false; document.body.classList.add('has-player');
  const el = audioEl(); const playing = AU.on && !el.paused;
  const ref = AU.mode === 'verse' ? `${AU.s}:${AU.a}` : `${SURA[AU.s][2]} · ${L(['sourate entière', 'السورة كاملة'])}`;
  p.innerHTML = `<div class="pl-top"><button class="pl-rec" data-pa="rec">${ico('book', 'sm')}<span><b>${esc(ref)}</b><br><span class="n">${esc(recName(AU.rec))}</span></span></button><button class="ib" data-pa="close" aria-label="${esc(L(['Fermer', 'إغلاق']))}">${ico('close', 'sm')}</button></div>
   ${waiting ? `<div class="pl-wait">${esc(L(['À vous : répétez le verset…', 'دورك: ردّد الآية…']))}</div>` : ''}
   <div class="pl-ctl">
     <button class="ib" data-pa="prev" aria-label="Précédent">${ico('prev', 'sm flip')}</button>
     <button class="pl-play" data-pa="toggle" aria-label="${playing ? 'Pause' : 'Lecture'}">${playing || waiting ? '<svg class="i" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>' : '<svg class="i" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="currentColor"/></svg>'}</button>
     <button class="ib" data-pa="next" aria-label="Suivant">${ico('next', 'sm flip')}</button>
     ${AU.mode === 'verse' ? `<button class="chip" data-pa="rep" aria-label="Répétitions">↻ ${AU.rep === 0 ? '∞' : '×' + AU.rep}</button>
     <button class="chip" data-pa="gap" aria-pressed="${!!AU.gap}">${esc(L(['Pause pour répéter', 'وقفة للترديد']))}</button>` : ''}
     <button class="chip" data-pa="rate">${AU.rate}×</button>
   </div>`;
}
document.addEventListener('click', e => {
  const pa = e.target.closest('[data-pa]');
  if (pa) {
    const a = pa.dataset.pa;
    if (a === 'toggle') togglePlay(); else if (a === 'prev') stepVerse(-1); else if (a === 'next') stepVerse(1); else if (a === 'close') stopAudio();
    else if (a === 'rep') { AU.rep = REPS[(REPS.indexOf(AU.rep) + 1) % REPS.length]; S.set('rep', AU.rep); AU.count = 0; showPlayer(); }
    else if (a === 'gap') { AU.gap = AU.gap ? 0 : 1; S.set('gap', AU.gap); showPlayer(); }
    else if (a === 'rate') { AU.rate = RATES[(RATES.indexOf(AU.rate) + 1) % RATES.length]; S.set('rate', AU.rate); audioEl().playbackRate = AU.rate; showPlayer(); }
    else if (a === 'rec') reciterSheet();
    return;
  }
  const pv = e.target.closest('[data-play]');
  if (pv) { e.preventDefault(); const [s, a] = pv.dataset.play.split(':').map(x => parseInt(x, 10)); playVerse(s, a, { single: pv.dataset.single === '1' }); return; }
  const ps = e.target.closest('[data-playsura]');
  if (ps) { e.preventDefault(); const [rid, s] = ps.dataset.playsura.split('|'); setRec(rid); isHafs(rid) ? playVerse(+s, 1) : playSura(+s); closeSheet(); return; }
  const pr = e.target.closest('[data-setrec]');
  if (pr) { setRec(pr.dataset.setrec); closeSheet(); if (AU.s) (isHafs(AU.rec) ? playVerse(AU.s, AU.a || 1, { single: AU.single }) : playSura(AU.s)); else toast(recName(AU.rec)); if (CUR.startsWith('lire-')) render(CUR, window.pageYOffset); }
});
function setRec(id) { if (!REC[id]) return; AU.rec = id; S.set('rec', id); if (isHafs(id)) S.set('recHafs', id); }
function reciterSheet() {
  const groups = DATA.audio.riwayat.map(w => { const rs = DATA.audio.reciters.filter(r => r.riw === w.id); if (!rs.length) return '';
    return `<div class="sec" style="margin-top:14px">${B([w.fr, w.ar])} <span class="q">${w.id === 'hafs' ? esc(L(['verset par verset', 'آية آية'])) : esc(L(['sourate entière', 'السورة كاملة']))}</span></div><div class="list">${rs.map(r => `<button data-setrec="${r.id}"><span class="badge" style="${r.id === AU.rec ? 'background:var(--lapis);color:var(--lapis-ink)' : ''}">${r.id === AU.rec ? '✓' : (r.learn ? '★' : '♪')}</span><span class="grow"><span class="t">${esc(L([r.fr, r.ar]))}${LANG === 'both' ? ` <span class="arsm">${esc(r.ar)}</span>` : ''}</span><span class="s">${esc(r.style)}${r.note ? ' · ' + esc(r.note) : ''}</span></span></button>`).join('')}</div>`; }).join('');
  openSheet(esc(L(['Choisir une récitation', 'اختيار التلاوة'])), `<p class="n">${esc(L(["★ conseillé pour apprendre. En Ḥafṣ, chaque verset est joué séparément et suit le texte ; les autres lectures se jouent par sourate entière.", '★ مناسب للتعلّم.']))}</p>${groups}`);
}
function qiraatHTML() {
  const a = DATA.audio;
  return `<p class="lead">${esc(L(a.intro))}</p>` + a.riwayat.map(w => { const rs = a.reciters.filter(r => r.riw === w.id);
    return `<div class="card" style="margin-bottom:12px"><h3>${esc(L([w.fr, w.ar]))}${LANG === 'both' ? ` <span class="arsm">${esc(w.ar)}</span>` : ''} <span class="n">· ${esc(w.city)}</span></h3>
     <p style="margin:4px 0">${esc(L([w.dfr, w.dar]))}</p>
     ${w.traits.length && LANG !== 'ar' ? `<ul style="margin:6px 0;padding-inline-start:20px">${w.traits.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
     <div class="chips" style="margin-top:6px">${rs.map(r => `<button class="chip" data-playsura="${r.id}|1">▶ ${esc(L([r.fr, r.ar]))}</button>`).join('')}</div>
     <p class="n" style="margin:4px 0 0">${esc(L(['Les boutons font écouter al-Fātiḥa. Choisissez ensuite une autre sourate dans « Lire ».', 'تُسمِع الأزرار سورة الفاتحة.']))}</p></div>`; }).join('');
}
function initAudio() {
  const el = audioEl();
  el.addEventListener('ended', onEnded);
  el.addEventListener('error', () => { if (AU.s && el.getAttribute('src')) audioFail(); });
  el.addEventListener('play', () => { AU.on = true; showPlayer(); });
  el.addEventListener('pause', () => { if (!AU.waiting && !el.ended) { AU.on = false; showPlayer(); } });
}

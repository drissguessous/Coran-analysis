/* ───────────────────────── Écoute hors ligne (application Android)
   Les récitations sont téléchargées sur le téléphone depuis leur source, puis lues sans connexion.
   Dans la page web, elles restent lues en ligne. */
const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const FSP = () => window.Capacitor.Plugins.Filesystem;
let DL = S.get('dl', {});            // { récitant: { sourate: octets, b: true si basmala } }
let LOCALBASE = null;                 // URI du dossier audio sur le téléphone
let JOB = null;                       // téléchargement en cours
let WIFIONLY = S.get('wifionly', true);
const JUZ_AMMA = Array.from({ length: 37 }, (_, i) => 78 + i);

function relPath(rec, s, a) { return isHafs(rec) ? `audio/${rec}/${pad3(s)}${pad3(a)}.mp3` : `audio/${rec}/${pad3(s)}.mp3`; }
function isDone(rec, s) { return !!(DL[rec] && DL[rec][s]); }
function localURL(rec, s, a) { return LOCALBASE ? window.Capacitor.convertFileSrc(LOCALBASE + '/' + relPath(rec, s, a).slice(6)) : null; }
function localFor(rec, s, a) {
  if (!NATIVE || !LOCALBASE) return null;
  if (isHafs(rec) && s === 1 && a === 1 && DL[rec] && DL[rec].b) return localURL(rec, 1, 1);
  return isDone(rec, s) ? localURL(rec, s, a) : null;
}
function usedBytes(rec) { const d = DL[rec] || {}; return Object.keys(d).filter(k => k !== 'b').reduce((t, k) => t + (d[k] || 0), 0); }
const fmtMB = b => b >= 1e9 ? (b / 1e9).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' Go' : Math.max(1, Math.round(b / 1e6)) + ' Mo';
function estimate(rec, suras) {
  const r = REC[rec]; const w = DATA.audio.weights;
  const total = r.kbps * 450 * 1000 * (DATA.audio.hours[r.style] || 24); // 1 kbps·h ≈ 450 Ko
  return suras.reduce((t, s) => t + total * w[s - 1], 0);
}
async function initOffline() {
  if (!NATIVE) return;
  try { const r = await FSP().getUri({ path: 'audio', directory: 'DATA' }); LOCALBASE = r.uri.replace(/\/$/, ''); } catch (e) {}
}
async function connection() {
  try { const st = await window.Capacitor.Plugins.Network.getStatus(); return st; } catch (e) { return { connected: navigator.onLine, connectionType: 'unknown' }; }
}

/* File de téléchargement : 4 fichiers à la fois, reprise possible (les fichiers déjà présents sont sautés) */
async function startDownload(rec, suras, force) {
  if (!NATIVE) { toast(L(["Le téléchargement est disponible dans l'application Android.", 'التحميل متاح في تطبيق أندرويد.'])); return; }
  if (JOB) { toast(L(['Un téléchargement est déjà en cours.', 'هناك تحميل جارٍ.'])); return; }
  suras = suras.filter(s => !isDone(rec, s));
  if (!suras.length) { toast(L(['Déjà disponible hors ligne.', 'متاح دون اتصال.'])); return; }
  const net = await connection();
  if (!net.connected) { toast(L(['Pas de connexion : le téléchargement demande Internet.', 'لا يوجد اتصال.'])); return; }
  const est = estimate(rec, suras);
  if (WIFIONLY && net.connectionType !== 'wifi' && !force) {
    openSheet(esc(L(['Données mobiles', 'بيانات الجوال'])), `<p>${esc(L([`Vous n'êtes pas en Wi-Fi. Ce téléchargement pèse environ ${fmtMB(est)}.`, `لست على شبكة Wi-Fi. الحجم التقريبي ${fmtMB(est)}.`]))}</p>
      <div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri" data-dlforce="${rec}|${suras.join(',')}">${esc(L(['Télécharger quand même', 'التحميل رغم ذلك']))}</button><button class="btn" data-go="__back">${esc(L(['Attendre le Wi-Fi', 'انتظار Wi-Fi']))}</button></div>`);
    return;
  }
  const files = [];
  if (isHafs(rec)) {
    if (!(DL[rec] && DL[rec].b) && !suras.includes(1) && suras.some(s => s !== 9)) files.push({ s: 0, a: 1, basmala: true });
    suras.forEach(s => { for (let a = 1; a <= SURA[s][4]; a++) files.push({ s, a }); });
  } else suras.forEach(s => files.push({ s, a: 0 }));
  const left = {}; files.forEach(f => { if (f.s) left[f.s] = (left[f.s] || 0) + 1; });
  JOB = { rec, suras, files, i: 0, done: 0, failed: 0, bytes: {}, left, total: files.length, paused: false, stop: false, est };
  drawJob();
  const worker = async () => {
    while (JOB && !JOB.stop && !JOB.paused && JOB.i < JOB.files.length) {
      const f = JOB.files[JOB.i++];
      const s = f.basmala ? 1 : f.s, a = f.basmala ? 1 : f.a;
      const path = relPath(rec, s, a);
      let size = 0, ok = false;
      for (let t = 0; t < 2 && !ok; t++) {
        try {
          try { const st = await FSP().stat({ path, directory: 'DATA' }); if (st.size > 0) { size = st.size; ok = true; break; } } catch (e) {}
          await FSP().downloadFile({ url: srcRemote(rec, s, a), path, directory: 'DATA', recursive: true });
          const st = await FSP().stat({ path, directory: 'DATA' }); size = st.size; ok = size > 0;
        } catch (e) { ok = false; }
      }
      if (!JOB) return;
      if (ok) {
        JOB.done++;
        if (f.basmala) { DL[rec] = DL[rec] || {}; DL[rec].b = true; S.set('dl', DL); }
        else { JOB.bytes[f.s] = (JOB.bytes[f.s] || 0) + size; if (--JOB.left[f.s] === 0) { DL[rec] = DL[rec] || {}; DL[rec][f.s] = JOB.bytes[f.s]; if (f.s === 1 && isHafs(rec)) DL[rec].b = true; S.set('dl', DL); } }
      } else JOB.failed++;
      drawJob();
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  if (!JOB) return;
  const j = JOB; JOB = null;
  if (j.paused) { PAUSED = { rec: j.rec, suras: j.suras }; drawJob(); return; }
  PAUSED = null;
  toast(j.failed ? L([`Terminé avec ${j.failed} fichier(s) en échec : relancez pour compléter.`, `انتهى مع ${j.failed} ملف فاشل.`]) : L(['Téléchargement terminé : écoute hors ligne disponible.', 'اكتمل التحميل.']));
  if (CUR === 'horsligne' || CUR.startsWith('lire-')) render(CUR, window.pageYOffset);
}
let PAUSED = null;
function drawJob() {
  const box = document.getElementById('jobbox'); if (!box) return;
  if (!JOB && !PAUSED) { box.innerHTML = ''; return; }
  if (!JOB && PAUSED) { box.innerHTML = `<div class="card row" style="justify-content:space-between;flex-wrap:wrap;gap:8px"><span>${esc(L(['Téléchargement en pause.', 'التحميل متوقف.']))}</span><button class="btn pri" data-dlresume="1">${esc(L(['Reprendre', 'استئناف']))}</button></div>`; return; }
  const pct = Math.round(JOB.done / JOB.total * 100);
  const cur = JOB.files[Math.min(JOB.i, JOB.files.length - 1)];
  box.innerHTML = `<div class="card"><div class="row" style="justify-content:space-between"><b>${esc(L([REC[JOB.rec].fr, REC[JOB.rec].ar]))}</b><span class="n">${pct} %</span></div>
    <div class="dlbar"><span style="width:${pct}%"></span></div>
    <p class="n" style="margin:4px 0 8px">${JOB.done} / ${JOB.total} ${esc(L(['fichiers', 'ملف']))}${cur && cur.s ? ' · ' + esc(SURA[cur.s][2]) : ''}${JOB.failed ? ' · ' + JOB.failed + ' ' + esc(L(['échec(s)', 'فشل'])) : ''} · ${esc(L(["gardez l'application ouverte", 'أبقِ التطبيق مفتوحًا']))}</p>
    <div class="row" style="gap:8px"><button class="btn" data-dlpause="1">${esc(L(['Pause', 'إيقاف مؤقت']))}</button><button class="btn" data-dlcancel="1">${esc(L(['Annuler', 'إلغاء']))}</button></div></div>`;
}
async function deleteSura(rec, s) {
  try {
    if (isHafs(rec)) { for (let a = 1; a <= SURA[s][4]; a++) { try { await FSP().deleteFile({ path: relPath(rec, s, a), directory: 'DATA' }); } catch (e) {} } }
    else await FSP().deleteFile({ path: relPath(rec, s, 0), directory: 'DATA' });
  } catch (e) {}
  if (DL[rec]) { delete DL[rec][s]; S.set('dl', DL); }
}
async function deleteRec(rec) {
  try { await FSP().rmdir({ path: `audio/${rec}`, directory: 'DATA', recursive: true }); } catch (e) {}
  delete DL[rec]; S.set('dl', DL);
}
document.addEventListener('click', async e => {
  const t = e.target.closest('[data-dl],[data-dlforce],[data-dlpause],[data-dlcancel],[data-dlresume],[data-dlsura],[data-dldel],[data-dldelrec],[data-wifi]');
  if (!t) return;
  e.preventDefault();
  if (t.dataset.dl) { const [rec, list] = t.dataset.dl.split('|'); startDownload(rec, list.split(',').map(Number)); }
  else if (t.dataset.dlforce) { closeSheet(); const [rec, list] = t.dataset.dlforce.split('|'); startDownload(rec, list.split(',').map(Number), true); }
  else if (t.dataset.dlpause && JOB) { JOB.paused = true; drawJob(); }
  else if (t.dataset.dlcancel && JOB) { JOB.stop = true; JOB = null; PAUSED = null; drawJob(); render(CUR, window.pageYOffset); }
  else if (t.dataset.dlresume && PAUSED) { const p = PAUSED; PAUSED = null; startDownload(p.rec, p.suras, true); }
  else if (t.dataset.dlsura) {
    const s = +t.dataset.dlsura, rec = AU.rec;
    if (isDone(rec, s)) openSheet(esc(SURA[s][2]), `<p>${esc(L([`Disponible hors ligne (${fmtMB(DL[rec][s])}).`, `متاحة دون اتصال (${fmtMB(DL[rec][s])}).`]))}</p><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri" data-play="${s}:1">▶ ${esc(L(['Écouter', 'استمع']))}</button><button class="btn" data-dldel="${rec}|${s}">${esc(L(['Supprimer du téléphone', 'حذف من الهاتف']))}</button></div>`);
    else startDownload(rec, [s]);
  }
  else if (t.dataset.dldel) { const [rec, s] = t.dataset.dldel.split('|'); await deleteSura(rec, +s); closeSheet(); render(CUR, window.pageYOffset); }
  else if (t.dataset.dldelrec) { const rec = t.dataset.dldelrec; if (t.dataset.armed) { await deleteRec(rec); toast(L(['Supprimé', 'حُذف'])); render(CUR, window.pageYOffset); } else { t.dataset.armed = '1'; t.textContent = L(['Toucher encore pour confirmer', 'المس مرة أخرى للتأكيد']); } }
  else if (t.dataset.wifi) { WIFIONLY = !WIFIONLY; S.set('wifionly', WIFIONLY); render(CUR, window.pageYOffset); }
});

function viewOffline() {
  if (!NATIVE) {
    return { title: esc(L(['Écoute hors ligne', 'الاستماع دون اتصال'])), html: `<div class="card"><p style="margin-top:0">${esc(L(["Dans l'application Android, vous pouvez télécharger les récitations (une sourate, le juz' ʿAmma ou tout le Coran) et les écouter ensuite sans connexion.", 'في تطبيق أندرويد يمكنك تحميل التلاوات والاستماع إليها دون اتصال.']))}</p><p>${esc(L(['Dans cette page web, les récitations sont lues en ligne depuis leur source.', 'في هذه الصفحة تُشغَّل التلاوات عبر الإنترنت.']))}</p><a class="btn pri" href="https://github.com/drissguessous/Coran-analysis/releases/latest/download/Tadabbur.apk" target="_blank" rel="noopener">${esc(L(["Télécharger l'application Android", 'تحميل تطبيق أندرويد']))}</a></div>` };
  }
  const rec = AU.rec, r = REC[rec];
  const all = DATA.suras.map(s => s[0]);
  const doneN = all.filter(s => isDone(rec, s)).length;
  const opts = [
    [[1, ...JUZ_AMMA], ["al-Fātiḥa et le juz' ʿAmma", "الفاتحة وجزء عمّ"], ['Les sourates courtes, idéales pour apprendre', 'السور القصار']],
    [[1, 2, 3], ['al-Fātiḥa, al-Baqara, Āl ʿImrān', 'الفاتحة والبقرة وآل عمران'], ['', '']],
    [all, ['Tout le Coran', 'القرآن كاملًا'], ['114 sourates', '١١٤ سورة']],
  ];
  if (LAST && SURA[LAST[0]]) opts.unshift([[LAST[0]], [`Sourate en cours : ${SURA[LAST[0]][2]}`, `السورة الحالية: ${SURA[LAST[0]][1]}`], ['', '']]);
  const others = Object.keys(DL).filter(k => k !== rec && REC[k] && usedBytes(k) > 0);
  const html = `<div class="card"><div class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><span><span class="n">${esc(L(['Récitation', 'التلاوة']))}</span><br><b>${esc(recName(rec))}</b></span><button class="btn" data-pa="rec">${esc(L(['Changer', 'تغيير']))}</button></div>
     <p class="n" style="margin:8px 0 0">${doneN} / 114 ${esc(L(['sourates sur le téléphone', 'سورة على الهاتف']))} · ${fmtMB(usedBytes(rec))}</p></div>
   <div id="jobbox" style="margin-top:12px"></div>
   <div class="sec">${B(['Télécharger', 'تحميل'])}</div>
   <div class="list">${opts.map(([list, t, d]) => { const miss = list.filter(s => !isDone(rec, s)); return `<button data-dl="${rec}|${list.join(',')}" ${miss.length ? '' : 'disabled'}><span class="badge">${miss.length ? '↓' : '✓'}</span><span class="grow"><span class="t">${esc(L(t))}</span><span class="s">${miss.length ? '≈ ' + fmtMB(estimate(rec, miss)) : esc(L(['Disponible hors ligne', 'متاح دون اتصال']))}${d[0] ? ' · ' + esc(L(d)) : ''}</span></span></button>`; }).join('')}</div>
   <div class="card row" style="margin-top:12px;justify-content:space-between;gap:8px"><span>${esc(L(['Télécharger seulement en Wi-Fi', 'التحميل عبر Wi-Fi فقط']))}</span><button class="btn" data-wifi="1" aria-pressed="${WIFIONLY}">${WIFIONLY ? esc(L(['Oui', 'نعم'])) : esc(L(['Non', 'لا']))}</button></div>
   <div class="sec">${B(['Sourate par sourate', 'سورة سورة'])} <span class="q">${esc(L(['✓ sur le téléphone · touchez pour télécharger ou supprimer', '✓ محمّلة']))}</span></div>
   <div class="sgrid">${all.map(s => `<button data-dlsura="${s}" class="${isDone(rec, s) ? 'on' : ''}" title="${esc(SURA[s][2])}">${s}</button>`).join('')}</div>
   ${usedBytes(rec) ? `<p style="margin-top:14px"><button class="btn" data-dldelrec="${rec}">${esc(L([`Supprimer toutes les sourates de ce récitant (${fmtMB(usedBytes(rec))})`, 'حذف كل سور هذا القارئ']))}</button></p>` : ''}
   ${others.length ? `<div class="sec">${B(['Autres récitants sur le téléphone', 'قرّاء آخرون على الهاتف'])}</div><div class="list">${others.map(k => `<div class="li"><span class="grow"><span class="t">${esc(recName(k))}</span><span class="s">${Object.keys(DL[k]).filter(x => x !== 'b').length} ${esc(L(['sourates', 'سورة']))} · ${fmtMB(usedBytes(k))}</span></span><button class="btn" data-dldelrec="${k}">${esc(L(['Supprimer', 'حذف']))}</button></div>`).join('')}</div>` : ''}
   <p class="n" style="margin-top:16px">${esc(L(["Les fichiers sont téléchargés depuis leur source (everyayah.com, mp3quran.net) et restent sur ce téléphone pour votre usage personnel. Ils sont supprimés si vous désinstallez l'application.", 'تُحمَّل الملفات من مصادرها وتبقى على هذا الهاتف للاستخدام الشخصي.']))}</p>`;
  return { title: esc(L(['Écoute hors ligne', 'الاستماع دون اتصال'])), html, after: drawJob };
}

// ════════════════════════════════════════════════════════
//  KONFIGURATION
//
//  Sets werden automatisch aus der Kartenliste erkannt.
//  Nur Ausschlüsse und Metadaten müssen hier gepflegt werden.
// ════════════════════════════════════════════════════════

// Muster die AUSGESCHLOSSEN werden (Regex gegen den Set-Namen).
// Blitz Decks, Armory, History Packs, Promos usw.
const AUSSCHLUSS_MUSTER = [
  /blitz deck/i,
  /armory deck/i,
  /history pack/i,
  /promo/i,
  /demo deck/i,
  /hero deck/i,
  /starter deck/i,
  /classic battle/i,
  /tournament pack/i,
  /draft pack/i,
  /sealed deck/i,
  /welcome deck/i,
  /^token/i,
  /archive.*(pack|mastery)/i,
  /mastery pack/i,
  /first strike/i,
  /round the table/i,
  /slingshot/i,
  /smash palace/i,
  /gem pack/i,
  /convention exclusive/i,
];

// First-Edition-Sets (nicht mehr im Druck).
// Neue First-Ed Sets hier ergänzen wenn LSS eines veröffentlicht.
const FIRST_ED = new Set([
  'Welcome to Rathe - Alpha',
  'Arcane Rising - First',
  'Crucible of War - First',
  'Monarch - First',
  'Tales of Aria - First',
  'Everfest - First',
]);

// Zusammengehörige Sets (First + Unlimited → eine Gruppe).
// Neue Paare hier ergänzen wenn nötig.
const SET_GRUPPE = {
  'Welcome to Rathe - Alpha':             'Welcome to Rathe',
  'Welcome to Rathe - Unlimited':         'Welcome to Rathe',
  'Arcane Rising - First':                'Arcane Rising',
  'Arcane Rising - Unlimited':            'Arcane Rising',
  'Crucible of War - First':              'Crucible of War',
  'Crucible of War - Unlimited':          'Crucible of War',
  'Monarch - First':                      'Monarch',
  'Monarch - Unlimited':                  'Monarch',
  'Tales of Aria - First':                'Tales of Aria',
  'Tales of Aria - Unlimited':            'Tales of Aria',
  'Compendium Of Rathe':                  'Compendium of Rathe',
  'Compendium of Rathe - Antiquity Pack': 'Compendium of Rathe',
};

// Optionale Kurznamen für Set-Buttons (max ~12 Zeichen).
// Nicht eingetragene Sets bekommen einen auto-generierten Kurznamen.
const SET_SHORT_OVERRIDE = {
  'Welcome to Rathe - Alpha':             'WTR Alpha',
  'Welcome to Rathe - Unlimited':         'WTR Unlimited',
  'Arcane Rising - First':                'ARC First',
  'Arcane Rising - Unlimited':            'ARC Unlimited',
  'Crucible of War - First':              'CRU First',
  'Crucible of War - Unlimited':          'CRU Unlimited',
  'Monarch - First':                      'MON First',
  'Monarch - Unlimited':                  'MON Unlimited',
  'Tales of Aria - First':                'ELE First',
  'Tales of Aria - Unlimited':            'ELE Unlimited',
  'Everfest - First':                     'EVR First',
  'Compendium Of Rathe':                  'Compendium',
  'Compendium of Rathe - Antiquity Pack': 'COM Antiquity',
};

// Optionale Excel-Tab-Namen (max 31 Zeichen).
// Nicht eingetragene Sets bekommen einen auto-generierten Tab-Namen.
const SET_TABNAME_OVERRIDE = {
  'Welcome to Rathe - Alpha':             'WTR - Alpha',
  'Welcome to Rathe - Unlimited':         'WTR - Unlimited',
  'Arcane Rising - First':                'ARC - First',
  'Arcane Rising - Unlimited':            'ARC - Unlimited',
  'Crucible of War - First':              'CRU - First',
  'Crucible of War - Unlimited':          'CRU - Unlimited',
  'Monarch - First':                      'MON - First',
  'Monarch - Unlimited':                  'MON - Unlimited',
  'Tales of Aria - First':                'ELE - First',
  'Tales of Aria - Unlimited':            'ELE - Unlimited',
  'Everfest - First':                     'EVR - First',
  'Compendium Of Rathe':                  'Compendium of Rathe',
  'Compendium of Rathe - Antiquity Pack': 'Compendium - Antiquity',
};

// ── Hilfsfunktionen für auto-generierte Namen ─────────
function setShort(name) {
  if (SET_SHORT_OVERRIDE[name]) return SET_SHORT_OVERRIDE[name];
  // Kürze bekannte Suffixe automatisch
  return name
    .replace(' - Unlimited', ' Unl.')
    .replace(' - First',     ' 1st')
    .replace(' - Alpha',     ' Alpha')
    .slice(0, 16);
}

function setTabName(name) {
  if (SET_TABNAME_OVERRIDE[name]) return SET_TABNAME_OVERRIDE[name];
  return name.slice(0, 31);
}

function istAusgeschlossen(setName) {
  return AUSSCHLUSS_MUSTER.some(p => p.test(setName));
}

function istHauptset(setName, kartenProSet) {
  if (/promo/i.test(setName)) return false;
  return (kartenProSet.get(setName) || 0) > 120;
}

// ════════════════════════════════════════════════════════
//  FOIL-KLASSIFIZIERUNG
//  Jede Karte bekommt einen foilType: 'none'|'rainbow'|'cold'
// ════════════════════════════════════════════════════════
function getFoilType(name) {
  if (!name) return 'none';
  // Cold Foil (inkl. Extended Art Cold Foil, Cold Foil Golden)
  if (/cold foil/i.test(name)) return 'cold';
  // Rainbow Foil (inkl. Extended Art Rainbow Foil, Alternate Art Rainbow Foil)
  if (/rainbow foil/i.test(name)) return 'rainbow';
  // Reverse Foil (selten, als eigene Gruppe)
  if (/reverse foil/i.test(name)) return 'cold';
  return 'none';
}

// ════════════════════════════════════════════════════════
//  SELTENHEITS-FARBEN
// ════════════════════════════════════════════════════════
const RARITY_COLOR = {
  'Common':     'var(--common)',
  'Rare':       'var(--rare)',
  'Majestic':   'var(--majestic)',
  'Super Rare': 'var(--super-rare)',
  'Legendary':  'var(--legendary)',
  'Fabled':     'var(--fabled)',
  'Marvel':     'var(--marvel)',
  'Token':      'var(--text-muted)',
  'Promo':      'var(--promo)',
};
function rarityColor(r) { return RARITY_COLOR[r] || 'var(--text-dim)'; }

// ════════════════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════════════════
const S = {
  kartenCSV: null, invCSV: null, result: null,
  sektion:    'haupt',
  tab:        { haupt:'ranking', andere:'ranking' },
  activeSet:  { haupt:null,      andere:null      },
  search:     { haupt:'',        andere:''        },

  // Filter — Standard: Common+Rare aktiv, alle anderen aus, keine Foils
  f: {
    Common:     true,
    Rare:       true,
    Majestic:   false,
    'Super Rare': false,
    Legendary:  false,
    Fabled:     false,
    Marvel:     false,
    Token:      false,
    Promo:      false,
    rainbow:    false,   // Rainbow Foil ein/aus
    cold:       false,   // Cold Foil ein/aus
  },

  sortCol:     'fehlend_gesamt', sortDir:    -1,
  cardSortCol: 'name',           cardSortDir: 1,
  wants: { expansion: null, expSearch: '', expOpen: false, session: [], openCard: null, search: '', filter: { regular: true, rainbow: false, cold: false, Token: true, Common: true, Rare: true, Majestic: false, Super_Rare: false, Legendary: false, Fabled: false, Marvel: false, Promo: false } },
  erf: { expansion: null, expSearch: '', expOpen: false, session: [], openCard: null, search: '', defaultLanguage: 'English', filter: { regular: true, rainbow: false, cold: false, "Token": true, "Common": true, "Rare": true, "Majestic": false, "Super_Rare": false, "Legendary": false, "Fabled": false, "Marvel": false, "Promo": false } },  // Kartenerfassung
  diff: null,   // Differenzbericht: { ts, items: [{id, name, rarity, expansion, altQty, neuQty, delta}] }
  diffSortCol: 'delta', diffSortDir: -1,
  // Diff-eigene Filter — alle default true
  fd: {
    Common:true, Rare:true, Majestic:true, 'Super Rare':true,
    Legendary:true, Fabled:true, Marvel:true, Token:true, Promo:true,
    rainbow:true, cold:true,
  },
};

// ════════════════════════════════════════════════════════
//  DRAG & DROP
// ════════════════════════════════════════════════════════
function dzOver(e,id)       { e.preventDefault(); document.getElementById(id).classList.add('drag-over'); }
function dzLeave(id)        { document.getElementById(id).classList.remove('drag-over'); }
function dzDrop(e,type)     { e.preventDefault(); dzLeave(type==='karten'?'dz-karten':'dz-inv'); loadFile(e.dataTransfer.files[0],type); }
function fileChosen(e, type) {
  e.preventDefault();
  e.stopPropagation();
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  loadFile(file, type);
  // Reset damit dieselbe Datei nochmal gewählt werden kann
  e.target.value = '';
}

function loadFile(file, type) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const parsed = Papa.parse(ev.target.result, { header:true, skipEmptyLines:true });
    const dzId = type==='karten' ? 'dz-karten' : 'dz-inv';
    const stId = type==='karten' ? 'st-karten'  : 'st-inv';
    const dz = document.getElementById(dzId);
    const st = document.getElementById(stId);
    dz.classList.remove('loaded','errored');
    let err = null;
    if (type==='karten' && !parsed.data[0]?.expansion) err = '✗ Falsche Datei – bitte die Kartenliste wählen';
    if (type==='inv'    && !parsed.data[0]?.quantity)  err = '✗ Falsche Datei – bitte das Inventar wählen';
    if (err) { dz.classList.add('errored'); st.className='dz-status err'; st.textContent=err; return; }
    dz.classList.add('loaded');
    st.className='dz-status ok';
    st.textContent = '✓ ' + file.name + '  (' + parsed.data.length.toLocaleString('de') + ' Zeilen)';
    if (type==='karten') {
      S.kartenCSV = parsed.data;
      // Kartenliste im localStorage cachen
      try {
        const meta = { name: file.name, rows: parsed.data.length, ts: Date.now() };
        localStorage.setItem('fab_karten_meta', JSON.stringify(meta));
        localStorage.setItem('fab_karten_csv',  ev.target.result);
        renderCacheInfo();
      } catch(e) { /* localStorage voll oder deaktiviert */ }
    } else {
      // Differenzbericht: altes Inventar mit neuem vergleichen
      if (S.invCSV && S.kartenCSV) {
        berechneDiff(S.invCSV, parsed.data);
      } else {
        S.diff = null;
      }
      S.invCSV = parsed.data;
      try {
        const meta = { name: file.name, rows: parsed.data.length, ts: Date.now() };
        localStorage.setItem('fab_inv_meta', JSON.stringify(meta));
        localStorage.setItem('fab_inv_csv',  ev.target.result);
        renderInvCacheInfo();
      } catch(e) {}
    }
    document.getElementById('btn-run').disabled = !(S.kartenCSV && S.invCSV);
    if (S.kartenCSV && S.invCSV) { try { localStorage.removeItem('fab_result'); localStorage.removeItem('fab_result_ts'); } catch(e) {} }
    if (!S.result) renderStartGuide();
  };
  reader.readAsText(file, 'UTF-8');
}

// ════════════════════════════════════════════════════════
//  LOCALSTORAGE — Kartenliste cachen
// ════════════════════════════════════════════════════════
const LS_META = 'fab_karten_meta';
const LS_CSV  = 'fab_karten_csv';

function ladeKartenAusCache() {
  try {
    const meta = JSON.parse(localStorage.getItem(LS_META) || 'null');
    const csv  = localStorage.getItem(LS_CSV);
    if (!meta || !csv) return false;

    const parsed = Papa.parse(csv, { header:true, skipEmptyLines:true });
    if (!parsed.data[0]?.expansion) return false;

    S.kartenCSV = parsed.data;

    // Drop-Zone als geladen markieren
    const dz = document.getElementById('dz-karten');
    const st = document.getElementById('st-karten');
    if (dz) dz.classList.add('loaded');
    if (st) {
      st.className = 'dz-status ok';
      st.textContent = '✓ ' + meta.name + '  (' + parsed.data.length.toLocaleString('de') + ' Zeilen)';
    }
    document.getElementById('btn-run').disabled = !(S.kartenCSV && S.invCSV);
    if (S.kartenCSV && S.invCSV) { try { localStorage.removeItem('fab_result'); localStorage.removeItem('fab_result_ts'); } catch(e) {} }
    renderCacheInfo();
    return true;
  } catch(e) {
    return false;
  }
}

function renderCacheInfo() {
  const box  = document.getElementById('cache-info-box');
  const meta = (() => { try { return JSON.parse(localStorage.getItem(LS_META) || 'null'); } catch(e) { return null; } })();
  if (!box || !meta) { if (box) box.style.display = 'none'; return; }

  const ts   = new Date(meta.ts);
  const date = ts.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric' });
  const time = ts.toLocaleTimeString('de-DE', { hour:'2-digit', minute:'2-digit' });

  box.style.display = 'block';
  box.innerHTML =
    '<div class="cache-info">' +
      '<div class="cache-info-text">' +
        '<strong>Kartenliste gecacht</strong>' +
        date + ' ' + time + ' &middot; ' + meta.rows.toLocaleString('de') + ' Karten' +
      '</div>' +
      '<button class="btn-cache-clear" onclick="clearKartenCache()" title="Kartenliste aus Cache löschen">✕ Löschen</button>' +
    '</div>';
}

function clearKartenCache() {
  try {
    localStorage.removeItem(LS_META);
    localStorage.removeItem(LS_CSV);
  } catch(e) {}
  S.kartenCSV = null;
  const dz = document.getElementById('dz-karten');
  const st = document.getElementById('st-karten');
  if (dz) dz.classList.remove('loaded','errored');
  if (st) { st.className='dz-status'; st.textContent=''; }
  const box = document.getElementById('cache-info-box');
  if (box) box.style.display = 'none';
  document.getElementById('btn-run').disabled = true;
  if (!S.result) renderStartGuide();
}

// ════════════════════════════════════════════════════════
//  LOCALSTORAGE — Inventar cachen
// ════════════════════════════════════════════════════════
const LS_INV_META = 'fab_inv_meta';
const LS_INV_CSV  = 'fab_inv_csv';

function ladeInvAusCache() {
  try {
    const meta = JSON.parse(localStorage.getItem(LS_INV_META) || 'null');
    const csv  = localStorage.getItem(LS_INV_CSV);
    if (!meta || !csv) return false;

    const parsed = Papa.parse(csv, { header:true, skipEmptyLines:true });
    if (!parsed.data[0]?.quantity) return false;

    S.invCSV = parsed.data;

    const dz = document.getElementById('dz-inv');
    const st = document.getElementById('st-inv');
    if (dz) dz.classList.add('loaded');
    if (st) {
      st.className = 'dz-status ok';
      st.textContent = '✓ ' + meta.name + '  (' + parsed.data.length.toLocaleString('de') + ' Zeilen)';
    }
    document.getElementById('btn-run').disabled = !S.kartenCSV;
    renderInvCacheInfo();
    return true;
  } catch(e) {
    return false;
  }
}

function renderInvCacheInfo() {
  const box  = document.getElementById('cache-info-box-inv');
  const meta = (() => { try { return JSON.parse(localStorage.getItem(LS_INV_META) || 'null'); } catch(e) { return null; } })();
  if (!box || !meta) { if (box) box.style.display = 'none'; return; }

  const ts   = new Date(meta.ts);
  const date = ts.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric' });
  const time = ts.toLocaleTimeString('de-DE', { hour:'2-digit', minute:'2-digit' });

  // Alter berechnen
  const ageMs  = Date.now() - meta.ts;
  const ageDays = Math.floor(ageMs / 86400000);
  const ageHrs  = Math.floor(ageMs / 3600000);
  const ageStr  = ageDays >= 2 ? ageDays + ' Tage alt'
                : ageDays === 1 ? '1 Tag alt'
                : ageHrs >= 1  ? ageHrs + ' Std. alt'
                : 'gerade eben';

  const warn = ageDays >= 7;  // Warnung wenn älter als 7 Tage

  box.style.display = 'block';
  box.innerHTML =
    '<div class="cache-info' + (warn ? ' cache-info-warn' : '') + '">' +
      '<div class="cache-info-text">' +
        '<strong>Inventar gecacht</strong>' +
        date + ' ' + time + ' &middot; ' + meta.rows.toLocaleString('de') + ' Artikel' +
        (warn ? '<br><span style="color:var(--majestic)">⚠ ' + ageStr + ' – aktualisieren?</span>' : ' &middot; ' + ageStr) +
      '</div>' +
      '<button class="btn-cache-clear" onclick="clearInvCache()" title="Inventar aus Cache löschen">✕</button>' +
    '</div>';
}

function clearInvCache() {
  try {
    localStorage.removeItem(LS_INV_META);
    localStorage.removeItem(LS_INV_CSV);
  } catch(e) {}
  S.invCSV = null;
  const dz = document.getElementById('dz-inv');
  const st = document.getElementById('st-inv');
  if (dz) dz.classList.remove('loaded','errored');
  if (st) { st.className='dz-status'; st.textContent=''; }
  const box = document.getElementById('cache-info-box-inv');
  if (box) box.style.display = 'none';
  document.getElementById('btn-run').disabled = true;
  if (!S.result) renderStartGuide();
}

// Cache beim Seitenstart laden
(function() {
  try { ladeKartenAusCache(); } catch(e) {}
  try { ladeInvAusCache();    } catch(e) {}
  // btn-run Status nach beiden Caches aktualisieren
  document.getElementById('btn-run').disabled = !(S.kartenCSV && S.invCSV);

  try {
    const cached = localStorage.getItem('fab_result');
    const ts     = localStorage.getItem('fab_result_ts');
    if (cached && S.kartenCSV && S.invCSV) {
      S.result    = JSON.parse(cached);
      S.sektion   = 'haupt';
      S.tab       = { haupt:'ranking', andere:'ranking' };
      S.activeSet = { haupt:null, andere:null };
      S.search    = { haupt:'', andere:'' };
      const sm = document.getElementById('status-msg');
      if (sm && ts) {
        const mins = Math.round((Date.now()-parseInt(ts))/60000);
        sm.className = 'status-msg done';
        sm.textContent = String.fromCodePoint(0x2713) + ' Ergebnis aus Cache (' + (mins < 60 ? mins + ' Min' : Math.round(mins/60) + ' Std') + ' alt)';
      }
      document.getElementById('btn-run').disabled    = true;
      document.getElementById('btn-export').disabled = false;
      buildMehrFarbenCache();
      render();
    } else {
      renderStartGuide();
    }
  } catch(e) {
    renderStartGuide();
  }
})();

// ════════════════════════════════════════════════════════
//  KARTENFARBE (Pitch-Farbe aus Klammerausdruck)
// ════════════════════════════════════════════════════════
function getDotColor(name) {
  const m = name && name.match(/\(([^)]+)\)/);
  if (!m) return 'var(--c-neutral)';
  const v = m[1].toLowerCase().trim();
  if (v === 'red')                       return 'var(--c-red)';
  if (v === 'yellow' || v === 'yelllow') return 'var(--c-yellow)';
  if (v === 'blue'   || v === 'bleu')    return 'var(--c-blue)';
  return 'var(--c-neutral)';
}

// ════════════════════════════════════════════════════════
//  ANALYSE — Gruppe analysieren (alle Seltenheiten, alle Foils)
// ════════════════════════════════════════════════════════
function analysiereGruppe(sets, zielMap, invMap) {
  // Alle Karten dieser Sets, OHNE jeglichen Filter —
  // Filterung passiert erst beim Anzeigen.
  const karten = S.kartenCSV.filter(r => sets.has(r.expansion) && r.name && r.cardmarketId);

  const fehlend   = [];
  const setGesamt = {};   // {expansion: {total, byRarity, byFoil}}

  karten.forEach(k => {
    const id      = parseInt(k.cardmarketId);
    const qty     = invMap.get(id) || 0;
    const foilTyp = getFoilType(k.name);

    // Statistiken pro Set aufbauen (ungefiltert, für Ranking-Tabelle)
    if (!setGesamt[k.expansion]) setGesamt[k.expansion] = { total: 0 };
    setGesamt[k.expansion].total++;

    const ziel = (zielMap && zielMap[k.rarity] !== undefined) ? zielMap[k.rarity] : 20;
    if (qty < ziel) {
      fehlend.push({
        id, cardmarketId: k.cardmarketId, name: k.name, rarity: k.rarity, foilType: foilTyp,
        expansion: k.expansion, expansionCode: k.expansionCode,
        setCode: k.setCode || k.expansionCode || '',
        cn: k.cn || k.collectorNumber || '',
        collectorNumber: k.collectorNumber || '',
        nameDE: k.nameDE||k.name, nameES: k.nameES||k.name,
        nameFR: k.nameFR||k.name, nameIT: k.nameIT||k.name,
        im_inv: qty, fehlend: ziel - qty,
      });
    }
  });

  // Ranking: basierend auf ungefilterten Fehlmengen
  // (damit das Ranking stabil bleibt egal welche Filter aktiv sind)
  const rankMap = {};
  fehlend.forEach(k => {
    if (!rankMap[k.expansion]) rankMap[k.expansion] = { verschiedene:0, fehlend_gesamt:0, null_stueck:0 };
    rankMap[k.expansion].verschiedene++;
    rankMap[k.expansion].fehlend_gesamt += k.fehlend;
    if (k.im_inv===0) rankMap[k.expansion].null_stueck++;
  });

  const ranking = Object.entries(rankMap).map(([set,d]) => ({
    expansion: set, gruppe: SET_GRUPPE[set]||set, first_ed: FIRST_ED.has(set),
    gesamt: setGesamt[set]?.total || 0, ...d,
    fehlquote: setGesamt[set]?.total ? +(d.verschiedene / setGesamt[set].total * 100).toFixed(1) : 0,
  }));
  ranking.sort((a,b) => b.fehlend_gesamt - a.fehlend_gesamt);

  const setsData = {};
  fehlend.forEach(k => { (setsData[k.expansion] = setsData[k.expansion]||[]).push(k); });

  // Stats: immer Common+Rare ohne Foil als Basisreferenz
  const basis = fehlend.filter(k => (k.rarity==='Common'||k.rarity==='Rare') && k.foilType==='none');
  return {
    ranking, setsData, allFehlend: fehlend,
    stats: {
      gesamt:  basis.length,
      common:  basis.filter(k=>k.rarity==='Common').length,
      rare:    basis.filter(k=>k.rarity==='Rare').length,
      null:    basis.filter(k=>k.im_inv===0).length,
    },
  };
}

// ════════════════════════════════════════════════════════
//  ANALYSE — Einstiegspunkt
// ════════════════════════════════════════════════════════
function runAnalyse() {
  const zielMap = {};
  zielMap['Token'] = parseInt(document.getElementById('cfg-ziel-Token')?.value) || 20;
  zielMap['Common'] = parseInt(document.getElementById('cfg-ziel-Common')?.value) || 20;
  zielMap['Rare'] = parseInt(document.getElementById('cfg-ziel-Rare')?.value) || 20;
  zielMap['Majestic'] = parseInt(document.getElementById('cfg-ziel-Majestic')?.value) || 4;
  zielMap['Super Rare'] = parseInt(document.getElementById('cfg-ziel-Super-Rare')?.value) || 2;
  zielMap['Legendary'] = parseInt(document.getElementById('cfg-ziel-Legendary')?.value) || 1;
  zielMap['Fabled'] = parseInt(document.getElementById('cfg-ziel-Fabled')?.value) || 1;
  zielMap['Marvel'] = parseInt(document.getElementById('cfg-ziel-Marvel')?.value) || 1;
  zielMap['Promo'] = parseInt(document.getElementById('cfg-ziel-Promo')?.value) || 1;
  const sm   = document.getElementById('status-msg');
  sm.className = 'status-msg running';
  sm.innerHTML = '<span class="spinner" aria-hidden="true"></span>Analysiere…';
  document.getElementById('btn-run').disabled    = true;
  document.getElementById('btn-export').disabled = true;

  setTimeout(() => {
    try {
      const alleExpansions = [...new Set(S.kartenCSV.map(r => r.expansion).filter(Boolean))];
      const kartenProSet = new Map();
      S.kartenCSV.forEach(r => {
        if (!r.expansion) return;
        if (!r.name || r.name.includes('Rainbow Foil') || r.name.includes('Cold Foil')) return;
        kartenProSet.set(r.expansion, (kartenProSet.get(r.expansion) || 0) + 1);
      });
      const hauptsets  = new Set(alleExpansions.filter(s => istHauptset(s, kartenProSet)));
      const anderesets = new Set(alleExpansions.filter(s => !istHauptset(s, kartenProSet)));

      // Inventar summieren (inkl. Foils — alle Varianten eines cardmarketId werden summiert)
      const invMap = new Map();
      S.invCSV.forEach(r => {
        const id  = parseInt(r.cardmarketId);
        const qty = parseInt(r.quantity) || 0;
        if (!isNaN(id)) invMap.set(id, (invMap.get(id)||0) + qty);
      });

      const haupt  = analysiereGruppe(hauptsets,  zielMap, invMap);
      const andere = analysiereGruppe(anderesets, zielMap, invMap);

      S.result    = { zielMap, haupt, andere };
      buildMehrFarbenCache(); // Cache für Wantsliste
      try { localStorage.setItem('fab_result', JSON.stringify(S.result)); localStorage.setItem('fab_result_ts', Date.now().toString()); } catch(e) {}
      S.sektion   = 'haupt';
      S.tab       = { haupt:'ranking', andere:'ranking' };
      S.activeSet = { haupt:null,      andere:null      };
      S.search    = { haupt:'',        andere:''        };

      const gesamt = haupt.stats.gesamt + andere.stats.gesamt;
      sm.className = 'status-msg done';
      sm.textContent = '✓ ' + gesamt.toLocaleString('de') + ' fehlende C/R · '
        + hauptsets.size + ' Hauptsets · ' + anderesets.size + ' andere Produkte';
      document.getElementById('btn-run').disabled    = true;
      document.getElementById('btn-export').disabled = false;
      render();
    } catch(err) {
      sm.className = 'status-msg err';
      sm.textContent = '✗ Fehler: ' + err.message;
      document.getElementById('btn-run').disabled = false;
      console.error(err);
    }
  }, 30);
}

// ════════════════════════════════════════════════════════
//  FILTER — Karten für Anzeige filtern
// ════════════════════════════════════════════════════════
function filterKarten(cards) {
  // Vorab: welche Raritäten haben eine Regular-Version?
  const hasRegular = new Set(
    cards.filter(c => (c.foilType||'none') === 'none').map(c => c.rarity)
  );
  return cards.filter(card => {
    const ft = card.foilType || 'none';
    // Foil-Filter: nur anwenden wenn es auch eine Regular-Version gibt
    // Karten die NUR als Foil existieren werden allein durch den Seltenheits-Filter gesteuert
    if (ft === 'rainbow' && !S.f.rainbow && hasRegular.has(card.rarity)) return false;
    if (ft === 'cold'    && !S.f.cold    && hasRegular.has(card.rarity)) return false;
    if (ft === 'rainbow' && !S.f.rainbow && !hasRegular.has(card.rarity)) {
      // Nur-Foil-Karte: Foil-Filter ignorieren, Seltenheit entscheidet
    }
    if (ft === 'cold'    && !S.f.cold    && !hasRegular.has(card.rarity)) {
      // Nur-Foil-Karte: Foil-Filter ignorieren, Seltenheit entscheidet
    }
    // Seltenheits-Filter
    const rarKey = card.rarity;
    if (!(rarKey in S.f)) return false;
    return S.f[rarKey];
  });
}

// ════════════════════════════════════════════════════════
//  RENDER — Hilfsfunktionen
// ════════════════════════════════════════════════════════
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderStats(st) {
  return '<div class="stats-row" role="list" aria-label="Übersicht (Common + Rare, kein Foil)">' +
    '<div class="stat-card s-total" role="listitem"><div class="stat-val">' + st.gesamt.toLocaleString('de') + '</div><div class="stat-lbl">C/R fehlend</div></div>' +
    '<div class="stat-card s-common" role="listitem"><div class="stat-val">' + st.common.toLocaleString('de') + '</div><div class="stat-lbl">Common</div></div>' +
    '<div class="stat-card s-rare" role="listitem"><div class="stat-val">' + st.rare.toLocaleString('de') + '</div><div class="stat-lbl">Rare</div></div>' +
    '<div class="stat-card s-null" role="listitem"><div class="stat-val">' + st.null.toLocaleString('de') + '</div><div class="stat-lbl">Davon 0×</div></div>' +
  '</div>';
}

function alleRarAn(fObj) {
  const RARITAETEN = ['Common','Rare','Majestic','Super Rare','Legendary','Fabled','Marvel','Token','Promo'];
  return RARITAETEN.every(r => fObj[r]);
}
function toggleAlleRar(fKey) {
  const RARITAETEN = ['Common','Rare','Majestic','Super Rare','Legendary','Fabled','Marvel','Token','Promo'];
  const allOn = alleRarAn(S[fKey]);
  RARITAETEN.forEach(r => S[fKey][r] = !allOn);
  render();
}
function renderFilterBar(sektion) {
  const RARITAETEN = ['Common','Rare','Majestic','Super Rare','Legendary','Fabled','Marvel','Token','Promo'];
  const allOn  = alleRarAn(S.f);
  const alleRarBtn = '<button class="ftog' + (allOn ? ' on' : '') + '" style="--fcol:var(--gold)"' +
    ' aria-pressed="' + allOn + '" onclick="toggleAlleRar(\'f\')">Alle</button>';
  const rarBtns = RARITAETEN.map(r => {
    const on  = S.f[r] ? ' on' : '';
    const col = RARITY_COLOR[r] || 'var(--text-dim)';
    return '<button class="ftog' + on + '" style="--fcol:' + col + '"' +
      ' aria-pressed="' + S.f[r] + '"' +
      ' onclick="toggleFilter(\'' + r + '\')">' + esc(r) + '</button>';
  }).join('');

  const rfOn  = S.f.rainbow ? ' on foil-rf' : ' foil-rf';
  const cfOn  = S.f.cold    ? ' on foil-cf' : ' foil-cf';

  return '<div class="filter-bar" role="group" aria-label="Karten filtern">' +
    '<span class="filter-label">Seltenheit</span>' +
    '<div class="filter-group">' + alleRarBtn + rarBtns + '</div>' +
    '<span class="filter-sep"></span>' +
    '<span class="filter-label">Foil</span>' +
    '<div class="filter-group">' +
      '<button class="ftog' + rfOn + '" aria-pressed="' + S.f.rainbow + '" onclick="toggleFilter(\'rainbow\')">Rainbow Foil</button>' +
      '<button class="ftog' + cfOn + '" aria-pressed="' + S.f.cold    + '" onclick="toggleFilter(\'cold\')">Cold Foil</button>' +
    '</div>' +
  '</div>';
}

function renderRankingPanel(data, sektion) {
  const cols = [
    { key:'expansion',      label:'Set',              num:false },
    { key:'verschiedene',   label:'Fehlend (gesamt)', num:true  },
    { key:'fehlend_common', label:'C',                num:true  },
    { key:'fehlend_rare',   label:'R',                num:true  },
  ];
  const thead = cols.map(col => {
    const s   = S.sortCol===col.key;
    const arr = s ? (S.sortDir===-1?'▼':'▲') : '▲';
    return '<th class="' + (col.num?'num ':'') + (s?'sorted':'') + '" onclick="sortRanking(\'' + col.key + '\')" scope="col" aria-sort="' + (s?(S.sortDir===-1?'descending':'ascending'):'none') + '">' +
      esc(col.label) + ' <span class="sort-arrow" aria-hidden="true">' + arr + '</span></th>';
  }).join('');

  const sorted = [...data.ranking].sort((a,b) => S.sortDir*(
    typeof a[S.sortCol]==='string' ? a[S.sortCol].localeCompare(b[S.sortCol]) : (a[S.sortCol]-b[S.sortCol])
  ));

  const rows = sorted.map((row,i) => {
    const fe  = row.first_ed ? '<span class="badge-fe">1st Ed</span>' : '';
    const grp = SET_GRUPPE[row.expansion];
    const lbl = (grp && grp!==row.expansion)
      ? '<span style="color:var(--text-muted);font-size:.8125rem">' + esc(grp) + ' / </span>' + esc(row.expansion.replace(/- (First|Unlimited|Alpha)/,'').trim())
      : esc(row.expansion);
    const exp = row.expansion.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    return '<tr onclick="goToSet(\'' + exp + '\',\'' + sektion + '\')" style="cursor:pointer" tabindex="0" role="row"' +
      ' onkeydown="if(event.key===\'Enter\')goToSet(\'' + exp + '\',\'' + sektion + '\')">' +
      '<td><span class="rank-num" aria-hidden="true">' + (i+1) + '</span>' + lbl + fe + '</td>' +
      '<td class="num">' + row.verschiedene + '</td>' +
      '<td class="num" style="color:var(--common)">' + (row.fehlend_common||0) + '</td>' +
      '<td class="num" style="color:var(--rare)">'   + (row.fehlend_rare  ||0) + '</td></tr>';
  }).join('');

  return '<div class="table-wrap"><table aria-label="Set-Ranking"><thead><tr>' + thead + '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<p style="margin-top:10px;font-family:var(--font-mono);font-size:.75rem;color:var(--text-muted)">Zeile anklicken um Kartendetails zu öffnen · Spaltenköpfe zum Sortieren</p>';
}

function renderKartenRow(card, ziel, extraSet) {
  const pct  = Math.min(100, Math.round(card.im_inv/ziel*100));
  const zero = card.im_inv===0 ? '<span class="zero-badge">0×</span>' : '';
  const foilTag = card.foilType==='rainbow' ? '<span class="foil-tag rf" title="Rainbow Foil">RF</span>' :
                  card.foilType==='cold'    ? '<span class="foil-tag cf" title="Cold Foil">CF</span>' : '';
  const setCell = extraSet ? '<td style="color:var(--text-dim);font-size:.8rem">' + esc(card.expansion||'–') + '</td>' : '';
  return '<tr>' +
    '<td><span class="dot" style="background:' + getDotColor(card.name) + '" aria-hidden="true"></span>' +
    foilTag + esc(card.name) + '</td>' +
    '<td style="color:' + rarityColor(card.rarity) + ';font-weight:600">' + esc(card.rarity) + '</td>' +
    setCell +
    '<td><div class="prog-cell">' + zero +
      '<div class="prog-bg" aria-hidden="true"><div class="prog-fill" style="width:' + pct + '%"></div></div>' +
      '<span class="prog-txt">' + card.im_inv + ' / ' + ziel + '</span></div></td>' +
    '<td class="num" style="color:var(--gold-light);font-weight:600">' + card.fehlend + '</td></tr>';
}

function buildKartenTable(cards, sektion, search, extraSet) {
  const baseCols = [
    { key:'name',    label:'Kartenname', num:false },
    { key:'rarity',  label:'Seltenheit', num:false },
  ];
  const midCols  = extraSet ? [{ key:'expansion', label:'Set', num:false }] : [];
  const endCols  = [
    { key:'im_inv',  label:'Im Inventar', num:true },
    { key:'fehlend', label:'Fehlend',     num:true },
  ];
  const cCols = [...baseCols, ...midCols, ...endCols];
  const thead = cCols.map(col => {
    const s   = S.cardSortCol===col.key;
    const arr = s ? (S.cardSortDir===1?'▲':'▼') : '▲';
    return '<th class="' + (col.num?'num ':'') + (s?'sorted':'') + '"' +
      ' onclick="sortCards(\'' + col.key + '\')" scope="col"' +
      ' aria-sort="' + (s?(S.cardSortDir===1?'ascending':'descending'):'none') + '">' +
      esc(col.label) + ' <span class="sort-arrow" aria-hidden="true">' + arr + '</span></th>';
  }).join('');
  const ziel  = 20;
  const tbody = cards.map(card => renderKartenRow(card, ziel, extraSet)).join('');
  return '<div class="search-row">' +
      '<input class="search-input" type="search" placeholder="Kartenname suchen…" value="' + esc(search) + '"' +
        ' aria-label="Kartenname suchen" oninput="S.search[\'' + sektion + '\']=this.value;render()">' +
      '<span class="count-lbl" aria-live="polite">' + cards.length.toLocaleString('de') + ' Karten</span>' +
    '</div>' +
    '<div class="table-wrap"><table aria-label="Fehlende Karten">' +
      '<thead><tr>' + thead + '</tr></thead><tbody>' + tbody + '</tbody></table></div>';
}

function fehlendFuerSet(cards) {
  if (!cards) return 0;
  const hasRegular = new Set(
    cards.filter(c => (c.foilType||'none') === 'none').map(c => c.rarity)
  );
  return cards
    .filter(card => {
      const ft = card.foilType || 'none';
      if (ft === 'rainbow' && !S.f.rainbow && hasRegular.has(card.rarity)) return false;
      if (ft === 'cold'    && !S.f.cold    && hasRegular.has(card.rarity)) return false;
      if (!(card.rarity in S.f)) return false;
      return S.f[card.rarity];
    })
    .reduce((s, card) => s + card.fehlend, 0);
}

function renderKartenPanel(data, sektion) {
  const activeSet = S.activeSet[sektion];
  const search    = S.search[sektion];
  const alleAktiv = activeSet === '__alle__';

  // "Alle"-Button immer ganz links
  const alleBtn =
    '<button class="set-btn' + (alleAktiv ? ' active' : '') + '"' +
    ' onclick="selectSet(\'__alle__\',\'' + sektion + '\')"' +
    ' aria-pressed="' + alleAktiv + '">' +
    '<span class="set-btn-name">Alle</span>' +
    '<span class="set-btn-count">alle Sets</span>' +
    '</button>';

  // Set-Buttons nur anzeigen wenn "Alle" NICHT aktiv
  const setBtns = data.ranking.map(row => {
    const fe     = row.first_ed ? ' fe' : '';
    const active = activeSet===row.expansion ? ' active' : '';
    const exp    = row.expansion.replace(/\\/g,'\\\\').replace(/'/g,"\'");
    return '<button class="set-btn' + fe + active + '"' +
      ' onclick="selectSet(\'' + exp + '\',\'' + sektion + '\')"' +
      ' aria-pressed="' + (activeSet===row.expansion) + '">' +
      '<span class="set-btn-name">' + esc(row.expansion) + '</span>' +
      '<span class="set-btn-count">' + fehlendFuerSet(data.setsData[row.expansion]) + ' fehlend</span>' +
      '</button>';
  }).join('');

  const filterBar = renderFilterBar(sektion);
  let tableHtml   = '<p style="color:var(--text-muted);padding:32px;text-align:center;font-size:.9375rem">Set oben auswählen um die fehlenden Karten anzuzeigen</p>';

  if (alleAktiv) {
    let cards = [];
    data.ranking.forEach(row => {
      (data.setsData[row.expansion]||[]).forEach(card => {
        cards.push(Object.assign({}, card, { expansion: row.expansion }));
      });
    });
    cards = filterKarten(cards);
    if (search) { const q=search.toLowerCase(); cards=cards.filter(c=>c.name.toLowerCase().includes(q)); }
    cards.sort((a,b) => { const av=a[S.cardSortCol],bv=b[S.cardSortCol]; return S.cardSortDir*(typeof av==='string'?av.localeCompare(bv):(av-bv)); });
    tableHtml = buildKartenTable(cards, sektion, search, true);

  } else if (activeSet && data.setsData[activeSet]) {
    let cards = filterKarten(data.setsData[activeSet]);
    if (search) { const q=search.toLowerCase(); cards=cards.filter(c=>c.name.toLowerCase().includes(q)); }
    cards.sort((a,b) => { const av=a[S.cardSortCol],bv=b[S.cardSortCol]; return S.cardSortDir*(typeof av==='string'?av.localeCompare(bv):(av-bv)); });
    tableHtml = buildKartenTable(cards, sektion, search, false);
  }

  return '<div class="set-filter" role="group" aria-label="Set auswählen">' + alleBtn + setBtns + '</div>' + filterBar + tableHtml;
}

// ════════════════════════════════════════════════════════
//  START-GUIDE
// ════════════════════════════════════════════════════════
function renderStartGuide() {
  const kartenOk   = !!S.kartenCSV;
  const invOk      = !!S.invCSV;
  const bereit     = kartenOk && invOk;
  const kartenMeta = (() => { try { return JSON.parse(localStorage.getItem(LS_META)     || 'null'); } catch(e) { return null; } })();
  const invMeta    = (() => { try { return JSON.parse(localStorage.getItem(LS_INV_META) || 'null'); } catch(e) { return null; } })();

  function stepStatus(ok, meta) {
    if (ok && meta) {
      const date = new Date(meta.ts).toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric' });
      return '<span class="guide-status done">✓ ' + esc(meta.name) + ' · ' + meta.rows.toLocaleString('de') + ' Einträge · ' + date + '</span>';
    }
    if (ok) return '<span class="guide-status done">✓ Datei geladen</span>';
    return '<span class="guide-status pending">Datei in der Sidebar hochladen</span>';
  }

  document.getElementById('main').innerHTML =
    '<div class="guide-wrap">' +
      '<div class="guide-header">' +
        '<div class="guide-emblem" aria-hidden="true">⚔</div>' +
        '<div>' +
          '<h2 class="guide-title">Flesh &amp; Blood — Inventar-Bericht</h2>' +
          '<p class="guide-sub">Bestandsanalyse · vollständig lokal · keine Daten werden übertragen</p>' +
        '</div>' +
      '</div>' +
      '<div class="guide-steps">' +
        '<div class="guide-step' + (kartenOk ? ' done' : ' active') + '">' +
          '<div class="guide-num">1</div>' +
          '<div class="guide-body">' +
            '<div class="guide-step-title">Kartenliste laden</div>' +
            '<div class="guide-step-hint">Vollständige FaB-Karten CSV (z.B. von cardmarket)</div>' +
            stepStatus(kartenOk, kartenMeta) +
          '</div>' +
        '</div>' +
        '<div class="guide-step' + (invOk ? ' done' : kartenOk ? ' active' : '') + '">' +
          '<div class="guide-num">2</div>' +
          '<div class="guide-body">' +
            '<div class="guide-step-title">Inventar laden</div>' +
            '<div class="guide-step-hint">Aktueller Lagerbestand CSV</div>' +
            stepStatus(invOk, invMeta) +
          '</div>' +
        '</div>' +
        '<div class="guide-step' + (bereit ? ' active' : '') + '">' +
          '<div class="guide-num">3</div>' +
          '<div class="guide-body">' +
            '<div class="guide-step-title">Analyse starten</div>' +
            '<div class="guide-step-hint">Vergleicht Inventar mit der Kartenliste und zeigt Fehlmengen</div>' +
            (bereit
              ? '<button class="btn btn-primary guide-btn" onclick="runAnalyse()">Analyse starten</button>'
              : '<span class="guide-status pending">Warte auf Schritt 1 und 2</span>') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

// ════════════════════════════════════════════════════════
//  RENDER — Haupt
// ════════════════════════════════════════════════════════
function render() {
  if (!S.result) return;
  const r    = S.result;
  const sek  = S.sektion;
  const data = r[sek];
  const tab  = S.tab[sek];

  const sektionNav =
    '<nav class="sektion-nav" aria-label="Kategorie wechseln">' +
      '<button class="sektion-btn ' + (sek==='haupt'?'active':'') + '"' +
        ' onclick="wechseSektion(\'haupt\')" aria-pressed="' + (sek==='haupt') + '">' +
        'Hauptsets <span class="s-badge">' + r.haupt.ranking.length + '</span></button>' +
      '<button class="sektion-btn ' + (sek==='andere'?'active':'') + '"' +
        ' onclick="wechseSektion(\'andere\')" aria-pressed="' + (sek==='andere') + '">' +
        'Andere Produkte <span class="s-badge">' + r.andere.ranking.length + '</span></button>' +
    '</nav>';

  const hasDiff = !!S.diff;
  const subTabs =
    '<div class="tabs" role="tablist" aria-label="Ansicht wechseln">' +
      '<button class="tab ' + (tab==='ranking'?'active':'') + '" role="tab" aria-selected="' + (tab==='ranking') + '" onclick="switchTab(\'ranking\')">Ranking</button>' +
      '<button class="tab ' + (tab==='karten'?'active':'') + '" role="tab" aria-selected="' + (tab==='karten') + '" onclick="switchTab(\'karten\')">Karten</button>' +
      (hasDiff ? '<button class="tab ' + (tab==='diff'?'active':'') + '" role="tab" aria-selected="' + (tab==='diff') + '" onclick="switchTab(\'diff\')">Verkäufe</button>' : '') +
      '<button class="tab ' + (tab==='scan'?'active':'') + '" role="tab" aria-selected="' + (tab==='scan') + '" onclick="switchTab(\'scan\')">Kartenerfassung</button>' +
      '<button class="tab ' + (tab==='wants'?'active':'') + '" role="tab" aria-selected="' + (tab==='wants') + '" onclick="switchTab(\'wants\')">Wantsliste</button>' +
    '</div>';

  let panelContent = '';
  if (tab === 'ranking') panelContent = renderRankingPanel(data, sek);
  if (tab === 'karten')  panelContent = renderKartenPanel(data, sek);
  if (tab === 'diff')    panelContent = renderDiffPanel();
  if (tab === 'scan')    panelContent = renderScanPanel();
  if (tab === 'wants')   panelContent = renderWantsPanel();

  initMobileUI();
  document.getElementById('main').innerHTML =
    sektionNav +
    '<div class="result-area">' +
      subTabs +
      panelContent +
    '</div>';
}

// ════════════════════════════════════════════════════════
//  INTERAKTIONEN
// ════════════════════════════════════════════════════════
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const btn = document.getElementById('sidebar-toggle');
  if (!sb) return;
  const open = sb.classList.toggle('sidebar-open');
  if (btn) btn.textContent = open ? '✕' : '⚙️';
}
function initMobileUI() {
  if (window.innerWidth > 768) return;
  const btn = document.getElementById('sidebar-toggle');
  if (btn) btn.style.display = '';
  const sb = document.getElementById('sidebar');
  if (!sb) return;
  // Sidebar: offen wenn noch keine Analyse, danach immer eingeklappt
  if (S.result) sb.classList.remove('sidebar-open');
  else if (!sb.classList.contains('sidebar-open')) sb.classList.add('sidebar-open');
}

function wechseSektion(sek) {
  S.sektion = sek;
  S.sortCol = 'fehlend_gesamt'; S.sortDir = -1;
  S.cardSortCol = 'name'; S.cardSortDir = 1;
  render();
}
function switchTab(t) {
  S.tab[S.sektion] = t;
  S.activeSet[S.sektion] = null;
  S.search[S.sektion] = '';
  render();
}
function selectSet(s, sek) {
  S.sektion = sek;
  S.tab[sek] = 'karten';
  S.activeSet[sek] = s;
  S.search[sek] = '';
  render();
}
function goToSet(s, sek)  { selectSet(s, sek); }
function sortRanking(col) { S.sortDir = S.sortCol===col ? -S.sortDir : -1; S.sortCol=col; render(); }
function sortCards(col)   { S.cardSortDir = S.cardSortCol===col ? -S.cardSortDir : 1; S.cardSortCol=col; render(); }
function toggleFilter(key){ S.f[key] = !S.f[key]; render(); }
function toggleDiffFilter(key){ S.fd[key] = !S.fd[key]; render(); }

// ════════════════════════════════════════════════════════
//  DIFFERENZBERICHT
// ════════════════════════════════════════════════════════

function berechneDiff(altInvCSV, neuInvCSV) {
  // Menge je cardmarketId aufbauen
  function invMap(rows) {
    const m = new Map();
    rows.forEach(r => {
      const id  = r.idProduct || r.cardmarketId || r['Product ID'] || r.id;
      const qty = parseInt(r.quantity || r.Quantity || r.count || 0, 10);
      if (id && !isNaN(qty)) m.set(String(id), qty);
    });
    return m;
  }

  const altMap = invMap(altInvCSV);
  const neuMap = invMap(neuInvCSV);

  // Kartenliste für Metadaten (Name, Seltenheit, Set)
  const kartenMeta = new Map();
  if (S.kartenCSV) {
    S.kartenCSV.forEach(r => {
      if (r.cardmarketId) kartenMeta.set(String(r.cardmarketId), r);
    });
  }

  const items = [];
  // Alle IDs die im alten Inventar waren
  altMap.forEach((altQty, id) => {
    const neuQty = neuMap.get(id) || 0;
    const delta  = altQty - neuQty;   // positiv = verkauft
    if (delta > 0) {
      const meta = kartenMeta.get(id) || {};
      items.push({
        id,
        name:       meta.name       || id,
        rarity:     meta.rarity     || '–',
        expansion:  meta.expansion  || '–',
        foilType:   getFoilType(meta.name || ''),
        collectorNumber: meta.collectorNumber || '',
        altQty, neuQty, delta,
      });
    }
  });

  if (items.length === 0) {
    S.diff = null;
    return;
  }

  S.diff = { ts: Date.now(), items };
}

function sortDiff(col) {
  if (S.diffSortCol === col) S.diffSortDir = -S.diffSortDir;
  else { S.diffSortCol = col; S.diffSortDir = col === 'delta' ? -1 : 1; }
  render();
}

function renderDiffPanel() {
  if (!S.diff) return '<p style="color:var(--text-muted);padding:24px">Kein Differenzbericht verfügbar.</p>';

  const { ts, items: allItems } = S.diff;

  // Diff-Filterleiste bauen
  const RARITAETEN = ['Common','Rare','Majestic','Super Rare','Legendary','Fabled','Marvel','Token','Promo'];
  const alleDiffOn = alleRarAn(S.fd);
  const alleDiffBtn = '<button class="ftog' + (alleDiffOn ? ' on' : '') + '" style="--fcol:var(--gold)"' +
    ' aria-pressed="' + alleDiffOn + '" onclick="toggleAlleRar(\'fd\')">Alle</button>';
  const rarBtns = RARITAETEN.map(r => {
    const on  = S.fd[r] ? ' on' : '';
    const col = RARITY_COLOR[r] || 'var(--text-dim)';
    return '<button class="ftog' + on + '" style="--fcol:' + col + '"' +
      ' aria-pressed="' + S.fd[r] + '"' +
      ' onclick="toggleDiffFilter(\'' + r + '\')">' + esc(r) + '</button>';
  }).join('');
  const rfOn = S.fd.rainbow ? ' on foil-rf' : ' foil-rf';
  const cfOn = S.fd.cold    ? ' on foil-cf' : ' foil-cf';
  const diffFilterBar =
    '<div class="filter-bar" role="group" aria-label="Verkäufe filtern">' +
    '<span class="filter-label">Seltenheit</span>' +
    '<div class="filter-group">' + alleDiffBtn + rarBtns + '</div>' +
    '<span class="filter-sep"></span>' +
    '<span class="filter-label">Foil</span>' +
    '<div class="filter-group">' +
      '<button class="ftog' + rfOn + '" aria-pressed="' + S.fd.rainbow + '" onclick="toggleDiffFilter(\'rainbow\')">Rainbow Foil</button>' +
      '<button class="ftog' + cfOn + '" aria-pressed="' + S.fd.cold    + '" onclick="toggleDiffFilter(\'cold\')">Cold Foil</button>' +
    '</div></div>';

  // Filtern
  const items = allItems.filter(item => {
    if (item.foilType === 'rainbow' && !S.fd.rainbow) return false;
    if (item.foilType === 'cold'    && !S.fd.cold)    return false;
    if (!(item.rarity in S.fd)) return true;
    return S.fd[item.rarity];
  });

  const tsStr = new Date(ts).toLocaleString('de-DE', {
    day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'
  });
  const totalSold  = items.reduce((s,i) => s+i.delta, 0);
  const totalCards = items.length;

  // Sortieren
  const sorted = [...items].sort((a,b) => {
    const av = a[S.diffSortCol], bv = b[S.diffSortCol];
    return S.diffSortDir * (typeof av === 'string' ? av.localeCompare(bv) : (av - bv));
  });

  // Set-Ranking (wieviel je Set verkauft)
  const setMap = new Map();
  items.forEach(i => {
    const s = setMap.get(i.expansion) || { expansion: i.expansion, verkauft: 0, karten: 0 };
    s.verkauft += i.delta;
    s.karten   += 1;
    setMap.set(i.expansion, s);
  });
  const setRanking = [...setMap.values()].sort((a,b) => b.verkauft - a.verkauft);

  const setRankingHtml = setRanking.map((s,i) =>
    '<tr>' +
    '<td class="num" style="color:var(--text-muted)">' + (i+1) + '</td>' +
    '<td>' + esc(s.expansion) + '</td>' +
    '<td class="num">' + s.karten + '</td>' +
    '<td class="num" style="color:#e05c5c;font-weight:700">' + s.verkauft + '</td>' +
    '</tr>'
  ).join('');

  // Spalten-Definitionen
  const cols = [
    { key:'name',            label:'Kartenname', num:false },
    { key:'rarity',          label:'Seltenheit', num:false },
    { key:'expansion',       label:'Set',        num:false },
    { key:'altQty',          label:'Vorher',     num:true  },
    { key:'neuQty',          label:'Nachher',    num:true  },
    { key:'delta',           label:'Verkauft',   num:true  },
  ];
  const thead = cols.map(col => {
    const s = S.diffSortCol === col.key;
    const arr = s ? (S.diffSortDir === 1 ? '▲' : '▼') : '▲';
    return '<th class="' + (col.num?'num ':'') + (s?'sorted':'') + '"' +
      ' onclick="sortDiff(\'' + col.key + '\')" scope="col"' +
      ' aria-sort="' + (s?(S.diffSortDir===1?'ascending':'descending'):'none') + '">' +
      esc(col.label) + ' <span class="sort-arrow" aria-hidden="true">' + arr + '</span></th>';
  }).join('');

  const rows = sorted.map(item => {
    const foilTag = item.foilType==='rainbow' ? '<span class="foil-tag rf" title="Rainbow Foil">RF</span>' :
                    item.foilType==='cold'    ? '<span class="foil-tag cf" title="Cold Foil">CF</span>' : '';
    return '<tr>' +
      '<td><span class="dot" style="background:' + getDotColor(item.name) + '" aria-hidden="true"></span>' +
        foilTag + esc(item.name) + '</td>' +
      '<td style="color:' + rarityColor(item.rarity) + ';font-weight:600">' + esc(item.rarity) + '</td>' +
      '<td style="color:var(--text-dim)">' + esc(item.expansion) + '</td>' +
      '<td class="num" style="color:var(--text-muted)">' + item.altQty + '</td>' +
      '<td class="num" style="color:var(--text-muted)">' + item.neuQty + '</td>' +
      '<td class="num"><span class="diff-sold-badge">−' + item.delta + '</span></td>' +
      '</tr>';
  }).join('');

  return (
    diffFilterBar +
    '<div class="diff-banner">' +
      '<div class="diff-banner-icon">📉</div>' +
      '<div class="diff-banner-text">' +
        '<strong>' + totalSold.toLocaleString('de') + ' Stück verkauft · ' + totalCards.toLocaleString('de') + ' verschiedene Karten</strong>' +
        '<span class="diff-ts">Vergleich erstellt ' + tsStr + '</span>' +
      '</div>' +
    '</div>' +

    '<h3 style="font-family:var(--font-display);font-size:.875rem;letter-spacing:.06em;text-transform:uppercase;' +
      'color:var(--text-muted);margin:0 0 10px">Verkäufe nach Set</h3>' +
    '<div class="table-wrap" style="margin-bottom:28px">' +
    '<table aria-label="Verkäufe nach Set">' +
    '<thead><tr>' +
      '<th class="num" scope="col">#</th>' +
      '<th scope="col">Set</th>' +
      '<th class="num" scope="col">Karten</th>' +
      '<th class="num" scope="col">Stück</th>' +
    '</tr></thead>' +
    '<tbody>' + setRankingHtml + '</tbody>' +
    '</table></div>' +

    '<h3 style="font-family:var(--font-display);font-size:.875rem;letter-spacing:.06em;text-transform:uppercase;' +
      'color:var(--text-muted);margin:0 0 10px">Alle verkauften Karten</h3>' +
    '<div class="table-wrap">' +
    '<table aria-label="Verkaufte Karten">' +
    '<thead><tr>' + thead + '</tr></thead>' +
    '<tbody>' + rows + '</tbody>' +
    '</table></div>'
  );
}


// ════════════════════════════════════════════════════════
//  WANTSLISTE
// ════════════════════════════════════════════════════════

// Prüft ob eine Karte in mehreren Pitch-Farben existiert
// Cache für Mehrfachfarben-Check (einmalig nach Analyse aufgebaut)
const _mehrFarbenCache = new Map();

function buildMehrFarbenCache() {
  _mehrFarbenCache.clear();
  if (!S.result) return;
  const baseCounts = new Map();
  ['haupt','andere'].forEach(s => {
    Object.values(S.result[s].setsData).forEach(cards => {
      cards.forEach(card => {
        if ((card.foilType||'none') !== 'none') return;
        const base = card.name.replace(/\s*\((Red|Yellow|Blue)\)\s*/i,'').trim();
        baseCounts.set(base, (baseCounts.get(base)||0) + 1);
      });
    });
  });
  baseCounts.forEach((count, base) => _mehrFarbenCache.set(base, count > 1));
}

function hatMehrereFarben(cardName) {
  const base = cardName.replace(/\s*\((Red|Yellow|Blue)\)\s*/i,'').trim();
  if (_mehrFarbenCache.has(base)) return _mehrFarbenCache.get(base);
  // Fallback wenn Cache leer
  if (!S.result) return false;
  buildMehrFarbenCache();
  return _mehrFarbenCache.get(base) || false;
}

// Pitch-Farbe für CardMarket-Format
function pitchSuffix(cardName) {
  const m = cardName.match(/\((Red|Yellow|Blue)\)/i);
  if (!m) return '';
  return ' ' + m[1].toLowerCase();
}

function cleanCardName(name) {
  return name
    .replace(/\s*\((Red|Yellow|Blue|Regular|Normal|Rainbow Foil|Cold Foil)\)\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function renderWantsPanel() {
  const w    = S.wants;
  const filt = w.filter;

  // Expansionen
  const allExp = [];
  if (S.result) {
    ['haupt','andere'].forEach(s => {
      S.result[s].ranking.forEach(r => {
        if (!allExp.includes(r.expansion)) allExp.push(r.expansion);
      });
    });
  }
  allExp.sort((a,b) => a.localeCompare(b));

  // Karten der gewählten Expansion
  let cards = [];
  if (w.expansion && S.result) {
    ['haupt','andere'].forEach(s => {
      if (S.result[s].setsData[w.expansion]) cards = S.result[s].setsData[w.expansion];
    });
  }

  // Filter + Suche
  const searchQ = (w.search || '').toLowerCase();
  const filtered = cards.filter(card => {
    const ft = card.foilType || 'none';
    if (ft === 'rainbow' && !filt.rainbow) return false;
    if (ft === 'cold'    && !filt.cold)    return false;
    if (ft === 'none'    && !filt.regular) return false;
    const rkey = card.rarity ? card.rarity.replace(/ /g,'_') : '';
    if (rkey && filt[rkey] === false) return false;
    if (searchQ && !card.name.toLowerCase().startsWith(searchQ)) return false;
    return card.fehlend > 0;
  }).sort((a,b) => a.name.localeCompare(b.name));

  // Expansion-Suche (gleiche Logik wie Kartenerfassung)
  const expQ   = w.expSearch || '';
  const expQlo = expQ.toLowerCase();
  const matched = expQ ? allExp.filter(e => e.toLowerCase().startsWith(expQlo)) : allExp;
  const displayVal = w.expansion ? (expQ ? expQ : w.expansion) : expQ;
  const optHtml = matched.map(exp => {
    const sel = exp === w.expansion;
    const hi  = expQ
      ? '<mark>' + esc(exp.slice(0, expQ.length)) + '</mark>' + esc(exp.slice(expQ.length))
      : esc(exp);
    return '<div class="erf-exp-option' + (sel?' selected':'') + '" onmousedown="wantsPickExp(\'' + exp.replace(/'/g,"\\'") + '\')">' + hi + '</div>';
  }).join('') || '<div style="padding:12px;color:var(--text-muted);font-size:.85rem;text-align:center">Keine Treffer</div>';

  const expInput =
    '<div class="erf-exp-search-wrap">' +
      '<input class="erf-exp-search" id="wants-exp-input" type="text" placeholder="Expansion suchen…" ' +
        'value="' + esc(displayVal) + '" ' +
        'oninput="wantsExpSearch(this.value)" ' +
        'onfocus="wantsExpOpen()" ' +
        'onkeydown="wantsExpKey(event)"' +
        ' aria-label="Expansion suchen">' +
      (displayVal ? '<button class="erf-exp-clear" onclick="wantsExpClear()" tabindex="-1">✕</button>' : '') +
      (w.expOpen && matched.length >= 0
        ? '<div class="erf-exp-dropdown" id="wants-exp-dd">' + optHtml + '</div>'
        : '') +
    '</div>';

  // Filter-Bar
  const filterBar =
    '<div class="erf-filter-bar">' +
      '<span class="erf-filter-label">Foil</span>' +
      '<button class="ftog' + (filt.regular?' on':'') + '" onclick="wantsToggleFilter(\'regular\')" style="--fcol:var(--text)">Regular</button>' +
      '<button class="ftog' + (filt.rainbow?' on':'') + ' foil-rf" onclick="wantsToggleFilter(\'rainbow\')" style="--fcol:#b07fd4">RF</button>' +
      '<button class="ftog' + (filt.cold?' on':'') + ' foil-cf" onclick="wantsToggleFilter(\'cold\')" style="--fcol:#5b9bd5">CF</button>' +
    '</div>' +
    '<div class="erf-filter-bar">' +
      '<span class="erf-filter-label">Rarität</span>' +
      ['Token','Common','Rare','Majestic','Super_Rare','Legendary','Fabled','Marvel','Promo'].map(rk => {
        const rl = rk.replace('_',' ');
        return '<button class="ftog' + (filt[rk]!==false?' on':'') + '" onclick="wantsToggleFilter(\'' + rk + '\')" style="--fcol:' + (RARITY_COLOR[rl]||'var(--text-dim)') + '">' + rl + '</button>';
      }).join('') +
    '</div>';

  // Suchfeld
  const searchBar = w.expansion
    ? '<div style="position:relative;margin-bottom:10px">' +
        '<input class="search-input" id="wants-search-input" type="search" placeholder="Kartenname suchen…" ' +
          'value="' + esc(w.search||'') + '" ' +
          'oninput="wantsSearch(this.value)" ' +
          'style="width:100%;box-sizing:border-box;font-size:16px">' +
        (w.search ? '<span id="wants-search-count" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:.75rem">' + filtered.length + ' Karten</span>' : '') +
      '</div>'
    : '';

  // Kartenliste
  const cardRows = filtered.map(card => {
    const cid    = card.cardmarketId + '_' + (card.foilType||'none');
    const entry  = w.session.find(e => String(e.cardId)===String(card.cardmarketId) && (e.foilType||'none')===(card.foilType||'none'));
    const addQty = entry ? entry.qty : 0;
    const isOpen = w.openCard === cid;
    const foilStr = card.foilType==='rainbow' ? '🟣 RF' : card.foilType==='cold' ? '🔵 CF' : '';
    const invZero = card.im_inv === 0;
    const mehrFarben = hatMehrereFarben(card.name);

    const head =
      '<div class="erf-card-head" onclick="wantsToggleCard(\'' + cid + '\')">' +
        '<div>' +
          '<div class="erf-card-name">' + esc(card.name) + (foilStr?' <span style="font-size:.7rem">'+foilStr+'</span>':'') + '</div>' +
          '<div class="erf-card-meta">' +
            '<span style="color:' + rarityColor(card.rarity) + '">' + esc(card.rarity) + '</span>' +
            '<span>Im Inventar: <span class="erf-card-meta-inv' + (invZero?' zero':'') + '">' + card.im_inv + '</span></span>' +
            (!mehrFarben ? '<span style="font-size:.65rem;color:var(--text-muted)">(keine Farbangabe nötig)</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="erf-card-right">' +
          '<span class="erf-card-fehlend-pill' + (card.fehlend>0?' red':'') + '">−' + card.fehlend + '</span>' +
          (addQty>0 ? '<div class="erf-add-badge">+'+addQty+'</div>' : '') +
          '<span class="erf-expand-icon">▼</span>' +
        '</div>' +
      '</div>';

    let inline = '';
    if (isOpen) {
      inline =
        '<div class="erf-inline">' +
          '<div class="erf-inline-row">' +
            '<span class="erf-inline-label">Menge</span>' +
            '<div class="erf-qty-ctrl">' +
              '<button class="erf-qty-btn" onclick="wantsQty(\'' + cid + '\',-1)">−</button>' +
              '<input class="erf-qty-num" id="wqn-' + cid + '" type="number" min="0" max="999" value="' + addQty + '"' +
                ' oninput="wantsQtyInput(\'' + cid + '\',this)"' +
                ' onblur="wantsQtyBlur(\'' + cid + '\',this)"' +
                ' onfocus="this.select()"' +
                ' style="-moz-appearance:textfield">' +
              '<button class="erf-qty-btn" onclick="wantsQty(\'' + cid + '\',+1)">+</button>' +
              '<button class="erf-fehlmenge-btn" onclick="wantsSetFehlmenge(\'' + cid + '\',' + card.fehlend + ')">Fehlmenge ('+card.fehlend+')</button>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
    return '<div class="erf-card-row' + (addQty>0?' has-qty':'') + (isOpen?' erf-open':'') + '">' + head + inline + '</div>';
  }).join('');

  const listHtml = !w.expansion
    ? '<p style="color:var(--text-muted);text-align:center;padding:32px;font-size:.9rem">Bitte oben eine Expansion wählen</p>'
    : filtered.length === 0
      ? '<p style="color:var(--text-muted);text-align:center;padding:24px;font-size:.9rem">Keine fehlenden Karten mit aktiven Filtern ✓</p>'
      : '<div class="erf-card-list" id="wants-card-list">' + cardRows + '</div>';

  // Session-Übersicht
  const sessionItems = w.session.map((e, i) => {
    const mehrFarben = hatMehrereFarben(e.name);
    const suffix = mehrFarben ? pitchSuffix(e.name) : '';
    const baseName = cleanCardName(e.name);
    const cmLine = e.qty + ' ' + baseName + suffix;
    return '<div class="erf-session-item">' +
      '<div class="erf-session-item-name" style="font-family:var(--font-mono);font-size:.8rem">' + esc(cmLine) + '</div>' +
      '<div class="erf-session-item-badge">×' + e.qty + '</div>' +
      '<div class="erf-session-item-del" onclick="wantsRemove(' + i + ')" role="button">✕</div>' +
    '</div>';
  }).join('');

  const sessionHtml = w.session.length > 0
    ? '<div class="erf-session-header">' +
        '<span class="erf-session-title">Vorschau</span>' +
        '<span class="erf-session-count">' + w.session.length + ' Einträge</span>' +
      '</div>' +
      '<div class="erf-session-list">' + sessionItems + '</div>'
    : '';

  const stickyBtn =
    '<div class="wants-sticky">' +
      '<button class="btn-primary wants-copy-btn" onclick="wantsCopyToClipboard()">Wantsliste kopieren' +
        (w.session.length > 0 ? ' (' + w.session.length + ')' : '') +
      '</button>' +
      '<button class="btn wants-clear-btn" onclick="wantsClearAll()">Auswahl löschen</button>' +
    '</div>';

  return '<div id="wants-panel">' +
    (S.result ? expInput : '<p style="color:var(--text-muted);font-size:.9rem;padding:12px 0">Bitte zuerst Analyse starten.</p>') +
    (w.expansion ? filterBar : '') +
    searchBar +
    listHtml +
    sessionHtml +
    stickyBtn +
  '</div>';
}

// ── Wants-Interaktionen ──

function wantsGetOrCreate(cid) {
  const sep    = cid.lastIndexOf('_');
  const cardId = cid.slice(0, sep);
  const ft     = cid.slice(sep + 1);
  let entry = S.wants.session.find(e => String(e.cardId)===cardId && (e.foilType||'none')===ft);
  if (!entry) {
    let card = null;
    if (S.result) {
      ['haupt','andere'].forEach(s => {
        Object.values(S.result[s].setsData).forEach(cards => {
          cards.forEach(c => {
            if (String(c.cardmarketId)===cardId && (c.foilType||'none')===ft) card = c;
          });
        });
      });
    }
    if (!card) return null;
    entry = { cardId: card.cardmarketId, name: card.name, foilType: card.foilType||'none', qty: 0, fehlend: card.fehlend };
    S.wants.session.push(entry);
  }
  return entry;
}

function wantsToggleCard(cid) {
  S.wants.openCard = S.wants.openCard === cid ? null : cid;
  render();
  setTimeout(() => {
    const el = document.querySelector('#wants-panel .erf-card-row.erf-open');
    if (el) el.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }, 80);
}

function wantsToggleFilter(key) { S.wants.filter[key] = !S.wants.filter[key]; render(); }

function wantsSearch(val) {
  S.wants.search = val;
  S.wants.openCard = null;
  // DOM-Update ohne Re-Render
  const listEl = document.getElementById('wants-card-list');
  if (!listEl) { render(); return; }
  // Vereinfacht: nur render wenn nötig
  render();
  setTimeout(() => {
    const inp = document.getElementById('wants-search-input');
    if (inp) { inp.focus(); inp.setSelectionRange(val.length, val.length); }
  }, 0);
}

function wantsPickExp(val) {
  S.wants.expansion = val; S.wants.expSearch = ''; S.wants.expOpen = false;
  S.wants.openCard = null; S.wants.search = '';
  document.getElementById('wants-exp-dd')?.remove();
  render();
}
function wantsExpSearch(val) {
  S.wants.expSearch = val; S.wants.expOpen = true;
  render();
  setTimeout(() => { const i = document.querySelector('#wants-panel .erf-exp-search'); if(i){i.focus();i.setSelectionRange(val.length,val.length);} }, 0);
}
function wantsExpOpen() { if (!S.wants.expOpen) { S.wants.expOpen = true; render(); } }
function wantsExpClear() {
  S.wants.expansion = null; S.wants.expSearch = ''; S.wants.expOpen = false;
  S.wants.openCard = null; S.wants.search = ''; render();
}
function wantsExpKey(e) {
  const dd = document.getElementById('wants-exp-dd');
  if (!dd) return;
  const opts = dd.querySelectorAll('.erf-exp-option');
  let focused = dd.querySelector('.erf-exp-option.focused');
  if (e.key==='ArrowDown') { e.preventDefault(); const n=focused?focused.nextElementSibling:opts[0]; if(n){focused?.classList.remove('focused');n.classList.add('focused');n.scrollIntoView({block:'nearest'});} }
  else if (e.key==='ArrowUp') { e.preventDefault(); const p=focused?.previousElementSibling; if(p){focused.classList.remove('focused');p.classList.add('focused');p.scrollIntoView({block:'nearest'});} }
  else if (e.key==='Enter') { e.preventDefault(); (focused||opts[0])?.click(); }
  else if (e.key==='Escape') { S.wants.expOpen=false; render(); }
}

function wantsQtyUpdate(cid, qty) {
  const entry = wantsGetOrCreate(cid);
  if (!entry) return;
  qty = Math.max(0, qty);
  entry.qty = qty;
  const sep = cid.lastIndexOf('_'); const cardId = cid.slice(0,sep); const ft = cid.slice(sep+1);
  if (qty === 0) S.wants.session = S.wants.session.filter(e => !(String(e.cardId)===cardId && (e.foilType||'none')===ft));
  const el = document.getElementById('wqn-' + cid);
  if (el) el.value = qty;
  const row = el?.closest('.erf-card-row');
  if (row) {
    const badge = row.querySelector('.erf-add-badge');
    if (qty > 0) { row.classList.add('has-qty'); if(badge) badge.textContent='+'+qty; else row.querySelector('.erf-card-right')?.insertAdjacentHTML('afterbegin','<div class="erf-add-badge">+'+qty+'</div>'); }
    else { row.classList.remove('has-qty'); badge?.remove(); }
  }
  // Sticky-Button Zähler
  const btn = document.querySelector('.wants-copy-btn');
  if (btn) btn.textContent = 'Wantsliste kopieren' + (S.wants.session.length>0?' ('+S.wants.session.length+')':'');
}

function wantsQty(cid, delta) {
  const entry = wantsGetOrCreate(cid);
  wantsQtyUpdate(cid, (entry?.qty||0) + delta);
}
function wantsQtyInput(cid, input) {
  const val = parseInt(input.value);
  if (!isNaN(val)) wantsQtyUpdate(cid, val);
}
function wantsQtyBlur(cid, input) {
  const val = parseInt(input.value)||0;
  input.value = val;
  wantsQtyUpdate(cid, val);
}
function wantsSetFehlmenge(cid, fehlend) {
  wantsQtyUpdate(cid, fehlend);
}

function wantsRemove(i) { S.wants.session.splice(i,1); render(); }
function wantsClearAll() { S.wants.session = []; render(); }

function wantsCopyToClipboard() {
  if (S.wants.session.length === 0) {
    alert('Noch keine Karten in der Wantsliste.\nBitte zuerst Karten hinzufügen.');
    return;
  }
  const lines = S.wants.session.map(e => {
    const mehrFarben = hatMehrereFarben(e.name);
    const suffix = mehrFarben ? pitchSuffix(e.name) : '';
    const baseName = cleanCardName(e.name);
    return e.qty + ' ' + baseName + suffix;
  }).join('\n');

  navigator.clipboard.writeText(lines).then(() => {
    // Toast anzeigen
    const toast = document.createElement('div');
    toast.className = 'wants-toast';
    toast.textContent = '✓ Wantsliste kopiert!';
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('fade'), 1500);
    setTimeout(() => toast.remove(), 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = lines;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const toast = document.createElement('div');
    toast.className = 'wants-toast';
    toast.textContent = '✓ Wantsliste kopiert!';
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('fade'), 1500);
    setTimeout(() => toast.remove(), 2000);
  });
}

// ════════════════════════════════════════════════════════
//  KARTENERFASSUNG
// ════════════════════════════════════════════════════════


const ERF_LANGUAGES = {
  'English':  { flag: '🇬🇧', code: 'EN' },
  'German':   { flag: '🇩🇪', code: 'DE' },
  'French':   { flag: '🇫🇷', code: 'FR' },
  'Spanish':  { flag: '🇪🇸', code: 'ES' },
  'Italian':  { flag: '🇮🇹', code: 'IT' },
  'Japanese': { flag: '🇯🇵', code: 'JP' },
  'Korean':   { flag: '🇰🇷', code: 'KR' },
  'Chinese Simplified':  { flag: '🇨🇳', code: 'CN' },
  'Chinese Traditional': { flag: '🇹🇼', code: 'TW' },
  'Portuguese': { flag: '🇵🇹', code: 'PT' },
};
function renderScanPanel() {
  const erf  = S.erf;
  const filt = erf.filter;

  // Alle Expansionen sammeln
  const allExp = [];
  if (S.result) {
    ['haupt','andere'].forEach(s => {
      S.result[s].ranking.forEach(r => {
        if (!allExp.find(e => e.expansion === r.expansion))
          allExp.push(r.expansion);
      });
    });
  }
  allExp.sort((a,b) => a.localeCompare(b));

  const selectOpts = allExp.map(exp =>
    '<option value="' + esc(exp) + '"' + (erf.expansion===exp?' selected':'') + '>' + esc(exp) + '</option>'
  ).join('');

  // Verfügbare Sprachen aus Inventar ableiten
  const availLangs = ['English']; // immer als Fallback
  if (S.invCSV) {
    S.invCSV.forEach(r => {
      const lang = r.language || r.Language;
      if (lang && !availLangs.includes(lang)) availLangs.push(lang);
    });
  }

  // Karten der gewählten Expansion
  let cards = [];
  if (erf.expansion && S.result) {
    ['haupt','andere'].forEach(s => {
      if (S.result[s].setsData[erf.expansion]) cards = S.result[s].setsData[erf.expansion];
    });
  }

  // Filter + Suche anwenden
  const searchQ = (erf.search || '').toLowerCase();
  const filtered = cards.filter(card => {
    const ft = card.foilType || 'none';
    if (ft === 'rainbow' && !filt.rainbow) return false;
    if (ft === 'cold'    && !filt.cold)    return false;
    if (ft === 'none'    && !filt.regular) return false;
    const rkey = card.rarity ? card.rarity.replace(/ /g,'_') : '';
    if (rkey && filt[rkey] === false) return false;
    if (searchQ && !card.name.toLowerCase().startsWith(searchQ)) return false;
    return card.fehlend > 0;
  }).sort((a,b) => a.name.localeCompare(b.name));

  // Stats
  const totalFehlend = cards.filter(c=>c.fehlend>0).length;
  const inSession    = erf.session.filter(e=>e.expansion===erf.expansion).length;
  const statsHtml = '';

  // Filter-Bar
  const filterBar =
    '<div class="erf-filter-bar">' +
      '<span class="erf-filter-label">Foil</span>' +
      '<button class="ftog' + (filt.regular?' on':'') + '" onclick="erfToggleFilter(\'regular\')" style="--fcol:var(--text)">Regular</button>' +
      '<button class="ftog' + (filt.rainbow?' on':'') + ' foil-rf" onclick="erfToggleFilter(\'rainbow\')" style="--fcol:#b07fd4">Rainbow Foil</button>' +
      '<button class="ftog' + (filt.cold?'   on':'') + ' foil-cf" onclick="erfToggleFilter(\'cold\')" style="--fcol:#5b9bd5">Cold Foil</button>' +
    '</div>' +
    '<div class="erf-filter-bar">' +
      '<span class="erf-filter-label">Rarität</span>' +
      '<button class="ftog' + (filt["Token"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Token\')" style="--fcol:' + (RARITY_COLOR["Token"]||'var(--text-dim)') + '">Token</button>' +
      '<button class="ftog' + (filt["Common"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Common\')" style="--fcol:' + (RARITY_COLOR["Common"]||'var(--text-dim)') + '">Common</button>' +
      '<button class="ftog' + (filt["Rare"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Rare\')" style="--fcol:' + (RARITY_COLOR["Rare"]||'var(--text-dim)') + '">Rare</button>' +
      '<button class="ftog' + (filt["Majestic"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Majestic\')" style="--fcol:' + (RARITY_COLOR["Majestic"]||'var(--text-dim)') + '">Majestic</button>' +
      '<button class="ftog' + (filt["Super_Rare"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Super_Rare\')" style="--fcol:' + (RARITY_COLOR["Super Rare"]||'var(--text-dim)') + '">Super Rare</button>' +
      '<button class="ftog' + (filt["Legendary"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Legendary\')" style="--fcol:' + (RARITY_COLOR["Legendary"]||'var(--text-dim)') + '">Legendary</button>' +
      '<button class="ftog' + (filt["Fabled"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Fabled\')" style="--fcol:' + (RARITY_COLOR["Fabled"]||'var(--text-dim)') + '">Fabled</button>' +
      '<button class="ftog' + (filt["Marvel"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Marvel\')" style="--fcol:' + (RARITY_COLOR["Marvel"]||'var(--text-dim)') + '">Marvel</button>' +
      '<button class="ftog' + (filt["Promo"]!==false?' on':'') + '" onclick="erfToggleFilter(\'Promo\')" style="--fcol:' + (RARITY_COLOR["Promo"]||'var(--text-dim)') + '">Promo</button>' +
    '</div>';

  // Suchleiste
  const searchBar = erf.expansion
    ? '<div style="position:relative;margin-bottom:10px">' +
        '<input class="search-input" type="search" placeholder="Kartenname suchen…" ' +
          'value="' + esc(erf.search||'') + '" ' +
          'aria-label="Karte suchen" ' +
          'oninput="erfSearch(this.value)" ' +
          'style="width:100%;box-sizing:border-box;font-size:16px">' +
        '<span id="erf-search-count" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:.75rem">' + (erf.search ? filtered.length + ' Karten' : '') + '</span>' +
      '</div>'
    : '';

  // Kartenliste
  const cardRows = filtered.map(card => {
    const cid     = card.cardmarketId + '_' + (card.foilType||'none');
    const isOpen  = erf.openCard === cid;
    const entry   = erf.session.find(e => e.cardId===card.cardmarketId && e.foilType===(card.foilType||''));
    const addQty  = entry ? entry.qty  : 0;
    const cond    = entry ? entry.condition : 'NM';
    const comment = entry ? entry.comment   : '';
    const foilStr = card.foilType==='rainbow' ? '🟣 RF' : card.foilType==='cold' ? '🔵 CF' : '';
    const invZero = card.im_inv === 0;

    // Kopfzeile
    const head =
      '<div class="erf-card-head" onclick="erfToggleCard(\'' + cid + '\')">' +
        '<div>' +
          '<div class="erf-card-name">' + esc(card.name) + (foilStr?' <span style="font-size:.7rem">'+foilStr+'</span>':'') + '</div>' +
          '<div class="erf-card-meta">' +
            '<span style="color:' + rarityColor(card.rarity) + '">' + esc(card.rarity) + '</span>' +
            '<span>Im Inventar: <span class="erf-card-meta-inv' + (invZero?' zero':'') + '">' + card.im_inv + '</span></span>' +
          '</div>' +
        '</div>' +
        '<div class="erf-card-right">' +
          '<span class="erf-card-fehlend-pill' + (card.fehlend>0?' red':'') + '">−' + card.fehlend + '</span>' +
          (addQty>0 ? '<div class="erf-add-badge">+'+addQty+'</div>' : '') +
          '<span class="erf-expand-icon">▼</span>' +
        '</div>' +
      '</div>';

    // Inline-Eingabe (nur wenn offen)
    let inline = '';
    if (isOpen) {
      const lang    = entry ? (entry.language || erf.defaultLanguage) : erf.defaultLanguage;
      const condBtns = ['NM','EX','GD','LP','PL'].map(co =>
        '<button class="erf-seg-btn' + (cond===co?' active':'') + '" onclick="erfSetCond(\'' + cid + '\',\'' + co + '\')">' + co + '</button>'
      ).join('');
      const langBtns = availLangs.map(l => {
        const info = ERF_LANGUAGES[l] || { flag: '🌐', code: l.slice(0,2).toUpperCase() };
        return '<button class="erf-seg-btn erf-lang-btn' + (lang===l?' active':'') + '" onclick="erfSetLang(\'' + cid + '\',\'' + l + '\')" title="' + l + '">' +
          info.flag + ' ' + info.code + '</button>';
      }).join('');
      inline =
        '<div class="erf-inline">' +
          // Menge
          '<div class="erf-inline-row">' +
            '<span class="erf-inline-label">Menge</span>' +
            '<div class="erf-qty-ctrl">' +
              '<button class="erf-qty-btn" onclick="erfInlineQty(\'' + cid + '\',-1)">−</button>' +
              '<input class="erf-qty-num" id="eqn-' + cid + '" type="number" min="0" max="999" value="' + addQty + '"' +
              ' oninput="erfQtyInput(\'' + cid + '\',this)" onblur="erfQtyBlur(\'' + cid + '\',this)"' +
              ' onfocus="this.select()"' +
              ' style="-moz-appearance:textfield">' +
              '<button class="erf-qty-btn" onclick="erfInlineQty(\'' + cid + '\',+1)">+</button>' +
            '</div>' +
          '</div>' +
          // Zustand
          '<div class="erf-inline-row">' +
            '<span class="erf-inline-label">Zustand</span>' +
            '<div class="erf-seg">' + condBtns + '</div>' +
          '</div>' +
          // Sprache
          '<div class="erf-inline-row">' +
            '<span class="erf-inline-label">Sprache</span>' +
            '<div class="erf-seg">' + langBtns + '</div>' +
          '</div>' +

          // Kommentar (auto-save bei Verlassen)
          '<div class="erf-inline-row">' +
            '<span class="erf-inline-label">Notiz</span>' +
            '<input class="erf-comment" type="text" placeholder="optional…" value="' + esc(comment) + '"' +
              ' id="eco-' + cid + '" oninput="erfSetComment(\'' + cid + '\',this.value)"' +
              ' onblur="erfAutoSave(\'' + cid + '\')">' +
          '</div>' +
        '</div>';
    }

    return '<div class="erf-card-row' + (addQty>0?' has-qty':'') + (isOpen?' erf-open':'') + '">' + head + inline + '</div>';
  }).join('');

  const listHtml = !erf.expansion
    ? '<p style="color:var(--text-muted);text-align:center;padding:32px;font-size:.9rem">Bitte oben eine Expansion wählen</p>'
    : filtered.length === 0
      ? '<p style="color:var(--text-muted);text-align:center;padding:24px;font-size:.9rem">Keine fehlenden Karten mit aktiven Filtern ✓</p>'
      : '<div class="erf-card-list" id="erf-card-list">' + cardRows + '</div>';

  // Session-Übersicht
  const sessionItems = erf.session.map((e, i) =>
    '<div class="erf-session-item">' +
      '<div class="erf-session-item-name">' + esc(e.name) + '</div>' +
      '<div class="erf-session-item-detail">' + esc(e.condition) + (e.foilType?' · '+(e.foilType==='rainbow'?'RF':'CF'):'') + '</div>' +
      '<div class="erf-session-item-badge">+' + e.qty + '</div>' +
      '<div class="erf-session-item-del" onclick="erfRemove(' + i + ')" role="button" aria-label="Entfernen">✕</div>' +
    '</div>'
  ).join('');

  const sessionListHtml = erf.session.length > 0
    ? '<div class="erf-session-header">' +
        '<span class="erf-session-title">Session</span>' +
        '<span class="erf-session-count">' + erf.session.length + ' Einträge</span>' +
      '</div>' +
      '<div class="erf-session-list">' + sessionItems + '</div>'
    : '';
  // Export-Button immer sticky sichtbar
  const stickyExport =
    '<div class="erf-sticky-export">' +
      '<button class="btn-primary erf-export-btn" onclick="erfExportCSV()">' +
        (erf.session.length > 0 ? 'Als CSV exportieren (' + erf.session.length + ' Einträge)' : 'Als CSV exportieren') +
      '</button>' +
    '</div>';

  return '<div id="erf-panel">' +
    (S.result
      ? (function() {
          const expQ    = erf.expSearch || '';
          const expQlo  = expQ.toLowerCase();
          const matched = expQ
            ? allExp.filter(e => e.toLowerCase().startsWith(expQlo))
            : allExp;
          const displayVal = erf.expansion
            ? (expQ ? expQ : erf.expansion)
            : expQ;
          const optHtml = matched.map(exp => {
            const sel = exp === erf.expansion;
            const hi  = expQ
              ? '<mark>' + esc(exp.slice(0, expQ.length)) + '</mark>' + esc(exp.slice(expQ.length))
              : esc(exp);
            return '<div class="erf-exp-option' + (sel?' selected':'') + '" onclick="erfPickExpansion(\'' + exp.replace(/'/g,"\\'") + '\')">' + hi + '</div>';
          }).join('');
          const noMatch = matched.length === 0
            ? '<div style="padding:12px;color:var(--text-muted);font-size:.85rem;text-align:center">Keine Treffer</div>'
            : '';
          return '<div class="erf-exp-search-wrap">' +
            '<input class="erf-exp-search" type="text" placeholder="Expansion suchen…" ' +
              'value="' + esc(displayVal) + '" ' +
              'oninput="erfExpSearch(this.value)" ' +
              'onfocus="erfExpOpen()" ' +
              'onkeydown="erfExpKey(event)"' +
              ' aria-label="Expansion suchen">' +
            (displayVal ? '<button class="erf-exp-clear" onclick="erfExpClear()" tabindex="-1">✕</button>' : '') +
            (erf.expOpen && (matched.length > 0 || expQ)
              ? '<div class="erf-exp-dropdown" id="erf-exp-dd">' + optHtml + noMatch + '</div>'
              : '') +
          '</div>';
        })()
      : '<p style="color:var(--text-muted);font-size:.9rem;padding:12px 0">Bitte zuerst Kartenliste + Inventar laden und Analyse starten.</p>') +
    statsHtml +
    (erf.expansion ? filterBar : '') +
    searchBar +
    listHtml +
    sessionListHtml +
    stickyExport +
  '</div>';
}

// ── Interaktionen ──

function erfSelectExpansion(val) {
  S.erf.expansion = val || null;
  S.erf.openCard  = null;
  S.erf.search    = '';
  _erfCardMap.clear();
  render();
}

function erfExpSearch(val) {
  S.erf.expSearch = val;
  S.erf.expOpen   = true;
  // Dropdown-Inhalt direkt aktualisieren — kein render(), kein Fokusverlust
  const allExp = [];
  if (S.result) {
    ['haupt','andere'].forEach(s => {
      S.result[s].ranking.forEach(r => {
        if (!allExp.find(e => e === r.expansion)) allExp.push(r.expansion);
      });
    });
  }
  allExp.sort((a,b) => a.localeCompare(b));
  const expQlo = val.toLowerCase();
  const matched = val ? allExp.filter(e => e.toLowerCase().startsWith(expQlo)) : allExp;
  const optHtml = matched.map(exp => {
    const sel = exp === S.erf.expansion;
    const hi  = val
      ? '<mark>' + esc(exp.slice(0, val.length)) + '</mark>' + esc(exp.slice(val.length))
      : esc(exp);
    return '<div class="erf-exp-option' + (sel?' selected':'') + '" onmousedown="erfPickExpansion(\'' + exp.replace(/'/g,"\\'") + '\')">' + hi + '</div>';
  }).join('') || '<div style="padding:12px;color:var(--text-muted);font-size:.85rem;text-align:center">Keine Treffer</div>';
  let dd = document.getElementById('erf-exp-dd');
  if (dd) {
    dd.innerHTML = optHtml;
  } else {
    const wrap = document.querySelector('.erf-exp-search-wrap');
    if (wrap) {
      dd = document.createElement('div');
      dd.className = 'erf-exp-dropdown'; dd.id = 'erf-exp-dd';
      dd.innerHTML = optHtml;
      wrap.appendChild(dd);
    }
  }
  // Placeholder im Input aktualisieren
  const inp = document.querySelector('.erf-exp-search');
  if (inp && inp !== document.activeElement) inp.value = val;
}

function erfExpOpen() {
  S.erf.expOpen = true;
  // Dropdown direkt ins DOM einfügen ohne render() — Fokus bleibt erhalten
  const wrap = document.querySelector('.erf-exp-search-wrap');
  if (!wrap || document.getElementById('erf-exp-dd')) return;
  const allExp = [];
  if (S.result) {
    ['haupt','andere'].forEach(s => {
      S.result[s].ranking.forEach(r => {
        if (!allExp.find(e => e === r.expansion)) allExp.push(r.expansion);
      });
    });
  }
  allExp.sort((a,b) => a.localeCompare(b));
  const expQ = (S.erf.expSearch || '').toLowerCase();
  const matched = expQ ? allExp.filter(e => e.toLowerCase().startsWith(expQ)) : allExp;
  const optHtml = matched.map(exp => {
    const sel = exp === S.erf.expansion;
    return '<div class="erf-exp-option' + (sel?' selected':'') + '" onmousedown="erfPickExpansion(\'' + exp.replace(/'/g,"\\'") + '\')">' + esc(exp) + '</div>';
  }).join('') || '<div style="padding:12px;color:var(--text-muted);font-size:.85rem;text-align:center">Keine Treffer</div>';
  const dd = document.createElement('div');
  dd.className = 'erf-exp-dropdown'; dd.id = 'erf-exp-dd';
  dd.innerHTML = optHtml;
  wrap.appendChild(dd);
  // Zur aktuellen Auswahl scrollen
  const sel = dd.querySelector('.selected');
  if (sel) sel.scrollIntoView({ block: 'nearest' });
}

function erfExpClear() {
  S.erf.expSearch  = '';
  S.erf.expansion  = null;
  S.erf.expOpen    = false;
  S.erf.openCard   = null;
  S.erf.search     = '';
  _erfCardMap.clear();
  render();
  setTimeout(() => document.querySelector('.erf-exp-search')?.focus(), 0);
}

function erfPickExpansion(val) {
  S.erf.expansion = val;
  S.erf.expSearch = '';
  S.erf.expOpen   = false;
  S.erf.openCard  = null;
  S.erf.search    = '';
  _erfCardMap.clear();
  // Dropdown sofort entfernen
  document.getElementById('erf-exp-dd')?.remove();
  // Input-Wert setzen ohne Fokus zu stören
  const inp = document.querySelector('.erf-exp-search');
  if (inp) inp.value = val;
  render();
}

function erfExpKey(e) {
  const dd = document.getElementById('erf-exp-dd');
  if (!dd) return;
  const opts = dd.querySelectorAll('.erf-exp-option');
  let focused = dd.querySelector('.erf-exp-option.focused');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const next = focused ? focused.nextElementSibling : opts[0];
    if (next) { focused?.classList.remove('focused'); next.classList.add('focused'); next.scrollIntoView({block:'nearest'}); }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prev = focused?.previousElementSibling;
    if (prev) { focused.classList.remove('focused'); prev.classList.add('focused'); prev.scrollIntoView({block:'nearest'}); }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const active = focused || opts[0];
    if (active) active.click();
  } else if (e.key === 'Escape') {
    S.erf.expOpen = false; render();
  }
}

// Dropdown schließen bei Klick außerhalb
document.addEventListener('click', e => {
  if (S.erf && S.erf.expOpen && !e.target.closest('.erf-exp-search-wrap')) {
    S.erf.expOpen = false;
    if (!S.erf.expansion) S.erf.expSearch = '';
    document.getElementById('erf-exp-dd')?.remove();
  }
});

function erfSearch(val) {
  S.erf.search   = val;
  S.erf.openCard = null;

  // Nur Liste neu rendern — Input behält Fokus
  const listEl = document.getElementById('erf-card-list');
  if (!listEl) { render(); return; }

  const erf  = S.erf;
  const filt = erf.filter;
  let cards  = [];
  if (erf.expansion && S.result) {
    ['haupt','andere'].forEach(s => {
      if (S.result[s].setsData[erf.expansion]) cards = S.result[s].setsData[erf.expansion];
    });
  }
  const searchQ = (val || '').toLowerCase();
  const filtered = cards.filter(card => {
    const ft = card.foilType || 'none';
    if (ft === 'rainbow' && !filt.rainbow) return false;
    if (ft === 'cold'    && !filt.cold)    return false;
    if (ft === 'none'    && !filt.regular) return false;
    const rkey = card.rarity ? card.rarity.replace(/ /g,'_') : '';
    if (rkey && filt[rkey] === false) return false;
    if (searchQ && !card.name.toLowerCase().startsWith(searchQ)) return false;
    return card.fehlend > 0;
  }).sort((a,b) => a.name.localeCompare(b.name));

  // Zeilen neu aufbauen (gleiche Logik wie in renderScanPanel)
  const cardRows = filtered.map(card => {
    const cid    = card.cardmarketId + '_' + (card.foilType||'none');
    const entry  = erf.session.find(e => String(e.cardId)===String(card.cardmarketId) && (e.foilType||'none')===(card.foilType||'none'));
    const addQty = entry ? entry.qty : 0;
    const foilStr = card.foilType==='rainbow' ? '🟣 RF' : card.foilType==='cold' ? '🔵 CF' : '';
    const invZero = card.im_inv === 0;
    const head =
      '<div class="erf-card-head" onclick="erfToggleCard(\'' + cid + '\')">' +
        '<div>' +
          '<div class="erf-card-name">' + esc(card.name) + (foilStr?' <span style="font-size:.7rem">'+foilStr+'</span>':'') + '</div>' +
          '<div class="erf-card-meta">' +
            '<span style="color:' + rarityColor(card.rarity) + '">' + esc(card.rarity) + '</span>' +
            '<span>Im Inventar: <span class="erf-card-meta-inv' + (invZero?' zero':'') + '">' + card.im_inv + '</span></span>' +
          '</div>' +
        '</div>' +
        '<div class="erf-card-right">' +
          '<span class="erf-card-fehlend-pill' + (card.fehlend>0?' red':'') + '">−' + card.fehlend + '</span>' +
          (addQty>0 ? '<div class="erf-add-badge">+'+addQty+'</div>' : '') +
          '<span class="erf-expand-icon">▼</span>' +
        '</div>' +
      '</div>';
    return '<div class="erf-card-row' + (addQty>0?' has-qty':'') + '">' + head + '</div>';
  }).join('');

  listEl.innerHTML = cardRows ||
    '<p style="color:var(--text-muted);text-align:center;padding:24px;font-size:.9rem">Keine Treffer</p>';

  // Zähler aktualisieren
  const countEl = document.getElementById('erf-search-count');
  if (countEl) countEl.textContent = searchQ ? filtered.length + ' Karten' : '';
  const searchInp = document.querySelector('#erf-panel .search-input');
  if (searchInp) { searchInp.focus(); searchInp.setSelectionRange(val.length, val.length); }
}

function erfToggleFilter(key) {
  S.erf.filter[key] = !S.erf.filter[key];
  render();
}

function erfToggleCard(cid) {
  S.erf.openCard = (S.erf.openCard === cid) ? null : cid;
  render();
  // Scroll zur aufgeklappten Karte
  setTimeout(() => {
    const el = document.querySelector('.erf-card-row.erf-open');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 80);
}

// Menge direkt ändern ohne Re-Render (schnell, kein Flicker)
// Zentraler Card-Lookup per cid (kein JSON im onclick nötig)
const _erfCardMap = new Map();

function erfGetCard(cid) {
  if (_erfCardMap.has(cid)) return _erfCardMap.get(cid);
  if (!S.result) return null;
  const sep = cid.lastIndexOf('_');
  const cardId  = cid.slice(0, sep);
  const foilKey = cid.slice(sep + 1);
  const ft      = foilKey === 'none' ? 'none' : foilKey;
  let found = null;
  ['haupt','andere'].forEach(s => {
    Object.values(S.result[s].setsData).forEach(cards => {
      cards.forEach(card => {
        if (String(card.cardmarketId) === cardId && (card.foilType||'none') === ft) found = card;
      });
    });
  });
  if (found) _erfCardMap.set(cid, found);
  return found;
}

function erfGetOrCreateEntry(cid) {
  const sep     = cid.lastIndexOf('_');
  const cardId  = cid.slice(0, sep);
  const foilKey = cid.slice(sep + 1);
  const ft      = foilKey === 'none' ? 'none' : foilKey;
  // Suche in Session (String-Vergleich für cardId)
  let entry = S.erf.session.find(e => String(e.cardId) === cardId && (e.foilType||'none') === ft);
  if (!entry) {
    const card = erfGetCard(cid);
    if (!card) return null;
    entry = {
      cardId: card.cardmarketId, name: card.name,
      expansion: card.expansion||S.erf.expansion,
      setCode: card.setCode||'', cn: card.cn||'',
      rarity: card.rarity, foilType: card.foilType||'none',
      qty: 0, condition: 'NM', language: S.erf.defaultLanguage, comment: '',
      nameDE: card.nameDE||card.name, nameES: card.nameES||card.name,
      nameFR: card.nameFR||card.name, nameIT: card.nameIT||card.name,
    };
    S.erf.session.push(entry);
  }
  return entry;
}

function erfInlineQty(cid, delta) {
  const entry = erfGetOrCreateEntry(cid);
  if (!entry) return;
  entry.qty = Math.max(0, (entry.qty||0) + delta);
  const sep     = cid.lastIndexOf('_');
  const cardId  = cid.slice(0, sep);
  const foilKey = cid.slice(sep + 1);
  const ft      = foilKey === 'none' ? 'none' : foilKey;
  if (entry.qty === 0) {
    S.erf.session = S.erf.session.filter(e => !(String(e.cardId)===cardId && (e.foilType||'none')===ft));
  }
  // DOM direkt aktualisieren — kein Re-Render
  const el = document.getElementById('eqn-' + cid);
  if (el) el.value = entry.qty;
  const row = el ? el.closest('.erf-card-row') : null;
  if (row) {
    const badge = row.querySelector('.erf-add-badge');
    if (entry.qty > 0) {
      row.classList.add('has-qty');
      if (badge) badge.textContent = '+' + entry.qty;
      else row.querySelector('.erf-card-right')
            ?.insertAdjacentHTML('afterbegin', '<div class="erf-add-badge">+' + entry.qty + '</div>');
    } else {
      row.classList.remove('has-qty');
      badge?.remove();
    }
  }
}

function erfQtyInput(cid, input) {
  // Sofort beim Tippen: ungültige Zeichen verhindern
  const val = parseInt(input.value);
  if (!isNaN(val) && val >= 0) {
    const entry = erfGetOrCreateEntry(cid);
    if (entry) {
      entry.qty = val;
      // Badge live aktualisieren
      const row = input.closest('.erf-card-row');
      if (row) {
        const badge = row.querySelector('.erf-add-badge');
        if (val > 0) {
          row.classList.add('has-qty');
          if (badge) badge.textContent = '+' + val;
          else row.querySelector('.erf-card-right')
                ?.insertAdjacentHTML('afterbegin', '<div class="erf-add-badge">+' + val + '</div>');
        } else {
          row.classList.remove('has-qty');
          badge?.remove();
        }
      }
    }
  }
}

function erfQtyBlur(cid, input) {
  // Bei Verlassen: leeres Feld auf 0 setzen, Entry ggf. entfernen
  const val = parseInt(input.value) || 0;
  input.value = val;
  const sep    = cid.lastIndexOf('_');
  const cardId = cid.slice(0, sep);
  const ft     = cid.slice(sep + 1);
  const entry  = S.erf.session.find(e => String(e.cardId)===cardId && (e.foilType||'none')===ft);
  if (entry) entry.qty = val;
  if (val === 0) {
    S.erf.session = S.erf.session.filter(e => !(String(e.cardId)===cardId && (e.foilType||'none')===ft));
    const row = input.closest('.erf-card-row');
    if (row) { row.classList.remove('has-qty'); row.querySelector('.erf-add-badge')?.remove(); }
  }
}

function erfSetCond(cid, cond) {
  const entry = erfGetOrCreateEntry(cid);
  if (!entry) return;
  entry.condition = cond;
  // Zustand-Buttons direkt im DOM toggeln
  const row = document.getElementById('eqn-' + cid)?.closest('.erf-card-row');
  if (row) {
    row.querySelectorAll('.erf-seg:not(.erf-lang-row) .erf-seg-btn:not(.erf-lang-btn)').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim() === cond);
    });
  }
}

function erfSetLang(cid, lang) {
  const entry = erfGetOrCreateEntry(cid);
  if (!entry) return;
  entry.language = lang;
  // Sprach-Buttons direkt im DOM toggeln
  const row = document.getElementById('eqn-' + cid)?.closest('.erf-card-row');
  if (row) {
    row.querySelectorAll('.erf-lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('title');
      btn.classList.toggle('active', btnLang === lang);
    });
  }
}

function erfSetComment(cid, val) {
  const entry = erfGetOrCreateEntry(cid);
  if (entry) entry.comment = val;
}

function erfAutoSave(cid) {
  // Kommentar beim Verlassen des Feldes speichern — kein Re-Render
  const entry = S.erf.session.find(e => {
    const sep = cid.lastIndexOf('_');
    return String(e.cardId) === cid.slice(0, sep) && (e.foilType||'none') === cid.slice(sep+1);
  });
  const commentEl = document.getElementById('eco-' + cid);
  if (entry && commentEl) entry.comment = commentEl.value;
}

function erfSaveInline(cid) {
  const entry   = erfGetOrCreateEntry(cid);
  const commentEl = document.getElementById('eco-' + cid);
  if (entry && commentEl) entry.comment = commentEl.value;
  const qtyEl   = document.getElementById('eqn-' + cid);
  const qty     = qtyEl ? parseInt(qtyEl.value)||0 : 0;
  const sep     = cid.lastIndexOf('_');
  const cardId  = cid.slice(0, sep);
  const foilKey = cid.slice(sep + 1);
  const ft      = foilKey === 'none' ? 'none' : foilKey;
  if (qty <= 0) {
    S.erf.session = S.erf.session.filter(e => !(String(e.cardId)===cardId && (e.foilType||'none')===ft));
  } else if (entry) {
    entry.qty = qty;
  }
  S.erf.openCard = null;
  render();
}

function erfRemove(i) {
  S.erf.session.splice(i, 1);
  render();
}

function erfExportCSV() {
  if (S.erf.session.length === 0) {
    alert('Noch keine Karten erfasst.\nBitte zuerst Karten zur Session hinzufügen, bevor du den Export startest.');
    return;
  }
  function foilSuffix(ft) {
    if (ft === 'rainbow') return ' (Rainbow Foil)';
    if (ft === 'cold')    return ' (Cold Foil)';
    return ' (Regular)';
  }
  function csvCell(v) {
    const s = String(v == null ? '' : v);
    return '"' + s.replace(/"/g, '""') + '"';
  }
  const header = ['cardmarketId','quantity','name','set','setCode','cn','condition','language','isSigned','price','comment','nameDE','nameES','nameFR','nameIT','rarity','listedAt'];
  const rows = S.erf.session.map(e => [
    e.cardId, e.qty,
    e.name + foilSuffix(e.foilType),
    e.expansion, e.setCode, e.cn, e.condition,
    e.language||'English', '', '0', e.comment,
    e.nameDE||e.name, e.nameES||e.name, e.nameFR||e.name, e.nameIT||e.name,
    e.rarity, '',
  ].map(csvCell).join(','));
  const csv  = '\uFEFF' + header.map(h=>'"'+h+'"').join(',') + '\n' + rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'fab_erfassung_' + new Date().toISOString().slice(0,10) + '.csv' });
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

// ════════════════════════════════════════════════════════
//  EXCEL EXPORT
// ════════════════════════════════════════════════════════
function exportXlsx() {
  if (!S.result) return;
  const r  = S.result;
  const wb = XLSX.utils.book_new();

  // Ranking-Sheets für beide Gruppen
  const mkRankingSheet = (gruppe) => gruppe.ranking.map((row,i) => ({
    'Rang': i+1,
    'Set-Gruppe': SET_GRUPPE[row.expansion]||row.expansion,
    'Set': row.expansion,
    'First Edition': row.first_ed ? 'Ja' : 'Nein',
    'Karten im Set gesamt': row.gesamt,
    'Verschiedene fehlend': row.verschiedene,
    'Karten mit 0 Stück': row.null_stueck,
    'Fehlende Stück gesamt': row.fehlend_gesamt,
    'Fehlquote %': row.fehlquote,
  }));

  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(mkRankingSheet(r.haupt)),  'Ranking - Hauptsets');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(mkRankingSheet(r.andere)), 'Ranking - Andere');

  // Hauptsets — ein Tab pro Set
  r.haupt.ranking.forEach(row => {
    // Im Export: ungefiltert (alle Seltenheiten, alle Foils)
    const karten = (r.haupt.setsData[row.expansion]||[]).map((k,i) => ({
      'Nr.': k.collectorNumber||'', 'CardmarketID': k.id, 'Kartenname': k.name,
      'Seltenheit': k.rarity, 'Foil': k.foilType==='none' ? '' : k.foilType,
      'Im Inventar': k.im_inv, 'Fehlende Menge': k.fehlend,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(karten),
      setTabName(row.expansion).slice(0,31));
  });

  // Andere Produkte — ein Tab pro Produkt
  r.andere.ranking.forEach(row => {
    const karten = (r.andere.setsData[row.expansion]||[]).map((k,i) => ({
      'Nr.': k.collectorNumber||'', 'CardmarketID': k.id, 'Kartenname': k.name,
      'Seltenheit': k.rarity, 'Foil': k.foilType==='none' ? '' : k.foilType,
      'Im Inventar': k.im_inv, 'Fehlende Menge': k.fehlend,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(karten),
      ('A_' + setTabName(row.expansion)).slice(0,31));
  });

  const heute = new Date().toISOString().slice(0,10);
  XLSX.writeFile(wb, 'bericht_' + heute + '.xlsx');
  const sm = document.getElementById('status-msg');
  sm.className = 'status-msg done';
  sm.textContent = '✓ bericht_' + heute + '.xlsx heruntergeladen';
}

function renderKartenRow(card, ziel, extraSet) {
  const pct  = Math.min(100, Math.round(card.im_inv/ziel*100));
  const zero = card.im_inv===0 ? '<span class="zero-badge">0×</span>' : '';
  const foilTag = card.foilType==='rainbow' ? '<span class="foil-tag rf" title="Rainbow Foil">RF</span>' :
                  card.foilType==='cold'    ? '<span class="foil-tag cf" title="Cold Foil">CF</span>' : '';
  const setCell = extraSet ? '<td style="color:var(--text-dim);font-size:.8rem">' + esc(card.expansion||'–') + '</td>' : '';
  return '<tr>' +
    '<td><span class="dot" style="background:' + getDotColor(card.name) + '" aria-hidden="true"></span>' +
    foilTag + esc(card.name) + '</td>' +
    '<td style="color:' + rarityColor(card.rarity) + ';font-weight:600">' + esc(card.rarity) + '</td>' +
    setCell +
    '<td><div class="prog-cell">' + zero +
      '<div class="prog-bg" aria-hidden="true"><div class="prog-fill" style="width:' + pct + '%"></div></div>' +
      '<span class="prog-txt">' + card.im_inv + ' / ' + ziel + '</span></div></td>' +
    '<td class="num" style="color:var(--gold-light);font-weight:600">' + card.fehlend + '</td></tr>';
}

function buildKartenTable(cards, sektion, search, extraSet) {
  const baseCols = [
    { key:'name',    label:'Kartenname', num:false },
    { key:'rarity',  label:'Seltenheit', num:false },
  ];
  const midCols  = extraSet ? [{ key:'expansion', label:'Set', num:false }] : [];
  const endCols  = [
    { key:'im_inv',  label:'Im Inventar', num:true },
    { key:'fehlend', label:'Fehlend',     num:true },
  ];
  const cCols = [...baseCols, ...midCols, ...endCols];
  const thead = cCols.map(col => {
    const s   = S.cardSortCol===col.key;
    const arr = s ? (S.cardSortDir===1?'▲':'▼') : '▲';
    return '<th class="' + (col.num?'num ':'') + (s?'sorted':'') + '"' +
      ' onclick="sortCards(\'' + col.key + '\')" scope="col"' +
      ' aria-sort="' + (s?(S.cardSortDir===1?'ascending':'descending'):'none') + '">' +
      esc(col.label) + ' <span class="sort-arrow" aria-hidden="true">' + arr + '</span></th>';
  }).join('');
  const ziel  = 20;
  const tbody = cards.map(card => renderKartenRow(card, ziel, extraSet)).join('');
  return '<div class="search-row">' +
      '<input class="search-input" type="search" placeholder="Kartenname suchen…" value="' + esc(search) + '"' +
        ' aria-label="Kartenname suchen" oninput="S.search[\'' + sektion + '\']=this.value;render()">' +
      '<span class="count-lbl" aria-live="polite">' + cards.length.toLocaleString('de') + ' Karten</span>' +
    '</div>' +
    '<div class="table-wrap"><table aria-label="Fehlende Karten">' +
      '<thead><tr>' + thead + '</tr></thead><tbody>' + tbody + '</tbody></table></div>';
}

function fehlendFuerSet(cards) {
  if (!cards) return 0;
  return cards
    .filter(card => {
      if (card.foilType === 'rainbow' && !S.f.rainbow) return false;
      if (card.foilType === 'cold'    && !S.f.cold)    return false;
      if (!(card.rarity in S.f)) return false;
      return S.f[card.rarity];
    })
    .reduce((s, card) => s + card.fehlend, 0);
}


function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const btn = document.getElementById('sidebar-toggle');
  if (!sb) return;
  const open = sb.classList.toggle('sidebar-open');
  if (btn) btn.textContent = open ? '✕' : '⚙️';
}
function initMobileUI() {
  if (window.innerWidth > 768) return;
  const btn = document.getElementById('sidebar-toggle');
  if (btn) btn.style.display = '';
  const sb = document.getElementById('sidebar');
  if (!sb) return;
  // Sidebar: offen wenn noch keine Analyse, danach immer eingeklappt
  if (S.result) sb.classList.remove('sidebar-open');
  else if (!sb.classList.contains('sidebar-open')) sb.classList.add('sidebar-open');
}

function wechseSektion(sek) {
  S.sektion = sek;
  S.sortCol = 'fehlend_gesamt'; S.sortDir = -1;
  S.cardSortCol = 'name'; S.cardSortDir = 1;
  render();
}
function switchTab(t) {
  S.tab[S.sektion] = t;
  S.activeSet[S.sektion] = null;
  S.search[S.sektion] = '';
  render();
}
function selectSet(s, sek) {
  S.sektion = sek;
  S.tab[sek] = 'karten';
  S.activeSet[sek] = s;
  S.search[sek] = '';
  render();
}
function goToSet(s, sek)  { selectSet(s, sek); }
function sortRanking(col) { S.sortDir = S.sortCol===col ? -S.sortDir : -1; S.sortCol=col; render(); }
function sortCards(col)   { S.cardSortDir = S.cardSortCol===col ? -S.cardSortDir : 1; S.cardSortCol=col; render(); }
function toggleFilter(key){ S.f[key] = !S.f[key]; render(); }
function toggleDiffFilter(key){ S.fd[key] = !S.fd[key]; render(); }

// ════════════════════════════════════════════════════════
//  DIFFERENZBERICHT
// ════════════════════════════════════════════════════════

function berechneDiff(altInvCSV, neuInvCSV) {
  // Menge je cardmarketId aufbauen
  function invMap(rows) {
    const m = new Map();
    rows.forEach(r => {
      const id  = r.idProduct || r.cardmarketId || r['Product ID'] || r.id;
      const qty = parseInt(r.quantity || r.Quantity || r.count || 0, 10);
      if (id && !isNaN(qty)) m.set(String(id), qty);
    });
    return m;
  }

  const altMap = invMap(altInvCSV);
  const neuMap = invMap(neuInvCSV);

  // Kartenliste für Metadaten (Name, Seltenheit, Set)
  const kartenMeta = new Map();
  if (S.kartenCSV) {
    S.kartenCSV.forEach(r => {
      if (r.cardmarketId) kartenMeta.set(String(r.cardmarketId), r);
    });
  }

  const items = [];
  // Alle IDs die im alten Inventar waren
  altMap.forEach((altQty, id) => {
    const neuQty = neuMap.get(id) || 0;
    const delta  = altQty - neuQty;   // positiv = verkauft
    if (delta > 0) {
      const meta = kartenMeta.get(id) || {};
      items.push({
        id,
        name:       meta.name       || id,
        rarity:     meta.rarity     || '–',
        expansion:  meta.expansion  || '–',
        foilType:   getFoilType(meta.name || ''),
        collectorNumber: meta.collectorNumber || '',
        altQty, neuQty, delta,
      });
    }
  });

  if (items.length === 0) {
    S.diff = null;
    return;
  }

  S.diff = { ts: Date.now(), items };
}

function sortDiff(col) {
  if (S.diffSortCol === col) S.diffSortDir = -S.diffSortDir;
  else { S.diffSortCol = col; S.diffSortDir = col === 'delta' ? -1 : 1; }
  render();
}

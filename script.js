(function(){
  'use strict';
  const VENUES = [
    {key:'livewire', label:'LiveWire Stage', sub:'Forecourt Garden', color:'var(--livewire)'},
    {key:'arena', label:'Arena', sub:'DBS Outdoor Theatre', color:'var(--arena)'},
    {key:'chillout', label:'Chillout Stage', sub:'Concourse', color:'var(--chillout)'},
    {key:'powerhouse', label:'Powerhouse²', sub:'⟍ Reg. required', color:'var(--powerhouse)', needsReg:true},
    {key:'annexe', label:'Annexe', sub:'⟍ Reg. required', color:'var(--annexe)', needsReg:true}
  ];
  const DAYS = [
    {key:1, label:'Day 1', date:'3 Sep, Thu'},
    {key:2, label:'Day 2', date:'4 Sep, Fri'},
    {key:3, label:'Day 3', date:'5 Sep, Sat'},
    {key:4, label:'Day 4', date:'6 Sep, Sun'}
  ];
  const SCHEDULE_URL = 'https://www.esplanade.com/whats-on/festivals-and-series/baybeats/2026';
  const EP = 'https://www.esplanade.com/whats-on/festivals-and-series/baybeats/2026/';

  // time in minutes from midnight, 45-min default duration
  const D = 45;
  const FLAG = {SG:'🇸🇬',MO:'🇲🇴',CN:'🇨🇳',NL:'🇳🇱',TH:'🇹🇭',AT:'🇦🇹',JP:'🇯🇵',KR:'🇰🇷',ID:'🇮🇩',MY:'🇲🇾',TW:'🇹🇼',HK:'🇭🇰',PH:'🇵🇭',VN:'🇻🇳',IN:'🇮🇳'};
  const COUNTRY = {SG:'SINGAPORE',MO:'MACAU',CN:'CHINA',NL:'NETHERLANDS',TH:'THAILAND',AT:'AUSTRIA',JP:'JAPAN',KR:'SOUTH KOREA',ID:'INDONESIA',MY:'MALAYSIA',TW:'TAIWAN',HK:'HONG KONG',PH:'PHILIPPINES',VN:'VIETNAM',IN:'INDIA',FR:'FRANCE'};
  function ev(day, venue, hh, mm, act, slug, cc, genre, type, durOverride){
    return {
      id: day+'-'+venue+'-'+hh+mm+'-'+act.replace(/[^a-z0-9]/gi,''),
      day, venue, start: hh*60+mm, dur: durOverride||D, act,
      url: slug ? (EP+slug) : SCHEDULE_URL,
      confirmed: !!slug,
      cc: cc||null, genre: genre||null, type: type||null
    };
  }

  const DATA = [
    // Day 1
    ev(1,'chillout',18,45,'Says It All','says-it-all','SG','Pop punk','Acoustic duo'),
    ev(1,'arena',19,15,'Soggy Jeans','soggy-jeans','SG','Indie rock','Live band',30),
    ev(1,'livewire',19,30,'Cancer Game','cancer-game','MO','Metalcore','Live band'),
    ev(1,'annexe',20,0,'MUFF','muff','SG','Shoegaze','Live band',30),
    ev(1,'chillout',20,15,'Mediocre Haircut Crew','mediocre-haircut-crew','SG','Hip hop','Live band'),
    ev(1,'arena',20,30,'enec.e','enece','SG','Indie folk','Live band'),
    ev(1,'livewire',21,0,'HYPER SLASH','hyper-slash','CN','Heavy metal/punk','Live band'),
    ev(1,'annexe',21,15,'Tramhaus','tramhaus','NL','Post-hardcore','Live band'),
    ev(1,'arena',22,0,'Soft Pine','soft-pine','TH','Dream pop','Live band'),
    ev(1,'livewire',22,30,'Bilderbuch','bilderbuch','AT','Art pop/glam rock','Live band'),
    // Day 2
    ev(2,'chillout',18,0,'Kin Leonn','kin-leonn','SG','Ambient/electronic','Solo'),
    ev(2,'arena',18,45,'Hidemen','hidemen','SG','Hip hop','Live band',30),
    ev(2,'livewire',19,0,'FUSE','fuse','SG','Hardcore punk','Live band'),
    ev(2,'annexe',19,15,'Pretty Girls Cry','pretty-girls-cry','SG','Garage/emo/math rock','Live band',30),
    ev(2,'powerhouse',19,30,'the cabs','the-cabs','JP','Math rock/post-hardcore','Live band'),
    ev(2,'chillout',20,0,'HOA','hoa','KR','Britpop/60s rock','Live band'),
    ev(2,'arena',20,15,'Stopgap','stopgap','SG','Indie/alt rock','Live band'),
    ev(2,'livewire',20,45,'Perunggu','perunggu','ID','Indie/melodic pop','Live band'),
    ev(2,'annexe',20,45,'Yangbans','yangbans','KR','Indie rock','Live band'),
    ev(2,'powerhouse',21,15,'The Observatory','the-observatory','SG','Post-punk/experimental','Live band'),
    ev(2,'arena',22,0,'LEPYUTIN','lepyutin','TH','Jazz/rock/psych fusion','Live band'),
    ev(2,'livewire',22,30,'Coaltar of the Deepers','coaltar-of-the-deepers','JP','Shoegaze/alt rock','Live band'),
    ev(2,'annexe',22,30,'TOOLS OF THE TRADE','tools-of-the-trade','MY','Grindcore','Live band'),
    ev(2,'powerhouse',23,0,'Naedr & the Midheaven String Collective','naedr-and-the-midheaven-string-collective','SG','Screamo (with string ensemble)','Live collab'),
    // Day 3
    ev(3,'annexe',17,45,'Jhen Yue Tang','jhen-yue-tang','TW','Taiwanese folk-ritual/rock fusion','Live band'),
    ev(3,'chillout',18,0,'VYLT','vylt','SG','Darksynth/synth metal','DJ/Solo'),
    ev(3,'powerhouse',18,45,'Kin Leonn x pureblue Ensemble','kin-leonn-x-pureblue-ensemble','SG','Ambient/electronic','Live collab'),
    ev(3,'livewire',18,45,'Sweetass','sweetass','MY','Noise-pop/grunge','Live band'),
    ev(3,'arena',19,15,'Mediocre Haircut Crew','mediocre-haircut-crew','SG','Hip hop','Live band'),
    ev(3,'annexe',19,30,'T-REX','t-rex','SG','Instrumental/post-rock','Live band'),
    ev(3,'chillout',20,0,'Srirajah Rockers','srirajah-rockers','TH','Reggae/dub','Live band'),
    ev(3,'powerhouse',20,30,'DAVID BORING','david-boring','HK','Post-punk','Live band'),
    ev(3,'livewire',20,30,'Typecast','typecast','PH','Emo/punk','Live band'),
    ev(3,'arena',21,0,'Bugs of Phonon','bugs-of-phonon','TW','Post-rock','Live band'),
    ev(3,'annexe',21,15,'Rắn Cạp Đuôi Collective','ran-cap-duoi-collective','VN','Experimental/noise','Live collective'),
    ev(3,'powerhouse',22,15,'Disco Hue','disco-hue','SG','Synth-pop','Live band'),
    ev(3,'livewire',22,15,'The SIGIT','the-sigit','ID','Garage/psych rock','Live band'),
    ev(3,'arena',22,45,'HOA','hoa','KR','Britpop/60s rock','Live band'),
    // Day 4
    ev(4,'powerhouse',17,45,'Srirajah Rockers','srirajah-rockers','TH','Reggae/dub','Live band'),
    ev(4,'chillout',18,0,'T.HIRST','thirst','SG','NEW/No Info','Solo'),
    ev(4,'livewire',18,45,'Bhayanak Maut','bhayanak-maut','IN','Groove metal/deathcore','Live band'),
    ev(4,'annexe',19,0,'BULGOGI DISCO','bulgogi-disco','KR','Funk/disco','Live band'),
    ev(4,'arena',19,15,'Gabba','gabba','PH','Math rock','Solo'),
    ev(4,'powerhouse',19,30,'Subsonic Eye','subsonic-eye','SG','Indie rock','Live band'),
    ev(4,'chillout',20,0,'T.HIRST','thirst','SG','NEW/No Info','Solo'),
    ev(4,'livewire',20,30,'Dabda','dabda','KR','Math rock/dream pop','Live band'),
    ev(4,'annexe',20,45,'Spider','spider','SG','NEW/No Info','Live band'),
    ev(4,'chillout',21,0,'Solitude Is Bliss','solitude-is-bliss','TH','Alternative rock','Live band'),
    ev(4,'powerhouse',21,15,'Boris','boris','JP','Experimental/drone/noise rock','Live band'),
    ev(4,'livewire',22,15,'Tiramisu Feat. The Hype Goblins and a Special Guest','tiramisu-feat-the-hype-goblins-and-a-special-guest','SG','Glam rock','Live band'),
    ev(4,'annexe',22,30,'Kias','kias','MY','Screamo','Live band'),
    ev(4,'chillout',22,45,'Treaks','treaks','FR','Noise punk','Live band')
  ];

  const GRID_START = 17*60+30; // 5:30pm
  const GRID_END = 24*60;      // 12:00am
  const ROW_MIN = 30;
  const ROW_PX = 58;
  const ROWS = (GRID_END-GRID_START)/ROW_MIN;

  let currentDay = 1;
  let currentView = 'day'; // 'day' | 'map'
  let skipped = {}; // id -> event

  function fmt(mins){
    let h = Math.floor(mins/60), m = mins%60;
    const ap = h>=12 ? 'pm':'am';
    let h12 = h%12; if(h12===0) h12=12;
    return h12+(m===0?'':':'+String(m).padStart(2,'0'))+ap;
  }

  // load skipped list from localStorage
  async function loadSkipped(){
    try{
      const raw = localStorage.getItem('baybeats-skipped');
      if(raw){ skipped = JSON.parse(raw); }
    }catch(e){ skipped = {}; }
  }
  async function saveSkipped(){
    try{ localStorage.setItem('baybeats-skipped', JSON.stringify(skipped)); }catch(e){}
  }

  function venueOf(key){ return VENUES.find(v=>v.key===key); }

  function renderDays(){
    const wrap = document.getElementById('bbDays');
    wrap.innerHTML = '';
    DAYS.forEach(d=>{
      const btn = document.createElement('div');
      btn.className = 'bb-day-btn'+(currentView==='day' && d.key===currentDay?' active':'');
      btn.innerHTML = d.label+'<b>'+d.date+'</b>';
      btn.onclick = ()=>{ currentView='day'; currentDay = d.key; renderAll(); };
      wrap.appendChild(btn);
    });
    const mapBtn = document.createElement('div');
    mapBtn.className = 'bb-day-btn'+(currentView==='map'?' active':'');
    mapBtn.innerHTML = '🗺️ Map<b>Stage locations</b>';
    mapBtn.onclick = ()=>{ currentView='map'; renderAll(); };
    wrap.appendChild(mapBtn);
    document.getElementById('bbDayView').style.display = currentView==='day' ? '' : 'none';
    document.getElementById('bbMapView').style.display = currentView==='map' ? '' : 'none';
  }

  function renderLegend(){
    const wrap = document.getElementById('bbLegend');
    wrap.innerHTML = VENUES.map(v=>
      '<span><span class="bb-swatch" style="background:'+v.color+'"></span>'+v.label+(v.needsReg?' ⟍':'')+'</span>'
    ).join('') + '<span style="color:var(--gold)">⟍ = registration required (Powerhouse² &amp; Annexe)</span>';
    const mapLegendWrap = document.getElementById('bbMapLegend');
    if(mapLegendWrap) mapLegendWrap.innerHTML = wrap.innerHTML;
  }

  function renderMap(){
    const panel = document.getElementById('bbMapPanel');
    if(!panel) return;
    const c = {
      livewire: VENUES.find(v=>v.key==='livewire').color,
      arena: VENUES.find(v=>v.key==='arena').color,
      chillout: VENUES.find(v=>v.key==='chillout').color,
      powerhouse: VENUES.find(v=>v.key==='powerhouse').color,
      annexe: VENUES.find(v=>v.key==='annexe').color
    };
    panel.innerHTML = `
<svg viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic map of Esplanade venues for Baybeats 2026">
  <defs>
    <pattern id="bbHatch" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="transparent"/>
      <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,.55)" stroke-width="2"/>
    </pattern>
  </defs>

  <!-- Marina Bay water -->
  <rect x="0" y="460" width="1000" height="60" fill="#183a52"/>
  <text x="500" y="497" text-anchor="middle" font-size="13" fill="#8fb8d6" font-family="Trebuchet MS, sans-serif" letter-spacing="2">MARINA BAY</text>

  <!-- Esplanade Drive -->
  <rect x="0" y="0" width="1000" height="34" fill="#2a2440"/>
  <text x="500" y="22" text-anchor="middle" font-size="12" fill="#b9a2e0" font-family="Trebuchet MS, sans-serif" letter-spacing="2">ESPLANADE DRIVE</text>

  <!-- LiveWire / Forecourt Garden : directly above the Esplanade Building -->
  <rect x="180" y="42" width="360" height="60" rx="22" fill="${c.livewire}"/>
  <text x="360" y="68" text-anchor="middle" font-size="13" font-weight="800" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">LiveWire Stage</text>
  <text x="360" y="84" text-anchor="middle" font-size="9.5" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Forecourt Garden</text>

  <!-- Esplanade Building envelope, wraps Theatre + Chillout + Concert Hall -->
  <ellipse cx="360" cy="222" rx="255" ry="112" fill="none" stroke="#6a3fa0" stroke-width="2.5" stroke-dasharray="8 6"/>
  <text x="360" y="120" text-anchor="middle" font-size="12" font-weight="700" fill="#c9b8ea" font-family="Trebuchet MS, sans-serif" letter-spacing="2">ESPLANADE BUILDING</text>

  <!-- domes (context only) -->
  <ellipse cx="255" cy="222" rx="105" ry="80" fill="#332a4d" stroke="#4d2c78" stroke-width="2" stroke-dasharray="5 5"/>
  <ellipse cx="465" cy="222" rx="105" ry="80" fill="#332a4d" stroke="#4d2c78" stroke-width="2" stroke-dasharray="5 5"/>
  <text x="255" y="222" text-anchor="middle" font-size="12" fill="#8a7bab" font-family="Trebuchet MS, sans-serif">Theatre</text>
  <text x="465" y="222" text-anchor="middle" font-size="12" fill="#8a7bab" font-family="Trebuchet MS, sans-serif">Concert Hall</text>

  <!-- Chillout Stage / Concourse : nested between the two domes -->
  <rect x="305" y="190" width="110" height="64" rx="16" fill="${c.chillout}"/>
  <text x="360" y="214" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Chillout</text>
  <text x="360" y="228" text-anchor="middle" font-size="9" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Stage</text>
  <text x="360" y="242" text-anchor="middle" font-size="8" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">(Concourse)</text>

  <!-- Annexe : directly right of Esplanade, pushed out for breathing room -->
  <rect x="640" y="150" width="140" height="150" rx="20" fill="${c.annexe}"/>
  <rect x="640" y="150" width="140" height="150" rx="20" fill="url(#bbHatch)"/>
  <text x="710" y="216" text-anchor="middle" font-size="13" font-weight="800" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Annexe ⟍</text>
  <text x="710" y="232" text-anchor="middle" font-size="9.5" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Annexe Studio</text>

  <!-- Makansutra : right of Annexe, thinned, landmark only -->
  <rect x="808" y="160" width="92" height="125" rx="14" fill="#332a4d" stroke="#4d2c78" stroke-width="2" stroke-dasharray="5 5"/>
  <text x="854" y="216" text-anchor="middle" font-size="9.5" font-weight="700" fill="#c9b8ea" font-family="Trebuchet MS, sans-serif">MAKAN-</text>
  <text x="854" y="230" text-anchor="middle" font-size="9.5" font-weight="700" fill="#c9b8ea" font-family="Trebuchet MS, sans-serif">SUTRA</text>
  <text x="854" y="246" text-anchor="middle" font-size="7.5" fill="#8a7bab" font-family="Trebuchet MS, sans-serif">(food court)</text>

  <!-- Powerhouse2 : diagonally below-right of Makansutra -->
  <rect x="845" y="335" width="150" height="95" rx="18" fill="${c.powerhouse}"/>
  <rect x="845" y="335" width="150" height="95" rx="18" fill="url(#bbHatch)"/>
  <text x="920" y="373" text-anchor="middle" font-size="12.5" font-weight="800" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Powerhouse² ⟍</text>
  <text x="920" y="389" text-anchor="middle" font-size="9" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Singtel Waterfront Th.</text>

  <!-- Arena / Outdoor Theatre : directly below the Esplanade building -->
  <path d="M225 445 Q360 345 495 445 Z" fill="${c.arena}"/>
  <text x="360" y="410" text-anchor="middle" font-size="13" font-weight="800" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">Arena</text>
  <text x="360" y="426" text-anchor="middle" font-size="9.5" fill="#0c0b12" font-family="Trebuchet MS, sans-serif">DBS Outdoor Theatre</text>

  <!-- sparkle decorations -->
  <text x="30" y="60" font-size="16" fill="#fff066">✦</text>
  <text x="960" y="140" font-size="14" fill="#5ef0ff">✧</text>
  <text x="55" y="410" font-size="14" fill="#ff6ec7">✦</text>
</svg>`;
  }

  function renderGrid(){
    const grid = document.getElementById('bbGrid');
    grid.innerHTML = '';

    grid.appendChild(makeHead(''));
    VENUES.forEach(v=>{
      const h = makeHead(v.label+'<br><span style="opacity:.6;font-weight:400;">'+v.sub+'</span>');
      h.classList.add('venue');
      grid.appendChild(h);
    });

    const gridLines = 'repeating-linear-gradient(to bottom, var(--line) 0, var(--line) 1px, transparent 1px, transparent '+ROW_PX+'px)';

    const timeCol = document.createElement('div');
    timeCol.className = 'bb-timecol';
    timeCol.style.height = (ROWS*ROW_PX)+'px';
    timeCol.style.backgroundImage = gridLines;
    for(let i=0;i<=ROWS;i++){
      const lbl = document.createElement('div');
      lbl.className = 'bb-timelabel';
      lbl.style.top = (i*ROW_PX)+'px';
      lbl.textContent = fmt(GRID_START+i*ROW_MIN);
      timeCol.appendChild(lbl);
    }
    grid.appendChild(timeCol);

    const hatch = 'repeating-linear-gradient(45deg, rgba(232,178,60,.10) 0, rgba(232,178,60,.10) 5px, transparent 5px, transparent 14px)';

    VENUES.forEach(v=>{
      const col = document.createElement('div');
      col.className = 'bb-venuecol';
      col.style.height = (ROWS*ROW_PX)+'px';
      col.style.backgroundImage = (v.needsReg ? hatch+', ' : '') + gridLines;
      const events = DATA.filter(e=>e.day===currentDay && e.venue===v.key && !skipped[e.id]);
      events.forEach(e=>{
        const top = (e.start-GRID_START)/ROW_MIN*ROW_PX;
        const h = e.dur/ROW_MIN*ROW_PX - 3;
        const block = document.createElement('div');
        block.className = 'bb-event';
        block.style.top = top+'px';
        block.style.height = Math.max(h, v.needsReg?64:20)+'px';
        block.style.background = v.color;
        const countryLine = e.cc && COUNTRY[e.cc] ? COUNTRY[e.cc] : '';
        const metaLines = [countryLine, e.genre, e.type].filter(Boolean);
        const meta = metaLines.length ? '<span class="bb-meta">'+metaLines.join('<br>')+'</span>' : '';
        const ticketSvg = '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" style="vertical-align:-1px;margin-right:3px;"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" stroke="white" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 7v10" stroke="white" stroke-width="1.6" stroke-dasharray="1.8 1.8"/></svg>';
        const regBtn = v.needsReg ? '<a class="bb-reg-btn" href="'+e.url+'" target="_blank" rel="noopener" title="Register / more info">'+ticketSvg+'GET</a>' : '';
        block.innerHTML = '<span class="bb-x" title="Skip this set">✕</span>'+
          '<a href="'+e.url+'" target="_blank" rel="noopener">'+e.act+(e.confirmed?'':' ↗')+meta+'</a>'+regBtn;
        block.querySelector('.bb-x').onclick = (ev)=>{
          ev.preventDefault(); ev.stopPropagation();
          skipped[e.id] = {act:e.act, venue:e.venue, day:e.day, start:e.start, url:e.url, cc:e.cc};
          saveSkipped(); renderAll();
        };
        block.querySelector('a').onclick = (ev)=>{ if(ev.target.closest('.bb-x')) ev.preventDefault(); };
        col.appendChild(block);
      });
      grid.appendChild(col);
    });
  }

  function makeHead(html){
    const h = document.createElement('div');
    h.className = 'bb-col-head';
    h.innerHTML = html;
    return h;
  }

  function renderSkipped(){
    const list = document.getElementById('bbSkipList');
    const count = document.getElementById('bbSkipCount');
    const ids = Object.keys(skipped);
    count.textContent = ids.length;
    if(ids.length===0){
      list.innerHTML = '<div class="bb-empty">Cross out a set to bench it here. Click it again to bring it back to the grid.</div>';
      return;
    }
    list.innerHTML = '';
    ids.sort((a,b)=> skipped[a].day-skipped[b].day || skipped[a].start-skipped[b].start).forEach(id=>{
      const s = skipped[id];
      const v = venueOf(s.venue);
      const d = DAYS.find(x=>x.key===s.day);
      const row = document.createElement('div');
      row.className = 'bb-skip-item';
      const cname = s.cc && COUNTRY[s.cc] ? COUNTRY[s.cc] : '';
      row.innerHTML =
        '<span class="tag" style="background:'+v.color+'"></span>'+
        '<span class="info"><b>'+s.act+'</b><span>'+d.label+' · '+fmt(s.start)+' · '+v.label+(cname?' · '+cname:'')+'</span></span>'+
        '<button class="bb-restore">Restore</button>';
      row.querySelector('.bb-restore').onclick = ()=>{
        delete skipped[id]; saveSkipped(); renderAll();
      };
      list.appendChild(row);
    });
  }

  function renderAll(){
    renderDays();
    renderLegend();
    if(currentView==='day'){
      renderGrid();
      renderSkipped();
    } else {
      renderMap();
    }
  }

  loadSkipped().then(renderAll);
})();

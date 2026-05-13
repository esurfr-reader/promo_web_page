/* Surf Reader promo - interactive React widgets (flow visuals, canvas demo, review demo).
   Loaded via Babel standalone from index.html. Reads localized strings from
   window.SR_I18N (populated by js/i18n.js) and re-renders on `sr:lang-changed`. */

const { useState, useRef, useEffect, useMemo } = React;

/* ---------- i18n helper ---------- */
function tPath(path, fallback) {
  const dict = window.SR_I18N;
  if (!dict) return fallback;
  const v = path.split(".").reduce((o, k) => (o == null ? o : o[k]), dict);
  return v == null ? fallback : v;
}

function useLangBump() {
  const [, setN] = useState(0);
  useEffect(() => {
    const f = () => setN((n) => n + 1);
    window.addEventListener("sr:lang-changed", f);
    return () => window.removeEventListener("sr:lang-changed", f);
  }, []);
}

function formatStr(tpl, vars) {
  if (!tpl) return "";
  return tpl.replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? vars[k] : ""));
}

/* ===================== FLOW CARD VISUALS ===================== */

function Flow1Map() {
  useLangBump();
  const label = tPath("canvas.demo.session_title", "Whale Beach") +
    " · " + tPath("how.cards.0.step", "Map the break");
  const SHADOW = 'drop-shadow(1.5px 2.5px 3px rgba(0,0,0,.35))';
  return (
    <div style={{position:'absolute',inset:0}}>
      <img src="assets/beach_right_hand.png"
           alt="Annotated right-hand point break - TODO swap with real app screenshot"
           data-img-role="flow-map-bg"
           style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>

      {/* Straight wave + rip - mirrors CanvasDemo render style */}
      <svg viewBox="0 0 400 280" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',filter:SHADOW}} preserveAspectRatio="none">
        <defs>
          <marker id="arr1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#03045e"/>
          </marker>
        </defs>
        <line x1="340" y1="40" x2="120" y2="200" stroke="#03045e" strokeWidth="5.6" strokeLinecap="round" markerEnd="url(#arr1)"/>
        <line x1="60" y1="40" x2="90" y2="210" stroke="#C62828" strokeWidth="5.6" strokeLinecap="round"/>
      </svg>

      {/* waveStart marker at top of wave line */}
      <img src="assets/icons/md_wave_start.png" alt="Wave start marker" data-img-role="wave-start"
           style={{position:'absolute',left:'85%',top:'14%',width:22,height:22,transform:'translate(-50%,-50%)',filter:SHADOW}}/>

      {/* Surfer placed on the beach (lower-right sand) */}
      <img src="assets/icons/md_me_surfer.png"
           alt="Surfer pin icon"
           data-img-role="surfer-pin"
           style={{position:'absolute',left:'52%',top:'82%',width:56,height:56,filter:'drop-shadow(0 4px 6px rgba(0,0,0,.4))',transform:'translate(-50%,-50%)'}}/>

      <div style={{position:'absolute',top:14,left:14,background:'rgba(3,4,94,.78)',color:'white',fontSize:11,fontWeight:600,padding:'5px 10px',borderRadius:999,letterSpacing:'.04em'}}>{label}</div>
    </div>
  );
}

function Flow2Plan() {
  useLangBump();
  const alt = tPath("how.cards.1.step", "Guided plan · 7 questions");
  const src = tPath("images.plan_shot", "assets/i18n/en/plan_shot.png");
  const fallback = "assets/i18n/en/plan_shot.png";
  return (
    <div style={{position:'absolute',inset:0,background:'#000'}}>
      <img src={src}
           alt={alt + ' - Surf Reader guided plan screen'}
           data-img-role="flow-plan-bg"
           onError={(e)=>{ if(e.currentTarget.src.indexOf(fallback)===-1){ e.currentTarget.src = fallback; } }}
           style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
    </div>
  );
}

function Flow3Review() {
  useLangBump();
  const alt = tPath("review.eyebrow", "Post-surf review");
  const src = tPath("images.review_panel", "assets/i18n/en/review_panel.png");
  const fallback = "assets/i18n/en/review_panel.png";
  return (
    <div style={{position:'absolute',inset:0,background:'#000'}}>
      <img src={src}
           alt={alt + ' - Surf Reader review panel'}
           data-img-role="flow-review-bg"
           onError={(e)=>{ if(e.currentTarget.src.indexOf(fallback)===-1){ e.currentTarget.src = fallback; } }}
           style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',display:'block'}}/>
    </div>
  );
}

[
  ["flowVis1", <Flow1Map/>],
  ["flowVis2", <Flow2Plan/>],
  ["flowVis3", <Flow3Review/>],
].forEach(([id, el])=>{
  const r = document.getElementById(id);
  if (r) ReactDOM.createRoot(r).render(el);
});

/* ===================== INTERACTIVE CANVAS DEMO ===================== */
const BREAK_IDS = ['right_hand', 'open', 'reef', 'rivermouth'];
const BREAK_IMG = {
  right_hand: 'assets/beach_right_hand.png',
  open:       'assets/beach_open.png',
  reef:       'assets/beach_reef.png',
  rivermouth: 'assets/beach_river_mouth.png',
};

/* Mirrors the live app icon set (12 tray + 1 auto-placed `waveStart`).
   Source of truth: /Volumes/portable/dev_portable/esurfr/src/canvas/icons/iconDefinitions.ts
   baseSize is the icon's native px size at scale 1.0 in the real app. */
const TRAY = [
  { id:'me',             img:'assets/icons/md_me_surfer.png',         baseSize:56 },
  { id:'house',          img:'assets/icons/xl_house.png',             baseSize:64 },
  { id:'tree',           img:'assets/icons/xl_tree.png',              baseSize:64 },
  { id:'lifeSaving',     img:'assets/icons/xl_life_saver_tower.png',  baseSize:64 },
  { id:'rocks',          img:'assets/icons/xl_rocks.png',             baseSize:64 },
  { id:'carpark',        img:'assets/icons/sm_cark_park.png',         baseSize:32 },
  { id:'beachTrack',     img:'assets/icons/lrg_walking_track.png',    baseSize:56 },
  { id:'garbageBin',     img:'assets/icons/sm_garbage_bin.png',       baseSize:32 },
  { id:'lifeSaverFlag',  img:'assets/icons/lrg_life_saver_flag.png',  baseSize:56 },
  { id:'building',       img:'assets/icons/xxl_building.png',         baseSize:64 },
  { id:'sandDunes',      img:'assets/icons/xxl_sand_dunes.png',       baseSize:80 },
  { id:'telegraphPole',  img:'assets/icons/xl_telegraph_pole.png',    baseSize:64 },
];
const WAVE_START_ICON = { id:'waveStart', img:'assets/icons/md_wave_start.png', baseSize:20 };

const SEED_PLACEMENTS = {
  right_hand: [
    { id: 'me-1',         iconId: 'me',         x: 0.42, y: 0.78 },
    { id: 'rocks-1',      iconId: 'rocks',      x: 0.78, y: 0.45 },
    { id: 'tree-1',       iconId: 'tree',       x: 0.20, y: 0.92 },
  ],
  open:       [{ id:'me-1', iconId:'me', x:0.50, y:0.82 }, { id:'lifeSaving-1', iconId:'lifeSaving', x:0.74, y:0.90 }],
  reef:       [{ id:'me-1', iconId:'me', x:0.30, y:0.80 }],
  rivermouth: [{ id:'me-1', iconId:'me', x:0.55, y:0.75 }],
};

/* App draw constants (mirrors /canvas/constants.ts). */
const DRAW_COLORS = { wave: '#03045e', rip: '#C62828', freehand: '#212121' };
const THICKNESS_PRESETS = [2, 4, 8];
const DEFAULT_THICKNESS = 4;
const STROKE_SHADOW = 'drop-shadow(1.5px 2.5px 3px rgba(0,0,0,.35))';

function findBreakLabel(id) {
  const breaks = tPath("canvas.breaks", []);
  const found = (breaks || []).find((b) => b.id === id);
  return found?.label || id;
}

function CanvasDemo() {
  useLangBump();
  const [breakId, setBreakId] = useState('right_hand');
  const [mode, setMode] = useState('icons');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [drawTool, setDrawTool] = useState('wave');
  const [placed, setPlaced] = useState(SEED_PLACEMENTS[breakId]);
  const [thickness, setThickness] = useState(DEFAULT_THICKNESS);
  const [strokes, setStrokes] = useState([
    { type:'wave', thickness:DEFAULT_THICKNESS, points:[{x:.86,y:.20},{x:.30,y:.66}] },
    { type:'rip',  thickness:DEFAULT_THICKNESS, points:[{x:.18,y:.85},{x:.24,y:.40}] },
  ]);
  const [drawing, setDrawing] = useState(false);
  const [hint, setHint] = useState(tPath("canvas.demo.hint_start", "Tap an icon, then tap the canvas to place it."));
  const stageRef = useRef(null);

  // Refresh hint default when language switches
  useEffect(() => {
    setHint(tPath("canvas.demo.hint_start", "Tap an icon, then tap the canvas to place it."));
  }, [window.SR_I18N_LANG]);

  useEffect(()=>{
    setPlaced(SEED_PLACEMENTS[breakId] || []);
    setStrokes(breakId === 'right_hand' ? [
      { type:'wave', thickness:DEFAULT_THICKNESS, points:[{x:.86,y:.20},{x:.30,y:.66}] },
      { type:'rip',  thickness:DEFAULT_THICKNESS, points:[{x:.18,y:.85},{x:.24,y:.40}] },
    ] : []);
  }, [breakId]);

  const stageRect = () => stageRef.current?.getBoundingClientRect();

  function relCoords(e) {
    const r = stageRect(); if (!r) return null;
    const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left) / r.width, y: (t.clientY - r.top) / r.height };
  }

  function onStageClick(e) {
    if (mode !== 'icons' || !selectedIcon) return;
    const c = relCoords(e); if (!c) return;
    const id = `${selectedIcon}-${Date.now()}`;
    setPlaced(p => [...p, { id, iconId: selectedIcon, x: c.x, y: c.y }]);
    setSelectedIcon(null);
    setHint(tPath("canvas.demo.hint_drawn", "Nice - try drawing the wave next."));
  }

  function onStageDown(e) {
    if (mode !== 'draw') return;
    e.preventDefault?.();
    const c = relCoords(e); if (!c) return;
    setDrawing(true);
    // Wave + rip render as straight lines - store only start/end points.
    setStrokes(s => [...s, { type: drawTool, thickness, points: [c, c] }]);
    // Auto-place a waveStart icon at the start of every wave stroke (mirrors app behaviour).
    if (drawTool === 'wave') {
      const wsId = `waveStart-${Date.now()}`;
      setPlaced(p => [...p, { id: wsId, iconId: 'waveStart', x: c.x, y: c.y, auto: true }]);
    }
  }
  function onStageMove(e) {
    if (!drawing) return;
    const c = relCoords(e); if (!c) return;
    setStrokes(s => {
      const cp = s.slice();
      const last = cp[cp.length-1];
      // Replace end point with current cursor - straight line from start to current pos.
      cp[cp.length-1] = { ...last, points: [last.points[0], c] };
      return cp;
    });
  }
  function onStageUp() {
    if (drawing) setHint(tPath("canvas.demo.hint_done", "Looking good. Switch to \"Tools\" to clear or move on."));
    setDrawing(false);
  }

  function clearAll() {
    setPlaced([]); setStrokes([]);
    setHint(tPath("canvas.demo.hint_cleared", "Cleared. Tap an icon to start placing."));
  }
  function undo() {
    if (strokes.length) {
      const last = strokes[strokes.length - 1];
      setStrokes(s => s.slice(0, -1));
      // If undoing a wave stroke, also remove its auto-placed waveStart icon.
      if (last.type === 'wave') {
        setPlaced(p => {
          const lastAutoIdx = [...p].reverse().findIndex(it => it.iconId === 'waveStart' && it.auto);
          if (lastAutoIdx === -1) return p;
          const idx = p.length - 1 - lastAutoIdx;
          return [...p.slice(0, idx), ...p.slice(idx + 1)];
        });
      }
    } else if (placed.length) {
      setPlaced(p => p.slice(0, -1));
    }
  }

  const colorFor = t => DRAW_COLORS[t] || DRAW_COLORS.freehand;

  function pathD(points) {
    if (!points?.length) return '';
    const r = stageRect(); if (!r) return '';
    return points.map((p,i)=>`${i?'L':'M'} ${p.x*r.width} ${p.y*r.height}`).join(' ');
  }

  const iconCountTpl = tPath("canvas.demo.icons_count", "{n} icons · {m} strokes");
  const sessionTitle = tPath("canvas.demo.session_title", "Whale Beach");

  return (
    <div className="canvas-frame">
      <div className="canvas-meta">
        <div className="left">
          <h4>{sessionTitle} · {findBreakLabel(breakId)}</h4>
          <span className="pill">{formatStr(iconCountTpl, {n: placed.length, m: strokes.length})}</span>
          {BREAK_IDS.map(id => (
            <button key={id}
              onClick={()=>setBreakId(id)}
              className="tbtn"
              style={breakId===id?{background:'#03045e',color:'white'}:{background:'rgba(3,4,94,.06)'}}>
              {tPath(`canvas.demo.break_short.${id}`, findBreakLabel(id).split(' ')[0])}
            </button>
          ))}
        </div>
        <div className="right">
          <button type="button" id="canvasExpandBtnInline" className="canvas-expand-btn canvas-expand-btn--inline"
                  aria-label="Expand canvas to fullscreen landscape">
            <span data-i18n="canvas.expand">{tPath("canvas.expand", "Expand")}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className="canvas-stage"
        onClick={onStageClick}
        onMouseDown={onStageDown} onMouseMove={onStageMove} onMouseUp={onStageUp} onMouseLeave={onStageUp}
        onTouchStart={onStageDown} onTouchMove={onStageMove} onTouchEnd={onStageUp}
        style={{cursor: mode==='icons' && selectedIcon ? 'crosshair' : (mode==='draw' ? 'crosshair' : 'default')}}
      >
        <img className="bg"
             src={BREAK_IMG[breakId]}
             alt={findBreakLabel(breakId) + ' - beach aerial reference, TODO swap with real-app screenshot'}
             data-img-role={`break-${breakId}`}/>

        <svg viewBox={`0 0 ${stageRect()?.width||1000} ${stageRect()?.height||562}`} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',filter:STROKE_SHADOW}}>
          <defs>
            <marker id="arr-wave" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={DRAW_COLORS.wave}/>
            </marker>
          </defs>
          {strokes.map((s,i)=>(
            <path key={i}
              d={pathD(s.points)}
              stroke={colorFor(s.type)}
              strokeWidth={(s.thickness ?? DEFAULT_THICKNESS) * 1.4}
              strokeLinecap="round" strokeLinejoin="round"
              fill="none"
              markerEnd={s.type==='wave'?'url(#arr-wave)':null}
              opacity=".98"
            />
          ))}
        </svg>

        {placed.map(p=>{
          const isAuto = p.iconId === 'waveStart';
          const t = isAuto ? WAVE_START_ICON : TRAY.find(tt => tt.id === p.iconId);
          const label = tPath(`canvas.demo.icon_labels.${p.iconId}`, p.iconId);
          const size = t?.baseSize || 48;
          return (
            <div key={p.id} className="placed-icon bounce-in"
                 style={{left:`${p.x*100}%`,top:`${p.y*100}%`,width:size,height:size,marginLeft:-size/2,marginTop:-size/2,filter:isAuto?STROKE_SHADOW:undefined}}>
              <img src={t?.img} alt={label + ' marker'} data-img-role={`placed-${p.iconId}`}/>
            </div>
          );
        })}

        <div className="stage-hint">{hint}</div>
      </div>

      <div className="canvas-toolbar">
        <div className="modes">
          <button className={`tbtn ${mode==='icons'?'active':''}`} onClick={()=>setMode('icons')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 6 .9-4.5 4.4 1 6.2L12 16.7 6.5 19.5l1-6.2L3 8.9 9 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            {tPath("canvas.demo.mode_icons", "Icons")}
          </button>
          <button className={`tbtn ${mode==='draw'?'active':''}`} onClick={()=>setMode('draw')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 17l4 4 14-14-4-4z M14 6l4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            {tPath("canvas.demo.mode_draw", "Draw")}
          </button>
          <button className={`tbtn ${mode==='tools'?'active':''}`} onClick={()=>setMode('tools')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 7L8 19l-5 1 1-5L16 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            {tPath("canvas.demo.mode_tools", "Tools")}
          </button>
        </div>

        <div className="spacer">
          {mode==='icons' && (
            <div className="icon-tray">
              {TRAY.map(t=>{
                const label = tPath(`canvas.demo.icon_labels.${t.id}`, t.id);
                return (
                  <button key={t.id}
                    className={`tray-item ${selectedIcon===t.id?'':''}`}
                    onClick={(e)=>{ e.stopPropagation(); setSelectedIcon(t.id);
                      setHint(formatStr(tPath("canvas.demo.hint_place", "Now tap the canvas to place: {label}"), {label}));
                    }}
                    style={selectedIcon===t.id?{borderColor:'#F08A2A',boxShadow:'0 0 0 2px rgba(240,138,42,.25)'}:null}
                    title={label}>
                    <img src={t.img} alt={label + ' tray icon'} data-img-role={`tray-${t.id}`}/>
                  </button>
                );
              })}
            </div>
          )}
          {mode==='draw' && (
            <div style={{display:'flex',gap:6,padding:'0 6px',alignItems:'center',flexWrap:'wrap'}}>
              {[
                {id:'wave', color:DRAW_COLORS.wave, labelKey:'canvas.demo.draw_wave', fallback:'Wave'},
                {id:'rip',  color:DRAW_COLORS.rip,  labelKey:'canvas.demo.draw_rip',  fallback:'Rip'},
              ].map(t=>{
                const label = tPath(t.labelKey, t.fallback);
                return (
                  <button key={t.id}
                    onClick={()=>{ setDrawTool(t.id);
                      setHint(formatStr(tPath("canvas.demo.hint_drag", "Drag on the canvas to draw {tool}."), {tool: label.toLowerCase()}));
                    }}
                    className={`tbtn`}
                    style={drawTool===t.id?{background:t.color,color:'white'}:null}>
                    <span style={{display:'inline-block',width:10,height:10,borderRadius:2,background:t.color}}/>
                    {label}
                  </button>
                );
              })}
              <span style={{width:1,height:18,background:'rgba(3,4,94,.18)',margin:'0 4px'}}/>
              {THICKNESS_PRESETS.map((t, i) => {
                const labelKey = ['canvas.demo.thickness_sm','canvas.demo.thickness_med','canvas.demo.thickness_lg'][i];
                const fallback = ['Sm','Med','Lg'][i];
                const label = tPath(labelKey, fallback);
                const active = thickness === t;
                return (
                  <button key={t}
                    onClick={()=>setThickness(t)}
                    className="tbtn"
                    title={`${label} (${t}px)`}
                    style={active?{background:'#03045e',color:'white'}:null}>
                    <span style={{display:'inline-block',width:18,height:t,borderRadius:t,background:active?'white':DRAW_COLORS[drawTool]||'#03045e'}}/>
                    {label}
                  </button>
                );
              })}
            </div>
          )}
          {mode==='tools' && (
            <div style={{display:'flex',gap:6,padding:'0 6px',alignItems:'center'}}>
              <button className="tbtn" onClick={undo}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 14l-5-5 5-5 M4 9h11a5 5 0 1 1 0 10H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {tPath("canvas.demo.undo", "Undo")}
              </button>
              <button className="tbtn" onClick={clearAll} style={{color:'#C62828'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {tPath("canvas.demo.clear", "Clear all")}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const cd = document.getElementById('canvasDemo');
if (cd) ReactDOM.createRoot(cd).render(<CanvasDemo/>);

/* ===================== REVIEW DEMO ===================== */

function Star({ on, onClick }) {
  return (
    <svg className={`star ${on?'on':''}`} viewBox="0 0 24 24" fill="currentColor" onClick={onClick}>
      <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.7 9.5l7.4-.6z"/>
    </svg>
  );
}

function ReviewDemo() {
  useLangBump();
  const [ratings, setRatings] = useState([9, 7, 8, 6, 7, 8, 9]);
  const criteria = tPath("review.demo.criteria", [
    "Paddle out","Wave selection","Take-off timing","Bottom turn","Surf execution","Wave count","Energy & focus"
  ]);
  const avg = useMemo(()=> {
    const s = ratings.reduce((a,b)=>a+b,0); return Math.round((s/ratings.length)*10)/10;
  }, [ratings]);
  const filledRamp = Math.round(avg);

  return (
    <div className="review-card">
      <h4>{tPath("review.demo.session_title", "Whale Beach - Right-hand point")}</h4>
      <div className="session-meta">{tPath("review.demo.session_meta", "")}</div>

      {criteria.map((c,i)=>(
        <div key={c} className="criterion">
          <div className="label">{c}</div>
          <div className="stars" role="radiogroup" aria-label={c}>
            {[1,2,3,4,5,6,7,8,9,10].map(s=>(
              <Star key={s}
                on={s <= ratings[i]}
                onClick={()=>{
                  const cp = ratings.slice(); cp[i]=s; setRatings(cp);
                }} />
            ))}
          </div>
        </div>
      ))}

      <div className="summary">
        <div className="left">
          <div className="small">{tPath("review.demo.skill_rating", "Skill Rating")}</div>
          <div className="big">{avg.toFixed(1)} <span style={{color:'#F08A2A',fontSize:'.6em'}}>/10</span></div>
        </div>
        <div className="ramp" aria-hidden="true">
          {[1,2,3,4,5,6,7,8,9,10].map(i => <span key={i} className={i<=filledRamp?'on':''}/>)}
        </div>
      </div>

      <div style={{marginTop:14,fontSize:12.5,color:'#5b6e85'}}>{tPath("review.demo.tip", "")}</div>
    </div>
  );
}

const rd = document.getElementById('reviewDemo');
if (rd) ReactDOM.createRoot(rd).render(<ReviewDemo/>);

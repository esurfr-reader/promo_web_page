/* Surf Reader promo — interactive React widgets (flow visuals, canvas demo, review demo).
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
  return (
    <div style={{position:'absolute',inset:0}}>
      <img src="assets/beach_right_hand.png"
           alt="Annotated right-hand point break — TODO swap with real app screenshot"
           data-img-role="flow-map-bg"
           style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
      <img src="assets/me_surfer.png"
           alt="Surfer pin icon"
           data-img-role="surfer-pin"
           style={{position:'absolute',left:'42%',top:'52%',width:48,height:48,filter:'drop-shadow(0 4px 6px rgba(0,0,0,.4))',transform:'translate(-50%,-85%)'}}/>
      <svg viewBox="0 0 400 280" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} preserveAspectRatio="none">
        <defs>
          <marker id="arr1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#1565C0"/>
          </marker>
        </defs>
        <path d="M340,40 Q260,80 180,140 T80,180" stroke="#1565C0" strokeWidth="4" fill="none" strokeLinecap="round" markerEnd="url(#arr1)" opacity=".95"/>
        <path d="M260,30 Q210,60 160,110" stroke="#1565C0" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        <path d="M120,180 Q140,140 130,90" stroke="#C62828" strokeWidth="3" fill="none" strokeDasharray="6 5" strokeLinecap="round"/>
      </svg>
      <div style={{position:'absolute',top:14,left:14,background:'rgba(10,31,58,.78)',color:'white',fontSize:11,fontWeight:600,padding:'5px 10px',borderRadius:999,letterSpacing:'.04em'}}>{label}</div>
    </div>
  );
}

function Flow2Plan() {
  useLangBump();
  const eyebrow = tPath("how.cards.1.step", "Guided plan · 7 questions");
  const qs = [
    { q: tPath("how.cards.1.title", "Where will you sit?"), a: "Inside, on the bowl" },
    { q: "How many waves is a great session?", a: "8–10" },
    { q: "One thing to work on today?", a: "Earlier paddle, later drop" },
  ];
  return (
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#fef9f0,#f4ead7)',padding:'18px 22px',display:'flex',flexDirection:'column',justifyContent:'center',gap:10}}>
      <div style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'#d96a14',fontWeight:700}}>{eyebrow}</div>
      {qs.map((it,i)=>(
        <div key={i} style={{background:'white',borderRadius:14,padding:'12px 14px',boxShadow:'0 2px 6px rgba(14,42,77,.06)',border:'1px solid rgba(14,42,77,.08)'}}>
          <div style={{fontFamily:'var(--display)',fontWeight:700,fontSize:13.5,color:'#0e2a4d'}}>{it.q}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginTop:4}}>
            <span style={{width:14,height:14,borderRadius:4,background:'#F08A2A',display:'inline-flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:10,fontWeight:800}}>✓</span>
            <span style={{fontSize:12.5,color:'#14304f'}}>{it.a}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Flow3Review() {
  useLangBump();
  const eyebrow = tPath("review.eyebrow", "Post-surf review");
  const labels = [
    tPath("review.demo.criteria.0", "Paddle out"),
    tPath("review.demo.criteria.1", "Wave selection"),
    tPath("review.demo.criteria.2", "Take-off"),
    tPath("review.demo.criteria.3", "Bottom turn"),
    tPath("review.demo.criteria.4", "Surf execution"),
  ];
  const rows = labels.map((k, i) => [k, [9, 7, 8, 6, 8][i]]);
  return (
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0e2a4d,#143b6e)',padding:'22px',display:'flex',flexDirection:'column',justifyContent:'center',gap:8,color:'white'}}>
      <div style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'#F4C77E',fontWeight:700}}>{eyebrow}</div>
      {rows.map(([k,v],i)=>(
        <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
          <div style={{fontSize:12.5,opacity:.92}}>{k}</div>
          <div style={{display:'flex',gap:2}}>
            {[1,2,3,4,5,6,7,8,9,10].map(s=>(
              <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s<=v?'#F08A2A':'rgba(255,255,255,.18)'}><path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.7 9.5l7.4-.6z"/></svg>
            ))}
          </div>
        </div>
      ))}
      <div style={{marginTop:10,padding:'10px 12px',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.18)',borderRadius:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:11,letterSpacing:'.14em',textTransform:'uppercase',opacity:.7,fontWeight:700}}>{tPath("review.demo.skill_rating","Skill Rating")}</span>
        <span style={{fontFamily:'var(--display)',fontWeight:700,fontSize:24,letterSpacing:'-.02em'}}>7.6 <span style={{color:'#F4C77E',fontSize:14}}>/10</span></span>
      </div>
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

const TRAY = [
  { id:'me',       img:'assets/me_surfer.png' },
  { id:'house',    img:'assets/icon_house.png' },
  { id:'tree',     img:'assets/icon_tree.png' },
  { id:'rocks',    img:'assets/icon_rocks.png' },
  { id:'tower',    img:'assets/icon_lifesaver_tower.png' },
  { id:'flag',     img:'assets/icon_lifesaver_flag.png' },
  { id:'track',    img:'assets/icon_walking_track.png' },
  { id:'park',     img:'assets/icon_carpark.png' },
  { id:'building', img:'assets/icon_building.png' },
];

const SEED_PLACEMENTS = {
  right_hand: [
    { id: 'me-1',    iconId: 'me',    x: 0.42, y: 0.78 },
    { id: 'rocks-1', iconId: 'rocks', x: 0.78, y: 0.45 },
    { id: 'tree-1',  iconId: 'tree',  x: 0.20, y: 0.92 },
  ],
  open:       [{ id:'me-1', iconId:'me', x:0.50, y:0.82 }, {id:'tower-1',iconId:'tower',x:0.74,y:0.90}],
  reef:       [{ id:'me-1', iconId:'me', x:0.30, y:0.80 }],
  rivermouth: [{ id:'me-1', iconId:'me', x:0.55, y:0.75 }],
};

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
  const [strokes, setStrokes] = useState([
    { type:'wave', points:[{x:.86,y:.20},{x:.72,y:.32},{x:.58,y:.46},{x:.44,y:.58},{x:.30,y:.66}] },
    { type:'rip',  points:[{x:.18,y:.85},{x:.20,y:.70},{x:.22,y:.55},{x:.24,y:.40}] },
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
      { type:'wave', points:[{x:.86,y:.20},{x:.72,y:.32},{x:.58,y:.46},{x:.44,y:.58},{x:.30,y:.66}] },
      { type:'rip',  points:[{x:.18,y:.85},{x:.20,y:.70},{x:.22,y:.55},{x:.24,y:.40}] },
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
    setHint(tPath("canvas.demo.hint_drawn", "Nice — try drawing the wave next."));
  }

  function onStageDown(e) {
    if (mode !== 'draw') return;
    e.preventDefault?.();
    const c = relCoords(e); if (!c) return;
    setDrawing(true);
    setStrokes(s => [...s, { type: drawTool, points: [c] }]);
  }
  function onStageMove(e) {
    if (!drawing) return;
    const c = relCoords(e); if (!c) return;
    setStrokes(s => {
      const cp = s.slice();
      cp[cp.length-1] = { ...cp[cp.length-1], points: [...cp[cp.length-1].points, c] };
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
    if (strokes.length) setStrokes(s => s.slice(0, -1));
    else if (placed.length) setPlaced(p => p.slice(0, -1));
  }

  const colorFor = t => t==='wave'?'#1565C0':t==='rip'?'#C62828':'#212121';

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
        </div>
        <div className="right">
          {BREAK_IDS.map(id => (
            <button key={id}
              onClick={()=>setBreakId(id)}
              className="tbtn"
              style={breakId===id?{background:'#0e2a4d',color:'white'}:{background:'rgba(14,42,77,.06)'}}>
              {tPath(`canvas.demo.break_short.${id}`, findBreakLabel(id).split(' ')[0])}
            </button>
          ))}
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
             alt={findBreakLabel(breakId) + ' — beach aerial reference, TODO swap with real-app screenshot'}
             data-img-role={`break-${breakId}`}/>

        <svg viewBox={`0 0 ${stageRect()?.width||1000} ${stageRect()?.height||562}`} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
          <defs>
            <marker id="arr-wave" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1565C0"/></marker>
          </defs>
          {strokes.map((s,i)=>(
            <path key={i}
              d={pathD(s.points)}
              stroke={colorFor(s.type)}
              strokeWidth={s.type==='rip'?4:5}
              strokeDasharray={s.type==='rip'?'8 6':null}
              strokeLinecap="round" strokeLinejoin="round"
              fill="none"
              markerEnd={s.type==='wave'?'url(#arr-wave)':null}
              opacity=".95"
            />
          ))}
        </svg>

        {placed.map(p=>{
          const t = TRAY.find(t=>t.id===p.iconId);
          const label = tPath(`canvas.demo.icon_labels.${p.iconId}`, p.iconId);
          return (
            <div key={p.id} className="placed-icon bounce-in" style={{left:`${p.x*100}%`,top:`${p.y*100}%`}}>
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
            <div style={{display:'flex',gap:6,padding:'0 6px',alignItems:'center'}}>
              {[
                {id:'wave',     color:'#1565C0', labelKey:'canvas.demo.draw_wave',     fallback:'Wave'},
                {id:'rip',      color:'#C62828', labelKey:'canvas.demo.draw_rip',      fallback:'Rip'},
                {id:'freehand', color:'#212121', labelKey:'canvas.demo.draw_freehand', fallback:'Freehand'},
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

        <div className="right">
          <button className="tbtn" style={{background:'#F08A2A',color:'white'}}>
            {tPath("canvas.demo.plan", "Plan →")}
          </button>
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
      <h4>{tPath("review.demo.session_title", "Whale Beach — Right-hand point")}</h4>
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

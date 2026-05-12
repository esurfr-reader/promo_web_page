/* Surf Reader promo — interactive bits */

const { useState, useRef, useEffect, useMemo } = React;

/* ===================== HERO PHONE PREVIEW ===================== */
function PhonePreview() {
  return (
    <div style={{position:'absolute',inset:0,overflow:'hidden',borderRadius:32}}>
      {/* sky + sun */}
      <div style={{
        position:'absolute',inset:0,
        background:'linear-gradient(180deg,#FCE3B6 0%, #F4C77E 30%, #6dd5ed 55%, #2193b0 90%)'
      }}/>
      <div style={{
        position:'absolute',top:'14%',left:'50%',transform:'translateX(-50%)',
        width:120,height:120,borderRadius:'50%',
        background:'radial-gradient(circle,#FFB347, #F08A2A 70%)',
        boxShadow:'0 0 60px rgba(240,138,42,.55)'
      }}/>
      {/* horizon waves */}
      <svg viewBox="0 0 360 200" preserveAspectRatio="none" style={{position:'absolute',left:0,right:0,top:'46%',width:'100%',height:'12%'}}>
        <path d="M0,100 Q90,40 180,100 T360,100" stroke="white" strokeWidth="3" fill="none" opacity=".8"/>
        <path d="M0,140 Q90,80 180,140 T360,140" stroke="white" strokeWidth="2" fill="none" opacity=".55"/>
      </svg>

      {/* status bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,padding:'14px 20px',display:'flex',justifyContent:'space-between',color:'white',fontWeight:600,fontSize:12,letterSpacing:'.05em'}}>
        <span>9:41</span>
        <span>● ● ●</span>
      </div>

      {/* card stack */}
      <div style={{position:'absolute',left:14,right:14,bottom:18,display:'flex',flexDirection:'column',gap:10}}>
        {/* skill rating card */}
        <div style={{background:'rgba(255,255,255,.92)',backdropFilter:'blur(8px)',borderRadius:18,padding:'14px 16px',boxShadow:'0 8px 24px rgba(14,42,77,.18)'}}>
          <div style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'#5b6e85',fontWeight:700}}>Your Skill Rating</div>
          <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginTop:4}}>
            <div style={{fontFamily:'Fraunces, serif',fontSize:36,fontWeight:700,letterSpacing:'-.03em',color:'#0e2a4d',lineHeight:1}}>
              7.6<span style={{fontSize:18,color:'#90a0b6'}}>/10</span>
            </div>
            <div style={{display:'flex',gap:2,alignItems:'flex-end',height:30}}>
              {[12,16,14,20,18,24,22,28].map((h,i)=>(
                <div key={i} style={{width:5,height:h,borderRadius:2,background:i>=5?'linear-gradient(180deg,#F4C77E,#F08A2A)':'#cfd6e0'}}/>
              ))}
            </div>
          </div>
          <div style={{fontSize:11,color:'#5b6e85',marginTop:4}}>Last 8 sessions · trending up</div>
        </div>

        {/* CTA */}
        <div style={{background:'#F08A2A',color:'white',padding:'14px 16px',borderRadius:16,display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 8px 24px rgba(240,138,42,.4)'}}>
          <div>
            <div style={{fontSize:11,fontWeight:600,opacity:.9,letterSpacing:'.05em'}}>NEXT</div>
            <div style={{fontFamily:'Fraunces, serif',fontWeight:700,fontSize:17}}>Plan a session →</div>
          </div>
          <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🏄</div>
        </div>

        {/* recent session */}
        <div style={{background:'rgba(14,42,77,.85)',color:'white',padding:'12px 14px',borderRadius:14,fontSize:12.5}}>
          <div style={{display:'flex',justifyContent:'space-between',opacity:.7,fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',fontWeight:700}}>
            <span>Last surf</span><span>8 / 10</span>
          </div>
          <div style={{fontFamily:'Fraunces, serif',fontWeight:700,fontSize:15,marginTop:2}}>Whale Beach · NSW</div>
          <div style={{opacity:.7,fontSize:11}}>3 May · Right-hand point · 1.2m</div>
        </div>
      </div>
    </div>
  );
}

const phoneRoot = document.getElementById('phoneScreen');
if (phoneRoot) ReactDOM.createRoot(phoneRoot).render(<PhonePreview/>);

/* ===================== FLOW CARD VISUALS ===================== */

function Flow1Map() {
  return (
    <div style={{position:'absolute',inset:0}}>
      <img src="assets/beach_right_hand.png" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
      {/* Me icon */}
      <img src="assets/me_surfer.png" style={{position:'absolute',left:'42%',top:'52%',width:48,height:48,filter:'drop-shadow(0 4px 6px rgba(0,0,0,.4))',transform:'translate(-50%,-85%)'}}/>
      {/* wave arrow */}
      <svg viewBox="0 0 400 280" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} preserveAspectRatio="none">
        <defs>
          <marker id="arr1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#1565C0"/>
          </marker>
        </defs>
        <path d="M340,40 Q260,80 180,140 T80,180" stroke="#1565C0" strokeWidth="4" fill="none" strokeLinecap="round" markerEnd="url(#arr1)" opacity=".95"/>
        <path d="M260,30 Q210,60 160,110" stroke="#1565C0" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        {/* rip */}
        <path d="M120,180 Q140,140 130,90" stroke="#C62828" strokeWidth="3" fill="none" strokeDasharray="6 5" strokeLinecap="round"/>
      </svg>
      <div style={{position:'absolute',top:14,left:14,background:'rgba(10,31,58,.78)',color:'white',fontSize:11,fontWeight:600,padding:'5px 10px',borderRadius:999,letterSpacing:'.04em'}}>Right-hand point · annotated</div>
    </div>
  );
}

function Flow2Plan() {
  const qs = [
    {q:'Where will you sit in the lineup?', a:'Inside, on the bowl'},
    {q:'How many waves is a great session?', a:'8–10'},
    {q:'One thing to work on today?', a:'Earlier paddle, later drop'},
  ];
  return (
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#fef9f0,#f4ead7)',padding:'18px 22px',display:'flex',flexDirection:'column',justifyContent:'center',gap:10}}>
      <div style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'#d96a14',fontWeight:700}}>Guided plan · 7 questions</div>
      {qs.map((it,i)=>(
        <div key={i} style={{background:'white',borderRadius:14,padding:'12px 14px',boxShadow:'0 2px 6px rgba(14,42,77,.06)',border:'1px solid rgba(14,42,77,.08)'}}>
          <div style={{fontFamily:'Fraunces, serif',fontWeight:700,fontSize:13.5,color:'#0e2a4d'}}>{it.q}</div>
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
  return (
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0e2a4d,#143b6e)',padding:'22px',display:'flex',flexDirection:'column',justifyContent:'center',gap:8,color:'white'}}>
      <div style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'#F4C77E',fontWeight:700}}>Post-surf review</div>
      {[
        ['Paddle out',9],['Wave selection',7],['Take-off',8],['Bottom turn',6],['Surf execution',8],
      ].map(([k,v],i)=>(
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
        <span style={{fontSize:11,letterSpacing:'.14em',textTransform:'uppercase',opacity:.7,fontWeight:700}}>Skill Rating</span>
        <span style={{fontFamily:'Fraunces, serif',fontWeight:700,fontSize:24,letterSpacing:'-.02em'}}>7.6 <span style={{color:'#F4C77E',fontSize:14}}>/10</span></span>
      </div>
    </div>
  );
}

[
  ['flowVis1', <Flow1Map/>],
  ['flowVis2', <Flow2Plan/>],
  ['flowVis3', <Flow3Review/>],
].forEach(([id, el])=>{
  const r = document.getElementById(id);
  if (r) ReactDOM.createRoot(r).render(el);
});

/* ===================== INTERACTIVE CANVAS DEMO ===================== */
const BREAKS = [
  { id: 'right_hand', label: 'Right-hand point', img: 'assets/beach_right_hand.png' },
  { id: 'open',       label: 'Open beach',       img: 'assets/beach_open.png' },
  { id: 'reef',       label: 'Beach reef',       img: 'assets/beach_reef.png' },
  { id: 'rivermouth', label: 'Rivermouth',       img: 'assets/beach_river_mouth.png' },
];

const TRAY = [
  { id:'me',     img:'assets/me_surfer.png',         label:'Surfer' },
  { id:'house',  img:'assets/icon_house.png',        label:'House' },
  { id:'tree',   img:'assets/icon_tree.png',         label:'Tree' },
  { id:'rocks',  img:'assets/icon_rocks.png',        label:'Rocks' },
  { id:'tower',  img:'assets/icon_lifesaver_tower.png', label:'Lifesaver tower' },
  { id:'flag',   img:'assets/icon_lifesaver_flag.png',  label:'Flag' },
  { id:'track',  img:'assets/icon_walking_track.png', label:'Walking track' },
  { id:'park',   img:'assets/icon_carpark.png',      label:'Car park' },
  { id:'building',img:'assets/icon_building.png',    label:'Building' },
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

function CanvasDemo() {
  const [breakId, setBreakId] = useState('right_hand');
  const [mode, setMode] = useState('icons'); // icons | draw | tools
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [drawTool, setDrawTool] = useState('wave'); // wave | rip | freehand
  const [placed, setPlaced] = useState(SEED_PLACEMENTS[breakId]);
  const [strokes, setStrokes] = useState([
    // a seed wave arrow on the right-hand point
    { type:'wave',     points:[{x:.86,y:.20},{x:.72,y:.32},{x:.58,y:.46},{x:.44,y:.58},{x:.30,y:.66}] },
    { type:'rip',      points:[{x:.18,y:.85},{x:.20,y:.70},{x:.22,y:.55},{x:.24,y:.40}] },
  ]);
  const [drawing, setDrawing] = useState(false);
  const [hint, setHint] = useState('Tap an icon, then tap the canvas to place it.');
  const stageRef = useRef(null);

  // reset placements when break changes
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
    setHint('Nice — try drawing the wave next.');
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
    if (drawing) setHint('Looking good. Switch to "Tools" to clear or move on.');
    setDrawing(false);
  }

  function clearAll() {
    setPlaced([]); setStrokes([]); setHint('Cleared. Tap an icon to start placing.');
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

  return (
    <div className="canvas-frame">
      <div className="canvas-meta">
        <div className="left">
          <h4>Whale Beach · {BREAKS.find(b=>b.id===breakId).label}</h4>
          <span className="pill">{placed.length} icons · {strokes.length} strokes</span>
        </div>
        <div className="right">
          {BREAKS.map(b=>(
            <button key={b.id}
              onClick={()=>setBreakId(b.id)}
              className="tbtn"
              style={breakId===b.id?{background:'#0e2a4d',color:'white'}:{background:'rgba(14,42,77,.06)'}}>
              {b.label.split(' ')[0]}
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
        <img className="bg" src={BREAKS.find(b=>b.id===breakId).img} alt={BREAKS.find(b=>b.id===breakId).label}/>

        {/* strokes */}
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
          return (
            <div key={p.id} className="placed-icon bounce-in" style={{left:`${p.x*100}%`,top:`${p.y*100}%`}}>
              <img src={t?.img} alt={t?.label}/>
            </div>
          );
        })}

        <div className="stage-hint">{hint}</div>
      </div>

      <div className="canvas-toolbar">
        <div className="modes">
          <button className={`tbtn ${mode==='icons'?'active':''}`} onClick={()=>setMode('icons')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 6 .9-4.5 4.4 1 6.2L12 16.7 6.5 19.5l1-6.2L3 8.9 9 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            Icons
          </button>
          <button className={`tbtn ${mode==='draw'?'active':''}`} onClick={()=>setMode('draw')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 17l4 4 14-14-4-4z M14 6l4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            Draw
          </button>
          <button className={`tbtn ${mode==='tools'?'active':''}`} onClick={()=>setMode('tools')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 7L8 19l-5 1 1-5L16 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            Tools
          </button>
        </div>

        <div className="spacer">
          {mode==='icons' && (
            <div className="icon-tray">
              {TRAY.map(t=>(
                <button key={t.id}
                  className={`tray-item ${selectedIcon===t.id?'':''}`}
                  onClick={(e)=>{ e.stopPropagation(); setSelectedIcon(t.id); setHint(`Now tap the canvas to place: ${t.label}`); }}
                  style={selectedIcon===t.id?{borderColor:'#F08A2A',boxShadow:'0 0 0 2px rgba(240,138,42,.25)'}:null}
                  title={t.label}>
                  <img src={t.img} alt={t.label}/>
                </button>
              ))}
            </div>
          )}
          {mode==='draw' && (
            <div style={{display:'flex',gap:6,padding:'0 6px',alignItems:'center'}}>
              {[
                {id:'wave',color:'#1565C0',label:'Wave'},
                {id:'rip',color:'#C62828',label:'Rip'},
                {id:'freehand',color:'#212121',label:'Freehand'},
              ].map(t=>(
                <button key={t.id}
                  onClick={()=>{setDrawTool(t.id); setHint(`Drag on the canvas to draw ${t.label.toLowerCase()}.`);}}
                  className={`tbtn`}
                  style={drawTool===t.id?{background:t.color,color:'white'}:null}>
                  <span style={{display:'inline-block',width:10,height:10,borderRadius:2,background:t.color}}/>
                  {t.label}
                </button>
              ))}
            </div>
          )}
          {mode==='tools' && (
            <div style={{display:'flex',gap:6,padding:'0 6px',alignItems:'center'}}>
              <button className="tbtn" onClick={undo}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 14l-5-5 5-5 M4 9h11a5 5 0 1 1 0 10H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Undo
              </button>
              <button className="tbtn" onClick={clearAll} style={{color:'#C62828'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="right">
          <button className="tbtn" style={{background:'#F08A2A',color:'white'}}>
            Plan →
          </button>
        </div>
      </div>
    </div>
  );
}

const cd = document.getElementById('canvasDemo');
if (cd) ReactDOM.createRoot(cd).render(<CanvasDemo/>);

/* ===================== REVIEW DEMO ===================== */
const CRITERIA = [
  'Paddle out',
  'Wave selection',
  'Take-off timing',
  'Bottom turn',
  'Surf execution',
  'Wave count',
  'Energy & focus',
];

function Star({ on, onClick }) {
  return (
    <svg className={`star ${on?'on':''}`} viewBox="0 0 24 24" fill="currentColor" onClick={onClick}>
      <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.7 9.5l7.4-.6z"/>
    </svg>
  );
}

function ReviewDemo() {
  const [ratings, setRatings] = useState([9, 7, 8, 6, 7, 8, 9]);
  const avg = useMemo(()=> {
    const s = ratings.reduce((a,b)=>a+b,0); return Math.round((s/ratings.length)*10)/10;
  }, [ratings]);
  const filledRamp = Math.round(avg);

  return (
    <div className="review-card">
      <h4>Whale Beach — Right-hand point</h4>
      <div className="session-meta">3 May 2026 · 1.2m clean · 6:40am session · Plan: "Earlier paddle, later drop."</div>

      {CRITERIA.map((c,i)=>(
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
          <div className="small">Skill Rating</div>
          <div className="big">{avg.toFixed(1)} <span style={{color:'#F08A2A',fontSize:'.6em'}}>/10</span></div>
        </div>
        <div className="ramp" aria-hidden="true">
          {[1,2,3,4,5,6,7,8,9,10].map(i => <span key={i} className={i<=filledRamp?'on':''}/>)}
        </div>
      </div>

      <div style={{marginTop:14,fontSize:12.5,color:'#5b6e85'}}>Tip: tap a star to update — totals recompute live.</div>
    </div>
  );
}

const rd = document.getElementById('reviewDemo');
if (rd) ReactDOM.createRoot(rd).render(<ReviewDemo/>);

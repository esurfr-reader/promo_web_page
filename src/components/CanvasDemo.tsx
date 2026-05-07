import { useEffect, useRef, useState, type CSSProperties } from "react";
import { images } from "../content/images";

type BreakId = "right_hand" | "open" | "reef" | "rivermouth";
type IconId = "me" | "house" | "tree" | "rocks" | "tower" | "flag" | "track" | "park" | "building";
type Mode = "icons" | "draw" | "tools";
type DrawTool = "wave" | "rip" | "freehand";

type Stroke = { type: DrawTool; points: { x: number; y: number }[] };
type Placement = { id: string; iconId: IconId; x: number; y: number };

const BREAKS: Array<{ id: BreakId; label: string; img: string }> = [
  { id: "right_hand", label: "Right-hand point", img: images.breaks.rightPoint },
  { id: "open", label: "Open beach", img: images.breaks.openBeach },
  { id: "reef", label: "Beach reef", img: images.breaks.beachReef },
  { id: "rivermouth", label: "Rivermouth", img: images.breaks.rivermouth },
];

const TRAY: Array<{ id: IconId; img: string; label: string }> = [
  { id: "me", img: images.canvasIcons.me, label: "Me" },
  { id: "house", img: images.canvasIcons.house, label: "House" },
  { id: "tree", img: images.canvasIcons.tree, label: "Tree" },
  { id: "rocks", img: images.canvasIcons.rocks, label: "Rocks" },
  { id: "tower", img: images.canvasIcons.lifesaverTower, label: "Lifesaver tower" },
  { id: "flag", img: images.canvasIcons.lifesaverFlag, label: "Flag" },
  { id: "track", img: images.canvasIcons.walkingTrack, label: "Walking track" },
  { id: "park", img: images.canvasIcons.carpark, label: "Car park" },
  { id: "building", img: images.canvasIcons.building, label: "Building" },
];

const SEED_PLACEMENTS: Record<BreakId, Placement[]> = {
  right_hand: [
    { id: "me-1", iconId: "me", x: 0.42, y: 0.78 },
    { id: "rocks-1", iconId: "rocks", x: 0.78, y: 0.45 },
    { id: "tree-1", iconId: "tree", x: 0.2, y: 0.92 },
  ],
  open: [
    { id: "me-1", iconId: "me", x: 0.5, y: 0.82 },
    { id: "tower-1", iconId: "tower", x: 0.74, y: 0.9 },
  ],
  reef: [{ id: "me-1", iconId: "me", x: 0.3, y: 0.8 }],
  rivermouth: [{ id: "me-1", iconId: "me", x: 0.55, y: 0.75 }],
};

const SEED_STROKES_RIGHT_HAND: Stroke[] = [
  {
    type: "wave",
    points: [
      { x: 0.86, y: 0.2 },
      { x: 0.72, y: 0.32 },
      { x: 0.58, y: 0.46 },
      { x: 0.44, y: 0.58 },
      { x: 0.3, y: 0.66 },
    ],
  },
  {
    type: "rip",
    points: [
      { x: 0.18, y: 0.85 },
      { x: 0.2, y: 0.7 },
      { x: 0.22, y: 0.55 },
      { x: 0.24, y: 0.4 },
    ],
  },
];

export default function CanvasDemo() {
  const [breakId, setBreakId] = useState<BreakId>("right_hand");
  const [mode, setMode] = useState<Mode>("icons");
  const [selectedIcon, setSelectedIcon] = useState<IconId | null>(null);
  const [drawTool, setDrawTool] = useState<DrawTool>("wave");
  const [placed, setPlaced] = useState<Placement[]>(SEED_PLACEMENTS[breakId]);
  const [strokes, setStrokes] = useState<Stroke[]>(SEED_STROKES_RIGHT_HAND);
  const [drawing, setDrawing] = useState(false);
  const [hint, setHint] = useState("Tap an icon, then tap the canvas to place it.");
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlaced(SEED_PLACEMENTS[breakId] ?? []);
    setStrokes(breakId === "right_hand" ? SEED_STROKES_RIGHT_HAND : []);
  }, [breakId]);

  const stageRect = () => stageRef.current?.getBoundingClientRect();

  function relCoords(e: React.MouseEvent | React.TouchEvent) {
    const r = stageRect();
    if (!r) return null;
    const t = "touches" in e && e.touches.length > 0 ? e.touches[0] : (e as React.MouseEvent);
    return { x: (t.clientX - r.left) / r.width, y: (t.clientY - r.top) / r.height };
  }

  function onStageClick(e: React.MouseEvent) {
    if (mode !== "icons" || !selectedIcon) return;
    const c = relCoords(e);
    if (!c) return;
    const id = `${selectedIcon}-${Date.now()}`;
    setPlaced((p) => [...p, { id, iconId: selectedIcon, x: c.x, y: c.y }]);
    setSelectedIcon(null);
    setHint("Nice — try drawing the wave next.");
  }

  function onStageDown(e: React.MouseEvent | React.TouchEvent) {
    if (mode !== "draw") return;
    if ("preventDefault" in e) e.preventDefault();
    const c = relCoords(e);
    if (!c) return;
    setDrawing(true);
    setStrokes((s) => [...s, { type: drawTool, points: [c] }]);
  }
  function onStageMove(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing) return;
    const c = relCoords(e);
    if (!c) return;
    setStrokes((s) => {
      const cp = s.slice();
      cp[cp.length - 1] = { ...cp[cp.length - 1], points: [...cp[cp.length - 1].points, c] };
      return cp;
    });
  }
  function onStageUp() {
    if (drawing) setHint('Looking good. Switch to "Tools" to clear or move on.');
    setDrawing(false);
  }

  function clearAll() {
    setPlaced([]);
    setStrokes([]);
    setHint("Cleared. Tap an icon to start placing.");
  }
  function undo() {
    if (strokes.length) setStrokes((s) => s.slice(0, -1));
    else if (placed.length) setPlaced((p) => p.slice(0, -1));
  }

  const colorFor = (t: DrawTool) => (t === "wave" ? "#1565C0" : t === "rip" ? "#C62828" : "#212121");

  function pathD(points: { x: number; y: number }[]) {
    if (!points?.length) return "";
    const r = stageRect();
    if (!r) return "";
    return points.map((p, i) => `${i ? "L" : "M"} ${p.x * r.width} ${p.y * r.height}`).join(" ");
  }

  const activeBreak = BREAKS.find((b) => b.id === breakId)!;

  return (
    <div className="canvas-frame">
      <div className="canvas-meta">
        <div className="left">
          <h4>Whale Beach · {activeBreak.label}</h4>
          <span className="pill">
            {placed.length} icons · {strokes.length} strokes
          </span>
        </div>
        <div className="right">
          {BREAKS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBreakId(b.id)}
              className="tbtn"
              style={breakId === b.id ? { background: "#0e2a4d", color: "white" } : { background: "rgba(14,42,77,.06)" }}
            >
              {b.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        className="canvas-stage"
        onClick={onStageClick}
        onMouseDown={onStageDown}
        onMouseMove={onStageMove}
        onMouseUp={onStageUp}
        onMouseLeave={onStageUp}
        onTouchStart={onStageDown}
        onTouchMove={onStageMove}
        onTouchEnd={onStageUp}
        style={{
          cursor:
            (mode === "icons" && selectedIcon) || mode === "draw" ? "crosshair" : "default",
        }}
      >
        <img className="bg" src={activeBreak.img} alt={activeBreak.label} />

        <svg
          viewBox={`0 0 ${stageRect()?.width || 1000} ${stageRect()?.height || 562}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <defs>
            <marker id="arr-wave" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#1565C0" />
            </marker>
          </defs>
          {strokes.map((s, i) => (
            <path
              key={i}
              d={pathD(s.points)}
              stroke={colorFor(s.type)}
              strokeWidth={s.type === "rip" ? 4 : 5}
              strokeDasharray={s.type === "rip" ? "8 6" : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              markerEnd={s.type === "wave" ? "url(#arr-wave)" : undefined}
              opacity=".95"
            />
          ))}
        </svg>

        {placed.map((p) => {
          const t = TRAY.find((x) => x.id === p.iconId);
          return (
            <div
              key={p.id}
              className="placed-icon bounce-in"
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
            >
              <img src={t?.img} alt={t?.label} />
            </div>
          );
        })}

        <div className="stage-hint">{hint}</div>
      </div>

      <div className="canvas-toolbar">
        <div className="modes">
          <button type="button" className={`tbtn ${mode === "icons" ? "active" : ""}`} onClick={() => setMode("icons")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l3 6 6 .9-4.5 4.4 1 6.2L12 16.7 6.5 19.5l1-6.2L3 8.9 9 8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Icons
          </button>
          <button type="button" className={`tbtn ${mode === "draw" ? "active" : ""}`} onClick={() => setMode("draw")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 17l4 4 14-14-4-4z M14 6l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Draw
          </button>
          <button type="button" className={`tbtn ${mode === "tools" ? "active" : ""}`} onClick={() => setMode("tools")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7L8 19l-5 1 1-5L16 3z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Tools
          </button>
        </div>

        <div className="spacer">
          {mode === "icons" && (
            <div className="icon-tray">
              {TRAY.map((tray) => {
                const active: CSSProperties | undefined =
                  selectedIcon === tray.id
                    ? { borderColor: "#F08A2A", boxShadow: "0 0 0 2px rgba(240,138,42,.25)" }
                    : undefined;
                return (
                  <button
                    key={tray.id}
                    type="button"
                    className="tray-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIcon(tray.id);
                      setHint(`Now tap the canvas to place: ${tray.label}`);
                    }}
                    style={active}
                    title={tray.label}
                  >
                    <img src={tray.img} alt={tray.label} />
                  </button>
                );
              })}
            </div>
          )}
          {mode === "draw" && (
            <div style={{ display: "flex", gap: 6, padding: "0 6px", alignItems: "center" }}>
              {(
                [
                  { id: "wave" as DrawTool, color: "#1565C0", label: "Wave" },
                  { id: "rip" as DrawTool, color: "#C62828", label: "Rip" },
                  { id: "freehand" as DrawTool, color: "#212121", label: "Freehand" },
                ]
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setDrawTool(t.id);
                    setHint(`Drag on the canvas to draw ${t.label.toLowerCase()}.`);
                  }}
                  className="tbtn"
                  style={drawTool === t.id ? { background: t.color, color: "white" } : undefined}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: t.color,
                    }}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          )}
          {mode === "tools" && (
            <div style={{ display: "flex", gap: 6, padding: "0 6px", alignItems: "center" }}>
              <button type="button" className="tbtn" onClick={undo}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 14l-5-5 5-5 M4 9h11a5 5 0 1 1 0 10H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Undo
              </button>
              <button type="button" className="tbtn" onClick={clearAll} style={{ color: "#C62828" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="right">
          <button type="button" className="tbtn" style={{ background: "#F08A2A", color: "white" }}>
            Plan →
          </button>
        </div>
      </div>
    </div>
  );
}

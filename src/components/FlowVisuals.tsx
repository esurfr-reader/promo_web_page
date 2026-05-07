import { images } from "../content/images";

export function Flow1Map() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src={images.breaks.rightPoint}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <img
        src={images.canvasIcons.me}
        alt=""
        style={{
          position: "absolute",
          left: "42%",
          top: "52%",
          width: 48,
          height: 48,
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,.4))",
          transform: "translate(-50%,-85%)",
        }}
      />
      <svg
        viewBox="0 0 400 280"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        preserveAspectRatio="none"
      >
        <defs>
          <marker id="arr1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#1565C0" />
          </marker>
        </defs>
        <path
          d="M340,40 Q260,80 180,140 T80,180"
          stroke="#1565C0"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#arr1)"
          opacity=".95"
        />
        <path
          d="M260,30 Q210,60 160,110"
          stroke="#1565C0"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity=".7"
        />
        <path
          d="M120,180 Q140,140 130,90"
          stroke="#C62828"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          background: "rgba(10,31,58,.78)",
          color: "white",
          fontSize: 11,
          fontWeight: 600,
          padding: "5px 10px",
          borderRadius: 999,
          letterSpacing: ".04em",
        }}
      >
        Right-hand point · annotated
      </div>
    </div>
  );
}

export function Flow2Plan() {
  const qs = [
    { q: "Where will you sit in the lineup?", a: "Inside, on the bowl" },
    { q: "How many waves is a great session?", a: "8–10" },
    { q: "One thing to work on today?", a: "Earlier paddle, later drop" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,#fef9f0,#f4ead7)",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "#d96a14",
          fontWeight: 700,
        }}
      >
        Guided plan · 7 questions
      </div>
      {qs.map((it, i) => (
        <div
          key={i}
          style={{
            background: "white",
            borderRadius: 14,
            padding: "12px 14px",
            boxShadow: "0 2px 6px rgba(14,42,77,.06)",
            border: "1px solid rgba(14,42,77,.08)",
          }}
        >
          <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 13.5, color: "#0e2a4d" }}>
            {it.q}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: "#F08A2A",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              ✓
            </span>
            <span style={{ fontSize: 12.5, color: "#14304f" }}>{it.a}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Flow3Review() {
  const rows: Array<[string, number]> = [
    ["Paddle out", 5],
    ["Wave selection", 4],
    ["Take-off", 4],
    ["Bottom turn", 3],
    ["Surf execution", 4],
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,#0e2a4d,#143b6e)",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
        color: "white",
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "#F4C77E",
          fontWeight: 700,
        }}
      >
        Post-surf review
      </div>
      {rows.map(([k, v], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12.5, opacity: 0.92 }}>{k}</div>
          <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={s <= v ? "#F08A2A" : "rgba(255,255,255,.18)"}
              >
                <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.7 9.5l7.4-.6z" />
              </svg>
            ))}
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 10,
          padding: "10px 12px",
          background: "rgba(255,255,255,.08)",
          border: "1px solid rgba(255,255,255,.18)",
          borderRadius: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            opacity: 0.7,
            fontWeight: 700,
          }}
        >
          Skill Rating
        </span>
        <span
          style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 24, letterSpacing: "-.02em" }}
        >
          4.0 <span style={{ color: "#F4C77E", fontSize: 14 }}>★</span>
        </span>
      </div>
    </div>
  );
}

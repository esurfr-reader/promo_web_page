import { useMemo, useState } from "react";

const CRITERIA = [
  "Paddle out",
  "Wave selection",
  "Take-off timing",
  "Bottom turn",
  "Surf execution",
  "Wave count",
  "Energy & focus",
];

function StarIcon({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <svg
      className={`star ${on ? "on" : ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      onClick={onClick}
      role="radio"
      aria-checked={on}
    >
      <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.7 9.5l7.4-.6z" />
    </svg>
  );
}

export default function ReviewDemo() {
  const [ratings, setRatings] = useState<number[]>([5, 4, 4, 3, 4, 4, 5]);
  const avg = useMemo(() => {
    const s = ratings.reduce((a, b) => a + b, 0);
    return Math.round((s / ratings.length) * 10) / 10;
  }, [ratings]);
  const filledRamp = Math.round(avg);

  return (
    <div className="review-card">
      <h4>Whale Beach — Right-hand point</h4>
      <div className="session-meta">
        3 May 2026 · 1.2m clean · 6:40am session · Plan: "Earlier paddle, later drop."
      </div>

      {CRITERIA.map((c, i) => (
        <div key={c} className="criterion">
          <div className="label">{c}</div>
          <div className="stars" role="radiogroup" aria-label={c}>
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon
                key={s}
                on={s <= ratings[i]}
                onClick={() => {
                  const cp = ratings.slice();
                  cp[i] = s;
                  setRatings(cp);
                }}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="summary">
        <div className="left">
          <div className="small">Skill Rating</div>
          <div className="big">
            {avg.toFixed(1)} <span style={{ color: "#F08A2A" }}>★</span>
          </div>
        </div>
        <div className="ramp" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={i <= filledRamp ? "on" : ""} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14, fontSize: 12.5, color: "#5b6e85" }}>
        Tip: tap a star to update — totals recompute live.
      </div>
    </div>
  );
}

/** Design tokens lifted from the original site. */
export const colors = {
  ink: "#0a1f3a",
  ink2: "#14304f",
  navy: "#0e2a4d",
  navySoft: "#1a3a66",
  sky1: "#2193b0",
  sky2: "#6dd5ed",
  sand: "#f4c77e",
  sandSoft: "#fbe9c4",
  sunset: "#f08a2a",
  sunsetDeep: "#d96a14",
  rip: "#c62828",
  paper: "#fbf6ee",
  paper2: "#fef9f0",
  line: "rgba(14, 42, 77, 0.12)",
  lineStrong: "rgba(14, 42, 77, 0.22)",
  white: "#ffffff",
} as const;

export const fonts = {
  display: 'Fraunces, ui-serif, Georgia, serif',
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
} as const;

export const layout = {
  wrapMax: 1200,
  wrapNarrow: 920,
  pad: 28,
} as const;

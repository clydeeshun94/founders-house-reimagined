/* ============================================================
   THEME — single source of truth for all visual tokens
   Edit here, changes propagate everywhere automatically.
   ============================================================ */

export const COLORS = {
  /* ── Palette ─────────────────────────────────────────────── */
  cream:        "#FFFAF3",
  creamMid:     "#FFF2DB",
  creamDeep:    "#FFE5BF",
  red:          "#F62440",

  /* ── Semantic mappings ───────────────────────────────────── */
  pageBg:        "#F62440",   /* red as the page base            */
  sectionTint:   "#d41535",   /* darker red for section layers   */

  textPrimary:   "#FFFAF3",   /* lightest cream on red           */
  textSecondary: "#FFE5BF",   /* deep cream                      */
  textMuted:     "#FFF2DB",   /* mid cream                       */
  textInverse:   "#F62440",   /* red — for text on cream bg      */

  accent:        "#FFFAF3",   /* cream as accent on red bg       */
  accentHover:   "#FFE5BF",

  border:        "rgba(255,250,243,0.2)",
  borderStrong:  "rgba(255,250,243,0.4)",
} as const;

export const FONTS = {
  display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  sans:    "'Inter', ui-sans-serif, system-ui, sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, monospace",
} as const;

export const FONT_SIZE = {
  heroName:    "clamp(4rem, 14vw, 12rem)",
  sectionHead: "clamp(2rem, 5vw, 5rem)",
  bigNum:      "clamp(5rem, 18vw, 18rem)",
  body:        "clamp(0.85rem, 1.2vw, 1.05rem)",
  small:       "clamp(0.75rem, 1vw, 0.9rem)",
  label:       "0.7rem",
} as const;

export const SPACING = {
  sectionPadX: "clamp(1.25rem, 5vw, 4rem)",
  sectionPadY: "clamp(3rem, 8vh, 6rem)",
} as const;

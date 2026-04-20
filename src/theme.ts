import { loadFont } from "@remotion/google-fonts/Cairo";

const { fontFamily: cairoFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
});

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const COLORS = {
  // Brand
  orange: "#F2A22C",
  orangeDark: "#E8861A",
  orangeBright: "#FF6B1A", // brush-swoosh accent
  orangeSoft: "#FFE8C8",

  // Brand red (Jahez-style vivid red)
  brandRed: "#E63946",
  brandRedDeep: "#B0202E",

  // Studio backdrop
  studioBg: "#E9E7E2",
  studioBgWarm: "#EFEAE0",
  studioBgDark: "#1B1B1F",

  // Neutrals
  white: "#FFFFFF",
  ink: "#0F172A",
  inkSoft: "#1E293B",
  muted: "#64748B",
  line: "#E5E7EB",

  // Accents
  green: "#10B981",
  amber: "#F59E0B",

  // Pain palette retained for legacy
  bg: "#FFF7ED",
  painBg: "#0A0A0F",
  painBgSoft: "#1A0E13",
  red: "#EF4444",
  redDeep: "#7F1D1D",
  crimson: "#B91C1C",
  saudi: "#165E3D",
};

export const FONT_STACK = `${cairoFamily}, "Cairo", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

export const sec = (s: number): number => Math.round(s * FPS);

// 6 scenes, 45 seconds total
export const SCENE_DURATIONS = {
  s1: sec(3),  // Hook slam
  s2: sec(7),  // Pain (receipts/numbers)
  s3: sec(5),  // Brand reveal
  s4: sec(12), // Demo with floating phone
  s5: sec(10), // Promise pills
  s6: sec(8),  // End frame
} as const;

export const TOTAL_DURATION =
  SCENE_DURATIONS.s1 +
  SCENE_DURATIONS.s2 +
  SCENE_DURATIONS.s3 +
  SCENE_DURATIONS.s4 +
  SCENE_DURATIONS.s5 +
  SCENE_DURATIONS.s6;

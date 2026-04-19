import { loadFont } from "@remotion/google-fonts/Cairo";

const { fontFamily: cairoFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
});

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const COLORS = {
  orange: "#F2A22C",
  orangeDark: "#E8861A",
  orangeSoft: "#FFE8C8",
  bg: "#FFF7ED",
  bgDark: "#1F1410",
  white: "#FFFFFF",
  ink: "#2E3849",
  inkSoft: "#475569",
  muted: "#6B7280",
  line: "#E5E7EB",
  green: "#10B981",
  red: "#EF4444",
  amber: "#F59E0B",
};

export const FONT_STACK = `${cairoFamily}, "Cairo", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

export const sec = (s: number): number => Math.round(s * FPS);

export const SCENE_DURATIONS = {
  s1: sec(3),
  s2: sec(5),
  s3: sec(4),
  s4: sec(10),
  s5: sec(8),
  s6: sec(7),
  s7: sec(5),
  s8: sec(3),
} as const;

export const TOTAL_DURATION =
  SCENE_DURATIONS.s1 +
  SCENE_DURATIONS.s2 +
  SCENE_DURATIONS.s3 +
  SCENE_DURATIONS.s4 +
  SCENE_DURATIONS.s5 +
  SCENE_DURATIONS.s6 +
  SCENE_DURATIONS.s7 +
  SCENE_DURATIONS.s8;

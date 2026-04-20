import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_STACK } from "./theme";

// ====================================================================
// LOGO
// ====================================================================
export const Logo: React.FC<{ width?: number }> = ({ width = 520 }) => (
  <Img
    src={staticFile("logo.jpeg")}
    style={{ width, height: "auto", objectFit: "contain" }}
  />
);

// ====================================================================
// BACKGROUNDS — Studio look (Jahez-style seamless backdrop with softbox)
// ====================================================================
export const StudioBackground: React.FC<{ dark?: boolean }> = ({
  dark = false,
}) => {
  if (dark) {
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, #2A2A30 0%, ${COLORS.studioBgDark} 65%, #000 100%)`,
        }}
      />
    );
  }
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 25%, #FFFFFF 0%, ${COLORS.studioBgWarm} 40%, ${COLORS.studioBg} 80%, #C9C5BC 100%)`,
      }}
    />
  );
};

export const SoftboxGlow: React.FC<{ x?: number; y?: number; size?: number; opacity?: number }> = ({
  x = 200,
  y = 280,
  size = 700,
  opacity = 0.7,
}) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 70%)`,
        filter: "blur(20px)",
      }}
    />
  </AbsoluteFill>
);

export const PainBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 10) * 0.05 + 0.95;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${COLORS.painBgSoft} 0%, ${COLORS.painBg} 60%, #000 100%)`,
        transform: `scale(${pulse})`,
      }}
    />
  );
};

export const SolutionBackground: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 25%, ${COLORS.orangeSoft} 0%, ${COLORS.bg} 55%, #FFFFFF 100%)`,
    }}
  />
);

// ====================================================================
// BRUSH SWOOSH — the signature Jahez orange brush stroke graphic device
// ====================================================================
export const BrushSwoosh: React.FC<{
  delay?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  color?: string;
  variant?: 1 | 2 | 3;
}> = ({
  delay = 0,
  x = 0,
  y = 0,
  width = 700,
  height = 1400,
  rotation = 0,
  color = COLORS.orangeBright,
  variant = 1,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  // Animate the stroke being drawn (dashoffset trick) + scale-in
  const draw = Math.max(0, Math.min(1, local / 22));
  const op = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Three swoosh path variants for variety
  const paths: Record<1 | 2 | 3, string> = {
    1: "M 250 80 C 220 280 150 520 200 760 C 230 980 320 1180 400 1340",
    2: "M 100 120 C 200 380 280 600 260 880 C 240 1120 160 1280 100 1380",
    3: "M 350 60 C 280 220 180 460 150 700 C 130 940 220 1180 360 1340",
  };

  const pathLength = 2200;
  const dashOffset = pathLength * (1 - draw);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 1400"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        opacity: op,
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient id={`brushGrad-${variant}-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d={paths[variant]}
        stroke={`url(#brushGrad-${variant}-${delay})`}
        strokeWidth={120}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};

// Decorative small swoosh (thinner, for accents)
export const MiniSwoosh: React.FC<{
  delay?: number;
  x?: number;
  y?: number;
  width?: number;
  rotation?: number;
  color?: string;
}> = ({
  delay = 0,
  x = 0,
  y = 0,
  width = 280,
  rotation = -8,
  color = COLORS.orangeBright,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const draw = Math.max(0, Math.min(1, local / 14));
  const op = interpolate(local, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const len = 600;
  return (
    <svg
      width={width}
      height={width * 0.35}
      viewBox="0 0 400 140"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        opacity: op,
        pointerEvents: "none",
      }}
    >
      <path
        d="M 20 80 C 100 30 220 30 380 70"
        stroke={color}
        strokeWidth={28}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
    </svg>
  );
};

// ====================================================================
// SLAM HEADLINE — Jahez-style massive Arabic typography
// ====================================================================
export const SlamHeadline: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
  size?: number;
  weight?: number;
  align?: "center" | "right" | "left";
  shadow?: boolean;
}> = ({
  children,
  delay = 0,
  color = COLORS.ink,
  size = 150,
  weight = 900,
  align = "center",
  shadow = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 11, stiffness: 200, mass: 0.7 },
  });
  const scale = interpolate(s, [0, 1], [1.18, 1]);
  const opacity = interpolate(s, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        fontFamily: FONT_STACK,
        fontSize: size,
        fontWeight: weight,
        color,
        textAlign: align,
        direction: "rtl",
        lineHeight: 1.05,
        letterSpacing: -3,
        transform: `scale(${scale})`,
        opacity,
        padding: "0 50px",
        textShadow: shadow ? "0 8px 30px rgba(0,0,0,0.3)" : undefined,
      }}
    >
      {children}
    </div>
  );
};

// ====================================================================
// PILL BADGE — Jahez-style red rounded pill with white Arabic text
// ====================================================================
export const PillBadge: React.FC<{
  children: React.ReactNode;
  delay?: number;
  bg?: string;
  color?: string;
  size?: number;
  rotation?: number;
}> = ({
  children,
  delay = 0,
  bg = COLORS.brandRed,
  color = COLORS.white,
  size = 64,
  rotation = -3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 9, stiffness: 220, mass: 0.6 },
  });
  const scale = interpolate(s, [0, 1], [0.5, 1]);
  const op = interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        background: bg,
        color,
        fontFamily: FONT_STACK,
        fontWeight: 900,
        fontSize: size,
        padding: `${size * 0.32}px ${size * 0.7}px`,
        borderRadius: 999,
        direction: "rtl",
        display: "inline-block",
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity: op,
        boxShadow: "0 18px 40px rgba(230,57,70,0.35), 0 6px 14px rgba(0,0,0,0.18)",
        letterSpacing: -1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};

// ====================================================================
// FLOATING PHONE MOCKUP — semi-transparent UI floating in scene
// ====================================================================
export const FloatingPhoneMockup: React.FC<{
  src: string;
  delay?: number;
  scale?: number;
  x?: number;
  y?: number;
}> = ({ src, delay = 0, scale = 0.7, x = 0, y = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 130, mass: 0.9 },
  });
  const enterY = interpolate(s, [0, 1], [80, 0]);
  const op = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const float = Math.sin((frame - delay) / 22) * 8;
  const w = 600 * scale;
  const h = 1240 * scale;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + enterY + float,
        width: w,
        height: h,
        borderRadius: 60 * scale,
        background: "#FFFFFF",
        padding: 14 * scale,
        boxShadow:
          "0 60px 120px rgba(0,0,0,0.25), 0 12px 36px rgba(0,0,0,0.18)",
        opacity: op,
        border: `4px solid ${COLORS.orangeBright}`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 50 * scale,
          overflow: "hidden",
          position: "relative",
          background: COLORS.white,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
    </div>
  );
};

// ====================================================================
// SHAKE / FLASH — for impact moments
// ====================================================================
export const Shake: React.FC<{
  children: React.ReactNode;
  intensity?: number;
  at: number;
  duration?: number;
}> = ({ children, intensity = 18, at, duration = 18 }) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  const active = local >= 0 && local < duration;
  const decay = active ? 1 - local / duration : 0;
  const dx = active ? (random(`sx-${local}`) - 0.5) * intensity * decay : 0;
  const dy = active ? (random(`sy-${local}`) - 0.5) * intensity * decay : 0;
  return (
    <div
      style={{
        transform: `translate(${dx}px, ${dy}px)`,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export const FlashOverlay: React.FC<{
  at: number;
  duration?: number;
  color?: string;
}> = ({ at, duration = 12, color = "#FFFFFF" }) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  const op = interpolate(local, [0, 3, duration], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ background: color, opacity: op, pointerEvents: "none" }}
    />
  );
};

// ====================================================================
// COUNTING NUMBER & DAMAGE CARD
// ====================================================================
export const CountingNumber: React.FC<{
  from?: number;
  to: number;
  delay?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  color?: string;
  size?: number;
}> = ({
  from = 0,
  to,
  delay = 0,
  duration = 22,
  suffix = "",
  prefix = "",
  color = COLORS.white,
  size = 150,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const t = Math.min(1, local / duration);
  const eased = 1 - Math.pow(1 - t, 3);
  const val = Math.round(from + (to - from) * eased);
  return (
    <span
      style={{
        fontFamily: FONT_STACK,
        fontWeight: 900,
        color,
        fontSize: size,
        letterSpacing: -2,
        fontVariantNumeric: "tabular-nums",
        direction: "ltr",
        display: "inline-block",
      }}
    >
      {prefix}
      {val.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

export const RiyalDamageCard: React.FC<{
  day: string;
  amount: number;
  delay: number;
}> = ({ day, amount, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 11, stiffness: 200, mass: 0.7 },
  });
  const x = interpolate(s, [0, 1], [140, 0]);
  const op = interpolate(s, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        background: COLORS.white,
        border: `4px solid ${COLORS.brandRed}`,
        borderRadius: 22,
        padding: "26px 38px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: FONT_STACK,
        direction: "rtl",
        width: 820,
        opacity: op,
        transform: `translateX(${x}px) rotate(-1deg)`,
        boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
      }}
    >
      <span style={{ fontSize: 50, fontWeight: 800, color: COLORS.ink }}>
        {day}
      </span>
      <span
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.brandRed,
          fontVariantNumeric: "tabular-nums",
          direction: "ltr",
        }}
      >
        −{amount.toLocaleString("en-US")} ر.س
      </span>
    </div>
  );
};

// ====================================================================
// PHONE FRAME (full)
// ====================================================================
export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  scale?: number;
}> = ({ children, scale = 1 }) => {
  const w = 720 * scale;
  const h = 1480 * scale;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 76 * scale,
        background: "#0E0E10",
        padding: 18 * scale,
        boxShadow:
          "0 60px 120px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.35)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 26 * scale,
          left: "50%",
          transform: "translateX(-50%)",
          width: 220 * scale,
          height: 36 * scale,
          background: "#0E0E10",
          borderRadius: 24 * scale,
          zIndex: 5,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          background: COLORS.white,
          borderRadius: 60 * scale,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const PhoneScreenshot: React.FC<{ src: string }> = ({ src }) => (
  <Img
    src={staticFile(src)}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "top",
    }}
  />
);

// ====================================================================
// TAP PULSE
// ====================================================================
export const TapPulse: React.FC<{
  x: number;
  y: number;
  delay: number;
  color?: string;
}> = ({ x, y, delay, color = COLORS.orangeBright }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const t = Math.max(0, Math.min(1, local / 18));
  const size = interpolate(t, [0, 1], [20, 220]);
  const op = interpolate(t, [0, 0.2, 1], [0, 0.85, 0]);
  if (local < 0 || local > 18) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        border: `8px solid ${color}`,
        opacity: op,
      }}
    />
  );
};

// ====================================================================
// PROMISE PILL ROW — Jahez-style stack of red/orange pills
// ====================================================================
export const PromisePill: React.FC<{
  text: string;
  delay: number;
  bg?: string;
  rotation?: number;
}> = ({ text, delay, bg = COLORS.brandRed, rotation = -3 }) => {
  return (
    <PillBadge delay={delay} bg={bg} size={62} rotation={rotation}>
      {text}
    </PillBadge>
  );
};

// ====================================================================
// PRODUCTION CUE — softbox stand silhouette (subtle studio prop)
// ====================================================================
export const SoftboxStand: React.FC<{ x?: number; y?: number; size?: number; opacity?: number }> = ({
  x = 60,
  y = 700,
  size = 280,
  opacity = 0.18,
}) => (
  <svg
    width={size}
    height={size * 1.4}
    viewBox="0 0 200 280"
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity,
      pointerEvents: "none",
    }}
  >
    <ellipse cx="100" cy="80" rx="80" ry="70" fill="#000" />
    <line x1="100" y1="150" x2="100" y2="250" stroke="#000" strokeWidth="4" />
    <line x1="60" y1="270" x2="140" y2="270" stroke="#000" strokeWidth="4" />
    {Array.from({ length: 6 }).map((_, i) => {
      const a = (i / 6) * Math.PI * 2;
      return (
        <line
          key={i}
          x1="100"
          y1="80"
          x2={100 + Math.cos(a) * 75}
          y2={80 + Math.sin(a) * 65}
          stroke="#fff"
          strokeWidth="1.5"
          opacity="0.5"
        />
      );
    })}
  </svg>
);

// ====================================================================
// FLYING RECEIPT (decorative pain element)
// ====================================================================
export const FlyingReceipt: React.FC<{
  delay: number;
  startX: number;
  startY: number;
  driftX: number;
  driftY: number;
  rotate: number;
}> = ({ delay, startX, startY, driftX, driftY, rotate }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  if (local < 0) return null;
  const t = Math.min(1, local / 50);
  const x = interpolate(t, [0, 1], [0, driftX]);
  const y = interpolate(t, [0, 1], [0, driftY]);
  const r = interpolate(t, [0, 1], [0, rotate]);
  const op = interpolate(t, [0, 0.15, 1], [0, 1, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: startX,
        top: startY,
        width: 130,
        height: 170,
        background: COLORS.white,
        border: `2px solid ${COLORS.line}`,
        transform: `translate(${x}px, ${y}px) rotate(${r}deg)`,
        opacity: op,
        borderRadius: 8,
        boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{ height: 16, background: COLORS.brandRed, margin: "16px 16px 10px" }}
      />
      <div style={{ height: 6, background: COLORS.line, margin: "0 22px 6px" }} />
      <div style={{ height: 6, background: COLORS.line, margin: "0 22px 6px" }} />
      <div style={{ height: 6, background: COLORS.line, margin: "0 30px 6px" }} />
      <div style={{ height: 6, background: COLORS.line, margin: "0 22px 6px" }} />
      <div
        style={{
          height: 14,
          background: COLORS.brandRed,
          margin: "12px 22px 0",
          opacity: 0.7,
        }}
      />
    </div>
  );
};

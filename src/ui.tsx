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

export const Logo: React.FC<{ width?: number }> = ({ width = 520 }) => (
  <Img
    src={staticFile("logo.jpeg")}
    style={{ width, height: "auto", objectFit: "contain" }}
  />
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

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => {
  const frame = useCurrentFrame();
  const cells = Array.from({ length: 60 });
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay" }}>
      {cells.map((_, i) => {
        const x = random(`gx-${i}-${Math.floor(frame / 2)}`) * 100;
        const y = random(`gy-${i}-${Math.floor(frame / 2)}`) * 100;
        const s = random(`gs-${i}`) * 4 + 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: s,
              height: s,
              background: "white",
              opacity,
              borderRadius: "50%",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{ strength?: number }> = ({
  strength = 0.55,
}) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

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

export const FlashOverlay: React.FC<{ at: number; duration?: number }> = ({
  at,
  duration = 12,
}) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  const op = interpolate(local, [0, 3, duration], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ background: "white", opacity: op, pointerEvents: "none" }}
    />
  );
};

export const KineticText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
  size?: number;
  weight?: number;
  align?: "center" | "right" | "left";
  stroke?: string;
}> = ({
  children,
  delay = 0,
  color = COLORS.ink,
  size = 110,
  weight = 900,
  align = "center",
  stroke,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.6 },
  });
  const scale = interpolate(s, [0, 1], [1.25, 1]);
  const opacity = interpolate(s, [0, 0.5], [0, 1], {
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
        lineHeight: 1.1,
        letterSpacing: -2,
        transform: `scale(${scale})`,
        opacity,
        WebkitTextStroke: stroke ? `3px ${stroke}` : undefined,
        padding: "0 60px",
      }}
    >
      {children}
    </div>
  );
};

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
        background: "rgba(127, 29, 29, 0.35)",
        border: `3px solid ${COLORS.red}`,
        borderRadius: 24,
        padding: "28px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: FONT_STACK,
        direction: "rtl",
        width: 820,
        opacity: op,
        transform: `translateX(${x}px)`,
        boxShadow: "0 12px 40px rgba(239,68,68,0.25)",
      }}
    >
      <span style={{ fontSize: 52, fontWeight: 700, color: COLORS.white }}>
        {day}
      </span>
      <span
        style={{
          fontSize: 68,
          fontWeight: 900,
          color: COLORS.red,
          fontVariantNumeric: "tabular-nums",
          direction: "ltr",
        }}
      >
        −{amount.toLocaleString("en-US")} ر.س
      </span>
    </div>
  );
};

export const CommentCard: React.FC<{
  handle: string;
  text: string;
  delay: number;
  accent?: string;
}> = ({ handle, text, delay, accent = COLORS.orange }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 170, mass: 0.7 },
  });
  const y = interpolate(s, [0, 1], [40, 0]);
  const op = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        borderRadius: 26,
        padding: "24px 30px",
        display: "flex",
        gap: 18,
        alignItems: "flex-start",
        fontFamily: FONT_STACK,
        direction: "rtl",
        maxWidth: 820,
        opacity: op,
        transform: `translateY(${y}px)`,
        boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: accent,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 900,
          fontSize: 30,
        }}
      >
        {handle.slice(0, 1).toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontWeight: 800, fontSize: 30, color: COLORS.ink }}>
          {handle}
        </span>
        <span
          style={{
            fontWeight: 500,
            fontSize: 34,
            color: COLORS.inkSoft,
            lineHeight: 1.35,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export const CheckRow: React.FC<{
  text: string;
  delay: number;
  color?: string;
}> = ({ text, delay, color = COLORS.green }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.6 },
  });
  const scale = interpolate(s, [0, 1], [0.6, 1]);
  const op = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        background: "white",
        borderRadius: 22,
        padding: "22px 34px",
        fontFamily: FONT_STACK,
        direction: "rtl",
        boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
        transform: `scale(${scale})`,
        opacity: op,
        width: 820,
      }}
    >
      <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill={color} />
        <path
          d="M18 33L28 43L46 24"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ fontSize: 48, fontWeight: 800, color: COLORS.ink }}>
        {text}
      </span>
    </div>
  );
};

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

export const TapPulse: React.FC<{
  x: number;
  y: number;
  delay: number;
  color?: string;
}> = ({ x, y, delay, color = COLORS.orange }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const t = Math.max(0, Math.min(1, local / 18));
  const size = interpolate(t, [0, 1], [20, 180]);
  const op = interpolate(t, [0, 0.2, 1], [0, 0.7, 0]);
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
        border: `6px solid ${color}`,
        opacity: op,
      }}
    />
  );
};

export const PulseBadge: React.FC<{
  children: React.ReactNode;
  bg?: string;
  color?: string;
}> = ({ children, bg = COLORS.red, color = COLORS.white }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 5) * 0.04;
  return (
    <div
      style={{
        background: bg,
        color,
        fontFamily: FONT_STACK,
        fontWeight: 900,
        fontSize: 46,
        padding: "18px 38px",
        borderRadius: 999,
        direction: "rtl",
        transform: `scale(${pulse})`,
        boxShadow: "0 14px 36px rgba(0,0,0,0.25)",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

export const SparkBurst: React.FC<{ at: number; color?: string }> = ({
  at,
  color = COLORS.orange,
}) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < 0 || local > 28) return null;
  const t = local / 28;
  const rays = 12;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i / rays) * 360;
        const len = interpolate(t, [0, 0.4, 1], [0, 420, 540]);
        const op = interpolate(t, [0, 0.2, 1], [0, 1, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 6,
              height: len,
              background: color,
              transformOrigin: "50% 0%",
              transform: `rotate(${angle}deg) translateY(0)`,
              opacity: op,
              borderRadius: 3,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const CityStrip: React.FC<{ cities: string[]; delay: number }> = ({
  cities,
  delay,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        gap: 28,
        justifyContent: "center",
        flexWrap: "wrap",
        fontFamily: FONT_STACK,
        direction: "rtl",
      }}
    >
      {cities.map((c, i) => {
        const local = frame - delay - i * 6;
        const op = interpolate(local, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(local, [0, 10], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span
            key={c}
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.ink,
              opacity: op,
              transform: `translateY(${y}px)`,
              background: "rgba(255,255,255,0.85)",
              padding: "12px 28px",
              borderRadius: 18,
              boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
            }}
          >
            {c}
          </span>
        );
      })}
    </div>
  );
};

export const MissedCallsChip: React.FC<{ count: number; delay: number }> = ({
  count,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.5 },
  });
  const scale = interpolate(s, [0, 1], [0.4, 1]);
  const op = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        background: COLORS.red,
        color: "white",
        padding: "14px 28px",
        borderRadius: 999,
        fontFamily: FONT_STACK,
        fontWeight: 900,
        fontSize: 38,
        direction: "rtl",
        transform: `scale(${scale})`,
        opacity: op,
        boxShadow: "0 12px 30px rgba(239,68,68,0.5)",
      }}
    >
      {count} مكالمات فايتة
    </div>
  );
};

export const POVTag: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame - delay, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        display: "inline-block",
        background: "rgba(255,255,255,0.12)",
        border: "2px solid rgba(255,255,255,0.3)",
        color: "white",
        fontFamily: FONT_STACK,
        fontWeight: 800,
        fontSize: 32,
        padding: "10px 22px",
        borderRadius: 14,
        direction: "rtl",
        opacity: op,
        letterSpacing: 1,
      }}
    >
      {children}
    </div>
  );
};

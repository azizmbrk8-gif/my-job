import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
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

export const Headline: React.FC<{
  children: React.ReactNode;
  color?: string;
  delay?: number;
  size?: number;
}> = ({ children, color = COLORS.ink, delay = 0, size = 92 }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const opacity = interpolate(local, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(local, [0, 14], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        fontFamily: FONT_STACK,
        fontSize: size,
        fontWeight: 900,
        color,
        lineHeight: 1.25,
        letterSpacing: -1,
        textAlign: "center",
        direction: "rtl",
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: "0 60px",
      }}
    >
      {children}
    </div>
  );
};

export const Caption: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 130,
        display: "flex",
        justifyContent: "center",
        opacity,
        padding: "0 60px",
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.88)",
          color: "white",
          padding: "28px 42px",
          borderRadius: 28,
          fontFamily: FONT_STACK,
          fontSize: 46,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.35,
          maxWidth: "100%",
          direction: "rtl",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const SoftBackground: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 20%, ${COLORS.orangeSoft} 0%, ${COLORS.bg} 55%, #FFFFFF 100%)`,
    }}
  />
);

export const FloatingShapes: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (i: number) => Math.sin((frame / 30 + i) * 0.9) * 18;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[
        { x: 80, y: 220, size: 110, color: COLORS.orangeSoft, i: 0 },
        { x: 880, y: 360, size: 70, color: COLORS.orange, i: 1, op: 0.18 },
        { x: 120, y: 1500, size: 140, color: COLORS.orangeSoft, i: 2 },
        { x: 860, y: 1640, size: 90, color: COLORS.orange, i: 3, op: 0.15 },
      ].map((s) => (
        <div
          key={s.i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y + drift(s.i),
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.color,
            opacity: s.op ?? 1,
          }}
        />
      ))}
    </AbsoluteFill>
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
          "0 60px 120px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.25)",
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

export const SpringIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  from?: number;
  damping?: number;
}> = ({ children, delay = 0, from = 0.6, damping = 14 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping, stiffness: 140, mass: 0.7 },
  });
  const scale = interpolate(s, [0, 1], [from, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  return (
    <div style={{ transform: `scale(${scale})`, opacity }}>{children}</div>
  );
};

export const Notification: React.FC<{
  title: string;
  body: string;
  color: string;
  delay: number;
}> = ({ title, body, color, delay }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const op = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ty = interpolate(local, [0, 10], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        borderRadius: 22,
        padding: "20px 24px",
        boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        opacity: op,
        transform: `translateY(${ty}px)`,
        display: "flex",
        gap: 18,
        alignItems: "center",
        fontFamily: FONT_STACK,
        direction: "rtl",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: color,
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontWeight: 800, fontSize: 28, color: COLORS.ink }}>
          {title}
        </span>
        <span style={{ fontWeight: 500, fontSize: 24, color: COLORS.muted }}>
          {body}
        </span>
      </div>
    </div>
  );
};

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = COLORS.green,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill={color} />
    <path
      d="M18 33L28 43L46 24"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CrossIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = COLORS.red,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill={color} />
    <path
      d="M22 22L42 42M42 22L22 42"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

export const ClockIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = COLORS.amber,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill={color} />
    <path
      d="M32 16V32L42 40"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShieldIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = COLORS.orange,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 4L56 14V32C56 46 44 56 32 60C20 56 8 46 8 32V14L32 4Z"
      fill={color}
    />
    <path
      d="M22 33L29 40L43 26"
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SparkIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = COLORS.orange,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 6L37 26L57 32L37 38L32 58L27 38L7 32L27 26L32 6Z"
      fill={color}
    />
  </svg>
);

export const RocketIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = COLORS.orange,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 4C44 14 50 26 50 38L40 46L24 46L14 38C14 26 20 14 32 4Z"
      fill={color}
    />
    <circle cx="32" cy="26" r="6" fill="white" />
    <path
      d="M14 50L22 42M50 50L42 42"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

export const TruckIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = COLORS.orange,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 64" fill="none">
    <rect x="2" y="14" width="56" height="34" rx="6" fill={color} />
    <path d="M58 22H78L94 38V48H58V22Z" fill={color} opacity="0.85" />
    <rect
      x="64"
      y="26"
      width="16"
      height="12"
      rx="2"
      fill="white"
      opacity="0.8"
    />
    <circle cx="22" cy="52" r="9" fill={COLORS.ink} />
    <circle cx="22" cy="52" r="3.5" fill="white" />
    <circle cx="76" cy="52" r="9" fill={COLORS.ink} />
    <circle cx="76" cy="52" r="3.5" fill="white" />
  </svg>
);

export const HandshakeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 96,
  color = COLORS.orange,
}) => (
  <svg width={size} height={size} viewBox="0 0 96 64" fill="none">
    <path d="M6 28L20 18L34 24L48 32L40 42L28 38L14 44L6 28Z" fill={color} />
    <path d="M90 28L76 18L62 24L48 32L56 42L68 38L82 44L90 28Z" fill={COLORS.ink} />
    <rect x="42" y="28" width="12" height="12" rx="3" fill="white" />
  </svg>
);

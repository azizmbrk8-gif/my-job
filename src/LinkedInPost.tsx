import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_STACK } from "./theme";

const ChainLink: React.FC<{
  color: string;
  rotate: number;
  x: number;
  y: number;
  size: number;
  opacity?: number;
}> = ({ color, rotate, x, y, size, opacity = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size * 0.55,
        transform: `rotate(${rotate}deg)`,
        border: `${size * 0.14}px solid ${color}`,
        borderRadius: size,
        opacity,
      }}
    />
  );
};

export const LinkedInPost: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: FONT_STACK,
        direction: "ltr",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner washes */}
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -220,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242,162,44,0.12) 0%, rgba(242,162,44,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -260,
          left: -260,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(46,56,73,0.05) 0%, rgba(46,56,73,0) 70%)",
        }}
      />

      {/* Decorative chain illustration on the right */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 90,
          width: 440,
          height: 460,
        }}
      >
        <ChainLink color={COLORS.ink} rotate={-22} x={20} y={10} size={200} />
        <ChainLink
          color={COLORS.orange}
          rotate={-22}
          x={130}
          y={110}
          size={200}
        />
        <ChainLink
          color={COLORS.ink}
          rotate={-22}
          x={240}
          y={210}
          size={200}
        />
        {/* "broken" link – faded + offset */}
        <ChainLink
          color={COLORS.ink}
          rotate={4}
          x={360}
          y={330}
          size={130}
          opacity={0.22}
        />
      </div>

      {/* Logo top-left */}
      <div
        style={{
          position: "absolute",
          top: 38,
          left: 56,
        }}
      >
        <Img
          src={staticFile("logo.jpeg")}
          style={{
            height: 64,
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Text block */}
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 168,
          width: 720,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            backgroundColor: "rgba(242,162,44,0.16)",
            color: COLORS.orangeDark,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 1.6,
            borderRadius: 999,
            marginBottom: 22,
            textTransform: "uppercase",
          }}
        >
          Coming soon
        </div>

        <div
          style={{
            fontSize: 60,
            lineHeight: 1.05,
            fontWeight: 900,
            color: COLORS.ink,
            letterSpacing: -1.2,
            marginBottom: 24,
          }}
        >
          Most chains break
          <br />
          at the <span style={{ color: COLORS.orange }}>weakest link.</span>
        </div>

        <div
          style={{
            fontSize: 24,
            lineHeight: 1.35,
            fontWeight: 600,
            color: COLORS.inkSoft,
            width: 600,
          }}
        >
          We're building{" "}
          <span style={{ color: COLORS.ink, fontWeight: 800 }}>ProChain</span>{" "}
          so yours doesn't.
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 36,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            height: 4,
            width: 48,
            backgroundColor: COLORS.orange,
            borderRadius: 4,
          }}
        />
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.muted,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Stay tuned · #ProChain
        </div>
      </div>
    </AbsoluteFill>
  );
};

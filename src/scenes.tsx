import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { COLORS, FONT_STACK, SCENE_DURATIONS } from "./theme";
import {
  BoxIcon,
  Caption,
  ChainMark,
  CheckIcon,
  ClockIcon,
  CrossIcon,
  FloatingShapes,
  HandshakeIcon,
  Headline,
  Logo,
  Notification,
  PhoneFrame,
  RocketIcon,
  ShieldIcon,
  SoftBackground,
  SparkIcon,
  SpringIn,
  StoreIcon,
  TruckIcon,
  WarehouseIcon,
} from "./ui";

const flexColumnCenter: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

// ---------- Scene 1: Hook ----------
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame * 0.9) * 4;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #3A1E12 0%, ${COLORS.bgDark} 70%)`,
      }}
    >
      {/* Kitchen-style ambient tiles */}
      <AbsoluteFill style={{ opacity: 0.25 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i % 4) * 280 + 40,
              top: Math.floor(i / 4) * 640 + 80,
              width: 240,
              height: 560,
              borderRadius: 28,
              background:
                i % 2 === 0
                  ? "rgba(255,107,44,0.15)"
                  : "rgba(255,255,255,0.05)",
              border: "2px solid rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={flexColumnCenter}>
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 0,
            right: 0,
            padding: "0 60px",
          }}
        >
          <Headline color="white">
            Still struggling with{"\n"}unreliable suppliers?
          </Headline>
        </div>

        <div style={{ transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
          <PhoneFrame scale={0.85}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: COLORS.bg,
                padding: "120px 34px 34px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <Sequence from={10} durationInFrames={SCENE_DURATIONS.s1}>
                <Notification
                  title="Delivery delayed"
                  body="Arriving 3h late"
                  color={COLORS.red}
                  delay={0}
                />
              </Sequence>
              <Sequence from={28} durationInFrames={SCENE_DURATIONS.s1}>
                <Notification
                  title="Items missing"
                  body="2 SKUs not in shipment"
                  color={COLORS.amber}
                  delay={0}
                />
              </Sequence>
              <Sequence from={46} durationInFrames={SCENE_DURATIONS.s1}>
                <Notification
                  title="Supplier unreachable"
                  body="No response for 2h"
                  color={COLORS.red}
                  delay={0}
                />
              </Sequence>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <Caption>Running a restaurant — but struggling with unreliable suppliers?</Caption>
    </AbsoluteFill>
  );
};

// ---------- Scene 2: Pain Points ----------
export const Scene2Pain: React.FC = () => {
  const pains: Array<{
    label: string;
    icon: React.ReactNode;
    delay: number;
  }> = [
    { label: "DELAYS", icon: <ClockIcon size={140} />, delay: 0 },
    { label: "MISTAKES", icon: <CrossIcon size={140} />, delay: 14 },
    { label: "NO TRUST", icon: <CrossIcon size={140} color={COLORS.ink} />, delay: 28 },
  ];
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <AbsoluteFill
        style={{
          ...flexColumnCenter,
          justifyContent: "flex-start",
          paddingTop: 220,
        }}
      >
        <Headline>Delays. Mistakes.{"\n"}No trust.</Headline>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            marginTop: 140,
            width: "100%",
            padding: "0 80px",
          }}
        >
          {pains.map((p, i) => (
            <Sequence
              key={i}
              from={p.delay}
              durationInFrames={SCENE_DURATIONS.s2}
            >
              <PainCard label={p.label} icon={p.icon} />
            </Sequence>
          ))}
        </div>
      </AbsoluteFill>
      <Caption>Late deliveries. Inconsistent quality. Zero trust.</Caption>
    </AbsoluteFill>
  );
};

const PainCard: React.FC<{ label: string; icon: React.ReactNode }> = ({
  label,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const tx = interpolate(s, [0, 1], [-600, 0]);
  const op = interpolate(s, [0, 1], [0, 1]);
  return (
    <div
      style={{
        transform: `translateX(${tx}px)`,
        opacity: op,
        background: "white",
        borderRadius: 32,
        padding: "34px 40px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 32,
      }}
    >
      {icon}
      <span
        style={{
          fontFamily: FONT_STACK,
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.ink,
          letterSpacing: -1,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ---------- Scene 3: Intro ----------
export const Scene3Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });
  const scale = interpolate(s, [0, 1], [0.4, 1]);
  const op = interpolate(s, [0, 1], [0, 1]);
  const tagOp = interpolate(frame, [18, 26], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tagTy = interpolate(frame, [18, 28], [30, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <AbsoluteFill style={flexColumnCenter}>
        <div
          style={{
            transform: `scale(${scale})`,
            opacity: op,
          }}
        >
          <Logo size={1.1} />
        </div>
        <div
          style={{
            marginTop: 44,
            opacity: tagOp,
            transform: `translateY(${tagTy}px)`,
            fontFamily: FONT_STACK,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.muted,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          The marketplace for food pros
        </div>
      </AbsoluteFill>
      <Caption>Meet ProChain — the all-in-one marketplace for restaurants and cafés.</Caption>
    </AbsoluteFill>
  );
};

// ---------- Scene 4: Solution Demo ----------
export const Scene4Demo: React.FC = () => {
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Headline>Simple. Fast. Reliable.</Headline>
      </div>

      <AbsoluteFill
        style={{
          ...flexColumnCenter,
          paddingTop: 200,
        }}
      >
        <PhoneFrame scale={0.8}>
          <DemoScreens />
        </PhoneFrame>
      </AbsoluteFill>

      <Caption>Order everything you need from trusted suppliers — fast.</Caption>
    </AbsoluteFill>
  );
};

const DemoScreens: React.FC = () => {
  const frame = useCurrentFrame();
  const stage = frame < 70 ? 0 : frame < 140 ? 1 : frame < 210 ? 2 : 3;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FAFAFA",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "44px 34px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderBottom: `2px solid ${COLORS.line}`,
          background: "white",
        }}
      >
        <ChainMark size={42} />
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 800,
            fontSize: 32,
            color: COLORS.ink,
          }}
        >
          Pro<span style={{ color: COLORS.orange }}>Chain</span>
        </span>
      </div>

      {stage === 0 && <BrowseSuppliers />}
      {stage === 1 && <SelectProducts />}
      {stage === 2 && <OrderConfirm />}
      {stage === 3 && <DeliveryTracking />}
    </div>
  );
};

const BrowseSuppliers: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [0, 70], [0, -160], {
    extrapolateRight: "clamp",
  });
  const suppliers = [
    { name: "Fresh Farms Co.", tag: "Produce • Verified", rating: "4.9" },
    { name: "Costa Roasters", tag: "Coffee • Verified", rating: "4.8" },
    { name: "Blue Sea Fish", tag: "Seafood • Verified", rating: "4.7" },
    { name: "Artisan Bakery", tag: "Bakery • Verified", rating: "4.9" },
    { name: "Dairy Direct", tag: "Dairy • Verified", rating: "4.8" },
  ];
  return (
    <div style={{ padding: "24px 28px", transform: `translateY(${scrollY}px)` }}>
      <div
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 800,
          fontSize: 34,
          color: COLORS.ink,
          marginBottom: 20,
        }}
      >
        Browse suppliers
      </div>
      {suppliers.map((s, i) => (
        <div
          key={i}
          style={{
            background: "white",
            borderRadius: 22,
            padding: "22px 22px",
            marginBottom: 18,
            boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 18,
              background: COLORS.orangeSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BoxIcon size={52} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: FONT_STACK,
                fontWeight: 800,
                fontSize: 28,
                color: COLORS.ink,
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontFamily: FONT_STACK,
                fontWeight: 500,
                fontSize: 22,
                color: COLORS.muted,
              }}
            >
              {s.tag}
            </div>
          </div>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontWeight: 800,
              fontSize: 24,
              color: COLORS.orange,
            }}
          >
            {"★ " + s.rating}
          </div>
        </div>
      ))}
    </div>
  );
};

const SelectProducts: React.FC = () => {
  const frame = useCurrentFrame() - 70;
  const products = [
    { name: "Tomatoes", price: "$2.40/kg" },
    { name: "Olive oil", price: "$14.90/L" },
    { name: "Espresso beans", price: "$28.00/kg" },
    { name: "Flour (00)", price: "$1.80/kg" },
  ];
  return (
    <div style={{ padding: "24px 28px" }}>
      <div
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 800,
          fontSize: 34,
          color: COLORS.ink,
          marginBottom: 20,
        }}
      >
        Fresh Farms Co.
      </div>
      {products.map((p, i) => {
        const added = frame > i * 14 + 6;
        return (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 20,
              padding: "20px 22px",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 18,
              boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
              border: added
                ? `2px solid ${COLORS.orange}`
                : `2px solid transparent`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: COLORS.bg,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: FONT_STACK,
                  fontWeight: 700,
                  fontSize: 26,
                  color: COLORS.ink,
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontFamily: FONT_STACK,
                  fontWeight: 500,
                  fontSize: 22,
                  color: COLORS.muted,
                }}
              >
                {p.price}
              </div>
            </div>
            <div
              style={{
                background: added ? COLORS.orange : COLORS.bg,
                color: added ? "white" : COLORS.ink,
                padding: "10px 18px",
                borderRadius: 999,
                fontFamily: FONT_STACK,
                fontWeight: 800,
                fontSize: 22,
              }}
            >
              {added ? "Added" : "+ Add"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderConfirm: React.FC = () => {
  const frame = useCurrentFrame() - 140;
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10, stiffness: 140 } });
  const scale = interpolate(s, [0, 1], [0.3, 1]);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "0 40px",
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        <CheckIcon size={220} />
      </div>
      <div
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 900,
          fontSize: 46,
          color: COLORS.ink,
        }}
      >
        Order confirmed
      </div>
      <div
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 500,
          fontSize: 26,
          color: COLORS.muted,
          textAlign: "center",
        }}
      >
        4 items • Delivery tomorrow
      </div>
    </div>
  );
};

const DeliveryTracking: React.FC = () => {
  const frame = useCurrentFrame() - 210;
  const progress = interpolate(frame, [0, 70], [0.1, 0.9], {
    extrapolateRight: "clamp",
  });
  const pathW = 560;
  const pathH = 420;
  return (
    <div
      style={{
        height: "100%",
        padding: "20px 28px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 800,
          fontSize: 34,
          color: COLORS.ink,
          marginBottom: 18,
        }}
      >
        Live tracking
      </div>
      <div
        style={{
          flex: 1,
          background: COLORS.bg,
          borderRadius: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          width={pathW}
          height={pathH}
          viewBox={`0 0 ${pathW} ${pathH}`}
          style={{ position: "absolute", inset: 0, margin: "auto" }}
        >
          <path
            d={`M 40 ${pathH - 40} Q ${pathW / 2} 20 ${pathW - 40} ${pathH - 40}`}
            stroke={COLORS.orangeSoft}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M 40 ${pathH - 40} Q ${pathW / 2} 20 ${pathW - 40} ${pathH - 40}`}
            stroke={COLORS.orange}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={1000 * (1 - progress)}
          />
          <circle cx="40" cy={pathH - 40} r="14" fill={COLORS.ink} />
          <circle cx={pathW - 40} cy={pathH - 40} r="14" fill={COLORS.green} />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 40 + (pathW - 80) * progress - 40,
            top:
              pathH -
              40 -
              Math.sin(progress * Math.PI) * (pathH - 100) -
              32,
          }}
        >
          <TruckIcon size={80} />
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT_STACK,
          fontWeight: 700,
          fontSize: 26,
          color: COLORS.orange,
          marginTop: 18,
          textAlign: "center",
        }}
      >
        Arriving in 12 min
      </div>
    </div>
  );
};

// ---------- Scene 5: Benefits ----------
export const Scene5Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldIcon size={110} />,
      title: "Verified suppliers",
      body: "Every partner vetted for quality & reliability",
    },
    {
      icon: <SparkIcon size={110} />,
      title: "Easy-to-use platform",
      body: "Order in minutes — not hours",
    },
    {
      icon: <RocketIcon size={110} />,
      title: "Faster operations",
      body: "More efficiency, more sales",
    },
  ];
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Headline>Built for your success</Headline>
      </div>
      <AbsoluteFill
        style={{
          ...flexColumnCenter,
          paddingTop: 160,
          gap: 36,
        }}
      >
        {benefits.map((b, i) => (
          <Sequence
            key={i}
            from={20 + i * 24}
            durationInFrames={SCENE_DURATIONS.s5}
          >
            <BenefitRow icon={b.icon} title={b.title} body={b.body} />
          </Sequence>
        ))}
      </AbsoluteFill>
      <Caption>Trusted suppliers. Easy platform. Faster growth.</Caption>
    </AbsoluteFill>
  );
};

const BenefitRow: React.FC<{
  icon: React.ReactNode;
  title: string;
  body: string;
}> = ({ icon, title, body }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });
  const ty = interpolate(s, [0, 1], [60, 0]);
  const op = interpolate(s, [0, 1], [0, 1]);
  return (
    <div
      style={{
        width: 900,
        background: "white",
        borderRadius: 32,
        padding: "34px 40px",
        display: "flex",
        alignItems: "center",
        gap: 32,
        boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
        transform: `translateY(${ty}px)`,
        opacity: op,
      }}
    >
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 28,
          background: COLORS.orangeSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 900,
            fontSize: 48,
            color: COLORS.ink,
            letterSpacing: -1,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 500,
            fontSize: 28,
            color: COLORS.muted,
          }}
        >
          {body}
        </span>
      </div>
    </div>
  );
};

// ---------- Scene 6: Full Service ----------
export const Scene6FullService: React.FC = () => {
  const frame = useCurrentFrame();
  const truckX = interpolate(frame, [20, 120], [-80, 900], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stages = [
    { icon: <WarehouseIcon size={180} />, label: "Sourcing" },
    { icon: <BoxIcon size={180} />, label: "Storage" },
    { icon: <StoreIcon size={180} />, label: "Delivery" },
  ];
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Headline>One platform.{"\n"}End-to-end.</Headline>
      </div>

      <AbsoluteFill
        style={{
          ...flexColumnCenter,
          paddingTop: 340,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            alignItems: "center",
            width: "100%",
          }}
        >
          {stages.map((st, i) => (
            <Sequence
              key={i}
              from={i * 18}
              durationInFrames={SCENE_DURATIONS.s6}
            >
              <SpringIn from={0.7} damping={14}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 40,
                    background: "white",
                    padding: "28px 44px",
                    borderRadius: 32,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                    width: 760,
                  }}
                >
                  <div
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: 28,
                      background: COLORS.orangeSoft,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {st.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: FONT_STACK,
                      fontSize: 80,
                      fontWeight: 900,
                      color: COLORS.ink,
                      letterSpacing: -1,
                    }}
                  >
                    {st.label}
                  </span>
                </div>
              </SpringIn>
            </Sequence>
          ))}
        </div>

        {/* Moving truck along the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 300,
            left: truckX,
          }}
        >
          <TruckIcon size={160} />
        </div>
      </AbsoluteFill>

      <Caption>From sourcing to storage to delivery — ProChain handles it all.</Caption>
    </AbsoluteFill>
  );
};

// ---------- Scene 7: Win-Win ----------
export const Scene7WinWin: React.FC = () => {
  const frame = useCurrentFrame();
  const leftX = interpolate(frame, [0, 20], [-300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightX = interpolate(frame, [0, 20], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin(frame * 0.35) * 0.04;
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Headline>Grow together</Headline>
      </div>
      <AbsoluteFill style={flexColumnCenter}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 100,
          }}
        >
          <div style={{ transform: `translateX(${leftX}px)` }}>
            <PersonaCard
              icon={<StoreIcon size={140} />}
              label="Buyers"
              sub="More efficiency"
              accent={COLORS.orange}
            />
          </div>
          <div style={{ transform: `scale(${pulse})` }}>
            <HandshakeIcon size={200} />
          </div>
          <div style={{ transform: `translateX(${rightX}px)` }}>
            <PersonaCard
              icon={<WarehouseIcon size={140} />}
              label="Suppliers"
              sub="More sales"
              accent={COLORS.ink}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Caption>More efficiency for buyers. More sales for suppliers.</Caption>
    </AbsoluteFill>
  );
};

const PersonaCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub: string;
  accent: string;
}> = ({ icon, label, sub, accent }) => (
  <div
    style={{
      background: "white",
      borderRadius: 32,
      padding: "36px 30px",
      boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 18,
      width: 340,
    }}
  >
    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: 28,
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontFamily: FONT_STACK,
        fontSize: 44,
        fontWeight: 900,
        color: accent,
        letterSpacing: -1,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: FONT_STACK,
        fontSize: 26,
        fontWeight: 600,
        color: COLORS.muted,
        textAlign: "center",
      }}
    >
      {sub}
    </span>
  </div>
);

// ---------- Scene 8: CTA ----------
export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.3) * 0.03;
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <AbsoluteFill style={{ ...flexColumnCenter, gap: 60 }}>
        <SpringIn from={0.5} damping={12}>
          <Logo size={1.1} />
        </SpringIn>

        <Sequence from={14} durationInFrames={SCENE_DURATIONS.s8}>
          <SpringIn from={0.7} damping={14}>
            <div
              style={{
                transform: `scale(${pulse})`,
                background: COLORS.orange,
                color: "white",
                padding: "34px 72px",
                borderRadius: 999,
                fontFamily: FONT_STACK,
                fontWeight: 900,
                fontSize: 56,
                letterSpacing: -1,
                boxShadow: "0 24px 60px rgba(255,107,44,0.4)",
              }}
            >
              Join ProChain Today
            </div>
          </SpringIn>
        </Sequence>

        <Sequence from={24} durationInFrames={SCENE_DURATIONS.s8}>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.ink,
              opacity: 0.8,
            }}
          >
            Link in bio
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

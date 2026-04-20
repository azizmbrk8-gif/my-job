import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_STACK } from "./theme";
import {
  BrushSwoosh,
  CountingNumber,
  FloatingPhoneMockup,
  FlashOverlay,
  FlyingReceipt,
  Logo,
  MiniSwoosh,
  PillBadge,
  PromisePill,
  RiyalDamageCard,
  Shake,
  SlamHeadline,
  SoftboxGlow,
  SoftboxStand,
  StudioBackground,
} from "./ui";

// ====================================================================
// SCENE 1 — HOOK (3s = 90f)
// "نواقصك في مطعمك… نار 🔥"
// ====================================================================
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <StudioBackground />
      <SoftboxGlow x={120} y={200} size={900} opacity={0.6} />
      <SoftboxStand x={60} y={1500} size={220} opacity={0.12} />

      {/* Brush swoosh sweeping behind text */}
      <div style={{ position: "absolute", left: -60, top: 200 }}>
        <BrushSwoosh
          delay={2}
          width={900}
          height={1600}
          color={COLORS.orangeBright}
          variant={1}
          rotation={-8}
        />
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "0 40px",
        }}
      >
        <SlamHeadline delay={6} size={170} color={COLORS.ink} weight={900}>
          نواقصك
        </SlamHeadline>
        <Shake at={20} intensity={14} duration={12}>
          <SlamHeadline delay={20} size={170} color={COLORS.brandRed} weight={900}>
            في مطعمك…
          </SlamHeadline>
        </Shake>
        <Shake at={42} intensity={22} duration={16}>
          <div style={{ position: "relative" }}>
            <SlamHeadline delay={42} size={250} color={COLORS.orangeBright} weight={900}>
              نار 🔥
            </SlamHeadline>
            <div style={{ position: "absolute", left: 80, bottom: -30 }}>
              <MiniSwoosh delay={60} width={420} color={COLORS.orangeBright} rotation={-5} />
            </div>
          </div>
        </Shake>
      </AbsoluteFill>

      {/* Subtle vignette for cinematic feel */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,${interpolate(
            frame,
            [0, 30],
            [0, 0.25],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}) 100%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 2 — PAIN (7s = 210f)
// "الموردين يخذلونك؟" + 3 SAR damage cards + total
// ====================================================================
export const Scene2Pain: React.FC = () => {
  return (
    <AbsoluteFill>
      <StudioBackground dark />
      <SoftboxGlow x={140} y={120} size={700} opacity={0.25} />

      {/* Background brush swoosh in red */}
      <div style={{ position: "absolute", right: -80, top: 100 }}>
        <BrushSwoosh
          delay={4}
          width={700}
          height={1400}
          color={COLORS.brandRedDeep}
          variant={2}
          rotation={6}
        />
      </div>

      {/* Flying receipts in background */}
      {Array.from({ length: 6 }).map((_, i) => (
        <FlyingReceipt
          key={i}
          delay={10 + i * 3}
          startX={random(`fx${i}`) * 900 + 50}
          startY={random(`fy${i}`) * 1700 + 100}
          driftX={(random(`fdx${i}`) - 0.5) * 120}
          driftY={-150 - random(`fdy${i}`) * 200}
          rotate={(random(`frr${i}`) - 0.5) * 60}
        />
      ))}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "150px 0 0",
          gap: 28,
        }}
      >
        <SlamHeadline delay={0} size={110} color={COLORS.white} weight={900}>
          الموردين يخذلونك؟
        </SlamHeadline>

        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 22 }}>
          <Shake at={22} intensity={14} duration={10}>
            <RiyalDamageCard day="الجمعة" amount={2400} delay={22} />
          </Shake>
          <Shake at={52} intensity={14} duration={10}>
            <RiyalDamageCard day="السبت" amount={1800} delay={52} />
          </Shake>
          <Shake at={82} intensity={14} duration={10}>
            <RiyalDamageCard day="الأحد" amount={3200} delay={82} />
          </Shake>
        </div>

        <div style={{ marginTop: 40, textAlign: "center", direction: "rtl" }}>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: 44,
              fontWeight: 700,
              color: COLORS.line,
              marginBottom: 6,
            }}
          >
            خسرت في ٣ أيام
          </div>
          <Shake at={120} intensity={20} duration={14}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: 18,
              }}
            >
              <CountingNumber
                to={7400}
                delay={120}
                duration={32}
                color={COLORS.brandRed}
                size={180}
                prefix="−"
              />
              <span
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: 70,
                  fontWeight: 900,
                  color: COLORS.brandRed,
                }}
              >
                ر.س
              </span>
            </div>
          </Shake>
        </div>

        <div style={{ marginTop: 30 }}>
          <PillBadge delay={170} bg={COLORS.brandRed} size={56} rotation={-4}>
            كل أسبوع نفس القصة 💔
          </PillBadge>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 3 — BRAND REVEAL (5s = 150f)
// Big orange sweep transition → ProChain logo slam
// ====================================================================
export const Scene3Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Big orange sweep wipe across the frame in first 18 frames
  const wipeT = Math.min(1, frame / 18);
  const wipeX = interpolate(wipeT, [0, 1], [-1300, 1300]);

  const logoSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 11, stiffness: 160, mass: 0.7 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.4, 1]);
  const logoOp = interpolate(logoSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <StudioBackground />
      <SoftboxGlow x={300} y={300} size={800} opacity={0.55} />

      {/* Sweeping orange wipe at the start */}
      <div
        style={{
          position: "absolute",
          left: wipeX,
          top: -100,
          width: 1300,
          height: 2200,
          background: `linear-gradient(135deg, ${COLORS.orangeBright} 0%, ${COLORS.orangeDark} 100%)`,
          transform: "skewX(-12deg)",
          opacity: frame < 30 ? 1 : 0,
        }}
      />

      <FlashOverlay at={22} duration={14} color="#FFFFFF" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOp,
            position: "relative",
          }}
        >
          <Logo width={620} />
          <div style={{ position: "absolute", left: -40, bottom: -40 }}>
            <MiniSwoosh
              delay={50}
              width={700}
              color={COLORS.orangeBright}
              rotation={-3}
            />
          </div>
        </div>

        <div style={{ marginTop: 100 }}>
          <SlamHeadline delay={70} size={88} color={COLORS.ink} weight={800}>
            خيار مطعمك المضمون
          </SlamHeadline>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 4 — DEMO (12s = 360f)
// Floating phone mockup + slam words on the side
// ====================================================================
const SHOTS = [
  "buyer_home.png",
  "buyer_products.png",
  "buyer_orders.png",
  "buyer_notifications.png",
];
const WORDS = ["ابحث", "اطلب", "تابع", "استلم"];

export const Scene4Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const perShot = 80;
  const idx = Math.min(SHOTS.length - 1, Math.floor(frame / perShot));
  const localInShot = frame - idx * perShot;

  return (
    <AbsoluteFill>
      <StudioBackground />
      <SoftboxGlow x={500} y={150} size={900} opacity={0.55} />

      {/* Decorative orange swoosh behind everything */}
      <div style={{ position: "absolute", left: -100, top: 400 }}>
        <BrushSwoosh
          delay={0}
          width={750}
          height={1300}
          color={COLORS.orangeBright}
          variant={3}
          rotation={-12}
        />
      </div>

      {/* Floating phone — re-mount each shot for re-entry animation */}
      <AbsoluteFill key={`phone-${idx}`} style={{ pointerEvents: "none" }}>
        <FloatingPhoneMockup
          src={SHOTS[idx]}
          delay={6}
          scale={0.95}
          x={520}
          y={420}
        />
      </AbsoluteFill>

      {/* Slam word on the left side, changes per shot */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 80,
        }}
      >
        <Shake key={`word-${idx}`} at={idx * perShot} intensity={12} duration={10}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: FONT_STACK,
                fontWeight: 900,
                fontSize: 200,
                color: COLORS.ink,
                direction: "rtl",
                letterSpacing: -4,
                opacity: interpolate(
                  localInShot,
                  [0, 10, perShot - 10, perShot],
                  [0, 1, 1, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                transform: `translateY(${interpolate(
                  localInShot,
                  [0, 12],
                  [40, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
              }}
            >
              {WORDS[idx]}
            </div>
            <div style={{ position: "absolute", left: -10, bottom: -10 }}>
              <MiniSwoosh
                delay={idx * perShot + 14}
                width={360}
                color={COLORS.orangeBright}
                rotation={-4}
              />
            </div>
          </div>
        </Shake>
      </AbsoluteFill>

      {/* Top header */}
      <AbsoluteFill style={{ padding: "100px 0 0", display: "flex", justifyContent: "center" }}>
        <PillBadge delay={2} bg={COLORS.brandRed} size={48} rotation={-2}>
          بضغطة وحدة في التطبيق
        </PillBadge>
      </AbsoluteFill>

      {/* Bottom callout */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 130,
        }}
      >
        <div
          style={{
            fontFamily: FONT_STACK,
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.ink,
            background: COLORS.white,
            padding: "22px 42px",
            borderRadius: 26,
            direction: "rtl",
            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
            opacity: interpolate(frame, [280, 300], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [280, 300], [40, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
            border: `4px solid ${COLORS.orangeBright}`,
          }}
        >
          ٢ دقيقة وطلبيتك في الطريق ⚡
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 5 — PROMISE PILLS (10s = 300f)
// Stack of red/orange pills cascading in
// ====================================================================
const PROMISES: { text: string; bg: string; rot: number }[] = [
  { text: "خيارك المضمون ✓", bg: COLORS.brandRed, rot: -4 },
  { text: "أسعار جملة 💰", bg: COLORS.orangeBright, rot: 3 },
  { text: "+500 مطعم سعودي", bg: COLORS.ink, rot: -2 },
  { text: "توصيل في الوقت ⏱️", bg: COLORS.brandRed, rot: 2 },
  { text: "جودة مضمونة 👌", bg: COLORS.orangeDark, rot: -3 },
];

export const Scene5Pills: React.FC = () => {
  return (
    <AbsoluteFill>
      <StudioBackground />
      <SoftboxGlow x={200} y={150} size={800} opacity={0.55} />

      {/* Background swoosh */}
      <div style={{ position: "absolute", right: -100, top: 100 }}>
        <BrushSwoosh
          delay={4}
          width={700}
          height={1500}
          color={COLORS.orangeBright}
          variant={1}
          rotation={10}
        />
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "180px 0 0",
          gap: 36,
        }}
      >
        <SlamHeadline delay={0} size={92} color={COLORS.ink} weight={900}>
          كل اللي تحتاجه
        </SlamHeadline>
        <div style={{ marginTop: -10, position: "relative" }}>
          <SlamHeadline delay={18} size={120} color={COLORS.brandRed} weight={900}>
            في مكان واحد
          </SlamHeadline>
          <div style={{ position: "absolute", left: 100, bottom: -25 }}>
            <MiniSwoosh delay={36} width={520} color={COLORS.orangeBright} rotation={-3} />
          </div>
        </div>

        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          {PROMISES.map((p, i) => (
            <PromisePill
              key={i}
              text={p.text}
              delay={70 + i * 20}
              bg={p.bg}
              rotation={p.rot}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 6 — END FRAME (8s = 240f)
// Bold red full-bleed, big logo, tagline, swoosh — Jahez end-frame style
// ====================================================================
export const Scene6End: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgT = Math.min(1, frame / 14);
  const bgScale = interpolate(bgT, [0, 1], [1.15, 1]);

  const logoSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.7 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOp = interpolate(logoSpring, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Bold brand background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${COLORS.brandRed} 0%, ${COLORS.brandRedDeep} 100%)`,
          transform: `scale(${bgScale})`,
        }}
      />

      <FlashOverlay at={0} duration={10} color="#FFFFFF" />

      {/* Big signature swoosh on the right side (Jahez signature) */}
      <div style={{ position: "absolute", right: -120, top: 100 }}>
        <BrushSwoosh
          delay={6}
          width={750}
          height={1700}
          color={COLORS.orangeBright}
          variant={2}
          rotation={6}
        />
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: "0 40px",
        }}
      >
        {/* White logo card */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOp,
            background: COLORS.white,
            borderRadius: 36,
            padding: "40px 60px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          }}
        >
          <Logo width={520} />
        </div>

        <div style={{ marginTop: 10 }}>
          <SlamHeadline delay={50} size={86} color={COLORS.white} weight={900} shadow>
            منصتك المضمونة للتوريد
          </SlamHeadline>
        </div>

        <div style={{ marginTop: 30, opacity: frame > 80 ? 1 : 0 }}>
          <PillBadge delay={80} bg={COLORS.white} color={COLORS.brandRed} size={62} rotation={-3}>
            ⏰ العرض ينتهي الجمعة
          </PillBadge>
        </div>

        <div
          style={{
            marginTop: 50,
            opacity: interpolate(frame, [120, 145], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [120, 145], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
            textAlign: "center",
            fontFamily: FONT_STACK,
            direction: "rtl",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: COLORS.white,
              letterSpacing: -2,
            }}
          >
            حمّل الحين 👇
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 50,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            الرابط في البايو
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

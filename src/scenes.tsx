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
  CheckRow,
  CityStrip,
  CommentCard,
  CountingNumber,
  FlashOverlay,
  Grain,
  KineticText,
  Logo,
  MissedCallsChip,
  PainBackground,
  PhoneFrame,
  PhoneScreenshot,
  POVTag,
  PulseBadge,
  RiyalDamageCard,
  Shake,
  SolutionBackground,
  SparkBurst,
  TapPulse,
  Vignette,
} from "./ui";

// ====================================================================
// SCENE 1 — HOOK (3s)
// "يا معلّم... موردك ما ردّ من الصبح، صح؟"
// ====================================================================
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const buzz = Math.sin(frame / 2) * (frame < 30 ? 0 : 14);
  return (
    <AbsoluteFill>
      <PainBackground />
      <Grain opacity={0.1} />
      <Vignette strength={0.7} />
      <AbsoluteFill style={{ padding: "120px 60px 60px" }}>
        <POVTag delay={4}>POV: الساعة ٧ الصبح</POVTag>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <Shake at={0} intensity={28} duration={14}>
          <div
            style={{
              transform: `translate(${buzz}px, ${buzz * 0.4}px) rotate(${
                buzz * 0.25
              }deg)`,
              fontSize: 260,
              lineHeight: 1,
            }}
          >
            📞
          </div>
        </Shake>

        <KineticText delay={8} size={140} color={COLORS.white}>
          يا معلّم...
        </KineticText>
        <KineticText
          delay={32}
          size={96}
          color={COLORS.white}
          weight={800}
        >
          موردك ما ردّ من الصبح، صح؟
        </KineticText>
        <div style={{ marginTop: 20 }}>
          <MissedCallsChip count={7} delay={56} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 2 — PAIN IN RIYAL (7s = 210f)
// "شوف كم خسرت..." + 3 cards + big total
// ====================================================================
export const Scene2Pain: React.FC = () => {
  return (
    <AbsoluteFill>
      <PainBackground />
      <Grain opacity={0.1} />
      <Vignette strength={0.6} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "180px 0 60px",
          gap: 28,
        }}
      >
        <KineticText delay={0} size={88} color={COLORS.white}>
          شوف كم خسرت...
        </KineticText>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 22 }}>
          <Shake at={18} intensity={16} duration={10}>
            <RiyalDamageCard day="الجمعة" amount={2400} delay={18} />
          </Shake>
          <Shake at={48} intensity={16} duration={10}>
            <RiyalDamageCard day="السبت" amount={1800} delay={48} />
          </Shake>
          <Shake at={78} intensity={16} duration={10}>
            <RiyalDamageCard day="الأحد" amount={3200} delay={78} />
          </Shake>
        </div>

        <div style={{ marginTop: 40, textAlign: "center", direction: "rtl" }}>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: 46,
              fontWeight: 700,
              color: COLORS.muted,
              marginBottom: 6,
            }}
          >
            المجموع في ٣ أيام
          </div>
          <Shake at={118} intensity={22} duration={14}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 18 }}>
              <CountingNumber
                to={7400}
                delay={118}
                duration={32}
                color={COLORS.red}
                size={180}
                prefix="−"
              />
              <span
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: 70,
                  fontWeight: 900,
                  color: COLORS.red,
                }}
              >
                ر.س
              </span>
            </div>
          </Shake>
        </div>

        <div style={{ marginTop: 20 }}>
          <CommentCard
            handle="abu_saleh_resto"
            text="والله صار لي نفس الشي 💔"
            delay={160}
            accent={COLORS.red}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 3 — SOCIAL PROOF + DISCOVERY (8s = 240f)
// "...لكن أكثر من 500 مطعم اكتشفوا بروتشين"
// ====================================================================
export const Scene3Discovery: React.FC = () => {
  const frame = useCurrentFrame();
  // Transition dark → light around frame 60
  const light = interpolate(frame, [45, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <PainBackground />
      <AbsoluteFill style={{ opacity: light }}>
        <SolutionBackground />
      </AbsoluteFill>
      <Grain opacity={0.07 * (1 - light * 0.7)} />
      <Vignette strength={0.6 * (1 - light)} />
      <FlashOverlay at={60} duration={20} />
      <SparkBurst at={62} color={COLORS.orange} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {frame < 70 ? (
          <>
            <KineticText delay={0} size={120} color={COLORS.white}>
              ...لكن
            </KineticText>
            <KineticText delay={22} size={90} color={COLORS.orangeSoft}>
              الحل كان أقرب مما تتوقع
            </KineticText>
          </>
        ) : (
          <>
            <KineticText delay={70} size={92} color={COLORS.ink} weight={700}>
              أكثر من
            </KineticText>
            <div style={{ marginTop: -20 }}>
              <Shake at={80} intensity={18} duration={14}>
                <CountingNumber
                  to={500}
                  from={0}
                  delay={80}
                  duration={28}
                  color={COLORS.orange}
                  size={260}
                  suffix="+"
                />
              </Shake>
            </div>
            <KineticText delay={100} size={82} color={COLORS.ink} weight={800}>
              مطعم سعودي
            </KineticText>
            <div style={{ marginTop: 20 }}>
              <CityStrip
                cities={["الرياض", "جدة", "الدمام", "الخبر"]}
                delay={130}
              />
            </div>
            <div style={{ marginTop: 40 }}>
              <KineticText delay={180} size={74} color={COLORS.orangeDark}>
                اكتشفوا بروتشين
              </KineticText>
            </div>
          </>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 4 — DEMO (10s = 300f)
// Phone with screenshots, tap pulses, "ابحث → اطلب → تابع"
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
  const perShot = 60; // 2 seconds per screenshot
  const idx = Math.min(SHOTS.length - 1, Math.floor(frame / perShot));
  const localInShot = frame - idx * perShot;
  return (
    <AbsoluteFill>
      <SolutionBackground />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "120px 0 0",
        }}
      >
        <KineticText delay={0} size={78} color={COLORS.ink} weight={900}>
          بضغطة وحدة.
        </KineticText>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 120,
        }}
      >
        <div style={{ position: "relative" }}>
          <PhoneFrame scale={0.82}>
            <PhoneScreenshot src={SHOTS[idx]} />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                pointerEvents: "none",
              }}
            >
              <TapPulse
                x={300}
                y={800}
                delay={idx * perShot + 14}
                color={COLORS.orange}
              />
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 220,
          gap: 20,
        }}
      >
        <Shake at={idx * perShot} intensity={10} duration={10}>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontWeight: 900,
              fontSize: 120,
              color: COLORS.orangeDark,
              direction: "rtl",
              opacity: interpolate(
                localInShot,
                [0, 8, perShot - 8, perShot],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              letterSpacing: -3,
            }}
          >
            {WORDS[idx]}
          </div>
        </Shake>

        <div
          style={{
            fontFamily: FONT_STACK,
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.ink,
            background: COLORS.white,
            padding: "20px 40px",
            borderRadius: 24,
            direction: "rtl",
            boxShadow: "0 14px 36px rgba(0,0,0,0.12)",
            opacity: frame > 220 ? 1 : 0,
            transform: `translateY(${frame > 220 ? 0 : 30}px)`,
          }}
        >
          ٢ دقيقة وطلبيتك في الطريق ⚡
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 5 — CLIMAX (10s = 300f)
// "الحين أنام مرتاح." + checks + comment
// ====================================================================
export const Scene5Climax: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${COLORS.orangeSoft} 0%, ${COLORS.bg} 50%, ${COLORS.white} 100%)`,
        }}
      />
      {/* Flying receipts in first 40 frames */}
      {Array.from({ length: 7 }).map((_, i) => {
        const delay = i * 4;
        const local = frame - delay;
        if (local < 0 || local > 50) return null;
        const t = local / 50;
        const x = interpolate(t, [0, 1], [0, (random(`rx${i}`) - 0.5) * 1600]);
        const y = interpolate(t, [0, 1], [0, -1400]);
        const rot = interpolate(t, [0, 1], [0, (random(`rr${i}`) - 0.5) * 120]);
        const op = interpolate(t, [0, 0.2, 1], [0.9, 0.9, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 380 + i * 40,
              top: 1200,
              width: 140,
              height: 180,
              background: "white",
              border: `2px solid ${COLORS.line}`,
              transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
              opacity: op,
              borderRadius: 10,
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                height: 18,
                background: COLORS.line,
                margin: "18px 16px 10px",
              }}
            />
            <div style={{ height: 8, background: COLORS.line, margin: "0 24px 8px" }} />
            <div style={{ height: 8, background: COLORS.line, margin: "0 24px 8px" }} />
            <div style={{ height: 8, background: COLORS.line, margin: "0 36px 8px" }} />
          </div>
        );
      })}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          padding: "0 40px",
        }}
      >
        <KineticText delay={40} size={180} color={COLORS.ink} weight={900}>
          الحين
        </KineticText>
        <div style={{ marginTop: -40 }}>
          <KineticText delay={60} size={180} color={COLORS.orangeDark} weight={900}>
            أنام مرتاح.
          </KineticText>
        </div>

        <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 20 }}>
          <CheckRow text="وصل في الوقت" delay={120} />
          <CheckRow text="جودة ثابتة" delay={150} />
          <CheckRow text="وفّر 30% من التكلفة" delay={180} color={COLORS.orange} />
        </div>

        <div style={{ marginTop: 30 }}>
          <CommentCard
            handle="cafe_alhara"
            text="انضممت الشهر اللي فات، الفرق هايل 🔥"
            delay={230}
            accent={COLORS.green}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ====================================================================
// SCENE 6 — CTA WITH SCARCITY (7s = 210f)
// "أول 100 مطعم → شهر مجاني"
// ====================================================================
export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const finalSpring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.8 },
  });
  const finalScale = interpolate(finalSpring, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill>
      <SolutionBackground />
      <SparkBurst at={0} color={COLORS.orange} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        <div style={{ opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }) }}>
          <Logo width={440} />
        </div>

        <div style={{ marginTop: 10 }}>
          <KineticText delay={15} size={76} color={COLORS.ink} weight={800}>
            أول ١٠٠ مطعم
          </KineticText>
        </div>

        <Shake at={35} intensity={18} duration={14}>
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.orange} 0%, ${COLORS.orangeDark} 100%)`,
              color: "white",
              fontFamily: FONT_STACK,
              fontWeight: 900,
              fontSize: 150,
              padding: "30px 70px",
              borderRadius: 40,
              direction: "rtl",
              letterSpacing: -3,
              boxShadow: "0 30px 60px rgba(232,134,26,0.45)",
              transform: `scale(${interpolate(
                spring({
                  frame: frame - 35,
                  fps,
                  config: { damping: 10, stiffness: 200, mass: 0.7 },
                }),
                [0, 1],
                [0.5, 1]
              )})`,
            }}
          >
            شهر مجاني
          </div>
        </Shake>

        <div style={{ marginTop: 20, opacity: frame > 75 ? 1 : 0 }}>
          <PulseBadge bg={COLORS.red}>⏰ العرض ينتهي الجمعة</PulseBadge>
        </div>

        <div
          style={{
            marginTop: 40,
            transform: `scale(${finalScale})`,
            opacity: interpolate(frame, [140, 160], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: FONT_STACK,
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.ink,
            direction: "rtl",
            textAlign: "center",
          }}
        >
          حمّل التطبيق الحين 👇
          <div
            style={{
              marginTop: 14,
              fontSize: 44,
              color: COLORS.muted,
              fontWeight: 700,
            }}
          >
            الرابط في البايو
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};


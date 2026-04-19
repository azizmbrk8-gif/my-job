import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_STACK, SCENE_DURATIONS } from "./theme";
import {
  Caption,
  ClockIcon,
  CrossIcon,
  FloatingShapes,
  HandshakeIcon,
  Headline,
  Logo,
  Notification,
  PhoneFrame,
  PhoneScreenshot,
  RocketIcon,
  ShieldIcon,
  SoftBackground,
  SparkIcon,
  SpringIn,
  TruckIcon,
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
                  ? "rgba(242,162,44,0.15)"
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
          <Headline color="white" size={96}>
            تعبت من التوريد؟
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
                  title="تأخر التوصيل"
                  body="الشحنة متأخرة 3 ساعات"
                  color={COLORS.red}
                  delay={0}
                />
              </Sequence>
              <Sequence from={28} durationInFrames={SCENE_DURATIONS.s1}>
                <Notification
                  title="نواقص في الطلب"
                  body="منتجان لم يصلا"
                  color={COLORS.amber}
                  delay={0}
                />
              </Sequence>
              <Sequence from={46} durationInFrames={SCENE_DURATIONS.s1}>
                <Notification
                  title="المورد لا يرد"
                  body="بدون تواصل منذ ساعتين"
                  color={COLORS.red}
                  delay={0}
                />
              </Sequence>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <Caption>يا صاحب المطعم… موردينك يتعبونك؟</Caption>
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
    { label: "تأخير في التوصيل", icon: <ClockIcon size={120} />, delay: 0 },
    { label: "طلبيات ناقصة", icon: <CrossIcon size={120} />, delay: 14 },
    {
      label: "جودة غير ثابتة",
      icon: <CrossIcon size={120} color={COLORS.ink} />,
      delay: 28,
    },
  ];
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <AbsoluteFill
        style={{
          ...flexColumnCenter,
          justifyContent: "flex-start",
          paddingTop: 200,
        }}
      >
        <Headline>تأخير. نواقص. وقت ضايع.</Headline>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
            marginTop: 120,
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
      <Caption>تعبك مفهوم… بس في حل أسهل بكثير</Caption>
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
  const tx = interpolate(s, [0, 1], [600, 0]);
  const op = interpolate(s, [0, 1], [0, 1]);
  return (
    <div
      style={{
        transform: `translateX(${tx}px)`,
        opacity: op,
        background: "white",
        borderRadius: 32,
        padding: "30px 40px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 28,
        direction: "rtl",
      }}
    >
      {icon}
      <span
        style={{
          fontFamily: FONT_STACK,
          fontSize: 64,
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
  const tagOp = interpolate(frame, [18, 28], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tagTy = interpolate(frame, [18, 30], [30, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <AbsoluteFill style={flexColumnCenter}>
        <div style={{ transform: `scale(${scale})`, opacity: op }}>
          <Logo width={640} />
        </div>
        <div
          style={{
            marginTop: 30,
            opacity: tagOp,
            transform: `translateY(${tagTy}px)`,
            fontFamily: FONT_STACK,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.inkSoft,
            direction: "rtl",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          منصّتك الذكية للمطاعم والمقاهي
        </div>
      </AbsoluteFill>
      <Caption>تعرّف على بروتشين — كل احتياجاتك في مكان واحد</Caption>
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
        <Headline>سهلة. سريعة. موثوقة.</Headline>
      </div>

      <AbsoluteFill style={{ ...flexColumnCenter, paddingTop: 180 }}>
        <PhoneFrame scale={0.82}>
          <DemoScreens />
        </PhoneFrame>
      </AbsoluteFill>

      <Caption>تصفح، اطلب، وتابع طلباتك — بضغطة واحدة</Caption>
    </AbsoluteFill>
  );
};

const DemoScreens: React.FC = () => {
  const frame = useCurrentFrame();
  const screens = [
    "buyer_login.png",
    "buyer_home.png",
    "buyer_products.png",
    "buyer_orders.png",
    "buyer_notifications.png",
  ];
  const each = Math.floor(SCENE_DURATIONS.s4 / screens.length);
  const idx = Math.min(Math.floor(frame / each), screens.length - 1);
  const within = frame - idx * each;
  const fade = interpolate(within, [0, 10, each - 10, each], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoom = interpolate(within, [0, each], [1.02, 1.08]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ opacity: fade, transform: `scale(${zoom})`, height: "100%" }}>
        <PhoneScreenshot src={screens[idx]} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {screens.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === idx ? 28 : 12,
              height: 8,
              borderRadius: 6,
              background: i === idx ? COLORS.orange : "rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ---------- Scene 5: Benefits ----------
export const Scene5Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldIcon size={110} />,
      title: "موردون موثوقون",
      body: "كل شريك مُعتمد ومختار بعناية",
    },
    {
      icon: <SparkIcon size={110} />,
      title: "تطبيق سهل وسريع",
      body: "تطلب في دقائق — مو ساعات",
    },
    {
      icon: <RocketIcon size={110} />,
      title: "كفاءة ونمو",
      body: "وقت أقل، مبيعات أكثر",
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
        <Headline>مصنوعة عشان نجاحك</Headline>
      </div>
      <AbsoluteFill
        style={{ ...flexColumnCenter, paddingTop: 140, gap: 36 }}
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
      <Caption>موردون موثوقون، تطبيق سهل، ونمو أسرع</Caption>
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
        padding: "32px 40px",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 32,
        boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
        transform: `translateY(${ty}px)`,
        opacity: op,
        direction: "rtl",
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
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 900,
            fontSize: 52,
            color: COLORS.ink,
            letterSpacing: -1,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 600,
            fontSize: 30,
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
  const truckX = interpolate(frame, [20, 160], [-80, 1100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pairs = [
    { src: "supplier_home.png", label: "لوحة المورد" },
    { src: "supplier_orders.png", label: "إدارة الطلبات" },
    { src: "supplier_products.png", label: "منتجاتك" },
  ];
  const each = Math.floor(SCENE_DURATIONS.s6 / pairs.length);
  const idx = Math.min(Math.floor(frame / each), pairs.length - 1);
  return (
    <AbsoluteFill>
      <SoftBackground />
      <FloatingShapes />
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Headline>للمشتري وللمورد — منصة وحدة</Headline>
      </div>

      <AbsoluteFill style={{ ...flexColumnCenter, paddingTop: 360 }}>
        <PhoneFrame scale={0.72}>
          <PhoneScreenshot src={pairs[idx].src} />
        </PhoneFrame>
        <div
          style={{
            marginTop: 28,
            fontFamily: FONT_STACK,
            fontSize: 44,
            fontWeight: 800,
            color: COLORS.orangeDark,
            direction: "rtl",
          }}
        >
          {pairs[idx].label}
        </div>

        <div style={{ position: "absolute", bottom: 220, left: truckX }}>
          <TruckIcon size={140} />
        </div>
      </AbsoluteFill>

      <Caption>من التوريد للتخزين للتوصيل — نتولى كل شي</Caption>
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
        <Headline>ننمو مع بعض</Headline>
      </div>
      <AbsoluteFill style={flexColumnCenter}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 120,
          }}
        >
          <div style={{ transform: `translateX(${leftX}px)` }}>
            <PersonaCard
              src="buyer_account.png"
              label="للمشتري"
              sub="توفير وراحة"
              accent={COLORS.orange}
            />
          </div>
          <div style={{ transform: `scale(${pulse})`, flexShrink: 0 }}>
            <HandshakeIcon size={180} />
          </div>
          <div style={{ transform: `translateX(${rightX}px)` }}>
            <PersonaCard
              src="supplier_account.png"
              label="للمورد"
              sub="مبيعات أكثر"
              accent={COLORS.ink}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Caption>راحة للمشترين، ومبيعات أكثر للموردين</Caption>
    </AbsoluteFill>
  );
};

const PersonaCard: React.FC<{
  src: string;
  label: string;
  sub: string;
  accent: string;
}> = ({ src, label, sub, accent }) => (
  <div
    style={{
      background: "white",
      borderRadius: 32,
      padding: 20,
      boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      width: 320,
      direction: "rtl",
    }}
  >
    <div
      style={{
        width: 280,
        height: 560,
        borderRadius: 24,
        overflow: "hidden",
        background: COLORS.bg,
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
    <span
      style={{
        fontFamily: FONT_STACK,
        fontSize: 46,
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
        fontSize: 30,
        fontWeight: 700,
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
      <AbsoluteFill style={{ ...flexColumnCenter, gap: 70 }}>
        <SpringIn from={0.5} damping={12}>
          <Logo width={680} />
        </SpringIn>

        <Sequence from={14} durationInFrames={SCENE_DURATIONS.s8}>
          <SpringIn from={0.7} damping={14}>
            <div
              style={{
                transform: `scale(${pulse})`,
                background: COLORS.orange,
                color: "white",
                padding: "32px 80px",
                borderRadius: 999,
                fontFamily: FONT_STACK,
                fontWeight: 900,
                fontSize: 58,
                letterSpacing: -1,
                direction: "rtl",
                boxShadow: "0 24px 60px rgba(242,162,44,0.5)",
              }}
            >
              انضم الآن
            </div>
          </SpringIn>
        </Sequence>

        <Sequence from={24} durationInFrames={SCENE_DURATIONS.s8}>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: 42,
              fontWeight: 800,
              color: COLORS.ink,
              direction: "rtl",
              opacity: 0.85,
            }}
          >
            الرابط في البايو
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

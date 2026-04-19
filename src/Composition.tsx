import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { COLORS, FONT_STACK, SCENE_DURATIONS } from "./theme";
import {
  Scene1Hook,
  Scene2Pain,
  Scene3Intro,
  Scene4Demo,
  Scene5Benefits,
  Scene6FullService,
  Scene7WinWin,
  Scene8CTA,
} from "./scenes";

export const ProChainAd: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONT_STACK,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.55} />
      <Series>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s1}>
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s2}>
          <Scene2Pain />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s3}>
          <Scene3Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s4}>
          <Scene4Demo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s5}>
          <Scene5Benefits />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s6}>
          <Scene6FullService />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s7}>
          <Scene7WinWin />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s8}>
          <Scene8CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

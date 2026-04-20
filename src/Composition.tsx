import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { COLORS, FONT_STACK, SCENE_DURATIONS } from "./theme";
import {
  Scene1Hook,
  Scene2Pain,
  Scene3Reveal,
  Scene4Demo,
  Scene5Pills,
  Scene6End,
} from "./scenes";

export const ProChainAd: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.studioBg,
        fontFamily: FONT_STACK,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.7} />
      <Series>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s1}>
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s2}>
          <Scene2Pain />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s3}>
          <Scene3Reveal />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s4}>
          <Scene4Demo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s5}>
          <Scene5Pills />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.s6}>
          <Scene6End />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

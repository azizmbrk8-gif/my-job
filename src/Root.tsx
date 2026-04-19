import React from "react";
import { Composition } from "remotion";
import { ProChainAd } from "./Composition";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProChainAd"
        component={ProChainAd}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

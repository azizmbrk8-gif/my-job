import React from "react";
import { Composition } from "remotion";
import { LinkedInPost } from "./LinkedInPost";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProChainAd"
        lazyComponent={() =>
          import("./Composition").then((m) => ({ default: m.ProChainAd }))
        }
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="LinkedInPost"
        component={LinkedInPost}
        durationInFrames={1}
        fps={30}
        width={1200}
        height={627}
      />
    </>
  );
};

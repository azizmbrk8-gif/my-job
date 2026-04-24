# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A [Remotion](https://www.remotion.dev/) 4.x project that renders an Arabic-language (RTL) vertical TikTok-style ad for "ProChain" (بروتشين), a B2B platform for restaurants/cafes and their suppliers. Output is a 1080×1920 @ 30 fps MP4.

## Commands

- `npm run dev` — launch Remotion Studio (live preview of the composition).
- `npm run lint` — runs `eslint src && tsc` (lint + typecheck; there is no separate typecheck script).
- `npm run build` — `remotion bundle` (produces a servable bundle; not needed for a simple render).
- `npx remotion render ProChainAd out.mp4` — render the full video. `ProChainAd` is the composition id registered in `src/Root.tsx`.
- `npx remotion render ProChainAd out.mp4 --frames=90-180` — render a frame range when iterating on a single scene.
- `npx remotion studio` — same as `npm run dev`.

There are no unit tests in this project.

## Architecture

Single composition, built from eight sequential scenes. Reading order for new work: `src/theme.ts` → `src/Composition.tsx` → `src/scenes.tsx` → `src/ui.tsx`.

- `src/index.ts` calls `registerRoot(RemotionRoot)`.
- `src/Root.tsx` registers one `<Composition id="ProChainAd" />` using `FPS`, `WIDTH`, `HEIGHT`, `TOTAL_DURATION` from `theme.ts`.
- `src/Composition.tsx` is the top-level component. It wraps everything in an RTL `AbsoluteFill`, plays `public/music.mp3` via `<Audio>`, and chains the 8 scenes inside a `<Series>`, one `<Series.Sequence>` per scene driven by `SCENE_DURATIONS`.
- `src/scenes.tsx` exports `Scene1Hook` … `Scene8CTA`. Each scene is self-contained, uses `useCurrentFrame()` (frame is local to its sequence), and composes animations with `interpolate` + `spring`.
- `src/ui.tsx` holds the reusable primitives every scene builds on: `Logo`, `Headline`, `Caption`, `SoftBackground`, `FloatingShapes`, `PhoneFrame`, `PhoneScreenshot`, `SpringIn`, `Notification`, plus inline SVG icons (`CheckIcon`, `CrossIcon`, `ClockIcon`, `ShieldIcon`, `SparkIcon`, `RocketIcon`, `TruckIcon`, `HandshakeIcon`). Prefer extending these before introducing new primitives.
- `src/theme.ts` is the single source for `FPS`, `WIDTH`, `HEIGHT`, `COLORS`, the Cairo `FONT_STACK` (loaded via `@remotion/google-fonts/Cairo`), the `sec(seconds) => frames` helper, and `SCENE_DURATIONS` / `TOTAL_DURATION`.

### Key conventions

- **Time is frames, not seconds.** Always convert with `sec(s)` from `theme.ts`. Any scene-length change goes in `SCENE_DURATIONS`; `TOTAL_DURATION` is a manual sum of those fields and must be updated alongside.
- **Per-scene frames are local.** Inside a `<Series.Sequence>` or `<Sequence>`, `useCurrentFrame()` starts at 0. Don't offset by global time.
- **RTL + Arabic copy.** The root sets `direction: "rtl"`; text is Arabic and typography uses the Cairo font loaded in `theme.ts`. When adding text, keep `direction: "rtl"` on the container and use `FONT_STACK`.
- **Static assets via `staticFile()`.** Everything in `public/` (screenshots `buyer_*.png` / `supplier_*.png`, `logo.jpeg`, `music.mp3`) is loaded with `staticFile("name.ext")` — never import or hard-code paths.
- **`public/music.mp3` is not committed.** The render workflow downloads a royalty-free track or synthesizes a silent fallback with ffmpeg. For local preview, drop any `music.mp3` into `public/` or the studio will fail to load audio.
- **Colors come from `COLORS`.** Don't inline hex values; extend `COLORS` in `theme.ts` instead.
- **TS is strict with `noUnusedLocals`.** `tsc` runs as part of `npm run lint`, so unused variables will fail CI.

## CI / Rendering

`.github/workflows/render.yml` renders the video on `workflow_dispatch` and on pushes to `claude/prochain-tiktok-ad-P9a5L`. It:

1. Installs Chromium system deps plus `fonts-noto` (needed for Arabic glyphs during headless render).
2. Runs `npx remotion browser ensure`.
3. Ensures `public/music.mp3` exists (download or silent ffmpeg fallback).
4. Runs `npx remotion render ProChainAd out.mp4 --log=verbose`.
5. Commits the resulting `out.mp4` back to the branch with `[skip ci]` to avoid loops.

`out.mp4` is the rendered artifact and lives at the repo root; the `out` entry in `.gitignore` deliberately does not cover it (only the `out/` directory is ignored).

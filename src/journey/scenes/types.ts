import type { ComponentType } from 'react';
import type { MotionValue } from 'framer-motion';

/** A chapter's artwork. `local` is this chapter's own progress, 0–1. */
export type SceneProps = { local: MotionValue<number> };
export type Scene = ComponentType<SceneProps>;

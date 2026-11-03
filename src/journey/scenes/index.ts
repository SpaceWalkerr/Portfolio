import { lazy } from 'react';
import type { Scene } from './types';

/** Chapter id → artwork. Chapters without an entry render as a title card only. */
export const scenes: Record<string, Scene> = {
  'first-line': lazy(() => import('./FirstLineScene')),
  'in-public': lazy(() => import('./InPublicScene')),
  built: lazy(() => import('./BuiltScene')),
  work: lazy(() => import('./WorkScene')),
  next: lazy(() => import('./NextScene')),
};

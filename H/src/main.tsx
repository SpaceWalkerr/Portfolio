import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
// The Arcade Cabinet — self-hosted type pair: Press Start 2P (display,
// used sparingly since it's dense), VT323 (body copy, readable pixel mono).
import '@fontsource/press-start-2p';
import '@fontsource/vt323';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

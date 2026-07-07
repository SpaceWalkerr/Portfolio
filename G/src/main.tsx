import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
// Mission Control — self-hosted type pair: Michroma (display headlines),
// Share Tech Mono (telemetry, labels, everything else).
import '@fontsource/michroma';
import '@fontsource/share-tech-mono';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

import { useEffect, useState, lazy, Suspense } from 'react';
import type { Theme } from '../App';
import { OPEN_COMMAND_PALETTE } from '../lib/commandPalette';

// The palette indexes every project and article (with their full text), so it
// stays out of the main bundle until someone actually reaches for it.
const CommandPalette = lazy(() => import('./CommandPalette'));

interface Props {
  theme: Theme;
  onSetTheme: (t: Theme) => void;
}

const CommandPaletteLauncher = (props: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const load = () => setLoaded(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        load();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE, load);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE, load);
    };
  }, [loaded]);

  if (!loaded) return null;
  return (
    <Suspense fallback={null}>
      <CommandPalette {...props} defaultOpen />
    </Suspense>
  );
};

export default CommandPaletteLauncher;

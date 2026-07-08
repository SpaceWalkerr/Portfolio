import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-void px-4 text-ink">
          <div className="w-full max-w-md space-y-6 border-4 border-ink bg-void-bright p-8 text-center shadow-[8px_8px_0_rgba(0,0,0,0.6)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-gold text-gold">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <p className="mb-2 font-display text-[9px] uppercase text-gold">Game Over</p>
              <h1 className="mb-2 font-display text-base uppercase text-ink">Something Went Wrong</h1>
              <p className="font-mono text-base text-ink-mute">An unexpected error occurred. Please try refreshing the page.</p>
            </div>
            <button onClick={() => window.location.reload()} className="border-2 border-ink bg-gold px-6 py-3 font-display text-[10px] uppercase text-void-deep shadow-[4px_4px_0_rgba(0,0,0,0.5)] transition-colors hover:bg-gold-bright">
              Continue?
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

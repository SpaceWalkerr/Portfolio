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
        <div className="flex min-h-screen items-center justify-center bg-paper px-4 text-ink">
          <div className="w-full max-w-md space-y-6 border-2 border-ink bg-paper-deep p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-blood text-blood">
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
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-blood">Case Corrupted</p>
              <h1 className="mb-2 font-display text-2xl uppercase tracking-tight text-ink">Something Went Wrong</h1>
              <p className="font-mono text-xs text-ink-mute">An unexpected error occurred. Please try refreshing the page.</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-blood"
            >
              Reopen File
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

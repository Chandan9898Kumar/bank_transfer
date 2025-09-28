import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Banking app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <h2 id="error-title">Something went wrong with your banking session</h2>
          <p aria-describedby="error-title">Please refresh the page or contact support if the issue persists.</p>
          <button 
            onClick={() => window.location.reload()}
            aria-label="Refresh page to resolve banking session error"
            type="button"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
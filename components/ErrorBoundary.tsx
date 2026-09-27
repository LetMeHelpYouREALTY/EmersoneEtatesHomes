
import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Track error in analytics if available
    if (typeof window !== 'undefined' && window.trackAnalytics) {
      window.trackAnalytics.trackEvent({
        action: 'react_error',
        category: 'errors',
        label: error.message,
        customParameters: {
          error_boundary: true,
          component_stack: errorInfo.componentStack,
          error_stack: error.stack
        }
      });
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.</p>

            <div className="error-actions">
              <button onClick={this.handleRetry} className="error-btn primary">
                Try Again
              </button>
              <button onClick={this.handleReload} className="error-btn secondary">
                Refresh Page
              </button>
              <Link href="/contact" className="error-btn tertiary">
                Contact Support
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Mode)</summary>
                <div className="error-info">
                  <h4>Error Message:</h4>
                  <pre>{this.state.error.message}</pre>

                  <h4>Stack Trace:</h4>
                  <pre>{this.state.error.stack}</pre>

                  {this.state.errorInfo && (
                    <>
                      <h4>Component Stack:</h4>
                      <pre>{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>

          <style jsx>{`
            .error-boundary {
              min-height: 400px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
              background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            }

            .error-container {
              max-width: 600px;
              text-align: center;
              background: white;
              padding: 3rem 2rem;
              border-radius: 20px;
              box-shadow: 0 20px 50px rgba(0,0,0,0.1);
              border: 1px solid #fecaca;
            }

            .error-icon {
              font-size: 4rem;
              margin-bottom: 1.5rem;
            }

            .error-container h2 {
              color: #dc2626;
              font-size: 2rem;
              margin-bottom: 1rem;
            }

            .error-container p {
              color: #64748b;
              font-size: 1.1rem;
              line-height: 1.6;
              margin-bottom: 2rem;
            }

            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
              margin-bottom: 2rem;
            }

            .error-btn {
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              cursor: pointer;
              border: none;
              transition: transform 0.3s ease;
              font-family: inherit;
              font-size: 1rem;
            }

            .error-btn:hover {
              transform: translateY(-2px);
            }

            .error-btn.primary {
              background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
              color: white;
            }

            .error-btn.secondary {
              background: #f1f5f9;
              color: #374151;
              border: 2px solid #e5e7eb;
            }

            .error-btn.tertiary {
              background: transparent;
              color: #1e40af;
              border: 2px solid #1e40af;
            }

            .error-details {
              text-align: left;
              margin-top: 2rem;
              background: #f8fafc;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
            }

            .error-details summary {
              padding: 1rem;
              cursor: pointer;
              font-weight: 600;
              color: #374151;
              border-bottom: 1px solid #e5e7eb;
            }

            .error-details summary:hover {
              background: #f1f5f9;
            }

            .error-info {
              padding: 1rem;
            }

            .error-info h4 {
              color: #374151;
              margin: 1rem 0 0.5rem 0;
              font-size: 1rem;
            }

            .error-info h4:first-child {
              margin-top: 0;
            }

            .error-info pre {
              background: #1f2937;
              color: #f9fafb;
              padding: 1rem;
              border-radius: 6px;
              overflow-x: auto;
              font-size: 0.9rem;
              line-height: 1.4;
              margin: 0;
            }

            @media (max-width: 768px) {
              .error-container {
                padding: 2rem 1.5rem;
              }

              .error-actions {
                flex-direction: column;
                align-items: center;
              }

              .error-btn {
                width: 100%;
                max-width: 200px;
              }

              .error-container h2 {
                font-size: 1.5rem;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

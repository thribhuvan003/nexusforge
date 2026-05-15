'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[NexusForge] Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 gap-8 text-center">
          <div className="w-24 h-24 bg-[var(--brand-orange)] border-4 border-white flex items-center justify-center font-black text-black text-5xl shadow-[8px_8px_0_rgba(255,255,255,1)]">
            ⚠
          </div>
          <h1 className="font-sans font-black text-6xl text-white uppercase tracking-tighter">
            SYSTEM<br />
            <span className="text-[var(--brand-orange)]">FAULT</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-sans text-xl max-w-lg font-bold border-l-4 border-[var(--brand-violet)] pl-4 text-left">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-brutal !py-4 !px-10 !text-xl !border-4 !rounded-none"
          >
            REBOOT INTERFACE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

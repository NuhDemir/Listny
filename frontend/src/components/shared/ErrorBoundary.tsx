import { Component } from 'react';
import type { ReactNode } from 'react';

/**
 * ErrorBoundary - Swiss Style
 * 
 * Functional error handling with clear typography
 */

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
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex min-h-screen items-center justify-center bg-white p-6 dark:bg-black">
                    <div className="max-w-md text-center">
                        {/* Error Icon */}
                        <div className="mb-8 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center border-2 border-black dark:border-white">
                                <span className="text-4xl font-bold">!</span>
                            </div>
                        </div>

                        {/* Error Title */}
                        <h1 className="mb-4 text-3xl font-bold tracking-tighter">
                            System Error
                        </h1>

                        {/* Error Message */}
                        <p className="mb-8 text-sm tracking-tight text-black/60 dark:text-white/60">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>

                        {/* Reload Button */}
                        <button
                            onClick={() => window.location.reload()}
                            className="border border-black px-8 py-3 text-sm font-medium tracking-tight hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-colors"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

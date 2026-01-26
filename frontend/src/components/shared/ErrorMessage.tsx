import { cn } from '@/lib/utils';

/**
 * ErrorMessage - Swiss Style
 * 
 * Typography: Clear hierarchy
 * Grid: Centered with precise spacing
 * Color: Minimal use - only for critical states
 */

interface ErrorMessageProps {
    message: string;
    className?: string;
    onRetry?: () => void;
}

export const ErrorMessage = ({ message, className, onRetry }: ErrorMessageProps) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-6 p-8 text-center',
                className
            )}
        >
            {/* Error Icon - Swiss Style Square */}
            <div className="flex h-16 w-16 items-center justify-center border-2 border-black dark:border-white">
                <span className="text-3xl font-bold">!</span>
            </div>

            {/* Error Content */}
            <div className="max-w-md space-y-2">
                <h3 className="text-lg font-bold tracking-tight">
                    Error
                </h3>
                <p className="text-sm tracking-tight text-black/60 dark:text-white/60">
                    {message}
                </p>
            </div>

            {/* Retry Button */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="border border-black px-6 py-2.5 text-sm font-medium tracking-tight hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    Retry
                </button>
            )}
        </div>
    );
};

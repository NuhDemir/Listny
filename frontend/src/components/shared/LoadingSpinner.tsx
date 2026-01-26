import { cn } from '@/lib/utils';

/**
 * LoadingSpinner - Swiss Style
 * 
 * Design: Minimal rotating square (not circle)
 * Grid: Size based on 16px units
 * Animation: Precise 1s rotation
 */

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div
            className={cn(
                'animate-spin border-2 border-black/20 border-t-black dark:border-white/20 dark:border-t-white',
                sizeClasses[size],
                className
            )}
            role="status"
            aria-label="Loading"
        />
    );
};

/**
 * LoadingScreen - Full Screen Loading
 * 
 * Grid: Centered with mathematical precision
 */
export const LoadingScreen = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
            <div className="flex flex-col items-center gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-sm font-medium tracking-tight text-black/60 dark:text-white/60">
                    Loading
                </p>
            </div>
        </div>
    );
};

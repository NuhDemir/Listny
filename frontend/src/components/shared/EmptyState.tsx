import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * EmptyState - Swiss Style
 * 
 * Typography: Extreme contrast - large title, small description
 * Grid: Centered with mathematical spacing
 * Visual: Minimal, functional
 */

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export const EmptyState = ({
    icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) => {
    return (
        <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
            {/* Icon - Grid Unit: 64px (4 units) */}
            {icon && (
                <div className="mb-8 flex h-16 w-16 items-center justify-center text-black/20 dark:text-white/20">
                    {icon}
                </div>
            )}

            {/* Title - Large, Bold Typography */}
            <h3 className="mb-3 text-2xl font-bold tracking-tighter">
                {title}
            </h3>

            {/* Description - Small, Functional Typography */}
            {description && (
                <p className="mb-8 max-w-md text-sm tracking-tight text-black/60 dark:text-white/60">
                    {description}
                </p>
            )}

            {/* Action */}
            {action && <div>{action}</div>}
        </div>
    );
};

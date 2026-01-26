import type { ReactNode } from 'react';

/**
 * SectionHeader - Swiss Style Section Title
 * 
 * GRID:
 * - Height: 64px (4 units)
 * - Margin bottom: 32px (2 units)
 * 
 * TYPOGRAPHY:
 * - Title: 32px, Bold, Tracking: -0.03em
 * - Subtitle: 14px, Regular, Tracking: 0
 * 
 * VISUAL:
 * - Extreme contrast
 * - Minimal decoration
 */

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
}

export const SectionHeader = ({ title, subtitle, action }: SectionHeaderProps) => {
    return (
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-4 dark:border-white/10">
            <div>
                <h2 className="text-3xl font-bold tracking-tighter">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-1 text-sm tracking-tight text-black/60 dark:text-white/60">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
};

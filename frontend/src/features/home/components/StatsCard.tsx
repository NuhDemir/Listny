/**
 * StatsCard - Swiss Style Statistics Display
 * 
 * GRID: 
 * - Height: 128px (8 units @ 16px)
 * - Padding: 24px (1.5 units)
 * 
 * TYPOGRAPHY:
 * - Number: 48px, Bold, Tracking: -0.05em
 * - Label: 12px, Regular, Tracking: 0.05em (uppercase)
 * 
 * VISUAL:
 * - Monochrome only
 * - Border: 1px solid
 * - No shadows, no gradients
 */

interface StatsCardProps {
    value: number;
    label: string;
    className?: string;
}

export const StatsCard = ({ value, label, className }: StatsCardProps) => {
    const formatNumber = (num: number): string => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <div
            className={`flex h-32 flex-col justify-between border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black ${className}`}
        >
            {/* Value - Large, Bold Typography */}
            <div className="font-bold text-5xl tracking-tighter tabular-nums">
                {formatNumber(value)}
            </div>

            {/* Label - Small, Uppercase Typography */}
            <div className="text-xs font-medium uppercase tracking-wider text-black/60 dark:text-white/60">
                {label}
            </div>
        </div>
    );
};

/**
 * SearchFilters Component - Swiss Style Filter Tabs
 * 
 * DESIGN:
 * - Minimal tab design
 * - Clear active state
 * - Result counts
 * - Mathematical spacing
 * - Dark/Light mode support
 */

interface SearchFiltersProps {
    activeFilter: 'all' | 'songs' | 'albums' | 'artists';
    onFilterChange: (filter: 'all' | 'songs' | 'albums' | 'artists') => void;
    counts?: {
        songs: number;
        albums: number;
        artists: number;
    };
}

export const SearchFilters = ({
    activeFilter,
    onFilterChange,
    counts,
}: SearchFiltersProps) => {
    const filters = [
        { id: 'all' as const, label: 'All Results', count: counts ? counts.songs + counts.albums + counts.artists : 0 },
        { id: 'songs' as const, label: 'Songs', count: counts?.songs || 0 },
        { id: 'albums' as const, label: 'Albums', count: counts?.albums || 0 },
        { id: 'artists' as const, label: 'Artists', count: counts?.artists || 0 },
    ];

    return (
        <div className="border-b border-black/10 dark:border-white/10">
            <div className="flex gap-8">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`relative pb-4 text-sm tracking-tight transition-colors ${activeFilter === filter.id
                            ? 'text-black dark:text-white'
                            : 'text-black/40 hover:text-black/60 dark:text-white/40 dark:hover:text-white/60'
                            }`}
                    >
                        {filter.label}
                        {counts && filter.count > 0 && (
                            <span className="ml-2 text-xs">({filter.count})</span>
                        )}
                        {activeFilter === filter.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

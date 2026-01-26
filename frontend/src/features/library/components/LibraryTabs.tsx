/**
 * LibraryTabs Component - Swiss Style Tab Navigation
 * 
 * DESIGN:
 * - Minimal tab design
 * - Clear active state
 * - Mathematical spacing
 * - Dark/Light mode support
 */

interface LibraryTabsProps {
    activeTab: 'songs' | 'albums' | 'artists' | 'playlists' | 'recent';
    onTabChange: (tab: 'songs' | 'albums' | 'artists' | 'playlists' | 'recent') => void;
}

export const LibraryTabs = ({ activeTab, onTabChange }: LibraryTabsProps) => {
    const tabs = [
        { id: 'songs' as const, label: 'Favorite Songs' },
        { id: 'albums' as const, label: 'Favorite Albums' },
        { id: 'artists' as const, label: 'Favorite Artists' },
        { id: 'playlists' as const, label: 'Playlists' },
        { id: 'recent' as const, label: 'Recently Played' },
    ];

    return (
        <div className="border-b border-black/10 dark:border-white/10">
            <div className="flex gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative whitespace-nowrap pb-4 text-sm tracking-tight transition-colors ${activeTab === tab.id
                                ? 'text-black dark:text-white'
                                : 'text-black/40 hover:text-black/60 dark:text-white/40 dark:hover:text-white/60'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

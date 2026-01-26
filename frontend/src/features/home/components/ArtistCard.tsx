/**
 * ArtistCard - Swiss Style Artist Display
 * 
 * GRID:
 * - Square aspect ratio
 * - Padding: 16px (1 unit)
 * 
 * TYPOGRAPHY:
 * - Name: 16px, Bold
 * - Stats: 12px, Regular
 * 
 * VISUAL:
 * - Monochrome with color image
 * - Border: 1px solid
 * - Hover: Background change only
 */

interface ArtistCardProps {
    artist: string;
    imageUrl: string;
    songCount: number;
    totalPlays: number;
    onClick?: () => void;
}

export const ArtistCard = ({ artist, imageUrl, songCount, totalPlays, onClick }: ArtistCardProps) => {
    const formatPlays = (plays: number): string => {
        if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
        if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
        return plays.toString();
    };

    return (
        <div
            className="group cursor-pointer border border-black/10 bg-white transition-colors hover:bg-black/5 dark:border-white/10 dark:bg-black dark:hover:bg-white/5"
            onClick={onClick}
        >
            {/* Image - Square */}
            <div className="relative aspect-square overflow-hidden bg-black/5 dark:bg-white/5">
                <img
                    src={imageUrl}
                    alt={artist}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Artist Name */}
                <h3 className="mb-2 font-bold tracking-tight">
                    {artist}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs tracking-tight text-black/60 dark:text-white/60">
                    <span>{songCount} songs</span>
                    <span>•</span>
                    <span>{formatPlays(totalPlays)} plays</span>
                </div>
            </div>
        </div>
    );
};

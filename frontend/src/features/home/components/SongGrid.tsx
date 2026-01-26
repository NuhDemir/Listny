import { SongCard } from '@/features/songs/components/SongCard';
import type { Song } from '@/types';

/**
 * SongGrid - Swiss Style Grid Layout
 * 
 * GRID:
 * - Columns: 2 (mobile) → 3 (tablet) → 4 (desktop) → 5 (xl)
 * - Gap: 24px (1.5 units)
 * - Mathematical precision
 * 
 * VISUAL:
 * - Clean grid system
 * - Consistent spacing
 * - No decorative elements
 */

interface SongGridProps {
    songs: Song[];
    limit?: number;
}

export const SongGrid = ({ songs, limit }: SongGridProps) => {
    const displaySongs = limit ? songs.slice(0, limit) : songs;

    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displaySongs.map((song) => (
                <SongCard key={song._id} song={song} />
            ))}
        </div>
    );
};

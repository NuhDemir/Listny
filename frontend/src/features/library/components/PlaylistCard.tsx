import { Play, Music } from 'lucide-react';
import type { Playlist } from '../api/library.service';

/**
 * PlaylistCard Component - Swiss Style Playlist Display
 * 
 * DESIGN:
 * - Square aspect ratio
 * - Minimal hover effects
 * - Clear typography
 * - Dark/Light mode support
 */

interface PlaylistCardProps {
    playlist: Playlist;
    onClick?: () => void;
}

export const PlaylistCard = ({ playlist, onClick }: PlaylistCardProps) => {
    const songCount = playlist.songs?.length || 0;

    return (
        <div className="group cursor-pointer" onClick={onClick}>
            {/* Playlist Cover */}
            <div className="relative mb-4 aspect-square overflow-hidden bg-black/5 dark:bg-white/5">
                {playlist.imageUrl ? (
                    <img
                        src={playlist.imageUrl}
                        alt={playlist.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Music className="h-16 w-16 text-black/20 dark:text-white/20" strokeWidth={1} />
                    </div>
                )}

                {/* Play Button - Appears on Hover */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Play playlist
                    }}
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center bg-black text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white dark:text-black"
                    aria-label="Play playlist"
                >
                    <Play className="h-5 w-5 fill-current" strokeWidth={0} />
                </button>
            </div>

            {/* Playlist Info */}
            <div className="space-y-1">
                <h3 className="truncate text-sm font-medium tracking-tight text-black dark:text-white">
                    {playlist.name}
                </h3>
                {playlist.description && (
                    <p className="truncate text-xs tracking-tight text-black/60 dark:text-white/60">
                        {playlist.description}
                    </p>
                )}
                <p className="text-xs tracking-tight text-black/40 dark:text-white/40">
                    {songCount} {songCount === 1 ? 'song' : 'songs'}
                </p>
            </div>
        </div>
    );
};

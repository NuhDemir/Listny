import { Play } from 'lucide-react';
import type { Album } from '@/types';

/**
 * AlbumCard Component - Swiss Style Album Display
 * 
 * DESIGN:
 * - Square aspect ratio (1:1)
 * - Minimal hover effects
 * - Clear typography
 * - Mathematical spacing
 * 
 * INTERACTION:
 * - Click to view album
 * - Play button on hover
 * - Smooth transitions
 */

interface AlbumCardProps {
    album: Album;
    onClick?: () => void;
}

export const AlbumCard = ({ album, onClick }: AlbumCardProps) => {
    return (
        <div
            className="group cursor-pointer"
            onClick={onClick}
        >
            {/* Album Cover */}
            <div className="relative mb-4 aspect-square overflow-hidden bg-neutral-100">
                <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Play Button - Appears on Hover */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Play album
                    }}
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center bg-neutral-900 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-label="Play album"
                >
                    <Play className="h-5 w-5 fill-current" strokeWidth={0} />
                </button>
            </div>

            {/* Album Info */}
            <div className="space-y-1">
                <h3 className="truncate text-sm font-medium tracking-tight text-neutral-900">
                    {album.title}
                </h3>
                <p className="truncate text-sm tracking-tight text-neutral-500">
                    {album.artist}
                </p>
                <p className="text-xs tracking-tight text-neutral-400">
                    {album.releaseYear}
                </p>
            </div>
        </div>
    );
};

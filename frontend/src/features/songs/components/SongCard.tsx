import { useState } from 'react';
import { Play, Plus } from 'lucide-react';
import { useAudioPlayer } from '@/context';
import { formatDuration } from '@/utils';
import type { Song } from '@/types';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import { LikeButton } from '@/components/shared';

/**
 * SongCard - Swiss Style Song Display
 * 
 * GRID:
 * - Square image aspect ratio
 * - Padding: 16px (1 unit)
 * 
 * TYPOGRAPHY:
 * - Title: 14px, Medium
 * - Artist: 12px, Regular
 * - Duration: 12px, Mono
 * 
 * VISUAL:
 * - Monochrome with color image
 * - Border: 1px solid
 * - Hover: Background change only
 * - Play button: Square, centered
 * - Add to playlist button: Top right corner
 */

interface SongCardProps {
    song: Song;
    className?: string;
}

export const SongCard = ({ song, className }: SongCardProps) => {
    const { playSong, currentSong, isPlaying } = useAudioPlayer();
    const isCurrentSong = currentSong?._id === song._id;
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    return (
        <>
            <div
                className={`group relative cursor-pointer border border-black/10 bg-white transition-colors hover:bg-black/5 dark:border-white/10 dark:bg-black dark:hover:bg-white/5 ${className}`}
            >
                {/* Image Container - Square Aspect Ratio */}
                <div className="relative aspect-square overflow-hidden bg-black/5 dark:bg-white/5" onClick={() => playSong(song)}>
                    <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />

                    {/* Like Button - Top Left */}
                    <div className="absolute left-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <LikeButton song={song} size="sm" />
                    </div>

                    {/* Add to Playlist Button - Top Right */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaylistModalOpen(true);
                        }}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-white text-black opacity-0 transition-opacity group-hover:opacity-100 dark:bg-black dark:text-white"
                        aria-label="Add to playlist"
                        title="Add to playlist"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                    </button>

                    {/* Play Button - Swiss Style Square */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20 dark:group-hover:bg-black/40">
                        <div
                            className={`flex h-12 w-12 items-center justify-center border-2 border-white bg-white text-black transition-all ${isCurrentSong && isPlaying
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                                }`}
                        >
                            {isCurrentSong && isPlaying ? (
                                <div className="flex gap-1">
                                    <span className="h-4 w-0.5 bg-black" />
                                    <span className="h-4 w-0.5 bg-black" />
                                </div>
                            ) : (
                                <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Content - Grid Padding */}
                <div className="p-4" onClick={() => playSong(song)}>
                    {/* Title */}
                    <h3 className="mb-1 truncate text-sm font-medium tracking-tight">
                        {song.title}
                    </h3>

                    {/* Artist */}
                    <p className="mb-2 truncate text-xs tracking-tight text-black/60 dark:text-white/60">
                        {song.artist}
                    </p>

                    {/* Meta - Duration */}
                    {song.duration && (
                        <p className="font-mono text-xs tabular-nums tracking-tight text-black/40 dark:text-white/40">
                            {formatDuration(song.duration)}
                        </p>
                    )}
                </div>
            </div>

            {/* Add to Playlist Modal */}
            <AddToPlaylistModal
                song={song}
                isOpen={isPlaylistModalOpen}
                onClose={() => setIsPlaylistModalOpen(false)}
            />
        </>
    );
};

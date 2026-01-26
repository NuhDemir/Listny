import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Plus } from 'lucide-react';
import { useAudioPlayer } from '@/context';
import { formatDuration } from '@/utils';
import { AddToPlaylistModal } from '@/features/songs/components/AddToPlaylistModal';
import { LikeButton } from '@/components/shared';

/**
 * AudioPlayer - Swiss Style
 * 
 * Grid: 96px height (6 units)
 * Typography: Monospace for time, Sans-serif for metadata
 * Layout: Horizontal grid with mathematical precision
 */
export const AudioPlayer = () => {
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    const {
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        togglePlay,
        nextSong,
        previousSong,
        setVolume,
        seekTo,
    } = useAudioPlayer();

    if (!currentSong) return null;

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white dark:border-white/10 dark:bg-black">
            <div className="flex h-24 items-center gap-6 px-6">
                {/* Song Info - Fixed Width: 240px (15 units) */}
                <div className="flex w-60 items-center gap-4 min-w-0">
                    <div className="relative h-14 w-14 flex-shrink-0 bg-black/5 dark:bg-white/5">
                        <img
                            src={currentSong.imageUrl}
                            alt={currentSong.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium tracking-tight">
                            {currentSong.title}
                        </p>
                        <p className="truncate text-xs tracking-tight text-black/60 dark:text-white/60">
                            {currentSong.artist}
                        </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                        <LikeButton song={currentSong} size="sm" />
                        <button
                            onClick={() => setIsPlaylistModalOpen(true)}
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            aria-label="Add to playlist"
                            title="Add to playlist"
                        >
                            <Plus className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Controls - Fluid Center */}
                <div className="flex flex-1 flex-col items-center gap-2">
                    {/* Buttons - Grid Aligned */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={previousSong}
                            className="flex h-8 w-8 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            aria-label="Previous"
                        >
                            <SkipBack className="h-4 w-4" strokeWidth={1.5} />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="flex h-10 w-10 items-center justify-center bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <Pause className="h-5 w-5" strokeWidth={1.5} fill="currentColor" />
                            ) : (
                                <Play className="h-5 w-5 ml-0.5" strokeWidth={1.5} fill="currentColor" />
                            )}
                        </button>

                        <button
                            onClick={nextSong}
                            className="flex h-8 w-8 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            aria-label="Next"
                        >
                            <SkipForward className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Progress Bar - Full Width Grid */}
                    <div className="flex w-full max-w-2xl items-center gap-3">
                        <span className="font-mono text-xs tabular-nums tracking-tight text-black/60 dark:text-white/60">
                            {formatDuration(currentTime)}
                        </span>

                        <div
                            className="group relative h-1 flex-1 cursor-pointer bg-black/10 dark:bg-white/10"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percentage = x / rect.width;
                                seekTo(percentage * duration);
                            }}
                        >
                            <div
                                className="absolute left-0 top-0 h-full bg-black dark:bg-white transition-all"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 bg-black opacity-0 group-hover:opacity-100 dark:bg-white transition-opacity" />
                            </div>
                        </div>

                        <span className="font-mono text-xs tabular-nums tracking-tight text-black/60 dark:text-white/60">
                            {formatDuration(duration)}
                        </span>
                    </div>
                </div>

                {/* Volume - Fixed Width: 160px (10 units) */}
                <div className="flex w-40 items-center justify-end gap-2">
                    <button
                        onClick={() => setVolume(volume > 0 ? 0 : 1)}
                        className="flex h-8 w-8 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                    >
                        {volume === 0 ? (
                            <VolumeX className="h-4 w-4" strokeWidth={1.5} />
                        ) : (
                            <Volume2 className="h-4 w-4" strokeWidth={1.5} />
                        )}
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="h-1 w-24 cursor-pointer appearance-none bg-black/10 dark:bg-white/10 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-black dark:[&::-webkit-slider-thumb]:bg-white"
                        aria-label="Volume"
                    />
                </div>
            </div>

            {/* Add to Playlist Modal */}
            <AddToPlaylistModal
                song={currentSong}
                isOpen={isPlaylistModalOpen}
                onClose={() => setIsPlaylistModalOpen(false)}
            />
        </div>
    );
};

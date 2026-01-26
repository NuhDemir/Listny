import { Play } from 'lucide-react';
import { useAudioPlayer } from '@/context';
import type { Song } from '@/types';
import { formatDuration } from '@/utils';

/**
 * HeroSection - Swiss Style Hero with Featured Song
 * 
 * GRID:
 * - Height: 400px (25 units)
 * - Two columns: 1fr 1fr
 * - Gap: 48px (3 units)
 * 
 * TYPOGRAPHY:
 * - Title: 56px, Bold, Tracking: -0.05em
 * - Artist: 24px, Regular
 * - Meta: 14px, Regular
 * 
 * VISUAL:
 * - Large image (color photography)
 * - Monochrome text overlay
 * - Mathematical precision
 */

interface HeroSectionProps {
    song: Song;
}

export const HeroSection = ({ song }: HeroSectionProps) => {
    const { playSong, currentSong, isPlaying } = useAudioPlayer();
    const isCurrentSong = currentSong?._id === song._id;

    return (
        <section className="mb-16">
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image - Grid Column 1 */}
                <div className="relative aspect-square overflow-hidden bg-black/5 dark:bg-white/5">
                    <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="h-full w-full object-cover"
                    />

                    {/* Play Button Overlay */}
                    <button
                        onClick={() => playSong(song)}
                        className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/20 dark:hover:bg-black/40"
                        aria-label={`Play ${song.title}`}
                    >
                        <div className="flex h-20 w-20 items-center justify-center border-2 border-white bg-white text-black transition-transform hover:scale-110">
                            {isCurrentSong && isPlaying ? (
                                <div className="flex gap-1">
                                    <span className="h-6 w-1 bg-black" />
                                    <span className="h-6 w-1 bg-black" />
                                </div>
                            ) : (
                                <Play className="ml-1 h-8 w-8" fill="currentColor" strokeWidth={0} />
                            )}
                        </div>
                    </button>
                </div>

                {/* Content - Grid Column 2 */}
                <div className="flex flex-col justify-center">
                    {/* Label */}
                    <div className="mb-4 text-xs font-medium uppercase tracking-wider text-black/60 dark:text-white/60">
                        Featured
                    </div>

                    {/* Title - Extreme Typography */}
                    <h1 className="mb-4 text-5xl font-bold leading-none tracking-tighter lg:text-6xl">
                        {song.title}
                    </h1>

                    {/* Artist */}
                    <p className="mb-6 text-2xl tracking-tight text-black/80 dark:text-white/80">
                        {song.artist}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 border-t border-black/10 pt-4 text-sm tracking-tight text-black/60 dark:border-white/10 dark:text-white/60">
                        <span>{formatDuration(song.duration)}</span>
                        <span>•</span>
                        <span>{song.playCount?.toLocaleString() || 0} plays</span>
                        {song.genre && (
                            <>
                                <span>•</span>
                                <span>{song.genre}</span>
                            </>
                        )}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => playSong(song)}
                        className="mt-8 w-full border border-black py-4 text-sm font-medium tracking-tight transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black lg:w-auto lg:px-12"
                    >
                        {isCurrentSong && isPlaying ? 'Now Playing' : 'Play Now'}
                    </button>
                </div>
            </div>
        </section>
    );
};

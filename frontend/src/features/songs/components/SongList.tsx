import { Play, MoreVertical } from 'lucide-react';
import { useAudioPlayer } from '@/context';
import { formatDuration } from '@/utils';
import { cn } from '@/lib/utils';
import type { Song } from '@/types';

interface SongListProps {
    songs: Song[];
    className?: string;
}

export const SongList = ({ songs, className }: SongListProps) => {
    const { playSong, currentSong, isPlaying } = useAudioPlayer();

    return (
        <div className={cn('space-y-1', className)}>
            {songs.map((song, index) => {
                const isCurrentSong = currentSong?._id === song._id;

                return (
                    <div
                        key={song._id}
                        className={cn(
                            'group flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-accent cursor-pointer',
                            isCurrentSong && 'bg-accent'
                        )}
                        onClick={() => playSong(song)}
                    >
                        <div className="flex w-8 items-center justify-center text-sm text-muted-foreground">
                            {isCurrentSong && isPlaying ? (
                                <div className="flex gap-0.5">
                                    <span className="h-3 w-0.5 bg-primary animate-pulse" />
                                    <span className="h-3 w-0.5 bg-primary animate-pulse delay-75" />
                                    <span className="h-3 w-0.5 bg-primary animate-pulse delay-150" />
                                </div>
                            ) : (
                                <span className="group-hover:hidden">{index + 1}</span>
                            )}
                            <Play
                                className="h-4 w-4 hidden group-hover:block"
                                fill="currentColor"
                            />
                        </div>

                        <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="h-10 w-10 rounded object-cover"
                        />

                        <div className="flex-1 min-w-0">
                            <p className={cn('font-medium truncate', isCurrentSong && 'text-primary')}>
                                {song.title}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                        </div>

                        {song.duration && (
                            <span className="text-sm text-muted-foreground">
                                {formatDuration(song.duration)}
                            </span>
                        )}

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                // Handle more options
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MoreVertical className="h-5 w-5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

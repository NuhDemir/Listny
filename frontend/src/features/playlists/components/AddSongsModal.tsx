import { useState, useEffect } from 'react';
import * as React from 'react';
import { X, Search, Plus, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { songsService } from '@/features/songs/api/songs.service';
import { useAddSongToPlaylistDetail } from '../hooks/usePlaylist';
import type { Song } from '@/types';

/**
 * AddSongsModal - Modal for browsing and adding songs to playlist
 */

interface AddSongsModalProps {
    playlistId: string;
    existingSongIds: string[];
    isOpen: boolean;
    onClose: () => void;
}

export const AddSongsModal = ({ playlistId, existingSongIds, isOpen, onClose }: AddSongsModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [addedSongs, setAddedSongs] = useState<Set<string>>(new Set());

    // Fetch multiple song lists and combine them
    const { data: featuredSongs } = useQuery({
        queryKey: ['featured-songs'],
        queryFn: () => songsService.getFeatured(),
        enabled: isOpen,
    });

    const { data: trendingSongs } = useQuery({
        queryKey: ['trending-songs'],
        queryFn: () => songsService.getTrending(),
        enabled: isOpen,
    });

    const { data: latestSongs, isLoading } = useQuery({
        queryKey: ['latest-songs'],
        queryFn: () => songsService.getLatest(),
        enabled: isOpen,
    });

    // Combine and deduplicate songs
    const allSongs = React.useMemo(() => {
        const combined = [
            ...(featuredSongs || []),
            ...(trendingSongs || []),
            ...(latestSongs || []),
        ];

        // Remove duplicates based on _id
        const uniqueSongs = combined.reduce((acc, song) => {
            if (!acc.find(s => s._id === song._id)) {
                acc.push(song);
            }
            return acc;
        }, [] as Song[]);

        return uniqueSongs;
    }, [featuredSongs, trendingSongs, latestSongs]);

    const addSong = useAddSongToPlaylistDetail();

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery('');
            setAddedSongs(new Set());
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredSongs = allSongs.filter((song: Song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddSong = async (songId: string) => {
        try {
            await addSong.mutateAsync({ playlistId, songId });
            setAddedSongs(prev => new Set(prev).add(songId));
        } catch (error) {
            console.error('Failed to add song:', error);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 border border-black/10 bg-white dark:border-white/10 dark:bg-black">
                {/* Header */}
                <div className="border-b border-black/10 p-6 dark:border-white/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Add Songs</h2>
                            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                                Browse and add songs to your playlist
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-black/40 transition-colors hover:text-black dark:text-white/40 dark:hover:text-white"
                            aria-label="Close"
                        >
                            <X className="h-6 w-6" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 dark:text-white/40" strokeWidth={1.5} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search songs..."
                            className="w-full border border-black/10 bg-white py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:focus:border-white"
                        />
                    </div>
                </div>

                {/* Song List */}
                <div className="max-h-96 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="py-8 text-center text-sm text-black/60 dark:text-white/60">
                            Loading songs...
                        </div>
                    ) : filteredSongs.length === 0 ? (
                        <div className="py-8 text-center text-sm text-black/60 dark:text-white/60">
                            No songs found
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredSongs.map((song: Song) => {
                                const isInPlaylist = existingSongIds.includes(song._id);
                                const isAdded = addedSongs.has(song._id);
                                const isDisabled = isInPlaylist || isAdded || addSong.isPending;

                                return (
                                    <div
                                        key={song._id}
                                        className={`flex items-center gap-4 border border-black/10 p-3 dark:border-white/10 ${isDisabled ? 'bg-black/5 dark:bg-white/5' : ''
                                            }`}
                                    >
                                        {/* Song Image */}
                                        <img
                                            src={song.imageUrl}
                                            alt={song.title}
                                            className="h-12 w-12 object-cover"
                                        />

                                        {/* Song Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="truncate text-sm font-medium tracking-tight">
                                                {song.title}
                                            </h3>
                                            <p className="truncate text-xs text-black/60 dark:text-white/60">
                                                {song.artist}
                                            </p>
                                        </div>

                                        {/* Add Button */}
                                        {isInPlaylist || isAdded ? (
                                            <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                                                <Check className="h-4 w-4" strokeWidth={2} />
                                                {isInPlaylist ? 'In playlist' : 'Added'}
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleAddSong(song._id)}
                                                disabled={addSong.isPending}
                                                className="flex items-center gap-2 border border-black/10 px-3 py-1.5 text-xs transition-colors hover:bg-black hover:text-white disabled:opacity-50 dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
                                            >
                                                <Plus className="h-3 w-3" strokeWidth={2} />
                                                Add
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

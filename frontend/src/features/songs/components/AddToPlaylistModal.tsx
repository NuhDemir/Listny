import { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { usePlaylists, useAddSongToPlaylist } from '@/features/library/hooks/useLibrary';
import type { Song } from '@/types';

/**
 * AddToPlaylistModal - Swiss Style Modal for Adding Songs to Playlists
 * 
 * DESIGN:
 * - Minimal modal design
 * - List of user's playlists
 * - Success feedback
 * - Dark/Light mode support
 */

interface AddToPlaylistModalProps {
    song: Song;
    isOpen: boolean;
    onClose: () => void;
}

export const AddToPlaylistModal = ({ song, isOpen, onClose }: AddToPlaylistModalProps) => {
    const { data: playlists, isLoading } = usePlaylists();
    const addSongToPlaylist = useAddSongToPlaylist();
    const [addedToPlaylists, setAddedToPlaylists] = useState<Set<string>>(new Set());

    if (!isOpen) return null;

    const handleAddToPlaylist = async (playlistId: string) => {
        try {
            await addSongToPlaylist.mutateAsync({ playlistId, songId: song._id });
            setAddedToPlaylists(prev => new Set(prev).add(playlistId));

            // Auto-close after 1 second
            setTimeout(() => {
                onClose();
                setAddedToPlaylists(new Set());
            }, 1000);
        } catch (error) {
            console.error('Failed to add song to playlist:', error);
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
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-black/10 bg-white dark:border-white/10 dark:bg-black">
                {/* Header */}
                <div className="border-b border-black/10 p-6 dark:border-white/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Add to Playlist</h2>
                            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                                {song.title} - {song.artist}
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
                </div>

                {/* Playlist List */}
                <div className="max-h-96 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="py-8 text-center text-sm text-black/60 dark:text-white/60">
                            Loading playlists...
                        </div>
                    ) : !playlists || playlists.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="mb-4 text-sm text-black/60 dark:text-white/60">
                                You don't have any playlists yet.
                            </p>
                            <button
                                onClick={() => {
                                    onClose();
                                    // Navigate to library to create playlist
                                    window.location.href = '/library?tab=playlists';
                                }}
                                className="inline-flex items-center gap-2 border border-black px-4 py-2 text-sm tracking-tight transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                            >
                                <Plus className="h-4 w-4" strokeWidth={2} />
                                Create Playlist
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {playlists.map((playlist) => {
                                const isAdded = addedToPlaylists.has(playlist._id);
                                const alreadyInPlaylist = playlist.songs?.some(
                                    (s: any) => s._id === song._id || s === song._id
                                );

                                return (
                                    <button
                                        key={playlist._id}
                                        onClick={() => !alreadyInPlaylist && !isAdded && handleAddToPlaylist(playlist._id)}
                                        disabled={alreadyInPlaylist || isAdded || addSongToPlaylist.isPending}
                                        className={`w-full border border-black/10 p-4 text-left transition-colors dark:border-white/10 ${alreadyInPlaylist || isAdded
                                                ? 'cursor-not-allowed bg-black/5 dark:bg-white/5'
                                                : 'hover:bg-black/5 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium tracking-tight">
                                                    {playlist.name}
                                                </h3>
                                                <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                                                    {playlist.songs?.length || 0} songs
                                                </p>
                                            </div>
                                            {(alreadyInPlaylist || isAdded) && (
                                                <Check className="h-5 w-5 text-black dark:text-white" strokeWidth={2} />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

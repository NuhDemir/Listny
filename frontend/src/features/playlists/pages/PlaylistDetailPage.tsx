import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Music, Plus } from 'lucide-react';
import { usePlaylist, useUpdatePlaylistDetail, useDeletePlaylistDetail, useRemoveSongFromPlaylistDetail } from '../hooks/usePlaylist';
import { useCreatePlaylist } from '@/features/library/hooks/useLibrary';
import { SongCard } from '@/features/songs/components/SongCard';
import { AddSongsModal } from '../components';
import { LoadingScreen, ErrorMessage, EmptyState } from '@/components/shared';

/**
 * PlaylistDetailPage - Swiss Style Playlist Detail/Edit
 * 
 * Routes:
 * - /playlist/new - Create new playlist
 * - /playlist/:id - View/Edit existing playlist
 */

export const PlaylistDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isNewPlaylist = id === 'new';

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isEditing, setIsEditing] = useState(isNewPlaylist);
    const [isAddSongsModalOpen, setIsAddSongsModalOpen] = useState(false);

    const { data: playlist, isLoading } = usePlaylist(id || '');
    const createPlaylist = useCreatePlaylist();
    const updatePlaylist = useUpdatePlaylistDetail();
    const deletePlaylist = useDeletePlaylistDetail();
    const removeSong = useRemoveSongFromPlaylistDetail();

    // Initialize form with playlist data
    useEffect(() => {
        if (playlist && !isNewPlaylist) {
            setName(playlist.name);
            setDescription(playlist.description || '');
            setIsPublic(playlist.isPublic);
        }
    }, [playlist, isNewPlaylist]);

    const handleSave = async () => {
        if (!name.trim()) return;

        try {
            if (isNewPlaylist) {
                const newPlaylist = await createPlaylist.mutateAsync({
                    name: name.trim(),
                    description: description.trim(),
                    isPublic,
                });
                navigate(`/playlist/${newPlaylist._id}`);
            } else {
                await updatePlaylist.mutateAsync({
                    playlistId: id!,
                    data: {
                        name: name.trim(),
                        description: description.trim(),
                        isPublic,
                    },
                });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to save playlist:', error);
        }
    };

    const handleDelete = async () => {
        if (!id || isNewPlaylist) return;
        if (!confirm('Are you sure you want to delete this playlist?')) return;

        try {
            await deletePlaylist.mutateAsync(id);
            navigate('/library');
        } catch (error) {
            console.error('Failed to delete playlist:', error);
        }
    };

    const handleRemoveSong = async (songId: string) => {
        if (!id || isNewPlaylist) return;

        try {
            await removeSong.mutateAsync({ playlistId: id, songId });
        } catch (error) {
            console.error('Failed to remove song:', error);
        }
    };

    if (isLoading && !isNewPlaylist) {
        return <LoadingScreen />;
    }

    if (!isNewPlaylist && !playlist) {
        return <ErrorMessage message="Playlist not found" />;
    }

    const songs = playlist?.songs || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <button
                    onClick={() => navigate('/library')}
                    className="flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Library
                </button>

                {!isNewPlaylist && !isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsAddSongsModalOpen(true)}
                            className="flex items-center gap-2 border border-black bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-black/80 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
                        >
                            <Plus className="h-4 w-4" strokeWidth={1.5} />
                            Add Songs
                        </button>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 border border-black/10 px-4 py-2 text-sm transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                        >
                            <Edit2 className="h-4 w-4" strokeWidth={1.5} />
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 border border-red-500/20 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
                        >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Playlist Info / Edit Form */}
            {isEditing ? (
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isNewPlaylist ? 'Create Playlist' : 'Edit Playlist'}
                    </h1>

                    <div>
                        <label className="mb-2 block text-sm text-black/60 dark:text-white/60">
                            Playlist Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My Awesome Playlist"
                            className="w-full border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:focus:border-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-black/60 dark:text-white/60">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a description..."
                            rows={3}
                            className="w-full resize-none border border-black/10 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:focus:border-white"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="public"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <label htmlFor="public" className="text-sm text-black/60 dark:text-white/60">
                            Make this playlist public
                        </label>
                    </div>

                    <div className="flex gap-4">
                        {!isNewPlaylist && (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 border border-black/10 py-3 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={!name.trim() || createPlaylist.isPending || updatePlaylist.isPending}
                            className="flex-1 border border-black bg-black py-3 text-sm text-white hover:bg-black/80 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black"
                        >
                            {(createPlaylist.isPending || updatePlaylist.isPending) ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <h1 className="mb-2 text-3xl font-bold tracking-tight">{playlist?.name}</h1>
                        {playlist?.description && (
                            <p className="text-sm text-black/60 dark:text-white/60">
                                {playlist.description}
                            </p>
                        )}
                        <p className="mt-2 text-xs text-black/40 dark:text-white/40">
                            {songs.length} {songs.length === 1 ? 'song' : 'songs'}
                            {playlist?.isPublic && ' • Public'}
                        </p>
                    </div>

                    {/* Songs */}
                    {songs.length === 0 ? (
                        <div className="space-y-6">
                            <EmptyState
                                icon={<Music className="h-16 w-16" strokeWidth={1} />}
                                title="No Songs Yet"
                                description="Add songs to this playlist to get started."
                            />
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setIsAddSongsModalOpen(true)}
                                    className="flex items-center gap-2 border border-black bg-black px-6 py-3 text-sm text-white transition-colors hover:bg-black/80 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
                                >
                                    <Plus className="h-4 w-4" strokeWidth={2} />
                                    Add Songs
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {songs.map((song: any) => (
                                <div key={song._id} className="relative group">
                                    <SongCard song={song} />
                                    <button
                                        onClick={() => handleRemoveSong(song._id)}
                                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        title="Remove from playlist"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Add Songs Modal */}
            {!isNewPlaylist && playlist && (
                <AddSongsModal
                    playlistId={id!}
                    existingSongIds={songs.map((s: any) => s._id)}
                    isOpen={isAddSongsModalOpen}
                    onClose={() => setIsAddSongsModalOpen(false)}
                />
            )}
        </div>
    );
};

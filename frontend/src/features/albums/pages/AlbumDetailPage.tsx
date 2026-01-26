import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Heart } from 'lucide-react';
import { useAlbumById } from '../hooks/useAlbums';
import { useAudioPlayer } from '@/context';
import { SongCard } from '@/features/songs/components/SongCard';
import { LoadingScreen, ErrorMessage, EmptyState } from '@/components/shared';
import { useAddFavoriteAlbum, useRemoveFavoriteAlbum, useLibrary } from '@/features/library/hooks/useLibrary';

/**
 * AlbumDetailPage - Swiss Style Album Detail
 * 
 * FEATURES:
 * - Album information (title, artist, year, genre)
 * - All songs in album
 * - Play all button
 * - Like/Unlike album
 * - Navigate to artist page
 */

export const AlbumDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { playSong } = useAudioPlayer();

    const { data: album, isLoading, error } = useAlbumById(id!);
    const { data: library } = useLibrary();
    const addFavorite = useAddFavoriteAlbum();
    const removeFavorite = useRemoveFavoriteAlbum();

    const isLiked = library?.favoriteAlbums?.some((a: any) => a._id === id) || false;

    const handleToggleLike = async () => {
        try {
            if (isLiked) {
                await removeFavorite.mutateAsync(id!);
            } else {
                await addFavorite.mutateAsync(id!);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handlePlayAll = () => {
        if (album?.songs && album.songs.length > 0) {
            playSong(album.songs[0]);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error || !album) {
        return <ErrorMessage message="Album not found" />;
    }

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                Back
            </button>

            {/* Album Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
                {/* Album Cover */}
                <div className="h-64 w-64 flex-shrink-0 bg-black/5 dark:bg-white/5">
                    <img
                        src={album.imageUrl}
                        alt={album.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Album Info */}
                <div className="flex-1 space-y-4">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-black/60 dark:text-white/60">
                            Album
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                            {album.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <button
                            onClick={() => navigate(`/artist/${encodeURIComponent(album.artist)}`)}
                            className="font-medium hover:underline"
                        >
                            {album.artist}
                        </button>
                        <span className="text-black/40 dark:text-white/40">•</span>
                        <span className="text-black/60 dark:text-white/60">
                            {album.releaseYear}
                        </span>
                        <span className="text-black/40 dark:text-white/40">•</span>
                        <span className="text-black/60 dark:text-white/60">
                            {album.songs?.length || 0} songs
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePlayAll}
                            disabled={!album.songs || album.songs.length === 0}
                            className="flex items-center gap-2 border border-black bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
                        >
                            <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                            Play All
                        </button>

                        <button
                            onClick={handleToggleLike}
                            disabled={addFavorite.isPending || removeFavorite.isPending}
                            className="flex h-12 w-12 items-center justify-center border border-black/10 transition-colors hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
                            aria-label={isLiked ? 'Unlike album' : 'Like album'}
                        >
                            <Heart
                                className={`h-5 w-5 ${isLiked
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-black/60 dark:text-white/60'
                                    }`}
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Songs List */}
            <div>
                <h2 className="mb-4 text-xl font-bold tracking-tight">Tracks</h2>
                {!album.songs || album.songs.length === 0 ? (
                    <EmptyState
                        icon={<Play className="h-16 w-16" strokeWidth={1} />}
                        title="No Songs"
                        description="This album has no songs yet."
                    />
                ) : (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {album.songs.map((song) => (
                            <SongCard key={song._id} song={song} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

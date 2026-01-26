import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Heart, Music } from 'lucide-react';
import { useArtist } from '../hooks/useArtists';
import { useAudioPlayer } from '@/context';
import { SongCard } from '@/features/songs/components/SongCard';
import { AlbumCard } from '@/features/albums/components/AlbumCard';
import { LoadingScreen, ErrorMessage, EmptyState } from '@/components/shared';
import { useAddFavoriteArtist, useRemoveFavoriteArtist, useLibrary } from '@/features/library/hooks/useLibrary';

/**
 * ArtistDetailPage - Swiss Style Artist Detail
 * 
 * FEATURES:
 * - Artist information
 * - Popular tracks
 * - All songs
 * - Discography (albums)
 * - Like/Unlike artist
 * - Play all button
 */

export const ArtistDetailPage = () => {
    const { artistName } = useParams<{ artistName: string }>();
    const navigate = useNavigate();
    const { playSong } = useAudioPlayer();

    const decodedArtistName = decodeURIComponent(artistName || '');
    const { data: artistData, isLoading, error } = useArtist(decodedArtistName);
    const { data: library } = useLibrary();
    const addFavorite = useAddFavoriteArtist();
    const removeFavorite = useRemoveFavoriteArtist();

    const isLiked = library?.favoriteArtists?.some((a: any) => a.artist === decodedArtistName) || false;

    const handleToggleLike = async () => {
        try {
            if (isLiked) {
                await removeFavorite.mutateAsync(decodedArtistName);
            } else {
                await addFavorite.mutateAsync(decodedArtistName);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handlePlayAll = () => {
        if (artistData?.popularTracks && artistData.popularTracks.length > 0) {
            playSong(artistData.popularTracks[0]);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error || !artistData) {
        return <ErrorMessage message="Artist not found" />;
    }

    const { artist, songs, albums, popularTracks } = artistData;

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

            {/* Artist Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
                {/* Artist Image */}
                <div className="h-64 w-64 flex-shrink-0 rounded-full bg-black/5 dark:bg-white/5">
                    <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>

                {/* Artist Info */}
                <div className="flex-1 space-y-4">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-black/60 dark:text-white/60">
                            Artist
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                            {artist.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                        <span>{artist.totalSongs} songs</span>
                        <span className="text-black/40 dark:text-white/40">•</span>
                        <span>{artist.totalAlbums} albums</span>
                        <span className="text-black/40 dark:text-white/40">•</span>
                        <span>{artist.totalPlays.toLocaleString()} plays</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePlayAll}
                            disabled={!popularTracks || popularTracks.length === 0}
                            className="flex items-center gap-2 border border-black bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
                        >
                            <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                            Play
                        </button>

                        <button
                            onClick={handleToggleLike}
                            disabled={addFavorite.isPending || removeFavorite.isPending}
                            className="flex h-12 w-12 items-center justify-center border border-black/10 transition-colors hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
                            aria-label={isLiked ? 'Unlike artist' : 'Like artist'}
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

            {/* Popular Tracks */}
            {popularTracks && popularTracks.length > 0 && (
                <div>
                    <h2 className="mb-4 text-xl font-bold tracking-tight">Popular Tracks</h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {popularTracks.slice(0, 5).map((song) => (
                            <SongCard key={song._id} song={song} />
                        ))}
                    </div>
                </div>
            )}

            {/* Discography */}
            {albums && albums.length > 0 && (
                <div>
                    <h2 className="mb-4 text-xl font-bold tracking-tight">Discography</h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {albums.map((album) => (
                            <AlbumCard
                                key={album._id}
                                album={album}
                                onClick={() => navigate(`/album/${album._id}`)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* All Songs */}
            {songs && songs.length > 0 && (
                <div>
                    <h2 className="mb-4 text-xl font-bold tracking-tight">All Songs</h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {songs.map((song) => (
                            <SongCard key={song._id} song={song} />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {(!songs || songs.length === 0) && (!albums || albums.length === 0) && (
                <EmptyState
                    icon={<Music className="h-16 w-16" strokeWidth={1} />}
                    title="No Content"
                    description="This artist has no songs or albums yet."
                />
            )}
        </div>
    );
};

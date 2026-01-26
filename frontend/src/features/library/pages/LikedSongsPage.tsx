import { Heart } from 'lucide-react';
import { useLibrary } from '../hooks/useLibrary';
import { SongCard } from '@/features/songs/components/SongCard';
import { LoadingScreen, ErrorMessage, EmptyState } from '@/components/shared';

/**
 * LikedSongsPage - Swiss Style Liked Songs Page
 * 
 * LAYOUT:
 * 1. Header with title and icon
 * 2. Song grid
 * 
 * FEATURES:
 * - Display all liked/favorite songs
 * - Grid layout matching home/library
 * - Empty state when no liked songs
 * - Loading and error states
 */

export const LikedSongsPage = () => {
    const { data: library, isLoading, error } = useLibrary();

    // Loading state
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Error state
    if (error) {
        return (
            <ErrorMessage
                message="Failed to load liked songs"
                onRetry={() => window.location.reload()}
            />
        );
    }

    const likedSongs = library?.favoriteSongs || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center bg-gradient-to-br from-red-500 to-pink-500">
                    <Heart className="h-8 w-8 fill-white text-white" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="mb-1 text-3xl font-bold tracking-tight">Liked Songs</h1>
                    <p className="text-sm text-black/60 dark:text-white/60">
                        {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
                    </p>
                </div>
            </div>

            {/* Content */}
            {likedSongs.length === 0 ? (
                <EmptyState
                    icon={<Heart className="h-16 w-16" strokeWidth={1} />}
                    title="No Liked Songs"
                    description="Songs you like will appear here. Start exploring and like your favorite tracks!"
                />
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {likedSongs.map((song) => (
                        <SongCard key={song._id} song={song} />
                    ))}
                </div>
            )}
        </div>
    );
};

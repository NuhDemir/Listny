import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useLibrary } from '../hooks/useLibrary';
import { LibraryTabs, PlaylistCard } from '../components';
import { SongCard } from '@/features/songs/components/SongCard';
import { AlbumCard } from '@/features/albums/components/AlbumCard';
import { ArtistCard } from '@/features/home/components/ArtistCard';
import { LoadingScreen, ErrorMessage, EmptyState } from '@/components/shared';
import { Music } from 'lucide-react';

/**
 * LibraryPage - Swiss Style Library Interface
 * 
 * LAYOUT STRUCTURE:
 * 1. Header with title
 * 2. Tab Navigation
 * 3. Content Grid (based on active tab)
 * 
 * FEATURES:
 * - Favorite songs, albums, artists
 * - User playlists
 * - Recently played
 * - Create/manage playlists
 * 
 * DESIGN:
 * - Follows home/search page pattern
 * - Mathematical spacing
 * - Responsive grid
 * - Dark/Light mode support
 */

export const LibraryPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'songs' | 'albums' | 'artists' | 'playlists' | 'recent'>('songs');

    const { data: library, isLoading, error } = useLibrary();

    // Loading state
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Error state
    if (error) {
        return (
            <ErrorMessage
                message="Failed to load library"
                onRetry={() => window.location.reload()}
            />
        );
    }

    // Empty library state
    if (!library) {
        return (
            <EmptyState
                icon={<Music className="h-16 w-16" strokeWidth={1} />}
                title="Your Library is Empty"
                description="Start adding songs, albums, and artists to your library."
            />
        );
    }

    const { favoriteSongs, favoriteAlbums, favoriteArtists, recentlyPlayed, playlists } = library;

    // Check if current tab is empty
    const isTabEmpty = () => {
        switch (activeTab) {
            case 'songs':
                return favoriteSongs.length === 0;
            case 'albums':
                return favoriteAlbums.length === 0;
            case 'artists':
                return favoriteArtists.length === 0;
            case 'playlists':
                return playlists.length === 0;
            case 'recent':
                return recentlyPlayed.length === 0;
            default:
                return true;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Your Library</h1>
                    <p className="text-sm text-black/60 dark:text-white/60">
                        Your favorite music collection
                    </p>
                </div>

                {/* Create Playlist Button - Only show on playlists tab */}
                {activeTab === 'playlists' && (
                    <button
                        onClick={() => navigate('/playlist/new')}
                        className="flex items-center gap-2 border border-black bg-black px-6 py-3 text-sm tracking-tight text-white transition-colors hover:bg-black/80 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                        Create Playlist
                    </button>
                )}
            </div>

            {/* Tab Navigation */}
            <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Content */}
            {isTabEmpty() ? (
                <EmptyState
                    icon={<Music className="h-16 w-16" strokeWidth={1} />}
                    title={`No ${activeTab === 'recent' ? 'Recently Played' : `Favorite ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}`}
                    description={`You haven't added any ${activeTab === 'recent' ? 'songs to your history' : activeTab} yet.`}
                />
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {/* Favorite Songs */}
                    {activeTab === 'songs' &&
                        favoriteSongs.map((song) => (
                            <SongCard key={song._id} song={song} />
                        ))}

                    {/* Favorite Albums */}
                    {activeTab === 'albums' &&
                        favoriteAlbums.map((album) => (
                            <AlbumCard
                                key={album._id}
                                album={album}
                                onClick={() => navigate(`/album/${album._id}`)}
                            />
                        ))}

                    {/* Favorite Artists */}
                    {activeTab === 'artists' &&
                        favoriteArtists.map((artist) => (
                            <ArtistCard
                                key={artist.artist}
                                artist={artist.artist}
                                imageUrl={artist.imageUrl}
                                songCount={artist.songCount}
                                totalPlays={0}
                                onClick={() => navigate(`/artist/${encodeURIComponent(artist.artist)}`)}
                            />
                        ))}

                    {/* Playlists */}
                    {activeTab === 'playlists' &&
                        playlists.map((playlist) => (
                            <PlaylistCard
                                key={playlist._id}
                                playlist={playlist}
                                onClick={() => navigate(`/playlist/${playlist._id}`)}
                            />
                        ))}

                    {/* Recently Played */}
                    {activeTab === 'recent' &&
                        recentlyPlayed.map((item, index) => (
                            <SongCard key={`${item.song._id}-${index}`} song={item.song} />
                        ))}
                </div>
            )}
        </div>
    );
};

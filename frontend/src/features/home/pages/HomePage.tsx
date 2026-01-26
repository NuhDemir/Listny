import { useNavigate } from 'react-router-dom';
import { useHomeData, useStats, useTrendingArtists } from '../hooks/useHomeData';
import { HeroSection, SectionHeader, StatsCard, SongGrid, ArtistCard } from '../components';
import { AlbumGrid } from '@/features/albums/components';
import { LoadingScreen, ErrorMessage, EmptyState } from '@/components/shared';
import { Music } from 'lucide-react';
import type { Album } from '@/types';

/**
 * HomePage - Swiss Style Home Dashboard
 * 
 * GRID SYSTEM:
 * - Max width: 1440px (90 units)
 * - Sections: 96px spacing (6 units)
 * - Content: 64px spacing (4 units)
 * 
 * LAYOUT STRUCTURE:
 * 1. Hero Section (Featured Song)
 * 2. Stats Cards (4 columns)
 * 3. Latest Songs (Grid)
 * 4. Trending Songs (Grid)
 * 5. Trending Artists (Grid)
 * 6. Albums (Grid)
 * 
 * TYPOGRAPHY:
 * - Section titles: 32px, Bold
 * - Content: 14-16px, Regular
 * - Labels: 12px, Uppercase
 * 
 * VISUAL:
 * - Monochrome base
 * - Color images for content
 * - Mathematical spacing
 * - No decorative elements
 */

export const HomePage = () => {
    const navigate = useNavigate();
    const { data: homeData, isLoading, error } = useHomeData();
    const { data: stats } = useStats();
    const { data: trendingArtists } = useTrendingArtists();

    // Loading State
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Error State
    if (error) {
        return (
            <ErrorMessage
                message="Failed to load home page data"
                onRetry={() => window.location.reload()}
            />
        );
    }

    // Empty State
    if (!homeData) {
        return (
            <EmptyState
                icon={<Music className="h-16 w-16" strokeWidth={1} />}
                title="No Content Available"
                description="There are no songs or albums available at the moment."
            />
        );
    }

    const { featured, latest, trending, albums } = homeData;

    return (
        <div className="space-y-16">
            {/* HERO SECTION - Featured Song */}
            {featured && featured.length > 0 && (
                <HeroSection song={featured[0]} />
            )}

            {/* STATS SECTION - Grid: 4 columns */}
            {stats && (
                <section>
                    <SectionHeader
                        title="Overview"
                        subtitle="Platform statistics"
                    />
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                        <StatsCard value={stats.totalSongs} label="Total Songs" />
                        <StatsCard value={stats.totalAlbums} label="Total Albums" />
                        <StatsCard value={stats.totalUsers} label="Total Users" />
                        <StatsCard value={stats.totalPlays} label="Total Plays" />
                    </div>
                </section>
            )}

            {/* LATEST SONGS SECTION */}
            {latest && latest.length > 0 && (
                <section>
                    <SectionHeader
                        title="Latest Releases"
                        subtitle="Recently added songs"
                        action={
                            <a
                                href="/songs/latest"
                                className="text-sm tracking-tight hover:underline"
                            >
                                View All
                            </a>
                        }
                    />
                    <SongGrid songs={latest} limit={10} />
                </section>
            )}

            {/* TRENDING SONGS SECTION */}
            {trending && trending.length > 0 && (
                <section>
                    <SectionHeader
                        title="Trending Now"
                        subtitle="Most played songs"
                        action={
                            <a
                                href="/songs/trending"
                                className="text-sm tracking-tight hover:underline"
                            >
                                View All
                            </a>
                        }
                    />
                    <SongGrid songs={trending} limit={10} />
                </section>
            )}

            {/* TRENDING ARTISTS SECTION */}
            {trendingArtists && trendingArtists.length > 0 && (
                <section>
                    <SectionHeader
                        title="Trending Artists"
                        subtitle="Popular artists this week"
                    />
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {trendingArtists.map((artist) => (
                            <ArtistCard
                                key={artist.artist}
                                artist={artist.artist}
                                imageUrl={artist.imageUrl}
                                songCount={artist.songCount}
                                totalPlays={artist.totalPlays}
                                onClick={() => navigate(`/artist/${encodeURIComponent(artist.artist)}`)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* ALBUMS SECTION */}
            {albums && albums.length > 0 && (
                <section>
                    <SectionHeader
                        title="Albums"
                        subtitle="Browse all albums"
                        action={
                            <a
                                href="/albums"
                                className="text-sm tracking-tight hover:underline"
                            >
                                View All
                            </a>
                        }
                    />
                    <AlbumGrid
                        albums={albums.slice(0, 10)}
                        onAlbumClick={(album: Album) => navigate(`/album/${album._id}`)}
                    />
                </section>
            )}
        </div>
    );
};

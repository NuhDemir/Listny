import { useNavigate } from 'react-router-dom';
import { SongCard } from '@/features/songs/components/SongCard';
import { AlbumCard } from '@/features/albums/components/AlbumCard';
import { ArtistCard } from '@/features/home/components/ArtistCard';
import { EmptyState } from '@/components/shared';
import { Search } from 'lucide-react';
import type { Song, Album } from '@/types';
import type { Artist } from '../api/search.service';

/**
 * SearchResults Component - Display search results
 * 
 * DESIGN:
 * - Grid layout matching home page
 * - Section headers
 * - Empty states
 * - Responsive design
 */

interface SearchResultsProps {
    songs?: Song[];
    albums?: Album[];
    artists?: Artist[];
    query: string;
    filter: 'all' | 'songs' | 'albums' | 'artists';
}

export const SearchResults = ({
    songs = [],
    albums = [],
    artists = [],
    query,
    filter,
}: SearchResultsProps) => {
    const navigate = useNavigate();
    const hasResults = songs.length > 0 || albums.length > 0 || artists.length > 0;

    if (!hasResults) {
        return (
            <EmptyState
                icon={<Search className="h-16 w-16" strokeWidth={1} />}
                title="No Results Found"
                description={`No results found for "${query}". Try different keywords.`}
            />
        );
    }

    return (
        <div className="space-y-16">
            {/* Songs Section */}
            {(filter === 'all' || filter === 'songs') && songs.length > 0 && (
                <section>
                    <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white">
                        Songs
                        <span className="ml-2 text-base font-normal text-black/40 dark:text-white/40">
                            ({songs.length})
                        </span>
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {songs.map((song) => (
                            <SongCard key={song._id} song={song} />
                        ))}
                    </div>
                </section>
            )}

            {/* Albums Section */}
            {(filter === 'all' || filter === 'albums') && albums.length > 0 && (
                <section>
                    <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white">
                        Albums
                        <span className="ml-2 text-base font-normal text-black/40 dark:text-white/40">
                            ({albums.length})
                        </span>
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {albums.map((album) => (
                            <AlbumCard
                                key={album._id}
                                album={album}
                                onClick={() => navigate(`/album/${album._id}`)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Artists Section */}
            {(filter === 'all' || filter === 'artists') && artists.length > 0 && (
                <section>
                    <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white">
                        Artists
                        <span className="ml-2 text-base font-normal text-black/40 dark:text-white/40">
                            ({artists.length})
                        </span>
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {artists.map((artist) => (
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
        </div>
    );
};

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { SearchBar, SearchFilters, SearchResults } from '../components';
import { LoadingScreen, ErrorMessage } from '@/components/shared';
import { Search as SearchIcon } from 'lucide-react';

/**
 * SearchPage - Swiss Style Search Interface
 * 
 * LAYOUT STRUCTURE:
 * 1. Search Bar (sticky)
 * 2. Filter Tabs
 * 3. Results Grid
 * 
 * FEATURES:
 * - URL-based search query
 * - Real-time search
 * - Filter by type
 * - Autocomplete suggestions
 * - Empty states
 * 
 * DESIGN:
 * - Follows home page design system
 * - Mathematical spacing
 * - Minimal, functional UI
 * - Responsive grid
 */

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('q') || '';

    const [query, setQuery] = useState(queryParam);
    const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'albums' | 'artists'>('all');
    const [debouncedQuery, setDebouncedQuery] = useState(queryParam);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            if (query) {
                setSearchParams({ q: query });
            } else {
                setSearchParams({});
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, setSearchParams]);

    const { data, isLoading, error } = useSearch(debouncedQuery, debouncedQuery.length > 0);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    // Initial empty state (no search yet)
    if (!debouncedQuery) {
        return (
            <div className="space-y-8">
                {/* Search Bar */}
                <div className="sticky top-0 z-10 bg-white pb-8 pt-4 dark:bg-black">
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        onSearch={handleSearch}
                        autoFocus
                    />
                </div>

                {/* Empty State */}
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <SearchIcon className="mx-auto mb-6 h-16 w-16 text-black/20 dark:text-white/20" strokeWidth={1} />
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                            Search for Music
                        </h2>
                        <p className="text-sm text-black/60 dark:text-white/60">
                            Find your favorite songs, albums, and artists
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="sticky top-0 z-10 bg-white pb-8 pt-4 dark:bg-black">
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        onSearch={handleSearch}
                    />
                </div>
                <LoadingScreen />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="space-y-8">
                <div className="sticky top-0 z-10 bg-white pb-8 pt-4 dark:bg-black">
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        onSearch={handleSearch}
                    />
                </div>
                <ErrorMessage
                    message="Failed to load search results"
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Search Bar - Sticky */}
            <div className="sticky top-0 z-10 bg-white pb-8 pt-4 dark:bg-black">
                <SearchBar
                    value={query}
                    onChange={setQuery}
                    onSearch={handleSearch}
                />
            </div>

            {/* Results Header */}
            <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight">
                    Search Results
                </h1>
                <p className="text-sm text-black/60 dark:text-white/60">
                    Found {data?.totalResults || 0} results for "{debouncedQuery}"
                </p>
            </div>

            {/* Filter Tabs */}
            <SearchFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={{
                    songs: data?.songs.length || 0,
                    albums: data?.albums.length || 0,
                    artists: data?.artists.length || 0,
                }}
            />

            {/* Results Grid */}
            <SearchResults
                songs={data?.songs}
                albums={data?.albums}
                artists={data?.artists}
                query={debouncedQuery}
                filter={activeFilter}
            />
        </div>
    );
};

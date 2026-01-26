import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import type { Song, Album } from '@/types';

/**
 * Home Service - API calls for home page
 * 
 * Modular service layer for home feature
 * All endpoints are isolated and testable
 */

interface Stats {
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalPlays: number;
}

interface TrendingArtist {
    artist: string;
    totalPlays: number;
    songCount: number;
    imageUrl: string;
}

interface GenreStat {
    genre: string;
    count: number;
    totalPlays: number;
}

interface RecentlyAdded {
    songs: Song[];
    albums: Album[];
}

export const homeService = {
    // Get all home data in parallel
    getHomeData: async () => {
        const [featured, latest, trending, albums, stats] = await Promise.all([
            apiClient.get<Song[]>(API_ENDPOINTS.SONGS.FEATURED),
            apiClient.get<Song[]>(API_ENDPOINTS.SONGS.LATEST),
            apiClient.get<Song[]>(API_ENDPOINTS.SONGS.TRENDING),
            apiClient.get<Album[]>(API_ENDPOINTS.ALBUMS.ALL),
            apiClient.get<Stats>(API_ENDPOINTS.STATS.ALL),
        ]);

        return {
            featured,
            latest,
            trending,
            albums,
            stats,
        };
    },

    // Individual endpoints
    getStats: () => apiClient.get<Stats>(API_ENDPOINTS.STATS.ALL),

    getTrendingArtists: () =>
        apiClient.get<TrendingArtist[]>('/stats/trending-artists'),

    getGenreStats: () =>
        apiClient.get<GenreStat[]>('/stats/genres'),

    getRecentlyAdded: () =>
        apiClient.get<RecentlyAdded>('/stats/recently-added'),
};

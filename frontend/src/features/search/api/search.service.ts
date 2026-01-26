import { apiClient } from '@/lib/api-client';
import type { Song, Album } from '@/types';

/**
 * Search Service - API calls for search functionality
 * 
 * Modular service layer for search feature
 * Follows the same pattern as home.service.ts
 */

export interface SearchResults {
    songs: Song[];
    albums: Album[];
    artists: Artist[];
    query: string;
    totalResults: number;
}

export interface Artist {
    artist: string;
    songCount: number;
    totalPlays: number;
    imageUrl: string;
}

export interface SearchSuggestions {
    songs: string[];
    artists: string[];
    albums: string[];
}

export const searchService = {
    // Search all content types
    searchAll: (query: string) =>
        apiClient.get<SearchResults>(`/search?q=${encodeURIComponent(query)}`),

    // Search specific content types
    searchSongs: (query: string) =>
        apiClient.get<Song[]>(`/search/songs?q=${encodeURIComponent(query)}`),

    searchAlbums: (query: string) =>
        apiClient.get<Album[]>(`/search/albums?q=${encodeURIComponent(query)}`),

    searchArtists: (query: string) =>
        apiClient.get<Artist[]>(`/search/artists?q=${encodeURIComponent(query)}`),

    // Get autocomplete suggestions
    getSuggestions: (query: string) =>
        apiClient.get<SearchSuggestions>(`/search/suggestions?q=${encodeURIComponent(query)}`),
};

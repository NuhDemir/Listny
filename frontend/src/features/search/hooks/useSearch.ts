import { useQuery } from '@tanstack/react-query';
import { searchService } from '../api/search.service';

/**
 * Search Hooks - React Query hooks for search
 * 
 * Follows the same pattern as useHomeData
 */

export const useSearch = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ['search', query],
        queryFn: () => searchService.searchAll(query),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useSearchSongs = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ['search', 'songs', query],
        queryFn: () => searchService.searchSongs(query),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
};

export const useSearchAlbums = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ['search', 'albums', query],
        queryFn: () => searchService.searchAlbums(query),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
};

export const useSearchArtists = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ['search', 'artists', query],
        queryFn: () => searchService.searchArtists(query),
        enabled: enabled && query.length > 0,
        staleTime: 1000 * 60 * 5,
    });
};

export const useSearchSuggestions = (query: string, enabled = true) => {
    return useQuery({
        queryKey: ['search', 'suggestions', query],
        queryFn: () => searchService.getSuggestions(query),
        enabled: enabled && query.length >= 2,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

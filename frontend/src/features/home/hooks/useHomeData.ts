import { useQuery } from '@tanstack/react-query';
import { homeService } from '../api/home.service';
import { songsService } from '@/features/songs/api/songs.service';

/**
 * Home Data Hooks
 * 
 * React Query hooks for home page data fetching
 * Optimized with parallel requests and caching
 */

export const useHomeData = () => {
    return useQuery({
        queryKey: ['home', 'all'],
        queryFn: homeService.getHomeData,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: homeService.getStats,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useTrendingArtists = () => {
    return useQuery({
        queryKey: ['stats', 'trending-artists'],
        queryFn: homeService.getTrendingArtists,
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
};

export const useTopCharts = () => {
    return useQuery({
        queryKey: ['songs', 'top-charts'],
        queryFn: songsService.getTopCharts,
        staleTime: 5 * 60 * 1000,
    });
};

export const useMadeForYou = () => {
    return useQuery({
        queryKey: ['songs', 'made-for-you'],
        queryFn: songsService.getMadeForYou,
        staleTime: 5 * 60 * 1000,
    });
};

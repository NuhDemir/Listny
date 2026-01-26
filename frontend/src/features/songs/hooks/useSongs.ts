import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/config/constants';
import { songsService } from '../api/songs.service';

export const useFeaturedSongs = () => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.FEATURED,
        queryFn: songsService.getFeatured,
    });
};

export const useLatestSongs = () => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.LATEST,
        queryFn: songsService.getLatest,
    });
};

export const useSongById = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.BY_ID(id),
        queryFn: () => songsService.getById(id),
        enabled: !!id,
    });
};

export const useSongsByArtist = (artist: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.BY_ARTIST(artist),
        queryFn: () => songsService.getByArtist(artist),
        enabled: !!artist,
    });
};

export const useSongsByAlbum = (albumId: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.BY_ALBUM(albumId),
        queryFn: () => songsService.getByAlbum(albumId),
        enabled: !!albumId,
    });
};

export const useTrendingSongs = () => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.TRENDING,
        queryFn: songsService.getTrending,
    });
};

export const useTopChartSongs = () => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.TOP_CHARTS,
        queryFn: songsService.getTopCharts,
    });
};

export const useMadeForYouSongs = () => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.MADE_FOR_YOU,
        queryFn: songsService.getMadeForYou,
    });
};

export const useSearchSongs = (query: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.SONGS.SEARCH(query),
        queryFn: () => songsService.search({ q: query }),
        enabled: query.length > 0,
    });
};

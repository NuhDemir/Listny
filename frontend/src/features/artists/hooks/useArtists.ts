import { useQuery } from '@tanstack/react-query';
import { artistsService } from '../api/artists.service';

export const useArtists = () => {
    return useQuery({
        queryKey: ['artists'],
        queryFn: () => artistsService.getAll(),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

export const useTrendingArtists = () => {
    return useQuery({
        queryKey: ['trending-artists'],
        queryFn: () => artistsService.getTrending(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useArtist = (artistName: string) => {
    return useQuery({
        queryKey: ['artist', artistName],
        queryFn: () => artistsService.getByName(artistName),
        enabled: !!artistName,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

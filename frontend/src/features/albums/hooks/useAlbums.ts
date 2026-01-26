import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/config/constants';
import { albumsService } from '../api/albums.service';

export const useAlbums = () => {
    return useQuery({
        queryKey: QUERY_KEYS.ALBUMS.ALL,
        queryFn: albumsService.getAll,
    });
};

export const useAlbumById = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.ALBUMS.BY_ID(id),
        queryFn: () => albumsService.getById(id),
        enabled: !!id,
    });
};

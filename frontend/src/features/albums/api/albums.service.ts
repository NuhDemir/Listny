import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import type { Album, Song } from '@/types';

/**
 * Albums Service - API calls for albums
 * 
 * Modular service layer following project patterns
 */

export interface AlbumDetail {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[]; // Populated songs
}

export const albumsService = {
    getAll: () => apiClient.get<Album[]>(API_ENDPOINTS.ALBUMS.ALL),

    getById: (id: string) => apiClient.get<AlbumDetail>(API_ENDPOINTS.ALBUMS.BY_ID(id)),
};

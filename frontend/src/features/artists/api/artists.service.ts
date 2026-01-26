import { apiClient } from '@/lib/api-client';
import type { Song, Album } from '@/types';

/**
 * Artists Service - API calls for artists
 * 
 * Modular service layer following project patterns
 */

export interface Artist {
    name: string;
    imageUrl: string;
    songCount: number;
    totalPlays: number;
}

export interface ArtistDetail {
    artist: {
        name: string;
        imageUrl: string;
        totalSongs: number;
        totalAlbums: number;
        totalPlays: number;
    };
    songs: Song[];
    albums: Album[];
    popularTracks: Song[];
}

export const artistsService = {
    getAll: () => apiClient.get<Artist[]>('/artists'),

    getTrending: () => apiClient.get<Artist[]>('/artists/trending'),

    getByName: (artistName: string) =>
        apiClient.get<ArtistDetail>(`/artists/${encodeURIComponent(artistName)}`),
};

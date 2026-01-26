import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import type { Song, SearchParams } from '@/types';

export const songsService = {
    getAll: () => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.ALL),

    getFeatured: () => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.FEATURED),

    getLatest: () => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.LATEST),

    getById: (id: string) => apiClient.get<Song>(API_ENDPOINTS.SONGS.BY_ID(id)),

    getByArtist: (artist: string) => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.BY_ARTIST(artist)),

    getByAlbum: (albumId: string) => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.BY_ALBUM(albumId)),

    getByGenre: (genre: string) => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.BY_GENRE(genre)),

    getByYear: (year: string) => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.BY_YEAR(year)),

    search: (params: SearchParams) =>
        apiClient.get<Song[]>(`${API_ENDPOINTS.SONGS.SEARCH}?q=${params.q}`),

    getTrending: () => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.TRENDING),

    getRandom: () => apiClient.get<Song>(API_ENDPOINTS.SONGS.RANDOM),

    getTopCharts: () => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.TOP_CHARTS),

    getMadeForYou: () => apiClient.get<Song[]>(API_ENDPOINTS.SONGS.MADE_FOR_YOU),
};

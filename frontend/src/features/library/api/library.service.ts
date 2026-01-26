import { apiClient } from '@/lib/api-client';
import type { Song, Album } from '@/types';

/**
 * Library Service - API calls for library feature
 * 
 * Modular service layer following home/search pattern
 */

export interface LibraryData {
    favoriteSongs: Song[];
    favoriteAlbums: Album[];
    favoriteArtists: FavoriteArtist[];
    recentlyPlayed: RecentlyPlayed[];
    playlists: Playlist[];
}

export interface FavoriteArtist {
    artist: string;
    songCount: number;
    imageUrl: string;
    songs: Song[];
}

export interface RecentlyPlayed {
    song: Song;
    playedAt: string;
}

export interface Playlist {
    _id: string;
    name: string;
    description: string;
    userId: string;
    songs: Song[];
    imageUrl: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePlaylistData {
    name: string;
    description?: string;
    isPublic?: boolean;
}

export interface UpdatePlaylistData {
    name?: string;
    description?: string;
    isPublic?: boolean;
}

export const libraryService = {
    // Get complete library
    getLibrary: () => apiClient.get<LibraryData>('/library'),

    // Favorite Songs
    addFavoriteSong: (songId: string) =>
        apiClient.post('/library/favorites/songs', { songId }),

    removeFavoriteSong: (songId: string) =>
        apiClient.delete(`/library/favorites/songs/${songId}`),

    // Favorite Albums
    addFavoriteAlbum: (albumId: string) =>
        apiClient.post('/library/favorites/albums', { albumId }),

    removeFavoriteAlbum: (albumId: string) =>
        apiClient.delete(`/library/favorites/albums/${albumId}`),

    // Favorite Artists
    addFavoriteArtist: (artistName: string) =>
        apiClient.post('/library/favorites/artists', { artistName }),

    removeFavoriteArtist: (artistName: string) =>
        apiClient.delete(`/library/favorites/artists/${encodeURIComponent(artistName)}`),

    // Recently Played
    addToRecentlyPlayed: (songId: string) =>
        apiClient.post('/library/recently-played', { songId }),

    // Playlists
    getPlaylists: () => apiClient.get<Playlist[]>('/library/playlists'),

    createPlaylist: (data: CreatePlaylistData) =>
        apiClient.post<Playlist>('/library/playlists', data),

    updatePlaylist: (playlistId: string, data: UpdatePlaylistData) =>
        apiClient.put<Playlist>(`/library/playlists/${playlistId}`, data),

    deletePlaylist: (playlistId: string) =>
        apiClient.delete(`/library/playlists/${playlistId}`),

    addSongToPlaylist: (playlistId: string, songId: string) =>
        apiClient.post(`/library/playlists/${playlistId}/songs`, { songId }),

    removeSongFromPlaylist: (playlistId: string, songId: string) =>
        apiClient.delete(`/library/playlists/${playlistId}/songs/${songId}`),
};

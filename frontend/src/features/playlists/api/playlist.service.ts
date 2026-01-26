import { apiClient } from '@/lib/api-client';
import type { Playlist } from '@/features/library/api/library.service';

/**
 * Playlist Service - API calls for playlist detail/edit
 * 
 * Modular service layer
 */

export const playlistService = {
    // Get playlist by ID
    getPlaylist: (playlistId: string) =>
        apiClient.get<Playlist>(`/library/playlists/${playlistId}`),

    // Already defined in library service, re-export for convenience
    updatePlaylist: (playlistId: string, data: { name?: string; description?: string; isPublic?: boolean }) =>
        apiClient.put<Playlist>(`/library/playlists/${playlistId}`, data),

    deletePlaylist: (playlistId: string) =>
        apiClient.delete(`/library/playlists/${playlistId}`),

    addSong: (playlistId: string, songId: string) =>
        apiClient.post(`/library/playlists/${playlistId}/songs`, { songId }),

    removeSong: (playlistId: string, songId: string) =>
        apiClient.delete(`/library/playlists/${playlistId}/songs/${songId}`),
};

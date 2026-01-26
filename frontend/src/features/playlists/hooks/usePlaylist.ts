import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistService } from '../api/playlist.service';

/**
 * Playlist Hooks - React Query hooks for playlist detail
 */

export const usePlaylist = (playlistId: string) => {
    return useQuery({
        queryKey: ['playlist', playlistId],
        queryFn: () => playlistService.getPlaylist(playlistId),
        enabled: !!playlistId && playlistId !== 'new',
        staleTime: 1000 * 60 * 5,
    });
};

export const useUpdatePlaylistDetail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, data }: { playlistId: string; data: any }) =>
            playlistService.updatePlaylist(playlistId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['playlist', variables.playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

export const useDeletePlaylistDetail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playlistId: string) => playlistService.deletePlaylist(playlistId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

export const useAddSongToPlaylistDetail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, songId }: { playlistId: string; songId: string }) =>
            playlistService.addSong(playlistId, songId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['playlist', variables.playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

export const useRemoveSongFromPlaylistDetail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, songId }: { playlistId: string; songId: string }) =>
            playlistService.removeSong(playlistId, songId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['playlist', variables.playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

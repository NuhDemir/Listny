import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryService, type CreatePlaylistData, type UpdatePlaylistData } from '../api/library.service';

/**
 * Library Hooks - React Query hooks for library
 * 
 * Follows home/search pattern
 */

export const useLibrary = () => {
    return useQuery({
        queryKey: ['library'],
        queryFn: () => libraryService.getLibrary(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const usePlaylists = () => {
    return useQuery({
        queryKey: ['playlists'],
        queryFn: () => libraryService.getPlaylists(),
        staleTime: 1000 * 60 * 5,
    });
};

// Favorite Songs Mutations
export const useAddFavoriteSong = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (songId: string) => libraryService.addFavoriteSong(songId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

export const useRemoveFavoriteSong = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (songId: string) => libraryService.removeFavoriteSong(songId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

// Combined hook for like button
export const useFavoriteSong = () => {
    const addFavorite = useAddFavoriteSong();
    const removeFavorite = useRemoveFavoriteSong();

    return {
        addFavorite,
        removeFavorite,
    };
};

// Favorite Albums Mutations
export const useAddFavoriteAlbum = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (albumId: string) => libraryService.addFavoriteAlbum(albumId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

export const useRemoveFavoriteAlbum = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (albumId: string) => libraryService.removeFavoriteAlbum(albumId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

// Favorite Artists Mutations
export const useAddFavoriteArtist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (artistName: string) => libraryService.addFavoriteArtist(artistName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

export const useRemoveFavoriteArtist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (artistName: string) => libraryService.removeFavoriteArtist(artistName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });
};

// Playlist Mutations
export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePlaylistData) => libraryService.createPlaylist(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};

export const useUpdatePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, data }: { playlistId: string; data: UpdatePlaylistData }) =>
            libraryService.updatePlaylist(playlistId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playlistId: string) => libraryService.deletePlaylist(playlistId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};

export const useAddSongToPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, songId }: { playlistId: string; songId: string }) =>
            libraryService.addSongToPlaylist(playlistId, songId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};

export const useRemoveSongFromPlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, songId }: { playlistId: string; songId: string }) =>
            libraryService.removeSongFromPlaylist(playlistId, songId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['library'] });
            queryClient.invalidateQueries({ queryKey: ['playlists'] });
        },
    });
};

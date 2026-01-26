import { Album } from './album.types';

export interface Song {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId?: string | Album;
    isFeatured?: boolean;
    playCount?: number;
    genre?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSongDto {
    title: string;
    artist: string;
    albumId?: string;
    duration: string;
    audioFile: File;
    imageFile: File;
}

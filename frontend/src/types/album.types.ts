export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateAlbumDto {
    title: string;
    artist: string;
    releaseDate: string;
}

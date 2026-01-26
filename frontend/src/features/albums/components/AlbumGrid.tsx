import { cn } from '@/lib/utils';
import { AlbumCard } from './AlbumCard';
import type { Album } from '@/types';

interface AlbumGridProps {
    albums: Album[];
    className?: string;
    onAlbumClick?: (album: Album) => void;
}

export const AlbumGrid = ({ albums, className, onAlbumClick }: AlbumGridProps) => {
    return (
        <div
            className={cn(
                'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4',
                className
            )}
        >
            {albums.map((album) => (
                <AlbumCard
                    key={album._id}
                    album={album}
                    onClick={() => onAlbumClick?.(album)}
                />
            ))}
        </div>
    );
};

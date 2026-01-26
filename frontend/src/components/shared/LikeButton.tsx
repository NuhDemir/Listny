import { Heart } from 'lucide-react';
import { useFavoriteSong } from '@/features/library/hooks/useLibrary';
import { useLibrary } from '@/features/library/hooks/useLibrary';
import type { Song } from '@/types';

/**
 * LikeButton - Swiss Style Like/Unlike Button
 * 
 * DESIGN:
 * - Heart icon (outline/filled)
 * - Minimal animation
 * - Dark/Light mode support
 * - Optimistic updates
 */

interface LikeButtonProps {
    song: Song;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showLabel?: boolean;
}

export const LikeButton = ({ song, size = 'md', className = '', showLabel = false }: LikeButtonProps) => {
    const { data: library } = useLibrary();
    const { addFavorite, removeFavorite } = useFavoriteSong();

    const isLiked = library?.favoriteSongs?.some((s: any) => s._id === song._id) || false;

    const handleToggleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            if (isLiked) {
                await removeFavorite.mutateAsync(song._id);
            } else {
                await addFavorite.mutateAsync(song._id);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
    };

    const iconSizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={addFavorite.isPending || removeFavorite.isPending}
            className={`flex ${sizeClasses[size]} items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 ${className}`}
            aria-label={isLiked ? 'Unlike song' : 'Like song'}
            title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                className={`${iconSizes[size]} transition-all ${isLiked
                        ? 'fill-red-500 text-red-500'
                        : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
                    }`}
                strokeWidth={1.5}
            />
            {showLabel && (
                <span className="ml-2 text-xs">
                    {isLiked ? 'Liked' : 'Like'}
                </span>
            )}
        </button>
    );
};

import { User, Camera } from 'lucide-react';
import { useRef } from 'react';
import { useUploadProfileImage } from '../hooks/useProfile';
import type { User as UserType } from '@/types';

/**
 * ProfileHeader - Swiss Style Profile Header
 * 
 * DESIGN:
 * - Large avatar with upload
 * - User info display
 * - Minimal, clean layout
 * - Dark/Light mode support
 */

interface ProfileHeaderProps {
    user: UserType;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadImage = useUploadProfileImage();

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await uploadImage.mutateAsync(file);
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    };

    return (
        <div className="flex items-center gap-8">
            {/* Avatar */}
            <div className="relative">
                <div className="h-32 w-32 overflow-hidden bg-black/5 dark:bg-white/5">
                    {user.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt={user.fullname}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <User className="h-16 w-16 text-black/20 dark:text-white/20" strokeWidth={1} />
                        </div>
                    )}
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleImageClick}
                    disabled={uploadImage.isPending}
                    className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center bg-black text-white transition-opacity hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-black"
                    aria-label="Upload profile picture"
                >
                    <Camera className="h-5 w-5" strokeWidth={1.5} />
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* User Info */}
            <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight">{user.fullname}</h1>
                <p className="mb-1 text-sm text-black/60 dark:text-white/60">@{user.username}</p>
                <p className="text-sm text-black/60 dark:text-white/60">{user.email}</p>
                {user.isAdmin && (
                    <span className="mt-2 inline-block border border-black px-2 py-1 text-xs tracking-tight dark:border-white">
                        ADMIN
                    </span>
                )}
            </div>
        </div>
    );
};

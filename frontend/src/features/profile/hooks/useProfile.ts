import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService, type UpdateProfileData, type ChangePasswordData } from '../api/profile.service';
import { useAuth } from '@/context';

/**
 * Profile Hooks - React Query hooks for profile
 * 
 * Follows home/search/library pattern
 */

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.getProfile(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { updateUser } = useAuth();

    return useMutation({
        mutationFn: (data: UpdateProfileData) => profileService.updateProfile(data),
        onSuccess: (updatedUser) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            updateUser(updatedUser);
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: ChangePasswordData) => profileService.changePassword(data),
    });
};

export const useUploadProfileImage = () => {
    const queryClient = useQueryClient();
    const { updateUser, user } = useAuth();

    return useMutation({
        mutationFn: (file: File) => profileService.uploadImage(file),
        onSuccess: (data) => {
            if (user) {
                const updatedUser = { ...user, imageUrl: data.imageUrl };
                updateUser(updatedUser);
                queryClient.invalidateQueries({ queryKey: ['profile'] });
            }
        },
    });
};

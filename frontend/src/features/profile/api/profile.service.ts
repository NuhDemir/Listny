import { apiClient } from '@/lib/api-client';
import type { User } from '@/types';

/**
 * Profile Service - API calls for profile feature
 * 
 * Modular service layer following home/search/library pattern
 */

export interface UpdateProfileData {
    fullname?: string;
    username?: string;
    email?: string;
    imageUrl?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const profileService = {
    // Get current user profile
    getProfile: () => apiClient.get<User>('/users/me'),

    // Update profile
    updateProfile: (data: UpdateProfileData) =>
        apiClient.put<User>('/users/me', data),

    // Change password
    changePassword: (data: ChangePasswordData) =>
        apiClient.put('/users/me/password', data),

    // Upload profile image
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return apiClient.post<{ imageUrl: string }>('/users/me/image', formData);
    },
};

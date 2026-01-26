import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/constants';
import type { User } from '@/types';

interface LoginRequest {
    emailOrUsername: string;
    password: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullname: string;
}

interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
}

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
    },

    logout: async (): Promise<void> => {
        return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    getCurrentUser: async (token: string): Promise<User> => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}${API_ENDPOINTS.AUTH.ME}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get current user');
        }

        const data = await response.json();
        return data.user;
    },
};

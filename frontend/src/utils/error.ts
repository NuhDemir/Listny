import type { ApiError } from '@/types';

export const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') {
        return error;
    }

    if (error && typeof error === 'object') {
        const apiError = error as ApiError;
        if (apiError.message) {
            return apiError.message;
        }
        if (apiError.error) {
            return apiError.error;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Bir hata oluştu';
};

export const handleApiError = (error: unknown): void => {
    const message = getErrorMessage(error);
    console.error('API Error:', message);
    // Burada toast notification eklenebilir
};

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public code?: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

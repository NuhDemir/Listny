import { env } from '@/config/env';
import type { ApiError } from '@/types';

export interface ApiClientConfig {
    getToken?: () => Promise<string | null>;
}

class ApiClient {
    private baseUrl: string;
    private getToken?: () => Promise<string | null>;

    constructor(config?: ApiClientConfig) {
        this.baseUrl = env.apiBaseUrl;
        this.getToken = config?.getToken || this.getTokenFromStorage;
    }

    private async getTokenFromStorage(): Promise<string | null> {
        return localStorage.getItem('auth_token');
    }

    private async getHeaders(customHeaders?: HeadersInit): Promise<HeadersInit> {
        const headers: Record<string, string> = {
            ...(customHeaders as Record<string, string>),
        };

        if (this.getToken) {
            const token = await this.getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error: ApiError = {
                message: response.statusText,
                statusCode: response.status,
            };

            try {
                const errorData = await response.json();
                error.message = errorData.message || errorData.error || error.message;
                error.error = errorData.error;
            } catch {
                // Response body is not JSON
            }

            throw error;
        }

        return response.json();
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const headers = await this.getHeaders(options?.headers);

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            method: 'GET',
            headers,
        });

        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
        const isFormData = data instanceof FormData;
        const headers = await this.getHeaders(
            isFormData ? options?.headers : { 'Content-Type': 'application/json', ...options?.headers }
        );

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            method: 'POST',
            headers,
            body: isFormData ? data : JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
        const headers = await this.getHeaders({
            'Content-Type': 'application/json',
            ...options?.headers,
        });

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const headers = await this.getHeaders(options?.headers);

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            method: 'DELETE',
            headers,
        });

        return this.handleResponse<T>(response);
    }

    async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
        const headers = await this.getHeaders({
            'Content-Type': 'application/json',
            ...options?.headers,
        });

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            method: 'PATCH',
            headers,
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }
}

export const apiClient = new ApiClient();

export const createApiClient = (config: ApiClientConfig) => {
    return new ApiClient(config);
};

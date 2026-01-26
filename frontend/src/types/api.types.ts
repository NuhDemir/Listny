export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface ApiError {
    message: string;
    statusCode: number;
    error?: string;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface SearchParams {
    q: string;
}

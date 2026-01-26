export interface User {
    id: string;
    username: string;
    email: string;
    fullname: string;
    imageUrl?: string;
    isAdmin?: boolean;
}

export interface AuthCallbackDto {
    userId: string;
    email: string;
}

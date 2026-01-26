export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
};

export const validateAudioFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'];
    const maxSize = 10; // 10MB

    if (!isValidFileType(file, allowedTypes)) {
        return { valid: false, error: 'Geçersiz dosya formatı. MP3, WAV veya OGG formatında olmalı.' };
    }

    if (!isValidFileSize(file, maxSize)) {
        return { valid: false, error: `Dosya boyutu ${maxSize}MB'dan küçük olmalı.` };
    }

    return { valid: true };
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5; // 5MB

    if (!isValidFileType(file, allowedTypes)) {
        return { valid: false, error: 'Geçersiz dosya formatı. JPEG, PNG veya WebP formatında olmalı.' };
    }

    if (!isValidFileSize(file, maxSize)) {
        return { valid: false, error: `Dosya boyutu ${maxSize}MB'dan küçük olmalı.` };
    }

    return { valid: true };
};

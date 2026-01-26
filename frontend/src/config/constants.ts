export const APP_NAME = 'Music App';

export const ROUTES = {
    HOME: '/',
    SONGS: '/songs',
    ALBUMS: '/albums',
    ARTISTS: '/artists',
    SEARCH: '/search',
    ADMIN: '/admin',
    PROFILE: '/profile',
    LOGIN: '/login',
} as const;

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
    },
    USERS: {
        ME: '/users',
    },
    SONGS: {
        ALL: '/songs',
        FEATURED: '/songs/featured',
        LATEST: '/songs/latest',
        BY_ID: (id: string) => `/songs/${id}`,
        BY_ARTIST: (artist: string) => `/songs/artist/${artist}`,
        BY_ALBUM: (albumId: string) => `/songs/album/${albumId}`,
        BY_GENRE: (genre: string) => `/songs/genre/${genre}`,
        BY_YEAR: (year: string) => `/songs/year/${year}`,
        SEARCH: '/songs/search',
        TRENDING: '/songs/trending',
        RANDOM: '/songs/random',
        TOP_CHARTS: '/songs/top-charts',
        MADE_FOR_YOU: '/songs/made-for-you',
    },
    ALBUMS: {
        ALL: '/albums',
        BY_ID: (id: string) => `/albums/${id}`,
    },
    ADMIN: {
        STATUS: '/admin/status',
        SONGS: '/admin/songs',
        DELETE_SONG: (id: string) => `/admin/songs/${id}`,
        ALBUMS: '/admin/albums',
        DELETE_ALBUM: (id: string) => `/admin/albums/${id}`,
    },
    STATS: {
        ALL: '/stats',
        TRENDING_ARTISTS: '/stats/trending-artists',
        GENRES: '/stats/genres',
        RECENTLY_ADDED: '/stats/recently-added',
    },
} as const;

export const QUERY_KEYS = {
    SONGS: {
        ALL: ['songs'],
        FEATURED: ['songs', 'featured'],
        LATEST: ['songs', 'latest'],
        BY_ID: (id: string) => ['songs', id],
        BY_ARTIST: (artist: string) => ['songs', 'artist', artist],
        BY_ALBUM: (albumId: string) => ['songs', 'album', albumId],
        BY_GENRE: (genre: string) => ['songs', 'genre', genre],
        BY_YEAR: (year: string) => ['songs', 'year', year],
        SEARCH: (query: string) => ['songs', 'search', query],
        TRENDING: ['songs', 'trending'],
        RANDOM: ['songs', 'random'],
        TOP_CHARTS: ['songs', 'top-charts'],
        MADE_FOR_YOU: ['songs', 'made-for-you'],
    },
    ALBUMS: {
        ALL: ['albums'],
        BY_ID: (id: string) => ['albums', id],
    },
    ADMIN: {
        STATUS: ['admin', 'status'],
    },
    STATS: {
        ALL: ['stats'],
    },
} as const;

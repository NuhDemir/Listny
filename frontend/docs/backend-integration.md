# Backend Integration Guide

## 📋 Genel Bakış

Bu doküman, frontend uygulamasının backend API'leri ile nasıl entegre edileceğini açıklar. Backend, Express.js ve MongoDB kullanarak RESTful API'ler sunar ve Clerk ile authentication sağlar.

## 🔗 Backend Endpoint Yapısı

### Base URL
```
Development: http://localhost:5000/api
Production: [PRODUCTION_URL]/api
```

### Authentication
Backend, Clerk authentication kullanır. Tüm korumalı endpoint'ler için Authorization header'ı gereklidir:
```
Authorization: Bearer <CLERK_TOKEN>
```

---

## 📚 API Endpoints

### 1. Authentication (`/api/auth`)

#### POST `/api/auth/callback`
Clerk authentication callback endpoint'i.

**Request Body:**
```json
{
  "userId": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string"
  }
}
```

---

### 2. Users (`/api/users`)

#### GET `/api/users`
Kullanıcı bilgilerini getirir (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "User route with GET method."
}
```

---

### 3. Songs (`/api/songs`)

#### GET `/api/songs`
Tüm şarkıları getirir (Admin Only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "artist": "string",
    "imageUrl": "string",
    "audioUrl": "string",
    "duration": "number",
    "albumId": "string | object",
    "isFeatured": "boolean",
    "playCount": "number",
    "genre": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### GET `/api/songs/featured`
Öne çıkan şarkıları getirir.

**Response:** Song array

#### GET `/api/songs/latest`
Son eklenen şarkıları getirir.

**Response:** Song array

#### GET `/api/songs/:id`
ID'ye göre şarkı getirir.

**Parameters:**
- `id` (path): Şarkı ID'si

**Response:** Single Song object

#### GET `/api/songs/artist/:artistId`
Sanatçıya göre şarkıları getirir.

**Parameters:**
- `artistId` (path): Sanatçı adı

**Response:** Song array

#### GET `/api/songs/album/:albumId`
Albüme göre şarkıları getirir.

**Parameters:**
- `albumId` (path): Albüm ID'si

**Response:** Song array

#### GET `/api/songs/search?q=query`
Şarkılarda arama yapar.

**Query Parameters:**
- `q` (required): Arama terimi

**Response:** Song array

#### GET `/api/songs/genre/:genre`
Türe göre şarkıları getirir.

**Parameters:**
- `genre` (path): Şarkı türü

**Response:** Song array

#### GET `/api/songs/year/:year`
Yıla göre şarkıları getirir.

**Parameters:**
- `year` (path): Yıl

**Response:** Song array

#### GET `/api/songs/trending`
Trend olan şarkıları getirir.

**Response:** Song array

#### GET `/api/songs/random`
Rastgele bir şarkı getirir.

**Response:** Single Song object

#### GET `/api/songs/top-charts`
En popüler şarkıları getirir.

**Response:** Song array

#### GET `/api/songs/made-for-you`
Kullanıcıya özel şarkı önerileri getirir (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Song array

---

### 4. Albums (`/api/albums`)

#### GET `/api/albums`
Tüm albümleri getirir.

**Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "artist": "string",
    "imageUrl": "string",
    "releaseYear": "number",
    "songs": ["songId1", "songId2"],
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### GET `/api/albums/:id`
ID'ye göre albüm getirir.

**Parameters:**
- `id` (path): Albüm ID'si

**Response:** Single Album object

---

### 5. Admin (`/api/admin`)

**Not:** Tüm admin endpoint'leri authentication ve admin yetkisi gerektirir.

**Headers:**
```
Authorization: Bearer <token>
```

#### GET `/api/admin/status`
Admin route durumunu kontrol eder.

**Response:**
```json
{
  "message": "Admin routes working fine!"
}
```

#### POST `/api/admin/songs`
Yeni şarkı oluşturur.

**Content-Type:** `multipart/form-data`

**Request Body:**
```
title: string (required)
artist: string (required)
albumId: string (optional)
duration: string (required)
audioFile: File (required)
imageFile: File (required)
```

**Response:**
```json
{
  "success": true,
  "song": { /* Song object */ }
}
```

#### DELETE `/api/admin/songs/:id`
Şarkıyı siler.

**Parameters:**
- `id` (path): Şarkı ID'si

**Response:**
```json
{
  "success": true,
  "message": "Song deleted successfully"
}
```

#### POST `/api/admin/albums`
Yeni albüm oluşturur.

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "string",
  "artist": "string",
  "releaseDate": "date"
}
```

**Response:**
```json
{
  "success": true,
  "album": { /* Album object */ }
}
```

#### DELETE `/api/admin/albums/:id`
Albümü siler.

**Parameters:**
- `id` (path): Albüm ID'si

**Response:**
```json
{
  "success": true,
  "message": "Album deleted successfully"
}
```

---

### 6. Stats (`/api/stats`)

#### GET `/api/stats`
İstatistikleri getirir.

**Response:**
```json
{
  "message": "Stats route"
}
```

---

## 🛠️ Frontend Implementation Strategy

### 1. API Client Setup (`/src/lib/api-client.ts`)

```typescript
import { useAuth } from '@clerk/clerk-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const createApiClient = (getToken: () => Promise<string | null>) => {
  const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken();
    
    const headers: HeadersInit = {
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  };

  return {
    get: (endpoint: string) => request(endpoint, { method: 'GET' }),
    post: (endpoint: string, data: any) => 
      request(endpoint, { 
        method: 'POST', 
        body: data instanceof FormData ? data : JSON.stringify(data) 
      }),
    put: (endpoint: string, data: any) => 
      request(endpoint, { 
        method: 'PUT', 
        body: JSON.stringify(data) 
      }),
    delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
  };
};
```

### 2. Feature-Based Service Structure

Her feature için ayrı service dosyaları:

- `/src/features/songs/api/songs.service.ts`
- `/src/features/albums/api/albums.service.ts`
- `/src/features/admin/api/admin.service.ts`
- `/src/features/auth/api/auth.service.ts`

### 3. Type Definitions (`/src/types/`)

```typescript
// types/song.types.ts
export interface Song {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId?: string | Album;
  isFeatured?: boolean;
  playCount?: number;
  genre?: string;
  createdAt: string;
  updatedAt: string;
}

// types/album.types.ts
export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: string[];
  createdAt: string;
  updatedAt: string;
}
```

### 4. React Query Integration

```typescript
// features/songs/hooks/useSongs.ts
import { useQuery } from '@tanstack/react-query';
import { songsService } from '../api/songs.service';

export const useFeaturedSongs = () => {
  return useQuery({
    queryKey: ['songs', 'featured'],
    queryFn: () => songsService.getFeatured(),
  });
};
```

---

## 🔐 Authentication Flow

1. Kullanıcı Clerk ile giriş yapar
2. Clerk token'ı alınır (`useAuth().getToken()`)
3. Her API isteğinde token Authorization header'ına eklenir
4. Backend token'ı doğrular ve kullanıcı bilgilerini döner

---

## 🚀 Environment Variables

Frontend `.env` dosyası:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

---

## 📦 Recommended Packages

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.x.x",
    "axios": "^1.x.x" // veya native fetch
  }
}
```

---

## 🎯 Best Practices

1. **Error Handling**: Tüm API çağrılarında try-catch kullan
2. **Loading States**: React Query'nin loading state'lerini kullan
3. **Caching**: React Query ile otomatik caching
4. **Type Safety**: TypeScript interface'lerini kullan
5. **Environment Variables**: API URL'lerini env'den al
6. **Token Refresh**: Clerk otomatik token refresh sağlar
7. **Retry Logic**: React Query'nin retry mekanizmasını kullan

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution:** Backend'de CORS ayarlarını kontrol et

### Issue: 401 Unauthorized
**Solution:** Token'ın doğru gönderildiğinden emin ol

### Issue: 403 Forbidden
**Solution:** Admin endpoint'leri için admin yetkisi gerekli

---

## 📝 Example Usage

```typescript
// Component içinde
import { useFeaturedSongs } from '@/features/songs/hooks/useSongs';

function FeaturedSongs() {
  const { data: songs, isLoading, error } = useFeaturedSongs();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {songs?.map(song => (
        <SongCard key={song._id} song={song} />
      ))}
    </div>
  );
}
```

---

## 🔄 API Response Patterns

### Success Response
```json
{
  "success": true,
  "data": { /* ... */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

---

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Swagger API Docs](http://localhost:5000/api-docs) (Development)

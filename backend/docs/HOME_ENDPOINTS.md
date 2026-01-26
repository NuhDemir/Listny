# Home Page Backend Endpoints

## 📋 Overview

Backend endpoints hazır ve home sayfası için gerekli tüm veriler sağlanıyor.

---

## 🎵 Songs Endpoints

### Featured Songs
```
GET /api/songs/featured
```
**Response:**
- 10 öne çıkan şarkı
- `isFeatured: true` olanlar
- `playCount` sıralı
- Album bilgisi populate edilmiş

### Latest Songs
```
GET /api/songs/latest
```
**Response:**
- Son eklenen 10 şarkı
- `createdAt` sıralı (en yeni → en eski)
- Album bilgisi populate edilmiş

### Trending Songs
```
GET /api/songs/trending
```
**Response:**
- En çok dinlenen 10 şarkı
- `playCount` sıralı
- Album bilgisi populate edilmiş

### Top Charts
```
GET /api/songs/top-charts
```
**Response:**
- Top 10 chart şarkıları
- `playCount` ve `createdAt` sıralı
- Album bilgisi populate edilmiş

### Made For You (Protected)
```
GET /api/songs/made-for-you
Authorization: Bearer <token>
```
**Response:**
- Kullanıcıya özel 10 şarkı
- Şu an için `playCount` bazlı
- İleride user preferences eklenebilir

---

## 💿 Albums Endpoints

### All Albums
```
GET /api/albums
```
**Response:**
- Tüm albümler
- Sıralama yok (default)

### Album by ID
```
GET /api/albums/:id
```
**Response:**
- Tek albüm
- Songs populate edilmiş

---

## 📊 Stats Endpoints (NEW)

### General Statistics
```
GET /api/stats
```
**Response:**
```json
{
  "totalSongs": 150,
  "totalAlbums": 25,
  "totalUsers": 1000,
  "totalPlays": 50000
}
```

### Trending Artists
```
GET /api/stats/trending-artists
```
**Response:**
```json
[
  {
    "artist": "Artist Name",
    "totalPlays": 5000,
    "songCount": 10,
    "imageUrl": "https://..."
  }
]
```
- Top 10 artist
- `totalPlays` sıralı
- İlk şarkının cover'ı kullanılır

### Genre Statistics
```
GET /api/stats/genres
```
**Response:**
```json
[
  {
    "genre": "Pop",
    "count": 50,
    "totalPlays": 10000
  }
]
```
- Top 10 genre
- Şarkı sayısına göre sıralı

### Recently Added
```
GET /api/stats/recently-added
```
**Response:**
```json
{
  "songs": [...],  // Son 5 şarkı
  "albums": [...]  // Son 5 albüm
}
```

---

## 🏗️ Home Page Data Structure

Home sayfası için önerilen veri yapısı:

```javascript
{
  // Hero Section
  featuredSongs: [],      // GET /api/songs/featured
  
  // Quick Stats
  stats: {},              // GET /api/stats
  
  // Content Sections
  latestSongs: [],        // GET /api/songs/latest
  trendingSongs: [],      // GET /api/songs/trending
  topCharts: [],          // GET /api/songs/top-charts
  madeForYou: [],         // GET /api/songs/made-for-you (protected)
  
  // Albums Section
  albums: [],             // GET /api/albums
  
  // Additional
  trendingArtists: [],    // GET /api/stats/trending-artists
  recentlyAdded: {},      // GET /api/stats/recently-added
}
```

---

## 🔄 Data Flow

### 1. Initial Load (Parallel Requests)
```javascript
Promise.all([
  fetch('/api/songs/featured'),
  fetch('/api/songs/latest'),
  fetch('/api/songs/trending'),
  fetch('/api/albums'),
  fetch('/api/stats'),
])
```

### 2. Protected Content (After Auth)
```javascript
fetch('/api/songs/made-for-you', {
  headers: { Authorization: `Bearer ${token}` }
})
```

### 3. Additional Data (Lazy Load)
```javascript
// Scroll veya tab değişiminde
fetch('/api/stats/trending-artists')
fetch('/api/stats/recently-added')
```

---

## 📦 Response Models

### Song Object
```typescript
{
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId?: Album | string;
  isFeatured?: boolean;
  playCount?: number;
  genre?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Album Object
```typescript
{
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: string[] | Song[];
  createdAt: string;
  updatedAt: string;
}
```

---

## ✅ Backend Status

- ✅ Song endpoints hazır
- ✅ Album endpoints hazır
- ✅ Stats endpoints oluşturuldu
- ✅ Models doğru yapılandırılmış
- ✅ Populate işlemleri çalışıyor
- ✅ Error handling mevcut
- ✅ Swagger documentation var

---

## 🚀 Next Steps

1. ✅ Backend hazır
2. ⏳ Frontend home feature oluşturulacak
3. ⏳ React Query hooks eklenecek
4. ⏳ Swiss Style components tasarlanacak
5. ⏳ Home page layout kurulacak

---

## 🔧 Testing

### Test Endpoints
```bash
# Featured Songs
curl http://localhost:5000/api/songs/featured

# Stats
curl http://localhost:5000/api/stats

# Trending Artists
curl http://localhost:5000/api/stats/trending-artists
```

### Swagger UI
```
http://localhost:5000/api-docs
```

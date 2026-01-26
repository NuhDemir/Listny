# 🌱 Enhanced Database Seed (V2)

## ✅ Sorun Çözüldü: 401 Unauthorized

### Sorun
Library endpoint'leri `req.user._id` kullanıyordu ama `protectRoute` middleware'i sadece `req.userId` set ediyordu.

### Çözüm
`protectRoute` middleware'i güncellendi:
- Artık user'ı database'den çekiyor
- `req.user` objesini set ediyor
- Password field'ı exclude ediyor

**Dosya**: `backend/src/middleware/auth.middleware.js`

```javascript
// Before
req.userId = decoded.userId;

// After
const user = await User.findById(decoded.userId).select("-password");
req.userId = decoded.userId;
req.user = user; // ✅ Added
```

---

## 🚀 Enhanced Seed Script (V2)

### Özellikler

**Seed V1 vs V2 Karşılaştırma**:

| Feature | V1 | V2 |
|---------|----|----|
| Albums | 5 | 10 |
| Songs | 20 | 50 |
| Users | 0 | 5 |
| Libraries | 0 | 5 |
| Playlists | 0 | 10 |
| Test Accounts | ❌ | ✅ |
| Library Data | ❌ | ✅ |

### İçerik

#### 📀 10 Albüm
1. Midnight Dreams - Luna Eclipse (2023)
2. Electric Vibes - DJ Neon (2024)
3. Acoustic Sessions - Sarah Mitchell (2023)
4. Urban Beats - Metro Sound (2024)
5. Classical Harmony - Orchestra Prime (2022)
6. Jazz Nights - Smooth Quartet (2023)
7. Rock Legends - Thunder Strike (2022)
8. Pop Sensation - Starlight (2024)
9. Indie Vibes - The Wanderers (2023)
10. Electronic Dreams - Synth Wave (2024)

#### 🎵 50 Şarkı
- Her albümde 5 şarkı
- 10 farklı tür (Electronic, EDM, Acoustic, Hip Hop, Classical, Jazz, Rock, Pop, Indie, Synthwave)
- Random featured songs (%30 şans)
- Random play counts (1,000 - 51,000)
- Gerçek ses dosyaları (SoundHelix)
- Yüksek kaliteli görseller (Unsplash)

#### 👥 5 Test Kullanıcısı
1. **john@example.com** / password123
2. **jane@example.com** / password123
3. **mike@example.com** / password123
4. **sarah@example.com** / password123
5. **admin@example.com** / admin123 (Admin)

#### 📚 5 Kütüphane
Her kullanıcı için:
- 5-10 favori şarkı
- 2-4 favori albüm
- 2-4 favori sanatçı
- 10-15 son dinlenen şarkı (son 7 gün)
- Playlist'ler

#### 📋 10 Playlist
1. Workout Mix
2. Chill Vibes
3. Party Hits
4. Study Focus
5. Road Trip
6. Morning Coffee
7. Late Night
8. Feel Good
9. Throwback
10. Discover Weekly

Her playlist:
- 5-15 şarkı içerir
- Random public/private
- Kullanıcılara dağıtılmış
- Açıklama ile birlikte

---

## 🚀 Kullanım

### Seçenek 1: Batch Dosyası (Kolay)
```bash
cd backend
seed-database-v2.bat
```

### Seçenek 2: NPM Komutu
```bash
cd backend
npm run seed-v2
```

### Seçenek 3: Node Komutu
```bash
cd backend
node src/scripts/seed-v2.js
```

---

## 📊 Seed Çıktısı

```
🌱 Starting enhanced database seeding (V2)...
✅ Connected to MongoDB
🗑️  Clearing existing data...
✅ Existing data cleared
📀 Creating albums...
✅ Created 10 albums
🎵 Creating songs...
✅ Created 50 songs
🔗 Linking songs to albums...
✅ Songs linked to albums
👥 Creating users...
✅ Created 5 users
📚 Creating user libraries...
✅ User libraries created
📋 Creating playlists...
✅ Created 10 playlists

📊 Seeding Statistics:
   Albums: 10
   Songs: 50
   Users: 5
   Libraries: 5
   Playlists: 10
   Featured Songs: 15
   Genres: 10

✨ Enhanced database seeding completed successfully!

🎵 Sample data:
   - Top trending: [Song Name]
   - Total play count: 1,234,567
   - Average songs per playlist: 10

👤 Test Users:
   - john@example.com / password123
   - jane@example.com / password123
   - mike@example.com / password123
   - sarah@example.com / password123
   - admin@example.com / admin123 (Admin)
```

---

## 🧪 Test Senaryoları

### 1. Login Test
```bash
# Frontend'de login olun
Email: john@example.com
Password: password123
```

### 2. Library Test
```bash
# Login olduktan sonra
http://localhost:5173/library

# Göreceksiniz:
- Favorite Songs (5-10 şarkı)
- Favorite Albums (2-4 albüm)
- Favorite Artists (2-4 sanatçı)
- Playlists (2-3 playlist)
- Recently Played (10-15 şarkı)
```

### 3. API Test
```bash
# Get library (authentication required)
GET http://localhost:5000/api/library
Headers: Authorization: Bearer <your-token>

# Response:
{
  "favoriteSongs": [...],
  "favoriteAlbums": [...],
  "favoriteArtists": [...],
  "recentlyPlayed": [...],
  "playlists": [...]
}
```

---

## 🎯 Veri Özellikleri

### Gerçekçi Veriler
- ✅ Random favorite counts (5-10 songs, 2-4 albums, 2-4 artists)
- ✅ Random play counts (1K-51K)
- ✅ Random featured songs (%30)
- ✅ Random playlist sizes (5-15 songs)
- ✅ Random public/private playlists
- ✅ Recently played with timestamps (last 7 days)
- ✅ Bcrypt hashed passwords
- ✅ Real avatar images (pravatar.cc)

### Dağılım
```
Songs per Album:     5
Albums:              10
Total Songs:         50
Users:               5
Playlists:           10
Avg Playlist Size:   10 songs
Featured Songs:      ~15 (30%)
```

---

## 🔧 Teknik Detaylar

### Password Hashing
```javascript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(userData.password, salt);
```

### Library Creation
```javascript
await Library.create({
  userId: user._id,
  favoriteSongs: [randomSongIds],
  favoriteAlbums: [randomAlbumIds],
  favoriteArtists: [randomArtistNames],
  recentlyPlayed: [{ songId, playedAt }],
  playlists: [playlistIds],
});
```

### Playlist Creation
```javascript
const playlist = await Playlist.create({
  name: "Workout Mix",
  description: "My workout mix collection",
  userId: user._id,
  songs: [randomSongIds],
  isPublic: true/false,
});
```

---

## ⚠️ Önemli Notlar

1. **Veri Silinir**: Seed script tüm mevcut verileri siler
2. **MongoDB Gerekli**: MongoDB'nin çalışıyor olması gerekir
3. **Environment**: `.env` dosyasında `MONGODB_URI` tanımlı olmalı
4. **Test Accounts**: Production'da bu hesapları kullanmayın
5. **Passwords**: Test hesapları basit şifreler kullanır

---

## 🆚 V1 vs V2 Karşılaştırma

### Seed V1 (Basit)
```
✅ 5 Albums
✅ 20 Songs
❌ No Users
❌ No Libraries
❌ No Playlists
❌ No Test Accounts
```

### Seed V2 (Gelişmiş)
```
✅ 10 Albums
✅ 50 Songs
✅ 5 Users
✅ 5 Libraries (with favorites)
✅ 10 Playlists
✅ Test Accounts
✅ Recently Played
✅ Realistic Data
```

---

## 📝 Değişiklik Özeti

### Yeni Dosyalar
1. ✨ `backend/src/scripts/seed-v2.js` - Enhanced seed script
2. ✨ `backend/seed-database-v2.bat` - Windows batch file
3. ✨ `SEED_V2_README.md` - This documentation

### Değiştirilen Dosyalar
1. ✏️ `backend/src/middleware/auth.middleware.js` - Fixed 401 error
2. ✏️ `backend/package.json` - Added seed-v2 script

---

## 🎉 Sonuç

✅ **401 Hatası**: Düzeltildi (auth middleware güncellendi)
✅ **Seed V2**: 50 şarkı, 10 albüm, 5 kullanıcı, 10 playlist
✅ **Test Accounts**: 5 kullanıcı ile test edebilirsiniz
✅ **Library Data**: Her kullanıcının kütüphanesi dolu
✅ **Realistic Data**: Gerçekçi play counts, favorites, playlists

**Artık library sayfasını test edebilirsiniz!** 📚

---

## 🔗 İlgili Dosyalar

- `backend/src/scripts/seed-v2.js` - Enhanced seed script
- `backend/src/middleware/auth.middleware.js` - Fixed auth middleware
- `backend/seed-database-v2.bat` - Windows batch file
- `backend/package.json` - NPM scripts

---

**Hazırlayan**: Kiro AI Assistant
**Tarih**: 26 Ocak 2026
**Durum**: ✅ Tamamlandı ve Test Edilmeye Hazır

# 🎵 Dataset Import Rehberi

Bu script, Spotify Tracks Dataset'inden 25,000 şarkıyı MongoDB veritabanınıza import eder.

## 📋 Gereksinimler

- ✅ `backend/tmp/dataset.csv` dosyası mevcut olmalı
- ✅ MongoDB bağlantısı çalışır durumda olmalı
- ✅ `.env` dosyasında `MONGODB_URI` tanımlı olmalı

## 🚀 Kullanım

### Windows:
```bash
cd backend
import-dataset.bat
```

### Manuel Çalıştırma:
```bash
cd backend
npm install csv-parser
node src/scripts/import-dataset.js
```

## 📊 Import Detayları

### Veri Yapısı:
- **25,000 şarkı** import edilir
- **Otomatik albüm oluşturma**: Şarkılar albümlerine göre gruplandırılır
- **Gerçek audio URL'leri**: Free Music Archive'dan genre'ye göre örnek müzikler
- **Albüm kapakları**: Unsplash'ten yüksek kaliteli görseller

### Model Eşleştirmesi:

#### Song Model:
- `title` ← track_name
- `artist` ← artists (ilk artist)
- `imageUrl` ← Albüm kapağı
- `audioUrl` ← Genre'ye göre FMA URL'i
- `duration` ← duration_ms (saniyeye çevrilir)
- `albumId` ← Otomatik oluşturulan album
- `genre` ← track_genre
- `playCount` ← Random (0-10000)
- `isFeatured` ← popularity > 80 ise true

#### Album Model:
- `title` ← album_name
- `artist` ← artists (ilk artist)
- `imageUrl` ← Random Unsplash görseli
- `releaseYear` ← Random (2020-2024)
- `songs[]` ← İlgili şarkılar

## 🎼 Audio URL'leri

Script, her genre için Free Music Archive'dan gerçek MP3 dosyaları kullanır:

- **acoustic**: Acoustic Breeze
- **pop**: Night Owl
- **rock**: Hachiko The Faithful Dog
- **hip-hop**: Its Near
- **jazz**: Upbeat Party
- **electronic**: Something Elated
- **classical**: Prelude and Action
- **r-n-b**: Bout It
- **indie**: Satin
- **edm**: Sega Sunset

## ⚡ Performans

- **Batch işleme**: 500'lük gruplar halinde
- **Süre**: ~2-5 dakika (25,000 şarkı için)
- **Bellek kullanımı**: Optimize edilmiş

## 📈 Import Sonrası

Script tamamlandığında şu bilgileri göreceksiniz:

```
✅ Import completed successfully!

📊 Summary:
   - Albums created: ~5,000
   - Songs created: 25,000
   - Featured songs: ~1,250
   - Genres: ~100+

📈 Database Stats:
   - Total songs in DB: 25,000
   - Total albums in DB: ~5,000
   - Total genres: 114
```

## 🔧 Sorun Giderme

### CSV bulunamadı:
```
❌ Error: ENOENT: no such file or directory
```
**Çözüm**: `backend/tmp/dataset.csv` dosyasının var olduğundan emin olun.

### MongoDB bağlantı hatası:
```
❌ MongoDB connection error
```
**Çözüm**: 
1. MongoDB'nin çalıştığından emin olun
2. `.env` dosyasında `MONGODB_URI` kontrol edin

### csv-parser hatası:
```
❌ Cannot find module 'csv-parser'
```
**Çözüm**: 
```bash
npm install csv-parser
```

## 🎯 Özellikler

✅ Otomatik albüm-şarkı ilişkilendirmesi
✅ Genre bazlı gerçek audio URL'leri
✅ Yüksek kaliteli albüm kapakları
✅ Featured şarkı işaretleme (popularity > 80)
✅ Batch işleme ile yüksek performans
✅ İlerleme göstergesi
✅ Detaylı istatistikler

## 📝 Notlar

- Mevcut tüm şarkı ve albümler silinir (clean import)
- Her çalıştırmada farklı albüm kapakları atanır
- Audio URL'leri gerçek, çalınabilir MP3 dosyalarıdır
- Dataset'te 114 farklı genre bulunmaktadır

## 🎨 Kullanılan Kaynaklar

- **Dataset**: Spotify Tracks Dataset (Kaggle)
- **Audio**: Free Music Archive (FMA)
- **Images**: Unsplash (Royalty-free)

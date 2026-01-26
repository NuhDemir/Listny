# 🌱 Database Seed Script

Bu script veritabanınıza örnek müzik verisi ekler.

## 📦 İçerik

Script aşağıdaki verileri ekler:

### Albümler (5 adet)
- Midnight Dreams - Luna Eclipse (2023)
- Electric Vibes - DJ Neon (2024)
- Acoustic Sessions - Sarah Mitchell (2023)
- Urban Beats - Metro Sound (2024)
- Classical Harmony - Orchestra Prime (2022)

### Şarkılar (20 adet)
- 15 şarkı albümlere bağlı (her albümde 3 şarkı)
- 5 bağımsız şarkı
- Farklı türler: Electronic, EDM, Acoustic, Hip Hop, Classical, Pop, Rock, Jazz, Reggae, Country
- Öne çıkan şarkılar (isFeatured: true)
- Farklı playCount değerleri (trending için)

## 🚀 Kullanım

### 1. Backend klasörüne gidin
```bash
cd backend
```

### 2. Seed script'ini çalıştırın
```bash
npm run seed
```

### 3. Çıktı
Script başarılı olursa şu bilgileri göreceksiniz:
- ✅ MongoDB bağlantısı
- 🗑️ Mevcut verilerin temizlenmesi
- 📀 Albümlerin oluşturulması
- 🎵 Şarkıların oluşturulması
- 🔗 Şarkıların albümlere bağlanması
- 📊 İstatistikler

## ⚠️ Önemli Notlar

1. **Mevcut Veriler**: Script çalıştırıldığında tüm mevcut şarkılar ve albümler silinir!
2. **MongoDB Bağlantısı**: `.env` dosyanızda `MONGODB_URI` tanımlı olmalı
3. **Tekrar Çalıştırma**: İstediğiniz zaman tekrar çalıştırabilirsiniz

## 🎯 Home Screen'de Görünüm

Seed verisi eklendikten sonra home screen'de şunları göreceksiniz:

### Trending Songs (En Çok Dinlenen)
1. Rock Anthem - Thunder Strike (28,900 plays)
2. Summer Vibes - Tropical Beats (25,670 plays)
3. Neon Lights - DJ Neon (23,450 plays)
4. City Lights - Metro Sound (21,340 plays)
5. Electric Dreams - DJ Neon (19,870 plays)

### Featured Songs (Öne Çıkanlar)
- Starlight - Luna Eclipse
- Neon Lights - DJ Neon
- Electric Dreams - DJ Neon
- Coffee Shop - Sarah Mitchell
- City Lights - Metro Sound
- Summer Vibes - Tropical Beats
- Rock Anthem - Thunder Strike

### Latest Songs (Son Eklenenler)
En son eklenen 10 şarkı

## 🔧 Sorun Giderme

### MongoDB bağlantı hatası
```
Error: connect ECONNREFUSED
```
**Çözüm**: MongoDB'nin çalıştığından ve `.env` dosyasındaki `MONGODB_URI`'nin doğru olduğundan emin olun.

### Module not found hatası
```
Error: Cannot find module
```
**Çözüm**: `npm install` komutunu çalıştırın.

## 📝 Örnek Çıktı

```
🌱 Starting database seeding...
✅ Connected to MongoDB
🗑️  Clearing existing data...
✅ Existing data cleared
📀 Creating albums...
✅ Created 5 albums
🎵 Creating songs...
✅ Created 20 songs
🔗 Linking songs to albums...
✅ Songs linked to albums

📊 Seeding Statistics:
   Albums: 5
   Songs: 20
   Featured Songs: 7
   Genres: 10

✨ Database seeding completed successfully!

🎵 Sample data:
   - Top trending: Rock Anthem
   - Most featured artist: DJ Neon
   - Latest album: Classical Harmony
```

## 🎨 Veri Özellikleri

- **Gerçekçi Görüntüler**: Unsplash'ten müzik temalı görseller
- **Çalışan Ses Dosyaları**: SoundHelix'ten örnek MP3 dosyaları
- **Çeşitli Türler**: 10 farklı müzik türü
- **Gerçekçi Play Count**: 5,000 - 29,000 arası dinlenme sayıları
- **Album İlişkileri**: Şarkılar albümlerine doğru şekilde bağlı

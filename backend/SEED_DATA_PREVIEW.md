# 🎵 Seed Data Önizleme

## 📀 Albümler (5 Adet)

### 1. Midnight Dreams
- **Sanatçı**: Luna Eclipse
- **Yıl**: 2023
- **Tür**: Electronic
- **Şarkılar**: 3
  - Starlight (Featured, 15,420 plays)
  - Moonlight Serenade (8,930 plays)
  - Night Whispers (12,340 plays)

### 2. Electric Vibes
- **Sanatçı**: DJ Neon
- **Yıl**: 2024
- **Tür**: EDM
- **Şarkılar**: 3
  - Neon Lights (Featured, 23,450 plays) 🔥
  - Electric Dreams (Featured, 19,870 plays)
  - Pulse (14,560 plays)

### 3. Acoustic Sessions
- **Sanatçı**: Sarah Mitchell
- **Yıl**: 2023
- **Tür**: Acoustic
- **Şarkılar**: 3
  - Coffee Shop (Featured, 17,890 plays)
  - Rainy Days (11,230 plays)
  - Sunset Boulevard (9,870 plays)

### 4. Urban Beats
- **Sanatçı**: Metro Sound
- **Yıl**: 2024
- **Tür**: Hip Hop
- **Şarkılar**: 3
  - City Lights (Featured, 21,340 plays) 🔥
  - Street Dreams (16,780 plays)
  - Underground (13,450 plays)

### 5. Classical Harmony
- **Sanatçı**: Orchestra Prime
- **Yıl**: 2022
- **Tür**: Classical
- **Şarkılar**: 3
  - Symphony No. 1 (7,890 plays)
  - Moonlight Sonata (6,540 plays)
  - Spring Waltz (5,670 plays)

---

## 🎵 Bağımsız Şarkılar (5 Adet)

### 6. Summer Vibes
- **Sanatçı**: Tropical Beats
- **Tür**: Pop
- **Featured**: ✅
- **Plays**: 25,670 🔥

### 7. Rock Anthem
- **Sanatçı**: Thunder Strike
- **Tür**: Rock
- **Featured**: ✅
- **Plays**: 28,900 🔥🔥 (EN POPÜLER!)

### 8. Jazz Night
- **Sanatçı**: Smooth Quartet
- **Tür**: Jazz
- **Featured**: ❌
- **Plays**: 10,230

### 9. Reggae Sunshine
- **Sanatçı**: Island Groove
- **Tür**: Reggae
- **Featured**: ❌
- **Plays**: 8,760

### 10. Country Road
- **Sanatçı**: Nashville Stars
- **Tür**: Country
- **Featured**: ❌
- **Plays**: 12,450

---

## 📊 İstatistikler

### Toplam
- **Albümler**: 5
- **Şarkılar**: 20
- **Sanatçılar**: 10
- **Türler**: 10
- **Featured Şarkılar**: 7
- **Toplam Plays**: 271,850

### Türlere Göre Dağılım
```
Electronic  ███ 3 şarkı
EDM         ███ 3 şarkı
Acoustic    ███ 3 şarkı
Hip Hop     ███ 3 şarkı
Classical   ███ 3 şarkı
Pop         █ 1 şarkı
Rock        █ 1 şarkı
Jazz        █ 1 şarkı
Reggae      █ 1 şarkı
Country     █ 1 şarkı
```

### Play Count Dağılımı
```
25K+ plays  ██ 2 şarkı (Rock Anthem, Summer Vibes)
20K-25K     ██ 2 şarkı (Neon Lights, City Lights)
15K-20K     ███ 3 şarkı
10K-15K     ████ 4 şarkı
5K-10K      █████████ 9 şarkı
```

---

## 🏆 Top 10 Trending (Play Count'a Göre)

1. 🥇 **Rock Anthem** - Thunder Strike (28,900)
2. 🥈 **Summer Vibes** - Tropical Beats (25,670)
3. 🥉 **Neon Lights** - DJ Neon (23,450)
4. **City Lights** - Metro Sound (21,340)
5. **Electric Dreams** - DJ Neon (19,870)
6. **Coffee Shop** - Sarah Mitchell (17,890)
7. **Street Dreams** - Metro Sound (16,780)
8. **Starlight** - Luna Eclipse (15,420)
9. **Pulse** - DJ Neon (14,560)
10. **Underground** - Metro Sound (13,450)

---

## ⭐ Featured Songs (7 Adet)

1. **Starlight** - Luna Eclipse (Electronic)
2. **Neon Lights** - DJ Neon (EDM)
3. **Electric Dreams** - DJ Neon (EDM)
4. **Coffee Shop** - Sarah Mitchell (Acoustic)
5. **City Lights** - Metro Sound (Hip Hop)
6. **Summer Vibes** - Tropical Beats (Pop)
7. **Rock Anthem** - Thunder Strike (Rock)

---

## 🆕 Latest Songs (Ekleme Sırasına Göre)

Son eklenen 10 şarkı (en yeniden eskiye):

1. Country Road - Nashville Stars
2. Reggae Sunshine - Island Groove
3. Jazz Night - Smooth Quartet
4. Rock Anthem - Thunder Strike
5. Summer Vibes - Tropical Beats
6. Spring Waltz - Orchestra Prime
7. Moonlight Sonata - Orchestra Prime
8. Symphony No. 1 - Orchestra Prime
9. Underground - Metro Sound
10. Street Dreams - Metro Sound

---

## 🎨 Görsel ve Ses Kaynakları

### Görseller
- **Kaynak**: Unsplash (Ücretsiz, yüksek kaliteli)
- **Tema**: Müzik, konser, enstrüman
- **Boyut**: 500px genişlik
- **Format**: JPEG

### Ses Dosyaları
- **Kaynak**: SoundHelix (Ücretsiz örnek müzikler)
- **Format**: MP3
- **Kalite**: Yüksek
- **Süre**: 175-320 saniye (3-5 dakika)

---

## 🔍 Endpoint Testleri

### Trending
```bash
GET /api/songs/trending
# Döner: En çok dinlenen 10 şarkı
```

### Featured
```bash
GET /api/songs/featured
# Döner: 7 öne çıkan şarkı
```

### Latest
```bash
GET /api/songs/latest
# Döner: Son eklenen 10 şarkı
```

### By Genre
```bash
GET /api/songs/genre/Electronic
# Döner: 3 Electronic şarkı
```

### By Artist
```bash
GET /api/songs/artist/DJ%20Neon
# Döner: 3 DJ Neon şarkısı
```

### By Album
```bash
GET /api/songs/album/{albumId}
# Döner: Albümdeki 3 şarkı
```

---

## 💡 Kullanım Senaryoları

### Home Screen
```javascript
// Trending Section
const trending = await fetch('/api/songs/trending');
// Gösterir: Rock Anthem, Summer Vibes, Neon Lights...

// Featured Section
const featured = await fetch('/api/songs/featured');
// Gösterir: 7 öne çıkan şarkı

// Latest Section
const latest = await fetch('/api/songs/latest');
// Gösterir: Son eklenen 10 şarkı
```

### Genre Filter
```javascript
// EDM şarkıları
const edm = await fetch('/api/songs/genre/EDM');
// Döner: Neon Lights, Electric Dreams, Pulse
```

### Artist Page
```javascript
// DJ Neon'un şarkıları
const djNeon = await fetch('/api/songs/artist/DJ%20Neon');
// Döner: 3 şarkı, toplam 57,880 plays
```

---

## 🎯 Gerçekçi Veri Özellikleri

### Play Count Dağılımı
- **Viral Hit**: 25K+ (2 şarkı)
- **Popüler**: 15K-25K (5 şarkı)
- **Orta**: 10K-15K (4 şarkı)
- **Yeni/Niş**: 5K-10K (9 şarkı)

### Featured Seçimi
- Her türden en az 1 featured şarkı
- En popüler sanatçılar (DJ Neon: 2 featured)
- Dengeli dağılım

### Albüm İlişkileri
- Her albümde 3 şarkı
- Şarkılar albüm sanatçısıyla eşleşiyor
- Albüm görselleri şarkı görselleriyle tutarlı

---

## 📈 Beklenen Sonuçlar

### Home Screen'de
✅ Trending section dolu (10 şarkı)
✅ Featured section dolu (7 şarkı)
✅ Latest section dolu (10 şarkı)
✅ Görseller yükleniyor
✅ Ses dosyaları çalışıyor

### Filtrelerde
✅ Tüm türler listelenebilir
✅ Sanatçı sayfaları çalışıyor
✅ Albüm detayları görünüyor
✅ Arama sonuçları geliyor

### İstatistiklerde
✅ Toplam şarkı sayısı: 20
✅ Toplam albüm sayısı: 5
✅ Toplam plays: 271,850
✅ Tür dağılımı dengeli

---

**Not**: Tüm veriler örnek amaçlıdır. Gerçek bir müzik uygulamasında telif hakkı olan içerik kullanılmamalıdır.

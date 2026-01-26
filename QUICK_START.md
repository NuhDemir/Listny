# 🚀 Quick Start Guide

## Backend Kurulumu

### 1. Backend klasörüne gidin ve paketleri yükleyin

```bash
cd backend
npm install
```

**ÖNEMLİ:** Eğer `jsonwebtoken` veya `bcryptjs` hatası alırsanız:

```bash
npm install jsonwebtoken bcryptjs --save
```

### 2. .env dosyasını oluşturun

Backend klasöründe `.env` dosyası oluşturun:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/music-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 3. Backend'i başlatın

```bash
npm run dev
```

Backend şu adreste çalışacak: `http://localhost:5000`

---

## Frontend Kurulumu

### 1. Frontend klasörüne gidin ve paketleri yükleyin

```bash
cd frontend
npm install
```

### 2. .env dosyası zaten mevcut

Frontend `.env` dosyası:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Frontend'i başlatın

```bash
npm run dev
```

Frontend şu adreste çalışacak: `http://localhost:5173`

---

## 🎯 İlk Kullanım

1. Tarayıcıda `http://localhost:5173` adresine gidin
2. "Kayıt Ol" butonuna tıklayın
3. Yeni bir hesap oluşturun
4. Otomatik olarak giriş yapılacak

---

## 🔧 Sorun Giderme

### Backend Paket Hatası

Eğer backend başlatılırken paket hatası alıyorsanız:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm install jsonwebtoken bcryptjs --save
```

### MongoDB Bağlantı Hatası

MongoDB'nin çalıştığından emin olun:
- Local MongoDB: `mongod` komutu ile başlatın
- MongoDB Atlas: Connection string'i kontrol edin

### Port Çakışması

Eğer port 5000 kullanılıyorsa, backend `.env` dosyasında `PORT` değiştirin.

---

## 📚 API Dokümantasyonu

Backend çalışırken Swagger UI: `http://localhost:5000/api-docs`

---

## 🎨 Özellikler

### ✅ Tamamlanan

- ✅ Custom Authentication (JWT)
- ✅ Login/Register sayfaları
- ✅ Protected routes
- ✅ Theme (Dark/Light mode)
- ✅ Audio player context
- ✅ Feature-based architecture
- ✅ TypeScript support
- ✅ Tailwind CSS
- ✅ React Query
- ✅ Backend API endpoints

### 🚧 Yapılacaklar

- [ ] Home page (Featured songs, Latest songs)
- [ ] Search functionality
- [ ] Library page
- [ ] Admin panel
- [ ] Song upload
- [ ] Album management
- [ ] User profile
- [ ] Playlists

---

## 📁 Proje Yapısı

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   ├── shared/          # Shared components
│   │   └── ui/              # UI components (shadcn)
│   ├── context/             # React contexts
│   ├── features/            # Feature-based modules
│   │   ├── auth/
│   │   ├── songs/
│   │   └── albums/
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Libraries & utilities
│   ├── providers/           # App providers
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   └── config/              # Configuration files

backend/
├── src/
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Middlewares
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   └── lib/                 # Libraries
```

---

## 🔐 Admin Kullanıcısı Oluşturma

1. Normal bir kullanıcı olarak kayıt olun
2. MongoDB'de users collection'ına gidin
3. Kullanıcınızın `isAdmin` field'ını `true` yapın

MongoDB shell ile:
```javascript
use music-app
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Backend ve Frontend loglarını kontrol edin
2. `.env` dosyalarının doğru olduğundan emin olun
3. Paketlerin yüklü olduğunu kontrol edin

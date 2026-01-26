# Setup Guide

## Backend Kurulumu

### 1. Gerekli Paketleri Yükleyin

Backend klasöründe:
```bash
cd backend
npm install
```

Eğer paketler yüklü değilse, manuel olarak:
```bash
npm install jsonwebtoken bcryptjs
```

### 2. Environment Variables

Backend `.env` dosyası:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 3. Backend'i Başlatın

```bash
npm run dev
```

---

## Frontend Kurulumu

### 1. Gerekli Paketleri Yükleyin

Frontend klasöründe:
```bash
cd frontend
npm install
```

### 2. Environment Variables

Frontend `.env` dosyası:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Frontend'i Başlatın

```bash
npm run dev
```

---

## Veritabanı Kurulumu

### MongoDB

1. MongoDB Atlas'ta bir hesap oluşturun veya local MongoDB kullanın
2. Connection string'i alın
3. Backend `.env` dosyasına ekleyin

---

## İlk Admin Kullanıcısı Oluşturma

1. Normal bir kullanıcı olarak kayıt olun
2. MongoDB'de users collection'ına gidin
3. Kullanıcınızın `isAdmin` field'ını `true` yapın

Veya MongoDB shell ile:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

---

## Sorun Giderme

### Backend Paket Hatası

Eğer `Cannot find package 'jsonwebtoken'` veya `'bcryptjs'` hatası alıyorsanız:

1. Backend klasöründe `node_modules` klasörünü silin
2. `package-lock.json` dosyasını silin
3. `npm install` komutunu tekrar çalıştırın

### CORS Hatası

Backend'de CORS ayarlarını kontrol edin. `src/index.js` dosyasında:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
```

### Port Çakışması

Eğer port 5000 veya 5173 kullanılıyorsa:
- Backend için `.env` dosyasında `PORT` değiştirin
- Frontend için `vite.config.ts` dosyasında port ayarlayın

---

## Geliştirme İpuçları

### Hot Reload

- Backend: nodemon otomatik olarak değişiklikleri algılar
- Frontend: Vite otomatik olarak değişiklikleri algılar

### API Testi

Swagger UI: `http://localhost:5000/api-docs`

### TypeScript Hataları

Frontend'de TypeScript hatası alıyorsanız:
```bash
npm run build
```

---

## Production Build

### Backend

```bash
npm start
```

### Frontend

```bash
npm run build
npm run preview
```

---

## Önerilen VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (API testing)

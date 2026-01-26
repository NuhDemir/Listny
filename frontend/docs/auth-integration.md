# Authentication Integration Guide

## 📋 Genel Bakış

Bu proje, Clerk yerine custom JWT-based authentication kullanır. Kullanıcılar email/username ve şifre ile giriş yapabilir.

## 🔐 Backend Authentication Endpoints

### POST `/api/auth/register`
Yeni kullanıcı kaydı

**Request Body:**
```json
{
  "username": "string (min: 3 karakter)",
  "email": "string (valid email)",
  "password": "string (min: 6 karakter)",
  "fullname": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": 
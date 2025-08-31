import { Router } from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  validateSong,
  validateAlbum,
} from "../middleware/validation.middleware.js"; // Yeni middleware

const router = Router();

router.use(protectRoute, requireAdmin);

/**
 * @swagger
 * /api/admin/status:
 *   get:
 *     summary: Admin route kontrol endpoint'i
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin route çalışıyor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin routes working fine!
 *       401:
 *         description: Yetkilendirme hatası
 */
router.get("/status", (req, res) => {
  res.json({ message: "Admin routes working fine!" });
});
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin işlemleri (şarkı ve albüm yönetimi)
 */

/**
 * @swagger
 * /api/admin/songs:
 *   post:
 *     summary: Yeni bir şarkı oluştur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *               - audioFile
 *               - imageFile
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               albumId:
 *                 type: string
 *               duration:
 *                 type: string
 *               audioFile:
 *                 type: string
 *                 format: binary
 *               imageFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Şarkı başarıyla oluşturuldu
 *       400:
 *         description: Eksik dosya ya da parametre
 *       500:
 *         description: Sunucu hatası
 */
router.post("/songs", validateSong, createSong);

/**
 * @swagger
 * /api/admin/songs/{id}:
 *   delete:
 *     summary: Şarkıyı sil
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek şarkının ID'si
 *     responses:
 *       200:
 *         description: Şarkı başarıyla silindi
 *       404:
 *         description: Şarkı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete("/songs/:id", deleteSong);

/**
 * @swagger
 * /api/admin/albums:
 *   post:
 *     summary: Yeni albüm oluştur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Albüm başarıyla oluşturuldu
 *       400:
 *         description: Eksik parametre
 *       500:
 *         description: Sunucu hatası
 */
router.post("/albums", validateAlbum, createAlbum);

/**
 * @swagger
 * /api/admin/albums/{id}:
 *   delete:
 *     summary: Albümü sil
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek albümün ID'si
 *     responses:
 *       200:
 *         description: Albüm başarıyla silindi
 *       404:
 *         description: Albüm bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete("/albums/:id", deleteAlbum);

export default router;

import { Router } from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getLatestSongs,
  getSongById,
  getSongsByArtist,
  getSongsByAlbum,
  searchSongs,
  getSongsByGenre,
  getSongsByYear,
  getTrendingSongs,
  getRandomSong,
  getTopChartSongs,
  getMadeForYouSongs,
} from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Song:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Şarkının benzersiz kimliği
 *         title:
 *           type: string
 *           description: Şarkının başlığı
 *         artist:
 *           type: string
 *           description: Şarkının sanatçısı
 *         imageUrl:
 *           type: string
 *           description: Şarkının kapak resmi URL'si
 *         audioUrl:
 *           type: string
 *           description: Şarkının ses dosyası URL'si
 *         duration:
 *           type: number
 *           description: Şarkının süresi (saniye cinsinden)
 *         albumId:
 *           type: object
 *           description: Şarkının bağlı olduğu albüm (populate edilmiş)
 *           $ref: '#/components/schemas/Album'
 *         isFeatured:
 *           type: boolean
 *           description: Şarkının öne çıkanlar listesinde olup olmadığı
 *         playCount:
 *           type: number
 *           description: Şarkının oynatma sayısı
 *         genre:
 *           type: string
 *           description: Şarkının türü
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Şarkının oluşturulma tarihi
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Şarkının son güncelleme tarihi
 *       required:
 *         - title
 *         - artist
 *         - imageUrl
 *         - audioUrl
 *         - duration
 *     Album:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Albümün benzersiz kimliği
 *         title:
 *           type: string
 *           description: Albümün başlığı
 *         artist:
 *           type: string
 *           description: Albümün sanatçısı
 *         imageUrl:
 *           type: string
 *           description: Albümün kapak resmi URL'si
 *         releaseYear:
 *           type: number
 *           description: Albümün çıkış yılı
 *         songs:
 *           type: array
 *           items:
 *             type: string
 *             description: Albümdeki şarkıların kimlikleri
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Albümün oluşturulma tarihi
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Albümün son güncelleme tarihi
 *       required:
 *         - title
 *         - artist
 *         - imageUrl
 *         - releaseYear
 */

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Şarkı işlemleri
 */

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Tüm şarkıları getir (admin korumalı)
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tüm şarkılar başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Admin yetkisi gerekli
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Admin access required
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/", protectRoute, requireAdmin, getAllSongs);

/**
 * @swagger
 * /api/songs/featured:
 *   get:
 *     summary: Öne çıkan şarkıları getir
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Öne çıkan şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/featured", getFeaturedSongs);

/**
 * @swagger
 * /api/songs/latest:
 *   get:
 *     summary: Son eklenen şarkıları getir
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Son eklenen şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/latest", getLatestSongs);

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: ID'ye göre şarkı getir
 *     tags: [Songs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Şarkının kimliği
 *     responses:
 *       200:
 *         description: Şarkı bulundu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: Şarkı bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Song not found
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/:id", getSongById);

/**
 * @swagger
 * /api/songs/artist/{artistId}:
 *   get:
 *     summary: Bir sanatçının şarkılarını getir
 *     tags: [Songs]
 *     parameters:
 *       - name: artistId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Sanatçının adı (string formatında)
 *     responses:
 *       200:
 *         description: Sanatçının şarkıları listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/artist/:artistId", getSongsByArtist);

/**
 * @swagger
 * /api/songs/album/{albumId}:
 *   get:
 *     summary: Albüme ait şarkıları getir
 *     tags: [Songs]
 *     parameters:
 *       - name: albumId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Albümün kimliği
 *     responses:
 *       200:
 *         description: Albümdeki şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/album/:albumId", getSongsByAlbum);

/**
 * @swagger
 * /api/songs/search:
 *   get:
 *     summary: Şarkılarda arama yap
 *     tags: [Songs]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Aranacak kelime (başlık veya sanatçı adı)
 *     responses:
 *       200:
 *         description: Arama sonuçları
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       400:
 *         description: Arama sorgusu eksik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Search query is required
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/search", searchSongs);

/**
 * @swagger
 * /api/songs/genre/{genre}:
 *   get:
 *     summary: Türe göre şarkıları getir
 *     tags: [Songs]
 *     parameters:
 *       - name: genre
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Şarkı türü
 *     responses:
 *       200:
 *         description: Türe ait şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/genre/:genre", getSongsByGenre);

/**
 * @swagger
 * /api/songs/year/{year}:
 *   get:
 *     summary: Yıla göre şarkıları getir
 *     tags: [Songs]
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Albümün çıkış yılı
 *     responses:
 *       200:
 *         description: Yıla ait şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/year/:year", getSongsByYear);

/**
 * @swagger
 * /api/songs/trending:
 *   get:
 *     summary: Trend olan şarkıları getir
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Trend olan şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/trending", getTrendingSongs);

/**
 * @swagger
 * /api/songs/random:
 *   get:
 *     summary: Rastgele bir şarkı getir
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Rastgele şarkı bulundu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/random", getRandomSong);

/**
 * @swagger
 * /api/songs/top-charts:
 *   get:
 *     summary: En popüler şarkıları getir
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: En popüler şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/top-charts", getTopChartSongs);

/**
 * @swagger
 * /api/songs/made-for-you:
 *   get:
 *     summary: Kullanıcıya özel şarkı önerileri getir
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcıya özel şarkılar listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/made-for-you", protectRoute, getMadeForYouSongs);

export default router;

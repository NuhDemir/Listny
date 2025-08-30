import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controllers/album.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Albüm işlemleri
 */

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Tüm albümleri getir
 *     tags: [Albums]
 *     responses:
 *       200:
 *         description: Albüm listesi başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   artist:
 *                     type: string
 *                   releaseDate:
 *                     type: string
 *                     format: date
 */
router.get("/", getAllAlbums);

/**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: ID'ye göre albüm getir
 *     tags: [Albums]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Albümün ID'si
 *     responses:
 *       200:
 *         description: Albüm bulundu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 artist:
 *                   type: string
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Albüm bulunamadı
 */
router.get("/:id", getAlbumById);

export default router;

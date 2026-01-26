import { Router } from "express";
import {
    getArtistByName,
    getAllArtists,
    getTrendingArtists,
} from "../controllers/artist.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: Artist operations
 */

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Get all artists
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: List of all artists
 */
router.get("/", getAllArtists);

/**
 * @swagger
 * /api/artists/trending:
 *   get:
 *     summary: Get trending artists
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: List of trending artists
 */
router.get("/trending", getTrendingArtists);

/**
 * @swagger
 * /api/artists/{artistName}:
 *   get:
 *     summary: Get artist by name
 *     tags: [Artists]
 *     parameters:
 *       - name: artistName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Artist name (URL encoded)
 *     responses:
 *       200:
 *         description: Artist details with songs and albums
 *       404:
 *         description: Artist not found
 */
router.get("/:artistName", getArtistByName);

export default router;

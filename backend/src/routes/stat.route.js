import { Router } from "express";
import {
  getStats,
  getTrendingArtists,
  getGenreStats,
  getRecentlyAdded,
} from "../controllers/stats.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Statistics and analytics endpoints
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get general statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: General statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSongs:
 *                   type: number
 *                 totalAlbums:
 *                   type: number
 *                 totalUsers:
 *                   type: number
 *                 totalPlays:
 *                   type: number
 */
router.get("/", getStats);

/**
 * @swagger
 * /api/stats/trending-artists:
 *   get:
 *     summary: Get trending artists
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: List of trending artists
 */
router.get("/trending-artists", getTrendingArtists);

/**
 * @swagger
 * /api/stats/genres:
 *   get:
 *     summary: Get genre statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Genre statistics
 */
router.get("/genres", getGenreStats);

/**
 * @swagger
 * /api/stats/recently-added:
 *   get:
 *     summary: Get recently added content
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Recently added songs and albums
 */
router.get("/recently-added", getRecentlyAdded);

export default router;

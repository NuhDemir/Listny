import { Router } from "express";
import {
    searchAll,
    searchSongs,
    searchAlbums,
    searchArtists,
    getSearchSuggestions,
} from "../controllers/search.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search endpoints for songs, albums, and artists
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search across all content (songs, albums, artists)
 *     tags: [Search]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 songs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *                 albums:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Album'
 *                 artists:
 *                   type: array
 *                 query:
 *                   type: string
 *                 totalResults:
 *                   type: number
 *       400:
 *         description: Search query is required
 */
router.get("/", searchAll);

/**
 * @swagger
 * /api/search/songs:
 *   get:
 *     summary: Search songs only
 *     tags: [Search]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song search results
 */
router.get("/songs", searchSongs);

/**
 * @swagger
 * /api/search/albums:
 *   get:
 *     summary: Search albums only
 *     tags: [Search]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Album search results
 */
router.get("/albums", searchAlbums);

/**
 * @swagger
 * /api/search/artists:
 *   get:
 *     summary: Search artists only
 *     tags: [Search]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artist search results
 */
router.get("/artists", searchArtists);

/**
 * @swagger
 * /api/search/suggestions:
 *   get:
 *     summary: Get search suggestions (autocomplete)
 *     tags: [Search]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search suggestions
 */
router.get("/suggestions", getSearchSuggestions);

export default router;

import { Router } from "express";
import {
    getUserLibrary,
    addFavoriteSong,
    removeFavoriteSong,
    addFavoriteAlbum,
    removeFavoriteAlbum,
    addFavoriteArtist,
    removeFavoriteArtist,
    addToRecentlyPlayed,
    getUserPlaylists,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
} from "../controllers/library.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

// All routes require authentication
router.use(protectRoute);

/**
 * @swagger
 * tags:
 *   name: Library
 *   description: User's music library management
 */

/**
 * @swagger
 * /api/library:
 *   get:
 *     summary: Get user's complete library
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's library data
 */
router.get("/", getUserLibrary);

/**
 * @swagger
 * /api/library/favorites/songs:
 *   post:
 *     summary: Add song to favorites
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Song added to favorites
 */
router.post("/favorites/songs", addFavoriteSong);

/**
 * @swagger
 * /api/library/favorites/songs/{songId}:
 *   delete:
 *     summary: Remove song from favorites
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: songId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song removed from favorites
 */
router.delete("/favorites/songs/:songId", removeFavoriteSong);

/**
 * @swagger
 * /api/library/favorites/albums:
 *   post:
 *     summary: Add album to favorites
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               albumId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Album added to favorites
 */
router.post("/favorites/albums", addFavoriteAlbum);

/**
 * @swagger
 * /api/library/favorites/albums/{albumId}:
 *   delete:
 *     summary: Remove album from favorites
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: albumId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Album removed from favorites
 */
router.delete("/favorites/albums/:albumId", removeFavoriteAlbum);

/**
 * @swagger
 * /api/library/favorites/artists:
 *   post:
 *     summary: Add artist to favorites
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artistName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artist added to favorites
 */
router.post("/favorites/artists", addFavoriteArtist);

/**
 * @swagger
 * /api/library/favorites/artists/{artistName}:
 *   delete:
 *     summary: Remove artist from favorites
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: artistName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artist removed from favorites
 */
router.delete("/favorites/artists/:artistName", removeFavoriteArtist);

/**
 * @swagger
 * /api/library/recently-played:
 *   post:
 *     summary: Add song to recently played
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added to recently played
 */
router.post("/recently-played", addToRecentlyPlayed);

/**
 * @swagger
 * /api/library/playlists:
 *   get:
 *     summary: Get user's playlists
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's playlists
 *   post:
 *     summary: Create new playlist
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Playlist created
 */
router.get("/playlists", getUserPlaylists);
router.post("/playlists", createPlaylist);

/**
 * @swagger
 * /api/library/playlists/{playlistId}:
 *   get:
 *     summary: Get playlist by ID
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Playlist details
 *   put:
 *     summary: Update playlist
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Playlist updated
 *   delete:
 *     summary: Delete playlist
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Playlist deleted
 */
router.get("/playlists/:playlistId", getPlaylistById);
router.put("/playlists/:playlistId", updatePlaylist);
router.delete("/playlists/:playlistId", deletePlaylist);

/**
 * @swagger
 * /api/library/playlists/{playlistId}/songs:
 *   post:
 *     summary: Add song to playlist
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Song added to playlist
 */
router.post("/playlists/:playlistId/songs", addSongToPlaylist);

/**
 * @swagger
 * /api/library/playlists/{playlistId}/songs/{songId}:
 *   delete:
 *     summary: Remove song from playlist
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: songId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song removed from playlist
 */
router.delete("/playlists/:playlistId/songs/:songId", removeSongFromPlaylist);

export default router;

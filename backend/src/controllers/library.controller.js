import Library from "../models/library.model.js";
import Playlist from "../models/playlist.model.js";
import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import chalk from "chalk";

/**
 * Library Controller - User's Music Library Management
 * 
 * Handles favorite songs, albums, artists, playlists, and recently played
 */

// Get user's complete library
export const getUserLibrary = async (req, res, next) => {
    try {
        const userId = req.user._id;

        let library = await Library.findOne({ userId })
            .populate({
                path: "favoriteSongs",
                populate: { path: "albumId" },
            })
            .populate("favoriteAlbums")
            .populate({
                path: "recentlyPlayed.songId",
                populate: { path: "albumId" },
            })
            .populate({
                path: "playlists",
                select: "name description imageUrl songs createdAt",
            });

        // Create library if doesn't exist
        if (!library) {
            library = await Library.create({ userId });
            library = await Library.findOne({ userId });
        }

        // Get favorite artists with their songs
        const favoriteArtists = await Promise.all(
            library.favoriteArtists.map(async (artistName) => {
                const songs = await Song.find({ artist: artistName })
                    .limit(5)
                    .populate("albumId");

                return {
                    artist: artistName,
                    songCount: await Song.countDocuments({ artist: artistName }),
                    imageUrl: songs[0]?.imageUrl || "",
                    songs: songs,
                };
            })
        );

        const response = {
            favoriteSongs: library.favoriteSongs || [],
            favoriteAlbums: library.favoriteAlbums || [],
            favoriteArtists: favoriteArtists || [],
            recentlyPlayed: library.recentlyPlayed
                .filter((item) => item.songId)
                .slice(0, 20)
                .map((item) => ({
                    song: item.songId,
                    playedAt: item.playedAt,
                })) || [],
            playlists: library.playlists || [],
        };

        console.log(chalk.blue.bold("📚 Fetching user library"));
        return res.json(response);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error getUserLibrary controller: ${error.message}`)
        );
        next(error);
    }
};

// Add song to favorites
export const addFavoriteSong = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({ error: "Song ID is required" });
        }

        // Check if song exists
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        let library = await Library.findOne({ userId });
        if (!library) {
            library = await Library.create({ userId, favoriteSongs: [songId] });
        } else {
            if (library.favoriteSongs.includes(songId)) {
                return res.status(400).json({ error: "Song already in favorites" });
            }
            library.favoriteSongs.push(songId);
            await library.save();
        }

        console.log(chalk.green.bold("❤️ Added song to favorites"));
        return res.json({ message: "Song added to favorites", library });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error addFavoriteSong controller: ${error.message}`)
        );
        next(error);
    }
};

// Remove song from favorites
export const removeFavoriteSong = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { songId } = req.params;

        const library = await Library.findOne({ userId });
        if (!library) {
            return res.status(404).json({ error: "Library not found" });
        }

        library.favoriteSongs = library.favoriteSongs.filter(
            (id) => id.toString() !== songId
        );
        await library.save();

        console.log(chalk.yellow.bold("💔 Removed song from favorites"));
        return res.json({ message: "Song removed from favorites", library });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error removeFavoriteSong controller: ${error.message}`)
        );
        next(error);
    }
};

// Add album to favorites
export const addFavoriteAlbum = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { albumId } = req.body;

        if (!albumId) {
            return res.status(400).json({ error: "Album ID is required" });
        }

        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ error: "Album not found" });
        }

        let library = await Library.findOne({ userId });
        if (!library) {
            library = await Library.create({ userId, favoriteAlbums: [albumId] });
        } else {
            if (library.favoriteAlbums.includes(albumId)) {
                return res.status(400).json({ error: "Album already in favorites" });
            }
            library.favoriteAlbums.push(albumId);
            await library.save();
        }

        console.log(chalk.green.bold("❤️ Added album to favorites"));
        return res.json({ message: "Album added to favorites", library });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error addFavoriteAlbum controller: ${error.message}`)
        );
        next(error);
    }
};

// Remove album from favorites
export const removeFavoriteAlbum = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { albumId } = req.params;

        const library = await Library.findOne({ userId });
        if (!library) {
            return res.status(404).json({ error: "Library not found" });
        }

        library.favoriteAlbums = library.favoriteAlbums.filter(
            (id) => id.toString() !== albumId
        );
        await library.save();

        console.log(chalk.yellow.bold("💔 Removed album from favorites"));
        return res.json({ message: "Album removed from favorites", library });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error removeFavoriteAlbum controller: ${error.message}`)
        );
        next(error);
    }
};

// Add artist to favorites
export const addFavoriteArtist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { artistName } = req.body;

        if (!artistName) {
            return res.status(400).json({ error: "Artist name is required" });
        }

        let library = await Library.findOne({ userId });
        if (!library) {
            library = await Library.create({ userId, favoriteArtists: [artistName] });
        } else {
            if (library.favoriteArtists.includes(artistName)) {
                return res.status(400).json({ error: "Artist already in favorites" });
            }
            library.favoriteArtists.push(artistName);
            await library.save();
        }

        console.log(chalk.green.bold("❤️ Added artist to favorites"));
        return res.json({ message: "Artist added to favorites", library });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error addFavoriteArtist controller: ${error.message}`)
        );
        next(error);
    }
};

// Remove artist from favorites
export const removeFavoriteArtist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { artistName } = req.params;

        const library = await Library.findOne({ userId });
        if (!library) {
            return res.status(404).json({ error: "Library not found" });
        }

        library.favoriteArtists = library.favoriteArtists.filter(
            (name) => name !== artistName
        );
        await library.save();

        console.log(chalk.yellow.bold("💔 Removed artist from favorites"));
        return res.json({ message: "Artist removed from favorites", library });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error removeFavoriteArtist controller: ${error.message}`)
        );
        next(error);
    }
};

// Add song to recently played
export const addToRecentlyPlayed = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({ error: "Song ID is required" });
        }

        let library = await Library.findOne({ userId });
        if (!library) {
            library = await Library.create({
                userId,
                recentlyPlayed: [{ songId, playedAt: new Date() }],
            });
        } else {
            // Remove if already exists
            library.recentlyPlayed = library.recentlyPlayed.filter(
                (item) => item.songId.toString() !== songId
            );

            // Add to beginning
            library.recentlyPlayed.unshift({ songId, playedAt: new Date() });

            // Keep only last 50
            if (library.recentlyPlayed.length > 50) {
                library.recentlyPlayed = library.recentlyPlayed.slice(0, 50);
            }

            await library.save();
        }

        console.log(chalk.blue.bold("🎵 Added to recently played"));
        res.json({ message: "Added to recently played" });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error addToRecentlyPlayed controller: ${error.message}`)
        );
        next(error);
    }
};

// Get user's playlists
export const getUserPlaylists = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const playlists = await Playlist.find({ userId })
            .populate({
                path: "songs",
                populate: { path: "albumId" },
            })
            .sort({ createdAt: -1 });

        console.log(chalk.blue.bold("📋 Fetching user playlists"));
        res.json(playlists);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error getUserPlaylists controller: ${error.message}`)
        );
        next(error);
    }
};

// Get playlist by ID
export const getPlaylistById = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { playlistId } = req.params;

        const playlist = await Playlist.findOne({ _id: playlistId, userId })
            .populate({
                path: "songs",
                populate: { path: "albumId" },
            });

        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        console.log(chalk.blue.bold("📋 Fetching playlist by ID"));
        res.json(playlist);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error getPlaylistById controller: ${error.message}`)
        );
        next(error);
    }
};

// Create playlist
export const createPlaylist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { name, description, isPublic } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Playlist name is required" });
        }

        const playlist = await Playlist.create({
            name,
            description: description || "",
            userId,
            isPublic: isPublic || false,
            songs: [],
        });

        // Add to user's library
        await Library.findOneAndUpdate(
            { userId },
            { $push: { playlists: playlist._id } },
            { upsert: true }
        );

        console.log(chalk.green.bold("✨ Created new playlist"));
        res.status(201).json(playlist);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error createPlaylist controller: ${error.message}`)
        );
        next(error);
    }
};

// Update playlist
export const updatePlaylist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { playlistId } = req.params;
        const { name, description, isPublic } = req.body;

        const playlist = await Playlist.findOne({ _id: playlistId, userId });
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        if (name) playlist.name = name;
        if (description !== undefined) playlist.description = description;
        if (isPublic !== undefined) playlist.isPublic = isPublic;

        await playlist.save();

        console.log(chalk.blue.bold("✏️ Updated playlist"));
        res.json(playlist);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error updatePlaylist controller: ${error.message}`)
        );
        next(error);
    }
};

// Delete playlist
export const deletePlaylist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { playlistId } = req.params;

        const playlist = await Playlist.findOneAndDelete({ _id: playlistId, userId });
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        // Remove from library
        await Library.findOneAndUpdate(
            { userId },
            { $pull: { playlists: playlistId } }
        );

        console.log(chalk.red.bold("🗑️ Deleted playlist"));
        res.json({ message: "Playlist deleted" });
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error deletePlaylist controller: ${error.message}`)
        );
        next(error);
    }
};

// Add song to playlist
export const addSongToPlaylist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { playlistId } = req.params;
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({ error: "Song ID is required" });
        }

        const playlist = await Playlist.findOne({ _id: playlistId, userId });
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ error: "Song already in playlist" });
        }

        playlist.songs.push(songId);
        await playlist.save();

        console.log(chalk.green.bold("➕ Added song to playlist"));
        res.json(playlist);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error addSongToPlaylist controller: ${error.message}`)
        );
        next(error);
    }
};

// Remove song from playlist
export const removeSongFromPlaylist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { playlistId, songId } = req.params;

        const playlist = await Playlist.findOne({ _id: playlistId, userId });
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
        await playlist.save();

        console.log(chalk.yellow.bold("➖ Removed song from playlist"));
        res.json(playlist);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error removeSongFromPlaylist controller: ${error.message}`)
        );
        next(error);
    }
};

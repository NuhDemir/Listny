import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import chalk from "chalk";

/**
 * Artist Controller - Artist Detail & Management
 * 
 * Handles artist-specific operations
 */

// Get artist details with songs and albums
export const getArtistByName = async (req, res, next) => {
    try {
        const { artistName } = req.params;
        const decodedArtistName = decodeURIComponent(artistName);

        console.log(chalk.blue.bold(`🎤 Fetching artist: ${decodedArtistName}`));

        // Get all songs by artist
        const songs = await Song.find({ artist: decodedArtistName })
            .populate("albumId")
            .sort({ createdAt: -1 });

        if (songs.length === 0) {
            return res.status(404).json({ error: "Artist not found" });
        }

        // Get all albums by artist
        const albums = await Album.find({ artist: decodedArtistName })
            .sort({ releaseYear: -1 });

        // Get popular tracks (sorted by playCount)
        const popularTracks = await Song.find({ artist: decodedArtistName })
            .populate("albumId")
            .sort({ playCount: -1 })
            .limit(10);

        // Calculate total plays
        const totalPlays = songs.reduce((sum, song) => sum + (song.playCount || 0), 0);

        // Artist info
        const artistInfo = {
            name: decodedArtistName,
            imageUrl: songs[0]?.imageUrl || albums[0]?.imageUrl || "",
            totalSongs: songs.length,
            totalAlbums: albums.length,
            totalPlays: totalPlays,
            // You can add bio/description from a separate Artist model if needed
        };

        const response = {
            artist: artistInfo,
            songs: songs,
            albums: albums,
            popularTracks: popularTracks,
        };

        console.log(chalk.green.bold(`✅ Artist found: ${decodedArtistName}`));
        res.json(response);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error getArtistByName controller: ${error.message}`)
        );
        next(error);
    }
};

// Get all unique artists
export const getAllArtists = async (req, res, next) => {
    try {
        console.log(chalk.blue.bold("🎤 Fetching all artists"));

        // Get unique artists from songs
        const artists = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    songCount: { $sum: 1 },
                    totalPlays: { $sum: "$playCount" },
                    imageUrl: { $first: "$imageUrl" },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    songCount: 1,
                    totalPlays: 1,
                    imageUrl: 1,
                },
            },
            {
                $sort: { totalPlays: -1 },
            },
        ]);

        console.log(chalk.green.bold(`✅ Found ${artists.length} artists`));
        res.json(artists);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error getAllArtists controller: ${error.message}`)
        );
        next(error);
    }
};

// Get trending artists
export const getTrendingArtists = async (req, res, next) => {
    try {
        console.log(chalk.blue.bold("🔥 Fetching trending artists"));

        const trendingArtists = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    songCount: { $sum: 1 },
                    totalPlays: { $sum: "$playCount" },
                    imageUrl: { $first: "$imageUrl" },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    songCount: 1,
                    totalPlays: 1,
                    imageUrl: 1,
                },
            },
            {
                $sort: { totalPlays: -1 },
            },
            {
                $limit: 20,
            },
        ]);

        console.log(chalk.green.bold(`✅ Found ${trendingArtists.length} trending artists`));
        res.json(trendingArtists);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error getTrendingArtists controller: ${error.message}`)
        );
        next(error);
    }
};

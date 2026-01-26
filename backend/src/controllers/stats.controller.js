import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";
import chalk from "chalk";

/**
 * Stats Controller - Home Dashboard Statistics
 * 
 * Provides aggregated data for home page dashboard
 */

// Get general statistics
export const getStats = async (req, res, next) => {
    try {
        const [totalSongs, totalAlbums, totalUsers, totalPlays] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),
            Song.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$playCount" },
                    },
                },
            ]),
        ]);

        const stats = {
            totalSongs,
            totalAlbums,
            totalUsers,
            totalPlays: totalPlays[0]?.total || 0,
        };

        console.log(chalk.blue.bold("📊 Fetching general stats"));
        res.json(stats);
    } catch (error) {
        console.log(chalk.red.bold(`❌ Error getStats controller: ${error.message}`));
        next(error);
    }
};

// Get trending artists
export const getTrendingArtists = async (req, res, next) => {
    try {
        const artists = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    totalPlays: { $sum: "$playCount" },
                    songCount: { $sum: 1 },
                    songs: { $push: { title: "$title", imageUrl: "$imageUrl" } },
                },
            },
            {
                $sort: { totalPlays: -1 },
            },
            {
                $limit: 10,
            },
            {
                $project: {
                    artist: "$_id",
                    totalPlays: 1,
                    songCount: 1,
                    imageUrl: { $arrayElemAt: ["$songs.imageUrl", 0] },
                    _id: 0,
                },
            },
        ]);

        console.log(chalk.blue.bold("📊 Fetching trending artists"));
        res.json(artists);
    } catch (error) {
        console.log(chalk.red.bold(`❌ Error getTrendingArtists controller: ${error.message}`));
        next(error);
    }
};

// Get genre statistics
export const getGenreStats = async (req, res, next) => {
    try {
        const genres = await Song.aggregate([
            {
                $match: { genre: { $exists: true, $ne: null } },
            },
            {
                $group: {
                    _id: "$genre",
                    count: { $sum: 1 },
                    totalPlays: { $sum: "$playCount" },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 10,
            },
            {
                $project: {
                    genre: "$_id",
                    count: 1,
                    totalPlays: 1,
                    _id: 0,
                },
            },
        ]);

        console.log(chalk.blue.bold("📊 Fetching genre stats"));
        res.json(genres);
    } catch (error) {
        console.log(chalk.red.bold(`❌ Error getGenreStats controller: ${error.message}`));
        next(error);
    }
};

// Get recently added content
export const getRecentlyAdded = async (req, res, next) => {
    try {
        const [recentSongs, recentAlbums] = await Promise.all([
            Song.find().sort({ createdAt: -1 }).limit(5).populate("albumId"),
            Album.find().sort({ createdAt: -1 }).limit(5),
        ]);

        const recentlyAdded = {
            songs: recentSongs,
            albums: recentAlbums,
        };

        console.log(chalk.blue.bold("📊 Fetching recently added content"));
        res.json(recentlyAdded);
    } catch (error) {
        console.log(chalk.red.bold(`❌ Error getRecentlyAdded controller: ${error.message}`));
        next(error);
    }
};

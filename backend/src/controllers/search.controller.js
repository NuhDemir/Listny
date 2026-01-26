import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import chalk from "chalk";

/**
 * Search Controller - Unified Search Functionality
 * 
 * Provides comprehensive search across songs, albums, and artists
 */

// Search everything (songs, albums, artists)
export const searchAll = async (req, res, next) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        console.log(chalk.blue.bold(`🔍 Searching for: "${query}"`));

        // Search in parallel for better performance
        const [songs, albums, artists] = await Promise.all([
            // Search songs by title or artist
            Song.find({
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { artist: { $regex: query, $options: "i" } },
                    { genre: { $regex: query, $options: "i" } },
                ],
            })
                .sort({ playCount: -1 })
                .limit(20)
                .populate("albumId"),

            // Search albums by title or artist
            Album.find({
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { artist: { $regex: query, $options: "i" } },
                ],
            })
                .sort({ releaseYear: -1 })
                .limit(10)
                .populate("songs"),

            // Get unique artists from songs
            Song.aggregate([
                {
                    $match: {
                        artist: { $regex: query, $options: "i" },
                    },
                },
                {
                    $group: {
                        _id: "$artist",
                        songCount: { $sum: 1 },
                        totalPlays: { $sum: "$playCount" },
                        imageUrl: { $first: "$imageUrl" },
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
                        songCount: 1,
                        totalPlays: 1,
                        imageUrl: 1,
                        _id: 0,
                    },
                },
            ]),
        ]);

        const results = {
            songs,
            albums,
            artists,
            query,
            totalResults: songs.length + albums.length + artists.length,
        };

        console.log(
            chalk.green(
                `✅ Found ${results.totalResults} results (${songs.length} songs, ${albums.length} albums, ${artists.length} artists)`
            )
        );

        res.json(results);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error searchAll controller: ${error.message}`)
        );
        next(error);
    }
};

// Search songs only
export const searchSongs = async (req, res, next) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const songs = await Song.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { artist: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } },
            ],
        })
            .sort({ playCount: -1 })
            .populate("albumId");

        console.log(chalk.blue.bold(`🎵 Found ${songs.length} songs`));
        res.json(songs);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error searchSongs controller: ${error.message}`)
        );
        next(error);
    }
};

// Search albums only
export const searchAlbums = async (req, res, next) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const albums = await Album.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { artist: { $regex: query, $options: "i" } },
            ],
        })
            .sort({ releaseYear: -1 })
            .populate("songs");

        console.log(chalk.blue.bold(`📀 Found ${albums.length} albums`));
        res.json(albums);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error searchAlbums controller: ${error.message}`)
        );
        next(error);
    }
};

// Search artists only
export const searchArtists = async (req, res, next) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const artists = await Song.aggregate([
            {
                $match: {
                    artist: { $regex: query, $options: "i" },
                },
            },
            {
                $group: {
                    _id: "$artist",
                    songCount: { $sum: 1 },
                    totalPlays: { $sum: "$playCount" },
                    imageUrl: { $first: "$imageUrl" },
                },
            },
            {
                $sort: { totalPlays: -1 },
            },
            {
                $project: {
                    artist: "$_id",
                    songCount: 1,
                    totalPlays: 1,
                    imageUrl: 1,
                    _id: 0,
                },
            },
        ]);

        console.log(chalk.blue.bold(`👤 Found ${artists.length} artists`));
        res.json(artists);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error searchArtists controller: ${error.message}`)
        );
        next(error);
    }
};

// Get search suggestions (autocomplete)
export const getSearchSuggestions = async (req, res, next) => {
    try {
        const query = req.query.q;

        if (!query || query.length < 2) {
            return res.json({ suggestions: [] });
        }

        // Get top 5 suggestions from each category
        const [songTitles, artists, albumTitles] = await Promise.all([
            Song.find({ title: { $regex: query, $options: "i" } })
                .select("title")
                .limit(5)
                .lean(),

            Song.aggregate([
                { $match: { artist: { $regex: query, $options: "i" } } },
                { $group: { _id: "$artist" } },
                { $limit: 5 },
                { $project: { artist: "$_id", _id: 0 } },
            ]),

            Album.find({ title: { $regex: query, $options: "i" } })
                .select("title")
                .limit(5)
                .lean(),
        ]);

        const suggestions = {
            songs: songTitles.map((s) => s.title),
            artists: artists.map((a) => a.artist),
            albums: albumTitles.map((a) => a.title),
        };

        res.json(suggestions);
    } catch (error) {
        console.log(
            chalk.red.bold(`❌ Error getSearchSuggestions controller: ${error.message}`)
        );
        next(error);
    }
};

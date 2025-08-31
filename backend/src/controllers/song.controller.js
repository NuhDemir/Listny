import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import chalk from "chalk";

// Get all songs (admin only)
export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    console.log(chalk.blue.bold("📀 Fetching all songs"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchAllSongs controller: ${error.message}`)
    );
    next(error);
  }
};

// Get featured songs
export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.find({ isFeatured: true })
      .sort({ playCount: -1 })
      .limit(10)
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching featured songs"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchFeaturedSongs controller: ${error.message}`)
    );
    next(error);
  }
};

// Get latest songs
export const getLatestSongs = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching latest songs"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchLatestSongs controller: ${error.message}`)
    );
    next(error);
  }
};

// Get song by ID
export const getSongById = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id).populate("albumId");
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    console.log(chalk.blue.bold("📀 Fetching song by ID"));
    res.json(song);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchSongById controller: ${error.message}`)
    );
    next(error);
  }
};

// Get songs by artist
export const getSongsByArtist = async (req, res, next) => {
  try {
    const songs = await Song.find({ artist: req.params.artistId })
      .sort({ createdAt: -1 })
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching songs by artist"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchSongsByArtist controller: ${error.message}`)
    );
    next(error);
  }
};

// Get songs by album
export const getSongsByAlbum = async (req, res, next) => {
  try {
    const songs = await Song.find({ albumId: req.params.albumId })
      .sort({ createdAt: -1 })
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching songs by album"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchSongsByAlbum controller: ${error.message}`)
    );
    next(error);
  }
};

// Search songs
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
      ],
    })
      .sort({ createdAt: -1 })
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Searching songs"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error searchSongs controller: ${error.message}`)
    );
    next(error);
  }
};

// Get songs by genre
export const getSongsByGenre = async (req, res, next) => {
  try {
    const songs = await Song.find({ genre: req.params.genre })
      .sort({ createdAt: -1 })
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching songs by genre"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchSongsByGenre controller: ${error.message}`)
    );
    next(error);
  }
};

// Get songs by year
export const getSongsByYear = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .populate({
        path: "albumId",
        match: { releaseYear: parseInt(req.params.year) },
      })
      .sort({ createdAt: -1 });
    const filteredSongs = songs.filter((song) => song.albumId !== null);
    console.log(chalk.blue.bold("📀 Fetching songs by year"));
    res.json(filteredSongs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchSongsByYear controller: ${error.message}`)
    );
    next(error);
  }
};

// Get trending songs
export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .sort({ playCount: -1 })
      .limit(10)
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching trending songs"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchTrendingSongs controller: ${error.message}`)
    );
    next(error);
  }
};

// Get random song
export const getRandomSong = async (req, res, next) => {
  try {
    const count = await Song.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const song = await Song.findOne().skip(randomIndex).populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching random song"));
    res.json(song);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchRandomSong controller: ${error.message}`)
    );
    next(error);
  }
};

// Get top chart songs
export const getTopChartSongs = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .sort({ playCount: -1, createdAt: -1 })
      .limit(10)
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching top chart songs"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error fetchTopChartSongs controller: ${error.message}`)
    );
    next(error);
  }
};

// Get made for you songs
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // This is a placeholder implementation; actual logic depends on user preferences
    const songs = await Song.find()
      .sort({ playCount: -1 })
      .limit(10)
      .populate("albumId");
    console.log(chalk.blue.bold("📀 Fetching made for you songs"));
    res.json(songs);
  } catch (error) {
    console.log(
      chalk.red.bold(
        `❌ Error fetchMadeForYouSongs controller: ${error.message}`
      )
    );
    next(error);
  }
};

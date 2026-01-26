import mongoose from "mongoose";

/**
 * Library Model - User's Music Library
 * 
 * Stores user's favorite songs, albums, artists, and playlists
 */

const librarySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        favoriteSongs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
        favoriteAlbums: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Album",
            },
        ],
        favoriteArtists: [
            {
                type: String, // Artist name
            },
        ],
        recentlyPlayed: [
            {
                songId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Song",
                },
                playedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        playlists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Playlist",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
librarySchema.index({ userId: 1 });
librarySchema.index({ "recentlyPlayed.playedAt": -1 });

const Library = mongoose.model("Library", librarySchema);

export default Library;

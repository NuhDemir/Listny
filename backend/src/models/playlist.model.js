import mongoose from "mongoose";

/**
 * Playlist Model - User-created Playlists
 */

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
        imageUrl: {
            type: String,
            default: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
playlistSchema.index({ userId: 1 });
playlistSchema.index({ isPublic: 1 });

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;

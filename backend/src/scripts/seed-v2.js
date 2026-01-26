import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import bcrypt from "bcryptjs";
import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";
import Library from "../models/library.model.js";
import Playlist from "../models/playlist.model.js";

dotenv.config();

/**
 * Seed V2 - Enhanced Database Seeding (NON-DESTRUCTIVE)
 * 
 * Creates NEW data WITHOUT deleting existing data:
 * - 10 Albums
 * - 50 Songs
 * - 5 Users (with libraries)
 * - 10 Playlists
 * - Library data (favorites, recently played)
 */

// Enhanced Albums Data
const albums = [
    {
        title: "Midnight Dreams",
        artist: "Luna Eclipse",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
        releaseYear: 2023,
    },
    {
        title: "Electric Vibes",
        artist: "DJ Neon",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
        releaseYear: 2024,
    },
    {
        title: "Acoustic Sessions",
        artist: "Sarah Mitchell",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        releaseYear: 2023,
    },
    {
        title: "Urban Beats",
        artist: "Metro Sound",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500",
        releaseYear: 2024,
    },
    {
        title: "Classical Harmony",
        artist: "Orchestra Prime",
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500",
        releaseYear: 2022,
    },
    {
        title: "Jazz Nights",
        artist: "Smooth Quartet",
        imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500",
        releaseYear: 2023,
    },
    {
        title: "Rock Legends",
        artist: "Thunder Strike",
        imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500",
        releaseYear: 2022,
    },
    {
        title: "Pop Sensation",
        artist: "Starlight",
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500",
        releaseYear: 2024,
    },
    {
        title: "Indie Vibes",
        artist: "The Wanderers",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
        releaseYear: 2023,
    },
    {
        title: "Electronic Dreams",
        artist: "Synth Wave",
        imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500",
        releaseYear: 2024,
    },
];

// Enhanced Songs Data (50 songs)
const generateSongs = () => {
    const genres = ["Electronic", "EDM", "Acoustic", "Hip Hop", "Classical", "Jazz", "Rock", "Pop", "Indie", "Synthwave"];
    const songs = [];

    // Album songs (5 songs per album = 50 songs)
    const albumSongs = [
        ["Starlight", "Moonlight Serenade", "Night Whispers", "Cosmic Dance", "Dream Sequence"],
        ["Neon Lights", "Electric Dreams", "Pulse", "Voltage", "Circuit Breaker"],
        ["Coffee Shop", "Rainy Days", "Sunset Boulevard", "Morning Light", "Quiet Moments"],
        ["City Lights", "Street Dreams", "Underground", "Skyline", "Metro Rush"],
        ["Symphony No. 1", "Moonlight Sonata", "Spring Waltz", "Autumn Prelude", "Winter's Tale"],
        ["Blue Note", "Midnight Jazz", "Smooth Sailing", "Cool Breeze", "Jazz Cafe"],
        ["Rock Anthem", "Thunder Road", "Electric Storm", "Wild Heart", "Rebel Soul"],
        ["Summer Vibes", "Dance Floor", "Heartbeat", "Shine Bright", "Pop Star"],
        ["Wanderlust", "Open Road", "Free Spirit", "Mountain High", "Ocean Waves"],
        ["Neon City", "Digital Love", "Retro Future", "Synth Paradise", "Cyber Dreams"],
    ];

    const audioUrls = [
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    ];

    albums.forEach((album, albumIndex) => {
        albumSongs[albumIndex].forEach((songTitle, songIndex) => {
            const isFeatured = Math.random() > 0.7;
            const playCount = Math.floor(Math.random() * 50000) + 1000;

            songs.push({
                title: songTitle,
                artist: album.artist,
                imageUrl: album.imageUrl,
                audioUrl: audioUrls[songIndex % audioUrls.length],
                duration: Math.floor(Math.random() * 120) + 180,
                genre: genres[albumIndex],
                isFeatured,
                playCount,
            });
        });
    });

    return songs;
};

// Users Data
const users = [
    {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
        fullname: "John Doe",
        imageUrl: "https://i.pravatar.cc/150?img=1",
        isAdmin: false,
    },
    {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password123",
        fullname: "Jane Smith",
        imageUrl: "https://i.pravatar.cc/150?img=2",
        isAdmin: false,
    },
    {
        username: "mike_wilson",
        email: "mike@example.com",
        password: "password123",
        fullname: "Mike Wilson",
        imageUrl: "https://i.pravatar.cc/150?img=3",
        isAdmin: false,
    },
    {
        username: "sarah_johnson",
        email: "sarah@example.com",
        password: "password123",
        fullname: "Sarah Johnson",
        imageUrl: "https://i.pravatar.cc/150?img=4",
        isAdmin: false,
    },
    {
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        fullname: "Admin User",
        imageUrl: "https://i.pravatar.cc/150?img=5",
        isAdmin: true,
    },
];

const seedDatabase = async () => {
    try {
        console.log(chalk.blue.bold("🌱 Starting enhanced database seeding (V2 - Non-Destructive)..."));

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(chalk.green("✅ Connected to MongoDB"));

        // Drop clerkId index if exists (legacy cleanup)
        try {
            await User.collection.dropIndex("clerkId_1");
            console.log(chalk.yellow("🔧 Dropped legacy clerkId index"));
        } catch (error) {
            // Index doesn't exist, that's fine
        }

        // Check existing data
        console.log(chalk.blue("📊 Checking existing data..."));
        const existingSongsCount = await Song.countDocuments();
        const existingAlbumsCount = await Album.countDocuments();
        const existingUsersCount = await User.countDocuments();
        console.log(chalk.cyan(`   Current: ${existingSongsCount} songs, ${existingAlbumsCount} albums, ${existingUsersCount} users`));

        // Create albums
        console.log(chalk.blue("📀 Creating albums..."));
        const createdAlbums = await Album.insertMany(albums);
        console.log(chalk.green(`✅ Created ${createdAlbums.length} albums`));

        // Create songs
        console.log(chalk.blue("🎵 Creating songs..."));
        const songsData = generateSongs();
        const songsWithAlbums = songsData.map((song, index) => {
            const albumIndex = Math.floor(index / 5);
            return { ...song, albumId: createdAlbums[albumIndex]._id };
        });
        const createdSongs = await Song.insertMany(songsWithAlbums);
        console.log(chalk.green(`✅ Created ${createdSongs.length} songs`));

        // Update albums with their songs
        console.log(chalk.blue("🔗 Linking songs to albums..."));
        for (let i = 0; i < createdAlbums.length; i++) {
            const albumSongs = createdSongs.slice(i * 5, (i + 1) * 5);
            await Album.findByIdAndUpdate(createdAlbums[i]._id, {
                songs: albumSongs.map((song) => song._id),
            });
        }
        console.log(chalk.green("✅ Songs linked to albums"));

        // Create users (skip if already exist)
        console.log(chalk.blue("👥 Creating users..."));
        const createdUsers = [];
        for (const userData of users) {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                console.log(chalk.yellow(`   ⚠️  User ${userData.email} already exists, skipping...`));
                createdUsers.push(existingUser);
                continue;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const user = await User.create({
                ...userData,
                password: hashedPassword,
            });
            createdUsers.push(user);
            console.log(chalk.green(`   ✅ Created user: ${userData.email}`));
        }
        console.log(chalk.green(`✅ Processed ${createdUsers.length} users`));

        // Create libraries for users (skip if already exist)
        console.log(chalk.blue("📚 Creating user libraries..."));
        for (let i = 0; i < createdUsers.length; i++) {
            const user = createdUsers[i];

            const existingLibrary = await Library.findOne({ userId: user._id });
            if (existingLibrary) {
                console.log(chalk.yellow(`   ⚠️  Library for ${user.email} already exists, skipping...`));
                continue;
            }

            const favoriteSongCount = Math.floor(Math.random() * 6) + 5;
            const favoriteSongs = [];
            for (let j = 0; j < favoriteSongCount; j++) {
                const randomSong = createdSongs[Math.floor(Math.random() * createdSongs.length)];
                if (!favoriteSongs.includes(randomSong._id)) {
                    favoriteSongs.push(randomSong._id);
                }
            }

            const favoriteAlbumCount = Math.floor(Math.random() * 3) + 2;
            const favoriteAlbums = [];
            for (let j = 0; j < favoriteAlbumCount; j++) {
                const randomAlbum = createdAlbums[Math.floor(Math.random() * createdAlbums.length)];
                if (!favoriteAlbums.includes(randomAlbum._id)) {
                    favoriteAlbums.push(randomAlbum._id);
                }
            }

            const artistNames = [...new Set(albums.map(a => a.artist))];
            const favoriteArtistCount = Math.floor(Math.random() * 3) + 2;
            const favoriteArtists = [];
            for (let j = 0; j < favoriteArtistCount; j++) {
                const randomArtist = artistNames[Math.floor(Math.random() * artistNames.length)];
                if (!favoriteArtists.includes(randomArtist)) {
                    favoriteArtists.push(randomArtist);
                }
            }

            const recentlyPlayedCount = Math.floor(Math.random() * 6) + 10;
            const recentlyPlayed = [];
            for (let j = 0; j < recentlyPlayedCount; j++) {
                const randomSong = createdSongs[Math.floor(Math.random() * createdSongs.length)];
                const daysAgo = Math.floor(Math.random() * 7);
                recentlyPlayed.push({
                    songId: randomSong._id,
                    playedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
                });
            }

            await Library.create({
                userId: user._id,
                favoriteSongs,
                favoriteAlbums,
                favoriteArtists,
                recentlyPlayed,
                playlists: [],
            });
            console.log(chalk.green(`   ✅ Created library for: ${user.email}`));
        }
        console.log(chalk.green("✅ User libraries processed"));

        // Create playlists
        console.log(chalk.blue("📋 Creating playlists..."));
        const playlistNames = [
            "Workout Mix",
            "Chill Vibes",
            "Party Hits",
            "Study Focus",
            "Road Trip",
            "Morning Coffee",
            "Late Night",
            "Feel Good",
            "Throwback",
            "Discover Weekly",
        ];

        const createdPlaylists = [];
        for (let i = 0; i < playlistNames.length; i++) {
            const user = createdUsers[i % createdUsers.length];

            const playlistSongCount = Math.floor(Math.random() * 11) + 5;
            const playlistSongs = [];
            for (let j = 0; j < playlistSongCount; j++) {
                const randomSong = createdSongs[Math.floor(Math.random() * createdSongs.length)];
                if (!playlistSongs.includes(randomSong._id)) {
                    playlistSongs.push(randomSong._id);
                }
            }

            const playlist = await Playlist.create({
                name: playlistNames[i],
                description: `My ${playlistNames[i].toLowerCase()} collection`,
                userId: user._id,
                songs: playlistSongs,
                isPublic: Math.random() > 0.5,
            });

            createdPlaylists.push(playlist);

            await Library.findOneAndUpdate(
                { userId: user._id },
                { $push: { playlists: playlist._id } }
            );
        }
        console.log(chalk.green(`✅ Created ${createdPlaylists.length} playlists`));

        // Get final counts
        const finalSongsCount = await Song.countDocuments();
        const finalAlbumsCount = await Album.countDocuments();
        const finalUsersCount = await User.countDocuments();
        const finalPlaylistsCount = await Playlist.countDocuments();

        // Display statistics
        console.log(chalk.cyan.bold("\n📊 Database Statistics:"));
        console.log(chalk.cyan(`   Total Albums: ${finalAlbumsCount} (added ${createdAlbums.length})`));
        console.log(chalk.cyan(`   Total Songs: ${finalSongsCount} (added ${createdSongs.length})`));
        console.log(chalk.cyan(`   Total Users: ${finalUsersCount}`));
        console.log(chalk.cyan(`   Total Playlists: ${finalPlaylistsCount} (added ${createdPlaylists.length})`));
        console.log(chalk.cyan(`   Featured Songs: ${createdSongs.filter(s => s.isFeatured).length}`));
        console.log(chalk.cyan(`   Genres: ${[...new Set(songsData.map(s => s.genre))].length}`));

        console.log(chalk.green.bold("\n✨ Enhanced database seeding completed successfully!"));
        console.log(chalk.blue("\n🎵 Sample data:"));
        console.log(chalk.white(`   - Top trending: ${createdSongs.sort((a, b) => b.playCount - a.playCount)[0].title}`));
        console.log(chalk.white(`   - Total play count: ${createdSongs.reduce((sum, s) => sum + s.playCount, 0).toLocaleString()}`));
        console.log(chalk.white(`   - Average songs per playlist: ${Math.round(createdPlaylists.reduce((sum, p) => sum + p.songs.length, 0) / createdPlaylists.length)}`));

        console.log(chalk.yellow.bold("\n👤 Test Users:"));
        users.forEach(user => {
            console.log(chalk.yellow(`   - ${user.email} / ${user.password} ${user.isAdmin ? '(Admin)' : ''}`));
        });

        process.exit(0);
    } catch (error) {
        console.error(chalk.red.bold("❌ Error seeding database:"), error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();

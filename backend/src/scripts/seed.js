import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";

dotenv.config();

// Sample data for seeding
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
];

const songs = [
    // Album 1: Midnight Dreams
    {
        title: "Starlight",
        artist: "Luna Eclipse",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 240,
        genre: "Electronic",
        isFeatured: true,
        playCount: 15420,
    },
    {
        title: "Moonlight Serenade",
        artist: "Luna Eclipse",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: 195,
        genre: "Electronic",
        isFeatured: false,
        playCount: 8930,
    },
    {
        title: "Night Whispers",
        artist: "Luna Eclipse",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: 210,
        genre: "Electronic",
        isFeatured: false,
        playCount: 12340,
    },

    // Album 2: Electric Vibes
    {
        title: "Neon Lights",
        artist: "DJ Neon",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 220,
        genre: "EDM",
        isFeatured: true,
        playCount: 23450,
    },
    {
        title: "Electric Dreams",
        artist: "DJ Neon",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: 185,
        genre: "EDM",
        isFeatured: true,
        playCount: 19870,
    },
    {
        title: "Pulse",
        artist: "DJ Neon",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        duration: 205,
        genre: "EDM",
        isFeatured: false,
        playCount: 14560,
    },

    // Album 3: Acoustic Sessions
    {
        title: "Coffee Shop",
        artist: "Sarah Mitchell",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        duration: 175,
        genre: "Acoustic",
        isFeatured: true,
        playCount: 17890,
    },
    {
        title: "Rainy Days",
        artist: "Sarah Mitchell",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        duration: 190,
        genre: "Acoustic",
        isFeatured: false,
        playCount: 11230,
    },
    {
        title: "Sunset Boulevard",
        artist: "Sarah Mitchell",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        duration: 200,
        genre: "Acoustic",
        isFeatured: false,
        playCount: 9870,
    },

    // Album 4: Urban Beats
    {
        title: "City Lights",
        artist: "Metro Sound",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        duration: 215,
        genre: "Hip Hop",
        isFeatured: true,
        playCount: 21340,
    },
    {
        title: "Street Dreams",
        artist: "Metro Sound",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        duration: 195,
        genre: "Hip Hop",
        isFeatured: false,
        playCount: 16780,
    },
    {
        title: "Underground",
        artist: "Metro Sound",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        duration: 180,
        genre: "Hip Hop",
        isFeatured: false,
        playCount: 13450,
    },

    // Album 5: Classical Harmony
    {
        title: "Symphony No. 1",
        artist: "Orchestra Prime",
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        duration: 320,
        genre: "Classical",
        isFeatured: false,
        playCount: 7890,
    },
    {
        title: "Moonlight Sonata",
        artist: "Orchestra Prime",
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        duration: 280,
        genre: "Classical",
        isFeatured: false,
        playCount: 6540,
    },
    {
        title: "Spring Waltz",
        artist: "Orchestra Prime",
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        duration: 245,
        genre: "Classical",
        isFeatured: false,
        playCount: 5670,
    },

    // Additional standalone songs
    {
        title: "Summer Vibes",
        artist: "Tropical Beats",
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        duration: 200,
        genre: "Pop",
        isFeatured: true,
        playCount: 25670,
    },
    {
        title: "Rock Anthem",
        artist: "Thunder Strike",
        imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 230,
        genre: "Rock",
        isFeatured: true,
        playCount: 28900,
    },
    {
        title: "Jazz Night",
        artist: "Smooth Quartet",
        imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: 265,
        genre: "Jazz",
        isFeatured: false,
        playCount: 10230,
    },
    {
        title: "Reggae Sunshine",
        artist: "Island Groove",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: 210,
        genre: "Reggae",
        isFeatured: false,
        playCount: 8760,
    },
    {
        title: "Country Road",
        artist: "Nashville Stars",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 195,
        genre: "Country",
        isFeatured: false,
        playCount: 12450,
    },
];

const seedDatabase = async () => {
    try {
        console.log(chalk.blue.bold("🌱 Starting database seeding..."));

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(chalk.green("✅ Connected to MongoDB"));

        // Clear existing data
        console.log(chalk.yellow("🗑️  Clearing existing data..."));
        await Song.deleteMany({});
        await Album.deleteMany({});
        console.log(chalk.green("✅ Existing data cleared"));

        // Create albums
        console.log(chalk.blue("📀 Creating albums..."));
        const createdAlbums = await Album.insertMany(albums);
        console.log(chalk.green(`✅ Created ${createdAlbums.length} albums`));

        // Assign album IDs to songs
        const songsWithAlbums = songs.map((song, index) => {
            // First 3 songs for each of the first 5 albums
            if (index < 15) {
                const albumIndex = Math.floor(index / 3);
                return { ...song, albumId: createdAlbums[albumIndex]._id };
            }
            // Remaining songs without albums
            return song;
        });

        // Create songs
        console.log(chalk.blue("🎵 Creating songs..."));
        const createdSongs = await Song.insertMany(songsWithAlbums);
        console.log(chalk.green(`✅ Created ${createdSongs.length} songs`));

        // Update albums with their songs
        console.log(chalk.blue("🔗 Linking songs to albums..."));
        for (let i = 0; i < 5; i++) {
            const albumSongs = createdSongs.slice(i * 3, (i + 1) * 3);
            await Album.findByIdAndUpdate(createdAlbums[i]._id, {
                songs: albumSongs.map((song) => song._id),
            });
        }
        console.log(chalk.green("✅ Songs linked to albums"));

        // Display statistics
        console.log(chalk.cyan.bold("\n📊 Seeding Statistics:"));
        console.log(chalk.cyan(`   Albums: ${createdAlbums.length}`));
        console.log(chalk.cyan(`   Songs: ${createdSongs.length}`));
        console.log(chalk.cyan(`   Featured Songs: ${songs.filter(s => s.isFeatured).length}`));
        console.log(chalk.cyan(`   Genres: ${[...new Set(songs.map(s => s.genre))].length}`));

        console.log(chalk.green.bold("\n✨ Database seeding completed successfully!"));
        console.log(chalk.blue("\n🎵 Sample data:"));
        console.log(chalk.white(`   - Top trending: ${songs.sort((a, b) => b.playCount - a.playCount)[0].title}`));
        console.log(chalk.white(`   - Most featured artist: DJ Neon`));
        console.log(chalk.white(`   - Latest album: ${albums[albums.length - 1].title}`));

        process.exit(0);
    } catch (error) {
        console.error(chalk.red.bold("❌ Error seeding database:"), error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();

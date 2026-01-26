import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Song from '../models/song.model.js';
import Album from '../models/album.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const IMPORT_LIMIT = 25000;
const BATCH_SIZE = 500;

// Free Music Archive sample URLs for different genres
const SAMPLE_AUDIO_URLS = {
    acoustic: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Kevin_MacLeod_-_Acoustic_Breeze.mp3',
    pop: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3',
    rock: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_09_-_Hachiko_The_Faithtful_Dog.mp3',
    'hip-hop': 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/blocSonic/Dj_Quads/Chillhop_Essentials/Dj_Quads_-_01_-_Its_Near.mp3',
    jazz: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Scott_Holmes/Inspiring__Upbeat_Music/Scott_Holmes_-_Upbeat_Party.mp3',
    electronic: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Broke_For_Free/Directionless_EP/Broke_For_Free_-_03_-_Something_Elated.mp3',
    classical: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Classical_Sampler/Kevin_MacLeod_-_Prelude_and_Action.mp3',
    'r-n-b': 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/TRG_Banks/Surrender/TRG_Banks_-_03_-_Bout_It.mp3',
    indie: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Kai_Engel/Satin/Kai_Engel_-_01_-_Satin.mp3',
    edm: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/blocSonic/Deshoda/Sega_Sunset/Deshoda_-_01_-_Sega_Sunset.mp3',
    default: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3'
};

// Unsplash image URLs for album covers
const ALBUM_COVER_URLS = [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
    'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500',
    'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=500',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500',
    'https://images.unsplash.com/photo-1619983081563-430f63602796?w=500',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500'
];

const getAudioUrl = (genre) => {
    const normalizedGenre = genre?.toLowerCase() || 'default';
    return SAMPLE_AUDIO_URLS[normalizedGenre] || SAMPLE_AUDIO_URLS.default;
};

const getRandomCoverUrl = () => {
    return ALBUM_COVER_URLS[Math.floor(Math.random() * ALBUM_COVER_URLS.length)];
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let count = 0;

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                if (count < IMPORT_LIMIT) {
                    results.push(data);
                    count++;
                }
            })
            .on('end', () => resolve(results))
            .on('error', reject);
    });
};

const importData = async () => {
    try {
        console.log('🚀 Starting dataset import...\n');

        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Song.deleteMany({});
        await Album.deleteMany({});
        console.log('✅ Existing data cleared\n');

        // Read CSV
        const csvPath = path.join(__dirname, '../../tmp/dataset.csv');
        console.log(`📖 Reading CSV from: ${csvPath}`);
        const rows = await parseCSV(csvPath);
        console.log(`✅ Read ${rows.length} rows from CSV\n`);

        // Group songs by album
        const albumMap = new Map();

        rows.forEach((row) => {
            const albumKey = `${row.album_name}|||${row.artists}`;

            if (!albumMap.has(albumKey)) {
                albumMap.set(albumKey, {
                    title: row.album_name,
                    artist: row.artists.split(';')[0], // Take first artist
                    imageUrl: getRandomCoverUrl(),
                    releaseYear: 2020 + Math.floor(Math.random() * 5), // Random year 2020-2024
                    songs: []
                });
            }
        });

        console.log(`📀 Found ${albumMap.size} unique albums\n`);

        // Create albums first
        console.log('💿 Creating albums...');
        const albumDocs = [];
        let albumCount = 0;

        for (const [key, albumData] of albumMap) {
            const album = new Album({
                title: albumData.title,
                artist: albumData.artist,
                imageUrl: albumData.imageUrl,
                releaseYear: albumData.releaseYear,
                songs: []
            });
            albumDocs.push(album);
            albumMap.set(key, { ...albumData, _id: album._id });

            albumCount++;
            if (albumCount % 100 === 0) {
                process.stdout.write(`\r   Created ${albumCount}/${albumMap.size} albums...`);
            }
        }

        await Album.insertMany(albumDocs);
        console.log(`\n✅ Created ${albumDocs.length} albums\n`);

        // Create songs in batches
        console.log('🎵 Creating songs...');
        const songBatches = [];
        let currentBatch = [];
        let songCount = 0;
        let featuredCount = 0;

        for (const row of rows) {
            const albumKey = `${row.album_name}|||${row.artists}`;
            const albumData = albumMap.get(albumKey);

            // Mark some songs as featured (top 5% by popularity)
            const isFeatured = parseInt(row.popularity) > 80;
            if (isFeatured) featuredCount++;

            const song = {
                title: row.track_name,
                artist: row.artists.split(';')[0],
                imageUrl: albumData.imageUrl,
                audioUrl: getAudioUrl(row.track_genre),
                duration: Math.floor(parseInt(row.duration_ms) / 1000), // Convert to seconds
                albumId: albumData._id,
                genre: row.track_genre,
                playCount: Math.floor(Math.random() * 10000),
                isFeatured: isFeatured
            };

            currentBatch.push(song);
            songCount++;

            if (currentBatch.length >= BATCH_SIZE) {
                songBatches.push([...currentBatch]);
                currentBatch = [];
                process.stdout.write(`\r   Prepared ${songCount}/${rows.length} songs...`);
            }
        }

        if (currentBatch.length > 0) {
            songBatches.push(currentBatch);
        }

        console.log(`\n   Processing ${songBatches.length} batches...\n`);

        // Insert songs in batches
        let processedBatches = 0;
        for (const batch of songBatches) {
            const insertedSongs = await Song.insertMany(batch);

            // Update albums with song references
            for (const song of insertedSongs) {
                await Album.findByIdAndUpdate(
                    song.albumId,
                    { $push: { songs: song._id } }
                );
            }

            processedBatches++;
            process.stdout.write(`\r   Processed ${processedBatches}/${songBatches.length} batches (${processedBatches * BATCH_SIZE} songs)...`);
        }

        console.log('\n\n✅ Import completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   - Albums created: ${albumDocs.length}`);
        console.log(`   - Songs created: ${songCount}`);
        console.log(`   - Featured songs: ${featuredCount}`);
        console.log(`   - Genres: ${new Set(rows.map(r => r.track_genre)).size}`);

        // Show some stats
        const totalSongs = await Song.countDocuments();
        const totalAlbums = await Album.countDocuments();
        const genres = await Song.distinct('genre');

        console.log('\n📈 Database Stats:');
        console.log(`   - Total songs in DB: ${totalSongs}`);
        console.log(`   - Total albums in DB: ${totalAlbums}`);
        console.log(`   - Total genres: ${genres.length}`);
        console.log(`   - Sample genres: ${genres.slice(0, 10).join(', ')}`);

    } catch (error) {
        console.error('\n❌ Import failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
    }
};

// Run import
importData();

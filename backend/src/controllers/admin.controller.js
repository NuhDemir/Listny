import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export const createSong = async (req, res, next) => {
  try {
    // 1. Dosyaların yüklenip yüklenmediğini kontrol et
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }

    // 2. Body’den gelen verileri al
    const { title, artist, albumId, duration } = req.body;

    // 3. Dosyaları al
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // 4. Dosyaların URL’lerini belirle (örneğin server’ın uploads klasörüne kaydedilmiş olsun)
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // 5. Yeni şarkıyı oluştur
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    // 6. Şarkıyı veritabanına kaydet
    await song.save();

    // 7. Eğer şarkı bir albüme aitse, albümün songs listesine ekle
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    // 8. Başarılı cevabı gönder
    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.error("Error in createSong", error); // hata logu
    return res.status(500).json({ message: "Internal server error" });

    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
  } catch (error) {
    console.error("Error in deleteSong", error); // hata logu
    return res.status(500).json({ message: "Internal server error" });

    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageUrl } = req.files;

    // Validate input
    if (!title || !artist || !releaseYear || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new album
    const album = new Album({
      title,
      artist,
      releaseYear,
      coverImage: imageUrl,
    });

    await album.save();

    res.status(201).json({ message: "Album created successfully", album });
  } catch (error) {}
};

export const deleteAlbum = async (req, res, next) => {};

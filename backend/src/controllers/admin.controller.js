import { CreateSongDTO } from "../dtos/song.dto.js";
import songService from "../services/song.service.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../lib/cloudinary.js";
import chalk from "chalk";

// Şarkı oluşturma
export const createSong = async (req, res, next) => {
  try {
    // request.body convert DTO
    const createSongDTO = new CreateSongDTO(req.body);

    // DTO send service
    const song = await songService.createSong(createSongDTO);
  } catch (error) {
    next(error);
  }
};

// Şarkı silme
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Şarkı bulunamadı." });
    }

    // Cloudinary'den dosyaları sil (public ID'yi URL'den çıkarmanız gerekebilir)
    // Örnek: "https://res.cloudinary.com/your_cloud_name/image/upload/v12345/folder/public_id.jpg"
    // Public ID'yi ayıklamak için regex kullanabilirsiniz.
    const audioPublicId = song.audioUrl.split("/").pop().split(".")[0];
    const imagePublicId = song.imageUrl.split("/").pop().split(".")[0];

    await deleteFromCloudinary(`listny/${audioPublicId}`); // Klasör adını ekleyin
    await deleteFromCloudinary(`listny/${imagePublicId}`); // Klasör adını ekleyin

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    await Song.findByIdAndDelete(id);

    console.log(chalk.yellow.bold(`🗑️ Şarkı silindi: ${song.title}`));
    res.status(200).json({ message: "Şarkı başarıyla silindi" });
  } catch (error) {
    console.error(chalk.red.bold(`❌ deleteSong hatası: ${error.message}`));
    next(error);
  }
};

// Albüm oluşturma
export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile) {
      // `imageUrl` yerine `imageFile`
      return res
        .status(400)
        .json({ message: "Lütfen albüm kapak resmini yükleyin." });
    }

    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;

    if (!title || !artist || !releaseYear) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    const imageUrl = await uploadToCloudinary(imageFile); // Cloudinary'ye yükle

    const album = new Album({
      title,
      artist,
      releaseYear: parseInt(releaseYear), // Yılı sayıya çevir
      imageUrl, // `coverImage` yerine `imageUrl` kullanıyorsan
    });

    await album.save();

    console.log(chalk.green.bold(`💿 Yeni albüm oluşturuldu: ${album.title}`));
    res.status(201).json({ message: "Albüm başarıyla oluşturuldu", album });
  } catch (error) {
    console.error(chalk.red.bold(`❌ createAlbum hatası: ${error.message}`));
    next(error);
  }
};

// Albüm silme
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ message: "Albüm bulunamadı." });
    }

    // Albüm kapak resmini Cloudinary'den sil
    const imagePublicId = album.imageUrl.split("/").pop().split(".")[0];
    await deleteFromCloudinary(`listny/${imagePublicId}`);

    // Albüme ait tüm şarkıları bul ve şarkıların ses ve resim dosyalarını sil
    const songsInAlbum = await Song.find({ albumId: id });
    for (const song of songsInAlbum) {
      const audioPublicId = song.audioUrl.split("/").pop().split(".")[0];
      const imagePublicId = song.imageUrl.split("/").pop().split(".")[0];
      await deleteFromCloudinary(`listny/${audioPublicId}`);
      await deleteFromCloudinary(`listny/${imagePublicId}`);
    }

    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    console.log(
      chalk.yellow.bold(`🗑️ Albüm ve ilgili şarkılar silindi: ${album.title}`)
    );
    res
      .status(200)
      .json({ message: "Albüm ve ilgili şarkılar başarıyla silindi" });
  } catch (error) {
    console.error(chalk.red.bold(`❌ deleteAlbum hatası: ${error.message}`));
    next(error);
  }
};

// src/services/song.service.js

import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../lib/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

class SongService {
  /**
   * Yeni bir şarkı oluşturur.
   * @param {import('../dtos/song.dto.js').CreateSongDTO} createSongDto
   * @param {object} files - Yüklenen dosyalar.
   * @returns {Promise<Song>}
   */
  async create(createSongDto, files) {
    if (!files || !files.audioFile || !files.imageFile) {
      throw new ApiError(400, "Ses ve resim dosyaları zorunludur.");
    }

    const [audioUrl, imageUrl] = await Promise.all([
      uploadToCloudinary(files.audioFile),
      uploadToCloudinary(files.imageFile),
    ]);

    const newSong = new Song({ ...createSongDto, audioUrl, imageUrl });
    const savedSong = await newSong.save();

    if (createSongDto.albumId) {
      await Album.findByIdAndUpdate(createSong_dto.albumId, {
        $push: { songs: savedSong._id },
      });
    }

    return savedSong;
  }

  /**
   * Tüm şarkıları listeler.
   * @returns {Promise<Song[]>}
   */
  async findAll() {
    return Song.find().sort({ createdAt: -1 }).populate("albumId");
  }

  /**
   * Belirli bir ID'ye sahip şarkıyı bulur.
   * @param {string} id - Şarkı ID'si.
   * @returns {Promise<Song>}
   */
  async findById(id) {
    const song = await Song.findById(id).populate("albumId");
    if (!song) {
      throw new ApiError(404, "Bu ID ile bir şarkı bulunamadı.");
    }
    return song;
  }

  /**
   * Öne çıkan şarkıları listeler.
   * @returns {Promise<Song[]>}
   */
  async findFeatured() {
    return Song.find({ isFeatured: true })
      .sort({ playCount: -1 })
      .limit(10)
      .populate("albumId");
  }

  /**
   * En son eklenen şarkıları listeler.
   * @returns {Promise<Song[]>}
   */
  async findLatest() {
    return Song.find().sort({ createdAt: -1 }).limit(10).populate("albumId");
  }

  /**
   * En çok dinlenen (trend) şarkıları listeler.
   * @returns {Promise<Song[]>}
   */
  async findTrending() {
    return Song.find().sort({ playCount: -1 }).limit(10).populate("albumId");
  }

  /**
   * Başlık veya sanatçı adına göre arama yapar.
   * @param {string} query - Arama terimi.
   * @returns {Promise<Song[]>}
   */
  async search(query) {
    if (!query) {
      throw new ApiError(400, "Arama terimi zorunludur.");
    }
    return Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
      ],
    }).populate("albumId");
  }

  /**
   * Belirli bir sanatçıya ait şarkıları bulur.
   * @param {string} artistName - Sanatçı adı.
   * @returns {Promise<Song[]>}
   */
  async findByArtist(artistName) {
    return Song.find({ artist: artistName }).populate("albumId");
  }

  /**
   * Belirli bir albüme ait şarkıları bulur.
   * @param {string} albumId - Albüm ID'si.
   * @returns {Promise<Song[]>}
   */
  async findByAlbum(albumId) {
    return Song.find({ albumId: albumId }).populate("albumId");
  }
}

// Singleton Prensibi: Uygulama boyunca bu servisin tek bir örneği kullanılır.
const songService = new SongService();
export default songService;

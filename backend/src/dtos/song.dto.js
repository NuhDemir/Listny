// Yeni bir şarkı  oluşturmak için veri tanımla
export class CreateSongDTO {
  constructor(body) {
    this.title = body.title;
    this.artist = body.artist;
    this.duration = body.duration ? parseInt(body.duration, 10) : 0;
    this.albumId = body.albumId || null;
    this.genre = body.genre || null;
    this.isFeatured = body.isFeatured === "true" || body.isFeatured === true;
  }
}

// Mevcut bir şarkıyı güncellemek için gereken verileri tanımlama
export class UpdateSongDTO {
  constructor(body) {
    if (body.title !== undefined) this.title = body.title;
    if (body.artist !== undefined) this.artist = body.artist;
    if (body.duration !== undefined)
      this.duration = parseInt(body.duration, 10);
    if (body.albumId !== undefined) this.albumId = body.albumId || null;
    if (body.genre !== undefined) this.genre = body.genre || null;
    if (body.isFeatured !== undefined)
      this.isFeatured = body.isFeatured === "true" || body.isFeatured === true;
    if (body.playCount !== undefined)
      this.playCount = parseInt(body.playCount, 10);
  }
}

// İstemciye döndürülecek şarkı verisini formatlar
export class SongResponseDTO {
  constructor(song) {
    this.id = song._id;
    this.title = song.title;
    this.artist = song.artist;
    this.imageUrl = song.imageUrl;
    this.audioUrl = song.audioUrl;
    this.duration = song.duration;
    this.album = song.albumId
      ? {
          id: song.albumId._id,
          title: song.albumId.title,
          artist: song.albumId.artist,
          releaseYear: song.albumId.releaseYear,
        }
      : null;

    this.isFeatured = song.isFeatured;
    this.playCount = song.playCount;
    this.genre = song.genre;
    this.createdAt = song.createdAt;
  }
}

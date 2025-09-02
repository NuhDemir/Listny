export class CreateSongDTO {
  /**
   * @type {string}
   */
  title;

  /**
   * @type {string}
   */
  artist;

  /**
   * @type {string}
   */
  duration;

  /**
   * @type {string}
   */
  albumId;

  /**
   * @type {string || null}
   */
  genre;

  /**
   * @type {boolean}
   */
  isFeatured;

  /**
   * @param {object} body
   */
  constructor(body) {
    this.title = body.title;
    this.artist = body.artist;
    this.duration = body.duration ? parseInt(body.duration, 10) : 0;
    this.albumId = body.albumId || null;
    this.genre = body.genre || null;
    this.isFeatured = body.isFeatured === "true" || body.isFeatured === true;
  }
}

import Album from "../models/album.model.js";
import chalk from "chalk";

// Tüm albümleri getir
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    console.log(chalk.blue.bold("📀 Fetching all albums"));
    res.json(albums);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error getAllAlbums controller: ${error.message}`)
    );
    next(error);
  }
};

// ID’ye göre albüm getir
export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(chalk.yellow.bold(`🔎 Fetching album with ID: ${id}`));

    const album = await Album.findById(id).populate("songs");

    if (!album) {
      console.log(chalk.red(`⚠️ Album not found: ${id}`));
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (error) {
    console.log(
      chalk.red.bold(`❌ Error getAlbumById controller: ${error.message}`)
    );
    next(error);
  }
};

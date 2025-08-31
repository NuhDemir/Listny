import { v2 as cloudinary } from "cloudinary";
import chalk from "chalk";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Dosyaları Cloudinary'ye yükler.
 * @param {object} file - Express-fileupload tarafından sağlanan dosya nesnesi.
 * @returns {Promise<string>} Yüklenen dosyanın güvenli URL'si.
 */
export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
      folder: "listny", // İsteğe bağlı: Cloudinary'de bir klasör belirle
    });
    console.log(chalk.green(`✅ Cloudinary'ye yüklendi: ${result.secure_url}`));
    return result.secure_url;
  } catch (error) {
    console.error(chalk.red("❌ Cloudinary yükleme hatası:"), error);
    throw new Error("Cloudinary yükleme işlemi başarısız oldu.");
  }
};

/**
 * Cloudinary'deki bir varlığı siler.
 * @param {string} publicId - Silinecek varlığın public ID'si.
 * @returns {Promise<object>} Silme işleminin sonucu.
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(chalk.green(`✅ Cloudinary'den silindi: ${publicId}`));
    return result;
  } catch (error) {
    console.error(chalk.red("❌ Cloudinary silme hatası:"), error);
    throw new Error("Cloudinary silme işlemi başarısız oldu.");
  }
};

export default cloudinary;

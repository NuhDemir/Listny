import fileUpload from "express-fileupload";
import path from "path";

const __dirname = path.resolve();

export const setupFileUpload = (app) => {
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: path.join(__dirname, "tmp"),
      createParentPath: true,
      limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    })
  );
};

import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import { connectDB } from "./lib/db.js";

// Utils
import { setupFileUpload } from "./utils/setupFileUpload.js";
import { setupSwagger } from "./utils/setupSwagger.js";
import { errorHandler } from "./utils/errorHandler.js";

// Routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import artistRoutes from "./routes/artist.route.js";
import statsRoutes from "./routes/stat.route.js";
import searchRoutes from "./routes/search.route.js";
import libraryRoutes from "./routes/library.route.js";

dotenv.config({ override: true });
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Setup middlewares
setupFileUpload(app);
setupSwagger(app);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/library", libraryRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(chalk.cyan.bold(`🚀 Server running on port ${PORT}`));
  connectDB();
});

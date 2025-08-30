import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

// Utils
import { setupClerk } from "./utils/setupClerk.js";
import { setupFileUpload } from "./utils/setupFileUpload.js";
import { setupSwagger } from "./utils/setupSwagger.js";
import { errorHandler } from "./utils/errorHandler.js";

// Routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stat.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Setup middlewares
setupClerk(app);
setupFileUpload(app);
setupSwagger(app);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});

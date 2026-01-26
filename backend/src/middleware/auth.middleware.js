import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 🔒 Kullanıcının giriş yapıp yapmadığını kontrol eden middleware
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - You must be logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    if (!decoded.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Get user from database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.userId = decoded.userId;
    req.user = user; // Add user object to request
    next();
  } catch (error) {
    console.error("ProtectRoute Error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

//  Admin rolünü kontrol eden middleware
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }

    next();
  } catch (error) {
    console.error("RequireAdmin Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "7d",
  });
};

export const register = async (req, res, next) => {
  try {
    const { username, email, password, fullname } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email
          ? "Email already registered"
          : "Username already taken"
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      fullname,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log("🔐 Login attempt:", { body: req.body });

    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      console.log("❌ Missing credentials");
      return res.status(400).json({ message: "Email/username and password are required" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    console.log("👤 User found:", user ? `${user.email}` : "Not found");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    console.log("🔑 Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id);

    console.log("✅ Login successful:", user.email);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
    next(error);
  }
};

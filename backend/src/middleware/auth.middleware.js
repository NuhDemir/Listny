import { clerkClient } from "@clerk/express";

// 🔒 Kullanıcının giriş yapıp yapmadığını kontrol eden middleware
export const protectRoute = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - You must be logged in to Listny" });
    }
    next();
  } catch (error) {
    console.error("ProtectRoute Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 👑 Admin rolünü kontrol eden middleware
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    const currentUser = await clerkClient.users.getUser(req.auth.userId);

    const userEmail = currentUser?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "Bad Request - No email found for user" });
    }

    const isAdmin = process.env.ADMIN_EMAIL === userEmail;

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }

    next();
  } catch (error) {
    console.error("RequireAdmin Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

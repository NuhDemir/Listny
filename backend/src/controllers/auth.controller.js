import User from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    // Handle the callback logic here
    const { id, firstName, lastName, imageUrl } = req.body; // Example: get data from request body
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      //signup
      await User.create({
        clerkId: id,
        fullname: `${firstName} ${lastName}`,
        imageUrl: imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error handling callback:", error);
    res.status(500).json({ message: "Internal server error", error });

    next(error);
  }
};

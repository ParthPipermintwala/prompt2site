import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(userId).select("-password -googleId").lean();
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

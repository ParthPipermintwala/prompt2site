import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  cacheKeys,
  getJsonCache,
  setJsonCache,
} from "../services/cacheService.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const userCacheKey = cacheKeys.user(userId);
    const cachedUser = await getJsonCache(userCacheKey);

    if (cachedUser) {
      req.user = cachedUser;
      return next();
    }

    const user = await User.findById(userId).select("-password -googleId").lean();
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await setJsonCache(userCacheKey, user);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  verifyGoogleIdToken,
  loginWithGoogle,
  generateJWTToken,
  setTokenCookie,
} from "../services/authServices.js";
import { cacheKeys, setJsonCache } from "../services/cacheService.js";

const toSafeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  credits: user.credits,
  plan: user.plan,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// Handle Google authentication
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    const { name, email, picture, googleId } =
      await verifyGoogleIdToken(idToken);

    const user = await loginWithGoogle(name, email, picture, googleId);

    const jwtToken = await generateJWTToken(user._id);
    await setTokenCookie(res, jwtToken);
    const safeUser = toSafeUser(user);
    await setJsonCache(cacheKeys.user(user._id), safeUser);

    return res.status(200).json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Google authentication failed",
    });
  }
};

// Handle user logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};

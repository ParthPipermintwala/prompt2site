import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  verifyGoogleIdToken,
  loginWithGoogle,
} from "../services/authServices.js";

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    const { name, email, picture, googleId } =
      await verifyGoogleIdToken(idToken);

    const user = await loginWithGoogle(name, email, picture, googleId);

    // Generate JWT token for the user
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token in HTTP-only cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Google authentication failed",
    });
  }
};

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


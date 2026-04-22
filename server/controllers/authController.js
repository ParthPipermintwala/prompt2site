import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  verifyGoogleIdToken,
  loginWithGoogle,
  generateJWTToken,
  setTokenCookie,
} from "../services/authServices.js";

// Handle Google authentication
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    const { name, email, picture, googleId } =
      await verifyGoogleIdToken(idToken);

    const user = await loginWithGoogle(name, email, picture, googleId);

    const jwtToken = await generateJWTToken(user._id);
    await setTokenCookie(res, jwtToken);

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Google authentication failed",
    });
  }
};

// Handle user registration
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email }).select("_id").lean();
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const jwtToken = await generateJWTToken(user._id);
    await setTokenCookie(res, jwtToken);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    // Handle validation errors from Mongoose schema
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        message: messages[0], // or send all messages
      });
    }

    // Handle duplicate key error (e.g., email already exists)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      message: error.message || "User registration failed",
    });
  }
};

// Handle user login
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch =await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const jwtToken = await generateJWTToken(user._id);
    await setTokenCookie(res, jwtToken);

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
    return res.status(500).json({
      message: error.message || "Login failed",
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

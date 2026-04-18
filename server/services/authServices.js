import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//Initialize the Google OAuth2 client
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

// Verify the Google ID token and extract user information
export const verifyGoogleIdToken = async (idToken) => {
  // Verify the ID token with Google
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  // Validate the payload and ensure it contains the necessary information
  if (!payload) {
    const error = new Error("Invalid ID token");
    error.statusCode = 400;
    throw error;
  }
  const { name, email, picture, email_verified, sub: googleId, iss } = payload;

  // Ensure the email is verified
  if (!email_verified) {
    const error = new Error("Email not verified");
    error.statusCode = 400;
    throw error;
  }

  // Ensure the token is issued by Google
  if (iss !== "accounts.google.com" && iss !== "https://accounts.google.com") {
    const error = new Error("Invalid token issuer");
    error.statusCode = 400;
    throw error;
  }

  return {
    name,
    email,
    picture,
    googleId,
  };
};

// Handle Google login or registration
export const loginWithGoogle = async (name, email, picture, googleId) => {
  // Check if user exists, if not create a new user
  let user = await User.findOne({ googleId })
    .select("_id name email avatar googleId")
    .lean();

  // If user doesn't exist with googleId, check if there's a user with the same email
  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      // If a user with the same email exists but doesn't have googleId, link the accounts
      user.googleId = googleId;
      user.name = name; // Update name and avatar in case they changed in Google profile
      user.avatar = picture;
      await user.save();
    } else {
      // If no user with the same email exists, create a new user
      user = await User.create({
        name,
        email,
        avatar: picture,
        googleId,
      });
    }
  }
  return user;
};

export const generateJWTToken = async (userId) => {
  // Generate JWT token for the user
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return jwtToken;
};

export const setTokenCookie = async (res, jwtToken) => {
  // Set token in HTTP-only cookie
  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

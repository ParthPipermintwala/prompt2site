import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";

//Initialize the Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    user = await User.findOneAndUpdate(
      { email },
      {
        $setOnInsert: { name, email, avatar: picture, googleId },
        $set: { googleId },
      },
      { upsert: true, new: true },
    );
  }
  return user;
};

import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      pattern: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"], 
    },
    avatar: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Only unique if it exists, allows multiple null values
    },
    credits: {
      type: Number,
      default: 100,
      min: 0,
    },
    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
  },
  {
    strict: "throw",
    timestamps: true,
    methods: {
      verifyPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  },
);

const User = mongoose.model("User", userSchema);

export default User;

import { Schema } from "mongoose";

const websiteSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Untitled Website",
    },
    latestCode: {
      type: String,
      required: true,
    },
    deployed:{
        type: Boolean,
        default: false,
    },
    deployeUrl:{
        type: String,
        default: null,
    },
    slug:{
        type: String,
        sparse: true, // Only unique if it exists, allows multiple null values
        unique: true,
    },
    conversation: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true, strict: "throw" },
);

const Website = mongoose.model("Website", websiteSchema);

export default Website;

import { Schema } from "mongoose";

const messageSchema = Schema(
  {
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: "throw" },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
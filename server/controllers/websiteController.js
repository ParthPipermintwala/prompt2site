import { readFile } from "fs/promises";
import generateResponse from "../config/openRouter.js";
import extractJson from "../services/extractJson.js";
import Website from "../models/websiteModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const generatewebsite = async (req, res) => {
  try {
    const masterprompt = await readFile("./asset/prompt.txt", "utf-8");
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.credits < 50) {
      return res
        .status(403)
        .json({
          message:
            "Insufficient credits. 50 credits required to generate a website.",
        });
    }
    const finalPrompt = masterprompt.replace("{USER_PROMPT}", prompt);
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(finalPrompt);
      parsed = await extractJson(raw);
      if (!parsed) {
        raw = await generateResponse(
          finalPrompt +
            "\n\nThe previous response was not valid JSON. Please provide only valid JSON without any explanations or markdown.",
        );
        parsed = await extractJson(raw);
      }
    }
    if (!parsed.code) {
      return res
        .status(500)
        .json({ message: "Failed to generate website code" });
    }
    const ai_conversation = await Message.create({
      role: "ai",
      content: parsed.message,
    });
    const user_conversation = await Message.create({
      role: "user",
      content: prompt,
    });
    const website = await Website.create({
      user: user._id,
      title: parsed.website_title,
      latestCode: parsed.code,
      conversation: [user_conversation._id, ai_conversation._id],
    });
    user.credits -= 50;
    await user.save();
    return res
      .status(201)
      .json({websiteId: website._id, creditsLeft: user.credits });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "An error occurred while generating the website", error: error.message });
  }
};

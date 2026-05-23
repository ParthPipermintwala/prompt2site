import { readFile } from "fs/promises";
import generateResponse from "../config/openRouter.js";
import extractWebsiteResponse from "../services/extractJson.js";
import Website from "../models/websiteModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import {
  cacheKeys,
  deleteCache,
  getJsonCache,
  setJsonCache,
} from "../services/cacheService.js";

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
      return res.status(403).json({
        message:
          "Insufficient credits. 50 credits required to generate a website.",
      });
    }
    const finalPrompt = masterprompt.replace("{USER_PROMPT}", prompt);
    let raw = "";
    let parsed = null;
    raw = await generateResponse(finalPrompt);
    parsed = await extractWebsiteResponse(raw);
    if (!parsed) {
      raw = await generateResponse(
        finalPrompt +
          "\n\n The response was not in the expected format. Please provide the response strictly in the following format:\n\nTITLE: <Title of the website>\nMESSAGE: <A message describing the website>\nCODE:\n```html\n<HTML code here>\n```\n\nMake sure to include all three sections: TITLE, MESSAGE, and CODE.",
      );
      parsed = await extractWebsiteResponse(raw);
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
      title: parsed.title || "Untitled Website",
      latestCode: parsed.code,
      conversations: [user_conversation._id, ai_conversation._id],
    });
    user.credits -= 50;
    await user.save();
    await deleteCache(
      cacheKeys.user(user._id),
      cacheKeys.websiteList(user._id),
    );
    return res
      .status(201)
      .json({ websiteId: website._id, creditsLeft: user.credits });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while generating the website",
      error: error.message,
    });
  }
};

export const getWebsites = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = cacheKeys.websiteDetail(req.user._id, id);
    const cachedWebsite = await getJsonCache(cacheKey);

    if (cachedWebsite) {
      return res.status(200).json(cachedWebsite);
    }

    const website = await Website.findOne({
      _id: id,
      user: req.user._id,
    })
      .populate("conversations")
      .lean();
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    await setJsonCache(cacheKey, website);
    return res.status(200).json(website);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching websites" });
  }
};

export const getWebsitesBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const cacheKey = cacheKeys.websiteSlug(req.user._id, slug);
    const cachedWebsite = await getJsonCache(cacheKey);

    if (cachedWebsite) {
      return res.status(200).json(cachedWebsite);
    }

    const website = await Website.findOne({
      slug: slug,
      user: req.user._id,
    })
      .select("latestCode")
      .lean();
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }
    await setJsonCache(cacheKey, website);
    return res.status(200).json(website);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching websites" });
  }
};

export const changeWebsite = async (req, res) => {
  try {
    const updatePrompt = await readFile("./asset/updatePrompt.txt", "utf-8");
    const { prompt } = req.body;
    const { id } = req.params;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.credits < 15) {
      return res.status(403).json({
        message: "Insufficient credits. 15 credits required to save changes.",
      });
    }
    const website = await Website.findOne({
      _id: id,
      user: req.user._id,
    });
    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    const finalPrompt = updatePrompt
      .replace("{USER_PROMPT}", prompt)
      .replace("{WEBSITE_CODE}", website.latestCode);

    let raw = "";
    let parsed = null;
    raw = await generateResponse(finalPrompt);
    parsed = await extractWebsiteResponse(raw);
    if (!parsed) {
      raw = await generateResponse(
        finalPrompt +
          "\n\n The response was not in the expected format. Please provide the response strictly in the following format:\n\nTITLE: <Title of the website>\nMESSAGE: <A message describing the website>\nCODE:\n```html\n<HTML code here>\n```\n\nMake sure to include all three sections: TITLE, MESSAGE, and CODE.",
      );
      parsed = await extractWebsiteResponse(raw);
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
    await Website.findByIdAndUpdate(website._id, {
      latestCode: parsed.code,
      $push: {
        conversations: {
          $each: [user_conversation._id, ai_conversation._id],
        },
      },
    });
    user.credits -= 15;
    await website.save();
    await user.save();
    await deleteCache(
      cacheKeys.user(user._id),
      cacheKeys.websiteList(user._id),
      cacheKeys.websiteDetail(user._id, website._id),
      cacheKeys.websiteSlug(user._id, website.slug),
    );
    return res.status(201).json({
      conversations: [user_conversation, ai_conversation],
      latestCode: parsed.code,
      creditsLeft: user.credits,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while saving changes" });
  }
};

export const deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const website = await Website.findOne({
      _id: id,
      user: req.user._id,
    })
      .select("conversations slug")
      .lean();
    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }
    await Message.deleteMany({
      _id: { $in: website.conversations },
    });
    await Website.findByIdAndDelete(id);
    await deleteCache(
      cacheKeys.websiteList(req.user._id),
      cacheKeys.websiteDetail(req.user._id, id),
      cacheKeys.websiteSlug(req.user._id, website.slug),
    );

    res.json({
      success: true,
      message: "Website and conversations deleted",
    });
  } catch {
    return res
      .status(500)
      .json({ message: "An error occurred while saving changes" });
  }
};

export const getAll = async (req, res) => {
  try {
    const cacheKey = cacheKeys.websiteList(req.user._id);
    const cachedWebsites = await getJsonCache(cacheKey);

    if (cachedWebsites) {
      return res.status(200).json(cachedWebsites);
    }

    const website = await Website.find({ user: req.user._id })
      .select("-conversations -__v -user")
      .lean();
    await setJsonCache(cacheKey, website);
    return res.status(200).json(website);
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "An error occurred while fetching websites" });
  }
};

export const deploy = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!website) return res.status(400).json({ message: "website not found" });
    if (!website.slug) {
      website.slug = website.title
        .toLowerCase()
        .trim()
        .slice(0, 60)
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");
      +website._id.toString().slice(-5);
    }
    website.deployed = true;
    website.deployeUrl = `${process.env.ORIGIN}site/${website.slug}`;
    await website.save();
    await deleteCache(
      cacheKeys.websiteList(req.user._id),
      cacheKeys.websiteDetail(req.user._id, website._id),
      cacheKeys.websiteSlug(req.user._id, website.slug),
    );

    return res.status(200).json({
      deployed: website.deployed,
      deployeUrl: website.deployeUrl,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deploy website" });
  }
};

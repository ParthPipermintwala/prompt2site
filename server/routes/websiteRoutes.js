import express from "express";
import { generatewebsite, getWebsites } from "../controllers/websiteController.js";

const router = express.Router();

router.post("/generate", generatewebsite);
router.get("/websiteData/:id", getWebsites);

export default router;

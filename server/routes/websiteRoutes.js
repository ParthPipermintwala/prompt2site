import express from "express";
import { generatewebsite, getWebsites } from "../controllers/websiteController.js";

const router = express.Router();

router.post("/generate", generatewebsite);
router.get("/websites/:id", getWebsites);

export default router;

import express from "express";
import { changeWebsite, generatewebsite, getWebsites } from "../controllers/websiteController.js";

const router = express.Router();

router.post("/generate", generatewebsite);
router.get("/websiteData/:id", getWebsites);
router.post("/changeWebsite/:id", changeWebsite);

export default router;

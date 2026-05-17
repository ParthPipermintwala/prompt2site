import express from "express";
import { changeWebsite, generatewebsite, getAll, getWebsites } from "../controllers/websiteController.js";

const router = express.Router();

router.post("/generate", generatewebsite);
router.get("/websiteData/:id", getWebsites);
router.post("/changeWebsite/:id", changeWebsite);
router.get("/getAll", getAll);

export default router;

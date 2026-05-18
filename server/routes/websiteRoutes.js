import express from "express";
import { changeWebsite, deploy, generatewebsite, getAll, getWebsites, getWebsitesBySlug } from "../controllers/websiteController.js";

const router = express.Router();

router.post("/generate", generatewebsite);
router.get("/websiteData/:id", getWebsites);
router.post("/changeWebsite/:id", changeWebsite);
router.get("/getAll", getAll);
router.get("/deploy/:id", deploy);
router.get("/getBySlug/:slug", getWebsitesBySlug);

export default router;

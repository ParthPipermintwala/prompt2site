import express from "express";
import {
  changeWebsite,
  deleteWebsite,
  deploy,
  generatewebsite,
  getAll,
  getWebsites,
  getWebsitesBySlug,
} from "../controllers/websiteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generatewebsite);
router.get("/websiteData/:id", authMiddleware, getWebsites);
router.post("/changeWebsite/:id", authMiddleware, changeWebsite);
router.get("/getAll", authMiddleware, getAll);
router.get("/deploy/:id", authMiddleware, deploy);
router.get("/getBySlug/:slug", getWebsitesBySlug);
router.delete("/delete/:id", authMiddleware, deleteWebsite);

export default router;

import express from "express";
import { generatewebsite } from "../controllers/websiteController";

const router = express.Router();

router.post("/generate", generatewebsite);

export default router;

import express from "express";
import { uploadImage, deleteImage } from "../controllers/upload.controller.js";

const router = express.Router();

// Upload image
router.post("/upload", uploadImage);

// Delete image
router.delete("/delete", deleteImage);

export default router;

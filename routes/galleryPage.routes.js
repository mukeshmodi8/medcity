// server/routes/galleryPage.routes.js
import express from "express";
import {
  getGallery,
  updateGallery,
} from "../controllers/galleryPage.controller.js";
// abhi ke liye admin guard hata diya, baad me add kar sakte ho
// import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/gallery", getGallery);
// router.put("/gallery", requireAdmin, updateGallery);
router.put("/gallery", updateGallery);

export default router;

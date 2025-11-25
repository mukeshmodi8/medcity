// routes/aboutPage.routes.js
import express from "express";
import {
  getAboutPageData,
  updateAboutPageData,
} from "../controllers/aboutPage.controller.js";

const router = express.Router();

router.get("/about", getAboutPageData);
router.put("/about", updateAboutPageData);

export default router;

import express from "express";
import { getHomePage, updateHomePage } from "../controllers/homePage.controller.js";

const router = express.Router();
router.get("/home", getHomePage);
router.put("/home", updateHomePage);

export default router;

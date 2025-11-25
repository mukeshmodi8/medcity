// server/controllers/homePage.controller.js
import HomePage from "../models/HomePage.js";

export const getHomePage = async (req, res) => {
  try {
    let page = await HomePage.findOne();

    if (!page) {
      page = await HomePage.create({
        hero: {},
        doctors: [],
        services: { dental: [], cosmetic: [] },
        gallery: [],
      });
    }

    // ensure defaults
    if (!page.doctors) page.doctors = [];
    if (!page.services) page.services = { dental: [], cosmetic: [] };
    if (!page.gallery) page.gallery = [];

    res.json(page);
  } catch (err) {
    console.error("getHomePage error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateHomePage = async (req, res) => {
  try {
    const { hero, doctors, services, gallery } = req.body || {};

    let page = await HomePage.findOne();
    if (!page) {
      page = new HomePage({
        hero: {},
        doctors: [],
        services: { dental: [], cosmetic: [] },
        gallery: [],
      });
    }

    if (hero) {
      page.hero = {
        ...(page.hero?.toObject?.() || page.hero || {}),
        ...hero,
      };
    }

    if (Array.isArray(doctors)) {
      page.doctors = doctors;
    }

    if (services && typeof services === "object") {
      page.services = {
        ...(page.services?.toObject?.() || page.services || {}),
        ...services,
      };
    }

    // ✅ yahan gallery handle kar rahe hain
    if (Array.isArray(gallery)) {
      page.gallery = gallery;
    }

    await page.save();

    res.json({
      message: "Home page saved",
      page,
    });
  } catch (err) {
    console.error("updateHomePage error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

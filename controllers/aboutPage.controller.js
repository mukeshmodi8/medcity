// controllers/aboutPage.controller.js

// yaha agar koi import hai to use bhi ESM me karo:
import AboutPage from "../models/aboutPage.model.js"; // example, agar model use kar rahe ho

export const getAboutPageData = async (req, res) => {
  try {
    // yaha tumhara actual logic
    // example:
    const aboutData = await AboutPage.findOne();
    res.json(aboutData);
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateAboutPageData = async (req, res) => {
  try {
    // yaha tumhara actual update logic
    // const { title, description } = req.body;
    // ...
    res.json({ message: "About page updated successfully" });
  } catch (error) {
    console.error("Error in updateAboutPageData:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

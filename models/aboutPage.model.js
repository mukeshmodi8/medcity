// models/aboutPage.model.js
import mongoose from "mongoose";

const aboutPageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      default: "about",
      unique: true,
    },

    // Hero / Banner section
    hero_banner: {
      heading: { type: String, default: "" },
      text: { type: String, default: "" },
      bgImage: { type: String, default: "" }, // koi URL ya path
    },

    // About intro + experience
    about_intro: {
      heading: { type: String, default: "" },
      text: { type: String, default: "" },
      experienceYears: { type: Number, default: 0 },
    },

    // Features / CTA
    features_cta: {
      heading: { type: String, default: "" },
      text: { type: String, default: "" },
    },

    // Final contact CTA
    contact_cta: {
      heading: { type: String, default: "" },
      text: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const AboutPage = mongoose.model("AboutPage", aboutPageSchema);

export default AboutPage;

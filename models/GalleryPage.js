// server/models/GalleryPage.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    src: { type: String, default: "" },   // ❌ required nahi, warna empty pe error
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const galleryPageSchema = new mongoose.Schema(
  {
    images: {
      type: [imageSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const GalleryPage = mongoose.model("GalleryPage", galleryPageSchema);

export default GalleryPage;

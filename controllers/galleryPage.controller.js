// server/controllers/galleryPage.controller.js
import GalleryPage from "../models/GalleryPage.js";

// GET /api/gallery
export const getGallery = async (req, res) => {
  try {
    let doc = await GalleryPage.findOne();

    if (!doc) {
      doc = await GalleryPage.create({ images: [] });
    }

    // frontend ko { images: [...] } chahiye
    return res.json({
      images: doc.images,
      _id: doc._id,
    });
  } catch (err) {
    console.error("getGallery error:", err);
    return res
      .status(500)
      .json({ message: "Server error (getGallery)", error: err.message });
  }
};

// PUT /api/gallery
export const updateGallery = async (req, res) => {
  try {
    const { images } = req.body || {};

    let doc = await GalleryPage.findOne();
    if (!doc) {
      doc = new GalleryPage({ images: [] });
    }

    if (Array.isArray(images)) {
      // ❗ empty src wali entries hata do
      const cleaned = images
        .filter(
          (img) =>
            img &&
            typeof img.src === "string" &&
            img.src.trim() !== ""
        )
        .map((img) => ({
          src: img.src,
          alt: img.alt || "",
        }));

      doc.images = cleaned;
    }

    await doc.save();

    return res.json({
      message: "Gallery updated",
      images: doc.images,
      _id: doc._id,
    });
  } catch (err) {
    console.error("updateGallery error:", err);
    return res
      .status(500)
      .json({ message: "Server error (updateGallery)", error: err.message });
  }
};

// server/routes/homeContent.routes.js
const express = require("express");
const router = express.Router();

const HomeContent = require("../models/HomeContent");
const requireAdmin = require("../middleware/requireAdmin");

// Helper: ensure ek default doc hamesha ho
async function getOrCreateHomeContent() {
  let doc = await HomeContent.findOne({ slug: "home" });
  if (!doc) {
    doc = await HomeContent.create({
      slug: "home",
      heroSlides: [
        {
          eyebrow: "Caring For The Health And Well Being Of Family.",
          title: "Quality Health Care For Family.",
          subText:
            "The health and well-being of our patients and their health care team will always be our priority...",
          ctaText: "More About Us",
        },
      ],
      services: [],
      doctors: [],
      testimonials: [],
      blogPosts: [],
    });
  }
  return doc;
}

// GET /api/home-content  -> poora home content
router.get("/", async (req, res) => {
  try {
    const doc = await getOrCreateHomeContent();
    res.json(doc);
  } catch (err) {
    console.error("GET /home-content error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/home-content  -> poora content replace/update (Admin)
router.put("/", requireAdmin, async (req, res) => {
  try {
    const payload = req.body;

    let doc = await HomeContent.findOne({ slug: "home" });
    if (!doc) {
      doc = new HomeContent({ slug: "home" });
    }

    // sirf allowed fields update
    if (payload.heroSlides) doc.heroSlides = payload.heroSlides;
    if (payload.services) doc.services = payload.services;
    if (payload.doctors) doc.doctors = payload.doctors;
    if (payload.testimonials) doc.testimonials = payload.testimonials;
    if (payload.blogPosts) doc.blogPosts = payload.blogPosts;

    await doc.save();

    res.json(doc);
  } catch (err) {
    console.error("PUT /home-content error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//
// Services specific endpoints
//

// POST /api/home-content/services  -> add new service
router.post("/services", requireAdmin, async (req, res) => {
  try {
    const { title, description, link, imageUrl } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const doc = await getOrCreateHomeContent();

    doc.services.push({ title, description, link, imageUrl });
    await doc.save();

    res.status(201).json(doc.services[doc.services.length - 1]);
  } catch (err) {
    console.error("POST /services error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/home-content/services/:id -> update one service
router.patch("/services/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, imageUrl } = req.body;

    const doc = await getOrCreateHomeContent();
    const service = doc.services.id(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (link !== undefined) service.link = link;
    if (imageUrl !== undefined) service.imageUrl = imageUrl;

    await doc.save();
    res.json(service);
  } catch (err) {
    console.error("PATCH /services/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/home-content/services/:id
router.delete("/services/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await getOrCreateHomeContent();
    const service = doc.services.id(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.remove();
    await doc.save();

    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error("DELETE /services/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

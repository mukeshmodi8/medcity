const mongoose = require("mongoose");

const HeroSlideSchema = new mongoose.Schema(
  {
    eyebrow: String,
    title: { type: String, required: true },
    subText: String,
    ctaText: String,
    imageUrl: String,
  },
  { _id: true }
);

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    link: String,
    imageUrl: String,
  },
  { _id: true }
);

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: String,
    description: String,
    link: String,
    imageUrl: String,
  },
  { _id: true }
);

const TestimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    designation: String,
    imageUrl: String,
  },
  { _id: true }
);

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: String,
    date: String,
    link: String,
    imageUrl: String,
  },
  { _id: true }
);

const HomeContentSchema = new mongoose.Schema(
  {
    slug: { type: String, default: "home", unique: true },
    heroSlides: [HeroSlideSchema],
    services: [ServiceSchema],
    doctors: [DoctorSchema],
    testimonials: [TestimonialSchema],
    blogPosts: [BlogPostSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeContent", HomeContentSchema);

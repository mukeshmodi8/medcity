import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String },
    specialization: { type: String },
    description: { type: String },
    degrees: { type: String },
    expertise: { type: String },
    rating: { type: String },
    reviewsText: { type: String },
    biography: { type: String },

    imageUrl: { type: String },
  },
  { _id: true }
);

const homePageSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: {
        type: String,
        default: "CARING FOR THE HEALTH AND WELL BEING OF FAMILY.",
      },
      title: {
        type: String,
        default: "Delivering Best Medical Care.",
      },
      subtitle: {
        type: String,
        default:
          "Our team focuses on delivering the best patient outcomes using advanced treatments and compassionate care.",
      },
      ctaText: {
        type: String,
        default: "Learn More",
      },
    },
    doctors: [doctorSchema],

    services: {
      cosmetic: { type: Array, default: [] },
      dental: { type: Array, default: [] },
    },
  },
  { timestamps: true }
);

const HomePage = mongoose.model("HomePage", homePageSchema);
export default HomePage;

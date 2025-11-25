// server/models/Doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String, // base64 ya normal URL dono chalenge
      trim: true,
    },
    // optional: future me unique URL banane ke liye
    slug: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;

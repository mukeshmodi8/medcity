// server/controllers/doctor.controller.js
import Doctor from "../models/Doctor.js";

/**
 * GET /api/doctors
 * sab doctors list
 */
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: 1 });
    res.json(doctors);
  } catch (err) {
    console.error("getDoctors error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/doctors
 * Admin panel se aane wale pure doctors array ko replace kar do
 * (simple approach: purani list delete + nayi insert)
 */
export const saveAllDoctors = async (req, res) => {
  try {
    const { doctors } = req.body;

    if (!Array.isArray(doctors)) {
      return res
        .status(400)
        .json({ message: "doctors field must be an array" });
    }

    // purane sab delete
    await Doctor.deleteMany({});

    // nayi list insert
    const inserted = await Doctor.insertMany(doctors);

    res.json({
      message: "Doctors saved successfully",
      doctors: inserted,
    });
  } catch (err) {
    console.error("saveAllDoctors error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/doctors/:id  (optional, agar future me single delete chahiye)
 */
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    console.error("deleteDoctor error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

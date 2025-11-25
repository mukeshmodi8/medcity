// server/routes/doctor.routes.js
import express from "express";
import { getDoctors, saveAllDoctors, deleteDoctor } from "../controllers/doctor.controller.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// sab doctors (frontend header, doctors page, admin load sab yahi se)
router.get("/doctors", getDoctors);

// admin se pure doctors ek saath save karna
router.put("/doctors", requireAdmin, saveAllDoctors);

// optional: single doctor delete (agar kabhi use karna chaho)
router.delete("/doctors/:id", requireAdmin, deleteDoctor);

export default router;

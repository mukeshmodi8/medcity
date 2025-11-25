import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import homePageRoutes from "./routes/homePage.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import galleryPageRoutes from "./routes/galleryPage.routes.js";
import aboutPageRoutes from "./routes/aboutPage.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ sabse pehle CORS + body parsers
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://medcity-frontend-1.onrender.com/"   
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

connectDB();

// ✅ ab root route (ye bhi CORS se guzrega)
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Medcity Backend is Live ✅" });
});

// ✅ phir baaki routes
app.use("/api/pages", homePageRoutes);
app.use("/api", userRoutes);
app.use("/api", doctorRoutes);
app.use("/api", galleryPageRoutes);
app.use("/api", aboutPageRoutes);

app.listen(PORT, () => console.log(`Server on ${PORT}`));

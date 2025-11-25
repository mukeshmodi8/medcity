import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import homePageRoutes from "./routes/homePage.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import galleryPageRoutes from "./routes/galleryPage.routes.js";
import aboutPageRoutes from "./routes/aboutPage.routes.js"; // ✅ अब ये सही चलेगा

const app = express();
app.get("/", (req, res) => {
  res.send("Medcity Backend is Live ✅");
});


const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

connectDB();

app.use("/api/pages", homePageRoutes);
app.use("/api", userRoutes);
app.use("/api", doctorRoutes);
app.use("/api", galleryPageRoutes);
app.use("/api", aboutPageRoutes);

app.listen(PORT, () => console.log(`Server on ${PORT}`));

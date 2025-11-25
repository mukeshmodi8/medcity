// server/index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes"); // tumhara pehle se hoga
const homeContentRoutes = require("./routes/homeContent.routes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/medcity", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth routes
app.use("/api", authRoutes);

// NEW: home content routes
app.use("/api/home-content", homeContentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

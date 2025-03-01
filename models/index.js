const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const campaignRoutes = require("./routes/Campaign");
const userRoutes = require("./routes/User");
const donationRoutes = require("./routes/Donation");
const queryRoutes = require("./routes/Query");

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/campaign", campaignRoutes);
app.use("/api/user", userRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/query", queryRoutes);

// 404 Route
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

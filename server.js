const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Import routes
const campaignRoutes = require("./routes/campaign");
const userRoutes = require("./routes/user");
const paymentRoutes = require("./routes/payment");
const donationRoutes = require("./routes/donation");
const queryRoutes = require("./routes/query");

// Define routes
app.use("/api/campaign", campaignRoutes);
app.use("/api/user", userRoutes);
app.use("/api/donate", paymentRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/query", queryRoutes);

// Handle 404 errors
app.use("*", (req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server shut down.");
    process.exit(0);
  });
});

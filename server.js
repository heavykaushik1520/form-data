require("dotenv").config();  // Ensure dotenv is properly loaded
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();
const PORT = process.env.PORT || 7000;

// Enable CORS for React app
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://artiststation.co.in", // Corrected origin
      "http://localhost:3001",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
    credentials: true, // Allow cookies to be sent (if needed)
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // To serve uploaded images

// Routes
app.use("/api", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", formRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from your Node.js Express app in Devrukh!");
});

// Sync Database
db.sequelize.sync()
  .then(() => {
    console.log("Database synced!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

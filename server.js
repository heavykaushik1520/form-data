require("dotenv").config;
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require('cors');


//routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();
const PORT = 7000;

app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  
}));

app.use(bodyParser.json());

//use
app.use("/api", adminRoutes);
// Use your authentication routes
app.use("/api/auth", authRoutes);

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // to serve uploaded images
app.use("/api", formRoutes);

app.get("/", (req, res) => {
  res.send("Hello from your Node.js Express app in Devrukh!");
});

db.sequelize.sync().then(() => {
  console.log("Database synced!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

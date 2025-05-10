const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

async function loginAdmin(req, res) {
  let reqData  = req.body;


  try {
    const admin = await db.Admin.findOne({ where: { admin_email :reqData.admin_email } });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(reqData.password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin.admin_id, role: admin.role }, 
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


function isAdmin(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.admin = decoded; 

    if (req.admin.role === 'admin' || req.admin.role === 'superadmin') {
      next(); 
    } else {
      return res.status(403).json({ message: 'Access denied. Admin role required.' }); // Forbidden
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = {
  loginAdmin,
  isAdmin
};
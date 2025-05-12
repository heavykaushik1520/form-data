const bcrypt = require("bcrypt");
const db = require("../models");

async function createAdmin(req, res) {
  try {
    const { password, ...adminData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await db.Admin.create({
      ...adminData,
      password: hashedPassword,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res
      .status(500)
      .json({ message: "Failed to create admin", error: error.message });
  }
}

module.exports = {
  createAdmin,
};

const db = require("../models");
const autho = require("../controllers/authController");
const jwt = require("jsonwebtoken");

const XLSX = require("xlsx");

const submitForm = async (req, res) => {
  const imageUrl = req.file
    ? `http://localhost:7000/uploads/${req.file.filename}`
    : null;

  const formData = {
    firm_name: req.body.firm_name,
    arc_name: req.body.arc_name,
    designation: req.body.designation,
    arc_image: imageUrl,
    arc_quote: req.body.arc_quote,
    contact_number: req.body.contact_number,
    firm_website: req.body.firm_website,
    personal_insta: req.body.personal_insta,
    firm_insta: req.body.firm_insta,
    personal_linkedin: req.body.personal_linkedin,
    firm_linkedin: req.body.firm_linkedin,
    // top_projects: Array.isArray(req.body.top_projects)
    //   ? req.body.top_projects
    //   : [req.body.top_projects],
    // projects_2025: Array.isArray(req.body.projects_2025)
    //   ? req.body.projects_2025
    //   : [req.body.projects_2025],
    top_projects: Array.isArray(req.body.top_projects)
      ? JSON.stringify(req.body.top_projects)
      : JSON.stringify([req.body.top_projects]),
    projects_2025: Array.isArray(req.body.projects_2025)
      ? JSON.stringify(req.body.projects_2025)
      : JSON.stringify([req.body.projects_2025]),
    pick_up_location: req.body.pick_up_location,
    drop_location: req.body.drop_location,
    pick_up_time: req.body.pick_up_time,
    vision: req.body.vision,
  };

  try {
    const formDataObj = await createFormData(formData);
    if (!formDataObj) {
      return res.status(400).json({ message: "Form data is required" });
    }
    res.status(201).json({
      message: "Form data submitted successfully",
      data: formDataObj.newForm, // Access the newForm property
    });
  } catch (error) {
    console.error("Error creating form:", error);
    res
      .status(500)
      .json({ message: "Failed to create form", error: error.message });
  }
};

async function createFormData(formData) {
  // Removed the 'res' parameter
  try {
    if (!formData) {
      return null; // Or throw an error
    }

    const newForm = await db.DataForm.create(formData);

    if (!newForm) {
      return null; // Or throw an error
    }
    return { newForm };
  } catch (error) {
    throw error; // Re-throw the error to be caught in submitForm
  }
}

//   try {
//     const token = req.header('Authorization');
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
//     req.admin = decoded;
//     if(!decoded) {
//       return res.status(403).json({ message: 'Unauthorized token.' });
//     }
//     const users = await db.DataForm.findAll();
//     res.status(200).json(users)
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key"
    );
    req.admin = decoded;
    if (!decoded) {
      return res.status(403).json({ message: "Unauthorized token." });
    }
    const users = await db.DataForm.findAll();

    if (req.query.format === "xlsx") {
      if (users.length === 0) {
        return res.status(200).send("No data to export.");
      }
      const data = users.map((user) => Object.values(user.dataValues));
      const header = Object.keys(users[0].dataValues);

      const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users Data");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="users_data.xlsx"'
      );
      return res.status(200).send(Buffer.from(excelBuffer));
    } else {
      res.status(200).json(users); // Default to JSON if no format specified
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

module.exports = { submitForm, getAllUsers };

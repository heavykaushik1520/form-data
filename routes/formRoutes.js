const express = require("express");
const router = express.Router();

const formController = require("../controllers/formdataController");
const upload = require("../middlewares/multermiddleware");

router.post("/submit", upload.single("arcImage"), formController.submitForm);
router.get("/users", formController.getAllUsers);

module.exports = router;
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController"); // Import controller

const router = express.Router();

// Registration Route
router.post("/register", registerUser);  
router.post("/login", loginUser);  

module.exports = router;

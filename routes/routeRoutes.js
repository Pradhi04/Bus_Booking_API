const express = require("express");
const { addRoute, updateRoute, getRoutes } = require("../controllers/routeController"); // ✅ Correct path

const { protect, admin } = require("../middleware/authMiddleware"); // ✅ Correct path


const router = express.Router();

router.post("/", protect, admin, addRoute);
router.put("/:id", protect, admin, updateRoute);
router.get("/", getRoutes);

module.exports = router;

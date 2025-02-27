const express = require("express");
const { addBus, updateBus, getBuses } = require("../controllers/busController"); // ✅ Correct path

const { protect, admin } = require("../middleware/authMiddleware"); // ✅ Correct path


const router = express.Router();

router.post("/", protect, admin, addBus);
router.put("/:id", protect, admin, updateBus);
router.get("/", getBuses);

module.exports = router;

const express = require("express");
const { searchBuses, bookBus, cancelBooking, getUserBookings } = require("../controllers/bookingController"); 

const { protect } = require("../middleware/authMiddleware"); 


const router = express.Router();

router.get("/search", searchBuses);
router.post("/book", protect, bookBus);
router.put("/cancel/:id", protect, cancelBooking);
router.get("/my-bookings", protect, getUserBookings);

module.exports = router;

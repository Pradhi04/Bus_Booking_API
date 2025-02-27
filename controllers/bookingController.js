const Bus = require("../models/Bus");
const Booking = require("../models/Booking");

// @desc    Search available buses
exports.searchBuses = async (req, res) => {
  try {
    const { source, destination } = req.query;
    const buses = await Bus.find({ source, destination });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Book a bus ticket
exports.bookBus = async (req, res) => {
  try {
    const { busId, seatsBooked } = req.body;
    const bus = await Bus.findById(busId);

    if (!bus) return res.status(404).json({ message: "Bus not found" });
    if (bus.availableSeats < seatsBooked)
      return res.status(400).json({ message: "Not enough available seats" });

    const totalPrice = bus.price * seatsBooked;

    const booking = new Booking({
      user: req.user._id,
      bus: busId,
      seatsBooked,
      totalPrice,
    });

    await booking.save();
    bus.availableSeats -= seatsBooked;
    await bus.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("bus");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "Cancelled")
      return res.status(400).json({ message: "Booking already cancelled" });

    booking.status = "Cancelled";
    await booking.save();

    booking.bus.availableSeats += booking.seatsBooked;
    await booking.bus.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("bus");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

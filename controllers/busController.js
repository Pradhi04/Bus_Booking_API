const Bus = require("../models/Bus");

// @desc    Add a new bus (Admin Only)
exports.addBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Update bus details (Admin Only)
exports.updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBus) return res.status(404).json({ message: "Bus not found" });

    res.json(updatedBus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all buses
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

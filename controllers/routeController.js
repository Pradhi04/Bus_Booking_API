const Route = require("../models/Route");

// @desc    Add a new route (Admin Only)
exports.addRoute = async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Update route details (Admin Only)
exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoute = await Route.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRoute) return res.status(404).json({ message: "Route not found" });

    res.json(updatedRoute);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true },
    estimatedTime: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", RouteSchema);

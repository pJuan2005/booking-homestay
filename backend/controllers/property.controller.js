const Property = require("../models/property.model");

// GET /api/properties
exports.getAllProperties = (req, res) => {
  Property.getAll((err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json(data);
  });
};

// GET /api/properties/:id
exports.getPropertyById = (req, res) => {
  const id = req.params.id;

  Property.getById(id, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(data);
  });
};

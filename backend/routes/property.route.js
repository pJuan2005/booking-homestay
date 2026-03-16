var express = require("express");
var router = express.Router();

var property = require("../controllers/property.controller");

router.get("/", property.getAllProperties);

router.get("/:id", property.getPropertyById);

module.exports = router;

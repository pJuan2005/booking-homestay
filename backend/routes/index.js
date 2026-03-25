const express = require("express");
const propertyRouter = require("./property.route");
const hostPropertyRouter = require("./host-property.route");
const adminPropertyRouter = require("./admin-property.route");

const router = express.Router();

router.use("/properties", propertyRouter);
router.use("/host/properties", hostPropertyRouter);
router.use("/admin/properties", adminPropertyRouter);

module.exports = router;


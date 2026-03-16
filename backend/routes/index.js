var express = require("express");
var router = express.Router();

var propertyRouter = require("./property.route");

router.use("/properties", propertyRouter);

module.exports = router;

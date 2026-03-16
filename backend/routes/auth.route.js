var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth.controller");

router.post("/login", auth.handleLogin);

module.exports = router;

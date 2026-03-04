var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth.controller");

router.get("/login", auth.showLoginForm);
router.post("/login", auth.handleLogin);

module.exports = router;

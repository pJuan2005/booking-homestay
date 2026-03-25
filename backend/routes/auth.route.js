var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth.controller");

router.post("/register", auth.handleRegister);
router.post("/login", auth.handleLogin);
router.get("/me", auth.handleMe);
router.post("/logout", auth.handleLogout);

module.exports = router;

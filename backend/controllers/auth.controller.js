var userModel = require("../models/user.model.js");
function showLoginForm(req, res) {
  if (req.currentUser) {
    return res.redirect("/");
  }
  res.render("auth/login");
}

function handleLogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  userModel.findByEmail(email, function (err, user) {
    if (err) return res.render("auth/login", { error: "Lỗi phía server." });
    else if (!user) {
      return res.render("auth/login", { error: "Email không tồn tại!" });
    } else if (user.password !== password) {
      return res.render("auth/login", { error: "Mật khẩu sai!" });
    } else if (user.password === password) {
      req.session.user = {
        id: user.id,
        role: user.role,
      };
      return res.redirect("/");
    }
  });
}

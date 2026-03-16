var userModel = require("../models/user.model.js");

function handleLogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  userModel.findByEmail(email, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: "Lỗi phía server",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Mật khẩu sai",
      });
    }

    return res.json({
      message: "Login success",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  });
}

module.exports = {
  handleLogin,
};

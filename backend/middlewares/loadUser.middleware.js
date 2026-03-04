var userModel = require("../models/user.model");

function loadUser(req, res, next) {
  if (!req.session.user) {
    return next();
  }
  if (req.session.user.id) {
    userModel.findById(req.session.user.id, function (err, user) {
      if (err) return next();
      if (!user) {
        req.session.destroy(function () {
          return next();
        });
        return next();
      }
      if (user) {
        req.currentUser = user;
        return next();
      }
      return next();
    });
  }
}

module.exports = loadUser;

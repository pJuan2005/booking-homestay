var db = require("../common/db");

function findByEmail(email, callback) {
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    function (err, results) {
      if (err) return callback(err);
      else return callback(null, results[0]);
    },
  );
}

function findById(id, callback) {
  db.query("SELECT * FROM users WHERE id = ?", [id], function (err, results) {
    if (err) return callback(err);
    else return callback(null, results[0]);
  });
}

module.exports = {
  findByEmail,
  findById,
};

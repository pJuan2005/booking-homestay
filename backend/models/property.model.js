const db = require("../common/db");

const Property = {};

// lấy tất cả property
Property.getAll = (result) => {
  const sql = `
    SELECT id, title, city, country, price_per_night, cover_image
    FROM properties
    WHERE status='approved' AND is_deleted=0
  `;

  db.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res);
  });
};

// lấy property theo id
Property.getById = (id, result) => {
  db.query("SELECT * FROM properties WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res[0]);
  });
};

module.exports = Property;

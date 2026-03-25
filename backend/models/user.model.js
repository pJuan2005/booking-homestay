const db = require("../common/db");

const User = {};

User.findByEmail = async (email) => {
  const [rows] = await db.promise().query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  return rows[0] || null;
};

User.findById = async (id) => {
  const [rows] = await db.promise().query(
    "SELECT * FROM users WHERE id = ? LIMIT 1",
    [id],
  );

  return rows[0] || null;
};

User.create = async (payload) => {
  const [result] = await db.promise().query(
    `INSERT INTO users (
      full_name,
      email,
      password,
      role,
      phone,
      location,
      website,
      languages,
      bio,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.fullName,
      payload.email,
      payload.password,
      payload.role,
      payload.phone,
      payload.location || null,
      payload.website || null,
      payload.languages || null,
      payload.bio || null,
      payload.status || "active",
    ],
  );

  return Number(result.insertId);
};

User.updatePassword = async (id, password) => {
  const [result] = await db.promise().query(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, id],
  );

  return result.affectedRows > 0;
};

module.exports = User;

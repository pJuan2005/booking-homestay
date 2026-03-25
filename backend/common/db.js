const mysql = require("mysql2");

const db_connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "booking_db",
});

db_connection.connect(function (err) {
  if (err) {
    console.log("Lỗi kết nối database:", err);
  } else {
    console.log("Kết nối database thành công!");
  }
});

module.exports = db_connection;

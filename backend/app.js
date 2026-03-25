const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const loadUser = require("./middlewares/loadUser.middleware");
const authRouter = require("./routes/auth.route");
const routes = require("./routes");

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      const corsError = new Error("Origin is not allowed");
      corsError.status = 403;
      callback(corsError);
    },
    credentials: true,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    name: "hs.sid",
    secret: process.env.SESSION_SECRET || "khoa-bi-mat-cua-chuan",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);
app.use(loadUser);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    message: "Resource not found",
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Each image must be 15 MB or smaller.",
      });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "You can upload up to 10 images in one request.",
      });
    }

    return res.status(400).json({
      message: err.message || "The uploaded files are invalid.",
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;

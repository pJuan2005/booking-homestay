const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const SALT_ROUNDS = 10;

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeRole(role) {
  const normalized = String(role || "guest").trim().toLowerCase();
  return ["guest", "host", "admin"].includes(normalized)
    ? normalized
    : "guest";
}

function mapUserResponse(user) {
  return {
    id: Number(user.id),
    fullName: user.full_name,
    email: user.email,
    role: user.role,
    status: user.status,
    phone: user.phone,
    location: user.location,
    website: user.website,
    languages: user.languages,
    bio: user.bio,
    createdAt: user.created_at,
  };
}

function validateRegisterPayload(body) {
  const errors = {};

  const fullName = String(body.fullName || "").trim();
  const email = normalizeEmail(body.email);
  const password = String(body.password || "");
  const phone = String(body.phone || "").trim();
  const role = normalizeRole(body.role);

  if (!fullName) {
    errors.fullName = "Full name is required";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Email is invalid";
  }

  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!phone) {
    errors.phone = "Phone number is required";
  }

  if (!["guest", "host"].includes(role)) {
    errors.role = "Registration role is invalid";
  }

  return {
    errors,
    payload: {
      fullName,
      email,
      password,
      phone,
      role,
      location: String(body.location || "").trim(),
    },
  };
}

function isBcryptHash(value) {
  return /^\$2[aby]\$\d{2}\$/.test(String(value || ""));
}

async function verifyPassword(user, plainPassword) {
  const storedPassword = String(user.password || "");

  if (isBcryptHash(storedPassword)) {
    return bcrypt.compare(plainPassword, storedPassword);
  }

  const isMatch = storedPassword === plainPassword;
  if (isMatch) {
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    await User.updatePassword(user.id, hashedPassword);
  }

  return isMatch;
}

function saveSession(req, userId) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((regenerateError) => {
      if (regenerateError) {
        reject(regenerateError);
        return;
      }

      req.session.user = { id: userId };
      req.session.save((saveError) => {
        if (saveError) {
          reject(saveError);
          return;
        }

        resolve();
      });
    });
  });
}

function destroySession(req) {
  return new Promise((resolve) => {
    if (!req.session) {
      resolve();
      return;
    }

    req.session.destroy(() => {
      resolve();
    });
  });
}

async function handleRegister(req, res) {
  const { errors, payload } = validateRegisterPayload(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Registration payload is invalid",
      errors,
    });
  }

  try {
    const existingUser = await User.findByEmail(payload.email);
    if (existingUser) {
      return res.status(409).json({
        message: "This email is already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
    const userId = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
      phone: payload.phone,
      location: payload.location || null,
      status: "active",
    });

    const user = await User.findById(userId);
    await saveSession(req, userId);

    return res.status(201).json({
      message: "Account registered successfully",
      user: mapUserResponse(user),
    });
  } catch (_error) {
    return res.status(500).json({
      message: "Unable to register account right now",
    });
  }
}

async function handleLogin(req, res) {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked",
      });
    }

    const isValidPassword = await verifyPassword(user, password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const refreshedUser = await User.findById(user.id);
    await saveSession(req, refreshedUser.id);

    return res.json({
      message: "Login successful",
      user: mapUserResponse(refreshedUser),
    });
  } catch (_error) {
    return res.status(500).json({
      message: "Unable to login right now",
    });
  }
}

function handleMe(req, res) {
  if (!req.currentUser) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }

  return res.json({
    user: mapUserResponse(req.currentUser),
  });
}

async function handleLogout(req, res) {
  await destroySession(req);
  res.clearCookie("hs.sid");
  return res.json({
    message: "Logout successful",
  });
}

module.exports = {
  handleRegister,
  handleLogin,
  handleMe,
  handleLogout,
};
